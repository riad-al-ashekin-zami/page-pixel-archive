import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { buildHreflangLinks } from "@/lib/i18n-routing";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { CartGridField } from "@/components/hero-motifs";
import { CountUp } from "@/components/count-up";
import dwMonogram from "@/assets/dw-monogram.webp.asset.json";
import dermEcomHero from "@/assets/derm-ecommerce-hero.jpg";
import dermProduct1 from "@/assets/derm-product-1.jpg";
import dermProduct2 from "@/assets/derm-product-2.jpg";
import dermProduct3 from "@/assets/derm-product-3.jpg";
import dermProduct4 from "@/assets/derm-product-4.jpg";
import {
  ArrowRight,
  ShoppingBag,
  Stethoscope,
  Building2,
  Baby,
  Scissors,
  ShieldCheck,
  CreditCard,
  Package,
  Repeat,
  Search,
  Star,
  Gauge,
  Smartphone,
  Users,
  CheckCircle2,
  X,
  Minus,
  Plus,
  Sparkles,
  LayoutGrid,
  BarChart3,
  Quote,
  Palette,
  MessageSquare,
  Truck,
  Tag,
  FileText,
  Lock,
  TrendingUp,
  Percent,
  Beaker,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

/* ============================================================
   ROUTE
============================================================ */
export const Route = createFileRoute("/{-$lang}/dermatology-ecommerce-website-design")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params: { lang } }) => {
    const st = getStaticTranslation(lang, "ecommerce");
    return {
      meta: [
        { title: st?.meta?.title ?? "Dermatology E-Commerce Website Design | HIPAA-Aware Skincare Storefronts" },
        {
          name: "description",
          content: st?.meta?.description ?? "Premium dermatology e-commerce website design. HIPAA-aware Rx + OTC catalog, subscription refills, provider-approved skincare kits, and Product-schema SEO. Built for derm practices, medical spas, and DSOs.",
        },
        { property: "og:title", content: st?.meta?.og?.title ?? "Dermatology E-Commerce Website Design | HIPAA-Aware Skincare Storefronts" },
        {
          property: "og:description",
          content: st?.meta?.og?.description ?? "Sell medical-grade skincare, gate Rx products behind provider approval, run subscriptions, and rank product pages in Google — one governed storefront for your dermatology brand.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-ecommerce-website-design" },
        { property: "og:image", content: dermEcomHero },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: dermEcomHero },
      ],
      links: [{ rel: "canonical", href: "/dermatology-ecommerce-website-design" }, ...buildHreflangLinks("/dermatology-ecommerce-website-design")],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: st?.meta?.jsonLd?.serviceType ?? "Dermatology E-Commerce Website Design",
            provider: { "@type": "Organization", name: st?.meta?.jsonLd?.name ?? "DW Design" },
            areaServed: "United States",
            audience: { "@type": "MedicalAudience", audienceType: "Dermatology Practices & Medical Spas" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "5900",
              description: st?.meta?.jsonLd?.offerDescription ?? "Dermatology e-commerce website design — starting price",
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
  component: DermEcommercePage,
});

/* ============================================================
   DATA STRUCTURES
============================================================ */
const audiences = [
  { icon: Stethoscope, key: "sections.audiences.items.0" },
  { icon: Building2, key: "sections.audiences.items.1" },
  { icon: Baby, key: "sections.audiences.items.2" },
  { icon: Scissors, key: "sections.audiences.items.3" },
];

const pillars = [
  { icon: ShieldCheck, key: "sections.pillars.items.0" },
  { icon: Repeat, key: "sections.pillars.items.1" },
  { icon: Package, key: "sections.pillars.items.2" },
  { icon: Search, key: "sections.pillars.items.3" },
  { icon: CreditCard, key: "sections.pillars.items.4" },
  { icon: Truck, key: "sections.pillars.items.5" },
];

