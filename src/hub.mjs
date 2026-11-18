import { escapeHtml, renderPage } from "../scripts/render.mjs";

const REVIEWED = "November 18, 2026";

function privacyBody(site) {
  const email = escapeHtml(site.pressEmail);
  const when = escapeHtml(site.effectiveDate);
  return `<h1>privacy</h1>
      <p class="meta">Effective ${when}. Jonathan Black, doing business as nullblack.</p>
      <p>This policy covers nullblack.com and the games listed below. It describes what we found in the code reviewed on ${REVIEWED}. It does not describe a store build, a native project, or a branch we did not open.</p>
      <p>Contact: <a href="mailto:${email}">${email}</a>.</p>

      <h2>This website</h2>
      <p>nullblack.com is a static site. These pages do not run analytics, advertising, or accounts. If you email us, we receive your address and whatever you write, and we use it to reply. The site code does not sell that mail.</p>

      <h2 id="fadedmaps">Faded Maps</h2>
      <p>Reviewed in jonathanblack/fadedmaps: <code>src/ui/save.ts</code>, <code>src/ui/ads-native.ts</code>, <code>template.html</code>, and <code>capacitor.config.ts</code>.</p>
      <ul>
        <li>On the device, <code>localStorage</code> key <code>fadedmaps.journals.v1</code> holds daily and practice progress, campaign results, stats (played, solved, streak, best), and settings such as sound.</li>
        <li><code>fadedmaps.sheets</code> keeps a few generated puzzles so a phone does not rebuild them. Older dailies beyond about fourteen, and older cached sheets beyond a handful, are dropped on save.</li>
        <li>The website loads Google AdSense, publisher <code>ca-pub-1117832063249065</code>, from <code>pagead2.googlesyndication.com</code>. One banner sits under the result sheet.</li>
        <li>The iOS app (Capacitor, app id <code>com.fadedmaps.game</code>) uses Google AdMob for that same 320 by 50 banner, only while the result sheet is open. It requests Apple's tracking permission, then Google's consent form where Google marks one as required. The source comment says declining either still shows ads that are not personalized. The banner unit id is injected at build time.</li>
      </ul>
      <p>We did not find an account, a cloud save, a leaderboard, a crash-reporting SDK, or a store billing SDK in the files we opened.</p>

      <h2 id="sheerfall">Sheerfall</h2>
      <p>Reviewed in jonathanblack/sheerfall: <code>src/toys/fault/ads.ts</code>, <code>stats.ts</code>, <code>daily.ts</code>, <code>net.ts</code>, and <code>src/server/stats.ts</code>.</p>
      <ul>
        <li>On sheerfall.com the game loads Google AdSense H5 Games Ads for the same publisher id. It may show an interstitial after a finished run, and an optional rewarded ad to reroll a boon. Rewarded ads are not offered on the daily. The code does not load those ads on other hosts.</li>
        <li>The game posts short event names (a visit, touch or desktop, ad events, and similar) to <code>/api/event</code>. Cloudflare D1 stores a count per UTC day and key. That table has no player id. The browser stores <code>fl_seen</code> and <code>fl_first</code> so a visitor is counted once a day. This runs only on sheerfall.com.</li>
        <li>A leaderboard post, as defined in <code>daily.ts</code>, includes a device id, a display name you choose, score, wave, time, class, arena, and, for a daily, the date.</li>
        <li>Online co-op sends your display name, class, and movement to a Cloudflare Durable Object room, which returns a rejoin token.</li>
      </ul>
      <p>We did not open the file that first writes the leaderboard device id into storage, and we did not find a control that deletes a leaderboard row.</p>

      <h2 id="cyberdeck-runtime">Cyberdeck: Runtime</h2>
      <p>Reviewed in jonathanblack/cyberdeck-runtime: <code>scripts/managers/SaveManager.cs</code>, <code>web/src/ui/saveslot.ts</code>, and <code>web/src/engine/savecode.ts</code>.</p>
      <ul>
        <li>The Godot game writes one JSON file on the device at <code>user://savegame.json</code>, including progress and a saved-at time. New Game deletes that file.</li>
        <li>The web build keeps a save in <code>localStorage</code>. A demo build uses a separate slot when the main slot holds a full-game save, so the demo does not overwrite it. You can export or import that save as a text code beginning with <code>CDR1.</code></li>
      </ul>
      <p>We did not find ads, accounts, analytics, or a crash-reporting SDK in the files we opened. We did not copy the exact <code>localStorage</code> key string out of the web <code>main.ts</code>.</p>

      <h2 id="cyberdeck-packet">Cyberdeck: Packet</h2>
      <p>Reviewed in jonathanblack/cyberdeck-packet, branch <code>master</code>: <code>web/worker/account.ts</code> and <code>web/capacitor.config.ts</code>. The repository's default branch did not contain that account file.</p>
      <ul>
        <li>An optional account is a 10-character code, or an email. A 6-digit code is mailed from <code>noreply@cyberdeckpacket.com</code> through Cloudflare Email. The device keeps a random token.</li>
        <li>Cloudflare D1 stores the email or code key, a hash of the device token, and the save document (up to about 900,000 characters). Sign-out deletes that device's token.</li>
        <li>The iOS shell is Capacitor, app id <code>com.cyberdeckpacket.game</code>.</li>
      </ul>
      <p>We did not find a route that deletes the account, the email, or the cloud save. We did not find an ads SDK or a store billing SDK in <code>web/package.json</code>.</p>

      <h2 id="jurassic-legacy">Jurassic Legacy</h2>
      <p>Reviewed in jonathanblack/JurassicLegacy: <code>src/save.ts</code>, <code>src/account.ts</code>, <code>src/leaderboard.ts</code>, and <code>worker/account.js</code>.</p>
      <ul>
        <li><code>localStorage</code> key <code>jurassic-legacy-save-v1</code> holds the expedition: lineage, traits, research, and similar game state. A daily calibration does not write that save.</li>
        <li>An optional account uses an email plus a 6-digit code mailed from <code>noreply@jurassiclegacy.com</code>, or a 10-character link code. The device token is kept in <code>jurassic-legacy-account</code>.</li>
        <li>Cloudflare D1 stores the email, a hash of the link code, a hash of the device token, and the save (up to 2 MB). It also stores hashed email codes and per-IP counters for rate limits. The IP is read from <code>CF-Connecting-IP</code>. Sign-out deletes the device row.</li>
        <li>The daily leaderboard keeps a random player id, the name you chose, and an unsent result in this browser. It posts the id, name, score, and platform <code>web</code> to <code>/api/daily</code>.</li>
      </ul>
      <p>We did not find a route that deletes the account, the email, or a leaderboard row. Lab "purchases" spend in-game DNA, not money. No ads SDK is listed in <code>package.json</code>.</p>

      <h2>Children</h2>
      <p>We did not find an age gate in the code we reviewed. nullblack does not knowingly collect personal information from children under 13. If you believe a child has sent us personal information, email <a href="mailto:${email}">${email}</a> and ask us to delete it. Faded Maps and Sheerfall show ads. Whether any game is directed at children is not something the code states.</p>

      <h2>GDPR and CCPA</h2>
      <p>Where the law gives you the right, you can ask us to tell you what we hold, correct it, delete it, give you a copy, or stop selling or sharing personal information for cross-context advertising. We did not find code that sells personal information. Google may process device data when an ad runs, under Google's own policy. Email <a href="mailto:${email}">${email}</a> with the game and, if you have one, the account email or link code. We do not charge for a request the law says is free, and we do not treat you worse for asking. We may refuse a request the law does not require.</p>

      <h2 id="deletion">Deletion</h2>
      <p>Clear the site's storage, or uninstall the app, to remove a local save.</p>
      <p>For a Jurassic Legacy or Cyberdeck: Packet account, email <a href="mailto:${email}">${email}</a> from the address on the account, or include the link code, and ask for deletion. Sign-out only drops that device's token. It does not delete the email or the cloud save. There is no in-game delete button in the code we read. Until there is one, email is the deletion path stores such as Google Play ask for.</p>
      <p>Sheerfall's daily counters are not tied to a name. A leaderboard row is tied to a device id and a display name. Email us to ask for a row to be removed. We did not find a self-serve delete control.</p>

      <h2>Third parties</h2>
      <ul>
        <li>Google AdSense and Google AdMob, for ads in Faded Maps and Sheerfall.</li>
        <li>Apple, for the tracking prompt in the Faded Maps iOS app, and as the platform for the Capacitor iOS shells we saw.</li>
        <li>Cloudflare, for hosting, D1, email sending, and Sheerfall's multiplayer rooms.</li>
      </ul>
      <p>We did not find Steamworks, Apple Game Center, or Google Play Games in the files we opened.</p>

      <h2>Retention</h2>
      <p>Local data stays until you clear it. Faded Maps drops old daily sheets and extra cached puzzles as described above. Mailed sign-in codes expire after 15 minutes. We did not find a job that deletes old account rows, leaderboard rows, or Sheerfall's daily counters.</p>

      <h2>Changes</h2>
      <p>We will change the date at the top of this page when the policy changes. If we have your email because you made an account, and the change is material, we will email that address when we can match it.</p>

      <h2>Contact</h2>
      <p>Jonathan Black, doing business as nullblack. <a href="mailto:${email}">${email}</a>.</p>`;
}

