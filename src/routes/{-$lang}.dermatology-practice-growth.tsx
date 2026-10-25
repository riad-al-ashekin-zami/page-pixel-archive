import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks } from "@/lib/i18n-routing";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CountUp } from "@/components/count-up";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  ArrowRight, TrendingUp, Star, CheckCircle2, Building2,
  Users, MessageSquare, Search, ShieldCheck, Target, Sparkles,
  Phone, LineChart, ClipboardCheck, Globe2, Zap, HeartPulse,
  type LucideIcon,
} from "lucide-react";
import heroBg from "@/assets/dermatology-practice-growth-hero.jpg";
import { GrowthKpiSlider } from "@/components/widgets/growth-kpi-slider";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

type Feature = { icon: LucideIcon; title: string; desc: string };

const GROWTH_LEVERS: Feature[] = [
  { icon: Search, title: "sections.levers.items.0.title", desc: "sections.levers.items.0.desc" },
  { icon: Target, title: "sections.levers.items.1.title", desc: "sections.levers.items.1.desc" },
  { icon: HeartPulse, title: "sections.levers.items.2.title", desc: "sections.levers.items.2.desc" },
  { icon: MessageSquare, title: "sections.levers.items.3.title", desc: "sections.levers.items.3.desc" },
  { icon: LineChart, title: "sections.levers.items.4.title", desc: "sections.levers.items.4.desc" },
  { icon: Users, title: "sections.levers.items.5.title", desc: "sections.levers.items.5.desc" },
  { icon: Zap, title: "sections.levers.items.6.title", desc: "sections.levers.items.6.desc" },
  { icon: ShieldCheck, title: "sections.levers.items.7.title", desc: "sections.levers.items.7.desc" },
];

const AUDIENCES = [
  { icon: Building2, title: "sections.audiences.items.0.title", desc: "sections.audiences.items.0.desc" },
  { icon: Globe2, title: "sections.audiences.items.1.title", desc: "sections.audiences.items.1.desc" },
  { icon: Sparkles, title: "sections.audiences.items.2.title", desc: "sections.audiences.items.2.desc" },
  { icon: ShieldCheck, title: "sections.audiences.items.3.title", desc: "sections.audiences.items.3.desc" },
];

const OUTCOMES = [
  { icon: TrendingUp, k: "sections.outcomes.items.0.k", v: "sections.outcomes.items.0.v" },
  { icon: Star, k: "sections.outcomes.items.1.k", v: "sections.outcomes.items.1.v" },
  { icon: Phone, k: "sections.outcomes.items.2.k", v: "sections.outcomes.items.2.v" },
  { icon: Target, k: "sections.outcomes.items.3.k", v: "sections.outcomes.items.3.v" },
];

export const Route = createFileRoute("/{-$lang}/dermatology-practice-growth")({
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
    const st = getStaticTranslation(lang, "practiceGrowth");
    return {
      meta: [
        { title: st?.meta?.title ?? "Dermatology Practice Growth Services | Booked-Visit Growth, Not Impressions" },
        { name: "description", content: st?.meta?.description ?? "Practice growth for dermatology clinics — patient acquisition, conversion optimization, retention automation, and revenue analytics tied to booked visits and service-line P&L." },
        { property: "og:title", content: st?.meta?.og?.title ?? "Dermatology Practice Growth — Booked Visits, Not Impressions" },
        { property: "og:description", content: st?.meta?.og?.description ?? "End-to-end growth for solo and multi-location dermatology practices — acquisition, conversion, retention, and revenue analytics." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-practice-growth" },
        { property: "og:image", content: heroBg },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: st?.meta?.twitter?.title ?? "Dermatology Practice Growth Services" },
        { name: "twitter:description", content: st?.meta?.twitter?.description ?? "Booked-visit growth for dermatology practices — measured on your P&L." },
      ],
      links: [
        { rel: "canonical", href: "/dermatology-practice-growth" }, ...buildHreflangLinks("/dermatology-practice-growth"),
        { rel: "preload", as: "image", href: heroBg, fetchpriority: "high" },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Service",
          serviceType: st?.meta?.jsonLd?.serviceType ?? "Dermatology Practice Growth Services",
          provider: { "@type": "Organization", name: st?.meta?.jsonLd?.provider ?? "DermatologyWebsiteDesign.com" },
          areaServed: "United States",
          description: st?.meta?.jsonLd?.description ?? "Practice growth services for dermatology practices — patient acquisition, retention, reputation, and revenue analytics.",
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: (st?.faq?.items ?? []).map((f: any) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: st?.meta?.jsonLd?.breadcrumbs?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
            { "@type": "ListItem", position: 2, name: st?.meta?.jsonLd?.breadcrumbs?.services ?? "Services", item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-website-design") },
            { "@type": "ListItem", position: 3, name: st?.meta?.jsonLd?.breadcrumbs?.current ?? "Dermatology Practice Growth", item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-practice-growth") },
          ],
        }) },
      ],
    };
  },
  component: PracticeGrowthPage,
});

