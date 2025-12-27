import express from "express";
import multer from "multer";
import { uploadLogoController } from "../controllers/upload.controller.js";

const router = express.Router();

// multer en memoria (NO disco)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB (opcional pero recomendado)
  },
});

router.post(
  "/upload-logo",
  upload.single("file"), // 👈 ESTE NOMBRE ES CLAVE
  uploadLogoController
);

export default router;
