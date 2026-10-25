import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LocalLink } from "@/components/local-link";
import { useCurrentLang } from "@/lib/i18n-routing";
import { formatLocalizedNumber } from "@/lib/locale-format";

import {
  Search,
  PenTool,
  Code2,
  Rocket,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  type LucideIcon,
} from "lucide-react";

type StepDef = { key: string; icon: LucideIcon };

const stepDefs: StepDef[] = [
  { key: "discovery", icon: Search },
  { key: "onboarding", icon: PenTool },
  { key: "design", icon: PenTool },
  { key: "build", icon: Code2 },
  { key: "launch", icon: Rocket },
  { key: "growth", icon: TrendingUp },
];

export function OurApproachSection() {
  const { t } = useTranslation("homeSections");
  const lang = useCurrentLang();
  const [active, setActive] = useState(0);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const step = stepDefs[active];
  const StepIcon = step.icon;
  const details = t(`approach.steps.${step.key}.details`, { returnObjects: true }) as string[];
  const detailsArr = Array.isArray(details) ? details : [];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = pinRef.current;
        if (!el || !mq.matches) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        if (total <= 0) return;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = scrolled / total;
        const idx = Math.min(stepDefs.length - 1, Math.floor(p * stepDefs.length));
        setActive((cur) => (cur === idx ? cur : idx));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goPrev = () => setActive((i) => (i === 0 ? stepDefs.length - 1 : i - 1));
  const goNext = () => setActive((i) => (i === stepDefs.length - 1 ? 0 : i + 1));

  const progressPct = (active / (stepDefs.length - 1)) * 100;

  return (
    <section
      id="approach"
      className="relative isolate bg-background py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(600px 400px at 0% 0%, color-mix(in oklch, var(--brand-primary), transparent 92%), transparent 60%), radial-gradient(500px 400px at 100% 100%, color-mix(in oklch, var(--brand-secondary), transparent 94%), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div ref={pinRef} className="lg:relative lg:h-[600vh]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:px-8 lg:py-10">
        <div className="max-w-3xl text-left">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">
            <span className="tabular-nums opacity-60">{formatLocalizedNumber(3, lang, 2)}</span><span className="opacity-30">—</span>
            <Sparkles className="h-3.5 w-3.5" /> {t("approach.eyebrow")}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:mt-3 lg:text-[3.25rem]">
            {t("approach.headingLead")}{" "}
            <span className="font-medium text-brand-primary">{t("approach.headingHighlight")}</span>
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mt-3 lg:text-base">
            {t("approach.intro")}
          </p>
        </div>

        <div className="mt-16 lg:mt-8">
          <div className="relative">
            <svg
              aria-hidden
              viewBox="0 0 1200 60"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 top-5 hidden h-10 w-full sm:block sm:top-6 sm:h-12"
            >
              <path
                d="M 100 30 Q 200 -6 300 30 T 500 30 T 700 30 T 900 30 T 1100 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 7"
                strokeLinecap="round"
                className="text-brand-primary/35"
              />
              <path
                d="M 100 30 Q 200 -6 300 30 T 500 30 T 700 30 T 900 30 T 1100 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength={100}
                style={{ strokeDasharray: `${progressPct} 100` }}
                className="text-brand-primary transition-all duration-700 ease-out"
              />
            </svg>

            <svg
              aria-hidden
              viewBox="0 0 300 130"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full sm:hidden"
            >
              <path
                d="M 50 20 Q 100 -2 150 20 Q 200 42 250 20 C 310 40 -10 90 50 108 Q 100 130 150 108 Q 200 86 250 108"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="5 6"
                strokeLinecap="round"
                className="text-brand-primary/35"
              />
              <path
                d="M 50 20 Q 100 -2 150 20 Q 200 42 250 20 C 310 40 -10 90 50 108 Q 100 130 150 108 Q 200 86 250 108"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={100}
                style={{ strokeDasharray: `${progressPct} 100` }}
                className="text-brand-primary transition-all duration-700 ease-out"
              />
            </svg>

            <ol className="grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-6 sm:gap-4">
              {stepDefs.map((s, i) => {
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <li key={s.key} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? "step" : undefined}
                      className="group flex w-full flex-col items-center gap-2 text-center sm:gap-3"
                    >
                      <span
                        className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 bg-background transition-all duration-300 sm:h-12 sm:w-12 ${
                          isActive
                            ? "border-brand-primary bg-brand-primary text-brand-primary-foreground shadow-[0_0_0_6px_color-mix(in_oklch,var(--brand-primary),transparent_88%)]"
                            : isDone
                              ? "border-brand-primary text-brand-primary"
                              : "border-border text-muted-foreground group-hover:border-brand-primary/60 group-hover:text-foreground"
                        }`}
                      >
                        {isDone && !isActive ? (
                          <Check className="h-4 w-4" strokeWidth={2.5} />
                        ) : (
                          <span className="text-[10px] font-bold tracking-[0.05em] sm:text-[11px]">
                            {formatLocalizedNumber(i + 1, lang, 2)}
                          </span>
                        )}
                      </span>
                      <span
                        className={`text-[9px] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-xs sm:tracking-[0.18em] ${
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {t(`approach.steps.${s.key}.short`)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/70 bg-card p-8 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.15)] sm:mt-14 sm:p-12 lg:mt-8 lg:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-8 select-none text-[12rem] font-bold leading-none text-brand-primary/[0.05] sm:text-[16rem] lg:text-[20rem]"
            >
              {formatLocalizedNumber(active + 1, lang, 2)}
            </div>

            <div key={active} className="relative grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
              <div className="min-w-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-brand-primary/20 bg-brand-primary/5 text-brand-primary">
                    <StepIcon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {t("approach.phaseLabel")} {formatLocalizedNumber(active + 1, lang, 2)}
                    <span className="mx-2 opacity-40">·</span>
                    {t("approach.stepLabel", { n: active + 1 })}
                  </div>
                </div>

                <h3 className="mt-6 text-3xl font-light tracking-tight text-foreground sm:text-[2.25rem] sm:leading-[1.15]">
                  {t(`approach.steps.${step.key}.title`)}
                </h3>

                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {t(`approach.steps.${step.key}.description`)}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={t("approach.prevAria")}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-brand-primary hover:text-brand-primary"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={t("approach.nextAria")}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-brand-primary hover:text-brand-primary"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="ml-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {formatLocalizedNumber(active + 1, lang, 2)}{" "}
                    <span className="opacity-40">/</span>{" "}
                    {formatLocalizedNumber(stepDefs.length, lang, 2)}
                  </span>
                </div>
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
                <div className="rounded-2xl border border-border/70 bg-background/60 p-6 backdrop-blur-sm sm:p-8">
                  <div className="flex items-center justify-between border-b border-border/70 pb-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {t("approach.whatHappens")}
                    </span>
                    <span className="text-[11px] font-semibold tracking-[0.15em] text-brand-primary">
                      {t("approach.deliverables", { count: detailsArr.length })}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-4">
                    {detailsArr.map((d, i) => (
                      <li key={d} className="flex items-start gap-4">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-primary/10 text-[10px] font-bold text-brand-primary">
                          {formatLocalizedNumber(i + 1, lang, 2)}
                        </span>
                        <span className="text-sm leading-relaxed text-foreground">
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-start">
            <LocalLink
              to="/our-process"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary"
            >
              {t("approach.seeFullProcess")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </LocalLink>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
