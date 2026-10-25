/**
 * i18n routing helpers.
 *
 * URL convention:
 *   - English is at the root:  /about, /services
 *   - All other languages are prefixed:  /es/about, /fr/services, /ar/about
 *
 * This module centralizes:
 *   - localizedPath(lang, path) — build a link href for any language
 *   - buildHreflangLinks(path) — emit <link rel="alternate" hreflang> tags for a route
 *   - useCurrentLang() — read the active URL language inside components
 */
import { useParams } from "@tanstack/react-router";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_CODES,
  URL_LANGUAGE_CODES,
  isValidUrlLang,
  resolveRouteLanguage,
  type LanguageCode,
} from "@/i18n/languages";

export const SITE_ORIGIN = "https://dermatologywebsitedesign.com";

/**
 * Build a URL path for a given language + logical path.
 * The `path` argument is the English-canonical path (e.g. "/", "/about", "/blog/foo").
 * English stays at root; other languages are prefixed.
 */
export function localizedPath(lang: LanguageCode, path: string): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANGUAGE) return clean === "" ? "/" : clean;
  // Non-English root: emit `/es` (no trailing slash) so the URL matches the TanStack route exactly.
  return `/${lang}${clean}`;
}

/**
 * Absolute URL variant (used in canonical, og:url, sitemap, hreflang).
 */
export function localizedUrl(lang: LanguageCode, path: string): string {
  return `${SITE_ORIGIN}${localizedPath(lang, path)}`;
}

/**
 * Return the <link> array of hreflang alternates for a route.
 *
 * SEO allowlist rules (see @/lib/index-allowlist):
 *   - A noindexed page emits NO hreflang tags at all.
 *   - An indexable page emits only alternates that are themselves indexable,
 *     plus a self-reference. `x-default` is emitted only when the English
 *     version of the page is indexable.
 *
 * `rawLang` is the route's raw lang param (undefined = English root).
 */
export function buildHreflangLinks(path: string, rawLang?: string) {
  const current = resolveRouteLanguage(rawLang);
  if (!isIndexableUrl(localizedPath(current, path))) return [];
  const alternates: { rel: "alternate"; hrefLang: string; href: string }[] = LANGUAGE_CODES.filter(
    (code) => isIndexableUrl(localizedPath(code, path)),
  ).map((code) => ({
    rel: "alternate",
    hrefLang: code,
    href: localizedUrl(code, path),
  }));
  if (isIndexableUrl(localizedPath(DEFAULT_LANGUAGE, path))) {
    alternates.push({
      rel: "alternate",
      hrefLang: "x-default",
      href: localizedUrl(DEFAULT_LANGUAGE, path),
    });
  }
  return alternates;
}

/**
 * Read the URL language from route params. Undefined param = English root.
 */
export function useCurrentLang(): LanguageCode {
  // strict:false lets this be called from any nested component regardless of route.
  const params = useParams({ strict: false }) as { lang?: string };
  return resolveRouteLanguage(params.lang);
}

export { isValidUrlLang, resolveRouteLanguage, URL_LANGUAGE_CODES };
export type { LanguageCode };
