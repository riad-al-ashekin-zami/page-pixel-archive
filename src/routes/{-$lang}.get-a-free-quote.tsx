import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { isValidUrlLang } from "@/i18n/languages";

// Old quote page retired: the whole site now uses ONE call to action and ONE
// form on /contact. 301-redirect every language version, keeping the prefix.
export const Route = createFileRoute("/{-$lang}/get-a-free-quote")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/{-$lang}/contact",
      params: { lang: params.lang },
      statusCode: 301,
    });
  },
});
