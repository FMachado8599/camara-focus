const EditQRHeader = ({ name }) => {
  return (
    <header className="edit-qr-header">
      <div className="header-content">
        <div className="title-section">
          <h1 className="page-title">Editar QR</h1>
          <p className="page-subtitle">{name || "Nombre del QR"}</p>
        </div>

        <button className="btn-secondary">Volver</button>
      </div>
    </header>
  )
}

export default EditQRHeader
