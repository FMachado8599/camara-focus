import Button from "@/components/UI/Button";
import { Dropdown, DropdownItem } from "@/components/UI/Dropdown";
import { Copy, Edit, Download, Trash2, Files } from "lucide-react";

export default function QRCardActions({
  qr,
  onEdit,
  onDelete,
  onDuplicate,
  showToast,
}) {
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
        <Button
          onClick={() => onEdit(qr)}
          className="qr-edit-btn neumorphic-flat"
        >
          <Edit size={14} style={{ marginRight: 4 }} />
          Editar
        </Button>

        <Dropdown
          trigger={
            <Button className="dropdown-trigger neumorphic-flat">•••</Button>
          }
        >
          <DropdownItem onClick={handleCopyLink}>
            <Copy size={14} /> Copiar enlace
          </DropdownItem>

          <DropdownItem onClick={() => onDuplicate(qr)}>
            <Files size={14} /> Duplicar
          </DropdownItem>

          <DropdownItem onClick={() => onDelete(qr.id)} className="danger">
            <Trash2 size={14} /> Eliminar
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
}
