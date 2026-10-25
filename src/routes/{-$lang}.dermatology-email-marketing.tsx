import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { CtaLabel } from "@/lib/cta";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks } from "@/lib/i18n-routing";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  ArrowRight, Plus, Minus, ShieldCheck, Mail, MailCheck, MailOpen, Send,
  Inbox, TrendingUp, Sparkles, Building2, Stethoscope, Scissors,
  CheckCircle2, Quote, Award, PhoneCall, MousePointerClick, Calendar,
  Layers, Zap, BarChart3, FileText, Circle, type LucideIcon,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { robotsContent } from "@/lib/index-allowlist";

type Item = { icon: LucideIcon; title: string; desc: string };

const AUDIENCES: (t: any) => Item[] = (t) => [
  { icon: Stethoscope, title: t("audiences.items.0.title"), desc: t("audiences.items.0.desc") },
  { icon: Building2, title: t("audiences.items.1.title"), desc: t("audiences.items.1.desc") },
  { icon: Sparkles, title: t("audiences.items.2.title"), desc: t("audiences.items.2.desc") },
  { icon: Scissors, title: t("audiences.items.3.title"), desc: t("audiences.items.3.desc") },
];

const FLOWS = (t: any) => [
  { step: "01", icon: Send, title: t("flows.items.0.title"), desc: t("flows.items.0.desc") },
  { step: "02", icon: Calendar, title: t("flows.items.1.title"), desc: t("flows.items.1.desc") },
  { step: "03", icon: MailOpen, title: t("flows.items.2.title"), desc: t("flows.items.2.desc") },
  { step: "04", icon: TrendingUp, title: t("flows.items.3.title"), desc: t("flows.items.3.desc") },
  { step: "05", icon: BarChart3, title: t("flows.items.4.title"), desc: t("flows.items.4.desc") },
];

const OUTCOMES = (t: any) => [
  { icon: MailOpen, k: "42%", v: t("outcomes.openRate") },
  { icon: MousePointerClick, k: "8.6%", v: t("outcomes.ctr") },
  { icon: Calendar, k: "3.4x", v: t("outcomes.recallLift") },
  { icon: ShieldCheck, k: "100%", v: t("outcomes.hipaaReview") },
];

const SERVICES_INCLUDED: (t: any) => Item[] = (t) => [
  { icon: FileText, title: t("servicesIncluded.items.0.title"), desc: t("servicesIncluded.items.0.desc") },
  { icon: Layers, title: t("servicesIncluded.items.1.title"), desc: t("servicesIncluded.items.1.desc") },
  { icon: Mail, title: t("servicesIncluded.items.2.title"), desc: t("servicesIncluded.items.2.desc") },
  { icon: Zap, title: t("servicesIncluded.items.3.title"), desc: t("servicesIncluded.items.3.desc") },
  { icon: Inbox, title: t("servicesIncluded.items.4.title"), desc: t("servicesIncluded.items.4.desc") },
  { icon: BarChart3, title: t("servicesIncluded.items.5.title"), desc: t("servicesIncluded.items.5.desc") },
];

export const Route = createFileRoute("/{-$lang}/dermatology-email-marketing")({
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
    const st = getStaticTranslation(lang, "emailMarketing");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-email-marketing") },
        { title: st?.meta?.title ?? "Dermatology Email Marketing | HIPAA-Safe Recall, Newsletters & Automation" },
        { name: "description", content: st?.meta?.description ?? "HIPAA-safe email marketing for dermatology practices" },
        { property: "og:title", content: st?.meta?.og?.title ?? "Dermatology Email Marketing" },
        { property: "og:description", content: st?.meta?.og?.description ?? "Custom newsletters" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-email-marketing" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: st?.meta?.twitter?.title ?? "Dermatology Email Marketing Services" },
        { name: "twitter:description", content: st?.meta?.twitter?.description ?? "HIPAA-safe email marketing" },
        { property: "og:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
      ],
      links: [{ rel: "canonical", href: "/dermatology-email-marketing" }, ...buildHreflangLinks("/dermatology-email-marketing", params.lang)],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Service",
          serviceType: st?.meta?.jsonLd?.serviceType,
          provider: { "@type": "Organization", name: st?.meta?.jsonLd?.providerName },
          areaServed: "United States",
          description: st?.meta?.jsonLd?.description,
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: st?.meta?.jsonLd?.breadcrumb?.home, item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
            { "@type": "ListItem", position: 2, name: st?.meta?.jsonLd?.breadcrumb?.services, item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-website-design") },
            { "@type": "ListItem", position: 3, name: st?.meta?.jsonLd?.breadcrumb?.emailMarketing, item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-email-marketing") },
          ],
        }) },
      ],
    };
  },
  component: EmailMarketingPage,
});

