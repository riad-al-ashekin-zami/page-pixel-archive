import { useTranslation } from "react-i18next";
import { LocalLink } from "@/components/local-link";
import {
  Mail,
  MapPin,
  CalendarCheck,
  ArrowRight,
  ArrowUp,
  ChevronRight,
  ChevronDown,
  Star,
  ShieldCheck,
  Accessibility,
  Lock,
  Search,
  Smartphone,
  Gauge,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,

  Users,
  Workflow,
  FileText,
  Send,
  PenLine,
  HelpCircle,
  BarChart3,
  ClipboardCheck,
  ShoppingCart,
  Stethoscope,
  ScrollText,
  FileCheck2,
  Receipt,
  Cookie,
  Heart,
  Monitor,
  BookOpen,
  User as UserIcon,
  Shield,
  type LucideIcon,
} from "lucide-react";
import footerLogo from "@/assets/dermwd-logo-footer.webp.asset.json";
import { CTA_URL } from "@/lib/cta";

type LinkItem = {
  labelKey: string;
  href: string;
  icon?: LucideIcon;
  badgeKey?: string;
};

const services: LinkItem[] = [
  { labelKey: "services.websiteDesign", href: "/dermatology-website-design" },
  { labelKey: "services.websiteRedesign", href: "/dermatology-website-redesign" },
  { labelKey: "services.websiteMigration", href: "/dermatology-website-migration" },
  { labelKey: "services.websiteManagement", href: "/dermatology-website-management-services" },
  { labelKey: "services.ecommerce", href: "/dermatology-ecommerce-website-design" },
  { labelKey: "services.socialMedia", href: "/dermatology-social-media-services" },
];

const company: LinkItem[] = [
  { labelKey: "company.about", href: "/about", icon: Users },
  { labelKey: "company.process", href: "/our-process", icon: Workflow },
  { labelKey: "company.caseStudies", href: "/case-studies", icon: FileText },
  { labelKey: "company.contact", href: "/contact", icon: Send },
];

const resources: LinkItem[] = [
  { labelKey: "resources.blog", href: "/blog", icon: PenLine },
  { labelKey: "resources.faq", href: "/faq", icon: HelpCircle },
  { labelKey: "resources.audit", href: "/contact", icon: BarChart3, badgeKey: "resources.auditBadge" },
  { labelKey: "resources.checklists", href: "/dermatology-website-checklists", icon: ClipboardCheck },
  { labelKey: "resources.patientPortal", href: "/dermatology-patient-portal", icon: Stethoscope },
  { labelKey: "resources.addOns", href: "/dermatology-add-on-services", icon: ShoppingCart },
];

const legal: LinkItem[] = [
  { labelKey: "legal.serviceAgreement", href: "/service-agreement", icon: ScrollText },
  { labelKey: "legal.privacy", href: "/privacy-policy", icon: ShieldCheck },
  { labelKey: "legal.terms", href: "/terms-of-service", icon: FileCheck2 },
  { labelKey: "legal.refund", href: "/refund-policy", icon: Receipt },
  { labelKey: "legal.cookies", href: "/cookie-policy", icon: Cookie },
];

const trustBadges = [
  { icon: ShieldCheck, key: "hipaa" as const },
  { icon: Accessibility, key: "ada" as const },
  { icon: Lock, key: "ssl" as const },
  { icon: Search, key: "seo" as const },
  { icon: Smartphone, key: "mobile" as const },
  { icon: Gauge, key: "speed" as const },
];

function TumblrIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14.5 22c-3.6 0-6.3-1.9-6.3-6.3V9.9H5.7V6.7c3-.8 4.2-3.4 4.4-5.7h3.1v5.2h4.4v3.7h-4.4v5c0 1.9.9 2.5 2.4 2.5h2.1V22h-3.2z" />
    </svg>
  );
}

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/DermatologyWebsiteDesign/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/dermatologywebsitedesign/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/dermatology-website-design" },
  { icon: Twitter, label: "X", href: "https://x.com/DermatologyWeb", hideOnTablet: true },
  { icon: TumblrIcon, label: "Tumblr", href: "https://www.tumblr.com/dermatologywebsitedesign", hideOnTablet: true },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@DermatologyWebsiteDesign" },
  { icon: Mail, label: "Email", href: "mailto:info@dermatologywebsitedesign.com" },
];



