import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { useTranslation, Trans } from "react-i18next";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage, useCurrentLang } from "@/lib/i18n-routing";
import { formatLocalizedNumber } from "@/lib/locale-format";
import { getStaticTranslation } from "@/i18n";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import aboutHero from "@/assets/about-hero.jpg";
import {
  ShieldCheck,
  Sparkles,
  Target,
  HeartHandshake,
  Users,
  Rocket,
  Award,
  Building2,
  ArrowRight,
  Eye,
  Compass,
  Quote,
  Stethoscope,
  CheckCircle2,
  Star,
  Newspaper,
  Trophy,
  Globe2,
  Microscope,
  ShieldPlus,
  Activity,
  Briefcase,
  Store,
  Scissors,
  Layers,
  Lock,
  FileLock2,
  Code2,
  Gauge,
  Search,
  BarChart3,
  LifeBuoy,
  HelpCircle,
  ChevronDown,
  Server,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";

export const Route = createFileRoute("/{-$lang}/about")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },
  head: ({ params }) => {
    const lang = resolveRouteLanguage(params.lang);
    const st = getStaticTranslation(lang, "about");
    const canonical = localizedUrl(lang, "/about");
    return {
      meta: [
        { title: st?.meta?.title ?? "About Us — Dermatology Website Design Agency" },
        {
          name: "description",
          content: st?.meta?.description ?? "We build HIPAA-aware websites and growth marketing exclusively for dermatology practices. Meet the team behind the results.",
        },
        { property: "og:title", content: st?.meta?.ogTitle ?? "About Us — Dermatology Website Design" },
        {
          property: "og:description",
          content: st?.meta?.ogDescription ?? "A niche agency serving dermatology practices with premium websites, SEO, and patient acquisition.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { property: "og:locale", content: lang },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: aboutHero },
        { name: "twitter:image", content: aboutHero },
      ],
      links: [
        { rel: "canonical", href: canonical },
        ...buildHreflangLinks("/about"),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: st?.meta?.breadcrumbHome ?? "Home", item: localizedUrl(lang, "/") },
              { "@type": "ListItem", position: 2, name: st?.meta?.breadcrumbAbout ?? "About Us", item: canonical },
            ],
          }),
        },
      ],
    };
  },
  component: AboutPage,
});

