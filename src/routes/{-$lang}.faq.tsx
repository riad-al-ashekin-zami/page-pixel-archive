import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Gauge,
  Rocket,
  MousePointerClick,
  Lock,
  FileCheck,
  Smartphone,
  HelpCircle,
  Sparkles,
  Plus,
  MessageCircle,
  PhoneCall,
  ThumbsUp,
  ThumbsDown,
  Flame,
  Command,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import faqOgImage from "@/assets/faq-og.jpg";
import { isValidUrlLang } from "@/i18n/languages";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage } from "@/lib/i18n-routing";
import { robotsContent } from "@/lib/index-allowlist";

const PAGE_PATH = "/faq";

export const Route = createFileRoute("/{-$lang}/faq")({
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
    const st = getStaticTranslation(lang, "faq");
    const PAGE_TITLE = st?.meta?.title ?? "FAQ — Dermatology Website Design, SEO & HIPAA Answers";
    const PAGE_DESCRIPTION = st?.meta?.description ?? "Straight answers on dermatology website pricing, timelines, SEO, HIPAA, redesigns, migrations, and ongoing support for growing practices.";
    
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/faq") },
        { title: PAGE_TITLE },
        { name: "description", content: PAGE_DESCRIPTION },
        {
          name: "keywords",
          content: st?.meta?.keywords ?? "dermatology website FAQ, dermatology SEO FAQ, HIPAA website questions, dermatology website cost, dermatology website timeline",
        },
        { property: "og:title", content: PAGE_TITLE },
        { property: "og:description", content: PAGE_DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: PAGE_PATH },
        { property: "og:image", content: faqOgImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: PAGE_TITLE },
        { name: "twitter:description", content: PAGE_DESCRIPTION },
        { name: "twitter:image", content: faqOgImage },
      ],
      links: [
        { rel: "canonical", href: PAGE_PATH }, ...buildHreflangLinks(PAGE_PATH, params.lang),
        { rel: "preload", as: "image", href: faqOgImage, fetchpriority: "low" },
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
                  { "@type": "ListItem", position: 1, name: st?.meta?.breadcrumbList?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
                  { "@type": "ListItem", position: 2, name: st?.meta?.breadcrumbList?.faq ?? "FAQ", item: localizedUrl(resolveRouteLanguage(params.lang), PAGE_PATH) },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: ALL_FAQS_FOR_SCHEMA(st),
              },
            ],
          }),
        },
      ],
    };
  },
  component: FaqPage,
});

// ---------- Data ----------

type Cta = { label: string; to: string };
type Faq = { q: string; a: string; popular?: boolean; cta?: Cta };
type Cat = {
  id: string;
  title: string;
  short: string;
  icon: LucideIcon;
  hue: number;
  intro: string;
  items: Faq[];
};

const CAT_STATIC_CONFIG = [
  { id: "general", icon: Sparkles, hue: 180, ctas: [{ to: "/our-process" }] },
  { id: "pricing", icon: Rocket, hue: 35, ctas: [{ to: "/plan-packages-and-costs" }] },
  { id: "seo", icon: Search, hue: 205, ctas: [] },
  { id: "hipaa", icon: ShieldCheck, hue: 155, ctas: [{ to: "/contact" }] },
  { id: "design", icon: Sparkles, hue: 315, ctas: [] },
  { id: "support", icon: Lock, hue: 230, ctas: [] },
  { id: "integrations", icon: MousePointerClick, hue: 265, ctas: [] },
];

function ALL_FAQS_FOR_SCHEMA(st: any) {
  const cats = ["general", "pricing", "seo", "hipaa", "design", "support", "integrations"];
  return cats.flatMap((catId) => {
    const items = st?.categories?.[catId]?.items ?? [];
    return items.map((i: any) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    }));
  });
}

// ---------- Helpers ----------

function hueStyle(hue: number) {
  return {
    ["--cat" as string]: `oklch(0.62 0.14 ${hue})`,
    ["--cat-soft" as string]: `oklch(0.62 0.14 ${hue} / 0.10)`,
    ["--cat-border" as string]: `oklch(0.62 0.14 ${hue} / 0.28)`,
  } as React.CSSProperties;
}

