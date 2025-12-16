import { useState, useEffect } from "react";
import BarCodeGen from "./BarCodeGen";
import BarcodeOptionsPanel from "./OptionsPanel";

export default function BarcodeGenContainer() {
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [options, setOptions] = useState({
    width: 2,
    height: 90,
    displayValue: true,
    lineColor: "#FFFFFF",
    backgroundColor: "transparent",
    fontFamily: "inter",
    fontSize: 14,
    format: "svg",
    pngScale: 3,
  });

  const togglePanel = () => {
    setOptionsOpen(prev => !prev);
  };

  return (
    <>
      <div className="mainCard fade">
        <BarCodeGen
          options={options}
          togglePanel={togglePanel}
        />
      </div>

      <aside className={`optionsPanelContainer ${optionsOpen ? "open" : "closed"}`}>
        <BarcodeOptionsPanel
          options={options}
          setOptions={setOptions}
        />
      </aside>
    </>
  );
}
