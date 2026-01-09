import { useState } from "react";
import QRGen from "../qrcodegen/QRGen";
import OptionsPanel from "./OptionsPanel";

export default function QRGeneratorBlock() {
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [exportOptions, setExportOptions] = useState({
    format: "svg",
    size: 1000,
    margin: 0,
    fgColor: "#000000",
    bgColor: "#FFFFFF",
  });



  const togglePanel = () => {
    setOptionsOpen(prev => !prev);
  };

  return (
    <div className="row">
      <QRGen
        exportOptions={exportOptions}
        setExportOptions={setExportOptions}
        togglePanel={togglePanel}
      />
      <OptionsPanel
        options={exportOptions}
        setOptions={setExportOptions}
        optionsOpen={optionsOpen}
      />
    </div>
  );
}
