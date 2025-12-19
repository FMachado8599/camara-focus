import "@/styles/editQR/_editQR.scss";

import EditQRHeader from "./components/EditQRHeader"
import EditQRFooter from "./components/EditQRFooter"
import EditQRForm from "./components/EditQRForm"
import EditQRPreview from "./components/EditQRPreview"

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQRById, updateQR } from "@/services/qr.service";

function EditQR() {
  const { qrId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [qrData, setQrData] = useState(null);

  const [qrContent, setQrContent] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [shape, setShape] = useState("square");
  const [logoEnabled, setLogoEnabled] = useState(false);

  console.log("🟡 qrId desde params:", qrId);

  useEffect(() => {

    if (!qrData) return;

    setQrContent(qrData.url);
    setQrColor(qrData.color);
    setBgColor(qrData.bgColor);
    setShape(qrData.shape);
    setLogoEnabled(qrData.logoEnabled);
  }, [qrData]);

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


    useEffect(() => {

    if (!qrId) return;

    async function loadQR() {
      const data = await getQRById(qrId);

      if (!data) {
        navigate("/qr");
        return;
      }

      setQrData(data);
      setLoading(false);
    }

    loadQR();
  }, [qrId, navigate]);

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
  )
}

export default EditQR
