import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks } from "@/lib/i18n-routing";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  ArrowRight, Star, Plus, Minus, ShieldCheck, MessageSquareQuote,
  Search, TrendingUp, AlertTriangle, Sparkles, Building2,
  Stethoscope, Scissors, Bell, ThumbsUp, MapPin, LineChart,
  CheckCircle2, Quote, Award, PhoneCall, type LucideIcon,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { robotsContent } from "@/lib/index-allowlist";

type Item = { icon: LucideIcon; title: string; desc: string };

const PLATFORMS: { key: string; tint: string; rating: string }[] = [
  { key: "google", tint: "#4285F4", rating: "4.9" },
  { key: "healthgrades", tint: "#00A0B0", rating: "4.8" },
  { key: "realself", tint: "#FF5A5F", rating: "4.9" },
  { key: "zocdoc", tint: "#1D4ED8", rating: "4.8" },
  { key: "yelp", tint: "#D32323", rating: "4.7" },
  { key: "vitals", tint: "#0EA5A5", rating: "4.8" },
];

const AUDIENCES_ICONS = [Stethoscope, Building2, Sparkles, Scissors];

const WORKFLOW_STEPS = ["01", "02", "03", "04", "05"];

const OUTCOMES_CONFIG = [
  { icon: Star, k: "4.9", key: "rating" },
  { icon: MessageSquareQuote, k: "312%", key: "volume" },
  { icon: TrendingUp, k: "68%", key: "visibility" },
  { icon: ThumbsUp, k: "24h", key: "sla" },
];

const SERVICES_ICONS = [Search, MapPin, Bell, MessageSquareQuote, AlertTriangle, LineChart];

export const Route = createFileRoute("/{-$lang}/dermatology-reputation-management")({
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
    const st = getStaticTranslation(lang, "reputation");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-reputation-management") },
        { title: st?.meta?.title ?? "Dermatology Reputation Management | Reviews, GBP & 5-Star Growth" },
        { name: "description", content: st?.meta?.description ?? "" },
        { property: "og:title", content: st?.meta?.og_title ?? "" },
        { property: "og:description", content: st?.meta?.og_description ?? "" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-reputation-management" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: st?.meta?.twitter_title ?? "" },
        { name: "twitter:description", content: st?.meta?.twitter_description ?? "" },
        { property: "og:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: "/dermatology-reputation-management" }, ...buildHreflangLinks("/dermatology-reputation-management", params.lang),
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Service",
          serviceType: st?.meta?.jsonLd?.serviceType,
          provider: { "@type": "Organization", name: st?.meta?.jsonLd?.providerName },
          areaServed: st?.meta?.jsonLd?.areaServed,
          description: st?.meta?.jsonLd?.description,
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: (st?.faq?.items ?? []).map((f: any) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: st?.meta?.jsonLd?.breadcrumb_home, item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
            { "@type": "ListItem", position: 2, name: st?.meta?.jsonLd?.breadcrumb_services, item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-website-design") },
            { "@type": "ListItem", position: 3, name: st?.meta?.jsonLd?.breadcrumb_current, item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-reputation-management") },
          ],
        }) },
      ],
    };
  },
  component: ReputationPage,
});

function DecimalCountUp({ from = 3.9, to = 4.9, duration = 1600, className }: { from?: number; to?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : from);
  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration, reduce]);
  return <span ref={ref} className={className}>{val.toFixed(1)}</span>;
}

