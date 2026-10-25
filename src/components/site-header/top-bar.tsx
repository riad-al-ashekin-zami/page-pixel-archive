import { useTranslation } from "react-i18next";
import { Mail, Clock, ShieldCheck } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LocalLink } from "@/components/local-link";
import { CTA_URL } from "@/lib/cta";

export function TopBar() {
  const { t } = useTranslation();

  return (
    <div
      className="text-[11px] font-medium text-brand-primary-foreground sm:text-xs"
      style={{ background: "linear-gradient(90deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))" }}
    >
      {/* Desktop ≥1024 */}
      <div className="mx-auto hidden max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-2 lg:grid">
        <div className="flex items-center gap-5 justify-self-start">
          <Pill icon={Mail} href="mailto:info@dermatologywebsitedesign.com">info@dermatologywebsitedesign.com</Pill>
        </div>
        <div className="justify-self-center">
          <Pill icon={Clock} to={CTA_URL}>{t("topBar.freeAudit48h")}</Pill>
        </div>
        <div className="flex items-center gap-2 justify-self-end">
          <Pill icon={ShieldCheck}>{t("topBar.hipaaAware")}</Pill>
          <span aria-hidden className="h-3 w-px bg-white/20" />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Tablet 768–1023 — evenly spaced, HIPAA text dropped to prevent overflow */}
      <div className="mx-auto hidden max-w-7xl items-center gap-4 px-5 py-2 md:flex lg:hidden">
        <div className="shrink-0">
          <Pill icon={Clock} to={CTA_URL}>{t("topBar.freeAudit48h")}</Pill>
        </div>
        <div className="min-w-0 flex-1 text-center">
          <a
            href="mailto:info@dermatologywebsitedesign.com"
            className="inline-flex max-w-full items-center gap-1.5 rounded-full px-2 py-0.5 transition-colors hover:bg-white/10"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="truncate">info@dermatologywebsitedesign.com</span>
          </a>
        </div>
        <div className="shrink-0">
          <LanguageSwitcher />
        </div>
      </div>


      {/* Mobile ≥480 <768 */}
      <div className="mx-auto hidden grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-1.5 min-[480px]:grid md:hidden">
        <div className="justify-self-start">
          <Pill icon={Clock} to={CTA_URL}>{t("topBar.freeAudit48hShort")}</Pill>
        </div>
        <div className="justify-self-center">
          <Pill icon={ShieldCheck}>{t("topBar.hipaa")}</Pill>
        </div>
        <div className="flex items-center gap-1.5 justify-self-end">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Mobile <480 */}
      <div className="flex items-center justify-between gap-2 px-3 py-1.5 min-[480px]:hidden">
        <Pill icon={Clock} to={CTA_URL}>{t("topBar.freeAudit48hShort")}</Pill>
        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

function Pill({
  icon: Icon,
  href,
  to,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  to?: string;
  children: React.ReactNode;
}) {
  const cls =
    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 transition-colors hover:bg-white/10";
  const inner = (
    <>
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span className="whitespace-nowrap">{children}</span>
    </>
  );
  if (to) {
    return (
      <LocalLink to={to} className={cls}>
        {inner}
      </LocalLink>
    );
  }
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <span className={cls}>
      {inner}
    </span>
  );
}
