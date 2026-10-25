import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { CtaLabel } from "@/lib/cta";
import { buildHreflangLinks } from "@/lib/i18n-routing";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { DataStreamField } from "@/components/hero-motifs";
import { CountUp } from "@/components/count-up";

import croHero from "@/assets/derm-cro-hero.jpg";
import {
  ArrowRight, CheckCircle2, TrendingUp, MousePointerClick, Target, Gauge,
  LineChart, Sparkles, ShieldCheck,
  Stethoscope, Building2, Baby, Scissors, Plus, Minus, Quote, Star,
  Eye, FlaskConical, FormInput, Calendar, Smartphone,
  Route as RouteIcon, ClipboardCheck, Search,
  Percent, Users, ArrowUpRight, MessageSquare, Play, X,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { robotsContent } from "@/lib/index-allowlist";

const AUDIENCE_ICONS = [Stethoscope, Building2, Baby, Scissors];

const STATS_CONFIG = [
  { prefix: "+", num: "184%", suffix: undefined, static: false, key: "lift" },
  { prefix: "−", num: "41%", suffix: undefined, static: false, key: "abandonment" },
  { prefix: "", num: "3.9×", suffix: undefined, static: true, key: "roas" },
  { prefix: "", num: "12", suffix: " wk", static: false, key: "wins" },
];

const PILLAR_ICONS = [Eye, FlaskConical, FormInput, RouteIcon, Smartphone, Gauge];

const FLOW_ICONS = [Search, ClipboardCheck, FlaskConical, TrendingUp];

const EXPERIMENT_LIFTS = ["+38%", "+61%", "+27%", "+22%", "+44%", "+31%"];

const TESTIMONIAL_STARS = [5, 5, 5];

const PRICING_EXTRA = [
  { highlight: false, market: "$3,500 – $7,500" },
  { highlight: true, market: "$6,000 – $12,000 /mo" },
  { highlight: false, market: "$12,000 – $25,000 /mo" },
];

export const Route = createFileRoute("/{-$lang}/dermatology-conversion-rate-optimization")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params }) => {
    const st = getStaticTranslation(params.lang, "cro");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-conversion-rate-optimization") },
        { title: st?.meta?.title ?? "Dermatology CRO Services — Double Your Bookings From The Same Traffic" },
        { name: "description", content: st?.meta?.description ?? "Conversion rate optimization for dermatology practices. Heatmaps, A/B testing, booking-form rebuilds, mobile UX, and Core Web Vitals — turn more visitors into confirmed appointments. HIPAA-aware." },
        { property: "og:title", content: st?.meta?.og_title ?? "Dermatology Conversion Rate Optimization — Ship More Bookings, Same Traffic" },
        { property: "og:description", content: st?.meta?.og_description ?? "Behavioral research, A/B testing, funnel optimization, and mobile-first rebuilds for dermatology practices. Measurable lift in 90 days — HIPAA-aware, month-to-month." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-conversion-rate-optimization" },
        { property: "og:image", content: croHero },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:image", content: croHero },
      ],
      links: [
        { rel: "canonical", href: "/dermatology-conversion-rate-optimization" }, ...buildHreflangLinks("/dermatology-conversion-rate-optimization", params.lang),
        { rel: "preload", as: "image", href: croHero, fetchpriority: "high" },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", serviceType: st?.meta?.jsonLd?.serviceType ?? "Dermatology Conversion Rate Optimization", provider: { "@type": "Organization", name: st?.meta?.jsonLd?.provider ?? "DermatologyWebsiteDesign.com" }, areaServed: "United States", offers: { "@type": "Offer", priceCurrency: "USD", price: "1900", description: st?.meta?.jsonLd?.offerDescription ?? "Dermatology CRO diagnostic — starting price" } }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: (st?.faq?.items || []).map((f: any) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: CROPage,
});

