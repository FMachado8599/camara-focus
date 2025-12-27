import { QRCodeSVG } from "qrcode.react";

export default function QRRenderer({
  value,
  size = 220,
  fgColor = "#000000",
  bgColor = "#ffffff",
  level = "M",
  imageSettings,
}) {
  if (!value) {
    return (
      <div className="qr-renderer empty">
        <p>Sin contenido</p>
      </div>
    );
  }

  return (
    <div className="qr-renderer">
      <QRCodeSVG
        value={value}
        size={size}
        fgColor={fgColor}
        bgColor={bgColor}
        level={level}
        imageSettings={imageSettings}
      />
    </div>
  );
}
