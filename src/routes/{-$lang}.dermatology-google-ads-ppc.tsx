import { finalizeSeoHead } from "@/lib/seo-head";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { CtaLabel } from "@/lib/cta";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks, useCurrentLang } from "@/lib/i18n-routing";
import { formatLocalizedNumber } from "@/lib/locale-format";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CountUp } from "@/components/count-up";
import { ScrollProgress } from "@/components/scroll-progress";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import {
  ArrowRight,
  MousePointerClick,
  Plus,
  Minus,
  Building2,
  Search,
  ShieldCheck,
  Target,
  Sparkles,
  Phone,
  LineChart,
  ClipboardCheck,
  Globe2,
  Zap,
  DollarSign,
  Gauge,
  BarChart3,
  PlayCircle,
  Filter,
  Layers,
  MapPin,
  CheckCircle2,
  TrendingUp,
  type LucideIcon
} from "lucide-react";
import heroAsset from "@/assets/dermatology-ppc-hero.jpg.asset.json";
import { CpcCalculator } from "@/components/widgets/cpc-calculator";
import { isValidUrlLang } from "@/i18n/languages";
import { robotsContent } from "@/lib/index-allowlist";

const heroUrl = heroAsset.url;

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const CAMPAIGN_TYPES: Feature[] = [
  { icon: Search, title: "sections.campaigns.items.0.title", desc: "sections.campaigns.items.0.desc" },
  { icon: MapPin, title: "sections.campaigns.items.1.title", desc: "sections.campaigns.items.1.desc" },
  { icon: PlayCircle, title: "sections.campaigns.items.2.title", desc: "sections.campaigns.items.2.desc" },
  { icon: Layers, title: "sections.campaigns.items.3.title", desc: "sections.campaigns.items.3.desc" },
  { icon: Filter, title: "sections.campaigns.items.4.title", desc: "sections.campaigns.items.4.desc" },
  { icon: BarChart3, title: "sections.campaigns.items.5.title", desc: "sections.campaigns.items.5.desc" }
];

const AUDIENCES = [
  { icon: Building2, title: "sections.audiences.items.0.title", desc: "sections.audiences.items.0.desc" },
  { icon: Globe2, title: "sections.audiences.items.1.title", desc: "sections.audiences.items.1.desc" },
  { icon: Sparkles, title: "sections.audiences.items.2.title", desc: "sections.audiences.items.2.desc" },
  { icon: ShieldCheck, title: "sections.audiences.items.3.title", desc: "sections.audiences.items.3.desc" }
];

const WORKFLOW = [
  { step: "01", title: "sections.workflow.steps.0.title", desc: "sections.workflow.steps.0.desc" },
  { step: "02", title: "sections.workflow.steps.1.title", desc: "sections.workflow.steps.1.desc" },
  { step: "03", title: "sections.workflow.steps.2.title", desc: "sections.workflow.steps.2.desc" },
  { step: "04", title: "sections.workflow.steps.3.title", desc: "sections.workflow.steps.3.desc" }
];

const OUTCOMES = [
  { icon: DollarSign, k: "sections.outcomes.items.0.value", v: "sections.outcomes.items.0.label" },
  { icon: Phone, k: "sections.outcomes.items.1.value", v: "sections.outcomes.items.1.label" },
  { icon: Gauge, k: "sections.outcomes.items.2.value", v: "sections.outcomes.items.2.label" },
  { icon: Target, k: "sections.outcomes.items.3.value", v: "sections.outcomes.items.3.label" }
];

const WHY_US_ITEMS = [
  { icon: LineChart, title: "sections.whyUs.items.0.title", desc: "sections.whyUs.items.0.desc" },
  { icon: ShieldCheck, title: "sections.whyUs.items.1.title", desc: "sections.whyUs.items.1.desc" },
  { icon: ClipboardCheck, title: "sections.whyUs.items.2.title", desc: "sections.whyUs.items.2.desc" },
  { icon: Target, title: "sections.whyUs.items.3.title", desc: "sections.whyUs.items.3.desc" },
  { icon: Sparkles, title: "sections.whyUs.items.4.title", desc: "sections.whyUs.items.4.desc" },
  { icon: Zap, title: "sections.whyUs.items.5.title", desc: "sections.whyUs.items.5.desc" }
];

