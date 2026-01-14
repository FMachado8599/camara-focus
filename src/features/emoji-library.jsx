import { useEffect, useState, useRef } from "react";
import { loadEmojisPage } from "@/services/emojis.service";
import "@/styles/emoji-library/_emojiLibrary.scss";

import StoreTopbar from "@/pages/store/StoreTopbar";

export default function EmojiLibrary() {
  const [emojis, setEmojis] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const hasLoadedRef = useRef(false);
  const title = "Emojis";

  const loadMore = async () => {
    if (loading) return;

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

  const normalizedQuery = searchQuery.toLowerCase().trim();

  const filteredEmojis = emojis.filter((e) => {
    if (!normalizedQuery) return true;

    return (
      e.name?.toLowerCase().includes(normalizedQuery) ||
      e.category?.toLowerCase().includes(normalizedQuery) ||
      e.keywords?.some((k) => k.toLowerCase().includes(normalizedQuery))
    );
  });

  return (
    <div className="emoji-library-container">
      <StoreTopbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        title={title}
      />

      {loading && emojis.length === 0 && (
        <div className="emoji-grid">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="emoji-container skeleton" />
          ))}
        </div>
      )}

      <div className="emoji-grid">
        {filteredEmojis.map((e) => (
          <div key={e.id} className="emoji-container">
            {e.url ? (
              <img className="emoji" src={e.url} alt={e.name} />
            ) : (
              <div className="emoji placeholder" />
            )}
          </div>
        ))}
      </div>

      <button onClick={loadMore} disabled={loading || !lastDoc}>
        {loading ? "Cargando…" : "Cargar más"}
      </button>
    </div>
  );
}
