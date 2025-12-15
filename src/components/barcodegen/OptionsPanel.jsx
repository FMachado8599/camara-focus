import "./_barcodeOptionsPanel.scss";
import CardOption from "../qrcodegen/exportOptionsModal/cardOption";
import { Copy, ClipboardPaste } from "lucide-react";

export default function BarcodeOptionsPanel({
  isOpen,
  options,
  setOptions,
  showToast,
}) {
  const handleSave = () => {
    showToast("Opciones guardadas");
  };

  const handleCopyBg = () => {
    navigator.clipboard.writeText(options.backgroundColor);
    showToast("Color de fondo copiado");
  };
  const handleCopyLine = () => {
    navigator.clipboard.writeText(options.lineColor);
    showToast("Color de línea copiado");
  };

  const handlePasteBg = async () => {
    const text = await navigator.clipboard.readText();

    // Validar que es un hex correcto tipo #FFFFFF o FFFFFF
    if (/^#?[0-9A-Fa-f]{6}$/.test(text)) {
      const formatted = text.startsWith("#") ? text : `#${text}`;
      setOptions((prev) => ({
        ...prev,
        backgroundColor: formatted.toUpperCase(),
      }));
    } else {
      console.warn("Valor pegado no es un HEX válido:", text);
    }
  };

  const handlePasteLine = async () => {
    const text = await navigator.clipboard.readText();

    if (/^#?[0-9A-Fa-f]{6}$/.test(text)) {
      const formatted = text.startsWith("#") ? text : `#${text}`;
      setOptions((prev) => ({
        ...prev,
        lineColor: formatted.toUpperCase(),
      }));
    } else {
      showToast("Valor no es HEX válido", "error");
    }
  };

  return (
    <div className="optionsPanel" >
      <h3>Opciones de Código de Barra</h3>
      <div className="options-sections-container">
        {/* FORMATO */}
        <div className="option-section">
          <h4>Formato</h4>
          <div className="option-grid">
            <CardOption
              label="SVG"
              value="svg"
              current={options.format}
              onChange={(val) => setOptions((prev) => ({ ...prev, format: val }))}
            />
            <CardOption
              label="PNG"
              value="png"
              current={options.format}
              onChange={(val) => setOptions((prev) => ({ ...prev, format: val }))}
            />
          </div>
        </div>
        {/* PNG SCALE */}
        {options.format === "png" && (
          <div className="option-section">
            <h4>Escala PNG</h4>
            <input
              type="number"
              min="1"
              max="10"
              value={options.pngScale}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  pngScale: Number(e.target.value),
                }))
              }
            />
          </div>
        )}

        {/* WIDTH */}
        <div className="option-section">
          <h4>Ancho de barra</h4>
          <input
            type="number"
            min="1"
            max="5"
            value={options.width}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, width: Number(e.target.value) }))
            }
            className="number"
          />
        </div>

        {/* HEIGHT */}
        <div className="option-section">
          <h4>Altura</h4>
          <input
            type="number"
            min="40"
            max="200"
            value={options.height}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, height: Number(e.target.value) }))
            }
          />
        </div>

        {/* DISPLAY VALUE */}
        <div className="option-section toggle">
          <label className="show-number">
            <input
              type="checkbox"
              checked={options.displayValue}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  displayValue: e.target.checked,
                }))
              }
              className="checkbox"
            />
            Mostrar números
          </label>
        </div>

        {/* COLOR LINEA */}
        <div className="option-section">
          <h4>Línea</h4>
          <div className="color-card">
            <input
              type="color"
              value={options.lineColor}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  lineColor: e.target.value.toUpperCase(),
                }))
              }
            />
            <div className="color-info-bar">
              <output id="colorhex">{options.lineColor.toUpperCase()}</output>
              <div className="color-info-tools">
                <Copy className="icon" size={14} onClick={handleCopyLine} />
                <ClipboardPaste
                  className="icon"
                  size={14}
                  onClick={handlePasteLine}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BACKGROUND */}
        <div className="option-section">
          <h4>Fondo</h4>
          <div className="color-card">
            <input
              type="color"
              value={options.backgroundColor}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  backgroundColor: e.target.value.toUpperCase(),
                }))
              }
            />
            <div className="color-info-bar">
              <output id="colorhex">
                {options.backgroundColor.toUpperCase()}
              </output>
              <div className="color-info-tools">
                <Copy className="icon" size={14} onClick={handleCopyBg} />
                <ClipboardPaste
                  className="icon"
                  size={14}
                  onClick={handlePasteBg}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FONT / WORKAROUND */}
        <div className="option-section">
          <h4>Fuente de números</h4>
          <div className="custom-select">
            <select
              value={options.fontFamily}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, fontFamily: e.target.value }))
              }
            >
              <option value="inter">Inter</option>
              <option value="roboto">Roboto</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>

          <input
            type="number"
            min="8"
            max="40"
            value={options.fontSize}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                fontSize: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="panel-actions">
          <button onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
