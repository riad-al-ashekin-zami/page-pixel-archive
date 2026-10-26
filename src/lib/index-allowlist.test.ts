import { describe, expect, it } from "vitest";
import { INDEXABLE_PATHS, robotsContent } from "./index-allowlist";

describe("owner-approved indexing rules", () => {
  it("allows English About to be indexed", () => {
    expect(INDEXABLE_PATHS).toContain("/about");
    expect(robotsContent(undefined, "/about")).toBe("index,follow");
  });

  it("keeps unapproved translated About pages noindexed", () => {
    expect(robotsContent("es", "/about")).toBe("noindex,follow");
    expect(robotsContent("fi", "/about")).toBe("noindex,follow");
  });

  it("contains exactly 13 distinct approved URLs", () => {
    expect(INDEXABLE_PATHS).toHaveLength(13);
    expect(new Set(INDEXABLE_PATHS).size).toBe(13);
  });

  it("serves exactly the shared allowlist in the sitemap without invented lastmod", async () => {
    // Integration check against the running preview, not a second sitemap list.
    const response = await fetch("http://localhost:8080/sitemap_index.xml");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/xml");
    const xml = await response.text();
    const locations = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
    expect(locations).toEqual(INDEXABLE_PATHS.map((path) => `https://dermatologywebsitedesign.com${path}`));
    expect(xml).not.toContain("<lastmod>");
  });
});