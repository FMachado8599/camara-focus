import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Paths
const INPUT_DIR = path.join(__dirname, "apple_emojis_webp");
const OUTPUT_DIR = path.join(__dirname, "apple_emojis_webp_placeholders");

// 📐 Config
const SIZE = 72;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => f.endsWith(".webp"));

const total = files.length;
let resized = 0;

const kb = (bytes) => (bytes / 1024).toFixed(1);

for (const file of files) {
  const inputPath = path.join(INPUT_DIR, file);
  const outputPath = path.join(OUTPUT_DIR, file);

  try {
    const originalSize = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .resize(SIZE, SIZE, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const ratio = (originalSize / newSize).toFixed(1);

    resized++;

    console.log(
      `✔ ${file}
      ├─ Antes: ${kb(originalSize)} KB
      ├─ Ahora: ${kb(newSize)} KB
      ├─ Ratio: ${ratio}×
      └─ Progreso: ${resized}/${total}\n`
    );
  } catch (err) {
    console.error(`❌ Error con ${file}`);
    console.error(err.message);
  }
}

console.log(`🎉 Resize terminado. Total: ${resized}/${total}`);
