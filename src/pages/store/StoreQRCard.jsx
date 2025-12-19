import Card from "@/components/UI/Card";
import StoreQRCardActions from "./StoreQRCardActions";
import { Link } from "react-router-dom";

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

export default function StoreQRCard({
  qr,
  onEdit,
  onDelete,
  onDuplicate,
  showToast,
}) {
  const normalizedUrl = qr.destination.startsWith("http")
    ? qr.destination
    : `https://${qr.destination}`;

  return (
    <Card className="qr-card">
      <div className="qr-thumb">
        <a
          className="qr-thumb-link"
          href={normalizedUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="qr-thumb-svg neumorphic-inset"
            dangerouslySetInnerHTML={{ __html: qr.svg }}
          />
        </a>
      </div>

      <div className="qr-data-container">
        <p className="qr-type">{TYPE_LABELS[qr.type] || qr.type}</p>
        <h2 className="qr-name">{qr.name}</h2>

        <div className="qr-data-secondary">
          <p className="qr-dest neumorphic-badge">{qr.destination}</p>
          <p className="qr-date">
            {new Date(qr.updatedAt).toLocaleDateString("es-ES")}
          </p>
        </div>
      </div>

      <StoreQRCardActions
        qr={qr}
        onEdit={onEdit}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        showToast={showToast}
      />
    </Card>
  );
}
