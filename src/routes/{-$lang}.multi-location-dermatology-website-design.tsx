import { finalizeSeoHead } from "@/lib/seo-head";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { CtaLabel } from "@/lib/cta";
import { buildHreflangLinks } from "@/lib/i18n-routing";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { MapPinField } from "@/components/hero-motifs";
import { CountUp } from "@/components/count-up";
import dwMonogram from "@/assets/dw-monogram.webp.asset.json";
import dermMultiHero from "@/assets/derm-multilocation-hero.jpg";
import dermClinic1 from "@/assets/derm-clinic-1.jpg";
import dermClinic2 from "@/assets/derm-clinic-2.jpg";
import {
  ArrowRight,
  MapPin,
  Building2,
  Stethoscope,
  Baby,
  Scissors,
  Globe,
  Search,
  Star,
  Gauge,
  ShieldCheck,
  Smartphone,
  Users,
  Calendar,
  Phone,
  Navigation,
  CheckCircle2,
  X,
  Minus,
  Plus,
  Sparkles,
  LayoutGrid,
  Route as RouteIcon,
  BarChart3,
  Quote,
  Layers,
  Palette,
  MessageSquare,
  TrendingUp,
  Lock,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { robotsContent } from "@/lib/index-allowlist";

/* ============================================================
   ROUTE
============================================================ */
export const Route = createFileRoute("/{-$lang}/multi-location-dermatology-website-design")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: (args) => finalizeSeoHead((({ params }: typeof args) => {
    const { lang } = params;
    const st = getStaticTranslation(lang, "multiLocation");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/multi-location-dermatology-website-design") },
        { title: st?.meta?.title ?? "Multi-Location Dermatology Website Design | One Brand, Every City" },
        {
          name: "description",
          content: st?.meta?.description ?? "Premium multi-location dermatology website design. Governed brand system, per-location SEO, Google Business Profile per clinic, unified booking, HIPAA-aware. Rank in every city you serve.",
        },
        { property: "og:title", content: st?.meta?.og_title ?? "Multi-Location Dermatology Website Design | One Brand, Every City" },
        {
          property: "og:description",
          content: st?.meta?.og_description ?? "Design a governed multi-location dermatology website that ranks per city, converts per location, and scales as you add clinics. HIPAA-aware, Lighthouse 95+, real local SEO.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/multi-location-dermatology-website-design" },
        { property: "og:image", content: dermMultiHero },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: dermMultiHero },
      ],
      links: [{ rel: "canonical", href: "/multi-location-dermatology-website-design" }, ...buildHreflangLinks("/multi-location-dermatology-website-design", params.lang)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: st?.meta?.jsonLd?.serviceType ?? "Multi-Location Dermatology Website Design",
            provider: { "@type": "Organization", name: st?.meta?.jsonLd?.providerName ?? "DW Design" },
            areaServed: "United States",
            audience: { "@type": "MedicalAudience", audienceType: st?.meta?.jsonLd?.audienceType ?? "Multi-Location Dermatology Clinics" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "6900",
              description: st?.meta?.jsonLd?.offerDescription ?? "Multi-location dermatology website design — starting price",
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
  })(args), args.params.lang, "/multi-location-dermatology-website-design"),
  component: MultiLocationDermPage,
});

/* ============================================================
   DATA / CONFIG ARRAYS
============================================================ */
const audiences = [
  { icon: Stethoscope },
  { icon: Building2 },
  { icon: Baby },
  { icon: Scissors },
];

const pillars = [
  { icon: LayoutGrid },
  { icon: MapPin },
  { icon: RouteIcon },
  { icon: Star },
  { icon: Calendar },
  { icon: ShieldCheck },
];

const deliverables = [
  { icon: Palette },
  { icon: MapPin },
  { icon: Search },
  { icon: Globe },
  { icon: Navigation },
  { icon: Users },
  { icon: LayoutGrid },
  { icon: Star },
  { icon: Calendar },
  { icon: ShieldCheck },
  { icon: Gauge },
  { icon: BarChart3 },
];

const timeline = [
  { step: "01", icon: Search },
  { step: "02", icon: Palette },
  { step: "03", icon: LayoutGrid },
  { step: "04", icon: MapPin },
  { step: "05", icon: Smartphone },
  { step: "06", icon: Star },
];

