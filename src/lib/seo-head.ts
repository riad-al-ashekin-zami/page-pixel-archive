import { buildHreflangLinks, localizedUrl, resolveRouteLanguage } from "@/lib/i18n-routing";
import { robotsContent } from "@/lib/index-allowlist";

type HeadValue = {
  meta?: Array<Record<string, any>>;
  links?: Array<Record<string, any>>;
  scripts?: Array<Record<string, any>>;
};

/** Normalize the existing per-route head; this is not a second head mechanism. */
export function finalizeSeoHead(head: HeadValue, rawLang: string | undefined, path: string) {
  const canonical = localizedUrl(resolveRouteLanguage(rawLang), path);
  const meta = head.meta ?? [];
  const title = meta.find((tag) => typeof tag.title === "string")?.title ?? "DWD";
  const description = meta.find((tag) => tag.name === "description")?.content ?? "DWD";
  const replaced = new Set(["description", "robots", "twitter:title", "twitter:description", "twitter:card"]);
  const properties = new Set(["og:title", "og:description", "og:url", "og:type"]);
  return {
    ...head,
    meta: [
      ...meta.filter((tag) => {
        if (tag.title || replaced.has(tag.name) || properties.has(tag.property)) return false;
        if (tag.name === "keywords") return false;
        // Bundled images resolve relatively; do not publish invalid social-image URLs.
        if (tag.property === "og:image" || tag.name === "twitter:image") return false;
        return true;
      }),
      { title },
      { name: "description", content: description },
      { name: "robots", content: robotsContent(rawLang, path) },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: path.startsWith("/blog/") ? "article" : "website" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      ...(head.links ?? []).filter((link) => link.rel !== "canonical" && !(link.rel === "alternate" && link.hrefLang)),
      { rel: "canonical", href: canonical },
      ...buildHreflangLinks(path, rawLang),
    ],
  };
}