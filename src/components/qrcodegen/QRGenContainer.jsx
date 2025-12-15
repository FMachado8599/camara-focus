import { useState, useEffect } from "react";
import QRGen from "../qrcodegen/QRGen";
import OptionsPanel from "./OptionsPanel";

export default function QRGeneratorBlock() {
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [exportOptions, setExportOptions] = useState({
    format: "png",
    size: 150,
    margin: 0,
  });

  const togglePanel = () => {
    setOptionsOpen(prev => !prev);
  };

  return (
    <>
      <div className="mainCard fade">
        <QRGen
          exportOptions={exportOptions}
          setExportOptions={setExportOptions}
          togglePanel={togglePanel}
        />
      </div>

      <aside className={`optionsPanel ${optionsOpen ? "open" : "closed"}`}>
        <OptionsPanel
          options={exportOptions}
          setOptions={setExportOptions}
        />
      </aside>
    </>
  );
}
