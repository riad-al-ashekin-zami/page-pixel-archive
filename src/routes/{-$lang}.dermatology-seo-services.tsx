import { finalizeSeoHead } from "@/lib/seo-head";
import {
  SeoDesignSections,
  ItemCards,
  ServiceBand,
  ServiceFaq,
  SampleReport,
  Commitments,
  LocalTrack,
} from "@/components/sections/service-page-design";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { CtaLabel } from "@/lib/cta";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks } from "@/lib/i18n-routing";

import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal } from "@/components/reveal";

import { ScrollProgress } from "@/components/scroll-progress";
import {
  ArrowRight,
  Search,
  MapPin,
  TrendingUp,
  FileSearch,
  Link2,
  Gauge,
  Target,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Plus,
  Minus,
  ShieldCheck,
  Globe,
  PenSquare,
  Star,
  LineChart,
  Award,
  ScanSearch,
  Stethoscope,
  Baby,
  Microscope,
} from "lucide-react";
import heroBg from "@/assets/dermatology-seo-hero.jpg";

import { isValidUrlLang } from "@/i18n/languages";
import { robotsContent } from "@/lib/index-allowlist";

const PILLARS_ICONS = [ScanSearch, MapPin, FileSearch, PenSquare, Link2, Gauge, Star, BarChart3];

const OUTCOMES_ICONS = [TrendingUp, Award, LineChart];

const WHY_US_ICONS = [ShieldCheck, Globe, Target, PenSquare, Link2, BarChart3];

export const Route = createFileRoute("/{-$lang}/dermatology-seo-services")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: (args) =>
    finalizeSeoHead(
      (({ params }: typeof args) => {
        const { lang } = params;
        const st = getStaticTranslation(lang, "seoServices");
        return {
          meta: [
            { name: "robots", content: robotsContent(params.lang, "/dermatology-seo-services") },
            {
              title:
                st?.meta?.title ?? "Dermatology SEO Services — Rank for Skin & Cosmetic Search",
            },
            {
              name: "description",
              content:
                st?.meta?.description ??
                "SEO built for dermatology practices: technical audits, on-page optimization, local map-pack rankings, condition and treatment content, and measurable patient-acquisition growth.",
            },
            {
              property: "og:title",
              content:
                st?.meta?.og_title ?? "Dermatology SEO Services — Rank for Skin & Cosmetic Search",
            },
            {
              property: "og:description",
              content:
                st?.meta?.og_description ??
                "Purpose-built SEO for dermatology clinics — rank for high-intent skin, cosmetic and medical dermatology searches in your city and fill your schedule with new patients.",
            },
            { property: "og:type", content: "website" },
            { property: "og:url", content: "/dermatology-seo-services" },

            { name: "twitter:card", content: "summary_large_image" },
            {
              name: "twitter:title",
              content:
                st?.meta?.twitter_title ??
                "Dermatology SEO Services — Rank for Skin & Cosmetic Search",
            },
            {
              name: "twitter:description",
              content:
                st?.meta?.twitter_description ??
                "SEO built for dermatology practices — rank locally, capture high-intent skin and cosmetic searches, and grow new-patient bookings.",
            },
          ],
          links: [
            {
              rel: "canonical",
              href: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-seo-services"),
            },
            ...buildHreflangLinks("/dermatology-seo-services", params.lang),
            { rel: "preload", as: "image", href: heroBg, fetchpriority: "high" },
          ],
          scripts: [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                serviceType: st?.jsonLd?.serviceType,
                provider: { "@type": "Organization", name: st?.jsonLd?.providerName },
                areaServed: st?.jsonLd?.areaServed,
                description: st?.jsonLd?.description,
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: (st?.faq?.items || []).map((f: any) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: st?.jsonLd?.breadcrumbs?.home,
                    item: localizedUrl(resolveRouteLanguage(params.lang), "/"),
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: st?.jsonLd?.breadcrumbs?.services,
                    item: localizedUrl(resolveRouteLanguage(params.lang), "/"),
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: st?.jsonLd?.breadcrumbs?.dermatology_seo,
                    item: localizedUrl(
                      resolveRouteLanguage(params.lang),
                      "/dermatology-seo-services",
                    ),
                  },
                ],
              }),
            },
          ],
        };
      })(args),
      args.params.lang,
      "/dermatology-seo-services",
    ),
  component: SeoServicesPage,
});

