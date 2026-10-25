import blog1 from "@/assets/blog-1.webp.asset.json";
import blog2 from "@/assets/blog-2.webp.asset.json";
import blog3 from "@/assets/blog-3.webp.asset.json";
import blog4 from "@/assets/blog-4.webp.asset.json";
import blog5 from "@/assets/blog-5.webp.asset.json";
import blog6 from "@/assets/blog-6.webp.asset.json";
import blog7 from "@/assets/blog-7.webp.asset.json";
import blog8 from "@/assets/blog-8.webp.asset.json";
import blog9 from "@/assets/blog-9.webp.asset.json";

export const CATEGORIES = [
  "All",
  "SEO",
  "Website Design",
  "Paid Ads",
  "Patient Experience",
  "Reputation",
  "HIPAA & Compliance",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const AUTHOR_NAME = "Dermatology Website Design";
export const AUTHOR_ROLE = "Editorial Team · DWD";
export const AUTHOR_INITIALS = "DWD";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<Category, "All">;
  readTime: number;
  date: string;
  dateISO: string;
  author: string;
  authorRole: string;
  initials: string;
  tone: "primary" | "accent" | "secondary";
  featured?: boolean;
  image: string;
  imageAlt: string;
  body: { heading?: string; text?: string; list?: string[]; quote?: string }[];
  faqs?: { q: string; a: string }[];
};

const author = {
  author: AUTHOR_NAME,
  authorRole: AUTHOR_ROLE,
  initials: AUTHOR_INITIALS,
};

