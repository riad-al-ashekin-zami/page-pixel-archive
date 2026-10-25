import { useEffect } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { CheckCircle2, Clock, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { isValidUrlLang } from "@/i18n/languages";
import { resolveRouteLanguage } from "@/lib/i18n-routing";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { robotsContent } from "@/lib/index-allowlist";

export const Route = createFileRoute("/{-$lang}/thank-you")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  // Deliberately NOT in the indexable allowlist: always noindex,follow,
  // never in the sitemap, never blocked in robots.txt.
  head: ({ params }) => {
    const st = getStaticTranslation(resolveRouteLanguage(params.lang), "contact");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/thank-you") },
        { title: st?.thankYou?.metaTitle ?? "Thank You" },
        {
          name: "description",
          content:
            st?.thankYou?.metaDescription ??
            "We received your audit request. Your free website audit will arrive within 48 hours.",
        },
        { property: "og:title", content: st?.thankYou?.metaTitle ?? "Audit Request Received — Dermatology Website Design" },
        { property: "og:description", content: st?.thankYou?.metaDescription ?? "We received your website audit request." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ThankYouPage,
});

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ThankYouPage() {
  const { t } = useTranslation("contact");

  // Fire the single conversion event once, with no personal data.
  useEffect(() => {
    try {
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: "generate_lead" });
      window.gtag?.("event", "generate_lead");
    } catch {
      // analytics is best-effort
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main">
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-primary/5 via-background to-background">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
              <CheckCircle2 className="h-8 w-8" aria-hidden />
            </span>
            <h1 className="mt-8 text-balance text-3xl font-light leading-tight tracking-tight text-foreground sm:text-4xl">
              {t("thankYou.title")}
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("thankYou.description")}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary">
              <Clock className="h-4 w-4" aria-hidden />
              {t("thankYou.turnaround")}
            </p>
            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary underline-offset-4 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {t("thankYou.backHome")}
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter hideCta />
    </div>
  );
}
