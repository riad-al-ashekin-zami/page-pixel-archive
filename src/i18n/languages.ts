export type LanguageCode =
  | "en"
  | "fr"
  | "de"
  | "it"
  | "es"
  | "pt"
  | "sv"
  | "no"
  | "fi"
  | "ar"
  | "pl"
  | "cs";

export const LANGUAGES: {
  code: LanguageCode;
  label: string;
  native: string;
  flag: string;
  dir: "ltr" | "rtl";
}[] = [
  { code: "en", label: "English",    native: "English",    flag: "🇬🇧", dir: "ltr" },
  { code: "fr", label: "French",     native: "Français",   flag: "🇫🇷", dir: "ltr" },
  { code: "de", label: "German",     native: "Deutsch",    flag: "🇩🇪", dir: "ltr" },
  { code: "it", label: "Italian",    native: "Italiano",   flag: "🇮🇹", dir: "ltr" },
  { code: "es", label: "Spanish",    native: "Español",    flag: "🇪🇸", dir: "ltr" },
  { code: "pt", label: "Portuguese", native: "Português",  flag: "🇵🇹", dir: "ltr" },
  { code: "sv", label: "Swedish",    native: "Svenska",    flag: "🇸🇪", dir: "ltr" },
  { code: "no", label: "Norwegian",  native: "Norsk",      flag: "🇳🇴", dir: "ltr" },
  { code: "fi", label: "Finnish",    native: "Suomi",      flag: "🇫🇮", dir: "ltr" },
  { code: "pl", label: "Polish",     native: "Polski",     flag: "🇵🇱", dir: "ltr" },
  { code: "cs", label: "Czech",      native: "Čeština",    flag: "🇨🇿", dir: "ltr" },
  { code: "ar", label: "Arabic",     native: "العربية",     flag: "🇸🇦", dir: "rtl" },
];

export const LANGUAGE_CODES = LANGUAGES.map((l) => l.code);
export const DEFAULT_LANGUAGE: LanguageCode = "en";

/** Languages that appear in the URL as a prefix (all non-English). */
export const URL_LANGUAGE_CODES = LANGUAGE_CODES.filter((c) => c !== "en") as Exclude<LanguageCode, "en">[];

/** Validate a raw string as a URL-prefix language code (undefined = English at root). */
export function isValidUrlLang(raw: string | undefined): raw is Exclude<LanguageCode, "en"> {
  return typeof raw === "string" && (URL_LANGUAGE_CODES as string[]).includes(raw);
}

/** Resolve the effective language for a route: undefined URL param means English. */
export function resolveRouteLanguage(rawLang: string | undefined): LanguageCode {
  if (rawLang === undefined) return "en";
  return isValidUrlLang(rawLang) ? rawLang : "en";
}
