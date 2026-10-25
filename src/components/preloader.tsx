import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import logo from "@/assets/dermwd-logo.png.asset.json";

const NAV_MIN_DURATION = 500;
const NAV_SHOW_DELAY = 180; // don't flash for instant navigations

export function Preloader() {
  const { t } = useTranslation("widgets");
  // First-visit preloader removed: only shows during slow route navigations.
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const isNavigating = useRouterState({ select: (s) => s.isLoading || s.isTransitioning });
  const showStartRef = useRef<number | null>(null);
  const navDelayTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const startShow = (minDuration: number) => {
    if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = null; }
    setLeaving(false);
    setVisible(true);
    setProgress(0);
    showStartRef.current = performance.now();

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const tick = () => {
      const elapsed = performance.now() - (showStartRef.current ?? performance.now());
      const pct = Math.min(95, (elapsed / minDuration) * 100);
      setProgress(pct);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const finishHide = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    setProgress(100);
    setLeaving(true);
    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  // Initial page load: keep preloader hidden on first visit.
  useEffect(() => {
    setHydrated(true);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Route navigations (show if load takes longer than NAV_SHOW_DELAY)
  useEffect(() => {
    if (!hydrated) return;
    if (isNavigating) {
      if (!visible && !navDelayTimerRef.current) {
        navDelayTimerRef.current = window.setTimeout(() => {
          navDelayTimerRef.current = null;
          startShow(NAV_MIN_DURATION);
        }, NAV_SHOW_DELAY);
      }
    } else {
      if (navDelayTimerRef.current) {
        clearTimeout(navDelayTimerRef.current);
        navDelayTimerRef.current = null;
      }
      if (visible && !leaving) {
        const elapsed = performance.now() - (showStartRef.current ?? performance.now());
        const remaining = Math.max(0, NAV_MIN_DURATION - elapsed);
        window.setTimeout(finishHide, remaining);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavigating, hydrated]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-[650ms] ease-out ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(1200px 700px at 50% 40%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 65%), linear-gradient(180deg, #ffffff 0%, color-mix(in oklch, var(--brand-primary), white 92%) 100%)",
      }}
    >
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* floating orbs */}
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full blur-3xl opacity-40"
        style={{ background: "var(--brand-primary)", animation: "dwd-float 6s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full blur-3xl opacity-30"
        style={{ background: "var(--brand-accent, var(--brand-primary))", animation: "dwd-float 7s ease-in-out infinite reverse" }}
      />

      <div className="relative flex flex-col items-center">
        {/* Logo with rotating ring + shimmer */}
        <div className="relative grid h-32 w-32 place-items-center sm:h-36 sm:w-36">
          {/* rotating conic ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklch, var(--brand-primary), transparent 20%) 90deg, transparent 180deg, color-mix(in oklch, var(--brand-primary), transparent 40%) 270deg, transparent 360deg)",
              animation: "dwd-spin 1.8s linear infinite",
              maskImage: "radial-gradient(closest-side, transparent 68%, black 70%, black 100%)",
              WebkitMaskImage: "radial-gradient(closest-side, transparent 68%, black 70%, black 100%)",
            }}
          />
          {/* soft inner disc */}
          <div
            className="absolute inset-2 rounded-full bg-white shadow-[0_20px_60px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]"
          />
          {/* logo */}
          <img
            src={logo.url}
            alt=""
            className="relative h-16 w-16 object-contain sm:h-20 sm:w-20"
            style={{ animation: "dwd-pulse 2.2s ease-in-out infinite" }}
            draggable={false}
          />
          {/* shimmer sweep */}
          <div
            className="absolute inset-2 overflow-hidden rounded-full"
            style={{
              maskImage: "radial-gradient(closest-side, black 60%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(closest-side, black 60%, transparent 100%)",
            }}
          >
            <div
              className="absolute -inset-y-1 -left-1/2 w-1/2 rotate-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in oklch, var(--brand-primary), transparent 70%), transparent)",
                animation: "dwd-shimmer 2.4s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Wordmark */}
        <div className="mt-8 text-center">
          <p
            className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            style={{ animation: "dwd-rise 0.7s ease-out both" }}
          >
            {t("preloader.brandLead")} <span style={{ color: "var(--brand-primary)" }}>{t("preloader.brandHighlight")}</span>
          </p>
          <p
            className="mt-2 text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground"
            style={{ animation: "dwd-rise 0.9s ease-out both" }}
          >
            {t("preloader.tagline")}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-[2px] w-56 overflow-hidden rounded-full bg-foreground/10 sm:w-72">
          <div
            className="h-full rounded-full transition-[width] duration-150 ease-out"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), white 40%), var(--brand-primary))",
              backgroundSize: "200% 100%",
              animation: "dwd-slide 1.6s linear infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes dwd-spin { to { transform: rotate(360deg); } }
        @keyframes dwd-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        @keyframes dwd-shimmer { 0% { transform: translateX(0) rotate(12deg); } 100% { transform: translateX(500%) rotate(12deg); } }
        @keyframes dwd-slide { 0% { background-position: 0% 0; } 100% { background-position: 200% 0; } }
        @keyframes dwd-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes dwd-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden] * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
