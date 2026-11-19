import { isPlaceholder } from "../src/site.config.mjs";

/** Homepage order. Games missing from this list still render, after these. */
const SHOWCASE = ["cyberdeck-runtime", "jurassic-legacy", "sheerfall", "fadedmaps", "cyberdeck-packet"];

function wordmark({ blink = false } = {}) {
  const bar = blink ? "mark-bar caret" : "mark-bar";
  return `<svg class="mark" viewBox="0 0 1024 1024" width="1024" height="1024" aria-hidden="true" focusable="false"><rect width="1024" height="1024" fill="currentColor"/><rect class="${bar}" x="654" y="814" width="260" height="100" fill="#000000"/></svg><span class="logo-words"><span class="logo-null">null</span><span class="logo-black">black</span></span>`;
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
}

function renderSocial(item) {
  const label = escapeHtml(item.label);
  const hidden = item.handle ? `<span class="visually-hidden">, ${escapeHtml(item.handle)}</span>` : "";
  if (isPlaceholder(item.url)) {
    return `<li><span class="pending">${label}${hidden}</span></li>`;
  }
  const url = escapeHtml(item.url);
  return `<li><a rel="me" href="${url}">${label}${hidden}</a></li>`;
}

function renderPress(email) {
  if (isPlaceholder(email)) {
    const shown = typeof email === "string" && email.trim() ? email.trim() : "TODO";
    return `<p class="pending">${escapeHtml(shown)}</p>`;
  }
  const safe = escapeHtml(email.trim());
  return `<p><a class="mail" href="mailto:${safe}">${safe}</a></p>`;
}

function showcaseGames(site) {
  const bySlug = new Map(site.games.map((game) => [game.slug, game]));
  const ordered = SHOWCASE.map((slug) => bySlug.get(slug)).filter(Boolean);
  for (const game of site.games) {
    if (!ordered.includes(game)) ordered.push(game);
  }
  return ordered;
}

function renderGame(game, index) {
  const title = escapeHtml(game.title);
  const slug = escapeHtml(game.slug);
  const press = `/press/${slug}/`;
  const accent = game.accent ? ` style="--accent: ${escapeHtml(game.accent)}"` : "";
  const src = game.homeArt || (game.art ? `${press}assets/${game.art}` : "");
  const eager = index === 0 ? ` fetchpriority="high"` : ` loading="lazy"`;
  const art = src
    ? `<a class="show-art" href="${press}" tabindex="-1" aria-hidden="true"><img src="${escapeHtml(src)}" width="${escapeHtml(game.artWidth || 1920)}" height="${escapeHtml(game.artHeight || 1080)}" alt=""${eager} decoding="async"></a>`
    : "";
  const play = isPlaceholder(game.url)
    ? ""
    : `<p class="show-actions"><a class="play" href="${escapeHtml(game.url)}">play<span class="visually-hidden"> ${title}</span></a></p>`;
  const pitch = game.pitch || game.description || "";
  return `<li><article class="show" id="${escapeHtml(game.id)}"${accent}>
        ${art}
        <div class="show-body">
          <p class="kicker">${String(index + 1).padStart(2, "0")}</p>
          <h3><a href="${press}">${title}</a></h3>
          <p class="pitch">${escapeHtml(pitch)}</p>
          <p class="status">${escapeHtml(game.status)}</p>
          ${play}
        </div>
      </article></li>`;
}

