import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { CtaLabel } from "@/lib/cta";
import { buildHreflangLinks, localizedUrl, resolveRouteLanguage } from "@/lib/i18n-routing";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import {
  ArrowRight, CheckCircle2, Calendar, LineChart, Target, Users,
  Compass, Rocket, ClipboardList, TrendingUp, Sparkles,
  Stethoscope, Building2, Baby, Scissors, Plus, Minus, Quote, Star,
  BarChart3, Workflow, Megaphone, FileText, Search, X, PenTool, Code2, UserCog,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";
import { robotsContent } from "@/lib/index-allowlist";

/* Management page signature motif — a growth roadmap with milestones */
function RoadmapField({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 30, y: 180 }, { x: 90, y: 140 }, { x: 150, y: 160 },
    { x: 210, y: 100 }, { x: 270, y: 120 }, { x: 330, y: 60 },
  ];
  const path = nodes.map((n, i) => `${i === 0 ? "M" : "L"} ${n.x} ${n.y}`).join(" ");
  return (
    <svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <pattern id="rf-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="360" height="240" fill="url(#rf-grid)" />
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="6" fill="currentColor" opacity={0.15 + i * 0.12} />
          <circle cx={n.x} cy={n.y} r="2.5" fill="currentColor" />
        </g>
      ))}
      <circle r="4" fill="currentColor">
        <animateMotion dur="6s" repeatCount="indefinite" path={path} />
      </circle>
    </svg>
  );
}


const audiences = [
  { icon: Stethoscope },
  { icon: Building2 },
  { icon: Baby },
  { icon: Scissors },
];

const pillars = [
  { icon: Compass },
  { icon: FileText },
  { icon: Workflow },
  { icon: BarChart3 },
  { icon: Search },
  { icon: Megaphone },
];

const pod = [
  { icon: UserCog, grad: "from-brand-primary to-brand-primary/60" },
  { icon: PenTool, grad: "from-brand-primary/80 to-brand-primary/50" },
  { icon: FileText, grad: "from-brand-primary/70 to-brand-primary/40" },
  { icon: Search, grad: "from-brand-primary/85 to-brand-primary/55" },
  { icon: Code2, grad: "from-brand-primary/75 to-brand-primary/45" },
];

const comparisonMatrix = [
  { mgmt: true, maint: false, diy: false },
  { mgmt: "add_on", maint: true, diy: false },
  { mgmt: true, maint: false, diy: false },
  { mgmt: true, maint: false, diy: false },
  { mgmt: true, maint: false, diy: false },
  { mgmt: true, maint: "basic", diy: false },
  { mgmt: true, maint: false, diy: false },
  { mgmt: true, maint: true, diy: false },
];

