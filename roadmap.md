# Roadmap — Formspree audit integration

## Live site media and language

- [ ] Fix external-host image delivery for logos, preloader and all stored images.
- [ ] Keep English as the default without automatic language redirects.
- [ ] Verify images, icons and language selection in the browser.

- [x] Forward the existing audit form to the owner's Formspree endpoint after saving the lead.
- [x] Test forwarding success/failure and verify a real submission is saved and accepted.
- [x] Remove unverified email-confirmation claims and delete only the test lead.

Formspree accepted the test; inbox delivery and visitor auto-replies are controlled by the owner's Formspree settings and remain unverified.

## Netlify deployment

- [x] Configure Netlify's server target and correct publish directory for GitHub deployments.
- [x] Verify configuration and document external-hosting limitations.

Configuration validated against the installed Nitro preset; a live Netlify deployment is not verified. Cloud credentials do not transfer through GitHub, so the existing submission flow needs a supported external backend or hosted endpoint before production use on Netlify.
