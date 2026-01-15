import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "./apple_emojis_png";
const OUTPUT_DIR = "./apple_emojis_webp";
const WEBP_QUALITY = 70;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs.readdirSync(INPUT_DIR);

const formatKB = (bytes) => (bytes / 1024).toFixed(1);

files.forEach(async (file) => {
  if (!file.endsWith(".png")) return;

  const inputPath = path.join(INPUT_DIR, file);
  const outputPath = path.join(
    OUTPUT_DIR,
    file.replace(".png", ".webp")
  );

  try {
    const originalSize = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .webp({
        quality: WEBP_QUALITY,
        effort: 6,
      })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const ratio = (originalSize / newSize).toFixed(1);

    console.log(
      `✔ ${file}
      ├─ PNG:  ${formatKB(originalSize)} KB
      ├─ WEBP: ${formatKB(newSize)} KB
      └─ Compresión: ${ratio}×\n`
    );
  } catch (err) {
    console.error(`✖ Error con ${file}`, err);
  }
});
