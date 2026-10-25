import { BadgeDollarSign, Building2, CalendarX, BarChart3, Sparkles, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type Reason = { icon: LucideIcon; key: string };

const reasons: Reason[] = [
  { icon: BadgeDollarSign, key: "pricing" },
  { icon: Building2, key: "niche" },
  { icon: CalendarX, key: "noLockIn" },
  { icon: BarChart3, key: "rank" },
];

export function WhyChooseUsSection() {
  const { t } = useTranslation("homeSections");
  return (
    <section
      id="why-us"
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{
        background:
          "radial-gradient(800px 450px at 100% 100%, color-mix(in oklch, var(--brand-secondary), transparent 88%), transparent 60%), linear-gradient(180deg, #ffffff, color-mix(in oklch, var(--brand-primary), transparent 96%))",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklch, var(--brand-primary), transparent 65%), transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary"><span className="tabular-nums opacity-60">04</span><span className="opacity-30">—</span>
            <Sparkles className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{t("whyChoose.eyebrow")}</span><span className="hidden sm:inline">&nbsp;{t("whyChoose.eyebrowSuffix")}</span>
          </span>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            {t("whyChoose.headingLead")}{" "}
            <span className="text-brand-primary">{t("whyChoose.headingHighlight")}</span>
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
            {t("whyChoose.intro")}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <li key={r.key}>
              <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-brand-primary/15 bg-brand-primary/5 text-brand-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                  <r.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {t(`whyChoose.reasons.${r.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`whyChoose.reasons.${r.key}.description`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
