import fs from "fs";
import admin from "firebase-admin";

// 🔐 Inicializar Firebase Admin
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

// 📄 Leer el archivo
const file = fs.readFileSync(
  new URL("./emoji-test.txt", import.meta.url),
  "utf8"
);
const lines = file.split("\n");

let currentCategory = null;

for (const line of lines) {
  // Detectar categoría
  if (line.startsWith("# group:")) {
    currentCategory = line.replace("# group:", "").trim();
    continue;
  }

  // Ignorar comentarios y líneas vacías
  if (
    !line ||
    line.startsWith("#") ||
    !line.includes("; fully-qualified")
  ) {
    continue;
  }

  // Ejemplo de línea:
  // 1F600 ; fully-qualified # 😀 E1.0 grinning face

  const [codePart, commentPart] = line.split("#");
  const codepoint = codePart.split(";")[0].trim().replace(/ /g, "-");
  const name = commentPart
    .split("E")[1]
    .trim()
    .toLowerCase();

  const emojiDoc = {
    codepoint,
    name,
    category: currentCategory,
    popularity: 0,
  };

  await db.collection("emojis").doc(codepoint).set(emojiDoc);
}