function useFooterVisible() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);
  return hidden;
}

function PracticeGrowthPage() {
  const { t } = useTranslation("practiceGrowth");
  const stickyHidden = useFooterVisible();

  const ctaBtn =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <SiteHeader />
      <main id="main">

      <section
        aria-labelledby="hero-h"
        className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32"
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
          decoding="async"
          className="pointer-events-none absolute -right-[30%] -top-16 -z-10 w-[75%] max-w-[900px] opacity-40 mix-blend-multiply select-none sm:-right-[15%] lg:-right-[5%] lg:top-0 lg:w-[55%] lg:opacity-55 dark:mix-blend-screen dark:opacity-25"
          style={{
            maskImage: "radial-gradient(ellipse at 60% 50%, black 35%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse at 60% 50%, black 35%, transparent 78%)",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary backdrop-blur">
                <TrendingUp className="h-3.5 w-3.5" /> {t("hero.badge")}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1
                id="hero-h"
                className="mt-6 max-w-3xl text-balance font-bold leading-[1.05] tracking-[-0.025em] text-foreground"
                style={{ fontSize: "clamp(2rem, 7.5vw, 4rem)" }}
              >
                {t("hero.title")}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg lg:text-xl">
                {t("hero.description")}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/free-dermatologist-website-audit"
                  className={`${ctaBtn} bg-brand-primary text-brand-primary-foreground shadow-lg shadow-brand-primary/25 hover:-translate-y-0.5`}
                >
                  {t("hero.cta.primary")} <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#levers"
                  className={`${ctaBtn} border border-border/70 bg-background/70 text-foreground backdrop-blur hover:border-brand-primary/40 hover:text-brand-primary`}
                >
                  {t("hero.cta.secondary")}
                </a>
              </div>
            </Reveal>

            <RevealStagger as="ul" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" stagger={0.06}>
              {[0, 1, 2, 3].map((idx) => (
                <RevealItem as="li" key={idx}
                  className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg sm:p-5"
                >
                  <div className="text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                    {t(`hero.stats.${idx}.value`)}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[11px] sm:tracking-[0.12em]">{t(`hero.stats.${idx}.label`)}</div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>

          <Reveal delay={0.2}>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <GrowthKpiSlider />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="levers" aria-labelledby="levers-h" className="relative py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.levers.badge")}</span>
              <h2 id="levers-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("sections.levers.heading")}</h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.levers.description")}</p>
            </div>
          </Reveal>

          <RevealStagger as="ul" stagger={0.05}
            className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 md:gap-5 lg:grid-cols-4"
          >
            {GROWTH_LEVERS.map((p) => (
              <RevealItem as="li" key={p.title}
                className="group h-full rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">{t(p.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(p.desc)}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section aria-labelledby="outcomes-h" className="relative py-12 sm:py-16">
        <h2 id="outcomes-h" className="sr-only">{t("sections.outcomes.srTitle")}</h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm sm:p-10"
            style={{ boxShadow: "0 30px 80px -40px color-mix(in oklch, var(--brand-primary), transparent 65%)" }}
          >
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
              {OUTCOMES.map((o) => (
                <div key={o.v} className="flex flex-col items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                    <o.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {/^[\d.]+[%×+]?$/.test(t(o.k)) ? <CountUp value={t(o.k)} /> : t(o.k)}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{t(o.v)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-border/60 pt-6 text-sm italic text-muted-foreground">
              {t("sections.outcomes.quote")}
              <span className="mt-2 block text-xs font-semibold not-italic uppercase tracking-[0.15em] text-foreground">{t("sections.outcomes.attribution")}</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="aud-h" className="relative py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.audiences.badge")}</span>
              <h2 id="aud-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("sections.audiences.heading")}</h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.audiences.description")}</p>
            </div>
          </Reveal>

          <RevealStagger as="ul" stagger={0.05}
            className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 md:gap-5 lg:grid-cols-4"
          >
            {AUDIENCES.map((a) => (
              <RevealItem as="li" key={a.title}
                className="group h-full rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">{t(a.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(a.desc)}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section aria-labelledby="svc-h" className="relative py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.services.badge")}</span>
              <h2 id="svc-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("sections.services.heading")}</h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.services.description")}</p>
            </div>
          </Reveal>

          <RevealStagger as="ul" stagger={0.02}
            className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
          >
            {(t("sections.services.list", { returnObjects: true }) as string[]).map((s, idx) => (
              <RevealItem as="li" key={idx}
                className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/40 px-3.5 py-2.5 text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:bg-card/70"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                  <CheckCircle2 className="h-3 w-3" />
                </span>
                {s}
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section aria-labelledby="wf-h" className="relative py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.workflow.badge")}</span>
              <h2 id="wf-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("sections.workflow.heading")}</h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.workflow.description")}</p>
            </div>
          </Reveal>

          <div className="relative mt-10 sm:mt-12">
            <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((idx) => (
                <Reveal key={idx} delay={idx * 0.05}>
                  <li className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 pl-14 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-brand-primary/50 sm:pl-6">
                    <span className="absolute right-4 top-4 hidden text-5xl font-black leading-none text-brand-primary/10 sm:block">{t(`sections.workflow.steps.${idx}.step`)}</span>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary">{t(`sections.workflow.steps.${idx}.phase`)}</div>
                    <h3 className="mt-3 text-lg font-semibold text-foreground">{t(`sections.workflow.steps.${idx}.title`)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`sections.workflow.steps.${idx}.desc`)}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-h" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.whyUs.badge")}</span>
              <h2 id="why-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("sections.whyUs.heading")}</h2>
            </div>
          </Reveal>

          <RevealStagger as="ul" stagger={0.05} className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {[ 
              { icon: LineChart, key: 0 },
              { icon: ShieldCheck, key: 1 },
              { icon: ClipboardCheck, key: 2 },
              { icon: Target, key: 3 },
              { icon: Sparkles, key: 4 },
              { icon: TrendingUp, key: 5 }
            ].map((w) => (
              <RevealItem as="li" key={w.key}
                className="group rounded-3xl border border-border/60 bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{t(`sections.whyUs.items.${w.key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`sections.whyUs.items.${w.key}.desc`)}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <FaqAccordion
        faqs={t("faq.items", { returnObjects: true }) as any}
        heading={t("faq.heading")}
        idPrefix="growth-faq"
        className="relative py-16 sm:py-24 lg:py-28"
      />

      <section aria-labelledby="cta-h" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] border border-brand-primary/20 p-6 sm:rounded-[32px] sm:p-14">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("cta.badge")}</span>
                <h2 id="cta-h" className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">{t("cta.title")}</h2>
                <p className="mt-4 text-sm text-muted-foreground sm:text-base">{t("cta.description")}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  to="/free-dermatologist-website-audit"
                  className={`${ctaBtn} bg-brand-primary text-brand-primary-foreground shadow-lg shadow-brand-primary/25 hover:-translate-y-0.5`}
                >
                  {t("cta.primary")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/get-a-free-quote"
                  className={`${ctaBtn} border border-border/70 bg-background/70 text-foreground backdrop-blur hover:border-brand-primary/40 hover:text-brand-primary`}
                >
                  {t("cta.secondary")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      <div className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-all duration-300 md:hidden ${stickyHidden ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}>
        <div className="pointer-events-auto mx-3 mb-3 rounded-full border border-border/70 bg-background/95 py-3 pl-5 pr-2 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-sm font-semibold text-foreground">{t("stickyCta.label")}</span>
            <Link to="/free-dermatologist-website-audit" className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary-foreground">
              {t("stickyCta.button")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24">
        {t("related.prefix")}
        <Link to="/blog/$slug" params={{ slug: "dermatology-marketing-strategies" }} className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("related.links.marketing")}</Link>,{" "}
        <Link to="/dermatology-google-ads-ppc" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("related.links.googleAds")}</Link>, {t("common.or", { ns: "translation" })}{" "}
        <Link to="/dermatology-reputation-management" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("related.links.reputation")}</Link>.
      </p>

      <SiteFooter />
    </div>
  );
}
