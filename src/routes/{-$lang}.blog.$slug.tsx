import { finalizeSeoHead } from "@/lib/seo-head";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { localizedUrl, buildHreflangLinks } from "@/lib/i18n-routing";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { POSTS, toneMap, type Post } from "@/lib/blog-data";
import { blogCategoryLabel, findLocalizedPost, relatedLocalizedPosts } from "@/lib/blog-i18n";
import { resolveRouteLanguage } from "@/lib/i18n-routing";
import { formatLocalizedNumber } from "@/lib/locale-format";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Quote,
  Sparkles,
  Tag,
  Twitter,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { fromArabicDigits } from "@/lib/text-normalize";
import { robotsContent } from "@/lib/index-allowlist";

export const Route = createFileRoute("/{-$lang}/blog/$slug")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang, slug: fromArabicDigits(raw.slug ?? "") };
    },
    stringify: (parsed: { lang?: string; slug: string }) => ({
      lang: parsed.lang ?? "",
      slug: fromArabicDigits(parsed.slug),
    }),
  },

  loader: ({ params }): { post: Post } => {
    const lang = resolveRouteLanguage(params.lang);
    const post = findLocalizedPost(lang, params.slug);
    if (!post) throw notFound();
    return { post };
  },

  head: (args) => finalizeSeoHead((({ loaderData, params }: typeof args) => {
    const lang = params.lang as string;
    const st = getStaticTranslation(lang, "blogPost");

    if (!loaderData) {
      return {
        meta: [
          { title: st?.meta?.notFoundTitle ?? "Article not found — DermGrowth Blog" },
          { name: "robots", content: "noindex,follow" },
        ],
      };
    }
    const { post } = loaderData;
    const url = `/blog/${params.slug}`;
    return {
      meta: [
        { title: post.slug === "dermatology-marketing-strategies" ? post.seoTitle ?? post.title : `${post.title} | DWD` },
        { name: "description", content: post.excerpt },
        {
          name: "keywords",
          content: st?.meta?.keywordsTemplate
            ? st.meta.keywordsTemplate.replace("{{category}}", post.category.toLowerCase()).replace("{{title}}", post.title.toLowerCase())
            : `${post.category.toLowerCase()}, dermatology marketing, ${post.title.toLowerCase()}`,
        },
        { name: "author", content: post.author },
        { name: "robots", content: robotsContent(params.lang, `/blog/${params.slug}`) },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: st?.meta?.ogType ?? "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: post.image },
        { property: "article:published_time", content: post.dateISO },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: post.image },
      ],
      links: [
        { rel: "canonical", href: localizedUrl(resolveRouteLanguage(params.lang), url) },
        ...buildHreflangLinks(url, params.lang),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: st?.breadcrumb?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
              { "@type": "ListItem", position: 2, name: st?.breadcrumb?.blog ?? "Blog", item: localizedUrl(resolveRouteLanguage(params.lang), "/blog") },
              { "@type": "ListItem", position: 3, name: post.title, item: localizedUrl(resolveRouteLanguage(params.lang), url) },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.dateISO,
            dateModified: post.dateISO,
            inLanguage: lang,
            articleSection: post.category,
            author: { "@type": "Person", name: post.author, jobTitle: post.authorRole },
            publisher: {
              "@type": "Organization",
              name: st?.meta?.publisherName ?? "DermGrowth",
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          }),
        },
        ...(post.faqs && post.faqs.length > 0
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: post.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  })(args), args.params.lang, `/blog/${args.params.slug}`),
  component: BlogPostPage,
  notFoundComponent: PostNotFound,
});

