import { useEffect, useRef, useState } from "react";
import { LocalLink } from "@/components/local-link";

import { useTranslation } from "react-i18next";
import { ChevronDown, X, ArrowRight, Mail, Sparkles, Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { addOnCategories, insightsItems, mainNav, marketingServices, websiteServices } from "./nav-data";
import { Logo } from "./logo";
import { WhatsAppIcon } from "./whatsapp-icon";
import { LanguageSwitcher } from "@/components/language-switcher";

function TumblrIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14.5 22c-3.6 0-6.3-1.9-6.3-6.3V9.9H5.7V6.7c3-.8 4.2-3.4 4.4-5.7h3.1v5.2h4.4v3.7h-4.4v5c0 1.9.9 2.5 2.4 2.5h2.1V22h-3.2z" />
    </svg>
  );
}

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [subExpanded, setSubExpanded] = useState<string | null>(null);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={t("nav.main")}
      onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (startX.current !== null && e.changedTouches[0].clientX - startX.current > 80) onClose();
        startX.current = null;
      }}
    >
      <button
        aria-label={t("nav.closeMenu")}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-in fade-in"
      />
      <div className="absolute right-0 top-0 flex h-full w-[min(22rem,92vw)] flex-col bg-background shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-background px-4 py-3">
          <Logo />
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher variant="drawer" onLanguageChange={onClose} />
            <button
              onClick={onClose}
              aria-label={t("nav.closeMenu")}
              className="grid h-10 w-10 place-items-center rounded-md text-foreground transition-colors hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="overflow-y-auto overscroll-contain px-2 py-2" aria-label={t("nav.main")}>
          {mainNav.map((item) => {
            const label = t(item.i18nKey, { defaultValue: item.label });
            if (!item.mega) {
              return (
                <LocalLink
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className="flex min-h-11 items-center rounded-lg px-3 text-[15px] font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {label}
                </LocalLink>
              );
            }
            const isOpen = expanded === item.label;
            return (
              <div key={item.label} className="border-b border-border/40 last:border-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : item.label)}
                  className="flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-[15px] font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {label}
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-primary" : ""}`}
                    aria-hidden
                  />
                </button>
                {isOpen && item.mega === "services" && (
                  <div className="space-y-1 px-3 pb-3 pt-1">
                    <MobileGroup title={t("drawer.websiteServices")} items={websiteServices} onClose={onClose} isOpen={subExpanded === "website"} onToggle={() => setSubExpanded(subExpanded === "website" ? null : "website")} />
                    <MobileGroup title={t("drawer.marketingServices")} items={marketingServices} onClose={onClose} isOpen={subExpanded === "marketing"} onToggle={() => setSubExpanded(subExpanded === "marketing" ? null : "marketing")} />
                    <MobileGroup title={t("drawer.addOnServices")} items={addOnCategories} onClose={onClose} isOpen={subExpanded === "addons"} onToggle={() => setSubExpanded(subExpanded === "addons" ? null : "addons")} />
                    <LocalLink
                      to="/dermatology-add-on-services"
                      onClick={onClose}
                      className="mt-2 inline-flex items-center gap-1 px-1 text-xs font-semibold text-brand-primary"
                    >
                      {t("cta.viewAllAddons")} <ArrowRight className="h-3.5 w-3.5" />
                    </LocalLink>
                  </div>
                )}
                {isOpen && item.mega === "insights" && (
                  <ul className="space-y-0.5 px-3 pb-3 pt-1">
                    {insightsItems.map((i) => (
                      <li key={i.href}>
                        <LocalLink
                          to={i.href}
                          onClick={onClose}
                          className="flex min-h-10 items-center rounded-md px-2 text-sm text-foreground/90 hover:bg-accent hover:text-brand-primary"
                        >
                          {i.label}
                        </LocalLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* Contact mini-block */}
          <div className="mt-3 space-y-2 rounded-xl border border-border/60 bg-card/60 p-3">
            <a href="https://wa.me/8801815840813" target="_blank" rel="noreferrer" className="flex min-h-10 items-center gap-2 rounded-md px-2 text-sm text-foreground hover:bg-accent">
              <WhatsAppIcon className="h-4 w-4 text-brand-primary" /> {t("drawer.chatWhatsApp")}
            </a>
            <a href="mailto:info@dermatologywebsitedesign.com" className="flex min-h-10 items-center gap-2 rounded-md px-2 text-sm text-foreground hover:bg-accent">
              <Mail className="h-4 w-4 text-brand-primary" /> info@dermatologywebsitedesign.com
            </a>
          </div>
        </nav>

        {/* Sticky CTA + mini banner */}
        <div className="border-t border-border bg-background/95 p-3 backdrop-blur">
          <div
            className="mb-2 flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-[11px] font-medium text-brand-primary-foreground"
            style={{ background: "linear-gradient(90deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 22%))" }}
          >
            <Sparkles className="h-3 w-3 shrink-0" aria-hidden />
            <span className="truncate">{t("drawer.freeAuditBanner")}</span>
          </div>
          <LocalLink
            to="/contact"
            onClick={onClose}
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-brand-accent px-5 text-sm font-semibold text-foreground shadow-lg transition-transform active:scale-[0.98]"
          >
            {t("cta.label")} <ArrowRight className="h-4 w-4" />
          </LocalLink>
          <div className="mt-3 flex items-center justify-center gap-3">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/DermatologyWebsiteDesign/", label: "Facebook" },
              { Icon: Instagram, href: "https://www.instagram.com/dermatologywebsitedesign/", label: "Instagram" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/dermatology-website-design", label: "LinkedIn" },
              { Icon: Twitter, href: "https://x.com/DermatologyWeb", label: "X" },
              { Icon: Youtube, href: "https://www.youtube.com/@DermatologyWebsiteDesign", label: "YouTube" },
              { Icon: TumblrIcon, href: "https://www.tumblr.com/dermatologywebsitedesign", label: "Tumblr" },
            ].map(({ Icon, href, label }) => (

              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-foreground/80 transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileGroup({
  title,
  items,
  onClose,
  isOpen,
  onToggle,
}: {
  title: string;
  items: { label: string; href: string }[];
  onClose: () => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-card/40">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex min-h-10 w-full items-center justify-between rounded-lg px-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:bg-accent"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-primary" : ""}`}
          aria-hidden
        />
      </button>
      {isOpen && (
        <ul className="ml-3 border-l border-brand-primary/30 px-2 pb-2 pt-1">
          {items.map((it) => (
            <li key={`${title}-${it.label}-${it.href}`}>
              <LocalLink
                to={it.href}
                onClick={onClose}
                className="flex min-h-9 items-center rounded-md px-2 text-[13px] text-foreground/90 hover:bg-accent hover:text-brand-primary"
              >
                {it.label}
              </LocalLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