function CROPage() {
  const { t } = useTranslation("cro");

  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground pb-20 md:pb-0">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 500px at 12% -10%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(1000px 500px at 100% 15%, color-mix(in oklch, var(--brand-accent), transparent 82%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%) 0%, transparent 45%)",
          }}
        />
        <DataStreamField className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 text-brand-primary opacity-25 lg:block" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 md:pt-20 lg:pt-24">
          <div className="grid gap-10 xl:grid-cols-[1.05fr_1fr] xl:items-center xl:gap-14">
            <Reveal>
              <div className="mb-4 flex flex-col items-start gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-brand-accent" />
                  <span>{t("hero.badge_lift")}</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  <Target className="h-3.5 w-3.5" /> {t("hero.badge_service")}
                </span>
              </div>
              <h1 className="mt-5 text-[2rem] font-black leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
                {t("hero.title_main")}{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 55%))",
                  }}
                >
                  {t("hero.title_highlight")}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {t("hero.description")}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]"
                >
                  <CtaLabel /> <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="mt-6 flex items-baseline gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{t("hero.pricing_note")}</span>
                <span className="text-xl font-black text-brand-primary">{t("hero.pricing_value")}</span>
                <span>{t("hero.pricing_ongoing")}</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                {(t("hero.ticks", { returnObjects: true }) as string[]).map((tick, i) => (
                  <span key={tick} className={`flex items-center gap-1.5 ${i === 3 ? "hidden sm:flex" : ""}`}>
                    <CheckCircle2 className="h-4 w-4 text-brand-primary" /> {tick}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} variant="scale">
              <FunnelPanel />
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {STATS_CONFIG.map((s) => (
            <div key={s.key} className="text-center sm:text-left">
              <div className="text-3xl font-black tracking-tight text-brand-primary md:text-4xl">
                {s.prefix}
                {s.static ? s.num : <CountUp value={s.num} />}
                {s.suffix ?? ""}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{t(`stats.${s.key}`)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAR */}
      <section aria-label="Trusted by" className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            {t("trust.label")}
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-6">
            {(t("trust.logos", { returnObjects: true }) as string[]).map((name) => (
              <div
                key={name}
                className="flex items-center justify-center text-center text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/80 opacity-70 transition-opacity hover:opacity-100 sm:text-xs"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 md:pt-20">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("pillars.label")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("pillars.heading")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("pillars.description")}
            </p>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {(t("pillars.items", { returnObjects: true }) as any[]).map((p, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <RevealItem
                key={p.name}
                className="group rounded-3xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-brand-primary/15 bg-brand-primary/5 text-brand-primary transition-all group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground">
                    {p.meta}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      {/* EXPERIMENTS TABLE */}
      <section className="relative mt-20 py-20 md:py-24" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 97%))" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("experiments.label")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("experiments.heading")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("experiments.description")}
              </p>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-4">
            {(t("experiments.items", { returnObjects: true }) as any[]).map((e, i) => (
              <RevealItem
                key={e.label}
                className="rounded-2xl border border-border/70 bg-card p-5"
              >
                {/* Header row: label + lift */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t("experiments.table_header")}</div>
                    <div className="mt-1 text-base font-bold tracking-tight sm:text-lg">{e.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{e.metric}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-brand-primary/10 px-3 py-1.5 text-lg font-black tracking-tight text-brand-primary sm:text-xl md:text-2xl">
                    <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    {EXPERIMENT_LIFTS[i]}
                  </div>
                </div>
                {/* Before / After */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-muted/30 px-3 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("experiments.before_label")}</div>
                    <div className="mt-0.5 text-sm text-foreground/80 line-through decoration-muted-foreground/50">{e.before}</div>
                  </div>
                  <div className="rounded-xl border border-brand-primary/25 bg-brand-primary/5 px-3 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">{t("experiments.after_label")}</div>
                    <div className="mt-0.5 text-sm font-semibold text-foreground">{e.after}</div>
                  </div>
                </div>
              </RevealItem>
            ))}

          </RevealStagger>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("caseStudy.label")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("caseStudy.heading").split("180%")[0]}<span className="text-brand-primary">180% {t("caseStudy.heading").split("180%")[1]}</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_30px_80px_-40px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]">
              <img
                src={croHero}
                alt={t("caseStudy.image_alt")}
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 rounded-2xl border border-border/60 bg-background/85 p-3 backdrop-blur md:inset-x-6 md:bottom-6">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("caseStudy.stats.bookings")}</div>
                  <div className="mt-0.5 text-lg font-black text-brand-primary md:text-xl">40 → 112</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("caseStudy.stats.completion")}</div>
                  <div className="mt-0.5 text-lg font-black text-brand-primary md:text-xl">34 → 71%</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("caseStudy.stats.time")}</div>
                  <div className="mt-0.5 text-lg font-black text-brand-primary md:text-xl">11 → 4 days</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4">
              {(t("caseStudy.comparison", { returnObjects: true }) as any[]).map((row) => (
                <div key={row.label} className="rounded-2xl border border-border/70 bg-card p-4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">{row.label}</div>
                  <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70" />
                      <span className="line-through decoration-muted-foreground/40">{row.before}</span>
                    </div>
                    <div className="flex items-start gap-2 text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                      <span className="font-medium">{row.after}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Link
                to="/contact"
                className="mt-2 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
              >
                <CtaLabel /> <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("process.label")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("process.heading")}
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(t("process.steps", { returnObjects: true }) as any[]).map((f, i) => {
            const Icon = FLOW_ICONS[i];
            return (
              <Reveal key={f.step} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-border/70 bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-widest text-muted-foreground">{f.step}</span>
                    <Icon className="h-5 w-5 text-brand-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 96%))" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("audiences.label")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("audiences.heading")}
              </h2>
              <p className="mt-3 text-muted-foreground">{t("audiences.description")}</p>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(t("audiences.items", { returnObjects: true }) as any[]).map((a, i) => {
              const Icon = AUDIENCE_ICONS[i];
              return (
                <RevealItem key={a.label} className="rounded-3xl border border-border/70 bg-card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-accent/15 text-brand-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{a.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* MEDICAL SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("services.label")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("services.heading")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("services.description")}
            </p>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {(t("services.list", { returnObjects: true }) as string[]).map((s) => (
            <RevealItem
              key={s}
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3 transition-colors hover:border-brand-primary/40"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />
              <span className="text-sm font-medium text-foreground">{s}</span>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), white 96%), transparent)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("testimonials.label")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("testimonials.heading")}
              </h2>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-5 md:grid-cols-3">
            {(t("testimonials.items", { returnObjects: true }) as any[]).map((testimonial, i) => (
              <RevealItem key={testimonial.name} className="flex h-full flex-col rounded-3xl border border-border/70 bg-card p-6">
                <Quote className="h-6 w-6 text-brand-primary/60" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-1 text-brand-accent">
                  {Array.from({ length: TESTIMONIAL_STARS[i] }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="mt-3">
                  <div className="text-sm font-bold tracking-tight">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("pricing.label")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("pricing.heading")}
            </h2>
            <p className="mt-3 text-muted-foreground">{t("pricing.description")}</p>
          </div>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {(t("pricing.plans", { returnObjects: true }) as any[]).map((p, i) => {
            const extra = PRICING_EXTRA[i];
            return (
              <Reveal key={p.name}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-7 ${
                    extra.highlight
                      ? "border-brand-primary/50 bg-card shadow-[0_20px_60px_-30px_color-mix(in_oklch,var(--brand-primary),transparent_50%)]"
                      : "border-border/70 bg-card"
                  }`}
                >
                  {extra.highlight && (
                    <span className="absolute -top-3 left-6 rounded-full bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary-foreground">
                      {t("pricing.popular")}
                    </span>
                  )}
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{p.tag}</div>
                  <div className="mt-1 text-2xl font-black tracking-tight">{p.name}</div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tight text-brand-primary">{p.price}</span>
                    <span className="text-sm text-muted-foreground">{p.per}</span>
                  </div>
                  {extra.market && (
                    <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-[11px] leading-snug">
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                        <span className="min-w-0 font-semibold text-muted-foreground">
                          {t("pricing.market_label")} <span className="tabular-nums line-through decoration-muted-foreground/50">{extra.market}</span>
                        </span>
                        <span className="w-fit shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                          {p.savings}
                        </span>
                      </div>
                    </div>
                  )}
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {p.features.map((f: string) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                      extra.highlight
                        ? "bg-brand-primary text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]"
                        : "border border-border bg-background text-foreground hover:border-brand-primary/40 hover:text-brand-primary"
                    }`}
                  >
                    <CtaLabel /> <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), white 96%), transparent)" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("faq.label")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("faq.heading")}
              </h2>
            </div>
          </Reveal>
          <FAQList />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-4 sm:px-6">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border border-brand-primary/25 p-10 md:p-14"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 88%), color-mix(in oklch, var(--brand-accent), transparent 92%))",
            }}
          >
            <div className="relative z-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-background/60 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-primary">
                  <Sparkles className="h-3.5 w-3.5" /> {t("cta.label")}
                </span>
                <h2 className="mt-4 text-3xl font-black tracking-tight md:text-[2.4rem] md:leading-[1.1]">
                  {t("cta.heading")}
                </h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  {t("cta.description")}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]"
                >
                  <CtaLabel /> <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footer_nav.label")} {" "}
          <Link to="/dermatology-seo-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_nav.link_seo")}</Link>,{" "}
          <Link to="/dermatology-google-ads-ppc" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_nav.link_ppc")}</Link>, {t("common.or", { ns: "translation" })} {" "}
          <Link to="/dermatology-website-design" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_nav.link_design")}</Link>.
        </p>

      <SiteFooter />

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">{t("mobile_sticky.label")}</div>
            <div className="truncate text-xs text-muted-foreground">{t("mobile_sticky.description")}</div>
          </div>
          <Link
            to="/contact"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-primary-foreground"
          >
            <CtaLabel /> <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>

  );
}

// ------------------------- HERO FUNNEL PANEL -------------------------
function FunnelPanel() {
  const { t } = useTranslation("cro");
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 3), 2200);
    return () => clearInterval(id);
  }, []);

  const STAGE_CONFIG = [
    { icon: Users, base: 12480, key: "visitors", color: "text-muted-foreground" },
    { icon: MousePointerClick, base: 4820, key: "engaged", color: "text-foreground" },
    { icon: FormInput, base: 1240, key: "form_starts", color: "text-brand-primary" },
    { icon: Calendar, base: 486, key: "booked", color: "text-brand-accent" },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-accent/10 blur-2xl" />
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_30px_80px_-40px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-primary/10 text-brand-primary">
              <LineChart className="h-4 w-4" />
            </span>
            <div>
              <div className="text-sm font-bold tracking-tight">{t("funnel_panel.title")}</div>
              <div className="text-[11px] text-muted-foreground">{t("funnel_panel.status")}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {t("funnel_panel.winning")}
          </div>
        </div>

        {/* Funnel bars */}
        <div className="space-y-3 p-5">
          {STAGE_CONFIG.map((s, i) => {
            const width = 100 - i * 22;
            const Icon = s.icon;
            const isActive = tick === i % 3;
            return (
              <div key={s.key}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Icon className={`h-3.5 w-3.5 ${s.color}`} />
                    <span className="font-semibold text-foreground">{t(`funnel_panel.stages.${s.key}`)}</span>
                  </div>
                  <span className="font-mono tabular-nums text-muted-foreground">
                    {s.base.toLocaleString()}
                  </span>
                </div>
                <div className="relative h-9 overflow-hidden rounded-lg bg-muted/50">
                  <div
                    className="absolute inset-y-0 left-0 rounded-lg transition-all duration-1000 ease-out"
                    style={{
                      width: `${width}%`,
                      background:
                        i === 3
                          ? "linear-gradient(90deg, var(--brand-primary), var(--brand-accent))"
                          : "linear-gradient(90deg, color-mix(in oklch, var(--brand-primary), transparent 70%), color-mix(in oklch, var(--brand-primary), transparent 40%))",
                    }}
                  />
                  {isActive && (
                    <div className="absolute inset-y-0 left-0 w-1/3 animate-pulse rounded-lg bg-white/10" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stat cards */}
        <div className="grid grid-cols-3 border-t border-border/60 bg-muted/20">
          <div className="border-r border-border/60 p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("funnel_panel.stats.conv_rate")}</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-lg font-black text-brand-primary">3.89%</span>
              <span className="flex items-center text-[10px] font-bold text-emerald-600">
                <ArrowUpRight className="h-3 w-3" /> 184%
              </span>
            </div>
          </div>
          <div className="border-r border-border/60 p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("funnel_panel.stats.cpa")}</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-lg font-black text-foreground">$41</span>
              <span className="text-[10px] font-bold text-emerald-600">−58%</span>
            </div>
          </div>
          <div className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("funnel_panel.stats.confidence")}</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-lg font-black text-foreground">97%</span>
              <Percent className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------- FAQ -------------------------
function FAQList() {
  const { t } = useTranslation("cro");
  const [open, setOpen] = useState<number | null>(0);
  const faqs = (t("faq.items", { returnObjects: true }) as any[]);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen ? "border-brand-primary/40 bg-card" : "border-border/70 bg-card"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-bold tracking-tight text-foreground sm:text-base">{f.q}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-brand-primary">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