function PostNotFound() {
  const { t } = useTranslation("blogPost");
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-primary">{t("notFound.code")}</span>
        <h1 className="mt-4 text-5xl font-black tracking-tight">{t("notFound.title")}</h1>
        <p className="mt-4 text-muted-foreground">
          {t("notFound.description")}
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> {t("notFound.backButton")}
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function BlogPostPage() {
  const { t } = useTranslation("blogPost");
  const params = Route.useParams();
  const lang = resolveRouteLanguage(params.lang);
  const { post } = Route.useLoaderData() as { post: Post };
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  const related = relatedLocalizedPosts(lang, post.slug, post.category);
  const tone = toneMap[post.tone];
  const categoryLabel = blogCategoryLabel(post.category, lang);

  return (
    <div className="relative min-h-dvh overflow-x-clip bg-background text-foreground">
      {/* Reading progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-brand-primary"
      />

      <SiteHeader />
      <main id="main">
        {/* ================= ARTICLE HEADER ================= */}
        <header className="relative isolate border-b border-border/60">
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
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(50% 60% at 20% 15%, color-mix(in oklch, var(--brand-primary), transparent 88%), transparent 70%), radial-gradient(45% 55% at 85% 90%, color-mix(in oklch, var(--brand-accent), transparent 88%), transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-5xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:pt-28">
            <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <Link to="/blog" className="hover:text-brand-primary">
                {t("header.nav.blog")}
              </Link>
              <ChevronRight aria-hidden className="mx-1.5 inline h-3 w-3 -translate-y-px" />
              <span className="text-brand-primary">{categoryLabel}</span>
            </nav>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="mt-6 font-black tracking-tight text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.04]">
                {post.title}
              </h1>
              <p className="mt-5 text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-border/70 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 place-items-center rounded-full bg-brand-primary text-xs font-black text-brand-primary-foreground"
                  >
                    {post.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold normal-case tracking-normal text-foreground">{post.author}</p>
                    <p className="text-[11px]">{post.authorRole}</p>
                  </div>
                </div>
                <span aria-hidden className="hidden text-border sm:inline">
                  |
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden />
                  <time dateTime={post.dateISO}>{post.date}</time>
                </span>
                <span className="inline-flex items-center gap-1.5 tabular-nums">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {formatLocalizedNumber(post.readTime, lang)} {t("header.meta.readTimeSuffix")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" aria-hidden />
                  {categoryLabel}
                </span>
              </div>
            </motion.div>
          </div>
        </header>

        {/* ================= COVER ================= */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative -mt-2 aspect-[16/9] overflow-hidden rounded-3xl border border-border/70 shadow-[0_32px_80px_-40px_color-mix(in_oklch,var(--brand-primary),transparent_50%)]"
          >
            <img
              src={post.image}
              alt={post.imageAlt}
              width={1200}
              height={800}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className={`absolute inset-0 mix-blend-multiply ${tone.block} opacity-20`}
            />
          </motion.div>
        </div>

        {/* ================= BODY ================= */}
        <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="prose-editorial">
            {post.body.map((block, i) => {
              if (block.heading) {
                const headingNumber = post.body.slice(0, i + 1).filter((item) => item.heading).length;
                const headingText = block.heading.replace(/^\d+\.\s*/, "");
                return (
                  <h2
                    key={i}
                    className="mt-12 text-3xl font-black tracking-tight sm:text-4xl"
                  >
                    <span className="mr-2 text-brand-primary tabular-nums">
                      {formatLocalizedNumber(headingNumber, lang, 2)}.
                    </span>
                    {"\u00A0"}
                    {headingText}
                  </h2>
                );
              }
              if (block.link) {
                return <p key={i} className="mt-6 text-lg leading-relaxed text-foreground/90"><Link to={block.link.to} className="font-medium text-brand-primary underline underline-offset-4">{block.link.label}</Link></p>;
              }
              if (block.quote) {
                return (
                  <blockquote
                    key={i}
                    className="my-10 rounded-3xl border-l-4 border-brand-primary bg-muted/50 p-8"
                  >
                    <Quote aria-hidden className="h-8 w-8 text-brand-primary/50" />
                    <p className="mt-3 text-2xl font-black leading-snug tracking-tight text-foreground">
                      {block.quote}
                    </p>
                  </blockquote>
                );
              }
              if (block.list) {
                return (
                  <ul key={i} className="mt-6 space-y-3">
                    {block.list.map((item, j) => (
                      <li key={j} className="flex gap-3 text-lg leading-relaxed text-foreground/90">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="mt-6 text-lg leading-relaxed text-foreground/90">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Share + back */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-8">
            <Link
              to="/blog"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:border-brand-primary/60 hover:text-brand-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden /> {t("actions.allArticles")}
            </Link>
            <SharePost slug={post.slug} title={post.title} />
          </div>
        </article>

        {/* ================= FAQ ================= */}
        {post.faqs && post.faqs.length > 0 && (
          <section
            aria-labelledby="faq-heading"
            className="mx-auto max-w-3xl px-4 pb-8 sm:px-6"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
              {t("faq.badge")}
            </span>
            <h2 id="faq-heading" className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              {t("faq.heading")}
            </h2>
            <dl className="mt-8 divide-y divide-border/70 border-y border-border/70">
              {post.faqs.map((f, i) => (
                <div key={i} className="py-6">
                  <dt className="text-lg font-bold tracking-tight text-foreground">{f.q}</dt>
                  <dd className="mt-3 text-base leading-relaxed text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* ================= RELATED ================= */}
        {related.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="mx-auto mt-20 max-w-7xl px-4 pb-24 sm:px-6 lg:px-10"
          >
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-primary">
                  {t("related.badge")}
                </span>
                <h2 id="related-heading" className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  {t("related.heading", { category: categoryLabel.toLowerCase() })}
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden items-center gap-1 text-sm font-semibold text-brand-primary hover:underline sm:inline-flex"
              >
                {t("related.viewAll")} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const tone = toneMap[r.tone];
                return (
                  <li key={r.slug}>
                    <article
                      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card transition-all hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_color-mix(in_oklch,var(--brand-primary),transparent_55%)] ${tone.ring}`}
                    >
                      <Link
                        to="/blog/$slug"
                        params={{ slug: r.slug }}
                        aria-label={t("related.readLabel", { title: r.title })}
                        className="relative flex aspect-[16/10] items-end overflow-hidden"
                      >
                        <img
                          src={r.image}
                          alt={r.imageAlt}
                          loading="lazy"
                          width={1200}
                          height={800}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <div aria-hidden className={`absolute inset-0 mix-blend-multiply opacity-25 ${tone.block}`} />
                        <span className="relative m-5 rounded-full bg-background/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
                          {blogCategoryLabel(r.category, lang)}
                        </span>
                      </Link>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" aria-hidden />
                          <time dateTime={r.dateISO}>{r.date}</time>
                          <span aria-hidden>·</span>
                          <span className="tabular-nums">{formatLocalizedNumber(r.readTime, lang)} {t("related.readTimeSuffix")}</span>
                        </div>
                        <h3 className="mt-3 text-xl font-black leading-snug tracking-tight">
                          <Link to="/blog/$slug" params={{ slug: r.slug }} className="hover:text-brand-primary">
                            {r.title}
                          </Link>
                        </h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {r.excerpt}
                        </p>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footerCta.prefix")}{" "}
          <Link to="/blog" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerCta.moreArticles")}</Link>,{" "}
          <Link to="/case-studies" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerCta.caseStudies")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/contact" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerCta.freeAudit")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}

function TumblrIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14.5 22c-3.6 0-6.3-1.9-6.3-6.3V9.9H5.7V6.7c3-.8 4.2-3.4 4.4-5.7h3.1v5.2h4.4v3.7h-4.4v5c0 1.9.9 2.5 2.4 2.5h2.1V22h-3.2z" />
    </svg>
  );
}

function SharePost({ slug, title }: { slug: string; title: string }) {
  const { t: translate } = useTranslation("blogPost");
  const path = `/blog/${slug}`;
  const url = `https://www.dermatologywebsitedesign.com${path}`;
  const shareTitle = encodeURIComponent(title);
  const u = encodeURIComponent(url);

  const platforms = [
    { label: translate("actions.shareOnFacebook"), href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: <Facebook className="h-4 w-4" aria-hidden /> },
    { label: translate("actions.shareOnX"), href: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${u}`, icon: <Twitter className="h-4 w-4" aria-hidden /> },
    { label: translate("actions.shareOnLinkedIn"), href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <Linkedin className="h-4 w-4" aria-hidden /> },
    { label: translate("actions.shareOnTumblr"), href: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${u}&title=${shareTitle}`, icon: <TumblrIcon className="h-4 w-4" /> },
    { label: translate("actions.openInstagram"), href: "https://www.instagram.com/dermatologywebsitedesign/", icon: <Instagram className="h-4 w-4" aria-hidden /> },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {translate("actions.share")}
      </span>
      {platforms.map((p) => (
        <a
          key={p.label}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.label}
          title={p.label}
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-foreground transition-all hover:-translate-y-0.5 hover:border-brand-primary/60 hover:text-brand-primary"
        >
          {p.icon}
        </a>
      ))}
    </div>
  );
}

// Sitemap-friendly: register all known slugs so TS route tree includes them
export const _knownSlugs = POSTS.map((p) => p.slug);
