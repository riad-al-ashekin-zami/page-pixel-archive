import { useTranslation } from "react-i18next";
import { HOMEPAGE_EXAMPLES } from "@/data/homepage-examples";

export function HomepageExamples() {
  const { t } = useTranslation("home");
  return (
    <section id="examples" aria-labelledby="examples-heading" className="scroll-mt-32 border-b border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="examples-heading" className="text-3xl font-bold text-foreground sm:text-4xl">{t("examples.heading")}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{t("examples.intro")}</p>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {HOMEPAGE_EXAMPLES.map((example) => (
            <li key={example.name} className="overflow-hidden rounded-lg border border-border bg-card">
              <img src={example.image} alt={`Dermatology website concept design – ${example.name}`} width={1232} height={768} loading="lazy" className="aspect-[1232/768] w-full object-contain" />
              <div className="space-y-3 p-5">
                <span className="inline-flex rounded-md border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-xs font-semibold text-brand-primary">{t("examples.conceptBadge")}</span>
                <h3 className="text-xl font-semibold text-foreground">{example.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(`examples.descriptions.${example.descriptionKey}`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}