import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

// =========================
// Utils
// =========================
function normalizeCodepointForAssets(codepoint) {
  return codepoint
    .toLowerCase()
    .split("-")
    .map(part => part.replace(/^0+/, "") || "0")
    .join("-");
}

// =========================
// Resolver imagen
// =========================
async function resolveEmojiUrlFromCodepoint(codepoint) {
  if (!codepoint) return null;

  // ❌ ignoramos variaciones por ahora
  if (codepoint.includes("-")) return null;

  const normalized = normalizeCodepointForAssets(codepoint);

  const placeholderPath = `emojis/apple-placeholders/${normalized}.webp`;
  const fullPath = `emojis/apple/${normalized}.png`;

  try {
    return await getDownloadURL(ref(storage, placeholderPath));
  } catch {
    try {
      return await getDownloadURL(ref(storage, fullPath));
    } catch {
      return null;
    }
  }
}

// =========================
// Load emojis
// =========================
export async function loadEmojisPage({ category }) {
  const q = query(
    collection(db, "emojis"),
    where("category", "==", category),
    orderBy("codepoint")
  );

  const snapshot = await getDocs(q);

  const emojis = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      const url = await resolveEmojiUrlFromCodepoint(data.codepoint);

      return {
        id: doc.id,
        ...data,
        url,
      };
    })
  );

  return emojis;
}

// =========================
// Copy PNG to clipboard
// =========================
export async function copyEmojiPngToClipboard(codepoint) {
  try {
    const normalized = normalizeCodepointForAssets(codepoint);
    const pngPath = `emojis/apple/${normalized}.png`;

    const url = await getDownloadURL(ref(storage, pngPath));
    const res = await fetch(url);
    const blob = await res.blob();

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    return true;
  } catch (err) {
    console.error("Error copiando emoji:", err);
    return false;
  }
}
