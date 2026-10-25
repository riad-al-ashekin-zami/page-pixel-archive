import { useState, useMemo } from "react";
import { buildHreflangLinks, useCurrentLang } from "@/lib/i18n-routing";
import { useForm as useFormspree } from "@formspree/react";
import { ChevronLeft } from "lucide-react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod";
import { captureLead } from "@/lib/capture-lead";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ClipboardCheck,
  Mail,
  Building2,
  Globe,
  User,
  Wrench,
  Wallet,
  Gauge,
  BadgeDollarSign,
  Zap,
  FileSearch,
  Send,
  Rocket,
  Star,
  Quote,
  Layout,
  RefreshCcw,
  MoveRight,
  Images,
  Search,
  MousePointerClick,
  MapPin,
  ShoppingBag,
  UserRound,
  MessageSquare,
  PenTool,
  Wrench as WrenchIcon,
  TrendingUp,
  Palette,
  HeartPulse,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { WhatsAppIcon } from "@/components/site-header/whatsapp-icon";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { FaqSnippetSection } from "@/components/sections/faq-snippet-section";
import { isValidUrlLang } from "@/i18n/languages";
import { formatLocalizedNumber } from "@/lib/locale-format";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { robotsContent } from "@/lib/index-allowlist";

export const Route = createFileRoute("/{-$lang}/get-a-free-quote")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params }) => {
    const lang = params.lang ?? "";
    const st = getStaticTranslation(lang, "getQuote");

    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/get-a-free-quote") },
        { title: st?.meta?.title ?? "Get a Free Quote — Dermatology Website Design" },
        {
          name: "description",
          content:
            st?.meta?.description ??
            "Request a personalized quote for your dermatology practice website. Transparent pricing, tailored proposal within 24 hours.",
        },
        { property: "og:title", content: st?.meta?.ogTitle ?? "Get a Free Quote — Dermatology Website Design" },
        {
          property: "og:description",
          content:
            st?.meta?.ogDescription ??
            "Tell us about your practice and get a tailored proposal within 24 hours.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { property: "og:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/get-a-free-quote" }, ...buildHreflangLinks("/get-a-free-quote", params.lang)],
    };
  },
  component: QuotePage,
});

const serviceOptions: { name: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { name: "Website Design", icon: Layout },
  { name: "Website Redesign", icon: RefreshCcw },
  { name: "Website Migration", icon: MoveRight },
  { name: "Before & After Gallery", icon: Images },
  { name: "SEO / Local SEO", icon: Search },
  { name: "Google Ads / PPC", icon: MousePointerClick },
  { name: "Multi-Location Site", icon: MapPin },
  { name: "E-Commerce", icon: ShoppingBag },
  { name: "Patient Portal", icon: UserRound },
  { name: "Reputation & Reviews", icon: MessageSquare },
  { name: "Content & Copywriting", icon: PenTool },
  { name: "Care & Maintenance", icon: WrenchIcon },
];

const locationOptions = ["1 location", "2–3 locations", "4–10 locations", "10+ locations"];
const pageOptions = ["1 page", "5–8 pages", "10–15 pages", "15–20 pages", "20+ pages"];
const adminOptions = ["Yes", "No", "Not sure"];
const budgets = ["Under $1k", "$1k – $2k", "$4k – $5k", "$7k – $10k", "$10k+"];
const urgencies = [
  "Within 48 hours",
  "Within 7 days",
  "Within 1 month",
  "Within 3 months",
  "Within 6 months",
  "No rush / Flexible",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  practice: string;
  website: string;
  services: string[];
  locations: string;
  pages: string;
  admin: string;
  budget: string;
  urgency: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  practice: "",
  website: "",
  services: [],
  locations: "",
  pages: "",
  admin: "",
  budget: "",
  urgency: "",
  message: "",
};

