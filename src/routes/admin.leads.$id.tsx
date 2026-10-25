import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { adminMe } from "@/lib/admin.functions";
import { getLead, updateLead, LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/leads.functions";

export const Route = createFileRoute("/admin/leads/$id")({
  head: () => ({
    meta: [
      { title: "Lead Detail — Dermatology Website Design" },
      { name: "description", content: "Internal lead detail view." },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: AdminLeadDetailPage,
});

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 break-words text-sm text-foreground">{value || "—"}</dd>
    </div>
  );
}

function AdminLeadDetailPage() {
  const { id } = useParams({ from: "/admin/leads/$id" });
  const me = useServerFn(adminMe);
  const fetchLead = useServerFn(getLead);
  const patchLead = useServerFn(updateLead);
  const navigate = useNavigate();

  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const auth = await me();
      if (!auth.authenticated) {
        await navigate({ to: "/admin/login" });
        return;
      }
      const res = await fetchLead({ data: { id } });
      if (!active) return;
      if (res.ok) {
        setLead(res.lead);
        setNotes(res.lead.admin_notes ?? "");
      } else setError(res.error);
    })().catch((e) => active && setError(e instanceof Error ? e.message : "Failed to load"));
    return () => {
      active = false;
    };
  }, [id, me, fetchLead, navigate]);

  async function saveNotes() {
    setSaving(true);
    setSaved(false);
    await patchLead({ data: { id, admin_notes: notes } });
    setSaving(false);
    setSaved(true);
  }

  async function changeStatus(status: LeadStatus) {
    setLead((prev) => (prev ? { ...prev, status } : prev));
    await patchLead({ data: { id, status } });
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <Link to="/admin/leads" className="text-sm text-muted-foreground hover:text-foreground">
            ← All leads
          </Link>
          <h1 className="ms-auto truncate text-sm font-semibold sm:text-base">
            {lead?.name ?? "Lead"}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-4 px-4 py-6 sm:px-6">
        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
        {!lead && !error && <p className="text-sm text-muted-foreground">Loading…</p>}

        {lead && (
          <>
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border/60">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                  Score: {lead.lead_score} ({lead.lead_score_points})
                </span>
                <select
                  value={lead.status}
                  onChange={(e) => changeStatus(e.target.value as LeadStatus)}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm"
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-muted-foreground">
                  {new Date(lead.created_at).toLocaleString()}
                </span>
                <div className="ms-auto flex flex-wrap gap-2">
                  <a
                    href={`mailto:${lead.email}`}
                    className="rounded-lg bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                  >
                    Email reply
                  </a>
                  {lead.website_url && (
                    <a
                      href={
                        lead.website_url.startsWith("http")
                          ? lead.website_url
                          : `https://${lead.website_url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                    >
                      Visit website
                    </a>
                  )}
                  {lead.phone && (
                    <a
                      href={`tel:${lead.phone}`}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                    >
                      Call
                    </a>
                  )}
                </div>
              </div>

              <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Name" value={lead.name} />
                <Field label="Email" value={lead.email} />
                <Field label="Phone" value={lead.phone} />
                <Field label="Company" value={lead.company_name} />
                <Field label="Website" value={lead.website_url} />
                <Field label="Service needed" value={lead.service_needed} />
                <Field label="Budget" value={lead.budget} />
                <Field label="Timeline" value={lead.timeline} />
                <Field label="Preferred contact" value={lead.preferred_contact} />
                <Field label="NDA required" value={lead.nda_required ? "Yes" : "No"} />
                <Field label="Country" value={lead.country} />
                <Field label="IP address" value={lead.ip_address} />
                <Field label="Source page" value={lead.source_page} />
                <Field label="Referrer" value={lead.referrer} />
                <Field label="Browser / device" value={lead.user_agent} />
                <Field
                  label="Emails"
                  value={`Admin: ${lead.admin_email_sent ? "sent" : "not sent"} · Visitor: ${
                    lead.visitor_email_sent ? "sent" : "not sent"
                  }`}
                />
                {lead.last_email_error && (
                  <Field label="Last email error" value={lead.last_email_error} />
                )}
              </dl>
            </section>

            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border/60">
              <h2 className="mb-2 text-sm font-semibold">Project details</h2>
              <p className="whitespace-pre-wrap text-sm text-foreground/90">
                {lead.project_details || "No details provided."}
              </p>
            </section>

            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border/60">
              <h2 className="mb-2 text-sm font-semibold">Internal notes</h2>
              <textarea
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  setSaved(false);
                }}
                rows={6}
                className="w-full rounded-lg border border-border p-3 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                placeholder="Add context, call summaries, next steps…"
              />
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={saveNotes}
                  disabled={saving}
                  className="rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save notes"}
                </button>
                {saved && <span className="text-xs text-emerald-600">Saved</span>}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
