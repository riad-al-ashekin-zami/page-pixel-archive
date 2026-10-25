import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu } from "lucide-react";
import { TopBar } from "./top-bar";
import { Logo } from "./logo";
import { mainNav } from "./nav-data";
import { ServicesMega } from "./mega-services";
import { InsightsMega } from "./mega-insights";
import { MobileDrawer } from "./mobile-drawer";
import { LocalLink } from "@/components/local-link";

interface SiteHeaderProps {
  transparentOverHero?: boolean;
}

export function SiteHeader({ transparentOverHero = false }: SiteHeaderProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega on Escape and when navigating away.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  // Close mega whenever the route changes (e.g. clicking a mega link).
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    setOpenMega(null);
    setDrawerOpen(false);
  }, [pathname]);

  const isTransparent = transparentOverHero && !scrolled;

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMega(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  return (
    <>
    <header
      className={`sticky top-0 z-40 w-full font-sans backdrop-blur-xl transition-[background,backdrop-filter,border-color,box-shadow] duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "border-b border-[var(--header-border)] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)]"
      }`}
      style={!isTransparent ? { background: "var(--header-bg)" } : undefined}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-brand-primary focus:px-3 focus:py-1.5 focus:text-brand-primary-foreground"
      >
        {t("nav.skipToContent")}
      </a>

      <TopBar />

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-[72px] sm:gap-6 sm:px-6 lg:h-20 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden flex-1 lg:block" aria-label={t("nav.main")}>
          <ul className="flex items-center justify-center gap-1">
            {mainNav.map((item) => {
              const isOpen = openMega === item.label;
              const label = t(item.i18nKey, { defaultValue: item.label });
              if (!item.mega) {
                return (
                  <li key={item.href}>
                    <LocalLink
                      to={item.href}
                      className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-brand-primary"
                      activeProps={{ className: "text-brand-primary" }}
                    >
                      {label}
                    </LocalLink>
                  </li>
                );
              }
              return (
                <li
                  key={item.label}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMega(item.label);
                  }}
                  onMouseLeave={scheduleClose}
                  className="relative"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenMega(isOpen ? null : item.label)}
                    onFocus={() => setOpenMega(item.label)}
                    className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isOpen ? "text-brand-primary" : "text-foreground/80 hover:text-brand-primary"
                    }`}
                  >
                    {label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2 sm:gap-3">
          <LocalLink
            to={CTA_URL}
            className="group relative hidden items-center justify-center overflow-hidden rounded-full bg-brand-accent px-4 py-2 text-xs font-semibold text-foreground shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(0,0,0,0.4)] sm:inline-flex sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <span className="relative z-10">{t(CTA_I18N_KEY, { defaultValue: CTA_LABEL })}</span>
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </LocalLink>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label={t("nav.openMenu")}
            aria-expanded={drawerOpen}
            className="grid h-11 w-11 place-items-center rounded-md text-foreground hover:bg-accent lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mega panel */}
      {openMega && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="absolute inset-x-0 top-full hidden lg:block"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="overflow-hidden rounded-b-2xl border border-t-0 border-border/60 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
              style={{ background: "var(--mega-bg)" }}
            >
              {openMega === "Services" && <ServicesMega onNavigate={() => setOpenMega(null)} />}
              {openMega === "Insights" && <InsightsMega onNavigate={() => setOpenMega(null)} />}
            </div>
          </div>
        </div>
      )}

      {/* Scroll progress */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-0.5 transition-[width] duration-150"
        style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--brand-primary), var(--brand-accent))" }}
      />
    </header>
    <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
