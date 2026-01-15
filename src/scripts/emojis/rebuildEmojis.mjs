import fs from "fs";
import path from "path";
import admin from "firebase-admin";

const KEY_PATH = path.resolve("firebase-key.json");
const EMOJI_TEST_PATH = path.resolve("emoji-test.txt");

const COLLECTION = "emojis";
const VENDOR = "apple";

// =========================
// Firebase Admin init
// =========================
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(fs.readFileSync(KEY_PATH, "utf8"))),
});

const db = admin.firestore();

// =========================
// Utils: codepoint normalization
// - Keep sequences (hyphens) because Apple assets often use them.
// - Remove leading zeros per segment to match your existing normalize.
// =========================
function normalizeCodepointForAssets(codepoint) {
  return codepoint
    .toLowerCase()
    .split("-")
    .map((part) => part.replace(/^0+/, "") || "0")
    .join("-");
}

function docIdFor(codepoint) {
  return `apple_${normalizeCodepointForAssets(codepoint)}`;
}

function imagePathFor(codepoint) {
  return `emojis/apple/${normalizeCodepointForAssets(codepoint)}.png`;
}

// =========================
// Keywords EN: base + controlled expansions
// =========================
const EN_EXPAND = {
  face: ["emoji", "emotion"],
  smile: ["happy", "joy"],
  smiling: ["smile", "happy", "joy"],
  grinning: ["smile", "happy", "joy"],
  laugh: ["funny", "joy"],
  laughing: ["funny", "joy"],
  cry: ["sad", "tears"],
  crying: ["sad", "tears"],
  sad: ["sadness", "emotion"],
  angry: ["mad", "anger"],
  heart: ["love", "romance"],
  kiss: ["love", "romance"],
  fire: ["hot", "flame"],
  star: ["shine", "sparkle"],
  dog: ["pet", "animal"],
  cat: ["pet", "animal"],
  bird: ["animal"],
  fish: ["animal"],
  snake: ["animal"],
  food: ["eat"],
  drink: ["beverage"],
  hand: ["gesture"],
  person: ["human"],
  people: ["human"],
};

const CATEGORY_EN_HINTS = {
  "Smileys & Emotion": ["emoji", "emotion"],
  "Animals & Nature": ["animal", "nature"],
  "Food & Drink": ["food", "drink"],
  "Travel & Places": ["travel", "place"],
  "Activities": ["activity", "game"],
  "Objects": ["object"],
  "Symbols": ["symbol"],
  "Flags": ["flag"],
};

