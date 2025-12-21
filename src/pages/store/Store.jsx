import { useState } from "react";
import "@/styles/store/_store.scss";
import StoreTopbar from "./StoreTopbar";
import { useToast } from "@/context/ToastContext";
import StoreGrid from "./StoreGrid";

const TYPE_LABELS = {
  url: "URL",
  text: "Texto",
  "vcard-simple": "vCard Simple",
  "vcard-complete": "vCard Completa",
  phone: "Teléfono",
  whatsapp: "WhatsApp",
  email: "Email",
  wifi: "WiFi",
  event: "Evento",
  geo: "Geo",
};

export default function Store({
  savedQRs,
  onEdit,
  onDelete,
  onDuplicate,
  onCreateNew,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const { showToast } = useToast();

  const filteredQRs = savedQRs.filter((qr) =>
    `${qr.name ?? ""}${qr.type ?? ""}${qr.destination ?? ""}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleCopyLink = (dest) => {
    navigator.clipboard.writeText(dest);
    showToast("Enlace copiado");
  };

  const handleDownload = (qr) => {
    const link = document.createElement("a");
    link.href = qr.thumbnail;
    link.download = `${qr.name}.png`;
    link.click();
  };

  return (
    <div className="store-page">
      <div className="store-topbar-container">
        <StoreTopbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCreateNew={onCreateNew}
        />
      </div>

      <StoreGrid
        qrs={filteredQRs}
        hasSearch={!!searchQuery}
        onCreateNew={onCreateNew}
        showToast={showToast}
      />
    </div>
  );
}
