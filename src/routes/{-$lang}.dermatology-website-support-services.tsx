import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { buildHreflangLinks } from "@/lib/i18n-routing";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header/site-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { PulseField } from "@/components/hero-motifs";
import { useTranslation } from "react-i18next";
import { getStaticTranslation } from "@/i18n";

import supportHero from "@/assets/derm-support-hero.jpg";
import {
  ArrowRight, CheckCircle2, Headphones, MessageCircle, Phone, Mail, Ticket,
  Video, LifeBuoy, Clock, Users, Sparkles, Zap, ShieldCheck, PhoneCall,
  Stethoscope, Building2, Baby, Scissors, Plus, Minus, Quote, Star,
  Calendar, FileText, GraduationCap, Wrench, MessagesSquare, Bell,
  UserCheck, Timer, HeartHandshake, Send, PlayCircle, Radio,
} from "lucide-react";
import { isValidUrlLang } from "@/i18n/languages";

const CHANNELS_ICONS = [MessageCircle, Phone, Mail, Ticket, Video, PhoneCall];
const AUDIENCES_ICONS = [Stethoscope, Building2, Baby, Scissors];
const HELP_TOPICS_ICONS = [FileText, Wrench, GraduationCap, MessagesSquare, ShieldCheck, Zap];
const FLOW_ICONS = [UserCheck, Send, HeartHandshake, Calendar];
const TICKET_STATUSES = ["resolved", "in-progress", "resolved"];

type ChannelKey = "chat" | "phone" | "email" | "ticket";
const CHANNEL_KEYS: ChannelKey[] = ["chat", "phone", "email", "ticket"];
const CHANNEL_ICONS: Record<ChannelKey, any> = {
  chat: MessageCircle,
  phone: Phone,
  email: Mail,
  ticket: Ticket,
};

