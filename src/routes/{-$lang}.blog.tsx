import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { isValidUrlLang } from "@/i18n/languages";

export const Route = createFileRoute("/{-$lang}/blog")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  component: () => <Outlet />,
});
