import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import {
  ArrowRight,
  Sparkles,
  PhoneCall,
  TrendingUp,
  MousePointerClick,
  Clock,
  BarChart3,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { FaqSnippetSection } from "@/components/sections/faq-snippet-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { isValidUrlLang } from "@/i18n/languages";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage } from "@/lib/i18n-routing";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

const PAGE_PATH = "/case-studies";

export const Route = createFileRoute("/{-$lang}/case-studies")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params }) => {
    const { lang } = params;
    const st = getStaticTranslation(resolveRouteLanguage(params.lang), "caseStudies");

    return {
      meta: [
        { title: st?.meta?.title ?? "Case Studies — Dermatology Website Growth Results" },
        { name: "description", content: st?.meta?.description ?? "" },
        {
          name: "keywords",
          content: st?.meta?.keywords ?? "",
        },
        { property: "og:title", content: st?.meta?.og?.title ?? "" },
        { property: "og:description", content: st?.meta?.og?.description ?? "" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: PAGE_PATH },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: st?.meta?.twitter?.title ?? "" },
        { name: "twitter:description", content: st?.meta?.twitter?.description ?? "" },
        { property: "og:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: PAGE_PATH }, ...buildHreflangLinks(PAGE_PATH)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: st?.meta?.breadcrumb?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
              { "@type": "ListItem", position: 2, name: st?.meta?.breadcrumb?.caseStudies ?? "Case Studies", item: localizedUrl(resolveRouteLanguage(params.lang), "/case-studies") },
            ],
          }),
        },
      ],
    };
  },
  component: CaseStudiesPage,
});

const HERO_METRICS = [
  { icon: TrendingUp, key: "hero.metrics.0", hue: 155 },
  { icon: MousePointerClick, key: "hero.metrics.1", hue: 205 },
  { icon: Clock, key: "hero.metrics.2", hue: 35 },
  { icon: BarChart3, key: "hero.metrics.3", hue: 315 },
];

function CaseStudiesPage() {
  const { t } = useTranslation("caseStudies");

  return (
    <div className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <a href="#main" className="skip-to-content">
        {t("accessibility.skipToContent")}
      </a>
      <SiteHeader transparentOverHero />

      <main id="main">
        {/* ================= HERO ================= */}
        <section
          className="relative isolate overflow-hidden"
          style={{
            background: "radial-gradient(1200px 640px at 88% -10%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(900px 500px at -10% 100%, color-mix(in oklch, var(--brand-secondary), transparent 78%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 95%), #ffffff)",
          }}
        >
          {/* Animated orbs */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute -top-24 right-1/4 h-72 w-72 rounded-full blur-3xl opacity-40 animate-[pulse_8s_ease-in-out_infinite]"
              style={{
                background: "radial-gradient(closest-side, color-mix(in oklch, var(--brand-primary), transparent 55%), transparent)",
              }}
            />
            <div
              className="absolute left-[8%] top-1/2 h-64 w-64 rounded-full blur-3xl opacity-40 animate-[pulse_10s_ease-in-out_infinite_1s]"
              style={{
                background: "radial-gradient(closest-side, color-mix(in oklch, var(--brand-secondary), transparent 55%), transparent)",
              }}
            />
          </div>

          {/* Dot pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {t("hero.badge")}
              </div>

              <h1 className="mt-6 text-balance text-[2.25rem] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                <span className="relative inline-block">
                  <span className="relative z-10 text-brand-primary">{t("hero.title")}</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-sm opacity-40"
                    style={{
                      background: "linear-gradient(90deg, color-mix(in oklch, var(--brand-primary), transparent 60%), transparent)",
                    }}
                  />
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
                {t("hero.description")}
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                  }}
                >
                  {t("hero.actions.contact")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/free-dermatologist-website-audit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-background/70 px-7 py-3.5 text-sm font-semibold text-brand-primary backdrop-blur transition-colors hover:bg-brand-primary/5"
                >
                  <PhoneCall className="h-4 w-4" /> {t("hero.actions.audit")}
                </Link>
              </div>
            </div>

            {/* Metric cards */}
            <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
              {HERO_METRICS.map((m) => (
                <li
                  key={m.key}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_var(--cat)]"
                  style={
                    {
                      ["--cat" as string]: `oklch(0.62 0.14 ${m.hue})`,
                      ["--cat-soft" as string]: `oklch(0.62 0.14 ${m.hue} / 0.10)`,
                      ["--cat-border" as string]: `oklch(0.62 0.14 ${m.hue} / 0.28)`,
                      borderColor: "var(--cat-border)",
                    } as React.CSSProperties
                  }
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-70 transition-opacity group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(closest-side, color-mix(in oklch, var(--cat), transparent 70%), transparent)",
                    }}
                  />
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl"
                    style={{ background: "var(--cat-soft)", color: "var(--cat)" }}
                  >
                    <m.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-4 text-2xl font-black leading-none tabular-nums sm:text-3xl">
                    {t(`${m.key}.value`)}
                  </p>
                  <p className="mt-1.5 text-xs font-medium text-muted-foreground">{t(`${m.key}.label`)}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Curve divider */}
          <svg
            aria-hidden
            className="block w-full"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            style={{ height: 42 }}
          >
            <path
              d="M0,32 C240,60 480,0 720,20 C960,40 1200,60 1440,24 L1440,60 L0,60 Z"
              fill="var(--card)"
              opacity="0.6"
            />
          </svg>
        </section>

        {/* ================= CASE STUDIES ================= */}
        <CaseStudiesSection />

        {/* ================= FINAL CTA ================= */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl border border-border/60 p-8 sm:p-14"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 88%), color-mix(in oklch, var(--brand-secondary), transparent 88%))",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklch, var(--brand-primary), transparent 55%), transparent)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklch, var(--brand-secondary), transparent 55%), transparent)",
              }}
            />

            <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-background/70 px-3 py-1.5 text-xs font-semibold text-brand-primary backdrop-blur">
                  <TrendingUp className="h-3.5 w-3.5" /> {t("cta.badge")}
                </div>
                <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  {t("cta.title").split(" ").slice(0, 3).join(" ")}{" "}
                  <span className="text-brand-primary">{t("cta.title").split(" ").slice(3).join(" ")}</span>
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
                  {t("cta.description")}
                </p>

                <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary"
                      >
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      {t(`cta.features.${i}`)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:justify-center">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                  }}
                >
                  {t("cta.actions.start")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/free-dermatologist-website-audit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-background/80 px-7 py-3.5 text-sm font-semibold text-brand-primary backdrop-blur transition-colors hover:bg-brand-primary/5"
                >
                  <PhoneCall className="h-4 w-4" /> {t("cta.actions.audit")}
                </Link>
                <p className="text-center text-[11px] font-medium text-muted-foreground lg:mt-1">
                  {t("cta.disclaimer")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("navigation.footerPrompt")}{" "}
          <Link to="/dermatology-websites-portfolio" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("navigation.portfolioLink")}</Link>,{" "}
          <Link to="/our-process" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("navigation.processLink")}</Link>, {t("navigation.or")}{" "}
          <Link to="/plan-packages-and-costs" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("navigation.pricingLink")}</Link>.
        </p>

      <FaqSnippetSection />
      <SiteFooter />
    </div>
  );
}
