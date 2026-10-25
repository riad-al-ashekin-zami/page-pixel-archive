/**
 * SEO INDEXING ALLOWLIST — the single source of truth for what Google may index.
 *
 * ONLY the 11 URLs below are indexable. Every other page of the site — all other
 * English pages, all other language versions, the blog index, legal pages, 404 and
 * thank-you pages — serves `<meta name="robots" content="noindex,follow">`.
 *
 * OWNER: to make a page indexable, add its full localized path here (no trailing
 * slash, except the English homepage which is exactly "/"). To de-index a page,
 * remove its line. Nothing else needs to change: robots meta, hreflang alternates
 * and sitemap.xml all read from this list.
 *
 * Paths are normalized: no trailing slash (except "/"), no query string.
 */
export const INDEXABLE_PATHS: readonly string[] = [
  // English
  "/",
  "/contact",
  "/blog/dermatology-marketing-strategies",
  "/dermatology-seo-services",
  "/dermatology-social-media-services",
  "/dermatology-google-ads-ppc",
  "/dermatology-website-management-services",
  // Spanish
  "/es/blog/dermatology-marketing-strategies",
  "/es/dermatology-seo-services",
  "/es/dermatology-social-media-services",
  "/es/dermatology-website-checklists",
  // Finnish
  "/fi/dermatology-website-migration",
];

const INDEXABLE_SET = new Set(INDEXABLE_PATHS);

/** Normalize a URL path: strip query/hash, drop trailing slash (except "/"). */
export function normalizePath(path: string): string {
  const noQuery = path.split(/[?#]/)[0];
  if (noQuery === "" || noQuery === "/") return "/";
  return noQuery.endsWith("/") ? noQuery.slice(0, -1) : noQuery;
}

/** True when the full localized path (e.g. "/es/dermatology-seo-services") is allowlisted. */
export function isIndexableUrl(fullPath: string): boolean {
  return INDEXABLE_SET.has(normalizePath(fullPath));
}

/**
 * Robots meta content for a route. `rawLang` is the raw URL lang param
 * (undefined = English root); `logicalPath` is the English-canonical path
 * (e.g. "/dermatology-seo-services", "/blog/my-post"). Defaults to noindex:
 * a page is only indexable once its full localized URL is in INDEXABLE_PATHS.
 */
export function robotsContent(
  rawLang: string | undefined,
  logicalPath: string,
): "index,follow" | "noindex,follow" {
  const prefix = rawLang && rawLang !== "en" ? `/${rawLang}` : "";
  const clean = logicalPath === "/" ? "" : logicalPath;
  return isIndexableUrl(`${prefix}${clean}` || "/") ? "index,follow" : "noindex,follow";
}
