import { useState } from "react";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import { Dropdown, DropdownItem } from "../../components/UI/Dropdown";
import { Copy, Edit, Download, Trash2, Plus, Files, Search } from "lucide-react";
import "../../styles/store/_store.scss";

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

export default function Store({ savedQRs, onEdit, onDelete, onDuplicate, onCreateNew }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQRs = savedQRs.filter((qr) =>
    (qr.name + qr.type + qr.destination)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleCopyLink = (dest) => {
    navigator.clipboard.writeText(dest);
    alert("Enlace copiado");
  };

  const handleDownload = (qr) => {
    const link = document.createElement("a");
    link.href = qr.thumbnail;
    link.download = `${qr.name}.png`;
    link.click();
  };

  return (
<div className="store-page">

      {/* Top bar */}
      <div className="store-topbar neumorphic-flat">
        <div className="topbar-header">
          <h1 className="topbar-title">Mis QRs</h1>

          <Button onClick={onCreateNew} className="btn-accent neumorphic-button">
            <Plus size={14} style={{ marginRight: 4 }} />
            Nuevo QR
          </Button>
        </div>

        <div className="search-section">
          <Search className="search-icon" size={14} />
          <Input
            placeholder="Buscar por nombre, tipo o destino..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input neumorphic-inset"
          />
        </div>
      </div>

      {/* QR LIST */}
      <div className="store-grid">
        {filteredQRs.length === 0 ? (
          <div className="empty-wrapper">
            <p className="empty-state">
              {searchQuery ? "No se encontraron QRs" : "No hay QRs guardados"}
            </p>

            {!searchQuery && (
              <Button onClick={onCreateNew} className="btn-accent neumorphic-button">
                <Plus size={14} style={{ marginRight: 4 }} />
                Crear primer QR
              </Button>
            )}
          </div>
        ) : (
          filteredQRs.map((qr) => (
            <Card key={qr.id} className="qr-card neumorphic">
              <div className="qr-thumb">
                <div
                  className="qr-thumb-svg neumorphic-inset"
                  dangerouslySetInnerHTML={{ __html: qr.svg }}
                />
              </div>

              <h3 className="qr-name">{qr.name}</h3>
              <p className="qr-type">{TYPE_LABELS[qr.type] || qr.type}</p>
              <p className="qr-dest neumorphic-badge">{qr.destination}</p>
              <p className="qr-date">
                {new Date(qr.updatedAt).toLocaleDateString("es-ES")}
              </p>

              {/* ACTION ROW */}
              <div className="qr-actions">
                <Button
                  onClick={() => onEdit(qr)}
                  className="qr-edit-btn neumorphic-flat"
                >
                  <Edit size={14} style={{ marginRight: 4 }} /> Editar
                </Button>

                <Dropdown
                  trigger={
                    <Button className="dropdown-trigger neumorphic-flat">
                      •••
                    </Button>
                  }
                >
                  <DropdownItem onClick={() => handleCopyLink(qr.destination)}>
                    <Copy size={14} /> Copiar enlace
                  </DropdownItem>

                  <DropdownItem onClick={() => handleDownload(qr)}>
                    <Download size={14} /> Descargar
                  </DropdownItem>

                  <DropdownItem onClick={() => onDuplicate(qr)}>
                    <Files size={14} /> Duplicar
                  </DropdownItem>

                  <DropdownItem onClick={() => onDelete(qr.id)} className="danger">
                    <Trash2 size={14} /> Eliminar
                  </DropdownItem>
                </Dropdown>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>

  );
}
