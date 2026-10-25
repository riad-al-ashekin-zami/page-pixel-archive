
# 11-Language SEO Rollout Plan

## Current state (kotota kaj ache)
- **i18n infra already exists**: `react-i18next` + 11 language files in `src/i18n/locales/*.json`, `LanguageSwitcher` component ready.
- **Problem 1 — no SEO**: URL palte na (`/about` sob language e same). Google shob language index korte parbe na.
- **Problem 2 — content translate kora nei**: 11ta locale file er prottek tay matro ~66 line (khali nav/header). Baki ~27,500 line hardcoded English content — About, Services, all 25+ dermatology pages, Blog, Contact, Legal — kichui translate hoy ni.
- **Target**: 40+ routes × 10 new languages = **~400 translated pages** with proper SEO URLs.

## Scope confirmed
- **11 languages**: en, fr, de, it, sv, no, fi, ar (RTL), pl, cs, pt
- **URL structure**: `/en/about`, `/fr/about`, `/de/about`... (English gets `/en/` prefix too, root `/` redirects to `/en/`)
- **Translation source**: Lovable AI (Gemini 3 Pro for quality) — batch translate, native tone
- **Quality target**: 100% native, all responsive, RTL support for Arabic

## Realistic delivery — 6 phases

### Phase 1 — i18n routing infrastructure (foundation)
Set up URL-based localization so every route lives under `/$lang/...`:

- Add `$lang` dynamic segment: restructure `src/routes/` → `src/routes/$lang/*` (all 40 existing routes move under this layout)
- Root `_index.tsx` redirects `/` → `/en/` (with browser-language detection fallback)
- Layout route `$lang.tsx` validates lang code, sets `i18n.changeLanguage()`, applies `dir="rtl"` for Arabic
- Update `LanguageSwitcher` to `navigate({ to, params: { lang: newCode } })` instead of just changing i18n
- Update ALL internal `<Link to="/about">` → `<Link to="/$lang/about" params={{ lang }}>` (~200+ links across nav, footer, CTA buttons)
- Add `<link rel="alternate" hreflang="xx">` tags in every route's `head()` (11 alternates per page)
- Update `sitemap.xml` to emit all 11 × 40 = 440 URLs with hreflang annotations
- Update `head()` meta: per-language `title`, `description`, `og:title`, `og:description`, `og:locale`, `canonical`

**Deliverable**: Site works at `/en/*`, `/fr/*`, etc. — English content visible on all language URLs, ready for content translation.

### Phase 2 — Extract all hardcoded text into translation keys
Scan all 40 route files + section components, replace every user-visible string with `t("page.section.key")`. Add all keys to `en.json`.

- Estimated ~3,000-5,000 translation keys total
- Includes: headings, paragraphs, button labels, meta titles/descriptions, form labels, alt text, FAQ Q&A, testimonials, chatbot prompts
- Reorganize `locales/en.json` into per-page namespaces (`home.json`, `about.json`, `services/seo.json`, etc.) — 40 files instead of 1 giant file, easier translation and lazy-loading

**Deliverable**: English site works exactly as before, but every string reads from JSON. Ready to translate.

### Phase 3 — AI translation batch 1 (4 languages)
Translate all namespaces to French, German, Spanish→Italian, Portuguese using Lovable AI (Gemini 3 Pro) via server function:
- Preserves interpolation vars `{{name}}`, HTML tags, dermatology terminology
- One JSON file at a time, streamed, saved to `src/i18n/locales/{lang}/*.json`
- Manual spot-check of top 5 pages per language

### Phase 4 — AI translation batch 2 (3 languages)
Same pipeline for Swedish, Norwegian, Finnish.

### Phase 5 — AI translation batch 3 (3 languages + RTL)
Polish, Czech, Arabic. Arabic gets extra:
- RTL layout audit (icons flip, arrows flip, text-align, padding-left→padding-right)
- Test every page with `dir="rtl"` — dropdowns, modals, forms, chatbot
- Arabic number formatting (Eastern Arabic numerals optional)

