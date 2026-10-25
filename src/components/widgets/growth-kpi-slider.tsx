import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, Users, DollarSign, Calendar } from "lucide-react";

// Assumptions (mock, marketing-only)
const AVG_VISIT_VALUE = 285; // $ per booked visit (blended derm)
const LIFT_AT_MAX = 0.62; // 62% booking lift at max investment
const BASE_MONTHLY_INVEST = 2500; // $ minimum retainer
const MAX_MONTHLY_INVEST = 15000;

function fmtMoney(n: number) {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return "$" + (n / 1_000).toFixed(n >= 10_000 ? 0 : 1) + "k";
  return "$" + Math.round(n).toLocaleString();
}

export function GrowthKpiSlider() {
  const { t } = useTranslation("widgets");
  const [invest, setInvest] = useState(6000);
  const [baseVisits, setBaseVisits] = useState(120);

  const stats = useMemo(() => {
    const t =
      (invest - BASE_MONTHLY_INVEST) /
      (MAX_MONTHLY_INVEST - BASE_MONTHLY_INVEST);
    const clamped = Math.max(0, Math.min(1, t));
    // Diminishing returns curve
    const liftPct = LIFT_AT_MAX * (1 - Math.pow(1 - clamped, 1.6));
    const addedVisits = Math.round(baseVisits * liftPct);
    const newVisits = baseVisits + addedVisits;
    const monthlyRevenue = newVisits * AVG_VISIT_VALUE;
    const addedRevenue = addedVisits * AVG_VISIT_VALUE;
    const annualAdded = addedRevenue * 12;
    const roi = addedRevenue / invest;
    return { liftPct, addedVisits, newVisits, monthlyRevenue, addedRevenue, annualAdded, roi };
  }, [invest, baseVisits]);

  // Sparkline points (8 months, growing toward projected)
  const points = useMemo(() => {
    const start = baseVisits;
    const end = stats.newVisits;
    return Array.from({ length: 8 }, (_, i) => {
      const t = i / 7;
      const eased = 1 - Math.pow(1 - t, 2.2);
      return Math.round(start + (end - start) * eased);
    });
  }, [baseVisits, stats.newVisits]);

  const maxY = Math.max(...points);

  return (
    <div
      className="rounded-[28px] border border-border/70 bg-card/80 p-5 backdrop-blur-xl sm:p-6"
      style={{
        boxShadow:
          "0 30px 80px -30px color-mix(in oklch, var(--brand-primary), transparent 55%)",
      }}
    >
      {/* header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            {t("growthKpi.header")}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-2.5 py-1 text-[11px] font-semibold text-brand-primary">
          {t("growthKpi.bookingLift", { pct: (stats.liftPct * 100).toFixed(0) })}
        </span>
      </div>

      {/* projected revenue headline */}
      <div className="mt-5 rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 p-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
          {t("growthKpi.projectedRevenueLabel")}
        </div>
        <div className="mt-1 text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
          {fmtMoney(stats.annualAdded)}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {stats.roi.toFixed(1)}{t("growthKpi.roiSuffix")}
        </div>
      </div>

      {/* chart */}
      <div className="mt-4 rounded-2xl border border-border/60 bg-background/60 p-3.5">
        <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{t("growthKpi.bookedVisitsCaption")}</span>
          <span className="font-semibold text-brand-primary tabular-nums">
            {t("growthKpi.addedPerMonth", { n: stats.addedVisits })}
          </span>
        </div>
        <svg
          viewBox="0 0 280 90"
          preserveAspectRatio="none"
          className="h-20 w-full text-brand-primary"
        >
          <defs>
            <linearGradient id="gks-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          {(() => {
            const stepX = 280 / (points.length - 1);
            const toY = (v: number) => 82 - (v / maxY) * 72;
            const line = points
              .map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${toY(p)}`)
              .join(" ");
            const area = `${line} L 280 90 L 0 90 Z`;
            return (
              <>
                <path d={area} fill="url(#gks-fill)" />
                <path
                  d={line}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {points.map((p, i) => (
                  <circle
                    key={i}
                    cx={i * stepX}
                    cy={toY(p)}
                    r={i === points.length - 1 ? 3.5 : 2}
                    fill="currentColor"
                  />
                ))}
              </>
            );
          })()}
        </svg>
      </div>

      {/* sliders */}
      <div className="mt-4 space-y-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <label htmlFor="invest" className="font-medium text-muted-foreground">
              {t("growthKpi.monthlyInvestment")}
            </label>
            <span className="font-bold tabular-nums text-foreground">
              {fmtMoney(invest)}
            </span>
          </div>
          <input
            id="invest"
            type="range"
            min={BASE_MONTHLY_INVEST}
            max={MAX_MONTHLY_INVEST}
            step={500}
            value={invest}
            onChange={(e) => setInvest(Number(e.target.value))}
            className="w-full accent-[color:var(--brand-primary)]"
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <label htmlFor="baseline" className="font-medium text-muted-foreground">
              {t("growthKpi.currentMonthlyVisits")}
            </label>
            <span className="font-bold tabular-nums text-foreground">
              {baseVisits}
            </span>
          </div>
          <input
            id="baseline"
            type="range"
            min={40}
            max={500}
            step={10}
            value={baseVisits}
            onChange={(e) => setBaseVisits(Number(e.target.value))}
            className="w-full accent-[color:var(--brand-primary)]"
          />
        </div>
      </div>

      {/* kpi grid */}
      <ul className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: Calendar, k: `+${stats.addedVisits}`, v: t("growthKpi.kpi.newVisits") },
          { icon: Users, k: String(stats.newVisits), v: t("growthKpi.kpi.totalVisits") },
          { icon: DollarSign, k: fmtMoney(stats.monthlyRevenue), v: t("growthKpi.kpi.monthlyRevenue") },
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
    </div>
  );
}
