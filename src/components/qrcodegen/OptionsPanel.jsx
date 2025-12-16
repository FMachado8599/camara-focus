import { useState } from "react";
import "../../styles/exportOptionsPanel.scss"
import CardOption from "./exportOptionsModal/cardOption";
import ColorPicker from "./exportOptionsModal/ColorPicker";
import { useToast } from "@/context/ToastContext"

export default function ExportOptionsPanel({
  isOpen,
  options,
  setOptions
}) {
    const { showToast } = useToast();

  const handleSave = () => {
    console.log("Opciones guardadas:", options);
    isOpen=false;
    showToast("Opciones guardadas");
  };

  return (
    <div>
      <h3>Opciones de exportación</h3>
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
      {/* 
      <div className="option-section">
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
      </div>
      */}

      <div className="panel-actions">
        <button onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
}