export const POSTS: Post[] = [
  {
    slug: "dermatology-seo-playbook-2026",
    title: "The 2026 Dermatology SEO Playbook: Rank in 90 Days",
    excerpt:
      "The exact keyword clusters, technical fixes, and content cadence we use to move dermatology practices to page one — with real timelines.",
    category: "SEO",
    readTime: 12,
    date: "Jun 24, 2026",
    dateISO: "2026-06-24",
    ...author,
    tone: "primary",
    featured: true,
    image: blog1.url,
    imageAlt: "Analytics dashboard on a laptop in a bright dermatology office",
    body: [
      {
        text: "Ranking a dermatology practice in ninety days is not a promise you make lightly — but with the right architecture, it is repeatable. In this playbook we lay out the exact ninety-day system we run for every new client, from the first technical audit through the final content push that flips the switch and moves target keywords onto page one of Google.",
      },
      {
        text: "The mistake most practices make is treating SEO as a checklist of tactics rather than a system. They chase individual blog posts, tweak title tags, and hope that momentum builds. It doesn't. What builds momentum is a cluster-first architecture, a clean technical foundation, and a content cadence that compounds week over week. Get those three right and rankings become a lagging indicator — the natural consequence of doing the right work in the right order.",
      },
      { heading: "1. Build the topical cluster before you write a single word" },
      {
        text: "Most dermatology sites lose in the SERP because their content lives in isolated pages. A Aesthetic page here, a rosacea article there, a location page in another silo — none of them internally linked in a way that tells Google what the site is authoritative about. Instead of writing standalone pieces, we group services, conditions, and locations into topical clusters. Each cluster is anchored by a pillar page (say, 'Acne treatment in Denver') that internally links to every supporting article — 'cystic acne causes,' 'best in-office acne treatments,' 'hormonal acne diet myths' — and each supporting article links back to the pillar.",
      },
      {
        text: "This structure does two things. First, it concentrates topical authority: every backlink to a supporting article passes equity to the pillar. Second, it makes internal linking obvious. There's no more guesswork about what should link to what — the cluster map tells you.",
      },
      { heading: "2. Fix the technical foundation first" },
      {
        text: "Before you write anything, run a technical audit and fix the non-negotiables. Ranking is a race with a weight class — if your Core Web Vitals are below 90 on mobile, you're already carrying handicap weight before the race starts. In our first two weeks with any new practice, we execute the following:",
      },
      {
        list: [
          "Compress every hero image to WebP or AVIF (average 70% size reduction)",
          "Get every page above 90 on mobile Core Web Vitals — LCP under 2.5s, CLS under 0.1, INP under 200ms",
          "Add FAQPage and MedicalBusiness structured data to every service page",
          "Consolidate duplicate location pages with canonical tags",
          "Fix every 404 that has inbound links, and redirect deleted URLs",
          "Submit a clean XML sitemap and validate it in Search Console",
        ],
      },
      {
        text: "These are not glamorous wins, but they compound. Once the foundation is clean, every piece of content you publish inherits that speed and structure — which means Google indexes it faster and users convert on it more often.",
      },
      { heading: "3. Content cadence that actually compounds" },
      {
        text: "The single biggest predictor of ranking speed is publishing consistency. Two pillar articles per month, four condition-focused posts, and monthly refreshes of the top three ranking pages. That's the cadence — nothing more, nothing less. Practices that try to sprint burn out. Practices that publish once a quarter never build enough surface area to catch long-tail traffic.",
      },
      {
        text: "Every pillar article is 1,800–2,400 words, structured around the intent behind the keyword. Every supporting article is 900–1,400 words, laser-focused on a single question a patient actually types into Google. And every refresh is a real refresh — new intro, new sub-sections, updated statistics, fresh internal links. Google rewards recency when the surrounding topical authority is already there.",
      },
      {
        quote:
          "The practices that win in 90 days are the ones who stop chasing tactics and commit to a system. Rankings are a lagging indicator of doing the right thing repeatedly.",
      },
      { heading: "4. The 90-day timeline, week by week" },
      {
        text: "Weeks 1–2 are audit and cluster mapping. We inventory every existing page, kill or consolidate anything that dilutes the site, and map out the three highest-leverage clusters based on service revenue and search demand. Weeks 3–6 are technical fixes and pillar page rewrites. Weeks 7–10 are the content push — we publish six new supporting articles and two new pillars. Weeks 11–13 are internal linking, refreshes, and the outreach layer where we earn our first branded backlinks.",
      },
      {
        text: "By day 90, movement is measurable — usually 8–15 target keywords have moved from beyond position 50 into the top 20, and one or two are already knocking on page one. From that point forward, the compounding takes over: every new article inherits authority from the cluster, every backlink flows into a page that's already ranking, and the system runs itself with monthly upkeep instead of quarterly rebuilds.",
      },
    ],
  },
  {
    slug: "website-redesign-checklist",
    title: "Website Redesign Checklist for Dermatology Practices",
    excerpt: "32 questions to answer before you touch a single pixel — from HIPAA forms to hero conversion.",
    category: "Website Design",
    readTime: 9,
    date: "May 30, 2026",
    dateISO: "2026-05-30",
    ...author,
    tone: "accent",
    image: blog2.url,
    imageAlt: "Modern dermatology website mockup on a desktop and tablet in a bright office",
    body: [
      {
        text: "A redesign that skips the discovery phase is just an expensive refresh. Before we open a design tool, we run every practice through this 32-question checklist across brand, conversion, compliance, and technical readiness. The point of the checklist isn't to slow things down — it's to make sure the pixels you eventually push actually serve a strategy instead of a mood board.",
      },
      {
        text: "Most redesigns fail for one of three reasons: the practice never defined what a 'good' website means for their goals, the intake and booking flow is designed around internal convenience instead of patient behavior, or the team ships a site that violates HIPAA because tracking was set up on autopilot. Every section below is designed to catch one of those failure modes before it costs you 40k and six months.",
      },
      { heading: "Brand & positioning" },
      {
        list: [
          "Who is your ideal patient in one sentence? (age, gender, income, primary concern)",
          "What are the three competitors your patients compare you to?",
          "What is the single feeling you want visitors to have in 5 seconds?",
          "If someone described your practice to a friend in one sentence, what would you want them to say?",
          "What proof do you have that this positioning is true — reviews, outcomes, credentials?",
        ],
      },
      {
        text: "If you cannot answer these five questions in a shared document that your entire team agrees on, you are not ready to design a homepage — you are ready to run a positioning workshop.",
      },
      { heading: "Conversion & booking flow" },
      {
        text: "Every extra field on your intake form drops conversion by 4–6%. Every extra click between the hero and the booking action drops conversion by 8–12%. The redesign is the moment to audit every step of the funnel, ruthlessly cut anything non-essential, and instrument the path so you can prove what actually moves the needle after launch.",
      },
      {
        list: [
          "How many clicks from homepage to booked appointment today?",
          "What is your mobile booking conversion rate today?",
          "How many form fields are required today, and which are actually used?",
          "What is the primary CTA on your homepage — and is it visible without scrolling on mobile?",
          "What happens after a form is submitted — is there a confirmation email in under 30 seconds?",
        ],
      },
      { heading: "HIPAA & compliance" },
      {
        text: "HIPAA enforcement around website tracking has escalated dramatically since 2022. If your redesign inherits your current chat widget, form provider, or analytics setup without a compliance review, you are launching a new site with an old liability.",
      },
      {
        list: [
          "Are chat widgets configured to strip PHI from logs?",
          "Do your intake forms send data over an encrypted channel to a HIPAA-compliant destination?",
          "Have you signed BAAs with every third-party service touching patient data?",
          "Is your Meta Pixel configured with server-side filtering on any page mentioning conditions?",
          "Does your session-replay tool mask form fields by default?",
        ],
      },
      { heading: "Technical readiness" },
      {
        text: "The technical section is where most redesigns quietly break. A beautiful site that loads in six seconds on 4G will lose to a plain site that loads in two. A site with broken redirects will lose the rankings you spent two years earning. Handle the boring stuff first.",
      },
      {
        list: [
          "Do you have a full inventory of current URLs and their inbound backlinks?",
          "Do you have a 1-to-1 redirect map from the old site to the new one?",
          "What is your target LCP, CLS, and INP for launch — and how will you verify?",
          "Who owns Search Console access, and is the property verified?",
          "Have you scheduled a staging-site crawl before the DNS cut-over?",
        ],
      },
      {
        text: "Answer every question in this checklist honestly before you draft the first wireframe. The teams that ship redesigns without regret are the teams that treat discovery as a deliverable, not an afterthought. Two weeks of disciplined answers now saves two quarters of rebuilding later.",
      },
    ],
  },
  {
    slug: "google-ads-derm-cost-per-lead",
    title: "How We Cut Cost-Per-Lead by 47% on Google Ads",
    excerpt: "A dermatology-specific bidding strategy, negative keyword library, and landing page pattern that compounds.",
    category: "Paid Ads",
    readTime: 8,
    date: "May 12, 2026",
    dateISO: "2026-05-12",
    ...author,
    tone: "secondary",
    image: blog3.url,
    imageAlt: "Marketer reviewing paid-ads performance charts on a widescreen monitor",
    body: [
      {
        text: "Cost-per-lead on dermatology Google Ads campaigns is usually a mess — bloated with generic keywords, mismatched landing pages, and a bidding strategy that hasn't been touched since the campaign was launched by someone who no longer works at the practice. Here's the exact framework we used to cut a $180 CPL to $95 in one quarter across three multi-location practices.",
      },
      {
        text: "The 47% cut wasn't the result of a single silver bullet. It was the compounding effect of three disciplined changes: a ruthless negative keyword library, a one-offer-per-page landing structure, and a switch from generic Maximize Conversions to a target-CPA strategy anchored to real booking data, not form-fill data. Any one of those in isolation moves the needle 10–15%. Together they compound to nearly half.",
      },
      { heading: "1. The negative keyword library" },
      {
        text: "Start with our 240-term dermatology negative list. It filters cheap curiosity clicks and clinical education searches before they cost you a dime. If someone is Googling 'how does Accutane work,' they are almost certainly a student or a curious patient, not a person about to book — but your ad will happily show up and burn budget on them unless you tell it not to.",
      },
      {
        list: [
          "Education-intent terms: 'what is,' 'how does,' 'meaning of,' 'diagram,' 'stages of'",
          "Career-intent terms: 'dermatologist salary,' 'dermatologist near me jobs,' 'residency'",
          "DIY and cheap-alternative terms: 'home remedy,' 'natural,' 'DIY,' 'cheap,' 'free'",
          "Wrong-audience terms: student, kids (unless you serve pediatric), review, forum, reddit",
          "Competitor terms unless you have a documented conquesting strategy",
        ],
      },
      {
        text: "Rebuild your negative list quarterly. Search behavior shifts, new TikTok trends spawn new curiosity queries, and yesterday's clean keyword becomes tomorrow's leaky bucket. A ninety-minute quarterly review has an outsized ROI.",
      },
      { heading: "2. Landing page pattern" },
      {
        text: "The single biggest lift in the case study came from killing the shared 'contact us' landing page and replacing it with one offer per campaign. Aesthetic campaigns land on a Aesthetic page. Acne campaigns land on an acne page. Every page has the same skeleton — hero, proof, offer, form — but the content is intent-matched to the ad group.",
      },
      {
        list: [
          "One offer per page — never mix cosmetic and medical intent",
          "Trust stack above the fold: board-certified badge, review score, patient count",
          "Single form with 4 fields max and no required phone",
          "Sticky mobile CTA visible on scroll",
          "Two social proof modules — one review carousel, one before/after with consent",
        ],
      },
      { heading: "3. Bid strategy anchored to bookings, not leads" },
      {
        text: "Google's algorithms optimize for whatever conversion signal you feed them. If you feed them form fills, they will find you the cheapest form fills — which are often the lowest-intent ones. The unlock is feeding Google a downstream conversion event: 'appointment booked' or 'appointment showed.' We do this by piping the practice's PMS or CRM back into Google Ads via offline conversion tracking, and then switching from Maximize Conversions to target-CPA with a target tied to the booked-appointment event.",
      },
      {
        text: "This one change tends to raise the visible CPL for a couple of weeks — the algorithm needs learning data — before it settles into a materially lower cost per booked patient. That's the metric that actually matters. A $60 form fill that never books is more expensive than a $140 form fill that becomes a lifetime patient.",
      },
      {
        text: "Run those three changes for a full quarter before you judge the outcome. Ninety days is enough time for the algorithm to learn, the negative list to bite, and the landing pages to accumulate enough traffic to A/B test. Practices that give up at week six almost always miss the compounding.",
      },
    ],
  },
  {
    slug: "5-star-review-flywheel",
    title: "The 5-Star Review Flywheel Every Practice Should Run",
    excerpt: "A simple, HIPAA-safe workflow that turned one practice's 3.9 average into 4.8 in six months.",
    category: "Reputation",
    readTime: 7,
    date: "Apr 28, 2026",
    dateISO: "2026-04-28",
    ...author,
    tone: "primary",
    image: blog4.url,
    imageAlt: "Smartphone showing a five-star review on a marble table with soft light",
    body: [
      {
        text: "Reviews are the second-most-viewed element on any practice's Google Business Profile after the name itself. Getting review generation right is the highest-leverage marketing activity most practices ignore, and it is one of only a handful of activities that both improves local SEO and improves patient trust in the same motion.",
      },
      {
        text: "The problem is that most practices treat review generation as a one-off — a card on the counter, a QR code that a receptionist mumbles about at checkout, a monthly plea from the practice manager at the team meeting. None of it compounds because none of it is a system. What follows is a three-touch flywheel that turned one practice's 3.9 average into 4.8 over six months, without any paid review software.",
      },
      { heading: "The three-touch flywheel" },
      {
        text: "The core idea is simple: separate the private feedback loop from the public review loop. Ask everyone privately first. Only route the happy ones to Google. Route the unhappy ones to a resolution form that lands in the practice manager's inbox before it lands on the internet.",
      },
      {
        list: [
          "Touch 1: Post-visit SMS at the 4-hour mark asking for a private rating (1–5)",
          "Touch 2: If rating is 4–5 stars, auto-invite to Google with a one-tap link. If 1–3, route to a private resolution form",
          "Touch 3: Weekly staff huddle reviewing the last 20 responses and closing feedback loops",
        ],
      },
      { heading: "Why the private rating step matters" },
      {
        text: "The private rating step is the entire game. Without it you are gambling that every patient who was asked to review had a five-star experience — and they didn't. Every practice has bad days, missed follow-ups, and grumpy visits that had nothing to do with clinical quality. Sending every patient straight to Google amplifies that noise into your rating.",
      },
      {
        text: "The private step also gives you an early-warning system for operational issues. When three patients in one week rate you 3 stars and mention wait times in the free-text field, you have a signal your practice manager can act on this quarter, not next year when the Yelp average has already slipped.",
      },
      { heading: "Timing and tone of the SMS" },
      {
        text: "Send the request 4 hours post-visit — long enough for the patient to be home and settled, short enough that the visit is still fresh. Keep the message conversational: 'Hi Jane, this is Dr. Ruiz. Two seconds — how did today go? Reply 1 (rough) to 5 (great).' No branded template, no logos, no pixel-perfect email. The response rate on a short conversational SMS is 4–6x the response rate on a designed email.",
      },
      { heading: "The weekly huddle" },
      {
        text: "The final piece is the huddle. Every Monday morning the manager reviews the last 20 responses aloud with the front desk and lead clinical staff. Positive themes get named. Negative themes get owned. Any 1–3 star response gets a documented follow-up plan by the end of that huddle, and the follow-up is tracked to close.",
      },
      {
        text: "This is where the flywheel becomes cultural. Once the team sees their names in praise every Monday and sees issues resolved instead of buried, they stop viewing reviews as a marketing problem and start viewing them as a mirror of the work they did last week. That shift is the thing that moves a 3.9 to a 4.8 — not the software, not the QR code, not the card on the counter.",
      },
    ],
  },
  {
    slug: "hipaa-website-mistakes",
    title: "7 HIPAA Website Mistakes We Still See in 2026",
    excerpt: "Meta pixels, intake forms, chat widgets — where PHI leaks happen and how to shut them down this week.",
    category: "HIPAA & Compliance",
    readTime: 9,
    date: "Apr 09, 2026",
    dateISO: "2026-04-09",
    ...author,
    tone: "accent",
    image: blog5.url,
    imageAlt: "Brass padlock resting on a stack of HIPAA compliance documents",
    body: [
      {
        text: "HIPAA enforcement around website tracking has changed dramatically since the 2022 OCR guidance. If your site still relies on a default Meta Pixel, default GA4 configuration, or a non-BAA chat widget, you have a leak — and you probably don't know it because leaks are silent. The good news: every one of the seven mistakes below can be closed in a week with a coordinated tech and legal push. The bad news: most practices haven't started.",
      },
      {
        text: "The purpose of this post is not to scare you into paralysis. It's to give you a concrete checklist you can hand to whoever owns your website, plus a plain-English description of why each item is a risk. Skim the list, mark the ones you know are open, and start with the highest-severity leak on Monday morning.",
      },
      { heading: "The seven mistakes" },
      {
        list: [
          "Meta Pixel firing on booking pages without server-side filtering",
          "GA4 tracking URL parameters that contain condition names",
          "Chat widgets storing conversation logs on non-HIPAA infrastructure",
          "Intake forms posting to third-party form services without a BAA",
          "Live-chat visitor IPs stored alongside health inquiries",
          "Third-party embedded videos loading before consent",
          "Session-replay tools recording form-field input",
        ],
      },
      { heading: "Why the Meta Pixel is the biggest single risk" },
      {
        text: "The Meta Pixel is the highest-severity item on the list because it is the most invisible. A default installation fires on every page load and sends URL, referrer, and any form input Meta can grab back to Facebook's servers — including URLs like /schedule/acne-consult or /request/mole-check. That URL is arguably PHI the moment it is tied to an IP address that can be resolved back to a person.",
      },
      {
        text: "The fix is not to remove the pixel. The fix is to run it through the Conversions API server-side with strict URL and event filtering, and to strip any query string, path segment, or event payload that could reveal condition intent. That work takes an engineer roughly two days. It is the highest-ROI compliance work you can do this quarter.",
      },
      { heading: "GA4 is the second-most-common leak" },
      {
        text: "GA4 leaks in a different way: URL parameters that contain diagnostic language, or event payloads that were set up on autopilot and never reviewed. Sort your GA4 events by frequency and read the top 50. If any event name or parameter contains condition text, that data has been streaming into Google's servers unencrypted from a HIPAA perspective. Rename, strip, or replace those events with clean identifiers.",
      },
      { heading: "Chat widgets and intake forms" },
      {
        text: "Chat widgets and intake forms are the third category. Any tool that captures conversational input needs a Business Associate Agreement before it touches a patient inquiry. If your current chat vendor cannot produce a signed BAA within an hour of asking, replace them. The good HIPAA-compliant vendors have BAAs on the shelf; the risky ones do not.",
      },
      {
        text: "The same rule applies to intake forms. If your form provider stores submissions on their servers without a BAA, every submission is a compliance event. Move to a form solution with a signed BAA (or self-host on your own HIPAA-eligible infrastructure) before you launch your next campaign.",
      },
      { heading: "Session replay, embedded video, and the long tail" },
      {
        text: "Session-replay tools are extraordinary product-research tools and extraordinary HIPAA landmines. Every replay tool must be configured to mask every form field by default, mask any element containing text that could be PHI, and store recordings on infrastructure covered by a BAA. Embedded videos from YouTube or Vimeo load third-party cookies before user consent — swap to a privacy-first embed or a lite loader that only initializes after explicit action.",
      },
      {
        text: "The compounding message is this: HIPAA compliance in 2026 is a website engineering problem as much as a legal one. Treat it as recurring maintenance, not a one-time audit. Review your tracking stack quarterly, retire vendors that cannot sign BAAs, and document every fix in a compliance log your leadership team can point to when the OCR letter eventually arrives.",
      },
    ],
  },
  {
    slug: "patient-portal-conversion",
    title: "The Patient Intake Form That Doubled Bookings",
    excerpt: "A four-step form pattern designed around cognitive load — with A/B test data from three practices.",
    category: "Patient Experience",
    readTime: 6,
    date: "Mar 22, 2026",
    dateISO: "2026-03-22",
    ...author,
    tone: "secondary",
    image: blog6.url,
    imageAlt: "Patient completing an intake form on a tablet in a bright waiting room",
    body: [
      {
        text: "One long form is friction. Four short steps feels like a conversation. That single pattern shift doubled conversion across three test practices in under 60 days — and it is one of the cheapest wins in the entire dermatology marketing playbook because the form was the only variable we touched.",
      },
      {
        text: "The reason the four-step pattern works is straightforward: humans complete tasks that feel finite. A long form with 12 visible fields signals a long commitment, and every extra required field is another opportunity for the visitor to close the tab. A four-step form shows only the first field on load, and the visual progress bar rewards each completed step with a small dopamine hit. By the time the visitor sees the phone-number step, they have already committed emotionally to finishing.",
      },
      { heading: "The four steps" },
      {
        list: [
          "Step 1: What brings you in? (single choice, 4–6 options)",
          "Step 2: When would you like to be seen? (day + time range)",
          "Step 3: A little about you (name + email)",
          "Step 4: Best phone to reach you (with time preference)",
        ],
      },
      { heading: "Why step order matters" },
      {
        text: "The order of the four steps is not arbitrary. The first step captures intent, which is the piece of data your practice most needs and the piece the visitor is happiest to give — nobody hesitates to say why they are visiting. The second step captures scheduling preference, which increases the visitor's mental commitment because they have now visualized the appointment in their calendar. Only after those two commitments do you ask for identifying information.",
      },
      {
        text: "Practices that reverse the order — asking for name and email first — see conversion drop by 30–40%. The visitor has not yet committed to anything, and 'give me your email address' feels transactional. The moment you ask for identifying information after the visitor has already envisioned the appointment, the exchange feels conversational.",
      },
      { heading: "The one field you should never require: phone" },
      {
        text: "Every A/B test we ran on the phone field pointed to the same conclusion: required phone drops conversion by 12–18%. Yet almost every practice we onboard has required phone. The fix is to make phone optional on the form and follow up by email for scheduling. Practices that make this change usually keep 90% of the phone data they used to require (people volunteer it) and gain the 12–18% of visitors who would have bounced.",
      },
      { heading: "Testing methodology and what to measure" },
      {
        text: "Do not measure form-fill rate in isolation. Measure booked appointment rate and, ideally, appointment-showed rate. A form that fills faster but produces no-shows is not a win. Instrument the funnel from ad or organic click through booked appointment, and A/B test the four-step pattern against your current long form for at least three weeks per variant to accumulate statistically meaningful traffic.",
      },
      {
        text: "Once the four-step pattern beats the baseline (it almost always does), lock it in and move to the next test — usually the CTA copy, the trust stack above the form, or the confirmation email that fires after submission. Every one of those has another 5–10% waiting to be found once the form itself is out of the way.",
      },
    ],
  },
  {
    slug: "local-seo-multi-location",
    title: "Local SEO for Multi-Location Dermatology Groups",
    excerpt: "Location pages, GBP strategy, and internal linking that ranks every clinic — not just the flagship.",
    category: "SEO",
    readTime: 10,
    date: "Mar 04, 2026",
    dateISO: "2026-03-04",
    ...author,
    tone: "primary",
    image: blog7.url,
    imageAlt: "Overhead flat lay of a city map with teal location pins marking dermatology clinics",
    body: [
      {
        text: "Multi-location dermatology groups often have one clinic that ranks and five that don't. The fix is rarely about the clinic itself — it's about the site architecture that starves smaller locations of authority. The playbook below is the exact system we use to move every location, not just the flagship, into the top three for its city or neighborhood keyword.",
      },
      {
        text: "The reason most multi-location groups end up with one dominant location is entirely structural. The original site was designed for the original clinic. When the group expanded, the marketing team added location pages by copy-pasting the flagship's page and swapping the city name. The result is thin, duplicative content that Google correctly treats as low quality — so every new location page inherits none of the flagship's authority.",
      },
      { heading: "The location page pattern" },
      {
        text: "Every location gets a page with unique intro copy, embedded map, provider list, and hyper-local service highlights. Zero duplicate content, zero copy-paste. That means an actual human — ideally the location manager — has to write two or three paragraphs about the neighborhood, the parking, the surrounding streets, and the specific services this clinic emphasizes.",
      },
      {
        list: [
          "Unique 250–400 word intro that mentions the neighborhood by name",
          "Embedded Google Map with the exact clinic pin",
          "Location-specific provider list with headshots and bios",
          "Service highlights weighted to what this clinic actually books most",
          "3–5 real patient reviews for this location, not the flagship's",
          "Location-specific FAQ (parking, wheelchair access, languages spoken)",
        ],
      },
      { heading: "Internal linking that distributes authority" },
      {
        text: "The second lever is internal linking. If every backlink to your site points to the homepage, and your homepage links equally to every location page, you are dividing authority evenly and starving all locations of the concentrated equity they need to rank. The fix is a hub-and-spoke pattern: every service page links down to the location pages where that service is offered, and every location page links down to the specific service pages the location emphasizes.",
      },
      { heading: "Google Business Profile strategy per location" },
      {
        text: "Every location gets its own fully optimized GBP with a unique local phone number, unique services list, unique service area, and its own review-generation flywheel. GBP is a ranking factor for the map pack and a ranking factor indirectly for the organic pack via NAP consistency. Skimp on it and you leave the largest single lever untouched.",
      },
      {
        list: [
          "Unique primary category matched to primary service, not 'dermatologist' generically",
          "Weekly Google Posts specific to that location's promotions or provider news",
          "Photos uploaded monthly, geotagged for the location",
          "Review responses within 48 hours, personalized per review",
          "Service area radius set to actual patient draw, not aspirational geography",
        ],
      },
      { heading: "Local content that isn't the location page" },
      {
        text: "The last piece is local editorial content. For each city or neighborhood you serve, publish one long-form article per quarter that ties dermatology to a genuinely local topic — sun exposure at a specific local beach, air quality at a specific neighborhood, water hardness in a specific zip code. Google recognizes this as topical local authority and it moves the location page above competitors whose only local signal is their address.",
      },
      {
        text: "Do all four of these — unique location pages, hub-and-spoke internal linking, per-location GBP discipline, and quarterly local editorial — for six months and you will watch the historically weakest location climb into the same top-three position the flagship has enjoyed for years. Local SEO is not luck, and it is not the flagship's fault the satellite doesn't rank. It is architecture, and architecture is fixable.",
      },
    ],
  },
  {
    slug: "hero-that-converts",
    title: "Anatomy of a Dermatology Hero That Converts at 9%",
    excerpt: "The headline formula, proof stack, and single CTA that we've tested across 40+ homepages.",
    category: "Website Design",
    readTime: 7,
    date: "Feb 18, 2026",
    dateISO: "2026-02-18",
    ...author,
    tone: "accent",
    image: blog8.url,
    imageAlt: "Designer's iMac showing an elegant dermatology homepage hero with plants and swatches",
    body: [
      {
        text: "The hero is the single most measured section on any dermatology homepage. Get it right and everything downstream compounds. Get it wrong and no amount of SEO will save you — because Google will send you traffic that bounces back to the SERP inside eight seconds, and the algorithm will slowly stop sending you traffic at all.",
      },
      {
        text: "The pattern below is not theoretical. It is the exact hero structure we have shipped across more than forty dermatology homepages, tested against baseline heroes, and measured with real booking events. The average lift is 3.4x on primary CTA click-through and 2.1x on booked appointment rate. Nine percent conversion is the top decile of the sample and it is repeatable when the four ingredients below are all present.",
      },
      { heading: "The formula" },
      {
        list: [
          "Headline: outcome + specificity (e.g. 'Clearer skin in Austin — board-certified since 2004')",
          "Sub-headline: your differentiator in one sentence",
          "Proof stack: 3 trust markers (rating, patient count, credentials)",
          "Single CTA: 'Book your visit' — not 'Learn more'",
        ],
      },
      { heading: "Why 'outcome + specificity' beats every other headline" },
      {
        text: "The headline is the single most weighted element on the entire homepage. A generic headline ('Welcome to Austin Dermatology') tells the visitor nothing they didn't already know from your URL. An outcome-focused headline ('Clearer skin in Austin — board-certified since 2004') tells the visitor what they will get, that you serve their city, and that you have the credentials to deliver — all in a scan.",
      },
      {
        text: "The specificity matters as much as the outcome. Vague outcome headlines ('Better skin for everyone') feel like marketing. Specific outcome headlines ('Clear skin for adults with acne, in six weeks') feel like a promise. Specificity is the single biggest lift we see when we swap a generic headline for a targeted one.",
      },
      { heading: "The proof stack" },
      {
        text: "Three trust markers is the sweet spot. One feels like an anecdote, five feels like a wall, three feels like proof. The three we choose in almost every case are: aggregate review rating with count (4.9 from 1,200 reviews), patient count with time frame (12,000 patients since 2004), and a credential badge (board-certified, teaching hospital, media mention). Together they answer the three questions every visitor is silently asking: are you good, are you experienced, and are you legitimate.",
      },
      { heading: "Single CTA discipline" },
      {
        text: "Multiple CTAs in the hero always underperform a single CTA. The moment a visitor sees 'Book now' and 'Learn more' side by side, decision friction spikes and click-through drops. The dominant CTA should be the highest-intent action available — for almost every practice that is 'Book your visit,' not 'Contact us' and not 'Learn more.' Secondary actions belong in the sub-nav or a scroll-triggered element, never in the hero.",
      },
      {
        text: "Ship the four ingredients together and measure the compound. A great headline with a weak proof stack underperforms a good headline with a strong stack. A strong stack with two competing CTAs underperforms a modest stack with one confident CTA. Nine percent is the ceiling when every element pulls in the same direction — and it is a ceiling most practices never touch because they optimize one element at a time in isolation.",
      },
    ],
  },
  {
    slug: "reactivation-email-sequence",
    title: "The Lapsed-Patient Email Sequence Worth $180k / yr",
    excerpt: "Six emails, one offer, and the segmentation logic that pulls dormant patients back into the chair.",
    category: "Patient Experience",
    readTime: 8,
    date: "Feb 02, 2026",
    dateISO: "2026-02-02",
    ...author,
    tone: "secondary",
    image: blog9.url,
    imageAlt: "Smartphone showing a soft-lit inbox next to a coffee cup and croissant on linen",
    body: [
      {
        text: "A patient who hasn't visited in 12 months is 4x more likely to book from an email than from any paid channel. But most practices never send them one. Here is the six-email sequence we deploy for every new client, along with the segmentation logic that decides which patients get which offer — because a generic 'we miss you' email to 10,000 lapsed patients underperforms a targeted six-email arc to 1,000.",
      },
      {
        text: "The $180k number in the headline is not marketing hype. It is the average incremental revenue we measure in the first twelve months after deploying this sequence for a mid-sized single-location practice with roughly 8,000 lapsed contacts. Multi-location groups routinely see multiples of that. The math works because the cost of the sequence is zero incremental ad spend and the audience is already qualified — they've been to the practice at least once.",
      },
      { heading: "Segmentation before content" },
      {
        text: "Before you write a single email, segment the audience. Lump every lapsed patient into one list and every offer will feel generic to somebody. Split the list into three cohorts: 12–18 months since last visit (soft nudge), 18–36 months (structured re-engagement), and 36+ months (aggressive win-back with a real incentive). Each cohort gets the same six-email skeleton but with different tone, different offer, and different removal criteria.",
      },
      { heading: "The sequence" },
      {
        list: [
          "Email 1: We miss you — friendly hello with no ask",
          "Email 2: What's new at the practice",
          "Email 3: A gentle prompt to book their annual skin check",
          "Email 4: Educational content on skin cancer prevention",
          "Email 5: A time-limited offer specific to their last visit type",
          "Email 6: Last call, then remove from sequence",
        ],
      },
      { heading: "Why 'no ask' as the first email matters" },
      {
        text: "The first email in the sequence deliberately does not ask for anything. It is a warm reintroduction from the practice manager or the physician's assistant, ideally written in first-person voice with a real signature. The purpose is to remind the recipient that this practice remembers them as a person, not a marketing segment. Response rates on 'no ask' emails outperform 'book now' emails by 5–8x, and the responders self-identify as high intent.",
      },
      { heading: "The offer arrives in email 5, not email 1" },
      {
        text: "Practices routinely make the mistake of leading with the offer. That trains lapsed patients to expect discounts every time they hear from you, and it converts the lowest-intent segment of your list on price alone. The six-email arc pushes the offer to email five, after four touchpoints of warmth and education. By the time the offer arrives, the patient has been re-anchored to the practice's brand, not its discount.",
      },
      { heading: "The removal step protects deliverability" },
      {
        text: "Email six is the last-call email and it is also the removal trigger. Any recipient who has not opened any of the previous five emails and does not open email six is removed from the sequence. That protects your sender reputation with Gmail and Outlook — sending to unengaged addresses is the single fastest way to drop into promotions or spam. Aggressive removal actually improves the results of the next campaign because the remaining list is denser and more engaged.",
      },
      {
        text: "Deploy the sequence once per year to each cohort, refresh the copy annually, and treat the removed audience as a separate long-tail cohort you re-engage every 18 months with a fresh sender name. Compound over three years and the $180k number tends to double or triple as the sequence matures and the segmentation gets more precise.",
      },
    ],
  },
  {
    slug: "dermatology-marketing-strategies",
    title: "Dermatology Marketing Strategies: A Practice-Owner's Guide for 2026",
    excerpt:
      "A field-tested guide to dermatology marketing strategies — Google Business Profile, medical E-E-A-T content, reviews, paid search, and referrals — for solo and multi-location practices.",
    category: "SEO",
    readTime: 14,
    date: "Jul 15, 2026",
    dateISO: "2026-07-15",
    ...author,
    tone: "accent",
    image: blog3.url,
    imageAlt: "Dermatologist reviewing marketing analytics on a tablet in a modern clinic",
    body: [
      {
        text: "If you own or run a dermatology practice, marketing is no longer a side project you delegate to whoever built your website. It is the growth engine — the difference between a schedule that is 60% booked and one that is turning patients away three weeks out. This guide walks through the dermatology marketing strategies we actually run for clients, in the order we run them, so you can decide what to build in-house and what to hand off.",
      },
      {
        text: "None of what follows is theory. Every tactic below has moved real practices from stagnant referral pipelines to double-digit monthly new-patient growth. Read it as a working playbook, not a marketing philosophy course.",
      },
      { heading: "1. Own your Google Business Profile before anything else" },
      {
        text: "Google Business Profile (GBP) is the single highest-leverage asset in local dermatology marketing. For most practices, the map pack drives more new-patient calls than the entire organic result set below it. And yet the majority of clinics we audit have an incomplete profile, no service list, no photos updated in the last two years, and a review response rate below 20%.",
      },
      {
        list: [
          "Verify the profile and claim every location individually — never share one profile across multiple addresses",
          "Fill every service field: acne, eczema, Mohs surgery, Aesthetic, laser resurfacing, pediatric dermatology, and every other procedure you offer",
          "Upload fresh interior, exterior, team, and treatment-room photos every quarter — GBP rewards recency",
          "Post weekly updates about services, seasonal promotions, or new providers — treat it like a lightweight social channel",
          "Respond to every review, positive or negative, within 48 hours",
        ],
      },
      {
        text: "The clinics that treat GBP as a living asset out-rank the ones that treat it as a directory listing. It is genuinely that simple.",
      },
      { heading: "2. Build content around medical E-E-A-T, not keyword volume" },
      {
        text: "Dermatology is a YMYL — Your Money or Your Life — vertical, which means Google applies its strictest quality standards to every page. Ranking dermatology content is not about keyword density or word count; it is about demonstrating Experience, Expertise, Authoritativeness, and Trust on every page a patient might land on.",
      },
      {
        text: "That means every clinical page should carry a byline from a board-certified dermatologist, a reviewer credit with credentials, a last-updated date, and citations to peer-reviewed sources or major society guidelines (AAD, ASDS, ISDS). Author bios should link to the provider's page on your own site, which in turn should carry board certifications, residency, publications, and any hospital affiliations. Google reads all of it — and so do patients.",
      },
      {
        quote:
          "Dermatology practices that treat every service page like a mini clinical review out-rank agencies producing three times the volume of thin, generic content.",
      },
      { heading: "3. Turn reviews into a compounding acquisition channel" },
      {
        text: "Ninety-two percent of patients read reviews before booking a new dermatology provider, and the average patient reads at least seven before deciding. A practice sitting at 4.6 stars with 40 reviews will lose to a practice at 4.8 with 400 — every time.",
      },
      {
        text: "The tactical answer is a review-request automation triggered off your PMS or EHR: a text and email sent 24 hours after every visit, with a one-tap link to Google and secondary links to Healthgrades and Vitals. Add response templates for your front desk so every review — five-star or one-star — gets a personal, HIPAA-safe reply within two business days.",
      },
      { heading: "4. Use Google Ads to buy your way onto page one while SEO compounds" },
      {
        text: "Organic dermatology SEO takes 6–12 months to compound. Google Ads takes 48 hours. Run them together. Target high-intent, service-specific keywords ('mohs surgery Denver,' 'pediatric dermatologist near me,' 'CoolSculpting consultation'), point every ad to a service-specific landing page (never the home page), and track bookings — not clicks — as the primary conversion.",
      },
      {
        text: "Budget rule of thumb: allocate 60% of paid spend to bottom-of-funnel service keywords, 25% to condition keywords ('eczema treatment,' 'cystic acne'), and 15% to competitor conquesting. Kill any keyword that costs more than $150 per booked patient — dermatology has enough demand that you never have to overpay for a single visit.",
      },
      { heading: "5. Rebuild referrals as an intentional channel" },
      {
        text: "Every dermatology practice was built on referrals — from primary care, from OB/GYNs, from oncologists, from other specialists. Most stop investing in that channel the moment they hit capacity. Then a competitor opens across town, poaches two referring PCPs, and the pipeline dries up in six months.",
      },
      {
        text: "Build a formal referring-provider program: a quarterly report back to referrers showing outcomes on the patients they sent, a HIPAA-compliant provider portal for direct scheduling, quarterly in-office lunches with the top 20 referrers, and an annual thank-you gift that is memorable rather than expensive. Referrals compound faster than any digital channel — one warm PCP relationship is worth ten cold ad impressions.",
      },
      { heading: "6. Measure booked appointments, not vanity metrics" },
      {
        text: "The final piece is measurement. Impressions, clicks, and even form fills are proxies. The number that matters is booked new-patient appointments per channel per month. Wire every channel — organic, GBP, ads, referrals, social — into a single dashboard that reports on that one number, and reallocate spend monthly based on what actually books.",
      },
      {
        text: "Do the six things above consistently for twelve months and the marketing question stops being 'how do we get more patients' and becomes 'which providers do we hire next.' That is the entire point of building a marketing system: it should force capacity decisions, not chase them.",
      },
    ],
    faqs: [
      {
        q: "What is the most effective dermatology marketing strategy in 2026?",
        a: "For most practices, the highest-leverage single channel is a fully optimized Google Business Profile paired with an active review-generation system. GBP drives more map-pack calls than the entire organic result set below it, and reviews are the single biggest conversion lever once a patient lands on your profile or website.",
      },
      {
        q: "How much should a dermatology practice spend on marketing?",
        a: "Most growing dermatology practices allocate 6–10% of gross revenue to marketing, split roughly 40% organic (SEO, content, GBP), 35% paid (Google Ads, retargeting), 15% referral and community programs, and 10% technology and analytics. Mature practices at capacity can drop to 3–5%, focused mostly on retention and referrals.",
      },
      {
        q: "How long does dermatology SEO take to show results?",
        a: "Expect meaningful movement on branded and long-tail keywords in 60–90 days, and competitive service and condition keywords in 6–12 months. Practices in less competitive metros can see top-3 rankings in under six months; dense urban markets take 9–15 months of consistent publishing and technical work.",
      },
      {
        q: "Are Google Ads worth it for dermatology practices?",
        a: "Yes, when they target bottom-of-funnel service keywords with dedicated landing pages and track booked appointments — not clicks — as the primary conversion. Kill any keyword that costs more than $150 per booked patient. Dermatology has enough demand that you never have to overpay for a single visit.",
      },
      {
        q: "What is medical E-E-A-T and why does it matter for dermatology content?",
        a: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trust — the quality signals Google applies to YMYL (Your Money or Your Life) content. For dermatology, every clinical page should carry a board-certified byline, a reviewer credit, citations to AAD or peer-reviewed sources, and a last-updated date. Sites that demonstrate real medical E-E-A-T consistently out-rank sites producing higher volumes of thin content.",
      },
    ],
  },
];

export const toneMap: Record<Post["tone"], { chip: string; ring: string; block: string }> = {
  primary: {
    chip: "bg-brand-primary/10 text-brand-primary",
    ring: "hover:border-brand-primary/50",
    block: "bg-brand-primary text-brand-primary-foreground",
  },
  accent: {
    chip: "bg-brand-accent/20 text-foreground",
    ring: "hover:border-brand-accent/60",
    block: "bg-brand-accent text-foreground",
  },
  secondary: {
    chip: "bg-brand-secondary/20 text-foreground",
    ring: "hover:border-brand-secondary/60",
    block: "bg-brand-secondary text-foreground",
  },
};

export function findPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, category: Post["category"]): Post[] {
  return POSTS.filter((p) => p.slug !== slug && p.category === category).slice(0, 3);
}
