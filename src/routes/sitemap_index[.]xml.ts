import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/sitemap_index.xml")({
  server: { handlers: { GET: () => new Response(null, { status: 301, headers: { Location: "/sitemap.xml" } }) } },
});
