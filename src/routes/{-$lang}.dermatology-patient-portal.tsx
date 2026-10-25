import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks } from "@/lib/i18n-routing";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal } from "@/components/reveal";
import {
  ArrowRight, CalendarCheck, MessageSquareText, FileText, CreditCard,
  Pill, ClipboardList, Video, ShieldCheck, Smartphone, Bell, Lock,
  Users, Stethoscope, Plus, Minus, Sparkles, CheckCircle2, Zap,
  type LucideIcon,
} from "lucide-react";
import heroBg from "@/assets/patient-portal-hero.jpg";
import { isValidUrlLang } from "@/i18n/languages";

type Feature = { icon: LucideIcon; title: string; desc: string };

const CORE_FEATURES: Feature[] = [
  { icon: CalendarCheck, title: "sections.core_features.items.0.title", desc: "sections.core_features.items.0.desc" },
  { icon: MessageSquareText, title: "sections.core_features.items.1.title", desc: "sections.core_features.items.1.desc" },
  { icon: FileText, title: "sections.core_features.items.2.title", desc: "sections.core_features.items.2.desc" },
  { icon: CreditCard, title: "sections.core_features.items.3.title", desc: "sections.core_features.items.3.desc" },
  { icon: Pill, title: "sections.core_features.items.4.title", desc: "sections.core_features.items.4.desc" },
  { icon: ClipboardList, title: "sections.core_features.items.5.title", desc: "sections.core_features.items.5.desc" },
  { icon: Video, title: "sections.core_features.items.6.title", desc: "sections.core_features.items.6.desc" },
  { icon: Bell, title: "sections.core_features.items.7.title", desc: "sections.core_features.items.7.desc" },
];

const SECURITY = [
  { icon: ShieldCheck, title: "sections.security.items.0.title", desc: "sections.security.items.0.desc" },
  { icon: Lock, title: "sections.security.items.1.title", desc: "sections.security.items.1.desc" },
  { icon: Smartphone, title: "sections.security.items.2.title", desc: "sections.security.items.2.desc" },
  { icon: Users, title: "sections.security.items.3.title", desc: "sections.security.items.3.desc" },
];

export const Route = createFileRoute("/{-$lang}/dermatology-patient-portal")({
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
    const st = getStaticTranslation(lang, "patientPortal");
    return {
      meta: [
        { title: st?.meta?.title ?? "Dermatology Patient Portal Design & Development | HIPAA-Compliant" },
        { name: "description", content: st?.meta?.description ?? "" },
        { property: "og:title", content: st?.meta?.og_title ?? "" },
        { property: "og:description", content: st?.meta?.og_description ?? "" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-patient-portal" },
        { property: "og:image", content: heroBg },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: st?.meta?.twitter_title ?? "" },
        { name: "twitter:description", content: st?.meta?.twitter_description ?? "" },
      ],
      links: [
        { rel: "canonical", href: "/dermatology-patient-portal" }, ...buildHreflangLinks("/dermatology-patient-portal"),
        { rel: "preload", as: "image", href: heroBg, fetchpriority: "high" },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Service",
          serviceType: st?.meta?.jsonLd?.serviceType,
          provider: { "@type": "Organization", name: st?.meta?.jsonLd?.provider },
          areaServed: st?.meta?.jsonLd?.areaServed,
          description: st?.meta?.jsonLd?.description,
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: (st?.faq?.items ?? []).map((f: any) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: st?.meta?.jsonLd?.breadcrumb_home, item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
            { "@type": "ListItem", position: 2, name: st?.meta?.jsonLd?.breadcrumb_services, item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-website-design") },
            { "@type": "ListItem", position: 3, name: st?.meta?.jsonLd?.breadcrumb_portal, item: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-patient-portal") },
          ],
        }) },
      ],
    };
  },
  component: PatientPortalPage,
});

