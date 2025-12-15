import { QrCode, Barcode } from "lucide-react";
import "./_genSwitch.scss";

export default function GenSwitch({ active, onQR, onBar }) {
  return (
    <div className="genSwitch">
      <button
        className={`genSwitch__btn ${active === "qr" ? "active" : ""}`}
        onClick={onQR}
        aria-label="Generador QR"
      >
        <QrCode size={22} />
      </button>

      <button
        className={`genSwitch__btn ${active === "bar" ? "active" : ""}`}
        onClick={onBar}
        aria-label="Generador Código de Barras"
      >
        <Barcode size={22} />
      </button>
    </div>
  );
}
