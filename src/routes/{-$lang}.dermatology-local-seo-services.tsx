import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks } from "@/lib/i18n-routing";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CountUp } from "@/components/count-up";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  ArrowRight, MapPin, Star, CheckCircle2, Plus, Minus, Building2,
  Navigation, MessageSquare, Search, ShieldCheck, TrendingUp,
  Sparkles, Phone, Compass, Target, ClipboardCheck, Globe2,
  type LucideIcon,
} from "lucide-react";
import heroBg from "@/assets/dermatology-local-seo-hero.jpg";
import { RadiusPicker } from "@/components/widgets/radius-picker";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { robotsContent } from "@/lib/index-allowlist";

type Feature = { icon: LucideIcon; title: string; desc: string };

const PILLARS: Feature[] = [
  { icon: Building2, title: "sections.pillars.items.0.title", desc: "sections.pillars.items.0.desc" },
  { icon: Navigation, title: "sections.pillars.items.1.title", desc: "sections.pillars.items.1.desc" },
  { icon: Compass, title: "sections.pillars.items.2.title", desc: "sections.pillars.items.2.desc" },
  { icon: MessageSquare, title: "sections.pillars.items.3.title", desc: "sections.pillars.items.3.desc" },
  { icon: Globe2, title: "sections.pillars.items.4.title", desc: "sections.pillars.items.4.desc" },
  { icon: Search, title: "sections.pillars.items.5.title", desc: "sections.pillars.items.5.desc" },
  { icon: ShieldCheck, title: "sections.pillars.items.6.title", desc: "sections.pillars.items.6.desc" },
  { icon: TrendingUp, title: "sections.pillars.items.7.title", desc: "sections.pillars.items.7.desc" },
];

const AUDIENCES = [
  { icon: Building2, title: "sections.audience.items.0.title", desc: "sections.audience.items.0.desc" },
  { icon: Globe2, title: "sections.audience.items.1.title", desc: "sections.audience.items.1.desc" },
  { icon: Sparkles, title: "sections.audience.items.2.title", desc: "sections.audience.items.2.desc" },
  { icon: ShieldCheck, title: "sections.audience.items.3.title", desc: "sections.audience.items.3.desc" },
];

const WORKFLOW = [
  { step: "01", title: "sections.workflow.steps.0.title", desc: "sections.workflow.steps.0.desc" },
  { step: "02", title: "sections.workflow.steps.1.title", desc: "sections.workflow.steps.1.desc" },
  { step: "03", title: "sections.workflow.steps.2.title", desc: "sections.workflow.steps.2.desc" },
  { step: "04", title: "sections.workflow.steps.3.title", desc: "sections.workflow.steps.3.desc" },
];

const OUTCOMES = [
  { icon: MapPin, k: "hero.stats.0.value", v: "sections.outcomes.items.0.value" },
  { icon: Star, k: "hero.stats.1.value", v: "sections.outcomes.items.1.value" },
  { icon: Phone, k: "hero.stats.2.value", v: "sections.outcomes.items.2.value" },
  { icon: Target, k: "sections.outcomes.items.3.key", v: "sections.outcomes.items.3.value" },
];

export const Route = createFileRoute("/{-$lang}/dermatology-local-seo-services")({
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
    const st = getStaticTranslation(lang, "localSeo");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-local-seo-services") },
        { title: st?.meta?.title ?? "Dermatology Local SEO Services | Rank in the Google Map Pack" },
        { name: "description", content: st?.meta?.description ?? "Local SEO for dermatology clinics — Google Business Profile optimization, geo-targeted location pages, HIPAA-safe review generation, and citation building for solo and multi-location practices." },
        { property: "og:title", content: st?.meta?.og_title ?? "Dermatology Local SEO Services — Own the Map Pack" },
        { property: "og:description", content: st?.meta?.og_description ?? "Rank in the Google map pack for every city you serve. GBP optimization, local schema, geo-content, and review acceleration built for dermatology." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-local-seo-services" },
        { property: "og:image", content: heroBg },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: st?.meta?.twitter_title ?? "Dermatology Local SEO Services" },
        { name: "twitter:description", content: st?.meta?.twitter_description ?? "Own the Google map pack for every city you serve." },
      ],
      links: [
        { rel: "canonical", href: "/dermatology-local-seo-services" }, ...buildHreflangLinks("/dermatology-local-seo-services", params.lang),
        { rel: "preload", as: "image", href: heroBg, fetchpriority: "high" },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Service",
          serviceType: st?.meta?.json_ld?.service_type,
          provider: { "@type": "Organization", name: st?.meta?.json_ld?.provider_name },
          areaServed: st?.meta?.json_ld?.area_served,
          description: st?.meta?.json_ld?.description,
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: (st?.faq?.items ?? []).map((f: any) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a }
          })),
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: st?.meta?.json_ld?.breadcrumb_home, item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
            { "@type": "ListItem", position: 2, name: st?.meta?.json_ld?.breadcrumb_services, item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-website-design") },
            { "@type": "ListItem", position: 3, name: st?.meta?.json_ld?.breadcrumb_current, item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-local-seo-services") },
          ],
        }) },
      ],
    };
  },
  component: LocalSeoPage,
});