const catalogArchitecture = [
  { icon: ShoppingBag, key: "sections.architecture.items.0" },
  { icon: Lock, key: "sections.architecture.items.1" },
  { icon: Package, key: "sections.architecture.items.2" },
  { icon: Repeat, key: "sections.architecture.items.3" },
];

const deliverables = [
  { icon: Palette, key: "sections.deliverables.items.0" },
  { icon: ShieldCheck, key: "sections.deliverables.items.1" },
  { icon: Repeat, key: "sections.deliverables.items.2" },
  { icon: Package, key: "sections.deliverables.items.3" },
  { icon: CreditCard, key: "sections.deliverables.items.4" },
  { icon: Truck, key: "sections.deliverables.items.5" },
  { icon: Search, key: "sections.deliverables.items.6" },
  { icon: Tag, key: "sections.deliverables.items.7" },
  { icon: Lock, key: "sections.deliverables.items.8" },
  { icon: FileText, key: "sections.deliverables.items.9" },
  { icon: Gauge, key: "sections.deliverables.items.10" },
  { icon: BarChart3, key: "sections.deliverables.items.11" },
];

const timeline = [
  { step: "01", icon: Search, key: "sections.timeline.items.0" },
  { step: "02", icon: Beaker, key: "sections.timeline.items.1" },
  { step: "03", icon: Palette, key: "sections.timeline.items.2" },
  { step: "04", icon: CreditCard, key: "sections.timeline.items.3" },
  { step: "05", icon: Search, key: "sections.timeline.items.4" },
  { step: "06", icon: TrendingUp, key: "sections.timeline.items.5" },
];

