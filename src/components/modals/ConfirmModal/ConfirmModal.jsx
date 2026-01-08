import Button from "@/components/UI/Button";
import "@/components/modals/ConfirmModal/confirmModal.scss";

const ConfirmModal = ({
  open,
  title = "Confirmar acción",
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  danger = false,
}) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-card neumorphic-flat"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{title}</h3>

        {description && <p>{description}</p>}

        <div className="modal-actions">
          <Button onClick={onCancel}>{cancelText}</Button>

          <Button
            className={danger ? "danger" : ""}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
