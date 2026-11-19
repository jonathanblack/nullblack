import { escapeHtml, renderPage } from "../scripts/render.mjs";
import { isPlaceholder } from "./site.config.mjs";

/**
 * Press kits. One entry per game on the studio site, keyed by the game's slug.
 *
 * Files named here live in assets/press/<slug>/ and are published at
 * /press/<slug>/assets/. The build reads each PNG's size from the file, makes
 * /press/<slug>/<slug>-press-kit.zip from the whole folder, and fails if a
 * file named here is missing.
 *
 * Facts come from each game's own repository and from site.config.mjs. Do not
 * add store links or release dates that are not published.
 */
export const pressKits = {
  fadedmaps: {
    accent: "#f2d27a",
    pitch: "A daily map puzzle. Read the journals of the expeditions that crossed a faded map, and work out where the mountains are.",
    about: [
      "A map has faded. All that is left are the journals of the expeditions that crossed it: where each walker came in, what ground they walked, and where they left. A journal never says where its walker turned.",
      "Every journal is a walk across a seven by seven map. A walker goes straight until a mountain turns them. Set the mountains down where you think they stand, then check the map: every journal your map explains gets a tick. There are five checks a map, and the fewer you use, the better your rank.",
      "The map is a small floating island you can turn with a finger. While you work, its ground is faded parchment. When a journal agrees with your map, the places it walked through come back to life, and when the map is restored the whole island does.",
    ],
    features: [
      "One new map a day, the same for everyone, each with its own twist: rivers that carry walkers along, fens that swallow them, linked caves, signposts, standing stones, or mountains that turn walkers left.",
      "Every map has exactly one answer, checked by a solver, and everything you need is on the screen. There is no guessing and no luck.",
      "Hidden landmarks, such as a church, a well or a windmill, to place as well as the mountains.",
      "A campaign of 45 maps in 14 chapters that brings in one idea at a time.",
      "Every past day can be played from a calendar. Streaks, a rank for each map, and a result to share.",
    ],
    facts: [
      ["genre", "Daily logic puzzle"],
      ["platforms", "iPhone and iPad (App Store), and web browser at fadedmaps.com"],
      ["players", "1"],
      ["controls", "Touch or mouse"],
      ["price", "Free, with an occasional ad between maps"],
      ["first daily map", "No. 1, 11 November 2026"],
    ],
    support: "support@fadedmaps.com",
    keyArt: { file: "fadedmaps-key-art-1920x1080.png", alt: "Faded Maps key art: the wordmark beside a restored floating island on a night sky." },
    logos: {
      label: "Wordmark",
      files: ["fadedmaps-wordmark-4x.png", "fadedmaps-wordmark-8x.png", "fadedmaps-wordmark-16x.png"],
      onDark: "fadedmaps-wordmark-on-dark.png",
    },
    icon: { large: "fadedmaps-icon-1024.png", small: "fadedmaps-icon-512.png" },
    pixelArt: true,
    shotsNote: "Screenshots are 1170 × 2532 (iPhone portrait). Desktop screenshots are 1920 × 1080.",
    shots: [
      { file: "screenshot-01-home.png", thumb: "thumb-01-home.png", caption: "Today's map on the home screen", alt: "The home screen: today's map as a faded parchment island, its name and twist, and the campaign below." },
      { file: "screenshot-02-rules.png", thumb: "thumb-02-rules.png", caption: "How to play", alt: "The rules sheet, with two worked examples of a mountain turning a walker." },
      { file: "screenshot-03-journal.png", thumb: "thumb-03-journal.png", caption: "Reading a journal", alt: "A map with three mountains placed and journal D selected, its walker's route drawn in violet." },
      { file: "screenshot-04-check.png", thumb: "thumb-04-check.png", caption: "A check: six of seven journals agree", alt: "After a check, the meadow coming back where six of seven journals agree, and a red box where the map and a journal part." },
      { file: "screenshot-05-restored.png", thumb: "thumb-05-restored.png", caption: "The map restored", alt: "The home screen after the map is solved: the island in full colour with its village, woods and mountains." },
      { file: "screenshot-06-chapters.png", thumb: "thumb-06-chapters.png", caption: "The campaign", alt: "The list of campaign chapters." },
      { file: "screenshot-07-desktop-home.png", thumb: "thumb-07-desktop-home.png", caption: "Home on a desktop", alt: "The home screen on a wide screen, the island on the left." },
      { file: "screenshot-08-desktop-play.png", thumb: "thumb-08-desktop-play.png", caption: "Playing on a desktop", alt: "A map in play on a wide screen, the journals in a column beside the island." },
    ],
  },
  sheerfall: {
    accent: "#e76fc0",
    pitch: "A pixel-art roguelike about cutting a floating island out from under the monsters. You can't fight the Rot. You can only make it fall.",
    about: [
      "You are a Warden of a living sky-island. The Rot climbs up out of the clouds, and nothing you carry can hurt it. What you can do is cut the ground out from under it: draw a seam edge to edge, or loop back on yourself, and everything cut off from the Heartstone falls, with whatever is standing on it. That includes you.",
      "Every cut costs the island land. Heartseeds regrow it, thin necks creak and snap, and one well-placed cut can set off a cascade. The Heartstone, the island itself, is old, warm and wry, and it remembers everything that falls.",
    ],
    features: [
      "Cutting as the core verb: seams, lassos, cracks and cascades on terrain that really breaks apart.",
      "Eight Wardens, each with their own way to break ground, a built-in rule and an ultimate: Warden, Rifter, Breaker, Arbalist, Geomancer, Beastmaster, Alchemist and Necromancer.",
      "Six arenas, each a shard of the old Highland: Sky Meadow, Sunken Dunes, the Caldera, Frozen Tarn, The Mire and Stormreach, each with its own boss.",
      "Expedition: a roguelike run across a map of islands, with boons, relics, sets and fusions. Between islands you dive off the edge and choose your next stop by where you land.",
      "Endless, a Daily challenge with shared leaderboards, and online co-op or versus for up to four.",
      "Gaussian splats rendered as pixel art: every island, tree and monster is a cloud of splats resolved to a hand-picked palette.",
    ],
    facts: [
      ["genre", "Action roguelike"],
      ["platforms", "Web browser, at sheerfall.com. iPhone, in beta."],
      ["players", "1 to 4, online co-op or versus"],
      ["controls", "Touch, keyboard and mouse, gamepad"],
    ],
    support: "support@sheerfall.com",
    elsewhere: { href: "https://sheerfall.com/press/", label: "sheerfall.com/press/" },
    keyArt: { file: "sheerfall-key-art-1920x1080.png", alt: "Sheerfall key art: the wordmark beside a floating island with a pink Heartstone crystal, a chunk of it breaking away into the clouds." },
    logos: {
      label: "Wordmark",
      files: ["sheerfall-wordmark-4x.png", "sheerfall-wordmark-8x.png", "sheerfall-wordmark-16x.png"],
      onDark: "sheerfall-wordmark-on-dark.png",
    },
    icon: { large: "sheerfall-icon-1024.png", small: "sheerfall-icon-512.png" },
    pixelArt: true,
    shotsNote: "Screenshots are 1170 × 2532 (iPhone portrait), scaled 3× from the game's pixels.",
    shots: [
      { file: "screenshot-01-title.png", thumb: "thumb-01-title.png", caption: "Title screen", alt: "The title screen over the floating island." },
      { file: "screenshot-02-returning-axe.png", thumb: "thumb-02-returning-axe.png", caption: "The Rifter's returning axe", alt: "A Rifter's axe cuts a loop of land that glows before it falls." },
      { file: "screenshot-03-sunder.png", thumb: "thumb-03-sunder.png", caption: "Sunder, the Rifter's ultimate", alt: "A wedge of land glowing orange as it breaks away." },
      { file: "screenshot-04-caldera.png", thumb: "thumb-04-caldera.png", caption: "The Caldera", alt: "The Caldera, with lava cracks far below." },
      { file: "screenshot-05-stormreach.png", thumb: "thumb-05-stormreach.png", caption: "Stormreach", alt: "Stormreach above thunderheads." },
      { file: "screenshot-06-sky-meadow.png", thumb: "thumb-06-sky-meadow.png", caption: "Sky Meadow", alt: "The Sky Meadow, seen from the low camera." },
      { file: "screenshot-07-frozen-tarn.png", thumb: "thumb-07-frozen-tarn.png", caption: "Frozen Tarn", alt: "The Frozen Tarn over dark water." },
      { file: "screenshot-08-the-dive.png", thumb: "thumb-08-the-dive.png", caption: "The Dive between islands", alt: "Diving between islands past the Rot's birds." },
    ],
  },
  "cyberdeck-runtime": {
    accent: "#f5e400",
    pitch: "An incremental cyberpunk hacking game. Jack into a corp's servers, break their ICE level by level, and build a rig that climbs deeper.",
    about: [
      "Cyberdeck: Runtime is an incremental hacking game. You open a corp's mainframe, pick a server and jack in. Your programs attack the ICE on their own, and the ICE fights back. Every ICE you break pays Runtime, which you spend during the run on Overclocks such as attack speed, damage and defence.",
      "Each server is a tower a thousand levels deep, with Black ICE at fixed intervals. When a run ends, because you jacked out, the ICE ended the run or you flatlined, what you earned is banked for permanent upgrades, and the next run goes deeper. There is no idle income by default: progress comes from the choices you make in a run.",
    ],
    features: [
      "Icebreakers, viruses and utilities: Fracters for Barriers, Decoders for Code Gates, Killers for Sentries, and AIs that work on anything.",
      "Black ICE with active subroutines on timers: shields, stuns and End the Run.",
      "Exploits: a small deck of one-use scripts drawn into your grip during a run and paid for with Clicks.",
      "A rig of hardware: a console, chips and interfaces.",
      "NULL, an intelligence in your terminal, explains each system the first time it comes up.",
      "Three factions, PYROS, THE SYNDICATE and WRIGHTS, each with its own voice.",
    ],
    facts: [
      ["genre", "Incremental hacking game"],
      ["platforms", "Web browser, at cyberdeckruntime.com (demo). Coming to Steam Early Access, iOS and Android."],
      ["players", "1"],
      ["controls", "Keyboard and mouse, touch"],
    ],
    support: "hello@nullblack.com",
    keyArt: { file: "cyberdeck-runtime-key-art-1920x1080.png", alt: "Cyberdeck: Runtime key art: the CYBERDECK // RUNTIME logo inside a receding wireframe tunnel." },
    logos: {
      label: "Logo",
      files: ["cyberdeck-runtime-logo-1x.png", "cyberdeck-runtime-logo-2x.png"],
      onDark: "cyberdeck-runtime-logo-on-dark.png",
    },
    icon: { large: "cyberdeck-runtime-icon-1024.png", small: "cyberdeck-runtime-icon-512.png" },
    pixelArt: false,
    shotsNote: "Screenshots are 1920 × 1080, from the demo at cyberdeckruntime.com.",
    shots: [
      { file: "screenshot-01-title.png", thumb: "thumb-01-title.png", caption: "Title screen", alt: "The title screen: the CYBERDECK // RUNTIME logo in a wireframe tunnel." },
      { file: "screenshot-02-home.png", thumb: "thumb-02-home.png", caption: "HOME, with NULL's first message", alt: "The HOME screen with NULL's first message pointing at the Enclave mainframe." },
      { file: "screenshot-03-mainframe.png", thumb: "thumb-03-mainframe.png", caption: "Enclave Systems' mainframe", alt: "The Enclave Systems mainframe with the FIRSTWALL server selected and JACK IN below." },
      { file: "screenshot-04-run.png", thumb: "thumb-04-run.png", caption: "A run on FIRSTWALL", alt: "A run: the program SLAG attacking a Plated Barrier, with the log and the Overclocks." },
      { file: "screenshot-05-program-card.png", thumb: "thumb-05-program-card.png", caption: "A program's card", alt: "The detail card for SLAG, a Fracter, held open during a run." },
      { file: "screenshot-06-black-ice.png", thumb: "thumb-06-black-ice.png", caption: "STUNLOCK 1.0, the first Black ICE", alt: "The Black ICE STUNLOCK 1.0 in red, its subroutines counting down." },
      { file: "screenshot-07-overclocks.png", thumb: "thumb-07-overclocks.png", caption: "Spending Runtime on Overclocks", alt: "NULL explaining Overclocks beside the ATK SPEED and DAMAGE rows." },
      { file: "screenshot-08-session-log.png", thumb: "thumb-08-session-log.png", caption: "The session log after a run", alt: "The session log after a run: credits banked, ICE broken, depth reached." },
    ],
  },
  "cyberdeck-packet": {
    accent: "#ffd400",
    pitch: "A grid-inventory roguelike. Arrange a rig of hardware and programs, then fight the corp's ICE turn by turn.",
    about: [
      "Cyberdeck: Packet is set in the world of Cyberdeck: Runtime. You are a packet, running a corp server's route of stops and fights for a client who wants a payload delivered.",
      "Everything you own sits on your rig, a grid where shape and position matter. At each stop you buy hardware and programs and arrange them, and most pieces work on what sits beside them, in their row or along an edge. Then you jack in and fight the server's ICE turn by turn, spending Clicks on hardware and memory on programs. The ICE always shows its next move, so every turn is a plan.",
    ],
    features: [
      "Jobs from three factions: each run is a payload to place in the rig and carry to the end of the server, with its own terms and pay.",
      "A route of stops chosen on a map: THE BACKROOM to buy and sell, CLOCKWORK to work on hardware, NINE LIVES to repair, events and caches.",
      "Every item has one rule under one trigger, readable before you buy it. Pieces drag, rotate and combine into recipes.",
      "Consoles with their own starting rigs and rules.",
      "THE DAILY: the same job for everyone, once a day, with a board.",
      "NEON EDGE, where credits banked from runs buy new pieces for MORROW's stock.",
    ],
    facts: [
      ["genre", "Grid-inventory roguelike, turn-based"],
      ["platforms", "Web browser, at cyberdeckpacket.com (demo). Coming to iOS, Android and Steam."],
      ["players", "1"],
      ["controls", "Touch, mouse, keyboard"],
    ],
    support: "hello@nullblack.com",
    keyArt: { file: "cyberdeck-packet-key-art-1920x1080.png", alt: "Cyberdeck: Packet key art: the yellow PACKET logo over a cyan grid floor with rig pieces on it." },
    logos: {
      label: "Logo",
      files: ["cyberdeck-packet-logo-2x.png", "cyberdeck-packet-logo-4x.png", "cyberdeck-packet-logo-8x.png"],
      onDark: "cyberdeck-packet-logo-on-dark.png",
    },
    icon: { large: "cyberdeck-packet-icon-1024.png", small: "cyberdeck-packet-icon-512.png" },
    pixelArt: true,
    shotsNote: "Screenshots are 1170 × 2532 (iPhone portrait), from the demo at cyberdeckpacket.com.",
    shots: [
      { file: "screenshot-01-jack-in.png", thumb: "thumb-01-jack-in.png", caption: "LOCALHOST", alt: "LOCALHOST: the PACKET logo, JACK IN, and the doors that open after the first run." },
      { file: "screenshot-02-manifest.png", thumb: "thumb-02-manifest.png", caption: "MANIFEST: three jobs", alt: "The MANIFEST board with three jobs, each a payload, a client and its pay." },
      { file: "screenshot-03-the-backroom.png", thumb: "thumb-03-the-backroom.png", caption: "THE BACKROOM", alt: "THE BACKROOM: MORROW's shop above the rig, pieces arranged on the grid." },
      { file: "screenshot-04-route.png", thumb: "thumb-04-route.png", caption: "The route through a server", alt: "The route map: stops and ICE on the way through FIRSTWALL." },
      { file: "screenshot-05-fight.png", thumb: "thumb-05-fight.png", caption: "A fight", alt: "A fight against a Code Gate, its next move shown, a weapon breaking a subroutine." },
      { file: "screenshot-06-ice-broken.png", thumb: "thumb-06-ice-broken.png", caption: "ICE broken", alt: "The Code Gate shattering after its STR reaches zero." },
      { file: "screenshot-07-neon-edge.png", thumb: "thumb-07-neon-edge.png", caption: "NEON EDGE", alt: "NEON EDGE: three cards dealt by THE HOUSE." },
      { file: "screenshot-08-consoles.png", thumb: "thumb-08-consoles.png", caption: "Consoles", alt: "The console list: FATCAT and REDLINE with their rules and kits." },
    ],
  },
  "jurassic-legacy": {
    accent: "#e2622c",
    pitch: "A dinosaur runner about a legacy. Run, die, evolve, and watch the volcano wake.",
    about: [
      "Jurassic Legacy is a runner about a line of dinosaurs. You run through a Jurassic valley, jumping and ducking, until something kills you. Distance fills the Evolution bar, and when it is full the next generation inherits a trait, chosen from a draft of three.",
      "Progress that does not fill the bar still passes down the line, so every run counts. Across the generations the volcano on the horizon wakes: snow-capped at first, then smoking, then running with lava, until the last generation runs under a burning sky and the eruption ends the legacy. The DNA a legacy recovers buys research that carries into the next one.",
    ],
    features: [
      "Traits in four grades, Feral, Adapted, Dominant and Sovereign, drafted three at a time and stacked across a legacy.",
      "Fallen logs, boulders, termite mounds, ground fissures, pterosaurs and packs of compsognathus, and molten rock on the final run.",
      "The day turns from dawn to night across the generations, and the volcano tells the legacy's story in seven stages.",
      "The Daily Calibration: a short seeded legacy, the same for everyone that day, with a shared leaderboard.",
      "A percussion-led score, generated live, that builds as the danger rises.",
    ],
    facts: [
      ["genre", "Runner with a lineage"],
      ["platforms", "Web browser, at jurassiclegacy.com (demo). Coming to iOS, Android and Steam."],
      ["players", "1"],
      ["controls", "Touch (tap to jump, hold the bottom of the screen to duck), keyboard, mouse"],
    ],
    support: "hello@nullblack.com",
    keyArt: { file: "jurassic-legacy-key-art-1920x1080.png", alt: "Jurassic Legacy key art: the logo over a dusk valley, a theropod running under a smoking volcano." },
    logos: {
      label: "Logo",
      files: ["jurassic-legacy-logo-4x.png", "jurassic-legacy-logo-8x.png", "jurassic-legacy-logo-16x.png"],
      onDark: "jurassic-legacy-logo-on-dark.png",
    },
    icon: { large: "jurassic-legacy-icon-1024.png", small: "jurassic-legacy-icon-512.png" },
    pixelArt: true,
    shotsNote: "Screenshots are 2532 × 1170 (iPhone landscape), from the demo at jurassiclegacy.com.",
    shots: [
      { file: "screenshot-01-title.png", thumb: "thumb-01-title.png", caption: "Title screen", alt: "The title screen: the Jurassic Legacy logo and CONTINUE." },
      { file: "screenshot-02-dawn.png", thumb: "thumb-02-dawn.png", caption: "The first generation, at dawn", alt: "A theropod running at dawn, the volcano still snow-capped." },
      { file: "screenshot-03-smoking-volcano.png", thumb: "thumb-03-smoking-volcano.png", caption: "A later generation, the volcano smoking", alt: "A theropod running by day toward a fallen log, the volcano smoking behind." },
      { file: "screenshot-04-night.png", thumb: "thumb-04-night.png", caption: "Night", alt: "A night run under the moon, a termite mound ahead." },
      { file: "screenshot-05-legacy-endures.png", thumb: "thumb-05-legacy-endures.png", caption: "Your legacy endures", alt: "The death card: killed by a ground fissure, the legacy carrying its progress." },
      { file: "screenshot-06-natural-selection.png", thumb: "thumb-06-natural-selection.png", caption: "Natural selection", alt: "The trait draft: Scavenger, Strong Legs and Calm Nature, all Feral." },
      { file: "screenshot-07-final-generation.png", thumb: "thumb-07-final-generation.png", caption: "The final generation", alt: "The final run under a red sky, the volcano pouring lava." },
      { file: "screenshot-08-eruption.png", thumb: "thumb-08-eruption.png", caption: "The eruption", alt: "The volcano's summit blowing out over the burning valley." },
    ],
  },
};

