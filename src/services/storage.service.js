import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";

export async function uploadToStorage(file) {
  const ext = file.originalname.split(".").pop();
  const filename = `${uuid()}.${ext}`;

  const uploadPath = path.join(
    process.cwd(),
    "public",
    "uploads",
    filename
  );

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

  // URL pública
  return `/uploads/${filename}`;
}
