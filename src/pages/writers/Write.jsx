import { useState, useRef } from "react"

import EmojiLibrary from "@/features/EmojiLibrary"
import WriterTool from "./WriterTool";

import "@/styles/write/_write.scss"


export default function Write() {

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const insertEmojiRef = useRef(null);
    const editorRef = useRef(null)

    const handleEmojiSelect = (emoji) => {
        if (insertEmojiRef.current) {
        insertEmojiRef.current(emoji)
        }
    }

    const handleHashtagSelect = (hashtag) => {
        if (insertEmojiRef.current) {
        insertEmojiRef.current(hashtag + " ")
        }
    }

  return (
    <div className="page-container">
        <div className="main-layout">
            <div className={`toolsPanel ${isPanelOpen ? "open" : ""}`}>
                <EmojiLibrary
                className="library"
                onEmojiSelect={handleEmojiSelect}
                />
            </div>
            <div className="writer-panel-container">
                {!isPanelOpen && (
                    <button
                        className="open-emoji-button"
                        onClick={() => setIsPanelOpen(true)}
                        aria-label="Open tools panel"
                    >
                        #
                    </button>
                )}
                <WriterTool editorRef={editorRef} onInsertEmoji={insertEmojiRef}/>
            </div>
        </div>
    </div>
  )
}