export const Route = createFileRoute("/{-$lang}/dermatology-google-ads-ppc")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" })
  },

  head: (args) => finalizeSeoHead((({ params }: typeof args) => {
    const { lang } = params;
    const st = getStaticTranslation(lang, "googleAds");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-google-ads-ppc") },
        { title: st?.meta?.title ?? "Dermatology Google Ads & PPC Management | Booked Visits, Not Clicks" },
        { name: "description", content: st?.meta?.description ?? "" },
        { property: "og:title", content: st?.meta?.og?.title ?? "" },
        { property: "og:description", content: st?.meta?.og?.description ?? "" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-google-ads-ppc" },
        { property: "og:image", content: heroUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: st?.meta?.twitter?.title ?? "" },
        { name: "twitter:description", content: st?.meta?.twitter?.description ?? "" }
      ],
      links: [
        { rel: "canonical", href: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-google-ads-ppc") },
        ...buildHreflangLinks("/dermatology-google-ads-ppc", params.lang),
        { rel: "preload", as: "image", href: heroUrl, fetchpriority: "high" }
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: st?.meta?.jsonLd?.serviceType,
            provider: { "@type": "Organization", name: st?.meta?.jsonLd?.provider },
            areaServed: "United States",
            description: st?.meta?.jsonLd?.description
          })
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: (st?.faq?.items || []).map((f: any) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a }
            }))
          })
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: st?.meta?.jsonLd?.breadcrumb?.home, item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
              { "@type": "ListItem", position: 2, name: st?.meta?.jsonLd?.breadcrumb?.services, item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
              { "@type": "ListItem", position: 3, name: st?.meta?.jsonLd?.breadcrumb?.ads, item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-google-ads-ppc") }
            ]
          })
        }
      ]
    };
  })(args), args.params.lang, "/dermatology-google-ads-ppc"),
  component: PpcPage
});

function useFooterVisible() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      rootMargin: "0px 0px -20% 0px"
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);
  return hidden;
}

