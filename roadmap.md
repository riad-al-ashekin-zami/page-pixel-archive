# Roadmap — Formspree audit integration

## Homepage visual redesign

- [ ] Restyle included features, practice types, treatment pages, process and after-launch services; merge the duplicate non-negotiables section.
- [ ] Localize only new labels/descriptions across 12 languages; preserve existing copy and destinations.
- [ ] Verify first-render content, heading structure, links, mobile fit, reduced motion and performance comparison.
- [ ] Provide English and Spanish desktop/mobile section screenshots.

## Four original homepage concepts

- [x] Check invented clinic names for existing dermatology websites.
- [x] Keep LumaFern and add medical, aesthetic and multi-location concepts with translated descriptions in all 12 languages.
- [x] Verify four cards, concept-only classifications, images and unchanged 420-URL sitemap.
- [x] Request Lovable publishing and check all 12 portfolio redirects and the 420-URL sitemap on the live custom domain.
- [ ] Deploy four concepts to the Netlify custom domain — requires the owner's Netlify deployment; custom domain still shows one card.

31 targeted tests passed; four loaded cards and localized descriptions verified in every language, with desktop and mobile screenshots. Existing Arabic hero counter hydration mismatch observed outside the examples section; unchanged by this scoped task. Basic security checks returned no issues; deep code review was not requested.

## Portfolio consolidation and owner H1 follow-up

- [x] Classify all portfolio items and share the list before any publishing.
- [x] Add honestly labelled examples after homepage included features in all 12 languages; remove the old work section.
- [x] Redirect all portfolio URLs, update localized examples links, and reduce sitemap to 420.
- [x] Set the six requested keyword H1s with existing slogans retained below.
- [x] Verify redirects, first-render cards, metadata and sitemap; report results.

## Keyword ownership consolidation (October 2026)

- [x] Apply metadata, indexing and keyword ownership updates across the 12 existing languages.
- [x] Consolidate three competing paths with same-language permanent redirects; verify all 36 on the live domain.
- [x] Update localized headings, owner links, homepage/SEO content and FAQ data.
- [x] Replace the 13-URL inventory with 36 public logical paths × 12 languages; exclude About, legal, private and redirected paths.
- [x] Restore `/sitemap.xml`; verify all 432 sitemap pages have one H1, one canonical, one robots instruction and 13 alternates.
- [x] Provide the page-by-page report, 30 passing tests, browser flow checks and live-domain observations.
- [ ] Native-speaker review of drafted translations — requires owner/native-language reviewer.
- [ ] Verify Google recrawling and ranking recovery — requires subsequent Search Console evidence.

Content deduplication and full expanded-answer checks for every pre-existing accordion are not claimed complete; these limits are recorded in the report.

## Sitewide browser icon

- [x] Match the conventional fallback icon and sitemap icon to the homepage brand icon; keep robots.txt plain text and sitemap machine-readable.
- [x] Verify icon delivery and sitemap rendering.

Both icon URLs return branded images with matching pixels; the sitemap browser
view references the homepage PNG and renders all 13 rows. Netlify redeployment
and a browser cache refresh are needed for the live site; raw-text tab icon
display remains browser-controlled.

## About indexing

- [x] Add English `/about` to the shared indexing allowlist, bringing it to 13 URLs.
- [x] Verify the sitemap and About indexing instruction locally and check production.
- [x] Superseded by the new keyword brief: live About is now deliberately noindex and the sitemap contains all localized public pages.

Preview verification passed: `/about` serves `index,follow`, the sitemap contains
exactly the 13 shared allowlist entries, and all six indexing/location tests pass.
Production currently still serves 12 sitemap URLs and `/about` as `noindex,follow`.

## Sitemap presentation

- [x] Move the sitemap to `/sitemap_index.xml`, remove the old endpoint, and update robots.txt.
- [x] Verify the new endpoint and removal of the old endpoint (new XML renders all 12 pages; old endpoint returns 404; location tests pass).

- [x] Add an organized browser presentation without changing sitemap URLs, alternates, or timestamps.
- [x] Verify XML preservation and desktop/mobile browser rendering.

Verified all 12 URLs and hreflang alternates remain unchanged, no lastmod is
invented, the table renders on desktop/mobile without horizontal overflow,
and the Contact link opens the correct live page. Netlify redeployment is
required for the new presentation to appear on the custom domain.

## Live site media and language

- [x] Fix external-host image delivery for logos, preloader and all stored images.
- [x] Keep English as the default without automatic language redirects.
- [x] Verify images, icons and language selection in the browser.

All 16 CDN image destinations returned image responses, all decoded in the
preview, header icons rendered, and a Spanish-browser visit stayed in English
while manual Spanish selection worked. Netlify must redeploy the synced changes;
the updated rewrite is not yet verified on the production deployment.

- [x] Forward the existing audit form to the owner's Formspree endpoint after saving the lead.
- [x] Test forwarding success/failure and verify a real submission is saved and accepted.
- [x] Remove unverified email-confirmation claims and delete only the test lead.

Formspree accepted the test; inbox delivery and visitor auto-replies are controlled by the owner's Formspree settings and remain unverified.

## Netlify deployment

- [x] Configure Netlify's server target and correct publish directory for GitHub deployments.
- [x] Verify configuration and document external-hosting limitations.

Configuration validated against the installed Nitro preset; a live Netlify deployment is not verified. Cloud credentials do not transfer through GitHub, so the existing submission flow needs a supported external backend or hosted endpoint before production use on Netlify.
