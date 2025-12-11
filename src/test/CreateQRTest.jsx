import { useState } from "react";
import { nanoid } from "nanoid";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function CreateQRTest() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createdId, setCreatedId] = useState(null);

  const handleCreate = async () => {
    if (!url) return alert("Poné una URL, wacho.");

    setCreating(true);

    const id = nanoid(8);

    function normalizeUrl(url) {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            return "https://" + url;
        }
        return url;
    }

    const cleanUrl = normalizeUrl(url);

    const qrData = {
      id,
      name: name || "QR sin nombre",
      type: "url",

        destination: cleanUrl,
        payload: { url: cleanUrl },

      style: {
        dotStyle: "square",
        eyeStyle: "square",
        dotColor: "#000000",
        eyeColor: "#000000",
        backgroundColor: "#ffffff",
        padding: 8,
        logoUrl: null,
      },

      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {
      await setDoc(doc(db, "qrs", id), qrData);
      setCreatedId(id);
    } catch (err) {
      console.error("Error al crear QR:", err);
      alert("No se pudo crear el QR.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Crear QR (TEST)</h2>

      <input
        type="text"
        placeholder="Nombre interno"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />

      <input
        type="text"
        placeholder="URL destino"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleCreate} disabled={creating}>
        {creating ? "Creando..." : "Crear QR"}
      </button>

      {createdId && (
        <div style={{ marginTop: "20px" }}>
          <p>QR creado con ID: <b>{createdId}</b></p>
          
          <p>Link dinámico:</p>
          <code>
            http://localhost:3000/api/r/{createdId}
          </code>
          
          <p style={{ marginTop: "10px" }}>
            Probalo directo:  
            <a 
              href={`http://localhost:3000/api/r/${createdId}`} 
              target="_blank" 
              rel="noreferrer"
            >
              Abrir QR dinámico
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
