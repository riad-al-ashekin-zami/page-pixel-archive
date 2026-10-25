import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { buildHreflangLinks, useCurrentLang, type LanguageCode } from "@/lib/i18n-routing";
import { formatLocalizedNumber } from "@/lib/locale-format";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { PulseField } from "@/components/hero-motifs";
import { CountUp } from "@/components/count-up";
import supportHero from "@/assets/derm-support-hero.jpg";
import {
  ArrowRight, CheckCircle2, ShieldCheck, Gauge, Activity, Lock, RefreshCw,
  Search, Bug, Wrench, LifeBuoy, Clock, BarChart3, Database, AlertTriangle,
  Stethoscope, Building2, Baby, Scissors, Plus, Minus, Sparkles, Server,
  FileCheck2, Bell, Zap, Eye, HardDrive, Radio, ShieldAlert, Quote, Star,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { robotsContent } from "@/lib/index-allowlist";

const liveSites = [
  { name: "LA Derm", region: "US-East", uptime: 99.99, ms: 128 },
  { name: "CM Surgical", region: "US-West", uptime: 100.0, ms: 96 },
  { name: "RS Institute", region: "US-Central", uptime: 99.98, ms: 142 },
  { name: "PS Partners", region: "US-East", uptime: 99.99, ms: 111 },
  { name: "MS Clinic", region: "EU-West", uptime: 99.97, ms: 168 },
  { name: "BV Laser", region: "US-West", uptime: 100.0, ms: 89 },
];

const regionLabels: Record<LanguageCode, Record<string, string>> = {
  en: { "US-East": "US East", "US-West": "US West", "US-Central": "US Central", "EU-West": "EU West" },
  fr: { "US-East": "Est des États-Unis", "US-West": "Ouest des États-Unis", "US-Central": "Centre des États-Unis", "EU-West": "Ouest de l’UE" },
  de: { "US-East": "USA Ost", "US-West": "USA West", "US-Central": "USA Mitte", "EU-West": "EU West" },
  it: { "US-East": "USA Est", "US-West": "USA Ovest", "US-Central": "USA Centro", "EU-West": "UE Ovest" },
  es: { "US-East": "EE. UU. Este", "US-West": "EE. UU. Oeste", "US-Central": "EE. UU. Centro", "EU-West": "UE Oeste" },
  pt: { "US-East": "EUA Leste", "US-West": "EUA Oeste", "US-Central": "EUA Centro", "EU-West": "UE Oeste" },
  sv: { "US-East": "USA öst", "US-West": "USA väst", "US-Central": "USA centralt", "EU-West": "EU väst" },
  no: { "US-East": "USA øst", "US-West": "USA vest", "US-Central": "USA sentralt", "EU-West": "EU vest" },
  fi: { "US-East": "USA itä", "US-West": "USA länsi", "US-Central": "USA keskialue", "EU-West": "EU länsi" },
  ar: { "US-East": "شرق الولايات المتحدة", "US-West": "غرب الولايات المتحدة", "US-Central": "وسط الولايات المتحدة", "EU-West": "غرب الاتحاد الأوروبي" },
  pl: { "US-East": "USA wschód", "US-West": "USA zachód", "US-Central": "USA centrum", "EU-West": "UE zachód" },
  cs: { "US-East": "USA východ", "US-West": "USA západ", "US-Central": "USA střed", "EU-West": "EU západ" },
};

const severityLabels: Record<LanguageCode, Record<string, string>> = {
  en: { critical: "Critical", warning: "Warning" },
  fr: { critical: "Critique", warning: "Alerte" },
  de: { critical: "Kritisch", warning: "Warnung" },
  it: { critical: "Critico", warning: "Avviso" },
  es: { critical: "Crítico", warning: "Aviso" },
  pt: { critical: "Crítico", warning: "Aviso" },
  sv: { critical: "Kritisk", warning: "Varning" },
  no: { critical: "Kritisk", warning: "Varsel" },
  fi: { critical: "Kriittinen", warning: "Varoitus" },
  ar: { critical: "حرج", warning: "تنبيه" },
  pl: { critical: "Krytyczne", warning: "Ostrzeżenie" },
  cs: { critical: "Kritické", warning: "Varování" },
};

const incidents = [
  { time: "03:14 AM", tag: "CVE-2024-4577", title: "PHP RCE published", severity: "critical", detail: "Patched across 47 client sites in 33 minutes. Zero exposure window." },
  { time: "09:47 PM", tag: "SSL", title: "Certificate expiring in 6 days", severity: "warning", detail: "Auto-renewed and deployed overnight before Monday morning traffic hit." },
  { time: "02:31 AM", tag: "Uptime", title: "Origin 502 on 1 site", severity: "critical", detail: "Failover to cache within 40s. On-call engineer restored origin in 8 min." },
  { time: "11:12 AM", tag: "SEO", title: "Google indexing regression detected", severity: "warning", detail: "Rogue noindex tag from a plugin update — rolled back, re-crawl requested same hour." },
  { time: "06:03 AM", tag: "HIPAA", title: "Intake form leaking PHI to analytics", severity: "critical", detail: "PII scrubber deployed, GA4 events sanitized, compliance log updated." },
];

const testimonials = [
  { name: "Dr. Ethan Caldwell, MD", role: "LA Dermatology", quote: "Sunday 2 AM SSL was about to expire. They fixed it before Monday's first patient checked in. We didn't even know it happened.", stars: 5 },
  { name: "Dr. Anika Vasquez, MD", role: "CM Surgical", quote: "Every month we get a real report — not a template. When a plugin broke our booking form, they pushed a hotfix in 22 minutes.", stars: 5 },
  { name: "Dr. Ibrahim Okafor, MD", role: "RS Institute · 6 loc.", quote: "Six locations, one dashboard, one invoice. I stopped thinking about my website and started running my practices again.", stars: 5 },
];

const FAQS = [
  { q: "What's included in monthly support & maintenance?", a: "24/7 uptime monitoring, weekly plugin/CMS/security updates, daily encrypted backups, malware scans, HIPAA-aware form audits, Core Web Vitals monitoring, on-page SEO health checks, monthly reporting, and a fixed number of content/design edit hours based on your plan." },
  { q: "How fast do you respond to a site-down emergency?", a: "Essential plan: under 4 hours. Growth plan: under 1 hour. Enterprise plan: under 15 minutes with a named on-call engineer. Every plan includes 24/7 automated monitoring so we usually know before you do." },
  { q: "Is your maintenance HIPAA-aware?", a: "Yes. We maintain BAA-ready hosting, audit contact/intake forms for PHI exposure, keep analytics PHI-free, and log every access. All engineers are trained on dermatology-specific compliance risks." },
  { q: "Do you support sites you didn't build?", a: "Yes. We onboard existing WordPress, Webflow, custom, and headless dermatology sites after a paid technical audit — so we inherit them safely and know exactly what we're maintaining." },
  { q: "Can I cancel anytime?", a: "Yes — month-to-month, no long-term contracts. We earn your retainer every month. On offboarding you keep all code, credentials, backups, and documentation." },
  { q: "Do content and small design edits count?", a: "Every plan includes edit hours (2 / 5 / unlimited). Use them for provider bios, new services, promo banners, before-and-after uploads, blog posts, or seasonal design tweaks." },
];

export const Route = createFileRoute("/{-$lang}/dermatology-website-maintenance-services")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params }) => {
    const lang = params.lang ?? "";
    const st = getStaticTranslation(lang, "maintenance");
    const faqItems = st?.faq?.items ?? FAQS;

    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-website-maintenance-services") },
        { title: st?.meta?.title ?? "Dermatology Website Maintenance Services — 24/7 HIPAA-Aware Care" },
        { name: "description", content: st?.meta?.description ?? "Premium monthly support & maintenance for dermatology websites. 24/7 uptime monitoring, HIPAA-aware updates, daily backups, security patching, Core Web Vitals & SEO health. Month-to-month." },
        { property: "og:title", content: st?.meta?.og?.title ?? "Dermatology Website Maintenance Services — 24/7 Care Plans" },
        { property: "og:description", content: st?.meta?.og?.description ?? "Keep your dermatology practice site fast, secure, and ranking. Monitoring, backups, HIPAA-aware updates, SEO health, and edit hours — month-to-month." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-website-maintenance-services" },
        { property: "og:image", content: supportHero },
        { name: "twitter:image", content: supportHero },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/dermatology-website-maintenance-services" }, ...buildHreflangLinks("/dermatology-website-maintenance-services", params.lang)],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", serviceType: st?.meta?.jsonLd?.serviceType ?? "Dermatology Website Maintenance Services", provider: { "@type": "Organization", name: st?.meta?.jsonLd?.provider ?? "DermatologyWebsiteDesign.com" }, areaServed: st?.meta?.jsonLd?.areaServed ?? "United States", offers: { "@type": "Offer", priceCurrency: "USD", price: "299", description: st?.meta?.jsonLd?.offerDescription ?? "Dermatology website care plan — starting price per month" } }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((f: any) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: MaintenancePage,
});

