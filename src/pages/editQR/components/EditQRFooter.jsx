const EditQRFooter = ({ onSave }) => {
  return (
    <footer className="edit-qr-footer">
      <div className="footer-actions">
        <button className="btn-secondary">Cancelar</button>
        <button className="btn-primary" onClick={onSave}>
          Guardar cambios
        </button>
      </div>
    </footer>
  )
}

export default EditQRFooter
