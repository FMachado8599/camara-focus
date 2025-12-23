import "@/styles/editQR/_editQR.scss";

import EditQRHeader from "./components/EditQRHeader";
import EditQRFooter from "./components/EditQRFooter";
import EditQRForm from "./components/EditQRForm";
import EditQRPreview from "./components/EditQRPreview";

import { useParams, useNavigate } from "react-router-dom";
import { useEditQR } from "./hooks/useEditQR";

function EditQR() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading,
    qrName,
    qrContent, setQrContent,
    qrColor, setQrColor,
    bgColor, setBgColor,
    shape, setShape,
    logoEnabled, setLogoEnabled,
    saveQR
  } = useEditQR(id, navigate);

  const handleSave = async () => {
    try {
      await saveQR();
      navigate("/store");
    } catch (err) {
      console.error("Error al guardar QR", err);
      alert("Error al guardar los cambios");
    }
  };

  if (loading) return <p>Cargando QR…</p>;

  return (
      <div className="edit-qr-page">
        <EditQRHeader name={qrName} />

        <main className="edit-qr-main">
          <EditQRPreview
            qrContent={qrContent}
            qrColor={qrColor}
            bgColor={bgColor}
            shape={shape}
          />

          <EditQRForm
            qrContent={qrContent}
            setQrContent={setQrContent}
            qrColor={qrColor}
            setQrColor={setQrColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            shape={shape}
            setShape={setShape}
            logoEnabled={logoEnabled}
            setLogoEnabled={setLogoEnabled}
          />
        </main>

        <EditQRFooter onSave={handleSave} />
      </div>
    );
  }

export default EditQR;
