import { useState } from "react";
import camaraLogo from "./assets/logo/camaratbwa_logo.jpeg";
import "./App.css";
import QRGen from "./components/qrcodegen/QRGen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://www.camaratbwa.com/" target="_blank">
          <img src={camaraLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div className="card">
        <QRGen />
      </div>
      <span className="credits">Developed by Camara\TBWA</span>
    </>
  );
}

export default App;
