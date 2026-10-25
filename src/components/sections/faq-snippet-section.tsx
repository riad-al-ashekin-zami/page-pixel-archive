import { useState, useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, HelpCircle, Minus, Plus } from "lucide-react";
import { LocalLink } from "@/components/local-link";
import { useCurrentLang } from "@/lib/i18n-routing";
import { formatLocalizedNumber } from "@/lib/locale-format";

export type Faq = { q: string; a: string };

const defaultItemKeys = ["timeline", "hipaa", "ranking", "migration", "support"] as const;

type Props = {
  faqs?: Faq[];
  eyebrow?: string;
  heading?: ReactNode;
  intro?: string;
  stepNumber?: string;
};

export function FaqSnippetSection({
  faqs,
  eyebrow,
  heading,
  intro,
  stepNumber = "07",
}: Props = {}) {
  const { t } = useTranslation("homeSections");
  const lang = useCurrentLang();
  const [open, setOpen] = useState<number>(0);

  const resolvedFaqs = useMemo<Faq[]>(() => {
    if (faqs && faqs.length) return faqs;
    return defaultItemKeys.map((k) => ({
      q: t(`faqSnippet.items.${k}.q`),
      a: t(`faqSnippet.items.${k}.a`),
    }));
  }, [faqs, t]);

  const resolvedEyebrow = eyebrow ?? t("faqSnippet.eyebrow");
  const resolvedIntro = intro ?? t("faqSnippet.intro");
  const resolvedStepNumber = /^\d+$/.test(stepNumber)
    ? formatLocalizedNumber(Number(stepNumber), lang, 2)
    : stepNumber;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: resolvedFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="inline-flex max-w-full flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary sm:tracking-[0.22em]">
               <span className="tabular-nums opacity-60">{resolvedStepNumber}</span>
              <span className="opacity-30">—</span>
              <HelpCircle className="h-3.5 w-3.5" /> {resolvedEyebrow}
            </span>
            <h2 className="mt-5 text-balance text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3rem]">
              {heading ?? (
                <>
                  {t("faqSnippet.headingLead")}{" "}
                  <span className="font-medium text-brand-primary">
                    {t("faqSnippet.headingHighlight")}
                  </span>
                </>
              )}
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {resolvedIntro}
            </p>
            <LocalLink
              to="/faq"
              className="group mt-8 inline-flex max-w-full items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-primary sm:tracking-[0.18em]"
            >
              <span className="min-w-0 break-words">{t("faqSnippet.seeAll")}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </LocalLink>
          </div>

          <ul className="divide-y divide-border/70 border-y border-border/70">
            {resolvedFaqs.map((f, i) => {
              const isOpen = i === open;
              return (
                <li key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-4 py-6 text-start sm:gap-6 sm:py-7"
                  >
                    <span className="mt-1 shrink-0 text-[11px] font-semibold tracking-[0.14em] text-brand-primary sm:tracking-[0.18em]">
                      {formatLocalizedNumber(i + 1, lang, 2)}
                    </span>
                    <span className="min-w-0 flex-1 break-words text-base font-medium leading-snug text-foreground sm:text-lg">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all ${
                        isOpen
                          ? "border-brand-primary bg-brand-primary text-brand-primary-foreground"
                          : "border-border text-muted-foreground group-hover:border-brand-primary group-hover:text-brand-primary"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 text-sm leading-relaxed text-muted-foreground ltr:pl-[calc(1.75rem+1rem)] ltr:pr-12 rtl:pl-12 rtl:pr-[calc(1.75rem+1rem)] sm:pb-7 sm:text-base sm:ltr:pl-[calc(1.75rem+1.5rem)] sm:ltr:pr-16 sm:rtl:pl-16 sm:rtl:pr-[calc(1.75rem+1.5rem)]">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
