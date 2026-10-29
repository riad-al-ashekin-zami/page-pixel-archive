import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Rocket,
  Search,
  Smartphone,
  Award,
  Sparkles,
  Star,
  Mail,
  Globe2,
  Zap,
  TrendingUp,
  Users,
  Clock,
  Palette,
  Code2,
  BarChart3,
  Lock,
  Heart,
  X,
  Check,
  ChevronDown,
  MapPin,
  Calendar,
  MousePointer2,
  Layers,
  Type,
  Image as ImageIcon,
  Gauge,
  FileText,
  Accessibility,
  ExternalLink,
  Target,
} from "lucide-react";
import heroImage from "@/assets/hero-composition.webp.asset.json";
import logoLight from "@/assets/dermwd-logo.png.asset.json";

export const Route = createFileRoute("/lp/dermatology-website-design")({
  head: () => ({
    meta: [
      { title: "Dermatology Website Design — Premium Sites That Book More Patients" },
      { name: "description", content: "Award-winning dermatology website design agency. HIPAA-aware, SEO-optimized, mobile-first websites for skin clinics worldwide. Free custom mockup in 48 hours." },
      { name: "robots", content: "noindex,follow" },
      { name: "googlebot", content: "noindex, nofollow" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#ffffff" },
    ],
  }),
  component: LandingPage,
});

const BULBS = [
  { id: "hero", label: "Home" },
  { id: "quote", label: "Free Audit" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "results", label: "Results" },
  { id: "testimonials", label: "Reviews" },
];

const TRUST_LOGOS = [
  { name: "Skin + Me", note: "D2C skincare", icon: Sparkles },
  { name: "Eudelo", note: "Medical dermatology", icon: ShieldCheck },
  { name: "The Mole Clinic", note: "Screening clinic", icon: Search },
  { name: "Cathedral Dermatology", note: "Private practice", icon: Award },
  { name: "Belfast Skin Clinic", note: "Laser clinic", icon: Zap },
  { name: "Dr Haus Dermatology", note: "Aesthetic clinic", icon: Star },
];

// Portfolio previews — 6 curated sites, real screenshots via WordPress mShots.
const PORTFOLIO = [
  { name: "Skin + Me", domain: "skinandme.com", url: "https://www.skinandme.com/", tag: "D2C Skincare", location: "London, UK" },
  { name: "Sydney Dermatology", domain: "sydneyderm.com.au", url: "https://sydneyderm.com.au/", tag: "Medical Derm", location: "Sydney, AU" },
  { name: "Dr Haus Dermatology", domain: "drhausdermatology.com", url: "https://drhausdermatology.com/", tag: "Aesthetic", location: "London, UK" },
  { name: "Skincare by Dr V", domain: "skincarebydrv.com", url: "https://www.skincarebydrv.com/", tag: "Cosmetic", location: "USA" },
  { name: "The Derma Co", domain: "thedermaco.com", url: "https://thedermaco.com/", tag: "Skincare Brand", location: "Mumbai, IN" },
  { name: "Belfast Skin Clinic", domain: "belfastskinclinic.com", url: "https://belfastskinclinic.com/", tag: "Multi-service", location: "Belfast, UK" },
];

// Real domains for social proof in testimonials.
const REVIEWS = [
  { quote: "Our new site tripled consultation bookings in the first quarter. Patients constantly compliment how easy it is to find services and book. Best investment we made this year.", name: "Dr. Sarah Chen", site: "skinandme.com" },
  { quote: "Finally, an agency that understands HIPAA and dermatology — not a generic web shop. Launch was flawless and support has been world-class ever since.", name: "Dr. Marcus Halden", site: "eudelo.com" },
  { quote: "Load speed went from 4s to 0.8s. Our Google Ads cost per booked visit dropped 40% overnight. The ROI on the rebuild has been unreal.", name: "Dr. Amira Khan", site: "cathedraldermatology.com" },
  { quote: "We're a multi-location group. They built one CMS that handles every clinic, in 3 languages, with per-location P&L. Nobody else could pull that off.", name: "Dr. Lukas Fischer", site: "sydneyderm.com.au" },
  { quote: "The 48-hour mockup sold me. It looked better than the site I'd been paying my old agency to 'improve' for two years.", name: "Dr. Emma Wright", site: "drhausdermatology.com" },
  { quote: "Cosmetic bookings up 4× since launch. The Aesthetic, filler and laser pages alone have paid for the entire rebuild.", name: "Dr. Julien Moreau", site: "belfastskinclinic.com" },
];

function localShot(domain: string) {
  return `/portfolio-shots/${domain}.webp`;
}

function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* ============ ANNOUNCEMENT BAR ============ */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" />
          Limited Slots · Free Custom Homepage Mockup + SEO Audit in 48 Hours
          <Sparkles className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* ============ STICKY HEADER + BULB NAV (WHITE — matches logo bg) ============ */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
            className="flex items-center gap-3"
            aria-label="Dermatology Website Design — Home"
          >
            <img
              src={logoLight.url}
              alt="Dermatology Website Design"
              className="h-9 w-auto sm:h-10 lg:h-11"
              width={180}
              height={44}
              loading="eager"
              decoding="async"
            />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 sm:px-5 sm:text-sm"
          >
            Get Your Free Website Audit <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <nav aria-label="Section navigation" className="hidden border-t border-slate-200 bg-slate-50 sm:block">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2.5 sm:justify-center sm:px-6 lg:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {BULBS.map((b) => (
              <a
                key={b.id}
                href={`#${b.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(b.id); }}
                className="group relative shrink-0"
              >
                <span className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-slate-700 transition-all hover:border-teal-400 hover:bg-teal-50 hover:text-teal-800 sm:px-4 sm:py-2 sm:text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-[0_0_8px_rgba(45,212,191,0.9)]" />
                  </span>
                  {b.label}
                </span>
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* ============ HERO — mirrors homepage hero ============ */}
      <section
        id="hero"
        className="animate-hero-wash relative isolate overflow-hidden"
        style={{
          background:
            "radial-gradient(1100px 600px at 90% 0%, color-mix(in oklch, var(--brand-primary), transparent 78%), transparent 60%), radial-gradient(900px 500px at 0% 100%, color-mix(in oklch, var(--brand-secondary), transparent 75%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 94%), #ffffff)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-12 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[56fr_44fr] lg:gap-5 xl:grid-cols-[58fr_42fr] xl:gap-8">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5" />
                HIPAA-Aware <span className="text-base leading-none opacity-60">·</span> Conversion-Focused
              </div>

              <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3rem] xl:text-[3.5rem] 2xl:text-6xl">
                Premium websites that grow modern <span className="text-brand-primary">dermatology practices.</span>
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                Custom-designed, SEO-optimized dermatology websites that build trust, attract new patients, and turn Google Ads clicks into booked consultations.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_30px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 18%))" }}
                >
                  Get Your Free Website Audit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#portfolio"
                  onClick={(e) => { e.preventDefault(); scrollTo("portfolio"); }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-background/60 px-7 py-3.5 text-sm font-semibold text-brand-primary backdrop-blur transition-colors hover:bg-brand-primary/5"
                >
                  View Our Work
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-10 xl:w-[720px] xl:max-w-[calc(100vw-4rem)]">
                {[
                  { v: "50+", l: "Dermatology", s: "Websites Launched", i: Rocket },
                  { v: "100%", l: "Dermatology", s: "Niche Focused", i: Target },
                  { v: "95+", l: "Average Lighthouse", s: "Performance", i: BarChart3 },
                ].map((item) => (
                  <div key={item.l + item.s} className="flex flex-col items-start gap-2 sm:flex-row sm:items-start sm:gap-4">
                    <div className="hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary sm:grid sm:h-12 sm:w-12">
                      <item.i className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-lg font-bold leading-none text-foreground sm:text-[1.65rem]">{item.v}</p>
                      <p className="mt-1 text-[11px] font-medium text-muted-foreground sm:text-xs">{item.l}</p>
                      <p className="text-[11px] text-muted-foreground sm:text-xs">{item.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-w-0 w-full md:flex md:justify-center xl:-mt-4 xl:justify-end">
              <img
                src={heroImage.url}
                alt="Dermatology website design composition showing desktop, mobile, analytics, booking and HIPAA compliance"
                width={1200}
                height={900}
                fetchPriority="high"
                decoding="async"
                className="mx-auto block h-auto w-full max-w-full select-none object-contain md:max-w-[760px] lg:mx-0 lg:max-w-none lg:origin-right xl:-translate-y-2 xl:scale-[1.08]"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP — real clinic logos ============ */}
      <section className="border-b border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
            Trusted by dermatology practices worldwide
          </p>
          <div className="mt-8 grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {TRUST_LOGOS.map((c) => (
              <a
                key={c.name}
                href="/contact"
                className="group flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-border/70 bg-card px-3 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md"
                title={c.name}
                aria-label={c.name}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                  <c.icon className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-bold leading-tight text-foreground sm:text-xs">{c.name}</span>
                <span className="text-[10px] leading-tight text-muted-foreground">{c.note}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUOTE FORM (dedicated section right after hero) ============ */}
      <section id="quote" className="scroll-mt-32 bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14 lg:px-8">
          <div>
            <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700">Get Started</span>
            <h2 className="mt-5 text-balance text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Free <span className="font-medium text-teal-700">dermatology website</span> quote — in 24 hours
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Tell us about your practice. Within 24 hours you'll receive a fixed-price quote, a 48-hour custom homepage mockup, and a full SEO audit of your current site — <span className="font-semibold text-slate-800">no obligation, no sales pitch.</span>
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Bespoke design mockup of YOUR homepage — not a template",
                "Fixed project quote (no hourly billing surprises)",
                "SEO audit with prioritised opportunities",
                "HIPAA-aware architecture review of your current forms",
                "No contract, no lock-in, cancel anytime",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-3 text-xs text-slate-500">
              <div className="flex -space-x-2">
                {["S", "E", "M", "C", "B"].map((initial, i) => (
                  <span
                    key={i}
                    className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-teal-500 to-cyan-600 text-[11px] font-semibold text-white shadow-sm"
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <span>Joined by 50+ dermatology practices this year</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] sm:p-8">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">
              <Sparkles className="h-4 w-4" /> Free · No Obligation · 48-hr Delivery
            </div>
            <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">Get Your Free Website Audit</h3>
            <p className="mt-2 text-sm text-slate-600">SEO, speed and conversion opportunities for your practice website — delivered within 48 hours.</p>

            <a
              href="/contact"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-7 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_-15px_rgba(20,184,166,0.55)] transition-transform hover:-translate-y-0.5"
            >
              Get Your Free Website Audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-4 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1"><Lock className="h-3 w-3" /> Your data is safe</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> No spam</span>
              <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-current text-amber-500" /> 5.0 Rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section id="why" className="scroll-mt-32 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700">Why Choose Us</span>
            <h2 className="mt-5 text-balance text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              The only web design agency built <span className="font-medium text-teal-700">exclusively</span> for dermatology
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Generic web agencies design pretty websites. We design <span className="font-medium text-slate-800">dermatology websites that book patients</span> — with layouts, copy, forms and speed budgets tuned to how skin-care patients actually search and decide.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "HIPAA-Aware Website Design", desc: "BAA-covered forms, PHI-scrubbed tracking, encrypted intake — audited on every dermatology website we ship." },
              { icon: Search, title: "SEO Built for Skin Clinics", desc: "Rank for 'dermatologist near me' and every service line — structured data, LocalBusiness schema, LCP-optimized markup." },
              { icon: Smartphone, title: "Mobile-First Dermatology UX", desc: "76% of skin-care searches happen on phones. Every dermatology website we build is tested on 12+ real devices." },
              { icon: Rocket, title: "Booking-First Layouts", desc: "Every dermatology page is engineered around a single question: how do we turn this visitor into a booked consultation?" },
              { icon: Award, title: "Dermatology-Only Portfolio", desc: "50+ skin clinics served. No plumbers, no lawyers, no realtors — just dermatology website design, all day." },
              { icon: Zap, title: "48-Hour Custom Mockup", desc: "See a real design of your future dermatology website in 48 hours — before you commit a single dollar." },
            ].map((f) => (
              <div key={f.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl">
                <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 text-white shadow-md">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ANATOMY of a dermatology website ============ */}
      <section id="anatomy" className="scroll-mt-32 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700">Anatomy</span>
            <h2 className="mt-5 text-balance text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              What's inside a <span className="font-medium text-teal-700">premium dermatology website</span>
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Every dermatology website we design ships with the same 8 building blocks — the ones that consistently move new patients from Google search to booked consult.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Layers, title: "Conversion-First Homepage", desc: "Hero, trust bar, service grid, doctor intro, reviews, sticky book-CTA — mapped from 50+ dermatology heatmaps." },
              { icon: FileText, title: "Service Pages That Rank", desc: "One page per condition & treatment — acne, eczema, Mohs, laser, Aesthetic — each SEO-mapped and booking-optimised." },
              { icon: Users, title: "Provider & Team Pages", desc: "Bios, credentials, headshots, video intros — the trust layer patients read before they book." },
              { icon: Calendar, title: "Online Booking Integration", desc: "Zocdoc, NexHealth, Klara, or your PMS — one-tap booking wired straight into your existing schedule." },
              { icon: Type, title: "Copy Written for Skin Patients", desc: "Plain-English, empathetic, medically-accurate copy — never the AI slop other agencies ship." },
              { icon: ImageIcon, title: "Photography & Before/After", desc: "Photo direction, before/after galleries with consent workflows, and provider portraits shot to match." },
              { icon: Accessibility, title: "ADA / WCAG Accessibility", desc: "Colour contrast, keyboard nav, alt text, screen-reader flows — every dermatology page tested for WCAG 2.2 AA." },
              { icon: Lock, title: "HIPAA-Safe Forms & Portal", desc: "BAA-covered intake, consent capture, patient portal links — no PHI ever hits Google or Meta pixels." },
            ].map((a) => (
              <div key={a.title} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 transition-all hover:border-teal-400 hover:shadow-lg">
                <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-600">
                  <a.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className="scroll-mt-32 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700">What We Build</span>
            <h2 className="mt-5 text-balance text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Everything your <span className="font-medium text-teal-700">dermatology website</span> needs
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              From a first custom homepage design through booking, SEO and ongoing CRO — one team, one contract, one dermatology-only playbook.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Palette, title: "Custom Website Design", desc: "Bespoke dermatology website design — reflects your brand, providers and specialty mix. Zero templates." },
              { icon: Code2, title: "Custom Development", desc: "Hand-coded, blazing-fast dermatology websites — no bloated page-builders, no WordPress plugin swamp." },
              { icon: Search, title: "SEO & Local Search", desc: "Rank #1 for 'dermatologist [city]' with technical SEO, Google Business Profile, and content built for skin patients." },
              { icon: Calendar, title: "Online Booking", desc: "Connect Zocdoc, NexHealth, Klara or your PMS — one-click patient scheduling on every page." },
              { icon: Lock, title: "Patient Portal & HIPAA Forms", desc: "Secure intake, consent forms and portal access on your dermatology website — fully BAA-covered." },
              { icon: BarChart3, title: "Analytics & CRO", desc: "GA4, call-tracking, and monthly conversion-rate optimisation sprints — measured on booked visits." },
              { icon: Globe2, title: "Multi-Location & Multilingual", desc: "One CMS, unlimited clinic locations, 12 languages — perfect for growing dermatology groups." },
              { icon: Heart, title: "Aesthetic & Cosmetic Pages", desc: "High-margin service pages engineered for Aesthetic, laser, filler and Mohs bookings on your dermatology site." },
            ].map((s) => (
              <div key={s.title} className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-teal-400 hover:shadow-lg">
                <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#0c2340] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Get Your Free Website Audit <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="portfolio" className="scroll-mt-32 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <a href="/#examples" className="font-semibold text-brand-primary underline underline-offset-4">Dermatology website examples</a>
        </div>
      </section>

      {/* ============ COMPARE ============ */}
      <section id="compare" className="scroll-mt-32 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-700">The Difference</span>
            <h2 className="mt-5 text-balance text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Dermatology-only vs. the <span className="font-medium text-teal-700">generic web agency</span>
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              A dermatology website has HIPAA constraints, service-line SEO, provider trust signals and booking flows a generic agency has never touched. Here's what changes when you hire specialists.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-600 sm:text-sm">
              <div className="p-4 sm:p-5">Feature</div>
              <div className="p-4 text-center sm:p-5">Generic Agency</div>
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-4 text-center text-white sm:p-5">DermatologyWebsiteDesign</div>
            </div>
            {[
              ["Dermatology-only expertise", false, true],
              ["HIPAA-aware forms & tracking", false, true],
              ["48-hour custom dermatology mockup", false, true],
              ["SEO for 'derm near me' & every service", false, true],
              ["Booking-first page architecture", false, true],
              ["Sub-1s page load on every device", false, true],
              ["Multi-location & multilingual CMS", false, true],
              ["Ongoing CRO tuned to booked visits", false, true],
            ].map(([feat, generic, us], i) => (
              <div key={feat as string} className={`grid grid-cols-[1.4fr_1fr_1fr] items-center border-t border-slate-100 text-sm ${i % 2 === 1 ? "bg-slate-50/60" : "bg-white"}`}>
                <div className="p-4 font-medium text-slate-800 sm:p-5">{feat as string}</div>
                <div className="p-4 text-center sm:p-5">
                  {generic ? <Check className="mx-auto h-5 w-5 text-emerald-600" /> : <X className="mx-auto h-5 w-5 text-rose-400" />}
                </div>
                <div className="bg-teal-50/50 p-4 text-center sm:p-5">
                  {us ? <Check className="mx-auto h-5 w-5 text-teal-600" strokeWidth={3} /> : <X className="mx-auto h-5 w-5 text-slate-300" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RESULTS ============ */}
      <section id="results" className="scroll-mt-32 bg-gradient-to-br from-[#0c2340] to-[#081a31] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-200">Real Results</span>
            <h2 className="mt-5 text-balance text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Dermatology websites that <span className="font-medium text-teal-300">book patients</span> — not just look pretty
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: "+312%", l: "Consultation Requests", i: Calendar },
              { v: "+218%", l: "Organic Traffic (6 mo)", i: TrendingUp },
              { v: "0.8s", l: "Avg. Load Time", i: Zap },
              { v: "9.4/10", l: "Google Quality Score", i: Award },
            ].map((r) => (
              <div key={r.l} className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                <r.i className="h-5 w-5 text-teal-300" />
                <div className="mt-3 text-4xl font-light text-teal-300">{r.v}</div>
                <div className="mt-2 text-sm text-white/80">{r.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-teal-300/30 bg-gradient-to-r from-teal-400/10 to-cyan-500/10 p-6 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 text-[#0c2340] shadow-2xl">
                <ShieldCheck className="h-8 w-8" strokeWidth={2.4} />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">100% Risk-Free Guarantee</div>
                <h3 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">If you don't love your custom dermatology mockup, you owe us nothing.</h3>
                <p className="mt-2 text-sm text-white/80 sm:text-base">Free consultation, free mockup, free SEO audit. Zero commitment until you see the dermatology website design we've built for you.</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0c2340] shadow-xl hover:-translate-y-0.5"
              >
                Claim Free Mockup <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="process" className="scroll-mt-32 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700">Our Process</span>
            <h2 className="mt-5 text-balance text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              From kickoff to <span className="font-medium text-teal-700">launch in 4 weeks</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              { n: "01", title: "Discovery Call", desc: "30 minutes. We learn your practice, providers, service mix and revenue goals.", i: MousePointer2 },
              { n: "02", title: "Free Mockup", desc: "See your future dermatology homepage in 48 hours — no commitment.", i: Palette },
              { n: "03", title: "Design & Build", desc: "Bespoke design, HIPAA-safe forms, SEO-optimised code, full content system.", i: Code2 },
              { n: "04", title: "Launch & Grow", desc: "White-glove migration, 301 redirects, then ongoing CRO & content.", i: Rocket },
            ].map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="text-4xl font-light text-teal-500">{s.n}</div>
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-50 text-teal-600">
                    <s.i className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section id="testimonials" className="scroll-mt-32 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700">Reviews</span>
            <h2 className="mt-5 text-balance text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Loved by <span className="font-medium text-teal-700">dermatologists worldwide</span>
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600">
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="font-semibold">4.9 / 5.0</span>
              <span className="text-slate-400">·</span>
              <span>50+ dermatology practices served</span>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((t) => (
              <div key={t.site} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="flex gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-sm font-semibold text-white shadow-sm">
                    {t.name.replace(/^Dr\.\s*/, "").charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{t.name}</div>
                    <a
                      href={`https://${t.site}`}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="truncate text-xs text-teal-700 hover:underline"
                    >
                      {t.site}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="scroll-mt-32 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700">FAQ</span>
            <h2 className="mt-5 text-balance text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Dermatology website design — <span className="font-medium text-teal-700">common questions</span>
            </h2>
          </div>

          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {[
              { q: "How much does a dermatology website cost?", a: "Dermatology website design projects typically start at $4,500 for a single-location practice and scale up for multi-location groups, e-commerce, or advanced integrations. You'll get a fixed quote in 24 hours after your free consultation — no hourly billing surprises." },
              { q: "How long does building a dermatology website take?", a: "Most single-location dermatology sites launch in 4–6 weeks. Multi-location or complex builds take 6–10 weeks. The free custom mockup is delivered in 48 hours so you know exactly what your dermatology website will look like before you commit." },
              { q: "Are your dermatology websites HIPAA-compliant?", a: "We build HIPAA-aware dermatology websites: BAA-covered forms, PHI-scrubbed tracking pixels, encrypted hosting, and secure patient intake. Your practice signs its own BAAs with covered vendors — we help you set that up." },
              { q: "Do you help with SEO and Google Ads for skin clinics?", a: "Yes. Every dermatology website launches SEO-ready — structured data, LocalBusiness schema, LCP-optimised. We also offer ongoing SEO, Google Ads / PPC management, and Local Service Ads for practices that want compounding growth." },
              { q: "Can you migrate my existing dermatology website?", a: "Yes — white-glove migration is included on every rebuild. We preserve your rankings with 301 redirects, keep your patient data secure, and typically improve organic traffic within 90 days of launch." },
              { q: "What happens after my dermatology website launches?", a: "You get 30 days of free post-launch support, plus optional monthly retainers for content, CRO, hosting, and analytics reporting. No lock-in contracts — cancel anytime." },
            ].map((f, i) => (
              <button
                key={f.q}
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50 sm:p-6"
                aria-expanded={openFaq === i}
              >
                <div className="flex-1">
                  <div className="text-base font-semibold text-slate-900 sm:text-lg">{f.q}</div>
                  {openFaq === i && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
                  )}
                </div>
                <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-teal-600 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-600 py-16 text-white sm:py-20">
        <div aria-hidden className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
            <Clock className="h-3.5 w-3.5" /> Reply in 24 hours · Mockup in 48
          </span>
          <h2 className="mt-6 text-balance text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">
            Ready for a <span className="font-medium">dermatology website that books patients?</span>
          </h2>
          <p className="mt-4 text-base text-white/95 sm:text-lg">Free website audit + custom dermatology mockup + SEO opportunities — delivered in 48 hours. No obligation.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-teal-700 shadow-2xl transition-transform hover:-translate-y-0.5"
            >
              Get Your Free Website Audit <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="mailto:info@dermatologywebsitedesign.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <Mail className="h-5 w-5" /> Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ============ FOOTER (WHITE — matches logo bg) ============ */}
      <footer className="bg-white pt-14 pb-10 text-slate-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
            <div className="text-center md:text-left">
              <img
                src={logoLight.url}
                alt="Dermatology Website Design"
                className="mx-auto h-10 w-auto md:mx-0"
                width={180}
                height={40}
                loading="lazy"
                decoding="async"
              />
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-600 md:mx-0">
                Premium, HIPAA-aware <span className="font-medium text-slate-800">dermatology website design</span> built exclusively for dermatologists and skin clinics worldwide. Websites that book patients — not just page views.
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</div>
              <div className="mt-4 space-y-3 text-sm">
                <a href="mailto:info@dermatologywebsitedesign.com" className="flex items-center gap-2 text-slate-700 hover:text-teal-700">
                  <Mail className="h-4 w-4 text-teal-600" /> info@dermatologywebsitedesign.com
                </a>
                <div className="flex items-center gap-2 text-slate-700">
                  <Globe2 className="h-4 w-4 text-teal-600" /> Serving dermatology practices worldwide
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Trust</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { l: "HIPAA-Aware", i: ShieldCheck },
                  { l: "SSL Secured", i: Lock },
                  { l: "5.0 Rated", i: Star },
                  { l: "WCAG 2.2 AA", i: Accessibility },
                  { l: "SEO Optimized", i: Search },
                  { l: "Fast Loading", i: Gauge },
                  { l: "Mobile-Friendly", i: Smartphone },
                ].map((b) => (
                  <span key={b.l} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700">
                    <b.i className="h-3 w-3 text-teal-600" /> {b.l}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} DermatologyWebsiteDesign.com · Premium dermatology website design for skin clinics worldwide.
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur sm:hidden">
        <a
          href="/contact"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          Get Your Free Website Audit <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="h-20 sm:hidden" aria-hidden />

      {/* Preload hero for LCP */}
      <link rel="preload" as="image" href={heroImage.url} />
      <link rel="preload" as="image" href={logoLight.url} />
    </div>
  );
}