const audiences = [
  { icon: Stethoscope, label: "Solo Dermatologists", desc: "White-glove care so your one site never becomes a distraction." },
  { icon: Building2, label: "Multi-location Clinics", desc: "Per-location monitoring, one dashboard, one predictable retainer." },
  { icon: Baby, label: "Pediatric Dermatology", desc: "Parent-friendly forms audited monthly for clarity and PHI safety." },
  { icon: Scissors, label: "Mohs & Surgical Dermatology", desc: "Referral portals kept online, secure, and audit-friendly year-round." },
];

const medicalServices = [
  "Acne Treatment", "Eczema Treatment", "Psoriasis Treatment", "Skin Infection Treatment",
  "Skin Allergy Treatment", "Skin Cancer Screening", "Mole Evaluation & Removal",
  "Cyst & Lipoma Removal", "Wart Removal", "Nail Disorder Treatment", "Hair Loss Treatment",
  "Scalp Disorder Treatment", "Rosacea Treatment", "Hyperpigmentation & Melasma",
  "Scar Treatment", "Burn Scar Treatment", "Vitiligo Treatment", "Skin Biopsy & Diagnostics",
];

const pillars = [
  { icon: Activity, title: "24/7 Uptime Monitoring", desc: "60-second health checks from 5 regions. Alerts hit our on-call before your front desk hears about it." },
  { icon: ShieldCheck, title: "HIPAA-Aware Updates", desc: "CMS, plugin, and dependency updates staged, reviewed, and deployed with BAA-ready hosting." },
  { icon: HardDrive, title: "Daily Encrypted Backups", desc: "Off-site, versioned, one-click restore. Tested monthly — not just scheduled and forgotten." },
  { icon: Lock, title: "Malware & Vulnerability Scans", desc: "Weekly scans, quarterly penetration checks, and immediate patching of any CVE affecting your stack." },
  { icon: Gauge, title: "Core Web Vitals Watch", desc: "LCP, INP, and CLS tracked continuously — regressions triaged before Google penalizes rank." },
  { icon: Search, title: "On-Page SEO Health", desc: "Broken links, missing schema, orphan pages, and crawl errors caught monthly and fixed in-plan." },
];

