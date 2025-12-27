import QRRenderer from "./QRRenderer";

function EditQRPreview({
  qrContent,
  qrColor,
  bgColor,
  size,
  errorLevel,
  logoEnabled,
  logoUrl,
  logoSize,
}) {
  const PREVIEW_SIZE = Math.min(size, 250);
  const PREVIEW_LOGO_SIZE = logoSize;

  return (
    <div className="preview-panel">
      <div className="preview-container">
        <h3 className="preview-label">Vista previa</h3>
        <div className="qr-preview" style={{ backgroundColor: bgColor }}>
          <div
            className={`qr-code-placeholder`}
            style={{ backgroundColor: bgColor }}
          >
            <QRRenderer
              value={qrContent || " "}
              size={PREVIEW_SIZE}
              fgColor={qrColor}
              bgColor={bgColor}
              level={logoEnabled ? "H" : errorLevel}
              imageSettings={
                logoEnabled && logoUrl
                  ? {
                      src: logoUrl,
                      width: PREVIEW_LOGO_SIZE,
                      height: PREVIEW_LOGO_SIZE,
                      excavate: true,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditQRPreview;
