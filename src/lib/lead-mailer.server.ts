const ADMIN_EMAIL = "info@dermatologywebsitedesign.com";
const FROM_EMAIL =
  process.env.LEADS_FROM_EMAIL ?? "Dermatology Website Design <onboarding@resend.dev>";

export type LeadEmailPayload = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company_name?: string | null;
  website_url?: string | null;
  service_needed?: string | null;
  budget?: string | null;
  timeline?: string | null;
  project_details?: string | null;
  preferred_contact?: string | null;
  nda_required?: boolean | null;
  source_page?: string | null;
  referrer?: string | null;
  ip_address?: string | null;
  country?: string | null;
  user_agent?: string | null;
  lead_score: string;
};

function esc(v: unknown): string {
  return String(v ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label: string, value: unknown) {
  return `<tr><td style="padding:6px 12px;background:#f8fafc;font-weight:600;font-size:13px;color:#334155">${esc(
    label,
  )}</td><td style="padding:6px 12px;font-size:13px;color:#0f172a">${esc(value)}</td></tr>`;
}

function adminHtml(lead: LeadEmailPayload) {
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:640px">
  <h2 style="margin:0 0 4px">New ${esc(lead.lead_score)}-score lead</h2>
  <p style="margin:0 0 16px;color:#64748b;font-size:13px">From ${esc(lead.source_page)}</p>
  <table style="border-collapse:collapse;width:100%;border:1px solid #e2e8f0">
    ${row("Name", lead.name)}
    ${row("Email", lead.email)}
    ${row("Phone", lead.phone)}
    ${row("Company", lead.company_name)}
    ${row("Website", lead.website_url)}
    ${row("Service", lead.service_needed)}
    ${row("Budget", lead.budget)}
    ${row("Timeline", lead.timeline)}
    ${row("Preferred contact", lead.preferred_contact)}
    ${row("NDA required", lead.nda_required ? "Yes" : "No")}
    ${row("Country", lead.country)}
    ${row("IP", lead.ip_address)}
    ${row("Referrer", lead.referrer)}
    ${row("Device", lead.user_agent)}
  </table>
  <h3 style="margin:20px 0 6px;font-size:14px">Project details</h3>
  <p style="white-space:pre-wrap;font-size:13px;color:#0f172a">${esc(lead.project_details)}</p>
  <p style="margin-top:20px;font-size:13px">
    <a href="https://dermatologywebsitedesign.com/admin/leads/${esc(lead.id)}">Open in dashboard →</a>
  </p>
</div>`;
}

function visitorHtml(lead: LeadEmailPayload) {
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:600px;color:#0f172a">
  <h2 style="margin:0 0 12px">Thanks for reaching out, ${esc(lead.name)}!</h2>
  <p style="font-size:14px;line-height:1.6">
    We've received your message about your dermatology practice website and a specialist from our
    team will reply personally within 24 hours (Mon–Fri).
  </p>
  <p style="font-size:14px;line-height:1.6">Here's a copy of what you sent us:</p>
  <blockquote style="margin:0;padding:12px 16px;background:#f8fafc;border-left:3px solid #0ea5e9;font-size:13px;white-space:pre-wrap">${esc(
    lead.project_details,
  )}</blockquote>
  <p style="font-size:14px;line-height:1.6">
    In the meantime, feel free to browse our
    <a href="https://dermatologywebsitedesign.com/dermatology-websites-portfolio">recent work</a>.
  </p>
  <p style="font-size:13px;color:#64748b;margin-top:24px">
    Dermatology Website Design · ${esc(ADMIN_EMAIL)}
  </p>
</div>`;
}

async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Email provider not configured (RESEND_API_KEY missing)");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`Email send failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
}

export async function sendLeadEmails(lead: LeadEmailPayload): Promise<{
  admin_email_sent: boolean;
  visitor_email_sent: boolean;
  last_email_error: string | null;
}> {
  const errors: string[] = [];
  let adminSent = false;
  let visitorSent = false;

  try {
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `New lead (${lead.lead_score}) — ${lead.name}${
        lead.company_name ? ` · ${lead.company_name}` : ""
      }`,
      html: adminHtml(lead),
      replyTo: lead.email,
    });
    adminSent = true;
  } catch (e) {
    errors.push(`admin: ${e instanceof Error ? e.message : String(e)}`);
  }

  try {
    await sendEmail({
      to: lead.email,
      subject: "We received your message — Dermatology Website Design",
      html: visitorHtml(lead),
      replyTo: ADMIN_EMAIL,
    });
    visitorSent = true;
  } catch (e) {
    errors.push(`visitor: ${e instanceof Error ? e.message : String(e)}`);
  }

  return {
    admin_email_sent: adminSent,
    visitor_email_sent: visitorSent,
    last_email_error: errors.length ? errors.join(" | ") : null,
  };
}
