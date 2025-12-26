import Card from "@/components/UI/Card"

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
  return (
    <Card className="edit-card">
      <h3 className="card-title">Apariencia</h3>

      <div className="form-group">
        <label className="form-label">Color del QR</label>
        <input
          type="color"
          className="form-input color-input"
          value={qrColor}
          onChange={(e) => setQrColor(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Color de fondo</label>
        <input
          type="color"
          className="form-input color-input"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Tamaño</label>
        <input
          type="range"
          min={128}
          max={512}
          step={16}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
        <span className="form-value">{size}px</span>
      </div>

      <div className="form-group">
        <label className="form-label">Corrección de errores</label>
        <select
          className="form-input"
          value={errorLevel}
          onChange={(e) => setErrorLevel(e.target.value)}
        >
          <option value="L">Baja</option>
          <option value="M">Media</option>
          <option value="Q">Alta</option>
          <option value="H">Máxima (recomendada para logo)</option>
        </select>
        <p className="form-helper">
          A mayor corrección, más tolerancia a modificaciones visuales.
        </p>
      </div>
    </Card>
  )
}