function highlight(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase() ? (
      <mark key={i} className="rounded bg-[color:var(--cat-soft)] px-0.5 text-foreground">
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

// ---------- Component ----------

function FaqPage() {
  const { t } = useTranslation("faq");

  const CATS: Cat[] = useMemo(() => CAT_STATIC_CONFIG.map(config => ({
    id: config.id,
    title: t(`categories.${config.id}.title`),
    short: t(`categories.${config.id}.short`),
    icon: config.icon,
    hue: config.hue,
    intro: t(`categories.${config.id}.intro`),
    items: (t(`categories.${config.id}.items`, { returnObjects: true }) as any[]).map((item, idx) => ({
      ...item,
      cta: config.ctas[idx] ? { label: item.cta, to: config.ctas[idx].to } : undefined,
      popular: (config.id === "general" && idx === 0) || 
               (config.id === "pricing" && (idx === 0 || idx === 1)) || 
               (config.id === "seo" && idx === 0) || 
               (config.id === "hipaa" && idx === 0)
    }))
  })), [t]);

  const totalCount = useMemo(() => CATS.reduce((n, c) => n + c.items.length, 0), [CATS]);
  const popularFaqs = useMemo(
    () =>
      CATS.flatMap((c) =>
        c.items
          .map((it, i) => ({ ...it, cat: c, key: `${c.id}:${i}` }))
          .filter((it) => it.popular)
      ).slice(0, 5),
    [CATS]
  );

  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, "up" | "down">>({});
  
  useEffect(() => {
    try {
      const raw = localStorage.getItem("faq-feedback");
      if (raw) setFeedback(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("faq-feedback", JSON.stringify(feedback));
    } catch {}
  }, [feedback]);

  const [scrollPct, setScrollPct] = useState(0);
  const [spyCat, setSpyCat] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredCats = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = activeCat === "all" ? CATS : CATS.filter((c) => c.id === activeCat);
    if (!q) return list;
    return list
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [query, activeCat, CATS]);

  const matchedCount = filteredCats.reduce((n, c) => n + c.items.length, 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100;
      setScrollPct(Math.min(100, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = filteredCats
      .map((c) => document.getElementById(`cat-${c.id}`))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setSpyCat(visible.target.id.replace("cat-", ""));
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filteredCats]);

  const clearAll = () => {
    setQuery("");
    setActiveCat("all");
  };

  const selectCat = (id: string) => {
    setActiveCat(id);
    if (id === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(`cat-${id}`);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  };

  return (
    <div className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent print:hidden"
      >
        <div
          className="h-full origin-left transition-[width] duration-100"
          style={{
            width: `${scrollPct}%`,
            background:
              "linear-gradient(90deg, var(--brand-primary), var(--brand-secondary, var(--brand-primary)))",
          }}
        />
      </div>

      <a href="#main" className="skip-to-content">
        {t("navigation.skipToContent")}
      </a>
      <SiteHeader transparentOverHero />

      <main id="main">
        {/* Hero */}
        <section
          className="relative isolate overflow-hidden"
          style={{
            background:
              "radial-gradient(1200px 640px at 88% -10%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(900px 500px at -10% 100%, color-mix(in oklch, var(--brand-secondary), transparent 78%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 95%), #ffffff)",
          }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute -top-24 left-1/4 h-72 w-72 rounded-full blur-3xl opacity-40 animate-[pulse_8s_ease-in-out_infinite]"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklch, var(--brand-primary), transparent 55%), transparent)",
              }}
            />
            <div
              className="absolute right-[10%] top-1/3 h-64 w-64 rounded-full blur-3xl opacity-40 animate-[pulse_10s_ease-in-out_infinite_1s]"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklch, var(--brand-secondary), transparent 55%), transparent)",
              }}
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {t("hero.badge", { totalCount })}
              </div>

              <h1 className="mt-6 text-balance text-[2.25rem] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                {t("hero.heading")}
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
                {t("hero.subheading")}
              </p>

              <div className="mx-auto mt-8 max-w-xl">
                <label htmlFor="faq-search" className="sr-only">
                  {t("hero.search.label")}
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="faq-search"
                    ref={searchRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("hero.search.placeholder")}
                    aria-describedby="faq-search-hint"
                    className="h-12 w-full rounded-full border border-border bg-background/80 pl-11 pr-20 text-sm shadow-sm outline-none backdrop-blur transition-colors placeholder:text-muted-foreground focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/30 sm:h-14 sm:text-base"
                  />
                  <kbd
                    id="faq-search-hint"
                    className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-background/80 px-2 py-1 text-[10px] font-semibold text-muted-foreground sm:inline-flex"
                  >
                    <Command className="h-3 w-3" /> K
                  </kbd>
                </div>
                <p className="mt-3 text-xs text-muted-foreground" aria-live="polite">
                  {query
                    ? t("hero.search.results", { count: matchedCount, query })
                    : t("hero.search.hint")}
                </p>
              </div>

              <dl className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4 sm:gap-8">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="text-center">
                    <dt className="sr-only">{t(`hero.stats.${i}.label`)}</dt>
                    <dd className="text-2xl font-black leading-none sm:text-3xl">{t(`hero.stats.${i}.value`)}</dd>
                    <p className="mt-1.5 text-[11px] font-medium text-muted-foreground sm:text-xs">
                      {t(`hero.stats.${i}.label`)}
                    </p>
                  </div>
                ))}
              </dl>
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

        {!query && activeCat === "all" && popularFaqs.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8 print:hidden">
            <div className="mb-5 flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <Flame className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  {t("popular.badge")}
                </p>
                <h2 className="text-lg font-black">{t("popular.heading")}</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {popularFaqs.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveCat("all");
                    setOpenKey(f.key);
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        const el = document.getElementById(`panel-${f.key}`);
                        const target = el?.closest("li") ?? document.getElementById(`cat-${f.cat.id}`);
                        if (!target) return;
                        const y = target.getBoundingClientRect().top + window.scrollY - 96;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      });
                    });
                  }}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_var(--cat)]"
                  style={{ ...hueStyle(f.cat.hue), borderColor: "var(--cat-border)" }}
                >
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: "var(--cat-soft)", color: "var(--cat)" }}
                  >
                    <f.cat.icon className="h-3 w-3" /> {f.cat.short}
                  </span>
                  <p className="mt-3 text-sm font-bold text-foreground group-hover:text-[color:var(--cat)]">
                    {f.q}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Filter bar */}
        <section className="sticky top-0 z-40 border-y border-border/60 bg-background/85 backdrop-blur print:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <HelpCircle className="h-3.5 w-3.5" /> {t("navigation.browseByTopic")}
                </span>
                <span className="tabular-nums text-muted-foreground/70">
                  {matchedCount}/{totalCount}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <TopicChip active={activeCat === "all"} onClick={() => selectCat("all")}>
                  <HelpCircle className="h-3.5 w-3.5" /> {t("navigation.all")}
                  <span className="ml-1 tabular-nums opacity-70">{totalCount}</span>
                </TopicChip>
                {CATS.map((c) => (
                  <TopicChip
                    key={c.id}
                    hue={c.hue}
                    active={c.id === activeCat}
                    onClick={() => selectCat(c.id)}
                  >
                    <c.icon className="h-3.5 w-3.5" /> {c.short}
                    <span className="ml-1 tabular-nums opacity-70">{c.items.length}</span>
                  </TopicChip>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="hidden lg:block print:hidden">
              <nav
                aria-label="Jump to category"
                className="sticky top-28 max-h-[calc(100dvh-8rem)] overflow-auto pr-2"
              >
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  {t("navigation.onThisPage")}
                </p>
                <ul className="space-y-1">
                  {filteredCats.map((c) => {
                    const active = spyCat === c.id;
                    return (
                      <li key={c.id} style={hueStyle(c.hue)}>
                        <a
                          href={`#cat-${c.id}`}
                          className={`group flex items-center gap-2 rounded-lg border-l-2 py-2 pl-3 pr-2 text-sm transition-colors ${
                            active
                              ? "border-[color:var(--cat)] bg-[color:var(--cat-soft)] font-bold text-foreground"
                              : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                          }`}
                        >
                          <c.icon className="h-3.5 w-3.5" style={{ color: "var(--cat)" }} />
                          <span className="truncate">{c.short}</span>
                          <span className="ml-auto text-[10px] tabular-nums opacity-70">
                            {c.items.length}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            <div className="min-w-0">
              {filteredCats.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center">
                  <p className="text-xl font-black">{t("searchNoResults.heading")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("searchNoResults.subheading")}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {(t("searchNoResults.suggested", { returnObjects: true }) as string[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:border-brand-primary/50 hover:text-brand-primary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={clearAll}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:border-brand-primary/50 hover:text-brand-primary"
                    >
                      {t("navigation.clearFilters")}
                    </button>
                    <Link
                      to="/contact"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-brand-primary-foreground"
                    >
                      {t("navigation.askUs")} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-14">
                  {filteredCats.map((cat) => (
                    <div key={cat.id} className="animate-fade-in">
                      <div id={`cat-${cat.id}`} style={hueStyle(cat.hue)} className="scroll-mt-28">
                        <header className="mb-6 flex items-start gap-4">
                          <span
                            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                            style={{ background: "var(--cat-soft)", color: "var(--cat)" }}
                          >
                            <cat.icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                              {cat.title}
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">{cat.intro}</p>
                          </div>
                        </header>

                        <ul
                          className="divide-y overflow-hidden rounded-3xl border bg-card shadow-sm print:break-inside-avoid"
                          style={{ borderColor: "var(--cat-border)" }}
                        >
                          {cat.items.map((it, i) => {
                            const key = `${cat.id}:${i}`;
                            const isOpen = openKey === key;
                            const panelId = `panel-${key}`;
                            const fb = feedback[key];
                            return (
                              <li
                                key={key}
                                itemScope
                                itemProp="mainEntity"
                                itemType="https://schema.org/Question"
                                className="border-[color:var(--cat-border)] [&+li]:border-t"
                              >
                                <button
                                  type="button"
                                  onClick={() => setOpenKey(isOpen ? null : key)}
                                  aria-expanded={isOpen}
                                  aria-controls={panelId}
                                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[color:var(--cat-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cat)] focus-visible:ring-inset sm:gap-6 sm:px-7"
                                >
                                  <span
                                    itemProp="name"
                                    className="text-[15px] font-bold text-foreground sm:text-lg"
                                  >
                                    {highlight(it.q, query)}
                                  </span>
                                  <span
                                    className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                                      isOpen ? "rotate-45" : ""
                                    }`}
                                    style={{
                                      background: isOpen ? "var(--cat)" : "var(--cat-soft)",
                                      color: isOpen ? "white" : "var(--cat)",
                                    }}
                                    aria-hidden
                                  >
                                    <Plus className="h-4 w-4" />
                                  </span>
                                </button>
                                <div
                                  id={panelId}
                                  itemScope
                                  itemProp="acceptedAnswer"
                                  itemType="https://schema.org/Answer"
                                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                  } print:!grid-rows-[1fr] print:!opacity-100`}
                                >
                                  <div className="overflow-hidden">
                                    <div className="px-5 pb-6 sm:px-7">
                                      <p
                                        itemProp="text"
                                        className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                                      >
                                        {highlight(it.a, query)}
                                      </p>

                                      {it.cta && (
                                        <Link
                                          to={it.cta.to}
                                          className="mt-4 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-[color:var(--cat-soft)]"
                                          style={{
                                            borderColor: "var(--cat-border)",
                                            color: "var(--cat)",
                                          }}
                                        >
                                          {it.cta.label}
                                          <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                      )}

                                      <div className="mt-5 flex items-center gap-3 border-t border-dashed border-border/60 pt-4 print:hidden">
                                        {fb ? (
                                          <p className="text-xs text-muted-foreground">
                                            {fb === "up" ? t("feedback.success") : t("feedback.clarify")}
                                          </p>
                                        ) : (
                                          <>
                                            <span className="text-xs text-muted-foreground">
                                              {t("feedback.question")}
                                            </span>
                                            <button
                                              type="button"
                                              aria-label={t("feedback.ariaHelpful")}
                                              onClick={() =>
                                                setFeedback((f) => ({ ...f, [key]: "up" }))
                                              }
                                              className="grid h-8 w-8 place-items-center rounded-full border border-border transition-colors hover:border-[color:var(--cat)] hover:text-[color:var(--cat)]"
                                            >
                                              <ThumbsUp className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                              type="button"
                                              aria-label={t("feedback.ariaNotHelpful")}
                                              onClick={() =>
                                                setFeedback((f) => ({ ...f, [key]: "down" }))
                                              }
                                              className="grid h-8 w-8 place-items-center rounded-full border border-border transition-colors hover:border-destructive hover:text-destructive"
                                            >
                                              <ThumbsDown className="h-3.5 w-3.5" />
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Still have questions CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
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
                  <MessageCircle className="h-3.5 w-3.5" /> {t("cta.badge")}
                </div>
                <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl">
                  {t("cta.heading")}
                </h2>
                <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
                  {t("cta.subheading")}
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
                  {t("cta.buttons.contact")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-background/70 px-7 py-3.5 text-sm font-semibold text-brand-primary backdrop-blur transition-colors hover:bg-brand-primary/5"
                >
                  <PhoneCall className="h-4 w-4" /> {t("cta.buttons.audit")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related shortcuts */}
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 print:hidden">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
              {t("related.badge")}
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              {t("related.heading")}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { to: "/dermatology-website-checklists", icon: FileCheck, hue: 180 },
              { to: "/plan-packages-and-costs", icon: Rocket, hue: 35 },
              { to: "/contact", icon: Gauge, hue: 205 },
              { to: "/our-process", icon: Smartphone, hue: 315 },
            ].map((c, i) => (
              <Link
                key={c.to}
                to={c.to}
                className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_var(--cat)]"
                style={{ ...hueStyle(c.hue), borderColor: "var(--cat-border)" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-70 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(closest-side, color-mix(in oklch, var(--cat), transparent 65%), transparent)",
                  }}
                />
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={{ background: "var(--cat-soft)", color: "var(--cat)" }}
                >
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-black">{t(`related.items.${i}.title`)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(`related.items.${i}.desc`)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold" style={{ color: "var(--cat)" }}>
                  {t(`related.items.${i}.link`)} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footerLinks.text")}{" "}
          <Link to="/contact" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.auditLink")}</Link>,{" "}
          <Link to="/case-studies" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.caseStudiesLink")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/plan-packages-and-costs" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.pricingLink")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}

function TopicChip({
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
