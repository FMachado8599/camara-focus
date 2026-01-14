import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

const PAGE_SIZE = 10;

function normalizeCodepointForAssets(codepoint) {
  return codepoint
    .toLowerCase()
    .split("-")
    .map(part => part.replace(/^0+/, "") || "0")
    .join("-");
}

async function resolveEmojiUrlFromCodepoint(codepoint) {
  if (!codepoint) return null;

  const normalized = normalizeCodepointForAssets(codepoint);

  const placeholderPath = `emojis/apple-placeholders/${normalized}.webp`;
  const fullPath = `emojis/apple/${normalized}.png`;

  try {
    // 1️⃣ Placeholder (si existe)
    return await getDownloadURL(ref(storage, placeholderPath));
  } catch {
    try {
      // 2️⃣ Imagen pesada (existe hoy)
      return await getDownloadURL(ref(storage, fullPath));
    } catch {
      console.warn("❌ Emoji sin imagen:", normalized);
      return null;
    }
  }
}

export async function loadEmojisPage(lastDoc = null) {
  let q = query(
    collection(db, "emojis"),
    orderBy("codepoint"),
    limit(PAGE_SIZE)
  );

  if (lastDoc) {
    q = query(
      collection(db, "emojis"),
      orderBy("codepoint"),
      startAfter(lastDoc),
      limit(PAGE_SIZE)
    );
  }

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

  return {
    emojis,
    lastDoc: snapshot.docs.at(-1) || null,
  };
}

