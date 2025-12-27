import ContentSection from "./ContentSection";
import AppearanceSection from "./AppearanceSection";
import LogoSection from "./LogoSection";

const EditQRForm = ({
  qrContent,
  setQrContent,
  qrColor,
  setQrColor,
  bgColor,
  setBgColor,
  shape,
  setShape,
  logoEnabled,
  setLogoEnabled,
  size,
  setSize,
  errorLevel,
  setErrorLevel,
  logoSize,
  setLogoSize,
  logoFile,
  setLogoFile,
  logoUrl,
  setLogoUrl,
}) => {
  return (
    <div className="edit-panel">
      <div className="edit-panel-scroll">
        <ContentSection qrContent={qrContent} setQrContent={setQrContent} />
        <AppearanceSection
          qrColor={qrColor}
          setQrColor={setQrColor}
          bgColor={bgColor}
          setBgColor={setBgColor}
          size={size}
          setSize={setSize}
          errorLevel={errorLevel}
          setErrorLevel={setErrorLevel}
        />
        <LogoSection
          logoEnabled={logoEnabled}
          setLogoEnabled={setLogoEnabled}
          logoSize={logoSize}
          setLogoSize={setLogoSize}
          logoFile={logoFile}
          setLogoFile={setLogoFile}
          logoUrl={logoUrl}
          setLogoUrl={setLogoUrl}
        />
      </div>
    </div>
  );
};

export default EditQRForm;
