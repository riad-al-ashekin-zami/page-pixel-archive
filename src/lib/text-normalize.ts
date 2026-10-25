const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

type ClinicKey =
  | "MS_CLINIC"
  | "ND_GROUP"
  | "SM_SURGICAL"
  | "SD_PARTNERS"
  | "CM_SURGICAL"
  | "CP_DERMATOLOGY"
  | "KP_DERMATOLOGY"
  | "NL_DERMATOLOGY"
  | "NBS_LASER"
  | "BH_DERMATOLOGY"
  | "HD_GROUP"
  | "BS_DERMATOLOGY"
  | "CS_DERMATOLOGY"
  | "PS_PARTNERS"
  | "RS_INSTITUTE"
  | "LA_DERMATOLOGY"
  | "SC_ASSOCIATES"
  | "HV_DERMATOLOGY"
  | "MM_CENTER";

const CLINIC_DISPLAY_NAMES: Record<string, Record<ClinicKey, string>> = {
  en: {
    MS_CLINIC: "MS Clinic",
    ND_GROUP: "ND Group",
    SM_SURGICAL: "SM Surgical",
    SD_PARTNERS: "SD Partners",
    CM_SURGICAL: "CM Surgical",
    CP_DERMATOLOGY: "CP Dermatology",
    KP_DERMATOLOGY: "KP Dermatology",
    NL_DERMATOLOGY: "NL Dermatology",
    NBS_LASER: "NBS Laser",
    BH_DERMATOLOGY: "BH Dermatology",
    HD_GROUP: "HD Group",
    BS_DERMATOLOGY: "BS Dermatology",
    CS_DERMATOLOGY: "CS Dermatology",
    PS_PARTNERS: "PS Partners",
    RS_INSTITUTE: "RS Institute",
    LA_DERMATOLOGY: "LA Dermatology",
    SC_ASSOCIATES: "SC Associates",
    HV_DERMATOLOGY: "HV Dermatology",
    MM_CENTER: "MM Center",
  },
  ar: {
    MS_CLINIC: "إم إس كلينك",
    ND_GROUP: "مجموعة إن دي",
    SM_SURGICAL: "إس إم للجراحة",
    SD_PARTNERS: "إس دي بارتنرز",
    CM_SURGICAL: "سي إم للجراحة",
    CP_DERMATOLOGY: "سي بي ديرماتولوجي",
    KP_DERMATOLOGY: "كي بي ديرماتولوجي",
    NL_DERMATOLOGY: "إن إل ديرماتولوجي",
    NBS_LASER: "إن بي إس ليزر",
    BH_DERMATOLOGY: "بي إتش ديرماتولوجي",
    HD_GROUP: "مجموعة إتش دي",
    BS_DERMATOLOGY: "بي إس ديرماتولوجي",
    CS_DERMATOLOGY: "سي إس ديرماتولوجي",
    PS_PARTNERS: "بي إس بارتنرز",
    RS_INSTITUTE: "آر إس إنستيتيوت",
    LA_DERMATOLOGY: "إل إيه ديرماتولوجي",
    SC_ASSOCIATES: "إس سي أسوشيتس",
    HV_DERMATOLOGY: "إتش في ديرماتولوجي",
    MM_CENTER: "إم إم سنتر",
  },
  es: {
    MS_CLINIC: "MS Clínica",
    ND_GROUP: "Grupo ND",
    SM_SURGICAL: "SM Cirugía",
    SD_PARTNERS: "SD Socios",
    CM_SURGICAL: "CM Cirugía",
    CP_DERMATOLOGY: "CP Dermatología",
    KP_DERMATOLOGY: "KP Dermatología",
    NL_DERMATOLOGY: "NL Dermatología",
    NBS_LASER: "NBS Láser",
    BH_DERMATOLOGY: "BH Dermatología",
    HD_GROUP: "Grupo HD",
    BS_DERMATOLOGY: "BS Dermatología",
    CS_DERMATOLOGY: "CS Dermatología",
    PS_PARTNERS: "PS Socios",
    RS_INSTITUTE: "RS Instituto",
    LA_DERMATOLOGY: "LA Dermatología",
    SC_ASSOCIATES: "SC Asociados",
    HV_DERMATOLOGY: "HV Dermatología",
    MM_CENTER: "MM Centro",
  },
  fr: {
    MS_CLINIC: "MS Clinique",
    ND_GROUP: "Groupe ND",
    SM_SURGICAL: "SM Chirurgie",
    SD_PARTNERS: "SD Partenaires",
    CM_SURGICAL: "CM Chirurgie",
    CP_DERMATOLOGY: "CP Dermatologie",
    KP_DERMATOLOGY: "KP Dermatologie",
    NL_DERMATOLOGY: "NL Dermatologie",
    NBS_LASER: "NBS Laser",
    BH_DERMATOLOGY: "BH Dermatologie",
    HD_GROUP: "Groupe HD",
    BS_DERMATOLOGY: "BS Dermatologie",
    CS_DERMATOLOGY: "CS Dermatologie",
    PS_PARTNERS: "PS Partenaires",
    RS_INSTITUTE: "RS Institut",
    LA_DERMATOLOGY: "LA Dermatologie",
    SC_ASSOCIATES: "SC Associés",
    HV_DERMATOLOGY: "HV Dermatologie",
    MM_CENTER: "MM Centre",
  },
  de: {
    MS_CLINIC: "MS Klinik",
    ND_GROUP: "ND Gruppe",
    SM_SURGICAL: "SM Chirurgie",
    SD_PARTNERS: "SD Partner",
    CM_SURGICAL: "CM Chirurgie",
    CP_DERMATOLOGY: "CP Dermatologie",
    KP_DERMATOLOGY: "KP Dermatologie",
    NL_DERMATOLOGY: "NL Dermatologie",
    NBS_LASER: "NBS Laser",
    BH_DERMATOLOGY: "BH Dermatologie",
    HD_GROUP: "HD Gruppe",
    BS_DERMATOLOGY: "BS Dermatologie",
    CS_DERMATOLOGY: "CS Dermatologie",
    PS_PARTNERS: "PS Partner",
    RS_INSTITUTE: "RS Institut",
    LA_DERMATOLOGY: "LA Dermatologie",
    SC_ASSOCIATES: "SC Partner",
    HV_DERMATOLOGY: "HV Dermatologie",
    MM_CENTER: "MM Zentrum",
  },
  it: {
    MS_CLINIC: "MS Clinica",
    ND_GROUP: "Gruppo ND",
    SM_SURGICAL: "SM Chirurgia",
    SD_PARTNERS: "SD Partner",
    CM_SURGICAL: "CM Chirurgia",
    CP_DERMATOLOGY: "CP Dermatologia",
    KP_DERMATOLOGY: "KP Dermatologia",
    NL_DERMATOLOGY: "NL Dermatologia",
    NBS_LASER: "NBS Laser",
    BH_DERMATOLOGY: "BH Dermatologia",
    HD_GROUP: "Gruppo HD",
    BS_DERMATOLOGY: "BS Dermatologia",
    CS_DERMATOLOGY: "CS Dermatologia",
    PS_PARTNERS: "PS Partner",
    RS_INSTITUTE: "RS Istituto",
    LA_DERMATOLOGY: "LA Dermatologia",
    SC_ASSOCIATES: "SC Associati",
    HV_DERMATOLOGY: "HV Dermatologia",
    MM_CENTER: "MM Centro",
  },
  pt: {
    MS_CLINIC: "MS Clínica",
    ND_GROUP: "Grupo ND",
    SM_SURGICAL: "SM Cirurgia",
    SD_PARTNERS: "SD Parceiros",
    CM_SURGICAL: "CM Cirurgia",
    CP_DERMATOLOGY: "CP Dermatologia",
    KP_DERMATOLOGY: "KP Dermatologia",
    NL_DERMATOLOGY: "NL Dermatologia",
    NBS_LASER: "NBS Laser",
    BH_DERMATOLOGY: "BH Dermatologia",
    HD_GROUP: "Grupo HD",
    BS_DERMATOLOGY: "BS Dermatologia",
    CS_DERMATOLOGY: "CS Dermatologia",
    PS_PARTNERS: "PS Parceiros",
    RS_INSTITUTE: "RS Instituto",
    LA_DERMATOLOGY: "LA Dermatologia",
    SC_ASSOCIATES: "SC Associados",
    HV_DERMATOLOGY: "HV Dermatologia",
    MM_CENTER: "MM Centro",
  },
  sv: {
    MS_CLINIC: "MS Klinik",
    ND_GROUP: "ND Grupp",
    SM_SURGICAL: "SM Kirurgi",
    SD_PARTNERS: "SD Partner",
    CM_SURGICAL: "CM Kirurgi",
    CP_DERMATOLOGY: "CP Dermatologi",
    KP_DERMATOLOGY: "KP Dermatologi",
    NL_DERMATOLOGY: "NL Dermatologi",
    NBS_LASER: "NBS Laser",
    BH_DERMATOLOGY: "BH Dermatologi",
    HD_GROUP: "HD Grupp",
    BS_DERMATOLOGY: "BS Dermatologi",
    CS_DERMATOLOGY: "CS Dermatologi",
    PS_PARTNERS: "PS Partner",
    RS_INSTITUTE: "RS Institut",
    LA_DERMATOLOGY: "LA Dermatologi",
    SC_ASSOCIATES: "SC Partner",
    HV_DERMATOLOGY: "HV Dermatologi",
    MM_CENTER: "MM Center",
  },
  no: {
    MS_CLINIC: "MS Klinikk",
    ND_GROUP: "ND Gruppe",
    SM_SURGICAL: "SM Kirurgi",
    SD_PARTNERS: "SD Partnere",
    CM_SURGICAL: "CM Kirurgi",
    CP_DERMATOLOGY: "CP Dermatologi",
    KP_DERMATOLOGY: "KP Dermatologi",
    NL_DERMATOLOGY: "NL Dermatologi",
    NBS_LASER: "NBS Laser",
    BH_DERMATOLOGY: "BH Dermatologi",
    HD_GROUP: "HD Gruppe",
    BS_DERMATOLOGY: "BS Dermatologi",
    CS_DERMATOLOGY: "CS Dermatologi",
    PS_PARTNERS: "PS Partnere",
    RS_INSTITUTE: "RS Institutt",
    LA_DERMATOLOGY: "LA Dermatologi",
    SC_ASSOCIATES: "SC Partnere",
    HV_DERMATOLOGY: "HV Dermatologi",
    MM_CENTER: "MM Senter",
  },
  fi: {
    MS_CLINIC: "MS Klinikka",
    ND_GROUP: "ND Ryhmä",
    SM_SURGICAL: "SM Kirurgia",
    SD_PARTNERS: "SD Kumppanit",
    CM_SURGICAL: "CM Kirurgia",
    CP_DERMATOLOGY: "CP Dermatologia",
    KP_DERMATOLOGY: "KP Dermatologia",
    NL_DERMATOLOGY: "NL Dermatologia",
    NBS_LASER: "NBS Laser",
    BH_DERMATOLOGY: "BH Dermatologia",
    HD_GROUP: "HD Ryhmä",
    BS_DERMATOLOGY: "BS Dermatologia",
    CS_DERMATOLOGY: "CS Dermatologia",
    PS_PARTNERS: "PS Kumppanit",
    RS_INSTITUTE: "RS Instituutti",
    LA_DERMATOLOGY: "LA Dermatologia",
    SC_ASSOCIATES: "SC Kumppanit",
    HV_DERMATOLOGY: "HV Dermatologia",
    MM_CENTER: "MM Keskus",
  },
  pl: {
    MS_CLINIC: "MS Klinika",
    ND_GROUP: "Grupa ND",
    SM_SURGICAL: "SM Chirurgia",
    SD_PARTNERS: "SD Partnerzy",
    CM_SURGICAL: "CM Chirurgia",
    CP_DERMATOLOGY: "CP Dermatologia",
    KP_DERMATOLOGY: "KP Dermatologia",
    NL_DERMATOLOGY: "NL Dermatologia",
    NBS_LASER: "NBS Laser",
    BH_DERMATOLOGY: "BH Dermatologia",
    HD_GROUP: "Grupa HD",
    BS_DERMATOLOGY: "BS Dermatologia",
    CS_DERMATOLOGY: "CS Dermatologia",
    PS_PARTNERS: "PS Partnerzy",
    RS_INSTITUTE: "RS Instytut",
    LA_DERMATOLOGY: "LA Dermatologia",
    SC_ASSOCIATES: "SC Partnerzy",
    HV_DERMATOLOGY: "HV Dermatologia",
    MM_CENTER: "MM Centrum",
  },
  cs: {
    MS_CLINIC: "MS Klinika",
    ND_GROUP: "Skupina ND",
    SM_SURGICAL: "SM Chirurgie",
    SD_PARTNERS: "SD Partneři",
    CM_SURGICAL: "CM Chirurgie",
    CP_DERMATOLOGY: "CP Dermatologie",
    KP_DERMATOLOGY: "KP Dermatologie",
    NL_DERMATOLOGY: "NL Dermatologie",
    NBS_LASER: "NBS Laser",
    BH_DERMATOLOGY: "BH Dermatologie",
    HD_GROUP: "Skupina HD",
    BS_DERMATOLOGY: "BS Dermatologie",
    CS_DERMATOLOGY: "CS Dermatologie",
    PS_PARTNERS: "PS Partneři",
    RS_INSTITUTE: "RS Institut",
    LA_DERMATOLOGY: "LA Dermatologie",
    SC_ASSOCIATES: "SC Partneři",
    HV_DERMATOLOGY: "HV Dermatologie",
    MM_CENTER: "MM Centrum",
  },
};

