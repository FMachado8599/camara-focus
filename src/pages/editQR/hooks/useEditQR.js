import { useEffect, useState } from "react";
import { getQRById, updateQR } from "@/services/qr.service";
import { uploadLogo } from "@/services/upload.service";

export function useEditQR(id, navigate) {
  const [loading, setLoading] = useState(true);

  const [qrName, setQrName] = useState("");
  const [qrContent, setQrContent] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [shape, setShape] = useState("square");
  const [logoEnabled, setLogoEnabled] = useState(false);
  const [size, setSize] = useState(300);
  const [errorLevel, setErrorLevel] = useState("M");
  const [logoSize, setLogoSize] = useState(60);
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);



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
      setSize(data.size ?? 300);
      setErrorLevel(data.errorLevel ?? "M");
      setLogoSize(data.logoSize ?? 60);

      setLoading(false);
    }

    loadQR();
  }, [id, navigate]);

  const saveQR = async () => {

    let finalLogoUrl = logoUrl;

    if (logoFile) {
      const res = await uploadLogo(logoFile);
      finalLogoUrl = res.logoUrl;
      setLogoUrl(finalLogoUrl);
    }

    return updateQR(id, {
      name: qrName,
      destination: qrContent,
      color: qrColor,
      bgColor,
      shape,
      size,
      errorLevel,
      logoEnabled,
      logoSize,
      logoUrl: finalLogoUrl,
    });
  };

  return {
    loading,
    qrName, setQrName,
    qrContent, setQrContent,
    qrColor, setQrColor,
    bgColor, setBgColor,
    shape, setShape,
    logoEnabled, setLogoEnabled,
    size, setSize,
    errorLevel, setErrorLevel,
    logoSize, setLogoSize,
    logoFile, setLogoFile,
    logoUrl, setLogoUrl,
    saveQR,
  };
}

