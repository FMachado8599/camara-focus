import Card from "@/components/UI/Card";

export default function LogoSection({
  logoEnabled,
  setLogoEnabled,
  logoSize,
  setLogoSize,
  logoFile,
  setLogoFile,
  logoUrl,
  setLogoUrl,
}) {
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    setLogoUrl(URL.createObjectURL(file));
  };

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
        <div className="enabled-logo-settings">
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
          </div>
          <div className="form-group">
            <label className="form-label">Sube tu logo</label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              onChange={handleLogoUpload}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
