import Card from "@/components/UI/Card";

const ContentSection = ({ qrContent, setQrContent }) => {
  return (
    <Card className="edit-card">
      <h3 className="card-title">Contenido del QR</h3>

      <div className="form-group">
        <label className="form-label">Destino <span>(URL) </span></label>
        <input
          type="text"
          className="form-input"
          value={qrContent}
          onChange={(e) => setQrContent(e.target.value)}
          placeholder={qrContent || "https://example.com"}
        />
      </div>
    </Card>
  );
};

export default ContentSection;
