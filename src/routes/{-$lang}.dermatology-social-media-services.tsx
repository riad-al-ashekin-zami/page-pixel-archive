import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks, useCurrentLang } from "@/lib/i18n-routing";
import { formatLocalizedNumber } from "@/lib/locale-format";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CountUp } from "@/components/count-up";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  ArrowRight,
  Plus,
  Minus,
  Building2,
  Instagram,
  Facebook,
  Youtube,
  ShieldCheck,
  Sparkles,
  Camera,
  Video,
  MessageCircle,
  Users,
  Calendar,
  TrendingUp,
  Palette,
  Megaphone,
  HeartHandshake,
  CheckCircle2,
  Star,
  PlayCircle,
  Hash,
  type LucideIcon,
} from "lucide-react";
import heroAsset from "@/assets/dermatology-social-hero.jpg.asset.json";
import { isValidUrlLang } from "@/i18n/languages";
import { robotsContent } from "@/lib/index-allowlist";

const heroUrl = heroAsset.url;

type Feature = { icon: LucideIcon; title: string; desc: string; tint?: string };

const PLATFORMS: Feature[] = [
  { icon: Instagram, title: "Instagram Growth", tint: "#E1306C", desc: "Reels-first strategy — before/after carousels, provider spotlights, and DM-to-booking funnels tuned to the derm patient journey." },
  { icon: Video, title: "TikTok for Derm", tint: "#25F4EE", desc: "Short-form skin-education content that ranks in TikTok search and Google — HIPAA-safe, compliance-reviewed before it ships." },
  { icon: Facebook, title: "Facebook & Meta Ads", tint: "#1877F2", desc: "Local awareness, lookalike patient audiences, and lead-form campaigns priced per booked consult — not per follower." },
  { icon: Youtube, title: "YouTube Shorts & Long-form", tint: "#FF0000", desc: "Procedure explainers, provider Q&As, and evergreen skin-condition videos that rank on Google and YouTube search." },
  { icon: Hash, title: "LinkedIn for Providers", tint: "#0A66C2", desc: "Personal-brand LinkedIn for board-certified derms — thought leadership, referrer network, and recruiter-grade profile." },
  { icon: MessageCircle, title: "DM & Community Management", tint: "#8B5CF6", desc: "Trained response templates, 4-hour SLA, PHI-scrubbed replies, and a booked-consult handoff to your front desk." },
];

const AUDIENCES = [
  { icon: Building2, title: "Solo Dermatologists", desc: "Founder-led social strategy — your voice, your face, your patients. Batch-shot monthly, published weekly." },
  { icon: Users, title: "Multi-location Clinics", desc: "One brand system, per-location content calendars, and staff-generated content pipelines governed from a single dashboard." },
  { icon: Sparkles, title: "Pediatric Dermatology", desc: "Parent-facing content — reassurance-first captions, dayparted to school-run hours, imagery cleared by your clinical team." },
  { icon: ShieldCheck, title: "Mohs & Surgical Dermatology", desc: "Referrer-visible thought leadership on LinkedIn, patient-education Reels, and consent-first before/after content workflows." },
];

const MEDICAL_SERVICES = [
  "Acne Treatment",
  "Eczema Treatment",
  "Psoriasis Treatment",
  "Skin Infection Treatment",
  "Skin Allergy Treatment",
  "Skin Cancer Screening & Treatment",
  "Mole Evaluation & Medically Necessary Removal",
  "Cyst & Lipoma Removal",
  "Wart Removal",
  "Nail Disorder Treatment",
  "Hair Loss Diagnosis & Medical Treatment",
  "Scalp Disorder Treatment",
  "Rosacea Treatment",
  "Hyperpigmentation & Melasma Treatment (medical indication)",
  "Scar Treatment (injury, surgery, disease)",
  "Burn Scar Treatment",
  "Vitiligo Treatment",
  "Skin Biopsy & Diagnostic Procedures",
];

const WORKFLOW = [
  { step: "01", title: "Brand & content audit", desc: "Voice, visual system, competitor scan, hashtag map, and a 90-day content pillars document scoped to your service lines." },
  { step: "02", title: "Monthly content shoot", desc: "One in-clinic shoot day per month — Reels, static, provider intros, patient testimonials (consent-first). Batch = consistency." },
  { step: "03", title: "Publish, engage, iterate", desc: "Native scheduling across IG, TikTok, FB, YouTube, LinkedIn. Same-day DM triage. Weekly analytics against booked-consult KPIs." },
  { step: "04", title: "Amplify with paid", desc: "Top-performing organic posts boosted as Meta / TikTok ads — retargeting website visitors and lookalike patient audiences." },
];