function supportBody(site) {
  const email = escapeHtml(site.pressEmail);
  const reply = escapeHtml(site.supportResponseTime);
  const games = site.games
    .map(
      (game) => `<section id="${escapeHtml(game.slug)}">
        <h2>${escapeHtml(game.title)}</h2>
        <p><a href="/${escapeHtml(game.slug)}/support/">/${escapeHtml(game.slug)}/support/</a></p>
        <h3>I lost my progress</h3>
        <p>A full answer is not written yet. Progress that lives only in this browser or on this device is gone if that storage is cleared. An account, where the game has one, may still have a cloud save.</p>
        <h3>I want my data deleted</h3>
        <p>Email <a href="mailto:${email}">${email}</a> with the game name and, if you have one, the account email or link code. See <a href="/privacy#deletion">deletion</a>.</p>
      </section>`,
    )
    .join("\n      ");
  return `<h1>support</h1>
      <p>Email <a href="mailto:${email}">${email}</a>. Expected response time: ${reply}.</p>
      <h2>Deletion requests</h2>
      <p>Email that address and name the game. For Jurassic Legacy or Cyberdeck: Packet, include the account email or the link code. Sign-out does not delete the server copy. Details are in the <a href="/privacy/#deletion">privacy policy</a>.</p>
      ${games}`;
}