function PortalGlowField({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="pg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="70%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="400" cy="300" r="260" fill="url(#pg-glow)" />
      {[80, 140, 200, 260].map((r, i) => (
        <circle key={i} cx="400" cy="300" r={r} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" opacity={0.3 - i * 0.05} />
      ))}
      <circle cx="400" cy="300" r="8" fill="currentColor" opacity="0.7">
        <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.25;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      {[[120,120],[680,140],[130,470],[660,460],[400,80],[400,540]].map(([x,y],i)=>(
        <g key={i} transform={`translate(${x} ${y})`} opacity="0.4">
          <path d="M 0 -14 L 12 -7 L 12 7 L 0 14 L -12 7 L -12 -7 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="0" cy="-2" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <rect x="-4" y="0" width="8" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}

function PatientPortalPage() {
  const { t } = useTranslation("patientPortal");
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section
        className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32"
        style={{
          background:
            "radial-gradient(1100px 550px at 90% -10%, color-mix(in oklch, var(--brand-primary), transparent 80%), transparent 60%), radial-gradient(800px 450px at -5% 105%, color-mix(in oklch, var(--brand-accent), transparent 85%), transparent 60%), linear-gradient(180deg, var(--background), color-mix(in oklch, var(--brand-primary), transparent 96%))",
        }}
      >
        <img
          src={heroBg}
          alt=""
          aria-hidden
          width={1600}
          height={1200}
          fetchPriority="high"
          className="pointer-events-none absolute -right-[35%] -top-24 -z-10 w-[70%] max-w-[900px] opacity-40 mix-blend-multiply select-none sm:-right-[20%] sm:opacity-50 lg:-right-[10%] lg:top-0 lg:w-[55%] lg:opacity-60 dark:mix-blend-screen dark:opacity-30"
          style={{
            maskImage: "radial-gradient(ellipse at 70% 50%, black 40%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse at 70% 50%, black 40%, transparent 78%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.3]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklch, var(--brand-primary), transparent 92%) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--brand-primary), transparent 92%) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
          }}
        />

        <PortalGlowField className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 text-brand-primary opacity-40 lg:block" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-3xl text-balance text-[2.25rem] font-bold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl md:text-[3.5rem] lg:text-[4rem]">
                {t("hero.title_start")}{" "}
                <span className="font-bold text-brand-primary">{t("hero.title_highlight")}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                {t("hero.description")}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/get-a-free-quote"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-lg shadow-brand-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                  }}
                >
                  {t("hero.cta_quote")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-brand-primary/40 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                >
                  {t("hero.cta_features")}
                </a>
              </div>
            </Reveal>

            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {[0, 1, 2, 3].map((idx) => (
                <li
                  key={idx}
                  className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-md sm:p-5"
                  style={{ boxShadow: "0 8px 30px -18px color-mix(in oklch, var(--brand-primary), transparent 60%)" }}
                >
                  <div className="text-lg font-bold tracking-tight text-foreground sm:text-2xl">{t(`hero.stats.${idx}.value`)}</div>
                  <div className="mt-1 whitespace-nowrap text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[11px] sm:tracking-[0.12em] lg:whitespace-normal lg:tracking-[0.1em]">{t(`hero.stats.${idx}.label`)}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Mock portal card */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto w-full max-w-md md:max-w-none">
              <div
                className="rounded-[28px] border border-border/70 bg-card/80 p-5 backdrop-blur-xl sm:p-6"
                style={{ boxShadow: "0 30px 80px -30px color-mix(in oklch, var(--brand-primary), transparent 55%)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                      <Stethoscope className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{t("mockPortal.header_category")}</div>
                      <div className="text-sm font-semibold">{t("mockPortal.header_greeting")}</div>
                    </div>
                  </div>
                  <span className="rounded-full border border-brand-primary/25 bg-brand-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-primary">{t("mockPortal.status")}</span>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    { icon: CalendarCheck, key: 0, accent: "primary" as const },
                    { icon: MessageSquareText, key: 1, accent: "accent" as const },
                    { icon: Pill, key: 2, accent: "primary" as const },
                    { icon: CreditCard, key: 3, accent: "accent" as const },
                  ].map((r) => {
                    const Icon = r.icon;
                    const label = t(`mockPortal.items.${r.key}.label`);
                    return (
                      <div key={label} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/60 p-3">
                        <div
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                          style={{ background: `color-mix(in oklch, var(--brand-${r.accent}), transparent 88%)`, color: `var(--brand-${r.accent})` }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold text-foreground">{label}</div>
                          <div className="truncate text-xs text-muted-foreground">{t(`mockPortal.items.${r.key}.meta`)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-brand-primary/5 p-3 text-xs">
                  <div className="flex items-center gap-2 text-brand-primary">
                    <ShieldCheck className="h-4 w-4" /> {t("mockPortal.footer_encryption")}
                  </div>
                  <div className="text-muted-foreground">{t("mockPortal.footer_biometrics")}</div>
                </div>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -right-6 hidden h-28 w-28 rounded-3xl border border-border/50 bg-card/70 backdrop-blur-xl sm:block"
                style={{ boxShadow: "0 20px 50px -20px color-mix(in oklch, var(--brand-accent), transparent 60%)" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* AUDIENCE + MEDICAL SERVICES */}
      <section className="border-y border-border/60 bg-card/40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-12">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.audiences.title")}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {(t("sections.audiences.items", { returnObjects: true }) as string[]).map((a, i) => (
                  <li key={i} className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-medium text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.medical_services.title")}</h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {(t("sections.medical_services.items", { returnObjects: true }) as string[]).map((s, i) => (
                  <li key={i} className="inline-flex items-center rounded-full border border-border/70 bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST METRICS + TESTIMONIAL */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:items-center lg:gap-12">
            <ul className="grid grid-cols-3 gap-4 sm:gap-6">
              {[0, 1, 2].map((idx) => (
                <li key={idx} className="rounded-2xl border border-border/70 bg-card/60 p-5 text-center sm:p-6">
                  <div className="text-2xl font-bold tracking-tight text-brand-primary sm:text-3xl">{t(`sections.metrics.items.${idx}.value`)}</div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">{t(`sections.metrics.items.${idx}.label`)}</div>
                </li>
              ))}
            </ul>
            <figure className="rounded-3xl border border-brand-primary/20 bg-brand-primary/5 p-6 sm:p-8">
              <blockquote className="text-base leading-relaxed text-foreground sm:text-lg">
                "{t("sections.testimonial.quote")}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-primary/15 text-brand-primary font-semibold">DP</div>
                <div>
                  <div className="font-semibold text-foreground">{t("sections.testimonial.author")}</div>
                  <div className="text-muted-foreground">{t("sections.testimonial.clinic")}</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section id="features" className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.core_features.badge")}</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t("sections.core_features.title")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              {t("sections.core_features.description")}
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={i} delay={i * 0.04}>
                  <li className="group relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl hover:shadow-brand-primary/10">
                    <div
                      className="grid h-11 w-11 place-items-center rounded-2xl"
                      style={{
                        background: "color-mix(in oklch, var(--brand-primary), transparent 90%)",
                        color: "var(--brand-primary)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">{t(f.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(f.desc)}</p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* SECURITY */}
      <section className="border-t border-border/60 bg-card/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.security.badge")}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("sections.security.title")}</h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                {t("sections.security.description")}
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/5 px-5 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                {t("sections.security.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {SECURITY.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={i} className="rounded-3xl border border-border/70 bg-background/70 p-6">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-accent/10 text-brand-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold">{t(s.title)}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{t(s.desc)}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("sections.workflow.badge")}</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("sections.workflow.title")}</h2>
          </div>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <li className="relative h-full rounded-3xl border border-border/70 bg-card/50 p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t(`sections.workflow.steps.${idx}.step`)}</div>
                  <h3 className="mt-3 text-lg font-semibold">{t(`sections.workflow.steps.${idx}.title`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`sections.workflow.steps.${idx}.desc`)}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 bg-card/30 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("faq.badge")}</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("faq.title")}</h2>
          </div>
          <ul className="mt-10 space-y-3" itemScope itemType="https://schema.org/FAQPage">
            {(t("faq.items", { returnObjects: true }) as any[]).map((f, i) => {
              const open = openFaq === i;
              return (
                <li
                  key={i}
                  className="rounded-2xl border border-border/70 bg-background/70"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 sm:p-6"
                  >
                    <span className="text-base font-semibold text-foreground sm:text-lg" itemProp="name">{f.q}</span>
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border/70 bg-card text-foreground transition-transform" style={{ transform: open ? "rotate(180deg)" : "none" }}>
                      {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {open && (
                    <div
                      className="px-5 pb-5 pt-0 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6 sm:text-base"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <span itemProp="text">{f.a}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-[32px] p-8 text-center sm:p-14"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 8%), color-mix(in oklch, var(--brand-accent), transparent 15%))",
              boxShadow: "0 30px 80px -30px color-mix(in oklch, var(--brand-primary), transparent 55%)",
            }}
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-background/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-primary-foreground backdrop-blur">
              <Zap className="h-3.5 w-3.5" /> {t("cta.badge")}
            </div>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-brand-primary-foreground sm:text-4xl lg:text-5xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-brand-primary-foreground/85 sm:text-base">
              {t("cta.description")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/get-a-free-quote"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-transform hover:-translate-y-0.5"
              >
                {t("cta.cta_quote")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-background/40 px-6 py-3 text-sm font-semibold text-brand-primary-foreground transition-colors hover:bg-background/10"
              >
                {t("cta.cta_contact")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 p-3 shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.15)] backdrop-blur md:hidden">
        <Link
          to="/get-a-free-quote"
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-lg"
        >
          {t("cta.cta_quote")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div aria-hidden className="h-20 md:hidden" />

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footer_related.text")}{" "}
          <Link to="/dermatology-website-design" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_related.link_website")}</Link>,{" "}
          <Link to="/multi-location-dermatology-website-design" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_related.link_multi_location")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/plan-packages-and-costs" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_related.link_packages")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}