const stats = [
  { value: "99.99%", label: "Average uptime across care plan sites" },
  { value: "60s", label: "Monitoring interval, 5 global regions" },
  { value: "15min", label: "Enterprise response SLA" },
  { value: "50+", label: "Dermatology practices under care" },
];

const included = [
  { icon: Activity, title: "24/7 uptime & SSL monitoring" },
  { icon: RefreshCw, title: "Weekly CMS & plugin updates" },
  { icon: HardDrive, title: "Daily encrypted off-site backups" },
  { icon: Lock, title: "Malware scans & CVE patching" },
  { icon: ShieldCheck, title: "HIPAA-aware form & PHI audits" },
  { icon: Gauge, title: "Core Web Vitals monitoring" },
  { icon: Search, title: "SEO health & broken-link sweeps" },
  { icon: Database, title: "Database optimization" },
  { icon: Server, title: "CDN & edge cache tuning" },
  { icon: Bug, title: "Bug triage & hotfix deploys" },
  { icon: Wrench, title: "Content & design edit hours" },
  { icon: BarChart3, title: "Monthly performance report" },
  { icon: Bell, title: "Proactive incident alerts" },
  { icon: FileCheck2, title: "Compliance change log" },
  { icon: Eye, title: "Accessibility (WCAG AA) checks" },
  { icon: LifeBuoy, title: "Named account engineer" },
];

