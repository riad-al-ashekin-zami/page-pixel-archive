# Page Pixel Archive

Store the full project given to you. do not miss anything

This project was built with [Lovable](https://lovable.dev).

## Deploy through GitHub to Netlify

Connect the synced GitHub repository to Netlify. The committed `netlify.toml`
sets the build command to `bun run build`, the publish directory to `dist`,
and Nitro's deployment target to `netlify`. The old `dist/client` publish
directory is incorrect for this target. Keep the base directory at the
repository root and retry the deployment after these changes reach GitHub.
Nitro generates the server function in `.netlify/functions-internal` and
routing automatically; do not add a static SPA fallback. Do not set
`LOVABLE_NITRO_PRESET` on Netlify, since that selects a Lovable hosting target.

The committed asset rewrite proxies only `/__l5e/assets-v1/*` to the public
Lovable media-serving origin. Keep it ahead of Nitro's catch-all rules and do
not remove the original asset pointers or delete the referenced CDN assets.
This supplies header/footer logos, navigation preloader images, blog images,
and page banners on the Netlify domain without requiring media credentials.
Unprefixed pages open in English regardless of the browser's language;
visitors can still choose another language from the language selector.

### External hosting limitations

Lovable Cloud runtime secrets are not copied to Netlify by GitHub sync.
The audit form currently saves through a privileged Cloud client before
forwarding to Formspree. Its required service-role credential is not exportable
from Lovable Cloud, so the existing form cannot be assumed to work on Netlify
unchanged. A supported external submission backend or a verified hosted
endpoint is required before accepting real submissions there.

The chatbot and administrator pages also depend on server credentials. Never
commit private credentials or put them in `VITE_*` variables. This configuration
fix addresses the missing publish directory; it does not migrate backend data,
credentials, or verify a live Netlify deployment.

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0a9d216f-7ab2-4994-b44d-f3b8474f2751).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
