import { useTranslation } from "react-i18next";
import { LocalLink } from "@/components/local-link";

const destinations = {
  design: "/",
  examples: "/#examples",
  seo: "/dermatology-seo-services",
  marketing: "/blog/dermatology-marketing-strategies",
  pricing: "/plan-packages-and-costs",
  ppc: "/dermatology-google-ads-ppc",
  social: "/dermatology-social-media-services",
  maintenance: "/dermatology-website-management-services",
  process: "/our-process",
  gallery: "/dermatology-before-after-gallery",
  portal: "/dermatology-patient-portal",
  migration: "/dermatology-website-migration",
} as const;

export type OwnerKey = keyof typeof destinations;

export function KeywordOwnerLinks({ owners }: { owners: OwnerKey[] }) {
  const { t } = useTranslation("home");
  return (
    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
      {owners.map((owner, i) => (
        <span key={owner}>
          {i > 0 ? " · " : ""}
          <LocalLink to={destinations[owner]} className="font-medium text-brand-primary underline underline-offset-4">
            {t(`ownerAnchors.${owner}`)}
          </LocalLink>
        </span>
      ))}
    </p>
  );
}