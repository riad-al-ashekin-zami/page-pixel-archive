import { useMemo, useState } from "react";
import { useForm as useFormspree } from "@formspree/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { CATEGORIES, POSTS, toneMap, type Category } from "@/lib/blog-data";
import { blogCategoryLabel, localizedPosts } from "@/lib/blog-i18n";
import { useCurrentLang } from "@/lib/i18n-routing";
import { formatLocalizedNumber } from "@/lib/locale-format";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Mail,
  Search,
  Sparkles,
  TrendingUp,
  Star,
  Tag,
  ChevronRight,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage } from "@/lib/i18n-routing";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { robotsContent } from "@/lib/index-allowlist";

// ---------- SEO ----------
export const Route = createFileRoute("/{-$lang}/blog/")({
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
    const st = getStaticTranslation(resolveRouteLanguage(params.lang), "blogIndex");
    return {
      meta: [
        { title: st?.meta?.title ?? "Blog — Dermatology Marketing Insights & Growth Playbooks" },
        {
          name: "description",
          content: st?.meta?.description ?? "Practical playbooks on dermatology SEO, website design, patient acquisition, HIPAA, reviews, and paid ads — written for growth-minded practice owners.",
        },
        { name: "keywords", content: st?.meta?.keywords ?? "dermatology blog, dermatology SEO, dermatology marketing, practice growth, HIPAA websites" },
        { name: "robots", content: robotsContent(params.lang, "/blog") },
        { property: "og:title", content: st?.meta?.og?.title ?? "Dermatology Marketing Blog — Playbooks that Grow Practices" },
        {
          property: "og:description",
          content: st?.meta?.og?.description ?? "Deep-dive articles and quick-read tactics for dermatology practices. SEO, design, ads, reputation, and patient experience.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/blog" },
        { property: "og:image", content: POSTS.find((p) => p.featured)?.image ?? POSTS[0].image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: st?.meta?.twitter?.title ?? "Dermatology Marketing Blog" },
        {
          name: "twitter:description",
          content: st?.meta?.twitter?.description ?? "SEO, design, ads, and patient experience playbooks for dermatology practices.",
        },
        { name: "twitter:image", content: POSTS.find((p) => p.featured)?.image ?? POSTS[0].image },
      ],
      links: [{ rel: "canonical", href: "/blog" }, ...buildHreflangLinks("/blog", params.lang)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: st?.meta?.jsonLd?.breadcrumb?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
              { "@type": "ListItem", position: 2, name: st?.meta?.jsonLd?.breadcrumb?.blog ?? "Blog", item: localizedUrl(resolveRouteLanguage(params.lang), "/blog") },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: st?.meta?.jsonLd?.blog?.name ?? "Dermatology Marketing Blog",
            description: st?.meta?.jsonLd?.blog?.description ?? "Playbooks and insights on dermatology SEO, website design, ads, reputation, and patient acquisition.",
            inLanguage: "en-US",
            blogPost: POSTS.slice(0, 5).map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              datePublished: p.dateISO,
              author: { "@type": "Person", name: p.author },
            })),
          }),
        },
      ],
    };
  },
  component: BlogPage,
});

