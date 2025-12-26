import ContentSection from "./ContentSection"
import AppearanceSection from "./AppearanceSection"
import LogoSection from "./LogoSection"

const EditQRForm = (props) => {
  return (
    <div className="edit-panel">
      <div className="edit-panel-scroll">
        <ContentSection
          setQrContent={setQrContent}
        />
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
        />
      </div>
    </div>
  )
}

export default EditQRForm
