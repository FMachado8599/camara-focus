import admin from "firebase-admin";
import fs from "fs";

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(
      fs.readFileSync(
        new URL("./firebase-key.json", import.meta.url),
        "utf8"
      )
    )
  ),
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

function normalize(codepoint) {
  return codepoint.toLowerCase().replace(/-fe0f/g, "");
}

async function run() {
  const snapshot = await db.collection("emojis").get();

  let found = 0;
  let missing = 0;

  for (const doc of snapshot.docs) {
    const { codepoint } = doc.data();
    const normalized = normalize(codepoint);

    const file = bucket.file(`emojis/apple/${normalized}.png`);
    const [exists] = await file.exists();

    await doc.ref.update({ hasImage: exists });

    exists ? found++ : missing++;
  }

  console.log("✅ Con imagen:", found);
  console.log("❌ Sin imagen:", missing);
}

run();
