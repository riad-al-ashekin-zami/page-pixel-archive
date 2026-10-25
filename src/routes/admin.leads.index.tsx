import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { adminMe, adminLogout } from "@/lib/admin.functions";
import { listLeads, updateLead, LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/leads.functions";

export const Route = createFileRoute("/admin/leads/")({
  head: () => ({
    meta: [
      { title: "Leads Dashboard — Dermatology Website Design" },
      { name: "description", content: "Internal dashboard for managing website leads." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLeadsPage,
});

const scoreStyles: Record<string, string> = {
  High: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  Medium: "bg-amber-100 text-amber-800 ring-amber-200",
  Low: "bg-slate-100 text-slate-700 ring-slate-200",
};

function AdminLeadsPage() {
  const me = useServerFn(adminMe);
  const logout = useServerFn(adminLogout);
  const fetchLeads = useServerFn(listLeads);
  const patchLead = useServerFn(updateLead);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LeadStatus>("All");

  useEffect(() => {
    let active = true;
    (async () => {
      const auth = await me();
      if (!auth.authenticated) {
        await navigate({ to: "/admin/login" });
        return;
      }
      const res = await fetchLeads();
      if (!active) return;
      if (res.ok) setLeads(res.leads);
      else setError(res.error);
      setLoading(false);
    })().catch((e) => {
      if (active) {
        setError(e instanceof Error ? e.message : "Failed to load leads");
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [me, fetchLeads, navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter !== "All" && l.status !== statusFilter) return false;
      if (!q) return true;
      return [l.name, l.email, l.company_name, l.service_needed, l.project_details]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [leads, query, statusFilter]);

  async function onStatusChange(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await patchLead({ data: { id, status } });
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <h1 className="text-base font-semibold sm:text-lg">Leads</h1>
          <nav className="flex items-center gap-3 text-sm text-muted-foreground">
            <Link to="/admin/chats" className="hover:text-foreground">
              Chats
            </Link>
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {filtered.length} of {leads.length}
            </span>
            <button
              type="button"
              onClick={async () => {
                await logout();
                await navigate({ to: "/admin/login" });
              }}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 pb-3 sm:flex-row sm:items-center sm:px-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, company…"
            className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 sm:max-w-xs"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "All" | LeadStatus)}
            className="rounded-lg border border-border px-3 py-2 text-sm"
          >
            <option value="All">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {loading && <p className="text-sm text-muted-foreground">Loading leads…</p>}
        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No leads yet.</p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((lead) => (
            <article
              key={lead.id}
              className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border/60"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold">{lead.name}</h2>
                  <a
                    href={`mailto:${lead.email}`}
                    className="block truncate text-xs text-brand-primary hover:underline"
                  >
                    {lead.email}
                  </a>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
                    scoreStyles[lead.lead_score] ?? scoreStyles.Low
                  }`}
                >
                  {lead.lead_score}
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                <div className="col-span-2 truncate">
                  <dt className="inline font-semibold">Company: </dt>
                  <dd className="inline">{lead.company_name || "—"}</dd>
                </div>
                <div className="truncate">
                  <dt className="inline font-semibold">Service: </dt>
                  <dd className="inline">{lead.service_needed || "—"}</dd>
                </div>
                <div className="truncate">
                  <dt className="inline font-semibold">Budget: </dt>
                  <dd className="inline">{lead.budget || "—"}</dd>
                </div>
                <div className="col-span-2 truncate">
                  <dt className="inline font-semibold">Timeline: </dt>
                  <dd className="inline">{lead.timeline || "—"}</dd>
                </div>
              </dl>

              <p className="line-clamp-2 text-xs text-foreground/80">
                {lead.project_details || "No details provided."}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                <select
                  value={lead.status}
                  onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                  className="rounded-lg border border-border px-2 py-1.5 text-xs"
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-muted-foreground">
                  {new Date(lead.created_at).toLocaleDateString()}
                </span>
                <Link
                  to="/admin/leads/$id"
                  params={{ id: lead.id }}
                  className="ms-auto rounded-lg bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                >
                  Open
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
