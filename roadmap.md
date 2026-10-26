# Roadmap — Formspree audit integration

## About indexing

- [x] Add English `/about` to the shared indexing allowlist, bringing it to 13 URLs.
- [ ] Verify the sitemap and About indexing instruction locally and check production.

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
