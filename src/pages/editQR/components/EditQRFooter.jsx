const EditQRFooter = ({ onSave }) => {
  return (
    <footer className="edit-qr-footer">
        <button className="cancel-button">Cancelar</button>
        <button className="save-button" onClick={onSave}>
          Guardar cambios
        </button>
    </footer>
  )
}

export default EditQRFooter