/* ============================================================
   PAGE
============================================================ */
function DermEcommercePage() {
  const { t } = useTranslation("ecommerce");

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
              "radial-gradient(900px 600px at 110% -5%, color-mix(in oklch, var(--brand-accent), transparent 72%), transparent 60%), radial-gradient(700px 500px at -10% 65%, color-mix(in oklch, var(--brand-primary), transparent 80%), transparent 60%), linear-gradient(180deg, transparent 0%, color-mix(in oklch, var(--brand-primary), transparent 96%) 100%)",
          }}
        />
        <CartGridField className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 text-brand-primary opacity-40 lg:block" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 md:pt-20 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
                <ShoppingBag className="h-3.5 w-3.5 text-brand-primary" />
                {t("hero.badge")}
              </span>
              <h1 className="text-balance text-[2rem] font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.5rem] 2xl:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("hero.description")}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/get-a-free-quote"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 text-sm font-bold text-brand-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
                >
                  {t("hero.cta.plan")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/free-dermatologist-website-audit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary hover:text-brand-primary"
                >
                  {t("hero.cta.audit")}
                </Link>
              </div>

              <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-border/70 pt-6 sm:gap-6">
                <div>
                  <dt className="text-xl font-black text-brand-primary sm:text-2xl md:text-3xl">
                    <CountUp value="42+" />
                  </dt>
                  <dd className="mt-1 text-[11px] font-medium leading-snug text-muted-foreground sm:text-xs">{t("hero.stats.dispensaries")}</dd>
                </div>
                <div>
                  <dt className="text-xl font-black text-brand-primary sm:text-2xl md:text-3xl">
                    <CountUp value="63%" />
                  </dt>
                  <dd className="mt-1 text-[11px] font-medium leading-snug text-muted-foreground sm:text-xs">{t("hero.stats.retention")}</dd>
                </div>
                <div>
                  <dt className="text-xl font-black text-brand-primary sm:text-2xl md:text-3xl">
                    <CountUp value="95+" />
                  </dt>
                  <dd className="mt-1 text-[11px] font-medium leading-snug text-muted-foreground sm:text-xs">{t("hero.stats.lighthouse")}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal>
              <div className="relative">
                <img
                  src={dermEcomHero}
                  alt={t("hero.mockups.alt")}
                  width={1600}
                  height={1000}
                  className="rounded-3xl border border-border/70 shadow-2xl"
                />
                <div
                  aria-hidden
                  className="absolute -left-4 top-6 hidden w-40 rotate-[-6deg] rounded-2xl border border-border bg-card p-3 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:-translate-y-1 md:block"
                >
                  <img src={dermProduct1} alt="" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t("hero.mockups.otc")}</div>
                  <div className="text-[13px] font-bold leading-tight">{t("catalog.products.0.name")}</div>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="font-black text-brand-primary">$68</span>
                    <span className="text-muted-foreground">30ml</span>
                  </div>
                </div>
                <div
                  aria-hidden
                  className="absolute -right-3 top-24 hidden w-40 rotate-[5deg] rounded-2xl border border-border bg-card p-3 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:-translate-y-1 lg:block"
                >
                  <img src={dermProduct3} alt="" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-primary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-primary">
                    <Lock className="h-2.5 w-2.5" /> {t("hero.mockups.rxGated")}
                  </div>
                  <div className="mt-1 text-[13px] font-bold leading-tight">{t("catalog.products.2.name")}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">{t("hero.mockups.requirement")}</div>
                </div>
                <div className="absolute -bottom-5 -left-5 hidden max-w-[240px] rounded-2xl border border-border bg-card p-4 shadow-xl lg:block">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                    <TrendingUp className="h-3.5 w-3.5" /> {t("hero.mockups.revenueLift")}
                  </div>
                  <div className="mt-2 text-2xl font-black">+2.4×</div>
                  <div className="text-xs text-muted-foreground">{t("hero.mockups.revenueContext")}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== REVENUE ESTIMATOR ==================== */}
      <RevenueEstimator />

      {/* ==================== PRODUCT MOCKUP GRID ==================== */}
      <ProductGridPreview />

      {/* ==================== TARGET AUDIENCE ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t("sections.audiences.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {t("sections.audiences.title")}
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <RevealItem key={a.key}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold">{t(`${a.key}.label`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`${a.key}.desc`)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* ==================== PROBLEM / SOLUTION ==================== */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t("sections.problemSolution.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("sections.problemSolution.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("sections.problemSolution.description")}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-stretch gap-3 rounded-2xl border border-border bg-card p-4">
                <div className="flex-1 rounded-xl bg-destructive/5 p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
                    <X className="h-3 w-3" /> {t("sections.problemSolution.before")}
                  </div>
                  <div className="text-sm font-semibold text-foreground">{t(`sections.problemSolution.items.${i}.before`)}</div>
                </div>
                <div className="flex-1 rounded-xl bg-brand-primary/5 p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-primary">
                    <CheckCircle2 className="h-3 w-3" /> {t("sections.problemSolution.after")}
                  </div>
                  <div className="text-sm font-semibold text-foreground">{t(`sections.problemSolution.items.${i}.after`)}</div>
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
            {t("sections.pillars.title")}
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <RevealItem key={p.key}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary/70 text-brand-primary-foreground shadow-md">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{t(`${p.key}.title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`${p.key}.desc`)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* ==================== CATALOG ARCHITECTURE ==================== */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t("sections.architecture.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("sections.architecture.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("sections.architecture.description")}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {catalogArchitecture.map((c, idx) => (
              <Reveal key={c.key}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold">{t(`${c.key}.type`)}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {[0, 1, 2, 3, 4].map((eIdx) => (
                      <li key={eIdx} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-primary/60" />
                        {t(`sections.architecture.items.${idx}.examples.${eIdx}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MEDICAL SERVICES ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t("sections.categories.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {t("sections.categories.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("sections.categories.description")}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />
              <span className="text-sm font-medium">{t(`sections.categories.items.${i}`)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== DELIVERABLES ==================== */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t("sections.deliverables.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("sections.deliverables.title")}
            </h2>
          </Reveal>

          <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d) => (
              <RevealItem key={d.key}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <d.icon className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-semibold text-foreground">{t(d.key)}</div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ==================== TIMELINE ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t("sections.timeline.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {t("sections.timeline.title")}
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {timeline.map((tl) => (
            <RevealItem key={tl.key}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-black text-brand-primary/40">{t(`${tl.key}.step`)}</div>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <tl.icon className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="mt-4 text-base font-bold">{t(`${tl.key}.title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`${tl.key}.desc`)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* ==================== COMPARISON ==================== */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t("sections.comparison.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("sections.comparison.title")}
            </h2>
          </Reveal>

          <Reveal className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 font-bold">{t("sections.comparison.headers.capability")}</th>
                  <th className="p-4 text-center font-bold">{t("sections.comparison.headers.diy")}</th>
                  <th className="p-4 text-center font-bold">{t("sections.comparison.headers.generic")}</th>
                  <th className="relative bg-brand-primary/10 p-4 pt-8 text-center font-bold text-brand-primary">
                    <span className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full bg-brand-primary px-2 py-0.5 text-[9px] font-bold tracking-wider text-brand-primary-foreground shadow">
                      {t("sections.comparison.headers.recommended")}
                    </span>
                    {t("sections.comparison.headers.dw")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((rowIdx) => {
                  const rowLabels = [
                    t("sections.comparison.rows.0"),
                    t("sections.comparison.rows.1"),
                    t("sections.comparison.rows.2"),
                    t("sections.comparison.rows.3"),
                    t("sections.comparison.rows.4"),
                    t("sections.comparison.rows.5"),
                    t("sections.comparison.rows.6"),
                    t("sections.comparison.rows.7"),
                  ];
                  const diyVals: (boolean | "partial")[] = [false, false, false, "partial", false, false, false, false];
                  const genericVals: (boolean | "partial")[] = [false, false, false, "partial", "partial", "partial", false, "partial"];
                  
                  return (
                    <tr key={rowIdx} className={rowIdx % 2 ? "bg-muted/20" : ""}>
                      <td className="p-4 font-semibold text-foreground">{rowLabels[rowIdx]}</td>
                      <td className="p-4 text-center"><MarkCell v={diyVals[rowIdx]} /></td>
                      <td className="p-4 text-center"><MarkCell v={genericVals[rowIdx]} /></td>
                      <td className="bg-brand-primary/5 p-4 text-center"><MarkCell v={true} highlight /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t("pricing.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {t("pricing.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            DSO or enterprise pharmacy integration —{" "}
            <Link to="/get-a-free-quote" className="font-semibold text-brand-primary underline underline-offset-4">
              {t("pricing.customQuote")}
            </Link>
            .
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[0, 1, 2].map((idx) => {
            const tierKeys = ["otc", "rx", "headless"];
            const prices = ["$5,900", "$10,900", "$19,900"];
            const savings = ["51–73% cheaper", "50–75% cheaper", "50–75% cheaper"];
            const markets = ["$12,000 – $22,000", "$22,000 – $45,000", "$40,000 – $80,000"];
            const highlighted = idx === 1;

            return (
              <div
                key={idx}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  highlighted
                    ? "border-brand-primary bg-card shadow-2xl md:-translate-y-2 md:hover:-translate-y-3"
                    : "border-border bg-card hover:border-brand-primary/50"
                }`}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-primary-foreground shadow-md">
                    {t("pricing.labels.popular")}
                  </span>
                )}
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t(`pricing.tiers.${idx}.tag`)}</div>
                <h3 className="mt-2 text-xl font-black">{t(`pricing.tiers.${idx}.name`)}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-brand-primary">{prices[idx]}</span>
                  <span className="text-sm text-muted-foreground">{t("pricing.starting")}</span>
                </div>
                <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-[11px] leading-snug">
                   <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                    <span className="min-w-0 font-semibold text-muted-foreground">
                      {t("pricing.market")}: <span className="tabular-nums line-through decoration-muted-foreground/50">{markets[idx]}</span>
                    </span>
                    <span className="w-fit shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                      {savings[idx]}
                    </span>
                  </div>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {[0, 1, 2, 3, 4, 5].map((fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                      <span>{t(`pricing.features.${tierKeys[idx]}.${fIdx}`)}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/get-a-free-quote"
                  className={`mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-transform hover:scale-[1.02] ${
                    highlighted
                      ? "bg-brand-primary text-brand-primary-foreground shadow-lg"
                      : "border border-border bg-background text-foreground hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {t("pricing.labels.getStarted")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== ANONYMIZED CASE STUDY ==================== */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t("caseStudy.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("caseStudy.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("caseStudy.description")}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { k: "+2.4×", keyIdx: 0 },
                  { k: "63%", keyIdx: 1 },
                  { k: "38%", keyIdx: 2 },
                  { k: "96", keyIdx: 3 },
                ].map((m) => (
                  <div key={m.keyIdx} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-brand-primary">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t("caseStudy.verified")}</span>
                    </div>
                    <div className="mt-2 text-3xl font-black text-brand-primary md:text-4xl">{m.k}</div>
                    <div className="mt-1 text-sm font-bold text-foreground">{t(`caseStudy.metrics.${m.keyIdx}.label`)}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{t(`caseStudy.metrics.${m.keyIdx}.sub`)}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("caseStudy.chart.title")}
                    </div>
                    <div className="mt-1 text-lg font-black">{t("caseStudy.chart.range")}</div>
                  </div>
                  <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-[10px] font-bold text-brand-primary">
                    +140%
                  </span>
                </div>

                <div className="mt-6 flex flex-1 items-end gap-2">
                  {[38, 40, 36, 42, 48, 55, 63, 71, 79, 86, 92, 98].map((h, i) => {
                    const post = i >= 4;
                    return (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                        <div
                          className={`w-full rounded-t-md transition-all ${
                            post ? "bg-brand-primary" : "bg-muted-foreground/25"
                          }`}
                          style={{ height: `${h * 2}px` }}
                        />
                        <div className="text-[9px] font-mono text-muted-foreground">M{i + 1}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center gap-4 border-t border-border/70 pt-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-muted-foreground/40" /> {t("caseStudy.chart.preLaunch")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-brand-primary" /> {t("caseStudy.chart.postLaunch")}
                  </span>
                  <span className="ml-auto flex items-center gap-1 font-semibold text-foreground">
                    <Lock className="h-3 w-3" /> {t("caseStudy.chart.anonymized")}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIAL ==================== */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-xl md:p-12">
            <Quote className="h-10 w-10 text-brand-primary/40" />
            <blockquote className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
               {t("testimonial.quote", { defaultValue: 'Our in-office dispensary was doing $18k / month. Six months after launching the storefront — with Rx gated properly and post-Mohs kits on subscription — we crossed <span class="font-black text-brand-primary">$43k / month online alone</span>, and 63% of subscribers were still active at 90 days.' })}
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-lg font-black text-brand-primary">
                {t("testimonial.initials")}
              </div>
              <div>
                <div className="font-bold">{t("testimonial.author")}</div>
                <div className="text-sm text-muted-foreground">{t("testimonial.role")}</div>
              </div>
            </div>
          </div>
        </Reveal>
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
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <FAQItem 
                key={i} 
                q={t(`faq.items.${i}.q`)} 
                a={t(`faq.items.${i}.a`)} 
                defaultOpen={i === 0} 
              />
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
                alt="DW — Dermatology Website Design"
                width={112}
                height={112}
                loading="lazy"
                className="h-24 w-24 shrink-0 rounded-full object-cover ring-4 ring-brand-primary-foreground/40 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] md:h-28 md:w-28"
              />
              <div>
                <h2 className="text-2xl font-black leading-tight md:text-3xl">
                  {t("cta.title")}
                </h2>
                <p className="mt-3 max-w-2xl text-brand-primary-foreground/85">
                  {t("cta.description")}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to="/get-a-free-quote"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary-foreground px-6 py-3.5 text-sm font-bold text-brand-primary shadow-lg transition-transform hover:scale-[1.03]"
                  >
                    {t("cta.buttons.quote")} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-primary-foreground/40 px-6 py-3.5 text-sm font-semibold text-brand-primary-foreground transition-colors hover:bg-brand-primary-foreground/10"
                  >
                    <MessageSquare className="h-4 w-4" /> {t("cta.buttons.message")}
                  </Link>
                </div>
                <div className="mt-6 border-t border-brand-primary-foreground/20 pt-4">
                  <div className="text-base font-bold text-brand-primary-foreground">{t("cta.branding")}</div>
                  <div className="text-xs opacity-80">{t("cta.tagline")}</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
        {t("footer.exploreNext")}{" "}
        <Link to="/dermatology-website-design" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.links.design")}</Link>,{" "}
        <Link to="/dermatology-local-seo-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.links.seo")}</Link>, {t("common.or", { ns: "translation" })}{" "}
        <Link to="/case-studies" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.links.cases")}</Link>.
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

function MarkCell({ v, highlight }: { v: boolean | "partial"; highlight?: boolean }) {
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
  );}

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

function RevenueEstimator() {
  const { t } = useTranslation("ecommerce");
  const [patients, setPatients] = useState(400);
  const [aov, setAov] = useState(85);
  const buyers = Math.round(patients * 0.22);
  const oneTime = buyers * aov;
  const subs = Math.round(buyers * 0.35) * aov * 2;
  const monthly = Math.round((oneTime + subs) / 3);

  return (
    <section className="border-y border-border/70 bg-gradient-to-b from-muted/40 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-14">
          <div>
            <SectionEyebrow>{t("estimator.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {t("estimator.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("estimator.description")}
            </p>

            <div className="mt-6 space-y-5 rounded-2xl border border-border bg-card p-5">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="patients" className="text-sm font-bold">
                    {t("estimator.labels.patients")} <span className="text-brand-primary">{patients.toLocaleString()}</span>
                  </label>
                  <div className="text-xs text-muted-foreground">100 – 5,000</div>
                </div>
                <input
                  id="patients"
                  type="range"
                  min={100}
                  max={5000}
                  step={100}
                  value={patients}
                  onChange={(e) => setPatients(Number(e.target.value))}
                  className="mt-3 w-full accent-[color:var(--brand-primary)]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="aov" className="text-sm font-bold">
                    {t("estimator.labels.aov")} <span className="text-brand-primary">${aov}</span>
                  </label>
                  <div className="text-xs text-muted-foreground">$40 – $200</div>
                </div>
                <input
                  id="aov"
                  type="range"
                  min={40}
                  max={200}
                  step={5}
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value))}
                  className="mt-3 w-full accent-[color:var(--brand-primary)]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
            <div className="flex items-center gap-2 border-b border-border/70 pb-4">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("estimator.labels.projected")}</div>
                <div className="text-sm font-bold">{t("estimator.labels.quarterlyHeader")}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-[auto_1fr] items-center gap-5">
              <DonutSplit oneTime={oneTime} subs={subs} />
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-black text-brand-primary md:text-3xl">
                    ${monthly.toLocaleString()}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-muted-foreground">{t("estimator.labels.monthly")}</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-brand-primary md:text-3xl">
                    {buyers.toLocaleString()}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-muted-foreground">{t("estimator.labels.buyers")}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-border/70 pt-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <ShoppingBag className="h-4 w-4 text-brand-primary" /> {t("estimator.labels.oneTime")}
                </span>
                <span className="font-bold">${oneTime.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Repeat className="h-4 w-4 text-brand-primary" /> {t("estimator.labels.subscription")}
                </span>
                <span className="font-bold">${subs.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Percent className="h-4 w-4 text-brand-primary" /> {t("estimator.labels.discount")}
                </span>
                <span className="font-bold">15%</span>
              </div>
              <div className="flex items-center justify-between border-t border-border/70 pt-3">
                <span className="flex items-center gap-2 font-bold text-foreground">
                  <Users className="h-4 w-4 text-brand-primary" /> {t("estimator.labels.subscribers90")}
                </span>
                <span className="font-black text-brand-primary">{Math.round(buyers * 0.35)}</span>
              </div>
            </div>

            <p className="mt-5 flex items-start gap-2 rounded-xl bg-muted/40 p-3 text-[11px] text-muted-foreground">
              <Smartphone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary" />
              {t("estimator.labels.disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DonutSplit({ oneTime, subs }: { oneTime: number; subs: number }) {
  const { t } = useTranslation("ecommerce");
  const total = Math.max(oneTime + subs, 1);
  const subsPct = (subs / total) * 100;
  const r = 42;
  const c = 2 * Math.PI * r;
  const subsDash = (subsPct / 100) * c;
  return (
    <div className="relative">
      <svg width="120" height="120" viewBox="0 0 100 100" aria-label={t("estimator.chart.ariaLabel")}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="color-mix(in oklch, var(--brand-primary), transparent 82%)" strokeWidth="12" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="12"
          strokeDasharray={`${subsDash} ${c}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dasharray 500ms cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black leading-none text-foreground">{Math.round(subsPct)}%</span>
        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{t("estimator.chart.recurring")}</span>
      </div>
    </div>
  );
}

function ProductGridPreview() {
  const { t } = useTranslation("ecommerce");
  const products = [
    { img: dermProduct1, name: t("catalog.products.0.name"), tag: "OTC", price: "$68", note: t("catalog.products.0.note") },
    { img: dermProduct2, name: t("catalog.products.1.name"), tag: "OTC", price: "$42", note: t("catalog.products.1.note") },
    { img: dermProduct3, name: t("catalog.products.2.name"), tag: "Rx", price: "$96", note: t("catalog.products.2.note") },
    { img: dermProduct4, name: t("catalog.products.3.name"), tag: "Sub", price: "$28", note: t("catalog.products.3.note") },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <Reveal className="max-w-2xl">
        <SectionEyebrow>{t("catalog.eyebrow")}</SectionEyebrow>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          {t("catalog.title")}
        </h2>
        <p className="mt-4 text-muted-foreground">
          {t("catalog.description")}
        </p>
      </Reveal>

      <RevealStagger className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {products.map((p) => (
          <RevealItem key={p.name}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-primary/40 hover:shadow-2xl">
              <div className="relative aspect-square overflow-hidden bg-muted/30">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                    p.tag === "Rx"
                      ? "bg-brand-primary text-brand-primary-foreground"
                      : p.tag === "Sub"
                        ? "bg-brand-accent/90 text-foreground"
                        : "bg-card text-foreground"
                  }`}
                >
                  {p.tag === "Rx" && <Lock className="h-2.5 w-2.5" />}
                  {p.tag === "Sub" && <Repeat className="h-2.5 w-2.5" />}
                  {p.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-sm font-bold leading-tight sm:text-base">{p.name}</h3>
                <p className="text-[11px] text-muted-foreground sm:text-xs">{p.note}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-lg font-black text-brand-primary">{p.price}</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground transition-colors group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                    <Plus className="h-3 w-3" /> {t("catalog.button")}
                  </span>
                </div>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealStagger>

      <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-brand-primary" /> {t("catalog.badges.hipaa")}</span>
        <span className="inline-flex items-center gap-1.5"><CreditCard className="h-4 w-4 text-brand-primary" /> {t("catalog.badges.hsa")}</span>
        <span className="inline-flex items-center gap-1.5"><Truck className="h-4 w-4 text-brand-primary" /> {t("catalog.badges.delivery")}</span>
        <span className="inline-flex items-center gap-1.5"><Tag className="h-4 w-4 text-brand-primary" /> {t("catalog.badges.schema")}</span>
      </Reveal>
    </section>
  );
}
