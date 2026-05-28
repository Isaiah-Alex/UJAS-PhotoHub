import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");

const IMAGE_SOURCES = {
  hero: "photo-1516570174174-4668a3bf3974",
  "portrait-woman-1": "photo-1531127243750-a795bf36bafe",
  "portrait-woman-2": "photo-1524504388940-b1c1722653e2",
  "portrait-woman-3": "photo-1573496359142-b8d87734a5a2",
  "portrait-woman-4": "photo-1595152434720-5fe46129977e",
  "portrait-woman-5": "photo-1531746020798-e6953c6e8e04",
  "portrait-man-1": "photo-1519085360753-af0119f7cbe7",
  "portrait-man-2": "photo-1560250097-0b93528c311a",
  "portrait-man-3": "photo-1619895862022-09128fd51190",
  "fashion-1": "photo-1508214751196-bcfd4ca60f91",
  "fashion-2": "photo-1545167622-3d25bda34fd9",
  "wedding-1": "photo-1465497031412-622f27989f5a",
  "wedding-2": "photo-1519741347686-c1e0aadf4611",
  "street-1": "photo-1477959858617-67f85cf4f1df",
  "nature-1": "photo-1501854140801-50d01698950b",
  "corporate-1": "photo-1486325212027-8081e485255e",
  "lifestyle-1": "photo-1558769132-cb1aea458c5e",
  "events-1": "photo-1492684223066-81342ee5ff30",
  "corporate-2": "photo-1554048612-b6a482bc67e5",
  "nature-2": "photo-1441974231531-c6227db76b6e",
  "portfolio-1": "photo-1488426862026-3ee34a7d66df",
};

await mkdir(outDir, { recursive: true });

for (const [key, unsplashId] of Object.entries(IMAGE_SOURCES)) {
  const url = `https://images.unsplash.com/${unsplashId}?auto=format&fit=crop&w=1600&q=85`;
  const dest = join(outDir, `${key}.jpg`);
  process.stdout.write(`Downloading ${key}... `);
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`FAILED (${res.status})`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log("ok");
}

console.log("Done.");
