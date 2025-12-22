import "@/styles/editQR/_editQR.scss";

import EditQRHeader from "./components/EditQRHeader";
import EditQRFooter from "./components/EditQRFooter";
import EditQRForm from "./components/EditQRForm";
import EditQRPreview from "./components/EditQRPreview";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQRById, updateQR } from "@/services/qr.service";

function EditQR() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qrName, setQrName] = useState("");
  const [loading, setLoading] = useState(true);
  const [qrContent, setQrContent] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [shape, setShape] = useState("square");
  const [logoEnabled, setLogoEnabled] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/store");
      return;
    }

    async function loadQR() {
      const data = await getQRById(id);

      if (!data) {
        navigate("/store");
        return;
      }

      setQrName(data.name ?? "");
      setQrContent(data.destination ?? "");
      setQrColor(data.color ?? "#000000");
      setBgColor(data.bgColor ?? "#ffffff");
      setShape(data.shape ?? "square");
      setLogoEnabled(data.logoEnabled ?? false);

      setLoading(false);
    }

    loadQR();
  }, [id, navigate]);

  const handleSave = async () => {
    try {
      await updateQR(id, {
        destination: qrContent,
        color: qrColor,
        bgColor,
        shape,
        logoEnabled,
      });

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

          <EditQRPreview
            qrColor={qrColor}
            bgColor={bgColor}
            shape={shape}
            logoEnabled={logoEnabled}
          />
        </main>

        <EditQRFooter onSave={handleSave} />
      </div>
    );
  }

export default EditQR;
