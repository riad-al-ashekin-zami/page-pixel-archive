import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("keyword brief sitemap location", () => {
  it("restores sitemap.xml and permanently redirects the previous location", async () => {
    const response = await fetch("http://localhost:8080/sitemap_index.xml", { redirect: "manual" });
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("/sitemap.xml");
  });
  it("allows crawling and declares the active custom-domain sitemap", () => {
    const robots = readFileSync("public/robots.txt", "utf8");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: https://dermatologywebsitedesign.com/sitemap.xml");
    expect(robots).not.toContain("Disallow: /");
    expect(robots).not.toContain("sitemap_index.xml");
  });
});
