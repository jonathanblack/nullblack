/**
 * nullblack site configuration. This is the only place outbound links live.
 *
 * A value of "TODO" (or any string that starts with "TODO") is unpublished:
 * the page shows the placeholder and does not link it. Replace the whole
 * value with a real URL or email. Do not invent store or game URLs.
 *
 * Social URLs are the public profiles for @nullblackgames.
 *
 * TODOs for the owner:
 * - games[cyberdeck].url
 * - games[cyberdeck-packet].url
 * - games[cyberdeck-packet].status if the public platform line should differ
 * - games[jurassic-legacy].url
 * - games[sheerfall].url
 * - games[faded-maps].url
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
      title: "Cyberdeck: Runtime",
      description: "An incremental cyberpunk hacking game.",
      status: "Coming to Steam Early Access, iOS, and web.",
      // TODO: Steam, iOS, or web URL.
      url: "TODO",
    },
    {
      id: "cyberdeck-packet",
      title: "Cyberdeck: Packet",
      description: "A turn-based roguelike. Arrange a rig, then fight ICE.",
      // TODO: confirm the public platform line.
      status: "Coming to web, iOS, and Steam.",
      // TODO: web, iOS, or Steam URL.
      url: "TODO",
    },
    {
      id: "jurassic-legacy",
      title: "Jurassic Legacy",
      description: "A dinosaur lineage runner.",
      status: "Coming to iOS, Android, and Steam.",
      // TODO: iOS, Android, or Steam URL.
      url: "TODO",
    },
    {
      id: "sheerfall",
      title: "Sheerfall",
      description: "A 3D co-op roguelike with eight classes and up to four players.",
      status: "Coming to web, then Steam.",
      // TODO: web or Steam URL.
      url: "TODO",
    },
    {
      id: "faded-maps",
      title: "Faded Maps",
      description: "A daily map-deduction puzzle.",
      status: "Play on the web.",
      // TODO: web game URL.
      url: "TODO",
    },
  ],
};

export function isPlaceholder(value) {
  return typeof value !== "string" || value.trim() === "" || /^todo\b/i.test(value.trim());
}
