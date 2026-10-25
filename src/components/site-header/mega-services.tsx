import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LocalLink } from "@/components/local-link";

import { ArrowUpRight, Sparkles, Globe, Megaphone, Wrench, ChevronRight } from "lucide-react";
import { addOnCategories, marketingServices, websiteServices, type NavItem } from "./nav-data";

type GroupKey = "website" | "marketing" | "addons";

type Group = {
  labelKey: string;
  taglineKey: string;
  icon: typeof Globe;
  items: NavItem[];
  ctaHref?: string;
  ctaKey?: string;
};

const GROUPS: Record<GroupKey, Group> = {
  website: {
    labelKey: "sections.website.label",
    taglineKey: "sections.website.tagline",
    icon: Globe,
    items: websiteServices,
  },
  marketing: {
    labelKey: "sections.marketing.label",
    taglineKey: "sections.marketing.tagline",
    icon: Megaphone,
    items: marketingServices,
  },
  addons: {
    labelKey: "sections.addons.label",
    taglineKey: "sections.addons.tagline",
    icon: Wrench,
    items: addOnCategories,
    ctaHref: "/dermatology-add-on-services",
    ctaKey: "sections.addons.ctaLabel",
  },
};

export function ServicesMega({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation("megaNav");
  const [active, setActive] = useState<GroupKey>("website");
  const group = GROUPS[active];

  return (
    <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside
        className="relative border-r border-border/60 p-4"
        style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), white 92%), color-mix(in oklch, var(--brand-primary), white 96%))" }}
      >
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {t("common.explore")}
        </p>
        <ul className="space-y-1">
          {(Object.keys(GROUPS) as GroupKey[]).map((key) => {
            const g = GROUPS[key];
            const isActive = active === key;
            const Icon = g.icon;
            return (
              <li key={key}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(key)}
                  onFocus={() => setActive(key)}
                  onClick={() => setActive(key)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-white shadow-[0_10px_30px_-12px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]"
                      : "hover:bg-white/60"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors ${
                      isActive
                        ? "bg-brand-primary text-brand-primary-foreground"
                        : "bg-white text-brand-primary"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-semibold ${isActive ? "text-foreground" : "text-foreground/85"}`}>
                      {t(g.labelKey)}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                      {t("common.servicesCount", { count: g.items.length })}
                    </span>
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-all ${
                      isActive ? "translate-x-0 text-brand-primary opacity-100" : "-translate-x-1 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <FeatureCard onNavigate={onNavigate} />
      </aside>

      {/* Detail */}
      <div className="p-6 lg:p-7">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">{t(group.labelKey)}</h3>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-muted-foreground">{t(group.taglineKey)}</p>
          </div>
          {group.ctaHref && group.ctaKey && (
            <LocalLink
              to={group.ctaHref}
              onClick={onNavigate}
              className="hidden shrink-0 items-center gap-1 rounded-full border border-brand-primary/30 px-3 py-1.5 text-xs font-semibold text-brand-primary transition-all hover:gap-1.5 hover:bg-brand-primary hover:text-brand-primary-foreground md:inline-flex"
            >
              {t(group.ctaKey)} <ArrowUpRight className="h-3.5 w-3.5" />
            </LocalLink>
          )}
        </div>
        <ul key={active} className="grid grid-cols-3 gap-1 animate-in fade-in duration-200">
          {group.items.map((s) => (
            <li key={`${active}-${s.label}-${s.href}`}>
              <MegaLink item={s} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MegaLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const { t } = useTranslation("megaNav");
  const Icon = item.icon;
  const label = item.i18nLabelKey ? t(item.i18nLabelKey, { defaultValue: item.label }) : item.label;
  const description = item.i18nDescKey
    ? t(item.i18nDescKey, { defaultValue: item.description ?? "" })
    : item.description;
  return (
    <LocalLink
      to={item.href}
      onClick={onNavigate}
      className="group relative flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-accent hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]"
    >
      {Icon && (
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/60 bg-card text-brand-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand-primary/40 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground group-hover:shadow-[0_8px_20px_-8px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-brand-primary">
          {label}
          <ArrowUpRight
            className="h-3.5 w-3.5 -translate-x-1 -translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            aria-hidden
          />
        </span>
        {description && (
          <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">
            {description}
          </span>
        )}
      </span>
    </LocalLink>
  );
}

function FeatureCard({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation("megaNav");
  return (
    <div
      className="relative mt-4 overflow-hidden rounded-2xl p-4 text-brand-primary-foreground"
      style={{ background: "linear-gradient(150deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 32%))" }}
    >
      <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-3xl" style={{ background: "var(--brand-accent)" }} />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur">
          <Sparkles className="h-3 w-3" /> {t("common.featured")}
        </span>
        <h4 className="mt-2 text-sm font-semibold leading-tight">{t("common.needCustomPlan")}</h4>
        <p className="mt-1 text-[12px] leading-relaxed opacity-90">
          {t("common.customPlanDesc")}
        </p>
        <LocalLink
          to="/contact"
          onClick={onNavigate}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-lg transition-transform hover:scale-[1.03]"
        >
          {t("common.ctaLabel")} <ArrowUpRight className="h-3 w-3" />
        </LocalLink>
      </div>
    </div>
  );
}