const CLINIC_ALIASES: Array<[RegExp, ClinicKey]> = [
  [/\bMS\s+(?:Clinic|Cl[ií]nica|Clinique|Klinik|Klinika|Klinikk|Klinikka)\b/gi, "MS_CLINIC"],
  [/عيادة\s+ميريديان\s+الجلدية/gi, "MS_CLINIC"],
  [/Klinika\s+Skóry\s+Meridian/gi, "MS_CLINIC"],
  [/Meridian\s+(?:Skin\s+Clinic|Dermatology)/gi, "MS_CLINIC"],

  [/\bND\s+(?:Group|Groupe|Gruppe|Grupp|Ryhmä|Grupa|Skupina)\b/gi, "ND_GROUP"],
  [/مجموعة\s+نورث\s+شور\s+لطب\s+الجلد(?:ية)?/gi, "ND_GROUP"],
  [/مجموعة\s+نورث\s+شور\s+ل(?:طب\s+)?(?:الأمراض\s+)?الجلد(?:ية)?/gi, "ND_GROUP"],
  [/(?:grupo\s+dermatológico\s+)?Northshore\s+Dermatology\s+Group/gi, "ND_GROUP"],
  [/grupo\s+dermatológico\s+Northshore/gi, "ND_GROUP"],

  [/\bSM\s+(?:Surgical|Surgery|Cirug[ií]a|Chirurgie|Chirurgia|Cirurgia|Kirurgi(?:a)?|للجراحة)\b/gi, "SM_SURGICAL"],
  [/Summit\s+Mohs\s+&\s+Surgical/gi, "SM_SURGICAL"],
  [/قمة\s+موهس\s+للجراحة\s+الجلدية/gi, "SM_SURGICAL"],
  [/مركز\s+قمة\s+موهس\s+للجراحة\s+الجلدية/gi, "SM_SURGICAL"],
  [/\bSD\s+(?:Partners|Partenaires|Partner|Parceiros|Partnere|Partnerzy|Partneři|Socios|Kumppanit)\b/gi, "SD_PARTNERS"],
  [/Summit\s+Dermatology\s+Partners/gi, "SD_PARTNERS"],
  [/شركاء\s+ساميت\s+للأمراض\s+الجلدية/gi, "SD_PARTNERS"],

  [/\bCM\s+(?:Surgical|Surgery|Cirug[ií]a|Chirurgie|Chirurgia|Cirurgia|Kirurgi(?:a)?|للجراحة)\b/gi, "CM_SURGICAL"],
  [/كاسكيد\s+لجراحة\s+موهس\s+والجراحة\s+الجلدية/gi, "CM_SURGICAL"],
  [/كاسكيد\s+لجراحة\s+موهس\s+والجلدية/gi, "CM_SURGICAL"],
  [/كاسكيد\s+لجراحة\s+موهس/gi, "CM_SURGICAL"],
  [/Cascade\s+Mohs\s+&\s+Surgical/gi, "CM_SURGICAL"],
  [/\bCP\s+(?:Derm(?:atology)?|Dermatology|Dermatologie|Dermatolog[ií]a|Dermatologi|ديرماتولوجي)\b/gi, "CP_DERMATOLOGY"],
  [/كاسكيد\s+لطب\s+جلد\s+الأطفال/gi, "CP_DERMATOLOGY"],
  [/Cascade\s+Pediatric\s+Dermatology/gi, "CP_DERMATOLOGY"],
  [/Cascade\s+Pediatric\s+Derm\b/gi, "CP_DERMATOLOGY"],
  [/\bCP\s+Derm\b/gi, "CP_DERMATOLOGY"],

  [/\bKP\s+(?:Dermatology|Dermatologie|Dermatolog[ií]a|Dermatologi|ديرماتولوجي)\b/gi, "KP_DERMATOLOGY"],
  [/كوهلي\s+لجلدية\s+الأطفال/gi, "KP_DERMATOLOGY"],
  [/كوهلي\s+ل(?:طب\s+)?جلد(?:ية)?\s+الأطفال/gi, "KP_DERMATOLOGY"],
  [/Kohli\s+Pediatric\s+Derm(?:atology)?/gi, "KP_DERMATOLOGY"],

  [/\bNL\s+(?:Dermatology|Dermatologie|Dermatolog[ií]a|Dermatologi|ديرماتولوجي)\b/gi, "NL_DERMATOLOGY"],
  [/نورث\s+لايت\s+لطب\s+الجلدية/gi, "NL_DERMATOLOGY"],
  [/نورث\s+لايت\s+ل(?:طب\s+)?الجلد(?:ية)?/gi, "NL_DERMATOLOGY"],
  [/Northlight\s+Dermatology/gi, "NL_DERMATOLOGY"],

  [/\bNBS\s+(?:Laser|Láser|ليزر)\b/gi, "NBS_LASER"],
  [/نورث\s+باي\s+سكين\s+آند\s+ليزر/gi, "NBS_LASER"],
  [/North\s+Bay\s+Skin\s+(?:&|and)\s+Laser/gi, "NBS_LASER"],

  [/\bBH\s+(?:Dermatology|Dermatologie|Dermatolog[ií]a|Dermatologi|ديرماتولوجي)\b/gi, "BH_DERMATOLOGY"],
  [/بيكون\s+هيل\s+للأمراض\s+الجلدية/gi, "BH_DERMATOLOGY"],
  [/Beacon\s+Hill\s+Dermatology/gi, "BH_DERMATOLOGY"],

  [/\bHD\s+(?:Group|Groupe|Gruppe|Grupp|Ryhmä|Grupa|Skupina)\b/gi, "HD_GROUP"],
  [/Highland\s+Dermatology\s+Group/gi, "HD_GROUP"],
  [/\bBS\s+(?:Dermatology|Dermatologie|Dermatolog[ií]a|Dermatologi|ديرماتولوجي)\b/gi, "BS_DERMATOLOGY"],
  [/Bright\s+Skin\s+Dermatology/gi, "BS_DERMATOLOGY"],
  [/\bCS\s+(?:Dermatology|Dermatologie|Dermatolog[ií]a|Dermatologi|ديرماتولوجي)\b/gi, "CS_DERMATOLOGY"],
  [/Clear\s+Skin\s+Dermatology/gi, "CS_DERMATOLOGY"],
  [/عيادة\s+Clear\s+Skin\s+لطب\s+الجلد/gi, "CS_DERMATOLOGY"],
  [/\bPS\s+(?:Partners|Partenaires|Partner|Parceiros|Partnere|Partnerzy|Partneři|Socios|Kumppanit)\b/gi, "PS_PARTNERS"],
  [/Pediatric\s+Skin\s+Partners/gi, "PS_PARTNERS"],

  [/\bRS\s+(?:Institute|Institut|Instituto|Istituto|Instituutti|Instytut|إنستيتيوت)\b/gi, "RS_INSTITUTE"],
  [/معهد\s+البشرة\s+المشرقة/gi, "RS_INSTITUTE"],
  [/معهد\s+راديانت\s+ل(?:لبشرة|لجلد(?:ية)?|ل(?:طب\s+)?الجلد(?:ية)?)/gi, "RS_INSTITUTE"],
  [/Instituto\s+Dermatológico\s+Radiant/gi, "RS_INSTITUTE"],
  [/Radiant\s+Skin\s+Institute/gi, "RS_INSTITUTE"],
  [/Radiant\s+Derm\b/gi, "RS_INSTITUTE"],

  [/\bLA\s+(?:Dermatology|Dermatologie|Dermatolog[ií]a|Dermatologi|ديرماتولوجي)\b/gi, "LA_DERMATOLOGY"],
  [/لومن\s+لطب\s+الجلدية\s+التجميلي/gi, "LA_DERMATOLOGY"],
  [/ليومن\s+لطب\s+الجلدية\s+التجميلي/gi, "LA_DERMATOLOGY"],
  [/لومين\s+لتجميل\s+الجلد/gi, "LA_DERMATOLOGY"],
  [/لومين\s+للتجميل/gi, "LA_DERMATOLOGY"],
  [/Lumen\s+Aesthetic\s+Dermatology/gi, "LA_DERMATOLOGY"],
  [/Lumen\s+Aesthetic\b/gi, "LA_DERMATOLOGY"],

  [/\bSC\s+(?:Associates|Associés|Asociados|Associati|Partner|Partnere|Partnerzy|Partneři|Parceiros|Kumppanit|أسوشيتس)\b/gi, "SC_ASSOCIATES"],
  [/SkinCare\s+Associates/gi, "SC_ASSOCIATES"],
  [/Skin\s+Care\s+Associates/gi, "SC_ASSOCIATES"],
  [/عيادة\s+سكين\s+كير/gi, "SC_ASSOCIATES"],

  [/\bHV\s+(?:Dermatology|Dermatologie|Dermatolog[ií]a|Dermatologi|ديرماتولوجي)\b/gi, "HV_DERMATOLOGY"],
  [/Harbor\s+Valley\s+Dermatology/gi, "HV_DERMATOLOGY"],

  [/\bMM\s+(?:Center|Centre|Centro|Zentrum|Senter|Keskus|Centrum|سنتر)\b/gi, "MM_CENTER"],
];