export const Route = createFileRoute("/{-$lang}/dermatology-website-management-services")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params }) => {
    const lang = params?.lang ?? "en";
    const st = getStaticTranslation(lang, "management");
    return {
      meta: [
        { name: "robots", content: robotsContent(params.lang, "/dermatology-website-management-services") },
        { title: st?.meta?.title ?? "Dermatology Website Management Services — Growth-Focused Team" },
        { name: "description", content: st?.meta?.description ?? "Full-service dermatology website management: dedicated account manager, monthly content, SEO governance, A/B testing, conversion optimization, and executive reporting. Month-to-month." },
        { property: "og:title", content: st?.meta?.og?.title ?? "Dermatology Website Management Services — Your Growth Team" },
        { property: "og:description", content: st?.meta?.og?.description ?? "A dedicated pod runs your dermatology website every week — content, SEO, CRO, campaigns, and reporting. HIPAA-aware. Month-to-month." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-website-management-services" },
        { property: "og:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:image", content: "/__l5e/assets-v1/6e4e126d-30c1-493d-8b28-e1c7fe999d4f/hero-composition.webp" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: localizedUrl(resolveRouteLanguage(params.lang), "/dermatology-website-management-services") },
        ...buildHreflangLinks("/dermatology-website-management-services", params.lang),
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", serviceType: st?.json_ld?.service_type ?? "Dermatology Website Management Services", provider: { "@type": "Organization", name: st?.json_ld?.provider_name ?? "DermatologyWebsiteDesign.com" }, areaServed: "United States", offers: { "@type": "Offer", priceCurrency: "USD", price: "799", description: st?.json_ld?.offer_description ?? "Dermatology website management — starting price per month" } }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: (st?.faq?.items ?? []).map((f: any) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: ManagementPage,
});

function ManagementPage() {
  const { t } = useTranslation("management");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [tab, setTab] = useState<"content" | "seo" | "cro" | "reports">("content");
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2400);
    return () => clearInterval(id);
  }, []);

  const kpis = [
    { label: t("dashboard.kpis.bookings"), value: 214 + (tick % 6), delta: "+38%" },
    { label: t("dashboard.kpis.conversion"), value: `${(7.4 + (tick % 3) * 0.1).toFixed(1)}%`, delta: "+2.1pt" },
    { label: t("dashboard.kpis.rankings"), value: 62 + (tick % 4), delta: "+27" },
    { label: t("dashboard.kpis.session"), value: 148 + (tick % 8), delta: "+22%" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-background to-muted/30">
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.08] text-brand-primary" aria-hidden>
          <RoadmapField className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-primary/20 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.88fr)] xl:items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/5 px-3 py-1 text-xs font-semibold text-brand-primary">
              <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
            </div>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {t("hero.headline")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              {t("hero.subheading")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-lg shadow-brand-primary/20 transition hover:-translate-y-0.5">
                <CtaLabel /> <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" /> {t("hero.trust.account_manager")}</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" /> {t("hero.trust.contract")}</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" /> {t("hero.trust.hipaa")}</span>
            </div>
          </Reveal>

          {/* Growth Dashboard mock */}
          <Reveal delay={0.15}>
            <div className="relative rounded-3xl border border-border bg-card/95 p-5 shadow-2xl shadow-brand-primary/10 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-border/70 pb-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-primary/10 text-brand-primary"><LineChart className="h-4 w-4" /></div>
                  <div>
                    <div className="text-sm font-bold leading-none">{t("dashboard.title")}</div>
                    <div className="text-[11px] text-muted-foreground">{t("dashboard.status")}</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-primary/10 px-2 py-1 text-[10px] font-semibold text-brand-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-primary" /> {t("dashboard.badge")}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {kpis.map((k) => (
                  <div key={k.label} className="rounded-xl border border-border/70 bg-background/60 p-3">
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{k.label}</div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <div key={String(k.value)} className="animate-fade-in text-2xl font-black tabular-nums">{k.value}</div>
                      <div className="text-[11px] font-semibold text-brand-primary">{k.delta}</div>
                    </div>
                    <svg viewBox="0 0 80 20" className="mt-1.5 h-4 w-full text-brand-primary" aria-hidden>
                      <polyline
                        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        points={Array.from({ length: 8 }, (_, i) => {
                          const y = 14 - Math.abs(Math.sin((i + tick) * 0.7 + k.label.length) * 8);
                          return `${i * 11 + 2},${y.toFixed(1)}`;
                        }).join(" ")}
                      />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-border/70 bg-muted/40 p-3">
                <div className="mb-2 flex items-center justify-between text-[11px]">
                  <span className="font-semibold">{t("dashboard.roadmap.title")}</span>
                  <span className="tabular-nums text-muted-foreground">{3 + (tick % 3 === 2 ? 1 : 0)} {t("dashboard.roadmap.progress")}</span>
                </div>
                <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-border/70">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-primary/70 transition-[width] duration-700 ease-out"
                    style={{ width: `${60 + (tick % 3) * 8}%` }}
                  />
                </div>
                <div className="space-y-1.5">
                  {(t("dashboard.roadmap.items", { returnObjects: true }) as string[]).map((item, i) => {
                    const done = i < 3;
                    return (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${done ? "text-brand-primary" : "text-muted-foreground/40"}`} />
                      <span className={done ? "" : "text-muted-foreground"}>{item}</span>
                    </div>
                  )})}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CASE-STUDY STRIP */}
      <section className="border-b border-border/60 bg-card py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-4 md:items-center">
              <div className="md:col-span-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{t("stats.label")}</div>
                <h2 className="mt-2 text-2xl font-black leading-tight">{t("stats.headline")}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{t("stats.description")}</p>
              </div>
              {(t("stats.items", { returnObjects: true }) as any[]).map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-background p-5">
                  <div className="text-4xl font-black tracking-tight text-brand-primary sm:text-5xl">{s.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{t("pillars.label")}</div>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t("pillars.headline")}</h2>
              <p className="mt-3 text-muted-foreground">{t("pillars.subheading")}</p>
            </div>
          </Reveal>
          <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(t("pillars.items", { returnObjects: true }) as any[]).map((p, i) => {
              const Icon = pillars[i].icon;
              return (
              <RevealItem key={p.title}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl hover:shadow-brand-primary/5">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary transition group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </RevealItem>
            )})}
          </RevealStagger>
        </div>
      </section>

      {/* MEET YOUR POD */}
      <section className="border-b border-border/60 bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{t("pod.label")}</div>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t("pod.headline")}</h2>
              <p className="mt-3 text-muted-foreground">{t("pod.subheading")}</p>
            </div>
          </Reveal>
          <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {(t("pod.members", { returnObjects: true }) as any[]).map((m, i) => {
              const pData = pod[i];
              return (
              <RevealItem key={m.role}>
                <div className="h-full rounded-2xl border border-border bg-card p-5 text-center">
                  <div className={`mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br ${pData.grad} text-brand-primary-foreground`}>
                    <pData.icon className="h-7 w-7" />
                  </div>
                  <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-brand-primary">{m.role}</div>
                  <p className="mt-2 text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </RevealItem>
            )})}
          </RevealStagger>
        </div>
      </section>

      {/* MONTHLY SPRINT — dark band with connecting line */}
      <section className="relative overflow-hidden border-b border-border/60 bg-brand-primary py-20 text-brand-primary-foreground">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] text-brand-primary" aria-hidden>
          <RoadmapField className="h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-accent">{t("sprint.label")}</div>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t("sprint.headline")}</h2>
              <p className="mt-3 text-brand-primary-foreground/70">{t("sprint.subheading")}</p>
            </div>
          </Reveal>
          <div className="relative mt-16">
            {/* connecting line (desktop horizontal, mobile vertical) */}
            <div className="pointer-events-none absolute left-0 right-0 top-6 hidden md:block">
              <div className="mx-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-accent/70 to-transparent" />
            </div>
            <div className="pointer-events-none absolute bottom-4 left-[calc(1.5rem+1rem)] top-4 w-px bg-gradient-to-b from-transparent via-brand-accent/60 to-transparent md:hidden" />
            <div className="relative grid gap-5 md:grid-cols-4">
              {(t("sprint.phases", { returnObjects: true }) as any[]).map((w, i) => (
                <Reveal key={w.id} delay={i * 0.08}>
                  <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-accent text-xs font-black text-foreground ring-4 ring-brand-primary">
                        {i + 1}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brand-accent">{w.id}</div>
                    </div>
                    <h3 className="text-lg font-bold">{w.title}</h3>
                    <ul className="mt-3 space-y-2 text-sm text-brand-primary-foreground/80">
                      {(w.items as string[]).map((it) => (
                        <li key={it} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" /> {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* DELIVERABLE TABS */}
      <section className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{t("deliverables.label")}</div>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t("deliverables.headline")}</h2>
            </div>
          </Reveal>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-1 border-b border-border">
            {([
              { k: "content", l: t("deliverables.tabs.content.label"), icon: Calendar },
              { k: "seo", l: t("deliverables.tabs.seo.label"), icon: Search },
              { k: "cro", l: t("deliverables.tabs.cro.label"), icon: Target },
              { k: "reports", l: t("deliverables.tabs.reports.label"), icon: BarChart3 },
            ] as const).map((tb) => {
              const active = tab === tb.k;
              return (
                <button
                  key={tb.k}
                  onClick={() => setTab(tb.k as any)}
                  className={`relative inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold transition ${active ? "text-brand-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <tb.icon className="h-4 w-4" /> {tb.l}
                  <span
                    className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-primary transition-transform duration-300 origin-left ${active ? "scale-x-100" : "scale-x-0"}`}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>

          <div key={tab} className="mx-auto mt-8 max-w-4xl animate-fade-in rounded-3xl border border-border bg-card p-6 sm:p-8">
            {tab === "content" && (
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold">{t("deliverables.tabs.content.title")}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t("deliverables.tabs.content.desc")}</p>
                </div>
                <div className="space-y-2">
                  {(t("deliverables.tabs.content.items", { returnObjects: true }) as any[]).map((r) => (
                    <div key={r.text} className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 p-3">
                      <div className="w-14 shrink-0 text-xs font-bold text-brand-primary">{r.date}</div>
                      <div className="min-w-0 flex-1 truncate text-sm">{r.text}</div>
                      <span className="rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-semibold text-brand-primary">{r.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "seo" && (
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold">{t("deliverables.tabs.seo.title")}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t("deliverables.tabs.seo.desc")}</p>
                </div>
                <div className="space-y-2 text-sm">
                  {(t("deliverables.tabs.seo.items", { returnObjects: true }) as string[]).map((s) => (
                    <div key={s} className="flex items-start gap-2 rounded-xl border border-border/70 bg-background/60 p-3">
                      <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" /> {s}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "cro" && (
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold">{t("deliverables.tabs.cro.title")}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t("deliverables.tabs.cro.desc")}</p>
                </div>
                <div className="space-y-2 text-sm">
                  {(t("deliverables.tabs.cro.items", { returnObjects: true }) as any[]).map((e) => (
                    <div key={e.test} className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/60 p-3">
                      <span className="truncate">{e.test}</span>
                      <span className="shrink-0 rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-semibold text-brand-primary">{e.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "reports" && (
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold">{t("deliverables.tabs.reports.title")}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t("deliverables.tabs.reports.desc")}</p>
                </div>
                <div className="space-y-2 text-sm">
                  {(t("deliverables.tabs.reports.items", { returnObjects: true }) as string[]).map((s) => (
                    <div key={s} className="flex items-start gap-2 rounded-xl border border-border/70 bg-background/60 p-3">
                      <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" /> {s}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="border-b border-border/60 bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{t("audiences.label")}</div>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t("audiences.headline")}</h2>
            </div>
          </Reveal>
          <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(t("audiences.items", { returnObjects: true }) as any[]).map((a, i) => {
              const Icon = audiences[i].icon;
              return (
              <RevealItem key={a.label}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold">{a.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
                </div>
              </RevealItem>
            )})}
          </RevealStagger>
        </div>
      </section>

      {/* MEDICAL SERVICES */}
      <section className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{t("medical_services.label")}</div>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t("medical_services.headline")}</h2>
              <p className="mt-3 text-muted-foreground">{t("medical_services.subheading")}</p>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {(t("medical_services.list", { returnObjects: true }) as string[]).map((s) => (
              <div key={s} className="flex items-center gap-2 rounded-xl border border-border/70 bg-card px-3 py-2.5 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />
                <span className="truncate">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{t("comparison.label")}</div>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t("comparison.headline")}</h2>
              <p className="mt-3 text-muted-foreground">{t("comparison.subheading")}</p>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-border bg-card">
            <div className="overflow-x-auto">
              <div className="min-w-[520px]">
                <div className="grid grid-cols-[minmax(160px,1.6fr)_repeat(3,minmax(90px,1fr))] bg-muted/50 text-[11px] font-bold uppercase tracking-wider sm:text-xs">
                  <div className="px-4 py-4 sm:px-6">{t("comparison.headers.feature")}</div>
                  <div className="px-3 py-4 text-center text-brand-primary sm:px-4">{t("comparison.headers.mgmt")}</div>
                  <div className="px-3 py-4 text-center sm:px-4">{t("comparison.headers.maint")}</div>
                  <div className="px-3 py-4 text-center sm:px-4">{t("comparison.headers.diy")}</div>
                </div>
                {comparisonMatrix.map((matrixRow, i) => {
                  const featureName = (t("comparison.rows", { returnObjects: true }) as string[])[i];
                  return (
                  <div key={featureName} className={`grid grid-cols-[minmax(160px,1.6fr)_repeat(3,minmax(90px,1fr))] text-sm ${i % 2 === 1 ? "bg-muted/20" : ""}`}>
                    <div className="px-4 py-3.5 font-medium sm:px-6">{featureName}</div>
                    {(["mgmt", "maint", "diy"] as const).map((k) => {
                      const v = matrixRow[k];
                      return (
                        <div key={k} className="grid place-items-center px-3 py-3.5 sm:px-4">
                          {v === true && <CheckCircle2 className="h-5 w-5 text-brand-primary" />}
                          {v === false && <X className="h-5 w-5 text-muted-foreground/40" />}
                          {typeof v === "string" && (
                            <span className="rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-semibold text-brand-primary">{t(`comparison.tags.${v}`)}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )})}
              </div>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            {t("comparison.footer")} <Link to="/dermatology-website-maintenance-services" className="font-semibold text-brand-primary hover:underline">{t("comparison.footer_link")}</Link>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="border-b border-border/60 bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{t("plans.label")}</div>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t("plans.headline")}</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(t("plans.items", { returnObjects: true }) as any[]).map((p, i) => {
              const highlight = i === 1;
              return (
              <Reveal key={p.name}>
                <div className={`relative flex h-full flex-col rounded-3xl border p-7 ${highlight ? "border-brand-primary bg-card shadow-2xl shadow-brand-primary/10 md:-translate-y-2" : "border-border bg-card"}`}>
                  {highlight && (
                    <div className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-primary-foreground">
                      <Star className="h-3 w-3" /> {p.tag}
                    </div>
                  )}
                  {!highlight && <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.tag}</div>}
                  <h3 className="text-2xl font-black">{p.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-black">{p.price}</span>
                    {p.term && <span className="text-sm text-muted-foreground">{p.term}</span>}
                  </div>
                  {p.market_value && (
                    <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-[11px] leading-snug">
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                        <span className="min-w-0 font-semibold text-muted-foreground">
                          {p.market_label} <span className="tabular-nums line-through decoration-muted-foreground/50">{p.market_value}</span>
                        </span>
                        <span className="w-fit shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                          {p.savings}
                        </span>
                      </div>
                    </div>
                  )}
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {(p.features as string[]).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${highlight ? "bg-brand-primary text-brand-primary-foreground hover:-translate-y-0.5" : "border border-border bg-background hover:bg-muted"}`}
                  >
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            )})}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{t("testimonials.label")}</div>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t("testimonials.headline")}</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(t("testimonials.items", { returnObjects: true }) as any[]).map((tItem) => {
              const initials = tItem.name.split(" ").slice(1, 3).map((n: string) => n[0]).join("");
              return (
                <Reveal key={tItem.name}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                    <Quote className="h-6 w-6 text-brand-primary/30" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed">"{tItem.quote}"</p>
                    <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                      <div className="relative shrink-0 rounded-full p-[2px] bg-gradient-to-br from-brand-primary via-brand-primary/60 to-brand-accent">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-card text-xs font-black text-brand-primary">
                          {initials}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold">{tItem.name}</div>
                        <div className="truncate text-xs text-muted-foreground">{tItem.role}</div>
                      </div>
                      <div className="ml-auto flex shrink-0 gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-brand-primary text-brand-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border/60 bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{t("faq.label")}</div>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">{t("faq.headline")}</h2>
            </div>
          </Reveal>
          <div className="mt-10 space-y-3">
            {(t("faq.items", { returnObjects: true }) as any[]).map((f, i) => (
              <div key={f.q} className="rounded-2xl border border-border bg-card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold sm:text-base">{f.q}</span>
                  {openFaq === i ? <Minus className="h-4 w-4 shrink-0 text-brand-primary" /> : <Plus className="h-4 w-4 shrink-0 text-brand-primary" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-primary/10 via-card to-card p-10 text-center sm:p-14">
              <div className="mx-auto max-w-2xl">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary text-brand-primary-foreground">
                  <Rocket className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-3xl font-black sm:text-4xl">{t("cta_bottom.headline")}</h2>
                <p className="mt-3 text-muted-foreground">{t("cta_bottom.subheading")}</p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary-foreground shadow-lg shadow-brand-primary/20 transition hover:-translate-y-0.5">
                    <CtaLabel /> <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footer_considerations.prefix")}{" "}
          <Link to="/dermatology-website-maintenance-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_considerations.links.maintenance")}</Link>,{" "}
          <Link to="/dermatology-website-support-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_considerations.links.support")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/plan-packages-and-costs" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footer_considerations.links.full_management")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}
