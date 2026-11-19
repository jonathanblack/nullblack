/**
 * nullblack site configuration. This is the only place outbound links live.
 *
 * A value of "TODO" (or any string that starts with "TODO") is unpublished:
 * the page shows the placeholder and does not link it. Replace the whole
 * value with a real URL or email. Do not invent store or game URLs.
 *
 * Accounts that exist: X and Twitch are @nullblackgames, Instagram is
 * @nullblack_games. Discord stays off the site until there is an invite.
 *
 * Still unpublished, and not printed on the site:
 * - Steam, App Store, and Play store URLs
 */

export const site = {
  name: "nullblack",
  url: "https://nullblack.com/",
  tagline: "small games, made late at night.",
  lede: "The studio of Jonathan Black.",
  description: "small games, made late at night. The studio of Jonathan Black.",
  year: 2026,
  pressEmail: "hello@nullblack.com",
  effectiveDate: "November 18, 2026",
  supportResponseTime: "within 2 business days",
  social: [
    { id: "x", label: "x", handle: "@nullblackgames", url: "https://x.com/nullblackgames" },
    {
      id: "instagram",
      label: "instagram",
      handle: "@nullblack_games",
      url: "https://www.instagram.com/nullblack_games/",
    },
    { id: "twitch", label: "twitch", handle: "@nullblackgames", url: "https://www.twitch.tv/nullblackgames" },
  ],
  games: [
    {
      id: "cyberdeck",
      slug: "cyberdeck-runtime",
      title: "Cyberdeck: Runtime",
      description: "An incremental cyberpunk hacking game.",
      pitch: "Jack into a corp's servers, break their ICE, and build a rig that climbs deeper.",
      status: "Web demo. Coming to Steam Early Access, iOS and Android.",
      url: "https://cyberdeckruntime.com/",
      accent: "#f5e400",
      art: "cyberdeck-runtime-key-art-1920x1080.png",
      // Display copy of the press key art. The kit PNG is about 830KB.
      homeArt: "/assets/home/cyberdeck-runtime-key-art.webp",
      artWidth: 1600,
      artHeight: 900,
    },
    {
      id: "cyberdeck-packet",
      slug: "cyberdeck-packet",
      title: "Cyberdeck: Packet",
      description: "Arrange a rig, then fight.",
      pitch: "Arrange a rig, then fight the corp's ICE.",
      status: "Web demo. Coming to iOS and Android, and Steam.",
      url: "https://cyberdeckpacket.com/",
      accent: "#ffd400",
      art: "cyberdeck-packet-key-art-1920x1080.png",
    },
    {
      id: "jurassic-legacy",
      slug: "jurassic-legacy",
      title: "Jurassic Legacy",
      description: "A dinosaur lineage runner.",
      pitch: "Run, die, evolve, and watch the volcano wake.",
      status: "Web demo. Coming to iOS and Android, and Steam.",
      url: "https://jurassiclegacy.com/",
      accent: "#e2622c",
      art: "jurassic-legacy-key-art-1920x1080.png",
    },
    {
      id: "sheerfall",
      slug: "sheerfall",
      title: "Sheerfall",
      description: "A co-op roguelike for up to four players.",
      pitch: "You can't fight the Rot. You can only make it fall.",
      status: "On the web. iPhone, in beta.",
      url: "https://sheerfall.com/",
      accent: "#e76fc0",
      art: "sheerfall-key-art-1920x1080.png",
    },
    {
      id: "faded-maps",
      slug: "fadedmaps",
      title: "Faded Maps",
      description: "A daily map puzzle.",
      pitch: "Read the journals of a faded map, and work out where the mountains are.",
      status: "On the web, and on iPhone and iPad.",
      url: "https://fadedmaps.com/",
      accent: "#f2d27a",
      art: "fadedmaps-key-art-1920x1080.png",
    },
  ],
};

export function isPlaceholder(value) {
  return typeof value !== "string" || value.trim() === "" || /^todo\b/i.test(value.trim());
}
