import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp, Search, TrendingUp } from "lucide-react";

type Keyword = {
  termKey: string;
  start: number;
  target: number;
  volume: string;
};

const KEYWORDS: Keyword[] = [
  { termKey: "nearMe", start: 34, target: 3, volume: "12k/mo" },
  { termKey: "acneCity", start: 22, target: 2, volume: "5.4k/mo" },
  { termKey: "aesthetic", start: 41, target: 6, volume: "8.1k/mo" },
  { termKey: "mohs", start: 18, target: 1, volume: "2.9k/mo" },
];

const DURATION = 2600;
const HOLD = 1600;
const CYCLE = DURATION + HOLD;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function RankClimbTicker() {
  const { t } = useTranslation("widgets");
  const [ranks, setRanks] = useState<number[]>(KEYWORDS.map((k) => k.start));
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRanks(KEYWORDS.map((k) => k.target));
      return;
    }
    startRef.current = performance.now();
    const loop = (now: number) => {
      const elapsed = (now - startRef.current) % CYCLE;
      const tRatio = Math.min(1, elapsed / DURATION);
      const eased = easeOutCubic(tRatio);
      setRanks(
        KEYWORDS.map((k) => Math.round(k.start + (k.target - k.start) * eased))
      );
      setTick((x) => x + 1);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  const totalDelta = KEYWORDS.reduce(
    (sum, k, i) => sum + (k.start - ranks[i]),
    0
  );

  return (
    <div
      ref={containerRef}
      className="rounded-[28px] border border-border/70 bg-card/80 p-5 backdrop-blur-xl sm:p-6"
      style={{
        boxShadow:
          "0 30px 80px -30px color-mix(in oklch, var(--brand-primary), transparent 55%)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            {t("rank.header")}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-brand-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
          </span>
          {t("rank.live")}
        </div>
      </div>

      <ul className="mt-5 space-y-2.5" aria-live="polite">
        {KEYWORDS.map((k, i) => {
          const rank = ranks[i];
          const delta = k.start - rank;
          const climbed = delta > 0;
          const isTop3 = rank <= 3;
          return (
            <li
              key={k.termKey}
              className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border border-border/60 bg-background/60 p-3.5 transition-colors"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">
                  {t(`rank.keywords.${k.termKey}`)}
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{k.volume}</span>
                  <span className="opacity-40">·</span>
                  <span>{t("rank.fromRank", { n: k.start })}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {climbed && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-brand-primary/10 px-2 py-0.5 text-[11px] font-semibold text-brand-primary">
                    <ArrowUp className="h-3 w-3" />
                    {delta}
                  </span>
                )}
                <span
                  className={`grid h-9 w-11 place-items-center rounded-lg text-sm font-bold tabular-nums transition-colors ${
                    isTop3
                      ? "bg-brand-primary text-brand-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  #{rank}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-brand-primary/20 bg-brand-primary/5 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
          <TrendingUp className="h-4 w-4" /> {t("rank.quarterFooter", { n: totalDelta })}
        </div>
        <span
          key={tick}
          className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
        >
          {t("rank.updating")}
        </span>
      </div>
    </div>
  );
}
