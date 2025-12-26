import QRRenderer from "./QRRenderer";

const EditQRPreview = ({ qrContent, qrColor, bgColor, shape }) => {
  return (
    <div className="preview-panel">
      <div className="preview-container">
        <h3 className="preview-label">Vista previa</h3>
        <div className="qr-preview" style={{ backgroundColor: bgColor }}>
          <div
            className={`qr-code-placeholder ${shape}`}
            style={{ backgroundColor: bgColor }}
          >
            <QRRenderer
              value={qrContent}
              color={qrColor}
              bgColor={bgColor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditQRPreview
