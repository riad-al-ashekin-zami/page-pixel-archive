import { createFileRoute } from "@tanstack/react-router";
import { forceContentSync, getSyncStatus } from "@/lib/chatbot-content-sync.server";

/**
 * Public sync endpoint for the chatbot knowledge index.
 * Intended for cron (e.g. pg_cron, external scheduler) or manual refresh.
 *
 * Auth: requires header `x-sync-secret: $CHATBOT_SYNC_SECRET`.
 * If the secret is not configured, the endpoint is disabled.
 */
export const Route = createFileRoute("/api/public/sync-knowledge")({
  server: {
    handlers: {
      GET: async () => Response.json({ status: "ok", ...getSyncStatus() }),
      POST: async ({ request }) => {
        const secret = process.env.CHATBOT_SYNC_SECRET;
        if (!secret) {
          return new Response("Sync disabled: missing CHATBOT_SYNC_SECRET", { status: 503 });
        }
        const provided = request.headers.get("x-sync-secret") ?? "";
        if (provided !== secret) {
          return new Response("Unauthorized", { status: 401 });
        }
        const origin = new URL(request.url).origin;
        const index = await forceContentSync(origin);
        return Response.json({
          status: "synced",
          sectionCount: index.reduce((n, p) => n + p.sections.length, 0),
          ...getSyncStatus(),
        });
      },
    },
  },
});
