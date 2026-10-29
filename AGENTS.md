<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rules

- Derive `/favicon.ico` from the same brand image as `/favicon.png` and reference the PNG in the sitemap XSL; raw text/XML visits need the branded conventional fallback because they cannot carry HTML head links.

- Keep the active sitemap machine-readable XML from the indexing allowlist; its browser presentation lives in `public/sitemap.xsl`, so visual changes never replace crawler data with HTML or invent last-modified dates.

- Netlify must proxy `/__l5e/assets-v1/*` to the verified public Lovable asset-serving origin with a forced 200 rewrite before Nitro's catch-all; preserve asset pointers so logos and media remain portable without duplicating downloaded binaries.
- Unprefixed URLs always render English; language changes follow explicit URL prefixes, never browser-language detection, so first visits have a predictable language.

- Netlify deployments use `netlify.toml` to select Nitro's `netlify` preset and publish `dist`; keep server output and routing managed by Nitro rather than a static SPA fallback so server handlers are retained without changing Lovable's build target.

- Audit submissions are stored through the existing server function before forwarding to Formspree; keep forwarding server-side so storage, validation, and throttling remain in one flow, and never equate provider acceptance with email delivery.

- SEO indexing is controlled by the central public-content inventory in `src/lib/index-allowlist.ts`: localized `INDEXABLE_PATHS` drives robots and the active sitemap. `buildHreflangLinks` independently describes all existing translations of content pages, including noindexed content, but never redirected paths; `__root.tsx` keeps unknown/private pages noindexed. This separates indexing eligibility from translation discovery as required by the keyword brief.
- Consolidated logical destinations live in `src/lib/seo-redirects.ts` and are shared by localized navigation and request-level permanent redirects; Netlify's matching rules retain external-host support.
- Route metadata remains TanStack `head()` and is normalized by `finalizeSeoHead`; never introduce a second client-only head manager, so the first HTML response has one canonical and robots instruction.
