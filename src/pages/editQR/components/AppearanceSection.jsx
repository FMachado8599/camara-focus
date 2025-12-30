import Card from "@/components/UI/Card";
import CardOption from "@/components/qrcodegen/exportOptionsModal/cardOption";
import { Copy, ClipboardPaste, Info } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useState, useRef, useEffect } from "react";

export default function AppearanceSection({
  qrColor,
  setQrColor,
  bgColor,
  setBgColor,
  size,
  setSize,
  errorLevel,
  setErrorLevel,
}) {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Card className="edit-card">
      <h3 className="card-title">Apariencia</h3>

      {/* Tamaño */}
      <div className="option-section">
        <h4>Tamaño <span>(px)</span></h4>
        <div className="option-grid">
          {[150, 300, 500, 1000].map((val) => (
            <CardOption
              key={val}
              label={`${val}`}
              value={val}
              current={size}
              onChange={setSize}
            />
          ))}
        </div>
      </div>

      {/* Corrección de errores */}
      <div className="option-section">
        <div className="option-header" ref={popoverRef}>
          <h4>Corrección de errores</h4>
          <Info
            size={14}
            className="info-trigger"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Información sobre corrección de errores"
          />

          {open && (
            <div className="info-popover">
              <p>
                La corrección de errores permite que el QR siga funcionando aunque
                esté parcialmente dañado.
              </p>
              <p>
                <strong>Recomendado:</strong> usar <strong>Máxima</strong> si vas a
                incluir un logo.
              </p>
            </div>
          )}
        </div>
        <div className="option-grid">
          {[
            { label: "S", value: "L" },
            { label: "M", value: "M" },
            { label: "L", value: "Q" },
            { label: "XL", value: "H" },
          ].map((opt) => (
            <CardOption
              key={opt.value}
              label={opt.label}
              value={opt.value}
              current={errorLevel}
              onChange={setErrorLevel}
            />
          ))}
        </div>
      </div>

      {/* Color QR */}
      <div className="option-section">
        <h4>Color del QR</h4>

        <div className="color-card">
          <input
            type="color"
            value={qrColor}
            onChange={(e) => setQrColor(e.target.value.toUpperCase())}
          />

          <div className="color-info-bar">
            <output>{qrColor.toUpperCase()}</output>

            <div className="color-info-tools">
              <Copy
                size={14}
                onClick={() => {
                  navigator.clipboard.writeText(qrColor.toUpperCase());
                  showToast("Color copiado");
                }}
              />
              <ClipboardPaste
                size={14}
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(text)) {
                    setQrColor(text.toUpperCase());
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

      {/* Fondo */}
      <div className="option-section">
        <h4>Fondo</h4>

        <div className="color-card">
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value.toUpperCase())}
          />

          <div className="color-info-bar">
            <output>{bgColor.toUpperCase()}</output>

            <div className="color-info-tools">
              <Copy
                size={14}
                onClick={() => {
                  navigator.clipboard.writeText(bgColor.toUpperCase());
                  showToast("Color copiado");
                }}
              />
              <ClipboardPaste
                size={14}
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(text)) {
                    setBgColor(text.toUpperCase());
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
    </Card>
  );
}