export const Route = createFileRoute("/{-$lang}/dermatology-website-support-services")({
  params: {
    parse: (raw: Record<string, string | undefined>) => {
      const lang = raw.lang;
      if (lang !== undefined && !isValidUrlLang(lang)) throw notFound();
      return { lang };
    },
    stringify: (parsed: { lang?: string }) => ({ lang: parsed.lang ?? "" }),
  },

  head: ({ params }) => {
    const st = getStaticTranslation(params.lang, "support");
    return {
      meta: [
        { title: st?.meta?.title ?? "Dermatology Website Support Services — Named Engineer, 15-min Emergency SLA" },
        { name: "description", content: st?.meta?.description ?? "Human website support for dermatology practices. Named engineer, live chat, priority phone, edit hours, staff training, HIPAA-aware guidance, and 24/7 emergency response. Month-to-month." },
        { property: "og:title", content: st?.meta?.og?.title ?? "Dermatology Website Support Services — Real Engineers, Real Response Times" },
        { property: "og:description", content: st?.meta?.og?.description ?? "A named account engineer, sub-hour replies, edit hours for content and design, and 24/7 emergency escalation — built for dermatology practices." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/dermatology-website-support-services" },
        { property: "og:image", content: supportHero },
        { name: "twitter:image", content: supportHero },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/dermatology-website-support-services" }, ...buildHreflangLinks("/dermatology-website-support-services")],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", serviceType: st?.meta?.jsonLd?.serviceType ?? "Dermatology Website Support Services", provider: { "@type": "Organization", name: st?.meta?.jsonLd?.provider ?? "DermatologyWebsiteDesign.com" }, areaServed: "United States", offers: { "@type": "Offer", priceCurrency: "USD", price: "249", description: st?.meta?.jsonLd?.offerDescription ?? "Dermatology website support plan — starting price per month" } }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: (st?.faq?.items ?? []).map((f: any) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: SupportServicesPage,
});

function SupportServicesPage() {
  const { t } = useTranslation("support");
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 500px at 15% -10%, color-mix(in oklch, var(--brand-accent), transparent 80%), transparent 60%), radial-gradient(1000px 500px at 100% 20%, color-mix(in oklch, var(--brand-primary), transparent 82%), transparent 60%), linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), transparent 96%) 0%, transparent 45%)",
          }}
        />
        <PulseField className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 text-brand-accent opacity-30 lg:block" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 md:pt-20 lg:pt-24">
          <div className="grid gap-10 xl:grid-cols-[1.05fr_1fr] xl:items-center xl:gap-14">
            <Reveal>
              <div className="mb-4 flex flex-col items-start gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="hidden sm:inline">{t("hero.badgeOpen")}</span>
                  <span className="sm:hidden">{t("hero.badgeOpenMobile")}</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
                  <Headphones className="h-3.5 w-3.5" /> {t("hero.badgeTitle")}
                </span>
              </div>
              <h1 className="mt-5 text-[2rem] font-black leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
                {t("hero.titlePrefix")}{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 55%))",
                  }}
                >
                  {t("hero.titleHighlight")}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {t("hero.description")}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/get-a-free-quote"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground shadow-[0_12px_36px_-14px_color-mix(in_oklch,var(--brand-primary),transparent_40%)] transition-transform hover:scale-[1.02]"
                >
                  {t("hero.ctaStart")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
                >
                  <PlayCircle className="h-4 w-4" /> {t("hero.ctaDemo")}
                </Link>
              </div>
              <div className="mt-6 flex items-baseline gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{t("hero.pricing.label")}</span>
                <span className="text-xl font-black text-brand-primary">{t("hero.pricing.value")}</span>
                <span>{t("hero.pricing.suffix")}</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                {(t("hero.trustLabels", { returnObjects: true }) as string[]).map((tItem, i) => (
                  <span key={tItem} className={`flex items-center gap-1.5 ${i === 3 ? "hidden sm:flex" : ""}`}>
                    <CheckCircle2 className="h-4 w-4 text-brand-primary" /> {tItem}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} variant="scale">
              <SupportInbox />
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {(t("stats", { returnObjects: true }) as any[]).map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="text-3xl font-black tracking-tight text-brand-primary md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CHANNELS */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 md:pt-20">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("channels.tag")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("channels.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("channels.description")}
            </p>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {(t("channels.items", { returnObjects: true }) as any[]).map((c, index) => {
            const Icon = CHANNELS_ICONS[index];
            return (
              <RevealItem
                key={c.name}
                className="group rounded-3xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-brand-primary/15 bg-brand-primary/5 text-brand-primary transition-all group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground">
                    {c.meta}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      {/* HELP TOPICS */}
      <section className="relative mt-20 py-20 md:py-24" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 97%))" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("helpTopics.tag")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("helpTopics.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("helpTopics.description")}
              </p>
            </div>
          </Reveal>
          <RevealStagger className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {(t("helpTopics.items", { returnObjects: true }) as any[]).map((h, i) => {
              const Icon = HELP_TOPICS_ICONS[i];
              return (
                <RevealItem key={h.title} className="rounded-3xl border border-border/70 bg-card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* FLOW */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("flow.tag")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("flow.title")}
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(t("flow.steps", { returnObjects: true }) as any[]).map((f, i) => {
            const Icon = FLOW_ICONS[i];
            return (
              <Reveal key={f.id} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-border/70 bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-widest text-muted-foreground">{f.id}</span>
                    <Icon className="h-5 w-5 text-brand-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* RESPONSE DESK — dark interactive band */}
      <ResponseDeskBand />

      {/* PLANS */}
      <section id="plans" className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), white 96%), transparent)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("plans.tag")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("plans.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                {t("plans.description")}
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {(t("plans.cards", { returnObjects: true }) as any[]).map((p, i) => {
              const highlight = i === 1;
              return (
              <Reveal key={p.name} delay={i * 0.08}>
                <div
                  className={`group relative h-full ${highlight ? "rounded-[26px] p-[1.5px]" : ""}`}
                  style={
                    highlight
                      ? {
                          background:
                            "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 55%), var(--brand-primary))",
                          backgroundSize: "200% 200%",
                          animation: "gradient-pan 6s ease infinite",
                        }
                      : undefined
                  }
                >
                  <div
                    className={`relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${highlight
                        ? "border-transparent bg-card shadow-[0_30px_80px_-30px_color-mix(in_oklch,var(--brand-primary),transparent_45%)]"
                        : "border-border/70 bg-card hover:border-brand-primary/30 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]"
                    }`}
                  >
                    {highlight && (
                      <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-brand-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-primary-foreground shadow-lg">
                        <Sparkles className="h-3 w-3" /> {t("plans.mostChosen")}
                      </span>
                    )}
                    <div className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{p.tag}</div>
                    <div className="mt-1 text-2xl font-black tracking-tight">{p.name}</div>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-foreground">{p.price}</span>
                      <span className="text-sm text-muted-foreground">{p.per}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                      <span className="rounded-full border border-border bg-muted/40 px-2 py-0.5 font-semibold text-foreground">{p.sla}</span>
                      <span className="rounded-full border border-brand-primary/20 bg-brand-primary/5 px-2 py-0.5 font-semibold text-brand-primary">
                        {p.edits}
                      </span>
                    </div>
                    {p.market && (
                      <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-[11px] leading-snug">
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                          <span className="min-w-0 font-semibold text-muted-foreground">
                            {t("plans.marketLabel")} <span className="tabular-nums line-through decoration-muted-foreground/50">{p.market}</span>
                          </span>
                          <span className="w-fit shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                            {p.savings}
                          </span>
                        </div>
                      </div>
                    )}
                    <ul className="mt-6 space-y-2.5 text-sm">
                      {(p.features as string[]).map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                          <span className="text-foreground/90">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/get-a-free-quote"
                      className={`mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${highlight
                          ? "bg-brand-primary text-brand-primary-foreground"
                          : "border border-border bg-card text-foreground hover:border-brand-primary/40 hover:text-brand-primary"
                      }`}
                    >
                      {t("plans.choose")} {p.name} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("audiences.tag")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("audiences.title")}
            </h2>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t("audiences.items", { returnObjects: true }) as any[]).map((a, i) => {
            const Icon = AUDIENCES_ICONS[i];
            return (
              <RevealItem key={a.label} className="rounded-3xl border border-border/70 bg-card p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="mt-4 text-base font-bold">{a.label}</div>
                <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      {/* SERVICES SUPPORTED */}
      <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklch, var(--brand-primary), white 96%))" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("medicalServices.tag")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("medicalServices.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("medicalServices.description")}
              </p>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {(t("medicalServices.items", { returnObjects: true }) as string[]).map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("testimonials.tag")}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {t("testimonials.title")}
            </h2>
          </div>
        </Reveal>
        <RevealStagger className="grid gap-5 md:grid-cols-3">
          {(t("testimonials.items", { returnObjects: true }) as any[]).map((tItem) => {
            const initials = tItem.name.split(" ").filter((w: string) => !w.includes(".")).slice(0, 2).map((w: string) => w[0]).join("");
            return (
            <RevealItem
              key={tItem.name}
              className="group relative flex h-full flex-col rounded-3xl border border-border/70 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-[0_20px_50px_-24px_color-mix(in_oklch,var(--brand-primary),transparent_55%)]"
            >
              <Quote className="h-8 w-8 text-brand-primary/25" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">"{tItem.quote}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-black text-brand-primary-foreground shadow-[0_8px_24px_-10px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]"
                  style={{ background: "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 60%))" }}
                >
                  {initials}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-foreground">{tItem.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{tItem.role}</div>
                </div>
              </div>
            </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-24" style={{ background: "linear-gradient(180deg, color-mix(in oklch, var(--brand-primary), white 96%), transparent)" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t("faq.tag")}</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-[2.5rem] md:leading-[1.1]">
                {t("faq.title")}
              </h2>
            </div>
          </Reveal>
          <FAQAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-brand-primary/20 bg-card p-10 md:p-14">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(600px 300px at 100% 0%, color-mix(in oklch, var(--brand-primary), transparent 75%), transparent 60%)",
            }}
          />
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-[2.4rem] md:leading-[1.1]">
                {t("cta.title")}{" "}
                <span className="text-brand-primary">{t("cta.highlight")}</span>
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                {t("cta.description")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                to="/get-a-free-quote"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary-foreground transition-transform hover:scale-[1.02]"
              >
                {t("cta.buttonQuote")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
              >
                {t("cta.buttonContact")}
              </Link>
            </div>
          </div>
        </div>
      </section>

        <p className="mx-auto mt-16 mb-20 max-w-3xl px-4 text-center text-sm text-muted-foreground sm:mt-20 sm:mb-24 sm:px-6 lg:px-8">
          {t("footerLinks.preface")}{" "}
          <Link to="/dermatology-website-maintenance-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.maintenance")}</Link>,{" "}
          <Link to="/dermatology-website-management-services" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.management")}</Link>, {t("common.or", { ns: "translation" })}{" "}
          <Link to="/faq" className="font-medium text-foreground underline-offset-4 hover:text-brand-primary hover:underline">{t("footerLinks.faq")}</Link>.
        </p>

      <SiteFooter />
    </div>
  );
}

function SupportInbox() {
  const { t } = useTranslation("support");
  const tickItems = (t("inboxWidget.tickets", { returnObjects: true }) as any[]);
  const [replyTime, setReplyTime] = useState(42);
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setReplyTime(() => 30 + Math.floor(Math.random() * 30));
      setPulse((p) => p + 1);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_30px_80px_-30px_color-mix(in_oklch,var(--brand-primary),transparent_60%)]">
        <img
          src={supportHero}
          alt={t("hero.imageAlt")}
          width={1280}
          height={960}
          className="h-auto w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, color-mix(in oklch, var(--brand-primary), transparent 60%) 100%)",
          }}
        />
        {/* Inbox card */}
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-border/80 bg-card/95 p-4 shadow-xl backdrop-blur sm:inset-x-6 sm:bottom-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <LifeBuoy className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t("inboxWidget.title")}</div>
                <div className="text-sm font-bold text-foreground">{t("inboxWidget.status")}</div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
              <Timer className="h-3 w-3" /> {replyTime}s {t("inboxWidget.replyMetric")}
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {tickItems.map((tItem, i) => {
              const status = TICKET_STATUSES[i];
              return (
              <li
                key={tItem.id}
                className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 px-3 py-2"
                style={{ animation: `fade-in 0.6s ease ${i * 120}ms both` }}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[10px] font-black ${
                    status === "resolved"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {tItem.id}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="line-clamp-2 text-xs font-semibold leading-tight text-foreground">{tItem.subject}</div>
                  <div className="mt-0.5 truncate text-[10px] text-muted-foreground">
                    {tItem.meta}
                  </div>
                </div>
                {status === "resolved" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <Bell key={pulse} className="h-4 w-4 shrink-0 animate-pulse text-amber-500" />
                )}
              </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Floating engineer avatar */}
      <div className="absolute -right-2 top-6 hidden items-center gap-2 rounded-full border border-border/80 bg-card/95 px-3 py-2 shadow-xl backdrop-blur sm:-right-4 sm:flex">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-xs font-black text-brand-primary-foreground">
          JR
        </span>
        <div className="pr-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("inboxWidget.engineer.label")}</div>
          <div className="text-xs font-bold text-foreground">{t("inboxWidget.engineer.status")}</div>
        </div>
      </div>
    </div>
  );
}

function FAQAccordion() {
  const { t } = useTranslation("support");
  const faqs = (t("faq.items", { returnObjects: true }) as any[]);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className="overflow-hidden rounded-2xl border border-border/70 bg-card"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-brand-primary/[0.03]"
            >
              <span className="text-sm font-semibold text-foreground sm:text-base" itemProp="name">
                {f.q}
              </span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-brand-primary">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground" itemProp="text">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* -------- Response Desk (dark interactive band) -------- */

function ResponseDeskBand() {
  const { t } = useTranslation("support");
  const [active, setActive] = useState<ChannelKey>("chat");
  const [meter, setMeter] = useState(0.72);
  useEffect(() => {
    const id = setInterval(() => setMeter(() => 0.55 + Math.random() * 0.4), 1600);
    return () => clearInterval(id);
  }, []);

  const demos = (t("responseDesk.demos", { returnObjects: true }) as any);
  const activeDemo = demos[active];
  const ActiveIcon = CHANNEL_ICONS[active];

  return (
    <section
      className="relative overflow-hidden py-20 md:py-24"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklch, var(--brand-primary), black 15%) 0%, color-mix(in oklch, var(--brand-primary), black 5%) 55%, color-mix(in oklch, var(--brand-accent), black 20%) 100%)",
      }}
    >
      <div aria-hidden className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 20% 10%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "42px 42px, 60px 60px" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
              <Radio className="h-3.5 w-3.5 animate-pulse" /> {t("responseDesk.badge")}
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-[2.5rem] md:leading-[1.1]">
              {t("responseDesk.title")}
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">
              {t("responseDesk.description")}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
          {/* Channel tabs + response meter */}
          <Reveal>
            <div className="flex h-full flex-col gap-4 rounded-3xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur md:p-6">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                {CHANNEL_KEYS.map((k) => {
                  const c = demos[k];
                  const Icon = CHANNEL_ICONS[k];
                  const isActive = active === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setActive(k)}
                      aria-pressed={isActive}
                      className={`flex min-h-11 items-center gap-2 rounded-2xl border px-3 py-2.5 text-left text-sm font-semibold transition-all ${
                        isActive
                          ? "border-white/40 bg-white text-brand-primary shadow-lg"
                          : "border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{c.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 rounded-2xl border border-white/15 bg-black/20 p-4">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-white/70">
                  <span className="inline-flex items-center gap-1.5"><Timer className="h-3.5 w-3.5" /> {t("responseDesk.meterLabel")}</span>
                  <span className="text-white">{Math.round(30 + (1 - meter) * 40)}{t("responseDesk.meterSuffix")}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.round(meter * 100)}%`,
                      background: "linear-gradient(90deg, #34d399, #22d3ee)",
                    }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-white/60">
                  <span>{t("responseDesk.meterComparison")}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-200">
                    ● {t("responseDesk.status")}
                  </span>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3 text-center">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
                  <div className="text-xl font-black text-white">42s</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/60">{t("responseDesk.labels.chatReply")}</div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
                  <div className="text-xl font-black text-white">15min</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/60">{t("responseDesk.labels.emergencySla")}</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Conversation preview */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/95 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border/70 bg-card px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full text-xs font-black text-brand-primary-foreground" style={{ background: "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), var(--brand-accent) 60%))" }}>JR</span>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t("responseDesk.engineerInfo.name")}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <ActiveIcon className="h-3 w-3" /> {activeDemo.label} · {activeDemo.sla}
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700">● {t("responseDesk.engineerInfo.status")}</span>
              </div>
              <div key={active} className="flex flex-1 flex-col gap-2.5 bg-card/60 p-5">
                {(activeDemo.lines as string[]).map((text, i) => {
                  const from = i % 2 === 0 ? "you" : "jr";
                  return (
                  <div
                    key={i}
                    className={`flex ${from === "you" ? "justify-end" : "justify-start"}`}
                    style={{ animation: `fade-in 0.5s ease ${i * 220}ms both` }}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed shadow-sm ${
                        from === "you"
                          ? "rounded-br-md bg-muted text-foreground"
                          : "rounded-bl-md bg-brand-primary text-brand-primary-foreground"
                      }`}
                    >
                      {text}
                    </div>
                  </div>
                  );
                })}
                <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  {t("responseDesk.engineerInfo.typing")}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
