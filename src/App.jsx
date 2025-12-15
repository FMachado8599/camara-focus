// import { useState } from "react";
// import camaraLogo from "./assets/logo/camaratbwa_logo.jpeg";
// import "./App.scss";
// import "./styles/_layout.scss";
// import "./styles/exportOptionsPanel.scss";
// import "./styles/toast.scss";
// import QRGen from "./components/qrcodegen/QRGen";
// import BarCodeGen from "./components/barcodegen/BarCodeGen";
// import OptionsPanel from "./components/barcodegen/OptionsPanel";
// import ExportOptionsPanel from "./components/qrcodegen/ExportOptionsPanel";
// import GenSwitch from "./components/GeneratorSwitch/GenSwitch";

// function App() {
//   const openQR = () => setActiveGen("qr");
//   const openBar = () => setActiveGen("bar");

//   const [optionsOpen, setOptionsOpen] = useState(true);
//   const [activeGen, setActiveGen] = useState("qr"); // "qr" | "bar"

//   const [exportOptions, setExportOptions] = useState({
//     format: "png",
//     size: 150,
//     margin: 0,
//   });
//   const [barcodeOptions, setBarcodeOptions] = useState({
//     width: 2,
//     height: 90,
//     displayValue: true,
//     lineColor: "#ffffff",
//     backgroundColor: "transparent",
//     fontFamily: "inter", // workaround
//     fontSize: 14,
//     format: "svg", // svg | png
//     pngScale: 3, // escala para PNG
//   });

//   const toggleQRPanel = () => {
//     setIsQRPanelOpen(!isQRPanelOpen);
//     setIsBarPanelOpen(false); // evita superposición
//   };

//   const toggleBarPanel = () => {
//     setIsBarPanelOpen(!isBarPanelOpen);
//     setIsQRPanelOpen(false); // evita superposición
//   };

// const [toast, setToast] = useState(null);

// const showToast = (msg) => {
//   setToast(msg);
//   setTimeout(() => setToast(null), 2500); // duración del toast
// };

//   return (
//     <main className="home">
//       <div className="home-head">
//         <a href="https://www.camaratbwa.com/" target="_blank">
//           <img src={camaraLogo} className="logo" alt="Vite logo" />
//         </a>
//         <GenSwitch active={activeGen} onQR={openQR} onBar={openBar} />
//       </div>

//       <div className="main-components-container">
//         {/* MAIN CARD */}
//         {activeGen === "qr" && (
//           <div className="mainCard fade">
//             <QRGen
//               exportOptions={exportOptions}
//               setExportOptions={setExportOptions}
//               showToast={showToast}
//             />
//           </div>
//         )}

//         {activeGen === "bar" && (
//           <div className="mainCard fade">
//             <BarCodeGen options={barcodeOptions} showToast={showToast} />
//           </div>
//         )}

//         {/* OPTIONS PANELS */}
//         <div className={`optionsPanel optionsPanel--qr open`}>
//           <ExportOptionsPanel
//             options={exportOptions}
//             setOptions={setExportOptions}
//             showToast={showToast}
//           />
//         </div>

//         <div className={`optionsPanel optionsPanel--bar open`}>
//           <OptionsPanel
//             options={barcodeOptions}
//             setOptions={setBarcodeOptions}
//             showToast={showToast}
//           />
//         </div>
//       </div>

// <span className="credits">Developed by Camara\TBWA</span>
// {toast && <div className="toast">{toast}</div>}
//     </main>
//   );
// }

// export default App;

import { useState } from "react";
import GenSwitch from "./components/GeneratorSwitch/GenSwitch";
import QRGenContainer from "./components/qrcodegen/QRGenContainer";
import BarcodeGenContainer from "./components/barcodegen/BarCodeGenContainer";
import camaraLogo from "./assets/logo/camaratbwa_logo.jpeg";
import "./App.scss";
import "./styles/_layout.scss";
import "./styles/exportOptionsPanel.scss";
import "./styles/toast.scss";

function App() {
  const [activeGen, setActiveGen] = useState("qr");

  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500); // duración del toast
  };

  return (
    <main className="home">
      <div className="home-head">
        <a href="https://www.camaratbwa.com/" target="_blank">
          <img src={camaraLogo} className="logo" alt="Vite logo" />
        </a>
        <GenSwitch
          active={activeGen}
          onQR={() => setActiveGen("qr")}
          onBar={() => setActiveGen("bar")}
        />
      </div>

      <div className="main-components-container">
        {activeGen === "qr" && <QRGenContainer showToast={showToast} />}
        {activeGen === "bar" && <BarcodeGenContainer showToast={showToast} />}
      </div>

      <span className="credits">Developed by Camara\TBWA</span>
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}

export default App;
