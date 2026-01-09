import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  handleDownload,
  serializeSvg,
  generateQrId,
} from "../../utils/download/qrGenUtils";
import { Settings } from "lucide-react";
import { db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@/context/ToastContext";
import "@/styles/gen-cards/_genCard.scss";
const QR_BASE_URL = import.meta.env.VITE_BASE_URL;

const QRGen = ({ togglePanel, exportOptions, setExportOptions }) => {
  const [text, setText] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const svgRef = useRef(null);
  const { showToast } = useToast();
  const [qrId, setQrId] = useState(null);



  const handleGenerate = async () => {
    if (text.trim() === "") {
      showToast("Escribí algo wacho");
      return;
    }

    const id = generateQrId();
    setQrId(id);
    setLoading(true);
    setShowQR(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setShowQR(true);
  };

  const handleSaveQR = async () => {

    if (!qrId) return;

    const svgString = serializeSvg(svgRef.current);
    console.log("SVG GUARDADO:", svgString.slice(0, 300));

    await setDoc(doc(db, "qrs", qrId), {
      name: name || "Nuevo QR",
      type: "url",
      destination: text,
      svg: svgString,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    showToast("Código QR Guardado Correctamente");
  };

  return (
    <div className="mainCard qrGen fade">
      <h2>URL a QR</h2>

      <span className="option-menu">
        <Settings size={18} onClick={togglePanel} />
      </span>

      <div className="qrGen-inputs-container">
        <input
          className="qrGen-input"
          type="text"
          placeholder="Nombre del QR"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

          {loading && <span className="loader"></span>}

          {showQR && qrId && (
            <QRCodeSVG
              ref={svgRef}
              value={`${QR_BASE_URL}/q/${qrId}`}
              bgColor="transparent"
              fgColor="#ffffff"
              id="qr-generated"
              size={128}
              marginSize={exportOptions.margin}
              className="qrcode-svg"
            />
          )}
        </div>

        <input
          className="qrGen-input"
          type="text"
          value={text}
          placeholder="Escribe o pega tu URL aquí"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="qrGen-actions-container">
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

        <button
          className={showQR ? "descargar-button" : "disabled-button"}
          onClick={handleSaveQR}
          disabled={!showQR}
        >
          Guardar QR
        </button>
      </div>
    </div>
  );
};

export default QRGen;
