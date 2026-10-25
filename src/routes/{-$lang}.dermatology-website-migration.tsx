import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage } from "@/lib/i18n-routing";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { DataStreamField } from "@/components/hero-motifs";
import { CountUp } from "@/components/count-up";
import dermMigrationHero from "@/assets/derm-migration-hero.jpg";
import dwMonogram from "@/assets/dw-monogram.webp.asset.json";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import {
  ArrowRight,
  ArrowRightLeft,
  CheckCircle2,
  ShieldCheck,
  Server,
  Gauge,
  Search,
  Smartphone,
  Stethoscope,
  Building2,
  Baby,
  Scissors,
  Database,
  Globe,
  Lock,
  Plug,
  RefreshCw,
  Timer,
  TrendingUp,
  Zap,
  FileCheck,
  Layers,
  Cloud,
  GitBranch,
  Star,
  Quote,
  Plus,
  Minus,
  Play,
  X,
  AlertTriangle,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { robotsContent } from "@/lib/index-allowlist";

export const Route = createFileRoute("/{-$lang}/dermatology-website-migration")({
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
    const st = getStaticTranslation(lang, "migration");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-website-migration") },
        { title: st?.meta?.title ?? "Dermatology Website Migration — Zero Downtime, Zero SEO Loss" },
        {
          name: "description",
          content: st?.meta?.description ?? "Premium dermatology website migration for solo, multi-location, pediatric, and Mohs practices. Move platforms, hosts, or CMS with zero downtime, 1:1 301 redirects, HIPAA-aware transfer, and preserved Google rankings.",
        },
        { property: "og:title", content: st?.meta?.ogTitle ?? "Dermatology Website Migration — Zero Downtime, Zero SEO Loss" },
        {
          property: "og:description",
          content: st?.meta?.ogDescription ?? "Migrate your dermatology website with zero downtime and no lost rankings. WordPress, Wix, Squarespace, Webflow, HubSpot — HIPAA-aware, fully redirected, monitored 90 days.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-website-migration" },
        { property: "og:image", content: dermMigrationHero },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: dermMigrationHero },
      ],
      links: [
        { rel: "canonical", href: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-website-migration") },
        ...buildHreflangLinks("/dermatology-website-migration", params.lang),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: st?.jsonLd?.serviceType ?? "Dermatology Website Migration",
            provider: { "@type": "Organization", name: st?.jsonLd?.provider ?? "DW Design" },
            areaServed: st?.jsonLd?.areaServed ?? "United States",
            audience: { "@type": "MedicalAudience", audienceType: st?.jsonLd?.audienceType ?? "Dermatology Practices" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "3900",
              description: st?.jsonLd?.offerDescription ?? "Dermatology website migration — starting price",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: (st?.faq?.items ?? []).map((f: any) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: DermMigrationPage,
});

const audiences = [
  { icon: Stethoscope, key: "audiences.items.0" },
  { icon: Building2, key: "audiences.items.1" },
  { icon: Baby, key: "audiences.items.2" },
  { icon: Scissors, key: "audiences.items.3" },
];

const pillars = [
  { icon: Timer, key: "pillars.items.0" },
  { icon: RefreshCw, key: "pillars.items.1" },
  { icon: ShieldCheck, key: "pillars.items.2" },
  { icon: Gauge, key: "pillars.items.3" },
  { icon: Search, key: "pillars.items.4" },
  { icon: Smartphone, key: "pillars.items.5" },
];

const gainsData = [
  { before: "Random", after: "1:1 mapped", key: "gains.labels.redirects" },
  { before: "Hours", after: "< 30s", key: "gains.labels.downtime" },
  { before: "-40%", after: "0%", key: "gains.labels.risk" },
  { before: "42", after: "98", key: "gains.labels.score" },
];

const migrationSteps = [
  { step: "01", key: "process.steps.0", icon: Search },
  { step: "02", key: "process.steps.1", icon: GitBranch },
  { step: "03", key: "process.steps.2", icon: Layers },
  { step: "04", key: "process.steps.3", icon: FileCheck },
  { step: "05", key: "process.steps.4", icon: Cloud },
  { step: "06", key: "process.steps.5", icon: TrendingUp },
];

const preservationChecklist = [
  { key: "checklist.items.0", icon: RefreshCw },
  { key: "checklist.items.1", icon: FileCheck },
  { key: "checklist.items.2", icon: Database },
  { key: "checklist.items.3", icon: Plug },
  { key: "checklist.items.4", icon: Layers },
  { key: "checklist.items.5", icon: Zap },
  { key: "checklist.items.6", icon: Globe },
  { key: "checklist.items.7", icon: Lock },
];

const platforms: { name: string; logo: React.ReactNode }[] = [
  { name: "WordPress", logo: <PlatformWordPress /> },
  { name: "Wix", logo: <PlatformWix /> },
  { name: "Squarespace", logo: <PlatformSquarespace /> },
  { name: "Webflow", logo: <PlatformWebflow /> },
  { name: "GoDaddy", logo: <PlatformGoDaddy /> },
  { name: "HubSpot", logo: <PlatformHubSpot /> },
  { name: "Duda", logo: <PlatformDuda /> },
  { name: "Drupal", logo: <PlatformDrupal /> },
  { name: "Joomla", logo: <PlatformJoomla /> },
  { name: "Custom / Legacy", logo: <PlatformCustom /> },
];

type Mark = boolean | "partial";
const comparisonRowKeys: { key: string; diy: Mark; other: Mark; dw: Mark }[] = [
  { key: "comparison.rows.downtime", diy: false, other: "partial", dw: true },
  { key: "comparison.rows.redirects", diy: false, other: "partial", dw: true },
  { key: "comparison.rows.hipaa", diy: false, other: false, dw: true },
  { key: "comparison.rows.schema", diy: false, other: "partial", dw: true },
  { key: "comparison.rows.monitoring", diy: false, other: false, dw: true },
  { key: "comparison.rows.lighthouse", diy: false, other: "partial", dw: true },
  { key: "comparison.rows.timeline", diy: false, other: "partial", dw: true },
];

function DermMigrationPage() {
  const { t } = useTranslation("migration");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 420px at 100% 5%, color-mix(in oklch, var(--brand-primary), transparent 74%), transparent 62%), radial-gradient(700px 600px at -8% 20%, color-mix(in oklch, var(--brand-accent), transparent 82%), transparent 58%), linear-gradient(90deg, color-mix(in oklch, var(--brand-primary), transparent 94%) 0%, transparent 30%, transparent 70%, color-mix(in oklch, var(--brand-accent), transparent 94%) 100%)",
          }}
        />
        <DataStreamField className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 text-brand-primary opacity-40 lg:block" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 md:pt-20 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
                <ArrowRightLeft className="h-3.5 w-3.5 text-brand-primary" />
                {t("hero.badge")}
              </span>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                {t("hero.heading")}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("hero.subheading")}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/get-a-free-quote"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 text-sm font-bold text-brand-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
                >
                  {t("hero.primaryCta")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/free-dermatologist-website-audit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary hover:text-brand-primary"
                >
                  {t("hero.secondaryCta")}
                </Link>
              </div>

              <dl className="mt-9 grid grid-cols-3 gap-6 border-t border-border/70 pt-6">
                <div>
                  <dt className="text-2xl font-black text-brand-primary md:text-3xl">
                    <DowntimeCountdown />
                  </dt>
                  <dd className="mt-1 text-xs font-medium text-muted-foreground">{t("hero.stats.downtimeLabel")}</dd>
                </div>
                <div>
                  <dt className="text-2xl font-black text-brand-primary md:text-3xl">100%</dt>
                  <dd className="mt-1 text-xs font-medium text-muted-foreground">{t("hero.stats.redirectLabel")}</dd>
                </div>
                <div>
                  <dt className="text-2xl font-black text-brand-primary md:text-3xl">0</dt>
                  <dd className="mt-1 text-xs font-medium text-muted-foreground">{t("hero.stats.rankingsLabel")}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal>
              <MigrationSimulator />
            </Reveal>
          </div>
        </div>
      </section>

      {/* LIVE PROOF BAND */}
      <section className="border-y border-border/70 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { k: "15", suffix: "+", label: t("liveProof.0.label") },
              { k: "0", suffix: "", label: t("liveProof.1.label") },
              { k: "27", suffix: "s", label: t("liveProof.2.label") },
              { k: "98", suffix: "/100", label: t("liveProof.3.label") },
            ].map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="text-3xl font-black tracking-tight text-brand-primary md:text-4xl">
                  <CountUp value={`${s.k}${s.suffix}`} />
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground md:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("audiences.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("audiences.heading")}
            </h2>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <RevealItem
                key={a.key}
                className="group rounded-2xl border border-border/70 bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl"
              >
                <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold">{t(`${a.key}.label`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(`${a.key}.desc`)}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      {/* PLATFORM LOGOS */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("platforms.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("platforms.heading")}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              {t("platforms.subheading")}
            </p>
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="group flex items-center gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted/60 text-foreground/80 transition-colors group-hover:bg-brand-primary/10 group-hover:text-brand-primary">
                {p.logo}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="text-[11px] font-medium text-brand-primary">{t("platforms.status")}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-y border-border/70 bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("pillars.badge")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("pillars.heading")}
              </h2>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <RevealItem
                  key={p.key}
                  className="rounded-2xl border border-border/70 bg-card p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-primary text-brand-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold">{t(`${p.key}.title`)}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(`${p.key}.desc`)}</p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* LIGHTHOUSE SCORE CARD */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("lighthouse.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("lighthouse.heading")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("lighthouse.description")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              {(t("lighthouse.tags", { returnObjects: true }) as any[]).map((tag: string) => (
                <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" /> {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <LighthouseScoreCard />
          </Reveal>
        </div>
      </section>

      {/* BEFORE/AFTER GAINS */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("gains.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("gains.heading")}
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gainsData.map((g) => (
            <div key={g.key} className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t(g.key)}</div>
              <div className="mt-4 flex items-center gap-3">
                <span className="rounded-lg bg-destructive/10 px-2.5 py-1 text-xs font-bold text-destructive line-through">
                  {g.before}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="rounded-lg bg-brand-primary/15 px-2.5 py-1 text-xs font-bold text-brand-primary">
                  {g.after}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MIGRATION PROCESS (6-step vertical) */}
      <section className="border-y border-border/70 bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("process.badge")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("process.heading")}
              </h2>
            </div>
          </Reveal>
          <div className="relative">
            <span aria-hidden className="absolute left-5 top-2 bottom-2 hidden w-px bg-border md:block" />
            <div className="space-y-6">
              {migrationSteps.map((s) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.step}>
                    <div className="relative flex gap-5 rounded-2xl border border-border/70 bg-card p-6 md:pl-16">
                      <span className="absolute left-0 top-6 hidden h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-brand-primary text-brand-primary-foreground md:grid">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary md:hidden">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold tracking-widest text-brand-primary">{s.step}</span>
                          <h3 className="text-base font-bold md:text-lg">{t(`${s.key}.title`)}</h3>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${s.key}.desc`)}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SEO PRESERVATION CHECKLIST */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("checklist.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("checklist.heading")}
            </h2>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {preservationChecklist.map((c) => {
            const Icon = c.icon;
            return (
              <RevealItem
                key={c.key}
                className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4"
              >
                <span className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-primary/10 text-brand-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium leading-snug">{t(c.key)}</span>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      {/* MEDICAL SERVICES COVERAGE */}
      <section className="border-y border-border/70 bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("services.badge")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("services.heading")}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                {t("services.description")}
              </p>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {(t("services.list", { returnObjects: true }) as any[]).map((s: string) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-semibold text-foreground"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("comparison.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("comparison.heading")}
            </h2>
          </div>
        </Reveal>
        <ComparisonTable />
      </section>

      {/* TESTIMONIAL + VIDEO STORY */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-border/70 bg-card p-8 md:p-10">
              <Quote aria-hidden className="absolute right-8 top-8 h-24 w-24 text-brand-primary/10" />
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <span
                    aria-hidden
                    className="absolute -inset-2 rounded-full opacity-70 blur-md"
                    style={{
                      background:
                        "conic-gradient(from 120deg, var(--brand-primary), var(--brand-accent), var(--brand-primary))",
                    }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=240&h=240&fit=crop&crop=faces&auto=format&q=80"
                    alt={t("testimonial.author")}
                    loading="lazy"
                    className="relative h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
                  />
                </div>
                <div>
                  <div className="flex gap-0.5 text-brand-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <div className="mt-1 text-sm font-bold">{t("testimonial.author")}</div>
                  <div className="text-xs text-muted-foreground">{t("testimonial.role")}</div>
                </div>
              </div>
              <p className="mt-6 text-lg font-medium leading-relaxed md:text-xl">
                "{t("testimonial.quote")}"
              </p>
            </div>
          </Reveal>
          <Reveal>
            <VideoTestimonial />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("faq.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("faq.heading")}
            </h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {(t("faq.items", { returnObjects: true }) as any[]).map((f: any, i: number) => (
            <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* FOUNDER-SIGNED CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] p-8 md:p-14"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 30%))",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--brand-accent)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "22px 22px" }}
            />
            <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div className="text-brand-primary-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] backdrop-blur">
                  <ArrowRightLeft className="h-3.5 w-3.5" /> {t("cta.badge")}
                </span>
                <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
                  {t("cta.heading")}
                </h2>
                <p className="mt-3 max-w-xl opacity-90">
                  {t("cta.subheading")}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={dwMonogram.url}
                    alt={t("cta.altImg")}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white/50 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
                  />
                  <div className="text-brand-primary-foreground">
                    <div className="text-base font-bold">{t("cta.footerName")}</div>
                    <div className="text-xs opacity-80">{t("cta.footerTag")}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link
                  to="/get-a-free-quote"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3.5 text-sm font-bold text-foreground shadow-xl transition-transform hover:scale-[1.03]"
                >
                  {t("cta.primaryLink")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-brand-primary-foreground backdrop-blur transition-colors hover:bg-white/20"
                >
                  {t("cta.secondaryLink")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footerLinks.preface")}{" "}
          <Link to="/dermatology-website-redesign" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.redesign")}</Link>,{" "}
          <Link to="/dermatology-website-management-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.management")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/plan-packages-and-costs" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.costs")}</Link>.
        </p>

      <SiteFooter />

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-3 z-40 mx-3 md:hidden">
        <Link
          to="/get-a-free-quote"
          className="flex items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3.5 text-sm font-bold text-brand-primary-foreground shadow-[0_16px_40px_-12px_color-mix(in_oklch,var(--brand-primary),transparent_30%)]"
        >
          {t("hero.primaryCta")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/* ============================================================
   MIGRATION SIMULATOR — hero interactive
   ============================================================ */

function MigrationSimulator() {
  const { t } = useTranslation("migration");
  const [url, setUrl] = useState("");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const domain = useMemo(() => {
    const clean = url.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
    return clean || "your-clinic.com";
  }, [url]);

  const samplePaths = useMemo(
    () => [
      "/services/acne-treatment",
      "/about",
      "/contact",
      "/blog/skin-cancer-signs",
      "/team/dr-smith",
    ],
    [],
  );

  useEffect(() => {
    if (!running) return;
    setStep(0);
    timerRef.current = setInterval(() => {
      setStep((s) => {
        if (s >= samplePaths.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          return s;
        }
        return s + 1;
      });
    }, 550);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, samplePaths.length]);

  const handleRun = (e: React.FormEvent) => {
    e.preventDefault();
    setRunning(true);
  };

  const done = step >= samplePaths.length;

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[2.5rem] opacity-70 blur-3xl"
        style={{
          background:
            "conic-gradient(from 200deg, color-mix(in oklch, var(--brand-primary), transparent 70%), color-mix(in oklch, var(--brand-accent), transparent 70%), color-mix(in oklch, var(--brand-primary), transparent 70%))",
        }}
      />
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border/70 bg-muted/50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-accent/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-primary/70" />
          <span className="ml-3 truncate text-[11px] font-mono text-muted-foreground">
            migration-simulator · {domain}
          </span>
        </div>

        <div className="p-5 md:p-6">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
            {t("simulator.badge")}
          </div>
          <h3 className="text-lg font-black leading-tight md:text-xl">
            {t("simulator.heading")}
          </h3>

          <form onSubmit={handleRun} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="sim-url" className="sr-only">{t("simulator.srLabel")}</label>
            <input
              id="sim-url"
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setRunning(false); }}
              placeholder={t("simulator.inputPlaceholder")}
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-3 text-sm font-medium outline-none placeholder:text-muted-foreground focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-bold text-brand-primary-foreground transition-transform hover:scale-[1.02]"
            >
              {t("simulator.buttonLabel")} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* redirect map */}
          <div className="mt-5 space-y-2 rounded-2xl border border-dashed border-border/80 bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span>{t("simulator.headers.old")}</span>
              <span>{t("simulator.headers.action")}</span>
              <span>{t("simulator.headers.new")}</span>
            </div>
            {samplePaths.map((path, i) => {
              const active = running && i < step;
              return (
                <div
                  key={path}
                  className={`grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg border px-2.5 py-2 font-mono text-[11px] transition-all sm:text-xs ${
                    active
                      ? "border-brand-primary/30 bg-brand-primary/5"
                      : "border-transparent bg-background/60 opacity-60"
                  }`}
                >
                  <span className="truncate text-muted-foreground">
                    old.{domain}{path}
                  </span>
                  <ArrowRight className={`h-3.5 w-3.5 shrink-0 ${active ? "text-brand-primary" : "text-muted-foreground/50"}`} />
                  <span className="truncate text-foreground">
                    {domain}{path}
                    {active && <CheckCircle2 className="ml-1 inline h-3 w-3 text-brand-primary" />}
                  </span>
                </div>
              );
            })}
          </div>

          {done && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-brand-primary/30 bg-brand-primary/10 px-4 py-3 text-xs font-semibold text-brand-primary">
              <CheckCircle2 className="h-4 w-4" />
              {t("simulator.result")}
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute -left-3 top-6 hidden rounded-2xl border border-border/70 bg-card p-3 shadow-xl sm:block"
      >
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Server className="h-4 w-4 text-brand-primary" /> {t("simulator.floatingOne")}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="absolute -right-3 bottom-6 hidden rounded-2xl border border-border/70 bg-card p-3 shadow-xl sm:block"
      >
        <div className="flex items-center gap-2 text-xs font-semibold">
          <TrendingUp className="h-4 w-4 text-brand-primary" /> {t("simulator.floatingTwo.rankings")}
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground">{t("simulator.floatingTwo.audit")}</div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   DOWNTIME COUNTDOWN — micro-animation
   ============================================================ */

function DowntimeCountdown() {
  const [n, setN] = useState(30);
  useEffect(() => {
    const id = setInterval(() => {
      setN((v) => (v <= 1 ? 30 : v - 1));
    }, 120);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums">
      &lt;&nbsp;{n}s
    </span>
  );
}

/* ============================================================
   LIGHTHOUSE SCORE CARD
   ============================================================ */

function LighthouseScoreCard() {
  const { t } = useTranslation("migration");
  const scores = [
    { label: t("lighthouse.ui.labels.performance"), value: 98 },
    { label: t("lighthouse.ui.labels.accessibility"), value: 100 },
    { label: t("lighthouse.ui.labels.bestPractices"), value: 100 },
    { label: t("lighthouse.ui.labels.seo"), value: 100 },
  ];
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-6 shadow-xl md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Gauge className="h-4 w-4 text-brand-primary" /> {t("lighthouse.ui.title")}
        </div>
        <div className="text-[11px] font-mono text-muted-foreground">{t("lighthouse.ui.subtitle")}</div>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {scores.map((s) => (
          <ScoreRing key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/70 pt-5 text-xs">
        <MetricPill label="LCP" value="1.1s" />
        <MetricPill label="CLS" value="0.02" />
        <MetricPill label="TBT" value="40ms" />
      </div>
    </div>
  );
}

function ScoreRing({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / 1400);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(value * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  const pct = display;
  const circumference = 2 * Math.PI * 30;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 70 70" className="h-full w-full -rotate-90">
          <circle cx="35" cy="35" r="30" stroke="currentColor" strokeWidth="5" fill="none" className="text-muted/40" />
          <circle
            cx="35" cy="35" r="30" fill="none"
            stroke="currentColor" strokeWidth="5" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-brand-primary transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-xl font-black tabular-nums">{display}</span>
        </div>
      </div>
      <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-center">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-black text-brand-primary">{value}</div>
    </div>
  );
}

/* ============================================================
   COMPARISON TABLE
   ============================================================ */

function ComparisonTable() {
  const { t } = useTranslation("migration");
  return (
    <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-sm">
      <div className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] items-center gap-3 border-b border-border/70 bg-muted/40 px-4 py-4 text-xs font-bold uppercase tracking-wider sm:px-6">
        <div>{t("comparison.headers.label")}</div>
        <div className="text-center text-muted-foreground">{t("comparison.headers.diy")}</div>
        <div className="text-center text-muted-foreground">{t("comparison.headers.generalist")}</div>
        <div className="text-center text-brand-primary">{t("comparison.headers.dw")}</div>
      </div>
      {comparisonRowKeys.map((r, i) => (
        <div
          key={r.key}
          className={`grid grid-cols-[1.4fr_1fr_1fr_1.2fr] items-center gap-3 px-4 py-3.5 text-sm sm:px-6 ${
            i % 2 === 0 ? "bg-background" : "bg-muted/20"
          }`}
        >
          <div className="font-semibold">{t(r.key)}</div>
          <CellMark v={r.diy} />
          <CellMark v={r.other} />
          <CellMark v={r.dw} highlight />
        </div>
      ))}
    </div>
  );
}

function CellMark({ v, highlight = false }: { v: boolean | "partial"; highlight?: boolean }) {
  if (v === true) {
    return (
      <div className="flex justify-center">
        <span className={`inline-grid h-8 w-8 place-items-center rounded-full ${highlight ? "bg-brand-primary text-brand-primary-foreground" : "bg-brand-primary/15 text-brand-primary"}`}>
          <CheckCircle2 className="h-4 w-4" />
        </span>
      </div>
    );
  }
  if (v === "partial") {
    return (
      <div className="flex justify-center">
        <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-brand-accent/15 text-brand-accent">
          <AlertTriangle className="h-4 w-4" />
        </span>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-destructive/10 text-destructive">
        <X className="h-4 w-4" />
      </span>
    </div>
  );
}

/* ============================================================
   VIDEO TESTIMONIAL — Loom-style thumbnail
   ============================================================ */

function VideoTestimonial() {
  const { t } = useTranslation("migration");
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative h-full overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-brand-primary/95 to-brand-primary p-6 text-brand-primary-foreground md:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--brand-accent)" }}
      />
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] opacity-90">
        <Play className="h-3.5 w-3.5 fill-current" /> {t("testimonial.video.badge")}
      </div>
      <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
        "{t("testimonial.video.heading")}"
      </h3>

      <button
        type="button"
        onClick={() => setPlaying((v) => !v)}
        className="group relative mt-6 block w-full overflow-hidden rounded-2xl border border-white/20 bg-black/40"
        aria-label={t("testimonial.video.ariaLabel")}
      >
        <div className="relative aspect-video w-full">
          {/* placeholder frame */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=450&fit=crop&auto=format&q=80') center/cover",
            }}
          />
          {/* pulsing play button */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand-primary shadow-[0_0_0_0_rgba(255,255,255,0.6)] transition-transform group-hover:scale-110"
            style={{
              animation: playing ? "none" : "vidPulse 2s ease-out infinite",
            }}
          >
            <Play className="h-7 w-7 translate-x-0.5 fill-current" />
          </span>
          <style>{`
            @keyframes vidPulse {
              0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.55); }
              70%  { box-shadow: 0 0 0 22px rgba(255,255,255,0); }
              100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
            }
          `}</style>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-t from-black/70 to-transparent px-4 py-3 text-xs">
            <span className="font-semibold">{t("testimonial.video.authorFooter")}</span>
            <span className="opacity-80">{t("testimonial.video.titleFooter")}</span>
          </div>
        </div>
      </button>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-xl bg-white/10 px-2 py-2.5 backdrop-blur">
          <div className="text-lg font-black">{t("testimonial.video.stats.timeline")}</div>
          <div className="opacity-80">{t("testimonial.video.stats.timelineLabel")}</div>
        </div>
        <div className="rounded-xl bg-white/10 px-2 py-2.5 backdrop-blur">
          <div className="text-lg font-black">{t("testimonial.video.stats.traffic")}</div>
          <div className="opacity-80">{t("testimonial.video.stats.trafficLabel")}</div>
        </div>
        <div className="rounded-xl bg-white/10 px-2 py-2.5 backdrop-blur">
          <div className="text-lg font-black">{t("testimonial.video.stats.links")}</div>
          <div className="opacity-80">{t("testimonial.video.stats.linksLabel")}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FAQ ITEM
   ============================================================ */

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useMemo(() => `faq-${q.replace(/\W+/g, "-").toLowerCase()}`, [q]);
  return (
    <div className="rounded-2xl border border-border/70 bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-bold md:text-base">{q}</span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      {open && (
        <div id={id} className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
          {a}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   PLATFORM LOGOS — simplified brand marks (inline SVG)
   ============================================================ */

function PlatformWordPress() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 1.4a8.6 8.6 0 018.5 7.4l-2.6 7-3.5-10.5 1.4-.1c.4 0 .4-.6 0-.6l-4.7.2c-.4 0-.4.6 0 .6l1.3.1 1.9 5-2.7 8-4.5-13 1.4-.1c.4 0 .4-.6 0-.6l-4-.2A8.6 8.6 0 0112 3.4zm-8.6 8.6c0-1.2.3-2.4.7-3.4l4.8 13.2A8.6 8.6 0 013.4 12zm14.9 7.6L21 12.7c.4-1.1.5-2 .5-2.8l.3 2.1a8.6 8.6 0 01-3.5 7.6z" />
    </svg>
  );
}
function PlatformWix() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l3 8 3-6 3 6 3-8" /><path d="M17 8l4 8" /><path d="M21 8l-4 8" />
    </svg>
  );
}
function PlatformSquarespace() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 12l6-6a4 4 0 015.7 5.7L10 17.4" /><path d="M20 12l-6 6a4 4 0 01-5.7-5.7L14 6.6" />
    </svg>
  );
}
function PlatformWebflow() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M4 6l3 12 3.5-8 2 8L17 6h-2.5l-2.2 6L10 6H7.5l-.8 6L4 6z" />
    </svg>
  );
}
function PlatformGoDaddy() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-4 0-7 3-7 7v11h4v-8a3 3 0 016 0v8h4V10c0-4-3-7-7-7z" />
    </svg>
  );
}
function PlatformHubSpot() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="17" cy="15" r="4" /><path d="M17 11V6" /><circle cx="17" cy="4" r="1.5" fill="currentColor" /><path d="M14 15L6 9" /><circle cx="5" cy="8" r="2" fill="currentColor" />
    </svg>
  );
}
function PlatformDuda() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M4 4v16h6a8 8 0 000-16H4zm3 3h3a5 5 0 010 10H7V7z" />
    </svg>
  );
}
function PlatformDrupal() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
      <path d="M12 2S5 9 5 14a7 7 0 0014 0c0-5-7-12-7-12zm0 18a5 5 0 01-5-5c0-3 3-6 5-8 2 2 5 5 5 8a5 5 0 01-5 5z" />
    </svg>
  );
}
function PlatformJoomla() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M6 8v8M18 8v8M8 6h8M8 18h8" />
    </svg>
  );
}
function PlatformCustom() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 5l-5 7 5 7M16 5l5 7-5 7M14 4l-4 16" />
    </svg>
  );
}
