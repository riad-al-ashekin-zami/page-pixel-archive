import { finalizeSeoHead } from "@/lib/seo-head";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { CtaLabel } from "@/lib/cta";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks } from "@/lib/i18n-routing";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { ModuleGridField } from "@/components/hero-motifs";
import { CountUp } from "@/components/count-up";
import {
  ArrowRight, CheckCircle2, X, Plus, Minus, Sparkles, ShieldCheck,
  Zap, Crown, Rocket, Building2, Calculator, Star, Quote,
  Tag, PiggyBank, Clock, HeartHandshake, Receipt, MessageSquare,
  Sprout, Stethoscope, TrendingUp, ShoppingBag, Repeat, Monitor,
  Video, Gem, Gift, Palette, PenTool, FileText, ImageIcon,
  UserCheck, Gauge, Store, Camera, MessagesSquare, Bot, Mail,
  Share2, Search, Wrench, Server, Globe, ThumbsUp,
  Languages, Accessibility, FileCheck, Database, BarChart3,
  FlaskConical, MoveRight, AtSign, Mic, Brush, PhoneCall, Rabbit,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { robotsContent } from "@/lib/index-allowlist";

// ============================================================
// WEBSITE PACKAGES (One-time build) — 6 tiers
// ============================================================
type WebsitePackage = {
  name: string;
  subtitle: string;
  bestFor: string;
  price: string;
  priceNote: string;
  icon: typeof Zap;
  badge?: "popular" | "flagship";
  features: string[];
  cons?: string[];
  market?: string;
  savings?: string;
};

const websitePackages: WebsitePackage[] = [
  {
    name: "Starter",
    subtitle: "One Page",
    bestFor: "New clinic, solo dermatologist, landing page",
    price: "$797",
    priceNote: "one-time",
    icon: Sprout,
    market: "$1,000 – $2,500",
    savings: "20–68% cheaper",
    features: [
      "Single-page scrolling website",
      "Mobile responsive design",
      "Contact form + Click-to-call",
      "Google Map embed",
      "Basic on-page SEO",
      "SSL + Hosting setup guide",
      "Delivery: 1 week",
      "1 revision round",
    ],
    cons: ["No blog or patient portal"],
  },
  {
    name: "Clinic Pro",
    subtitle: "5–8 Pages",
    bestFor: "Established solo / small practice",
    price: "$1,997",
    priceNote: "one-time",
    icon: Stethoscope,
    market: "$3,000 – $5,000",
    savings: "33–60% cheaper",
    features: [
      "Home, About, Services (3–5), Contact",
      "Online appointment booking",
      "Before/After photo gallery",
      "Doctor bio + credential page",
      "Local SEO setup + GBP optimization",
      "HIPAA-compliant contact form",
      "Speed optimization",
      "Delivery: 2–3 weeks",
      "2 revision rounds",
    ],
  },
  {
    name: "Practice Growth",
    subtitle: "10–15 Pages",
    bestFor: "Growing practice, cosmetic derm",
    price: "$4,499",
    priceNote: "one-time",
    icon: TrendingUp,
    badge: "popular",
    market: "$5,000 – $10,000",
    savings: "10–55% cheaper",
    features: [
      "Full multi-page website",
      "Individual treatment landing pages",
      "Patient portal integration",
      "Blog setup (5 starter posts)",
      "Advanced local SEO",
      "Core Web Vitals optimization",
      "Logo + basic branding",
      "Social OG tags + Schema",
      "Delivery: 3–4 weeks",
      "3 revision rounds",
    ],
  },
  {
    name: "E-Commerce",
    subtitle: "Product Store",
    bestFor: "Derm selling skincare products",
    price: "$6,999",
    priceNote: "one-time",
    icon: ShoppingBag,
    market: "$8,000 – $15,000",
    savings: "12–53% cheaper",
    features: [
      "Practice website (10+ pages)",
      "WooCommerce OR Shopify store",
      "Product catalog setup (30 SKUs)",
      "Payment gateway (Stripe / PayPal)",
      "Order management system",
      "Full SEO suite",
      "Appointment + store combined",
      "Delivery: 4–6 weeks",
    ],
  },
  {
    name: "Authority Brand",
    subtitle: "Custom Enterprise",
    bestFor: "Multi-location, high-revenue practice",
    price: "$12,999",
    priceNote: "one-time",
    icon: Crown,
    badge: "flagship",
    market: "$15,000 – $30,000",
    savings: "13–56% cheaper",
    features: [
      "Full custom design (no templates)",
      "20+ pages + multi-location pages",
      "Custom branding + logo suite",
      "E-commerce store included",
      "Patient portal + doctor portal",
      "HIPAA compliance full setup",
      "30 blog posts / treatment pages",
      "Video integration",
      "6 months SEO retainer included",
      "Dedicated account manager",
      "Delivery: 6–10 weeks",
    ],
  },
  {
    name: "Enterprise Multi-Site",
    subtitle: "DSO / Multi-Location",
    bestFor: "DSO groups, 3+ locations, national practices",
    price: "$18,999+",
    priceNote: "custom",
    icon: Repeat,
    market: "$25,000 – $150,000+",
    savings: "24%+ cheaper",
    features: [
      "Multi-location architecture",
      "Each location = separate landing page",
      "Central CMS control",
      "Unified branding across sites",
      "Multi-location local SEO",
      "Staff portal for each location",
      "Custom quote based on scope",
      "Priority support",
    ],
  },
];


// ============================================================
// SPECIALTY PACKAGES — 3 items
// ============================================================
const specialtyPackages = [
  {
    icon: Monitor,
    name: "Template Site",
    price: "$1,199",
    priceNote: "one-time",
    market: "$1,500 – $3,000",
    savings: "20–60% cheaper",
    desc: "Pre-built dermatology template, customized with your branding and content. Delivery: 5 days. Limited customization but fast and affordable.",
  },
  {
    icon: Video,
    name: "Telehealth / Portal Setup",
    price: "$2,499",
    priceNote: "one-time",
    market: "$3,500 – $6,000",
    savings: "28–58% cheaper",
    desc: "Telemedicine integration (Doxy.me, Zoom Health, or similar), patient portal setup, secure messaging, appointment scheduling. Add to any package.",
  },
  {
    icon: Gem,
    name: "Premium Custom Site",
    price: "$8,999",
    priceNote: "one-time",
    market: "$10,000 – $18,000",
    savings: "10–50% cheaper",
    desc: "Mid-tier between Practice Growth and Authority Brand. 15–20 pages, full custom design, no template, advanced SEO, 3 months post-launch support.",
  },
];


// ============================================================
// MONTHLY BUNDLE PACKAGES — 4 items
// ============================================================
type Bundle = {
  name: string;
  tag: string;
  price: string;
  priceNote: string;
  desc: string;
  highlight?: boolean;
  flagship?: boolean;
  market?: string;
  savings?: string;
};

const monthlyBundles: Bundle[] = [
  {
    name: "Essential Bundle",
    tag: "Hosting + Maintenance + Local SEO",
    price: "$399",
    priceNote: "/mo",
    market: "$500 – $900/mo",
    savings: "20–55% cheaper",
    desc: "Hosting + security + monthly maintenance updates + local SEO monitoring + GBP management. Save $99/mo vs individual.",
  },
  {
    name: "Growth Bundle",
    tag: "Essential + Full SEO Campaign",
    price: "$799",
    priceNote: "/mo",
    highlight: true,
    market: "$1,500 – $2,500/mo",
    savings: "47–68% cheaper",
    desc: "Everything in Essential + full SEO campaign (content, backlinks, technical SEO, keyword ranking reports). Most recommended retainer.",
  },
  {
    name: "Marketing Bundle",
    tag: "SEO + Google Ads + Social + Reviews",
    price: "$1,299",
    priceNote: "/mo",
    market: "$2,500 – $4,500/mo",
    savings: "48–71% cheaper",
    desc: "Full SEO + Google Ads management + Social media (8 posts/mo) + Review generation system. Full digital marketing coverage.",
  },
  {
    name: "Full-Stack Bundle",
    tag: "Everything — Max Growth Mode",
    price: "$1,999",
    priceNote: "/mo",
    flagship: true,
    market: "$3,000 – $6,000/mo",
    savings: "33–67% cheaper",
    desc: "Marketing Bundle + Email CRM campaigns + 2 blog posts/mo + reputation monitoring + quarterly strategy session + priority support. Best LTV.",
  },
];


// ============================================================
// ADD-ONS SERVICE — full à la carte table
// ============================================================
type AddOn = { icon: typeof Zap; name: string; price: string; type: "MONTHLY" | "ONE-TIME" | "PER UNIT" | "ONE-TIME + MONTHLY" | "BUNDLE"; bestFor: string; market?: string };

const addOns: AddOn[] = [
  { icon: Wrench,        name: "Monthly Website Maintenance",       price: "$149–$299/mo",         type: "MONTHLY",           bestFor: "All clients",                       market: "$250–$500/mo" },
  { icon: Server,        name: "Hosting + SSL (managed)",           price: "$49–$99/mo",           type: "MONTHLY",           bestFor: "All clients",                       market: "$100–$250/mo" },
  { icon: Search,        name: "Local SEO Monthly",                 price: "$299–$599/mo",         type: "MONTHLY",           bestFor: "Solo + small practice",             market: "$500–$1,500/mo" },
  { icon: TrendingUp,    name: "Full SEO Campaign",                 price: "$699–$1,499/mo",       type: "MONTHLY",           bestFor: "Growing practice",                  market: "$1,500–$5,000/mo" },
  { icon: Globe,         name: "Google Ads Management",             price: "$299–$699/mo + ad spend", type: "MONTHLY",        bestFor: "Patient acquisition",               market: "$500–$1,500/mo + 10–20% spend" },
  { icon: Share2,        name: "Social Media Management",           price: "$399–$899/mo",         type: "MONTHLY",           bestFor: "Instagram / Facebook",              market: "$800–$2,500/mo" },
  { icon: ThumbsUp,      name: "Review Generation System",          price: "$149–$299/mo",         type: "MONTHLY",           bestFor: "All practices",                     market: "$300–$800/mo" },
  { icon: Mail,          name: "Email Newsletter / CRM",            price: "$199–$499/mo",         type: "MONTHLY",           bestFor: "Patient retention",                 market: "$500–$1,200/mo" },
  { icon: Bot,           name: "Chatbot / Live Chat Setup",         price: "$299 setup + $49/mo",  type: "ONE-TIME + MONTHLY", bestFor: "Lead capture",                      market: "$800 setup + $99/mo" },
  { icon: Palette,       name: "Logo Design",                       price: "$299–$599",            type: "ONE-TIME",          bestFor: "New clinics",                       market: "$500–$2,000" },
  { icon: PenTool,       name: "Full Branding Package",             price: "$799–$1,499",          type: "ONE-TIME",          bestFor: "Rebranding",                        market: "$2,000–$5,000" },
  { icon: FileText,      name: "Blog Content (per post)",           price: "$79–$149/post",        type: "PER UNIT",          bestFor: "SEO content",                       market: "$150–$400/post" },
  { icon: Receipt,       name: "Extra Treatment Pages",             price: "$149–$249 each",       type: "PER UNIT",          bestFor: "Expanding practices",               market: "$300–$600 each" },
  { icon: ImageIcon,     name: "Before / After Gallery Setup",      price: "$299–$499",            type: "ONE-TIME",          bestFor: "Cosmetic derm",                     market: "$600–$1,200" },
  { icon: UserCheck,     name: "Patient Portal Integration",        price: "$699–$1,499",          type: "ONE-TIME",          bestFor: "Medical practices",                 market: "$2,000–$5,000" },
  { icon: Video,         name: "Telemedicine Integration",          price: "$1,499–$2,499",        type: "ONE-TIME",          bestFor: "Telehealth practices",              market: "$3,000–$6,000" },
  { icon: Gauge,         name: "Speed / Core Web Vitals Optimization", price: "$299–$599",         type: "ONE-TIME",          bestFor: "Slow sites",                        market: "$600–$1,500" },
  { icon: Store,         name: "Shopify Store Setup",               price: "$1,299–$2,499",        type: "ONE-TIME",          bestFor: "Product sellers",                   market: "$2,500–$5,000" },
  { icon: Camera,        name: "Video / Photo Production Guide",    price: "$299–$799",            type: "ONE-TIME",          bestFor: "High-end clients",                  market: "$600–$1,800" },
  { icon: MessagesSquare,name: "Online Reputation Management",      price: "$299–$599/mo",         type: "MONTHLY",           bestFor: "Healthgrades, RealSelf, Google",    market: "$600–$1,200/mo" },
  { icon: Gift,          name: "SEO / Maintenance Retainer",        price: "$499–$1,200/mo",       type: "BUNDLE",            bestFor: "Long-term clients",                 market: "$1,000–$2,500/mo" },
  { icon: Camera,        name: "On-Site Photography / Videography", price: "$800–$2,500",          type: "ONE-TIME",          bestFor: "Cosmetic & premium clinics",        market: "$1,500–$5,000" },
  { icon: FileText,      name: "Medical Copywriting (per page)",    price: "$150–$400/page",       type: "PER UNIT",          bestFor: "Treatment & service pages",         market: "$200–$600/page" },
  { icon: Languages,     name: "Multi-Language / Translation",      price: "$299–$799/language",   type: "ONE-TIME",          bestFor: "Bilingual / Spanish markets",       market: "$600–$1,500/language" },
  { icon: Accessibility, name: "ADA / WCAG Accessibility Audit",    price: "$499–$1,499",          type: "ONE-TIME",          bestFor: "Compliance-focused practices",      market: "$1,000–$3,000" },
  { icon: ShieldCheck,   name: "HIPAA Compliance Audit + BAA",      price: "$950",                 type: "ONE-TIME",          bestFor: "Medical / PHI-handling forms",      market: "$1,500–$3,500" },
  { icon: Database,      name: "EHR / EMR Integration",             price: "$1,500–$4,999",        type: "ONE-TIME",          bestFor: "Athena, ModMed, Nextech",           market: "$3,000–$10,000" },
  { icon: FileCheck,     name: "Insurance Verification Form",       price: "$499–$1,299",          type: "ONE-TIME",          bestFor: "Insurance-based practices",         market: "$1,000–$2,500" },
  { icon: BarChart3,     name: "Analytics + Heatmap Setup",         price: "$299–$599",            type: "ONE-TIME",          bestFor: "GA4, Hotjar, PostHog",              market: "$600–$1,200" },
  { icon: FlaskConical,  name: "A/B Testing / CRO Experiments",     price: "$499/mo",              type: "MONTHLY",           bestFor: "Traffic-heavy sites",               market: "$1,000–$2,500/mo" },
  { icon: MoveRight,     name: "Site Migration (from old stack)",   price: "$499–$1,999",          type: "ONE-TIME",          bestFor: "WordPress / legacy rebuilds",       market: "$1,000–$3,500" },
  { icon: AtSign,        name: "Domain + Google Workspace Email",   price: "$149 setup",           type: "ONE-TIME",          bestFor: "New practices",                     market: "$250–$500 setup" },
  { icon: Mail,          name: "SMTP / Transactional Email Setup",  price: "$199–$449",            type: "ONE-TIME",          bestFor: "Deliverable forms, receipts, alerts", market: "$500–$1,200" },
  { icon: Mic,           name: "Podcast / Webinar Landing Pages",   price: "$299–$599 each",       type: "PER UNIT",          bestFor: "Thought-leadership marketing",      market: "$600–$1,200 each" },
  { icon: Brush,         name: "Custom Illustrations / Icons",      price: "$499–$1,499",          type: "ONE-TIME",          bestFor: "Brand-forward practices",           market: "$1,000–$3,000" },
  { icon: PhoneCall,     name: "After-Hours Support Hotline",       price: "$199/mo",              type: "MONTHLY",           bestFor: "24/7 uptime critical sites",        market: "$400–$800/mo" },
  { icon: Rabbit,        name: "Rush Delivery (50% faster)",        price: "+25% surcharge",       type: "ONE-TIME",          bestFor: "Time-sensitive launches",           market: "+40–75% surcharge" },
];


const typeStyles: Record<AddOn["type"], string> = {
  "MONTHLY":            "bg-brand-primary/10 text-brand-primary",
  "ONE-TIME":           "bg-brand-accent/15 text-brand-accent",
  "PER UNIT":           "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "ONE-TIME + MONTHLY": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "BUNDLE":             "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

// ============================================================
// STATS + TESTIMONIALS + FAQ
// ============================================================
const stats = [
  { prefix: "", num: "50", suffix: "+", label: "Dermatology practices launched" },
  { prefix: "", num: "4.9", suffix: "/5", label: "Average client satisfaction", static: true },
  { prefix: "$", num: "797", suffix: "", label: "Starting one-time price" },
  { prefix: "", num: "48", suffix: "h", label: "Avg. edit turnaround" },
];

const TESTIMONIAL_COUNT = 2;
const FAQ_COUNT = 8;

// ============================================================
// ROUTE
// ============================================================
export const Route = createFileRoute("/{-$lang}/plan-packages-and-costs")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: (args) => finalizeSeoHead((({ params }: typeof args) => {
    const lang = params.lang as string;
    const st = getStaticTranslation(lang, "pricing");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/plan-packages-and-costs") },
        { title: st?.meta?.title ?? "Dermatology Website Pricing — Plans, Packages & Transparent Costs" },
        { name: "description", content: st?.meta?.description ?? "Transparent dermatology website pricing. One-time builds from $797 to $18,999+, monthly bundles from $399, and à la carte add-ons. See exactly what you'll pay before we talk." },
        { property: "og:title", content: st?.meta?.og?.title ?? "Dermatology Website Pricing — Plans, Packages & Costs" },
        { property: "og:description", content: st?.meta?.og?.description ?? "Six website packages, three specialty builds, four monthly bundles, and 20+ à la carte add-ons — with a live cost estimator. Fully transparent pricing." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/plan-packages-and-costs" },
        { property: "og:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/plan-packages-and-costs" }, ...buildHreflangLinks("/plan-packages-and-costs", params.lang)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: st?.meta?.jsonLd?.breadcrumb?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
              { "@type": "ListItem", position: 2, name: st?.meta?.jsonLd?.breadcrumb?.plans ?? "Plans & Pricing", item: localizedUrl(resolveRouteLanguage(params.lang), "/plan-packages-and-costs") },
            ],
          }),
        },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PriceSpecification",
          name: st?.meta?.jsonLd?.priceSpec?.name ?? "Dermatology Website Packages",
          priceCurrency: "USD",
          minPrice: "797",
          maxPrice: "18999",
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: Array.from({ length: st?.faq?.items?.length ?? FAQ_COUNT }, (_, i) => ({
            "@type": "Question",
            name: st?.faq?.items?.[i]?.q ?? "",
            acceptedAnswer: { "@type": "Answer", text: st?.faq?.items?.[i]?.a ?? "" },
          })),
        }) },
      ],
    };
  })(args), args.params.lang, "/plan-packages-and-costs"),
  component: PricingPage,
});

