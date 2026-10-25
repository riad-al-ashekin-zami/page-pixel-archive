import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { INDEXABLE_PATHS, normalizePath } from "@/lib/index-allowlist";
import { URL_LANGUAGE_CODES, DEFAULT_LANGUAGE } from "@/i18n/languages";

const BASE_URL = "https://dermatologywebsitedesign.com";

/**
 * sitemap.xml lists ONLY the allowlisted (indexable) URLs — see
 * src/lib/index-allowlist.ts. Noindexed pages stay out of the sitemap but
 * remain crawlable (robots.txt allows everything) so Google can read their
 * noindex tag.
 */

/** Strip a language prefix to get the English-canonical logical path. */
function logicalPath(fullPath: string): string {
  for (const code of URL_LANGUAGE_CODES) {
    if (fullPath === `/${code}`) return "/";
    if (fullPath.startsWith(`/${code}/`)) return fullPath.slice(code.length + 1);
  }
  return fullPath;
}

function renderUrlEntry(fullPath: string, alternates: string[], hasIndexableEn: boolean): string {
  const lines = [
    `  <url>`,
    `    <loc>${BASE_URL}${fullPath === "/" ? "/" : fullPath}</loc>`,
    ...alternates.map(
      (alt) => `    <xhtml:link rel="alternate" hreflang="${hreflangCode(alt)}" href="${BASE_URL}${alt}" />`,
    ),
  ];
  if (hasIndexableEn) {
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${logicalPath(fullPath)}" />`,
    );
  }
  lines.push(`  </url>`);
  return lines.join("\n");
}

function hreflangCode(fullPath: string): string {
  for (const code of URL_LANGUAGE_CODES) {
    if (fullPath === `/${code}` || fullPath.startsWith(`/${code}/`)) return code;
  }
  return DEFAULT_LANGUAGE;
}

export const Route = createFileRoute("/sitemap_index.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = INDEXABLE_PATHS.map((rawPath) => {
          const fullPath = normalizePath(rawPath);
          const logical = logicalPath(fullPath);
          // hreflang alternates = the other allowlisted URLs of the same page
          const alternates = INDEXABLE_PATHS.map(normalizePath).filter(
            (p) => logicalPath(p) === logical,
          );
          const enIndexable = alternates.some((p) => p === logical);
          return renderUrlEntry(fullPath, alternates, enIndexable);
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
