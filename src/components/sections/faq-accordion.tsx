import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Minus, Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";

export type FaqItem = { q: string; a: string };

type Props = {
  faqs: FaqItem[];
  heading?: string;
  eyebrow?: string;
  idPrefix?: string;
  defaultOpen?: number;
  className?: string;
  maxWidth?: string;
};

export function FaqAccordion({
  faqs,
  heading,
  eyebrow,
  idPrefix = "faq",
  defaultOpen = 0,
  className = "relative py-20 sm:py-24 lg:py-28",
  maxWidth = "max-w-4xl",
}: Props) {
  const { t } = useTranslation("homeSections");
  const [open, setOpen] = useState(defaultOpen);
  const resolvedHeading = heading ?? `${t("faqSnippet.headingLead")} ${t("faqSnippet.headingHighlight")}`;
  const resolvedEyebrow = eyebrow ?? t("faqSnippet.eyebrow");

  return (
    <section
      aria-labelledby={`${idPrefix}-h`}
      className={className}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className={`mx-auto ${maxWidth} px-4 sm:px-6 lg:px-8`}>
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex max-w-full break-words text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary sm:tracking-[0.2em]">
              {resolvedEyebrow}
            </span>
            <h2
              id={`${idPrefix}-h`}
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {resolvedHeading}
            </h2>
          </div>
        </Reveal>

        <ul className="mt-10 divide-y divide-border/60 rounded-3xl border border-border/60 bg-card/50 backdrop-blur-sm">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const panelId = `${idPrefix}-panel-${i}`;
            return (
              <li
                key={f.q}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset sm:gap-6 sm:px-6"
                >
                  <span
                    className="min-w-0 break-words text-[15px] font-semibold text-foreground sm:text-lg"
                    itemProp="name"
                  >
                    {f.q}
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border/70 text-brand-primary transition-transform ${
                      isOpen ? "rotate-180 bg-brand-primary/10" : ""
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
                  id={panelId}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  className={`grid overflow-hidden px-5 transition-all duration-300 ease-out sm:px-6 ${
                    isOpen
                      ? "grid-rows-[1fr] pb-6 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p
                    itemProp="text"
                    className="min-h-0 overflow-hidden text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {f.a}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
