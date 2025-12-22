import { Undo2, Edit } from "lucide-react"
import { useNavigate } from "react-router-dom"

const EditQRHeader = ({ name }) => {

const navigate = useNavigate();

  return (
    <header className="edit-qr-header">
      <div className="header-content">
        <div className="title-section">
          <Edit size={18}/>
          <h1 className="page-title">{name || "Nombre del QR"}</h1>
        </div>

        <button onClick={() => navigate(-1)} className="btn-secondary"><Undo2 size={14}/></button>
      </div>
    </header>
  )
}

export default EditQRHeader
