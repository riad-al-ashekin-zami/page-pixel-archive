import { finalizeSeoHead } from "@/lib/seo-head";
import { KeywordOwnerLinks } from "@/components/sections/keyword-owner-links";
import { useEffect, useMemo, useRef, useState } from "react";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks } from "@/lib/i18n-routing";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { CtaLabel } from "@/lib/cta";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Search,
  Gauge,
  Accessibility,
  Smartphone,
  Lock,
  Rocket,
  Sparkles,
  FileCheck,
  ClipboardCheck,
  Download,
  Printer,
  Filter,
  Star,
  TrendingUp,
  Wrench,
  Eye,
  MousePointerClick,
  Award,
  PartyPopper,
  ListChecks,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { isValidUrlLang } from "@/i18n/languages";
import { robotsContent } from "@/lib/index-allowlist";

const PAGE_PATH = "/dermatology-website-checklists";

export const Route = createFileRoute("/{-$lang}/dermatology-website-checklists")({
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
    const st = getStaticTranslation(lang, "checklists");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-website-checklists") },
        { title: st?.meta?.title ?? "" },
        { name: "description", content: st?.meta?.description ?? "" },
        {
          name: "keywords",
          content: st?.meta?.keywords ?? "",
        },
        { property: "og:title", content: st?.meta?.title ?? "" },
        { property: "og:description", content: st?.meta?.description ?? "" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: PAGE_PATH },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: st?.meta?.title ?? "" },
        { name: "twitter:description", content: st?.meta?.description ?? "" },
        { property: "og:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
      ],
      links: [
        { rel: "canonical", href: localizedUrl(resolveRouteLanguage(params.lang), PAGE_PATH) },
        ...buildHreflangLinks(PAGE_PATH, params.lang),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: st?.schema?.breadcrumb?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: st?.schema?.breadcrumb?.pageName ?? "Dermatology Website Checklists",
                    item: localizedUrl(resolveRouteLanguage(params.lang), PAGE_PATH),
                  },
                ],
              },
              {
                "@type": "WebPage",
                name: st?.meta?.title ?? "",
                description: st?.meta?.description ?? "",
                url: localizedUrl(resolveRouteLanguage(params.lang), PAGE_PATH),
              },
            ],
          }),
        },
      ],
    };
  })(args), args.params.lang, "/dermatology-website-checklists"),
  component: ChecklistsPage,
});

// ---------- Data ----------

type Category = {
  id: string;
  icon: LucideIcon;
  hue: number;
};

const CATEGORY_CONFIG: Category[] = [
  { id: "prelaunch", icon: Rocket, hue: 180 },
  { id: "seo", icon: Search, hue: 205 },
  { id: "hipaa", icon: ShieldCheck, hue: 155 },
  { id: "a11y", icon: Accessibility, hue: 265 },
  { id: "performance", icon: Gauge, hue: 35 },
  { id: "mobile", icon: Smartphone, hue: 315 },
  { id: "conversion", icon: MousePointerClick, hue: 12 },
  { id: "security", icon: Lock, hue: 230 },
  { id: "content", icon: FileCheck, hue: 85 },
];

const TOP_STATS_ICONS = [
  { icon: ClipboardCheck },
  { icon: Award },
  { icon: TrendingUp },
];

const HOW_ICONS = [
  { icon: Eye },
  { icon: CheckCircle2 },
  { icon: Printer },
];

// ---------- Helpers ----------

function hueStyle(hue: number) {
  return {
    ["--cat" as string]: `oklch(0.62 0.14 ${hue})`,
    ["--cat-soft" as string]: `oklch(0.62 0.14 ${hue} / 0.10)`,
    ["--cat-border" as string]: `oklch(0.62 0.14 ${hue} / 0.28)`,
  } as React.CSSProperties;
}

// ---------- Component ----------

const STORAGE_KEY = "dwd:checklists:v1";