function termsBody(site) {
  const email = escapeHtml(site.pressEmail);
  return `<h1>terms</h1>
      <p class="meta">Effective ${escapeHtml(site.effectiveDate)}. Jonathan Black, doing business as nullblack.</p>
      <p>These terms cover nullblack.com and the games we publish under nullblack. They are plain language, not a substitute for a lawyer.</p>
      <h2>Using the games and the site</h2>
      <p>We give you a personal, non-exclusive license to play the games and read the site. You do not get ownership of the games, the name nullblack, or the logo. Don't cheat a leaderboard, attack the service, or use it to harm someone else.</p>
      <h2>Your saves and names</h2>
      <p>A save stays yours in the sense that we don't claim your play as our story. You give us permission to store and show what you submit, such as a display name or a score, so the feature can work. Don't submit a name you don't have the right to use.</p>
      <h2>Accounts and ads</h2>
      <p>Accounts, where a game has them, are optional. You are responsible for the link code or email you use. Some games show ads from Google. Those ads follow Google's rules as well as these.</p>
      <h2>No warranty</h2>
      <p>The games and the site are provided as they are. They may break, change, or go offline. To the extent the law allows, we are not liable for lost progress or for indirect damages.</p>
      <h2>Law</h2>
      <p>A governing law and a court are not chosen yet. Expected response for legal notices: ${escapeHtml(site.supportResponseTime)}. Send them to <a href="mailto:${email}">${email}</a>.</p>
      <h2>Changes</h2>
      <p>We may change these terms by posting a new version on this page. If you keep playing after that, the new terms apply to the new use.</p>`;
}

