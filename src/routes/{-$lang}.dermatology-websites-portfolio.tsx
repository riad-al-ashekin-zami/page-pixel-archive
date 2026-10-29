import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { isValidUrlLang, resolveRouteLanguage } from "@/i18n/languages";
import { localizedPath } from "@/lib/i18n-routing";

export const Route = createFileRoute("/{-$lang}/dermatology-websites-portfolio")({
  beforeLoad: ({ params }) => {
    if (params.lang !== undefined && !isValidUrlLang(params.lang)) throw notFound();
    throw redirect({ href: localizedPath(resolveRouteLanguage(params.lang), "/"), statusCode: 301 });
  },
  server: { handlers: {
    GET: ({ params }) => {
      if (params.lang !== undefined && !isValidUrlLang(params.lang)) return new Response(null, { status: 404 });
      return new Response(null, { status: 301, headers: { Location: localizedPath(resolveRouteLanguage(params.lang), "/") } });
    },
  } },
});
