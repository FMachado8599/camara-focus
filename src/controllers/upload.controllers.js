
import { uploadToStorage } from "../services/storage.service.js";

export async function uploadLogoController(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // subir a storage real
    const logoUrl = await uploadToStorage(file);

    res.json({ logoUrl: "https://placehold.co/200x200.png" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
}
