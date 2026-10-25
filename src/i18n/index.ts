import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { normalizeDeep, normalizeLocalizedString } from "@/lib/text-normalize";
import { DEFAULT_LANGUAGE, LANGUAGE_CODES, LANGUAGES, type LanguageCode } from "./languages";

// Namespaces per language, eagerly loaded via Vite glob import so adding a
// language or namespace only requires dropping the JSON file in place.
const nsModules = import.meta.glob("./locales/*/*.json", { eager: true }) as Record<
  string,
  { default: Record<string, any> }
>;

const resources: Record<string, Record<string, Record<string, any>>> = {};
for (const [path, mod] of Object.entries(nsModules)) {
  // path shape: ./locales/<lang>/<ns>.json
  const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!match) continue;
  const [, lang, ns] = match;
  const nsKey = ns === "ui" ? "translation" : ns;
  resources[lang] = resources[lang] ?? {};
  resources[lang][nsKey] = normalizeDeep(mod.default, lang);
}

const NAMESPACES = Array.from(
  new Set(Object.values(resources).flatMap((r) => Object.keys(r))),
);

if (!i18n.isInitialized) {
  const textNormalizer = {
    type: "postProcessor" as const,
    name: "dwdTextNormalizer",
    process(value: unknown, _key: unknown, options: Record<string, unknown>) {
      if (typeof value !== "string") return value;
      const lngOption = options.lng;
      const lang = typeof lngOption === "string" ? lngOption : i18n.resolvedLanguage || i18n.language;
      return normalizeLocalizedString(value, lang);
    },
  };

  const chain = i18n.use(textNormalizer).use(initReactI18next);

  chain.init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    lng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGE_CODES,
    load: "languageOnly",
    nonExplicitSupportedLngs: true,
    ns: NAMESPACES,
    defaultNS: "translation",
    fallbackNS: "translation",
    interpolation: { escapeValue: false },
    postProcess: ["dwdTextNormalizer"],
    parseMissingKeyHandler: (key) => {
      if (key === "common.or" || key === "translation:common.or") {
        const activeLang = i18n.resolvedLanguage || i18n.language || DEFAULT_LANGUAGE;
        return resources[activeLang]?.translation?.common?.or ?? resources[DEFAULT_LANGUAGE]?.translation?.common?.or ?? "or";
      }
      return key;
    },
    react: { useSuspense: false },
  });
}

export function getLanguageMeta(code: string) {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

export function applyHtmlLangAndDir(code: string) {
  if (typeof document === "undefined") return;
  const meta = getLanguageMeta(code);
  document.documentElement.lang = meta.code;
  document.documentElement.dir = meta.dir;
}

/**
 * Get translations for a specific language + namespace synchronously.
 * Use in route head() where the React i18next runtime isn't available.
 */
export function getStaticTranslation(lang: string | undefined, namespace: string): Record<string, any> {
  const bundle = (lang && resources[lang]) || resources[DEFAULT_LANGUAGE] || {};
  const nsKey = namespace === "ui" ? "translation" : namespace;
  return normalizeDeep(bundle[nsKey] ?? resources[DEFAULT_LANGUAGE]?.[nsKey] ?? {}, lang || DEFAULT_LANGUAGE);
}

export type { LanguageCode };
export default i18n;