function getClinicDisplayName(key: ClinicKey, lang?: string) {
  const language = lang && CLINIC_DISPLAY_NAMES[lang] ? lang : "en";
  return CLINIC_DISPLAY_NAMES[language][key] ?? CLINIC_DISPLAY_NAMES.en[key];
}

export function normalizeClinicNames(value: string, lang?: string) {
  return CLINIC_ALIASES.reduce(
    (text, [pattern, key]) => text.replace(pattern, getClinicDisplayName(key, lang)),
    value,
  );
}

export function toArabicDigits(value: string) {
  return value
    .replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)] ?? digit)
    .replace(/([٠-٩]),(?=[٠-٩])/g, "$1٬")
    .replace(/([٠-٩])\.(?=[٠-٩])/g, "$1٫");
}

export function fromArabicDigits(value: string) {
  return value
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)))
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/٬/g, ",")
    .replace(/٫/g, ".");
}

const TECHNICAL_STRING_KEYS = new Set([
  "canonical",
  "dateiso",
  "email",
  "href",
  "id",
  "image",
  "imageurl",
  "ogimage",
  "path",
  "src",
  "slug",
  "to",
  "twitterimage",
  "url",
]);

function isLikelyTechnicalString(value: string) {
  const lower = value.toLowerCase();
  return ["http:", "https:", "mailto:", "tel:", "sms:", "whatsapp:", "/", "#"].some((prefix) =>
    lower.startsWith(prefix),
  );
}

