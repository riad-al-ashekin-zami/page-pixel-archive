import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { buildHreflangLinks } from "@/lib/i18n-routing";
import { FileText, ShieldCheck, Scale, Mail, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

const PAGE_PATH = "/service-agreement";

export const Route = createFileRoute("/{-$lang}/service-agreement")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params: { lang } }) => {
    const st = getStaticTranslation(lang, "serviceAgreement");
    return {
      meta: [
        { title: st?.meta?.title ?? "Service Agreement — Terms of Engagement" },
        { name: "description", content: st?.meta?.description ?? "" },
        { name: "robots", content: "noindex,follow" },
        { property: "og:title", content: st?.meta?.title ?? "" },
        { property: "og:description", content: st?.meta?.description ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: PAGE_PATH },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: st?.meta?.title ?? "" },
        { name: "twitter:description", content: st?.meta?.description ?? "" },
      ],
      links: [{ rel: "canonical", href: PAGE_PATH }, ...buildHreflangLinks(PAGE_PATH)],
    };
  },
  component: ServiceAgreementPage,
});

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

function ServiceAgreementPage() {
  const { t } = useTranslation("serviceAgreement");

  const SECTIONS: Section[] = [
    {
      id: "parties",
      title: t("sections.parties.title"),
      body: (
        <>
          <p>{t("sections.parties.body")}</p>
        </>
      ),
    },
    {
      id: "scope",
      title: t("sections.scope.title"),
      body: (
        <>
          <p>{t("sections.scope.body")}</p>
        </>
      ),
    },
    {
      id: "fees",
      title: t("sections.fees.title"),
      body: (
        <ul>
          <li>{t("sections.fees.items.0")}</li>
          <li>{t("sections.fees.items.1")}</li>
          <li>{t("sections.fees.items.2")}</li>
          <li>{t("sections.fees.items.3")}</li>
        </ul>
      ),
    },
    {
      id: "timeline",
      title: t("sections.timeline.title"),
      body: (
        <>
          <p>{t("sections.timeline.body")}</p>
        </>
      ),
    },
    {
      id: "revisions",
      title: t("sections.revisions.title"),
      body: (
        <>
          <p>{t("sections.revisions.body")}</p>
        </>
      ),
    },
    {
      id: "ip",
      title: t("sections.ip.title"),
      body: (
        <>
          <p>{t("sections.ip.body")}</p>
        </>
      ),
    },
    {
      id: "third-party",
      title: t("sections.third_party.title"),
      body: (
        <>
          <p>{t("sections.third_party.body")}</p>
        </>
      ),
    },
    {
      id: "hipaa",
      title: t("sections.hipaa.title"),
      body: (
        <>
          <p>{t("sections.hipaa.body")}</p>
        </>
      ),
    },
    {
      id: "confidentiality",
      title: t("sections.confidentiality.title"),
      body: (
        <>
          <p>{t("sections.confidentiality.body")}</p>
        </>
      ),
    },
    {
      id: "warranty",
      title: t("sections.warranty.title"),
      body: (
        <>
          <p>{t("sections.warranty.body")}</p>
        </>
      ),
    },
    {
      id: "liability",
      title: t("sections.liability.title"),
      body: (
        <>
          <p>{t("sections.liability.body")}</p>
        </>
      ),
    },
    {
      id: "termination",
      title: t("sections.termination.title"),
      body: (
        <>
          <p>{t("sections.termination.body")}</p>
        </>
      ),
    },
    {
      id: "misc",
      title: t("sections.misc.title"),
      body: (
        <>
          <p>{t("sections.misc.body")}</p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <a href="#main" className="skip-to-content">
        {t("common.skip_to_content")}
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
              {t("hero.h1")}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              {t("hero.description")}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("common.last_updated")}{" "}
              <span className="font-semibold text-foreground">{t("common.last_updated_date")}</span>
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" /> {t("sections.toc_title")}
                </p>
                <nav aria-label={t("sections.navigation_aria_label")}>
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
                    <ShieldCheck className="h-5 w-5" />
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
