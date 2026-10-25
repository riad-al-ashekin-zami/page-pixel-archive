import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { buildHreflangLinks } from "@/lib/i18n-routing";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { SplitShadeField } from "@/components/hero-motifs";
import dermRedesignHero from "@/assets/derm-redesign-hero.jpg";
import dermPortfolio1 from "@/assets/derm-portfolio-1.jpg";
import dermPortfolio2 from "@/assets/derm-portfolio-2.jpg";
import dermPortfolio3 from "@/assets/derm-portfolio-3.jpg";
import dwMonogram from "@/assets/dw-monogram.webp.asset.json";

import dermBa1 from "@/assets/derm-portfolio-1.jpg";
import dermBa2 from "@/assets/derm-ba-2.jpg";
import {
  ArrowRight, CheckCircle2, Sparkles, Stethoscope, Building2, Baby, Scissors,
  ShieldCheck, Gauge, Search, Smartphone, Eye, Palette, RefreshCw, AlertTriangle,
  TrendingUp, Zap, BarChart3, Lock, Trophy, MessageSquare, Plus, Minus, Quote,
  Star, Timer, ArrowDown, ArrowUp, Flame, GitBranch, LineChart, Rocket,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { robotsContent } from "@/lib/index-allowlist";

export const Route = createFileRoute("/{-$lang}/dermatology-website-redesign")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params: { lang } }) => {
    const st = getStaticTranslation(lang, "websiteRedesign");
    return {
      meta: [
        { name: "robots", content: robotsContent(lang, "/dermatology-website-redesign") },
        { title: st?.meta?.title ?? "Dermatology Website Redesign — Modernize Without Losing SEO" },
        { name: "description", content: st?.meta?.description ?? "Premium dermatology website redesign for solo, multi-location, pediatric, and Mohs practices. Modern, fast, HIPAA-aware — with zero SEO loss on launch." },
        { property: "og:title", content: st?.meta?.og_title ?? "Dermatology Website Redesign — Zero SEO Loss" },
        { property: "og:description", content: st?.meta?.og_description ?? "Transform your outdated dermatology site into a fast, conversion-focused, HIPAA-aware experience. 301 redirects and SEO preserved." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-website-redesign" },
        { property: "og:image", content: dermRedesignHero },
        { name: "twitter:image", content: dermRedesignHero },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/dermatology-website-redesign" }, ...buildHreflangLinks("/dermatology-website-redesign", lang)],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", serviceType: st?.meta?.jsonLd?.serviceType, provider: { "@type": "Organization", name: st?.meta?.jsonLd?.providerName }, areaServed: "United States", offers: { "@type": "Offer", priceCurrency: "USD", price: "4900", description: st?.meta?.jsonLd?.offerDescription } }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [0, 1, 2, 3, 4].map((i) => ({ "@type": "Question", name: st?.faq?.items?.[i]?.q, acceptedAnswer: { "@type": "Answer", text: st?.faq?.items?.[i]?.a } })) }) },
      ],
    };
  },
  component: DermRedesignPage,
});

const audiences = [
  { icon: Stethoscope, i18nKey: "sections.audiences.items.0" },
  { icon: Building2, i18nKey: "sections.audiences.items.1" },
  { icon: Baby, i18nKey: "sections.audiences.items.2" },
  { icon: Scissors, i18nKey: "sections.audiences.items.3" },
];

const painSolutions = [
  { icon: Timer, i18nKey: "sections.painPoints.cards.0" },
  { icon: Smartphone, i18nKey: "sections.painPoints.cards.1" },
  { icon: Search, i18nKey: "sections.painPoints.cards.2" },
  { icon: AlertTriangle, i18nKey: "sections.painPoints.cards.3" },
  { icon: Lock, i18nKey: "sections.painPoints.cards.4" },
  { icon: TrendingUp, i18nKey: "sections.painPoints.cards.5" },
];

const gains = [
  { before: "> 4.0s", after: "< 1.2s", i18nKey: "sections.stats.items.0" },
  { before: "48", after: "98", i18nKey: "sections.stats.items.1" },
  { before: "1.8%", after: "6.4%", i18nKey: "sections.stats.items.2" },
  { before: "Page 3", after: "Top 3", i18nKey: "sections.stats.items.3" },
];