const OUTCOMES = [
  { icon: TrendingUp, k: "312%", v: "Follower growth in 90 days" },
  { icon: Calendar, k: "48+", v: "Consults booked from Instagram / month" },
  { icon: PlayCircle, k: "5.4M", v: "Organic Reel views (12-month avg)" },
  { icon: Star, k: "4.9", v: "Average brand-sentiment score" },
];

const CONTENT_PILLARS = [
  "Provider spotlights & board-certification credibility",
  "Skin condition education (acne, eczema, rosacea, psoriasis)",
  "Before / after transformations with signed consent",
  "In-clinic Reels — treatments, technology, walkthroughs",
  "Patient FAQ and myth-busting short-form video",
  "Seasonal skincare & sun-protection campaigns",
];

export const Route = createFileRoute("/{-$lang}/dermatology-social-media-services")({
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
    const st = getStaticTranslation(lang, "socialMedia");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-social-media-services") },
        { title: st?.meta?.title ?? "Dermatology Social Media Marketing Services | Instagram, TikTok, Meta Ads" },
        { name: "description", content: st?.meta?.description ?? "Social media marketing for dermatology practices — Instagram, TikTok, Facebook, YouTube, and LinkedIn. HIPAA-safe content, monthly in-clinic shoots, and paid social measured on booked consults." },
        { property: "og:title", content: st?.meta?.og?.title ?? "Dermatology Social Media Marketing — Content That Books Consults" },
        { property: "og:description", content: st?.meta?.og?.description ?? "Full-service social media for dermatology practices — content shoots, Reels-first strategy, DM management, and paid social priced on booked consults." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-social-media-services" },
        { property: "og:image", content: heroUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: st?.meta?.twitter?.title ?? "Dermatology Social Media Marketing Services" },
        { name: "twitter:description", content: st?.meta?.twitter?.description ?? "Social content and paid campaigns scoped to booked consults for dermatology practices." },
      ],
      links: [
        { rel: "canonical", href: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-social-media-services") },
        ...buildHreflangLinks("/dermatology-social-media-services", params.lang),
        { rel: "preload", as: "image", href: heroUrl, fetchpriority: "high" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: st?.jsonLd?.service?.name ?? "Social Media Marketing for Dermatology Practices",
            provider: { "@type": "Organization", name: st?.jsonLd?.service?.provider ?? "DermatologyWebsiteDesign.com" },
            areaServed: "United States",
            description: st?.jsonLd?.service?.description ?? "Full-service social media management, content production, and paid social for dermatology practices measured on booked consults.",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: (st?.faq?.items ?? []).map((f: any) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: st?.jsonLd?.breadcrumbs?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
              { "@type": "ListItem", position: 2, name: st?.jsonLd?.breadcrumbs?.services ?? "Services", item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-website-design") },
              { "@type": "ListItem", position: 3, name: st?.jsonLd?.breadcrumbs?.social ?? "Social Media", item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-social-media-services") },
            ],
          }),
        },
      ],
    };
  },
  component: SocialPage,
});

function useFooterVisible() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
    io.observe(footer);
    return () => io.disconnect();
  }, []);
  return hidden;
}

