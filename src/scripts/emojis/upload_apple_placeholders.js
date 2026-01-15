import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

// 🔐 Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(
      fs.readFileSync(
        new URL("./firebase-key.json", import.meta.url),
        "utf8"
      )
    )
  ),
  storageBucket: "camara-focus.firebasestorage.app",
});

const storage = admin.storage().bucket();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Local & Remote
const LOCAL_DIR = path.join(__dirname, "apple_emojis_webp_placeholders");
const REMOTE_DIR = "emojis/apple-placeholders";

const files = fs.readdirSync(LOCAL_DIR);

let uploaded = 0;

for (const file of files) {
  if (!file.endsWith(".webp")) continue;

  const codepoint = file.replace(".webp", "");
  const localPath = path.join(LOCAL_DIR, file);
  const remotePath = `${REMOTE_DIR}/${file}`;

  try {
    await storage.upload(localPath, {
      destination: remotePath,
      metadata: {
        contentType: "image/webp",
        cacheControl: "public, max-age=31536000, immutable",
      },
    });

    uploaded++;

    if (uploaded % 100 === 0) {
      console.log(`🚀 ${uploaded} placeholders subidos`);
    }
  } catch (err) {
    console.error(`❌ Error subiendo ${codepoint}`);
    console.error(err.message);
  }
}

console.log(`🎉 Upload terminado. Total: ${uploaded}`);
