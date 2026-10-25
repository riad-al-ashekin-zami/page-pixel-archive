import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Search, Users, Building2 } from "lucide-react";

const MIN = 1;
const MAX = 25;
const DEFAULT = 8;

// Approximate density heuristics for a mid-size US metro (mock, marketing-only)
const POP_PER_SQMI = 3200;
const SEARCH_PER_10K = 42; // "dermatologist near me" style monthly searches per 10k residents
const CONV_PER_SEARCH = 0.018; // booked visits share

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1) + "k";
  return String(Math.round(n));
}

export function RadiusPicker() {
  const { t } = useTranslation("widgets");
  const [radius, setRadius] = useState(DEFAULT);

  const stats = useMemo(() => {
    const area = Math.PI * radius * radius;
    const pop = area * POP_PER_SQMI;
    const searches = (pop / 10_000) * SEARCH_PER_10K;
    const patients = searches * CONV_PER_SEARCH;
    return {
      area: Math.round(area),
      pop: Math.round(pop),
      searches: Math.round(searches),
      patients: Math.round(patients),
    };
  }, [radius]);

  // Scale ring radius (SVG units) with mile radius — clamp to viewBox
  const ringR = 20 + ((radius - MIN) / (MAX - MIN)) * 110;

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
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            {t("radius.header")}
          </span>
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-primary">
          {t("radius.radiusBadge", { n: radius })}
        </span>
      </div>

      {/* map */}
      <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5">
        <svg
          aria-hidden
          viewBox="0 0 320 200"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full text-brand-primary"
        >
          {/* subtle street grid */}
          <defs>
            <pattern id="rp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                opacity="0.35"
              />
            </pattern>
          </defs>
          <rect width="320" height="200" fill="url(#rp-grid)" />
          {/* diagonal roads */}
          <path d="M -20 60 Q 160 40 340 90" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
          <path d="M -20 150 Q 160 170 340 130" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
          <path d="M 80 -20 Q 130 100 90 220" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
          <path d="M 230 -20 Q 200 100 250 220" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />

          {/* radius ring */}
          <g transform="translate(160 100)">
            <circle
              r={ringR}
              fill="currentColor"
              fillOpacity="0.08"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              style={{ transition: "r 400ms cubic-bezier(0.22, 1, 0.36, 1)" }}
            />
            <circle
              r={ringR}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            >
              <animate attributeName="r" values={`${ringR};${ringR + 12};${ringR}`} dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.6s" repeatCount="indefinite" />
            </circle>
            {/* clinic pin */}
            <path d="M 0 -14 C 10 -14, 12 -4, 0 10 C -12 -4, -10 -14, 0 -14 Z" fill="currentColor" />
            <circle cx="0" cy="-6" r="3.5" fill="var(--background)" />
          </g>

          {/* competitor pins scattered */}
          {[[70, 60], [250, 70], [90, 150], [240, 145], [180, 45]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`} opacity="0.55">
              <circle r="3" fill="currentColor" />
            </g>
          ))}
        </svg>

        <div className="pointer-events-none absolute bottom-2 left-2 rounded-md border border-border/60 bg-background/80 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
          {t("radius.mapCaption", { n: radius })}
        </div>
      </div>

      {/* slider */}
      <div className="mt-4">
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={1}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          aria-label={t("radius.sliderAria")}
          className="w-full accent-[color:var(--brand-primary)]"
        />
        <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>{t("radius.sliderMin", { n: MIN })}</span>
          <span>{t("radius.sliderMax", { n: MAX })}</span>
        </div>
      </div>

      {/* stats */}
      <ul className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: Users, k: fmt(stats.pop), v: t("radius.kpi.residents") },
          { icon: Search, k: fmt(stats.searches) + "/mo", v: t("radius.kpi.searches") },
          { icon: Building2, k: fmt(stats.patients) + "/mo", v: t("radius.kpi.visits") },
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

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 px-4 py-3 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-primary" />
        <span>
          {t("radius.coveragePrefix")}{" "}
          <span className="font-semibold text-foreground tabular-nums">
            {stats.area} mi²
          </span>{" "}
          {t("radius.coverageSuffix")}
        </span>
      </div>
    </div>
  );
}