function megabytes(bytes) {
  const mb = bytes / (1024 * 1024);
  return mb >= 10 ? `${Math.round(mb)} MB` : `${mb.toFixed(1)} MB`;
}

function dims(asset) {
  return `${asset.width} × ${asset.height}`;
}

export function zipName(slug) {
  return `${slug}-press-kit.zip`;
}

/** Every file a kit names, in the order they go in its zip. */
export function kitFiles(kit) {
  const files = [];
  if (kit.keyArt) files.push(kit.keyArt.file);
  if (kit.logos) files.push(...kit.logos.files, ...(kit.logos.onDark ? [kit.logos.onDark] : []));
  if (kit.icon) files.push(kit.icon.large, ...(kit.icon.small ? [kit.icon.small] : []));
  for (const shot of kit.shots) files.push(shot.file);
  return files;
}

/** The kit's thumbnails: shown on the page, not put in the zip. */
export function kitThumbs(kit) {
  return kit.shots.map((shot) => shot.thumb);
}

function factRows(site, game, kit) {
  const email = (value) => `<a href="mailto:${escapeHtml(value)}">${escapeHtml(value)}</a>`;
  const host = isPlaceholder(game.url) ? "" : new URL(game.url).host;
  const rows = [
    ["title", escapeHtml(game.title)],
    ...kit.facts.map(([label, value]) => [label, escapeHtml(value)]),
  ];
  if (host) rows.push(["website", `<a href="${escapeHtml(game.url)}">${escapeHtml(host)}</a>`]);
  rows.push(["developer", "Jonathan Black"]);
  rows.push(["studio", `<a href="/">${escapeHtml(site.name)}</a>`]);
  rows.push(["press", email(site.pressEmail)]);
  if (kit.support) rows.push(["support", email(kit.support)]);
  return rows;
}

