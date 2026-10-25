import { readFileSync, existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("owner-selected sitemap location", () => {
  it("publishes sitemap_index.xml and removes the former sitemap.xml route", () => {
    const route = readFileSync("src/routes/sitemap_index[.]xml.ts", "utf8");
    expect(route).toContain('createFileRoute("/sitemap_index.xml")');
    expect(existsSync("src/routes/sitemap[.]xml.ts")).toBe(false);
  });

  it("points crawlers to the new custom-domain sitemap", () => {
    const robots = readFileSync("public/robots.txt", "utf8");
    expect(robots).toContain("Sitemap: https://dermatologywebsitedesign.com/sitemap_index.xml");
    expect(robots).not.toContain("https://dermatologywebsitedesign.com/sitemap.xml");
  });
});