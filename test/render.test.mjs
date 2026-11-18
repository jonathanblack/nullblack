import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { isPlaceholder, site } from "../src/site.config.mjs";
import { renderIndex, renderNotFound } from "../scripts/render.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const emoji = /\p{Extended_Pictographic}/u;

test("placeholders are recognized and real urls are not", () => {
  assert.equal(isPlaceholder("TODO"), true);
  assert.equal(isPlaceholder("TODO: steam url"), true);
  assert.equal(isPlaceholder("  todo  "), true);
  assert.equal(isPlaceholder(""), true);
  assert.equal(isPlaceholder(null), true);
  assert.equal(isPlaceholder("https://nullblack.com/"), false);
  assert.equal(isPlaceholder("press@nullblack.com"), false);
});

test("game cards link live games and each game's support and privacy", () => {
  const html = renderIndex(site);
  assert.equal(site.games.length, 5);
  assert.match(html, /href="https:\/\/fadedmaps\.com\/"/);
  assert.match(html, /href="https:\/\/sheerfall\.com\/"/);
  assert.match(html, /href="https:\/\/jurassiclegacy\.com\/"/);
  assert.match(html, /href="https:\/\/cyberdeckruntime\.com\/"/);
  assert.doesNotMatch(html, /cyberdeckpacket\.com/);
  for (const game of site.games) {
    assert.match(html, new RegExp(`<article class="card" id="${game.id}">`));
    assert.match(html, new RegExp(`href="/${game.slug}/support/"`));
    assert.match(html, new RegExp(`href="/${game.slug}/privacy/"`));
    assert.match(html, new RegExp(game.status.replace(/[.]/g, "\\.")));
  }
  assert.match(html, /iOS, Android/);
  assert.match(html, /href="mailto:hello@nullblack\.com"/);
  assert.doesNotMatch(html, /class="pending">TODO</);
  assert.match(html, /© 2026 nullblack/);
  assert.match(html, /small games, made late at night\./);
  assert.doesNotMatch(html.replaceAll("©", ""), emoji);
});

test("a filled-in url and email become links", () => {
  const filled = {
    ...site,
    pressEmail: "press@nullblack.com",
    games: site.games.map((game, index) =>
      index === 0 ? { ...game, url: "https://example.com/cyberdeck" } : game,
    ),
  };
  const html = renderIndex(filled);
  assert.match(html, /href="https:\/\/example\.com\/cyberdeck"/);
  assert.match(html, /href="mailto:press@nullblack\.com"/);
  assert.match(html, /id="jurassic-legacy"/);
  assert.doesNotMatch(html, /id="jurassic-legacy" href=/);
  assert.match(html, /<article class="card" id="jurassic-legacy">/);
});

test("social profiles are linked from the config and escaped", () => {
  const html = renderIndex(site);
  for (const item of site.social) {
    assert.match(html, new RegExp(`href="${item.url.replace(/[.]/g, "\\.")}"`));
  }
  const hostile = {
    ...site,
    pressEmail: 'a"b@nullblack.com',
    games: [{ ...site.games[0], url: 'https://example.com/?q="<' }],
  };
  const unsafe = renderIndex(hostile);
  assert.match(unsafe, /mailto:a&quot;b@nullblack\.com/);
  assert.match(unsafe, /href="https:\/\/example\.com\/\?q=&quot;&lt;"/);
  assert.doesNotMatch(unsafe, /q="<"/);
});

test("head metadata points at the favicon set, touch icon, and og image", () => {
  const html = renderIndex(site);
  assert.match(html, /href="\/favicon\.ico"/);
  assert.match(html, /href="\/favicon-32\.png"/);
  assert.match(html, /href="\/favicon-16\.png"/);
  assert.match(html, /rel="apple-touch-icon" href="\/apple-touch-icon\.png"/);
  assert.match(html, /property="og:image" content="https:\/\/nullblack\.com\/og\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /name="twitter:image" content="https:\/\/nullblack\.com\/og\.png"/);
  assert.match(html, /rel="canonical" href="https:\/\/nullblack\.com\/"/);
});

test("reduced motion keeps the cursor visible and still", async () => {
  const css = await readFile(path.join(root, "src", "styles.css"), "utf8");
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.caret\s*\{\s*animation:\s*none;/);
});

test("hub pages name the studio, the games, and the footer", async () => {
  const { hubPages } = await import("../src/hub.mjs");
  const pages = hubPages(site);
  const paths = pages.map((page) => page.path);
  for (const path of [
    "/privacy/",
    "/support/",
    "/terms/",
    "/press/",
    "/fadedmaps/privacy/",
    "/fadedmaps/support/",
    "/sheerfall/privacy/",
    "/sheerfall/support/",
    "/cyberdeck-runtime/privacy/",
    "/cyberdeck-runtime/support/",
    "/cyberdeck-packet/privacy/",
    "/cyberdeck-packet/support/",
    "/jurassic-legacy/privacy/",
    "/jurassic-legacy/support/",
  ]) {
    assert.ok(paths.includes(path), path);
  }
  const privacy = pages.find((page) => page.path === "/privacy/").html;
  assert.match(privacy, /Jonathan Black, doing business as nullblack/);
  assert.match(privacy, /hello@nullblack\.com/);
  assert.match(privacy, /iOS and Android/);
  assert.match(privacy, /network address/);
  assert.doesNotMatch(privacy, /not directed at children/);
  assert.doesNotMatch(privacy, /github\.com|localStorage|TestFlight|repository|D1|Capacitor/i);
  assert.doesNotMatch(privacy.replaceAll("©", ""), /\p{Extended_Pictographic}/u);
  const support = pages.find((page) => page.path === "/support/").html;
  assert.match(support, /Expected response time: TODO/);
  assert.match(support, /href="\/privacy\/#deletion"/);
  const home = renderIndex(site);
  assert.match(home, /href="\/privacy\/"/);
  assert.match(home, /href="\/support\/"/);
  assert.match(home, /href="\/terms\/"/);
  assert.match(home, /href="\/press\/"/);
});

test("404 page names nullblack and links home", () => {
  const html = renderNotFound(site);
  assert.match(html, /<title>404 — nullblack<\/title>/);
  assert.match(html, /href="\/">back to nullblack/);
  assert.match(html, /© 2026 nullblack/);
});

test("built og image is 1200 by 630", async () => {
  const buffer = await readFile(path.join(root, "public", "og.png"));
  assert.equal(buffer.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(buffer.readUInt32BE(16), 1200);
  assert.equal(buffer.readUInt32BE(20), 630);
});
