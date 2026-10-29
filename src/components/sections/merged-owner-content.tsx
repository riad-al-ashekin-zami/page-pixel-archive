import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/reveal";
import { KeywordOwnerLinks, type OwnerKey } from "./keyword-owner-links";

type Item = { title?: string; label?: string; desc?: string; description?: string };
type Group = { title?: string; heading?: string; description?: string; items?: Item[]; list?: string[]; features?: string[]; steps?: Item[] };

function ContentBand({ title, group, owners = [] }: { title: string; group?: Group; owners?: OwnerKey[] }) {
  const items = group?.items ?? group?.steps ?? [];
  return (
    <section className="relative border-b border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          {group?.description && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{group.description}</p>}
          {items.length > 0 && (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <li key={i} className="border-l-2 border-brand-primary/30 pl-5">
                  <p className="text-lg font-semibold text-foreground">{item.title ?? item.label}</p>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.desc ?? item.description}</p>
                </li>
              ))}
            </ul>
          )}
          {(group?.list ?? group?.features)?.length ? <ul className="mt-6 grid list-inside list-disc gap-2 text-muted-foreground sm:grid-cols-2">{(group?.list ?? group?.features ?? []).map((text) => <li key={text}>{text}</li>)}</ul> : null}
          <KeywordOwnerLinks owners={owners} />
        </Reveal>
      </div>
    </section>
  );
}

export function HomepageMergedContent() {
  const { t } = useTranslation("home");
  const data = t("merged", { returnObjects: true }) as { sections: string[]; audience: Group; pillars: Group; medicalServices: Group; process: Group };
  return <>
    <ContentBand title={data.sections[0]} group={data.pillars} owners={["gallery", "portal"]} />
    <ContentBand title={data.audience.title ?? ""} group={data.audience} />
    <ContentBand title={data.medicalServices.title ?? ""} group={data.medicalServices} />
    <ContentBand title={data.sections[2]} group={data.process} owners={["process"]} />
    <ContentBand title={data.sections[3]} group={{ description: t("merged.workDescription") }} owners={["examples"]} />
    <ContentBand title={data.sections[4]} group={{ description: t("merged.growthDescription") }} owners={["seo", "ppc", "social", "maintenance"]} />
  </>;
}

export function SeoMergedContent() {
  const { t } = useTranslation("seoServices");
  const data = t("merged", { returnObjects: true }) as { headings: string[]; local: Group; workflow: Group; reviews: Group; medicalServices: Group; content: Group; technical: Group; reporting: Group };
  return <>
    <ContentBand title={data.headings[0]} group={data.local} />
    <ContentBand title={data.workflow.heading ?? ""} group={data.workflow} />
    <ContentBand title={data.headings[1]} group={data.content} />
    <ContentBand title={data.headings[2]} group={data.technical} />
    <ContentBand title={data.headings[3]} group={data.reviews} />
    <ContentBand title={data.headings[4]} group={data.reporting} owners={["marketing"]} />
  </>;
}

export function ManagementMergedContent() {
  const { t } = useTranslation("management");
  const data = t("merged", { returnObjects: true }) as { heading: string; pillars: Group; included: Group; flow: Group; hosting: Group };
  return <>
    <ContentBand title={data.heading} group={data.hosting} />
    <ContentBand title={data.pillars.heading ?? data.pillars.title ?? ""} group={data.pillars} />
    <ContentBand title={data.included.heading ?? data.included.title ?? ""} group={data.included} />
    <ContentBand title={data.flow.heading ?? data.flow.title ?? ""} group={data.flow} />
  </>;
}