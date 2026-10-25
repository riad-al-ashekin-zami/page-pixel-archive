import { useState } from "react";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { z } from "zod";
import { submitLead } from "@/lib/leads.functions";
import { getTracking } from "@/lib/utm";
import { CTA_I18N_KEY, CTA_LABEL } from "@/lib/cta";

import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal } from "@/components/reveal";
import { isValidUrlLang } from "@/i18n/languages";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage } from "@/lib/i18n-routing";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { robotsContent } from "@/lib/index-allowlist";

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
        { name: "robots", content: robotsContent(params.lang, "/contact") },
        { title: st?.meta?.title ?? "Contact Us" },
        {
          name: "description",
          content:
            st?.meta?.description ??
            "Tell us about your practice and website. We'll send a free, personalized audit with SEO, speed and conversion opportunities within 48 hours.",
        },
        { property: "og:title", content: st?.meta?.ogTitle ?? "Contact Us" },
        {
          property: "og:description",
          content:
            st?.meta?.ogDescription ??
            "Tell us about your practice and website. We'll send a free, personalized audit with SEO, speed and conversion opportunities within 48 hours.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: st?.meta?.ogTitle ?? "Contact Us" },
        {
          name: "twitter:description",
          content:
            st?.meta?.ogDescription ??
            "Tell us about your practice and website. We'll send a free, personalized audit with SEO, speed and conversion opportunities within 48 hours.",
        },
      ],
      links: [
        { rel: "canonical", href: "https://dermatologywebsitedesign.com/contact" },
        ...buildHreflangLinks("/contact", params.lang),
      ],
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

