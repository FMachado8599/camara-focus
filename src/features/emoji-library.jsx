import { useEffect, useState, useRef } from "react";
import { loadEmojisPage } from "@/services/emojis.service";
import { searchEmojis } from "./searchEmojis";

import "@/styles/emoji-library/_emojiLibrary.scss";
import StoreTopbar from "@/pages/store/StoreTopbar";

export default function EmojiLibrary() {
  const [emojis, setEmojis] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const hasLoadedRef = useRef(false);
  const title = "Emojis";

  /* =========================
     CARGA INICIAL / PAGINADA
     ========================= */
  const loadMore = async () => {
    if (loading || searchQuery) return;

    setLoading(true);

    const { emojis: newEmojis, lastDoc: nextDoc } = await loadEmojisPage(
      lastDoc
    );

    setEmojis((prev) => {
      const ids = new Set(prev.map((e) => e.id));
      return [...prev, ...newEmojis.filter((e) => !ids.has(e.id))];
    });

    setLastDoc(nextDoc);
    setLoading(false);
  };

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    loadMore();
  }, []);

  /* =========================
     BÚSQUEDA EN FIRESTORE
     ========================= */
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();

    if (!q) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);

    const t = setTimeout(async () => {
      const res = await searchEmojis(q);
      setSearchResults(res);
      setSearching(false);
    }, 300);

    return () => clearTimeout(t);
  }, [searchQuery]);

  /* =========================
     LISTA A RENDERIZAR
     ========================= */
  const listToRender = searchQuery.trim() !== "" ? searchResults : emojis;

  return (
    <div className="emoji-library-container">
      <StoreTopbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        title={title}
      />

      {/* Skeleton inicial */}
      {loading && emojis.length === 0 && (
        <div className="emoji-grid">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="emoji-container skeleton" />
          ))}
        </div>
      )}

      {/* Skeleton búsqueda */}
      {searching && (
        <div className="emoji-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="emoji-container skeleton" />
          ))}
        </div>
      )}

      {/* Grid real */}
      <div className="emoji-grid">
        {listToRender.map((e) => (
          <div key={e.id} className="emoji-container">
            {e.url ? (
              <img className="emoji" src={e.url} alt={e.name} />
            ) : (
              <div className="emoji placeholder" />
            )}
          </div>
        ))}
      </div>

      {/* Paginación SOLO sin búsqueda */}
      {!searchQuery && (
        <button onClick={loadMore} disabled={loading || !lastDoc}>
          {loading ? "Cargando…" : "Cargar más"}
        </button>
      )}
    </div>
  );
}
