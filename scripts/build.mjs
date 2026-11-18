import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { site } from "../src/site.config.mjs";
import { renderIndex, renderNotFound } from "./render.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const brand = path.join(root, "assets", "brand");

async function writeOgImage() {
  const source = path.join(brand, "lockup-horizontal-light-on-dark.png");
  const targetWidth = 980;
  const resized = await sharp(source)
    .resize({ width: targetWidth, withoutEnlargement: false })
    .png()
    .toBuffer();
  const resizedMeta = await sharp(resized).metadata();
  const top = Math.round((630 - resizedMeta.height) / 2);

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: "#000000",
    },
  })
    .composite([{ input: resized, top, left: Math.round((1200 - targetWidth) / 2) }])
    .png()
    .toFile(path.join(pub, "og.png"));

  const og = await sharp(path.join(pub, "og.png")).metadata();
  if (og.width !== 1200 || og.height !== 630) {
    throw new Error(`og.png is ${og.width}x${og.height}, expected 1200x630`);
  }
}

const manifest = {
  name: "nullblack",
  short_name: "nullblack",
  start_url: "/",
  display: "standalone",
  background_color: "#000000",
  theme_color: "#000000",
  icons: [
    { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    { src: "/apple-touch-icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
  ],
};

await rm(pub, { recursive: true, force: true });
await mkdir(path.join(pub, "assets", "brand"), { recursive: true });
await mkdir(path.join(pub, "fonts"), { recursive: true });

await writeFile(path.join(pub, "index.html"), renderIndex(site));
await writeFile(path.join(pub, "404.html"), renderNotFound(site));
await writeFile(path.join(pub, "styles.css"), await readFile(path.join(root, "src", "styles.css")));
await writeFile(path.join(pub, "site.webmanifest"), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(
  path.join(pub, "robots.txt"),
  "User-agent: *\nAllow: /\n\nSitemap: https://nullblack.com/sitemap.xml\n",
);
await writeFile(
  path.join(pub, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://nullblack.com/</loc></url>
</urlset>
`,
);

await cp(brand, path.join(pub, "assets", "brand"), { recursive: true });
await cp(path.join(root, "src", "fonts"), path.join(pub, "fonts"), { recursive: true });
await cp(path.join(brand, "favicon.ico"), path.join(pub, "favicon.ico"));
await cp(path.join(brand, "favicon-16.png"), path.join(pub, "favicon-16.png"));
await cp(path.join(brand, "favicon-32.png"), path.join(pub, "favicon-32.png"));
await cp(path.join(brand, "icon-512.png"), path.join(pub, "apple-touch-icon.png"));
await writeOgImage();

console.log("built public/");
