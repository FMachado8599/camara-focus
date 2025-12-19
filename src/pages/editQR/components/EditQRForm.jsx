import ContentSection from "./ContentSection"
import AppearanceSection from "./AppearanceSection"
import LogoSection from "./LogoSection"

const EditQRForm = (props) => {
  return (
    <div className="edit-panel">
      <div className="edit-panel-scroll">
        <ContentSection {...props} />
        <AppearanceSection {...props} />
        <LogoSection {...props} />
      </div>
    </div>
  )
}

export default EditQRForm
