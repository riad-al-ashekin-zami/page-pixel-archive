/**
 * Chatbot content sync — server-only.
 *
 * Crawls the site's own pages, extracts headings + <section id> anchors,
 * and keeps a small in-memory index the chat route injects into the system
 * prompt so the assistant can cite exact page sections.
 *
 * Runs opportunistically (stale-while-serve, TTL 6h) and can be triggered
 * on demand by /api/public/sync-knowledge (for cron/webhooks).
 */

export type SectionRef = { id: string; title: string };
export type PageIndexEntry = {
  route: string;
  title: string;
  description: string;
  sections: SectionRef[];
};

// Canonical set of routes we want the chatbot to be able to cite.
// Keep in sync with CHATBOT_SYSTEM_PROMPT's site map.
const ROUTES: string[] = [
  "/",
  "/about",
  "/our-process",
  "/dermatology-websites-portfolio",
  "/case-studies",
  "/blog",
  "/faq",
  "/plan-packages-and-costs",
  "/contact",
  "/contact",
  "/contact",
  "/dermatology-website-design",
  "/dermatology-website-redesign",
  "/dermatology-website-migration",
  "/dermatology-website-maintenance-services",
  "/dermatology-website-management-services",
  "/dermatology-website-support-services",
  "/multi-location-dermatology-website-design",
  "/dermatology-ecommerce-website-design",
  "/dermatology-patient-portal",
  "/dermatology-before-after-gallery",
  "/dermatology-add-on-services",
  "/dermatology-website-checklists",
  "/dermatology-seo-services",
  "/dermatology-local-seo-services",
  "/dermatology-practice-growth",
  "/dermatology-google-ads-ppc",
  "/dermatology-social-media-services",
  "/dermatology-email-marketing",
  "/dermatology-reputation-management",
  "/dermatology-conversion-rate-optimization",
];

const TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

type CacheState = {
  index: PageIndexEntry[];
  lastSyncedAt: number;
  inFlight: Promise<PageIndexEntry[]> | null;
};

const cache: CacheState = {
  index: [],
  lastSyncedAt: 0,
  inFlight: null,
};

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMeta(html: string, name: string): string {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']+)["']`,
    "i",
  );
  return html.match(re)?.[1] ?? "";
}

function extractTitle(html: string): string {
  return stripTags(html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? "");
}

function extractSections(html: string): SectionRef[] {
  const results: SectionRef[] = [];
  const seen = new Set<string>();

  // Any element with id="..." followed (soon after) by a heading — captures
  // <section id="..."> ... <h2>Title</h2> patterns used across the site.
  const idBlock = /id=["']([a-z0-9][a-z0-9-]{1,60})["'][^>]*>([\s\S]{0,600}?)<\/?(?:section|div|h[1-6])/gi;
  let m: RegExpExecArray | null;
  while ((m = idBlock.exec(html)) !== null) {
    const id = m[1];
    if (seen.has(id)) continue;
    const chunk = m[2];
    const heading =
      chunk.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i)?.[1] ??
      chunk.match(/>([^<]{4,80})</)?.[1] ??
      "";
    const title = stripTags(heading);
    if (title && title.length <= 90) {
      results.push({ id, title });
      seen.add(id);
    }
  }

  return results.slice(0, 12);
}

async function fetchPage(origin: string, route: string): Promise<PageIndexEntry | null> {
  try {
    const res = await fetch(new URL(route, origin).toString(), {
      headers: { "user-agent": "DWD-Chatbot-Sync/1.0" },
    });
    if (!res.ok) return null;
    const html = await res.text();
    return {
      route,
      title: extractTitle(html) || route,
      description:
        extractMeta(html, "description") || extractMeta(html, "og:description") || "",
      sections: extractSections(html),
    };
  } catch {
    return null;
  }
}

async function runSync(origin: string): Promise<PageIndexEntry[]> {
  const results = await Promise.all(ROUTES.map((r) => fetchPage(origin, r)));
  const index = results.filter((x): x is PageIndexEntry => x !== null);
  cache.index = index;
  cache.lastSyncedAt = Date.now();
  return index;
}

/** Ensures the index is fresh. Serves stale data while a background sync runs. */
export function ensureContentIndex(origin: string): PageIndexEntry[] {
  const age = Date.now() - cache.lastSyncedAt;
  const stale = age > TTL_MS || cache.index.length === 0;
  if (stale && !cache.inFlight) {
    cache.inFlight = runSync(origin).finally(() => {
      cache.inFlight = null;
    });
  }
  return cache.index;
}

/** Force a sync (used by the cron/webhook endpoint). */
export async function forceContentSync(origin: string) {
  if (cache.inFlight) return cache.inFlight;
  cache.inFlight = runSync(origin).finally(() => {
    cache.inFlight = null;
  });
  return cache.inFlight;
}

export function getSyncStatus() {
  return {
    lastSyncedAt: cache.lastSyncedAt,
    pageCount: cache.index.length,
    ttlMs: TTL_MS,
  };
}

/** Compact human-readable snippet the model gets in the system prompt. */
export function renderIndexForPrompt(index: PageIndexEntry[]): string {
  if (!index.length) return "";
  const lines: string[] = ["## Live content index (use these exact links for citations)"];
  for (const p of index) {
    const desc = p.description ? ` — ${p.description.slice(0, 140)}` : "";
    lines.push(`- [${p.title}](${p.route})${desc}`);
    for (const s of p.sections) {
      lines.push(`  - [${s.title}](${p.route}#${s.id})`);
    }
  }
  return lines.join("\n");
}
