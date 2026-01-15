import { useEffect, useState, useMemo } from "react";
import { loadEmojisPage } from "@/services/emojis.service";
import { searchEmojis } from "./searchEmojis";
import { EMOJI_CATEGORIES } from "./documents/emojisDocs";
import { copyEmojiPngToClipboard, copyOrDownloadEmoji } from "@/services/emojis.service";
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
  const [copyingId, setCopyingId] = useState(null);

  /* =========================
     CARGA INICIAL / PAGINADA
     ========================= */

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await loadEmojisPage({
          category: activeCategory,
        });

        if (!cancelled) {
          setEmojis(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
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

  const handleCopyEmoji = (ev, emoji) => {
    if (loading || copyingId) return;

    const el = ev.currentTarget;
    if (!el) return;

    el.classList.add("copying");
    setCopyingId(emoji.id);

    copyEmojiAsync(el, emoji);
  };

  // const copyEmojiAsync = async (el, emoji) => {
  //   try {
  //     const ok = await copyEmojiPngToClipboard(emoji.codepoint);

  //     showToast(
  //       ok ? "Emoji copiado al portapapeles" : "No se pudo copiar el emoji",
  //       ok ? "success" : "error"
  //     );
  //   } finally {
  //     setCopyingId(null);
  //     el?.classList.remove("copying");
  //   }
  // };
  const copyEmojiAsync = async (el, emoji) => {
    try {
      const res = await copyOrDownloadEmoji(emoji.codepoint);

      if (res.mode === "clipboard") {
        showToast("Emoji copiado al portapapeles", "success", 3000);
      } else {
        showToast("Descargamos el emoji (tu navegador no permite copiar imágenes)", "success", 5000);
      }
    } catch (err) {
      console.error(err);
      showToast("No se pudo copiar ni descargar el emoji", "error", 5000);
    } finally {
      el?.classList.remove("copying");
      setCopyingId(null);
    }
  };



  const handleCategories = (cat) => {
      if (cat === activeCategory) return;

      setActiveCategory(cat);
      setEmojis([]);
      setLoading(true);

      requestAnimationFrame(() => {
        document
          .querySelector(".emojis-displays")
          ?.scrollTo({ top: 0, behavior: "smooth" });
      }); 
  }


  const filteredEmojis = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return emojis;

    return emojis.filter((e) => {
      // ajustá estos campos a lo que tengas en Firestore
      const haystack = [
        e.name,
        e.keywords?.join(" "),
        e.keywords_es?.join(" "),
        e.codepoint,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [emojis, searchQuery]);


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

              onClick={() => handleCategories(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="emojis-displays">
          {/* Skeleton inicial */}
          {loading && emojis.length === 0 && (
            <div className="emoji-grid">
              {Array.from({ length: 100 }).map((_, i) => (
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
            {filteredEmojis
              .filter(e => e.url) // 👈 si no hay imagen, no existe
              .map(e => (
                <div
                  key={e.id}
                  className="emoji-container"
                  onClick={(ev) => handleCopyEmoji(ev, e)}
                >
                  <img className="emoji" src={e.url} alt={e.name} />
                  {copyingId === e.id && (
                    <div className="emoji-spinner-overlay">
                      <span className="emoji-loader"></span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
