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

- Netlify must proxy `/__l5e/assets-v1/*` to the verified public Lovable asset-serving origin with a forced 200 rewrite before Nitro's catch-all; preserve asset pointers so logos and media remain portable without duplicating downloaded binaries.
- Unprefixed URLs always render English; language changes follow explicit URL prefixes, never browser-language detection, so first visits have a predictable language.

- Netlify deployments use `netlify.toml` to select Nitro's `netlify` preset and publish `dist`; keep server output and routing managed by Nitro rather than a static SPA fallback so server handlers are retained without changing Lovable's build target.

- Audit submissions are stored through the existing server function before forwarding to Formspree; keep forwarding server-side so storage, validation, and throttling remain in one flow, and never equate provider acceptance with email delivery.

- SEO indexing is controlled by the central allowlist in `src/lib/index-allowlist.ts` (`INDEXABLE_PATHS`): robots meta (via `robotsContent` in every route head), hreflang alternates (via `buildHreflangLinks` in `src/lib/i18n-routing.ts`), and `src/routes/sitemap[.]xml.ts` all read from it. Never hardcode `index,follow` in a route — add the URL to the allowlist instead. `__root.tsx` carries the `noindex,follow` default so unlisted/404/future pages are never indexed.
