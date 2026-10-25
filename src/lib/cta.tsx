/**
 * SINGLE SITEWIDE CALL TO ACTION — the only primary CTA on the site.
 *
 * OWNER: to change the call to action, edit these two values here and the
 * translated label in src/i18n/locales/<lang>/ui.json under "cta.label".
 * Every primary CTA button on every page reads from this constant — do not
 * hardcode another CTA label or destination anywhere else.
 */
export const CTA_LABEL = "Get Your Free Website Audit";
export const CTA_URL = "/contact";

/** i18n key (ui.json / default namespace) holding the translated CTA label. */
export const CTA_I18N_KEY = "cta.label";

import { useTranslation } from "react-i18next";

/** Renders the single shared CTA label, translated via ui.json "cta.label". */
export function CtaLabel() {
  const { t } = useTranslation();
  return <>{t(CTA_I18N_KEY, { defaultValue: CTA_LABEL })}</>;
}
