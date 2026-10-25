# Roadmap — Formspree audit integration

- [x] Forward the existing audit form to the owner's Formspree endpoint after saving the lead.
- [x] Test forwarding success/failure and verify a real submission is saved and accepted.
- [x] Remove unverified email-confirmation claims and delete only the test lead.

Formspree accepted the test; inbox delivery and visitor auto-replies are controlled by the owner's Formspree settings and remain unverified.

## Netlify deployment

- [ ] Configure Netlify's server target and correct publish directory for GitHub deployments.
- [ ] Verify configuration and document external-hosting limitations.
