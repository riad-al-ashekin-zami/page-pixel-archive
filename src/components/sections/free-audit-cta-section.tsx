import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm as useFormspree } from "@formspree/react";
import { ArrowRight, ClipboardCheck, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { z } from "zod";
import { captureLead } from "@/lib/capture-lead";

export function FreeAuditCtaSection() {
  const { t } = useTranslation("homeSections");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fsState, fsSubmit] = useFormspree("mqerpale");
  const submitted = fsState.succeeded;

  const schema = z.object({
    email: z.string().trim().email({ message: t("freeAudit.form.errorInvalidEmail") }).max(255),
    website: z.string().trim().max(255).optional().or(z.literal("")),
  });

  useEffect(() => {
    if (fsState.errors) {
      setError(t("freeAudit.form.errorGeneric"));
    }
  }, [fsState.errors, t]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, website });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? t("freeAudit.form.errorInvalidInput"));
      return;
    }
    setError(null);
    await fsSubmit({
      email,
      website,
      _subject: `Homepage audit request — ${email}`,
    });
    void captureLead({
      name: email.split("@")[0] ?? email,
      email,
      website_url: website,
      service_needed: "Homepage audit (CTA)",
    });
  };

  const features = [
    { icon: ClipboardCheck, label: t("freeAudit.features.actionPlan") },
    { icon: Clock, label: t("freeAudit.features.delivered") },
    { icon: ShieldCheck, label: t("freeAudit.features.free") },
    { icon: Sparkles, label: t("freeAudit.features.insights") },
  ];

  return (
    <section id="free-audit" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative isolate overflow-hidden rounded-3xl px-6 py-14 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)] sm:px-10 sm:py-16 lg:px-14 lg:py-20"
          style={{
            background:
              "radial-gradient(700px 340px at 88% -10%, rgba(92,189,185,0.22), transparent 60%), radial-gradient(600px 320px at 6% 110%, rgba(45,138,158,0.28), transparent 60%), linear-gradient(180deg, #0c2340 0%, #081a31 60%, #050f22 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--brand-accent)" }}
          />

          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-8">
            <div className="text-brand-primary-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> {t("freeAudit.eyebrow")}
              </span>
              <h2 className="mt-6 text-balance text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl">
                {t("freeAudit.headingLead")}{" "}
                <span className="font-medium text-brand-accent">{t("freeAudit.headingHighlight")}</span>
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
                {t("freeAudit.intro")}
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f.label} className="flex items-center gap-2.5 text-sm text-white/90">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15">
                      <f.icon className="h-4 w-4" aria-hidden />
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/95 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <ClipboardCheck className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">
                    {t("freeAudit.form.successTitle")}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    {t("freeAudit.form.successMessage")}
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <div>
                    <label htmlFor="audit-email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("freeAudit.form.emailLabel")}
                    </label>
                    <input
                      id="audit-email"
                      type="email"
                      required
                      maxLength={255}
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("freeAudit.form.emailPlaceholder")}
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="audit-website" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("freeAudit.form.websiteLabel")} <span className="font-normal normal-case text-muted-foreground/70">{t("freeAudit.form.websiteOptional")}</span>
                    </label>
                    <input
                      id="audit-website"
                      type="text"
                      maxLength={255}
                      autoComplete="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder={t("freeAudit.form.websitePlaceholder")}
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="mt-4 text-xs font-medium text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={fsState.submitting}
                    className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5 disabled:opacity-70"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                    }}
                  >
                    {fsState.submitting ? t("freeAudit.form.sending") : t("freeAudit.form.submit")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <p className="mt-4 text-center text-[11px] text-muted-foreground">
                    {t("freeAudit.form.privacy")}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
