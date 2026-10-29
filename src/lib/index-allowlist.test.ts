import { describe, expect, it } from "vitest";
import { LANGUAGE_CODES } from "@/i18n/languages";
import { INDEXABLE_PATHS, INDEXABLE_LOGICAL_PATHS, INDEX_ROBOTS, NOINDEX_ROBOTS, robotsContent } from "./index-allowlist";
import { buildHreflangLinks, localizedPath } from "./i18n-routing";
import { redirectDestination, CONSOLIDATED_PATHS } from "./seo-redirects";

describe("keyword brief indexing and translation rules", () => {
  it.each(["/about", "/terms-of-service", "/privacy-policy", "/cookie-policy", "/service-agreement", "/refund-policy"])("noindexes %s in every language", (path) => {
    for (const lang of LANGUAGE_CODES) {
      expect(robotsContent(lang, path)).toBe("noindex, follow");
      expect(INDEXABLE_PATHS).not.toContain(localizedPath(lang, path));
    }
  });
  it.each(Object.keys(CONSOLIDATED_PATHS))("excludes redirect %s from indexing and hreflang", (path) => {
    for (const lang of LANGUAGE_CODES) {
      expect(robotsContent(lang, path)).toBe(NOINDEX_ROBOTS);
      expect(buildHreflangLinks(path, lang)).toEqual([]);
    }
  });
  it("includes each public content page exactly once per existing language", () => {
    expect(INDEXABLE_PATHS).toHaveLength(420);
    expect(new Set(INDEXABLE_PATHS).size).toBe(INDEXABLE_PATHS.length);
    expect(INDEXABLE_PATHS.length).toBe(INDEXABLE_LOGICAL_PATHS.length * LANGUAGE_CODES.length);
    for (const lang of LANGUAGE_CODES) {
      expect(robotsContent(lang, "/dermatology-seo-services")).toBe("index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      expect(robotsContent(lang, "/")).toBe(INDEX_ROBOTS);
    }
  });
  it("uses identical self-referencing hreflang sets without slash language homes", () => {
    const links = buildHreflangLinks("/", "es");
    for (const lang of LANGUAGE_CODES) {
      expect(buildHreflangLinks("/", lang)).toEqual(links);
      expect(links).toContainEqual({ rel: "alternate", hrefLang: lang, href: `https://dermatologywebsitedesign.com${localizedPath(lang, "/")}` });
    }
    expect(links).toContainEqual({ rel: "alternate", hrefLang: "x-default", href: "https://dermatologywebsitedesign.com/" });
    expect(localizedPath("fi", "/")).toBe("/fi");
  });
  it("noindexes unknown and private pages", () => {
    expect(robotsContent(undefined, "/not-a-page")).toBe("noindex, follow");
    expect(robotsContent(undefined, "/admin")).toBe("noindex, follow");
    expect(robotsContent(undefined, "/thank-you")).toBe("noindex, follow");
  });
  it("serves precisely the shared inventory and no invented lastmod", async () => {
    const response = await fetch("http://localhost:8080/sitemap.xml");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/xml");
    const xml = await response.text();
    const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
    expect(urls).toEqual(INDEXABLE_PATHS.map((path) => `https://dermatologywebsitedesign.com${path}`));
    expect(xml).not.toContain("<lastmod>");
  });
  it.each(LANGUAGE_CODES)("permanently redirects the merged pages in %s", async (lang) => {
    const prefix = lang === "en" ? "" : `/${lang}`;
    for (const [from, to] of Object.entries(CONSOLIDATED_PATHS)) {
      const response = await fetch(`http://localhost:8080${prefix}${from}?source=test`, { redirect: "manual" });
      expect(response.status).toBe(301);
      expect(response.headers.get("location")).toBe((`${prefix}${to === "/" ? "" : to}` || "/") + "?source=test");
    }
  });
  it("normalizes slash variants while retaining the English root", () => {
    expect(redirectDestination("/")).toBeUndefined();
    expect(redirectDestination("/fi/")).toBe("/fi");
    expect(redirectDestination("/no/dermatology-website-redesign/")).toBe("/no/dermatology-website-redesign");
    expect(redirectDestination("/sitemap_index.xml")).toBe("/sitemap.xml");
  });
});