function SeoServicesPage() {
  const { t } = useTranslation("seoServices");

  return (
    <div className="service-page min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <SiteHeader />

      {/* HERO */}
      <section
        className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32"
        style={{
          background:
            "radial-gradient(1100px 550px at 90% -10%, color-mix(in oklch, var(--brand-accent), transparent 78%), transparent 60%), radial-gradient(800px 450px at -5% 105%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 60%), linear-gradient(180deg, var(--background), color-mix(in oklch, var(--brand-primary), transparent 96%))",
        }}
      >
        <img
          src={heroBg}
          alt=""
          aria-hidden
          width={1600}
          height={1200}
          fetchPriority="high"
          className="pointer-events-none absolute -right-[35%] -top-24 -z-10 w-[70%] max-w-[900px] opacity-40 mix-blend-multiply select-none sm:-right-[20%] sm:opacity-50 lg:-right-[10%] lg:top-0 lg:w-[55%] lg:opacity-55 dark:mix-blend-screen dark:opacity-30"
          style={{
            maskImage: "radial-gradient(ellipse at 70% 50%, black 40%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse at 70% 50%, black 40%, transparent 78%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] animate-hero-wash"
          style={{
            backgroundImage:
              "radial-gradient(600px 300px at 20% 20%, color-mix(in oklch, var(--brand-primary), transparent 88%), transparent 60%), radial-gradient(500px 260px at 80% 80%, color-mix(in oklch, var(--brand-accent), transparent 88%), transparent 60%), linear-gradient(to right, color-mix(in oklch, var(--brand-primary), transparent 92%) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--brand-primary), transparent 92%) 1px, transparent 1px)",
            backgroundSize: "120% 120%, 120% 120%, 56px 56px, 56px 56px",
            maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-3xl text-balance text-[2rem] font-bold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl md:text-[3.25rem] lg:text-[4rem]">
                {t("hero.title_start")}{" "}
                <span className="font-bold text-brand-primary">{t("hero.title_highlight")}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {t("hero.description")}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-lg shadow-brand-primary/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                >
                  <CtaLabel /> <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#pillars"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-brand-primary/40 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                >
                  {t("hero.cta_stack")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Live rank-climb ticker */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <SampleReport
                labels={[
                  t("pillars.items.1.title"),
                  t("pillars.items.2.title"),
                  t("pillars.items.7.title"),
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Commitments />
      <SeoDesignSections />

      <ServiceBand
        id="pillars"
        title={t("pillars.heading")}
        description={t("pillars.description")}
        eyebrow={t("pillars.badge")}
      >
        <div id="pillars">
          <ItemCards
            items={t("pillars.items", { returnObjects: true }) as { title: string; desc: string }[]}
            icons={PILLARS_ICONS}
            numbers
          />
        </div>
      </ServiceBand>
      <ServiceBand
        id="audiences"
        title={t("audiences.heading")}
        description={t("audiences.description")}
        eyebrow={t("audiences.badge")}
        tinted
      >
        <ItemCards
          items={(t("audiences.list", { returnObjects: true }) as string[]).map((title) => ({
            title,
          }))}
          icons={[Stethoscope, MapPin, Baby, Microscope]}
          accent
        />
      </ServiceBand>

      {/* WORKFLOW */}
      <section
        data-service-section="launch"
        className="relative py-20 sm:py-24 lg:py-28"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%), transparent)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {t("workflow.badge")}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t("workflow.heading")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("workflow.description")}</p>
            </div>
          </Reveal>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(t("workflow.phases", { returnObjects: true }) as any[]).map((w, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="group relative h-full overflow-hidden home-design-card p-6">
                  <span className="absolute right-4 top-4 text-5xl font-black leading-none text-brand-primary/10">
                    {w.step}
                  </span>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary">
                    {w.label}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <LocalTrack />
        </div>
      </section>

      <ServiceBand id="team" title={t("why_us.heading")} eyebrow={t("why_us.badge")}>
        <ItemCards
          items={t("why_us.items", { returnObjects: true }) as { title: string; desc: string }[]}
          icons={WHY_US_ICONS}
          columns={3}
        />
      </ServiceBand>
      <ServiceFaq
        items={t("faq.items", { returnObjects: true }) as { q: string; a: string }[]}
        title={t("faq.heading")}
      />

      {/* CTA */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-[32px] border border-brand-primary/20 p-10 sm:p-14"
            style={{
              background:
                "radial-gradient(600px 300px at 10% 0%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(500px 250px at 100% 100%, color-mix(in oklch, var(--brand-accent), transparent 80%), transparent 60%), var(--card)",
            }}
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  {t("cta_bottom.badge")}
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("cta_bottom.heading")}
                </h2>
                <p className="mt-4 text-muted-foreground">{t("cta_bottom.description")}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-lg shadow-brand-primary/25 transition-transform hover:-translate-y-0.5"
                >
                  <CtaLabel /> <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className="pointer-events-auto mx-3 mb-3 rounded-full border border-border/70 bg-background/95 py-3 pl-5 pr-2 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-sm font-semibold text-foreground">
              {t("sticky_cta.text")}
            </span>
          </div>
        </div>
      </div>
      <div className="h-20 md:hidden" aria-hidden />

      <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
        {t("footer_links.pre_text")}{" "}
        <Link
          to="/dermatology-seo-services"
          className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline"
        >
          {t("footer_links.local_seo")}
        </Link>
        ,{" "}
        <Link
          to="/blog/$slug"
          params={{ slug: "dermatology-marketing-strategies" }}
          className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline"
        >
          {t("footer_links.marketing_playbook")}
        </Link>
        , {t("common.or", { ns: "translation" })}{" "}
        <Link
          to="/dermatology-practice-growth"
          className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline"
        >
          {t("footer_links.practice_growth")}
        </Link>
        .
      </p>

      <SiteFooter />
    </div>
  );
}
