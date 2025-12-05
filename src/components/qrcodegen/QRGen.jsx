import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./qrcodegen.scss";
import { handleDownload } from "../../utils/download/qrGenUtils";

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
      <div className="qr-code-container">
        {!loading && !showQR && text.trim() === "" && (
          <div style={{ opacity: 0.1 }}>
            <QRCodeSVG
              value="https://www.camaratbwa.com/"
              bgColor="transparent"
              fgColor="#ffffff"
              size={128}
            />
          </div>
        )}

        {loading && <span class="loader"></span>}

        {showQR && (
          <div>
            <QRCodeSVG
              value={text}
              bgColor="transparent"
              fgColor="#ffffff"
              size={128}
              id="qr-generated"
            />
          </div>
        )}
      </div>
      <input
        type="text"
        value={text}
        placeholder="Escribe o pega tu URL aquí"
        onChange={(e) => setText(e.target.value)}
      />
      <button className="generar-button" onClick={handleGenerate}>
        Generar
      </button>
      <button
        className={showQR ? "descargar-button" : "disabled-button"}
        onClick={showQR ? handleDownload : undefined}
        disabled={!showQR}
      >
        Descargar
      </button>
    </div>
  );
};

export default QRGen;
