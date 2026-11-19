import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hubPages } from "../src/hub.mjs";
import { site } from "../src/site.config.mjs";
import { readPress, writePress } from "./press.mjs";
import { renderIndex, renderNotFound } from "./render.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const brand = path.join(root, "assets", "brand");

function pngSize(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    throw new Error("og.png is not a PNG");
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

async function copyOgImage() {
  const source = path.join(root, "assets", "og.png");
  const target = path.join(pub, "og.png");
  await cp(source, target);
  const size = pngSize(await readFile(target));
  if (size.width !== 1200 || size.height !== 630) {
    throw new Error(`og.png is ${size.width}x${size.height}, expected 1200x630`);
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
    { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
  ],
};

await rm(pub, { recursive: true, force: true });
await mkdir(path.join(pub, "assets", "brand"), { recursive: true });
await mkdir(path.join(pub, "fonts"), { recursive: true });

await writeFile(path.join(pub, "index.html"), renderIndex(site));
await writeFile(path.join(pub, "404.html"), renderNotFound(site));
const pages = hubPages(site);
for (const page of pages) {
  const dir = path.join(pub, page.dir);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), page.html);
}
const press = await writePress(pub, site, await readPress(root, site));
await writeFile(path.join(pub, "styles.css"), await readFile(path.join(root, "src", "styles.css")));
await writeFile(path.join(pub, "site.webmanifest"), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(
  path.join(pub, "robots.txt"),
  "User-agent: *\nAllow: /\n\nSitemap: https://nullblack.com/sitemap.xml\n",
);
const locs = ["https://nullblack.com/", ...[...pages, ...press].map((page) => `https://nullblack.com${page.path}`)];
await writeFile(
  path.join(pub, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs.map((loc) => `  <url><loc>${loc}</loc></url>`).join("\n")}
</urlset>
`,
);

await cp(brand, path.join(pub, "assets", "brand"), { recursive: true });
await cp(path.join(root, "src", "fonts"), path.join(pub, "fonts"), { recursive: true });
await cp(path.join(brand, "favicon.ico"), path.join(pub, "favicon.ico"));
await cp(path.join(brand, "favicon-16.png"), path.join(pub, "favicon-16.png"));
await cp(path.join(brand, "favicon-32.png"), path.join(pub, "favicon-32.png"));
await cp(path.join(brand, "favicon-48.png"), path.join(pub, "favicon-48.png"));
await cp(path.join(brand, "apple-touch-icon.png"), path.join(pub, "apple-touch-icon.png"));
await copyOgImage();

console.log("built public/");
