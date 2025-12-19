import Button from "@/components/UI/Button";
import StoreQRCard from "./StoreQRCard";
import { Plus } from "lucide-react";

export default function StoreGrid({
  qrs,
  hasSearch,
  onEdit,
  onDelete,
  onDuplicate,
  onCreateNew,
  showToast,
}) {
  if (qrs.length === 0) {
    return (
      <div className="store-grid">
        <div className="empty-wrapper">
          <p className="empty-state">
            {hasSearch ? "No se encontraron QRs" : "No hay QRs guardados"}
          </p>

          {!hasSearch && (
            <Button
              onClick={onCreateNew}
              className="btn-accent neumorphic-button"
            >
              <Plus size={14} style={{ marginRight: 4 }} />
              Crear primer QR
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="store-grid">
      {qrs.map((qr) => (
        <StoreQRCard
          key={qr.id}
          qr={qr}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          showToast={showToast}
        />
      ))}
    </div>
  );
}
