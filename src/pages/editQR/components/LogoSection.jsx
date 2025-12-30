import Card from "@/components/UI/Card";
import "@/components/qrcodegen/exportOptionsModal/cardOption";

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

      <div className="logo-toggle">
        <label className="checkbox-label">
          <input
            className="checkbox"
            type="checkbox"
            checked={logoEnabled}
            onChange={(e) => setLogoEnabled(e.target.checked)}
          />
          Mostrar logo en el centro
        </label>
      </div>

      {logoEnabled && (
        <div className="logo-settings">
          <div className="logo-size">
            <label className="form-label">Tamaño del logo</label>

            <div className="range-row">
              <input
                type="range"
                min={16}
                max={64}
                step={2}
                value={logoSize}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  const min = Number(e.target.min);
                  const max = Number(e.target.max);

                  const percent = ((value - min) / (max - min)) * 100;

                  e.target.style.setProperty("--percent", `${percent}%`);
                  setLogoSize(Number(e.target.value));
                }}
              />
              <span className="range-value">{logoSize}px</span>
            </div>
          </div>

          <div className="logo-upload">
            <label className="form-label">Subí tu logo</label>
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