const helpCategories = [
  {
    label: "Design",
    icon: Palette,
    items: [
      "Custom Website Design",
      "Website Redesign",
      "Website Migration",
      "Multi-Location Sites",
      "Before & After Galleries",
      "Patient Portals",
    ],
  },
  {
    label: "Growth",
    icon: TrendingUp,
    items: [
      "Dermatology SEO",
      "Local SEO",
      "Google Ads / PPC",
      "E-Commerce",
      "Content & Copywriting",
      "Analytics & CRO",
    ],
  },
  {
    label: "Care",
    icon: HeartPulse,
    items: [
      "Reputation & Reviews",
      "Speed Optimization",
      "HIPAA-Aware Hosting",
      "Care & Maintenance",
    ],
  },
];

const TOTAL_STEPS = 4;

function QuotePage() {
  const { t } = useTranslation("getQuote");
  const lang = useCurrentLang();
  const [form, setForm] = useState<FormState>(initial);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [fsState, fsSubmit] = useFormspree("xykrkpak");
  const submitted = fsState.succeeded;

  const stepSchemas = useMemo(
    () => [
      z.object({
        name: z.string().trim().min(2, t("form.validation.name")).max(80),
        email: z.string().trim().email(t("form.validation.email")).max(255),
        practice: z.string().trim().min(2, t("form.validation.practiceName")).max(120),
      }),
      z.object({
        locations: z.string().min(1, t("form.validation.locations")),
        pages: z.string().min(1, t("form.validation.websiteSize")),
        admin: z.string().min(1, t("form.validation.adminAccess")),
      }),
      z.object({
        services: z.array(z.string()).min(1, t("form.validation.service")),
      }),
      z.object({
        budget: z.string().min(1, t("form.validation.budget")),
        urgency: z.string().min(1, t("form.validation.urgency")),
      }),
    ],
    [t]
  );

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t("form.validation.name")).max(80),
        email: z.string().trim().email(t("form.validation.email")).max(255),
        phone: z.string().trim().max(40).optional().or(z.literal("")),
        practice: z.string().trim().min(2, t("form.validation.practiceName")).max(120),
        website: z.string().trim().max(255).optional().or(z.literal("")),
        services: z.array(z.string()).min(1, t("form.validation.service")),
        locations: z.string().min(1, t("form.validation.locations")),
        pages: z.string().min(1, t("form.validation.websiteSize")),
        admin: z.string().min(1, t("form.validation.adminAccess")),
        budget: z.string().min(1, t("form.validation.budget")),
        urgency: z.string().min(1, t("form.validation.urgency")),
        message: z.string().trim().max(2000).optional().or(z.literal("")),
      }),
    [t]
  );

  const update =
    <K extends keyof FormState>(k: K) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value } as FormState));

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));

  const validateCurrentStep = () => {
    const parsed = stepSchemas[step - 1].safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? t("form.validation.completeStep"));
      return false;
    }
    setError(null);
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const prevStep = () => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? t("form.validation.checkForm"));
      return;
    }

    const COOLDOWN_MS = 60_000;
    try {
      const last = Number(localStorage.getItem("quote_last_submit") ?? 0);
      const remaining = COOLDOWN_MS - (Date.now() - last);
      if (last && remaining > 0) {
        setError(
          t("form.validation.wait", { seconds: Math.ceil(remaining / 1000) })
        );
        return;
      }
    } catch {
      // localStorage unavailable
    }

    setError(null);
    await fsSubmit({
      ...form,
      services: form.services.join(", "),
      _subject: `New Quote Request from ${form.practice}`,
    });
    void captureLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company_name: form.practice,
      website_url: form.website,
      service_needed: form.services.join(", "),
      budget: form.budget,
      timeline: form.urgency,
      project_details: `${form.message}\n\nLocations: ${form.locations} | Pages: ${form.pages} | Admin: ${form.admin}`,
      preferred_contact: "Email",
    });
    try {
      localStorage.setItem("quote_last_submit", String(Date.now()));
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-brand-primary/5 via-background to-background">
          {/* grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* orbs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklch, var(--brand-primary), transparent 55%), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--brand-accent)" }}
          />

          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t("hero.title")}{" "}
                <span className="font-medium text-brand-primary">
                  {t("hero.titleHighlight")}
                </span>{" "}
                {t("hero.titleSuffix")}
              </h1>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t("hero.description")}
              </p>

              <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                {[
                  { icon: Clock },
                  { icon: ShieldCheck },
                  { icon: CheckCircle2 },
                ].map((f, i) => (
                  <li key={i} className="inline-flex items-center gap-2">
                    <f.icon className="h-4 w-4 text-brand-primary" aria-hidden />
                    {t(`hero.features.${i}`)}
                  </li>
                ))}
              </ul>

              {/* Trust row: honest, consistent with homepage */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/[0.06] px-4 py-2 text-xs font-medium text-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
                  </span>
                  <span className="text-muted-foreground">{t("hero.trust.repliesWithin")}</span>
                  <span className="font-semibold tabular-nums text-brand-primary">{t("hero.trust.repliesValue")}</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-primary" />
                  <CountUp value={t("hero.trust.launchedValue")} className="font-semibold tabular-nums text-foreground" />
                  <span className="text-muted-foreground">{t("hero.trust.launchedText")}</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs">
                  <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                  <CountUp value={t("hero.trust.focusValue")} className="font-semibold tabular-nums text-foreground" />
                  <span className="text-muted-foreground">{t("hero.trust.focusText")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="bg-background py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-14">
              {/* Left rail */}
              <aside className="min-w-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
                <Reveal>
                  <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-[0_10px_24px_-20px_color-mix(in_oklch,var(--foreground),transparent_35%)]">
                    <h2 className="text-lg font-semibold text-foreground">
                      {t("sidebar.whatHappensNext.title")}
                    </h2>
                    <ol className="mt-4 space-y-4 text-sm text-muted-foreground">
                      {[0, 1, 2].map((i) => (
                        <li key={i} className="flex gap-3">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-xs font-semibold text-brand-primary">
                            {i + 1}
                          </span>
                          <span>{t(`sidebar.whatHappensNext.steps.${i}`)}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="rounded-2xl border border-border/70 bg-card p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("sidebar.preferToTalk.title")}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm">
                      <li>
                        <a
                          href="mailto:info@dermatologywebsitedesign.com"
                          className="inline-flex max-w-full items-start gap-2 break-all text-foreground hover:text-brand-primary"
                        >
                          <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                          <span className="min-w-0 break-all">{t("sidebar.preferToTalk.email")}</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://wa.me/8801815840813"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-foreground hover:text-brand-primary"
                        >
                          <WhatsAppIcon className="h-4 w-4" />
                          {t("sidebar.preferToTalk.chat")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Reveal>

                {/* Guarantee badge */}
                <Reveal delay={0.2}>
                  <div className="relative overflow-hidden rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/[0.08] via-card to-card p-6">
                    <div
                      aria-hidden
                      className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-primary/10 blur-2xl"
                    />
                    <div className="relative flex items-start gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary">
                        <ShieldCheck className="h-6 w-6" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
                          {t("sidebar.guarantee.title")}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {t("sidebar.guarantee.description")}
                        </p>
                        <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                          {[0, 1, 2].map((i) => {
                            const text = t(`sidebar.guarantee.benefits.${i}`);
                            return (
                              <li key={text} className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" />
                                {text}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </aside>

              {/* Form card */}
              <Reveal className="min-w-0">
                <div className="group/formcard relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-[0_20px_60px_-40px_color-mix(in_oklch,var(--foreground),transparent_30%)] sm:p-8 lg:p-10">
                  {/* Card glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-700 group-hover/formcard:opacity-60"
                    style={{
                      background:
                        "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 70%), color-mix(in oklch, var(--brand-accent), transparent 70%))",
                    }}
                  />
                  {/* Gradient top border accent */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 60%), var(--brand-accent))",
                    }}
                  />

                  {submitted ? (
                    <div className="flex flex-col items-center py-14 text-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                        <ClipboardCheck className="h-7 w-7" />
                      </span>
                      <h3 className="mt-5 text-2xl font-semibold text-foreground">
                        {t("form.success.title")}
                    </h3>
                      <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        {t("form.success.description")}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} noValidate className="space-y-8">
                      {/* Progress bar */}
                      <div>
                        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          <span>{t("form.progress.step")} <span className="tabular-nums text-brand-primary">{formatLocalizedNumber(step, lang, 2)}</span> {t("form.progress.of")} {formatLocalizedNumber(TOTAL_STEPS, lang, 2)}</span>
                          <span className="tabular-nums text-brand-primary">{formatLocalizedNumber(Math.round((step / TOTAL_STEPS) * 100), lang)}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-primary/10">
                          <div
                            className="h-full rounded-full bg-brand-primary transition-all duration-500 ease-out"
                            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                          />
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                          {[0, 1, 2, 3].map((i) => {
                            const label = t(`form.progress.labels.${i}`);
                            return (
                              <span
                                key={label}
                                className={`inline-flex items-center gap-1.5 ${step === i + 1 ? "font-semibold text-brand-primary" : step > i + 1 ? "text-foreground/80" : ""}`}
                              >
                                <span className={`grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold ${step > i + 1 ? "bg-brand-primary text-brand-primary-foreground" : step === i + 1 ? "bg-brand-primary/20 text-brand-primary" : "bg-muted text-muted-foreground"}`}>
                                  {step > i + 1 ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                                </span>
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {step === 1 && (
                        <>
                          {/* Contact */}
                          <FormSection icon={User} title={t("form.sections.contactInfo")} step={1} total={4}>
                            <div className="grid gap-5 sm:grid-cols-2">
                              <Field label={t("form.fields.yourName.label")} required>
                                <input
                                  type="text"
                                  required
                                  maxLength={80}
                                  value={form.name}
                                  onChange={update("name")}
                                  placeholder={t("form.fields.yourName.placeholder")}
                                  className={inputCls}
                                />
                              </Field>
                              <Field label={t("form.fields.workEmail.label")} required>
                                <input
                                  type="email"
                                  required
                                  maxLength={255}
                                  value={form.email}
                                  onChange={update("email")}
                                  placeholder={t("form.fields.workEmail.placeholder")}
                                  className={inputCls}
                                />
                              </Field>
                              <Field label={t("form.fields.phone.label")} hint={t("form.fields.phone.hint")}>
                                <input
                                  type="tel"
                                  maxLength={40}
                                  value={form.phone}
                                  onChange={update("phone")}
                                  placeholder={t("form.fields.phone.placeholder")}
                                  className={inputCls}
                                />
                              </Field>
                              <Field label={t("form.fields.practiceName.label")} required>
                                <div className="relative">
                                  <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                  <input
                                    type="text"
                                    required
                                    maxLength={120}
                                    value={form.practice}
                                    onChange={update("practice")}
                                    placeholder={t("form.fields.practiceName.placeholder")}
                                    className={`${inputCls} pl-9`}
                                  />
                                </div>
                              </Field>
                            </div>
                          </FormSection>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          {/* Website */}
                          <FormSection icon={Globe} title={t("form.sections.websiteDetails")} step={2} total={4}>
                            <div className="grid gap-5 sm:grid-cols-2">
                              <Field label={t("form.fields.currentWebsite.label")} hint={t("form.fields.currentWebsite.hint")}>
                                <div className="relative">
                                  <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                  <input
                                    type="text"
                                    maxLength={255}
                                    value={form.website}
                                    onChange={update("website")}
                                    placeholder={t("form.fields.currentWebsite.placeholder")}
                                    className={`${inputCls} pl-9`}
                                  />
                                </div>
                              </Field>
                              <Field label={t("form.fields.numberOfLocations.label")} required>
                                <select
                                  required
                                  value={form.locations}
                                  onChange={update("locations")}
                                  className={inputCls}
                                >
                                  <option value="">{t("form.fields.numberOfLocations.select")}</option>
                                  {locationOptions.map((_, i) => {
                                    const val = t(`options.locations.${i}`);
                                    return (
                                      <option key={val} value={val}>
                                        {val}
                                      </option>
                                    );
                                  })}
                                </select>
                              </Field>
                              <Field label={t("form.fields.websiteSize.label")} required>
                                <select
                                  required
                                  value={form.pages}
                                  onChange={update("pages")}
                                  className={inputCls}
                                >
                                  <option value="">{t("form.fields.websiteSize.select")}</option>
                                  {pageOptions.map((_, i) => {
                                    const val = t(`options.pages.${i}`);
                                    return (
                                      <option key={val} value={val}>
                                        {val}
                                      </option>
                                    );
                                  })}
                                </select>
                              </Field>
                              <Field label={t("form.fields.adminAccess.label")} required>
                                <div className="flex flex-wrap gap-2">
                                  {adminOptions.map((_, i) => {
                                    const val = t(`options.admin.${i}`);
                                    const active = form.admin === val;
                                    return (
                                      <button
                                        key={val}
                                        type="button"
                                        onClick={() =>
                                          setForm((f) => ({ ...f, admin: val }))
                                        }
                                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                                          active
                                            ? "border-brand-primary bg-brand-primary text-brand-primary-foreground"
                                            : "border-border bg-background text-foreground hover:border-brand-primary/50"
                                        }`}
                                      >
                                        {val}
                                      </button>
                                    );
                                  })}
                                </div>
                              </Field>
                            </div>
                          </FormSection>
                        </>
                      )}

                      {step === 3 && (
                        <>
                          {/* Services (multi) — icon tiles */}
                          <FormSection
                            icon={Wrench}
                            title={t("form.sections.helpWith")}
                            step={3}
                            total={4}
                          >
                            <p className="mb-4 text-xs text-muted-foreground">
                              {t("form.servicesText.select")}{" "}
                              <span className="font-semibold text-brand-primary">
                                {form.services.length}
                              </span>{" "}
                              {form.services.length === 1 ? t("form.servicesText.service") : t("form.servicesText.services")}.
                            </p>
                            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                              {serviceOptions.map((opt, i) => {
                                const name = t(`options.services.${i}`);
                                const active = form.services.includes(name);
                                const Icon = opt.icon;
                                return (
                                  <button
                                    key={name}
                                    type="button"
                                    onClick={() => toggleService(name)}
                                    aria-pressed={active}
                                    className={`group/tile relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all duration-200 ${
                                      active
                                        ? "border-brand-primary bg-brand-primary/[0.08] shadow-[0_6px_18px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]"
                                        : "border-border bg-background hover:-translate-y-0.5 hover:border-brand-primary/50 hover:bg-brand-primary/[0.03]"
                                    }`}
                                  >
                                    <span
                                      className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                                        active
                                          ? "bg-brand-primary text-brand-primary-foreground"
                                          : "bg-brand-primary/10 text-brand-primary"
                                      }`}
                                    >
                                      <Icon className="h-4 w-4" />
                                    </span>
                                    <span
                                      className={`text-xs font-medium leading-tight ${
                                        active ? "text-brand-primary" : "text-foreground"
                                      }`}
                                    >
                                      {name}
                                    </span>
                                    <span
                                      className={`absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full border transition-all ${
                                        active
                                          ? "border-brand-primary bg-brand-primary text-brand-primary-foreground"
                                          : "border-border bg-background"
                                      }`}
                                      aria-hidden
                                    >
                                      {active && (
                                        <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                                      )}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </FormSection>
                        </>
                      )}

                      {step === 4 && (
                        <>
                          {/* Budget & Timeline */}
                          <FormSection icon={Wallet} title={t("form.sections.budgetTimeline")} step={4} total={4}>
                            <div className="grid gap-5 sm:grid-cols-2">
                              <Field label={t("form.fields.estimatedBudget.label")} required>
                                <select
                                  required
                                  value={form.budget}
                                  onChange={update("budget")}
                                  className={inputCls}
                                >
                                  <option value="">{t("form.fields.estimatedBudget.select")}</option>
                                  {budgets.map((_, i) => {
                                    const val = t(`options.budgets.${i}`);
                                    return (
                                      <option key={val} value={val}>
                                        {val}
                                      </option>
                                    );
                                  })}
                                </select>
                              </Field>
                              <Field label={t("form.fields.urgency.label")} required>
                                <select
                                  required
                                  value={form.urgency}
                                  onChange={update("urgency")}
                                  className={inputCls}
                                >
                                  <option value="">{t("form.fields.urgency.select")}</option>
                                  {urgencies.map((_, i) => {
                                    const val = t(`options.urgencies.${i}`);
                                    return (
                                      <option key={val} value={val}>
                                        {val}
                                      </option>
                                    );
                                  })}
                                </select>
                              </Field>
                            </div>

                            <div className="mt-5">
                              <Field label={t("form.fields.projectDetails.label")} hint={t("form.fields.projectDetails.hint")}>
                                <textarea
                                  rows={5}
                                  maxLength={2000}
                                  value={form.message}
                                  onChange={update("message")}
                                  placeholder={t("form.fields.projectDetails.placeholder")}
                                  className={`${inputCls} resize-y`}
                                />
                              </Field>
                            </div>
                          </FormSection>
                        </>
                      )}

                      {error && (
                        <p
                          role="alert"
                          className="text-xs font-medium text-red-600"
                        >
                          {error}
                        </p>
                      )}

                      {fsState.errors && (() => {
                        const errs = fsState.errors as unknown as { formErrors?: { message: string }[] };
                        const first = errs?.formErrors?.[0]?.message;
                        return first ? (
                          <p role="alert" className="text-xs font-medium text-red-600">
                            {first}
                          </p>
                        ) : null;
                      })()}

                      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {step > 1 ? (
                          <button
                            type="button"
                            onClick={prevStep}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:bg-brand-primary/[0.04]"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            {t("form.buttons.back")}
                          </button>
                        ) : (
                          <span className="hidden sm:block" />
                        )}

                        {step < TOTAL_STEPS ? (
                          <button
                            type="button"
                            onClick={nextStep}
                            className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5"
                            style={{
                              background:
                                "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                            }}
                          >
                            {t("form.buttons.continue")}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={fsState.submitting}
                            className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                            style={{
                              background:
                                "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                            }}
                          >
                            <span
                              aria-hidden
                              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"
                            />
                            <span className="relative z-10 inline-flex items-center gap-2">
                              {fsState.submitting ? t("form.buttons.sending") : t("form.buttons.submit")}
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                            </span>
                          </button>
                        )}
                      </div>

                      <p className="text-center text-[11px] text-muted-foreground sm:text-left">
                        {t("form.footerText")}
                      </p>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Why Request a Quote */}
        <section className="relative isolate overflow-hidden border-t border-border/60 bg-brand-primary/[0.03] py-16 sm:py-20 lg:py-24">
          {/* Section texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(var(--foreground) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklch, var(--brand-accent), transparent 60%), transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-3xl font-light tracking-tight text-foreground sm:text-4xl">
                  {t("sections.whyQuote.title")}{" "}
                  <span className="font-medium text-brand-primary">{t("sections.whyQuote.titleHighlight")}</span>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {t("sections.whyQuote.subtitle")}
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: BadgeDollarSign },
                { icon: Gauge },
                { icon: ShieldCheck },
                { icon: Zap },
              ].map((f, i) => {
                const title = t(`sections.whyQuote.items.${i}.title`);
                return (
                  <Reveal key={title} delay={i * 0.06}>
                    <div className="h-full rounded-2xl border border-border/70 bg-card p-6 shadow-[0_10px_24px_-20px_color-mix(in_oklch,var(--foreground),transparent_35%)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_20px_40px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                        <f.icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 text-base font-semibold text-foreground">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {t(`sections.whyQuote.items.${i}.body`)}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* What we can help with — categorized */}
        <section className="bg-background py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-3xl font-light tracking-tight text-foreground sm:text-4xl">
                  {t("sections.whatWeCanHelpWith.title")}{" "}
                  <span className="font-medium text-brand-primary">{t("sections.whatWeCanHelpWith.titleHighlight")}</span>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {t("sections.whatWeCanHelpWith.subtitle")}
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {helpCategories.map((cat, i) => {
                const label = t(`sections.whatWeCanHelpWith.categories.${i}.label`);
                return (
                  <Reveal key={label} delay={i * 0.08}>
                    <div className="h-full rounded-2xl border border-border/70 bg-card p-6">
                      <div className="flex items-center gap-2.5 border-b border-border/60 pb-4">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-primary/10 text-brand-primary">
                          <cat.icon className="h-4 w-4" />
                        </span>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                          {label}
                        </h3>
                      </div>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {cat.items.map((_, j) => {
                          const itemText = t(`sections.whatWeCanHelpWith.categories.${i}.items.${j}`);
                          return (
                            <li
                              key={itemText}
                              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                            >
                              <CheckCircle2 className="h-3 w-3 text-brand-primary" />
                              {itemText}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
              {t("sections.whatWeCanHelpWith.footer")}
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="relative isolate overflow-hidden border-t border-border/60 bg-brand-primary/[0.03] py-16 sm:py-20 lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-3xl font-light tracking-tight text-foreground sm:text-4xl">
                  {t("sections.howItWorks.title")} <span className="font-medium text-brand-primary">{t("sections.howItWorks.titleHighlight")}</span>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {t("sections.howItWorks.subtitle")}
                </p>
              </div>
            </Reveal>

            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Send },
                { icon: FileSearch },
                { icon: ClipboardCheck },
                { icon: Rocket },
              ].map((s, i) => {
                const title = t(`sections.howItWorks.items.${i}.title`);
                return (
                  <Reveal key={title} delay={i * 0.06} as="li">
                    <div className="relative h-full rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_20px_40px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]">
                      <span className="absolute -top-3 left-6 inline-flex h-7 items-center justify-center rounded-full bg-brand-primary px-3 text-xs font-semibold text-brand-primary-foreground">
                        {t("sections.howItWorks.stepLabel")} {i + 1}
                      </span>
                      <span className="mt-2 inline-grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 text-base font-semibold text-foreground">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {t(`sections.howItWorks.items.${i}.body`)}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </section>
      </main>

      <FaqSnippetSection />
      <SiteFooter />
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 hover:border-brand-primary/40";

function FormSection({
  icon: Icon,
  title,
  step,
  total,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  step?: number;
  total?: number;
  children: React.ReactNode;
}) {
  const lang = useCurrentLang();
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <Icon className="h-4 w-4" />
          </span>
          <h3 className="text-[13px] font-semibold uppercase tracking-wider text-foreground sm:text-sm">
            {title}
          </h3>
        </div>
        {step && total ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="tabular-nums text-brand-primary">
              {formatLocalizedNumber(step, lang, 2)}
            </span>
            <span className="opacity-40">/</span>
            <span className="tabular-nums opacity-60">
              {formatLocalizedNumber(total, lang, 2)}
            </span>
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required ? (
          <span className="ml-1 text-brand-primary">*</span>
        ) : hint ? (
          <span className="ml-1 font-normal normal-case text-muted-foreground/70">
            {hint}
          </span>
        ) : null}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