const plans = [
  {
    name: "Essential",
    tag: "Solo practices",
    price: "$299",
    per: "/month",
    sla: "< 4 hour response",
    highlight: false,
    edits: "2 hrs / mo",
    market: "$500 – $1,000 /mo",
    savings: "40–70% cheaper",
    features: [
      "24/7 uptime monitoring",
      "Weekly plugin & CMS updates",
      "Daily encrypted backups",
      "Malware scans + patching",
      "HIPAA-aware form audit (quarterly)",
      "Core Web Vitals monitoring",
      "Monthly performance report",
      "2 hrs / month content edits",
    ],
  },
  {
    name: "Growth",
    tag: "Multi-service practices",
    price: "$599",
    per: "/month",
    sla: "< 1 hour response",
    highlight: true,
    edits: "5 hrs / mo",
    market: "$1,200 – $2,500 /mo",
    savings: "50–76% cheaper",
    features: [
      "Everything in Essential",
      "Weekly HIPAA-aware form audits",
      "SEO health sweeps & fixes",
      "Broken-link & schema monitoring",
      "CDN & edge cache tuning",
      "Bug triage & hotfix deploys",
      "Named account engineer",
      "5 hrs / month edits (content + design)",
    ],
  },
  {
    name: "Enterprise",
    tag: "Multi-location & Mohs groups",
    price: "$1,499",
    per: "/month",
    sla: "< 15 min response",
    highlight: false,
    edits: "Unlimited*",
    market: "$3,000 – $6,000 /mo",
    savings: "50–75% cheaper",
    features: [
      "Everything in Growth",
      "Per-location uptime dashboards",
      "24/7 on-call engineer rotation",
      "Quarterly penetration testing",
      "Referral / EHR integration support",
      "Accessibility (WCAG AA) audits",
      "Compliance change log & sign-off",
      "Unlimited* edit hours (fair use)",
    ],
  },
];

const flow = [
  { step: "01", title: "Onboard & Audit", icon: Search, desc: "We inherit your site with a full security, performance, SEO, and HIPAA audit — nothing goes into monitoring blind." },
  { step: "02", title: "Harden & Baseline", icon: ShieldCheck, desc: "Patching, backup verification, monitoring setup, and a documented baseline for every Core Web Vital and rank position." },
  { step: "03", title: "Monitor & Maintain", icon: Activity, desc: "24/7 monitoring, weekly updates, monthly SEO/health reports — plus your edit hours for growth work." },
  { step: "04", title: "Report & Improve", icon: BarChart3, desc: "Monthly performance review with a named engineer. Where can we make your site faster, safer, and rank higher next month?" },
];

const risks = [
  { icon: AlertTriangle, title: "Unpatched CMS", stat: "43% of hacks" },
  { icon: Clock, title: "Downtime during peak booking", stat: "$18k lost / hr" },
  { icon: Lock, title: "PHI leaked via forms", stat: "$50k+ HIPAA fine" },
  { icon: Zap, title: "Core Web Vitals regression", stat: "-32% rank" },
];

