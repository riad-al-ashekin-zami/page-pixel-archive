import {
  Monitor, Sparkles, RefreshCw, MapPin, ShoppingBag, Image as ImageIcon, Users, ArrowRightLeft,
  Search, MapPinned, TrendingUp, MousePointerClick, Share2, Star, Mail, Target,
  Wrench, Server, ShoppingCart, ShieldCheck, FileText, LineChart, Plug, Rocket,
  Info, Workflow, BookOpen, Newspaper, HelpCircle, FileCheck,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  /** i18n key for label (in `megaNav` namespace). Fallback to `label`. */
  i18nLabelKey?: string;
  /** i18n key for description. Fallback to `description`. */
  i18nDescKey?: string;
};

export const websiteServices: NavItem[] = [
  { label: "Website Design", href: "/", icon: Monitor, description: "Conversion-focused dermatology sites.", i18nLabelKey: "website.design.label", i18nDescKey: "website.design.description" },
  { label: "Website Redesign", href: "/dermatology-website-redesign", icon: RefreshCw, description: "Modernize your existing practice site.", i18nLabelKey: "website.redesign.label", i18nDescKey: "website.redesign.description" },
  { label: "Website Migration", href: "/dermatology-website-migration", icon: ArrowRightLeft, description: "Move your site with zero downtime, no SEO loss.", i18nLabelKey: "website.migration.label", i18nDescKey: "website.migration.description" },
  { label: "Website Maintenance", href: "/dermatology-website-management-services", icon: Wrench, description: "Keep your site secure, updated, and fast.", i18nLabelKey: "website.maintenance.label", i18nDescKey: "website.maintenance.description" },
  { label: "Website Management", href: "/dermatology-website-management-services", icon: Server, description: "Full-service ongoing website management.", i18nLabelKey: "website.management.label", i18nDescKey: "website.management.description" },
  { label: "Website Support", href: "/dermatology-website-support-services", icon: HelpCircle, description: "On-demand expert support when you need it.", i18nLabelKey: "website.support.label", i18nDescKey: "website.support.description" },
  { label: "Multi-Location", href: "/multi-location-dermatology-website-design", icon: MapPin, description: "Scalable structure for multiple clinics.", i18nLabelKey: "website.multiLocation.label", i18nDescKey: "website.multiLocation.description" },
  { label: "E-Commerce", href: "/dermatology-ecommerce-website-design", icon: ShoppingBag, description: "Sell skincare products online.", i18nLabelKey: "website.ecommerce.label", i18nDescKey: "website.ecommerce.description" },
  { label: "Patient Portal", href: "/dermatology-patient-portal", icon: Users, description: "Seamless patient experience.", i18nLabelKey: "website.patientPortal.label", i18nDescKey: "website.patientPortal.description" },
  { label: "Before & After Gallery", href: "/dermatology-before-after-gallery", icon: ImageIcon, description: "Showcase results beautifully.", i18nLabelKey: "website.beforeAfter.label", i18nDescKey: "website.beforeAfter.description" },
];

export const marketingServices: NavItem[] = [
  { label: "Dermatology SEO", href: "/dermatology-seo-services", icon: Search, description: "Rank for high-intent searches.", i18nLabelKey: "marketing.seo.label", i18nDescKey: "marketing.seo.description" },
  { label: "Local SEO", href: "/dermatology-seo-services", icon: MapPinned, description: "Dominate your service area.", i18nLabelKey: "marketing.localSeo.label", i18nDescKey: "marketing.localSeo.description" },
  { label: "Practice Growth", href: "/dermatology-practice-growth", icon: TrendingUp, description: "Strategy for sustainable growth.", i18nLabelKey: "marketing.growth.label", i18nDescKey: "marketing.growth.description" },
  { label: "Google Ads / PPC", href: "/dermatology-google-ads-ppc", icon: MousePointerClick, description: "Predictable patient acquisition.", i18nLabelKey: "marketing.googleAds.label", i18nDescKey: "marketing.googleAds.description" },
  { label: "Social Media", href: "/dermatology-social-media-services", icon: Share2, description: "Build brand authority.", i18nLabelKey: "marketing.socialMedia.label", i18nDescKey: "marketing.socialMedia.description" },
  { label: "Reputation Management", href: "/dermatology-reputation-management", icon: Star, description: "5-star review systems.", i18nLabelKey: "marketing.reputation.label", i18nDescKey: "marketing.reputation.description" },
  { label: "Email Marketing", href: "/dermatology-email-marketing", icon: Mail, description: "Nurture and re-engage patients.", i18nLabelKey: "marketing.email.label", i18nDescKey: "marketing.email.description" },
  { label: "CRO", href: "/dermatology-conversion-rate-optimization", icon: Target, description: "Turn visitors into bookings.", i18nLabelKey: "marketing.cro.label", i18nDescKey: "marketing.cro.description" },
];

