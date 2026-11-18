import { isPlaceholder } from "../src/site.config.mjs";

const LOCKUP = "/assets/brand/lockup-horizontal-light-on-dark.svg";

function escapeHtml(value) {
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
  const hidden = `<span class="visually-hidden">, @nullblackgames</span>`;
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

function renderGame(game, index) {
  const inner = `
        <p class="kicker">${String(index + 1).padStart(2, "0")}</p>
        <h3>${escapeHtml(game.title)}</h3>
        <p class="desc">${escapeHtml(game.description)}</p>
        <p class="status">${escapeHtml(game.status)}</p>`;
  if (isPlaceholder(game.url)) {
    return `<li><article class="card" id="${escapeHtml(game.id)}">${inner}
      </article></li>`;
  }
  return `<li><a class="card" id="${escapeHtml(game.id)}" href="${escapeHtml(game.url)}">${inner}
      </a></li>`;
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

function head(site, { title, description }) {
  const canonical = site.url.endsWith("/") ? site.url : `${site.url}/`;
  const image = new URL("/og.png", canonical).href;
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
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/fonts/ibm-plex-mono-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(site.name)}">
  <meta property="og:title" content="${escapeHtml(site.name)}">
  <meta property="og:description" content="${escapeHtml(site.description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="nullblack">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@nullblackgames">
  <meta name="twitter:title" content="${escapeHtml(site.name)}">
  <meta name="twitter:description" content="${escapeHtml(site.description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  <meta name="twitter:image:alt" content="nullblack">
  <script type="application/ld+json">${organizationJsonLd(site)}</script>
</head>`;
}

function header() {
  return `<a class="skip" href="#content">skip to content</a>
  <header class="site-header">
    <div class="shell">
      <a class="brand" href="/">nullblack</a>
      <nav class="nav" aria-label="primary">
        <a href="/#games">games</a>
        <a href="/#follow">follow</a>
      </nav>
    </div>
  </header>`;
}

function footer(site) {
  return `<footer class="site-footer">
    <div class="shell">
      <p>© ${escapeHtml(site.year)} nullblack</p>
    </div>
  </footer>`;
}

export function renderIndex(site) {
  const games = site.games.map(renderGame).join("\n      ");
  const social = site.social.map(renderSocial).join("\n          ");
  return `${head(site, { title: site.name, description: site.description })}
<body>
  ${header()}
  <main id="content">
    <section class="hero" aria-labelledby="studio-name">
      <div class="shell">
        <h1 id="studio-name">
          <img class="lockup" src="${LOCKUP}" width="3954" height="1024" alt="nullblack" fetchpriority="high">
        </h1>
        <p class="tagline">${escapeHtml(site.tagline)}<span class="caret" aria-hidden="true"></span></p>
        <p class="lede">${escapeHtml(site.lede)}</p>
      </div>
    </section>
    <section class="section" id="games" aria-labelledby="games-label">
      <div class="shell">
        <h2 id="games-label">games</h2>
        <ul class="games">
      ${games}
        </ul>
      </div>
    </section>
    <section class="section" id="follow" aria-labelledby="follow-label">
      <div class="shell">
        <h2 id="follow-label">follow</h2>
        <div class="follow-grid">
          <ul class="social">
          ${social}
          </ul>
          <div class="press">
            <h3>press and contact</h3>
            ${renderPress(site.pressEmail)}
          </div>
        </div>
      </div>
    </section>
  </main>
  ${footer(site)}
</body>
</html>
`;
}

export function renderNotFound(site) {
  return `${head(site, { title: `404 — ${site.name}`, description: "This page is empty." })}
<body>
  ${header()}
  <main id="content" class="missing">
    <div class="shell">
      <h1>404</h1>
      <p>nothing here. <a href="/">back to nullblack</a></p>
    </div>
  </main>
  ${footer(site)}
</body>
</html>
`;
}
