import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { LocalLink } from "@/components/local-link";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteHeader } from "@/components/site-header/site-header";
import {
  addOnCategories,
  marketingServices,
  websiteServices,
  type NavItem,
} from "@/components/site-header/nav-data";
import { isValidUrlLang } from "@/i18n/languages";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage } from "@/lib/i18n-routing";
import { getStaticTranslation } from "@/i18n";

export const Route = createFileRoute("/{-$lang}/services")({
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
    const canonical = localizedUrl(resolveRouteLanguage(params.lang), "/services");
    const st = getStaticTranslation(lang, "services");
    return {
      meta: [
        { title: st?.meta?.title ?? "Dermatology Website Services — Design, SEO & Growth" },
        {
          name: "description",
          content:
            st?.meta?.description ??
            "Custom dermatology website design, SEO, PPC, social media, reputation and email marketing — a full growth stack for solo and multi-location skin practices.",
        },
        { property: "og:title", content: st?.meta?.ogTitle ?? "Dermatology Website Services — Design, SEO & Growth" },
        {
          property: "og:description",
          content:
            st?.meta?.ogDescription ??
            "Everything a modern dermatology practice needs to grow online: HIPAA-aware websites, SEO, paid ads, social, email and reputation — built for skin and cosmetic clinics.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { property: "og:locale", content: lang },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: canonical }, ...buildHreflangLinks("/services")],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: st?.meta?.schema?.name ?? "Dermatology Website Services",
            serviceType: st?.meta?.schema?.serviceType ?? "",
            provider: { "@type": "Organization", name: st?.meta?.schema?.providerName ?? "" },
            url: canonical,
          }),
        },
      ],
    };
  },
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useTranslation("services");

  const serviceGroups: Array<{
    label: string;
    eyebrow: string;
    description: string;
    items: NavItem[];
  }> = [
    {
      label: t("sections.website.label"),
      eyebrow: t("sections.website.eyebrow"),
      description: t("sections.website.description"),
      items: websiteServices,
    },
    {
      label: t("sections.marketing.label"),
      eyebrow: t("sections.marketing.eyebrow"),
      description: t("sections.marketing.description"),
      items: marketingServices,
    },
    {
      label: t("sections.support.label"),
      eyebrow: t("sections.support.eyebrow"),
      description: t("sections.support.description"),
      items: addOnCategories,
    },
  ];

  const proofPoints = [
    t("hero.proofPoints.hipaa"),
    t("hero.proofPoints.responsive"),
    t("hero.proofPoints.seo"),
    t("hero.proofPoints.conversion"),
  ];

  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground">
      <SiteHeader />
      <main id="main">
        <section
          className="relative isolate overflow-hidden"
          style={{
            background:
              "radial-gradient(980px 520px at 10% -10%, color-mix(in oklch, var(--brand-primary), transparent 80%), transparent 60%), radial-gradient(820px 460px at 100% 10%, color-mix(in oklch, var(--brand-accent), transparent 86%), transparent 62%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%), #ffffff 72%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden /> {t("hero.eyebrow")}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
                {t("hero.description")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LocalLink
                  to="/get-a-free-quote"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_16px_34px_-16px_color-mix(in_oklch,var(--brand-primary),transparent_35%)] transition-transform hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))" }}
                >
                  {t("hero.ctaQuote")} <ArrowRight className="h-4 w-4" aria-hidden />
                </LocalLink>
                <LocalLink
                  to="/plan-packages-and-costs"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-background/70 px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/5"
                >
                  {t("hero.ctaPricing")}
                </LocalLink>
              </div>
            </div>

            <div className="grid content-start gap-3 sm:grid-cols-2 lg:pt-12">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/75 p-4 shadow-sm backdrop-blur">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <CheckCircle2 className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="text-sm font-semibold leading-6 text-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8">
              {serviceGroups.map((group) => (
                <ServiceGroup key={group.label} group={group} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-muted/30 py-14 sm:py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("cta.title")}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {t("cta.description")}
              </p>
            </div>
            <LocalLink
              to="/free-dermatologist-website-audit"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {t("cta.button")} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </LocalLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function ServiceGroup({
  group,
}: {
  group: { label: string; eyebrow: string; description: string; items: NavItem[] };
}) {
  return (
    <section className="grid gap-5 lg:grid-cols-[280px_1fr] lg:gap-8">
      <div className="lg:pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{group.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{group.label}</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.description}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {group.items.map((item) => (
          <li key={`${group.label}-${item.label}-${item.href}`}>
            <ServiceCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ServiceCard({ item }: { item: NavItem }) {
  const Icon = item.icon as LucideIcon | undefined;
  return (
    <LocalLink
      to={item.href}
      className="group flex h-full min-h-40 flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/35 hover:shadow-[0_22px_45px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_50%)]"
    >
      <div className="flex items-start justify-between gap-3">
        {Icon && (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-primary/15 bg-brand-primary/5 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
        )}
        <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-primary opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground group-hover:text-brand-primary">
        {item.label}
      </h3>
      {item.description && <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>}
    </LocalLink>
  );
}
