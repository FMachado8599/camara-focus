import { useState, useEffect } from "react";
import BarCodeGen from "./BarCodeGen";
import BarcodeOptionsPanel from "./OptionsPanel";

export default function BarcodeGeneratorBlock() {
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

  useEffect(() => {
    const t = setTimeout(() => setOptionsOpen(false), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="mainCard fade">
        <BarCodeGen options={options} />
      </div>

      <aside className={`optionsPanel ${optionsOpen ? "open" : "closed"}`}>
        <BarcodeOptionsPanel options={options} setOptions={setOptions} />
      </aside>
    </>
  );
}
