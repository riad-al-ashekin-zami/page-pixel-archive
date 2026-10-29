import { useTranslation } from "react-i18next";
import { Accessibility, ArrowRight, ArrowUpRight, Baby, CheckCircle2, Code2, Compass, Gauge, Layers, MapPin, Microscope, MonitorSmartphone, MousePointerClick, Palette, Search, ServerCog, Share2, ShieldCheck, Stethoscope, TrendingUp, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalLink } from "@/components/local-link";
import { useCurrentLang } from "@/lib/i18n-routing";
import { HOMEPAGE_SECTION_LABELS } from "@/data/homepage-section-labels";
import { HomepageExamples } from "./homepage-examples";

type Item = { title?: string; label?: string; desc?: string; description?: string };
type Group = { title: string; description: string; items?: Item[]; steps?: Item[]; list?: string[] };
type HomeData = { sections: string[]; pillars: Group; features: Group; audience: Group; medicalServices: Group; process: Group; growthDescription: string };
const featureIcons = [Palette, Gauge, Search, ShieldCheck, MonitorSmartphone, Accessibility];
const audienceIcons = [Stethoscope, MapPin, Baby, Microscope];
const processIcons = [Compass, Layers, Code2, TrendingUp];
const treatmentGroups = [[0, 1, 2, 12, 4, 3, 16, 10, 9, 11], [5, 17, 6, 8, 7], [14, 15, 13]];
const services = [
  { key: "seo", path: "/dermatology-seo-services", icon: Search },
  { key: "ppc", path: "/dermatology-google-ads-ppc", icon: MousePointerClick },
  { key: "social", path: "/dermatology-social-media-services", icon: Share2 },
  { key: "maintenance", path: "/dermatology-website-management-services", icon: ServerCog },
];

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary"><Icon aria-hidden="true" className="size-5" strokeWidth={1.7} /></span>;
}

function SectionHeader({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return <header className="mx-auto max-w-3xl text-center">
    <p className="text-xs font-semibold uppercase text-brand-primary">{eyebrow}</p>
    <h2 className="mt-4 text-balance text-3xl font-light leading-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
    <p className="mx-auto mt-5 max-w-[640px] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
    {children}
  </header>;
}

function SecondaryLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Button asChild variant="outline" className="h-auto min-h-11 max-w-full whitespace-normal rounded-full border-brand-primary/20 px-5 py-3 text-center text-brand-primary hover:border-brand-primary/50 hover:bg-brand-primary/5">
    <LocalLink to={to}>{children}<ArrowRight aria-hidden="true" /></LocalLink>
  </Button>;
}

function TreatmentMock() {
  return <div aria-hidden="true" className="treatment-mock w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card shadow-sm">
    <div className="flex h-10 items-center gap-1.5 border-b border-border bg-muted/50 px-4"><span className="size-2 rounded-full bg-brand-primary/25" /><span className="size-2 rounded-full bg-brand-primary/25" /><span className="size-2 rounded-full bg-brand-primary/25" /><span className="mx-auto h-3 w-1/2 rounded-full bg-border" /></div>
    <div className="space-y-3 p-6">
      <div className="mb-5 h-5 w-3/5 rounded bg-brand-primary/20" />
      <div className="h-2 w-full rounded bg-muted" /><div className="h-2 w-11/12 rounded bg-muted" /><div className="h-2 w-4/5 rounded bg-muted" />
      <div className="my-5 h-9 w-2/5 rounded-full bg-brand-primary" />
      <div className="flex h-10 items-center justify-between border-t border-border"><span className="h-2 w-3/5 rounded bg-muted" /><span className="text-brand-primary">+</span></div>
      <div className="flex h-10 items-center justify-between border-t border-border"><span className="h-2 w-1/2 rounded bg-muted" /><span className="text-brand-primary">+</span></div>
    </div>
  </div>;
}

