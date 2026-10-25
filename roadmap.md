# Roadmap — One CTA, one form, sitewide

- [ ] 1. Shared CTA constant `src/lib/cta.ts` (CTA_LABEL, CTA_URL=/contact, owner comment)
- [ ] 2. Rewrite `/contact`: single audit form (7 fields), honeypot, rate limit, UTM/sessionStorage tracking, HIPAA notice, consent checkbox, new SEO meta + absolute canonical
- [ ] 3. Backend: extend submitLead (language, utm_*, server rate limit), update lead-mailer (visitor subject "We received your audit request", 48h body, tracking in admin email)
- [ ] 4. `/thank-you` page: confirmation, 48h line, home link, noindex,follow, generate_lead event (no personal data)
- [ ] 5. 301 redirects: /get-a-free-quote + /free-dermatologist-website-audit (all langs) → /contact; update all internal links
- [ ] 6. CTA sweep: header, top bar (remove WhatsApp, add "Free Website Audit within 48 hours" CTA), footer (remove WhatsApp, CTA band), free-audit-cta-section (form → CTA button), all route pages, mega menus, mobile drawer, lp pages
- [ ] 7. Remove/hide ChatWidget (second CTA) — report to owner
- [ ] 8. Translations: CTA label, form, consent, HIPAA, thank-you in es, fi, sv, no, de, fr, pt, pl, ar, it, cs
- [ ] 9. Add /contact to index allowlist (task says it must be index,follow); update mem://seo/index-allowlist
- [ ] 10. Verify: build OK, grep for old labels/URLs, browser check of /contact + redirect + thank-you
