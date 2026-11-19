import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { factSheetText, kitFiles, kitThumbs, pressKits, pressPages, zipName } from "../src/press.mjs";
import { makeZip } from "./zip.mjs";

function pngSize(buffer, file) {
  if (buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
    throw new Error(`${file} is not a PNG`);
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

/**
 * Reads assets/press/<slug>/ for every kit: each file's bytes and size, and
 * the kit's zip (its named files plus a fact sheet, in a folder of the kit's name).
 */
export async function readPress(root, site) {
  const kits = {};
  for (const game of site.games) {
    const kit = pressKits[game.slug];
    if (!kit) continue;
    const dir = path.join(root, "assets", "press", game.slug);
    const names = (await readdir(dir)).filter((name) => name.endsWith(".png")).sort();
    const files = {};
    for (const name of names) {
      const data = await readFile(path.join(dir, name));
      files[name] = { data, bytes: data.length, ...pngSize(data, name) };
    }
    for (const name of [...kitFiles(kit), ...kitThumbs(kit)]) {
      if (!files[name]) throw new Error(`press kit ${game.slug} names ${name}, which is not in assets/press/${game.slug}/`);
    }
    const folder = `${game.slug}-press-kit`;
    const zip = makeZip([
      { name: `${folder}/fact-sheet.txt`, data: Buffer.from(factSheetText(site, game, kit), "utf8") },
      ...kitFiles(kit).map((name) => ({ name: `${folder}/${name}`, data: files[name].data })),
    ]);
    kits[game.slug] = { files, zip };
  }
  return kits;
}

/** The size table pressPages() reads: every file and the zip, by slug. */
export function pressAssetTable(kits) {
  const table = {};
  for (const [slug, kit] of Object.entries(kits)) {
    table[slug] = {};
    for (const [name, file] of Object.entries(kit.files)) {
      table[slug][name] = { width: file.width, height: file.height, bytes: file.bytes };
    }
    table[slug][zipName(slug)] = { bytes: kit.zip.length };
  }
  return table;
}

/** Writes public/press/<slug>/assets/*, the zips and every press page. Returns the pages. */
export async function writePress(pub, site, kits) {
  for (const [slug, kit] of Object.entries(kits)) {
    const dir = path.join(pub, "press", slug, "assets");
    await mkdir(dir, { recursive: true });
    for (const [name, file] of Object.entries(kit.files)) {
      await writeFile(path.join(dir, name), file.data);
    }
    await writeFile(path.join(pub, "press", slug, zipName(slug)), kit.zip);
  }
  const pages = pressPages(site, pressAssetTable(kits));
  for (const page of pages) {
    const dir = path.join(pub, page.dir);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), page.html);
  }
  return pages;
}
