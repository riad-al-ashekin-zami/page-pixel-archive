import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { buildHreflangLinks } from "@/lib/i18n-routing";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import {
  ArrowRight, CheckCircle2, ShieldCheck, Camera, Images, Sparkles,
  Stethoscope, Building2, Baby, Scissors, Plus, Minus, Filter, Search,
  Star, Quote, Lock, Layers, MoveHorizontal, Aperture, Ruler, Palette,
  Eye, Zap, Award, HeartPulse, BadgeCheck, Grid3x3,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { robotsContent } from "@/lib/index-allowlist";

/* ---------- Data ---------- */

const audiences = [
  { icon: Stethoscope, label: "Solo Dermatologists", desc: "Showcase your signature results with a gallery that converts consultations to bookings." },
  { icon: Building2, label: "Multi-location Clinics", desc: "Per-location, per-provider filtering so every clinic gets credit for its own wins." },
  { icon: Baby, label: "Pediatric Dermatology", desc: "Parent-safe consent flows, blurred identifiers, and calm, reassuring visual pacing." },
  { icon: Scissors, label: "Mohs & Surgical Dermatology", desc: "Surgical outcome galleries with staged healing timelines and referral-ready case notes." },
];

const medicalServices = [
  "Acne Treatment", "Eczema Treatment", "Psoriasis Treatment", "Skin Infection Treatment",
  "Skin Allergy Treatment", "Skin Cancer Screening", "Mole Evaluation & Removal",
  "Cyst & Lipoma Removal", "Wart Removal", "Nail Disorder Treatment", "Hair Loss Treatment",
  "Scalp Disorder Treatment", "Rosacea Treatment", "Hyperpigmentation & Melasma",
  "Scar Treatment", "Burn Scar Treatment", "Vitiligo Treatment", "Skin Biopsy & Diagnostics",
];

const pillars = [
  { icon: MoveHorizontal, title: "Interactive Slider", desc: "Drag-to-reveal before/after comparisons with buttery 60fps interaction on every device." },
  { icon: Filter, title: "Smart Filtering", desc: "Filter by concern, treatment, provider, skin type, and Fitzpatrick scale — instant results." },
  { icon: Aperture, title: "Studio-Grade Imagery", desc: "Consistent lighting, distance, and angle guides so every case looks like a real transformation." },
  { icon: Lock, title: "HIPAA-Aware Consent", desc: "Baked-in patient consent capture, revocation flow, and audit trail on every uploaded case." },
  { icon: Ruler, title: "Timeline Milestones", desc: "Week 2 · Month 1 · Month 3 · Month 6 comparison views for treatments that unfold over time." },
  { icon: BadgeCheck, title: "Provider Attribution", desc: "Every case linked to the treating physician — trust, credit, and referral loops built in." },
];

const cases = [
  { concern: "Acne", months: "3 months", tone: "warm", severity: "Moderate", provider: "Dr. Vasquez", desc: "Combination retinoid + LED protocol, PIH resolution documented at 12 weeks." },
  { concern: "Melasma", months: "4 months", tone: "cool", severity: "Deep dermal", provider: "Dr. Okafor", desc: "Compounded tri-lightening cream + strict SPF discipline. Fitzpatrick IV." },
  { concern: "Rosacea", months: "6 months", tone: "warm", severity: "Papulopustular", provider: "Dr. Caldwell", desc: "Vascular laser + oral therapy — erythema reduced across cheeks and nose." },
  { concern: "Scar Revision", months: "5 months", tone: "neutral", severity: "Atrophic acne scarring", provider: "Dr. Vasquez", desc: "Fractional resurfacing series (x4). Texture rebuild without pigment loss." },
  { concern: "Hair Loss", months: "9 months", tone: "warm", severity: "Androgenetic (Ludwig II)", provider: "Dr. Okafor", desc: "PRP + medical therapy — measured density recovery in temporal and vertex zones." },
  { concern: "Vitiligo", months: "12 months", tone: "cool", severity: "Segmental facial", provider: "Dr. Caldwell", desc: "Narrowband UVB + topical calcineurin inhibitor. Repigmentation progressing." },
];

const trustStats = [
  { value: "2500+", label: "Documented cases in production galleries" },
  { value: "100%", label: "HIPAA-aware consent capture on every upload" },
  { value: "60fps", label: "Slider interaction on mobile, tablet & desktop" },
  { value: "95+", label: "Average Lighthouse score across gallery pages" },
];

const flow = [
  { step: "01", title: "Case Intake", icon: Camera, desc: "Structured photo protocol — angle, distance, lighting, and neutral background captured at every visit." },
  { step: "02", title: "Consent & Tagging", icon: ShieldCheck, desc: "Patient e-signs a scoped consent (web, print, social — each opt-in separately). Cases tagged by concern, provider, severity." },
  { step: "03", title: "Curate & Publish", icon: Layers, desc: "Your team publishes to the gallery in two clicks. Slider, filters, timeline view — all built in." },
  { step: "04", title: "Convert to Consult", icon: ArrowRight, desc: "Every case card has a one-tap 'Book this treatment' CTA that opens the right service page + intake." },
];

const testimonials = [
  { name: "Dr. Ethan Caldwell, MD", role: "LA Dermatology", quote: "Our before/after gallery is now the #2 traffic page after the homepage. Consult bookings from that page tripled in 90 days.", stars: 5 },
  { name: "Dr. Anika Vasquez, MD", role: "CM Surgical", quote: "The consent workflow alone was worth the rebuild. We finally publish surgical outcomes without a compliance headache.", stars: 5 },
  { name: "Dr. Ibrahim Okafor, MD", role: "RS Institute · 6 loc.", quote: "Filter by provider changed everything. Every physician has a portfolio they're proud to send to referrals.", stars: 5 },
];

const FAQS = [
  { q: "How do you handle HIPAA and patient consent?", a: "Every case requires a scoped, timestamped e-consent capturing separate permissions for web, print, and social use — with a revocation flow that removes the case within 24 hours. All consent records are stored with an audit trail." },
  { q: "Can I filter cases by provider, treatment, and skin type?", a: "Yes. Every case is tagged with concern, treatment protocol, Fitzpatrick skin type, severity, provider, and elapsed time. Visitors filter live with URL-shareable results — great for referral emails." },
  { q: "What image quality and consistency do you require?", a: "We provide a photo protocol (angle, distance, neutral background, controlled lighting) plus an optional in-clinic training. Our system flags inconsistent uploads before they go live." },
  { q: "Is the slider mobile-friendly?", a: "Yes. Touch-drag, pinch-scale, and swipe-between-cases are all optimized for mobile at 60fps. Slider handle meets 44px touch-target guidelines and reduced-motion preferences are respected." },
  { q: "Can we show surgical outcomes (Mohs, excisions)?", a: "Yes — with staged healing timelines (Week 2 / Month 1 / Month 3 / Month 6) and optional content-warning gating. Referral-friendly case notes attach to every surgical case." },
  { q: "Will the gallery slow down my site?", a: "No. Images are lazy-loaded, served in AVIF/WebP from CDN, and progressive-blurred. Galleries typically maintain 95+ Lighthouse Performance." },
];

/* ---------- Route ---------- */

export const Route = createFileRoute("/{-$lang}/dermatology-before-after-gallery")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params }) => {
    const lang = (params as any).lang || "en";
    const st = getStaticTranslation(lang, "beforeAfter");
    const faqs: any[] = Array.isArray(st?.faq?.items) ? st.faq.items : [];
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-before-after-gallery") },
        { title: st?.meta?.title ?? "Dermatology Before & After Gallery — Premium Case Showcase" },
        { name: "description", content: st?.meta?.description },
        { property: "og:title", content: st?.meta?.ogTitle },
        { property: "og:description", content: st?.meta?.ogDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-before-after-gallery" },
        { property: "og:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/dermatology-before-after-gallery" }, ...buildHreflangLinks("/dermatology-before-after-gallery", params.lang)],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", serviceType: st?.meta?.jsonLdServiceType, provider: { "@type": "Organization", name: st?.meta?.jsonLdName }, areaServed: "United States" }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f: any) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: BeforeAfterGalleryPage,
});