function pressBody(site) {
  const email = escapeHtml(site.pressEmail);
  return `<h1>press</h1>
      <p>A short page for logos and contact. A longer kit is not ready.</p>
      <p>Contact: <a href="mailto:${email}">${email}</a>.</p>
      <h2>Logo</h2>
      <ul class="downloads">
        <li><a href="/assets/brand/lockup-horizontal-light-on-dark.svg" download>lockup, light on dark</a></li>
        <li><a href="/assets/brand/lockup-horizontal-dark-on-light.svg" download>lockup, dark on light</a></li>
        <li><a href="/assets/brand/icon-light.svg" download>icon, light</a></li>
        <li><a href="/assets/brand/icon-dark.svg" download>icon, dark</a></li>
        <li><a href="/assets/brand/icon-1024.png" download>icon, 1024 png</a></li>
      </ul>
      <p>The wordmark is IBM Plex Mono Bold. nullblack is always lowercase.</p>`;
}

function gamePrivacyBody(site, game) {
  const slug = escapeHtml(game.slug);
  const title = escapeHtml(game.title);
  return `<h1>${title}</h1>
      <p class="meta">Privacy address for store listings.</p>
      <p>The studio policy is one document. The ${title} section is here: <a href="/privacy/#${slug}">/privacy/#${slug}</a>.</p>
      <p><a href="/privacy/">Full privacy policy</a>. <a href="/${slug}/support/">Support for ${title}</a>.</p>`;
}

function gameSupportBody(site, game) {
  const slug = escapeHtml(game.slug);
  const title = escapeHtml(game.title);
  return `<h1>${title}</h1>
      <p class="meta">Support address for store listings.</p>
      <p>Write to <a href="mailto:${escapeHtml(site.pressEmail)}">${escapeHtml(site.pressEmail)}</a>. The ${title} questions are here: <a href="/support/#${slug}">/support/#${slug}</a>.</p>
      <p><a href="/support/">All support</a>. <a href="/${slug}/privacy/">Privacy for ${title}</a>.</p>`;
}

export function hubPages(site) {
  const pages = [
    { dir: "privacy", title: "privacy", description: "Privacy policy for nullblack and its games.", body: privacyBody(site) },
    { dir: "support", title: "support", description: "Support and data deletion for nullblack games.", body: supportBody(site) },
    { dir: "terms", title: "terms", description: "Terms for nullblack.com and its games.", body: termsBody(site) },
    { dir: "press", title: "press", description: "Logos and press contact for nullblack.", body: pressBody(site) },
  ];
  for (const game of site.games) {
    pages.push({
      dir: `${game.slug}/privacy`,
      title: `${game.title} privacy`,
      description: `Privacy for ${game.title}.`,
      body: gamePrivacyBody(site, game),
    });
    pages.push({
      dir: `${game.slug}/support`,
      title: `${game.title} support`,
      description: `Support for ${game.title}.`,
      body: gameSupportBody(site, game),
    });
  }
  return pages.map((page) => ({
    dir: page.dir,
    path: `/${page.dir}/`,
    html: renderPage(site, page),
  }));
}
