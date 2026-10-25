export type LeadScore = "High" | "Medium" | "Low";

export type LeadScoreInput = {
  email?: string | null;
  company_name?: string | null;
  website_url?: string | null;
  budget?: string | null;
  timeline?: string | null;
  project_details?: string | null;
  nda_required?: boolean | null;
  phone?: string | null;
};

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "msn.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "mail.com",
  "yandex.com",
  "zoho.com",
]);

function budgetPoints(budget?: string | null): number {
  if (!budget) return 0;
  const digits = budget.replace(/[^\d]/g, "");
  const numbers = budget.match(/\d[\d,]*/g)?.map((n) => Number(n.replace(/,/g, ""))) ?? [];
  const max = numbers.length ? Math.max(...numbers) : Number(digits || 0);
  if (max >= 10000) return 25;
  if (max >= 5000) return 20;
  if (max >= 2500) return 14;
  if (max >= 1000) return 8;
  if (max > 0) return 4;
  // Non-numeric buckets like "Not sure yet"
  return /not sure|undecided|unknown/i.test(budget) ? 0 : 4;
}

function timelinePoints(timeline?: string | null): number {
  if (!timeline) return 0;
  const t = timeline.toLowerCase();
  if (/asap|immediat|urgent|this week|1-2 week|1–2 week/.test(t)) return 20;
  if (/month|4 week|30 day/.test(t)) return 14;
  if (/quarter|2-3 month|2–3 month|60 day|90 day/.test(t)) return 8;
  if (/just (looking|research)|no rush|later|6 month|next year/.test(t)) return 2;
  return 6;
}

/**
 * Scores a submission 0-100 and buckets it as High / Medium / Low.
 */
export function calculateLeadScore(input: LeadScoreInput): {
  score: LeadScore;
  points: number;
} {
  let points = 0;

  const email = (input.email ?? "").trim().toLowerCase();
  const domain = email.includes("@") ? email.split("@")[1] ?? "" : "";
  if (domain) {
    if (FREE_EMAIL_DOMAINS.has(domain)) points += 5;
    else points += 20; // business / practice domain
  }

  if ((input.company_name ?? "").trim().length >= 2) points += 10;

  const site = (input.website_url ?? "").trim();
  if (site.length > 3) points += 10;

  if ((input.phone ?? "").trim().length >= 6) points += 5;

  points += budgetPoints(input.budget);
  points += timelinePoints(input.timeline);

  const detailsLength = (input.project_details ?? "").trim().length;
  if (detailsLength >= 400) points += 15;
  else if (detailsLength >= 200) points += 11;
  else if (detailsLength >= 80) points += 7;
  else if (detailsLength >= 20) points += 3;

  if (input.nda_required) points += 5;

  const score: LeadScore = points >= 60 ? "High" : points >= 35 ? "Medium" : "Low";
  return { score, points };
}