function shouldPreserveAsciiDigits(key: string | undefined, value: string) {
  const normalizedKey = key?.toLowerCase().replace(/[^a-z]/g, "");
  return Boolean(
    (normalizedKey && TECHNICAL_STRING_KEYS.has(normalizedKey)) ||
      (normalizedKey && /(?:url|uri|href|src|slug|path|image|icon|asset|dateiso|email|phone|id)$/.test(normalizedKey)) ||
      isLikelyTechnicalString(value),
  );
}

export function normalizeLocalizedString(
  value: string,
  lang?: string,
  options: { preserveAsciiDigits?: boolean } = {},
) {
  const normalized = normalizeClinicNames(value, lang);
  return lang === "ar" && !options.preserveAsciiDigits ? toArabicDigits(normalized) : normalized;
}

export function normalizeDeep<T>(value: T, lang?: string, key?: string): T {
  if (typeof value === "string") {
    return normalizeLocalizedString(value, lang, {
      preserveAsciiDigits: shouldPreserveAsciiDigits(key, value),
    }) as T;
  }
  if (Array.isArray(value)) return value.map((item) => normalizeDeep(item, lang, key)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, item]) => [entryKey, normalizeDeep(item, lang, entryKey)]),
    ) as T;
  }
  return value;
}

export function formatLocalizedDate(dateISO: string, lang?: string) {
  try {
    const locale = lang === "ar" ? "ar-u-nu-arab" : lang || "en";
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${dateISO}T00:00:00Z`));
  } catch {
    return normalizeLocalizedString(dateISO, lang);
  }
}

const SKIPPED_TEXT_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "TEXTAREA",
  "INPUT",
  "SELECT",
  "OPTION",
  "CODE",
  "PRE",
]);

const NORMALIZED_ATTRIBUTES = [
  "alt",
  "aria-description",
  "aria-label",
  "content",
  "placeholder",
  "title",
];

function shouldSkipTextNode(node: Text) {
  const parent = node.parentElement;
  return !parent || SKIPPED_TEXT_TAGS.has(parent.tagName) || parent.closest("[data-no-text-normalize]");
}

function normalizeTextNode(node: Text, lang?: string) {
  if (shouldSkipTextNode(node)) return;
  const current = node.nodeValue ?? "";
  const next = normalizeLocalizedString(current, lang);
  if (next !== current) node.nodeValue = next;
}

function normalizeElementAttributes(element: Element, lang?: string) {
  if (element.closest("[data-no-text-normalize]")) return;
  for (const attr of NORMALIZED_ATTRIBUTES) {
    const current = element.getAttribute(attr);
    if (!current) continue;
    const next = normalizeLocalizedString(current, lang, {
      preserveAsciiDigits: shouldPreserveAsciiDigits(attr, current),
    });
    if (next !== current) element.setAttribute(attr, next);
  }
}

function normalizeNodeTree(node: Node, lang?: string) {
  if (node.nodeType === Node.TEXT_NODE) {
    normalizeTextNode(node as Text, lang);
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
  if (node.nodeType === Node.ELEMENT_NODE) normalizeElementAttributes(node as Element, lang);
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    normalizeTextNode(current as Text, lang);
    current = walker.nextNode();
  }

  if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    const elementWalker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
    let element = elementWalker.nextNode();
    while (element) {
      normalizeElementAttributes(element as Element, lang);
      element = elementWalker.nextNode();
    }
  }
}

export function installTextNormalizationObserver(root: HTMLElement, lang?: string) {
  normalizeNodeTree(root, lang);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") {
        normalizeTextNode(mutation.target as Text, lang);
        continue;
      }
      if (mutation.type === "attributes" && mutation.target instanceof Element) {
        normalizeElementAttributes(mutation.target, lang);
        continue;
      }
      mutation.addedNodes.forEach((node) => normalizeNodeTree(node, lang));
    }
  });

  observer.observe(root, {
    attributes: true,
    attributeFilter: NORMALIZED_ATTRIBUTES,
    childList: true,
    characterData: true,
    subtree: true,
  });

  return () => observer.disconnect();
}