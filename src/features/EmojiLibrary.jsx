import { useEffect, useState, useRef } from "react";
import { loadEmojisPage } from "@/services/emojis.service";
import { searchEmojis } from "./searchEmojis";
import { EMOJI_CATEGORIES } from "./documents/emojisDocs";
import { copyEmojiPngToClipboard } from "@/services/emojis.service";
import { useToast } from "@/context/ToastContext";

import "@/styles/emoji-library/_emojiLibrary.scss";
import StoreTopbar from "@/pages/store/StoreTopbar";

export default function EmojiLibrary() {
  const [emojis, setEmojis] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const title = "Emojis";
  const [activeCategory, setActiveCategory] = useState(
    EMOJI_CATEGORIES[0]
  );
  const { showToast } = useToast();

  /* =========================
     CARGA INICIAL / PAGINADA
     ========================= */

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const emojis = await loadEmojisPage({
        category: activeCategory,
      });

      setEmojis(emojis);
      setLoading(false);
    };

    load();
  }, [activeCategory]);

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

  const listToRender = searchQuery.trim() !== "" ? searchResults : emojis;
  
  const handleCopyEmoji = async (emoji) => {
    if (loading) return;

    const ok = await copyEmojiPngToClipboard(emoji.codepoint);
    showToast(
      ok ? "Emoji copiado al portapapeles" : "No se pudo copiar el emoji",
      ok ? "success" : "error"
    );
  };



  return (
    <div className="emoji-library-container">
      <StoreTopbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        title={title}
      />

      <div className="emojis-main">
        <div className="emoji-categories">
          {EMOJI_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`emoji-category ${cat === activeCategory ? "active" : ""}`}

              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="emojis-displays">
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
            {listToRender
              .filter(e => e.url) // 👈 si no hay imagen, no existe
              .map(e => (
                <div
                  key={e.id}
                  className="emoji-container"
                  onClick={() => handleCopyEmoji(e)}
                >
                  <img className="emoji" src={e.url} alt={e.name} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
