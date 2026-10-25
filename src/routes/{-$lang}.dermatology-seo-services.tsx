import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks } from "@/lib/i18n-routing";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CountUp } from "@/components/count-up";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  ArrowRight, Search, MapPin, TrendingUp, FileSearch, Link2, Gauge,
  Target, BarChart3, Sparkles, CheckCircle2, Plus, Minus, ShieldCheck,
  Globe, PenSquare, Star, LineChart, Award, ScanSearch,
  type LucideIcon,
} from "lucide-react";
import heroBg from "@/assets/dermatology-seo-hero.jpg";
import { RankClimbTicker } from "@/components/widgets/rank-climb-ticker";
import { isValidUrlLang } from "@/i18n/languages";
import { robotsContent } from "@/lib/index-allowlist";

type Feature = { icon: LucideIcon; title: string; desc: string };

const PILLARS_ICONS = [
  ScanSearch, MapPin, FileSearch, PenSquare, Link2, Gauge, Star, BarChart3
];

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

  head: ({ params }) => {
    const { lang } = params;
    const st = getStaticTranslation(lang, "seoServices");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-seo-services") },
        { title: st?.meta?.title ?? "Dermatology SEO Services — Rank for Skin & Cosmetic Search" },
        {
          name: "description",
          content:
            st?.meta?.description ??
            "SEO built for dermatology practices: technical audits, on-page optimization, local map-pack rankings, condition and treatment content, and measurable patient-acquisition growth.",
        },
        {
          property: "og:title",
          content: st?.meta?.og_title ?? "Dermatology SEO Services — Rank for Skin & Cosmetic Search",
        },
        {
          property: "og:description",
          content:
            st?.meta?.og_description ??
            "Purpose-built SEO for dermatology clinics — rank for high-intent skin, cosmetic and medical dermatology searches in your city and fill your schedule with new patients.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-seo-services" },
        { property: "og:image", content: heroBg },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: st?.meta?.twitter_title ?? "Dermatology SEO Services — Rank for Skin & Cosmetic Search",
        },
        {
          name: "twitter:description",
          content:
            st?.meta?.twitter_description ??
            "SEO built for dermatology practices — rank locally, capture high-intent skin and cosmetic searches, and grow new-patient bookings.",
        },
      ],
      links: [
        { rel: "canonical", href: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-seo-services") },
        ...buildHreflangLinks("/dermatology-seo-services", params.lang),
        { rel: "preload", as: "image", href: heroBg, fetchpriority: "high" },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Service",
          serviceType: st?.jsonLd?.serviceType,
          provider: { "@type": "Organization", name: st?.jsonLd?.providerName },
          areaServed: st?.jsonLd?.areaServed,
          description: st?.jsonLd?.description,
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: (st?.faq?.items || []).map((f: any) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: st?.jsonLd?.breadcrumbs?.home, item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
            { "@type": "ListItem", position: 2, name: st?.jsonLd?.breadcrumbs?.services, item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-website-design") },
            { "@type": "ListItem", position: 3, name: st?.jsonLd?.breadcrumbs?.dermatology_seo, item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-seo-services") },
          ],
        }) },
      ],
    };
  },
  component: SeoServicesPage,
});

function RankTickerField({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="rt-line" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[80,140,200,260,320,380,440,500].map((y,i)=>(
        <g key={i} opacity={0.4 - i*0.02}>
          <line x1="80" y1={y} x2="740" y2={y} stroke="url(#rt-line)" strokeWidth="1" />
          <rect x="80" y={y-8} width={Math.max(80, 520 - i*55)} height="4" rx="2" fill="currentColor" opacity="0.55" />
          <text x="68" y={y+4} textAnchor="end" fontSize="11" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.65">#{i+1}</text>
        </g>
      ))}
      <path id="rt-path" d="M 100 500 Q 250 420, 380 340 T 720 120" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.55" />
      <circle r="7" fill="currentColor">
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath href="#rt-path" />
        </animateMotion>
      </circle>
    </svg>
  );
}

function SeoServicesPage() {
  const { t } = useTranslation("seoServices");
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              {(t("hero.stats", { returnObjects: true }) as any[]).map((s, i) => (
                <li
                  key={i}
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

          {/* Live rank-climb ticker */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <RankClimbTicker />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("pillars.badge")}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("pillars.heading")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("pillars.description")}</p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(t("pillars.items", { returnObjects: true }) as any[]).map((p, i) => {
              const Icon = PILLARS_ICONS[i];
              return (
                <Reveal key={i} delay={i * 0.04}>
                  <li className="group h-full rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  </li>
                </Reveal>
              )
            })}
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
            <div className="grid gap-8 sm:grid-cols-3">
              {(t("outcomes.items", { returnObjects: true }) as any[]).map((o, i) => {
                const Icon = OUTCOMES_ICONS[i];
                return (
                  <div key={i} className="flex flex-col items-start gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{/^\d+[%+]?$/.test(o.k) ? <CountUp value={o.k} /> : o.k}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{o.v}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-8 border-t border-border/60 pt-6 text-sm italic text-muted-foreground">
              {t("outcomes.testimonial")}
              <span className="mt-2 block text-xs font-semibold not-italic uppercase tracking-[0.15em] text-foreground">{t("outcomes.testimonial_author")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE + SERVICES */}
      <section className="relative py-20 sm:py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64"
          style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 94%), transparent)" }}
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-8">
          <Reveal>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("audiences.badge")}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("audiences.heading")}</h2>
              <p className="mt-4 text-muted-foreground">{t("audiences.description")}</p>
              <ul className="mt-8 grid gap-3">
                {(t("audiences.list", { returnObjects: true }) as string[]).map((a, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/50 px-4 py-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-primary" />
                    <span className="text-sm font-medium text-foreground">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("services.badge")}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("services.heading")}</h2>
              <p className="mt-4 text-muted-foreground">{t("services.description")}</p>
              <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {(t("services.list", { returnObjects: true }) as string[]).map((s, i) => (
                  <li key={i} className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/40 px-3.5 py-2.5 text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:bg-card/70">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                      <CheckCircle2 className="h-3 w-3" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
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
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("workflow.badge")}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("workflow.heading")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("workflow.description")}</p>
            </div>
          </Reveal>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(t("workflow.phases", { returnObjects: true }) as any[]).map((w, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg">
                  <span className="absolute right-4 top-4 text-5xl font-black leading-none text-brand-primary/10">{w.step}</span>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary">{w.label}</div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("why_us.badge")}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("why_us.heading")}</h2>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(t("why_us.items", { returnObjects: true }) as any[]).map((w, i) => {
              const Icon = WHY_US_ICONS[i];
              return (
                <li key={i} className="rounded-3xl border border-border/60 bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion
        faqs={t("faq.items", { returnObjects: true }) as any[]}
        heading={t("faq.heading")}
        idPrefix="seo-faq"
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
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-lg shadow-brand-primary/25 transition-transform hover:-translate-y-0.5"
                >
                  {t("cta_bottom.btn_audit")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur hover:border-brand-primary/40 hover:text-brand-primary"
                >
                  {t("cta_bottom.btn_quote")}
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
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary-foreground"
            >
              {t("sticky_cta.btn")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-20 md:hidden" aria-hidden />

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footer_links.pre_text")}{" "}
          <Link to="/dermatology-local-seo-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_links.local_seo")}</Link>,{" "}
          <Link to="/blog/$slug" params={{ slug: "dermatology-marketing-strategies" }} className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_links.marketing_playbook")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/dermatology-practice-growth" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_links.practice_growth")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}
