import { useEffect, useMemo, useState } from "react";
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
  Mail,
  MapPin,
  MessageSquare,
  Send,
  FileText,
  Lock,
  Star,
  HelpCircle,
  Plus,
  Loader2,
  Zap,
  Activity,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { WhatsAppIcon } from "@/components/site-header/whatsapp-icon";
import { Reveal } from "@/components/reveal";
import { isValidUrlLang } from "@/i18n/languages";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage } from "@/lib/i18n-routing";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

export const Route = createFileRoute("/{-$lang}/contact")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params }) => {
    const st = getStaticTranslation(resolveRouteLanguage(params.lang), "contact");
    return {
      meta: [
        { title: st?.meta?.title ?? "Contact Us — Dermatology Website Design" },
        {
          name: "description",
          content: st?.meta?.description ?? "Get in touch with our dermatology website design team. Email, WhatsApp, or send us a message — we reply within 24 hours.",
        },
        { property: "og:title", content: st?.meta?.ogTitle ?? "Contact Us — Dermatology Website Design" },
        {
          property: "og:description",
          content: st?.meta?.ogDescription ?? "Questions about your practice website? Reach out — we reply within 24 hours.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { property: "og:image", content: "https://dermatologywebsitedesign.com/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:image", content: "https://dermatologywebsitedesign.com/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/contact" }, ...buildHreflangLinks("/contact")],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: st?.meta?.breadcrumbHome ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
              { "@type": "ListItem", position: 2, name: st?.meta?.breadcrumbContact ?? "Contact", item: localizedUrl(resolveRouteLanguage(params.lang), "/contact") },
            ],
          }),
        },
      ],
    };
  },
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "name").max(80),
  email: z.string().trim().email("email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  website: z.string().trim().max(255).optional().or(z.literal("")),
  practice: z.string().trim().max(120).optional().or(z.literal("")),
  subject: z.string().min(1, "topic"),
  message: z
    .string()
    .trim()
    .min(10, "message")
    .max(2000),
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  website: string;
  practice: string;
  subject: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  website: "",
  practice: "",
  subject: "",
  message: "",
};

const subjects = [
  "New Website",
  "Website Redesign",
  "Website Migration",
  "SEO / Marketing",
  "Care & Maintenance",
  "General Question",
];

type Channel = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  note: string;
  accent: string; // hex/oklch color
  tint: string; // faded bg color
};

const channels: Channel[] = [
  {
    icon: Mail,
    label: "Email",
    value: "info@dermatologywebsitedesign.com",
    href: "mailto:info@dermatologywebsitedesign.com",
    note: "Replies within 24 hours",
    accent: "#3b82f6",
    tint: "rgba(59,130,246,0.12)",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Chat with our team",
    href: "https://wa.me/8801815840813",
    note: "Mon–Fri · 9am–6pm EST",
    accent: "#22c55e",
    tint: "rgba(34,197,94,0.12)",
  },
  {
    icon: FileText,
    label: "Free Quote",
    value: "Get a tailored proposal",
    href: "/get-a-free-quote",
    note: "No obligation · 24-hr turnaround",
    accent: "#f59e0b",
    tint: "rgba(245,158,11,0.14)",
  },
];

const faqs = [
  {
    q: "What is your typical response time?",
    a: "For standard inquiries we reply within 24 hours on business days. For urgent issues on active projects (like site downtime), we aim for under 1 hour.",
  },
  {
    q: "Do you work with practices outside the US?",
    a: "Yes — we work with dermatology practices worldwide. Our team is fully remote and we handle projects across time zones.",
  },
  {
    q: "Do you offer white-label services for agencies?",
    a: "Yes. We partner with design and marketing agencies to build and maintain dermatology websites under their brand. Pick “General Question” in the form above and mention white-label.",
  },
  {
    q: "How much does a new dermatology website cost?",
    a: "Projects typically start around $2,500 and scale with scope, integrations, and content. Send us a quick note and we'll share a tailored quote within 24 hours.",
  },
];

