import { useEffect, useState } from "react";
import { useForm as useFormspree } from "@formspree/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { z } from "zod";
import { captureLead } from "@/lib/capture-lead";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Search,
  Gauge,
  Lock,
  Accessibility,
  Smartphone,
  MousePointerClick,
  FileText,
  Send,
  FileSearch,
  ClipboardCheck,
  Star,
  Globe,
  User,
  Mail,
  Building2,
  ChevronDown,
  Gauge as GaugeIcon,
  Eye,
  TrendingUp,
  ShieldAlert,
  BarChart3,
  Wrench,
  Phone,
  Briefcase,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { isValidUrlLang } from "@/i18n/languages";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage } from "@/lib/i18n-routing";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

export const Route = createFileRoute("/{-$lang}/free-dermatologist-website-audit")({
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
    const st = getStaticTranslation(resolveRouteLanguage(params.lang), "freeAudit");
    return {
      meta: [
        { title: st?.meta?.title ?? "Free Dermatologist Website Audit — 24-Hour Actionable Report" },
        {
          name: "description",
          content: st?.meta?.description ?? "Get a free, dermatology-specific website audit. Personalized report on SEO, speed, HIPAA, UX and conversion — delivered within 48 hours.",
        },
        { property: "og:title", content: st?.meta?.og?.title ?? "Free Dermatologist Website Audit" },
        {
          property: "og:description",
          content: st?.meta?.og?.description ?? "Personalized website audit for dermatology practices — SEO, speed, HIPAA, UX and conversion. Delivered in 48 hours.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { property: "og:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/free-dermatologist-website-audit" }, ...buildHreflangLinks("/free-dermatologist-website-audit")],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: st?.meta?.jsonLd?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
              { "@type": "ListItem", position: 2, name: st?.meta?.jsonLd?.breadcrumb ?? "Free Website Audit", item: localizedUrl(resolveRouteLanguage(params.lang), "/free-dermatologist-website-audit") },
            ],
          }),
        },
      ],
    };
  },
  component: AuditPage,
});

const auditAreas = [Search, Gauge, Lock, Accessibility, MousePointerClick, Smartphone];
const deliverables = [GaugeIcon, ClipboardCheck, Mail];
const benefits = [Eye, TrendingUp, ShieldAlert, BarChart3];
const steps = [Send, FileSearch, FileText, Wrench];
const trustIcons = [ShieldCheck, Clock, Lock, Sparkles];