### Phase 6 — QA, responsive, SEO verification
- Long-word overflow check (German compound words on mobile)
- CJK line-height (not needed here — no Chinese/Japanese)
- RTL end-to-end test
- Google Search Console-ready: verify hreflang, canonical, sitemap
- Chatbot per-language: system prompt in each language OR auto-detect
- Run SEO scanner, fix findings

## Technical Details

**Route structure change** (biggest single migration):
```
src/routes/
  index.tsx                    → redirects to /en/
  $lang.tsx                    → layout: validates lang, sets i18n, hreflang
  $lang/index.tsx              → was: index.tsx
  $lang/about.tsx              → was: about.tsx
  $lang/dermatology-seo-services.tsx  → was: dermatology-seo-services.tsx
  ... (all 40 routes moved)
  api/*                        → stays as-is (not localized)
  sitemap[.]xml.ts             → emits × 11 URLs
```

**Locale file structure**:
```
src/i18n/locales/
  en/
    common.json    (nav, footer, buttons, cta)
    home.json
    about.json
    services/
      seo.json
      website-design.json
      ...
    blog.json
    ...
  fr/ ... (mirror)
  de/ ... (mirror)
```

**Translation server function** (`src/lib/translate.functions.ts`):
- Input: `{ sourceLang, targetLang, namespace, keys: Record<string,string> }`
- Uses Lovable AI Gateway (Gemini 3 Pro) with system prompt: "You are a native {lang} translator specializing in dermatology + web design marketing. Preserve `{{vars}}`, HTML tags. Match tone: professional, warm, conversion-focused."
- Returns translated JSON, agent saves to disk
- Batched (one namespace per call, ~50-200 keys)

**Head metadata per route** (example for `/fr/about`):
```tsx
head: ({ params }) => ({
  meta: [
    { title: t("about.meta.title") },
    { name: "description", content: t("about.meta.description") },
    { property: "og:locale", content: `${params.lang}_${REGION[params.lang]}` },
  ],
  links: [
    { rel: "canonical", href: `https://dermatologywebsitedesign.com/${params.lang}/about` },
    ...LANGUAGES.map(l => ({ rel: "alternate", hreflang: l.code, href: `.../${l.code}/about` })),
    { rel: "alternate", hreflang: "x-default", href: ".../en/about" },
  ],
})
```

## Cost & timing estimate
- **Translation cost**: ~5,000 keys × 10 languages × avg 30 tokens = ~1.5M output tokens. On Gemini 3 Pro ~ **$8-15 in Lovable AI credits total** for all languages.
- **Chat turns**: Phase 1 = 1 large edit, Phase 2 = 3-5 edits (extraction is the biggest manual work), Phase 3-5 = 1 edit each (automated), Phase 6 = 1-2 edits. **Total ~8-12 turns**.

## What you'll approve step-by-step
Ami phase-by-phase execute korbo, prottek phase er por preview korte parben. Ekhono confirm korle Phase 1 (routing infra) diye shuru kori — ei step er por apni URL e `/fr/about` type kore dekhben page load hocche (content still English, translation pore hobe).

## Risk / callouts
- **Existing bookmarks / backlinks**: `/about` → `/en/about` redirect diye handle korbo, kono link break hobe na
- **AI translation 100% native na hote pare**: Legal (Terms/Privacy) + medical claims er jonno human review recommend korbo — apni chaile professional reviewer er kache pathaben
- **Chatbot**: currently English-only prompts; Phase 5 e per-language system prompt add korbo
- **Blog posts** (`blog.$slug.tsx`): dynamic content — jodi database e blog thake, prottek post er translation store korte hobe (separate table column or translation table). Confirm korben database structure kemon.

**Ready to start Phase 1?** Confirm korle immediately routing infra diye shuru kori.
