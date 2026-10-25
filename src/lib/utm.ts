/**
 * UTM + landing-page tracking for the single sitewide form.
 * UTM values and the first landing page are stored in sessionStorage on the
 * first page view so they survive navigation to /contact.
 */

const STORAGE_KEY = "dwd_tracking";

export type TrackingData = {
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

/** Call once on app mount (client only). Stores first-landing UTMs + page. */
export function captureTrackingOnLanding(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return; // only first landing
    const params = new URLSearchParams(window.location.search);
    const data: TrackingData = {
      source_page: window.location.pathname + window.location.search,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
    };
    for (const key of UTM_KEYS) {
      data[key] = params.get(key);
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage unavailable — tracking is best-effort
  }
}

/** Read the stored tracking data (null fields when nothing was captured). */
export function getTracking(): TrackingData {
  const empty: TrackingData = {
    source_page: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  };
  if (typeof window === "undefined") return empty;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    return { ...empty, ...(JSON.parse(raw) as Partial<TrackingData>) };
  } catch {
    return empty;
  }
}
