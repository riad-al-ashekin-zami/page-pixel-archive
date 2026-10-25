
import { useTranslation } from "react-i18next";
import { LocalLink } from "@/components/local-link";
import { ArrowRight, Sparkles } from "lucide-react";

type Tier = {
  key: string;
  price: string;
  priceSuffix?: string;
  hasPrefix?: boolean;
  popular?: boolean;
};

const tiers: Tier[] = [
  { key: "starter", price: "$797" },
  { key: "clinicPro", price: "$1,997" },
  { key: "practiceGrowth", price: "$4,499", popular: true },
  { key: "enterprise", price: "$6,999", hasPrefix: true },
];

export function PricingTeaserSection() {
  const { t } = useTranslation("homeSections");
  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{
        background:
          "radial-gradient(900px 500px at 100% 0%, color-mix(in oklch, var(--brand-accent), transparent 88%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%), #ffffff)",
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
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary"><span className="tabular-nums opacity-60">02</span><span className="opacity-30">—</span>
            <Sparkles className="h-3.5 w-3.5" /> {t("pricing.eyebrow")}
          </span>
          <h2 className="mt-4 text-balance text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            {t("pricing.heading")}
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
            {t("pricing.intro")}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <li key={tier.key} className={tier.popular ? "relative lg:-mt-2" : "relative"}>
              {tier.popular && (
                <span
                  className="absolute -top-3 left-6 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-primary-foreground"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                  }}
                >
                  {t("pricing.mostPopular")}
                </span>
              )}
              <div
                className={`flex h-full flex-col gap-5 rounded-2xl border bg-card p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_60%)] ${
                  tier.popular
                    ? "border-brand-primary/50 ring-1 ring-brand-primary/30"
                    : "border-border/70 hover:border-brand-primary/30"
                }`}
              >
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    {t(`pricing.tiers.${tier.key}.name`)}
                  </h3>
                  <p className="mt-3 text-4xl font-bold tracking-tight text-foreground">
                    {tier.hasPrefix && (
                      <span className="mr-1 align-middle text-sm font-medium text-muted-foreground">
                        {t("pricing.startingAt")}
                      </span>
                    )}
                    {tier.price}
                    {tier.priceSuffix && (
                      <span className="align-top text-lg font-semibold text-muted-foreground">
                        {tier.priceSuffix}
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                    {t(`pricing.tiers.${tier.key}.pages`)}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`pricing.tiers.${tier.key}.description`)}
                </p>

                <LocalLink
                  to="/plan-packages-and-costs"
                  className={`mt-auto inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    tier.popular
                      ? "text-brand-primary-foreground hover:-translate-y-0.5"
                      : "border border-border text-foreground hover:border-brand-primary/40 hover:text-brand-primary"
                  }`}
                  style={
                    tier.popular
                      ? {
                          background:
                            "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))",
                        }
                      : undefined
                  }
                >
                  {t("pricing.seeDetails")}
                </LocalLink>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <LocalLink
            to="/plan-packages-and-costs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary/80"
          >
            {t("pricing.fullBreakdown")}
            <ArrowRight className="h-4 w-4" />
          </LocalLink>
        </div>
      </div>
    </section>
  );
}