function TestimonialSlider() {
  const { t } = useTranslation("about");
  const [i, setI] = useState(0);
  
  const aboutTestimonials = [
    { quote: t("testimonials.t1.quote"), name: t("testimonials.t1.name"), role: t("testimonials.t1.role") },
    { quote: t("testimonials.t2.quote"), name: t("testimonials.t2.name"), role: t("testimonials.t2.role") },
    { quote: t("testimonials.t3.quote"), name: t("testimonials.t3.name"), role: t("testimonials.t3.role") },
  ];

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % aboutTestimonials.length), 5000);
    return () => clearInterval(id);
  }, [aboutTestimonials.length]);

  return (
    <div
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-brand-primary/20 p-6 text-white shadow-[0_20px_40px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_50%)] sm:p-7"
      style={{
        background:
          "linear-gradient(160deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 22%))",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: "color-mix(in oklch, var(--brand-accent), transparent 30%)" }}
      />
      <div className="relative">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
          <Quote className="h-5 w-5" />
        </span>
        <div className="relative mt-5 min-h-[11rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <p className="text-base font-medium leading-snug sm:text-lg">
                &ldquo;{aboutTestimonials[i].quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold">{aboutTestimonials[i].name}</p>
              <p className="text-xs text-white/75">{aboutTestimonials[i].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="relative mt-6 flex items-center gap-2">
        {aboutTestimonials.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={t("testimonials.ariaLabel", { index: idx + 1 })}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .replace(/,.*$/, "")
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function PullQuoteSlider() {
  const { t } = useTranslation("about");
  const [i, setI] = useState(0);

  const pullQuotes = [
    { quote: t("testimonials.p1.quote"), name: t("testimonials.p1.name") },
    { quote: t("testimonials.p2.quote"), name: t("testimonials.p2.name") },
    { quote: t("testimonials.p3.quote"), name: t("testimonials.p3.name") },
  ];

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % pullQuotes.length), 5000);
    return () => clearInterval(id);
  }, [pullQuotes.length]);

  return (
    <figure
      className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-[0_30px_80px_-40px_color-mix(in_oklch,var(--brand-primary),transparent_60%)] sm:p-12 lg:p-16"
      style={{
        background:
          "radial-gradient(600px 300px at 100% 0%, color-mix(in oklch, var(--brand-primary), transparent 88%), transparent 60%), #ffffff",
      }}
    >
      <Quote className="h-9 w-9 text-brand-primary/40 sm:h-12 sm:w-12" aria-hidden />
      <div className="relative mt-5 min-h-[14rem] sm:min-h-[17rem] lg:min-h-[17rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col"
          >
            <blockquote className="text-balance text-lg font-light leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              &ldquo;{pullQuotes[i].quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <div
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-brand-primary-foreground shadow-md sm:h-12 sm:w-12"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 22%))",
                }}
              >
                {initials(pullQuotes[i].name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold tracking-tight text-foreground">
                  {pullQuotes[i].name}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-0.5 sm:ml-auto" aria-label={t("testimonials.ariaStars")}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-brand-primary text-brand-primary sm:h-4 sm:w-4" />
                ))}
              </div>
            </figcaption>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative mt-10 flex items-center gap-2 sm:mt-8">
        {pullQuotes.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={t("testimonials.ariaLabel", { index: idx + 1 })}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-6 bg-brand-primary" : "w-2 bg-brand-primary/30 hover:bg-brand-primary/60"
            }`}
          />
        ))}
      </div>
    </figure>
  );
}

function useDesktopMedia() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setOk(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ok;
}

type ScrollyItem = { label: string; title: string; body: string };

function PinnedScrolly({
  items,
  kicker,
  labelHint,
  accent = "primary",
}: {
  items: ScrollyItem[];
  kicker: string;
  labelHint: string;
  accent?: "primary" | "accent";
}) {
  const lang = useCurrentLang();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      items.length - 1,
      Math.max(0, Math.floor(v * items.length * 0.999)),
    );
    setActive(idx);
  });

  const accentClass = accent === "accent" ? "text-brand-accent" : "text-brand-primary";
  const accentBg = accent === "accent" ? "bg-brand-accent" : "bg-brand-primary";
  const accentBgSoft = accent === "accent" ? "bg-brand-accent/15" : "bg-brand-primary/15";

  return (
    <div
      ref={ref}
      style={{ height: `${items.length * 90}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20 lg:px-10">
          <div>
            <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
              <span className="tabular-nums opacity-60">
                {formatLocalizedNumber(active + 1, lang, 2)}
              </span>
              <span className="opacity-30">/</span>
              <span className="tabular-nums opacity-60">
                {formatLocalizedNumber(items.length, lang, 2)}
              </span>
              <span className="opacity-30">—</span>
              {kicker}
            </span>
            <div
              className={`relative mt-6 h-[9rem] overflow-hidden ${accentClass}`}
              aria-label={`${labelHint} ${items[active].label}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={items[active].label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 select-none text-[7rem] font-bold leading-none tracking-tight tabular-nums"
                >
                  {items[active].label}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-10 flex gap-1.5">
              {items.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i <= active ? accentBg : accentBgSoft
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative min-h-[16rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-border/70 bg-card p-8 shadow-[0_30px_80px_-40px_color-mix(in_oklch,var(--brand-primary),transparent_60%)] sm:p-10 lg:p-12"
              >
                <h3 className="text-balance text-3xl font-light leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {items[active].title}
                </h3>
                <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {items[active].body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlatSteps({
  items,
  kicker,
  accent = "primary",
}: {
  items: ScrollyItem[];
  kicker: string;
  accent?: "primary" | "accent";
}) {
  const accentClass = accent === "accent" ? "text-brand-accent" : "text-brand-primary";
  return (
    <div>
      <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>{kicker}</p>
      <ol className="mt-8 space-y-6">
        {items.map((it) => (
          <li
            key={it.label}
            className="rounded-2xl border border-border/70 bg-card p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          >
            <span className={`text-sm font-bold tracking-widest tabular-nums ${accentClass}`}>
              {it.label}
            </span>
            <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ScrollyTimelineSection() {
  const { t } = useTranslation("about");
  const desktop = useDesktopMedia();
  const reduce = useReducedMotion();
  
  const timelineItems = [
    { label: "2019", title: t("timeline.2019.title"), body: t("timeline.2019.description") },
    { label: "2021", title: t("timeline.2021.title"), body: t("timeline.2021.description") },
    { label: "2023", title: t("timeline.2023.title"), body: t("timeline.2023.description") },
    { label: "2026", title: t("timeline.2026.title"), body: t("timeline.2026.description") },
  ];

  if (!desktop || reduce) {
    return <FlatSteps items={timelineItems} kicker={t("timeline.kicker")} />;
  }
  return <PinnedScrolly items={timelineItems} kicker={t("timeline.kicker")} labelHint={t("timeline.hint")} />;
}

function ScrollyProcessSection() {
  const { t } = useTranslation("about");
  const desktop = useDesktopMedia();
  const reduce = useReducedMotion();

  const processSteps = [
    { label: "01", title: t("process.step1.title"), body: t("process.step1.body") },
    { label: "02", title: t("process.step2.title"), body: t("process.step2.body") },
    { label: "03", title: t("process.step3.title"), body: t("process.step3.body") },
    { label: "04", title: t("process.step4.title"), body: t("process.step4.body") },
    { label: "05", title: t("process.step5.title"), body: t("process.step5.body") },
    { label: "06", title: t("process.step6.title"), body: t("process.step6.body") },
  ];

  if (!desktop || reduce) {
    return <FlatSteps items={processSteps} kicker={t("process.kicker")} />;
  }
  return <PinnedScrolly items={processSteps} kicker={t("process.kicker")} labelHint={t("process.hint")} />;
}


function AboutPage() {
  const { t, i18n } = useTranslation("about");
  const { lang: rawLang } = Route.useParams();
  const lang = resolveRouteLanguage(rawLang);

  useEffect(() => {
    if (i18n.resolvedLanguage !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const stats = [
    { value: "50+", label: t("stats.launched") },
    { value: "100%", label: t("stats.niche") },
    { value: "95+", label: t("stats.performance") },
    { value: "48h", label: t("stats.audit") },
  ];

  return (
    <div className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <a href="#main" className="skip-to-content">
        {t("skip")}
      </a>
      <SiteHeader transparentOverHero />
      <main id="main">
        {/* Hero */}
        <section
          className="relative isolate overflow-hidden"
          style={{
            background:
              "radial-gradient(1100px 600px at 90% 0%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(900px 500px at 0% 100%, color-mix(in oklch, var(--brand-secondary), transparent 75%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 94%), #ffffff)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-24 -z-10 h-64 w-64 rounded-full opacity-40 blur-3xl sm:h-80 sm:w-80"
            style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 78%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-72 w-72 rounded-full opacity-40 blur-3xl sm:h-96 sm:w-96"
            style={{ background: "color-mix(in oklch, var(--brand-secondary), transparent 78%)" }}
          />

          <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-32">
            {/* copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary backdrop-blur">
                <Building2 className="h-3.5 w-3.5" />
                {t("hero.kicker")}
              </div>
              <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-5xl xl:text-6xl">
                <Trans i18nKey="hero.h1" ns="about">
                  <Trans t={t} i18nKey="hero.h1" components={{ 1: <span className="text-brand-primary" /> }} />
                </Trans>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg lg:mx-0">
                {t("hero.p")}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5 sm:px-7 sm:py-3.5"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                  }}
                >
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/dermatology-website-design"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-background/60 px-6 py-3 text-sm font-semibold text-brand-primary backdrop-blur transition-colors hover:bg-brand-primary/5 sm:px-7 sm:py-3.5"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>

              {/* trust row */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" /> {t("hero.hipaa")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" /> {t("hero.ada")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-brand-primary text-brand-primary" /> {t("hero.rating")}
                </span>
              </div>
            </div>

            {/* visual anchor: founder portrait */}
            <div className="relative mx-auto w-full max-w-sm lg:max-w-md lg:self-center">
              <div className="relative aspect-[5/6] overflow-hidden rounded-3xl border border-border/60 shadow-[0_30px_80px_-30px_color-mix(in_oklch,var(--brand-primary),transparent_55%)]">
                <img
                  src={aboutHero}
                  alt={t("hero.imgAlt")}
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, color-mix(in oklch, var(--brand-primary), transparent 60%) 100%)",
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 rounded-2xl border border-white/40 bg-white/85 p-3 shadow-lg backdrop-blur sm:bottom-5 sm:left-5 sm:right-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Stethoscope className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-primary">
                      {t("hero.badgeKicker")}
                    </p>
                    <p className="truncate text-xs font-semibold text-foreground">
                      {t("hero.badgeText")}
                    </p>
                  </div>
                </div>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -top-4 -right-4 hidden h-20 w-20 rounded-2xl border border-border/60 bg-card shadow-xl sm:block"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 82%), #ffffff)",
                }}
              />
            </div>

          </div>
        </section>

        {/* Trusted-by strip */}
        <section className="border-y border-border/60 bg-card/40 py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {t("socialProof.kicker")}
            </p>
            <ul className="mt-6 grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { icon: Newspaper, name: "DermToday" },
                { icon: Globe2, name: "SkinJournal" },
                { icon: Trophy, name: "AAD Choice" },
                { icon: Microscope, name: "ClinicLab" },
                { icon: ShieldPlus, name: "HIPAA Vault" },
                { icon: Activity, name: "PatientPulse" },
              ].map((l) => (
                <li
                  key={l.name}
                  className="flex items-center justify-center gap-2 text-muted-foreground/70 grayscale transition hover:text-foreground hover:grayscale-0"
                >
                  <l.icon className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-semibold tracking-tight">{l.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Stats — editorial dark band */}
        <section
          className="relative overflow-hidden py-14 sm:py-20"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), black 30%), color-mix(in oklch, var(--brand-primary), black 55%))",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-y-10 text-brand-primary-foreground sm:gap-y-12 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-2 text-center sm:px-4 lg:px-8 ${
                    i % 2 === 0 ? "border-r border-white/15 lg:border-0" : ""
                  }`}
                >
                  <p className="font-bold leading-none tracking-tight text-white text-[clamp(2.5rem,7vw,5rem)]">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-xs">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission / Vision */}
        <Reveal variant="fade-up">
          <section className="py-16 sm:py-20 lg:py-24">
            <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
              {[
                {
                  icon: Compass,
                  tag: t("missionVision.mission.tag"),
                  title: t("missionVision.mission.title"),
                  body: t("missionVision.mission.body"),
                },
                {
                  icon: Eye,
                  tag: t("missionVision.vision.tag"),
                  title: t("missionVision.vision.title"),
                  body: t("missionVision.vision.body"),
                },
              ].map((b) => (
                <div
                  key={b.tag}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_60%)] sm:p-8"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                    {b.tag}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {b.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Values */}
        <Reveal variant="fade-up">
          <section className="py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  <Award className="h-3.5 w-3.5" /> {t("values.kicker")}
                </span>
                <h2 className="mt-4 text-balance text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {t("values.header")}
                </h2>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
                {[
                  { icon: ShieldCheck, title: t("values.compliance.title"), description: t("values.compliance.description") },
                  { icon: Target, title: t("values.focus.title"), description: t("values.focus.description") },
                  { icon: HeartHandshake, title: t("values.partnership.title"), description: t("values.partnership.description") },
                  { icon: Sparkles, title: t("values.craft.title"), description: t("values.craft.description") },
                ].map((v, i) => {
                  const isFeature = i === 0;
                  return (
                    <div
                      key={v.title}
                      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_60%)] sm:p-7 ${
                        isFeature
                          ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:p-9"
                          : ""
                      }`}
                      style={
                        isFeature
                          ? {
                              background:
                                "linear-gradient(160deg, color-mix(in oklch, var(--brand-primary), transparent 90%), #ffffff 60%, color-mix(in oklch, var(--brand-secondary), transparent 92%))",
                            }
                          : undefined
                      }
                    >
                      {isFeature && (
                        <div
                          aria-hidden
                          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
                          style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 70%)" }}
                        />
                      )}
                      <span
                        className={`grid place-items-center rounded-xl bg-brand-primary/10 text-brand-primary ${
                          isFeature ? "h-14 w-14" : "h-11 w-11"
                        }`}
                      >
                        <v.icon className={isFeature ? "h-6 w-6" : "h-5 w-5"} />
                      </span>
                      <h3
                        className={`mt-5 font-bold tracking-tight text-foreground ${
                          isFeature ? "text-2xl sm:text-3xl" : "text-lg"
                        }`}
                      >
                        {v.title}
                      </h3>
                      <p
                        className={`mt-2 leading-relaxed text-muted-foreground ${
                          isFeature ? "text-base sm:text-lg" : "text-sm"
                        }`}
                      >
                        {v.description}
                      </p>
                      {isFeature && (
                        <div className="mt-auto pt-6">
                          <Link
                            to="/dermatology-website-design"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary transition-colors hover:text-foreground"
                          >
                            {t("values.cta")}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}

                <TestimonialSlider />
              </div>

            </div>
          </section>
        </Reveal>

        {/* Timeline — pinned scrollytelling */}
        <section
          className="relative"
          style={{
            background:
              "radial-gradient(900px 500px at 0% 0%, color-mix(in oklch, var(--brand-secondary), transparent 90%), transparent 60%), #ffffff",
          }}
        >
          <Reveal variant="fade">
            <div className="mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
              <h2 className="text-balance text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                <Trans i18nKey="timeline.h2" ns="about">
                  Our story <span className="font-medium italic text-brand-primary">so far.</span>
                </Trans>
              </h2>
              <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
                {t("timeline.p")}
              </p>
              <div className="mx-auto mt-6 h-1.5 w-24 overflow-hidden rounded-full bg-brand-primary/15">
                <div className="h-full w-1/3 rounded-full bg-brand-primary" />
              </div>
            </div>
          </Reveal>
          <div className="md:hidden">
            <div className="mx-auto max-w-[520px] px-6 py-12 sm:px-6">
              <ol className="relative ml-3 pl-11 sm:ml-5 sm:pl-12">
                {[
                  { year: "2019", title: t("timeline.2019.title"), description: t("timeline.2019.description") },
                  { year: "2021", title: t("timeline.2021.title"), description: t("timeline.2021.description") },
                  { year: "2023", title: t("timeline.2023.title"), description: t("timeline.2023.description") },
                  { year: "2026", title: t("timeline.2026.title"), description: t("timeline.2026.description") },
                ].map((t, i, arr) => (
                  <li key={t.year} className={`relative ${i === arr.length - 1 ? "" : "pb-14"}`}>
                    {i < arr.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute -left-[47px] top-[76px] -bottom-[76px] w-px bg-brand-primary/25 sm:-left-[51px]"
                      />
                    )}
                    <span
                      aria-hidden
                      className="absolute -left-[69px] top-[54px] z-10 grid h-11 w-11 place-items-center rounded-full bg-brand-primary ring-[7px] ring-brand-primary/10 shadow-[0_10px_26px_-8px_color-mix(in_oklch,var(--brand-primary),transparent_38%)] sm:-left-[73px]"
                    >
                      <span className="h-2 w-2 rounded-full bg-brand-primary-foreground" />
                    </span>
                    <div className="relative pt-6">
                      <div
                        aria-hidden
                        className={`pointer-events-none absolute top-3 z-10 select-none text-[2rem] font-bold leading-none tracking-tight text-brand-primary/30 ${
                          i % 2 === 0 ? "left-5" : "right-5"
                        }`}
                      >
                        {t.year}
                      </div>
                      <div className="rounded-2xl border border-border/70 bg-card px-6 pb-6 pt-8 shadow-[0_10px_24px_-20px_color-mix(in_oklch,var(--foreground),transparent_35%)]">
                        <h3 className="text-[1.125rem] font-bold leading-tight tracking-tight text-foreground">
                          {t.title}
                        </h3>
                        <p className="mt-3 text-[0.95rem] leading-6 text-muted-foreground">
                          {t.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {/* Tablet: alternating around a centered line */}
          <div className="hidden md:block lg:hidden">
            <div className="mx-auto max-w-3xl px-6 py-16 md:px-8">
              <ol className="relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-[76px] bottom-[76px] w-px -translate-x-1/2 bg-brand-primary/25"
                />
                {[
                  { year: "2019", title: t("timeline.2019.title"), description: t("timeline.2019.description") },
                  { year: "2021", title: t("timeline.2021.title"), description: t("timeline.2021.description") },
                  { year: "2023", title: t("timeline.2023.title"), description: t("timeline.2023.description") },
                  { year: "2026", title: t("timeline.2026.title"), description: t("timeline.2026.description") },
                ].map((trace, i, arr) => {
                  const isLeft = i % 2 === 1; // card left → year right
                  return (
                    <li key={trace.year} className={`relative ${i === arr.length - 1 ? "" : "pb-16"}`}>
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-[54px] z-10 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full bg-brand-primary ring-[7px] ring-brand-primary/10 shadow-[0_10px_26px_-8px_color-mix(in_oklch,var(--brand-primary),transparent_38%)]"
                      >
                        <span className="h-2 w-2 rounded-full bg-brand-primary-foreground" />
                      </span>
                      <div className="grid grid-cols-2 items-start gap-10">
                        {isLeft ? (
                          <>
                            <div className="pr-10 pt-6">
                              <div className="rounded-2xl border border-border/70 bg-card px-6 pb-6 pt-6 text-right shadow-[0_10px_24px_-20px_color-mix(in_oklch,var(--foreground),transparent_35%)]">
                                <h3 className="text-[1.125rem] font-bold leading-tight tracking-tight text-foreground">
                                  {trace.title}
                                </h3>
                                <p className="mt-3 text-[0.95rem] leading-6 text-muted-foreground">
                                  {trace.description}
                                </p>
                              </div>
                            </div>
                            <div className="relative pl-10 pt-10">
                              <div
                                aria-hidden
                                className="select-none text-[4rem] font-bold leading-none tracking-tight text-brand-primary/25"
                              >
                                {trace.year}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="relative pr-10 pt-10 text-right">
                              <div
                                aria-hidden
                                className="select-none text-[4rem] font-bold leading-none tracking-tight text-brand-primary/25"
                              >
                                {trace.year}
                              </div>
                            </div>
                            <div className="pl-10 pt-6">
                              <div className="rounded-2xl border border-border/70 bg-card px-6 pb-6 pt-6 shadow-[0_10px_24px_-20px_color-mix(in_oklch,var(--foreground),transparent_35%)]">
                                <h3 className="text-[1.125rem] font-bold leading-tight tracking-tight text-foreground">
                                  {trace.title}
                                </h3>
                                <p className="mt-3 text-[0.95rem] leading-6 text-muted-foreground">
                                  {trace.description}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="hidden lg:block">
            <ScrollyTimelineSection />
          </div>
        </section>


        {/* Team */}
        <Reveal variant="fade-up">
          <section className="py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  <Users className="h-3.5 w-3.5" /> {t("team.kicker")}
                </span>
                <h2 className="mt-4 text-balance text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {t("team.header")}
                </h2>
                <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
                  {t("team.p")}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: t("team.design.name"), role: t("team.design.role"), bio: t("team.design.bio"), icon: Sparkles, initials: "DS" },
                  { name: t("team.engineering.name"), role: t("team.engineering.role"), bio: t("team.engineering.bio"), icon: Rocket, initials: "EN" },
                  { name: t("team.growth.name"), role: t("team.growth.role"), bio: t("team.growth.bio"), icon: Users, initials: "GT" },
                ].map((m) => (
                  <div
                    key={m.name}
                    className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-[0_24px_60px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_55%)] sm:p-7"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                      style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 70%)" }}
                    />
                    <div className="flex items-center gap-4">
                      <div
                        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-bold text-brand-primary-foreground shadow-md"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 22%))",
                        }}
                      >
                        {m.initials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-bold tracking-tight text-foreground">
                          {m.name}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                          {m.role}
                        </p>
                      </div>
                      <span className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                        <m.icon className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      {m.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Sliding testimonials */}
        <Reveal variant="fade-up">
          <section className="py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <PullQuoteSlider />
            </div>
          </section>
        </Reveal>

        {/* Our Process — pinned scrollytelling */}
        <section
          className="relative border-t border-border/60"
          style={{
            background:
              "radial-gradient(900px 500px at 100% 0%, color-mix(in oklch, var(--brand-primary), transparent 92%), transparent 60%), #ffffff",
          }}
        >
          <Reveal variant="fade">
            <div className="mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                <Compass className="h-3.5 w-3.5" /> {t("process.kicker")}
              </span>
              <h2 className="mt-4 text-balance text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                <Trans i18nKey="process.header" ns="about">
                  Six steps, <span className="font-medium italic text-brand-primary">predictable delivery.</span>
                </Trans>
              </h2>
              <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
                {t("process.p")}
              </p>
            </div>
          </Reveal>
          <div className="lg:hidden">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {[
                  { label: "01", title: t("process.step1.title"), body: t("process.step1.body") },
                  { label: "02", title: t("process.step2.title"), body: t("process.step2.body") },
                  { label: "03", title: t("process.step3.title"), body: t("process.step3.body") },
                  { label: "04", title: t("process.step4.title"), body: t("process.step4.body") },
                  { label: "05", title: t("process.step5.title"), body: t("process.step5.body") },
                  { label: "06", title: t("process.step6.title"), body: t("process.step6.body") },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:border-brand-primary/30"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-light tabular-nums text-brand-primary sm:text-4xl">
                        {s.label}
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <ScrollyProcessSection />
          </div>
        </section>


        {/* Who we work with */}
        <Reveal variant="fade-up">
          <section className="border-t border-border/60 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  <Briefcase className="h-3.5 w-3.5" /> {t("clients.kicker")}
                </span>
                <h2 className="mt-4 text-balance text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  <Trans i18nKey="clients.header" ns="about">
                    Built for every kind of <span className="font-medium text-brand-primary">dermatology practice.</span>
                  </Trans>
                </h2>
                <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
                  {t("clients.p")}
                </p>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Stethoscope, title: t("clients.solo.title"), body: t("clients.solo.body") },
                  { icon: Building2, title: t("clients.multi.title"), body: t("clients.multi.body") },
                  { icon: Sparkles, title: t("clients.aesthetic.title"), body: t("clients.aesthetic.body") },
                  { icon: HeartHandshake, title: t("clients.pediatric.title"), body: t("clients.pediatric.body") },
                  { icon: ShieldPlus, title: t("clients.mohs.title"), body: t("clients.mohs.body") },
                  { icon: Users, title: t("clients.groups.title"), body: t("clients.groups.body") },
                  
                ].map((it) => (
                  <div
                    key={it.title}
                    className="group relative rounded-2xl border border-border/70 bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-[0_24px_60px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_60%)] sm:p-7"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                      <it.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">{it.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Trust & Compliance promise */}
        <Reveal variant="fade-up">
          <section className="py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div
                className="relative overflow-hidden rounded-3xl border border-brand-primary/20 p-8 sm:p-12 lg:p-14"
                style={{
                  background:
                    "radial-gradient(700px 340px at 0% 0%, color-mix(in oklch, var(--brand-primary), transparent 86%), transparent 60%), #ffffff",
                }}
              >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                      <ShieldCheck className="h-3.5 w-3.5" /> {t("compliance.kicker")}
                    </span>
                    <h2 className="mt-4 text-balance text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                      <Trans i18nKey="compliance.header" ns="about">
                        Your patients&rsquo; privacy, protected <span className="font-medium text-brand-primary">by design.</span>
                      </Trans>
                    </h2>
                    <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
                      {t("compliance.p")}
                    </p>
                  </div>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      { icon: ShieldPlus, title: t("compliance.hipaa.title"), body: t("compliance.hipaa.body") },
                      { icon: FileLock2, title: t("compliance.baa.title"), body: t("compliance.baa.body") },
                      { icon: Lock, title: t("compliance.nda.title"), body: t("compliance.nda.body") },
                      { icon: Eye, title: t("compliance.phi.title"), body: t("compliance.phi.body") },
                    ].map((it) => (
                      <li key={it.title} className="rounded-2xl border border-border/70 bg-card/70 p-5">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                          <it.icon className="h-4 w-4" />
                        </span>
                        <p className="mt-3 text-sm font-bold tracking-tight text-foreground">{it.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Technology & expertise */}
        <Reveal variant="fade-up">
          <section className="border-t border-border/60 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  <Layers className="h-3.5 w-3.5" /> {t("tech.kicker")}
                </span>
                <h2 className="mt-4 text-balance text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  <Trans i18nKey="tech.header" ns="about">
                    A focused, reliable <span className="font-medium text-brand-primary">modern stack.</span>
                  </Trans>
                </h2>
                <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
                  {t("tech.p")}
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 lg:grid-cols-4">
                {[
                  { icon: Code2, title: t("tech.stack.title"), body: t("tech.stack.body") },
                  { icon: Server, title: t("tech.hosting.title"), body: t("tech.hosting.body") },
                  { icon: Search, title: t("tech.seo.title"), body: t("tech.seo.body") },
                  { icon: Gauge, title: t("tech.cwv.title"), body: t("tech.cwv.body") },
                  { icon: Stethoscope, title: t("tech.cms.title"), body: t("tech.cms.body") },
                  { icon: BarChart3, title: t("tech.cro.title"), body: t("tech.cro.body") },
                  { icon: ShieldPlus, title: t("tech.a11y.title"), body: t("tech.a11y.body") },
                  { icon: LifeBuoy, title: t("tech.care.title"), body: t("tech.care.body") },
                ].map((it) => (
                  <div
                    key={it.title}
                    className="rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-brand-primary/30"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                      <it.icon className="h-4 w-4" />
                    </span>
                    <p className="mt-4 text-sm font-bold tracking-tight text-foreground">{it.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Operational structure / departments */}
        <Reveal variant="fade-up">
          <section className="py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  <Building2 className="h-3.5 w-3.5" /> {t("structure.kicker")}
                </span>
                <h2 className="mt-4 text-balance text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  <Trans i18nKey="structure.header" ns="about">
                    Real departments, <span className="font-medium text-brand-primary">not a freelancer pool.</span>
                  </Trans>
                </h2>
                <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
                  {t("structure.p")}
                </p>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Compass, title: t("structure.pm.title"), body: t("structure.pm.body") },
                  { icon: Code2, title: t("team.engineering.name"), body: t("team.engineering.bio") },
                  { icon: Sparkles, title: t("team.design.name"), body: t("team.design.bio") },
                  { icon: Search, title: t("team.growth.name"), body: t("team.growth.bio") },
                  { icon: Newspaper, title: t("structure.content.title"), body: t("structure.content.body") },
                  { icon: LifeBuoy, title: t("tech.care.title"), body: t("tech.care.body") },
                ].map((it) => (
                  <div
                    key={it.title}
                    className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-brand-primary/30"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                      <it.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold tracking-tight text-foreground">{it.title}</p>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {t("structure.status")}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal variant="fade-up">
          <section className="border-t border-border/60 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  <HelpCircle className="h-3.5 w-3.5" /> {t("faq.kicker")}
                </span>
                <h2 className="mt-4 text-balance text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  <Trans i18nKey="faq.header" ns="about">
                    Common questions, <span className="font-medium text-brand-primary">answered.</span>
                  </Trans>
                </h2>
              </div>
              <div className="mt-10 divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card">
                {[
                  { q: t("faq.q1.q"), a: t("faq.q1.a") },
                  { q: t("faq.q2.q"), a: t("faq.q2.a") },
                  { q: t("faq.q3.q"), a: t("faq.q3.a") },
                  { q: t("faq.q4.q"), a: t("faq.q4.a") },
                  { q: t("faq.q5.q"), a: t("faq.q5.a") },
                  { q: t("faq.q6.q"), a: t("faq.q6.a") },
                  { q: t("faq.q7.q"), a: t("faq.q7.a") },
                ].map((it) => (
                  <details key={it.q} className="group px-5 py-4 sm:px-6">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                      <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                        {it.q}
                      </span>
                      <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {it.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* CTA */}
        <section className="pb-20 sm:pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div
              className="relative overflow-hidden rounded-3xl p-8 text-brand-primary-foreground sm:p-12 lg:p-14"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 25%))",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
                style={{ background: "var(--brand-accent)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
                style={{ background: "color-mix(in oklch, var(--brand-primary), white 25%)" }}
              />
              <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5" /> {t("cta.kicker")}
                  </span>
                  <h2 className="mt-5 max-w-xl text-balance text-3xl font-light leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
                    <Trans i18nKey="cta.header" ns="about">
                      Ready to grow your <span className="font-medium text-brand-accent">dermatology practice?</span>
                    </Trans>
                  </h2>
                  <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
                    {t("cta.p")}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to="/free-dermatologist-website-audit"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-transform hover:scale-[1.03] sm:px-7 sm:py-3.5"
                    >
                      {t("cta.primary")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-brand-primary-foreground backdrop-blur transition-colors hover:bg-white/20 sm:px-7 sm:py-3.5"
                    >
                      {t("cta.secondary")}
                    </Link>
                  </div>
                </div>

                <ol className="relative space-y-4 rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    {t("cta.next")}
                  </p>
                  {[
                    { n: "01", title: t("cta.step1.title"), body: t("cta.step1.body") },
                    { n: "02", title: t("cta.step2.title"), body: t("cta.step2.body") },
                    { n: "03", title: t("cta.step3.title"), body: t("cta.step3.body") },
                  ].map((s) => (
                    <li key={s.n} className="flex gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-accent text-sm font-bold text-foreground shadow-md">
                        {s.n}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold tracking-tight text-white">{s.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-white/75">{s.body}</p>
                      </div>
                    </li>
                  ))}
                  <div className="!mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/15 pt-4 text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    <span className="inline-flex items-center gap-1.5"><ShieldPlus className="h-3.5 w-3.5" /> {t("cta.footer.hipaa")}</span>
                    <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> {t("cta.footer.nda")}</span>
                    <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> {t("cta.footer.ownership")}</span>
                  </div>
                </ol>
              </div>
            </div>
          </div>
        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footerLinks.text")}{" "}
          <Link to="/dermatology-websites-portfolio" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.portfolio")}</Link>,{" "}
          <Link to="/our-process" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.process")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/plan-packages-and-costs" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.pricing")}</Link>.
        </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