const pillars = [
  { icon: RefreshCw, i18nKey: "sections.pillars.items.0" },
  { icon: Palette, i18nKey: "sections.pillars.items.1" },
  { icon: Gauge, i18nKey: "sections.pillars.items.2" },
  { icon: ShieldCheck, i18nKey: "sections.pillars.items.3" },
  { icon: Smartphone, i18nKey: "sections.pillars.items.4" },
  { icon: Eye, i18nKey: "sections.pillars.items.5" },
];

const processSteps = [
  { step: "01", icon: Search, i18nKey: "sections.process.items.0" },
  { step: "02", icon: GitBranch, i18nKey: "sections.process.items.1" },
  { step: "03", icon: Palette, i18nKey: "sections.process.items.2" },
  { step: "04", icon: Rocket, i18nKey: "sections.process.items.3" },
];

const seoTimelineSteps = [
  { icon: Search, i18nKey: "sections.seoTimeline.steps.0" },
  { icon: GitBranch, i18nKey: "sections.seoTimeline.steps.1" },
  { icon: RefreshCw, i18nKey: "sections.seoTimeline.steps.2" },
  { icon: ShieldCheck, i18nKey: "sections.seoTimeline.steps.3" },
  { icon: LineChart, i18nKey: "sections.seoTimeline.steps.4" },
];

const trustLogos = ["MedSpa Times", "Derm Weekly", "Skin Health Today", "Clinic Growth", "Practice HQ"];

const portfolioItems = [
  { url: dermBa1, i18nKey: "sections.portfolio.items.0" },
  { url: dermBa2, i18nKey: "sections.portfolio.items.1" },
  { url: dermPortfolio3, i18nKey: "sections.portfolio.items.2" },
];

