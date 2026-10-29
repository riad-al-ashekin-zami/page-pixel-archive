import { finalizeSeoHead } from "@/lib/seo-head";
import { KeywordOwnerLinks } from "@/components/sections/keyword-owner-links";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { CtaLabel } from "@/lib/cta";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks, useCurrentLang } from "@/lib/i18n-routing";
import { formatLocalizedNumber } from "@/lib/locale-format";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal } from "@/components/reveal";
import addonHeroGlass from "@/assets/addon-hero-glass.jpg";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

import {
  ArrowRight, CheckCircle2, Wrench, ShieldCheck, FileText, BarChart3,
  Plug, Rocket, Plus, Minus, Sparkles, ArrowUpRight, Search, ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { robotsContent } from "@/lib/index-allowlist";


type AddOn = { name: string; blurb: string };
type Category = {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  accent: string;
  items: AddOn[];
};

const CATEGORIES: Category[] = [
  {
    id: "care",
    icon: Wrench,
    title: "Website Care & Maintenance",
    tagline: "Always on. Always current. Always yours.",
    accent: "var(--brand-primary)",
    items: [
      { name: "Website Maintenance & Support", blurb: "Weekly CMS, plugin & security updates with a human on-call." },
      { name: "Emergency Support", blurb: "Site down? A named engineer responds in under 15 minutes." },
      { name: "Website Migration", blurb: "Zero-downtime moves with full 301 mapping and SEO preserved." },
      { name: "Website Updates", blurb: "Content, provider bios, seasonal promos — shipped in hours, not weeks." },
      { name: "Monthly Care Plans", blurb: "One flat retainer. Everything included. Month-to-month." },
      { name: "Daily Backups & Recovery", blurb: "Encrypted off-site backups. One-click restore, 30-day retention." },
      { name: "Uptime Monitoring", blurb: "60-second checks from 6 regions. Alerts before patients notice." },
      { name: "Performance Monitoring", blurb: "Core Web Vitals tracked daily. Regressions caught the same day." },
    ],
  },
  {
    id: "hosting",
    icon: ShieldCheck,
    title: "Hosting, Security & Compliance",
    tagline: "HIPAA-aware infrastructure engineered for dermatology.",
    accent: "var(--brand-accent)",
    items: [
      { name: "Managed Hosting", blurb: "Edge-cached, auto-scaling, 99.99% uptime SLA." },
      { name: "Domain & DNS Management", blurb: "We own the boring stuff so renewals never lapse." },
      { name: "SSL Setup & Monitoring", blurb: "Auto-renewed certs with expiration alerts weeks in advance." },
      { name: "Security Monitoring", blurb: "24/7 WAF, intrusion detection, and vulnerability patching." },
      { name: "Malware Protection", blurb: "Daily scans, instant quarantine, and clean-up guarantees." },
      { name: "HIPAA Compliance Review", blurb: "Annual audit of forms, hosting, analytics, and BAAs." },
      { name: "HIPAA-Aware Forms Setup", blurb: "Encrypted intake, consent, and contact forms — PHI safe." },
      { name: "ADA Accessibility Optimization", blurb: "WCAG 2.2 AA remediation and ongoing compliance monitoring." },
      { name: "Privacy & Cookie Compliance", blurb: "GDPR / CCPA banners, consent logs, and policy updates." },
    ],
  },
  {
    id: "content",
    icon: FileText,
    title: "Content & Conversion",
    tagline: "Words and layouts that turn visitors into booked patients.",
    accent: "var(--brand-primary)",
    items: [
      { name: "Content Writing", blurb: "SEO-driven pages written for real dermatology practices." },
      { name: "Medical Copywriting", blurb: "Clinically accurate, patient-friendly, physician-approved." },
      { name: "Blog Management", blurb: "Editorial calendar, writing, publishing, and internal linking." },
      { name: "Landing Page Design", blurb: "Purpose-built pages for services, promos, and ad traffic." },
      { name: "Service Page Creation", blurb: "One conversion-optimized page per condition or treatment." },
      { name: "Conversion Rate Optimization (CRO)", blurb: "Hypothesis-driven A/B testing on real patient traffic." },
      { name: "Lead Magnet Creation", blurb: "Skin guides, checklists, and quizzes that capture intent." },
      { name: "Email Newsletter Setup", blurb: "Branded templates, automations, and list segmentation." },
      { name: "Call-to-Action Optimization", blurb: "Buttons, forms, and journeys tested for booking lift." },
    ],
  },
  {
    id: "seo",
    icon: BarChart3,
    title: "SEO & Analytics",
    tagline: "Rank higher. Measure what matters. Prove the ROI.",
    accent: "var(--brand-accent)",
    items: [
      { name: "Local SEO", blurb: "Dominate map packs in every neighborhood you serve." },
      { name: "Technical SEO Audit", blurb: "Crawl, indexation, schema, Core Web Vitals — fully audited." },
      { name: "Schema Markup Implementation", blurb: "MedicalBusiness, FAQ, Review, and Service schema shipped." },
      { name: "Google Business Profile Optimization", blurb: "Photos, posts, Q&A, categories — tuned for local intent." },
      { name: "Analytics & Reporting", blurb: "Monthly plain-English reports tied to booked appointments." },
      { name: "Conversion Tracking Setup", blurb: "GA4, GTM, and CRM events wired end-to-end." },
      { name: "Call Tracking Setup", blurb: "Dynamic numbers per source. Every call attributed correctly." },
      { name: "Heatmap & User Behavior Tracking", blurb: "See exactly where patients hesitate — and fix it." },
      { name: "Competitor SEO Analysis", blurb: "Gap analysis on the practices ranking above you." },
    ],
  },
  {
    id: "integrations",
    icon: Plug,
    title: "Integrations & Automation",
    tagline: "One connected stack. No copy-paste. No lost leads.",
    accent: "var(--brand-primary)",
    items: [
      { name: "Online Appointment / Booking Integration", blurb: "Zocdoc, NexHealth, Modernizing Medicine — wired natively." },
      { name: "Patient Portal Integration", blurb: "Secure SSO to your EHR portal, mobile-friendly." },
      { name: "CRM Integration", blurb: "HubSpot, Salesforce, Lucy — leads flow in real-time." },
      { name: "Live Chat Setup", blurb: "AI + human hybrid chat trained on your services and FAQs." },
      { name: "Email Marketing Integration", blurb: "Mailchimp, Klaviyo, ActiveCampaign, ConvertKit." },
      { name: "Marketing Automation Setup", blurb: "Nurture flows, recall reminders, birthday offers." },
      { name: "Payment Gateway Integration", blurb: "Stripe, Square, CareCredit — HIPAA-aware checkout." },
      { name: "Telehealth Integration", blurb: "Doxy.me, Zoom for Healthcare, or your existing platform." },
      { name: "Third-Party Software Integration", blurb: "Any API, any tool — we build the bridge." },
    ],
  },
  {
    id: "growth",
    icon: Rocket,
    title: "Growth Marketing",
    tagline: "Compounding patient growth, month after month.",
    accent: "var(--brand-accent)",
    items: [
      { name: "Reputation Management", blurb: "Monitor, respond, and protect your practice's name online." },
      { name: "Review Generation System", blurb: "Automated review requests post-visit — ethically, at scale." },
      { name: "Social Media Management", blurb: "Content, engagement, and strategy for Instagram & TikTok." },
      { name: "Google Ads Management", blurb: "Search + Performance Max campaigns tuned for cost-per-booking." },
      { name: "Facebook & Instagram Ads", blurb: "Cosmetic and medical funnels with creative refresh cadence." },
      { name: "Retargeting Campaign Setup", blurb: "Bring back the 96% who left without booking." },
      { name: "E-Commerce Marketing", blurb: "Sell skincare online — Shopify, ads, email, and SEO." },
      { name: "Monthly Growth Reporting", blurb: "One dashboard. Real numbers. Tied to real revenue." },
    ],
  },
];

const AUDIENCES = [
  "Solo Dermatologists",
  "Multi-location Dermatology Clinics",
  "Pediatric Dermatology",
  "Mohs & Surgical Dermatology",
];

const MEDICAL_SERVICES = [
  "Acne Treatment", "Eczema Treatment", "Psoriasis Treatment", "Skin Infection Treatment",
  "Skin Allergy Treatment", "Skin Cancer Screening & Treatment", "Mole Evaluation & Removal",
  "Cyst & Lipoma Removal", "Wart Removal", "Nail Disorder Treatment",
  "Hair Loss Diagnosis & Treatment", "Scalp Disorder Treatment", "Rosacea Treatment",
  "Hyperpigmentation & Melasma", "Scar Treatment", "Burn Scar Treatment",
  "Vitiligo Treatment", "Skin Biopsy & Diagnostics",
];

const FAQS = [
  { q: "Can I bundle add-ons with my existing website plan?", a: "Yes. Every add-on is designed to layer onto your current DermatologyWebsiteDesign.com plan or an existing site we onboard. Bundling multiple add-ons unlocks volume pricing that's shown on your custom quote." },
  { q: "Are these add-ons HIPAA-aware?", a: "Every integration, form, hosting choice, and analytics setup is HIPAA-aware by default. We provide BAAs where applicable and audit PHI exposure across forms, chat, and marketing pixels." },
  { q: "Do I have to commit to a long contract?", a: "No. Add-ons are month-to-month unless you choose an annual plan for a discount. You keep every asset — code, content, credentials, backups — if you leave." },
  { q: "How fast can you launch an add-on?", a: "Most integrations, tracking setups, and content services launch within 3–10 business days. Larger builds like custom CRO programs or migrations follow a scoped timeline shared upfront." },
  { q: "Do you support sites you didn't build?", a: "Yes. After a paid technical audit we onboard existing dermatology sites — WordPress, Webflow, custom, or headless — and layer add-ons on top." },
];

export const Route = createFileRoute("/{-$lang}/dermatology-add-on-services")({
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
    const st = getStaticTranslation(lang, "addOns");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-add-on-services") },
        { title: st?.meta?.title ?? "Dermatology Website Add-On Services — Care, SEO, Growth & Integrations" },
        { name: "description", content: st?.meta?.description ?? "Premium add-on services for dermatology practices: 24/7 care & maintenance, HIPAA-aware hosting, content & CRO, local SEO, EHR & booking integrations, and full-funnel growth marketing. Month-to-month." },
        { property: "og:title", content: st?.meta?.og?.title ?? "Dermatology Website Add-On Services" },
        { property: "og:description", content: st?.meta?.og?.description ?? "Layer care, hosting, SEO, integrations, and growth marketing onto your dermatology website — engineered for compounding patient growth." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-add-on-services" },
        { property: "og:image", content: addonHeroGlass },
        { name: "twitter:image", content: addonHeroGlass },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: "/dermatology-add-on-services" }, ...buildHreflangLinks("/dermatology-add-on-services", params.lang),
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Service",
          serviceType: st?.meta?.jsonLd?.serviceType ?? "Dermatology Website Add-On Services",
          provider: { "@type": "Organization", name: st?.meta?.jsonLd?.provider ?? "DermatologyWebsiteDesign.com" },
          areaServed: "United States",
          hasOfferCatalog: {
            "@type": "OfferCatalog", name: st?.meta?.jsonLd?.catalogName ?? "Dermatology Website Add-Ons",
            itemListElement: CATEGORIES.map((c, cIdx) => ({
              "@type": "OfferCatalog", name: st?.sections?.catalog?.categories?.[c.id as keyof typeof st.sections.catalog.categories]?.title ?? c.title,
              itemListElement: c.items.map((i, iIdx) => ({
                "@type": "Offer", 
                itemOffered: { 
                  "@type": "Service", 
                  name: st?.sections?.catalog?.categories?.[c.id as keyof typeof st.sections.catalog.categories]?.items?.[iIdx]?.name ?? i.name, 
                  description: st?.sections?.catalog?.categories?.[c.id as keyof typeof st.sections.catalog.categories]?.items?.[iIdx]?.blurb ?? i.blurb 
                } 
              })),
            })),
          },
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: FAQS.map((f, i) => ({
            "@context": "https://schema.org", "@type": "Question",
            name: st?.faq?.items?.[i]?.q ?? f.q, 
            acceptedAnswer: { "@type": "Answer", text: st?.faq?.items?.[i]?.a ?? f.a }
          })),
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: st?.meta?.jsonLd?.breadcrumbs?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
            { "@type": "ListItem", position: 2, name: st?.meta?.jsonLd?.breadcrumbs?.services ?? "Services", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
            { "@type": "ListItem", position: 3, name: st?.meta?.jsonLd?.breadcrumbs?.current ?? "Add-On Services", item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-add-on-services") },
          ],
        }) },
      ],
    };
  })(args), args.params.lang, "/dermatology-add-on-services"),
  component: AddOnServicesPage,
});

