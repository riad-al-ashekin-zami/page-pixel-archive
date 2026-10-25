import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import {
  ArrowRight,
  Sparkles,
  PhoneCall,
  Star,
  ShieldCheck,
  Gauge,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import heroFront from "@/assets/derm-portfolio-hero-front.png";
import heroBack from "@/assets/derm-portfolio-hero-back.jpg";
import { PortfolioGallery } from "@/components/sections/portfolio-gallery";
import { isValidUrlLang } from "@/i18n/languages";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage, SITE_ORIGIN } from "@/lib/i18n-routing";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

const PAGE_PATH = "/dermatology-websites-portfolio";

export const Route = createFileRoute("/{-$lang}/dermatology-websites-portfolio")({
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
    const st = getStaticTranslation(resolveRouteLanguage(params.lang), "portfolio");
    const PAGE_TITLE = st?.meta?.title ?? "Our Work & Case Studies";
    const PAGE_DESCRIPTION = st?.meta?.description ?? "Browse our work, client results and case studies across cosmetic, medical and multi-location skin practices.";
    const pageUrl = localizedUrl(resolveRouteLanguage(lang), PAGE_PATH);
    const ogImage = heroFront.startsWith("http") ? heroFront : `${SITE_ORIGIN}${heroFront}`;

    return {
      meta: [
        { title: PAGE_TITLE },
        { name: "description", content: PAGE_DESCRIPTION },
        { property: "og:title", content: PAGE_TITLE },
        { property: "og:description", content: PAGE_DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: pageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: PAGE_TITLE },
        { name: "twitter:description", content: PAGE_DESCRIPTION },
        { property: "og:image", content: ogImage },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: pageUrl }, ...buildHreflangLinks(PAGE_PATH)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: st?.meta?.breadcrumb?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
              { "@type": "ListItem", position: 2, name: st?.meta?.breadcrumb?.portfolio ?? "Portfolio", item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-websites-portfolio") },
            ],
          }),
        },
      ],
    };
  },
  component: PortfolioPage,
});

