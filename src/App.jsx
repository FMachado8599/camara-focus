
import { useState } from "react";
import GenSwitch from "./components/GeneratorSwitch/GenSwitch";
import QRGenContainer from "./components/qrcodegen/QRGenContainer";
import BarcodeGenContainer from "./components/barcodegen/BarCodeGenContainer";
import camaraLogo from "./assets/logo/camaratbwa_logo.jpeg";
import "./App.scss";
import "./styles/_layout.scss";

function App() {
  const [activeGen, setActiveGen] = useState("qr");

  return (
    <main className="home">
      <header className="home-head">
        <a href="https://www.camaratbwa.com/" target="_blank">
          <img src={camaraLogo} className="logo" alt="Vite logo" />
        </a>
        <GenSwitch
          active={activeGen}
          onQR={() => setActiveGen("qr")}
          onBar={() => setActiveGen("bar")}
        />
      </header>

      <div className="main-components-container">
          {activeGen === "qr" && <QRGenContainer />}
          {activeGen === "bar" && <BarcodeGenContainer />}
      </div>

      <span className="credits">Developed by Camara\TBWA</span>
    </main>
  );
}

export default App;
