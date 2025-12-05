import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./qrcodegen.scss";
import { handleDownload } from "../../utils/download/qrGenUtils";
import { Bolt } from "lucide-react";
import ExportOptionsModal from "./exportOptionsModal/exportOptionsModal";

const QRGen = () => {
  const [text, setText] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    format: "svg",
    size: 128,
    margin: 0,
  });

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
      <span className="option-menu">
        <Bolt size={18} onClick={() => setIsModalOpen(true)} />
      </span>
      <ExportOptionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        options={exportOptions}
        setOptions={setExportOptions}
      />
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
              id="qr-generated"
              size={128}  
              marginSize={exportOptions.margin}
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
        onClick={() => handleDownload(exportOptions)}
        disabled={!showQR}
      >
        Descargar
      </button>
    </div>
  );
};

export default QRGen;
