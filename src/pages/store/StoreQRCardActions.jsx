import Button from "@/components/UI/Button";
import { Dropdown, DropdownItem } from "@/components/UI/Dropdown";
import { Copy, Edit, Download, Trash2, Files } from "lucide-react";

import { Link } from "react-router-dom";
import { useToast } from "@/context/ToastContext";

import { deleteQR } from "@/services/qr.service";
import { copyQRLink, downloadQR } from "@/utils/qrActions";

export default function QRCardActions({ qr }) {
  const { showToast } = useToast();

  const handleDelete = async () => {
    if (!confirm("¿Seguro?")) return;

    await deleteQR(qr.id);
    showToast("QR eliminado");
  };

  const handleDuplicate = () => {
    showToast("Duplicar todavía no implementado");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qr.destination);
    showToast("Enlace copiado");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qr.thumbnail;
    link.download = `${qr.name}.png`;
    link.click();
  };

  return (
    <div className="qr-actions">
      <Button className="qr-actions-download" onClick={handleDownload}>
        <Download size={14} /> Descargar
      </Button>
      <div className="qr-actions-sub">
        <Link to={`/qr/${qr.id}/edit`} className="qr-edit-btn neumorphic-flat">
          <Edit size={14} style={{ marginRight: 4 }} />
          Editar
        </Link>

        <Dropdown
          trigger={
            <Button className="dropdown-trigger neumorphic-flat">•••</Button>
          }
        >
          <DropdownItem onClick={() => copyQRLink(qr.destination)}>
            <Copy size={14} /> Copiar enlace
          </DropdownItem>

          <DropdownItem onClick={handleDuplicate}>
            <Files size={14} /> Duplicar
          </DropdownItem>

          <DropdownItem onClick={handleDelete} className="danger">
            <Trash2 size={14} /> Eliminar
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
}
