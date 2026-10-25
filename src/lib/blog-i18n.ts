import type { Post } from "@/lib/blog-data";
import { CATEGORIES, POSTS, type Category } from "@/lib/blog-data";
import type { LanguageCode } from "@/i18n/languages";
import { formatLocalizedDate, normalizeDeep } from "@/lib/text-normalize";

const CATEGORY_LABELS: Record<LanguageCode, Record<Category, string>> = {
  en: {
    All: "All",
    SEO: "SEO",
    "Website Design": "Website Design",
    "Paid Ads": "Paid Ads",
    "Patient Experience": "Patient Experience",
    Reputation: "Reputation",
    "HIPAA & Compliance": "HIPAA & Compliance",
  },
  ar: {
    All: "الكل",
    SEO: "تحسين محركات البحث",
    "Website Design": "تصميم المواقع",
    "Paid Ads": "الإعلانات المدفوعة",
    "Patient Experience": "تجربة المريض",
    Reputation: "السمعة الرقمية",
    "HIPAA & Compliance": "الامتثال والخصوصية",
  },
  cs: {
    All: "Vše",
    SEO: "SEO",
    "Website Design": "Webdesign",
    "Paid Ads": "Placené reklamy",
    "Patient Experience": "Pacientská zkušenost",
    Reputation: "Reputace",
    "HIPAA & Compliance": "HIPAA a soulad",
  },
  de: {
    All: "Alle",
    SEO: "SEO",
    "Website Design": "Webdesign",
    "Paid Ads": "Bezahlte Anzeigen",
    "Patient Experience": "Patientenerlebnis",
    Reputation: "Reputation",
    "HIPAA & Compliance": "HIPAA & Compliance",
  },
  es: {
    All: "Todo",
    SEO: "SEO",
    "Website Design": "Diseño web",
    "Paid Ads": "Anuncios pagados",
    "Patient Experience": "Experiencia del paciente",
    Reputation: "Reputación",
    "HIPAA & Compliance": "HIPAA y cumplimiento",
  },
  fi: {
    All: "Kaikki",
    SEO: "SEO",
    "Website Design": "Verkkosivusuunnittelu",
    "Paid Ads": "Maksetut mainokset",
    "Patient Experience": "Potilaskokemus",
    Reputation: "Maine",
    "HIPAA & Compliance": "HIPAA ja vaatimustenmukaisuus",
  },
  fr: {
    All: "Tout",
    SEO: "SEO",
    "Website Design": "Conception web",
    "Paid Ads": "Publicités payantes",
    "Patient Experience": "Expérience patient",
    Reputation: "Réputation",
    "HIPAA & Compliance": "HIPAA et conformité",
  },
  it: {
    All: "Tutto",
    SEO: "SEO",
    "Website Design": "Design web",
    "Paid Ads": "Annunci a pagamento",
    "Patient Experience": "Esperienza del paziente",
    Reputation: "Reputazione",
    "HIPAA & Compliance": "HIPAA e conformità",
  },
  no: {
    All: "Alle",
    SEO: "SEO",
    "Website Design": "Nettsidedesign",
    "Paid Ads": "Betalte annonser",
    "Patient Experience": "Pasientopplevelse",
    Reputation: "Omdømme",
    "HIPAA & Compliance": "HIPAA og etterlevelse",
  },
  pl: {
    All: "Wszystkie",
    SEO: "SEO",
    "Website Design": "Projektowanie stron",
    "Paid Ads": "Płatne reklamy",
    "Patient Experience": "Doświadczenie pacjenta",
    Reputation: "Reputacja",
    "HIPAA & Compliance": "HIPAA i zgodność",
  },
  pt: {
    All: "Tudo",
    SEO: "SEO",
    "Website Design": "Design de sites",
    "Paid Ads": "Anúncios pagos",
    "Patient Experience": "Experiência do paciente",
    Reputation: "Reputação",
    "HIPAA & Compliance": "HIPAA e conformidade",
  },
  sv: {
    All: "Alla",
    SEO: "SEO",
    "Website Design": "Webbdesign",
    "Paid Ads": "Betalda annonser",
    "Patient Experience": "Patientupplevelse",
    Reputation: "Rykte",
    "HIPAA & Compliance": "HIPAA och efterlevnad",
  },
};

export function blogCategoryLabel(category: Category, lang: LanguageCode) {
  return CATEGORY_LABELS[lang]?.[category] ?? CATEGORY_LABELS.en[category] ?? category;
}

export const BLOG_CATEGORIES = CATEGORIES;

/**
 * Eagerly bundle every per-language blog translation. The glob key is the
 * absolute path so we derive `<lang>` and `<slug>` from it.
 */
const TRANSLATION_MODULES = import.meta.glob("/src/content/blog/*/*.json", {
  eager: true,
  import: "default",
}) as Record<string, Partial<Post>>;

const TRANSLATIONS: Record<string, Record<string, Partial<Post>>> = {};
for (const [path, data] of Object.entries(TRANSLATION_MODULES)) {
  const m = path.match(/\/src\/content\/blog\/([^/]+)\/([^/]+)\.json$/);
  if (!m) continue;
  const [, lang, slug] = m;
  (TRANSLATIONS[lang] ??= {})[slug] = data;
}

/** Return the localized version of a post, falling back to English fields. */
export function localizePost(lang: LanguageCode, post: Post): Post {
  if (lang === "en") return normalizeDeep(post, lang);
  const tr = TRANSLATIONS[lang]?.[post.slug];
  if (!tr) return normalizeDeep({ ...post, date: formatLocalizedDate(post.dateISO, lang) }, lang);
  return normalizeDeep({
    ...post,
    ...tr,
    // Keep image, tone, dates, author metadata from the base English post.
    image: post.image,
    tone: post.tone,
    date: formatLocalizedDate(post.dateISO, lang),
    dateISO: post.dateISO,
    author: post.author,
    authorRole: post.authorRole,
    initials: post.initials,
    readTime: post.readTime,
    category: post.category,
    featured: post.featured,
    slug: post.slug,
  }, lang);
}

export function localizedPosts(lang: LanguageCode): Post[] {
  return POSTS.map((p) => localizePost(lang, p));
}

export function findLocalizedPost(lang: LanguageCode, slug: string): Post | undefined {
  const base = POSTS.find((p) => p.slug === slug);
  return base ? localizePost(lang, base) : undefined;
}

export function relatedLocalizedPosts(
  lang: LanguageCode,
  slug: string,
  category: Post["category"],
): Post[] {
  return POSTS.filter((p) => p.slug !== slug && p.category === category)
    .slice(0, 3)
    .map((p) => localizePost(lang, p));
}
