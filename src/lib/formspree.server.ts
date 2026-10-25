export type AuditSubmission = {
  id: string;
  name: string;
  email: string;
  website_url?: string | null;
  company_name?: string | null;
  service_needed?: string | null;
  project_details?: string | null;
  source_page?: string | null;
  language?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
};

/** Forward only the visitor's form fields and tracking, never credentials or IPs. */
export async function forwardAuditToFormspree(
  lead: AuditSubmission,
  send: typeof fetch = fetch,
): Promise<{ accepted: boolean; error: string | null }> {
  try {
    const response = await send("https://formspree.io/f/mqpperon", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        website: lead.website_url ?? "",
        practice_type: lead.company_name ?? "",
        need: lead.service_needed ?? "",
        message: lead.project_details ?? "",
        source_page: lead.source_page ?? "",
        language: lead.language ?? "en",
        utm_source: lead.utm_source ?? "",
        utm_medium: lead.utm_medium ?? "",
        utm_campaign: lead.utm_campaign ?? "",
        utm_term: lead.utm_term ?? "",
        utm_content: lead.utm_content ?? "",
        submission_id: lead.id,
      }),
    });
    if (!response.ok) {
      return { accepted: false, error: `Formspree rejected submission (${response.status})` };
    }
    return { accepted: true, error: null };
  } catch {
    return { accepted: false, error: "Formspree unavailable; submission saved in leads" };
  }
}