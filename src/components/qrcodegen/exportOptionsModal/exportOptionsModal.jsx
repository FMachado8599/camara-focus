import "./exportOptionsModal.scss";
import CardOption from "./cardOption";
import ColorPicker from "./ColorPicker";

export default function ExportOptionsModal({
  isOpen,
  onClose,
  options,
  setOptions,
}) {
  if (!isOpen) return null;

  const handleSave = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Opciones de exportación</h3>
        <div className="option-section">
          <h4>Tamaño</h4>
          <div className="option-grid">
            {[150, 300, 500, 1000].map((size) => (
              <CardOption
                key={size}
                label={`${size}px`}
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
          <h4>Margen</h4>
          <div className="option-grid">
            {[0, 4, 8, 16].map((margin) => (
              <CardOption
                key={margin}
                label={`${margin}pt`}
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
          {/* <div className="option-section">
            <h4>Color del QR</h4>
            <ColorPicker
              color={options.fgColor}
              onUpdate={(id, newColor) =>
                setOptions(prev => ({ ...prev, fgColor: newColor }))
              }
              simple
            />
          </div>

          <div className="option-section">
            <h4>Fondo</h4>
            <ColorPicker
              color={options.bgColor}
              onUpdate={(id, newColor) =>
                setOptions(prev => ({ ...prev, bgColor: newColor }))
              }
              simple
            />
          </div> */}
        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button className="boton-guardar" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