function ReviewTicker() {
  const { t } = useTranslation("reputation");
  const reviews = t("ticker.reviews", { returnObjects: true }) as any[];

  return (
    <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-[ticker_45s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
        {[...reviews, ...reviews].map((r, i) => (
          <div key={i} className="w-[300px] shrink-0 rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur-md sm:w-[340px]">
            <div className="flex items-center gap-1 text-brand-primary">
              {[...Array(5)].map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-foreground/90">\"{r.text}\"</p>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="font-semibold text-foreground/70">{r.author}</span>
              <span>·</span>
              <span>{r.src}</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } } @media (prefers-reduced-motion: reduce) { .animate-\\[ticker_45s_linear_infinite\\] { animation: none } }`}</style>
    </div>
  );
}

function BeforeAfterRating() {
  const { t } = useTranslation("reputation");
  const [pos, setPos] = useState(65);
  const before = 3.9;
  const after = 4.9;
  const displayed = (before + ((after - before) * pos) / 100).toFixed(1);
  return (
    <div className="rounded-3xl border border-border/70 bg-card/80 p-6 backdrop-blur-md sm:p-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t("lift_slider.cta_drag")}</div>
          <div className="mt-1 text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-brand-primary">{displayed}</span>
            <span className="ml-2 text-base font-normal text-muted-foreground">{t("lift_slider.stars_total")}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full border border-border bg-background px-2.5 py-1">{t("lift_slider.before")} {before}★</span>
          <ArrowRight className="h-3.5 w-3.5 text-brand-primary" />
          <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 font-semibold text-brand-primary">{t("lift_slider.after")} {after}★</span>
        </div>
      </div>
      <div className="mt-6">
        <div className="relative h-3 rounded-full bg-muted">
          <div className="h-3 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all" style={{ width: `${pos}%` }} />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={t("lift_slider.aria_label")}
          className="mt-3 w-full accent-brand-primary"
        />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 text-center sm:gap-4">
        {[
          { label: t("lift_slider.metrics.reviews"), b: "8", a: "42" },
          { label: t("lift_slider.metrics.calls"), b: "34", a: "128" },
          { label: t("lift_slider.metrics.consults"), b: "12", a: "48" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-border/60 bg-background/60 p-3">
            <div className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{m.label}</div>
            <div className="mt-1 text-sm font-bold text-foreground">
              <span className="text-muted-foreground line-through">{m.b}</span>
              <span className="ml-1 text-brand-primary">{m.a}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StarField({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <pattern id="starPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path
            d="M60 20 L64.7 35.1 L80 35.1 L67.6 44.4 L72.4 59.5 L60 50.2 L47.6 59.5 L52.4 44.4 L40 35.1 L55.3 35.1 Z"
            fill="currentColor"
            opacity="0.06"
          />
          <circle cx="20" cy="90" r="1.2" fill="currentColor" opacity="0.35" />
          <circle cx="100" cy="100" r="0.8" fill="currentColor" opacity="0.25" />
          <circle cx="90" cy="20" r="0.6" fill="currentColor" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="800" height="600" fill="url(#starPattern)" />
      {[
        [120, 90, 22], [670, 140, 28], [230, 420, 20], [560, 480, 24], [400, 240, 32],
      ].map(([cx, cy, r], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`}>
          <circle r={r * 2} fill="url(#starGlow)" opacity="0.35" />
          <path
            d="M0 -14 L4.1 -4.3 L14.6 -4.3 L6.2 2.2 L9.4 12 L0 5.9 L-9.4 12 L-6.2 2.2 L-14.6 -4.3 L-4.1 -4.3 Z"
            fill="currentColor"
            opacity="0.55"
          />
        </g>
      ))}
    </svg>
  );
}

function ReputationPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const { t } = useTranslation("reputation");

  const ctaBtn =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2";

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground lg:pb-0">
      <ScrollProgress />
      <SiteHeader />
      <main id="main">

        <section
          aria-labelledby="hero-h"
          className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-28"
          style={{
            background:
              "radial-gradient(1100px 600px at 88% -10%, color-mix(in oklch, var(--brand-accent), transparent 72%), transparent 60%), radial-gradient(900px 500px at -8% 100%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(700px 700px at 50% 50%, color-mix(in oklch, var(--brand-secondary), transparent 88%), transparent 70%), linear-gradient(180deg, var(--background), color-mix(in oklch, var(--brand-primary), transparent 96%))",
          }}
        >
          <StarField className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-brand-primary opacity-60" />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16 lg:px-8">
            <div className="min-w-0">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary backdrop-blur">
                  <Star className="h-3.5 w-3.5 fill-current" /> {t("hero.badge")}
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1
                  id="hero-h"
                  className="mt-6 max-w-3xl text-balance font-bold leading-[1.05] tracking-[-0.025em] text-foreground"
                  style={{ fontSize: "clamp(1.875rem, 5.4vw, 3.9rem)" }}
                >
                  {t("hero.title_part1")}{" "}
                  <span className="text-brand-primary">{t("hero.title_highlight")}</span>
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
                    to="/contact"
                    className={`${ctaBtn} bg-brand-primary text-brand-primary-foreground shadow-lg shadow-brand-primary/25 hover:-translate-y-0.5`}
                  >
                    {t("hero.cta_audit")} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#workflow"
                    className={`${ctaBtn} border border-border/70 bg-background/70 text-foreground backdrop-blur hover:border-brand-primary/40 hover:text-brand-primary`}
                  >
                    {t("hero.cta_workflow")}
                  </a>
                </div>
              </Reveal>

              <RevealStagger as="ul" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" stagger={0.06}>
                {OUTCOMES_CONFIG.map((o) => (
                  <RevealItem
                    as="li"
                    key={o.key}
                    className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg sm:p-5"
                  >
                    <o.icon className="mb-2 h-4 w-4 text-brand-primary" />
                    <div className="text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                      {/^\d+[%+]?$/.test(o.k) ? <CountUp value={o.k} /> : o.k}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[11px] sm:tracking-[0.12em]">
                      {t(`outcomes.${o.key}`)}
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>

            <Reveal delay={0.2}>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div
                  className="relative rounded-[28px] border border-border/70 bg-card/80 p-5 backdrop-blur-xl sm:p-6"
                  style={{ boxShadow: "0 30px 80px -30px color-mix(in oklch, var(--brand-primary), transparent 55%)" }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t("live_dashboard.label")}</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <DecimalCountUp className="text-4xl font-bold tracking-tight text-foreground" />
                        <span className="text-xs text-muted-foreground">/ 5.0</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-brand-primary">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                        <span className="ml-1.5 text-xs font-medium text-muted-foreground">{t("live_dashboard.reviews_count")}</span>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-primary/10 px-2.5 py-1 text-[11px] font-semibold text-brand-primary">
                      <TrendingUp className="h-3 w-3" /> {t("live_dashboard.growth")}
                    </span>
                  </div>

                  <ul className="mt-5 grid grid-cols-2 gap-2.5">
                    {PLATFORMS.slice(0, 4).map((p) => (
                      <li
                        key={p.key}
                        className="rounded-xl border border-border/60 bg-background/60 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[11px] font-bold uppercase tracking-[0.1em]"
                            style={{ color: p.tint }}
                          >
                            {t(`platforms.items.${p.key}.name`)}
                          </span>
                          <Star className="h-3 w-3 fill-current text-brand-accent" />
                        </div>
                        <div className="mt-1 text-lg font-bold text-foreground">{p.rating}</div>
                        <div className="text-[10px] text-muted-foreground">{t(`platforms.items.${p.key}.note`)}</div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-4">
                    <div className="flex items-center gap-1 text-brand-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-foreground/90">
                      {t("live_dashboard.sample_review")}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="font-semibold text-foreground/70">{t("live_dashboard.sample_author")}</span>
                      <span>·</span>
                      <span>{t("live_dashboard.sample_platform")}</span>
                      <span>·</span>
                      <span>{t("live_dashboard.sample_time")}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-2 hidden rounded-full border border-border/70 bg-card/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-primary shadow-md backdrop-blur sm:inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> {t("live_dashboard.hipaa_badge")}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section aria-label="Trust and recognition" className="relative border-y border-border/60 bg-card/40 py-8 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{t("trust_bar.title")}</p>
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-foreground/70 sm:gap-x-8">
                {[
                  { icon: Award, label: t("trust_bar.items.0") },
                  { icon: ShieldCheck, label: t("trust_bar.items.1") },
                  { icon: Star, label: t("trust_bar.items.2") },
                  { icon: CheckCircle2, label: t("trust_bar.items.3") },
                ].map((b) => (
                  <li key={b.label} className="inline-flex items-center gap-1.5">
                    <b.icon className="h-3.5 w-3.5 text-brand-primary" />
                    {b.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-label="Recent patient reviews" className="relative py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("ticker.badge")}</span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{t("ticker.title")}</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-3 py-1.5 text-[11px] font-semibold text-brand-primary">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary"></span></span>
                {t("ticker.status")}
              </span>
            </div>
          </div>
          <ReviewTicker />
        </section>

        <section aria-labelledby="platforms-h" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("platforms.badge")}</span>
                <h2 id="platforms-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("platforms.title")}
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                  {t("platforms.description")}
                </p>
              </div>
            </Reveal>

            <RevealStagger as="ul" className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PLATFORMS.map((p) => (
                <RevealItem as="li" key={p.key} className="group rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl text-sm font-bold text-primary-foreground"
                      style={{ backgroundColor: p.tint }}
                    >
                      {t(`platforms.items.${p.key}.name`).charAt(0)}
                    </span>
                    <div className="flex items-center gap-1 text-brand-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-current transition-transform duration-300 group-hover:scale-125"
                          style={{ transitionDelay: `${i * 60}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{t(`platforms.items.${p.key}.name`)}</h3>
                  <div className="mt-1 text-2xl font-bold tracking-tight text-brand-primary">{p.rating}<span className="ml-1 text-xs font-normal text-muted-foreground">{t("platforms.client_avg")}</span></div>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`platforms.items.${p.key}.note`)}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section aria-labelledby="included-h" className="relative py-16 sm:py-20 lg:py-24" style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 96%)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("services_included.badge")}</span>
                <h2 id="included-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("services_included.title")}
                </h2>
              </div>
            </Reveal>
            <RevealStagger as="ul" className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES_ICONS.map((Icon, i) => (
                <RevealItem as="li" key={i} className="rounded-2xl border border-border/70 bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{t(`services_included.items.${i}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`services_included.items.${i}.desc`)}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section id="workflow" aria-labelledby="workflow-h" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("workflow.badge")}</span>
                <h2 id="workflow-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("workflow.title")}
                </h2>
              </div>
            </Reveal>

            <ol className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
              {WORKFLOW_STEPS.map((step, i) => (
                <Reveal as="li" key={step} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg">
                    <div className="text-xs font-bold tracking-[0.18em] text-brand-primary">{t(`workflow.steps.${i}.label`)}</div>
                    <h3 className="mt-3 text-lg font-bold text-foreground">{t(`workflow.steps.${i}.title`)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`workflow.steps.${i}.desc`)}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="proof-h" className="relative py-16 sm:py-20 lg:py-24" style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 96%)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("testimonials.badge")}</span>
                <h2 id="proof-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("testimonials.title")}
                </h2>
              </div>
            </Reveal>

            <RevealStagger as="ul" className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {(t("testimonials.items", { returnObjects: true }) as any[]).map((tVal, i) => (
                <RevealItem as="li" key={i} className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <Quote className="h-6 w-6 text-brand-primary/40" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">\"{tVal.quote}\"</p>
                  <div className="mt-4 flex items-center gap-1 text-brand-primary">
                    {[...Array(5)].map((_, starsIdx) => (
                      <Star key={starsIdx} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="mt-3 border-t border-border/60 pt-3">
                    <div className="text-sm font-bold text-foreground">{tVal.author}</div>
                    <div className="text-xs text-muted-foreground">{tVal.role}</div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section aria-labelledby="audiences-h" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("audiences.badge")}</span>
                <h2 id="audiences-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("audiences.title")}
                </h2>
              </div>
            </Reveal>
            <RevealStagger as="ul" className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {AUDIENCES_ICONS.map((Icon, i) => (
                <RevealItem as="li" key={i} className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foreground">{t(`audiences.items.${i}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`audiences.items.${i}.desc`)}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section aria-labelledby="services-h" className="relative py-16 sm:py-20 lg:py-24" style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 96%)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("medical_services.badge")}</span>
                <h2 id="services-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("medical_services.title")}
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                  {t("medical_services.description")}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
                {(t("medical_services.list", { returnObjects: true }) as string[]).map((s, i) => (
                  <li
                    key={i}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-medium text-foreground shadow-sm sm:text-sm"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="lift-h" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("lift_slider.badge")}</span>
                <h2 id="lift-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("lift_slider.title")}
                </h2>
                <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                  {t("lift_slider.description")}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10">
                <BeforeAfterRating />
              </div>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="faq-h" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("faq.badge")}</span>
                <h2 id="faq-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("faq.title")}
                </h2>
              </div>
            </Reveal>

            <ul className="mt-10 divide-y divide-border/70 rounded-2xl border border-border/70 bg-card/60 backdrop-blur">
              {(t("faq.items", { returnObjects: true }) as any[]).map((f, i) => {
                const open = openFaq === i;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-brand-primary/5 sm:px-6"
                    >
                      <span className="text-sm font-semibold text-foreground sm:text-base">{f.q}</span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-brand-primary">
                        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    {open && (
                      <div className="px-5 pb-5 sm:px-6">
                        <p className="text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section aria-labelledby="cta-h" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div
              className="relative overflow-hidden rounded-3xl border border-border/60 p-8 sm:p-12 lg:p-16"
              style={{
                background:
                  "radial-gradient(600px 300px at 90% 10%, color-mix(in oklch, var(--brand-accent), transparent 70%), transparent 60%), radial-gradient(600px 300px at 10% 100%, color-mix(in oklch, var(--brand-primary), transparent 55%), transparent 60%), linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), black 15%), var(--brand-primary))",
              }}
            >
              <StarField className="pointer-events-none absolute inset-0 h-full w-full text-brand-primary-foreground opacity-30" />
              <div className="relative max-w-2xl">
                <h2 id="cta-h" className="text-3xl font-bold tracking-tight text-brand-primary-foreground sm:text-4xl lg:text-5xl">
                  {t("cta_bottom.title")}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-primary-foreground/90 sm:text-lg">
                  {t("cta_bottom.description")}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className={`${ctaBtn} bg-background text-brand-primary shadow-lg hover:-translate-y-0.5`}
                  >
                    {t("cta_bottom.cta_audit")} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className={`${ctaBtn} border border-brand-primary-foreground/30 text-brand-primary-foreground hover:bg-brand-primary-foreground/10`}
                  >
                    {t("cta_bottom.cta_contact")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-3 z-40 mx-auto flex w-[min(94%,420px)] items-center gap-2 rounded-full border border-border/70 bg-card/90 p-2 shadow-xl backdrop-blur-md lg:hidden">
          <Link
            to="/contact"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-primary px-4 py-2.5 text-xs font-bold text-brand-primary-foreground"
          >
            {t("mobile_sticky.audit")} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/contact"
            aria-label={t("mobile_sticky.contact_aria")}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-primary/30 text-brand-primary"
          >
            <PhoneCall className="h-4 w-4" />
          </Link>
        </div>

      </main>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("related.text")}{" "}
          <Link to="/dermatology-local-seo-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("related.links.seo")}</Link>,{" "}
          <Link to="/dermatology-social-media-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("related.links.social")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/dermatology-email-marketing" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("related.links.email")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}
