import { finalizeSeoHead } from "@/lib/seo-head";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { CtaLabel } from "@/lib/cta";
import { localizedUrl, resolveRouteLanguage, buildHreflangLinks, useCurrentLang } from "@/lib/i18n-routing";
import { formatLocalizedNumber } from "@/lib/locale-format";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { DataStreamField } from "@/components/hero-motifs";
import { CountUp } from "@/components/count-up";
import {
  ArrowRight, Compass, Search, PenTool, Code2, Rocket, LineChart,
  ShieldCheck, Clock, MessageSquare, CheckCircle2, Sparkles, Star,
  ClipboardList, Users, Layers, Gauge, Zap, RefreshCcw, Play,
  FileSearch, Palette, Send, TrendingUp, Plus, Minus, Quote,
} from "lucide-react";
import heroImg from "@/assets/our-process-hero.jpg";
import { isValidUrlLang } from "@/i18n/languages";
import { robotsContent } from "@/lib/index-allowlist";

// ============================================================
// SEVEN-STEP PROCESS
// ============================================================
type Step = {
  n: string;
  slug: string;
  title: string;
  duration: string;
  icon: typeof Compass;
  tagline: string;
  summary: string;
  deliverables: string[];
  youProvide: string[];
  weDeliver: string[];
};

const steps: Step[] = [
  {
    n: "01",
    slug: "discover",
    title: "Discovery & Strategy",
    duration: "3–5 days",
    icon: Compass,
    tagline: "Understand the practice before we touch a pixel.",
    summary:
      "A 60-minute strategy session plus a written brief. We audit your current site, review competitors, and lock down your patient persona, service priorities, and conversion goals — before design begins.",
    deliverables: [
      "60-min strategy discovery session",
      "Competitor & keyword benchmark",
      "Patient persona + intent mapping",
      "Written project brief (PDF)",
      "Sitemap v1 + content outline",
    ],
    youProvide: ["Brand assets (if any)", "Access to current analytics", "3 competitor URLs you admire"],
    weDeliver: ["Written brief", "Scope-locked proposal", "Kickoff schedule"],
  },
  {
    n: "02",
    slug: "audit",
    title: "SEO & Technical Audit",
    duration: "2–3 days",
    icon: FileSearch,
    tagline: "Find the leaks before we build the boat.",
    summary:
      "For redesigns, we run a full crawl of your existing site — indexing, Core Web Vitals, backlink profile, HIPAA gaps, and conversion bottlenecks. New sites get a keyword + SERP opportunity map instead.",
    deliverables: [
      "Full technical SEO audit report",
      "Core Web Vitals scorecard",
      "Backlink & authority snapshot",
      "HIPAA + accessibility gap review",
      "Redirect plan for legacy URLs",
    ],
    youProvide: ["GSC + GA4 access (read-only)", "Existing CMS credentials"],
    weDeliver: ["Audit PDF", "Prioritized fix list", "Redirect map"],
  },
  {
    n: "03",
    slug: "design",
    title: "Design & Prototype",
    duration: "1–2 weeks",
    icon: Palette,
    tagline: "Custom design, no templates, dermatology-native.",
    summary:
      "We design a bespoke visual system — colors, type, iconography, and component library — then produce clickable Figma prototypes of every key page. Two rounds of revisions are baked in.",
    deliverables: [
      "Custom design system (Figma)",
      "Homepage + 3 template screens",
      "Interactive clickable prototype",
      "Mobile + tablet + desktop variants",
      "Two revision rounds included",
    ],
    youProvide: ["Feedback within 48 hours", "Approvals via Figma comments"],
    weDeliver: ["Design system", "Clickable prototype", "Design QA checklist"],
  },
  {
    n: "04",
    slug: "content",
    title: "Content & Copywriting",
    duration: "1–2 weeks (parallel)",
    icon: PenTool,
    tagline: "Medically accurate. Conversion-tuned.",
    summary:
      "Our medical copywriters draft every page in your voice — clinically accurate, patient-friendly, SEO-optimized. Runs in parallel with development so no timeline is added.",
    deliverables: [
      "SEO-optimized page copy (all pages)",
      "Treatment page content (up to 15)",
      "Doctor bios + credentials",
      "Meta titles + descriptions",
      "Schema markup (LocalBusiness, FAQ)",
    ],
    youProvide: ["Doctor interviews (30 min ea.)", "Review + factual approval"],
    weDeliver: ["Full site copy doc", "SEO metadata sheet", "Schema JSON-LD"],
  },
  {
    n: "05",
    slug: "build",
    title: "Development & Integration",
    duration: "2–4 weeks",
    icon: Code2,
    tagline: "Hand-coded. Fast. HIPAA-aware from line one.",
    summary:
      "Semantic HTML, accessible components, image optimization, and Core Web Vitals baked in. Integrations — booking, EHR, chat, analytics — are wired up and tested end-to-end.",
    deliverables: [
      "Production-grade code (no page builders)",
      "Booking / EHR integrations",
      "GA4 + Search Console setup",
      "Speed optimization (Lighthouse 95+)",
      "Accessibility (WCAG 2.1 AA)",
    ],
    youProvide: ["Integration API keys (as needed)", "Content approvals"],
    weDeliver: ["Staging URL", "Test credentials", "QA checklist"],
  },
  {
    n: "06",
    slug: "launch",
    title: "QA, Launch & Handoff",
    duration: "3–5 days",
    icon: Rocket,
    tagline: "Zero-downtime cutover. Documented handoff.",
    summary:
      "300-point pre-launch QA across browsers, devices, forms, and integrations. DNS cutover happens on your schedule with a rollback plan. You get a walkthrough video and a written playbook.",
    deliverables: [
      "300-point QA checklist",
      "Cross-browser + device testing",
      "Zero-downtime DNS cutover",
      "Redirects live + monitored",
      "45-min training walkthrough",
    ],
    youProvide: ["DNS access", "Approved launch window"],
    weDeliver: ["Live site", "Training video", "Ops playbook"],
  },
  {
    n: "07",
    slug: "grow",
    title: "Growth & Optimization",
    duration: "Ongoing (monthly)",
    icon: TrendingUp,
    tagline: "Launch is the start, not the finish line.",
    summary:
      "Monthly SEO, content, CRO experiments, and monitoring under your chosen bundle. Quarterly business reviews with your named account manager keep the roadmap on track.",
    deliverables: [
      "Monthly SEO + content work",
      "CRO experiments (A/B tested)",
      "Ranking + conversion dashboards",
      "Quarterly business review call",
      "Named account manager",
    ],
    youProvide: ["Monthly 30-min sync", "Approvals on strategic bets"],
    weDeliver: ["Monthly report", "Rankings dashboard", "Roadmap updates"],
  },
];

