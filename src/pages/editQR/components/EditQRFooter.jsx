import { useNavigate } from "react-router-dom"

const EditQRFooter = ({ onSave }) => {

const navigate = useNavigate(onSave);

  return (
    <footer className="edit-qr-footer">
        <button className="cancel-button" onClick={() => navigate(-1)}>Cancelar</button>
        <button className="save-button" onClick={onSave}>
          Guardar cambios
        </button>
    </footer>
  )
}

export default EditQRFooter