/* ============================================================
   PAGE
============================================================ */
function MultiLocationDermPage() {
  const { t } = useTranslation("multiLocation");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(560px 560px at 22% 18%, color-mix(in oklch, var(--brand-primary), transparent 76%), transparent 60%), radial-gradient(560px 560px at 78% 22%, color-mix(in oklch, var(--brand-accent), transparent 76%), transparent 60%), radial-gradient(640px 480px at 50% 110%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 62%)",
          }}
        />
        <MapPinField className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 text-brand-primary opacity-40 lg:block" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 md:pt-20 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
                <MapPin className="h-3.5 w-3.5 text-brand-primary" />
                {t("hero.badge")}
              </span>
              <h1 className="text-[2rem] font-black leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("hero.description")}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 text-sm font-bold text-brand-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
                >
                  <CtaLabel /> <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-border/70 pt-6 sm:gap-6">
                <div>
                  <dt className="text-xl font-black text-brand-primary sm:text-2xl md:text-3xl">
                    1 <span className="text-sm font-bold sm:text-base">{t("hero.stats.brand.description")}</span>
                  </dt>
                  <dd className="mt-1 text-[11px] font-medium leading-snug text-muted-foreground sm:text-xs">{t("hero.stats.brand.description")}</dd>
                </div>
                <div>
                  <dt className="text-xl font-black text-brand-primary sm:text-2xl md:text-3xl">
                    <CountUp value="20+" />
                  </dt>
                  <dd className="mt-1 text-[11px] font-medium leading-snug text-muted-foreground sm:text-xs">{t("hero.stats.locations")}</dd>
                </div>
                <div>
                  <dt className="text-xl font-black text-brand-primary sm:text-2xl md:text-3xl">
                    <CountUp value="95+" />
                  </dt>
                  <dd className="mt-1 text-[11px] font-medium leading-snug text-muted-foreground sm:text-xs">{t("hero.stats.performance")}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal>
              <div className="relative">
                <img
                  src={dermMultiHero}
                  alt={t("hero.image_alt")}
                  width={1600}
                  height={1008}
                  className="rounded-3xl border border-border/70 shadow-2xl"
                />
                <div className="absolute -bottom-5 -left-5 hidden max-w-[220px] rounded-2xl border border-border bg-card p-4 shadow-xl lg:block">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                    <Sparkles className="h-3.5 w-3.5" /> {t("hero.rank_badge.label")}
                  </div>
                  <div className="mt-2 text-2xl font-black">{t("hero.rank_badge.value")}</div>
                  <div className="text-xs text-muted-foreground">{t("hero.rank_badge.subtext")}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE LOCATION SCALER ==================== */}
      <LocationScaler />

      {/* ==================== TARGET AUDIENCE ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t("sections.audiences.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {t("sections.audiences.title").split("more than one ZIP code")[0]} 
            <span className="text-brand-primary">{t("sections.audiences.title").match(/more than one ZIP code/)?.[0]}</span>.
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <RevealItem key={i}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold">{t(`sections.audiences.items.${i}.label`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`sections.audiences.items.${i}.desc`)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* ==================== PROBLEM / SOLUTION ==================== */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t("sections.problems.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("sections.problems.title").split("single-clinic template in a wig")[0]} 
              <span className="text-brand-primary">{t("sections.problems.title").match(/single-clinic template in a wig/)?.[0]}</span>.
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("sections.problems.description")}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {(t("sections.problems.items", { returnObjects: true }) as any[]).map((row, i) => (
              <div key={i} className="flex items-stretch gap-3 rounded-2xl border border-border bg-card p-4">
                <div className="flex-1 rounded-xl bg-destructive/5 p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
                    <X className="h-3 w-3" /> {t("sections.problems.labels.before")}
                  </div>
                  <div className="text-sm font-semibold text-foreground">{row.before}</div>
                </div>
                <div className="flex-1 rounded-xl bg-brand-primary/5 p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-primary">
                    <CheckCircle2 className="h-3 w-3" /> {t("sections.problems.labels.after")}
                  </div>
                  <div className="text-sm font-semibold text-foreground">{row.after}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PILLARS ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t("sections.pillars.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {t("sections.pillars.title").split("multi-location build")[0]} 
            <span className="text-brand-primary">{t("sections.pillars.title").match(/multi-location build/)?.[0]}</span>.
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <RevealItem key={i}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary/70 text-brand-primary-foreground shadow-md">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{t(`sections.pillars.items.${i}.title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`sections.pillars.items.${i}.desc`)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* ==================== URL ARCHITECTURE ==================== */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionEyebrow>{t("sections.architecture.eyebrow")}</SectionEyebrow>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {t("sections.architecture.title").split("indexable home")[0]} 
                <span className="text-brand-primary">{t("sections.architecture.title").match(/indexable home/)?.[0]}</span>.
              </h2>
              <p className="mt-4 text-muted-foreground">
                {t("sections.architecture.description")}
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {(t("sections.architecture.items", { returnObjects: true }) as string[]).map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-foreground">{line}</code>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <URLArchitectureVisual />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== LOCAL SEO MATRIX ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t("sections.seoMatrix.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {t("sections.seoMatrix.title").split("indexed and ranked")[0]} 
            <span className="text-brand-primary">{t("sections.seoMatrix.title").match(/indexed and ranked/)?.[0]}</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("sections.seoMatrix.description")}
          </p>
        </Reveal>

        <Reveal className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-bold">{t("sections.seoMatrix.table.head_service")}</th>
                {(t("sections.seoMatrix.table.cities", { returnObjects: true }) as string[]).map((c) => (
                  <th key={c} className="p-4 text-center font-bold">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(t("sections.seoMatrix.table.services", { returnObjects: true }) as string[]).map((service, i) => (
                <tr key={service} className={i % 2 ? "bg-muted/20" : ""}>
                  <td className="p-4 font-semibold text-foreground">{service}</td>
                  {[0, 1, 2, 3].map((c) => (
                    <td key={c} className="p-4 text-center">
                      <CheckCircle2 className="mx-auto h-4 w-4 text-brand-primary" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* ==================== MEDICAL SERVICES ==================== */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t("sections.medicalServices.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("sections.medicalServices.title").split("per location")[0]} 
              <span className="text-brand-primary">{t("sections.medicalServices.title").match(/per location/)?.[0]}</span>.
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("sections.medicalServices.description")}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {(t("sections.medicalServices.list", { returnObjects: true }) as string[]).map((s) => (
              <div key={s} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />
                <span className="text-sm font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DELIVERABLES ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t("sections.deliverables.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {t("sections.deliverables.title").split("launch deliverables")[0]} 
            <span className="text-brand-primary">{t("sections.deliverables.title").match(/launch deliverables/)?.[0]}</span>.
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((d, i) => (
            <RevealItem key={i}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                  <d.icon className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold text-foreground">{t(`sections.deliverables.list.${i}`)}</div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* ==================== TIMELINE ==================== */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t("sections.timeline.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("sections.timeline.title").split("One launch date")[0]} 
              <span className="text-brand-primary">{t("sections.timeline.title").match(/One launch date/)?.[0]}</span>.
            </h2>
          </Reveal>

          <RevealStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {timeline.map((item, i) => (
              <RevealItem key={item.step}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-black text-brand-primary/40">{t(`sections.timeline.steps.${i}.step`)}</div>
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-bold">{t(`sections.timeline.steps.${i}.title`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`sections.timeline.steps.${i}.desc`)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ==================== COMPARISON ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t("sections.comparison.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {t("sections.comparison.title").split("built for derm networks")[0]} 
            <span className="text-brand-primary">{t("sections.comparison.title").match(/built for derm networks/)?.[0]}</span>.
          </h2>
        </Reveal>

        <Reveal className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-bold">{t("sections.comparison.table.head_capability")}</th>
                <th className="p-4 text-center font-bold">{t("sections.comparison.table.head_diy")}</th>
                <th className="p-4 text-center font-bold">{t("sections.comparison.table.head_generic")}</th>
                <th className="relative bg-brand-primary/10 p-4 pt-8 text-center font-bold text-brand-primary">
                  <span className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full bg-brand-primary px-2 py-0.5 text-[9px] font-bold tracking-wider text-brand-primary-foreground shadow">
                    {t("sections.comparison.table.recommended")}
                  </span>
                  {t("sections.comparison.table.head_dw")}
                </th>
              </tr>
            </thead>
            <tbody>
              {(t("sections.comparison.table.rows", { returnObjects: true }) as string[]).map((label, i) => {
                 const marks: any[] = [
                   { label: t("sections.comparison.table.rows.0"), diy: false, generic: "partial", dw: true },
                   { label: t("sections.comparison.table.rows.1"), diy: false, generic: false, dw: true },
                   { label: t("sections.comparison.table.rows.2"), diy: false, generic: false, dw: true },
                   { label: t("sections.comparison.table.rows.3"), diy: false, generic: "partial", dw: true },
                   { label: t("sections.comparison.table.rows.4"), diy: false, generic: false, dw: true },
                   { label: t("sections.comparison.table.rows.5"), diy: false, generic: "partial", dw: true },
                   { label: t("sections.comparison.table.rows.6"), diy: false, generic: false, dw: true },
                   { label: t("sections.comparison.table.rows.7"), diy: false, generic: "partial", dw: true },
                 ];
                 const row = marks[i];
                 return (
                <tr key={i} className={i % 2 ? "bg-muted/20" : ""}>
                  <td className="p-4 font-semibold text-foreground">{label}</td>
                  <td className="p-4 text-center"><MarkCell v={row.diy} /></td>
                  <td className="p-4 text-center"><MarkCell v={row.generic} /></td>
                  <td className="bg-brand-primary/5 p-4 text-center"><MarkCell v={row.dw} highlight /></td>
                </tr>
              )})}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* ==================== PRICING ==================== */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t("sections.pricing.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("sections.pricing.title").split("how many clinics")[0]} 
              <span className="text-brand-primary">{t("sections.pricing.title").match(/how many clinics/)?.[0]}</span> {t("sections.pricing.title").split("how many clinics")[1]}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("sections.pricing.custom_quote_text").split(t("sections.pricing.custom_quote_link"))[0]} 
              <Link to="/contact" className="font-semibold text-brand-primary underline underline-offset-4">{t("sections.pricing.custom_quote_link")}</Link>.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {(t("sections.pricing.tiers", { returnObjects: true }) as any[]).map((tier, i) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  i === 1
                    ? "border-brand-primary bg-card shadow-2xl md:-translate-y-2 md:hover:-translate-y-3"
                    : "border-border bg-card hover:border-brand-primary/50"
                }`}
              >
                {i === 1 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-primary-foreground shadow-md">
                    {t("sections.pricing.most_popular")}
                  </span>
                )}
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{tier.tag}</div>
                <h3 className="mt-2 text-xl font-black">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-brand-primary">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">{t("sections.pricing.starting_label")}</span>
                </div>
                {tier.market && (
                  <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-[11px] leading-snug">
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                      <span className="min-w-0 font-semibold text-muted-foreground">
                        {t("sections.pricing.market_label")} <span className="tabular-nums line-through decoration-muted-foreground/50">{tier.market}</span>
                      </span>
                      <span className="w-fit shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                        {tier.savings}
                      </span>
                    </div>
                  </div>
                )}
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-transform hover:scale-[1.02] ${
                    i === 1
                      ? "bg-brand-primary text-brand-primary-foreground shadow-lg"
                      : "border border-border bg-background text-foreground hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  <CtaLabel /> <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== REAL PROJECTS GALLERY ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t("sections.gallery.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {t("sections.gallery.title").split("running in real clinics")[0]} 
            <span className="text-brand-primary">{t("sections.gallery.title").match(/running in real clinics/)?.[0]}</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("sections.gallery.description")}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[dermClinic1, dermClinic2].map((src, i) => (
            <Reveal key={i}>
              <figure className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                <img
                  src={src}
                  alt={t(`sections.gallery.items.${i}.label`)}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-5 text-white">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-white/80">{t(`sections.gallery.items.${i}.city`)}</div>
                    <div className="mt-0.5 text-sm font-bold">{t(`sections.gallery.items.${i}.label`)}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                    <Lock className="h-3 w-3" /> {t("sections.gallery.nda_badge")}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t("faq.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("faq.title")}
            </h2>
          </Reveal>

          <div className="mt-10 space-y-3">
            {(t("faq.items", { returnObjects: true }) as any[]).map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOUNDER CTA ==================== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-primary/80 p-8 text-brand-primary-foreground shadow-2xl md:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-primary-foreground/10 blur-3xl" />
            <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
              <img
                src={dwMonogram.url}
                alt={t("cta_founder.logo_alt")}
                width={112}
                height={112}
                loading="lazy"
                className="h-24 w-24 shrink-0 rounded-full object-cover ring-4 ring-brand-primary-foreground/40 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] md:h-28 md:w-28"
              />
              <div>
                <h2 className="text-2xl font-black leading-tight md:text-3xl">
                  {t("cta_founder.title")}
                </h2>
                <p className="mt-3 max-w-2xl text-brand-primary-foreground/85">
                  {t("cta_founder.description")}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary-foreground px-6 py-3.5 text-sm font-bold text-brand-primary shadow-lg transition-transform hover:scale-[1.03]"
                  >
                    <CtaLabel /> <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-6 border-t border-brand-primary-foreground/20 pt-4">
                  <div className="text-base font-bold text-brand-primary-foreground">{t("cta_founder.footer_title")}</div>
                  <div className="text-xs opacity-80">{t("cta_founder.footer_sub")}</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footer_nav.useful_hint")}{" "}
          <Link to="/" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_nav.links.single")}</Link>,{" "}
          <Link to="/dermatology-seo-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_nav.links.seo")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/#examples" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_nav.links.portfolio")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}

/* ============================================================
   SUB-COMPONENTS
============================================================ */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
      {children}
    </span>
  );
}

function MarkCell({ v, highlight }: { v: any; highlight?: boolean }) {
  if (v === true)
    return (
      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${highlight ? "bg-brand-primary text-brand-primary-foreground" : "bg-brand-primary/15 text-brand-primary"}`}>
        <CheckCircle2 className="h-4 w-4" />
      </span>
    );
  if (v === "partial")
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Minus className="h-4 w-4" />
      </span>
    );
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-destructive/70">
      <X className="h-4 w-4" />
    </span>
  );
}

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/40"
        aria-expanded={open}
      >
        <span className="text-base font-bold">{q}</span>
        <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary transition-transform ${open ? "rotate-45" : ""}`}>
          <Plus className="h-4 w-4" />
        </span>
      </button>
      {open && (
        <div className="border-t border-border/70 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
          {a}
        </div>
      )}
    </div>
  );
}

/* ---- Interactive Location Scaler ---- */
function LocationScaler() {
  const { t } = useTranslation("multiLocation");
  const [count, setCount] = useState(4);
  const cities = useMemo(
    () => [
      "Austin, TX", "Plano, TX", "Fort Worth, TX", "Round Rock, TX",
      "San Antonio, TX", "Frisco, TX", "The Woodlands, TX", "Sugar Land, TX",
      "El Paso, TX", "Arlington, TX",
    ],
    []
  );
  const shown = cities.slice(0, count);
  const indexedPages = count * (1 + 6); // 1 location page + 6 city-service pages each

  return (
    <section className="border-y border-border/70 bg-gradient-to-b from-muted/40 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-14">
          <div>
            <SectionEyebrow>{t("scaler.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("scaler.title").split("your local footprint")[0]} 
              <span className="text-brand-primary">{t("scaler.title").match(/your local footprint/)?.[0]}</span>.
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("scaler.description")}
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <label htmlFor="loc-count" className="text-sm font-bold">
                  {t("scaler.label")} <span className="text-brand-primary">{count}</span>
                </label>
                <div className="text-xs text-muted-foreground">{t("scaler.range_hint")}</div>
              </div>
              <input
                id="loc-count"
                type="range"
                min={2}
                max={10}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="mt-3 w-full accent-[color:var(--brand-primary)]"
              />
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/70 pt-4">
                <div>
                  <div className="text-2xl font-black text-brand-primary">{indexedPages}</div>
                  <div className="text-xs text-muted-foreground">{t("scaler.stat_indexed")}</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-brand-primary">{count}</div>
                  <div className="text-xs text-muted-foreground">{t("scaler.stat_gbp")}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-lg sm:p-6">
            <div className="mb-3 flex items-center gap-2 border-b border-border/70 pb-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-primary/60" />
              </div>
              <div className="ml-2 flex-1 truncate rounded-md bg-muted px-2 py-1 font-mono text-[11px] text-muted-foreground">
                {t("scaler.browser_placeholder")}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {shown.map((c) => (
                <div key={c} className="group rounded-xl border border-border bg-background p-3 transition-all hover:border-brand-primary/60 hover:shadow">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    <div>
                      <div className="text-xs font-bold">{c}</div>
                      <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">/locations/{c.split(",")[0].toLowerCase().replace(/\s+/g, "-")}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Phone className="h-3 w-3" /> {t("scaler.local_number")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- URL Architecture Visual ---- */
function URLArchitectureVisual() {
  const { t } = useTranslation("multiLocation");
  const rows = [
    { url: "/locations", type: "Hub" },
    { url: "/locations/austin-tx", type: "Local page" },
    { url: "/locations/austin-tx/acne-treatment", type: "Local service" },
    { url: "/locations/austin-tx/dr-lee", type: "Local provider" },
    { url: "/locations/plano-tx", type: "Local page" },
    { url: "/locations/plano-tx/skin-cancer-screening", type: "Local service" },
    { url: "/locations/fort-worth-tx", type: "Local page" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
      <div className="mb-3 flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Layers className="h-3.5 w-3.5" /> {t("sections.architecture.visual.title")}
        </div>
        <span className="rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-bold text-brand-primary">
          {t("sections.architecture.visual.status")}
        </span>
      </div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.url} className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2">
            <code className="truncate font-mono text-xs text-foreground">{r.url}</code>
            <span className="shrink-0 rounded-full bg-background px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{r.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