const trustAvatars = [
  { name: "Dr. Sarah R.", src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Dr. Michael K.", src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Dr. Amanda L.", src: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=120&h=120&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Dr. James T.", src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&h=120&fit=crop&crop=faces&auto=format&q=80" },
  { name: "Dr. Rachel N.", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces&auto=format&q=80" },
];

function ContactPage() {
  const { t } = useTranslation("contact");
  const [form, setForm] = useState<FormState>(initial);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fsState, fsSubmit] = useFormspree("xwvglpbz");
  const submitted = fsState.succeeded;
  const submitting = fsState.submitting;

  const messageCount = form.message.length;
  const messageMax = 2000;

  const validateField = (name: keyof FormState, value: string) => {
    const partial = { ...form, [name]: value };
    const parsed = schema.safeParse(partial);
    if (parsed.success) {
      setFieldErrors((f) => {
        const next = { ...f };
        delete next[name];
        return next;
      });
      return;
    }
    const issue = parsed.error.issues.find((i) => i.path[0] === name);
    setFieldErrors((f) => ({ ...f, [name]: issue?.message ? t(`form.validation.${issue.message}`) : undefined }));
  };

  const update =
    <K extends keyof FormState>(k: K) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const v = e.target.value;
      setForm((f) => ({ ...f, [k]: v } as FormState));
      if (fieldErrors[k]) validateField(k, v);
    };

  const onBlur = (k: keyof FormState) => () => validateField(k, form[k]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!errs[k]) errs[k] = t(`form.validation.${issue.message}`);
      }
      setFieldErrors(errs);
      setGlobalError(t("form.errors.fixFields"));
      return;
    }

    const COOLDOWN_MS = 60_000;
    try {
      const last = Number(localStorage.getItem("contact_last_submit") ?? 0);
      const remaining = COOLDOWN_MS - (Date.now() - last);
      if (last && remaining > 0) {
        setGlobalError(
          t("form.errors.cooldown", { seconds: Math.ceil(remaining / 1000) })
        );
        return;
      }
    } catch {
      // ignore
    }

    setGlobalError(null);
    await fsSubmit({
      ...form,
      _subject: `Contact — ${form.subject}: ${form.name}`,
    });
    void captureLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company_name: form.practice,
      website_url: form.website,
      service_needed: form.subject,
      project_details: form.message,
      preferred_contact: "Email",
    });

    try {
      localStorage.setItem("contact_last_submit", String(Date.now()));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (fsState.errors) {
      setGlobalError(t("form.errors.global"));
    }
  }, [fsState.errors, t]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-brand-primary/5 via-background to-background">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Animated orbs */}
          <div
            aria-hidden
            className="orb orb-a pointer-events-none absolute -z-10"
          />
          <div
            aria-hidden
            className="orb orb-b pointer-events-none absolute -z-10"
          />

          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:px-8 lg:py-24">
            {/* Left: copy */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                <Sparkles className="h-3.5 w-3.5" /> {t("hero.tag")}
              </span>
              <h1 className="mt-6 text-balance text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                {t("hero.title.part1")}{" "}
                <span className="font-medium text-brand-primary">
                  {t("hero.title.part2")}
                </span>
              </h1>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t("hero.description")}
              </p>

              {/* Response-time badge */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <Activity className="h-3.5 w-3.5" />
                {t("hero.avgReply.label")} <span className="tabular-nums">{t("hero.avgReply.time")}</span>
              </div>

              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                {[
                  { icon: Clock, label: "0" },
                  { icon: ShieldCheck, label: "1" },
                  { icon: CheckCircle2, label: "2" },
                ].map((f) => (
                  <li key={f.label} className="inline-flex items-center gap-2">
                    <f.icon className="h-4 w-4 text-brand-primary" aria-hidden />
                    {t(`hero.features.${f.label}`)}
                  </li>
                ))}
              </ul>

              {/* Social proof strip */}
              <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-border/60 bg-card/70 px-4 py-3 backdrop-blur">
                <div className="flex -space-x-2">
                  {trustAvatars.map((a, i) => (
                    <img
                      key={a.name}
                      src={a.src}
                      alt={t(`hero.socialProof.avatars.${i}`)}
                      loading="lazy"
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-background"
                    />
                  ))}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-brand-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                    <span className="ml-1 text-xs font-semibold text-foreground">
                      {t("hero.socialProof.rating")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("hero.socialProof.trustedBy")} <span className="font-semibold text-foreground">{t("hero.socialProof.practices")}</span> {t("hero.socialProof.worldwide")}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: floating message mockup */}
            <div className="relative mt-12 hidden lg:mt-0 lg:block">
              <FloatingMockup />
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="bg-background py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {channels.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.05}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.99]"
                    style={
                      {
                        "--accent": c.accent,
                        "--tint": c.tint,
                      } as React.CSSProperties
                    }
                  >
                    {/* Accent glow */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: c.tint }}
                    />
                    {/* Left accent bar */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                      style={{ background: c.accent }}
                    />
                    <div className="relative flex items-start gap-4">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{ background: c.tint, color: c.accent }}
                      >
                        <c.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: c.accent }}
                        >
                          {t(`channels.${i}.label`)}
                        </p>
                        <p className="mt-1 break-words text-sm font-medium text-foreground">
                          {t(`channels.${i}.value`)}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {t(`channels.${i}.note`)}
                        </p>
                      </div>
                    </div>
                    <span
                      className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold"
                      style={{ color: c.accent }}
                    >
                      {t(`channels.${i}.action`)}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="bg-background pb-20 sm:pb-24 lg:pb-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-14">
              {/* Sidebar */}
              <aside className="min-w-0 space-y-6 lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <div className="rounded-2xl border border-border/70 bg-card p-6">
                    <h2 className="text-lg font-semibold text-foreground">
                      {t("sidebar.officeHours.title")}
                    </h2>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex justify-between gap-4">
                        <span>{t("sidebar.officeHours.mondayToFriday")}</span>
                        <span className="text-foreground">{t("sidebar.officeHours.mondayToFridayTime")}</span>
                      </li>
                      <li className="flex justify-between gap-4">
                        <span>{t("sidebar.officeHours.saturday")}</span>
                        <span className="text-foreground">{t("sidebar.officeHours.saturdayTime")}</span>
                      </li>
                      <li className="flex justify-between gap-4">
                        <span>{t("sidebar.officeHours.sunday")}</span>
                        <span className="text-muted-foreground">{t("sidebar.officeHours.sundayTime")}</span>
                      </li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="rounded-2xl border border-border/70 bg-card p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("sidebar.servingPractices.title")}
                    </h3>
                    <p className="mt-3 flex items-start gap-2 text-sm text-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                      {t("sidebar.servingPractices.subtitle")}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {t("sidebar.servingPractices.description")}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="rounded-2xl border border-border/70 bg-card p-6">
                    <div className="flex items-center gap-2 text-brand-accent">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-3 text-sm italic leading-relaxed text-foreground">
                      {t("sidebar.testimonial.quote")}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="relative grid h-11 w-11 place-items-center rounded-full p-[2px]"
                        style={{
                          background:
                            "conic-gradient(from 180deg, #f472b6, #f59e0b, #22d3ee, #a78bfa, #f472b6)",
                        }}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=120&h=120&fit=crop&crop=faces&auto=format&q=80"
                          alt="Dr. Nadia Fischer"
                          loading="lazy"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </span>
                      <div className="text-xs">
                        <p className="font-semibold text-foreground">{t("sidebar.testimonial.author")}</p>
                        <p className="text-muted-foreground">{t("sidebar.testimonial.role")}</p>
                      </div>
                    </div>
                    <p className="mt-4 border-t border-border/60 pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("sidebar.testimonial.trustedBy")}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="relative overflow-hidden rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/[0.08] via-card to-card p-6">
                    <div
                      aria-hidden
                      className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-primary/10 blur-2xl"
                    />
                    <div className="relative">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
                        {t("sidebar.audit.title")}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {t("sidebar.audit.description")}
                      </p>
                      <Link
                        to="/free-dermatologist-website-audit"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
                      >
                        {t("sidebar.audit.link")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </aside>

              {/* Form */}
              <div className="min-w-0">
                <Reveal>
                  <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
                    {submitted ? (
                      <SuccessState email={form.email} />
                    ) : (
                      <form onSubmit={onSubmit} className="space-y-5" noValidate>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          <MessageSquare className="h-3.5 w-3.5 text-brand-primary" />
                          {t("form.header")}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label={t("form.labels.name")} required error={fieldErrors.name}>
                            <input
                              type="text"
                              required
                              maxLength={80}
                              value={form.name}
                              onChange={update("name")}
                              onBlur={onBlur("name")}
                              aria-invalid={!!fieldErrors.name}
                              className={`input ${fieldErrors.name ? "input-error" : ""}`}
                              placeholder={t("form.placeholders.name")}
                            />
                          </Field>
                          <Field label={t("form.labels.email")} required error={fieldErrors.email}>
                            <input
                              type="email"
                              required
                              maxLength={255}
                              value={form.email}
                              onChange={update("email")}
                              onBlur={onBlur("email")}
                              aria-invalid={!!fieldErrors.email}
                              className={`input ${fieldErrors.email ? "input-error" : ""}`}
                              placeholder={t("form.placeholders.email")}
                            />
                          </Field>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label={t("form.labels.phone")} error={fieldErrors.phone}>
                            <input
                              type="tel"
                              maxLength={30}
                              value={form.phone}
                              onChange={update("phone")}
                              className="input"
                              placeholder={t("form.placeholders.phone")}
                            />
                          </Field>
                          <Field label={t("form.labels.website")} error={fieldErrors.website}>
                            <input
                              type="url"
                              maxLength={255}
                              value={form.website}
                              onChange={update("website")}
                              className="input"
                              placeholder={t("form.placeholders.website")}
                            />
                          </Field>
                        </div>

                        <Field label={t("form.labels.practice")} error={fieldErrors.practice}>
                          <input
                            type="text"
                            maxLength={120}
                            value={form.practice}
                            onChange={update("practice")}
                            className="input"
                            placeholder={t("form.placeholders.practice")}
                          />
                        </Field>

                        <Field label={t("form.labels.subject")} required error={fieldErrors.subject}>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {subjects.map((_s, i) => {
                              const localizedS = t(`form.subjects.${i}`);
                              const active = form.subject === localizedS;
                              return (
                                <button
                                  key={localizedS}
                                  type="button"
                                  onClick={() => {
                                    setForm((f) => ({ ...f, subject: localizedS }));
                                    if (fieldErrors.subject) validateField("subject", localizedS);
                                  }}
                                  className={
                                    "rounded-lg border px-3 py-2 text-xs font-medium transition-all active:scale-95 " +
                                    (active
                                      ? "border-brand-primary bg-brand-primary/10 text-brand-primary shadow-[0_4px_12px_-4px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]"
                                      : "border-border bg-background text-muted-foreground hover:border-brand-primary/40 hover:text-foreground")
                                  }
                                >
                                  {localizedS}
                                </button>
                              );
                            })}
                          </div>
                        </Field>

                        <Field label={t("form.labels.message")} required error={fieldErrors.message}>
                          <div className="relative">
                            <textarea
                              required
                              rows={6}
                              maxLength={messageMax}
                              value={form.message}
                              onChange={update("message")}
                              onBlur={onBlur("message")}
                              aria-invalid={!!fieldErrors.message}
                              className={`input resize-y pb-7 ${fieldErrors.message ? "input-error" : ""}`}
                              placeholder={t("form.placeholders.message")}
                            />
                            <span
                              className={`pointer-events-none absolute bottom-2 right-3 text-[11px] tabular-nums ${
                                messageCount > messageMax * 0.9
                                  ? "text-brand-primary"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {messageCount}/{messageMax}
                            </span>
                          </div>
                        </Field>

                        {globalError && (
                          <p className="animate-fade-in rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                            {globalError}
                          </p>
                        )}

                        <div className="flex flex-col-reverse items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-xs text-muted-foreground">
                            {t("form.disclaimer")}
                          </p>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_10px_24px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_color-mix(in_oklch,var(--brand-primary),transparent_30%)] active:translate-y-0 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-80"
                          >
                            <span
                              aria-hidden
                              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                            />
                            {submitting ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {t("form.submitting")}
                              </>
                            ) : (
                              <>
                                {t("form.submit")}
                                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                              </>
                            )}
                          </button>
                        </div>

                        <p className="flex items-center gap-1.5 pt-1 text-[11px] text-muted-foreground">
                          <Lock className="h-3 w-3" />
                          {t("form.privacy")}
                        </p>
                      </form>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border/60 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                <HelpCircle className="h-3.5 w-3.5" /> {t("faq.tag")}
              </span>
              <h2 className="mt-5 text-3xl font-light tracking-tight text-foreground sm:text-4xl">
                {t("faq.title")}
              </h2>
            </div>

            <div className="mt-10 space-y-3">
              {faqs.map((_f, i) => (
                <FaqItem key={i} q={t(`faq.items.${i}.q`)} a={t(`faq.items.${i}.a`)} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/[0.08] via-card to-card p-10 text-center sm:p-14">
              {/* Noise texture */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
              />
              {/* Floating shapes */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-primary/10 blur-3xl float-slow"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-14 h-52 w-52 rounded-full bg-brand-accent/15 blur-3xl float-slower"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute right-8 top-8 h-10 w-10 rotate-12 rounded-lg border border-brand-primary/30 bg-brand-primary/5 backdrop-blur float-slow"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-10 bottom-10 h-6 w-6 rounded-full border border-brand-accent/40 bg-brand-accent/10 float-slower"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-background/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary backdrop-blur">
                  <Zap className="h-3.5 w-3.5" /> {t("cta.tag")}
                </span>
                <h2 className="mt-5 text-3xl font-light tracking-tight text-foreground sm:text-4xl">
                  {t("cta.title")}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
                  {t("cta.description")}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    to="/free-dermatologist-website-audit"
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_10px_24px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5 active:scale-[0.97]"
                  >
                    {t("cta.auditButton")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to="/get-a-free-quote"
                    className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-background px-6 py-3 text-sm font-semibold text-brand-primary transition-all hover:bg-brand-primary/5 active:scale-[0.97]"
                  >
                    {t("cta.quoteButton")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.625rem;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 0.65rem 0.85rem;
          font-size: 0.9rem;
          color: var(--foreground);
          outline: none;
          transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
        }
        .input:hover { border-color: color-mix(in oklch, var(--brand-primary), transparent 65%); }
        .input:focus {
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 4px color-mix(in oklch, var(--brand-primary), transparent 82%);
        }
        .input-error {
          border-color: var(--destructive);
        }
        .input-error:focus {
          border-color: var(--destructive);
          box-shadow: 0 0 0 4px color-mix(in oklch, var(--destructive), transparent 82%);
        }

        .orb {
          border-radius: 9999px;
          filter: blur(60px);
          opacity: 0.55;
        }
        .orb-a {
          top: -140px;
          left: 8%;
          width: 420px;
          height: 420px;
          background: radial-gradient(closest-side, color-mix(in oklch, var(--brand-primary), transparent 55%), transparent 70%);
          animation: orb-float-a 14s ease-in-out infinite;
        }
        .orb-b {
          bottom: -160px;
          right: 6%;
          width: 460px;
          height: 460px;
          background: radial-gradient(closest-side, color-mix(in oklch, var(--brand-accent), transparent 55%), transparent 70%);
          animation: orb-float-b 18s ease-in-out infinite;
        }
        @keyframes orb-float-a {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px, 40px) scale(1.08); }
        }
        @keyframes orb-float-b {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.1); }
        }

        .float-slow { animation: floaty 8s ease-in-out infinite; }
        .float-slower { animation: floaty 12s ease-in-out infinite reverse; }
        @keyframes floaty {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-14px) rotate(6deg); }
        }

        @keyframes success-pop {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .success-pop { animation: success-pop .55s cubic-bezier(.22,1.4,.36,1) both; }

        @keyframes ring-pulse {
          0% { transform: scale(0.8); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .ring-pulse { animation: ring-pulse 1.6s ease-out infinite; }

        @keyframes confetti-fall {
          0% { transform: translate(0,0) rotate(0); opacity: 1; }
          100% { transform: translate(var(--tx), 140px) rotate(var(--tr)); opacity: 0; }
        }
        .confetti { animation: confetti-fall 1.4s ease-out forwards; }

        @keyframes faq-open {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes mockup-float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(-2deg); }
        }
        @keyframes mockup-float-2 {
          0%, 100% { transform: translateY(0) rotate(4deg); }
          50% { transform: translateY(10px) rotate(4deg); }
        }
        .mockup-a { animation: mockup-float 6s ease-in-out infinite; }
        .mockup-b { animation: mockup-float-2 7s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .orb-a, .orb-b, .float-slow, .float-slower, .mockup-a, .mockup-b, .ring-pulse, .confetti { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span>
          {label}
          {required && <span className="ml-1 text-brand-primary">*</span>}
        </span>
        {error && (
          <span className="animate-fade-in normal-case tracking-normal text-destructive">
            {error}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card transition-colors hover:border-brand-primary/30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40"
      >
        <span className="text-sm font-semibold text-foreground sm:text-base">{q}</span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-brand-primary transition-transform duration-300 ${
            open ? "rotate-45 border-brand-primary/50 bg-brand-primary/10" : ""
          }`}
        >
          <Plus className="h-3.5 w-3.5" />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessState({ email }: { email: string }) {
  const { t } = useTranslation("contact");
  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        tx: (Math.random() - 0.5) * 160,
        tr: Math.random() * 540 - 270,
        delay: Math.random() * 0.25,
        color: ["#3b82f6", "#22c55e", "#f59e0b", "#a78bfa", "#ec4899"][i % 5],
      })),
    [],
  );

  return (
    <div className="relative flex flex-col items-center gap-4 py-8 text-center">
      {/* Confetti */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
        {pieces.map((p) => (
          <span
            key={p.id}
            className="confetti absolute top-6 h-2 w-2 rounded-[2px]"
            style={
              {
                left: `${p.left}%`,
                background: p.color,
                animationDelay: `${p.delay}s`,
                "--tx": `${p.tx}px`,
                "--tr": `${p.tr}deg`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative">
        <span aria-hidden className="ring-pulse absolute inset-0 rounded-full bg-brand-primary/25" />
        <span aria-hidden className="ring-pulse absolute inset-0 rounded-full bg-brand-primary/20" style={{ animationDelay: ".4s" }} />
        <span className="success-pop relative grid h-16 w-16 place-items-center rounded-full bg-brand-primary text-brand-primary-foreground shadow-[0_16px_40px_-12px_color-mix(in_oklch,var(--brand-primary),transparent_30%)]">
          <CheckCircle2 className="h-8 w-8" />
        </span>
      </div>

      <h2 className="mt-2 text-2xl font-semibold text-foreground">
        {t("success.title")}
      </h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        {t("success.description", { email })}
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
      >
        {t("success.backToHome")} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function FloatingMockup() {
  const { t } = useTranslation("contact");
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => setDots((d) => (d % 3) + 1), 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto h-[440px] w-full max-w-md">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute inset-8 rounded-[2rem] blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--brand-primary), transparent 55%), transparent 70%)",
        }}
      />

      {/* Back card — inbox */}
      <div className="mockup-b absolute right-2 top-6 w-64 rounded-2xl border border-border/70 bg-card p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Mail className="h-3.5 w-3.5 text-brand-primary" /> {t("mockup.inbox")}
        </div>
        <div className="mt-3 space-y-2.5">
          {[
            { n: "Dr. Alex T.", m: "Redesign proposal" },
            { n: "Skin & Co.", m: "SEO audit request" },
            { n: "RS Institute", m: "Migration timeline?" },
          ].map((r, i) => (
            <div key={r.n} className="flex items-center gap-2.5 rounded-lg bg-muted/50 p-2">
              <span className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-foreground">{t(`mockup.messages.${i}.name`)}</p>
                <p className="truncate text-[10px] text-muted-foreground">{t(`mockup.messages.${i}.message`)}</p>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* Front card — active message */}
      <div className="mockup-a absolute left-0 top-24 w-72 rounded-2xl border border-border/70 bg-card p-5 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-xs font-bold text-white">
            {t("mockup.activeHeader.initials")}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{t("mockup.activeHeader.name")}</p>
            <p className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t("mockup.activeHeader.status")}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-[12px] text-foreground">
            {t("mockup.chat.0")}
          </div>
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-brand-primary px-3 py-2 text-[12px] text-brand-primary-foreground">
            {t("mockup.chat.1")}
          </div>
          <div className="flex max-w-[60%] items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-3 py-2.5 text-[12px] text-muted-foreground">
            <span className="typing-dots">
              {".".repeat(dots)}
            </span>
            <span className="ml-1 text-[10px]">{t("mockup.typing")}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
          <input
            aria-hidden
            tabIndex={-1}
            readOnly
            placeholder={t("mockup.placeholder")}
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
          <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-primary text-brand-primary-foreground">
            <Send className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Floating pill */}
      <div className="mockup-b absolute -bottom-2 right-6 flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-2 shadow-lg">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
          <CheckCircle2 className="h-3.5 w-3.5" />
        </span>
        <span className="text-[11px] font-semibold text-foreground">{t("mockup.replyStatus")}</span>
      </div>
    </div>
  );
}
