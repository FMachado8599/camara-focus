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

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate("/store");
      return;
    }

    async function loadQR() {
      const data = await getQRById(id);

      if (!data) {
        navigate("/qr");
        return;
      }

      setQrName(data.name);

      setForm({
        content: data.destination ?? "",
        color: data.color ?? "#000000",
        bgColor: data.bgColor ?? "#ffffff",
        shape: data.shape ?? "square",
        logoEnabled: data.logoEnabled ?? false,
      });

      setLoading(false);
    }

    loadQR();
  }, [id, navigate]);

  const handleSave = async () => {
    await updateQR(qrId, {
      url: qrContent,
      color: qrColor,
      bgColor,
      shape,
      logoEnabled,
    });

    navigate("/qr");
  };

  if (loading) return <p>Cargando QR…</p>;
  return (
    <div className="edit-qr-page">
      <EditQRHeader name={qrData?.name} />

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