// ============================================================
// PRINCIPLES
// ============================================================
const principles = [
  { icon: ShieldCheck, title: "HIPAA-first architecture", desc: "Every form, every integration reviewed against HIPAA before it ships. No PHI in analytics." },
  { icon: Gauge,       title: "Lighthouse 95+ or we rebuild",     desc: "Performance is a launch requirement, not an after-thought. We hit it or we fix it — on us." },
  { icon: Users,       title: "One point of contact",             desc: "A named project lead from kickoff to handoff. No account-management merry-go-round." },
  { icon: RefreshCcw,  title: "Revisions built in",               desc: "Two design + two dev revision rounds included in every package. No nickel-and-diming." },
  { icon: Clock,       title: "Fixed timelines, weekly check-ins",desc: "Written schedule at kickoff. Weekly progress calls. Delays flagged early, not at the deadline." },
  { icon: MessageSquare, title: "Slack channel, not ticketing",   desc: "Direct message the team any time. Response SLA measured in hours, not days." },
];

// ============================================================
// COMPARISON
// ============================================================
const comparison = [
  { row: "Bespoke design (no templates)",         us: true,  agency: "Sometimes", freelance: false },
  { row: "Written scope + fixed price upfront",   us: true,  agency: "Hourly",    freelance: "Vague" },
  { row: "Medical copywriter on team",            us: true,  agency: "Extra fee", freelance: false },
  { row: "HIPAA compliance review pre-launch",    us: true,  agency: "Extra fee", freelance: false },
  { row: "Lighthouse 95+ guarantee",              us: true,  agency: false,       freelance: false },
  { row: "Named account manager (post-launch)",   us: true,  agency: "Enterprise only", freelance: false },
  { row: "Slack access to the actual team",       us: true,  agency: "Email only", freelance: "Sometimes" },
  { row: "Turnaround from kickoff → launch",      us: "4 to 6 weeks", agency: "3–6 months", freelance: "Unpredictable" },
];

