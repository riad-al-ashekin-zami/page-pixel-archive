import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ExternalLink,
  Filter,
  MapPin,
  ImageIcon,
  Quote,
  Sparkles,
  CheckCircle2,
  Timer,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  CASE_STUDIES,
  CASE_STUDY_FILTERS,
  type CaseStudyCategory,
} from "@/data/case-studies";
import { LocalLink as Link } from "@/components/local-link";
import { CtaLabel } from "@/lib/cta";

type FilterKey = "all" | CaseStudyCategory;

const CATEGORY_ACCENTS: Record<CaseStudyCategory, string> = {
  aesthetic: "linear-gradient(135deg,#ff9a8b 0%,#ff6a88 55%,#ff99ac 100%)",
  medical: "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",
  multiLocation: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
  teledermatology: "linear-gradient(135deg,#7f7fd5 0%,#86a8e7 50%,#91eae4 100%)",
  international: "linear-gradient(135deg,#0ba360 0%,#3cba92 100%)",
  enterprise: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
};

function localShot(domain: string) {
  return `/portfolio-shots/${domain}.webp`;
}
function mshot(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=720`;
}
function thumshot(url: string) {
  return `https://image.thum.io/get/width/1200/crop/720/noanimate/${url}`;
}
function faviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
}

function Thumbnail({
  url,
  domain,
  name,
  gradient,
}: {
  url: string;
  domain: string;
  name: string;
  gradient: string;
}) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = stage === 0 ? localShot(domain) : stage === 1 ? mshot(url) : thumshot(url);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div aria-hidden className="absolute inset-0" style={{ background: gradient, opacity: 0.85 }} />
      {!loaded && !failed && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] bg-[length:200%_100%]"
        />
      )}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center text-background/90">
          <ImageIcon className="h-10 w-10 opacity-80" />
        </div>
      ) : (
        <img
          src={src}
          alt={`${name} — website preview`}
          loading="lazy"
          decoding="async"
          width={1200}
          height={720}
          className={`relative h-full w-full object-cover object-top transition-all duration-700 group-hover:scale-[1.04] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (stage < 2) {
              setStage((s) => (s + 1) as 0 | 1 | 2);
              setLoaded(false);
            } else setFailed(true);
          }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      />
    </div>
  );
}

export function CaseStudiesSection() {
  const { t } = useTranslation("caseStudies");
  const [filter, setFilter] = useState<FilterKey>("all");
  const studies = useMemo(
    () =>
      filter === "all" ? CASE_STUDIES : CASE_STUDIES.filter((s) => s.category === filter),
    [filter],
  );

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary">
          <Sparkles className="h-3.5 w-3.5" />
          {t("section.eyebrow", { defaultValue: "Real practices · Real numbers" })}
        </div>
        <h2 className="mt-5 text-balance text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
          {t("section.headingPre", { defaultValue: "Every case study is a" })}{" "}
          <span className="text-brand-primary">
            {t("section.headingHighlight", { defaultValue: "live dermatology practice" })}
          </span>
          .
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
          {t("section.subheading", {
            defaultValue:
              "Before / after numbers on bookings, SEO, page speed, and revenue — pulled from real analytics, not decks.",
          })}
        </p>
      </div>

      {/* Filter chips */}
      <div className="mt-8 flex items-center justify-center">
        <div className="flex max-w-full items-center gap-2 overflow-x-auto rounded-full border border-border/60 bg-card/70 p-1.5 backdrop-blur sm:gap-1.5">
          <span className="ml-2 hidden shrink-0 items-center gap-1.5 text-xs font-semibold text-muted-foreground sm:inline-flex">
            <Filter className="h-3.5 w-3.5" />{" "}
            {t("section.filter", { defaultValue: "Filter" })}
          </span>
          {CASE_STUDY_FILTERS.map((f) => {
            const active = filter === f.key;
            const label = t(`filters.${f.key}`, { defaultValue: f.label });
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key as FilterKey)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  active
                    ? "bg-brand-primary text-brand-primary-foreground shadow-[0_8px_20px_-8px_var(--brand-primary)]"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-8 lg:mt-14">
        {studies.map((s) => {
          const grad = CATEGORY_ACCENTS[s.category];
          const tt = (k: string, d: string) =>
            t(`studies.${s.slug}.${k}`, { defaultValue: d });
          const categoryLabel = t(`categoryLabels.${s.category}`, { defaultValue: s.categoryLabel });
          const highlights = t(`studies.${s.slug}.highlights`, {
            returnObjects: true,
            defaultValue: s.highlights,
          }) as string[];
          return (
            <article
              key={s.slug}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]"
            >
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                {/* Thumbnail */}
                <div className="relative isolate aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:min-h-full">
                  <Thumbnail url={s.url} domain={s.domain} name={s.name} gradient={grad} />
                  <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 text-[11px] font-semibold text-foreground backdrop-blur">
                    <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: grad }} />
                    {categoryLabel}
                  </div>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-[11px] font-semibold text-foreground backdrop-blur transition-transform hover:-translate-y-0.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />{" "}
                    {t("actions.visitSite", { defaultValue: "Visit site" })}
                  </a>
                  <div className="absolute inset-x-4 bottom-4 z-10 flex items-center gap-2 text-background">
                    <img
                      src={faviconUrl(s.domain)}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5 rounded-sm bg-background/90 p-0.5"
                      loading="lazy"
                    />
                    <span className="truncate text-sm font-semibold drop-shadow">{s.domain}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {tt("location", s.location)}
                    </span>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Timer className="h-3.5 w-3.5" /> {tt("duration", s.duration)}
                    </span>
                  </div>

                  <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-[1.65rem]">{s.name}</h3>
                  <p className="mt-2 text-pretty text-sm text-muted-foreground sm:text-base">
                    {tt("tagline", s.tagline)}
                  </p>

                  {/* Metrics grid */}
                  <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
                    {s.metrics.map((m, idx) => {
                      const mLabel = t(`studies.${s.slug}.metrics.${idx}.label`, {
                        defaultValue: m.label,
                      });
                      return (
                        <li
                          key={m.label}
                          className="relative overflow-hidden rounded-xl border p-3 sm:p-3.5"
                          style={
                            {
                              ["--cat" as string]: `oklch(0.62 0.14 ${m.hue})`,
                              borderColor: `oklch(0.62 0.14 ${m.hue} / 0.28)`,
                              background: `oklch(0.62 0.14 ${m.hue} / 0.06)`,
                            } as React.CSSProperties
                          }
                        >
                          <p className="truncate text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {mLabel}
                          </p>
                          <p
                            className="mt-1 text-lg font-black leading-none tabular-nums sm:text-xl"
                            style={{ color: "var(--cat)" }}
                          >
                            {m.delta}
                          </p>
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            <span className="line-through opacity-60">{m.before}</span>
                            <ArrowRight className="mx-1 inline h-3 w-3 -translate-y-px" />
                            <span className="font-semibold text-foreground">{m.after}</span>
                          </p>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Challenge + Solution */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand-primary/80">
                        {t("labels.challenge", { defaultValue: "Challenge" })}
                      </p>
                      <p className="mt-1.5 text-sm text-muted-foreground">{tt("challenge", s.challenge)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand-primary/80">
                        {t("labels.solution", { defaultValue: "What we shipped" })}
                      </p>
                      <p className="mt-1.5 text-sm text-muted-foreground">{tt("solution", s.solution)}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground/90 sm:text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Quote */}
                  <figure
                    className="mt-6 rounded-2xl border border-border/60 p-4 sm:p-5"
                    style={{
                      background:
                        "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 94%), color-mix(in oklch, var(--brand-secondary), transparent 94%))",
                    }}
                  >
                    <Quote aria-hidden className="h-5 w-5 text-brand-primary/70" />
                    <blockquote className="mt-1 text-pretty text-sm italic text-foreground/90 sm:text-[15px]">
                      "{tt("quote.text", s.quote.text)}"
                    </blockquote>
                    <figcaption className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {tt("quote.author", s.quote.author)} · {tt("quote.role", s.quote.role)}
                    </figcaption>
                  </figure>

                  {/* Footer actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      to="/contact"
                      className="group/btn inline-flex min-h-10 items-center gap-1.5 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_10px_24px_-12px_var(--brand-primary)] transition-transform hover:-translate-y-0.5"
                    >
                      <CtaLabel />
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border/70 bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/50 hover:text-brand-primary"
                    >
                      {t("actions.viewLive", { defaultValue: "View live site" })}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {studies.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          {t("section.empty", { defaultValue: "No case studies in this category yet." })}
        </p>
      )}
    </section>
  );
}