function PctCountUp({ from = 12, to = 42, duration = 1600, suffix = "%", className }: { from?: number; to?: number; duration?: number; suffix?: string; className?: string }) {
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
  return <span ref={ref} className={className}>{Math.round(val)}{suffix}</span>;
}

function DripWaveField({ className = "", withPlane = false }: { className?: string; withPlane?: boolean }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dripLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <pattern id="envGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.15" />
        </pattern>
        <path id="planeArc" d="M -30 500 Q 200 100, 400 300 T 830 120" />
      </defs>
      <rect width="800" height="600" fill="url(#envGrid)" />
      {[100, 200, 300, 400, 500].map((y, i) => (
        <path key={i} d={`M-20 ${y} Q 200 ${y - 40 + i * 12}, 400 ${y} T 820 ${y - 20}`} stroke="url(#dripLine)" strokeWidth="1.2" fill="none" />
      ))}
      {[[140,130,22],[640,90,26],[700,430,24],[90,460,20],[420,260,28]].map(([x,y,s],i)=>(
        <g key={i} transform={`translate(${x} ${y})`} opacity="0.35">
          <rect x={-s/2} y={-s/3} width={s} height={s*2/3} rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d={`M${-s/2} ${-s/3} L 0 ${s/6} L ${s/2} ${-s/3}`} fill="none" stroke="currentColor" strokeWidth="1.4" />
        </g>
      ))}
      {withPlane && (
        <>
          <use href="#planeArc" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" fill="none" opacity="0.35" />
          <g>
            <path d="M -14 -4 L 14 0 L -14 4 L -6 0 Z" fill="currentColor" opacity="0.9">
              <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
                <mpath href="#planeArc" />
              </animateMotion>
            </path>
          </g>
        </>
      )}
    </svg>
  );
}

