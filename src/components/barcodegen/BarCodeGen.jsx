import { useRef, useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import "./_barCodeGen.scss";
import "../../styles/_library.scss";
import { Settings } from "lucide-react";
import {
  buildEAN13,
  validateEAN13,
  calculateChecksum,
} from "../../utils/barcodeUtils";
import { downloadSVG, downloadPNG } from "../../utils/barcodeUtils";
import { useToast } from "@/context/ToastContext";

export default function BarCodeGen({ togglePanel, options, optionsOpen }) {
  const svgRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [generatedValue, setGeneratedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const placeholderRef = useRef(null);
  const { showToast } = useToast();

  const handleGenerate = async () => {
    const raw = inputValue.trim();

    if (!/^\d+$/.test(raw)) {
      showToast("Solo se permiten números en un código EAN13.");
      return;
    }

    // Caso 12 dígitos → generar automáticamente el dígito verificador
    if (raw.length === 12) {
      const finalCode = buildEAN13(raw);
      await generate(finalCode);
      return;
    }

    // Caso 13 dígitos → validar checksum
    if (raw.length === 13) {
      if (!validateEAN13(raw)) {
        const correctDigit = calculateChecksum(raw.slice(0, 12));

        showToast(`Dígito verificador incorrecto. Debe ser: ${correctDigit}`);

        return;
      }

      await generate(raw);
      return;
    }

    // Cualquier otra longitud
    showToast("Un código EAN13 debe tener 12 o 13 dígitos.");
  };
  async function generate(code) {
    setLoading(true);
    setGeneratedValue(null);

    await new Promise((res) => setTimeout(res, 800));

    setGeneratedValue(code);
    setLoading(false);
  }

  useEffect(() => {
    if (!generatedValue) return;

    JsBarcode(svgRef.current, generatedValue, {
      format: "ean13",
      lineColor: options.lineColor,
      background: options.backgroundColor,
      width: options.width,
      height: options.height,
      displayValue: options.displayValue,
      fontSize: options.fontSize,
      font: options.fontFamily,
    });
  }, [generatedValue, options]);

  useEffect(() => {
    if (!generatedValue && placeholderRef.current) {
      try {
        JsBarcode(placeholderRef.current, "5901234123457", {
          format: "ean13",
          lineColor: "#FFF",
          background: "transparent",
          width: 2,
          height: 90,
          displayValue: false,
          margin: 0,
        });
      } catch (err) {
        console.warn("Error generando placeholder:", err);
      }
    }
  }, [generatedValue]);

  const handleDownload = () => {
    if (!svgRef.current) return;
    if (options.format === "svg") downloadSVG(svgRef.current);
    else downloadPNG(svgRef.current, options.pngScale);
  };

  return (
    <div className="barcode-card mainCard fade">
      <header className="barcode-header">
        <h2>Barcode Gen</h2>
        <Settings
          size={18}
          className="barcode-settings"
          onClick={togglePanel}
        />
      </header>
      <div className="barcode-input-group">
        <div className="barcode-preview">
          {!generatedValue && !loading && (
            <svg className="preview-placeholder" ref={placeholderRef}></svg>
          )}

          {loading && <span className="loader"></span>}

          {generatedValue && <svg ref={svgRef} className="barcode-svg"></svg>}
        </div>
        <input
          type="text"
          value={inputValue}
          placeholder="5901234123457"
          onChange={(e) => setInputValue(e.target.value)}
          className="barcode-input"
          maxlength="13"
        />
      </div>
      <div>
        <button className="generar-button" onClick={handleGenerate}>
          Generar
        </button>
        <button
          className={generatedValue ? "descargar-button" : "disabled-button"}
          disabled={!generatedValue}
          onClick={handleDownload}
        >
          Descargar
        </button>
      </div>
    </div>
  );
}
