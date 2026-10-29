import { LANGUAGE_CODES } from "@/i18n/languages";

/** Public content inventory. About, legal, private, thank-you and redirects are excluded. */
export const INDEXABLE_LOGICAL_PATHS: readonly string[] = [
  "/",
  "/blog",
  "/case-studies",
  "/contact",
  "/dermatology-add-on-services",
  "/dermatology-before-after-gallery",
  "/dermatology-conversion-rate-optimization",
  "/dermatology-ecommerce-website-design",
  "/dermatology-email-marketing",
  "/dermatology-google-ads-ppc",
  "/dermatology-patient-portal",
  "/dermatology-practice-growth",
  "/dermatology-reputation-management",
  "/dermatology-seo-services",
  "/dermatology-social-media-services",
  "/dermatology-website-checklists",
  "/dermatology-website-management-services",
  "/dermatology-website-migration",
  "/dermatology-website-redesign",
  "/dermatology-website-support-services",
  "/faq",
  "/multi-location-dermatology-website-design",
  "/our-process",
  "/plan-packages-and-costs",
  "/services",
  "/blog/dermatology-seo-playbook-2026",
  "/blog/website-redesign-checklist",
  "/blog/google-ads-derm-cost-per-lead",
  "/blog/5-star-review-flywheel",
  "/blog/hipaa-website-mistakes",
  "/blog/patient-portal-conversion",
  "/blog/local-seo-multi-location",
  "/blog/hero-that-converts",
  "/blog/reactivation-email-sequence",
  "/blog/dermatology-marketing-strategies"
];

/** Sole localized URL inventory used by route robots and the sitemap. */
export const INDEXABLE_PATHS: readonly string[] = LANGUAGE_CODES.flatMap((lang) =>
  INDEXABLE_LOGICAL_PATHS.map((path) => lang === "en" ? path : `/${lang}${path === "/" ? "" : path}`),
);
const INDEXABLE_SET = new Set(INDEXABLE_PATHS);
export const INDEX_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const NOINDEX_ROBOTS = "noindex, follow";

export function normalizePath(path: string): string {
  const clean = path.split(/[?#]/)[0];
  return clean === "" || clean === "/" ? "/" : clean.replace(/\/+$/, "");
}
export function isIndexableUrl(fullPath: string): boolean {
  return INDEXABLE_SET.has(normalizePath(fullPath));
}
export function robotsContent(rawLang: string | undefined, logicalPath: string): string {
  const prefix = rawLang && rawLang !== "en" ? `/${rawLang}` : "";
  const clean = logicalPath === "/" ? "" : logicalPath;
  return isIndexableUrl(`${prefix}${clean}` || "/") ? INDEX_ROBOTS : NOINDEX_ROBOTS;
}
