import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { calculateLeadScore } from "./lead-score";

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Call Scheduled",
  "Proposal Sent",
  "Won",
  "Lost",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  website_url: string | null;
  service_needed: string | null;
  budget: string | null;
  timeline: string | null;
  project_details: string | null;
  preferred_contact: string | null;
  nda_required: boolean;
  source_page: string | null;
  referrer: string | null;
  ip_address: string | null;
  country: string | null;
  user_agent: string | null;
  lead_score: "High" | "Medium" | "Low";
  lead_score_points: number;
  status: LeadStatus;
  admin_notes: string | null;
  admin_email_sent: boolean;
  visitor_email_sent: boolean;
  last_email_error: string | null;
  created_at: string;
  updated_at: string;
};

const submitSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(60).optional().nullable(),
  company_name: z.string().trim().max(160).optional().nullable(),
  website_url: z.string().trim().max(300).optional().nullable(),
  service_needed: z.string().trim().max(200).optional().nullable(),
  budget: z.string().trim().max(120).optional().nullable(),
  timeline: z.string().trim().max(120).optional().nullable(),
  project_details: z.string().trim().max(5000).optional().nullable(),
  preferred_contact: z.string().trim().max(60).optional().nullable(),
  nda_required: z.boolean().optional().nullable(),
  source_page: z.string().trim().max(500).optional().nullable(),
  language: z.string().trim().max(10).optional().nullable(),
  utm_source: z.string().trim().max(200).optional().nullable(),
  utm_medium: z.string().trim().max(200).optional().nullable(),
  utm_campaign: z.string().trim().max(200).optional().nullable(),
  utm_term: z.string().trim().max(200).optional().nullable(),
  utm_content: z.string().trim().max(200).optional().nullable(),
});

/** Basic server-side rate limit: max 3 lead submissions per IP per 10 minutes. */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
const rateBuckets = new Map<string, number[]>();
function isRateLimited(ip: string | null): boolean {
  if (!ip) return false;
  const now = Date.now();
  const hits = (rateBuckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    rateBuckets.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateBuckets.set(ip, hits);
  return false;
}

export type SubmitLeadInput = z.infer<typeof submitSchema>;

/**
 * Public endpoint: stores a contact-form submission and triggers the
 * admin notification + visitor confirmation emails.
 */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: SubmitLeadInput) => submitSchema.parse(data))
  .handler(async ({ data }) => {
    const { getRequestHeaders, getRequestIP } = await import("@tanstack/react-start/server");
    const headers = getRequestHeaders();
    const h = (name: string) => headers.get(name) ?? undefined;

    const ip =
      h("cf-connecting-ip") ??
      h("x-real-ip") ??
      h("x-forwarded-for")?.split(",")[0]?.trim() ??
      getRequestIP({ xForwardedFor: true }) ??
      null;
    const country = h("cf-ipcountry") ?? h("x-vercel-ip-country") ?? null;
    const userAgent = h("user-agent") ?? null;
    const referrer = h("referer") ?? h("referrer") ?? null;

    if (isRateLimited(ip)) {
      return { ok: false as const, error: "Too many submissions. Please try again later." };
    }

    const { score, points } = calculateLeadScore(data);

    // Persist tracking values inside project_details (the leads table has no
    // dedicated UTM columns on the external backend).
    const trackingLines = [
      data.language ? `Language: ${data.language}` : null,
      data.utm_source ? `UTM source: ${data.utm_source}` : null,
      data.utm_medium ? `UTM medium: ${data.utm_medium}` : null,
      data.utm_campaign ? `UTM campaign: ${data.utm_campaign}` : null,
      data.utm_term ? `UTM term: ${data.utm_term}` : null,
      data.utm_content ? `UTM content: ${data.utm_content}` : null,
    ].filter(Boolean);
    const projectDetails = [
      data.project_details?.trim() || null,
      trackingLines.length ? `--- Tracking ---\n${trackingLines.join("\n")}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const insert = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company_name: data.company_name || null,
      website_url: data.website_url || null,
      service_needed: data.service_needed || null,
      budget: data.budget || null,
      timeline: data.timeline || null,
      project_details: projectDetails || null,
      preferred_contact: data.preferred_contact || null,
      nda_required: Boolean(data.nda_required),
      source_page: data.source_page || null,
      referrer,
      ip_address: ip,
      country,
      user_agent: userAgent,
      lead_score: score,
      lead_score_points: points,
      status: "New" as const,
    };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .insert(insert)
      .select("*")
      .single();

    if (error || !row) {
      return { ok: false as const, error: error?.message ?? "Could not save lead" };
    }

    const { sendLeadEmails } = await import("./lead-mailer.server");
    const result = await sendLeadEmails({ ...insert, id: row.id, lead_score: score });

    await supabaseAdmin
      .from("leads")
      .update({
        admin_email_sent: result.admin_email_sent,
        visitor_email_sent: result.visitor_email_sent,
        last_email_error: result.last_email_error,
      })
      .eq("id", row.id);

    return { ok: true as const, id: row.id as string, lead_score: score };
  });

async function requireAdmin(): Promise<boolean> {
  const { getAdminSession } = await import("./admin-session.server");
  const session = await getAdminSession();
  return Boolean(session.data.authenticated);
}

export const listLeads = createServerFn({ method: "GET" }).handler(async () => {
  if (!(await requireAdmin())) return { ok: false as const, error: "Unauthorized" };
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, leads: (data ?? []) as unknown as Lead[] };
});

export const getLead = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    if (!(await requireAdmin())) return { ok: false as const, error: "Unauthorized" };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) return { ok: false as const, error: error.message };
    if (!row) return { ok: false as const, error: "Lead not found" };
    return { ok: true as const, lead: row as unknown as Lead };
  });

export const updateLead = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; status?: LeadStatus; admin_notes?: string }) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(LEAD_STATUSES).optional(),
        admin_notes: z.string().max(10000).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    if (!(await requireAdmin())) return { ok: false as const, error: "Unauthorized" };
    const patch: { status?: LeadStatus; admin_notes?: string } = {};
    if (data.status) patch.status = data.status;
    if (data.admin_notes !== undefined) patch.admin_notes = data.admin_notes;
    if (!Object.keys(patch).length) return { ok: true as const };


    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").update(patch).eq("id", data.id);
    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const };
  });
