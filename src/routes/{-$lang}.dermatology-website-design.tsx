import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage, SITE_ORIGIN } from "@/lib/i18n-routing";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { PixelGridField } from "@/components/hero-motifs";
import dermHero from "@/assets/derm-hero.jpg";
import dermPortfolio1 from "@/assets/derm-portfolio-1.jpg";
import dermPortfolio2 from "@/assets/derm-portfolio-2.jpg";
import dermPortfolio3 from "@/assets/derm-portfolio-3.jpg";

import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  ShieldCheck,
  Gauge,
  Search,
  Smartphone,
  Building2,
  Baby,
  Scissors,
  Microscope,
  ShieldPlus,
  Star,
  Award,
  Zap,
  Eye,
  Palette,
  BarChart3,
  Lock,
  Trophy,
  MessageSquare,
  Plus,
  Minus,
  Quote,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";

export const Route = createFileRoute("/{-$lang}/dermatology-website-design")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params }) => {
    const lang = params.lang as string;
    const st = getStaticTranslation(lang, "websiteDesign");
    return {
      meta: [
        { title: st?.meta?.title ?? "Custom Website Design for Skin Clinics" },
        {
          name: "description",
          content: st?.meta?.description ?? "Custom, conversion-focused websites for skin clinics and aesthetic practices. HIPAA-aware, fast, and built to turn visitors into booked consultations.",
        },
        { property: "og:title", content: st?.meta?.ogTitle ?? "Custom Website Design for Skin Clinics" },
        {
          property: "og:description",
          content: st?.meta?.ogDescription ?? "Custom, conversion-focused websites for skin clinics and aesthetic practices. HIPAA-aware, fast, and built to turn visitors into booked consultations.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: localizedUrl(resolveRouteLanguage(lang), "/dermatology-website-design") },
        { name: "twitter:title", content: st?.meta?.ogTitle ?? "Custom Website Design for Skin Clinics" },
        { name: "twitter:description", content: st?.meta?.ogDescription ?? "Custom, conversion-focused websites for skin clinics and aesthetic practices. HIPAA-aware, fast, and built to turn visitors into booked consultations." },
        { property: "og:image", content: dermHero.startsWith("http") ? dermHero : `${SITE_ORIGIN}${dermHero}` },
        { name: "twitter:image", content: dermHero.startsWith("http") ? dermHero : `${SITE_ORIGIN}${dermHero}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: localizedUrl(resolveRouteLanguage(lang), "/dermatology-website-design") }, ...buildHreflangLinks("/dermatology-website-design")],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: st?.meta?.jsonLd?.serviceType ?? "Custom Website Design for Skin Clinics",
            provider: { "@type": "Organization", name: st?.meta?.jsonLd?.provider ?? "DW Design" },
            areaServed: st?.meta?.jsonLd?.areaServed ?? "United States",
            description: st?.meta?.jsonLd?.description ?? "Custom, HIPAA-aware, SEO-optimized website design exclusively for dermatology practices.",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: (st?.faq?.items ?? FAQS).map((f: any) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: DermWebDesignPage,
});

const audiences = [
  { icon: Stethoscope, key: "sections.audience.items.0" },
  { icon: Building2, key: "sections.audience.items.1" },
  { icon: Baby, key: "sections.audience.items.2" },
  { icon: Scissors, key: "sections.audience.items.3" },
];

const medicalServices = [
  "Acne Treatment",
  "Eczema Treatment",
  "Psoriasis Treatment",
  "Skin Infection Treatment",
  "Skin Allergy Treatment",
  "Skin Cancer Screening & Treatment",
  "Mole Evaluation & Removal",
  "Cyst & Lipoma Removal",
  "Wart Removal",
  "Nail Disorder Treatment",
  "Hair Loss Treatment",
  "Scalp Disorder Treatment",
  "Rosacea Treatment",
  "Hyperpigmentation & Melasma",
  "Scar Treatment",
  "Burn Scar Treatment",
  "Vitiligo Treatment",
  "Skin Biopsy & Diagnostics",
];

const pillars = [
  { icon: Palette, key: "sections.pillars.items.0" },
  { icon: Gauge, key: "sections.pillars.items.1" },
  { icon: Search, key: "sections.pillars.items.2" },
  { icon: ShieldCheck, key: "sections.pillars.items.3" },
  { icon: Smartphone, key: "sections.pillars.items.4" },
  { icon: Eye, key: "sections.pillars.items.5" },
];

const processSteps = [
  { step: "01", key: "sections.process.steps.0" },
  { step: "02", key: "sections.process.steps.1" },
  { step: "03", key: "sections.process.steps.2" },
  { step: "04", key: "sections.process.steps.3" },
];

const outcomes = [
  { stat: "3.4x", labelKey: "hero.outcomes.bookingLift" },
  { stat: "98", labelKey: "hero.outcomes.lighthouse" },
  { stat: "<1.2s", labelKey: "hero.outcomes.lcp" },
  { stat: "50+", labelKey: "hero.outcomes.practices" },
];

const portfolioItems = [
  { url: dermPortfolio1, key: "sections.portfolio.items.0" },
  { url: dermPortfolio2, key: "sections.portfolio.items.1" },
  { url: dermPortfolio3, key: "sections.portfolio.items.2" },
];

const trustLogos = ["MedSpa Times", "Derm Weekly", "Skin Health Today", "Clinic Growth", "Practice HQ"];

const FAQS = [
  { qKey: "faq.items.0.q", aKey: "faq.items.0.a" },
  { qKey: "faq.items.1.q", aKey: "faq.items.1.a" },
  { qKey: "faq.items.2.q", aKey: "faq.items.2.a" },
  { qKey: "faq.items.3.q", aKey: "faq.items.3.a" },
  { qKey: "faq.items.4.q", aKey: "faq.items.4.a" },
];

function DermWebDesignPage() {
  const { t } = useTranslation("websiteDesign");

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
              "radial-gradient(1100px 550px at 15% -10%, color-mix(in oklch, var(--brand-primary), transparent 75%), transparent 60%), radial-gradient(800px 450px at 100% 10%, color-mix(in oklch, var(--brand-accent), transparent 78%), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <PixelGridField className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 text-brand-primary opacity-40 lg:block" />

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 md:pt-20 lg:pt-28">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
                <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
              </span>
              <h1 className="mt-5 text-[2rem] font-black leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                {t("hero.title")}
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {t("hero.description")}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/get-a-free-quote"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]"
                >
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/free-dermatologist-website-audit"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
                {outcomes.map((o) => (
                  <div key={o.labelKey} className="rounded-2xl border border-border/60 bg-card/60 p-3 backdrop-blur">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t(o.labelKey)}</dt>
                    <dd className="mt-1 whitespace-nowrap text-lg font-black text-foreground sm:text-xl">{o.stat}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1} variant="scale">
              <HeroVisual />
            </Reveal>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mx-auto mt-8 max-w-7xl px-4 pb-10 sm:px-6">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("hero.trust")}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-70">
            {trustLogos.map((l) => (
              <span key={l} className="text-sm font-bold tracking-tight text-muted-foreground">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.audience.tag")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.audience.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("sections.audience.description")}</p>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <RevealItem key={a.key} className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_20px_50px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_50%)]">
                <span
                  aria-hidden
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 60%)" }}
                />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="relative mt-4 text-lg font-bold">{t(`${a.key}.label`)}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${a.key}.desc`)}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      {/* PILLARS */}
      <section
        className="relative py-24"
        style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), white 96%), transparent)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.pillars.tag")}</span>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.pillars.title")}</h2>
              </div>
              <p className="max-w-md text-muted-foreground">{t("sections.pillars.description")}</p>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <RevealItem key={p.key} className="group relative rounded-3xl border border-border/70 bg-card p-7 transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-primary text-brand-primary-foreground shadow-md transition-transform group-hover:rotate-[-6deg] group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold">{t(`${p.key}.title`)}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(`${p.key}.desc`)}</p>
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
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.medicalServices.tag")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.medicalServices.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("sections.medicalServices.description")}</p>
            <div className="mt-8 space-y-3">
              {[
                { icon: Microscope, label: t("sections.medicalServices.features.0") },
                { icon: BarChart3, label: t("sections.medicalServices.features.1") },
                { icon: Lock, label: t("sections.medicalServices.features.2") },
                { icon: Zap, label: t("sections.medicalServices.features.3") },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-primary/10 text-brand-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium">{f.label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {medicalServices.map((_, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-card p-3 text-sm transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                  <span className="font-medium leading-snug">{t(`sections.medicalServices.list.${i}`)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 97%))" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.portfolio.tag")}</span>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.portfolio.title")}</h2>
              </div>
              <Link to="/dermatology-websites-portfolio" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:gap-2">
                {t("sections.portfolio.viewAll")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-6 md:grid-cols-3">
            {portfolioItems.map((p) => (
              <RevealItem key={p.key} className="group overflow-hidden rounded-3xl border border-border/70 bg-card transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.url}
                    alt={t(`${p.key}.alt`)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold">{t(`${p.key}.label`)}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{t(`${p.key}.meta`)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* PROCESS - Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.process.tag")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("sections.process.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("sections.process.description")}</p>
          </div>
        </Reveal>
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-6 top-0 hidden h-full w-px md:left-1/2 md:block"
            style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), transparent 60%), transparent)" }}
          />
          <div className="space-y-8">
            {processSteps.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className={`grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 === 1 ? "md:[&>*:first-child]:col-start-2" : ""}`}>
                  <div className={i % 2 === 1 ? "md:text-right" : ""}>
                    <div className={`relative rounded-3xl border border-border/70 bg-card p-6 transition-all hover:border-brand-primary/40 hover:shadow-xl`}>
                      <span
                        className="text-5xl font-black text-transparent"
                        style={{ WebkitTextStroke: "1.2px color-mix(in oklch, var(--brand-primary), transparent 40%)" }}
                      >
                        {p.step}
                      </span>
                      <h3 className="mt-2 text-lg font-bold">{t(`${p.key}.title`)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${p.key}.desc`)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}States
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-8 md:p-14">
            <Quote aria-hidden className="absolute right-8 top-8 h-24 w-24 text-brand-primary/10" />
            <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
              <div className="relative shrink-0">
                <span
                  aria-hidden
                  className="absolute -inset-2 rounded-full opacity-70 blur-md"
                  style={{ background: "conic-gradient(from 120deg, var(--brand-primary), var(--brand-accent), var(--brand-primary))" }}
                />
                <img
                  src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=240&h=240&fit=crop&crop=faces&auto=format&q=80"
                  alt={t("testimonial.author")}
                  loading="lazy"
                  className="relative h-24 w-24 rounded-full object-cover md:h-28 md:w-28"
                />
              </div>
              <div>
                <div className="flex gap-0.5 text-brand-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-lg font-medium leading-relaxed md:text-xl">
                  "{t("testimonial.quote")}"
                </p>
                <div className="mt-4 text-sm">
                  <div className="font-bold">{t("testimonial.author")}</div>
                  <div className="text-muted-foreground">{t("testimonial.role")}</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("faq.tag")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("faq.title")}</h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <FaqItem key={i} q={t(f.qKey)} a={t(f.aKey)} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] p-8 md:p-14"
            style={{ background: "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 30%))" }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-3xl" style={{ background: "var(--brand-accent)" }} />
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "22px 22px" }} />
            <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div className="text-brand-primary-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] backdrop-blur">
                  <Trophy className="h-3.5 w-3.5" /> {t("cta.tag")}
                </span>
                <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">{t("cta.title")}</h2>
                <p className="mt-3 max-w-xl opacity-90">{t("cta.description")}</p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link to="/get-a-free-quote" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3.5 text-sm font-bold text-foreground shadow-xl transition-transform hover:scale-[1.03]">
                  {t("cta.buttonPrimary")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-brand-primary-foreground backdrop-blur transition-colors hover:bg-white/20">
                  <MessageSquare className="h-4 w-4" /> {t("cta.buttonSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footer.relatedTitle")}{" "}
          <Link to="/dermatology-website-redesign" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.relatedLinks.redesign")}</Link>,{" "}
          <Link to="/plan-packages-and-costs" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.relatedLinks.costs")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/dermatology-websites-portfolio" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.relatedLinks.portfolio")}</Link>.
        </p>

      <SiteFooter />

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-3 z-40 mx-3 md:hidden">
        <Link
          to="/get-a-free-quote"
          className="flex items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3.5 text-sm font-bold text-brand-primary-foreground shadow-[0_16px_40px_-12px_color-mix(in_oklch,var(--brand-primary),transparent_30%)]"
        >
          {t("cta.buttonPrimary")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`overflow-hidden rounded-2xl border transition-colors ${open ? "border-brand-primary/40 bg-card" : "border-border/70 bg-card"}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold md:text-base">{q}</span>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all ${open ? "rotate-180 bg-brand-primary text-brand-primary-foreground" : "bg-muted text-foreground"}`}>
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
      </motion.div>
    </div>
  );
}

function HeroVisual() {
  const { t } = useTranslation("websiteDesign");
  return (
    <div className="relative mx-auto w-full max-w-lg px-4 md:px-0">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-2xl"
        style={{
          background:
            "conic-gradient(from 120deg at 50% 50%, color-mix(in oklch, var(--brand-primary), transparent 60%), color-mix(in oklch, var(--brand-accent), transparent 65%), color-mix(in oklch, var(--brand-primary), transparent 60%))",
        }}
      />
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl">
        <img
          src={dermHero}
          alt={t("hero.visual.imageAlt")}
          className="h-[420px] w-full object-cover md:h-[520px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 45%, color-mix(in oklch, var(--brand-primary), black 20%) 100%)" }}
        />
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-white/85 p-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-primary text-brand-primary-foreground">
              <ShieldPlus className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-foreground">{t("hero.visual.secureHeading")}</div>
              <div className="text-[11px] text-muted-foreground">{t("hero.visual.secureSubheading")}</div>
            </div>
            <span className="rounded-full bg-brand-primary px-2.5 py-1 text-[10px] font-bold text-brand-primary-foreground">{t("hero.visual.status")}</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute -left-3 top-10 hidden rounded-2xl border border-border/70 bg-card p-3 shadow-xl sm:block"
      >
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Gauge className="h-4 w-4 text-brand-primary" /> {t("hero.visual.statLighthouse")}
        </div>
        <div className="mt-1 text-2xl font-black text-foreground">98</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute -right-3 bottom-24 hidden rounded-2xl border border-border/70 bg-card p-3 shadow-xl sm:block"
      >
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Award className="h-4 w-4 text-brand-primary" /> {t("hero.visual.statBookings")}
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground">{t("hero.visual.statAverage")}</div>
      </motion.div>
    </div>
  );
}
