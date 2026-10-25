import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage } from "@/lib/i18n-routing";
import { FileText, Scale, Mail, ArrowRight, Gavel } from "lucide-react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation, Trans } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

const PAGE_PATH = "/terms-of-service";

export const Route = createFileRoute("/{-$lang}/terms-of-service")({
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
    const st = getStaticTranslation(lang, "termsOfService");
    return {
      meta: [
        { title: st?.meta?.title ?? "Terms of Service" },
        { name: "description", content: st?.meta?.description ?? "The terms that govern your use of our website, communications, and any services you engage from our studio." },
        { name: "robots", content: "noindex,follow" },
        { property: "og:title", content: st?.meta?.og_title ?? "Terms of Service" },
        { property: "og:description", content: st?.meta?.og_description ?? "The terms that govern your use of our website, communications, and any services you engage from our studio." },
        { property: "og:type", content: "article" },
        { property: "og:url", content: localizedUrl(resolveRouteLanguage(lang), PAGE_PATH) },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: st?.meta?.twitter_title ?? "Terms of Service" },
        { name: "twitter:description", content: st?.meta?.twitter_description ?? "The terms that govern your use of our website, communications, and any services you engage from our studio." },
      ],
      links: [{ rel: "canonical", href: localizedUrl(resolveRouteLanguage(lang), PAGE_PATH) }, ...buildHreflangLinks(PAGE_PATH)],
    };
  },
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  const { t } = useTranslation("termsOfService");

  const SECTIONS = [
    {
      id: "acceptance",
      title: t("sections.acceptance.title"),
      body: <p>{t("sections.acceptance.body")}</p>,
    },
    {
      id: "eligibility",
      title: t("sections.eligibility.title"),
      body: <p>{t("sections.eligibility.body")}</p>,
    },
    {
      id: "services",
      title: t("sections.services.title"),
      body: (
        <p>
          <Trans
            t={t}
            i18nKey="sections.services.body"
            components={{ 0: <Link to="/service-agreement" /> }}
          />
        </p>
      ),
    },
    {
      id: "acceptable-use",
      title: t("sections.acceptable_use.title"),
      body: (
        <ul>
          <li>{t("sections.acceptable_use.list.0")}</li>
          <li>{t("sections.acceptable_use.list.1")}</li>
          <li>{t("sections.acceptable_use.list.2")}</li>
          <li>{t("sections.acceptable_use.list.3")}</li>
        </ul>
      ),
    },
    {
      id: "ip",
      title: t("sections.ip.title"),
      body: <p>{t("sections.ip.body")}</p>,
    },
    {
      id: "submissions",
      title: t("sections.submissions.title"),
      body: <p>{t("sections.submissions.body")}</p>,
    },
    {
      id: "third-party",
      title: t("sections.third_party.title"),
      body: <p>{t("sections.third_party.body")}</p>,
    },
    {
      id: "disclaimer",
      title: t("sections.disclaimer.title"),
      body: <p>{t("sections.disclaimer.body")}</p>,
    },
    {
      id: "liability",
      title: t("sections.liability.title"),
      body: <p>{t("sections.liability.body")}</p>,
    },
    {
      id: "indemnity",
      title: t("sections.indemnity.title"),
      body: <p>{t("sections.indemnity.body")}</p>,
    },
    {
      id: "termination",
      title: t("sections.termination.title"),
      body: <p>{t("sections.termination.body")}</p>,
    },
    {
      id: "governing-law",
      title: t("sections.governing_law.title"),
      body: <p>{t("sections.governing_law.body")}</p>,
    },
    {
      id: "changes",
      title: t("sections.changes.title"),
      body: <p>{t("sections.changes.body")}</p>,
    },
    {
      id: "contact",
      title: t("sections.contact_section.title"),
      body: (
        <p>
          <Trans
            t={t}
            i18nKey="sections.contact_section.body"
            components={{ 0: <Link to="/contact" /> }}
          />
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <a href="#main" className="skip-to-content">
        {t("a11y.skip_to_content")}
      </a>
      <SiteHeader transparentOverHero />

      <main id="main">
        <section
          className="relative isolate overflow-hidden"
          style={{
            background:
              "radial-gradient(1000px 520px at 90% -10%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%), #ffffff)",
          }}
        >
          <div className="mx-auto max-w-4xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary">
              <Scale className="h-3.5 w-3.5" />
              {t("hero.badge")}
            </div>
            <h1 className="mt-6 text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              <Trans
                t={t}
                i18nKey="hero.description"
                components={{
                  0: <Link to="/service-agreement" className="font-semibold text-brand-primary underline-offset-2 hover:underline" />,
                  1: <Link to="/privacy-policy" className="font-semibold text-brand-primary underline-offset-2 hover:underline" />
                }}
              />
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              <Trans
                t={t}
                i18nKey="hero.last_updated"
                components={{ 0: <span className="font-semibold text-foreground" /> }}
              />
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" /> {t("sections.contents_label")}
                </p>
                <nav aria-label={t("a11y.section_navigation")}>
                  <ol className="space-y-1.5 text-sm">
                    {SECTIONS.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="block rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-brand-primary/5 hover:text-brand-primary"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </aside>

            <article className="min-w-0">
              <div className="prose prose-neutral max-w-none prose-headings:scroll-mt-24 prose-headings:font-black prose-headings:tracking-tight prose-h2:mt-0 prose-h2:text-2xl sm:prose-h2:text-3xl prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-brand-primary">
                {SECTIONS.map((s) => (
                  <section key={s.id} id={s.id} className="mb-10 scroll-mt-24">
                    <h2>{s.title}</h2>
                    {s.body}
                  </section>
                ))}
              </div>

              <div
                className="mt-6 flex flex-col gap-4 rounded-2xl border border-border/60 p-6 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 92%), color-mix(in oklch, var(--brand-secondary), transparent 92%))",
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-brand-primary"
                  >
                    <Gavel className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-base font-black">{t("cta.title")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("cta.description")}
                    </p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5 sm:self-auto"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                  }}
                >
                  <Mail className="h-4 w-4" />
                  {t("cta.button")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter hideCta />
    </div>
  );
}
