import type { Route as RootRoute } from "./routes/__root";

type AliasRoute<TPath extends string> = {
  id: TPath;
  path: TPath;
  fullPath: TPath;
  preLoaderRoute: any;
  parentRoute: typeof RootRoute;
};

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": AliasRoute<"/">;
    "/about": AliasRoute<"/about">;
    "/blog": AliasRoute<"/blog">;
    "/blog/": AliasRoute<"/blog/">;
    "/blog/$slug": AliasRoute<"/blog/$slug">;
    "/case-studies": AliasRoute<"/case-studies">;
    "/contact": AliasRoute<"/contact">;
    "/cookie-policy": AliasRoute<"/cookie-policy">;
    "/dermatology-add-on-services": AliasRoute<"/dermatology-add-on-services">;
    "/dermatology-before-after-gallery": AliasRoute<"/dermatology-before-after-gallery">;
    "/dermatology-conversion-rate-optimization": AliasRoute<"/dermatology-conversion-rate-optimization">;
    "/dermatology-ecommerce-website-design": AliasRoute<"/dermatology-ecommerce-website-design">;
    "/dermatology-email-marketing": AliasRoute<"/dermatology-email-marketing">;
    "/dermatology-google-ads-ppc": AliasRoute<"/dermatology-google-ads-ppc">;
    "/dermatology-local-seo-services": AliasRoute<"/dermatology-local-seo-services">;
    "/dermatology-patient-portal": AliasRoute<"/dermatology-patient-portal">;
    "/dermatology-practice-growth": AliasRoute<"/dermatology-practice-growth">;
    "/dermatology-reputation-management": AliasRoute<"/dermatology-reputation-management">;
    "/dermatology-seo-services": AliasRoute<"/dermatology-seo-services">;
    "/dermatology-social-media-services": AliasRoute<"/dermatology-social-media-services">;
    "/dermatology-website-checklists": AliasRoute<"/dermatology-website-checklists">;
    "/dermatology-website-design": AliasRoute<"/dermatology-website-design">;
    "/dermatology-website-maintenance-services": AliasRoute<"/dermatology-website-maintenance-services">;
    "/dermatology-website-management-services": AliasRoute<"/dermatology-website-management-services">;
    "/dermatology-website-migration": AliasRoute<"/dermatology-website-migration">;
    "/dermatology-website-redesign": AliasRoute<"/dermatology-website-redesign">;
    "/dermatology-website-support-services": AliasRoute<"/dermatology-website-support-services">;
    "/dermatology-websites-portfolio": AliasRoute<"/dermatology-websites-portfolio">;
    "/faq": AliasRoute<"/faq">;
    "/free-dermatologist-website-audit": AliasRoute<"/free-dermatologist-website-audit">;
    "/get-a-free-quote": AliasRoute<"/get-a-free-quote">;
    "/multi-location-dermatology-website-design": AliasRoute<"/multi-location-dermatology-website-design">;
    "/our-process": AliasRoute<"/our-process">;
    "/plan-packages-and-costs": AliasRoute<"/plan-packages-and-costs">;
    "/privacy-policy": AliasRoute<"/privacy-policy">;
    "/refund-policy": AliasRoute<"/refund-policy">;
    "/service-agreement": AliasRoute<"/service-agreement">;
    "/services": AliasRoute<"/services">;
    "/terms-of-service": AliasRoute<"/terms-of-service">;
  }
}
