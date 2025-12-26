import Card from "@/components/UI/Card"

export default function LogoSection({
  logoEnabled,
  setLogoEnabled,
  logoSize,
  setLogoSize,
}) {
  return (
    <Card className="edit-card">
      <h3 className="card-title">Logo</h3>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={logoEnabled}
            onChange={(e) => setLogoEnabled(e.target.checked)}
          />
          Mostrar logo en el centro
        </label>
      </div>

      {logoEnabled && (
        <div className="form-group">
          <label className="form-label">Tamaño del logo</label>
          <input
            type="range"
            min={16}
            max={64}
            step={2}
            value={logoSize}
            onChange={(e) => setLogoSize(Number(e.target.value))}
          />
          <span className="form-value">{logoSize}px</span>

          <p className="form-helper">
            Recomendado: mantenerlo pequeño para asegurar escaneo.
          </p>
        </div>
      )}
    </Card>
  )
}
