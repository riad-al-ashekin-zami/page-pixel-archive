import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { POSTS } from "@/lib/blog-data";
import { LANGUAGE_CODES, DEFAULT_LANGUAGE } from "@/i18n/languages";
import { localizedUrl } from "@/lib/i18n-routing";

const BASE_URL = "https://dermatologywebsitedesign.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  /** Whether this route is fully localized across all languages. During phased rollout,
   *  only completed routes emit hreflang alternates to avoid indexing 404 URLs. */
  localized?: boolean;
}

const STATIC_ROUTES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", localized: true },
  { path: "/about", changefreq: "monthly", priority: "0.7", localized: true },
  { path: "/services", changefreq: "monthly", priority: "0.9", localized: true },
  { path: "/our-process", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/plan-packages-and-costs", changefreq: "monthly", priority: "0.8" , localized: true },
  { path: "/contact", changefreq: "monthly", priority: "0.6" , localized: true },
  { path: "/get-a-free-quote", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/free-dermatologist-website-audit", changefreq: "monthly", priority: "0.8" , localized: true },
  { path: "/case-studies", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/dermatology-websites-portfolio", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/dermatology-before-after-gallery", changefreq: "monthly", priority: "0.6" , localized: true },
  { path: "/faq", changefreq: "monthly", priority: "0.6" , localized: true },
  { path: "/blog", changefreq: "weekly", priority: "0.8" , localized: true },
  { path: "/dermatology-website-design", changefreq: "monthly", priority: "0.9" , localized: true },
  { path: "/dermatology-website-redesign", changefreq: "monthly", priority: "0.8" , localized: true },
  { path: "/dermatology-website-migration", changefreq: "monthly", priority: "0.6" , localized: true },
  { path: "/dermatology-website-maintenance-services", changefreq: "monthly", priority: "0.6" , localized: true },
  { path: "/dermatology-website-management-services", changefreq: "monthly", priority: "0.6" , localized: true },
  { path: "/dermatology-website-support-services", changefreq: "monthly", priority: "0.6" , localized: true },
  { path: "/dermatology-website-checklists", changefreq: "monthly", priority: "0.5" , localized: true },
  { path: "/multi-location-dermatology-website-design", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/dermatology-ecommerce-website-design", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/dermatology-patient-portal", changefreq: "monthly", priority: "0.6" , localized: true },
  { path: "/dermatology-conversion-rate-optimization", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/dermatology-add-on-services", changefreq: "monthly", priority: "0.5" , localized: true },
  { path: "/dermatology-practice-growth", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/dermatology-seo-services", changefreq: "monthly", priority: "0.9" , localized: true },
  { path: "/dermatology-local-seo-services", changefreq: "monthly", priority: "0.8" , localized: true },
  { path: "/dermatology-google-ads-ppc", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/dermatology-social-media-services", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/dermatology-email-marketing", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/dermatology-reputation-management", changefreq: "monthly", priority: "0.7" , localized: true },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.2" , localized: true },
  { path: "/terms-of-service", changefreq: "yearly", priority: "0.2" , localized: true },
  { path: "/cookie-policy", changefreq: "yearly", priority: "0.2" , localized: true },
  { path: "/refund-policy", changefreq: "yearly", priority: "0.2" , localized: true },
  { path: "/service-agreement", changefreq: "yearly", priority: "0.2" , localized: true },
];

function renderUrlEntry(loc: string, e: SitemapEntry, localized: boolean): string {
  const alternates = localized
    ? [
        ...LANGUAGE_CODES.map(
          (code) =>
            `    <xhtml:link rel="alternate" hreflang="${code}" href="${localizedUrl(code, e.path)}" />`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(
          DEFAULT_LANGUAGE,
          e.path,
        )}" />`,
      ]
    : [];
  return [
    `  <url>`,
    `    <loc>${loc}</loc>`,
    ...alternates,
    e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
    e.priority ? `    <priority>${e.priority}</priority>` : null,
    `  </url>`,
  ]
    .filter(Boolean)
    .join("\n");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          ...STATIC_ROUTES,
          ...POSTS.map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
            localized: true,
          })),
        ];

        const urls: string[] = [];
        for (const e of entries) {
          const isLocalized = e.localized === true;
          // English canonical URL first
          urls.push(renderUrlEntry(localizedUrl(DEFAULT_LANGUAGE, e.path), e, isLocalized));
          // One <url> per non-English language for localized routes only
          if (isLocalized) {
            for (const code of LANGUAGE_CODES) {
              if (code === DEFAULT_LANGUAGE) continue;
              urls.push(renderUrlEntry(localizedUrl(code, e.path), e, true));
            }
          }
        }

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

