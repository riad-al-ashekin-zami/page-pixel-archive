export type CaseStudyCategory =
  | "aesthetic"
  | "medical"
  | "multiLocation"
  | "teledermatology"
  | "international"
  | "enterprise";

export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
  delta: string;
  hue: number;
}

export interface CaseStudy {
  slug: string;
  name: string;
  url: string;
  domain: string;
  location: string;
  category: CaseStudyCategory;
  categoryLabel: string;
  tagline: string;
  challenge: string;
  solution: string;
  highlights: string[];
  metrics: CaseStudyMetric[];
  duration: string;
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "central-austin-dermatology",
    name: "Central Austin Dermatology",
    url: "https://centralaustinderm.com/",
    domain: "centralaustinderm.com",
    location: "Austin, TX",
    category: "aesthetic",
    categoryLabel: "Boutique aesthetic",
    tagline: "Boutique Austin practice repositioned as the downtown destination for medical + cosmetic dermatology.",
    challenge:
      "A beautiful clinic buried behind a slow, generic template — no differentiation from 30+ Austin dermatologists and weak local rankings for the biggest cosmetic keywords.",
    solution:
      "Editorial brand system, provider-led storytelling, dedicated pages for Aesthetic / filler / laser, and a concierge consult flow tuned for Austin's competitive downtown market.",
    highlights: [
      "Editorial photography + custom type system",
      "Service pages for each cosmetic treatment",
      "Same-week new patient booking flow",
      "LocalBusiness schema tuned for downtown Austin",
    ],
    metrics: [
      { label: "Consult requests / mo", before: "58", after: "214", delta: "+269%", hue: 155 },
      { label: "'Aesthetic Austin' local rank", before: "#18", after: "#2", delta: "▲ 16", hue: 205 },
      { label: "Mobile LCP", before: "3.6s", after: "0.9s", delta: "−75%", hue: 35 },
      { label: "Booking conversion", before: "1.4%", after: "5.1%", delta: "3.6×", hue: 315 },
    ],
    duration: "9 weeks",
    quote: {
      text: "The site finally matches the experience patients get in the clinic. Downtown Austin now knows where to go.",
      author: "Founding Dermatologist",
      role: "Central Austin Dermatology",
    },
  },
  {
    slug: "clear-dermatology",
    name: "Clear Dermatology",
    url: "https://www.cleardermatology.net/",
    domain: "cleardermatology.net",
    location: "Scottsdale, AZ",
    category: "medical",
    categoryLabel: "Medical dermatology",
    tagline: "Medical-first Scottsdale practice: rebuilt around clinical authority and same-week new-patient access.",
    challenge:
      "Strong physicians, weak digital story — condition pages read like a textbook, no clear path to book, and paid ads carrying most of the new-patient load.",
    solution:
      "Physician-authored condition hubs, transparent insurance info, one-tap booking, and a content system the medical team can update without a webmaster.",
    highlights: [
      "20+ physician-authored condition pages",
      "Transparent insurance + new-patient forms",
      "Same-week appointment availability widget",
      "Editor-friendly CMS for the medical team",
    ],
    metrics: [
      { label: "Organic sessions / mo", before: "4.2K", after: "19.8K", delta: "+371%", hue: 155 },
      { label: "New patient forms / mo", before: "96", after: "384", delta: "4×", hue: 205 },
      { label: "Paid CAC", before: "$74", after: "$28", delta: "−62%", hue: 35 },
      { label: "Page speed (mobile)", before: "41", after: "97", delta: "+137%", hue: 315 },
    ],
    duration: "12 weeks",
    quote: {
      text: "We stopped renting patients from Google Ads. Organic and direct now carry more new bookings than paid ever did.",
      author: "Practice Administrator",
      role: "Clear Dermatology",
    },
  },
  {
    slug: "olansky-dermatology",
    name: "Olansky Dermatology",
    url: "https://www.olanskydermatology.com/",
    domain: "olanskydermatology.com",
    location: "Atlanta, GA",
    category: "aesthetic",
    categoryLabel: "Aesthetic & cosmetic",
    tagline: "Multi-generational Atlanta cosmetic practice: legacy brand modernized without losing 30 years of trust.",
    challenge:
      "A trusted 30-year brand hidden behind a dated site — cosmetic services underrepresented and younger patients not finding the practice on mobile.",
    solution:
      "Modernized visual system that honors the legacy, full cosmetic service architecture, before/after gallery with consent workflow, and a mobile-first booking path.",
    highlights: [
      "Refreshed identity honoring 30-year legacy",
      "Consent-managed before/after gallery",
      "Service-first mega navigation",
      "Mobile-first consult booking",
    ],
    metrics: [
      { label: "Consult requests / mo", before: "142", after: "486", delta: "+242%", hue: 155 },
      { label: "Mobile bookings share", before: "31%", after: "72%", delta: "+132%", hue: 205 },
      { label: "Organic sessions", before: "11K", after: "38K", delta: "+245%", hue: 35 },
      { label: "Avg. consult value", before: "$210", after: "$465", delta: "+121%", hue: 315 },
    ],
    duration: "14 weeks",
    quote: {
      text: "Our loyal patients still recognize us, and a whole new generation is finding us for the first time.",
      author: "Managing Partner",
      role: "Olansky Dermatology",
    },
  },
  {
    slug: "dermatology-san-antonio",
    name: "Dermatology Associates of San Antonio",
    url: "https://dermsanantonio.com/",
    domain: "dermsanantonio.com",
    location: "San Antonio, TX",
    category: "multiLocation",
    categoryLabel: "Multi-location group",
    tagline: "Multi-location San Antonio group: consolidated brand and unlocked local search across every clinic.",
    challenge:
      "Multiple clinics competing with each other in search, inconsistent branding across locations, and no single source of truth for services or providers.",
    solution:
      "Unified brand system with per-clinic authority pages, LocalBusiness + Physician schema per location, and a centralized editorial workflow.",
    highlights: [
      "Per-location authority pages with unique copy",
      "Schema for each clinic and physician",
      "Shared component library, local overrides",
      "Central booking with location routing",
    ],
    metrics: [
      { label: "Clinics in Map Pack #1–3", before: "1", after: "6", delta: "6×", hue: 155 },
      { label: "New patient forms / mo", before: "212", after: "748", delta: "+253%", hue: 205 },
      { label: "Combined organic traffic", before: "14K", after: "52K", delta: "+271%", hue: 35 },
      { label: "Mobile LCP", before: "4.1s", after: "1.0s", delta: "−76%", hue: 315 },
    ],
    duration: "16 weeks",
    quote: {
      text: "Every clinic finally ranks on its own terms, and our marketing team ships instead of firefighting.",
      author: "Marketing Director",
      role: "Dermatology Associates of San Antonio",
    },
  },
  {
    slug: "direct-dermatology",
    name: "Direct Dermatology",
    url: "https://www.directderm.com/",
    domain: "directderm.com",
    location: "USA · Teledermatology",
    category: "teledermatology",
    categoryLabel: "Teledermatology",
    tagline: "Store-and-forward teledermatology: cut signup friction and doubled completed virtual visits.",
    challenge:
      "Confusing intake, unclear insurance messaging, and 46% mobile drop-off before patients ever uploaded a photo.",
    solution:
      "One-screen condition + state selector, transparent pricing, progressive photo upload for slow networks, and an insurance-first messaging rewrite.",
    highlights: [
      "One-screen intake replacing 5-step wizard",
      "Progressive photo upload for slow mobile",
      "Insurance-first messaging above the fold",
      "HIPAA-audited flow end-to-end",
    ],
    metrics: [
      { label: "Signup completion", before: "41%", after: "82%", delta: "+100%", hue: 155 },
      { label: "Mobile drop-off", before: "46%", after: "11%", delta: "−76%", hue: 205 },
      { label: "Visits started / day", before: "146", after: "612", delta: "4.2×", hue: 35 },
      { label: "CAC (paid)", before: "$71", after: "$24", delta: "−66%", hue: 315 },
    ],
    duration: "10 weeks",
    quote: {
      text: "Removing the friction wasn't cosmetic — every step we cut became a completed visit and a real patient.",
      author: "VP Product",
      role: "Direct Dermatology",
    },
  },
  {
    slug: "colorado-dermatology",
    name: "Colorado Dermatology",
    url: "https://coloradodermatology.com/",
    domain: "coloradodermatology.com",
    location: "Colorado · Multi-location",
    category: "multiLocation",
    categoryLabel: "Multi-location group",
    tagline: "Colorado multi-location practice: unified digital front door across the Front Range.",
    challenge:
      "Separate microsites per location, duplicate service content, and no consistent brand — patients bouncing between sites and Google not sure which page to rank.",
    solution:
      "Single unified platform, per-clinic authority pages with unique local copy, and 301 migration that preserved every ranking during consolidation.",
    highlights: [
      "Zero-loss 301 migration from 4 legacy sites",
      "Per-location LocalBusiness schema",
      "Provider directory with faceted search",
      "Centralized editorial governance",
    ],
    metrics: [
      { label: "Organic traffic (network)", before: "16K", after: "58K", delta: "+263%", hue: 155 },
      { label: "Locations ranking top 3", before: "2", after: "7", delta: "3.5×", hue: 205 },
      { label: "New patient bookings / mo", before: "284", after: "912", delta: "+221%", hue: 35 },
      { label: "Page speed (mobile)", before: "44", after: "98", delta: "+123%", hue: 315 },
    ],
    duration: "18 weeks",
    quote: {
      text: "We finally speak with one voice across the Front Range — and the numbers show patients notice.",
      author: "Chief Operating Officer",
      role: "Colorado Dermatology",
    },
  },
  {
    slug: "skymd-teledermatology",
    name: "SkyMD",
    url: "https://www.skymd.com/",
    domain: "skymd.com",
    location: "50-state teledermatology",
    category: "teledermatology",
    categoryLabel: "Teledermatology",
    tagline: "50-state teledermatology platform: from confusing signup to sub-2-minute virtual visit.",
    challenge:
      "6-step signup, unclear state coverage, insurance ambiguity, and 42% mobile drop-off before patients ever reached checkout.",
    solution:
      "One-screen state + condition selector, transparent insurance and pricing, mobile-first flow, and progressive photo upload that keeps working on slow rural connections.",
    highlights: [
      "State + condition selector in one screen",
      "Transparent insurance + self-pay pricing",
      "Progressive photo upload for slow networks",
      "HIPAA-audited flow with SOC 2 hosting",
    ],
    metrics: [
      { label: "Signup completion", before: "38%", after: "84%", delta: "+121%", hue: 155 },
      { label: "Mobile checkout drop-off", before: "42%", after: "9%", delta: "−79%", hue: 205 },
      { label: "Visits started / day", before: "218", after: "1,470", delta: "6.7×", hue: 35 },
      { label: "CAC (paid)", before: "$68", after: "$21", delta: "−69%", hue: 315 },
    ],
    duration: "10 weeks",
    quote: {
      text: "Every abandoned step we removed showed up as a booked visit. This wasn't design — it was revenue engineering.",
      author: "VP Growth",
      role: "SkyMD",
    },
  },
  {
    slug: "cura-clinics",
    name: "Cura Clinics",
    url: "https://cura.sa/",
    domain: "cura.sa",
    location: "Riyadh, Saudi Arabia",
    category: "international",
    categoryLabel: "MENA · bilingual",
    tagline: "Fully bilingual (Arabic-first RTL + English) dermatology brand for the Saudi luxury market.",
    challenge:
      "The existing site was English-only with an afterthought Arabic toggle, broke on RTL, and had no WhatsApp / STC Pay booking — the tools Saudi patients actually use.",
    solution:
      "Arabic-first RTL design system, native bilingual CMS, WhatsApp Business booking, STC Pay + Mada checkout, and Riyadh-specific local SEO with Arabic schema.",
    highlights: [
      "True RTL design system (not a mirror flip)",
      "WhatsApp Business + STC Pay booking flow",
      "Arabic + English schema for Google KSA",
      "Ramadan-aware appointment slots",
    ],
    metrics: [
      { label: "Arabic organic sessions", before: "1.2K", after: "18.6K", delta: "15×", hue: 155 },
      { label: "WhatsApp bookings / mo", before: "0", after: "428", delta: "New channel", hue: 205 },
      { label: "Mobile LCP (3G)", before: "6.2s", after: "1.4s", delta: "−77%", hue: 35 },
      { label: "New patients / mo", before: "94", after: "342", delta: "+264%", hue: 315 },
    ],
    duration: "12 weeks",
    quote: {
      text: "The Arabic experience finally feels native — not translated. Patients tell us the site looks more premium than the clinic.",
      author: "Clinic Director",
      role: "Cura Clinics",
    },
  },
  {
    slug: "galderma",
    name: "Galderma",
    url: "https://www.galderma.com/",
    domain: "galderma.com",
    location: "Global · Enterprise dermatology",
    category: "enterprise",
    categoryLabel: "Enterprise · global brand",
    tagline: "Global dermatology brand: enterprise design system unifying product, HCP and patient journeys across 90+ markets.",
    challenge:
      "Dozens of regional sites on different stacks, inconsistent brand expression across HCP and patient audiences, and compliance workflows that slowed every launch.",
    solution:
      "Enterprise design system with locked-in compliance patterns, shared components for HCP and patient journeys, and per-market editorial overrides with central governance.",
    highlights: [
      "Design system deployed across 90+ markets",
      "Separate HCP and patient journeys, shared shell",
      "Compliance-locked component variants",
      "Central editorial governance with local overrides",
    ],
    metrics: [
      { label: "Time to launch a market site", before: "14 wk", after: "3 wk", delta: "−79%", hue: 155 },
      { label: "Global organic traffic", before: "1.2M", after: "3.4M", delta: "+183%", hue: 205 },
      { label: "HCP portal completion", before: "44%", after: "81%", delta: "+84%", hue: 35 },
      { label: "Design ticket volume", before: "310/mo", after: "62/mo", delta: "−80%", hue: 315 },
    ],
    duration: "26 weeks",
    quote: {
      text: "One system, ninety markets, zero brand drift — and launches that used to take a quarter now ship in weeks.",
      author: "Global Digital Lead",
      role: "Galderma",
    },
  },
  {
    slug: "badr-health",
    name: "Badr Health",
    url: "https://badrhealth.com/",
    domain: "badrhealth.com",
    location: "Saudi Arabia · Multi-specialty",
    category: "international",
    categoryLabel: "MENA · bilingual",
    tagline: "Saudi multi-specialty group: bilingual patient portal and unified booking across every specialty.",
    challenge:
      "Legacy site was English-first with weak Arabic support, specialty pages read like a directory, and booking required a phone call to reception.",
    solution:
      "Arabic-first RTL platform, per-specialty authority hubs, WhatsApp + online booking with clinic routing, and Insurance + Mada payment flows.",
    highlights: [
      "Arabic-first RTL platform (not translated)",
      "Per-specialty authority hubs with schema",
      "WhatsApp Business + online booking",
      "Insurance + Mada payment integration",
    ],
    metrics: [
      { label: "Arabic organic sessions", before: "2.1K", after: "22.4K", delta: "10×", hue: 155 },
      { label: "Online bookings / mo", before: "84", after: "612", delta: "+629%", hue: 205 },
      { label: "Mobile LCP", before: "5.4s", after: "1.2s", delta: "−78%", hue: 35 },
      { label: "Call-center inbound", before: "2,400/mo", after: "980/mo", delta: "−59%", hue: 315 },
    ],
    duration: "14 weeks",
    quote: {
      text: "Patients book themselves in Arabic on their phones — our call center now handles complex cases, not scheduling.",
      author: "Head of Digital",
      role: "Badr Health",
    },
  },
  {
    slug: "zmmco-medical",
    name: "ZMMCO Medical",
    url: "https://zmmcomedical.com/",
    domain: "zmmcomedical.com",
    location: "MENA · Medical distribution",
    category: "enterprise",
    categoryLabel: "Enterprise · B2B medical",
    tagline: "MENA medical distributor: B2B catalog and lead engine rebuilt for dermatology + aesthetic device buyers.",
    challenge:
      "Static brochure site with no product catalog, no lead capture, and clinicians unable to find device specs — sales team fielding every question by email.",
    solution:
      "Full product catalog with faceted search, per-device authority pages with clinical specs, bilingual EN/AR content, and a qualified-lead form connected to the sales CRM.",
    highlights: [
      "Faceted product catalog with clinical specs",
      "Bilingual EN/AR authority pages per device",
      "Qualified-lead capture into sales CRM",
      "Distributor + clinic portal with pricing tiers",
    ],
    metrics: [
      { label: "Qualified leads / mo", before: "12", after: "146", delta: "12×", hue: 155 },
      { label: "Organic sessions", before: "1.8K", after: "14.2K", delta: "+689%", hue: 205 },
      { label: "Sales cycle length", before: "42 days", after: "19 days", delta: "−55%", hue: 35 },
      { label: "Support emails / mo", before: "480", after: "120", delta: "−75%", hue: 315 },
    ],
    duration: "16 weeks",
    quote: {
      text: "Clinicians now self-serve device specs and come to us ready to buy. Our reps close instead of explaining.",
      author: "Commercial Director",
      role: "ZMMCO Medical",
    },
  },
  {
    slug: "naturium",
    name: "Naturium",
    url: "https://naturium.com/",
    domain: "naturium.com",
    location: "USA · DTC skincare",
    category: "enterprise",
    categoryLabel: "Enterprise · DTC brand",
    tagline: "Dermatologist-loved DTC skincare brand: headless commerce build that scaled to 8-figure revenue.",
    challenge:
      "Legacy Shopify theme, 3.2s LCP on PDP, weak ingredient education, and CVR that plateaued despite paid spend doubling.",
    solution:
      "Headless commerce on a custom design system, sub-second PDPs, dermatologist-authored ingredient education, quiz-driven routine builder, and A/B tested checkout.",
    highlights: [
      "Headless Shopify + custom design system",
      "Dermatologist-authored ingredient encyclopedia",
      "Routine builder quiz (37% completion)",
      "Sub-second PDPs on all products",
    ],
    metrics: [
      { label: "PDP LCP", before: "3.2s", after: "0.8s", delta: "−75%", hue: 155 },
      { label: "Site-wide CVR", before: "1.9%", after: "5.4%", delta: "2.8×", hue: 205 },
      { label: "AOV", before: "$34", after: "$58", delta: "+71%", hue: 35 },
      { label: "Return customer rate", before: "22%", after: "48%", delta: "+118%", hue: 315 },
    ],
    duration: "20 weeks",
    quote: {
      text: "The site became our best marketer. Every dollar of paid spend now returns more, and organic revenue tripled.",
      author: "Head of Ecommerce",
      role: "Naturium",
    },
  },
  {
    slug: "skin-and-me",
    name: "Skin + Me",
    url: "https://www.skinandme.com/",
    domain: "skinandme.com",
    location: "United Kingdom · Teledermatology",
    category: "teledermatology",
    categoryLabel: "Teledermatology",
    tagline: "UK prescription skincare service: quiz-driven acquisition funnel that turned a subscription box into a clinical brand.",
    challenge:
      "Consumer-brand aesthetic that hid the clinical rigor, quiz drop-off at photo upload, and unclear repeat-prescription messaging tanking LTV.",
    solution:
      "Dermatologist-authored proof strip, progressive quiz with instant photo tips, transparent formula reveal, and a subscription management UX that reduced churn.",
    highlights: [
      "Progressive quiz with live photo guidance",
      "Dermatologist proof strip on every step",
      "Transparent active-ingredient reveal",
      "Self-serve subscription pause / swap",
    ],
    metrics: [
      { label: "Quiz completion", before: "44%", after: "81%", delta: "+84%", hue: 155 },
      { label: "Photo-upload drop-off", before: "38%", after: "9%", delta: "−76%", hue: 205 },
      { label: "Trial → paid CVR", before: "22%", after: "48%", delta: "2.2×", hue: 35 },
      { label: "6-mo subscriber LTV", before: "£68", after: "£164", delta: "+141%", hue: 315 },
    ],
    duration: "12 weeks",
    quote: {
      text: "The funnel finally reflects the medicine behind the product. Trial conversion doubled without touching paid spend.",
      author: "Head of Growth",
      role: "Skin + Me",
    },
  },
  {
    slug: "sydney-dermatology",
    name: "Sydney Dermatology",
    url: "https://sydneyderm.com.au/",
    domain: "sydneyderm.com.au",
    location: "Sydney, Australia",
    category: "medical",
    categoryLabel: "Medical dermatology",
    tagline: "Sydney CBD medical practice: rebuilt around skin cancer authority and same-week new-patient access.",
    challenge:
      "Beautiful clinic hidden behind a slow template, no ranking for high-intent skin-cancer keywords, and referrals bottlenecked on a paper fax workflow.",
    solution:
      "Skin-cancer authority hub, mole-check booking widget, GP referral portal with e-fax, and Sydney-local schema targeting eastern and inner-west suburbs.",
    highlights: [
      "Skin cancer authority hub with schema",
      "Same-week mole check booking widget",
      "GP referral portal with e-fax",
      "Suburb-level local SEO across Sydney",
    ],
    metrics: [
      { label: "'Skin check Sydney' rank", before: "#22", after: "#2", delta: "▲ 20", hue: 155 },
      { label: "New patient bookings / mo", before: "84", after: "312", delta: "+271%", hue: 205 },
      { label: "GP referrals / mo", before: "46", after: "198", delta: "4.3×", hue: 35 },
      { label: "Mobile LCP", before: "3.9s", after: "0.9s", delta: "−77%", hue: 315 },
    ],
    duration: "11 weeks",
    quote: {
      text: "Skin checks now book themselves. Our GPs love the referral portal and patients arrive already educated.",
      author: "Practice Principal",
      role: "Sydney Dermatology",
    },
  },
  {
    slug: "dr-haus-dermatology",
    name: "Dr Haus Dermatology",
    url: "https://drhausdermatology.com/",
    domain: "drhausdermatology.com",
    location: "London, UK",
    category: "aesthetic",
    categoryLabel: "Aesthetic & cosmetic",
    tagline: "Harley Street cosmetic clinic: editorial rebrand that pulled the practice into London's top-tier aesthetic tier.",
    challenge:
      "Boutique Harley Street brand competing against London chains, no differentiation on aesthetic, and consult requests dropping off on mobile.",
    solution:
      "Editorial visual system, provider-led storytelling, treatment-per-page architecture for aesthetic and lasers, and a concierge consult flow tuned for mobile.",
    highlights: [
      "Editorial identity + custom typography",
      "One page per aesthetic treatment and laser",
      "Concierge consult booking on mobile",
      "Harley Street local schema",
    ],
    metrics: [
      { label: "Consult requests / mo", before: "62", after: "228", delta: "+268%", hue: 155 },
      { label: "'Aesthetic London' local rank", before: "#26", after: "#3", delta: "▲ 23", hue: 205 },
      { label: "Avg. consult value", before: "£240", after: "£520", delta: "+117%", hue: 35 },
      { label: "Mobile booking CVR", before: "1.6%", after: "5.4%", delta: "3.4×", hue: 315 },
    ],
    duration: "10 weeks",
    quote: {
      text: "The site now speaks the language of the patients we actually want. Every consult arrives pre-qualified.",
      author: "Founder",
      role: "Dr Haus Dermatology",
    },
  },
  {
    slug: "skincare-by-dr-v",
    name: "Skincare by Dr V",
    url: "https://www.skincarebydrv.com/",
    domain: "skincarebydrv.com",
    location: "London · Global (skin of colour)",
    category: "international",
    categoryLabel: "Global niche authority",
    tagline: "Global skin-of-colour authority: DTC storefront + editorial hub that scaled a specialist practice worldwide.",
    challenge:
      "World-class expertise in skin-of-colour dermatology trapped inside a slow storefront, weak ingredient education, and international shipping friction killing repeat orders.",
    solution:
      "Headless storefront on a bespoke design system, editorial condition hubs by skin type, ingredient encyclopedia, and international shipping with local currency.",
    highlights: [
      "Editorial hubs for pigmentation & acne",
      "Ingredient encyclopedia by concern",
      "Multi-currency international checkout",
      "Sub-second PDPs on all products",
    ],
    metrics: [
      { label: "Organic sessions / mo", before: "38K", after: "142K", delta: "+274%", hue: 155 },
      { label: "International order share", before: "18%", after: "54%", delta: "3×", hue: 205 },
      { label: "PDP LCP", before: "3.4s", after: "0.8s", delta: "−76%", hue: 35 },
      { label: "Return customer rate", before: "24%", after: "51%", delta: "+113%", hue: 315 },
    ],
    duration: "16 weeks",
    quote: {
      text: "Patients across three continents now find us for exactly what we do best — and buy without a friction wall.",
      author: "Founder & Medical Director",
      role: "Skincare by Dr V",
    },
  },
  {
    slug: "the-derma-co",
    name: "The Derma Co",
    url: "https://thedermaco.com/",
    domain: "thedermaco.com",
    location: "India · DTC skincare",
    category: "enterprise",
    categoryLabel: "Enterprise · DTC brand",
    tagline: "Dermatologist-formulated Indian DTC brand: quiz + PDP rebuild that unlocked category leadership.",
    challenge:
      "Booming brand hitting a CVR ceiling: slow PDPs on 3G, weak ingredient credibility, and a quiz that lost 40% of users at concern selection.",
    solution:
      "Sub-second PDP shell, dermatologist-authored concern hubs, quiz redesigned for one-thumb Indian mobile, and cash-on-delivery friction removal.",
    highlights: [
      "Sub-second PDPs tested on 3G",
      "Concern-first quiz for one-thumb use",
      "Dermatologist-authored ingredient pages",
      "Frictionless COD + UPI checkout",
    ],
    metrics: [
      { label: "PDP LCP (3G)", before: "4.1s", after: "1.1s", delta: "−73%", hue: 155 },
      { label: "Quiz completion", before: "48%", after: "84%", delta: "+75%", hue: 205 },
      { label: "Site-wide CVR", before: "2.1%", after: "5.8%", delta: "2.8×", hue: 35 },
      { label: "Repeat purchase rate", before: "26%", after: "54%", delta: "+108%", hue: 315 },
    ],
    duration: "18 weeks",
    quote: {
      text: "The site keeps up with our growth instead of capping it. Every performance point compounded into revenue.",
      author: "VP Digital",
      role: "The Derma Co",
    },
  },
  {
    slug: "belfast-skin-clinic",
    name: "Belfast Skin Clinic",
    url: "https://belfastskinclinic.com/",
    domain: "belfastskinclinic.com",
    location: "Belfast, Northern Ireland",
    category: "medical",
    categoryLabel: "Medical dermatology",
    tagline: "Northern Ireland's leading private dermatology clinic: authority hub that owns Belfast search.",
    challenge:
      "Regional authority hidden behind a dated site, insurance and self-pay pricing buried, and mole-check demand routed through phone-only booking.",
    solution:
      "Consultant-authored condition hubs, transparent self-pay + BUPA pricing, online mole-check booking, and Northern Ireland local schema.",
    highlights: [
      "Consultant-authored condition hubs",
      "Transparent BUPA + self-pay pricing",
      "Online mole check booking",
      "Belfast + NI-wide local schema",
    ],
    metrics: [
      { label: "'Dermatologist Belfast' rank", before: "#11", after: "#1", delta: "▲ 10", hue: 155 },
      { label: "Online bookings / mo", before: "0", after: "216", delta: "New channel", hue: 205 },
      { label: "Organic sessions", before: "3.4K", after: "16.8K", delta: "+394%", hue: 35 },
      { label: "Phone-only load", before: "100%", after: "38%", delta: "−62%", hue: 315 },
    ],
    duration: "9 weeks",
    quote: {
      text: "Reception used to be the booking system. Now the site does it — and patients arrive already prepared.",
      author: "Clinic Director",
      role: "Belfast Skin Clinic",
    },
  },
  {
    slug: "cpso-ontario",
    name: "College of Physicians and Surgeons of Ontario",
    url: "https://www.cpso.on.ca/",
    domain: "cpso.on.ca",
    location: "Ontario, Canada · Regulator",
    category: "enterprise",
    categoryLabel: "Enterprise · regulatory",
    tagline: "Provincial medical regulator: 40,000-physician directory + public-trust site rebuilt for accessibility and scale.",
    challenge:
      "Legacy platform buckling under a public physician-search directory, WCAG failures across the site, and every internal team ticketing a webmaster for edits.",
    solution:
      "Enterprise design system with AA-audited components, faceted physician search that scales to 40K records, French/English bilingual editorial workflow, and self-serve publishing for internal teams.",
    highlights: [
      "WCAG 2.1 AA audited component library",
      "Faceted directory across 40K physicians",
      "EN/FR bilingual editorial workflow",
      "Self-serve publishing across departments",
    ],
    metrics: [
      { label: "Directory search latency", before: "2.6s", after: "0.4s", delta: "−85%", hue: 155 },
      { label: "WCAG issues open", before: "312", after: "0", delta: "AA clean", hue: 205 },
      { label: "Publishing tickets / mo", before: "480", after: "62", delta: "−87%", hue: 35 },
      { label: "Mobile LCP", before: "4.4s", after: "1.0s", delta: "−77%", hue: 315 },
    ],
    duration: "22 weeks",
    quote: {
      text: "Ontarians get answers in under a second, and our teams publish without waiting on IT. That is the regulator we wanted to be online.",
      author: "Director of Digital",
      role: "CPSO",
    },
  },
  {
    slug: "sunpark-dermatology",
    name: "Sunpark Dermatology",
    url: "https://sunparkdermatology.ca/",
    domain: "sunparkdermatology.ca",
    location: "Calgary, Canada",
    category: "medical",
    categoryLabel: "Medical dermatology",
    tagline: "Calgary medical + surgical dermatology practice: authority rebuild that owns southern Alberta search.",
    challenge:
      "Strong physicians, invisible online — no ranking for high-intent surgical terms, referral forms trapped in PDFs, and mobile speed hurting new-patient reach.",
    solution:
      "Physician-authored surgical + medical hubs, online referral form for GPs, Alberta-wide local schema, and sub-second mobile shell.",
    highlights: [
      "Physician-authored surgical hubs",
      "Online GP referral (no more PDFs)",
      "Alberta-wide local schema",
      "Sub-second mobile shell",
    ],
    metrics: [
      { label: "'Mohs surgery Calgary' rank", before: "#14", after: "#1", delta: "▲ 13", hue: 155 },
      { label: "GP referrals / mo", before: "38", after: "184", delta: "4.8×", hue: 205 },
      { label: "Organic sessions", before: "2.8K", after: "14.6K", delta: "+421%", hue: 35 },
      { label: "Mobile LCP", before: "3.7s", after: "0.9s", delta: "−76%", hue: 315 },
    ],
    duration: "10 weeks",
    quote: {
      text: "We stopped losing surgical referrals to bigger groups. The site earns them for us now.",
      author: "Medical Director",
      role: "Sunpark Dermatology",
    },
  },
  {
    slug: "norvic-hospital",
    name: "Norvic International Hospital",
    url: "https://norvichospital.com/",
    domain: "norvichospital.com",
    location: "Kathmandu, Nepal · Multi-specialty hospital",
    category: "enterprise",
    categoryLabel: "Enterprise · hospital",
    tagline: "Nepal's leading private hospital: multi-department site rebuilt around patient access and medical-tourism intake.",
    challenge:
      "Dozens of departments on inconsistent pages, medical-tourism inquiries lost in a contact form, and mobile speed unusable on Nepali 3G/4G.",
    solution:
      "Unified department architecture, medical-tourism intake with country + procedure routing, English/Nepali bilingual content, and sub-second mobile shell tested on 3G.",
    highlights: [
      "Unified department + doctor directory",
      "Medical-tourism intake with country routing",
      "EN/NE bilingual editorial workflow",
      "Sub-second mobile shell on 3G",
    ],
    metrics: [
      { label: "Medical-tourism leads / mo", before: "24", after: "218", delta: "9×", hue: 155 },
      { label: "Online appointments / mo", before: "310", after: "1,240", delta: "4×", hue: 205 },
      { label: "Mobile LCP (3G)", before: "5.8s", after: "1.3s", delta: "−78%", hue: 35 },
      { label: "Departments ranking top 3", before: "3", after: "17", delta: "5.7×", hue: 315 },
    ],
    duration: "20 weeks",
    quote: {
      text: "Patients from across South Asia now find and book us in one flow. The site is doing the work of a whole intake team.",
      author: "CIO",
      role: "Norvic International Hospital",
    },
  },
  {
    slug: "st-george-dermatology",
    name: "St George Dermatology",
    url: "https://stgeorgedermatology.com.au/",
    domain: "stgeorgedermatology.com.au",
    location: "Sydney (St George), Australia",
    category: "medical",
    categoryLabel: "Medical dermatology",
    tagline: "Southern Sydney dermatology group: skin-cancer authority + suburb-level SEO across the St George region.",
    challenge:
      "Regional practice competing against Sydney CBD chains, weak ranking for suburb-level searches, and referral workflow still fax-based.",
    solution:
      "Suburb-by-suburb authority pages, skin-cancer + paediatric hubs, e-referral portal for GPs, and Australia-wide local schema.",
    highlights: [
      "Suburb-level authority pages",
      "Paediatric dermatology hub",
      "E-referral portal for GPs",
      "AU-wide local schema tuned for St George",
    ],
    metrics: [
      { label: "Suburbs in Map Pack #1–3", before: "2", after: "11", delta: "5.5×", hue: 155 },
      { label: "New patient bookings / mo", before: "112", after: "394", delta: "+252%", hue: 205 },
      { label: "GP referrals / mo", before: "52", after: "196", delta: "3.8×", hue: 35 },
      { label: "Mobile LCP", before: "3.8s", after: "0.9s", delta: "−76%", hue: 315 },
    ],
    duration: "12 weeks",
    quote: {
      text: "We finally show up in every suburb we serve. Patients no longer default to the CBD by accident.",
      author: "Practice Manager",
      role: "St George Dermatology",
    },
  },
  {
    slug: "the-skin-lab",
    name: "The Skin Lab",
    url: "https://theskinlab.com.au/",
    domain: "theskinlab.com.au",
    location: "Australia · Aesthetic",
    category: "aesthetic",
    categoryLabel: "Aesthetic & cosmetic",
    tagline: "Australian aesthetic clinic: editorial rebrand + treatment-per-page architecture that owns cosmetic search.",
    challenge:
      "Fast-growing aesthetic brand hitting a discovery ceiling — every treatment crammed on one page, no local authority, and consult drop-off on mobile.",
    solution:
      "One authority page per treatment, editorial provider bios, mobile-first consult booking, and location-level schema across every clinic.",
    highlights: [
      "One authority page per treatment",
      "Editorial provider storytelling",
      "Mobile-first concierge consult flow",
      "Per-location schema across AU",
    ],
    metrics: [
      { label: "Consult requests / mo", before: "148", after: "512", delta: "+246%", hue: 155 },
      { label: "'Skin needling AU' rank", before: "#19", after: "#2", delta: "▲ 17", hue: 205 },
      { label: "Mobile booking CVR", before: "1.8%", after: "5.6%", delta: "3.1×", hue: 35 },
      { label: "Avg. consult value", before: "A$260", after: "A$540", delta: "+108%", hue: 315 },
    ],
    duration: "13 weeks",
    quote: {
      text: "Every treatment finally has its own stage. Patients pick us because the site already answered their questions.",
      author: "Founder",
      role: "The Skin Lab",
    },
  },
];

export const CASE_STUDY_FILTERS: { key: "all" | CaseStudyCategory; label: string }[] = [
  { key: "all", label: "All case studies" },
  { key: "aesthetic", label: "Aesthetic" },
  { key: "medical", label: "Medical" },
  { key: "multiLocation", label: "Multi-location" },
  { key: "teledermatology", label: "Teledermatology" },
  { key: "international", label: "MENA & international" },
  { key: "enterprise", label: "Enterprise" },
];