function PortfolioPage() {
  const { t } = useTranslation("portfolio");

  return (
    <div className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <a href="#main" className="skip-to-content">
        {t("accessibility.skipToContent")}
      </a>
      <SiteHeader transparentOverHero />

      <main id="main">
        {/* ================= HERO ================= */}
        {/* TODO(owner): The hero case (Aventura Skin Studio, "+214% consult requests") is shown as a
            SAMPLE case study. Replace it with real client project data (name, screenshots, results)
            and add a separate "Our Client Work" section above the inspiration gallery.
            TODO(owner): verify the "50+ practices", "3.4x booking lift" and "Lighthouse 98" stats. */}
        <section
          className="relative isolate overflow-hidden"
          style={{
            background:
              "radial-gradient(1200px 640px at 88% -10%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(900px 500px at -10% 100%, color-mix(in oklch, var(--brand-secondary), transparent 78%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 95%), #ffffff)",
          }}
        >
          {/* Animated orbs */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute -top-24 left-1/4 h-72 w-72 rounded-full blur-3xl opacity-40 animate-[pulse_8s_ease-in-out_infinite]"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklch, var(--brand-primary), transparent 55%), transparent)",
              }}
            />
            <div
              className="absolute right-[10%] top-1/3 h-64 w-64 rounded-full blur-3xl opacity-40 animate-[pulse_10s_ease-in-out_infinite_1s]"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklch, var(--brand-secondary), transparent 55%), transparent)",
              }}
            />
          </div>

          {/* Grid pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {t("hero.badge")}
              </div>

              <h1 className="mt-6 text-balance text-[2.25rem] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                <span className="text-brand-primary">{t("hero.heading")}</span>
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                {t("hero.subheading")}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                  }}
                >
                  {t("hero.cta.start")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/free-dermatologist-website-audit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-background/70 px-7 py-3.5 text-sm font-semibold text-brand-primary backdrop-blur transition-colors hover:bg-brand-primary/5"
                >
                  <PhoneCall className="h-4 w-4" /> {t("hero.cta.audit")}
                </Link>
              </div>

              {/* Trust strip */}
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
                {[
                  { k: t("hero.stats.0.value"), v: t("hero.stats.0.label") },
                  { k: t("hero.stats.1.value"), v: t("hero.stats.1.label") },
                  { k: t("hero.stats.2.value"), v: t("hero.stats.2.label") },
                ].map((s) => (
                  <div key={s.v}>
                    <dt className="sr-only">{s.v}</dt>
                    <dd className="text-2xl font-black leading-none sm:text-3xl">{s.k}</dd>
                    <p className="mt-1.5 text-[11px] font-medium text-muted-foreground sm:text-xs">
                      {s.v}
                    </p>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right: layered preview cards */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] opacity-60 blur-3xl"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, color-mix(in oklch, var(--brand-primary), transparent 60%), color-mix(in oklch, var(--brand-secondary), transparent 60%), color-mix(in oklch, var(--brand-primary), transparent 60%))",
                }}
              />

              {/* Card back */}
              <div className="absolute right-0 top-4 hidden w-[70%] rotate-3 rounded-3xl border border-border/60 bg-card p-4 shadow-[0_28px_60px_-32px_color-mix(in_oklch,var(--brand-primary),transparent_55%)] sm:block">
                <img
                  src={heroBack}
                  alt={t("previews.backCard.imageAlt")}
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full rounded-2xl object-cover"
                />
                <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> {t("previews.backCard.tags.hipaa")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Gauge className="h-3 w-3" /> {t("previews.backCard.tags.performance")}
                  </span>
                </div>
              </div>

              {/* Card front */}
              <div className="relative -rotate-2 rounded-3xl border border-border/70 bg-card p-4 shadow-[0_36px_80px_-40px_color-mix(in_oklch,var(--brand-primary),transparent_50%)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                  <img
                    src={heroFront}
                    alt={t("previews.frontCard.imageAlt")}
                    width={1280}
                    height={800}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground">
                    {t("previews.frontCard.category")}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black">{t("previews.frontCard.practiceName")}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("previews.frontCard.result")}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-brand-primary">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />
                    ))}
                  </div>
                </div>
              </div>
            </div>
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

        {/* ================= LIVE PORTFOLIO GALLERY ================= */}
        <PortfolioGallery
          eyebrow={t("gallery.eyebrow")}
          heading={t("gallery.heading")}
          subheading={t("gallery.subheading")}
        />

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
                  <Sparkles className="h-3.5 w-3.5" /> {t("ctaSection.badge")}
                </div>
                <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  {t("ctaSection.heading")}
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
                  {t("ctaSection.description")}
                </p>

                <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {[
                    t("ctaSection.features.0"),
                    t("ctaSection.features.1"),
                    t("ctaSection.features.2"),
                    t("ctaSection.features.3"),
                  ].map((feature) => (
                    <li key={feature} className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary"
                      >
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:justify-center">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                  }}
                >
                  {t("ctaSection.buttons.start")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/free-dermatologist-website-audit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-background/80 px-7 py-3.5 text-sm font-semibold text-brand-primary backdrop-blur transition-colors hover:bg-brand-primary/5"
                >
                  <PhoneCall className="h-4 w-4" /> {t("ctaSection.buttons.audit")}
                </Link>
                <p className="text-center text-[11px] font-medium text-muted-foreground lg:mt-1">
                  {t("ctaSection.disclaimer")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footerLinks.text")}{" "}
          <Link to="/case-studies" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.caseStudies")}</Link>,{" "}
          <Link to="/our-process" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.process")}</Link>, {t("footerLinks.conjunctions.or")}{" "}
          <Link to="/plan-packages-and-costs" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.pricing")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}