export const addOnCategories: NavItem[] = [
  { label: "Care & Maintenance", href: "/dermatology-add-on-services", icon: Wrench, description: "Ongoing site care, updates, and monitoring.", i18nLabelKey: "addons.care.label", i18nDescKey: "addons.care.description" },
  { label: "Hosting & Compliance", href: "/dermatology-add-on-services", icon: ShieldCheck, description: "Fast, secure, HIPAA-aware hosting.", i18nLabelKey: "addons.hosting.label", i18nDescKey: "addons.hosting.description" },
  { label: "Content & Conversion", href: "/dermatology-add-on-services", icon: FileText, description: "Copy, landing pages, and CRO experiments.", i18nLabelKey: "addons.content.label", i18nDescKey: "addons.content.description" },
  { label: "SEO & Analytics", href: "/dermatology-add-on-services", icon: LineChart, description: "Tracking, dashboards, and search visibility.", i18nLabelKey: "addons.analytics.label", i18nDescKey: "addons.analytics.description" },
  { label: "Integrations", href: "/dermatology-add-on-services", icon: Plug, description: "EHR, booking, CRM, and marketing tools.", i18nLabelKey: "addons.integrations.label", i18nDescKey: "addons.integrations.description" },
  { label: "Growth Marketing", href: "/dermatology-add-on-services", icon: Rocket, description: "Ads, email, and reputation programs.", i18nLabelKey: "addons.growth.label", i18nDescKey: "addons.growth.description" },
];

export const insightsItems: NavItem[] = [
  { label: "Our Process", href: "/our-process", icon: Workflow, description: "How we deliver every project.", i18nLabelKey: "insights.process.label", i18nDescKey: "insights.process.description" },
  { label: "About Us", href: "/about", icon: Info, description: "Who we are and what we believe.", i18nLabelKey: "insights.about.label", i18nDescKey: "insights.about.description" },
  { label: "Case Studies", href: "/case-studies", icon: BookOpen, description: "Real results from real practices.", i18nLabelKey: "insights.caseStudies.label", i18nDescKey: "insights.caseStudies.description" },
  { label: "Blog", href: "/blog", icon: Newspaper, description: "Insights for growing practices.", i18nLabelKey: "insights.blog.label", i18nDescKey: "insights.blog.description" },
  { label: "FAQ", href: "/faq", icon: HelpCircle, description: "Answers to common questions.", i18nLabelKey: "insights.faq.label", i18nDescKey: "insights.faq.description" },
  { label: "Free Website Audit", href: "/contact", icon: FileCheck, description: "Personalized recs in 24 hours.", i18nLabelKey: "insights.audit.label", i18nDescKey: "insights.audit.description" },
];

export const mainNav = [
  { label: "Home", i18nKey: "nav.home", href: "/" },
  { label: "Services", i18nKey: "nav.services", href: "/services", mega: "services" as const },
  { label: "Portfolio", i18nKey: "nav.portfolio", href: "/#examples" },
  { label: "Pricing", i18nKey: "nav.pricing", href: "/plan-packages-and-costs" },
  { label: "Insights", i18nKey: "nav.insights", href: "/blog", mega: "insights" as const },
  { label: "Contact", i18nKey: "nav.contact", href: "/contact" },
];

// Unused import guards (kept to avoid removing icons that may be needed later)
void ShoppingCart;
void Sparkles;
