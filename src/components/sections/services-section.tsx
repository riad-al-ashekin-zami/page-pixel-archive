
import { useTranslation } from "react-i18next";
import { LocalLink } from "@/components/local-link";
import {
  ArrowUpRight,
  Monitor,
  Sparkles,
  RefreshCw,
  MapPin,
  ShoppingBag,
  LockKeyhole,
  Wrench,
  Search,
  MousePointerClick,
  ArrowRightLeft,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  key: string;
  href: string;
  tag?: boolean;
};

const services: Service[] = [
  { icon: Monitor, key: "customWebsite", href: "/dermatology-website-design", tag: true },
  { icon: RefreshCw, key: "redesign", href: "/dermatology-website-redesign" },
  { icon: ArrowRightLeft, key: "migration", href: "/dermatology-website-migration" },
  { icon: MapPin, key: "multiLocation", href: "/multi-location-dermatology-website-design" },
  { icon: ShoppingBag, key: "ecommerce", href: "/dermatology-ecommerce-website-design" },
  { icon: LockKeyhole, key: "patientPortal", href: "/dermatology-patient-portal" },
  { icon: Wrench, key: "maintenance", href: "/dermatology-website-maintenance-services" },
  { icon: Search, key: "seo", href: "/dermatology-seo-services" },
  { icon: MousePointerClick, key: "googleAds", href: "/dermatology-google-ads-ppc" },
];

export function ServicesSection() {
  const { t } = useTranslation("homeSections");
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{
        background:
          "radial-gradient(800px 450px at 0% 100%, color-mix(in oklch, var(--brand-secondary), transparent 88%), transparent 60%), linear-gradient(180deg, #ffffff, color-mix(in oklch, var(--brand-primary), transparent 96%))",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklch, var(--brand-primary), transparent 65%), transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary"><span className="tabular-nums opacity-60">01</span><span className="opacity-30">—</span>
            <Sparkles className="h-3.5 w-3.5" /> {t("services.eyebrow")}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            {t("services.headingLead")}{" "}
            <span className="text-brand-primary">{t("services.headingHighlight")}</span>
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
            {t("services.intro")}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const title = t(`services.items.${s.key}.title`);
            const description = t(`services.items.${s.key}.description`);
            return (
              <li key={s.key}>
                <LocalLink
                  to={s.href}
                  aria-label={t("services.exploreAriaLabel", { title })}
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "color-mix(in oklch, var(--brand-primary), transparent 70%)" }}
                  />

                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-brand-primary/15 bg-brand-primary/5 text-brand-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                      <s.icon className="h-5 w-5" aria-hidden />
                    </span>
                    {s.tag && (
                      <span className="rounded-full bg-brand-accent/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                        {t("services.mostPopular")}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand-primary">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>

                  <div className="relative mt-auto flex items-center gap-1.5 text-sm font-semibold text-brand-primary">
                    {t("services.exploreCta", { title })}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </LocalLink>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/60 bg-card/70 px-6 py-7 text-center backdrop-blur sm:flex-row sm:gap-5 sm:text-left">
          <p className="text-sm text-muted-foreground sm:text-base">
            {t("services.footerLead")}{" "}
            <span className="font-semibold text-foreground">{t("services.footerHighlight")}</span>
          </p>
          <LocalLink
            to="/get-a-free-quote"
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-brand-primary-foreground transition-transform hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))" }}
          >
            {t("services.footerCta")} <ArrowUpRight className="h-4 w-4" />
          </LocalLink>
        </div>
      </div>
    </section>
  );
}
