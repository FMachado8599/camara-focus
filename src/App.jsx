import { useState } from "react";
import camaraLogo from "./assets/logo/camaratbwa_logo.jpeg";
import "./App.css";
import "./styles/_layout.scss";
import "./styles/exportOptionsPanel.scss";
import "./styles/toast.scss";
import QRGen from "./components/qrcodegen/QRGen";
import BarCodeGen from "./components/barcodegen/BarCodeGen";
import OptionsPanel from "./components/barcodegen/OptionsPanel";
import ExportOptionsPanel from "./components/qrcodegen/ExportOptionsPanel";

function App() {
  const [isQRPanelOpen, setIsQRPanelOpen] = useState(false);
  const [isBarPanelOpen, setIsBarPanelOpen] = useState(false);

  const [exportOptions, setExportOptions] = useState({
    format: "png",
    size: 150,
    margin: 0,
  });
  const [barcodeOptions, setBarcodeOptions] = useState({
    width: 2,
    height: 90,
    displayValue: true,
    lineColor: "#000000",
    backgroundColor: "transparent",
    fontFamily: "inter", // workaround
    fontSize: 14,
    format: "svg", // svg | png
    pngScale: 3, // escala para PNG
  });

  const toggleQRPanel = () => {
    setIsQRPanelOpen(!isQRPanelOpen);
    setIsBarPanelOpen(false); // evita superposición
  };

  const toggleBarPanel = () => {
    setIsBarPanelOpen(!isBarPanelOpen);
    setIsQRPanelOpen(false); // evita superposición
  };

  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500); // duración del toast
  };

  return (
    <main>
      <div>
        <a href="https://www.camaratbwa.com/" target="_blank">
          <img src={camaraLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div className="main-components-container">
        <div
          className={`genLayout genLayout--qr
             ${isQRPanelOpen ? "open" : "closed"}`}
        >
          <div className="mainCard">
            <QRGen
              togglePanel={toggleQRPanel}
              exportOptions={exportOptions}
              setExportOptions={setExportOptions}
            />
          </div>
          <ExportOptionsPanel
            className="optionsPanel optionsPanel--qr"
            isOpen={isQRPanelOpen}
            options={exportOptions}
            setOptions={setExportOptions}
            showToast={showToast}
          />
        </div>
        <div
          className={`genLayout genLayout--bar 
            ${isBarPanelOpen ? "open" : "closed"}`}
        >
          <div className="mainCard">
            <BarCodeGen
              togglePanel={toggleBarPanel}
              showToast={showToast}
              options={barcodeOptions}
            />
          </div>
          <OptionsPanel
            className="optionsPanel optionsPanel--bar"
            isOpen={isBarPanelOpen}
            options={barcodeOptions}
            setOptions={setBarcodeOptions}
            showToast={showToast}
          />
        </div>
      </div>
      <span className="credits">Developed by Camara\TBWA</span>
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}

export default App;