// ============================================================
// PAGE
// ============================================================
function PricingPage() {
  const { t } = useTranslation("pricing");
  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground pb-20 md:pb-0">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1000px 460px at 20% -10%, color-mix(in oklch, var(--brand-primary), transparent 80%), transparent 60%), radial-gradient(900px 460px at 100% 10%, color-mix(in oklch, var(--brand-accent), transparent 84%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%) 0%, transparent 45%)",
          }}
        />
        <ModuleGridField className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-brand-primary opacity-20" />

        <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 md:pt-20 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
                <Tag className="h-3.5 w-3.5" /> {t("hero.badge")}
              </span>
              <h1 className="mt-5 font-black leading-[1.05] tracking-tight text-[clamp(2rem,6vw,3.6rem)]">
                {t("hero.heading")}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(120deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 55%))" }}
                >
                  
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {t("hero.description")}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="#packages" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]">
                  {t("hero.cta")} <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#estimator" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary">
                  <Calculator className="h-4 w-4" /> {t("hero.estimatorCta")}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className="text-3xl font-black tracking-tight text-brand-primary md:text-4xl">
                {s.prefix}
                {s.static ? s.num : <CountUp value={s.num} />}
                {s.suffix}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {i === 0 ? t("stats.launched") : i === 1 ? t("stats.satisfaction") : i === 2 ? t("stats.startingPrice") : t("stats.turnaround")}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAR */}
      <section aria-label={t("trust.ariaLabel")} className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 md:pt-16">
        <div className="grid gap-4 rounded-3xl border border-border/70 bg-card p-5 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-8 lg:p-6">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-black tracking-tight">{t("trust.guarantee")}</div>
              <div className="text-xs text-muted-foreground">{t("trust.guaranteeSub")}</div>
            </div>
          </div>
          <ul className="grid grid-cols-2 items-center gap-x-4 gap-y-3 border-t border-border/60 pt-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground sm:grid-cols-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {[0, 1, 2, 3].map((idx) => (
              <li key={idx} className="flex min-w-0 items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-primary" />
                <span className="whitespace-nowrap">{t(`trust.features.${idx}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WEBSITE PACKAGES */}
      <section id="packages" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 md:pt-20">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.websitePackages.label")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("sections.websitePackages.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("sections.websitePackages.description")}
            </p>
          </div>
        </Reveal>

        <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {websitePackages.map((p, i) => {
            const Icon = p.icon;
            const isPopular = p.badge === "popular";
            const isFlagship = p.badge === "flagship";
            const borderColor = isPopular
              ? "border-brand-primary/50"
              : isFlagship
              ? "border-amber-400/50"
              : "border-border/70";
            return (
              <RevealItem
                key={i}
                className={`relative flex h-full flex-col rounded-3xl border bg-card p-7 transition-all hover:-translate-y-1 ${borderColor} ${
                  isPopular ? "shadow-[0_30px_80px_-40px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] lg:-translate-y-2" : ""
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary-foreground">
                    <Star className="h-3 w-3 fill-current" /> {t("sections.websitePackages.popular")}
                  </span>
                )}
                {isFlagship && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    <Crown className="h-3 w-3" /> {t("sections.websitePackages.flagship")}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span className={`grid h-11 w-11 place-items-center rounded-2xl ${isPopular ? "bg-brand-primary text-brand-primary-foreground" : isFlagship ? "bg-amber-500 text-white" : "bg-brand-primary/10 text-brand-primary"}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xl font-black tracking-tight">{t(`sections.websitePackages.items.${i}.name`)}</div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t(`sections.websitePackages.items.${i}.subtitle`)}</div>
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tight text-brand-primary tabular-nums md:text-5xl">
                    {t(`sections.websitePackages.items.${i}.price`)}
                  </span>
                  <span className="text-sm text-muted-foreground">{t(`sections.websitePackages.items.${i}.priceNote`)}</span>
                </div>
                {p.market && (
                  <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-[11px] leading-snug">
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                      <span className="min-w-0 font-semibold text-muted-foreground">
                        {t("sections.websitePackages.otherAgencies")}{" "}
                        <span className="tabular-nums line-through decoration-muted-foreground/50">{p.market}</span>
                      </span>
                      <span className="inline-flex w-fit shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                        {t(`sections.websitePackages.items.${i}.savings`)}
                      </span>
                    </div>
                  </div>
                )}
                <div className="mt-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{t("sections.websitePackages.bestFor")}</span> {t(`sections.websitePackages.items.${i}.bestFor`)}
                </div>


                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-border/60 pt-6">
                  {p.features.map((_, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                      <span>{t(`sections.websitePackages.items.${i}.features.${fIdx}`)}</span>
                    </li>
                  ))}
                  {p.cons?.map((_, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60" />
                      <span>{t(`sections.websitePackages.items.${i}.cons.${cIdx}`)}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                    isPopular
                      ? "bg-brand-primary text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]"
                      : isFlagship
                      ? "bg-amber-500 text-white shadow-[0_12px_36px_-14px_rgba(245,158,11,0.5)]"
                      : "border border-border bg-background text-foreground hover:border-brand-primary/40 hover:text-brand-primary"
                  }`}
                >
                  {t("sections.websitePackages.startWith", { name: t(`sections.websitePackages.items.${i}.name`) })} <ArrowRight className="h-4 w-4" />
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t("sections.websitePackages.footer")}
        </p>
      </section>

      {/* SPECIALTY PACKAGES */}
      <section className="relative mt-20 py-20 md:py-24" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 97%))" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.specialty.label")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("sections.specialty.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("sections.specialty.description")}
              </p>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-6 md:grid-cols-3">
            {specialtyPackages.map((s, i) => {
              const Icon = s.icon;
              return (
                <RevealItem key={i} className="group rounded-3xl border border-border/70 bg-card p-7 transition-all hover:-translate-y-1 hover:border-brand-primary/40">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-accent/15 text-brand-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-black tracking-tight">{t(`sections.specialty.items.${i}.name`)}</h3>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-3xl font-black tracking-tight text-brand-primary tabular-nums">{s.price}</span>
                    <span className="text-xs text-muted-foreground">{s.priceNote}</span>
                  </div>
                  {s.market && (
                    <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-[11px] leading-snug">
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                        <span className="min-w-0 font-semibold text-muted-foreground">
                          {t("sections.specialty.market")}{" "}
                          <span className="tabular-nums line-through decoration-muted-foreground/50">{s.market}</span>
                        </span>
                        <span className="w-fit shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                          {s.savings}
                        </span>
                      </div>
                    </div>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t(`sections.specialty.items.${i}.desc`)}</p>

                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
                  >
                    {t("sections.specialty.cta")} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* MONTHLY BUNDLES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.bundles.label")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("sections.bundles.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("sections.bundles.description")}
            </p>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {monthlyBundles.map((b, i) => (
            <RevealItem
              key={i}
              className={`relative flex h-full flex-col rounded-3xl border p-6 transition-all hover:-translate-y-1 ${
                b.highlight
                  ? "border-brand-primary/50 bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 shadow-[0_30px_80px_-40px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]"
                  : b.flagship
                  ? "border-amber-400/60 bg-gradient-to-br from-amber-500/10 to-amber-500/5"
                  : "border-border/70 bg-card"
              }`}
            >
              {b.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary-foreground">
                  {t("sections.bundles.recommended")}
                </span>
              )}
              {b.flagship && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  <Crown className="h-3 w-3" /> {t("sections.bundles.bestLtv")}
                </span>
              )}
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base font-black tracking-tight">{t(`sections.bundles.items.${i}.name`)}</h3>
                <div className="text-right">
                  <span className={`text-2xl font-black tabular-nums ${b.flagship ? "text-amber-600 dark:text-amber-400" : "text-brand-primary"}`}>{b.price}</span>
                  <span className="text-xs text-muted-foreground">{b.priceNote}</span>
                </div>
              </div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t(`sections.bundles.items.${i}.tag`)}</div>
              {b.market && (
                <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-[11px] leading-snug">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                    <span className="min-w-0 font-semibold text-muted-foreground">
                      {t("sections.specialty.market")}{" "}
                      <span className="tabular-nums line-through decoration-muted-foreground/50">{b.market}</span>
                    </span>
                    <span className="w-fit shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                      {b.savings}
                    </span>
                  </div>
                </div>
              )}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">{t(`sections.bundles.items.${i}.desc`)}</p>

              <Link
                to="/contact"
                className={`mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  b.highlight
                    ? "bg-brand-primary text-brand-primary-foreground"
                    : b.flagship
                    ? "bg-amber-500 text-white"
                    : "border border-border bg-background text-foreground hover:border-brand-primary/40 hover:text-brand-primary"
                }`}
              >
                {t("sections.bundles.add", { name: t(`sections.bundles.items.${i}.name`).replace(" Bundle", "") })} <ArrowRight className="h-4 w-4" />
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* ADD-ONS TABLE */}
      <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 97%))" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.addOns.label")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("sections.addOns.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("sections.addOns.description")}
              </p>
            </div>
          </Reveal>

          <Reveal>
            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-3xl border border-border/70 bg-card md:block">
              <div className="grid grid-cols-[1.7fr_1.1fr_1.1fr_0.8fr_1.1fr] items-center gap-2 border-b border-border/60 bg-muted/40 px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <div>{t("sections.addOns.table.service")}</div>
                <div>{t("sections.addOns.table.ourPrice")}</div>
                <div>{t("sections.addOns.table.market")}</div>
                <div>{t("sections.addOns.table.type")}</div>
                <div>{t("sections.addOns.table.bestFor")}</div>
              </div>
              {addOns.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div
                    key={i}
                    className={`grid grid-cols-[1.7fr_1.1fr_1.1fr_0.8fr_1.1fr] items-center gap-2 px-6 py-3.5 text-sm ${i % 2 === 1 ? "bg-muted/20" : ""}`}
                  >
                    <div className="flex items-center gap-3 font-semibold text-foreground">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-primary/10 text-brand-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{a.name}</span>
                    </div>
                    <div className="font-bold tabular-nums text-brand-primary">{a.price}</div>
                    <div className="text-xs tabular-nums text-muted-foreground">
                      {a.market ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 text-emerald-700 dark:text-emerald-400">
                          <span className="line-through decoration-muted-foreground/50">{a.market}</span>
                          <span className="font-bold">↓</span>
                        </span>
                      ) : "—"}
                    </div>
                    <div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${typeStyles[a.type]}`}>
                        {a.type}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{a.bestFor}</div>
                  </div>
                );
              })}
            </div>

            {/* Mobile cards */}
            <div className="grid gap-3 md:hidden">
              {addOns.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="rounded-2xl border border-border/70 bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-bold tracking-tight">{a.name}</div>
                          <div className="text-xs text-muted-foreground">{a.bestFor}</div>
                        </div>
                      </div>
                      <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${typeStyles[a.type]}`}>
                        {a.type}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-col gap-1.5 border-t border-border/60 pt-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-3">
                      <div className="text-base font-black tabular-nums text-brand-primary">{a.price}</div>
                      {a.market && (
                        <div className="text-[11px] tabular-nums text-muted-foreground">
                          {t("sections.specialty.market")}{" "}<span className="line-through decoration-muted-foreground/50">{a.market}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

        </div>
      </section>

      {/* COST ESTIMATOR */}
      <section id="estimator" className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), white 96%), transparent)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("estimator.label")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("estimator.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("estimator.description")}
              </p>
            </div>
          </Reveal>
          <CostEstimator />
        </div>
      </section>

      {/* ENTERPRISE / CUSTOM */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border border-brand-primary/25 p-8 md:p-12"
            style={{ background: "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 88%), color-mix(in oklch, var(--brand-accent), transparent 92%))" }}
          >
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-background/60 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-primary">
                  <Building2 className="h-3.5 w-3.5" /> {t("sections.custom.badge")}
                </span>
                <h2 className="mt-4 text-3xl font-black tracking-tight md:text-[2.4rem] md:leading-[1.1]">
                  {t("sections.custom.title")}
                </h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  {t("sections.custom.description")}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]"
                >
                  <CtaLabel /> <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/plan-packages-and-costs"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
                >
                  <MessageSquare className="h-4 w-4" /> {t("sections.custom.pricingCta")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 96%))" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("testimonials.label")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("testimonials.title")}
              </h2>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: TESTIMONIAL_COUNT }, (_, i) => (
              <RevealItem key={i} className="rounded-3xl border border-border/70 bg-card p-6">
                <Quote className="h-6 w-6 text-brand-primary/60" />
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t(`testimonials.items.${i}.quote`)}"</p>
                <div className="mt-4 flex items-center gap-1 text-brand-accent">
                  {Array.from({ length: 5 }).map((_, sIdx) => (
                    <Star key={sIdx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="mt-2">
                  <div className="text-sm font-bold tracking-tight">{t(`testimonials.items.${i}.name`)}</div>
                  <div className="text-xs text-muted-foreground">{t(`testimonials.items.${i}.role`)}</div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("faq.label")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("faq.title")}
            </h2>
          </div>
        </Reveal>
        <FAQList />
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="grid gap-8 rounded-3xl border border-border/70 bg-card p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-primary">
                <PiggyBank className="h-3.5 w-3.5" /> {t("cta.badge")}
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-[2.4rem] md:leading-[1.1]">
                {t("cta.title")}
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                {t("cta.description")}
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                to="/contact"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]"
              >
                <CtaLabel /> <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {t("cta.delivery")}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("related.text")}{" "}
          <Link to="/our-process" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("related.process")}</Link>,{" "}
          <Link to="/#examples" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("related.portfolio")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/case-studies" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("related.caseStudies")}</Link>.
        </p>

      <SiteFooter />

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">{t("stickyCta.label")}</div>
            <div className="truncate text-xs text-muted-foreground">{t("stickyCta.description")}</div>
          </div>
          <Link
            to="/contact"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-primary-foreground"
          >
            <CtaLabel /> <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COST ESTIMATOR