function ChecklistsPage() {
  const { t } = useTranslation("checklists");

  const categories = useMemo(() => {
    return CATEGORY_CONFIG.map((conf) => ({
      ...conf,
      title: t(`sections.${conf.id}.title`),
      short: t(`sections.${conf.id}.short`),
      tagline: t(`sections.${conf.id}.tagline`),
      items: t(`sections.${conf.id}.items`, { returnObjects: true }) as string[],
    }));
  }, [t]);

  const totalItems = useMemo(
    () => categories.reduce((n, c) => n + c.items.length, 0),
    [categories]
  );

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeCat, setActiveCat] = useState<string>("all");
  const [hydrated, setHydrated] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, hydrated]);

  const { scrollYProgress } = useScroll({ target: mainRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });

  const doneCount = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );
  const pct = totalItems ? Math.round((doneCount / totalItems) * 100) : 0;
  const completed = doneCount === totalItems && totalItems > 0;

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function resetAll() {
    setChecked({});
  }

  const visibleCategories =
    activeCat === "all" ? categories : categories.filter((c) => c.id === activeCat);

  const faqs = t("faq.items", { returnObjects: true }) as { q: string; a: string }[];

  return (
    <div className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <a href="#main" className="skip-to-content">
        {t("accessibility.skipToContent")}
      </a>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          article { break-inside: avoid; page-break-inside: avoid; box-shadow: none !important; border-color: #ccc !important; }
          .print-only { display: block !important; }
        }
        .print-only { display: none; }
      `}</style>

      <div className="no-print">
        <SiteHeader transparentOverHero />
      </div>

      <motion.div
        aria-hidden
        className="no-print fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-secondary) 55%))",
        }}
      />

      <main id="main" ref={mainRef}>
        <section
          className="relative isolate overflow-hidden"
          style={{
            background:
              "radial-gradient(1200px 640px at 88% -10%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(900px 500px at -10% 100%, color-mix(in oklch, var(--brand-secondary), transparent 78%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 95%), #ffffff)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
            {[
              { top: "18%", left: "6%", d: 0 },
              { top: "62%", left: "9%", d: 0.6 },
              { top: "30%", right: "48%", d: 1.1 },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0.5 }}
                animate={{ y: [0, -10, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 5, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
                className="absolute grid h-9 w-9 place-items-center rounded-xl border border-brand-primary/20 bg-background/80 text-brand-primary shadow-sm backdrop-blur"
                style={{ top: p.top, left: (p as any).left, right: (p as any).right }}
              >
                <CheckCircle2 className="h-4 w-4" />
              </motion.div>
            ))}
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
              <div className="min-w-0 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t("hero.badge")}
                </div>

                <h1 className="mt-6 text-balance text-[2.25rem] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                  {t("hero.title")}
                </h1>

                <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                  {t("hero.description", { totalItems })}
                </p>

                <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#checklists"
                    className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                    }}
                  >
                    {t("hero.actions.primary")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-background/60 px-7 py-3.5 text-sm font-semibold text-brand-primary backdrop-blur transition-colors hover:bg-brand-primary/5"
                  >
                    <CtaLabel />
                  </Link>
                </div>

                <dl className="mt-10 grid grid-cols-3 gap-4 sm:max-w-lg sm:gap-10">
                  {TOP_STATS_ICONS.map((s, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-start gap-2 sm:flex-row sm:items-start sm:gap-3"
                    >
                      <div className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary sm:grid">
                        <s.icon className="h-4 w-4" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <dt className="sr-only">{t(`hero.stats.${i}.label`)}</dt>
                        <dd className="text-lg font-black leading-none sm:text-2xl">
                          <CountUp value={t(`hero.stats.${i}.value`)} />
                        </dd>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground sm:text-xs">
                          {t(`hero.stats.${i}.label`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              <aside className="relative order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/90 p-6 shadow-[0_30px_60px_-30px_color-mix(in_oklch,var(--brand-primary),transparent_75%)] backdrop-blur sm:p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full"
                    style={{
                      background:
                        "radial-gradient(closest-side, color-mix(in oklch, var(--brand-primary), transparent 60%), transparent)",
                    }}
                  />
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                      <ClipboardCheck className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
                        {t("progress.title")}
                      </p>
                      <p className="truncate text-base font-black sm:text-lg">
                        {t("progress.status", { doneCount, totalItems })}
                      </p>
                    </div>
                    <div className="ml-auto rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-xs font-bold tabular-nums text-brand-primary">
                      {pct}%
                    </div>
                  </div>

                  <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-brand-primary/10">
                    <motion.div
                      className="h-full rounded-full"
                      initial={false}
                      animate={{ width: `${pct}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 22 }}
                      style={{
                        background:
                          "linear-gradient(90deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-secondary) 40%))",
                      }}
                    />
                  </div>

                  <ul className="mt-6 space-y-2.5">
                    {HOW_ICONS.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-primary/10 text-brand-primary">
                          <h.icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-bold">{t(`progress.howItWorks.${i}.title`)}</p>
                          <p className="text-xs text-muted-foreground">{t(`progress.howItWorks.${i}.desc`)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="no-print mt-6 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-brand-primary/50 hover:text-brand-primary"
                    >
                      <Printer className="h-3.5 w-3.5" /> {t("progress.actions.print")}
                    </button>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-brand-primary/50 hover:text-brand-primary"
                    >
                      <Wrench className="h-3.5 w-3.5" /> {t("progress.actions.reset")}
                    </button>
                    <a
                      href="#checklists"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/5 px-4 py-2 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
                    >
                      <Download className="h-3.5 w-3.5" /> {t("progress.actions.jump")}
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          <svg
            aria-hidden
            className="block w-full"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            style={{ height: 42 }}
          >
            <path
              d="M0,32 C240,60 480,0 720,20 C960,40 1200,60 1440,24 L1440,60 L0,60 Z"
              fill="var(--card)"
              opacity="0.6"
            />
          </svg>
        </section>

        <section
          id="checklists"
          className="no-print sticky top-0 z-40 border-y border-border/60 bg-background/85 backdrop-blur"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5" /> {t("filter.label")}
                </span>
                <span className="tabular-nums text-muted-foreground/70">
                  {doneCount}/{totalItems} · {pct}%
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <FilterChip active={activeCat === "all"} onClick={() => setActiveCat("all")}>
                  <ListChecks className="h-3.5 w-3.5" /> {t("filter.all")}
                  <span className="ml-1 tabular-nums opacity-70">{totalItems}</span>
                </FilterChip>
                {categories.map((c) => {
                  const catDone = c.items.filter((_, i) => checked[`${c.id}:${i}`]).length;
                  return (
                    <FilterChip
                      key={c.id}
                      active={c.id === activeCat}
                      onClick={() => setActiveCat(c.id)}
                      hue={c.hue}
                    >
                      <c.icon className="h-3.5 w-3.5" /> {c.short}
                      <span className="ml-1 tabular-nums opacity-70">
                        {catDone}/{c.items.length}
                      </span>
                    </FilterChip>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          {completed && (
            <div
              className="no-print mb-10 overflow-hidden rounded-3xl border border-brand-primary/30 p-6 sm:p-8"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 84%), color-mix(in oklch, var(--brand-secondary), transparent 84%))",
              }}
            >
              <div className="flex flex-wrap items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-primary text-brand-primary-foreground">
                  <PartyPopper className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-black sm:text-2xl">{t("feedback.ready")}</h2>
                  <p className="text-sm text-muted-foreground">
                    {t("feedback.completeDesc")}
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-brand-primary-foreground"
                >
                  <CtaLabel /> <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {visibleCategories.map((cat) => {
              const catDone = cat.items.filter((_, i) => checked[`${cat.id}:${i}`]).length;
              const catPct = Math.round((catDone / cat.items.length) * 100);
              return (
                <Reveal key={cat.id} variant="fade-up">
                  <article
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-30px_var(--cat)] sm:p-7"
                    style={{ ...hueStyle(cat.hue), borderColor: "var(--cat-border)" }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-70 transition-opacity group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(closest-side, color-mix(in oklch, var(--cat), transparent 65%), transparent)",
                      }}
                    />

                    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <span
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-transform group-hover:-rotate-6"
                          style={{ background: "var(--cat-soft)", color: "var(--cat)" }}
                        >
                          <cat.icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <h2 className="truncate text-xl font-black tracking-tight sm:text-2xl">
                            {cat.title}
                          </h2>
                          <p className="mt-1 text-sm text-muted-foreground">{cat.tagline}</p>
                        </div>
                      </div>
                      <div
                        className="rounded-full border px-2.5 py-1 text-[11px] font-bold tabular-nums"
                        style={{
                          borderColor: "var(--cat-border)",
                          background: "var(--cat-soft)",
                          color: "var(--cat)",
                        }}
                      >
                        {catDone}/{cat.items.length}
                      </div>
                    </header>

                    <div
                      className="mt-4 h-1.5 w-full overflow-hidden rounded-full"
                      style={{ background: "var(--cat-soft)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        initial={false}
                        animate={{ width: `${catPct}%` }}
                        transition={{ type: "spring", stiffness: 140, damping: 22 }}
                        style={{
                          background:
                            "linear-gradient(90deg, var(--cat), color-mix(in oklch, var(--cat), white 25%))",
                        }}
                      />
                    </div>

                    <ul className="mt-5 space-y-1.5">
                      {cat.items.map((item, i) => {
                        const id = `${cat.id}:${i}`;
                        const isDone = !!checked[id];
                        return (
                          <li key={id}>
                            <label
                              htmlFor={id}
                              className={`group/item flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-transparent px-2.5 py-2 text-sm transition-colors hover:border-[color:var(--cat-border)] hover:bg-[color:var(--cat-soft)] ${
                                isDone
                                  ? "text-muted-foreground line-through decoration-[color:var(--cat)]/50"
                                  : "text-foreground"
                              }`}
                            >
                              <input
                                id={id}
                                type="checkbox"
                                className="peer sr-only"
                                checked={isDone}
                                onChange={() => toggle(id)}
                              />
                              <span
                                aria-hidden
                                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-[color:var(--cat)] peer-focus-visible:ring-offset-2"
                                style={
                                  isDone
                                    ? {
                                        background: "var(--cat)",
                                        borderColor: "var(--cat)",
                                        color: "white",
                                      }
                                    : {
                                        borderColor: "color-mix(in oklch, var(--cat), transparent 55%)",
                                        background: "transparent",
                                      }
                                }
                              >
                                {isDone && <CheckCircle2 className="h-3.5 w-3.5" />}
                              </span>
                              <span className="leading-snug">{item}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="no-print mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl border border-border/60 p-8 sm:p-12"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 88%), color-mix(in oklch, var(--brand-secondary), transparent 88%))",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklch, var(--brand-primary), transparent 60%), transparent)",
              }}
            />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-background/70 px-3 py-1.5 text-xs font-semibold text-brand-primary backdrop-blur">
                  <Star className="h-3.5 w-3.5" /> {t("cta.badge")}
                </div>
                <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl">
                  {t("cta.title")}
                </h2>
                <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
                  {t("cta.description")}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                  }}
                >
                  <CtaLabel />
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="no-print mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
              {t("faq.badge")}
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              {t("faq.title")}
            </h2>
          </div>
          <div className="mt-10 divide-y divide-border overflow-hidden rounded-3xl border border-border/70 bg-card">
            {faqs.map((f, i) => (
              <details key={i} className="group px-5 py-5 sm:px-7">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="text-base font-bold sm:text-lg">{f.q}</span>
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                    <span aria-hidden className="text-lg leading-none">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">{f.a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </section>
      </main>

      <div className="no-print">
        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footer.more")}{" "}
          <Link to="/contact" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.links.audit")}</Link>,{" "}
          <Link to="/case-studies" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.links.caseStudies")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/blog" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.links.blog")}</Link>.
        </p>

        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"><KeywordOwnerLinks owners={["design", "seo"]} /></div>

      <SiteFooter />
      </div>
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
  hue,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  hue?: number;
}) {
  const style = hue !== undefined && active ? hueStyle(hue) : undefined;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "text-white shadow-sm"
          : "border-border bg-background text-foreground hover:border-brand-primary/50 hover:text-brand-primary"
      }`}
      style={
        active
          ? {
              ...(style ?? {}),
              background: hue !== undefined ? "var(--cat)" : "var(--brand-primary)",
              borderColor: hue !== undefined ? "var(--cat)" : "var(--brand-primary)",
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}
