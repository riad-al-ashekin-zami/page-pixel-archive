import { createServerFn } from "@tanstack/react-start";
import { createHash, timingSafeEqual } from "node:crypto";

function timingSafeStringEqual(a: string, b: string): boolean {
  const ah = createHash("sha256").update(a, "utf8").digest();
  const bh = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(ah, bh);
}

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    const expectedUser = process.env.ADMIN_USERNAME;
    const expectedPass = process.env.ADMIN_PASSWORD;
    if (!expectedUser || !expectedPass) {
      return { ok: false as const, error: "Admin credentials not configured." };
    }
    const userOk = timingSafeStringEqual(data.username ?? "", expectedUser);
    const passOk = timingSafeStringEqual(data.password ?? "", expectedPass);
    if (!userOk || !passOk) {
      return { ok: false as const, error: "Invalid username or password." };
    }
    const { getAdminSession } = await import("./admin-session.server");
    const session = await getAdminSession();
    await session.update({ authenticated: true, loginAt: Date.now() });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { getAdminSession } = await import("./admin-session.server");
  const session = await getAdminSession();
  await session.clear();
  return { ok: true as const };
});

export const adminMe = createServerFn({ method: "GET" }).handler(async () => {
  const { getAdminSession } = await import("./admin-session.server");
  const session = await getAdminSession();
  return { authenticated: Boolean(session.data.authenticated) };
});

export type AdminChatMessage = {
  id: string;
  role: string;
  content: string;
  created_at: string;
};

export type AdminChatSession = {
  id: string;
  visitor_id: string;
  email: string | null;
  language: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
  message_count: number;
  messages: AdminChatMessage[];
};

export const listChatSessions = createServerFn({ method: "GET" }).handler(async () => {
  const { getAdminSession } = await import("./admin-session.server");
  const session = await getAdminSession();
  if (!session.data.authenticated) {
    return { ok: false as const, error: "Unauthorized" };
  }
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: sessions, error: sErr } = await supabaseAdmin
    .from("chat_sessions")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(200);
  if (sErr) return { ok: false as const, error: sErr.message };

  const ids = (sessions ?? []).map((s) => s.id);
  const messagesBySession: Record<string, AdminChatMessage[]> = {};
  if (ids.length) {
    const { data: msgs, error: mErr } = await supabaseAdmin
      .from("chat_messages")
      .select("id, session_id, role, content, created_at")
      .in("session_id", ids)
      .order("created_at", { ascending: true });
    if (mErr) return { ok: false as const, error: mErr.message };
    for (const m of msgs ?? []) {
      (messagesBySession[m.session_id] ||= []).push({
        id: m.id,
        role: m.role,
        content: m.content,
        created_at: m.created_at,
      });
    }
  }

  const rows: AdminChatSession[] = (sessions ?? []).map((s) => ({
    id: s.id,
    visitor_id: s.visitor_id,
    email: s.email,
    language: s.language,
    user_agent: s.user_agent,
    created_at: s.created_at,
    updated_at: s.updated_at,
    messages: messagesBySession[s.id] ?? [],
    message_count: (messagesBySession[s.id] ?? []).length,
  }));

  return { ok: true as const, sessions: rows };
});