export function HomepageDesignSections() {
  const { t } = useTranslation("home");
  const lang = useCurrentLang();
  const labels = HOMEPAGE_SECTION_LABELS[lang] ?? HOMEPAGE_SECTION_LABELS.en;
  const data = t("merged", { returnObjects: true }) as HomeData;
  return <>
    <section data-home-section="features" className="home-design-section bg-background">
      <div className="home-design-container">
        <SectionHeader eyebrow={labels.eyebrows[0]} title={data.sections[0]} description={data.pillars.description}>
          <p className="mx-auto mt-3 max-w-[640px] text-base leading-relaxed text-muted-foreground">{data.features.description}</p>
        </SectionHeader>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.pillars.items?.map((item, index) => <li key={index} className="home-design-card p-6 sm:p-7">
            <IconTile icon={featureIcons[index] ?? Palette} />
            <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </li>)}
        </ul>
        <ul className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-4 rounded-lg bg-brand-primary/5 px-5 py-5">
          {data.features.items?.map((item, index) => <li key={index} className="flex items-center gap-2 text-sm font-medium text-foreground"><CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-brand-primary" />{item.title}</li>)}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><SecondaryLink to="/dermatology-before-after-gallery">{t("ownerAnchors.gallery")}</SecondaryLink><SecondaryLink to="/dermatology-patient-portal">{t("ownerAnchors.portal")}</SecondaryLink></div>
      </div>
    </section>
    <HomepageExamples />
    <section data-home-section="audience" className="home-design-section bg-brand-primary/5">
      <div className="home-design-container">
        <SectionHeader eyebrow={labels.eyebrows[1]} title={data.audience.title} description={data.audience.description} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.audience.items?.map((item, index) => <li key={index} className="home-design-card relative flex flex-col overflow-hidden p-6 pt-8">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-primary" />
            <IconTile icon={audienceIcons[index] ?? Stethoscope} />
            <h3 className="mt-5 text-lg font-semibold text-foreground">{item.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            {index === 1 && <LocalLink to="/multi-location-dermatology-website-design" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-primary underline decoration-brand-primary/30 underline-offset-4">{labels.multiLocation}<ArrowRight aria-hidden="true" className="size-4 shrink-0" /></LocalLink>}
          </li>)}
        </ul>
      </div>
    </section>
    <section data-home-section="treatments" className="home-design-section bg-background">
      <div className="home-design-container grid gap-x-16 gap-y-9 lg:grid-cols-[0.9fr_1.1fr]">
        <header>
          <p className="text-xs font-semibold uppercase text-brand-primary">{labels.eyebrows[2]}</p>
          <h2 className="mt-4 text-balance text-3xl font-light leading-tight text-foreground sm:text-4xl lg:text-5xl">{data.medicalServices.title}</h2>
          <p className="mt-5 max-w-[640px] text-base leading-relaxed text-muted-foreground sm:text-lg">{data.medicalServices.description}</p>
        </header>
        <div className="row-span-2 space-y-7 lg:col-start-2 lg:row-start-1">
          {treatmentGroups.map((indices, groupIndex) => <div key={groupIndex}>
            <p className="mb-3 text-sm font-semibold text-foreground">{labels.groups[groupIndex]}</p>
            <ul className="flex flex-wrap gap-2.5">{indices.map(index => <li key={index} className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-primary/10 bg-brand-primary/5 px-4 py-2.5 text-sm leading-snug text-foreground"><span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand-primary" />{data.medicalServices.list?.[index]}</li>)}</ul>
          </div>)}
        </div>
        <div className="lg:col-start-1 lg:row-start-2"><TreatmentMock /></div>
      </div>
    </section>
    <section data-home-section="process" className="home-design-section bg-brand-primary/5">
      <div className="home-design-container">
        <SectionHeader eyebrow={labels.eyebrows[3]} title={data.sections[2]} description={data.process.description} />
        <ol className="home-process-timeline mt-12 grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {data.process.steps?.map((item, index) => <li key={index} className="relative pl-14 sm:pl-0">
            <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-brand-primary/20 bg-background text-lg font-semibold tabular-nums text-brand-primary sm:relative sm:mb-7">{String(index + 1).padStart(2, "0")}</div>
            <IconTile icon={processIcons[index] ?? Compass} />
            <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </li>)}
        </ol>
        <div className="mt-10 flex justify-center"><SecondaryLink to="/our-process">{t("ownerAnchors.process")}</SecondaryLink></div>
      </div>
    </section>
    <section data-home-section="growth" className="home-design-section bg-brand-primary/5">
      <div className="home-design-container">
        <SectionHeader eyebrow={labels.eyebrows[4]} title={data.sections[4]} description={data.growthDescription} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => <li key={service.key} className="flex">
            <LocalLink to={service.path} className="home-design-card group relative flex w-full flex-col p-6">
              <h3 className="order-2 mt-5 text-lg font-semibold capitalize text-foreground">{t(`ownerAnchors.${service.key}`)}</h3>
              <span className="order-1"><IconTile icon={service.icon} /></span>
              <p className="order-3 mt-3 text-sm leading-relaxed text-muted-foreground">{labels.growth[index]}</p>
              <ArrowUpRight aria-hidden="true" className="absolute right-6 top-7 size-5 text-brand-primary" />
            </LocalLink>
          </li>)}
        </ul>
      </div>
    </section>
  </>;
}