function useIsDesktop() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return ok;
}

function AddOnServicesPage() {
  const { t } = useTranslation("addOns");
  const lang = useCurrentLang();
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [activeCat, setActiveCat] = useState<string>(CATEGORIES[0].id);
  const [openMobile, setOpenMobile] = useState<Record<string, boolean>>({ [CATEGORIES[0].id]: true });
  const isDesktop = useIsDesktop();

  const q = query.trim().toLowerCase();
  const filtered = q
    ? CATEGORIES.map((c) => ({
        ...c,
        items: c.items.filter(
          (i) => i.name.toLowerCase().includes(q) || i.blurb.toLowerCase().includes(q)
        ),
      })).filter((c) => c.items.length > 0)
    : CATEGORIES;

  const totalCount = CATEGORIES.reduce((n, c) => n + c.items.length, 0);

  // Sticky nav active section detection
  useEffect(() => {
    if (!isDesktop) return;
    const observers: IntersectionObserver[] = [];
    CATEGORIES.forEach((c) => {
      const el = document.getElementById(`cat-${c.id}`);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActiveCat(c.id)),
        { rootMargin: "-40% 0px -55% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isDesktop, filtered.length]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section
        className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32"
        style={{
          background:
            "radial-gradient(1200px 600px at 85% -10%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 60%), radial-gradient(900px 500px at 0% 110%, color-mix(in oklch, var(--brand-accent), transparent 85%), transparent 60%), linear-gradient(180deg, var(--background), color-mix(in oklch, var(--brand-primary), transparent 96%))",
        }}
      >
        {/* premium glassmorphism dashboard mockup on the right (teal palette) */}
        <img
          src={addonHeroGlass}
          alt=""
          aria-hidden
          width={1600}
          height={1200}
          fetchPriority="high"
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-[62%] object-cover object-right opacity-95 lg:block"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 40%, black 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%, black 100%)",
          }}
        />
        {/* left scrim so headline stays crisp over any overlap */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-3/5 lg:block"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, var(--background) 40%, color-mix(in oklch, var(--background), transparent 40%) 72%, transparent 100%)",
          }}
        />


        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-balance text-[2.25rem] font-normal leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[4.25rem]">
              {t("hero.heading")}{" "}
              <span className="font-semibold text-brand-primary">
                {t("hero.headingAccent")}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              {t("hero.description")}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                to="/contact"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-lg shadow-brand-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                }}
              >
                <CtaLabel />
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#catalog"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-brand-primary/40 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
              >
                {t("hero.cta.browse")}
              </a>
            </div>
          </Reveal>

          {/* KPI strip */}
          <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { k: `${totalCount}+`, v: t("hero.stats.0.label") },
              { k: "99.99%", v: t("hero.stats.1.label") },
              { k: "<15 min", v: t("hero.stats.2.label") },
              { k: t("hero.stats.3.value"), v: t("hero.stats.3.label") },
            ].map((s) => (
              <li
                key={s.v}
                className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-md sm:p-5"
                style={{ boxShadow: "0 8px 30px -18px color-mix(in oklch, var(--brand-primary), transparent 60%)" }}
              >
                <div className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                  {s.k}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
                  {s.v}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AUDIENCE + MEDICAL SERVICES BAR */}
      <section className="border-y border-border/60 bg-card/40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-12">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {t("trust.audiences.label")}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AUDIENCES.map((a, i) => (
                  <li
                    key={a}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
                    {t(`trust.audiences.items.${i}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {t("trust.medicalServices.label")}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {MEDICAL_SERVICES.map((s, i) => (
                  <li
                    key={s}
                    className="inline-flex items-center rounded-full border border-border/70 bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {t(`trust.medicalServices.items.${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY CATEGORY NAV */}
      <StickyCategoryNav activeCat={activeCat} />

      {/* CATALOG */}
      <section id="catalog" className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {t("sections.catalog.badge")}
              </span>
              <h2 className="mt-3 text-balance text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
                {t("sections.catalog.heading")}{" "}
                <span className="font-medium italic text-brand-primary">{t("sections.catalog.headingItalic")}</span>
              </h2>
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("sections.catalog.searchPlaceholder", { count: totalCount })}
                aria-label={t("sections.catalog.searchAria")}
                className="w-full rounded-full border border-border/70 bg-background py-3 pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-muted-foreground">
               {t("sections.catalog.noResults", { query })}
            </p>
          ) : (
            <div className="mt-12 space-y-10 sm:space-y-14">
              {filtered.map((c, idx) => {
                const isOpen = isDesktop || !!openMobile[c.id] || !!q;
                return (
                  <article
                    key={c.id}
                    id={`cat-${c.id}`}
                    className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl scroll-mt-32"
                    style={{
                      background:
                        "linear-gradient(180deg, color-mix(in oklch, " +
                        c.accent +
                        ", transparent 94%), color-mix(in oklch, var(--card), transparent 20%))",
                      boxShadow:
                        "0 24px 60px -32px color-mix(in oklch, " + c.accent + ", transparent 60%)",
                    }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-60 blur-3xl"
                      style={{ background: `color-mix(in oklch, ${c.accent}, transparent 78%)` }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        !isDesktop && !q &&
                        setOpenMobile((s) => ({ ...s, [c.id]: !s[c.id] }))
                      }
                      aria-expanded={isOpen}
                      aria-controls={`items-${c.id}`}
                      className="relative flex w-full items-start gap-4 p-6 text-left sm:p-10 lg:cursor-default"
                    >
                      <span
                        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border text-brand-primary-foreground shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${c.accent}, color-mix(in oklch, ${c.accent}, black 22%))`,
                          borderColor: `color-mix(in oklch, ${c.accent}, transparent 60%)`,
                          boxShadow: `0 12px 30px -12px color-mix(in oklch, ${c.accent}, transparent 40%)`,
                        }}
                      >
                        <c.icon className="h-6 w-6" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                          {formatLocalizedNumber(idx + 1, lang, 2)} — {formatLocalizedNumber(c.items.length, lang)} {t("sections.catalog.serviceCount")}
                        </div>
                        <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                          {t(`sections.catalog.categories.${c.id}.title`)}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
                          {t(`sections.catalog.categories.${c.id}.tagline`)}
                        </p>
                      </div>
                      <ChevronDown
                        aria-hidden
                        className={`mt-2 h-5 w-5 shrink-0 text-muted-foreground transition-transform lg:hidden ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      id={`items-${c.id}`}
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      } lg:!grid-rows-[1fr] lg:!opacity-100`}
                    >
                      <div className="overflow-hidden">
                        <ul className="relative grid grid-cols-1 gap-3 px-6 pb-8 sm:grid-cols-2 sm:gap-4 sm:px-10 sm:pb-10 lg:grid-cols-3">
                          {c.items.map((it, itIdx) => (
                            <li
                              key={it.name}
                              className="group relative flex h-full flex-col gap-2 rounded-2xl border border-border/50 bg-background/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:bg-background hover:shadow-[0_16px_40px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] focus-within:ring-2 focus-within:ring-brand-primary/40"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <h4 className="text-sm font-semibold leading-snug text-foreground">
                                  {t(`sections.catalog.categories.${c.id}.items.${itIdx}.name`)}
                                </h4>
                                <CheckCircle2
                                  className="h-4 w-4 shrink-0 text-brand-primary"
                                  aria-hidden
                                />
                              </div>
                              <p className="text-xs leading-relaxed text-muted-foreground">
                                {t(`sections.catalog.categories.${c.id}.items.${itIdx}.blurb`)}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <div className="px-6 pb-8 sm:px-10 sm:pb-10">
                          <Link
                            to="/contact"
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border/70 bg-background px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-all hover:-translate-y-0.5 hover:border-brand-primary/50 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                          >
                            {t("sections.catalog.ctaAdd", { title: t(`sections.catalog.categories.${c.id}.title`) })} <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* BUNDLE CTA */}
      <section
        className="relative isolate overflow-hidden py-20 sm:py-24"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 92%), color-mix(in oklch, var(--brand-accent), transparent 92%))",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-balance text-4xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
              {t("cta.heading")}{" "}
              <span className="font-medium italic text-brand-primary">
                {t("cta.headingItalic")}
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              {t("cta.description")}
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                to="/contact"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-lg shadow-brand-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                }}
              >
                <CtaLabel />
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {t("faq.badge")}
              </span>
              <h2 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
                {t("faq.heading")}
              </h2>
              <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                {t("faq.description")}
              </p>
            </div>

            <ul className="divide-y divide-border/70 border-y border-border/70">
              {FAQS.map((f, i) => {
                const isOpen = i === openFaq;
                return (
                  <li key={f.q}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 sm:gap-6 sm:py-7"
                    >
                      <span className="mt-1 shrink-0 text-[11px] font-semibold tracking-[0.18em] text-brand-primary">
                        {formatLocalizedNumber(i + 1, lang, 2)}
                      </span>
                      <span className="min-w-0 flex-1 text-base font-medium leading-snug text-foreground sm:text-lg">
                        {t(`faq.items.${i}.q`)}
                      </span>
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all ${
                          isOpen
                            ? "border-brand-primary bg-brand-primary text-brand-primary-foreground"
                            : "border-border text-muted-foreground group-hover:border-brand-primary group-hover:text-brand-primary"
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 pl-10 pr-2 text-sm leading-relaxed text-muted-foreground sm:pb-7 sm:pl-[calc(1.75rem+1.5rem)] sm:pr-16 sm:text-base">
                          {t(`faq.items.${i}.a`)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footerLinks.prefix")}{" "}
          <Link to="/dermatology-website-management-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.management")}</Link>,{" "}
          <Link to="/dermatology-website-management-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.maintenance")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/plan-packages-and-costs" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.pricing")}</Link>.
        </p>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"><KeywordOwnerLinks owners={["seo"]} /></div>

      <SiteFooter />
    </div>
  );
}

function StickyCategoryNav({ activeCat }: { activeCat: string }) {
  const { t } = useTranslation("addOns");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current?.querySelector<HTMLAnchorElement>(
      `[data-cat="${activeCat}"]`
    );
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeCat]);

  return (
    <div className="sticky top-16 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="relative mx-auto max-w-7xl">
        {/* fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent" />
        <div
          ref={scrollRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-1.5 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((c) => {
            const active = activeCat === c.id;
            return (
              <a
                key={c.id}
                href={`#cat-${c.id}`}
                data-cat={c.id}
                className={`inline-flex shrink-0 snap-start items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${
                  active
                    ? "border-transparent bg-brand-primary text-brand-primary-foreground shadow-md shadow-brand-primary/25"
                    : "border-border/70 bg-background text-muted-foreground hover:border-brand-primary/40 hover:text-brand-primary"
                }`}
              >
                <c.icon className="h-3.5 w-3.5" aria-hidden />
                {t(`sections.catalog.categories.${c.id}.title`).split(" ")[0]}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
