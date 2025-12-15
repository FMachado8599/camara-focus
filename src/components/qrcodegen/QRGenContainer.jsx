import { useState, useEffect } from "react";
import QRGen from "../qrcodegen/QRGen";
import ExportOptionsPanel from "../qrcodegen/ExportOptionsPanel";

export default function QRGeneratorBlock() {
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [exportOptions, setExportOptions] = useState({
    format: "png",
    size: 150,
    margin: 0,
  });

  // opcional: auto-hide
  useEffect(() => {
    const t = setTimeout(() => setOptionsOpen(false), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="mainCard fade">
        <QRGen
          exportOptions={exportOptions}
          setExportOptions={setExportOptions}
        />
      </div>

      <aside className={`optionsPanel ${optionsOpen ? "open" : "closed"}`}>
        <ExportOptionsPanel
          options={exportOptions}
          setOptions={setExportOptions}
        />
      </aside>
    </>
  );
}
