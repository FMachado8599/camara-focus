import QRRenderer from "./QRRenderer";

const EditQRPreview = ({ qrContent, qrColor, bgColor, shape }) => {
  return (
    <div className="preview-panel">
      <div className="preview-container">
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

        <p className="preview-label">Vista previa</p>
      </div>
    </div>
  )
}

export default EditQRPreview