/* ---------- Case visual (pure CSS, no external assets) ---------- */

function SkinPanel({ variant, tone }: { variant: "before" | "after"; tone: "warm" | "cool" | "neutral" }) {
  const palettes: Record<string, { before: string; after: string }> = {
    warm: {
      before: "radial-gradient(120% 90% at 32% 22%, #c99180 0%, #a86e57 45%, #7a4736 100%)",
      after: "radial-gradient(120% 90% at 32% 22%, #f7dcc7 0%, #e6b89b 55%, #c58f70 100%)",
    },
    cool: {
      before: "radial-gradient(120% 90% at 32% 22%, #b89a86 0%, #85705f 55%, #574538 100%)",
      after: "radial-gradient(120% 90% at 32% 22%, #f1dcc7 0%, #d7b498 55%, #b28e70 100%)",
    },
    neutral: {
      before: "radial-gradient(120% 90% at 32% 22%, #b48870 0%, #8b6350 55%, #5f412f 100%)",
      after: "radial-gradient(120% 90% at 32% 22%, #f2d6bd 0%, #dcb495 55%, #b78d6f 100%)",
    },
  };
  const bg = palettes[tone][variant];
  const specks = variant === "before" ? 22 : 4;
  return (
    <div className="relative h-full w-full" style={{ background: bg }} aria-hidden>
      {/* soft cheek highlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "after"
              ? "radial-gradient(45% 30% at 65% 45%, rgba(255,240,225,0.45), transparent 70%), radial-gradient(30% 22% at 30% 60%, rgba(255,235,220,0.35), transparent 70%)"
              : "radial-gradient(40% 30% at 60% 35%, rgba(180,80,60,0.28), transparent 70%), radial-gradient(35% 25% at 30% 65%, rgba(150,60,45,0.22), transparent 70%)",
        }}
      />
      {/* fine skin grain */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.28) 0.6px, transparent 1px), radial-gradient(rgba(0,0,0,0.18) 0.6px, transparent 1px)",
          backgroundSize: "3px 3px, 5px 5px",
          backgroundPosition: "0 0, 1px 2px",
        }}
      />
      {/* pigmentation / redness spots */}
      {Array.from({ length: specks }).map((_, i) => {
        const size = 5 + (i % 5) * 3;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${((i * 41) % 88) + 4}%`,
              left: `${((i * 67) % 86) + 6}%`,
              width: `${size}px`,
              height: `${size}px`,
              background:
                variant === "before"
                  ? i % 3 === 0
                    ? "rgba(170,45,45,0.55)"
                    : "rgba(120,70,50,0.5)"
                  : "rgba(200,150,120,0.18)",
              filter: `blur(${variant === "before" ? 1.6 : 2.2}px)`,
            }}
          />
        );
      })}
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.28) 100%)" }} />
    </div>
  );
}

function BeforeAfterSlider({ tone = "warm", label, autoDemo = false }: { tone?: "warm" | "cool" | "neutral"; label?: string; autoDemo?: boolean }) {
  const { t } = useTranslation("beforeAfter");
  const [pos, setPos] = useState(autoDemo ? 30 : 50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const userTouched = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, pct)));
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      userTouched.current = true;
      setFromClientX(e.clientX);
    };
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  // Auto-demo sweep: 30 → 75 → 50 on load so user knows it's draggable
  useEffect(() => {
    if (!autoDemo) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const from = 30, mid = 75, end = 50;
    const dur = 2400;
    const tick = (now: number) => {
      if (userTouched.current) return;
      const t = Math.min(1, (now - start) / dur);
      const eased = t < 0.5
        ? from + (mid - from) * (t / 0.5)
        : mid + (end - mid) * ((t - 0.5) / 0.5);
      setPos(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    const delay = setTimeout(() => { raf = requestAnimationFrame(tick); }, 600);
    return () => { clearTimeout(delay); cancelAnimationFrame(raf); };
  }, [autoDemo]);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/9] w-full touch-none select-none overflow-hidden rounded-2xl border border-border bg-muted"
      onPointerDown={(e) => {
        dragging.current = true;
        userTouched.current = true;
        setFromClientX(e.clientX);
      }}
      role="img"
      aria-label={label ?? t("gallery.card.ariaLabel")}
    >
      {/* AFTER (base) */}
      <div className="absolute inset-0">
        <SkinPanel variant="after" tone={tone} />
      </div>
      {/* BEFORE (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SkinPanel variant="before" tone={tone} />
      </div>
      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">{t("gallery.card.beforeLabel")}</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground">{t("gallery.card.afterLabel")}</span>
      {/* Handle */}
      <div
        className="absolute inset-y-0"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-[2px] bg-white/90 shadow-[0_0_18px_rgba(255,255,255,0.55)]" />
        <button
          type="button"
          aria-label={t("gallery.card.dragAriaLabel")}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-white text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          onPointerDown={(e) => {
            e.stopPropagation();
            dragging.current = true;
          }}
        >
          <MoveHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

function BeforeAfterGalleryPage() {
  const { t } = useTranslation("beforeAfter");
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [activeFilterIndex, setActiveFilterIndex] = useState<number>(0);
  
  const filters = (t("gallery.filters", { returnObjects: true }) as string[]);
  const translatedCases = (t("gallery.cases", { returnObjects: true }) as any[]).map((tc, i) => ({
    ...tc,
    tone: cases[i].tone,
  }));
  
  const activeFilterStr = filters[activeFilterIndex];
  const filtered = activeFilterIndex === 0 ? translatedCases : translatedCases.filter((c) => c.concern === activeFilterStr);

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
              "radial-gradient(1000px 500px at 88% -10%, color-mix(in oklch, var(--brand-primary), transparent 75%), transparent 60%), radial-gradient(800px 500px at 5% 30%, color-mix(in oklch, var(--brand-accent), transparent 80%), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 md:pt-20 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
                <Images className="h-3.5 w-3.5" /> {t("hero.badge")}
              </span>
              <h1 className="mt-5 text-[2rem] font-black leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
                {t("hero.headingMain")}{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(120deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 55%))" }}
                >
                  {t("hero.headingAccent")}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {t("hero.description")}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]"
                >
                  {t("hero.ctaBuild")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
                >
                  {t("hero.ctaAudit")}
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
                {(t("hero.features", { returnObjects: true }) as string[]).map((feature) => (
                  <span key={feature} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary" /> {feature}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Hero visual: live slider */}
            <Reveal delay={0.1}>
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-brand-primary/10 via-transparent to-brand-accent/10 blur-2xl" />
                <BeforeAfterSlider tone="warm" autoDemo label={t("hero.imageAlt")} />
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-brand-primary" /> {t("hero.imageCaption")}</span>
                  <span>{t("hero.imageStats")}</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* stat strip */}
          <RevealStagger className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:mt-16 md:grid-cols-4">
            {trustStats.map((s, i) => (
              <RevealItem key={i} className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
                <div className="text-2xl font-black tracking-tight text-foreground md:text-3xl">
                  <CountUp value={t(`stats.${i}.value`)} />
                </div>
                <div className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">{t(`stats.${i}.label`)}</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-t border-border/60 bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">{t("pillars.heading")}</h2>
            <p className="mt-3 text-muted-foreground">{t("pillars.subheading")}</p>
          </Reveal>
          <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <RevealItem key={i} className="group rounded-2xl border border-border bg-card p-6 transition-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-lg">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{t(`pillars.items.${i}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`pillars.items.${i}.desc`)}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">{t("gallery.heading")}</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">{t("gallery.subheading")}</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
              <Filter className="h-4 w-4 text-brand-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("gallery.filterLabel")}</span>
            </div>
          </Reveal>

          <div className="mt-6 flex flex-wrap gap-2">
            {filters.map((f, i) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilterIndex(i)}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-all ${
                  activeFilterIndex === i
                    ? "border-brand-primary bg-brand-primary text-brand-primary-foreground shadow-md"
                    : "border-border bg-card text-foreground hover:border-brand-primary/40 hover:text-brand-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((c, i) => (
                <motion.article
                  layout
                  key={`${c.concern}-${i}`}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-xl"
                >
                  <BeforeAfterSlider tone={c.tone as "warm" | "cool" | "neutral"} label={`${c.concern} ${t("gallery.card.beforeLabel").toLowerCase()} and ${t("gallery.card.afterLabel").toLowerCase()} — ${c.months}`} />
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold">{c.concern}</h3>
                      <span className="rounded-full bg-brand-primary/10 px-2 py-0.5 text-[11px] font-semibold text-brand-primary">{c.months}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><HeartPulse className="h-3.5 w-3.5" /> {c.severity}</span>
                      <span className="inline-flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5" /> {c.provider}</span>
                    </div>
                    <Link
                      to="/contact"
                      className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/5 px-4 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-primary-foreground"
                    >
                      {t("gallery.card.bookCTA")} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE SHOWCASE */}
      <TimelineShowcase />

      {/* TRUST BAR */}
      <TrustBar />


      {/* AUDIENCES */}
      <section className="border-t border-border/60 bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">{t("audiences.heading")}</h2>
            <p className="mt-3 text-muted-foreground">{t("audiences.subheading")}</p>
          </Reveal>
          <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <RevealItem key={i} className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-lg">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold">{t(`audiences.items.${i}.label`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`audiences.items.${i}.desc`)}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* MEDICAL SERVICES COVERED */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">{t("medicalServices.heading")}</h2>
            <p className="mt-3 text-muted-foreground">{t("medicalServices.subheading")}</p>
          </Reveal>
          <RevealStagger className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {(t("medicalServices.list", { returnObjects: true }) as string[]).map((s) => (
              <RevealItem key={s} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />
                <span className="text-sm font-medium text-foreground">{s}</span>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* FLOW */}
      <section className="border-t border-border/60 bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">{t("flow.heading")}</h2>
            <p className="mt-3 text-muted-foreground">{t("flow.subheading")}</p>
          </Reveal>
          <RevealStagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {flow.map((f, i) => (
              <RevealItem key={i} className="relative rounded-2xl border border-border bg-card p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">{t(`flow.steps.${i}.num`)}</span>
                <div className="mt-3 grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold">{t(`flow.steps.${i}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`flow.steps.${i}.desc`)}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">{t("testimonials.heading")}</h2>
            <p className="mt-3 text-muted-foreground">{t("testimonials.subheading")}</p>
          </Reveal>
          <RevealStagger className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((tItem, i) => (
              <RevealItem key={i} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-1 text-brand-primary">
                  {Array.from({ length: tItem.stars }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}
                </div>
                <Quote className="mt-3 h-5 w-5 text-brand-primary/60" />
                <p className="mt-2 text-sm leading-relaxed text-foreground">{t(`testimonials.items.${i}.quote`)}</p>
                <div className="mt-4 border-t border-border pt-3">
                  <div className="text-sm font-bold">{t(`testimonials.items.${i}.name`)}</div>
                  <div className="text-xs text-muted-foreground">{t(`testimonials.items.${i}.role`)}</div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">{t("faq.heading")}</h2>
            <p className="mt-3 text-muted-foreground">{t("faq.subheading")}</p>
          </Reveal>
          <div className="mt-10 space-y-3">
            {(t("faq.items", { returnObjects: true }) as any[]).map((f, i) => {
              const open = openFAQ === i;
              return (
                <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <button
                    type="button"
                    onClick={() => setOpenFAQ(open ? null : i)}
                    className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-sm font-bold sm:text-base">{f.q}</span>
                    {open ? <Minus className="h-4 w-4 shrink-0 text-brand-primary" /> : <Plus className="h-4 w-4 shrink-0 text-brand-primary" />}
                  </button>
                  {open && (
                    <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            className="relative overflow-hidden rounded-3xl border border-brand-primary/20 p-8 md:p-14"
            style={{ background: "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 88%), color-mix(in oklch, var(--brand-accent), transparent 88%))" }}
          >
            <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-black leading-[1.1] tracking-tight md:text-4xl lg:text-[2.75rem] lg:whitespace-nowrap">{t("cta.heading")}</h2>
                <p className="mt-3 text-muted-foreground">{t("cta.subheading")}</p>
              </div>
              <div className="flex flex-nowrap items-center gap-3 shrink-0">
                <Link to="/contact" className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-brand-primary px-5 text-sm font-semibold text-brand-primary-foreground shadow-lg transition-transform hover:scale-[1.02]">
                  {t("cta.btnQuote")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary">
                  {t("cta.btnContact")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footerLinks.prefix")}{" "}
          <Link to="/dermatology-website-design" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.link1")}</Link>,{" "}
          <Link to="/dermatology-social-media-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.link2")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/case-studies" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.link3")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}

/* ---------- Timeline Showcase (multi-stage single-case view) ---------- */

const TIMELINE_STAGES = [
  { key: "wk0", label: "Week 0", short: "Baseline", pos: 8 },
  { key: "wk4", label: "Week 4", short: "Early response", pos: 36 },
  { key: "wk12", label: "Week 12", short: "Clear turning point", pos: 64 },
  { key: "wk24", label: "Week 24", short: "Sustained result", pos: 92 },
];

function TimelineShowcase() {
  const { t } = useTranslation("beforeAfter");
  const [stage, setStage] = useState(0);
  
  const translatedStages = TIMELINE_STAGES.map((ts, i) => ({
    ...ts,
    label: t(`timeline.stages.${i}.label`),
    short: t(`timeline.stages.${i}.short`),
  }));
  
  const active = translatedStages[stage];

  return (
    <section className="border-t border-border/60 bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
            <Ruler className="h-3.5 w-3.5" /> {t("timeline.badge")}
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">{t("timeline.heading")}</h2>
          <p className="mt-3 text-muted-foreground">{t("timeline.subheading")}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-brand-primary/10 via-transparent to-brand-accent/10 blur-2xl" />
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted">
                <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - active.pos}% 0 0)` }}>
                  <SkinPanel variant="before" tone="warm" />
                </div>
                <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${active.pos}%)` }}>
                  <SkinPanel variant="after" tone="warm" />
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">{t("gallery.card.beforeLabel")}</span>
                <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground">{active.label}</span>
                <div className="absolute inset-y-0 transition-[left] duration-500 ease-out" style={{ left: `${active.pos}%`, transform: "translateX(-50%)" }}>
                  <div className="h-full w-[2px] bg-white/90 shadow-[0_0_18px_rgba(255,255,255,0.55)]" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black tracking-tight md:text-3xl">{t("timeline.caseDetails")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {t("timeline.caseDesc")}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {translatedStages.map((s, i) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setStage(i)}
                    className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-all ${
                      i === stage
                        ? "border-brand-primary bg-brand-primary text-brand-primary-foreground shadow-md"
                        : "border-border bg-card text-foreground hover:border-brand-primary/40 hover:text-brand-primary"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-card p-5">
                <div className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">{active.label}</div>
                <div className="mt-1 text-lg font-bold">{active.short}</div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-brand-primary transition-[width] duration-500 ease-out" style={{ width: `${active.pos}%` }} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Trust Bar ---------- */

const TRUST_MARKS = [
  { name: "Dermatology Websites", sub: "50+ launched" },
  { name: "HIPAA-Aware", sub: "By default" },
  { name: "Uptime SLA", sub: "99.99%" },
  { name: "Emergency Response", sub: "<15 min" },
  { name: "Month-to-Month", sub: "No lock-in" },
  { name: "Full Ownership", sub: "Code + content" },
];

function TrustBar() {
  const { t } = useTranslation("beforeAfter");
  return (
    <section className="py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {t("trustBar.label")}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {TRUST_MARKS.map((m, i) => (
              <div
                key={i}
                className="group flex flex-col items-center justify-center rounded-xl border border-border bg-card px-4 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md"
              >
                <div
                  className="bg-clip-text text-sm font-black tracking-tight text-transparent sm:text-base"
                  style={{ backgroundImage: "linear-gradient(120deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 55%))" }}
                >
                  {t(`trustBar.marks.${i}.name`)}
                </div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{t(`trustBar.marks.${i}.sub`)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