function img(base, file, asset, alt, extra = "") {
  return `<img src="${base}${escapeHtml(file)}" width="${asset.width}" height="${asset.height}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"${extra}>`;
}

function assetLink(base, file, asset, label) {
  return `<a href="${base}${escapeHtml(file)}" download>${escapeHtml(label ?? dims(asset))}</a>`;
}

function kitBody(site, game, kit, assets) {
  const slug = game.slug;
  const base = `/press/${slug}/assets/`;
  const get = (file) => {
    const asset = assets[file];
    if (!asset) throw new Error(`press/${slug}: missing asset ${file}`);
    return asset;
  };
  const zip = assets[zipName(slug)];
  const pixel = kit.pixelArt ? ` class="pixel"` : "";
  const rows = factRows(site, game, kit)
    .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${value}</dd>`)
    .join("\n          ");

  const cards = [];
  if (kit.logos) {
    const first = kit.logos.files[0];
    const links = kit.logos.files.map((file) => assetLink(base, file, get(file))).join(" · ");
    cards.push(`<li class="asset">
          <div class="art check">${img(base, first, get(first), `${game.title} ${kit.logos.label.toLowerCase()}`, pixel)}</div>
          <h3>${escapeHtml(kit.logos.label.toLowerCase())}</h3>
          <p>transparent png. ${links}</p>
        </li>`);
    if (kit.logos.onDark) {
      const file = kit.logos.onDark;
      cards.push(`<li class="asset">
          <div class="art">${img(base, file, get(file), `${game.title} ${kit.logos.label.toLowerCase()} on dark`, pixel)}</div>
          <h3>${escapeHtml(kit.logos.label.toLowerCase())} on dark</h3>
          <p>${assetLink(base, file, get(file), `${dims(get(file))} png`)}</p>
        </li>`);
    }
  }
  if (kit.icon) {
    const shown = kit.icon.small ?? kit.icon.large;
    const links = [kit.icon.large, kit.icon.small].filter(Boolean).map((file) => assetLink(base, file, get(file))).join(" · ");
    cards.push(`<li class="asset">
          <div class="art">${img(base, shown, get(shown), `${game.title} app icon`, ` class="icon"`)}</div>
          <h3>app icon</h3>
          <p>${links}</p>
        </li>`);
  }
  if (kit.keyArt) {
    const file = kit.keyArt.file;
    cards.push(`<li class="asset">
          <div class="art">${img(base, file, get(file), `${game.title} key art`)}</div>
          <h3>key art</h3>
          <p>${assetLink(base, file, get(file), `${dims(get(file))} png`)}</p>
        </li>`);
  }

  const shots = kit.shots
    .map((shot) => {
      const full = get(shot.file);
      const thumb = get(shot.thumb);
      const shape = full.width > full.height ? "wide" : "tall";
      return `<li class="${shape}"><a href="${base}${escapeHtml(shot.file)}" download>${img(base, shot.thumb, thumb, shot.alt)}<span>${escapeHtml(shot.caption)}</span></a></li>`;
    })
    .join("\n          ");

  const hero = kit.keyArt
    ? `<figure class="kit-hero">${img(base, kit.keyArt.file, get(kit.keyArt.file), kit.keyArt.alt, ` fetchpriority="high"`).replace(' loading="lazy"', "")}</figure>`
    : "";
  const elsewhere = kit.elsewhere
    ? `\n        <p class="meta">This kit is also at <a href="${escapeHtml(kit.elsewhere.href)}">${escapeHtml(kit.elsewhere.label)}</a>.</p>`
    : "";
  const play = isPlaceholder(game.url) ? "" : `<a class="button" href="${escapeHtml(game.url)}">play ${escapeHtml(new URL(game.url).host)}</a>`;

  return `<div class="kit" style="--accent: ${escapeHtml(kit.accent)}">
      <p class="crumbs"><a href="/press/">press</a> <span aria-hidden="true">/</span> ${escapeHtml(game.slug)}</p>
      ${hero}
      <header class="kit-intro">
        <p class="kicker">press kit</p>
        <h1>${escapeHtml(game.title)}</h1>
        <p class="pitch">${escapeHtml(kit.pitch)}</p>
        <p class="kit-actions"><a class="button primary" href="/press/${escapeHtml(slug)}/${zipName(slug)}" download>download everything <small>.zip, ${megabytes(zip.bytes)}</small></a>
          ${play}</p>${elsewhere}
      </header>

      <section class="kit-two" aria-labelledby="about">
        <div class="kit-copy">
          <h2 id="about">about</h2>
          ${kit.about.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n          ")}
          <h3>features</h3>
          <ul>
            ${kit.features.map((f) => `<li>${escapeHtml(f)}</li>`).join("\n            ")}
          </ul>
        </div>
        <div class="kit-facts">
          <h2 id="facts">fact sheet</h2>
          <dl>
          ${rows}
          </dl>
        </div>
      </section>

      <section aria-labelledby="logo">
        <h2 id="logo">logo and art</h2>
        <ul class="assets">
        ${cards.join("\n        ")}
        </ul>${kit.pixelArt ? `\n        <p class="meta">Pixel art: please scale by whole numbers with nearest-neighbour sampling, so the pixels stay crisp.</p>` : ""}
      </section>

      <section aria-labelledby="shots">
        <h2 id="shots">screenshots</h2>
        <ul class="shots">
          ${shots}
        </ul>
        <p class="meta">${escapeHtml(kit.shotsNote)} Select one to download it at full size.</p>
      </section>

      <p class="kit-foot">${escapeHtml(game.title)} is made by Jonathan Black at ${escapeHtml(site.name)}. Press: <a href="mailto:${escapeHtml(site.pressEmail)}">${escapeHtml(site.pressEmail)}</a>. <a href="/press/">All press kits</a>.</p>
    </div>`;
}

/** The fact sheet as plain text, for the zip. */
export function factSheetText(site, game, kit) {
  const lines = [`${game.title}: press kit`, "", kit.pitch, ""];
  for (const [label, value] of factRows(site, game, kit)) {
    const text = value.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    lines.push(`${label}: ${text}`);
  }
  lines.push("", "About", "", ...kit.about.flatMap((p) => [p, ""]), "Features", "");
  for (const feature of kit.features) lines.push(`- ${feature}`);
  lines.push("", "Screenshots", "");
  for (const shot of kit.shots) lines.push(`${shot.file}: ${shot.caption}`);
  lines.push("", `Press kit online: https://nullblack.com/press/${game.slug}/`, "");
  return lines.join("\n");
}

function studioBody(site, assets) {
  const email = escapeHtml(site.pressEmail);
  const social = site.social
    .filter((item) => !isPlaceholder(item.url))
    .map((item) => `<a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>`)
    .join(" · ");
  const games = site.games
    .filter((game) => pressKits[game.slug])
    .map((game) => {
      const kit = pressKits[game.slug];
      const slug = escapeHtml(game.slug);
      const icon = kit.icon ? kit.icon.small ?? kit.icon.large : null;
      const art = icon
        ? `<img src="/press/${slug}/assets/${escapeHtml(icon)}" width="${assets[game.slug][icon].width}" height="${assets[game.slug][icon].height}" alt="" loading="lazy" decoding="async">`
        : "";
      const also = kit.elsewhere ? ` <a href="${escapeHtml(kit.elsewhere.href)}">${escapeHtml(kit.elsewhere.label)}</a>` : "";
      const site = isPlaceholder(game.url) ? "" : ` <a href="${escapeHtml(game.url)}">${escapeHtml(new URL(game.url).host)}</a>`;
      return `<li><article class="card kit-card" style="--accent: ${escapeHtml(kit.accent)}">
          <a class="kit-card-art" href="/press/${slug}/" tabindex="-1" aria-hidden="true">${art}</a>
          <div>
            <h3><a href="/press/${slug}/">${escapeHtml(game.title)}</a></h3>
            <p class="desc">${escapeHtml(game.description)}</p>
            <p class="card-links"><a href="/press/${slug}/">press kit</a>${site}${also}</p>
          </div>
        </article></li>`;
    })
    .join("\n        ");
  return `<h1>press</h1>
      <p>Fact sheets, logos, key art and screenshots for nullblack and its games. Everything here may be used to write about the games.</p>
      <section aria-labelledby="studio">
        <h2 id="studio">studio fact sheet</h2>
        <dl class="facts">
          <dt>studio</dt><dd>nullblack</dd>
          <dt>developer</dt><dd>Jonathan Black</dd>
          <dt>about</dt><dd>${escapeHtml(site.tagline)} ${escapeHtml(site.lede)}</dd>
          <dt>website</dt><dd><a href="/">nullblack.com</a></dd>
          <dt>press</dt><dd><a href="mailto:${email}">${email}</a></dd>
          <dt>social</dt><dd>@nullblackgames on ${social}</dd>
          <dt>games</dt><dd>${site.games.length}</dd>
        </dl>
      </section>
      <section aria-labelledby="games">
        <h2 id="games">games</h2>
        <ul class="games kit-games">
        ${games}
        </ul>
      </section>
      <section aria-labelledby="logo">
        <h2 id="logo">studio logo</h2>
        <ul class="downloads">
          <li><a href="/assets/brand/lockup-horizontal-light-on-dark.svg" download>lockup, light on dark</a></li>
          <li><a href="/assets/brand/lockup-horizontal-dark-on-light.svg" download>lockup, dark on light</a></li>
          <li><a href="/assets/brand/lockup-horizontal-light-on-dark.png" download>lockup, light on dark png</a></li>
          <li><a href="/assets/brand/icon-cursor-light.svg" download>icon, light</a></li>
          <li><a href="/assets/brand/icon-cursor-dark.svg" download>icon, dark</a></li>
          <li><a href="/assets/brand/icon-cursor-dark-1024.png" download>icon, 1024 png</a></li>
        </ul>
        <p>The wordmark is IBM Plex Mono Bold. nullblack is always lowercase.</p>
      </section>`;
}

/**
 * @param {typeof import("./site.config.mjs").site} site
 * @param {Record<string, Record<string, { width: number, height: number, bytes: number }>>} assets
 *   per slug: every file in assets/press/<slug>/ plus the built zip, with PNG sizes
 */
export function pressPages(site, assets) {
  const pages = [
    {
      dir: "press",
      title: "press",
      description: "Press kits, logos and contact for nullblack and its games.",
      body: studioBody(site, assets),
    },
  ];
  for (const game of site.games) {
    const kit = pressKits[game.slug];
    if (!kit) continue;
    const keyArt = kit.keyArt ? assets[game.slug][kit.keyArt.file] : null;
    pages.push({
      dir: `press/${game.slug}`,
      title: `${game.title} press kit`,
      description: `${game.title} press kit: fact sheet, key art, logo, icon and screenshots.`,
      image: keyArt ? { path: `/press/${game.slug}/assets/${kit.keyArt.file}`, ...keyArt, alt: kit.keyArt.alt } : null,
      wide: true,
      body: kitBody(site, game, kit, assets[game.slug]),
    });
  }
  return pages.map((page) => ({
    dir: page.dir,
    path: `/${page.dir}/`,
    html: renderPage(site, { ...page, path: `/${page.dir}/` }),
  }));
}
