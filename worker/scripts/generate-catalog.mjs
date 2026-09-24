import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "../..");
const sourcePath = path.join(rootDir, "script.js");
const outputPath = path.join(rootDir, "worker/src/catalog.json");
const source = fs.readFileSync(sourcePath, "utf8");
const match = source.match(/^const products = (\[[\s\S]*?\n\]);\r?\n\r?\nconst productOrder/m);
if (!match) throw new Error("Catalogue products introuvable dans script.js");

const products = vm.runInNewContext(`(${match[1]})`);
const catalog = Object.fromEntries(
  products.map(({ id, name, price, image }) => [
    id,
    {
      name,
      unitAmount: Math.round(Number(price) * 100),
      image: new URL(image.replace(/^\.\//, ""), "https://didipro-val.github.io/valsite/").href
    }
  ])
);
const serialized = `${JSON.stringify(catalog, null, 2)}\n`;

if (process.argv.includes("--check")) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== serialized) {
    throw new Error("worker/src/catalog.json n'est pas synchronisé. Lance npm run catalog.");
  }
} else {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, serialized);
  console.log(`${Object.keys(catalog).length} produits synchronisés dans worker/src/catalog.json`);
}
