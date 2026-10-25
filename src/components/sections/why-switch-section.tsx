import { Check, X, ArrowRightLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const rowKeys = ["focus", "seo", "hipaa", "goal", "afterLaunch", "pricing"] as const;

export function WhySwitchSection() {
  const { t } = useTranslation("homeSections");
  const rows = rowKeys.map((k) => ({
    key: k,
    matter: t(`whySwitch.rows.${k}.matter`),
    others: t(`whySwitch.rows.${k}.others`),
    us: t(`whySwitch.rows.${k}.us`),
  }));

  return (
    <section
      id="why-switch"
      className="relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary"><span className="tabular-nums opacity-60">05</span><span className="opacity-30">—</span>
            <ArrowRightLeft className="h-3.5 w-3.5" /> {t("whySwitch.eyebrow")}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            {t("whySwitch.headingLead")}{" "}
            <span className="text-brand-primary">{t("whySwitch.headingHighlight")}</span>
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
            {t("whySwitch.intro")}
          </p>
        </div>

        <div className="mt-14 hidden overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:block">
          <div className="grid grid-cols-[1.1fr_1.3fr_1.5fr] bg-brand-primary/5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <div>{t("whySwitch.colWhatMatters")}</div>
            <div>{t("whySwitch.colOthers")}</div>
            <div className="text-brand-primary">{t("whySwitch.colUs")}</div>
          </div>
          <ul>
            {rows.map((r, i) => (
              <li
                key={r.key}
                className={`grid grid-cols-[1.1fr_1.3fr_1.5fr] items-center gap-4 px-6 py-5 text-sm ${
                  i !== rows.length - 1 ? "border-b border-border/60" : ""
                }`}
              >
                <div className="font-semibold text-foreground">{r.matter}</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                    <X className="h-3 w-3" aria-hidden />
                  </span>
                  {r.others}
                </div>
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-primary/15 text-brand-primary">
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  {r.us}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:hidden">
          {rows.map((r) => (
            <li
              key={r.key}
              className="rounded-2xl border border-border/70 bg-card p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-primary">
                {r.matter}
              </p>
              <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-muted">
                  <X className="h-3 w-3" aria-hidden />
                </span>
                <span>
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                    {t("whySwitch.mobileOthersLabel")}
                  </span>
                  {r.others}
                </span>
              </div>
              <div className="mt-3 flex items-start gap-2 text-sm font-medium text-foreground">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-primary/15 text-brand-primary">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
                <span>
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-brand-primary/80">
                    {t("whySwitch.mobileUsLabel")}
                  </span>
                  {r.us}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