// ---------- Page ----------
function BlogPage() {
  const { t } = useTranslation("blogIndex");
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [nlState, nlSubmit] = useFormspree("xpqvpwro");
  const subscribed = nlState.succeeded;
  const reduce = useReducedMotion();

  const lang = useCurrentLang();
  const localized = useMemo(() => localizedPosts(lang), [lang]);
  const featured = localized.find((p) => p.featured)!;
  const rest = useMemo(() => localized.filter((p) => !p.featured), [localized]);

  const counts = useMemo(() => {
    const map = new Map<Category, number>();
    map.set("All", rest.length);
    for (const p of rest) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, [rest]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rest.filter((p) => {
      const inCat = category === "All" || p.category === category;
      const inQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        blogCategoryLabel(p.category, lang).toLowerCase().includes(q);
      return inCat && inQ;
    });
  }, [category, lang, query, rest]);

  return (
    <div className="relative min-h-dvh overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <main id="main">
        {/* ================= HERO ================= */}
        <section aria-labelledby="blog-hero-title" className="relative isolate border-b border-border/60">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 animate-hero-wash"
            style={{
              background:
                "radial-gradient(60% 60% at 15% 10%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 70%), radial-gradient(50% 50% at 90% 85%, color-mix(in oklch, var(--brand-accent), transparent 85%), transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-10 lg:pt-28">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  {t("hero.badge")}
                </div>
                <h1
                  id="blog-hero-title"
                  className="mt-5 font-black tracking-tight leading-[1.05] text-[2rem] sm:text-4xl lg:text-[2.5rem] xl:text-[2.875rem]"
                >
                  {t("hero.title")}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {t("hero.description")}
                </p>

                <form
                  role="search"
                  aria-label={t("hero.search.label")}
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-8 flex max-w-lg items-center gap-2 rounded-full border border-border/80 bg-background/80 px-2 py-2 shadow-[0_16px_48px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_60%)] backdrop-blur focus-within:border-brand-primary/60"
                >
                  <label htmlFor="blog-search" className="sr-only">
                    {t("hero.search.label")}
                  </label>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <Search className="h-4 w-4" aria-hidden />
                  </span>
                  <input
                    id="blog-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("hero.search.placeholder")}
                    className="flex-1 bg-transparent px-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <span className="hidden shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:inline-block">
                    {t("hero.search.postCount", { count: POSTS.length })}
                  </span>
                </form>
              </motion.div>

              <motion.aside
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                aria-label={t("hero.aside.ariaLabel")}
                className="relative rounded-3xl border border-border/70 bg-card/80 p-6 shadow-[0_24px_60px_-32px_color-mix(in_oklch,var(--brand-primary),transparent_60%)] backdrop-blur sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    {t("hero.aside.issue")}
                  </span>
                  <TrendingUp className="h-4 w-4 text-brand-primary" aria-hidden />
                </div>
                <p className="mt-4 text-2xl font-black leading-snug tracking-tight">
                  {t("hero.aside.status")}
                </p>
                <dl className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { k: t("hero.aside.stats.0.value"), v: t("hero.aside.stats.0.label") },
                    { k: t("hero.aside.stats.1.value"), v: t("hero.aside.stats.1.label") },
                    { k: t("hero.aside.stats.2.value"), v: t("hero.aside.stats.2.label") },
                  ].map((s) => (
                    <div key={s.v} className="rounded-2xl bg-background/60 p-3 text-center ring-1 ring-border/60">
                      <dt className="text-2xl font-black tabular-nums tracking-tight text-brand-primary">
                        {s.k}
                      </dt>
                      <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-brand-accent text-brand-accent" aria-hidden />
                  <span>{t("hero.aside.socialProof")}</span>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* ================= FEATURED ================= */}
        <section aria-labelledby="featured-heading" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
                {t("sections.featured.badge")}
              </span>
              <h2 id="featured-heading" className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                {t("sections.featured.heading")}
              </h2>
            </div>
            <a
              href="#latest"
              className="hidden items-center gap-1 text-sm font-semibold text-brand-primary hover:underline sm:inline-flex"
            >
              {t("sections.featured.viewAll")} <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <motion.article
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_32px_80px_-40px_color-mix(in_oklch,var(--brand-primary),transparent_50%)]"
          >
            <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                aria-label={t("sections.featured.ariaRead", { title: featured.title })}
                className="relative aspect-[16/11] overflow-hidden lg:aspect-auto"
              >
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  width={1200}
                  height={800}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-tr from-brand-primary/70 via-brand-primary/20 to-transparent"
                />
                <div className="relative flex h-full items-end p-8 text-brand-primary-foreground sm:p-12">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                      <Tag className="h-3 w-3" aria-hidden /> {blogCategoryLabel(featured.category, lang)}
                    </span>
                    <p className="mt-6 text-6xl font-black leading-[0.98] tabular-nums tracking-tight sm:text-7xl">
                      {t("sections.featured.statValue")}
                    </p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary-foreground/85">
                      {t("sections.featured.statLabel")}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex flex-col justify-between gap-8 p-8 sm:p-12">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" aria-hidden />{" "}
                      <time dateTime={featured.dateISO}>{featured.date}</time>
                    </span>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <Clock className="h-3.5 w-3.5" aria-hidden /> {t("sections.featured.readTime", { count: formatLocalizedNumber(featured.readTime, lang) })}
                    </span>
                  </div>
                  <h3 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: featured.slug }}
                      className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]"
                    >
                      {featured.title}
                    </Link>
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-6">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid h-11 w-11 place-items-center rounded-full bg-brand-primary text-sm font-black text-brand-primary-foreground"
                    >
                      {featured.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{featured.author}</p>
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{featured.authorRole}</p>
                    </div>
                  </div>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featured.slug }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]"
                  >
                    {t("sections.featured.button")} <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </section>

        {/* ================= CATEGORY + GRID ================= */}
        <section
          id="latest"
          aria-labelledby="latest-heading"
          className="border-y border-border/60 bg-muted/30 scroll-mt-24"
        >
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
                  {t("sections.latest.badge")}
                </span>
                <h2 id="latest-heading" className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  {t("sections.latest.heading")}
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                {t("sections.latest.description")}
              </p>
            </div>

            {/* Category chips with animated pill */}
            <div
              role="tablist"
              aria-label={t("sections.latest.filterLabel")}
              className="mt-8 flex flex-wrap gap-2"
            >
              {CATEGORIES.map((c) => {
                const active = c === category;
                const count = counts.get(c) ?? 0;
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={active}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "border-brand-primary bg-brand-primary text-brand-primary-foreground shadow-[0_10px_28px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_50%)]"
                        : "border-border bg-background text-foreground hover:border-brand-primary/50 hover:text-brand-primary"
                    }`}
                  >
                    {blogCategoryLabel(c, lang)}
                    <span
                      className={`ms-1.5 tabular-nums text-[11px] font-bold ${active ? "text-brand-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      {formatLocalizedNumber(count, lang)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-12 rounded-3xl border border-dashed border-border bg-background p-10 text-center"
                >
                  <p className="text-2xl font-black">{t("sections.latest.empty.heading")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t("sections.latest.empty.description")}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setCategory("All");
                      setQuery("");
                    }}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:border-brand-primary/60 hover:text-brand-primary"
                  >
                    {t("sections.latest.empty.button")}
                  </button>
                </motion.div>
              ) : (
                <motion.ul
                  key={`${category}-${query}`}
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
                  }}
                  className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filtered.map((p, i) => {
                    const tone = toneMap[p.tone];
                    return (
                      <motion.li
                        key={p.slug}
                        variants={{
                          hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                          },
                        }}
                      >
                        <article
                          className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card transition-all hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_color-mix(in_oklch,var(--brand-primary),transparent_55%)] ${tone.ring}`}
                        >
                          <Link
                            to="/blog/$slug"
                            params={{ slug: p.slug }}
                            aria-label={t("sections.latest.card.ariaRead", { title: p.title })}
                            className="relative flex aspect-[16/10] items-end overflow-hidden"
                          >
                            <img
                              src={p.image}
                              alt={p.imageAlt}
                              loading="lazy"
                              width={1200}
                              height={800}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                            <div
                              aria-hidden
                              className={`absolute inset-0 mix-blend-multiply opacity-25 ${tone.block}`}
                            />
                            <div className="relative flex w-full items-end justify-between p-5">
                              <span className="rounded-full bg-background/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
                                {blogCategoryLabel(p.category, lang)}
                              </span>
                              <span
                                aria-hidden
                                className="text-5xl font-black leading-none tabular-nums tracking-tighter text-brand-primary-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                              >
                                {formatLocalizedNumber(i + 1, lang, 2)}
                              </span>
                            </div>
                          </Link>

                          <div className="flex flex-1 flex-col p-6">
                            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" aria-hidden />
                              <time dateTime={p.dateISO}>{p.date}</time>
                              <span aria-hidden>·</span>
                              <Clock className="h-3.5 w-3.5" aria-hidden />
                              <span className="tabular-nums">{t("sections.latest.card.readTime", { count: formatLocalizedNumber(p.readTime, lang) })}</span>
                            </div>
                            <h3 className="mt-3 text-xl font-black leading-snug tracking-tight">
                              <Link
                                to="/blog/$slug"
                                params={{ slug: p.slug }}
                                className="hover:text-brand-primary"
                              >
                                {p.title}
                              </Link>
                            </h3>
                            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                              {p.excerpt}
                            </p>

                            <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/70 pt-5">
                              <div className="flex min-w-0 items-center gap-2">
                                <span
                                  aria-hidden
                                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-black ${tone.chip}`}
                                >
                                  {p.initials}
                                </span>
                                <span className="truncate text-xs font-semibold">{p.author}</span>
                              </div>
                              <Link
                                to="/blog/$slug"
                                params={{ slug: p.slug }}
                                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-brand-primary hover:underline"
                              >
                                {t("sections.latest.card.readAction")} <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                              </Link>
                            </div>
                          </div>
                        </article>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ================= NEWSLETTER ================= */}
        <section
          aria-labelledby="newsletter-heading"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-8 shadow-[0_32px_80px_-40px_color-mix(in_oklch,var(--brand-primary),transparent_55%)] sm:p-12 lg:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 70%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{ background: "color-mix(in oklch, var(--brand-accent), transparent 70%)" }}
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
                  <Mail className="h-3.5 w-3.5" aria-hidden /> {t("newsletter.badge")}
                </span>
                <h2
                  id="newsletter-heading"
                  className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
                >
                  {t("newsletter.heading")}
                </h2>
                <p className="mt-4 max-w-lg text-base text-muted-foreground">
                  {t("newsletter.description")}
                </p>

                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="status"
                      className="mt-8 inline-flex items-center gap-3 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-5 py-3 text-sm font-semibold text-brand-primary"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-primary text-brand-primary-foreground">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      {t("newsletter.success")}
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={false}
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!newsletterEmail) return;
                        await nlSubmit({
                          email: newsletterEmail,
                          _subject: `Blog newsletter signup — ${newsletterEmail}`,
                        });
                      }}
                      className="mt-8 flex flex-col gap-3 sm:flex-row"
                      aria-label={t("newsletter.ariaLabel")}
                    >
                      <label htmlFor="newsletter-email" className="sr-only">
                        {t("newsletter.placeholder")}
                      </label>
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder={t("newsletter.placeholder")}
                        className="min-h-12 flex-1 rounded-full border border-border bg-background px-5 text-sm placeholder:text-muted-foreground focus:border-brand-primary focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={nlState.submitting}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02] disabled:opacity-70"
                      >
                        {nlState.submitting ? t("newsletter.submitting") : t("newsletter.submit")} <ArrowRight className="h-4 w-4" aria-hidden />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
                <p className="mt-3 text-xs text-muted-foreground">{t("newsletter.fineprint")}</p>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: BookOpen, k: t("newsletter.features.0.label"), v: t("newsletter.features.0.value") },
                  { icon: TrendingUp, k: t("newsletter.features.1.label"), v: t("newsletter.features.1.value") },
                  { icon: Sparkles, k: t("newsletter.features.2.label"), v: t("newsletter.features.2.value") },
                  { icon: Star, k: t("newsletter.features.3.label"), v: t("newsletter.features.3.value") },
                ].map(({ icon: Icon, k, v }) => (
                  <li
                    key={k}
                    className="rounded-2xl border border-border/70 bg-background/60 p-5 backdrop-blur"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <p className="mt-3 text-sm font-bold">{k}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{v}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footer.keepReading")}{" "}
          <Link to="/case-studies" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.caseStudies")}</Link>,{" "}
          <Link to="/free-dermatologist-website-audit" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.audit")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/faq" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.faq")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}