function SocialPage() {
  const { t } = useTranslation("socialMedia");
  const lang = useCurrentLang();
  const [openFaq, setOpenFaq] = useState(0);
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
              "radial-gradient(1000px 500px at 90% -10%, color-mix(in oklch, var(--brand-accent), transparent 78%), transparent 60%), radial-gradient(800px 450px at -5% 105%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 60%), linear-gradient(180deg, var(--background), color-mix(in oklch, var(--brand-primary), transparent 96%))",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.3]"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklch, var(--brand-primary), transparent 92%) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--brand-primary), transparent 92%) 1px, transparent 1px)",
              backgroundSize: "56px 56px, 56px 56px",
              maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
            }}
          />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-8">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary backdrop-blur">
                  <Megaphone className="h-3.5 w-3.5" /> {t("hero.badge")}
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1
                  id="hero-h"
                  className="mt-6 max-w-3xl text-balance font-bold leading-[1.05] tracking-[-0.025em] text-foreground"
                  style={{ fontSize: "clamp(1.875rem, 5.5vw, 4rem)" }}
                >
                  {t("hero.heading").split("and books consults.")[0]}{" "}
                  <span className="font-bold text-brand-primary">and books consults.</span>
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
                    {t("hero.cta.audit")} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#platforms"
                    className={`${ctaBtn} border border-border/70 bg-background/70 text-foreground backdrop-blur hover:border-brand-primary/40 hover:text-brand-primary`}
                  >
                    {t("hero.cta.platforms")}
                  </a>
                </div>
              </Reveal>

              <RevealStagger as="ul" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" stagger={0.06}>
                {OUTCOMES.map((o, i) => (
                  <RevealItem
                    as="li"
                    key={i}
                    className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg sm:p-5"
                  >
                    <div className="text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                      {/^\d+[%+]?$/.test(t(`hero.stats.${i}.label`)) ? <CountUp value={t(`hero.stats.${i}.label`)} /> : t(`hero.stats.${i}.label`)}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[11px] sm:tracking-[0.12em]">
                      {t(`hero.stats.${i}.value`)}
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>

              {/* Trust / social proof */}
              <Reveal delay={0.25}>
                <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-md md:flex-row md:items-center md:justify-between">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="flex shrink-0 -space-x-2">
                      {[
                        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=faces",
                        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=faces",
                        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=120&h=120&fit=crop&crop=faces",
                        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&h=120&fit=crop&crop=faces",
                      ].map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={t("hero.trust.imgAlt")}
                          loading="lazy"
                          className="h-9 w-9 rounded-full border-2 border-background object-cover shadow-sm"
                        />
                      ))}
                      <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-background bg-brand-primary/10 text-[10px] font-bold text-brand-primary">
                        +50
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1 text-brand-primary">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                        <span className="ml-1.5 text-xs font-semibold text-foreground">{t("hero.trust.rating")}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{t("hero.trust.subtext")}</p>
                    </div>
                  </div>
                  <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-primary">
                    <ShieldCheck className="h-3.5 w-3.5" /> {t("hero.trust.badge")}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Social feed mock */}
            <Reveal delay={0.2}>
              <div className="relative mx-auto w-full max-w-md lg:sticky lg:top-24 lg:max-w-none">
                <div
                  className="rounded-[24px] border border-border/70 bg-card/80 p-4 backdrop-blur-xl sm:rounded-[28px] sm:p-5 xl:p-6"
                  style={{ boxShadow: "0 30px 80px -30px color-mix(in oklch, var(--brand-primary), transparent 55%)" }}
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-brand-primary-foreground">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-foreground">{t("socialMock.handle")}</div>
                        <div className="truncate text-[11px] text-muted-foreground">{t("socialMock.status")}</div>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-primary/10 px-2.5 py-1 text-[11px] font-semibold text-brand-primary">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
                      </span>
                      {t("socialMock.live")}
                    </span>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl border border-border/60">
                    <img
                      src={heroUrl}
                      alt={t("socialMock.imgAlt")}
                      width={1024}
                      height={1024}
                      decoding="async"
                      fetchPriority="high"
                      className="aspect-[4/5] w-full object-cover sm:aspect-square"
                    />
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      { l: t("socialMock.metrics.reach"), v: "412k" },
                      { l: t("socialMock.metrics.dms"), v: "1.8k" },
                      { l: t("socialMock.metrics.booked"), v: "48" },
                    ].map((m) => (
                      <div key={m.l} className="min-w-0 rounded-xl border border-border/60 bg-background/70 px-2 py-2.5 text-center sm:px-3">
                        <div className="truncate text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{m.l}</div>
                        <div className="mt-0.5 truncate text-sm font-bold text-brand-primary">{m.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    {[
                      { label: t("socialMock.reels.0.label"), value: t("socialMock.reels.0.value"), w: "88%" },
                      { label: t("socialMock.reels.1.label"), value: t("socialMock.reels.1.value"), w: "62%" },
                      { label: t("socialMock.reels.2.label"), value: t("socialMock.reels.2.value"), w: "34%" },
                    ].map((r) => (
                      <div key={r.label} className="rounded-xl border border-border/60 bg-background/70 px-3 py-2.5">
                        <div className="flex min-w-0 items-center justify-between gap-2 text-xs">
                          <span className="min-w-0 truncate text-muted-foreground">{r.label}</span>
                          <span className="shrink-0 font-semibold text-brand-primary">{r.value}</span>
                        </div>
                        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-brand-primary/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-accent" style={{ width: r.w }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
                        <HeartHandshake className="h-4 w-4" /> {t("socialMock.outcome")}
                      </div>
                      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{t("socialMock.timeframe")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PLATFORMS */}
        <section id="platforms" aria-labelledby="plat-h" className="relative py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.platforms.badge")}</span>
                <h2 id="plat-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  {t("sections.platforms.heading")}
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.platforms.description")}</p>
              </div>
            </Reveal>

            <RevealStagger as="ul" stagger={0.05} className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {PLATFORMS.map((p, i) => (
                <RevealItem
                  as="li"
                  key={i}
                  className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_55%)]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                    style={{ background: p.tint ?? "var(--brand-primary)" }}
                  />
                  <div
                    className="grid h-11 w-11 place-items-center rounded-2xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${p.tint ?? "var(--brand-primary)"} 14%, transparent)`,
                      color: p.tint ?? "var(--brand-primary)",
                    }}
                  >
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{t(`sections.platforms.items.${i}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`sections.platforms.items.${i}.desc`)}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* OUTCOMES */}
        <section aria-labelledby="outcomes-h" className="relative py-12 sm:py-16">
          <h2 id="outcomes-h" className="sr-only">
            {t("sections.outcomes.heading")}
          </h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm sm:p-10"
              style={{ boxShadow: "0 30px 80px -40px color-mix(in oklch, var(--brand-primary), transparent 65%)" }}
            >
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
                {OUTCOMES.map((o, i) => (
                  <div key={i} className="flex flex-col items-start gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                      <o.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {/^\d+[%+]?$/.test(t(`sections.outcomes.items.${i}.k`)) ? (
                          <CountUp value={t(`sections.outcomes.items.${i}.k`)} />
                        ) : (
                          t(`sections.outcomes.items.${i}.k`)
                        )}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">{t(`sections.outcomes.items.${i}.v`)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-border/60 pt-6 text-sm italic text-muted-foreground">
                {t("sections.outcomes.quote")}
                <span className="mt-2 block text-xs font-semibold not-italic uppercase tracking-[0.15em] text-foreground">
                  {t("sections.outcomes.author")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT PILLARS */}
        <section aria-labelledby="pillars-h" className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
              <Reveal>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.pillars.badge")}</span>
                  <h2 id="pillars-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    {t("sections.pillars.heading")}
                  </h2>
                  <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.pillars.description")}</p>
                </div>
              </Reveal>
              <RevealStagger as="ul" stagger={0.05} className="grid gap-3 sm:grid-cols-2">
                {CONTENT_PILLARS.map((_, i) => (
                  <RevealItem
                    as="li"
                    key={i}
                    className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card/50 p-4 transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:bg-card/80 hover:shadow-lg"
                  >
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent text-xs font-bold text-brand-primary-foreground shadow-md shadow-brand-primary/25 transition-transform group-hover:scale-110 group-hover:-rotate-3">
                      {formatLocalizedNumber(i + 1, lang, 2)}
                    </span>
                    <span className="text-sm leading-relaxed text-foreground sm:text-base">{t(`sections.pillars.items.${i}`)}</span>
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
                <h2 id="aud-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("sections.audiences.heading")}
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.audiences.description")}</p>
              </div>
            </Reveal>

            <RevealStagger as="ul" stagger={0.05} className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
              {AUDIENCES.map((a, i) => (
                <RevealItem
                  as="li"
                  key={i}
                  className="group h-full rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_55%)]"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{t(`sections.audiences.items.${i}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`sections.audiences.items.${i}.desc`)}</p>
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
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.medical_services.badge")}</span>
                <h2 id="svc-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("sections.medical_services.heading")}
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.medical_services.description")}</p>
              </div>
            </Reveal>

            <RevealStagger as="ul" stagger={0.02} className="mt-10 grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {MEDICAL_SERVICES.map((_, i) => (
                <RevealItem
                  as="li"
                  key={i}
                  className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/40 px-3.5 py-2.5 text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:bg-card/70"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                  {t(`sections.medical_services.items.${i}`)}
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* WORKFLOW */}
        <section
          aria-labelledby="wf-h"
          className="relative py-16 sm:py-24 lg:py-28"
          style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%), transparent)" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.workflow.badge")}</span>
                <h2 id="wf-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  {t("sections.workflow.heading")}
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t("sections.workflow.description")}</p>
              </div>
            </Reveal>

            <div className="relative mt-10 sm:mt-12">
              <div aria-hidden className="pointer-events-none absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-brand-primary/40 via-brand-primary/20 to-transparent sm:hidden" />
              <div aria-hidden className="pointer-events-none absolute left-6 right-6 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent lg:block" />

              <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {WORKFLOW.map((_, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <li className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 pl-14 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg sm:pl-6">
                      <span aria-hidden className="absolute left-4 top-6 grid h-6 w-6 place-items-center rounded-full border border-brand-primary/40 bg-background text-[10px] font-bold text-brand-primary sm:hidden">
                        {t(`sections.workflow.items.${i}.step`)}
                      </span>
                      <span className="absolute right-4 top-4 hidden text-5xl font-black leading-none text-brand-primary/10 sm:block">{t(`sections.workflow.items.${i}.step`)}</span>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary">{t(`sections.workflow.items.${i}.phase`)}</div>
                      <h3 className="mt-3 text-lg font-semibold text-foreground">{t(`sections.workflow.items.${i}.title`)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`sections.workflow.items.${i}.desc`)}</p>
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
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.why_us.badge")}</span>
                <h2 id="why-h" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("sections.why_us.heading")}
                </h2>
              </div>
            </Reveal>

            <RevealStagger as="ul" stagger={0.05} className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {[
                { icon: ShieldCheck, key: "0" },
                { icon: Camera, key: "1" },
                { icon: Palette, key: "2" },
                { icon: Video, key: "3" },
                { icon: MessageCircle, key: "4" },
                { icon: TrendingUp, key: "5" },
              ].map((w) => (
                <RevealItem
                  as="li"
                  key={w.key}
                  className="group rounded-3xl border border-border/60 bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-lg"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{t(`sections.why_us.items.${w.key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`sections.why_us.items.${w.key}.desc`)}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion
          faqs={t("faq.items", { returnObjects: true }) as any}
          heading={t("faq.heading")}
          idPrefix="social-faq"
          className="relative py-16 sm:py-24 lg:py-28"
        />

        {/* CTA */}
        <section aria-labelledby="cta-h" className="relative overflow-hidden py-16 sm:py-24">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div
              className="relative rounded-[28px] p-[1.5px] sm:rounded-[32px]"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 20%), color-mix(in oklch, var(--brand-accent), transparent 30%), color-mix(in oklch, var(--brand-primary), transparent 60%))",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] opacity-40 blur-3xl animate-pulse"
                style={{
                  background:
                    "radial-gradient(400px 200px at 20% 20%, color-mix(in oklch, var(--brand-primary), transparent 70%), transparent 70%), radial-gradient(400px 200px at 80% 80%, color-mix(in oklch, var(--brand-accent), transparent 75%), transparent 70%)",
                }}
              />
              <div
                className="relative overflow-hidden rounded-[27px] p-6 sm:rounded-[31px] sm:p-14"
                style={{
                  background:
                    "radial-gradient(600px 300px at 10% 0%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(500px 250px at 100% 100%, color-mix(in oklch, var(--brand-accent), transparent 80%), transparent 60%), var(--card)",
                }}
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("cta.badge")}</span>
                    <h2 id="cta-h" className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
                      {t("cta.heading")}
                    </h2>
                    <p className="mt-4 text-sm text-muted-foreground sm:text-base">{t("cta.description")}</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <Link
                      to="/contact"
                      className={`${ctaBtn} bg-brand-primary text-brand-primary-foreground shadow-lg shadow-brand-primary/25 hover:-translate-y-0.5`}
                    >
                      {t("cta.primary")} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/contact"
                      className={`${ctaBtn} border border-border/70 bg-background/70 text-foreground backdrop-blur hover:border-brand-primary/40 hover:text-brand-primary`}
                    >
                      {t("cta.secondary")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-all duration-300 md:hidden ${stickyHidden ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
        aria-hidden={stickyHidden}
      >
        <div className="pointer-events-auto mx-3 mb-3 rounded-full border border-border/70 bg-background/95 py-3 pl-5 pr-2 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-sm font-semibold text-foreground">{t("sticky_footer.label")}</span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              {t("sticky_footer.button")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-20 md:hidden" aria-hidden />

      <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
        {t("internal_links.prefix")}{" "}
        <Link to="/dermatology-reputation-management" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">
          {t("internal_links.reputation")}
        </Link>
        ,{" "}
        <Link to="/dermatology-email-marketing" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">
          {t("internal_links.email")}
        </Link>
        , {t("common.or", { ns: "translation" })}{" "}
        <Link to="/dermatology-before-after-gallery" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">
          {t("internal_links.gallery")}
        </Link>
        .
      </p>

      <SiteFooter />
    </div>
  );
}
