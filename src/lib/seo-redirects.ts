import { URL_LANGUAGE_CODES } from "@/i18n/languages";

/** Logical destinations are shared by server redirects and localized navigation. */
export const CONSOLIDATED_PATHS: Readonly<Record<string, string>> = {
  "/dermatology-website-design": "/",
  "/dermatology-local-seo-services": "/dermatology-seo-services",
  "/dermatology-website-maintenance-services": "/dermatology-website-management-services",
};

export function redirectDestination(pathname: string): string | undefined {
  const clean = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const first = clean.split("/")[1];
  const localized = URL_LANGUAGE_CODES.some((lang) => lang === first);
  const prefix = localized ? `/${first}` : "";
  const logical = localized ? clean.slice(prefix.length) || "/" : clean;
  const destination = CONSOLIDATED_PATHS[logical];
  if (destination) return `${prefix}${destination === "/" ? "" : destination}` || "/";
  if (clean !== pathname) return clean;
  if (clean === "/sitemap_index.xml") return "/sitemap.xml";
  return undefined;
}