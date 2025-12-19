const EditQRPreview = ({ qrColor, bgColor, shape, logoEnabled }) => {
  return (
    <div className="preview-panel">
      <div className="preview-container">
        <div className="qr-preview" style={{ backgroundColor: bgColor }}>
          <div
            className={`qr-code-placeholder ${shape}`}
            style={{ backgroundColor: qrColor }}
          >
            {logoEnabled && (
              <div className="qr-logo-overlay">
                <div className="logo-circle"></div>
              </div>
            )}
          </div>
        </div>

        <p className="preview-label">Vista previa</p>
      </div>
    </div>
  )
}

export default EditQRPreview