export function SiteFooter({ hideCta = false }: { hideCta?: boolean } = {}) {
  const { t, i18n } = useTranslation("footer");
  const isRtl = i18n.resolvedLanguage === "ar" || i18n.language?.startsWith("ar");
  return (
    <footer
      className="relative isolate mt-20 overflow-hidden text-slate-100"
      style={{
        background:
          "radial-gradient(1100px 520px at 88% -10%, rgba(92,189,185,0.18), transparent 60%), radial-gradient(900px 460px at 6% 110%, rgba(45,138,158,0.22), transparent 60%), linear-gradient(180deg, #0c2340 0%, #081a31 60%, #050f22 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(92,189,185,0.6), rgba(201,168,76,0.5), transparent)",
        }}
      />

      {/* Hero CTA band (hidden on legal pages) */}
      {!hideCta && (
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-14">
        <div
          className="relative overflow-hidden rounded-2xl border border-white/10 px-5 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8"
          style={{
            background:
              "radial-gradient(420px 260px at 8% 50%, rgba(92,189,185,0.22), transparent 70%), linear-gradient(135deg, #0f2c4a 0%, #0a1f38 55%, #081a31 100%)",
          }}
        >
          <svg
            aria-hidden
            className="pointer-events-none absolute -left-10 top-0 h-full w-[45%]"
            viewBox="0 0 600 300"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M-50 110 Q 120 60 280 130 T 650 150" stroke="#5cbdb9" strokeWidth="1" opacity="0.18" />
            <path d="M-50 160 Q 120 110 280 180 T 650 200" stroke="#5cbdb9" strokeWidth="1" opacity="0.12" />
            <path d="M-50 210 Q 120 160 280 230 T 650 250" stroke="#5cbdb9" strokeWidth="1" opacity="0.08" />
          </svg>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[38%] opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
              maskImage:
                "linear-gradient(90deg, transparent 0%, black 45%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, black 45%, black 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "#5cbdb9" }}
          />

          <div className="relative grid items-center gap-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-8">
            <div className="flex items-start gap-4 lg:contents">
              <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#5cbdb9]/40 lg:h-20 lg:w-20"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(92,189,185,0.35), rgba(12,35,64,0.6))",
                }}
              >
                <CalendarCheck className="h-5 w-5 text-[#5cbdb9] lg:h-9 lg:w-9" aria-hidden />
              </div>

              <div className="min-w-0 flex-1">
                <span className="hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5cbdb9] lg:inline">
                  {t("cta.eyebrow")}
                </span>
                <h2
                  className="text-balance text-lg font-bold leading-tight tracking-tight text-white sm:text-xl lg:mt-2 lg:text-[26px] xl:text-[28px]"
                  style={{ overflowWrap: "anywhere", wordBreak: "break-word", hyphens: "auto" }}
                >
                  {t("cta.headingLead")}{" "}
                  <span className="text-[#5cbdb9]">{t("cta.headingHighlight")}</span>
                  {t("cta.headingTailLong")}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300/90">
                  <span className="lg:hidden">{t("cta.descriptionShort")}</span>
                  <span className="hidden lg:inline">{t("cta.descriptionLong")}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-stretch gap-3 lg:items-start lg:border-l lg:border-white/10 lg:pl-8">
              <LocalLink
                to="/contact"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#0c2340] shadow-[0_18px_40px_-15px_rgba(201,168,76,0.7)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c2340] lg:w-auto"
                style={{ background: "linear-gradient(135deg, #e8c97a, #c9a84c)" }}
              >
                <CalendarCheck className="hidden h-4 w-4 lg:inline" aria-hidden />
                {t("cta.button")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </LocalLink>
              <div className="hidden items-center gap-3 md:flex">
                <div className="flex -space-x-2">
                  {[
                    "https://i.pravatar.cc/40?img=47",
                    "https://i.pravatar.cc/40?img=32",
                    "https://i.pravatar.cc/40?img=15",
                  ].map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="h-7 w-7 rounded-full border-2 border-[#0c2340] object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5 text-[#e8c97a]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-300/90">
                    {t("cta.trustedBy")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pt-12 md:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-4 md:gap-x-6 lg:gap-x-8 xl:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(0,1fr))] xl:gap-x-8">

          {/* Brand */}
          <div className={`md:col-span-4 md:mb-6 md:text-center xl:mb-0 xl:col-span-1 ${isRtl ? "xl:text-right" : "xl:text-left"}`}>
            <div className={`flex justify-center ${isRtl ? "xl:justify-end" : "xl:justify-start"}`}>
              <LocalLink to="/" aria-label={t("brand.homeAria")} className="inline-flex">
                <img
                  src={footerLogo.url}
                  alt={t("brand.logoAlt")}
                  className="h-12 w-auto sm:h-14 md:h-16"
                  loading="lazy"
                  decoding="async"
                />
              </LocalLink>
            </div>
            <p className={`mt-5 text-sm leading-relaxed text-slate-300/90 text-justify md:mx-auto md:max-w-xl md:text-center xl:mx-0 xl:max-w-none ${isRtl ? "xl:text-right" : "xl:text-justify"}`}>
              {t("brand.tagline")}
            </p>
            <ul className="mt-6 text-sm text-slate-300 sm:space-y-2.5 md:flex md:flex-wrap md:justify-center md:gap-x-6 md:gap-y-2.5 md:space-y-0 xl:block xl:space-y-2.5">
              <li className="flex items-center gap-2.5 border-b border-white/10 py-3 sm:border-0 sm:py-0">
                <Mail className="h-4 w-4 shrink-0 text-[#5cbdb9]" aria-hidden />
                <a href="mailto:info@dermatologywebsitedesign.com" className="hover:text-white">
                  info@dermatologywebsitedesign.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 border-b border-white/10 py-3 sm:border-0 sm:py-0">
                <MapPin className="h-4 w-4 shrink-0 text-[#5cbdb9]" aria-hidden />
                <span className="min-w-0 break-words">{t("brand.location")}</span>
              </li>
            </ul>
            <div aria-hidden className="mx-auto mt-8 hidden h-px w-40 bg-gradient-to-r from-transparent via-[#5cbdb9]/40 to-transparent md:block xl:hidden" />
          </div>

          {/* Mobile accordions */}
          <div className="-mt-4 md:hidden">
            <MobileAccordion titleKey="columns.services" icon={Monitor} items={services} />
            <MobileAccordion titleKey="columns.company" icon={UserIcon} items={company} />
            <MobileAccordion titleKey="columns.resources" icon={BookOpen} items={resources} />
            <MobileAccordion titleKey="columns.legal" icon={Shield} items={legal} />
            <div
              className="mt-6 flex w-full items-center gap-3 rounded-xl border border-[#5cbdb9]/30 p-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(92,189,185,0.12), rgba(12,35,64,0.4))",
              }}
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#5cbdb9]/40 bg-[#5cbdb9]/10">
                <ShieldCheck className="h-5 w-5 text-[#5cbdb9]" aria-hidden />
              </div>
              <div className="min-w-0 shrink-0">
                <p className="whitespace-nowrap text-sm font-semibold text-white">{t("hipaaBadge.title")}</p>
                <p className="whitespace-nowrap text-[11px] leading-snug text-slate-300/90">
                  {t("hipaaBadge.note")}
                </p>
              </div>
            </div>
          </div>

          <FooterColumn titleKey="columns.services" className="hidden md:block">
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.labelKey}>
                  <LocalLink
                    to={item.href}
                    className="group flex items-start justify-between gap-2 text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    <span className="min-w-0 break-words">{t(item.labelKey)}</span>
                    <ChevronRight className="mt-1 hidden h-3.5 w-3.5 shrink-0 text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:text-[#5cbdb9] xl:inline-block" aria-hidden />
                  </LocalLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn titleKey="columns.company" className="hidden md:block">
            <IconLinkList items={company} showChevron />
          </FooterColumn>

          <FooterColumn titleKey="columns.resources" className="hidden md:block">
            <IconLinkList items={resources} />
          </FooterColumn>

          <FooterColumn titleKey="columns.legal" className="hidden md:block">

            <IconLinkList items={legal} />
            <div
              className="mt-5 flex w-full max-w-full items-start gap-3 rounded-xl border border-[#5cbdb9]/30 p-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(92,189,185,0.12), rgba(12,35,64,0.4))",
              }}
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#5cbdb9]/40 bg-[#5cbdb9]/10">
                <ShieldCheck className="h-5 w-5 text-[#5cbdb9]" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{t("hipaaBadge.title")}</p>
                <p className="text-[11px] leading-snug text-slate-300/90">
                  {t("hipaaBadge.note")}
                </p>
              </div>
            </div>
          </FooterColumn>
        </div>
      </div>

      {/* Trust badges row */}
      <div className="xl:bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8 xl:py-5">
          <ul className="grid grid-cols-3 gap-x-2 gap-y-5 rounded-2xl border border-[#1b5b73] bg-[#08243b]/60 py-5 sm:gap-x-6 xl:grid-cols-6 xl:gap-x-0 xl:gap-y-0 xl:divide-x xl:divide-[#1d5368] xl:bg-[#08243b]/95 xl:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] xl:py-6">
            {trustBadges.map((b) => {
              const label = t(`trustBadges.${b.key}.label`);
              const note = t(`trustBadges.${b.key}.note`);
              return (
                <li
                  key={b.key}
                  className="flex min-w-0 flex-col items-center gap-1.5 px-2 text-center xl:flex-row xl:justify-center xl:text-left xl:gap-3 xl:px-3"
                >
                  <b.icon className="h-7 w-7 shrink-0 text-[#18c8bd] xl:h-8 xl:w-8" aria-hidden strokeWidth={1.75} />
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-white xl:text-sm">{label}</p>
                    <p className="text-[11px] leading-snug text-slate-400 xl:mt-1 xl:text-xs xl:text-slate-300/90">{note}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative bg-[#050f22]/60 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-4 py-5 sm:px-6 md:grid-cols-3 lg:px-8">
          <ul className="order-1 flex items-center justify-center gap-2 md:order-3 md:justify-end">
          {socials.map((s) => (
              <li key={s.label} className={s.hideOnTablet ? "md:hidden lg:block" : ""}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5cbdb9]/40 hover:bg-[#5cbdb9]/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5cbdb9] md:h-9 md:w-9"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
          <p className="order-2 text-center text-xs text-slate-400 md:order-1 md:text-left">
            <span className="whitespace-nowrap">© 2026 <span className="text-[#5cbdb9]">{t("bottom.brand")}</span>.</span>{" "}
            <span className="whitespace-nowrap">{t("bottom.rights")}</span>
          </p>
          <p className="order-3 flex items-center justify-center gap-1.5 text-xs text-slate-400 md:order-2">
            {t("bottom.madeWith")} <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" aria-hidden /> {t("bottom.madeFor")}
          </p>
        </div>
        <BackToTop label={t("bottom.backToTop")} />
      </div>

      {/* Compliance notice */}
      <div className="border-t border-white/5 bg-[#050f22]/80">
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
          <p className="text-justify text-[12px] leading-relaxed text-slate-400">
            <span className="font-semibold text-[#5cbdb9]">{t("compliance.heading")}</span>
            <span className="mx-1.5 text-slate-600">—</span>
            {t("compliance.body")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="absolute -top-6 right-4 grid h-12 w-12 place-items-center rounded-full border border-[#5cbdb9]/40 bg-[#0c2340] text-[#5cbdb9] shadow-[0_10px_30px_-10px_rgba(92,189,185,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#5cbdb9]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5cbdb9] md:hidden"
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}

function MobileAccordion({
  titleKey,
  icon: Icon,
  items,
}: {
  titleKey: string;
  icon: LucideIcon;
  items: LinkItem[];
}) {
  const { t } = useTranslation("footer");
  return (
    <details className="group border-b border-white/10 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-3 py-4 text-base font-semibold text-white">
        <Icon className="h-5 w-5 text-[#5cbdb9]" />
        <span className="flex-1">{t(titleKey)}</span>
        <ChevronDown className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <ul className="space-y-3 pb-4 pl-8">
        {items.map((item) => {
          const ItemIcon = item.icon;
          return (
            <li key={item.labelKey}>
              <LocalLink
                to={item.href}
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white"
              >
                {ItemIcon ? (
                  <ItemIcon className="h-4 w-4 shrink-0 text-slate-500" />
                ) : null}
                <span>{t(item.labelKey)}</span>
                {item.badgeKey ? (
                  <span className="shrink-0 rounded-full bg-[#5cbdb9]/20 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#5cbdb9]">
                    {t(item.badgeKey)}
                  </span>
                ) : null}
              </LocalLink>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

function FooterColumn({
  titleKey,
  children,
  className = "",
}: {
  titleKey: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { t } = useTranslation("footer");
  return (
    <div className={className}>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#5cbdb9]">
        {t(titleKey)}
        <span aria-hidden className="mt-2 block h-px w-10 bg-gradient-to-r from-[#5cbdb9] to-transparent" />
      </h3>
      {children}
    </div>
  );
}

function IconLinkList({ items, showChevron = false }: { items: LinkItem[]; showChevron?: boolean }) {
  const { t } = useTranslation("footer");
  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.labelKey}>
            <LocalLink
              to={item.href}
              className="group flex items-center gap-2.5 text-sm text-slate-300 transition-colors hover:text-white"
            >
              {Icon ? (
                <Icon className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-[#5cbdb9]" />
              ) : null}
              <span className="min-w-0 break-words">{t(item.labelKey)}</span>
              {item.badgeKey ? (
                <span className="shrink-0 rounded-full bg-[#5cbdb9]/20 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#5cbdb9]">
                  {t(item.badgeKey)}
                </span>
              ) : null}
              {showChevron ? (
                <ChevronRight className="ml-auto hidden h-3.5 w-3.5 shrink-0 text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:text-[#5cbdb9] xl:inline-block" aria-hidden />
              ) : null}
            </LocalLink>
          </li>
        );
      })}
    </ul>
  );
}
