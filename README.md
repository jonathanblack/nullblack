# nullblack

Studio site for nullblack. One static page, served as a Cloudflare Worker with static assets.

nullblack.com is the primary origin. nullblackgames.com is the same site. The page sets a canonical URL of `https://nullblack.com/`.

## Develop

```sh
npm install
npm test
npm run preview
```

`npm test` rebuilds `public/` and checks the page. Edit links in [`src/site.config.mjs`](src/site.config.mjs), then run `npm test` again so `public/` stays in sync. The committed `public/` directory is what gets deployed.

## Deploy

The repo had no Wrangler, Pages, or workflow config. Both domains currently answer with the Worker placeholder `Hello world` (`text/plain`). This project serves `public/` from that Worker. `worker/index.js` hands every request to the asset binding, including the 404 page.

The dashboard build command is `npm run build`. That script regenerates `public/` with Node built-ins only, so it does not need `devDependencies`. Deploy command stays `npx wrangler deploy`. `main` has no `package.json` until this branch is merged, so a production build of `main` still fails with `ENOENT` for `package.json`.

`wrangler.jsonc` does not list routes or custom domains. Those stay where they are in the dashboard. The Worker name is `nullblack`. If the connected Worker uses another name, change `name` to match before deploying. A mismatch fails the build instead of moving the domains.

If this repo is instead a Pages project, set the build command to `npm run build` and the output directory to `public`.

## Links still to fill in

Every unpublished target in `src/site.config.mjs` is the string `TODO`. The page shows that text and does not link it.

- Cyberdeck: Runtime url
- Cyberdeck: Packet url, and the platform line if it should not read "Coming to web, iOS, and Steam."
- Jurassic Legacy url
- Sheerfall url
- Faded Maps url
- Bluesky profile, if it is not `nullblackgames.bsky.social`

Press and contact is `hello@nullblack.com`. Social links for X, TikTok, YouTube, Twitch, Instagram, and Bluesky use `@nullblackgames`.

Studio pages, also linked in the footer: `/privacy/`, `/support/`, `/terms/`, `/press/`, and `/<slug>/privacy/` plus `/<slug>/support/` for fadedmaps, sheerfall, cyberdeck-runtime, cyberdeck-packet, and jurassic-legacy.

The wordmark is set in IBM Plex Mono, shipped as Latin woff2 files under `src/fonts/` with the SIL Open Font License.
