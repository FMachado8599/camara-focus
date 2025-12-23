import { useEffect, useState } from "react";
import { getQRById, updateQR } from "@/services/qr.service";

export function useEditQR(id, navigate) {
  const [loading, setLoading] = useState(true);

  const [qrName, setQrName] = useState("");
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

  const saveQR = async () => {
    return updateQR(id, {
      destination: qrContent,
      color: qrColor,
      bgColor,
      shape,
      logoEnabled,
    });
  };

  return {
    loading,
    qrName,
    qrContent, setQrContent,
    qrColor, setQrColor,
    bgColor, setBgColor,
    shape, setShape,
    logoEnabled, setLogoEnabled,
    saveQR,
  };
}