/** Normalize a website URL: accept input without protocol. */
function normalizeUrl(raw: string): string {
  const v = raw.trim();
  if (!v) return v;
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

const schema = z.object({
  name: z.string().trim().min(2, "name").max(120),
  email: z.string().trim().email("email").max(255),
  website: z.string().trim().min(2, "website").max(255),
  practiceType: z.string().min(1, "practiceType"),
  need: z.string().min(1, "need"),
  message: z.string().trim().max(1000, "message"),
  consent: z.literal(true, "consent"),
});

type FormState = {
  name: string;
  email: string;
  website: string;
  practiceType: string;
  need: string;
  message: string;
  consent: boolean;
  // Honeypot — invisible to humans, filled by bots.
  company: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  website: "",
  practiceType: "",
  need: "",
  message: "",
  consent: false,
  company: "",
};

const PRACTICE_TYPES = [
  "Solo practice",
  "Multi-location practice",
  "Aesthetic / Cosmetic clinic",
  "Pediatric dermatology",
  "Mohs / Surgical",
  "Dermatology group",
  "Other",
] as const;

const NEEDS = [
  "New website",
  "Website redesign",
  "Website migration",
  "SEO",
  "Google Ads / PPC",
  "Social media",
  "Not sure yet",
] as const;

const inputCls =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20";
const labelCls =
  "block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

function ContactPage() {
  const { t } = useTranslation("contact");
  const { t: tu, i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = Route.useParams();
  const [form, setForm] = useState<FormState>(initial);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const messageCount = form.message.length;
  const messageMax = 1000;

  const validateField = (name: keyof FormState, value: string | boolean) => {
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
    setFieldErrors((f) => ({
      ...f,
      [name]: issue?.message ? t(`auditForm.validation.${issue.message}`) : undefined,
    }));
  };

  const update =
    <K extends keyof FormState>(k: K) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const v = e.target.value;
      setForm((f) => ({ ...f, [k]: v }));
      if (fieldErrors[k]) validateField(k, v);
    };

  const onBlur = (k: keyof FormState) => () => validateField(k, form[k]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: silently "succeed" for bots without storing anything.
    if (form.company) {
      void navigate({ to: "/{-$lang}/thank-you", params: { lang } });
      return;
    }

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!errs[k]) errs[k] = t(`auditForm.validation.${issue.message}`);
      }
      setFieldErrors(errs);
      setGlobalError(t("auditForm.errors.fixFields"));
      return;
    }

    // Basic client-side rate limiting: one submission per 60 seconds.
    const COOLDOWN_MS = 60_000;
    try {
      const last = Number(localStorage.getItem("contact_last_submit") ?? 0);
      const remaining = COOLDOWN_MS - (Date.now() - last);
      if (last && remaining > 0) {
        setGlobalError(
          t("auditForm.errors.cooldown", { seconds: Math.ceil(remaining / 1000) }),
        );
        return;
      }
    } catch {
      // ignore
    }

    setGlobalError(null);
    setSubmitting(true);
    try {
      const tracking = getTracking();
      const result = await submitLead({
        data: {
          name: form.name,
          email: form.email,
          website_url: normalizeUrl(form.website),
          company_name: form.practiceType,
          service_needed: form.need,
          project_details: form.message || null,
          preferred_contact: "Email",
          source_page: tracking.source_page,
          language: i18n.resolvedLanguage ?? i18n.language ?? "en",
          utm_source: tracking.utm_source,
          utm_medium: tracking.utm_medium,
          utm_campaign: tracking.utm_campaign,
          utm_term: tracking.utm_term,
          utm_content: tracking.utm_content,
        },
      });
      if (!result.ok) {
        setGlobalError(t("auditForm.errors.global"));
        return;
      }
      try {
        localStorage.setItem("contact_last_submit", String(Date.now()));
      } catch {
        // ignore
      }
      void navigate({ to: "/{-$lang}/thank-you", params: { lang } });
    } catch {
      setGlobalError(t("auditForm.errors.global"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main">
        {/* Hero + form */}
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
          <div aria-hidden className="orb orb-a pointer-events-none absolute -z-10" />
          <div aria-hidden className="orb orb-b pointer-events-none absolute -z-10" />

          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:px-8 lg:py-24">
            {/* Left: intro copy */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                <Sparkles className="h-3.5 w-3.5" /> {t("auditForm.hero.tag")}
              </span>
              <h1 className="mt-6 text-balance text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
                {tu(CTA_I18N_KEY, { defaultValue: CTA_LABEL })}
              </h1>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t("auditForm.hero.intro")}
              </p>

              <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                {[
                  { icon: Clock, key: "0" },
                  { icon: CheckCircle2, key: "1" },
                  { icon: ShieldCheck, key: "2" },
                ].map((f) => (
                  <li key={f.key} className="flex items-center gap-2.5">
                    <f.icon className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                    {t(`auditForm.hero.points.${f.key}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: the single form */}
            <Reveal className="mt-12 lg:mt-0">
              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] sm:p-8">
                <form onSubmit={onSubmit} noValidate>
                  {/* Honeypot — hidden from humans */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="contact-company">Company</label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.company}
                      onChange={update("company")}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className={labelCls}>
                        {t("auditForm.labels.name")} <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        maxLength={120}
                        autoComplete="name"
                        value={form.name}
                        onChange={update("name")}
                        onBlur={onBlur("name")}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                        placeholder={t("auditForm.placeholders.name")}
                        className={inputCls}
                      />
                      {fieldErrors.name && (
                        <p id="contact-name-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className={labelCls}>
                        {t("auditForm.labels.email")} <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        maxLength={255}
                        autoComplete="email"
                        value={form.email}
                        onChange={update("email")}
                        onBlur={onBlur("email")}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                        placeholder={t("auditForm.placeholders.email")}
                        className={inputCls}
                      />
                      {fieldErrors.email && (
                        <p id="contact-email-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="contact-website" className={labelCls}>
                      {t("auditForm.labels.website")} <span className="text-brand-primary">*</span>
                    </label>
                    <input
                      id="contact-website"
                      type="text"
                      required
                      maxLength={255}
                      autoComplete="url"
                      inputMode="url"
                      value={form.website}
                      onChange={update("website")}
                      onBlur={onBlur("website")}
                      aria-invalid={Boolean(fieldErrors.website)}
                      aria-describedby={fieldErrors.website ? "contact-website-error" : undefined}
                      placeholder={t("auditForm.placeholders.website")}
                      className={inputCls}
                    />
                    {fieldErrors.website && (
                      <p id="contact-website-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                        {fieldErrors.website}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-practice" className={labelCls}>
                        {t("auditForm.labels.practiceType")} <span className="text-brand-primary">*</span>
                      </label>
                      <select
                        id="contact-practice"
                        required
                        value={form.practiceType}
                        onChange={update("practiceType")}
                        onBlur={onBlur("practiceType")}
                        aria-invalid={Boolean(fieldErrors.practiceType)}
                        aria-describedby={fieldErrors.practiceType ? "contact-practice-error" : undefined}
                        className={inputCls}
                      >
                        <option value="">{t("auditForm.placeholders.select")}</option>
                        {PRACTICE_TYPES.map((opt, i) => (
                          <option key={opt} value={opt}>
                            {t(`auditForm.practiceTypes.${i}`)}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.practiceType && (
                        <p id="contact-practice-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                          {fieldErrors.practiceType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-need" className={labelCls}>
                        {t("auditForm.labels.need")} <span className="text-brand-primary">*</span>
                      </label>
                      <select
                        id="contact-need"
                        required
                        value={form.need}
                        onChange={update("need")}
                        onBlur={onBlur("need")}
                        aria-invalid={Boolean(fieldErrors.need)}
                        aria-describedby={fieldErrors.need ? "contact-need-error" : undefined}
                        className={inputCls}
                      >
                        <option value="">{t("auditForm.placeholders.select")}</option>
                        {NEEDS.map((opt, i) => (
                          <option key={opt} value={opt}>
                            {t(`auditForm.needs.${i}`)}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.need && (
                        <p id="contact-need-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                          {fieldErrors.need}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="contact-message" className={labelCls}>
                      {t("auditForm.labels.message")}{" "}
                      <span className="font-normal normal-case text-muted-foreground/70">
                        {t("auditForm.labels.optional")}
                      </span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      maxLength={messageMax}
                      value={form.message}
                      onChange={update("message")}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby="contact-message-count"
                      placeholder={t("auditForm.placeholders.message")}
                      className={`${inputCls} resize-y`}
                    />
                    <p id="contact-message-count" className="mt-1 text-right text-[11px] text-muted-foreground/70">
                      {messageCount}/{messageMax}
                    </p>
                    {fieldErrors.message && (
                      <p role="alert" className="mt-1 text-xs font-medium text-red-600">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                    {t("auditForm.hipaaNotice")}
                  </p>

                  <div className="mt-4">
                    <label htmlFor="contact-consent" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <input
                        id="contact-consent"
                        type="checkbox"
                        required
                        checked={form.consent}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, consent: e.target.checked }));
                          if (fieldErrors.consent) validateField("consent", e.target.checked);
                        }}
                        aria-invalid={Boolean(fieldErrors.consent)}
                        aria-describedby={fieldErrors.consent ? "contact-consent-error" : undefined}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-[var(--brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                      />
                      <span>
                        {t("auditForm.consent.label")}{" "}
                        <Link to="/privacy-policy" className="font-medium text-brand-primary underline underline-offset-2 hover:opacity-80">
                          {t("auditForm.consent.privacyLink")}
                        </Link>
                      </span>
                    </label>
                    {fieldErrors.consent && (
                      <p id="contact-consent-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                        {fieldErrors.consent}
                      </p>
                    )}
                  </div>

                  {globalError && (
                    <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
                      {globalError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        {t("auditForm.submitting")}
                      </>
                    ) : (
                      <>
                        {tu(CTA_I18N_KEY, { defaultValue: CTA_LABEL })}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    {t("auditForm.emailFallback")}{" "}
                    <span className="font-medium text-foreground">info@dermatologywebsitedesign.com</span>
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
