import { escapeHtml, renderPage } from "../scripts/render.mjs";

function privacyBody(site) {
  const email = escapeHtml(site.pressEmail);
  const when = escapeHtml(site.effectiveDate);
  return `<h1>privacy</h1>
      <p class="meta">Effective ${when}. Jonathan Black, doing business as nullblack.</p>
      <p>This covers nullblack.com and the games below. Contact <a href="mailto:${email}">${email}</a>.</p>

      <h2>This website</h2>
      <p>This site does not use analytics, ads, or accounts. If you email us, we keep your address and your message so we can reply. We do not sell that mail.</p>

      <h2 id="fadedmaps">Faded Maps</h2>
      <p>Your puzzles, streaks, and settings stay on your device. Older daily puzzles are dropped after about two weeks.</p>
      <p>The website and the iOS and Android apps can show a Google ad under the results. On iOS, the app may ask permission to track you across other apps. You can say no and still see ads. Those ads are not tied to an account. There is no account and no leaderboard.</p>

      <h2 id="sheerfall">Sheerfall</h2>
      <p>On sheerfall.com, Google may show an ad after a run. You can choose to watch an ad to reroll a reward. The daily challenge does not offer that.</p>
      <p>We count how often things happen in the game, such as a visit or an ad view. Those counts are not tied to your name. A leaderboard uses a device id and the name you choose, plus your score. Online play sends your name and what you do in the match, and a token so you can rejoin if you drop.</p>

      <h2 id="cyberdeck-runtime">Cyberdeck: Runtime</h2>
      <p>Your progress stays on your device. You can copy a save out as text and paste it back later. There are no ads and no account.</p>

      <h2 id="cyberdeck-packet">Cyberdeck: Packet</h2>
      <p>You can play with a save on your device. You can also make an account with an email or a short code. We email a sign-in code, and we keep that email or code, the device, and your cloud save. Signing out of one device does not delete the account. The iOS and Android apps use the same account if you sign in.</p>

      <h2 id="jurassic-legacy">Jurassic Legacy</h2>
      <p>Your expedition stays on your device. A daily run does not overwrite it. You can make an account with an email or a short code. We email a sign-in code, and we keep that email or code, the device, and your cloud save. When you ask for a code, we also count attempts from your network address so we can slow down repeated tries. That count is not part of your account. Signing out does not delete the account.</p>
      <p>The daily leaderboard uses a random id stored on your device and the name you choose, plus your score. Spending in the lab uses the game's own currency, not real money. The game does not show ads.</p>

      <h2>Children</h2>
      <p>We do not knowingly collect personal information from children under 13. If you believe a child has sent us personal information, email <a href="mailto:${email}">${email}</a> and we will delete it. Faded Maps and Sheerfall show ads.</p>

      <h2>Your rights</h2>
      <p>Where GDPR, CCPA, or a similar law applies, you can ask what we hold about you, for a copy, to correct it, to delete it, or to stop sale or sharing for advertising. We do not sell personal information. Google may use device data to show ads in Faded Maps and Sheerfall, under Google's own policy. Email <a href="mailto:${email}">${email}</a> with the game and, if you have one, the account email or code. We will not treat you worse for asking.</p>

      <h2 id="deletion">Deletion</h2>
      <p>Clear the game's saved data, or uninstall the app, to remove what is only on your device.</p>
      <p>To delete a Jurassic Legacy or Cyberdeck: Packet account, email <a href="mailto:${email}">${email}</a> from the address on the account, or include the code. Signing out is not deletion. This email is how you ask for deletion on Google Play and elsewhere until a button exists in the game.</p>
      <p>To remove a Sheerfall leaderboard name, email us with the name and the game. There is no button for that in the game.</p>

      <h2>Who else sees data</h2>
      <ul>
        <li>Google, for ads in Faded Maps and Sheerfall.</li>
        <li>Apple and Google, for the iOS and Android apps, including Apple's tracking prompt on iOS.</li>
        <li>Our host, for the website, saved accounts, sign-in attempt counts by network address, leaderboards, email, and Sheerfall's online matches.</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>What is on your device stays until you delete it. Sign-in codes expire after 15 minutes. Account details, cloud saves, sign-in attempt counts, and leaderboard entries stay until you ask us to delete them or we no longer need them to run the game.</p>

      <h2>Changes</h2>
      <p>When this policy changes, we will update the date above. If we have your email and the change matters, we will write to you.</p>

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
        <p>A full answer is not written yet. If the game has no account, progress stays on that device and is gone when you clear it. If you signed in, the cloud save may still be there.</p>
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
