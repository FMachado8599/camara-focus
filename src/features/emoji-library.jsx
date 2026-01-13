import { useEffect, useState } from "react";
import { loadEmojisPage } from "@/services/emojis.service";
import { db, storage } from "@/lib/firebase";
import "@/styles/emoji-library/_emojiLibrary.scss";

export default function EmojiLibrary() {
  const [emojis, setEmojis] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const res = await loadEmojisPage(db, storage, lastDoc);
    setEmojis((prev) => [...prev, ...res.emojis]);
    setLastDoc(res.lastDoc);
    setLoading(false);
  };

  useEffect(() => {
    loadMore(); // primera carga
  }, []);

  return (
    <>
      <div className="emoji-grid">
        {emojis.map((e) => (
          <img key={e.id} src={e.url} alt={e.name} />
        ))}
      </div>

      <button onClick={loadMore} disabled={loading || !lastDoc}>
        {loading ? "Cargando…" : "Cargar más"}
      </button>
    </>
  );
}
