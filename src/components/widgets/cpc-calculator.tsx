import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MousePointerClick, DollarSign, Target, TrendingUp } from "lucide-react";

const SERVICES = [
  { key: "acne", cpc: 6.2, ctr: 0.094, cvr: 0.11 },
  { key: "mohs", cpc: 14.8, ctr: 0.072, cvr: 0.09 },
  { key: "aesthetic", cpc: 9.4, ctr: 0.081, cvr: 0.07 },
  { key: "general", cpc: 4.6, ctr: 0.103, cvr: 0.14 },
] as const;

function fmtMoney(n: number) {
  if (n >= 1000) return "$" + (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k";
  return "$" + Math.round(n).toLocaleString();
}

export function CpcCalculator() {
  const { t } = useTranslation("widgets");
  const [budget, setBudget] = useState(4500);
  const [svcKey, setSvcKey] = useState<(typeof SERVICES)[number]["key"]>("acne");

  const svc = SERVICES.find((s) => s.key === svcKey)!;

  const stats = useMemo(() => {
    const clicks = budget / svc.cpc;
    const impressions = clicks / svc.ctr;
    const leads = clicks * svc.cvr;
    const booked = leads * 0.62;
    const cpbv = booked > 0 ? budget / booked : 0;
    return { clicks, impressions, leads, booked, cpbv };
  }, [budget, svc]);

  return (
    <div
      className="rounded-[28px] border border-border/70 bg-card/80 p-5 backdrop-blur-xl sm:p-6"
      style={{
        boxShadow:
          "0 30px 80px -30px color-mix(in oklch, var(--brand-primary), transparent 55%)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5">
          <MousePointerClick className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            {t("cpc.header")}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-2.5 py-1 text-[11px] font-semibold text-brand-primary">
          {t("cpc.badge")}
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
          {t("cpc.costPerBookedLabel")}
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <div className="text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
            {fmtMoney(stats.cpbv)}
          </div>
          <div className="text-xs text-muted-foreground">
            {t("cpc.bookedVisitsSuffix", { n: Math.round(stats.booked) })}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-xs font-medium text-muted-foreground">
          {t("cpc.serviceLineLabel")}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {SERVICES.map((s) => {
            const active = s.key === svcKey;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setSvcKey(s.key)}
                className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors ${
                  active
                    ? "border-brand-primary/60 bg-brand-primary/10 text-brand-primary"
                    : "border-border/60 bg-background/60 text-muted-foreground hover:border-brand-primary/30 hover:text-foreground"
                }`}
              >
                <div className="font-semibold">{t(`cpc.services.${s.key}`)}</div>
                <div className="mt-0.5 text-[10px] tabular-nums opacity-80">
                  ${s.cpc.toFixed(2)} {t("cpc.avgCpcSuffix")}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <label htmlFor="ppc-budget" className="font-medium text-muted-foreground">
            {t("cpc.monthlySpend")}
          </label>
          <span className="font-bold tabular-nums text-foreground">
            {fmtMoney(budget)}
          </span>
        </div>
        <input
          id="ppc-budget"
          type="range"
          min={1500}
          max={20000}
          step={250}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-[color:var(--brand-primary)]"
        />
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: MousePointerClick, k: Math.round(stats.clicks).toLocaleString(), v: t("cpc.kpi.clicks") },
          { icon: Target, k: Math.round(stats.leads).toLocaleString(), v: t("cpc.kpi.leads") },
          { icon: DollarSign, k: fmtMoney(svc.cpc), v: t("cpc.kpi.avgCpc") },
        ].map((s) => (
          <li
            key={s.v}
            className="rounded-xl border border-border/60 bg-background/60 p-2.5"
          >
            <s.icon className="h-3.5 w-3.5 text-brand-primary" />
            <div className="mt-1 text-sm font-bold tabular-nums text-foreground">
              {s.k}
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              {s.v}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-brand-primary/20 bg-brand-primary/5 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
          <TrendingUp className="h-4 w-4" />
          {t("cpc.footer", { booked: Math.round(stats.booked), cost: fmtMoney(stats.cpbv) })}
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {t("cpc.footerBadge")}
        </span>
      </div>
    </div>
  );
}
