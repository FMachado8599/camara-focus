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
    .trim()
    .replace(/\s+/g, "-")
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
  const normalized = normalizeCodepointForAssets(codepoint);

  if (normalized.includes("-")) return null;
  const base = normalized.split("-")[0];
  const placeholderPath = `emojis/apple-placeholders/${normalized}.webp`;
  const fullPath = `emojis/apple/${base}.png`;

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
// Emojis on Cache/LocalStorage
// =========================

const EMOJI_CACHE_TTL = 1000 * 60 * 60 * 24; // 24h

function getEmojiCacheKey(category) {
  return `emoji_cache_${category}`;
}

function getCachedEmojis(category) {
  const raw = localStorage.getItem(getEmojiCacheKey(category));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > EMOJI_CACHE_TTL) {
      localStorage.removeItem(getEmojiCacheKey(category));
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function setCachedEmojis(category, data) {
  localStorage.setItem(
    getEmojiCacheKey(category),
    JSON.stringify({
      timestamp: Date.now(),
      data,
    })
  );
}


// =========================
// Load emojis
// =========================

export async function loadEmojisPage({ category }) {
  const cached = getCachedEmojis(category);
  if (cached) {
    console.log("📦 emojis desde cache:", category);
    return cached;
  }

  console.log("🌐 emojis desde Firestore:", category);

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

  setCachedEmojis(category, emojis);
  return emojis;
}


// export async function loadEmojisPage({ category }) {
//   const q = query(
//     collection(db, "emojis"),
//     where("category", "==", category),
//     orderBy("codepoint")
//   );

//   const snapshot = await getDocs(q);

//   const emojis = await Promise.all(
//     snapshot.docs.map(async (doc) => {
//       const data = doc.data();
//       const url = await resolveEmojiUrlFromCodepoint(data.codepoint);

//       return {
//         id: doc.id,
//         ...data,
//         url,
//       };
//     })
//   );

//   return emojis;
// }

// =========================
// Copy PNG to clipboard
// =========================
export async function copyEmojiPngToClipboard(codepoint) {
  try {
    const normalized = normalizeCodepointForAssets(codepoint);
    const pngPath = `emojis/apple/${normalized}.png`;

    const storageRef = ref(storage, pngPath);
    const blob = await getBlob(storageRef);

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

