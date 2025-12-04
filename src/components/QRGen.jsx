import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import './qrcodegen/qrcodegen.scss';

const QRGen = () => {
  const [text, setText] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (text.trim() === "") {
      alert("Escribí algo papito");
      return;
    }

    setLoading(true);
    setShowQR(false);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // esperar 1s

    setLoading(false);
    setShowQR(true);
  };

  return (
    <div className="qr-code-component">
      <h2>URL a QR</h2>
      <div className="qr-code-container" >
        {loading && <span class="loader"></span>}

        {showQR && (
          <div>
            <QRCodeSVG
              value={text}
              bgColor="transparent"
              fgColor="#ffffff"
              size={128}
            />
          </div>
        )}
      </div>
      <input
        type="text"
        value={text}
        placeholder="Escribir..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleGenerate}>Generar</button>
    </div>
  );
};

export default QRGen;