function tokenizeEnglishName(name) {
  // keep it simple: lowercase, remove punctuation-ish, split spaces
  return name
    .toLowerCase()
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function buildEnglishKeywords(name, category) {
  const base = tokenizeEnglishName(name);

  const out = new Set(base);

  for (const w of base) {
    const extra = EN_EXPAND[w];
    if (extra) extra.forEach((x) => out.add(x));
  }

  const catHints = CATEGORY_EN_HINTS[category];
  if (catHints) catHints.forEach((x) => out.add(x));

  // keep it tight
  return Array.from(out).slice(0, 10);
}

// =========================
// Keywords ES: translation + diminutives
// =========================
const EN_ES = {
  face: ["cara", "rostro", "carita"],
  emoji: ["emoji"],
  emotion: ["emoción"],
  smile: ["sonrisa", "sonrisita"],
  smiling: ["sonriente", "sonrisa", "sonrisita"],
  grinning: ["sonriente", "sonrisa", "sonrisita"],
  happy: ["feliz", "alegre"],
  joy: ["alegría"],
  sad: ["triste"],
  sadness: ["tristeza"],
  tears: ["lágrimas"],
  cry: ["llorar", "llanto", "lloradita"],
  crying: ["llorando", "llanto", "lloradita"],
  angry: ["enojado", "furioso"],
  mad: ["enojado"],
  anger: ["enojo"],
  heart: ["corazón", "corazoncito", "amor"],
  love: ["amor"],
  romance: ["romance"],
  kiss: ["beso", "besito"],
  fire: ["fuego", "fueguito"],
  flame: ["llama", "llamita"],
  hot: ["caliente"],
  star: ["estrella", "estrellita"],
  sparkle: ["brillo", "brillito"],
  shine: ["brillar", "brillo"],
  dog: ["perro", "perrito"],
  cat: ["gato", "gatito"],
  pet: ["mascota", "mascotita"],
  animal: ["animal"],
  nature: ["naturaleza"],
  bird: ["pájaro", "pajarito", "ave"],
  fish: ["pez", "pececito"],
  snake: ["serpiente"],
  food: ["comida"],
  eat: ["comer"],
  drink: ["bebida"],
  beverage: ["bebida"],
  travel: ["viaje", "viajito"],
  place: ["lugar", "lugarsito"],
  activity: ["actividad"],
  game: ["juego", "jueguito"],
  object: ["objeto"],
  symbol: ["símbolo"],
  flag: ["bandera"],
  hand: ["mano", "manito"],
  gesture: ["gesto"],
  person: ["persona"],
  people: ["personas", "gente"],
  human: ["humano", "persona", "gente"],
};

const CATEGORY_ES_HINTS = {
  "Smileys & Emotion": ["emoji", "emoción"],
  "Animals & Nature": ["animal", "naturaleza"],
  "Food & Drink": ["comida", "bebida"],
  "Travel & Places": ["viaje", "lugar"],
  "Activities": ["actividad", "juego", "jueguito"],
  "Objects": ["objeto"],
  "Symbols": ["símbolo"],
  "Flags": ["bandera"],
};

// overrides para diminutivos irregulares/útiles
const DIMINUTIVE_OVERRIDES = {
  cara: "carita",
  perro: "perrito",
  gato: "gatito",
  fuego: "fueguito",
  mano: "manito",
  corazón: "corazoncito",
  estrella: "estrellita",
  beso: "besito",
  sonrisa: "sonrisita",
  brillo: "brillito",
  juego: "jueguito",
  viaje: "viajito",
  lugar: "lugarsito",
  mascota: "mascotita",
  llanto: "lloradita",
};

function diminutiveOf(word) {
  if (!word) return null;
  const w = word.toLowerCase();

  if (DIMINUTIVE_OVERRIDES[w]) return DIMINUTIVE_OVERRIDES[w];

  // reglas simples y conservadoras
  // (no queremos inventar cosas raras con acentos)
  if (w.length < 4) return null;

  if (w.endsWith("a")) return w.slice(0, -1) + "ita";
  if (w.endsWith("o")) return w.slice(0, -1) + "ito";
  if (w.endsWith("e")) return w + "cito";
  if (w.endsWith("n") || w.endsWith("r") || w.endsWith("l")) return w + "cito";

  return null;
}

function buildSpanishKeywords(englishKeywords, category) {
  const out = new Set();

  for (const en of englishKeywords) {
    const mapped = EN_ES[en];
    if (mapped) mapped.forEach((es) => out.add(es));
  }

  const catHints = CATEGORY_ES_HINTS[category];
  if (catHints) catHints.forEach((x) => out.add(x));

  // añadir diminutivos a palabras ya presentes (si aplica)
  const current = Array.from(out);
  for (const w of current) {
    const dim = diminutiveOf(w);
    if (dim) out.add(dim);
  }

  return Array.from(out).slice(0, 12);
}

// =========================
// Parse emoji-test.txt
// We'll use "# group:" as category (like you were doing).
// We'll keep fully-qualified lines.
// =========================
function parseEmojiTestFile() {
  const text = fs.readFileSync(EMOJI_TEST_PATH, "utf8");
  const lines = text.split("\n");

  let currentCategory = null;
  const items = [];

  for (const line of lines) {
    if (line.startsWith("# group:")) {
      currentCategory = line.replace("# group:", "").trim();
      continue;
    }

    // ignore blank / comment
    if (!line || line.startsWith("#")) continue;
    if (!line.includes("; fully-qualified")) continue;

    // Example:
    // 1F600 ; fully-qualified # 😀 E1.0 grinning face
    const [left, right] = line.split("#");
    if (!right) continue;

    const codepoint = left.split(";")[0].trim();
    const meta = right.trim().split(/\s+/);

    const emojiChar = meta[0];
    const versionToken = meta[1]; // E1.0
    const unicodeVersion = versionToken?.startsWith("E")
      ? versionToken.slice(1)
      : null;

    const name = meta.slice(2).join(" ");
    if (!codepoint || !emojiChar || !name || !currentCategory) continue;

    const keywords = buildEnglishKeywords(name, currentCategory);
    const keywords_es = buildSpanishKeywords(keywords, currentCategory);

    items.push({
      id: docIdFor(codepoint),
      data: {
        codepoint,
        emoji: emojiChar,
        name,
        keywords,
        keywords_es,
        category: currentCategory,
        imagePath: imagePathFor(codepoint),
        vendor: VENDOR,
        unicodeVersion: unicodeVersion ?? null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    });
  }

  return items;
}

// =========================
// Firestore helpers (batch delete + batch set)
// =========================
async function deleteCollection(collRef) {
  // delete in batches of 500
  while (true) {
    const snap = await collRef.limit(500).get();
    if (snap.empty) break;

    const batch = db.batch();
    snap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    console.log(`🧹 Deleted ${snap.size} docs...`);
  }
}

async function setInBatches(items, collRef) {
  let i = 0;
  while (i < items.length) {
    const chunk = items.slice(i, i + 500);
    const batch = db.batch();
    chunk.forEach((it) => {
      batch.set(collRef.doc(it.id), it.data, { merge: false });
    });
    await batch.commit();
    i += chunk.length;
    console.log(`✅ Created ${i}/${items.length}...`);
  }
}

// =========================
// Main
// =========================
async function main() {
  const items = parseEmojiTestFile();
  console.log(`📦 Parsed ${items.length} emojis from emoji-test.txt`);

  const collRef = db.collection(COLLECTION);

  console.log("🔥 Deleting existing collection docs...");
  await deleteCollection(collRef);

  console.log("🚀 Recreating docs with unified model...");
  await setInBatches(items, collRef);

  console.log("🎉 Done. Firestore emojis collection rebuilt.");
}

main().catch((err) => {
  console.error("❌ Rebuild failed:", err);
  process.exit(1);
});