function OpenRateSlider() {
  const { t } = useTranslation("emailMarketing");
  const [pos, setPos] = useState(72);
  const before = 12, after = 42;
  const rate = Math.round(before + ((after - before) * pos) / 100);
  const revenue = Math.round(2400 + (18600 - 2400) * (pos / 100));
  const booked = Math.round(6 + (48 - 6) * (pos / 100));
  return (
    <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-xl backdrop-blur-md sm:p-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t("liftSlider.dragLabel")}</div>
          <div className="mt-1 text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-brand-primary">{rate}%</span>
            <span className="ml-2 text-base font-normal text-muted-foreground">{t("hero.stats.openRateLabel")}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border bg-background px-2.5 py-1">{t("liftSlider.before")} {before}%</span>
          <ArrowRight className="h-3.5 w-3.5 text-brand-primary" />
          <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 font-semibold text-brand-primary">{t("liftSlider.after")} {after}%</span>
        </div>
      </div>
      <div className="mt-6">
        <div className="relative h-3 rounded-full bg-muted">
          <div className="h-3 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all" style={{ width: `${pos}%` }} />
        </div>
        <input
          type="range" min={0} max={100} value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={t("liftSlider.aria.slider")}
          className="mt-4 h-6 w-full accent-brand-primary [touch-action:none]"
        />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:gap-4">
        {[
          { k: t("liftSlider.metrics.booked"), v: booked },
          { k: t("liftSlider.metrics.revenue"), v: `$${revenue.toLocaleString()}` },
          { k: t("liftSlider.metrics.recall"), v: `${Math.round(18 + (72 - 18) * (pos / 100))}%` },
        ].map((m) => (
          <div key={m.k} className="rounded-xl border border-border/60 bg-background/60 p-3">
            <div className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{m.k}</div>
            <div className="mt-1 text-sm font-bold text-brand-primary">{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityTicker() {
  const { t } = useTranslation("emailMarketing");
  const events = t("liveActivity.events", { returnObjects: true }) as any[];
  return (
    <div className="relative overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-[etick_38s_linear_infinite] gap-3 hover:[animation-play-state:paused]">
        {[...events, ...events].map((e, i) => (
          <div key={i} className="flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-[11px] backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-primary" /></span>
            <span className="font-semibold text-foreground">{e.who}</span>
            <span className="text-muted-foreground">{t(`liveActivity.actions.${i % 3 === 0 ? "opened" : i % 3 === 1 ? "booked" : "clicked"}`)}</span>
            <span className="font-medium text-brand-primary">{e.campaign}</span>
            <span className="text-muted-foreground">· {e.when}</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes etick { from { transform: translateX(0) } to { transform: translateX(-50%) } } @media (prefers-reduced-motion: reduce) { .animate-\\[etick_38s_linear_infinite\\] { animation: none } }`}</style>
    </div>
  );
}

function DeliverabilityGauge({ from = 82, to = 98 }: { from?: number; to?: number }) {
  const { t } = useTranslation("emailMarketing");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : from);
  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setVal(from + (to - from) * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, reduce]);
  const r = 78, c = 2 * Math.PI * r, off = c * (1 - val / 100);
  return (
    <div ref={ref} className="relative mx-auto grid h-52 w-52 place-items-center sm:h-60 sm:w-60">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="14" className="text-muted/50" fill="none" />
        <circle cx="100" cy="100" r={r} stroke="url(#gaugeGrad)" strokeWidth="14" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} fill="none" />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand-primary)" />
            <stop offset="100%" stopColor="var(--brand-accent)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-4xl font-bold text-foreground sm:text-5xl">{Math.round(val)}%</div>
        <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t("deliverability.gaugeLabel")}</div>
      </div>
    </div>
  );
}

function SubjectABDemo() {
  const { t } = useTranslation("emailMarketing");
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<"a" | "b">("b");
  
  const examples = [
    { a: { subject: "Newsletter — March update", open: 18 }, b: { subject: "Priya, your winter skin plan is here", open: 61 }, note: t("abSection.notes.0") },
    { a: { subject: "Reminder: schedule your appointment", open: 22 }, b: { subject: "It's been 6 months — 2 tap rebooking inside", open: 58 }, note: t("abSection.notes.1") }
  ];
  const s = examples[idx];
  const cur = s[pick];

  return (
    <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-xl backdrop-blur-md sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary">{t("abSection.badge")}</div>
          <h3 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">{t("abSection.demoTitle")}</h3>
        </div>
        <div className="inline-flex rounded-full border border-border bg-background p-1">
          {(["a", "b"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setPick(k)}
              className={`min-h-9 rounded-full px-4 text-xs font-bold uppercase tracking-wider transition-all ${pick === k ? "bg-brand-primary text-brand-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t("abSection.buttons.version")} {k.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border/60 bg-background/60 p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t("abSection.inboxPreview")}</div>
        <div className="mt-2 flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
            <Mail className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-foreground sm:text-base">{cur.subject}</div>
            <div className="mt-1 text-xs text-muted-foreground">{t("abSection.inboxPreview")} · {t("abSection.sender")} · {t("abSection.time")}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-brand-primary sm:text-3xl">{cur.open}%</div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{t("abSection.openRateLabel")}</div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground sm:text-sm"><span className="font-semibold text-foreground">{t("abSection.whyWins")}</span> {s.note}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {examples.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIdx(i); setPick("b"); }}
            className={`min-h-9 rounded-full border px-3 text-xs font-semibold transition-all ${idx === i ? "border-brand-primary bg-brand-primary/10 text-brand-primary" : "border-border bg-background text-muted-foreground hover:text-foreground"}`}
          >
            {t("abSection.buttons.example")} {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

function InteractiveInboxCard() {
  const { t } = useTranslation("emailMarketing");
  const samples = [
    { subject: "Your winter skin plan — a note from Dr. Chen", preview: "Cold air, hot showers, and central heat all pull moisture from your skin…", tag: "Seasonal · Education", opens: "58%" },
    { subject: "Time for your 6-month skin check, Priya", preview: "It's been almost 6 months since your last visit. Here are three easy ways to rebook…", tag: "Recall · Automated", opens: "64%" },
    { subject: "3 things every new patient should know", preview: "Welcome to the practice. Here's what to expect at your first visit, what to bring…", tag: "Welcome · Series 1/5", opens: "71%" },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <ul className="space-y-2.5">
      {samples.map((c, i) => {
        const open = openIdx === i;
        return (
          <li key={c.subject}>
            <button
              type="button"
              onMouseEnter={() => setOpenIdx(i)}
              onFocus={() => setOpenIdx(i)}
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="w-full rounded-xl border border-border/60 bg-background/60 p-3 text-left transition-all hover:border-brand-primary/50 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                {!open && <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-brand-primary" aria-hidden />}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`truncate text-sm ${open ? "font-medium text-muted-foreground" : "font-bold text-foreground"}`}>{c.subject}</span>
                    <span className="shrink-0 rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-semibold text-brand-primary">{c.opens}</span>
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">{c.preview}</p>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground/80">{c.tag}</div>
                </div>
              </div>
              {open && (
                <div className="mt-3 animate-fade-in border-t border-border/60 pt-3">
                  <p className="text-xs leading-relaxed text-foreground/90">{c.preview} {t("inboxCard.conversionNote")}</p>
                </div>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function EmailMarketingPage() {
  const { t } = useTranslation("emailMarketing");
  const [openFaq, setOpenFaq] = useState(0);
  const ctaBtn = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2";

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground lg:pb-0">
      <ScrollProgress />
      <SiteHeader />
      <main id="main">
        <section
          aria-labelledby="hero-h"
          className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-28"
          style={{
            background:
              "radial-gradient(1000px 500px at 8% -10%, color-mix(in oklch, var(--brand-primary), transparent 74%), transparent 60%), radial-gradient(900px 600px at 100% 100%, color-mix(in oklch, var(--brand-accent), transparent 78%), transparent 60%), linear-gradient(180deg, var(--background), color-mix(in oklch, var(--brand-primary), transparent 96%))",
          }}
        >
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16 lg:px-8">
            <div className="min-w-0">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary backdrop-blur">
                  <MailCheck className="h-3.5 w-3.5" /> {t("hero.badge")}
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1
                  id="hero-h"
                  className="mt-6 max-w-[18ch] text-pretty font-bold leading-[1.05] tracking-[-0.025em] text-foreground"
                  style={{ fontSize: "clamp(1.875rem, 5.4vw, 3.9rem)" }}
                >
                  {t("hero.title").split("book.")[0]}
                  <span className="text-brand-primary">{t("hero.title").split("your")[1]}</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg lg:text-xl">
                  {t("hero.description")}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link to="/contact" className={`${ctaBtn} bg-brand-primary text-brand-primary-foreground shadow-lg shadow-brand-primary/25 hover:-translate-y-0.5`}>
                    <CtaLabel /> <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href="#flows" className={`${ctaBtn} border border-border/70 bg-background/70 text-foreground backdrop-blur hover:border-brand-primary/40 hover:text-brand-primary`}>
                    {t("hero.cta.flows")}
                  </a>
                </div>
              </Reveal>

              <RevealStagger as="ul" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" stagger={0.06}>
                {OUTCOMES(t).map((o) => (
                  <RevealItem as="li" key={o.v} className="group rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg sm:p-5">
                    <o.icon className="mb-2 h-4 w-4 text-brand-primary transition-transform group-hover:scale-125" />
                    <div className="text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                      {/^\d+[%+]?$/.test(o.k) ? <CountUp value={o.k} /> : o.k}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[11px] sm:tracking-[0.12em]">{o.v}</div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>

            <Reveal delay={0.2}>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="absolute inset-x-4 -bottom-3 hidden h-10 rounded-[24px] border border-border/50 bg-card/40 backdrop-blur-md sm:block" aria-hidden />
                <div className="absolute inset-x-2 -bottom-1.5 hidden h-8 rounded-[26px] border border-border/60 bg-card/60 backdrop-blur-md sm:block" aria-hidden />

                <div
                  className="relative rounded-[28px] border border-border/70 bg-card/80 p-4 backdrop-blur-xl sm:p-6"
                  style={{ boxShadow: "0 30px 80px -30px color-mix(in oklch, var(--brand-primary), transparent 55%)" }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t("hero.stats.openRateDescription")}</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <PctCountUp className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" />
                        <span className="text-xs text-muted-foreground">{t("hero.stats.industryLabel")}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-brand-primary">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">{t("hero.stats.comparison")}</span>
                      </div>
                    </div>
                    <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-brand-primary/10 px-2.5 py-1 text-[11px] font-semibold text-brand-primary sm:inline-flex">
                      <MailOpen className="h-3 w-3" /> {t("hero.stats.opensLabel")}
                    </span>
                  </div>

                  <div className="mt-5 hidden sm:block"><InteractiveInboxCard /></div>
                </div>

                <div className="absolute -bottom-4 -right-2 hidden items-center gap-1.5 rounded-full border border-border/70 bg-card/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-primary shadow-md backdrop-blur sm:inline-flex">
                  <ShieldCheck className="h-3.5 w-3.5" /> {t("hero.stats.hipaaBadge")}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section aria-label="Trust and recognition" className="relative border-y border-border/60 bg-card/40 py-8 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{t("trustBar.title")}</p>
              <ul className="grid w-full grid-cols-2 gap-2.5 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
                {(t("trustBar.badges", { returnObjects: true }) as string[]).map((label) => (
                  <li key={label} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-brand-primary/25 bg-brand-primary/5 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-label="Live email activity" className="relative py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("liveActivity.title")}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-3 py-1 text-[11px] font-semibold text-brand-primary">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" /></span>
                {t("liveActivity.status")}
              </span>
            </div>
          </div>
          <ActivityTicker />
        </section>

        <section id="flows" aria-labelledby="flows-h" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("flows.title")}</span>
                <h2 id="flows-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("flows.heading")}</h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("flows.description")}</p>
              </div>
            </Reveal>

            <div className="relative mt-12">
              <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {FLOWS(t).map((w, i) => (
                  <Reveal as="li" key={w.step} delay={i * 0.06}>
                    <div className="group relative h-full rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold tracking-[0.18em] text-brand-primary">{t("flows.items." + i + ".step")}</div>
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-primary/10 text-brand-primary transition-transform group-hover:scale-110">
                          <w.icon className="h-4 w-4" />
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-foreground">{w.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section aria-label="Integrations" className="relative border-y border-border/60 bg-card/40 py-10 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{t("integrations.title")}</span>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-8">
              {(t("integrations.platforms", { returnObjects: true }) as string[]).map((p) => (
                <li key={p} className="grid h-12 place-items-center rounded-xl border border-border/60 bg-background/70 px-3 text-center text-xs font-semibold text-foreground/80 transition-all hover:border-brand-primary/40 hover:text-brand-primary">{p}</li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="included-h" className="relative py-16 sm:py-20 lg:py-24" style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 96%)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("servicesIncluded.title")}</span>
                <h2 id="included-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("servicesIncluded.heading")}</h2>
              </div>
            </Reveal>
            <RevealStagger as="ul" className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES_INCLUDED(t).map((s) => (
                <RevealItem as="li" key={s.title} className="group rounded-2xl border border-border/70 bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary transition-transform group-hover:scale-110"><s.icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section aria-labelledby="deliver-h" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("deliverability.title")}</span>
                  <h2 id="deliver-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("deliverability.heading")}</h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{t("deliverability.description")}</p>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {(t("deliverability.features", { returnObjects: true }) as string[]).map((l) => (
                      <li key={l} className="flex items-start gap-2 text-foreground/90">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-border/70 bg-card/80 p-8 shadow-xl backdrop-blur-md sm:p-10"><DeliverabilityGauge />
                  <div className="mt-4 text-center text-xs text-muted-foreground">{t("deliverability.timeline")}</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section aria-labelledby="ab-h" className="relative py-16 sm:py-20 lg:py-24" style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 96%)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("abSection.title")}</span>
                <h2 id="ab-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("abSection.heading")}</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}><div className="mt-10"><SubjectABDemo /></div></Reveal>
          </div>
        </section>

        <section aria-labelledby="gallery-h" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("templateGallery.title")}</span>
                <h2 id="gallery-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("templateGallery.heading")}</h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("templateGallery.description")}</p>
              </div>
            </Reveal>
            <RevealStagger as="ul" className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {(t("templateGallery.templates", { returnObjects: true }) as any[]).map((tt, i) => (
                <RevealItem as="li" key={tt.name} className="group">
                  <div className="rounded-[28px] border border-border/70 bg-card p-3 shadow-xl transition-all group-hover:-translate-y-1 group-hover:shadow-2xl">
                    <div className="overflow-hidden rounded-[20px] border border-border/60 bg-background">
                      <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-3 py-2">
                        <Circle className="h-2 w-2 fill-current text-red-400/60" /><Circle className="h-2 w-2 fill-current text-yellow-400/60" /><Circle className="h-2 w-2 fill-current text-green-400/60" />
                        <span className="ml-2 truncate text-[10px] text-muted-foreground">{tt.tag}</span>
                      </div>
                      <div className="p-5">
                        <div className="mb-3 h-8 rounded bg-gradient-to-r from-brand-primary/20 to-brand-accent/20" />
                        <div className="text-sm font-bold text-foreground">{tt.subject}</div>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tt.body}</p>
                        <div className="mt-5 inline-flex rounded-full bg-brand-primary px-4 py-1.5 text-[10px] font-bold text-brand-primary-foreground">{t("templateGallery.cta")}</div>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section aria-labelledby="lift-h" className="relative py-16 sm:py-20 lg:py-24" style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 96%)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("liftSlider.title")}</span>
                <h2 id="lift-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("liftSlider.heading")}</h2>
                <p className="mt-4 text-sm text-muted-foreground sm:text-base">{t("liftSlider.description")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}><div className="mt-10"><OpenRateSlider /></div></Reveal>
          </div>
        </section>

        <section aria-labelledby="proof-h" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("testimonials.title")}</span>
                <h2 id="proof-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("testimonials.heading")}</h2>
              </div>
            </Reveal>
            <RevealStagger as="ul" className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {(t("testimonials.items", { returnObjects: true }) as any[]).map((tst, i) => (
                <RevealItem as="li" key={i} className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <Quote className="h-6 w-6 text-brand-primary/40" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">\"{tst.quote}\"</p>
                  <div className="mt-3 border-t border-border/60 pt-3">
                    <div className="text-sm font-bold text-foreground">{tst.author}</div>
                    <div className="text-xs text-muted-foreground">{tst.role}</div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section aria-labelledby="audiences-h" className="relative py-16 sm:py-20 lg:py-24" style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 96%)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("audiences.title")}</span>
                <h2 id="audiences-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("audiences.heading")}</h2>
              </div>
            </Reveal>
            <RevealStagger as="ul" className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {AUDIENCES(t).map((a) => (
                <RevealItem as="li" key={a.title} className="group rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary transition-transform group-hover:scale-110"><a.icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-base font-bold text-foreground">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section aria-labelledby="services-h" className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("medicalServices.title")}</span>
                <h2 id="services-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("medicalServices.heading")}</h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("medicalServices.description")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-10 flex flex-wrap justify-center gap-2 sm:flex sm:gap-3">
                {(t("medicalServices.list", { returnObjects: true }) as string[]).map((s) => (
                  <li key={s} className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:text-brand-primary sm:text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="faq-h" className="relative py-16 sm:py-20 lg:py-24" style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 96%)" }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("faq.title")}</span>
                <h2 id="faq-h" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("faq.heading")}</h2>
              </div>
            </Reveal>
            <ul className="mt-10 divide-y divide-border/70 rounded-2xl border border-border/70 bg-card/60 backdrop-blur">
              {(t("faq.items", { returnObjects: true }) as any[]).map((f, i) => {
                const open = openFaq === i;
                return (
                  <li key={i}>
                    <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-brand-primary/5 sm:px-6">
                      <span className="text-sm font-semibold text-foreground sm:text-base">{f.q}</span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-brand-primary">{open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</span>
                    </button>
                    {open && (<div className="px-5 pb-5 sm:px-6"><p className="text-sm leading-relaxed text-muted-foreground">{f.a}</p></div>)}
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
              <DripWaveField className="pointer-events-none absolute inset-0 h-full w-full text-brand-primary-foreground opacity-30" />
              <div className="relative max-w-2xl">
                <h2 id="cta-h" className="text-3xl font-bold tracking-tight text-brand-primary-foreground sm:text-4xl lg:text-5xl">{t("cta.heading")}</h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-primary-foreground/90 sm:text-lg">{t("cta.description")}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/contact" className={`${ctaBtn} bg-background text-brand-primary shadow-lg hover:-translate-y-0.5`}><CtaLabel /> <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-3 z-40 mx-auto flex w-[min(94%,420px)] items-center gap-2 rounded-full border border-border/70 bg-card/90 p-2 shadow-xl backdrop-blur-md lg:hidden">
        </div>
      </main>
      <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
        {t("footerLinks.preface")}{" "}
        <Link to="/dermatology-reputation-management" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.reputation")}</Link>,{" "}
        <Link to="/dermatology-social-media-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.social")}</Link>, {t("common.or", { ns: "translation" })}{" "}
        <Link to="/dermatology-conversion-rate-optimization" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.cro")}</Link>.
      </p>
      <SiteFooter />
    </div>
  );
}
