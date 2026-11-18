/**
 * nullblack site configuration. This is the only place outbound links live.
 *
 * A value of "TODO" (or any string that starts with "TODO") is unpublished:
 * the page shows the placeholder and does not link it. Replace the whole
 * value with a real URL or email. Do not invent store or game URLs.
 *
 * Social URLs are the public profiles for @nullblackgames.
 *
 * Still unpublished, and not printed on the site:
 * - games[cyberdeck-packet].url (cyberdeckpacket.com is not a live game)
 * - games[cyberdeck-packet].status if the public platform line should differ
 * - Steam store URLs
 * - social bluesky: confirm the profile. The URL below assumes
 *   nullblackgames.bsky.social. Replace it if the handle is a custom domain.
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
    { id: "x", label: "x", url: "https://x.com/nullblackgames" },
    { id: "tiktok", label: "tiktok", url: "https://www.tiktok.com/@nullblackgames" },
    { id: "youtube", label: "youtube", url: "https://www.youtube.com/@nullblackgames" },
    { id: "twitch", label: "twitch", url: "https://www.twitch.tv/nullblackgames" },
    { id: "instagram", label: "instagram", url: "https://www.instagram.com/nullblackgames" },
    {
      id: "bluesky",
      label: "bluesky",
      url: "https://bsky.app/profile/nullblackgames.bsky.social",
    },
  ],
  games: [
    {
      id: "cyberdeck",
      slug: "cyberdeck-runtime",
      title: "Cyberdeck: Runtime",
      description: "An incremental cyberpunk hacking game.",
      status: "Coming to Steam Early Access, iOS, Android, and web.",
      url: "https://cyberdeckruntime.com/",
    },
    {
      id: "cyberdeck-packet",
      slug: "cyberdeck-packet",
      title: "Cyberdeck: Packet",
      description: "Arrange a rig, then fight.",
      // TODO: confirm the public platform line.
      status: "Coming to web, iOS, Android, and Steam.",
      // TODO: playable web, iOS, Android, or Steam URL. cyberdeckpacket.com is not a live game.
      url: "TODO",
    },
    {
      id: "jurassic-legacy",
      slug: "jurassic-legacy",
      title: "Jurassic Legacy",
      description: "A dinosaur lineage runner.",
      status: "Coming to iOS, Android, and Steam.",
      url: "https://jurassiclegacy.com/",
    },
    {
      id: "sheerfall",
      slug: "sheerfall",
      title: "Sheerfall",
      description: "A co-op roguelike for up to four players.",
      status: "Coming to web, then Steam.",
      url: "https://sheerfall.com/",
    },
    {
      id: "faded-maps",
      slug: "fadedmaps",
      title: "Faded Maps",
      description: "A daily map puzzle.",
      status: "Play on the web.",
      url: "https://fadedmaps.com/",
    },
  ],
};

export function isPlaceholder(value) {
  return typeof value !== "string" || value.trim() === "" || /^todo\b/i.test(value.trim());
}
