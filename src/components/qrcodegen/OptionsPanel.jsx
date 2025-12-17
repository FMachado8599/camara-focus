import "../../styles/option-panel/index.scss";
import CardOption from "./exportOptionsModal/cardOption";
import ColorPicker from "./exportOptionsModal/ColorPicker";
import { useToast } from "@/context/ToastContext"
import { Copy, ClipboardPaste } from "lucide-react";

export default function ExportOptionsPanel({
  isOpen,
  options,
  setOptions,
  optionsOpen,
}) {
  const { showToast } = useToast();

  const bgColor = options.bgColor ?? "#FFFFFF";

  const handleSave = () => {
    console.log("Opciones guardadas:", options);
    isOpen=false;
    showToast("Opciones guardadas");
  };

  return (
    <aside className={`optionsPanel ${optionsOpen ? "open" : "closed"} `}>
      <h3>Opciones de exportación</h3>
      <div className="options-sections-container">
        <div className="option-section">
          <h4>Tamaño <span>(px)</span> </h4>
          <div className="option-grid">
            {[150, 300, 500, 1000].map((size) => (
              <CardOption
                key={size}
                label={`${size}`}
                value={size}
                current={options.size}
                onChange={(val) =>
                  setOptions((prev) => ({ ...prev, size: val }))
                }
              />
            ))}
          </div>
        </div>
        
        <div className="option-section">
          <h4>Margen <span>(pt)</span></h4>
          <div className="option-grid">
            {[0, 4, 8, 16].map((margin) => (
              <CardOption
                key={margin}
                label={`${margin}`}
                value={margin}
                current={options.margin}
                onChange={(val) =>
                  setOptions((prev) => ({ ...prev, margin: val }))
                }
              />
            ))}
          </div>
        </div>

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

        {/* Colores (si los volvemos a activar) */}
        
        <div className="option-section">
          <h4>Color del QR</h4>

          <div className="color-card">
            <input
              type="color"
              value={options.fgColor}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  fgColor: e.target.value.toUpperCase(),
                }))
              }
            />

            <div className="color-info-bar">
              <output id="colorhex">
                {options.fgColor.toUpperCase()}
              </output>

              <div className="color-info-tools">
                <Copy
                  className="icon"
                  size={14}
                  onClick={() => {
                    navigator.clipboard.writeText(options.fgColor.toUpperCase());
                    showToast("Color copiado");
                  }}
                />

                <ClipboardPaste
                  className="icon"
                  size={14}
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();

                    if (/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(text)) {
                      setOptions((prev) => ({
                        ...prev,
                        fgColor: text.toUpperCase(),
                      }));
                      showToast("Color pegado");
                    } else {
                      showToast("Color inválido", "error");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="option-section">
          <h4>Fondo</h4>

          <div className="color-card">
            <input
              type="color"
              value={options.bgColor}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  bgColor: e.target.value.toUpperCase(),
                }))
              }
            />

            <div className="color-info-bar">
              <output id="colorhex">
                {options.bgColor.toUpperCase()}
              </output>

              <div className="color-info-tools">
                <Copy
                  className="icon"
                  size={14}
                  onClick={() => {
                    navigator.clipboard.writeText(options.bgColor.toUpperCase());
                    showToast("Color copiado");
                  }}
                />

                <ClipboardPaste
                  className="icon"
                  size={14}
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();

                    if (/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(text)) {
                      setOptions((prev) => ({
                        ...prev,
                        bgColor: text.toUpperCase(),
                      }));
                      showToast("Color pegado");
                    } else {
                      showToast("Color inválido", "error");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
       
      </div>

      <div className="panel-actions">
        <button onClick={handleSave}>Guardar</button>
      </div>
    </aside>
  );
}
