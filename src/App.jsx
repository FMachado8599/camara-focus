import { useState } from "react";
import camaraLogo from "./assets/logo/camaratbwa_logo.jpeg";
import "./App.css";
import "./styles/exportOptionsPanel.scss"
import "./styles/toast.scss"
import QRGen from "./components/qrcodegen/QRGen";
import ExportOptionsPanel from "./components/qrcodegen/ExportOptionsPanel";

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const [exportOptions, setExportOptions] = useState({
    format: "png",
    size: 150,
    margin: 0,
  });

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
      <div className={`genLayout ${isPanelOpen ? "open" : "closed"}`}>
        <div className="mainCard">
          <QRGen
            togglePanel={() => setIsPanelOpen(!isPanelOpen)}
            exportOptions={exportOptions}
            setExportOptions={setExportOptions}
          />
        </div>
        <ExportOptionsPanel
          isOpen={isPanelOpen}
          options={exportOptions}
          setOptions={setExportOptions}
          showToast={showToast}
        />

      </div>
      <span className="credits">Developed by Camara\TBWA</span>
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}

export default App;
