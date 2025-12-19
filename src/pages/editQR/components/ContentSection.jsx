const ContentSection = ({ qrContent, setQrContent }) => {
  return (
    <div className="edit-card">
      <h3 className="card-title">Contenido del QR</h3>

      <div className="form-group">
        <label className="form-label">URL / Texto</label>
        <input
          type="text"
          className="form-input"
          value={qrContent}
          onChange={(e) => setQrContent(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ContentSection