function MapPulseField({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="mp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="800" height="600" fill="url(#mp-grid)" />
      <path d="M 0 200 Q 200 260, 400 220 T 800 260" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
      <path d="M 0 400 Q 250 340, 500 400 T 800 380" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.3" />
      {[[200,220],[560,280],[380,420],[680,180]].map(([x,y],i)=>(
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="10" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.6">
            <animate attributeName="r" values="10;48;10" dur="3.6s" begin={`${i*0.6}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="3.6s" begin={`${i*0.6}s`} repeatCount="indefinite" />
          </circle>
          <path d="M 0 -14 C 10 -14, 12 -4, 0 10 C -12 -4, -10 -14, 0 -14 Z" fill="currentColor" opacity="0.8" />
          <circle cx="0" cy="-6" r="3.5" fill="var(--background)" />
        </g>
      ))}
    </svg>
  );
}

function LocalSeoPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const { t } = useTranslation("localSeo");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <SiteHeader />

      {/* HERO */}
      <section
        className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32"
        style={{
          background:
            "radial-gradient(700px 700px at 50% 40%, color-mix(in oklch, var(--brand-primary), transparent 80%), transparent 55%), radial-gradient(500px 500px at 50% 40%, color-mix(in oklch, var(--brand-accent), transparent 70%), transparent 45%), radial-gradient(320px 320px at 50% 40%, color-mix(in oklch, var(--brand-primary), transparent 60%), transparent 40%), conic-gradient(from 210deg at 20% 90%, color-mix(in oklch, var(--brand-accent), transparent 88%), transparent 55%), linear-gradient(180deg, var(--background), color-mix(in oklch, var(--brand-primary), transparent 96%))",
        }}
      >
        <img
          src={heroBg}
          alt=""
          aria-hidden
          width={1600}
          height={1200}
          fetchPriority="high"
          className="pointer-events-none absolute -right-[30%] -top-16 -z-10 w-[75%] max-w-[900px] opacity-40 mix-blend-multiply select-none sm:-right-[15%] lg:-right-[5%] lg:top-0 lg:w-[55%] lg:opacity-55 dark:mix-blend-screen dark:opacity-25"
          style={{
            maskImage: "radial-gradient(ellipse at 60% 50%, black 35%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse at 60% 50%, black 35%, transparent 78%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] animate-hero-wash"
          style={{
            backgroundImage:
              "radial-gradient(600px 300px at 15% 25%, color-mix(in oklch, var(--brand-primary), transparent 88%), transparent 60%), radial-gradient(500px 260px at 85% 75%, color-mix(in oklch, var(--brand-accent), transparent 88%), transparent 60%), linear-gradient(to right, color-mix(in oklch, var(--brand-primary), transparent 92%) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--brand-primary), transparent 92%) 1px, transparent 1px)",
            backgroundSize: "120% 120%, 120% 120%, 56px 56px, 56px 56px",
            maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
          }}
        />

        <MapPulseField className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 text-brand-primary opacity-40 lg:block" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary backdrop-blur">
                <MapPin className="h-3.5 w-3.5" /> {t("hero.badge")}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-3xl text-balance text-[2rem] font-bold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem] xl:text-[4rem]">
                {t("hero.title_main")}
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
                  to="/free-dermatologist-website-audit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-lg shadow-brand-primary/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                >
                  {t("hero.cta_audit")} <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#pillars"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-brand-primary/40 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                >
                  {t("hero.cta_stack")}
                </a>
              </div>
            </Reveal>

            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {[
                { k: t("hero.stats.0.value"), v: t("hero.stats.0.label") },
                { k: t("hero.stats.1.value"), v: t("hero.stats.1.label") },
                { k: t("hero.stats.2.value"), v: t("hero.stats.2.label") },
                { k: t("hero.stats.3.value"), v: t("hero.stats.3.label") },
              ].map((s) => (
                <li
                  key={s.v}
                  className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg sm:p-5"
                  style={{ boxShadow: "0 8px 30px -18px color-mix(in oklch, var(--brand-primary), transparent 60%)" }}
                >
                  <div className="text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                    {/^\d+[%+]?$/.test(s.k) ? <CountUp value={s.k} /> : s.k}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[11px] sm:tracking-[0.12em]">{s.v}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Radius picker widget */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <RadiusPicker />
            </div>
          </Reveal>

        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.pillars.badge")}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("sections.pillars.heading")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("sections.pillars.description")}</p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <li className="group h-full rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{t(p.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(p.desc)}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* OUTCOMES STRIP */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm sm:p-10"
            style={{ boxShadow: "0 30px 80px -40px color-mix(in oklch, var(--brand-primary), transparent 65%)" }}
          >
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {OUTCOMES.map((o) => (
                <div key={o.v} className="flex flex-col items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                    <o.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {/^\d+[%+]?$/.test(t(o.k)) ? <CountUp value={t(o.k)} /> : t(o.k)}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{t(o.v)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-border/60 pt-6 text-sm italic text-muted-foreground">
              {t("sections.outcomes.testimonial.quote")}
              <span className="mt-2 block text-xs font-semibold not-italic uppercase tracking-[0.15em] text-foreground">{t("sections.outcomes.testimonial.author")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="relative py-20 sm:py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64"
          style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 94%), transparent)" }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.audience.badge")}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("sections.audience.heading")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("sections.audience.description")}</p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.05}>
                <li className="group h-full rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{t(a.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(a.desc)}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* MEDICAL SERVICES */}
      <section className="relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.medical_services.badge")}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("sections.medical_services.heading")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("sections.medical_services.description")}</p>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {(t("sections.medical_services.list", { returnObjects: true }) as string[]).map((s) => (
              <li key={s} className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/40 px-3.5 py-2.5 text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:bg-card/70">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                  <CheckCircle2 className="h-3 w-3" />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WORKFLOW */}
      <section
        className="relative py-20 sm:py-24 lg:py-28"
        style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%), transparent)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.workflow.badge")}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("sections.workflow.heading")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("sections.workflow.description")}</p>
            </div>
          </Reveal>

          <div className="relative mt-12">
            <div aria-hidden className="pointer-events-none absolute left-6 right-6 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent lg:block" />
            <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {WORKFLOW.map((w, i) => (
                <Reveal key={w.step} delay={i * 0.05}>
                  <li className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg">
                    <span className="absolute right-4 top-4 text-5xl font-black leading-none text-brand-primary/10">{w.step}</span>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary">{t(`sections.workflow.steps.${i}.phase`)}</div>
                    <h3 className="mt-3 text-lg font-semibold text-foreground">{t(w.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(w.desc)}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.why_us.badge")}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("sections.why_us.heading")}</h2>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "sections.why_us.items.0.title", desc: "sections.why_us.items.0.desc" },
              { icon: Globe2, title: "sections.why_us.items.1.title", desc: "sections.why_us.items.1.desc" },
              { icon: ClipboardCheck, title: "sections.why_us.items.2.title", desc: "sections.why_us.items.2.desc" },
              { icon: Target, title: "sections.why_us.items.3.title", desc: "sections.why_us.items.3.desc" },
              { icon: Sparkles, title: "sections.why_us.items.4.title", desc: "sections.why_us.items.4.desc" },
              { icon: TrendingUp, title: "sections.why_us.items.5.title", desc: "sections.why_us.items.5.desc" },
            ].map((w) => (
              <li key={w.title} className="rounded-3xl border border-border/60 bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{t(w.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(w.desc)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion
        faqs={t("faq.items", { returnObjects: true }) as any}
        heading={t("faq.heading")}
        idPrefix="local-seo-faq"
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
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("cta_bottom.badge")}</span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("cta_bottom.heading")}</h2>
                <p className="mt-4 text-muted-foreground">{t("cta_bottom.description")}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  to="/free-dermatologist-website-audit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-lg shadow-brand-primary/25 transition-transform hover:-translate-y-0.5"
                >
                  {t("cta_bottom.cta_audit")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/get-a-free-quote"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur hover:border-brand-primary/40 hover:text-brand-primary"
                >
                  {t("cta_bottom.cta_quote")}
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
            <span className="truncate text-sm font-semibold text-foreground">{t("sticky_cta.text")}</span>
            <Link
              to="/free-dermatologist-website-audit"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary-foreground"
            >
              {t("sticky_cta.button")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-20 md:hidden" aria-hidden />

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footer_links.suggestion")}{" "}
          <Link to="/dermatology-seo-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_links.seo_strategy")}</Link>,{" "}
          <Link to="/blog/$slug" params={{ slug: "dermatology-marketing-strategies" }} className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_links.marketing_strategies")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/multi-location-dermatology-website-design" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_links.multi_location")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}