function organizationJsonLd(site) {
  const sameAs = site.social.filter((item) => !isPlaceholder(item.url)).map((item) => item.url);
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    logo: new URL("/apple-touch-icon.png", site.url).href,
    founder: { "@type": "Person", name: "Jonathan Black" },
    sameAs,
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function head(site, { title, description, path = "/", image: pageImage = null }) {
  const canonical = new URL(path, site.url).href;
  const og = pageImage ?? { path: "/og.png", width: 1200, height: 630, alt: "nullblack" };
  const image = new URL(og.path, site.url).href;
  const shareTitle = pageImage ? title : site.name;
  const shareDescription = pageImage ? description : site.description;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#000000">
  <meta name="color-scheme" content="dark">
  <title>${escapeHtml(title)}</title>
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/fonts/ibm-plex-mono-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/ibm-plex-mono-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(site.name)}">
  <meta property="og:title" content="${escapeHtml(shareTitle)}">
  <meta property="og:description" content="${escapeHtml(shareDescription)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:image:width" content="${escapeHtml(og.width)}">
  <meta property="og:image:height" content="${escapeHtml(og.height)}">
  <meta property="og:image:alt" content="${escapeHtml(og.alt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@nullblackgames">
  <meta name="twitter:title" content="${escapeHtml(shareTitle)}">
  <meta name="twitter:description" content="${escapeHtml(shareDescription)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  <meta name="twitter:image:alt" content="${escapeHtml(og.alt)}">
  <script type="application/ld+json">${organizationJsonLd(site)}</script>
</head>`;
}

function header(path = "/") {
  const onPress = path === "/press/" || path.startsWith("/press/");
  const pressCurrent = onPress ? ` aria-current="page"` : "";
  return `<a class="skip" href="#content">skip to content</a>
  <header class="site-header">
    <div class="shell">
      <a class="brand" href="/">${wordmark()}</a>
      <nav class="nav" aria-label="primary">
        <a href="/#games">games</a>
        <a href="/press/"${pressCurrent}>press</a>
      </nav>
    </div>
  </header>`;
}

const HUB = [
  { href: "/privacy/", label: "privacy" },
  { href: "/support/", label: "support" },
  { href: "/terms/", label: "terms" },
  { href: "/press/", label: "press" },
];

function footer(site, path = "/") {
  const links = HUB.map((item) => {
    const here = path === item.href || (item.href === "/press/" && path.startsWith("/press/"));
    const current = here ? ` aria-current="page"` : "";
    return `<a href="${item.href}"${current}>${item.label}</a>`;
  }).join("\n        ");
  const social = site.social.map(renderSocial).join("\n          ");
  return `<footer class="site-footer">
    <div class="shell">
      <div class="footer-top">
        <nav id="follow" aria-label="social">
          <ul class="social">
          ${social}
          </ul>
        </nav>
        ${renderPress(site.pressEmail)}
      </div>
      <nav class="footer-nav" aria-label="studio">
        ${links}
      </nav>
      <p>© ${escapeHtml(site.year)} nullblack</p>
    </div>
  </footer>`;
}

export function renderPage(site, { title, description, path, body, image = null, wide = false }) {
  return `${head(site, { title: `${title} — ${site.name}`, description, path, image })}
<body>
  ${header(path)}
  <main id="content" class="doc${wide ? " wide" : ""}">
    <div class="shell">
      ${body}
    </div>
  </main>
  ${footer(site, path)}
</body>
</html>
`;
}

export function renderIndex(site) {
  const games = showcaseGames(site).map(renderGame).join("\n      ");
  return `${head(site, { title: site.name, description: site.description })}
<body class="home">
  ${header("/")}
  <main id="content">
    <section class="hero" aria-labelledby="studio-name">
      <div class="shell">
        <h1 id="studio-name" class="logo">${wordmark({ blink: true })}</h1>
        <p class="tagline">${escapeHtml(site.tagline)}</p>
        <p class="lede">${escapeHtml(site.lede)}</p>
      </div>
    </section>
    <section class="section" id="games" aria-labelledby="games-label">
      <div class="shell">
        <h2 id="games-label">games</h2>
        <ol class="showcase">
      ${games}
        </ol>
      </div>
    </section>
  </main>
  ${footer(site, "/")}
</body>
</html>
`;
}

export function renderNotFound(site) {
  return `${head(site, { title: `404 — ${site.name}`, description: "This page is empty." })}
<body>
  ${header("/")}
  <main id="content" class="missing">
    <div class="shell">
      <h1>404</h1>
      <p>nothing here. <a href="/">back to nullblack</a></p>
    </div>
  </main>
  ${footer(site, "/")}
</body>
</html>
`;
}