function BidWaveField({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bw-line" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 120 + i * 90;
        const amp = 12 + i * 4;
        return <path key={i} d={`M 0 ${y} Q 100 ${y - amp} 200 ${y} T 400 ${y} T 600 ${y} T 800 ${y}`} fill="none" stroke="url(#bw-line)" strokeWidth="1.4" />;
      })}
      {[[90, 150], [240, 320], [380, 180], [520, 410], [660, 260], [720, 470]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} opacity="0.75">
          <circle r="18" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <text textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="700" fill="currentColor" fontFamily="ui-sans-serif, system-ui">$</text>
          <circle r="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="18;34;18" dur="3s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      {[[160, 410], [460, 150], [600, 380]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y} l 0 22 l 6 -6 l 6 12 l 4 -2 l -6 -12 l 8 0 Z`} fill="currentColor" opacity="0.6" />
      ))}
    </svg>
  );
}

function PpcPage() {
  const { t } = useTranslation("googleAds");
  const lang = useCurrentLang();
  const stickyHidden = useFooterVisible();

  const ctaBtn =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <SiteHeader />
      <main id="main">
        {/* HERO */}
        <section
          aria-labelledby="hero-h"
          className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32"
          style={{
            background:
              "radial-gradient(1000px 500px at 90% -10%, color-mix(in oklch, var(--brand-accent), transparent 78%), transparent 60%), radial-gradient(800px 450px at -5% 105%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 60%), linear-gradient(180deg, var(--background), color-mix(in oklch, var(--brand-primary), transparent 96%))"
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklch, var(--brand-primary), transparent 92%) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--brand-primary), transparent 92%) 1px, transparent 1px)",
              backgroundSize: "56px 56px, 56px 56px",
              maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)"
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='turbulence' baseFrequency='1.4 0.6' numOctaves='1' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.05  0 0 0 0 0.15  0 0 0 0 0.35  0 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"
            }}
          />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary backdrop-blur">
                  <MousePointerClick className="h-3.5 w-3.5" /> {t("hero.badge")}
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1
                  id="hero-h"
                  className="mt-6 max-w-3xl text-balance font-bold leading-[1.05] tracking-[-0.025em] text-foreground"
                  style={{ fontSize: "clamp(2rem, 7.5vw, 4rem)" }}
                >
                  {t("hero.ownerHeading")}
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{t("hero.ownerSlogan")}</p>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg lg:text-xl">
                  {t("hero.description")}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to="/contact"
                    className={`${ctaBtn} bg-brand-primary text-brand-primary-foreground shadow-lg shadow-brand-primary/25 hover:-translate-y-0.5`}
                  >
                    <CtaLabel /> <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#campaigns"
                    className={`${ctaBtn} border border-border/70 bg-background/70 text-foreground backdrop-blur hover:border-brand-primary/40 hover:text-brand-primary`}
                  >
                    {t("hero.cta.campaigns")}
                  </a>
                </div>
              </Reveal>

              <RevealStagger as="ul" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" stagger={0.06}>
                {(t("hero.stats", { returnObjects: true }) as any[]).map((s: any, idx: number) => (
                  <RevealItem as="li" key={idx}
                    className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg sm:p-5"
                  >
                    <div className="text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                      {/^\d+[%+]?$/.test(s.value) ? <CountUp value={s.value} /> : s.value}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[11px] sm:tracking-[0.12em]">{s.label}</div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>

            {/* PPC CPC calculator */}
            <Reveal delay={0.2}>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <CpcCalculator />
              </div>
            </Reveal>
          </div>
        </section>

        {/* CAMPAIGN TYPES */}
        <section id="campaigns" aria-labelledby="camp-h" className="relative py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.campaigns.badge")}</span>
                <h2 id="camp-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("sections.campaigns.heading")}</h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.campaigns.description")}</p>
              </div>
            </Reveal>

            <RevealStagger as="ul" stagger={0.05} className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {CAMPAIGN_TYPES.map((p, idx) => (
                <RevealItem as="li" key={idx}
                  className="group h-full rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_55%)]"
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

        {/* OUTCOMES */}
        <section aria-labelledby="outcomes-h" className="relative py-12 sm:py-16">
          <h2 id="outcomes-h" className="sr-only">{t("sections.outcomes.ariaLabel")}</h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm sm:p-10"
              style={{ boxShadow: "0 30px 80px -40px color-mix(in oklch, var(--brand-primary), transparent 65%)" }}
            >
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
                {OUTCOMES.map((o, idx) => (
                  <div key={idx} className="flex flex-col items-start gap-3">
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

        {/* WASTED SPEND CALLOUT */}
        <section aria-labelledby="waste-h" className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
              <Reveal>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.wastedSpend.badge")}</span>
                  <h2 id="waste-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("sections.wastedSpend.heading")}</h2>
                  <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.wastedSpend.description")}</p>
                </div>
              </Reveal>
              <RevealStagger as="ul" stagger={0.05} className="space-y-3">
                {(t("sections.wastedSpend.items", { returnObjects: true }) as string[]).map((w: string, i: number) => (
                  <RevealItem as="li" key={i}
                    className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card/50 p-4 transition-all hover:border-brand-primary/40 hover:bg-card/80"
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-primary/10 text-xs font-bold text-brand-primary transition-all group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                      {formatLocalizedNumber(i + 1, lang, 2)}
                    </span>
                    <span className="text-sm leading-relaxed text-foreground sm:text-base">{w}</span>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </div>
        </section>

        {/* AUDIENCE */}
        <section aria-labelledby="aud-h" className="relative py-16 sm:py-24 lg:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64"
            style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 94%), transparent)" }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.audiences.badge")}</span>
                <h2 id="aud-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("sections.audiences.heading")}</h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.audiences.description")}</p>
              </div>
            </Reveal>

            <RevealStagger as="ul" stagger={0.05} className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
              {AUDIENCES.map((a, idx) => (
                <RevealItem as="li" key={idx}
                  className="group h-full rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_55%)]"
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

        {/* MEDICAL SERVICES */}
        <section aria-labelledby="svc-h" className="relative py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.services.badge")}</span>
                <h2 id="svc-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("sections.services.heading")}</h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.services.description")}</p>
              </div>
            </Reveal>

            <RevealStagger as="ul" stagger={0.02} className="mt-10 grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(t("sections.services.list", { returnObjects: true }) as string[]).map((s: string, idx: number) => (
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

        {/* WORKFLOW */}
        <section aria-labelledby="wf-h"
          className="relative py-16 sm:py-24 lg:py-28"
          style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%), transparent)" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.workflow.badge")}</span>
                <h2 id="wf-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("sections.workflow.heading")}</h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.workflow.description")}</p>
              </div>
            </Reveal>

            <div className="relative mt-10 sm:mt-12">
              <div aria-hidden className="pointer-events-none absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-brand-primary/40 via-brand-primary/20 to-transparent sm:hidden" />
              <div aria-hidden className="pointer-events-none absolute left-6 right-6 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent lg:block" />

              <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {WORKFLOW.map((w, i) => (
                  <Reveal key={w.step} delay={i * 0.05}>
                    <li className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 pl-14 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg sm:pl-6">
                      <span aria-hidden className="absolute left-4 top-6 grid h-6 w-6 place-items-center rounded-full border border-brand-primary/40 bg-background text-[10px] font-bold text-brand-primary sm:hidden">
                        {w.step}
                      </span>
                      <span className="absolute right-4 top-4 hidden text-5xl font-black leading-none text-brand-primary/10 sm:block">{w.step}</span>
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
        <section aria-labelledby="why-h" className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.whyUs.badge")}</span>
                <h2 id="why-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("sections.whyUs.heading")}</h2>
              </div>
            </Reveal>

            <RevealStagger as="ul" stagger={0.05} className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {WHY_US_ITEMS.map((w, idx) => (
                <RevealItem as="li" key={idx}
                  className="group rounded-3xl border border-border/60 bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{t(w.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(w.desc)}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion
          faqs={t("faq.items", { returnObjects: true }) as any}
          heading={t("faq.heading")}
          idPrefix="ppc-faq"
          className="relative py-16 sm:py-24 lg:py-28"
        />

        {/* CTA */}
        <section aria-labelledby="cta-h" className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div
              className="relative overflow-hidden rounded-[28px] border border-brand-primary/20 p-6 sm:rounded-[32px] sm:p-14"
              style={{
                background:
                  "radial-gradient(600px 300px at 10% 0%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(500px 250px at 100% 100%, color-mix(in oklch, var(--brand-accent), transparent 80%), transparent 60%), var(--card)"
              }}
            >
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("cta.badge")}</span>
                  <h2 id="cta-h" className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">{t("cta.heading")}</h2>
                  <p className="mt-4 text-sm text-muted-foreground sm:text-base">{t("cta.description")}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    to="/contact"
                    className={`${ctaBtn} bg-brand-primary text-brand-primary-foreground shadow-lg shadow-brand-primary/25 hover:-translate-y-0.5`}
                  >
                    <CtaLabel /> <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-all duration-300 md:hidden ${
          stickyHidden ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
        aria-hidden={stickyHidden}
      >
        <div className="pointer-events-auto mx-3 mb-3 rounded-full border border-border/70 bg-background/95 py-3 pl-5 pr-2 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-sm font-semibold text-foreground">{t("stickyMobile.text")}</span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              <CtaLabel /> <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-20 md:hidden" aria-hidden />

      <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
        {t("footerLinks.pretext")}{" "}
        <Link to="/dermatology-seo-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">
          {t("footerLinks.seo")}
        </Link>
        ,{" "}
        <Link to="/dermatology-conversion-rate-optimization" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">
          {t("footerLinks.cro")}
        </Link>
        , {t("common.or", { ns: "translation" })}{" "}
        <Link to="/dermatology-email-marketing" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">
          {t("footerLinks.email")}
        </Link>
        .
      </p>

      <SiteFooter />

      {/* Hero preload image element for LCP */}
      <img src={heroUrl} alt="" aria-hidden width={1} height={1} className="hidden" />
    </div>
  );
}
