import Button from "@/components/UI/Button";
import ConfirmModal from "@/components/modals/ConfirmModal/ConfirmModal";
import { Dropdown, DropdownItem } from "@/components/UI/Dropdown";
import { Copy, Edit, Download, Trash2, Files } from "lucide-react";

import { Link } from "react-router-dom";
import { useToast } from "@/context/ToastContext";

import { deleteQR } from "@/services/qr.service";
import { copyQRLink, downloadQR } from "@/utils/qrActions";

import { useState } from "react";

export default function QRCardActions({ qr, onDelete }) {
  const { showToast } = useToast();
  const [actionsOpen, setActionsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    deleteQR(qr.id);
    onDelete(qr.id);
    showToast("QR eliminado");
    setShowDeleteModal(false);
  };

  const handleDuplicate = () => {
    showToast("Duplicar todavía no implementado");
  };

  const handleCopyLink = () => {
    copyQRLink(qr.destination)
    showToast("Enlace copiado");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qr.thumbnail;
    link.download = `${qr.name}.png`;
    link.click();
  };

  const showActions = () => {
    setActionsOpen(prev => !prev);
  }

  return (
    <div className="qr-actions">
      <Button className="qr-actions-download" onClick={handleDownload}>
        <Download size={14} /> Descargar
      </Button>
      <div className="qr-actions-sub">
        <div className="qr-actions-main" >
          <Link to={`/qr/${qr.id}/edit`} className="qr-edit-btn neumorphic-flat">
          <Edit size={14} style={{ marginRight: 4 }} />
          Editar
          </Link>
          <Button onClick={showActions} className="qr-actions-trigger neumorphic-flat">•••</Button>
        </div>
        <div className={`qr-actions-secondary ${actionsOpen ? "open" : ""}`}>
          <Button onClick={handleCopyLink}>
            <Copy size={14} />
          </Button>

          <Button onClick={handleDuplicate}>
            <Files size={14} />
          </Button>

          <Button onClick={() => setShowDeleteModal(true)} className="danger">
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
      <ConfirmModal
        open={showDeleteModal}
        title="Eliminar QR"
        description="Este QR se eliminará definitivamente. No hay vuelta atrás."
        confirmText="Eliminar"
        cancelText="Cancelar"
        danger
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
