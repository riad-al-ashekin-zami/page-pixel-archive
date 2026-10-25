import { useSession } from "@tanstack/react-start/server";

export type AdminSessionData = { authenticated?: boolean; loginAt?: number };

export function getAdminSession() {
  const password = process.env.ADMIN_SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set (>=32 chars).");
  }
  return useSession<AdminSessionData>({
    password,
    name: "dwd_admin",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    },
  });
}
