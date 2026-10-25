import { useTranslation } from "react-i18next";
import { LocalLink } from "@/components/local-link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { insightsItems, type NavItem } from "./nav-data";

export function InsightsMega({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation("megaNav");
  return (
    <div className="grid gap-6 p-6 lg:grid-cols-12 lg:p-7">
      <div className="lg:col-span-8">
        <h3 className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {t("common.explore")}
        </h3>
        <ul className="mt-2 grid grid-cols-1 gap-0.5 sm:grid-cols-2">
          {insightsItems.map((it) => <li key={it.href}><Row item={it} onNavigate={onNavigate} /></li>)}
        </ul>
      </div>
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-brand-primary-foreground lg:col-span-4"
        style={{ background: "linear-gradient(150deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 32%))" }}
      >
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--brand-accent)" }} />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur">
          <Sparkles className="h-3 w-3" /> {t("common.free")}
        </span>
        <h4 className="mt-3 text-lg font-semibold">{t("sections.insights.audit.title")}</h4>
        <p className="mt-1.5 text-sm opacity-90">{t("sections.insights.audit.description")}</p>
        <LocalLink
          to="/free-dermatologist-website-audit"
          onClick={onNavigate}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-4 py-2 text-xs font-semibold text-foreground shadow-lg transition-transform hover:scale-[1.03]"
        >
          {t("common.requestFreeAudit")} <ArrowUpRight className="h-3.5 w-3.5" />
        </LocalLink>
      </div>
    </div>
  );
}

function Row({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
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
      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-accent"
    >
      {Icon && (
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/60 bg-card text-brand-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand-primary/40 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground group-hover:shadow-[0_8px_20px_-8px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-brand-primary">
          {label}
          <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 -translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden />
        </span>
        {description && (
          <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">{description}</span>
        )}
      </span>
    </LocalLink>
  );
}