// ============================================================
// FAQ
// ============================================================
const FAQS = [
  { q: "How long does the full process take?",                 a: "Most dermatology sites launch 4 to 6 weeks from kickoff. Starter (1-page) sites launch in 1 week. Enterprise multi-site builds take 10–14 weeks. You get a written schedule with weekly milestones at kickoff — no vague timelines." },
  { q: "What do you need from us during the build?",           a: "Roughly 3–5 hours per week: a 60-min kickoff call, weekly 30-min check-ins, doctor interviews for content (30 min each), and approvals via Figma / Slack within 48 hours. We do the heavy lifting — you approve, we ship." },
  { q: "Can we start with just design and add development later?", a: "Yes. We offer standalone discovery + design engagements ($3,900) that produce a Figma prototype and design system you own. You can implement it yourself, hire another dev shop, or return to us later for build — no lock-in either way." },
  { q: "What if we need changes after launch?",                a: "Every package includes 30 days of post-launch fixes free of charge. After that, ongoing edits are covered by a monthly bundle (Essential, Growth, Marketing, or Full-Stack) or billed à la carte. You'll always see the invoice before we do the work." },
  { q: "Do you write the medical content, or do we?",          a: "Our medical copywriters draft everything, then your medical director reviews and approves. You never start with a blank page. If you prefer to write in-house, we discount the package accordingly." },
  { q: "How do you handle HIPAA compliance?",                  a: "HIPAA-aware architecture is included in every build: no PHI in analytics, encrypted contact-form transport, masked field logging, and secure hosting. A signed BAA is included on Authority Brand and Enterprise plans, and available as an add-on elsewhere." },
];

// ============================================================
// ROUTE
// ============================================================
export const Route = createFileRoute("/{-$lang}/our-process")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: (args) => finalizeSeoHead((({ params }: typeof args) => {
    const lang = params.lang ?? "en";
    const st = getStaticTranslation(lang, "ourProcess");

    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/our-process") },
        { title: st?.meta?.title ?? "Our Process — 7-Step Dermatology Website Build | Discover → Launch → Grow" },
        { name: "description", content: st?.meta?.description ?? "The 7-step process we use to build dermatology websites: Discovery, SEO audit, design, content, development, launch, and growth. Fixed timelines, weekly check-ins, HIPAA-first, Lighthouse 95+ guaranteed." },
        { property: "og:title", content: st?.meta?.ogTitle ?? "Our Process — 7 Steps From Kickoff to Growth" },
        { property: "og:description", content: st?.meta?.ogDescription ?? "A transparent, fixed-timeline process for dermatology website design & SEO. See exactly what happens week by week — from discovery to ongoing growth." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/our-process" },
        { property: "og:image", content: heroImg },
        { name: "twitter:image", content: heroImg },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/our-process" }, ...buildHreflangLinks("/our-process", params.lang)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: st?.jsonLd?.breadcrumb?.home ?? "Home", item: localizedUrl(resolveRouteLanguage(params.lang), "/") },
              { "@type": "ListItem", position: 2, name: st?.jsonLd?.breadcrumb?.ourProcess ?? "Our Process", item: localizedUrl(resolveRouteLanguage(params.lang), "/our-process") },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: st?.jsonLd?.howTo?.name ?? "Dermatology Website Build Process",
            description: st?.jsonLd?.howTo?.description ?? "A 7-step process for launching a high-performing dermatology website.",
            step: (st?.sections?.steps?.items || steps).map((s: any, i: number) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.summary,
            })),
          })
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: (st?.sections?.faq?.items || FAQS).map((f: any) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a }
            })),
          })
        },
      ],
    };
  })(args), args.params.lang, "/our-process"),
  component: OurProcessPage,
});