// ============================================================
const buildOptions = [
  { name: "Starter (1 page)",         price: 797 },
  { name: "Clinic Pro (5–8)",         price: 1997 },
  { name: "Practice Growth (10–15)",  price: 4499 },
  { name: "E-Commerce",               price: 6999 },
  { name: "Authority Brand",          price: 12999 },
  { name: "Enterprise Multi-Site",    price: 18999 },
];
const bundleOptions = [
  { name: "None",             price: 0 },
  { name: "Essential Bundle", price: 399 },
  { name: "Growth Bundle",    price: 799 },
  { name: "Marketing Bundle", price: 1299 },
  { name: "Full-Stack",       price: 1999 },
];

function CostEstimator() {
  const { t } = useTranslation("pricing");
  const [buildIdx, setBuildIdx] = useState(1);
  const [bundleIdx, setBundleIdx] = useState(2);
  const [logo, setLogo] = useState(0);
  const [blogPosts, setBlogPosts] = useState(0);
  const [extraPages, setExtraPages] = useState(0);
  const [portal, setPortal] = useState(false);

  const build = buildOptions[buildIdx];
  const bundle = bundleOptions[bundleIdx];

  const oneTime = useMemo(() => {
    return build.price + logo * 450 + extraPages * 200 + blogPosts * 120 + (portal ? 999 : 0);
  }, [build.price, logo, extraPages, blogPosts, portal]);

  const monthly = bundle.price;
  const yearOne = oneTime + monthly * 12;

  return (
    <div className="grid gap-6 rounded-3xl border border-border/70 bg-card p-6 md:p-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="grid gap-5">
        <div>
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {t("estimator.form.websitePackage")}
          </label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {buildOptions.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setBuildIdx(i)}
                aria-pressed={buildIdx === i}
                className={`min-h-11 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                  buildIdx === i
                    ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                    : "border-border bg-background text-muted-foreground hover:border-brand-primary/40"
                }`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {t("estimator.form.monthlyBundle")}
          </label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
            {bundleOptions.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setBundleIdx(i)}
                aria-pressed={bundleIdx === i}
                className={`min-h-11 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                  bundleIdx === i
                    ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                    : "border-border bg-background text-muted-foreground hover:border-brand-primary/40"
                }`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        <NumberField label={t("estimator.form.logo")}          value={logo}       setValue={setLogo}       max={2} />
        <NumberField label={t("estimator.form.extraPages")} value={extraPages} setValue={setExtraPages} max={20} />
        <NumberField label={t("estimator.form.blogPosts")}           value={blogPosts}  setValue={setBlogPosts}  max={24} />

        <label className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 text-sm">
          <input
            type="checkbox"
            checked={portal}
            onChange={(e) => setPortal(e.target.checked)}
            className="h-5 w-5 accent-brand-primary"
          />
          <span className="flex-1">
            <span className="font-bold">{t("estimator.form.portal")}</span>
            <span className="ml-2 text-muted-foreground">{t("estimator.form.portalAdd")}</span>
          </span>
        </label>
      </div>

      <div className="rounded-2xl border border-brand-primary/25 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 p-6">
        <div className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">{t("estimator.summary.title")}</div>
        <div className="mt-4 space-y-3">
          <Row label={t("estimator.summary.build")}        value={build.name} />
          <Row label={t("estimator.summary.bundle")}       value={bundle.name} />
          <Row label={t("estimator.summary.oneTime")}       value={`$${oneTime.toLocaleString()}`} />
          <Row label={t("estimator.summary.monthly")}      value={`$${monthly.toLocaleString()}`} />
        </div>
        <div className="mt-5 border-t border-border/70 pt-5">
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t("estimator.summary.yearOne")}</div>
          <div className="mt-1 text-4xl font-black tracking-tight text-brand-primary tabular-nums md:text-5xl">
            ${yearOne.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {t("estimator.summary.ongoing", { amount: `$${(monthly * 12).toLocaleString()}` })}
          </div>
        </div>
        <Link
          to="/contact"
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]"
        >
          <CtaLabel /> <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function NumberField({ label, value, setValue, max }: { label: string; value: number; setValue: (n: number) => void; max: number }) {
  const { t } = useTranslation("pricing");
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background p-1.5">
        <button
          type="button"
          onClick={() => setValue(Math.max(0, value - 1))}
          aria-label={t("estimator.aria.decrease")}
          className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted active:scale-95"
        >
          <Minus className="h-5 w-5" />
        </button>
        <span className="min-w-10 text-center text-lg font-black tabular-nums text-foreground">{value}</span>
        <button
          type="button"
          onClick={() => setValue(Math.min(max, value + 1))}
          aria-label={t("estimator.aria.increase")}
          className="grid h-11 w-11 place-items-center rounded-full bg-brand-primary/10 text-brand-primary transition-colors hover:bg-brand-primary/20 active:scale-95"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold tabular-nums text-foreground">{value}</span>
    </div>
  );
}

// ============================================================
// FAQ
// ============================================================
function FAQList() {
  const { t } = useTranslation("pricing");
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: FAQ_COUNT }, (_, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen ? "border-brand-primary/40 bg-card" : "border-border/70 bg-card"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-bold tracking-tight text-foreground sm:text-base">{t(`faq.items.${i}.q`)}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-brand-primary">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{t(`faq.items.${i}.a`)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