function AuditPage() {
  const { t } = useTranslation("freeAudit");
  const [form, setForm] = useState({ name: "", role: "", email: "", phone: "", practice: "", website: "", goals: "" });
  const [error, setError] = useState<string | null>(null);
  const [fsState, fsSubmit] = useFormspree("mjgnykob");
  const submitted = fsState.succeeded;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.practice || !form.website) {
      setError(t("form.errors.generic"));
      return;
    }
    const COOLDOWN_MS = 60_000;
    try {
      const last = Number(localStorage.getItem("audit_last_submit") ?? 0);
      const remaining = COOLDOWN_MS - (Date.now() - last);
      if (last && remaining > 0) {
        setError(t("form.errors.cooldown", { seconds: Math.ceil(remaining / 1000) }));
        return;
      }
      localStorage.setItem("audit_last_submit", String(Date.now()));
    } catch {
      // no-op
    }
    setError(null);
    await fsSubmit({
      ...form,
      _subject: `Free audit request — ${form.practice} (${form.website})`,
    });
    void captureLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company_name: form.practice,
      website_url: form.website,
      service_needed: "Free website audit",
      project_details: form.goals,
      preferred_contact: "Email",
    });
  };

  useEffect(() => {
    if (fsState.errors) {
      setError(t("form.errors.submissionError"));
    }
  }, [fsState.errors, t]);

  return (
    <div className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <SiteHeader />

      <main id="main">
        <section
          className="relative isolate overflow-hidden"
          style={{
            background:
              "radial-gradient(1000px 500px at 90% 0%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 60%), radial-gradient(800px 500px at 0% 100%, color-mix(in oklch, var(--brand-secondary), transparent 80%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 95%), #ffffff)",
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

          <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
              </div>

              <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                <span className="text-brand-primary">{t("hero.title")}</span>
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                {t("hero.subtitle")}
              </p>

              <ul className="mt-8 grid max-w-lg gap-2.5 text-sm">
                {(t("hero.checklist", { returnObjects: true }) as string[]).map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-foreground/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("hero.audiencesLabel")}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(t("hero.audiences", { returnObjects: true }) as string[]).map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-xs font-medium text-brand-primary"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 sm:gap-8">
                <Stat value="50+" label={t("hero.stats.websites.label")} sub={t("hero.stats.websites.sub")} />
                <Stat value="48h" label={t("hero.stats.delivery.label")} sub={t("hero.stats.delivery.sub")} />
                <Stat value="100%" label={t("hero.stats.niche.label")} sub={t("hero.stats.niche.sub")} />
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <Reveal>
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-4 -z-10 rounded-[2rem] opacity-40 blur-2xl"
                    style={{
                      background:
                        "radial-gradient(60% 60% at 50% 50%, color-mix(in oklch, var(--brand-primary), transparent 60%), transparent 70%)",
                    }}
                  />
                  <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-[0_30px_80px_-30px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] sm:p-8">
                    {submitted ? (
                      <div className="py-10 text-center">
                        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                          <CheckCircle2 className="h-7 w-7" />
                        </div>
                        <h3 className="mt-5 text-xl font-semibold text-foreground">
                          {t("form.success.title")}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t("form.success.body").replace("{form.website}", form.website || "your website").replace("{form.email}", form.email)}
                        </p>
                        <Link
                          to="/dermatology-websites-portfolio"
                          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border/70 px-4 py-2 text-xs font-semibold text-foreground hover:bg-accent"
                        >
                          {t("form.success.cta")}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    ) : (
                      <form onSubmit={onSubmit} noValidate>
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-brand-primary" />
                          {t("form.tag")}
                        </div>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                          {t("form.title")}
                        </h2>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          {t("form.subtitle")}
                        </p>

                        <div className="mt-6 space-y-4">
                          <Field
                            id="website"
                            label={t("form.fields.website.label")}
                            icon={Globe}
                            placeholder={t("form.fields.website.placeholder")}
                            value={form.website}
                            onChange={update("website")}
                            required
                          />
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                              id="name"
                              label={t("form.fields.name.label")}
                              icon={User}
                              placeholder={t("form.fields.name.placeholder")}
                              value={form.name}
                              onChange={update("name")}
                              required
                            />
                            <Field
                              id="role"
                              label={t("form.fields.role.label")}
                              icon={Briefcase}
                              placeholder={t("form.fields.role.placeholder")}
                              value={form.role}
                              onChange={update("role")}
                            />
                          </div>
                          <Field
                            id="practice"
                            label={t("form.fields.practice.label")}
                            icon={Building2}
                            placeholder={t("form.fields.practice.placeholder")}
                            value={form.practice}
                            onChange={update("practice")}
                            required
                          />
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                              id="email"
                              type="email"
                              label={t("form.fields.email.label")}
                              icon={Mail}
                              placeholder={t("form.fields.email.placeholder")}
                              value={form.email}
                              onChange={update("email")}
                              required
                            />
                            <Field
                              id="phone"
                              type="tel"
                              label={t("form.fields.phone.label")}
                              icon={Phone}
                              placeholder={t("form.fields.phone.placeholder")}
                              value={form.phone}
                              onChange={update("phone")}
                            />
                          </div>
                          <div>
                            <label htmlFor="goals" className="mb-1.5 block text-xs font-semibold text-foreground">
                              {t("form.fields.goals.label")} <span className="font-normal text-muted-foreground">{t("form.fields.goals.optionalLabel")}</span>
                            </label>
                            <textarea
                              id="goals"
                              value={form.goals}
                              onChange={update("goals")}
                              rows={3}
                              placeholder={t("form.fields.goals.placeholder")}
                              className="w-full resize-none rounded-xl border border-border/70 bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-primary/60 focus:ring-2 focus:ring-brand-primary/20"
                            />
                          </div>
                        </div>

                        {error && (
                          <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                            {error}
                          </p>
                        )}

                        <button
                          type="submit"
                          className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                          }}
                        >
                          <span className="relative z-10">{t("form.submit")}</span>
                          <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          <span
                            aria-hidden
                            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                          />
                        </button>

                        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3" /> {t("form.disclaimer.spam")}</span>
                          <span aria-hidden className="opacity-40">·</span>
                          <span>{t("form.disclaimer.obligation")}</span>
                          <span aria-hidden className="opacity-40">·</span>
                          <span>{t("form.disclaimer.confidential")}</span>
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-y-4 rounded-2xl border border-border/60 bg-card/80 px-4 py-5 shadow-sm backdrop-blur sm:grid-cols-4 sm:gap-x-6">
              {trustIcons.map((Icon, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-tight text-foreground sm:text-sm">{t(`trustItems.${i}.label`)}</p>
                    <p className="text-[10px] leading-tight text-muted-foreground sm:text-xs">{t(`trustItems.${i}.note`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  {t("sections.auditAreas.tag")}
                </p>
                <h2 className="mt-3 text-balance text-3xl font-light tracking-tight text-foreground sm:text-4xl">
                  {t("sections.auditAreas.title").split("dermatology-specific")[0]}
                  <span className="font-medium text-brand-primary">dermatology-specific</span>
                  {t("sections.auditAreas.title").split("dermatology-specific")[1]}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {t("sections.auditAreas.subtitle")}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {auditAreas.map((Icon, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="group h-full rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_20px_40px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]">
                    <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-foreground">{t(`sections.auditAreas.items.${i}.title`)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`sections.auditAreas.items.${i}.body`)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative py-20 sm:py-24"
          style={{
            background:
              "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-secondary), transparent 94%))",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  {t("sections.benefits.tag")}
                </p>
                <h2 className="mt-3 text-balance text-3xl font-light tracking-tight text-foreground sm:text-4xl">
                  {t("sections.benefits.title").split("what's really going on.")[0]}
                  <span className="font-medium text-brand-primary">what's really going on.</span>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {t("sections.benefits.subtitle")}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((Icon, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="group h-full rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_20px_40px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]">
                    <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-foreground">{t(`sections.benefits.items.${i}.title`)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`sections.benefits.items.${i}.body`)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative py-20 sm:py-24"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%), transparent)",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
              <Reveal>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                    {t("sections.deliverables.tag")}
                  </p>
                  <h2 className="mt-3 text-balance text-3xl font-light tracking-tight text-foreground sm:text-4xl">
                    {t("sections.deliverables.title").split("act on.")[0]}
                    <span className="font-medium text-brand-primary">act on.</span>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t("sections.deliverables.description")}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 font-semibold text-foreground">
                      <Clock className="h-3.5 w-3.5 text-brand-primary" /> {t("sections.deliverables.tags.delivery")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 font-semibold text-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-brand-primary" /> {t("sections.deliverables.tags.confidential")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 font-semibold text-foreground">
                      <Star className="h-3.5 w-3.5 text-brand-primary" /> {t("sections.deliverables.tags.obligation")}
                    </span>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-4">
                {deliverables.map((Icon, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <div className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md sm:p-6">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-foreground">{t(`sections.deliverables.items.${i}.title`)}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(`sections.deliverables.items.${i}.body`)}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  {t("sections.howItWorks.tag")}
                </p>
                <h2 className="mt-3 text-balance text-3xl font-light tracking-tight text-foreground sm:text-4xl">
                  {t("sections.howItWorks.title").split("48 hours")[0]}
                  <span className="font-medium text-brand-primary">
                    <CountUp value="48" /> hours
                  </span>
                  .
                </h2>
              </div>
            </Reveal>

            <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((Icon, i) => (
                <Reveal key={i} delay={i * 0.06} as="li">
                  <div className="relative h-full rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_20px_40px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]">
                    <span className="absolute -top-3 left-6 inline-flex h-7 items-center justify-center rounded-full bg-brand-primary px-3 text-xs font-semibold text-brand-primary-foreground">
                      {t(`sections.howItWorks.steps.${i}.label`)}
                    </span>
                    <span className="mt-2 inline-grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-foreground">{t(`sections.howItWorks.steps.${i}.title`)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`sections.howItWorks.steps.${i}.body`)}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="relative pb-20 sm:pb-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary">{t("faq.tag")}</p>
                <h2 className="mt-3 text-balance text-3xl font-light tracking-tight text-foreground sm:text-4xl">
                  {t("faq.title")}
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/70 bg-card">
              {(t("faq.items", { returnObjects: true }) as any[]).map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={i}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/40 sm:px-6 sm:py-5"
                    >
                      <span className="text-sm font-semibold text-foreground sm:text-base">{f.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180 text-brand-primary" : ""}`}
                      />
                    </button>
                    {open && (
                      <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <a
                href="#main"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                }}
              >
                {t("form.submit")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footerLinks.prefix")}
          <Link to="/dermatology-websites-portfolio" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.portfolio")}</Link>,{" "}
          <Link to="/our-process" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.process")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/plan-packages-and-costs" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.costs")}</Link>.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}

function Stat({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="min-w-0">
      <p className="text-lg font-bold leading-none text-foreground sm:text-[1.65rem]">
        <CountUp value={value} />
      </p>
      <p className="mt-1 text-[11px] font-medium text-muted-foreground sm:text-xs">{label}</p>
      <p className="text-[11px] text-muted-foreground sm:text-xs">{sub}</p>
    </div>
  );
}

function Field({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-foreground">
        {label} {required && <span className="text-brand-primary">*</span>}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border border-border/70 bg-background py-2.5 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-primary/60 focus:ring-2 focus:ring-brand-primary/20"
        />
      </div>
    </div>
  );
}
