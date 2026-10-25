import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage, SITE_ORIGIN } from "@/lib/i18n-routing";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { ServicesSection } from "@/components/sections/services-section";
import { PricingTeaserSection } from "@/components/sections/pricing-teaser-section";
import { OurApproachSection } from "@/components/sections/our-approach-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { WhySwitchSection } from "@/components/sections/why-switch-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FreeAuditCtaSection } from "@/components/sections/free-audit-cta-section";
import { FaqSnippetSection } from "@/components/sections/faq-snippet-section";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { CountUp } from "@/components/count-up";
import {
  ArrowRight,
  ShieldCheck,
  Accessibility,
  Lock,
  Search,
  Smartphone,
  Gauge,
  Rocket,
  Target,
  BarChart3,
} from "lucide-react";
import heroComposition from "@/assets/hero-composition.webp.asset.json";
import { isValidUrlLang } from "@/i18n/languages";
import { getStaticTranslation } from "@/i18n";
import { LocalLink } from "@/components/local-link";
import { robotsContent } from "@/lib/index-allowlist";


export const Route = createFileRoute("/{-$lang}/")({
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
    const canonical = localizedUrl(resolveRouteLanguage(params.lang), "/");
    const t = getStaticTranslation(lang, "home");
    const title = t?.meta?.title ?? "Dermatology Website Design | HIPAA-Aware, SEO-Ready Websites";
    const description = t?.meta?.description ?? "Dermatology website design agency building HIPAA-aware, SEO-optimized websites for dermatology practices. Transparent pricing. Free audit.";
    const ogImage = `${SITE_ORIGIN}${heroComposition.url}`;
    const orgDesc = t?.meta?.orgDescription ?? description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
        { property: "og:locale", content: lang },
        { name: "robots", content: robotsContent(params.lang, "/") },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { property: "og:image", content: ogImage },
        { name: "twitter:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: canonical },
        ...buildHreflangLinks("/", params.lang),
        { rel: "preload", as: "image", href: heroComposition.url, fetchpriority: "high" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Dermatology Website Design",
            url: canonical,
            description: orgDesc,
            logo: "/favicon.ico",
          }),
        },
      ],
    };
  },
  component: Index,
});

const trustItemsBase = [
  { key: "hipaa", icon: ShieldCheck },
  { key: "ada", icon: Accessibility },
  { key: "ssl", icon: Lock },
  { key: "seo", icon: Search },
  { key: "mobile", icon: Smartphone },
  { key: "speed", icon: Gauge },
];

/*
 * SITE-WIDE CONSISTENCY VALUES (keep these identical in every locale JSON, FAQ, form and JSON-LD):
 *   - Free audit turnaround: "within 48 hours"
 *   - Typical build timeline: "4 to 6 weeks"
 *   - Pricing: packages start at $797 (see /plan-packages-and-costs)
 * TODO(owner): confirm these three values; search the en locale files to change them in one pass.
 * TODO(owner): verify the "50+" practices stat below.
 */
const statsBase = [
  { key: "websites", icon: Rocket, value: "50+" },
  { key: "niche", icon: Target, value: "100%" },
  { key: "lighthouse", icon: BarChart3, value: "95+" },
];

function Index() {
  const { lang: rawLang } = Route.useParams();
  const lang = resolveRouteLanguage(rawLang);
  const { t, i18n } = useTranslation("home");
  useEffect(() => {
    if (i18n.resolvedLanguage !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <div className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <a href="#main" className="skip-to-content">{t("skip")}</a>
      <ScrollProgress />
      <SiteHeader transparentOverHero />
      <main id="main">
        <section
          className="animate-hero-wash relative isolate overflow-hidden"
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

          <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-12 lg:pt-24">
            <div className="grid items-center gap-12 lg:grid-cols-[56fr_44fr] lg:gap-5 xl:grid-cols-[58fr_42fr] xl:gap-8">
              {/* LEFT */}
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {t("hero.badge")} <span className="text-base leading-none opacity-60">·</span> {t("hero.badgeSecondary")}
                </div>

                <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3rem] xl:text-[3.5rem] 2xl:text-6xl">
                  {t("hero.headline")}{" "}
                  <span className="text-brand-primary">{t("hero.headlineAccent")}</span>
                </h1>

                <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                  {t("hero.subhead")}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <LocalLink
                    to="/get-a-free-quote"
                    className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))" }}
                  >
                    {t("hero.ctaPrimary")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </LocalLink>
                  <LocalLink
                    to="/free-dermatologist-website-audit"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-background/60 px-7 py-3.5 text-sm font-semibold text-brand-primary backdrop-blur transition-colors hover:bg-brand-primary/5"
                  >
                    {t("hero.ctaSecondary")}
                  </LocalLink>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-10 xl:w-[720px] xl:max-w-[calc(100vw-4rem)]">
                  {statsBase.map((s) => (
                    <div key={s.key} className="flex flex-col items-start gap-2 sm:flex-row sm:items-start sm:gap-4">
                      <div className="hidden sm:grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary sm:h-12 sm:w-12">
                        <s.icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg font-bold leading-none text-foreground sm:text-[1.65rem]"><CountUp value={s.value} /></p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground sm:text-xs">{t(`stats.${s.key}.label`)}</p>
                        <p className="text-[11px] text-muted-foreground sm:text-xs">{t(`stats.${s.key}.sub`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — single hero composition image */}
              <div className="relative min-w-0 w-full md:flex md:justify-center xl:-mt-4 xl:justify-end">
                <img
                  src={heroComposition.url}
                  alt={t("hero.heroImageAlt")}
                  width={1200}
                  height={900}
                  fetchPriority="high"
                  decoding="async"
                  className="mx-auto block h-auto w-full max-w-full select-none object-contain md:max-w-[760px] lg:mx-0 lg:max-w-none lg:origin-right xl:-translate-y-2 xl:scale-[1.08]"
                  draggable={false}
                />

              </div>
            </div>
          </div>


          {/* Trust strip */}
          <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-y-4 rounded-2xl border border-border/60 bg-card/80 px-4 py-5 shadow-sm backdrop-blur sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6">
              {trustItemsBase.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-tight text-foreground sm:text-sm">{t(`trust.${item.key}.label`)}</p>
                    <p className="text-[10px] leading-tight text-muted-foreground sm:text-xs">{t(`trust.${item.key}.note`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Reveal variant="fade-up"><ServicesSection /></Reveal>
        <Reveal variant="scale"><PricingTeaserSection /></Reveal>
        <OurApproachSection />
        <Reveal variant="fade-up"><WhyChooseUsSection /></Reveal>
        <Reveal variant="fade-up"><WhySwitchSection /></Reveal>
        <Reveal variant="fade"><TestimonialsSection /></Reveal>
        <Reveal variant="scale"><FreeAuditCtaSection /></Reveal>
        <Reveal variant="fade-up"><FaqSnippetSection /></Reveal>


      </main>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footer.startPrefix")}{" "}
          <LocalLink to="/blog/dermatology-marketing-strategies" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.guideLink")}</LocalLink>{t("footer.sep1")}{" "}
          <LocalLink to="/case-studies" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.caseStudiesLink")}</LocalLink>{t("footer.sep2")}{" "}
          <LocalLink to="/free-dermatologist-website-audit" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer.auditLink")}</LocalLink>{t("footer.suffix")}
        </p>

      <SiteFooter />
    </div>
  );
}

