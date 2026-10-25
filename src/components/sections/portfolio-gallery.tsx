import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Filter, Globe2, ImageIcon, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_SITES,
  type PortfolioCategoryKey,
} from "@/data/portfolio-sites";

type FilterKey = PortfolioCategoryKey | "all";

const CATEGORY_ACCENTS: Record<PortfolioCategoryKey, { grad: string; label: string }> = {
  aesthetic: { grad: "linear-gradient(135deg, #ff9a8b 0%, #ff6a88 55%, #ff99ac 100%)", label: "Aesthetic" },
  medical: { grad: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", label: "Medical" },
  multiLocation: { grad: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", label: "Multi-location" },
  brand: { grad: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", label: "Brand / Enterprise" },
  international: { grad: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)", label: "International" },
  specialty: { grad: "linear-gradient(135deg, #7f7fd5 0%, #86a8e7 50%, #91eae4 100%)", label: "Specialty" },
};

// Local screenshots (instant CDN). Fallback to WordPress mShots then thum.io.
function localShot(domain: string) {
  return `/portfolio-shots/${domain}.webp`;
}
function mshot(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=900&h=560`;
}
function thumshot(url: string) {
  return `https://image.thum.io/get/width/900/crop/560/noanimate/${url}`;
}
function faviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
}

function Thumbnail({ url, domain, name, gradient }: { url: string; domain: string; name: string; gradient: string }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = stage === 0 ? localShot(domain) : stage === 1 ? mshot(url) : thumshot(url);
  return (
    <div className="absolute inset-0">
      <div aria-hidden className="absolute inset-0" style={{ background: gradient, opacity: 0.9 }} />
      {!loaded && !failed && (
        <div aria-hidden className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] bg-[length:200%_100%]" />
      )}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center text-background/90">
          <ImageIcon className="h-8 w-8 opacity-80" />
        </div>
      ) : (
        <img
          src={src}
          alt={`${name} — website preview`}
          loading="lazy"
          decoding="async"
          width={900}
          height={560}
          className={`relative h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-[1.03] ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (stage < 2) {
              setStage((s) => (s + 1) as 0 | 1 | 2);
              setLoaded(false);
            } else setFailed(true);
          }}
        />
      )}
    </div>
  );
}

export function PortfolioGallery({ heading, eyebrow, subheading }: { heading: string; eyebrow: string; subheading: string }) {
  const { t } = useTranslation("portfolio");
  const [active, setActive] = useState<FilterKey>("all");

  const filtered = useMemo(
    () => (active === "all" ? PORTFOLIO_SITES : PORTFOLIO_SITES.filter((s) => s.category === active)),
    [active],
  );

  return (
    <section className="relative isolate overflow-hidden bg-card/40 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary">
              <Globe2 className="h-3.5 w-3.5" />
              {eyebrow}
            </div>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{heading}</h2>
            <p className="mt-3 text-pretty text-muted-foreground sm:text-lg">{subheading}</p>
          </div>
          <div className="hidden items-center gap-2 text-xs font-semibold text-muted-foreground sm:inline-flex">
            <Filter className="h-3.5 w-3.5" />
            <span>{filtered.length} / {PORTFOLIO_SITES.length}</span>
          </div>
        </div>

        <div className="mt-8 -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {PORTFOLIO_CATEGORIES.map((c) => {
            const isActive = active === c.key;
            const label = t(`filters.${c.key}`, { defaultValue: c.label });
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setActive(c.key as FilterKey)}
                className={`shrink-0 snap-start rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "border-transparent bg-brand-primary text-brand-primary-foreground shadow-[0_10px_24px_-12px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]"
                    : "border-border/70 bg-background/70 text-foreground/80 hover:border-brand-primary/40 hover:text-brand-primary"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((site) => {
            const accent = CATEGORY_ACCENTS[site.category];
            const categoryLabel = t(`categoryLabels.${site.category}`, { defaultValue: accent.label });
            const tagline = t(`sites.${site.domain}.tagline`, { defaultValue: site.tagline });
            const location = site.location ? t(`sites.${site.domain}.location`, { defaultValue: site.location }) : "";
            return (
              <li key={site.url}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_10px_30px_-18px_color-mix(in_oklch,var(--brand-primary),transparent_65%)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_28px_60px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_45%)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Thumbnail url={site.url} domain={site.domain} name={site.name} gradient={accent.grad} />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground">
                      {categoryLabel}
                    </span>
                    <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/95 text-brand-primary shadow-md transition-transform group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-border/60 bg-background">
                        <img src={faviconUrl(site.domain)} alt="" aria-hidden width={20} height={20} loading="lazy" className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black leading-tight">{site.name}</p>
                        <p className="truncate text-[11px] font-medium text-muted-foreground">{site.domain}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground [overflow-wrap:anywhere]">{tagline}</p>
                    <div className="mt-auto flex items-center justify-between pt-2 text-[11px] font-semibold text-muted-foreground">
                      {location ? (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {location}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="inline-flex items-center gap-1 text-brand-primary">
                        {t("actions.visitSite", { defaultValue: "Visit site" })} <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