function MaintenancePage() {
  const { t } = useTranslation("maintenance");

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
              "radial-gradient(1400px 400px at 50% -30%, color-mix(in oklch, var(--brand-primary), transparent 76%), transparent 62%), radial-gradient(900px 500px at 50% 130%, color-mix(in oklch, var(--brand-accent), transparent 82%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 95%) 0%, transparent 40%, transparent 60%, color-mix(in oklch, var(--brand-accent), transparent 95%) 100%)",
          }}
        />
        <PulseField className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 text-brand-primary opacity-40 lg:block" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 md:pt-20 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
            <Reveal>
              <div className="mb-4 flex flex-col items-start gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {t("hero.status")}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  <LifeBuoy className="h-3.5 w-3.5" /> {t("hero.badge")}
                </span>
              </div>
              <h1 className="mt-5 text-[2rem] font-black leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
                {t("hero.title").split(" — ")[0]} — <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(120deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 55%))" }}>{t("hero.title").split(" — ")[1]}</span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {t("hero.description")}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/get-a-free-quote"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]"
                >
                  {t("hero.cta_primary")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/free-dermatologist-website-audit"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
                >
                  {t("hero.cta_secondary")}
                </Link>
              </div>
              <div className="mt-6 flex items-baseline gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{t("hero.pricing_note")}</span>
                <span className="text-xl font-black text-brand-primary">{t("hero.pricing_value")}</span>
                <span>{t("hero.pricing_interval")}</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
                {(t("hero.usp", { returnObjects: true }) as string[]).map((tItem) => (
                  <span key={tItem} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary" /> {tItem}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} variant="scale">
              <StatusVisual />
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
          {stats.map((s, i) => {
            const statKeys = ["uptime", "interval", "sla", "count"] as const;
            const label = t(`stats.${statKeys[i]}`);
            return (
              <div key={s.label} className="text-center sm:text-left">
                <div className="text-3xl font-black tracking-tight text-brand-primary md:text-4xl">
                  {/\d/.test(s.value.replace(/[^0-9]/g, "")) ? <CountUp value={s.value} /> : s.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LIVE STATUS WALL */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 md:pt-20">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {t("status_wall.badge")}
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("status_wall.title")}
              </h2>
            </div>
            <span className="text-xs text-muted-foreground">{t("status_wall.note")}</span>
          </div>
        </Reveal>
        <LiveStatusWall />
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("pillars.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("pillars.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("pillars.description")}
            </p>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <RevealItem
                key={p.title}
                className="group rounded-3xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]"
              >
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-brand-primary/15 bg-brand-primary/5 text-brand-primary transition-all group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold tracking-tight">{t(`pillars.items.${i}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`pillars.items.${i}.desc`)}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      {/* INCIDENT TIMELINE — real proof */}
      <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 97%))" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
                <Radio className="h-3.5 w-3.5 animate-pulse" /> {t("incidents.badge")}
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("incidents.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("incidents.description")}
              </p>
            </div>
          </Reveal>
          <IncidentTimeline />
        </div>
      </section>

      {/* INCLUDED CHECKLIST */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("included.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("included.title")}
            </h2>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {included.map((i_item, i) => {
            const Icon = i_item.icon;
            return (
              <RevealItem key={i_item.title} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-primary/10 text-brand-primary">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-semibold leading-tight text-foreground">{t(`included.items.${i}`)}</span>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      {/* PLANS */}
      <section id="plans" className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), white 96%), transparent)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("plans.badge")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("plans.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                {t("plans.description")}
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className={`group relative h-full ${p.highlight ? "rounded-[26px] p-[1.5px]" : ""}`}
                  style={p.highlight ? { background: "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 55%), var(--brand-primary))", backgroundSize: "200% 200%", animation: "gradient-pan 6s ease infinite" } : undefined}
                >
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                    p.highlight
                      ? "border-transparent bg-card shadow-[0_30px_80px_-30px_color-mix(in_oklch,var(--brand-primary),transparent_45%)]"
                      : "border-border/70 bg-card hover:border-brand-primary/30 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]"
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-primary-foreground shadow-lg">
                      <Sparkles className="h-3 w-3" /> {t("plans.labels.popular")}
                    </span>
                  )}
                  <div className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{t(`plans.tiers.${i}.tag`)}</div>
                  <div className="mt-1 text-2xl font-black tracking-tight">{t(`plans.tiers.${i}.name`)}</div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-foreground">{t(`plans.tiers.${i}.price`)}</span>
                    <span className="text-sm text-muted-foreground">{t(`plans.tiers.${i}.per`)}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                    <span className="rounded-full border border-border bg-muted/40 px-2 py-0.5 font-semibold text-foreground">{t("plans.labels.sla_prefix")} {t(`plans.tiers.${i}.sla`)}</span>
                    <span className="rounded-full border border-brand-primary/20 bg-brand-primary/5 px-2 py-0.5 font-semibold text-brand-primary">{t("plans.labels.edits_prefix")} {t(`plans.tiers.${i}.edits`)}</span>
                  </div>
                  {p.market && (
                    <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-[11px] leading-snug">
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                        <span className="min-w-0 font-semibold text-muted-foreground">
                          {t("plans.labels.market")} <span className="tabular-nums line-through decoration-muted-foreground/50">{t(`plans.tiers.${i}.market`)}</span>
                        </span>
                        <span className="w-fit shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                          {t(`plans.tiers.${i}.savings`)}
                        </span>
                      </div>
                    </div>
                  )}
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {p.features.map((_, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                        <span className="text-foreground/90">{t(`plans.tiers.${i}.features.${fIdx}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/get-a-free-quote"
                    className={`mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                      p.highlight
                        ? "bg-brand-primary text-brand-primary-foreground"
                        : "border border-border bg-card text-foreground hover:border-brand-primary/40 hover:text-brand-primary"
                    }`}
                  >
                    {t("plans.labels.cta").replace("{{name}}", t(`plans.tiers.${i}.name`))} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("flow.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("flow.title")}</h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {flow.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.step} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-border/70 bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-widest text-muted-foreground">{t(`flow.items.${i}.step`)}</span>
                    <Icon className="h-5 w-5 text-brand-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{t(`flow.items.${i}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`flow.items.${i}.desc`)}</p>
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
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("audiences.badge")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("audiences.title")}</h2>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => {
              const Icon = a.icon;
              return (
                <RevealItem key={a.label} className="rounded-3xl border border-border/70 bg-card p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="mt-4 text-base font-bold">{t(`audiences.items.${i}.label`)}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`audiences.items.${i}.desc`)}</p>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* SERVICES SUPPORTED */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("medical_services.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("medical_services.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("medical_services.description")}
            </p>
          </div>
        </Reveal>
        <div className="flex flex-wrap gap-2">
          {(t("medical_services.list", { returnObjects: true }) as string[]).map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" /> {s}
            </span>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("testimonials.badge")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("testimonials.title")}
            </h2>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-5 md:grid-cols-3">
          {testimonials.map((tItem, i) => (
            <RevealItem key={tItem.name} className="group relative flex h-full flex-col rounded-3xl border border-border/70 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-[0_20px_50px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_55%)]">
              <Quote className="h-8 w-8 text-brand-primary/25" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: tItem.stars }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">"{t(`testimonials.items.${i}.quote`)}"</p>
              <div className="mt-6 border-t border-border/60 pt-4">
                <div className="text-sm font-bold text-foreground">{t(`testimonials.items.${i}.name`)}</div>
                <div className="text-xs text-muted-foreground">{t(`testimonials.items.${i}.role`)}</div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), white 96%), transparent)" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("faq.badge")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">{t("faq.title")}</h2>
            </div>
          </Reveal>
          <FAQAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-brand-primary/20 bg-card p-10 md:p-14">
          <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(600px 300px at 100% 0%, color-mix(in oklch, var(--brand-primary), transparent 75%), transparent 60%)" }} />
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-[2.4rem] md:leading-[1.1]">
                {t("cta_bottom.title").split(". ")[0]}. <span className="text-brand-primary">{t("cta_bottom.title").split(". ")[1]}</span>
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                {t("cta_bottom.description")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                to="/get-a-free-quote"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground transition-transform hover:scale-[1.02]"
              >
                {t("cta_bottom.primary")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/free-dermatologist-website-audit"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
              >
                {t("cta_bottom.secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footer_nav.label")} {" "}
          <Link to="/dermatology-website-management-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_nav.links.management")}</Link>,{" "}
          <Link to="/dermatology-website-support-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_nav.links.support")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/dermatology-add-on-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_nav.links.addons")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}

function StatusVisual() {
  const { t } = useTranslation("maintenance");
  const lang = useCurrentLang();
  const seed = [92, 78, 88, 96, 82, 90, 74, 98, 86, 94, 80, 100];
  const [bars, setBars] = useState(seed);
  const [lcp, setLcp] = useState(1.1);
  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) => {
        const next = prev.slice(1);
        next.push(60 + Math.floor(Math.random() * 40));
        return next;
      });
      setLcp(() => +(0.9 + Math.random() * 0.5).toFixed(2));
    }, 1200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_30px_80px_-30px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]">
        <img src={supportHero} alt={t("hero.visual.image_alt")} width={1280} height={960} className="h-auto w-full object-cover" />
      </div>

      {/* Floating status card */}
      <div className="absolute -left-3 bottom-6 w-[240px] rounded-2xl border border-border/80 bg-card/95 p-4 shadow-xl backdrop-blur sm:-left-6 sm:w-[260px]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("hero.visual.uptime_label")}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {t("hero.visual.uptime_status")}
          </span>
        </div>
        <div className="mt-2 text-2xl font-black tracking-tight text-foreground">
          {formatLocalizedNumber(99.99, lang, { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: false })}%
        </div>
        <div className="mt-3 flex h-8 items-end gap-0.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-emerald-500/80 transition-all duration-700 ease-out"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Floating LCP card */}
      <div className="absolute -right-2 top-6 w-[210px] rounded-2xl border border-border/80 bg-card/95 p-4 shadow-xl backdrop-blur sm:-right-4">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-brand-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("hero.visual.vitals_label")}</span>
        </div>
        <div className="mt-2 flex items-baseline gap-1 tabular-nums">
          <span className="text-2xl font-black text-brand-primary transition-all duration-500">
            {formatLocalizedNumber(lcp, lang, { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: false })}s
          </span>
          <span className="text-xs text-muted-foreground">LCP</span>
        </div>
        <div className="mt-2 text-[11px] text-muted-foreground">{t("hero.visual.vitals_metrics")}</div>
      </div>
    </div>
  );
}

function LiveStatusWall() {
  const { t } = useTranslation("maintenance");
  const lang = useCurrentLang();
  const [rows, setRows] = useState(
    liveSites.map((s) => ({ ...s, checked: Math.floor(Math.random() * 55) + 1 }))
  );
  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) =>
        prev.map((r) => ({
          ...r,
          ms: Math.max(60, Math.min(220, r.ms + Math.floor(Math.random() * 30) - 15)),
          checked: (r.checked + 1) % 60,
        }))
      );
    }, 1500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="overflow-hidden rounded-3xl border border-border/70 bg-card">
      <div className="hidden grid-cols-[1.6fr_0.8fr_0.9fr_0.9fr_0.7fr] gap-4 border-b border-border/60 bg-muted/30 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground md:grid">
        <span>{t("status_wall.table.client")}</span>
        <span>{t("status_wall.table.region")}</span>
        <span>{t("status_wall.table.uptime")}</span>
        <span>{t("status_wall.table.response")}</span>
        <span className="text-right">{t("status_wall.table.checked")}</span>
      </div>
      <ul className="divide-y divide-border/60">
        {rows.map((r) => (
          <li key={r.name} className="grid grid-cols-2 gap-3 px-5 py-4 text-sm md:grid-cols-[1.6fr_0.8fr_0.9fr_0.9fr_0.7fr] md:items-center md:gap-4">
            <div className="col-span-2 flex items-center gap-2.5 md:col-span-1 md:min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="truncate font-semibold text-foreground">{r.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{regionLabels[lang][r.region] ?? r.region}</span>
            <span className="font-black tabular-nums text-emerald-600">
              {formatLocalizedNumber(r.uptime, lang, { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: false })}%
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              {formatLocalizedNumber(r.ms, lang)}ms
            </span>
            <span className="text-right text-xs text-muted-foreground tabular-nums">
              {formatLocalizedNumber(r.checked, lang)}{t("status_wall.table.time_ago")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IncidentTimeline() {
  const { t } = useTranslation("maintenance");
  const lang = useCurrentLang();
  return (
    <ol className="relative space-y-4 border-l-2 border-brand-primary/20 pl-6 md:pl-8">
      {incidents.map((i, idx) => {
        const critical = i.severity === "critical";
        return (
          <li key={idx} className="relative">
            <span
              className={`absolute -left-[33px] top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-background shadow md:-left-[41px] ${
                critical ? "bg-destructive text-destructive-foreground" : "bg-amber-500 text-white"
              }`}
            >
              {critical ? <ShieldAlert className="h-3 w-3" /> : <Bell className="h-3 w-3" />}
            </span>
            <div className="rounded-2xl border border-border/70 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-[0_16px_40px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em]">
                <span className="text-muted-foreground tabular-nums">{i.time}</span>
                <span className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-foreground">{i.tag}</span>
                <span className={`rounded-full px-2 py-0.5 ${critical ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"}`}>
                  {severityLabels[lang][i.severity] ?? i.severity}
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold tracking-tight text-foreground">{t(`incidents.log.${idx}.title`)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(`incidents.log.${idx}.detail`)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function FAQAccordion() {
  const { t } = useTranslation("maintenance");
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="space-y-3">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className="rounded-2xl border border-border/70 bg-card">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-foreground sm:text-base">{t(`faq.items.${i}.q`)}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-brand-primary">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{t(`faq.items.${i}.a`)}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
