import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  listChatSessions,
  adminLogout,
  adminMe,
  type AdminChatSession,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/chats")({
  head: () => ({
    meta: [
      { title: "Chat Dashboard — Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminChatsPage,
});

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString();
}

function AdminChatsPage() {
  const navigate = useNavigate();
  const list = useServerFn(listChatSessions);
  const me = useServerFn(adminMe);
  const logout = useServerFn(adminLogout);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  // Auth check on mount
  useEffect(() => {
    me().then((r) => {
      if (!r.authenticated) navigate({ to: "/admin/login" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQuery({
    queryKey: ["admin-chat-sessions"],
    queryFn: async () => {
      const r = await list();
      if (!r.ok) throw new Error(r.error);
      return r.sessions;
    },
    refetchInterval: 3000, // auto-update every 3s
    refetchOnWindowFocus: true,
  });

  const sessions = query.data ?? [];
  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return sessions;
    return sessions.filter((s) => {
      if (s.email?.toLowerCase().includes(f)) return true;
      if (s.visitor_id.toLowerCase().includes(f)) return true;
      return s.messages.some((m) => m.content.toLowerCase().includes(f));
    });
  }, [sessions, filter]);

  const selected: AdminChatSession | null =
    filtered.find((s) => s.id === selectedId) ?? filtered[0] ?? null;

  async function handleLogout() {
    await logout();
    navigate({ to: "/admin/login" });
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-white px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Chat Dashboard</h1>
          <p className="text-xs text-muted-foreground">
            {query.isFetching ? "Refreshing…" : `${sessions.length} sessions · auto-updates every 3s`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/leads"
            className="rounded-lg bg-brand-primary px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Leads
          </Link>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search email or message…"
            className="rounded-lg border border-border px-3 py-1.5 text-sm outline-none focus:border-brand-primary"
          />
          <button
            onClick={handleLogout}
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm hover:bg-muted"
          >
            Logout
          </button>
        </div>
      </header>

      {query.error && (
        <div className="m-4 rounded bg-destructive/10 p-3 text-sm text-destructive">
          {(query.error as Error).message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-0 h-[calc(100vh-64px)]">
        {/* Sessions list */}
        <aside className="border-r bg-white overflow-y-auto">
          {filtered.length === 0 && (
            <div className="p-6 text-sm text-muted-foreground">
              {query.isLoading ? "Loading…" : "No chat sessions yet."}
            </div>
          )}
          <ul className="divide-y">
            {filtered.map((s) => {
              const active = selected?.id === s.id;
              const preview =
                s.messages[s.messages.length - 1]?.content?.slice(0, 80) ?? "—";
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setSelectedId(s.id)}
                    className={`w-full text-left px-4 py-3 hover:bg-muted/60 transition-colors ${
                      active ? "bg-brand-primary/5 border-l-4 border-brand-primary" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold truncate">
                        {s.email ?? `Visitor ${s.visitor_id.slice(0, 8)}`}
                      </span>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {formatDate(s.updated_at)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate mt-0.5">
                      {preview}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      {s.message_count} messages · {s.language ?? "—"}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Conversation view */}
        <main className="overflow-y-auto p-6">
          {!selected ? (
            <div className="text-sm text-muted-foreground">
              Select a session to view the conversation.
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="rounded-xl bg-white p-4 ring-1 ring-border/60">
                <div className="text-xs text-muted-foreground">Visitor</div>
                <div className="font-mono text-xs">{selected.visitor_id}</div>
                <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Email</div>
                    <div>{selected.email ?? "— not captured —"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Language</div>
                    <div>{selected.language ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Started</div>
                    <div>{formatDate(selected.created_at)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Last activity</div>
                    <div>{formatDate(selected.updated_at)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {selected.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`rounded-xl px-4 py-3 text-sm shadow-sm ${
                      m.role === "user"
                        ? "bg-brand-primary text-white ml-8"
                        : "bg-white ring-1 ring-border/60 mr-8"
                    }`}
                  >
                    <div
                      className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${
                        m.role === "user" ? "text-white/80" : "text-muted-foreground"
                      }`}
                    >
                      {m.role} · {formatDate(m.created_at)}
                    </div>
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
