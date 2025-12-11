import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./qrcodegen.scss";
import { handleDownload, serializeSvg, generateQrId} from "../../utils/download/qrGenUtils";
import { Settings } from "lucide-react";
import { db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";


const QRGen = ({ togglePanel, exportOptions, setExportOptions, showToast }) => {
  const [text, setText] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const svgRef = useRef(null);


  const handleGenerate = async () => {
    if (text.trim() === "") {
      alert("Escribí algo papito");
      return;
    }

    setLoading(true);
    setShowQR(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setShowQR(true);
  };

  const handleSaveQR = async () => {
    if (!showQR) return alert("Generá el QR primero pa");

    const svgString = serializeSvg(svgRef.current);
    console.log("SVG GUARDADO:", svgString.slice(0, 300));
    const id = generateQrId();

    await setDoc(doc(db, "qrs", id), {
      name: name || "Nuevo QR",
      type: "url",
      destination: text,
      svg: svgString,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    showToast("Código QR Guardado Correctamente")
  };


  return (
    <div className="qrGen">
      <div className="qr-card">
        {" "}
        {/* ← acá vive tu estilo original */}
        <h2>URL a QR</h2>
        <span className="option-menu">
          <Settings size={18} onClick={togglePanel} />
        </span>
        <input
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

          {showQR && (
            <div>
              <QRCodeSVG
                ref={svgRef}
                value={text}
                bgColor="transparent"
                fgColor="#ffffff"
                id="qr-generated"
                size={128}
                marginSize={exportOptions.margin}
                className="qrcode-svg"
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