function DermRedesignPage() {
  const { t } = useTranslation("websiteRedesign");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "linear-gradient(115deg, color-mix(in oklch, var(--brand-primary), transparent 90%) 0%, transparent 45%, color-mix(in oklch, var(--brand-accent), transparent 88%) 100%), radial-gradient(900px 520px at 78% -18%, color-mix(in oklch, var(--brand-accent), transparent 76%), transparent 62%), radial-gradient(720px 480px at 12% 42%, color-mix(in oklch, var(--brand-primary), transparent 84%), transparent 58%)" }} />
        <SplitShadeField className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 text-brand-primary opacity-40 lg:block" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 md:pt-20 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
            <Reveal>
              <div className="mb-4 flex flex-col items-start gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
                  <Flame className="h-3.5 w-3.5 text-brand-accent" />
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
                  </span>
                  {t("hero.scarcityBadge")}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  <RefreshCw className="h-3.5 w-3.5" /> {t("hero.category")}
                </span>
              </div>
              <h1 className="mt-5 text-[2rem] font-black leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
                {t("hero.h1.main")}{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(120deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 55%))" }}>
                  {t("hero.h1.highlight")}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {t("hero.description")}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to="/contact" className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]">
                  {t("hero.cta.primary")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link to="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary">
                  {t("hero.cta.secondary")}
                </Link>
              </div>
              <div className="mt-6 flex items-baseline gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{t("hero.pricing.label")}</span>
                <span className="text-xl font-black text-brand-primary">{t("hero.pricing.value")}</span>
                <span>{t("hero.pricing.detail")}</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> {t(`hero.trustLabels.${i}`)}</span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} variant="scale">
              <BeforeAfterVisual />
            </Reveal>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-7xl px-4 pb-10 sm:px-6">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("hero.socialProof")}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-70">
            {trustLogos.map((l) => (<span key={l} className="text-sm font-bold tracking-tight text-muted-foreground">{l}</span>))}
          </div>
        </div>
      </section>

      {/* PAIN → SOLUTION FLIP */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.painPoints.overhead")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.painPoints.heading")}</h2>
            <p className="mt-3 text-muted-foreground">{t("sections.painPoints.description")}</p>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {painSolutions.map((p) => (
            <RevealItem key={p.i18nKey}><FlipCard icon={p.icon} pain={t(`${p.i18nKey}.pain`)} painStat={t(`${p.i18nKey}.painStat`)} solution={t(`${p.i18nKey}.solution`)} solutionStat={t(`${p.i18nKey}.solutionStat`)} /></RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* BEFORE/AFTER STATS */}
      <section className="relative py-24" style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), white 96%), transparent)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.stats.overhead")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.stats.heading")}</h2>
              <p className="mt-3 text-muted-foreground">{t("sections.stats.description")}</p>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gains.map((g) => (
              <RevealItem key={g.i18nKey} className="rounded-3xl border border-border/70 bg-card p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{t(`${g.i18nKey}.label`)}</div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">{t("sections.stats.labels.before")}</span>
                    <span className="mt-1 flex items-center gap-1 whitespace-nowrap text-base font-black text-destructive line-through decoration-destructive/40 md:text-lg">
                      <ArrowDown className="h-4 w-4 shrink-0" /> {g.before}
                    </span>
                  </div>
                  <ArrowRight className="mt-4 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase text-brand-primary">{t("sections.stats.labels.after")}</span>
                    <span className="mt-1 flex items-center gap-1 whitespace-nowrap text-base font-black text-brand-primary md:text-lg">
                      <ArrowUp className="h-4 w-4 shrink-0" /> {g.after}
                    </span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* SEO PRESERVATION TIMELINE */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.seoTimeline.overhead")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.seoTimeline.heading")}</h2>
            <p className="mt-3 text-muted-foreground">{t("sections.seoTimeline.description")}</p>
          </div>
        </Reveal>
        <div className="relative">
          <div aria-hidden className="absolute left-6 top-0 h-full w-px md:left-0 md:top-8 md:h-px md:w-full" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklch, var(--brand-primary), transparent 60%), transparent)" }} />
          <div className="grid gap-6 md:grid-cols-5">
            {seoTimelineSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="relative flex gap-4 md:flex-col md:gap-3">
                    <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-background bg-brand-primary text-brand-primary-foreground shadow-lg">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-primary">{t(`${s.i18nKey}.day`)}</div>
                      <div className="mt-1 text-sm font-semibold leading-snug">{t(`${s.i18nKey}.label`)}</div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.audiences.overhead")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.audiences.heading")}</h2>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <RevealItem key={a.i18nKey} className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_20px_50px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_50%)]">
                <span aria-hidden className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60" style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 60%)" }} />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="relative mt-4 text-lg font-bold">{t(`${a.i18nKey}.label`)}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${a.i18nKey}.desc`)}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      {/* PILLARS */}
      <section className="relative py-24" style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), white 96%), transparent)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.pillars.overhead")}</span>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.pillars.heading")}</h2>
              </div>
              <p className="max-w-md text-muted-foreground">{t("sections.pillars.description")}</p>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <RevealItem key={p.i18nKey} className="group relative rounded-3xl border border-border/70 bg-card p-7 transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-primary text-brand-primary-foreground shadow-md transition-transform group-hover:rotate-[-6deg] group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold">{t(`${p.i18nKey}.title`)}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(`${p.i18nKey}.desc`)}</p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* MEDICAL SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.services.overhead")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.services.heading")}</h2>
            <p className="mt-4 text-muted-foreground">{t("sections.services.description")}</p>
            <div className="mt-8 space-y-3">
              {[{ icon: Search, label: t("sections.services.features.0") }, { icon: RefreshCw, label: t("sections.services.features.1") }, { icon: Lock, label: t("sections.services.features.2") }, { icon: Zap, label: t("sections.services.features.3") }].map((f, idx) => {
                const Icon = f.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-primary/10 text-brand-primary"><Icon className="h-4 w-4" /></span>
                    <span className="text-sm font-medium">{f.label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((i) => (
                <li key={i} className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-card p-3 text-sm transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                  <span className="font-medium leading-snug">{t(`sections.services.list.${i}`)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PROCESS - connected timeline */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 96%))" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-14 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.process.overhead")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.process.heading")}</h2>
            </div>
          </Reveal>
          <div className="relative">
            <div aria-hidden className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), transparent 50%), transparent)" }} />
            <div className="space-y-8">
              {processSteps.map((p, i) => {
                const Icon = p.icon;
                const right = i % 2 === 1;
                return (
                  <Reveal key={p.step} delay={i * 0.06}>
                    <div className={`relative grid gap-4 md:grid-cols-2 md:gap-16`}>
                      <div aria-hidden className="absolute left-1/2 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background bg-brand-primary shadow-lg md:block" />
                      <div className={`${right ? "md:col-start-2" : ""}`}>
                        <div className="group relative rounded-3xl border border-border/70 bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-4xl font-black text-transparent" style={{ WebkitTextStroke: "1.2px color-mix(in oklch, var(--brand-primary), transparent 40%)" }}>{t(`${p.i18nKey}.step`)}</span>
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary transition-all group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                              <Icon className="h-4 w-4" />
                            </span>
                          </div>
                          <h3 className="mt-3 text-lg font-bold">{t(`${p.i18nKey}.title`)}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${p.i18nKey}.desc`)}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal>
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.portfolio.overhead")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.portfolio.heading")}</h2>
            </div>
            <Link to="/dermatology-websites-portfolio" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:gap-2">
              {t("sections.portfolio.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-6 md:grid-cols-3">
          {portfolioItems.map((p, i) => (
            <RevealItem key={i} className="group overflow-hidden rounded-3xl border border-border/70 bg-card transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.url} alt={t(`${p.i18nKey}.alt`)} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold">{t(`${p.i18nKey}.label`)}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{t(`${p.i18nKey}.meta`)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* TESTIMONIAL CAROUSEL */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <TestimonialCarousel />
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("faq.overhead")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("faq.heading")}</h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <FaqItem key={i} q={t(`faq.items.${i}.q`)} a={t(`faq.items.${i}.a`)} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* FOUNDER-SIGNED CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] p-8 md:p-14" style={{ background: "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 30%))" }}>
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-3xl" style={{ background: "var(--brand-accent)" }} />
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "22px 22px" }} />
            <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div className="text-brand-primary-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] backdrop-blur">
                  <Trophy className="h-3.5 w-3.5" /> {t("cta.overhead")}
                </span>
                <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">{t("cta.heading")}</h2>
                <p className="mt-3 max-w-xl opacity-90">{t("cta.description")}</p>

                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={dwMonogram.url}
                    alt={t("cta.logoAlt")}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white/50 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
                  />
                  <div>
                    <div className="text-base font-bold">{t("cta.providerName")}</div>
                    <div className="text-xs opacity-80">{t("cta.providerRole")}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link to="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3.5 text-sm font-bold text-foreground shadow-xl transition-transform hover:scale-[1.03]">
                  {t("cta.primary")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-brand-primary-foreground backdrop-blur transition-colors hover:bg-white/20">
                  <MessageSquare className="h-4 w-4" /> {t("cta.secondary")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("cta.footerLinksPrefix")}{" "}
          <Link to="/dermatology-website-migration" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("cta.footerLinks.migration")}</Link>,{" "}
          <Link to="/dermatology-website-maintenance-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("cta.footerLinks.maintenance")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/dermatology-websites-portfolio" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("cta.footerLinks.portfolio")}</Link>.
        </p>

      <SiteFooter />

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-3 z-40 mx-3 md:hidden">
        <Link to="/contact" className="flex items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3.5 text-sm font-bold text-brand-primary-foreground shadow-[0_16px_40px_-12px_color-mix(in_oklch,var(--brand-primary),transparent_30%)]">
          {t("cta.primary")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function FlipCard({ icon: Icon, pain, painStat, solution, solutionStat }: { icon: typeof Timer; pain: string; painStat: string; solution: string; solutionStat: string }) {
  const [flipped, setFlipped] = useState(false);
  const { t } = useTranslation("websiteRedesign");
  return (
    <div
      className="group relative h-32 [perspective:1000px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
    >
      <div className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
        {/* Front */}
        <div className="absolute inset-0 flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5 [backface-visibility:hidden]">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold">{pain}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{painStat}</div>
          </div>
          <RefreshCw className="h-4 w-4 shrink-0 text-muted-foreground opacity-60 group-hover:animate-spin" />
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex items-center gap-4 rounded-2xl border border-brand-primary/40 bg-brand-primary p-5 text-brand-primary-foreground shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/20">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold">{solution}</div>
            <div className="mt-0.5 text-xs opacity-90">{solutionStat}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCarousel() {
  const { t } = useTranslation("websiteRedesign");
  const [i, setI] = useState(0);

  const photos = [
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=240&h=240&fit=crop&crop=faces&auto=format&q=80",
    "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=240&h=240&fit=crop&crop=faces&auto=format&q=80",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=240&h=240&fit=crop&crop=faces&auto=format&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => setI((v) => (v + 1) % 3), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-8 md:p-14">
        <Quote aria-hidden className="absolute right-8 top-8 h-24 w-24 text-brand-primary/10" />
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-10"
          >
            <div className="relative shrink-0">
              <span aria-hidden className="absolute -inset-2 rounded-full opacity-70 blur-md" style={{ background: "conic-gradient(from 120deg, var(--brand-primary), var(--brand-accent), var(--brand-primary))" }} />
              <img src={photos[i]} alt={t(`testimonials.items.${i}.name`)} loading="lazy" className="relative h-24 w-24 rounded-full object-cover md:h-28 md:w-28" />
            </div>
            <div>
              <div className="flex gap-0.5 text-brand-accent">
                {Array.from({ length: 5 }).map((_, k) => (<span key={k}><Star className="h-4 w-4 fill-current" /></span>))}
              </div>
              <p className="mt-3 text-lg font-medium leading-relaxed md:text-xl">\"{t(`testimonials.items.${i}.quote`)}\"</p>
              <div className="mt-4 text-sm">
                <div className="font-bold">{t(`testimonials.items.${i}.name`)}</div>
                <div className="text-muted-foreground">{t(`testimonials.items.${i}.role`)}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex items-center gap-2">
          {[0, 1, 2].map((k) => (
            <button
              key={k}
              type="button"
              aria-label={`${t("testimonials.aria.button")} ${k + 1}`}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-brand-primary" : "w-1.5 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`overflow-hidden rounded-2xl border transition-colors ${open ? "border-brand-primary/40 bg-card" : "border-border/70 bg-card"}`}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="text-sm font-semibold md:text-base">{q}</span>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all ${open ? "rotate-180 bg-brand-primary text-brand-primary-foreground" : "bg-muted text-foreground"}`}>
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
        <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
      </motion.div>
    </div>
  );
}

function BeforeAfterVisual() {
  const { t } = useTranslation("websiteRedesign");
  const [pos, setPos] = useState(50);
  const [hasDragged, setHasDragged] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-2xl" style={{ background: "conic-gradient(from 120deg at 50% 50%, color-mix(in oklch, var(--brand-primary), transparent 60%), color-mix(in oklch, var(--brand-accent), transparent 65%), color-mix(in oklch, var(--brand-primary), transparent 60%))" }} />
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl">
        <div className="relative aspect-[4/3] select-none">
          <img src={dermRedesignHero} alt={t("hero.aria.compare")} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%`, background: "color-mix(in oklch, black, transparent 50%)" }} aria-hidden />
          <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:text-[10px]">{t("hero.badges.before")}</div>
          <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-brand-primary-foreground sm:right-4 sm:top-4 sm:px-3 sm:text-[10px]">{t("hero.badges.after")}</div>

          <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%`, transform: "translateX(-50%)" }} aria-hidden />

          <div className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${pos}%` }} aria-hidden>
            {!hasDragged && (
              <span className="absolute inset-0 -m-1 animate-ping rounded-full bg-brand-primary opacity-40" />
            )}
            <div className="relative grid h-11 w-11 place-items-center rounded-full border-2 border-white bg-brand-primary text-brand-primary-foreground shadow-xl">
              <RefreshCw className="h-5 w-5" />
            </div>
          </div>

          {!hasDragged && (
            <div className="pointer-events-none absolute top-[calc(50%+2rem)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-[10px] font-bold text-background shadow-lg animate-in fade-in">
              {t("hero.dragHint")}
            </div>
          )}

          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => { setPos(Number(e.target.value)); setHasDragged(true); }}
            aria-label={t("hero.aria.compare")}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="absolute ‑left-3 top-6 hidden rounded-2xl border border-border/70 bg-card p-3 shadow-xl sm:block">
        <div className="flex items-center gap-2 text-xs font-semibold"><Gauge className="h-4 w-4 text-brand-primary" /> {t("hero.badges.performance")}</div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="absolute ‑right-3 bottom-6 hidden rounded-2xl border border-border/70 bg-card p-3 shadow-xl sm:block">
        <div className="flex items-center gap-2 text-xs font-semibold"><TrendingUp className="h-4 w-4 text-brand-primary" /> {t("hero.badges.growth")}</div>
        <div className="mt-1 text-[11px] text-muted-foreground">{t("hero.badges.seo")}</div>
      </motion.div>
    </div>
  );
}