// ============================================================
// PAGE
// ============================================================
function OurProcessPage() {
  const { t } = useTranslation("ourProcess");
  const lang = useCurrentLang();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [footerInView, setFooterInView] = useState(false);
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="min-h-dvh overflow-x-clip bg-background text-foreground pb-20 md:pb-0">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 500px at 15% -5%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(900px 500px at 100% 10%, color-mix(in oklch, var(--brand-accent), transparent 82%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%) 0%, transparent 45%)",
          }}
        />
        <DataStreamField className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-brand-primary opacity-25" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 md:pt-20 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <Reveal>
              <div className="max-w-2xl text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  <ClipboardList className="h-3.5 w-3.5" /> {t("hero.badge")}
                </span>
                <h1 className="mt-5 font-black leading-[1.05] tracking-tight text-[clamp(2rem,6vw,3.8rem)]">
                  {t("hero.title")} <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(120deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 55%))" }}
                  >
                    {t("hero.titleHighlight")}
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base md:text-lg lg:mx-0 mx-auto">
                  {t("hero.description")}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <a href="#steps" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]">
                    {t("hero.buttons.seeSteps")} <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link to="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary">
                    <Play className="h-4 w-4" /> <CtaLabel />
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div
                  aria-hidden
                  className="absolute -inset-6 -z-10 rounded-[2rem] opacity-70 blur-2xl"
                  style={{ background: "radial-gradient(60% 60% at 60% 40%, color-mix(in oklch, var(--brand-primary), transparent 60%), transparent 70%)" }}
                />
                <div className="overflow-hidden rounded-[2rem] border border-border/60 shadow-[0_40px_100px_-40px_rgba(15,23,42,0.35)]">
                  <img
                    src={heroImg}
                    alt={t("hero.imageAlt")}
                    width={1280}
                    height={1280}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="text-center sm:text-left">
              <div className="text-3xl font-black tracking-tight text-brand-primary md:text-4xl">
                <CountUp value={t(`stats.items.${i}.num`)} />{t(`stats.items.${i}.suffix`)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{t(`stats.items.${i}.label`)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNEY MAP (mini step nav) */}
      <section aria-label={t("sections.journeyMap.ariaLabel")} className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 md:pt-20 lg:hidden">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.journeyMap.subtitle")}</span>
            <h2 className="mt-2 font-black tracking-tight text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.1]">
              {t("sections.journeyMap.title")}
            </h2>
          </div>
        </Reveal>
        <div className="relative">
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-7 md:gap-2 lg:gap-3">
            {steps.map((s, i) => (
              <li key={i}>
                <a
                  href={`#step-${s.slug}`}
                  className="group flex h-full flex-col items-center rounded-2xl border border-border/70 bg-card p-3 text-center transition-all hover:-translate-y-1 hover:border-brand-primary/50 sm:p-4 md:p-2.5 lg:p-4"
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-full text-[13px] font-black tabular-nums transition-colors md:h-9 md:w-9 md:text-xs lg:h-11 lg:w-11 lg:text-sm ${i === 0 ? "bg-brand-primary text-brand-primary-foreground" : "bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-primary-foreground"}`}>
                    {t(`sections.steps.items.${i}.n`)}
                  </span>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground md:text-[9px] lg:mt-3 lg:text-[11px]">
                    {t(`sections.steps.items.${i}.duration`)}
                  </div>
                  <div className="mt-1 text-sm font-bold leading-tight tracking-tight md:text-[11px] md:leading-[1.15] lg:text-sm">{t(`sections.steps.items.${i}.title`)}</div>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* THE 7 STEPS — pinned scrollytelling on desktop */}
      <PinnedSteps />

      {/* THE 7 STEPS — deep cards (mobile + tablet only) */}
      <section id="steps" aria-label={t("sections.steps.ariaLabel")} className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 md:pt-24 lg:hidden">
        <div className="flex min-w-0 flex-col gap-16 md:gap-24">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} id={`step-${s.slug}`} className="scroll-mt-24">
                <div className="grid gap-8">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-primary text-brand-primary-foreground shadow-[0_16px_40px_-16px_color-mix(in_oklch,var(--brand-primary),transparent_30%)]">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary">
                          {t("sections.steps.step")} {t(`sections.steps.items.${i}.n`)} {t("sections.steps.bulletSeparator")} {t(`sections.steps.items.${i}.duration`)}
                        </div>
                        <h3 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">{t(`sections.steps.items.${i}.title`)}</h3>
                      </div>
                    </div>
                    <p className="mt-5 text-lg font-semibold text-foreground/90">"{t(`sections.steps.items.${i}.tagline`)}"</p>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{t(`sections.steps.items.${i}.summary`)}</p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-border/70 bg-card p-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">{t("sections.steps.labels.youProvide")}</div>
                        <ul className="mt-2 space-y-1.5">
                          {steps[i].youProvide.map((_, xIdx) => (
                            <li key={xIdx} className="flex items-start gap-2 text-xs text-foreground/90">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary" /> {t(`sections.steps.items.${i}.youProvide.${xIdx}`)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl border border-brand-primary/25 bg-brand-primary/5 p-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">{t("sections.steps.labels.weDeliver")}</div>
                        <ul className="mt-2 space-y-1.5">
                          {steps[i].weDeliver.map((_, xIdx) => (
                            <li key={xIdx} className="flex items-start gap-2 text-xs text-foreground/90">
                              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary" /> {t(`sections.steps.items.${i}.weDeliver.${xIdx}`)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div
                    className="relative overflow-hidden rounded-3xl border border-border/70 p-7 md:p-8"
                    style={{
                      background: "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 92%), color-mix(in oklch, var(--brand-accent), transparent 94%))",
                    }}
                  >
                    <div className="absolute right-4 top-4 text-[6rem] font-black leading-none tracking-tighter text-brand-primary/10 md:text-[8rem]">
                      {t(`sections.steps.items.${i}.n`)}
                    </div>
                    <div className="relative">
                      <div className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
                        {t("sections.steps.labels.deliverables")}
                      </div>
                      <ul className="mt-4 space-y-3">
                        {steps[i].deliverables.map((_, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-3 text-sm text-foreground/90">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-primary text-brand-primary-foreground">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </span>
                            <span>{t(`sections.steps.items.${i}.deliverables.${dIdx}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="relative mt-24 py-20 md:py-24" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 97%))" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.principles.subtitle")}</span>
              <h2 className="mt-2 font-black tracking-tight text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.1]">
                {t("sections.principles.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("sections.principles.description")}
              </p>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <RevealItem key={i} className="group rounded-3xl border border-border/70 bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/40">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-black tracking-tight">{t(`sections.principles.items.${i}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`sections.principles.items.${i}.desc`)}</p>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.comparison.subtitle")}</span>
            <h2 className="mt-2 font-black tracking-tight text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.1]">
              {t("sections.comparison.title")}
            </h2>
          </div>
        </Reveal>

        <Reveal>
          {/* Desktop grid (lg+) */}
          <div className="hidden overflow-hidden rounded-3xl border border-border/70 bg-card lg:block">
            <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center gap-2 border-b border-border/60 bg-muted/40 px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              <div>{t("sections.comparison.table.headers.matters")}</div>
              <div className="text-center text-brand-primary">{t("sections.comparison.table.headers.us")}</div>
              <div className="text-center">{t("sections.comparison.table.headers.agency")}</div>
              <div className="text-center">{t("sections.comparison.table.headers.freelance")}</div>
            </div>
            {comparison.map((row, i) => (
              <div key={i} className={`grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center gap-2 px-6 py-3.5 text-sm ${i % 2 === 1 ? "bg-muted/20" : ""}`}>
                <div className="font-medium text-foreground">{t(`sections.comparison.table.rows.${i}.row`)}</div>
                <Cell v={t(`sections.comparison.table.rows.${i}.us`) as unknown as boolean | string} accent />
                <Cell v={t(`sections.comparison.table.rows.${i}.agency`) as unknown as boolean | string} />
                <Cell v={t(`sections.comparison.table.rows.${i}.freelance`) as unknown as boolean | string} />
              </div>
            ))}
          </div>

          {/* Mobile + tablet stacked (<lg) */}
          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {comparison.map((row, i) => (
              <div key={i} className="rounded-2xl border border-border/70 bg-card p-5">
                <div className="text-sm font-bold tracking-tight">{t(`sections.comparison.table.rows.${i}.row`)}</div>
                <ul className="mt-3 divide-y divide-border/60 text-sm">
                  <MobileRow label={t("sections.comparison.table.headers.us")} v={t(`sections.comparison.table.rows.${i}.us`) as unknown as boolean | string} accent />
                  <MobileRow label={t("sections.comparison.table.headers.agency")} v={t(`sections.comparison.table.rows.${i}.agency`) as unknown as boolean | string} />
                  <MobileRow label={t("sections.comparison.table.headers.freelance")} v={t(`sections.comparison.table.rows.${i}.freelance`) as unknown as boolean | string} />
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 96%))" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-3xl border border-border/70 bg-card p-8 md:p-12">
              <Quote className="h-8 w-8 text-brand-primary/60" />
              <p className="mt-6 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                {t("sections.testimonial.quote")}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex text-brand-accent">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <div>
                  <div className="text-sm font-bold tracking-tight">{t("sections.testimonial.author")}</div>
                  <div className="text-xs text-muted-foreground">{t("sections.testimonial.role")}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("sections.faq.subtitle")}</span>
            <h2 className="mt-2 font-black tracking-tight text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.1]">
              {t("sections.faq.title")}
            </h2>
          </div>
        </Reveal>
        <FAQList />
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border border-brand-primary/25 p-8 md:p-12"
            style={{ background: "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 88%), color-mix(in oklch, var(--brand-accent), transparent 92%))" }}
          >
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-background/60 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-primary">
                  <Zap className="h-3.5 w-3.5" /> {t("sections.cta.badge")}
                </span>
                <h2 className="mt-4 font-black tracking-tight text-[clamp(1.75rem,4vw,2.4rem)] leading-[1.1]">
                  {t("sections.cta.title")}
                </h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  {t("sections.cta.description")}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link to="/contact" className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]">
                  <CtaLabel /> <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link to="/plan-packages-and-costs" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary">
                  <LineChart className="h-4 w-4" /> {t("sections.cta.buttons.pricing")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div ref={footerRef}>
        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("sections.footerLinks.prefix")}
          <Link to="/about" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("sections.footerLinks.about")}</Link>{t("sections.footerLinks.comma")}
          <Link to="/dermatology-websites-portfolio" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("sections.footerLinks.portfolio")}</Link>{t("sections.footerLinks.or")}
          <Link to="/plan-packages-and-costs" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("sections.footerLinks.pricing")}</Link>{t("sections.footerLinks.suffix")}
        </p>

        <SiteFooter />
      </div>

      {/* Sticky mobile CTA — hidden when footer is in view */}
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur transition-transform duration-300 md:hidden ${footerInView ? "translate-y-full" : "translate-y-0"}`}>
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">{t("sections.mobileCta.subtitle")}</div>
            <div className="truncate text-xs text-muted-foreground">{t("sections.mobileCta.title")}</div>
          </div>
          <Link to="/contact" className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-primary-foreground">
            <CtaLabel /> <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Helpers
// ============================================================
function Cell({ v, accent = false }: { v: boolean | string; accent?: boolean }) {
  if (v === true) {
    return (
      <div className="flex justify-center">
        <span className={`grid h-7 w-7 place-items-center rounded-full ${accent ? "bg-brand-primary text-brand-primary-foreground" : "bg-brand-primary/10 text-brand-primary"}`}>
          <CheckCircle2 className="h-4 w-4" />
        </span>
      </div>
    );
  }
  if (v === false) {
    return (
      <div className="flex justify-center">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-muted text-muted-foreground/60">
          <Minus className="h-4 w-4" />
        </span>
      </div>
    );
  }
  return (
    <div className={`text-center text-xs font-bold ${accent ? "text-brand-primary" : "text-muted-foreground"}`}>{v}</div>
  );
}

function MobileRow({ label, v, accent = false }: { label: string; v: boolean | string; accent?: boolean }) {
  return (
    <li className="flex items-center justify-between py-2.5">
      <span className={`text-xs font-bold uppercase tracking-widest ${accent ? "text-brand-primary" : "text-muted-foreground"}`}>{label}</span>
      <span>
        {v === true ? (
          <CheckCircle2 className={`h-4 w-4 ${accent ? "text-brand-primary" : "text-brand-primary/70"}`} />
        ) : v === false ? (
          <Minus className="h-4 w-4 text-muted-foreground/50" />
        ) : (
          <span className={`text-xs font-bold ${accent ? "text-brand-primary" : "text-foreground"}`}>{v}</span>
        )}
      </span>
    </li>
  );
}

function FAQList() {
  const { t } = useTranslation("ourProcess");
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col gap-3">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? "border-brand-primary/40 bg-card" : "border-border/70 bg-card"}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-bold tracking-tight text-foreground sm:text-base">{t(`sections.faq.items.${i}.q`)}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-brand-primary">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            {isOpen && <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{t(`sections.faq.items.${i}.a`)}</div>}
          </div>
        );
      })}
    </div>
  );
}

// Pinned scrollytelling section (lg+ only). One viewport per step, sticky content.
function PinnedSteps() {
  const { t } = useTranslation("ourProcess");
  const lang = useCurrentLang();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const wheelLockRef = useRef(false);
  const wheelTimerRef = useRef<number | null>(null);
  const programmaticRef = useRef(false);
  const programmaticTimerRef = useRef<number | null>(null);

  const setActiveStep = (idx: number) => {
    const safeIdx = Math.min(steps.length - 1, Math.max(0, idx));
    if (safeIdx === activeRef.current) return;
    activeRef.current = safeIdx;
    setActive(safeIdx);
  };

  const getScrollMetrics = () => {
    const el = wrapRef.current;
    if (!el || typeof window === "undefined") return null;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh;
    const start = window.scrollY + rect.top;
    return { rect, vh, total, start };
  };

  const scrollToStep = (idx: number, behavior: ScrollBehavior = "smooth") => {
    const metrics = getScrollMetrics();
    if (!metrics || metrics.total <= 0) return;
    const safeIdx = Math.min(steps.length - 1, Math.max(0, idx));
    setActiveStep(safeIdx);
    programmaticRef.current = true;
    window.scrollTo({
      top: metrics.start + metrics.total * (safeIdx / (steps.length - 1)),
      behavior,
    });
    if (programmaticTimerRef.current) window.clearTimeout(programmaticTimerRef.current);
    programmaticTimerRef.current = window.setTimeout(() => {
      programmaticRef.current = false;
    }, 900);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const onScroll = () => {
      if (raf || programmaticRef.current) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = wrapRef.current;
        if (!el || !mq.matches) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        if (total <= 0) return;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = scrolled / total;
        const idx = Math.min(steps.length - 1, Math.round(p * (steps.length - 1)));
        setActiveStep(idx);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");

    const onWheel = (event: WheelEvent) => {
      if (!mq.matches || Math.abs(event.deltaY) < 8) return;
      const metrics = getScrollMetrics();
      if (!metrics || metrics.total <= 0) return;

      const isPinned = metrics.rect.top <= 1 && metrics.rect.bottom >= metrics.vh - 1;
      if (!isPinned) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const current = activeRef.current;

      if ((direction < 0 && current === 0) || (direction > 0 && current === steps.length - 1)) {
        return;
      }

      event.preventDefault();

      if (wheelLockRef.current) return;
      wheelLockRef.current = true;
      scrollToStep(current + direction);

      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 850);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
      if (programmaticTimerRef.current) window.clearTimeout(programmaticTimerRef.current);
    };
  }, []);


  const s = steps[active];
  const Icon = s.icon;
  const railPct = Math.min(100, (active / (steps.length - 1)) * 100);

  return (
    <section id="steps" aria-label={t("sections.steps.ariaLabel")} className="relative hidden lg:block">
      <div ref={wrapRef} className="relative" style={{ height: `${steps.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Evolving background per step */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-700"
            style={{
              background: `radial-gradient(900px 500px at ${15 + active * 12}% ${20 + (active % 2) * 40}%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 60%), radial-gradient(700px 500px at ${85 - active * 8}% ${80 - (active % 2) * 30}%, color-mix(in oklch, var(--brand-accent), transparent 86%), transparent 60%)`,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            {/* Header + progress rail */}
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
                  {t("sections.steps.subtitle")}
                </span>
                <h2 className="mt-2 font-black tracking-tight text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.05]">
                  {t("sections.steps.title")}
                </h2>
              </div>
              <div className="hidden text-right md:block">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {t("sections.steps.step")} <span className="tabular-nums text-foreground">{t(`sections.steps.items.${active}.n`)}</span>
                  <span className="mx-1 opacity-40">{t("sections.steps.divider")}</span>
                  <span className="tabular-nums">{t("sections.steps.total")}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{t(`sections.steps.items.${active}.duration`)}</div>
              </div>
            </div>

            {/* Horizontal step ticks */}
            <div className="relative mb-10">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border/70" />
              <div
                className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-brand-primary transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: `${railPct}%` }}

              />
              <ol className="relative flex items-center justify-between">
                {steps.map((_, i) => {
                  const isActive = i === active;
                  const isDone = i < active;
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => scrollToStep(i)}
                        aria-label={`${t(`sections.steps.items.${i}.title`)} — ${t("sections.steps.step")} ${t(`sections.steps.items.${i}.n`)}`}
                        className={`grid h-9 w-9 place-items-center rounded-full border-2 bg-background text-[10px] font-black tabular-nums transition-all ${isActive
                            ? "scale-110 border-brand-primary bg-brand-primary text-brand-primary-foreground shadow-[0_0_0_6px_color-mix(in_oklch,var(--brand-primary),transparent_86%)]"
                            : isDone
                              ? "border-brand-primary text-brand-primary"
                              : "border-border text-muted-foreground"
                          }`}
                      >
                        {isDone ? <CheckCircle2 className="h-4 w-4" /> : t(`sections.steps.items.${i}.n`)}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Content — crossfade on step change */}
            <div key={active} className="grid animate-in fade-in gap-10 duration-700 ease-out lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14">
              {/* Left: narrative */}
              <div className="relative min-w-0">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-4 -top-14 select-none text-[12rem] font-black leading-none tracking-tighter text-brand-primary/[0.06] xl:text-[16rem]"
                >
                  {t(`sections.steps.items.${active}.n`)}
                </div>
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-primary text-brand-primary-foreground shadow-[0_16px_40px_-16px_color-mix(in_oklch,var(--brand-primary),transparent_30%)]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                        {t("sections.steps.step")} {t(`sections.steps.items.${active}.n`)} {t("sections.steps.bulletSeparator")} {t(`sections.steps.items.${active}.duration`)}
                      </div>
                      <h3 className="mt-1 text-3xl font-black tracking-tight xl:text-4xl">{t(`sections.steps.items.${active}.title`)}</h3>
                    </div>
                  </div>
                  <p className="mt-6 text-xl font-semibold text-foreground/90">"{t(`sections.steps.items.${active}.tagline`)}"</p>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{t(`sections.steps.items.${active}.summary`)}</p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/70 bg-card/70 p-4 backdrop-blur">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">{t("sections.steps.labels.youProvide")}</div>
                      <ul className="mt-2 space-y-1.5">
                        {steps[active].youProvide.map((_, xIdx) => (
                          <li key={xIdx} className="flex items-start gap-2 text-xs text-foreground/90">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary" /> {t(`sections.steps.items.${active}.youProvide.${xIdx}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-brand-primary/25 bg-brand-primary/5 p-4 backdrop-blur">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">{t("sections.steps.labels.weDeliver")}</div>
                      <ul className="mt-2 space-y-1.5">
                        {steps[active].weDeliver.map((_, xIdx) => (
                          <li key={xIdx} className="flex items-start gap-2 text-xs text-foreground/90">
                            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary" /> {t(`sections.steps.items.${active}.weDeliver.${xIdx}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: deliverables card */}
              <div
                className="relative overflow-hidden rounded-3xl border border-border/70 p-8 shadow-[0_40px_100px_-40px_rgba(15,23,42,0.25)]"
                style={{
                  background: "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), transparent 90%), color-mix(in oklch, var(--brand-accent), transparent 93%))",
                }}
              >
                <div className="absolute -right-6 -top-8 text-[11rem] font-black leading-none tracking-tighter text-brand-primary/10">
                  {t(`sections.steps.items.${active}.n`)}
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between border-b border-border/60 pb-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
                      {t("sections.steps.labels.deliverables")}
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.15em] text-brand-primary">
                      {formatLocalizedNumber(steps[active].deliverables.length, lang)} {t("sections.steps.labels.items")}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {steps[active].deliverables.map((_, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3 text-sm text-foreground/90">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-primary text-[10px] font-black text-brand-primary-foreground">
                          {formatLocalizedNumber(dIdx + 1, lang, 2)}
                        </span>
                        <span>{t(`sections.steps.items.${active}.deliverables.${dIdx}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sticky step-progress rail (xl+ only). Tracks which #step-{slug} is in view.
function StepsRail() {
  const { t } = useTranslation("ourProcess");
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = steps
      .map((s) => document.getElementById(`step-${s.slug}`))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = els.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  const progress = ((active + 1) / steps.length) * 100;
  return (
    <aside aria-hidden className="hidden xl:block">
      <div className="sticky top-24">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary">
          {t("sections.progressRail.title")}
        </div>
        <div className="mt-2 text-sm font-semibold text-foreground">
          {t("sections.progressRail.step")} {t(`sections.steps.items.${active}.n`)} {t("sections.progressRail.of")}
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border/70">
          <div
            className="h-full rounded-full bg-brand-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <ol className="mt-6 space-y-1">
          {steps.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <li key={i}>
                <a
                  href={`#step-${s.slug}`}
                  className={`group flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors ${isActive ? "bg-brand-primary/10" : "hover:bg-muted/60"
                    }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[10px] font-black tabular-nums transition-all ${isActive
                        ? "border-brand-primary bg-brand-primary text-brand-primary-foreground"
                        : isDone
                          ? "border-brand-primary/60 bg-brand-primary/10 text-brand-primary"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                  >
                    {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : t(`sections.steps.items.${i}.n`)}
                  </span>
                  <span
                    className={`truncate text-xs font-semibold tracking-tight transition-colors ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                  >
                    {t(`sections.steps.items.${i}.title`)}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}
