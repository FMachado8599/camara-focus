import "./_barcodeOptionsPanel.scss";
import CardOption from "../qrcodegen/exportOptionsModal/cardOption";

export default function BarcodeOptionsPanel({
  isOpen,
  options,
  setOptions,
  showToast,
}) {
  const handleSave = () => {
    showToast("Opciones guardadas");
  };

  return (
    <aside className={`optionsPanel ${isOpen ? "open" : "closed"}`}>
      <h3>Opciones de Código de Barra</h3>

      {/* FORMATO */}
      <div className="option-section">
        <h4>Formato</h4>
        <div className="option-grid">
          <CardOption
            label="SVG"
            value="svg"
            current={options.format}
            onChange={(val) =>
              setOptions((prev) => ({ ...prev, format: val }))
            }
          />
          <CardOption
            label="PNG"
            value="png"
            current={options.format}
            onChange={(val) =>
              setOptions((prev) => ({ ...prev, format: val }))
            }
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
        <label className="show-number" >
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
        <h4>Color de línea</h4>
        <div className="color-card">
          <input
            type="color"
            value={options.lineColor}
            oninput="colorhex.value=value"
            onChange={(e) =>
              setOptions(prev => ({
                ...prev,
                lineColor: e.target.value.toUpperCase()
              }))
            }
          />
          <output id="colorhex">{options.lineColor.toUpperCase()}</output>
        </div>
      </div>

      {/* BACKGROUND */}
      <div className="option-section">
        <h4>Fondo</h4>
            <div className="color-card">
                      <input
          type="color"
          oninput="colorhex.value=value"
          value={options.backgroundColor}
            onChange={(e) =>
              setOptions(prev => ({
                ...prev,
                backgroundColor: e.target.value.toUpperCase()
              }))
            }
        />
        <output id="colorhex">{options.backgroundColor.toUpperCase()}</output>
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
    </aside>
  );
}
