import express from "express";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

app.use(express.json());

// servir uploads
app.use("/uploads", express.static("public/uploads"));

// API
app.use("/api", uploadRoutes);

export default app;
