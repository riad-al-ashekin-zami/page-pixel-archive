import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { buildHreflangLinks } from "@/lib/i18n-routing";
import { Shield, FileText, Mail, ArrowRight, Lock } from "lucide-react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

const PAGE_PATH = "/privacy-policy";

export const Route = createFileRoute("/{-$lang}/privacy-policy")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params: { lang } }) => {
    const st = getStaticTranslation(lang, "privacyPolicy");
    return {
      meta: [
        { title: st?.meta?.title ?? "Privacy Policy — How We Handle Your Information" },
        { name: "description", content: st?.meta?.description ?? "" },
        { name: "robots", content: "noindex,follow" },
        { property: "og:title", content: st?.meta?.og?.title ?? "" },
        { property: "og:description", content: st?.meta?.og?.description ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: PAGE_PATH },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: st?.meta?.twitter?.title ?? "" },
        { name: "twitter:description", content: st?.meta?.twitter?.description ?? "" },
      ],
      links: [{ rel: "canonical", href: PAGE_PATH }, ...buildHreflangLinks(PAGE_PATH)],
    };
  },
  component: PrivacyPolicyPage,
});

type Section = { id: string; title: string; body: React.ReactNode };

function PrivacyPolicyPage() {
  const { t } = useTranslation("privacyPolicy");

  const SECTIONS: Section[] = [
    {
      id: "overview",
      title: t("sections.overview.title"),
      body: (
        <>
          <p>{t("sections.overview.body")}</p>
        </>
      ),
    },
    {
      id: "information-we-collect",
      title: t("sections.informationWeCollect.title"),
      body: (
        <ul>
          <li>
            <strong>{t("sections.informationWeCollect.items.provided.label")}</strong> {t("sections.informationWeCollect.items.provided.text")}
          </li>
          <li>
            <strong>{t("sections.informationWeCollect.items.automatic.label")}</strong> {t("sections.informationWeCollect.items.automatic.text")}
          </li>
          <li>
            <strong>{t("sections.informationWeCollect.items.projectData.label")}</strong> {t("sections.informationWeCollect.items.projectData.text")}
          </li>
        </ul>
      ),
    },
    {
      id: "how-we-use",
      title: t("sections.howWeUse.title"),
      body: (
        <ul>
          <li>{t("sections.howWeUse.items.0")}</li>
          <li>{t("sections.howWeUse.items.1")}</li>
          <li>{t("sections.howWeUse.items.2")}</li>
          <li>{t("sections.howWeUse.items.3")}</li>
          <li>{t("sections.howWeUse.items.4")}</li>
        </ul>
      ),
    },
    {
      id: "no-phi",
      title: t("sections.noPhi.title"),
      body: (
        <>
          <p>{t("sections.noPhi.body")}</p>
        </>
      ),
    },
    {
      id: "sharing",
      title: t("sections.sharing.title"),
      body: (
        <>
          <p>{t("sections.sharing.body")}</p>
        </>
      ),
    },
    {
      id: "cookies",
      title: t("sections.cookies.title"),
      body: (
        <>
          <p>{t("sections.cookies.body")}</p>
        </>
      ),
    },
    {
      id: "retention",
      title: t("sections.retention.title"),
      body: (
        <>
          <p>{t("sections.retention.body")}</p>
        </>
      ),
    },
    {
      id: "security",
      title: t("sections.security.title"),
      body: (
        <>
          <p>{t("sections.security.body")}</p>
        </>
      ),
    },
    {
      id: "your-rights",
      title: t("sections.yourRights.title"),
      body: (
        <>
          <p>{t("sections.yourRights.body")}</p>
        </>
      ),
    },
    {
      id: "third-party-links",
      title: t("sections.thirdPartyLinks.title"),
      body: (
        <>
          <p>{t("sections.thirdPartyLinks.body")}</p>
        </>
      ),
    },
    {
      id: "children",
      title: t("sections.children.title"),
      body: (
        <>
          <p>{t("sections.children.body")}</p>
        </>
      ),
    },
    {
      id: "changes",
      title: t("sections.changes.title"),
      body: (
        <>
          <p>{t("sections.changes.body")}</p>
        </>
      ),
    },
    {
      id: "contact",
      title: t("sections.contact.title"),
      body: (
        <>
          <p>
            {t("sections.contact.paragraph").split(t("sections.contact.link"))[0]}
            <Link to="/contact">{t("sections.contact.link")}</Link>
            {t("sections.contact.paragraph").split(t("sections.contact.link"))[1]}
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <a href="#main" className="skip-to-content">
        {t("layout.skipToContent")}
      </a>
      <SiteHeader transparentOverHero />

      <main id="main">
        {/* HERO */}
        <section
          className="relative isolate overflow-hidden"
          style={{
            background:
              "radial-gradient(1000px 520px at 90% -10%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%), #ffffff)",
          }}
        >
          <div className="mx-auto max-w-4xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary">
              <Shield className="h-3.5 w-3.5" />
              {t("hero.badge")}
            </div>
            <h1 className="mt-6 text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              {t("hero.description")}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("hero.lastUpdated")}{" "}
              <span className="font-semibold text-foreground">{t("hero.lastUpdatedDate")}</span>
            </p>
          </div>
        </section>

        {/* BODY */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" /> {t("sections.sidebar.title")}
                </p>
                <nav aria-label={t("sections.sidebar.navAriaLabel")}>
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
                    <Lock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-base font-black">{t("cta.title")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("cta.subtitle")}
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
                  {t("cta.buttonLabel")}
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
