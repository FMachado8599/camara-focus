import { QRCodeSVG } from "qrcode.react";

export default function QRRenderer({
  value,
  color = "#000000",
  bgColor = "#ffffff",
  size = 220,
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
        fgColor={color}
        bgColor={bgColor}
        level="Q"
      />
    </div>
  );
}
