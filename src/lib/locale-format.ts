import type { LanguageCode } from "@/i18n/languages";

export function formatLocalizedNumber(
  value: number,
  lang: LanguageCode,
  minimumIntegerDigits: number | Intl.NumberFormatOptions = 1,
  options: Intl.NumberFormatOptions = {},
) {
  const locale = lang === "ar" ? "ar-u-nu-arab" : lang;
  const numberOptions =
    typeof minimumIntegerDigits === "number"
      ? { minimumIntegerDigits, ...options }
      : minimumIntegerDigits;

  return new Intl.NumberFormat(locale, {
    useGrouping: true,
    ...numberOptions,
  }).format(value);
}
