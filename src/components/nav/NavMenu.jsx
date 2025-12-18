import { Link } from "react-router-dom";
import { TextSearch, Settings, Smile, Brush } from "lucide-react";

function NavMenu() {
    return (
        <div className="menu-dropdown">
            <div className="menu-dropdown-section">
                <div className="menu-links enabled">
                    <TextSearch size={16} />
                    <Link to="/store" onClick={() => setOpen(false)}>
                        QR Guardados
                    </Link>
                </div>
                <div className="menu-links">
                    <Brush  size={16} />
                    <Link to="/store" onClick={() => setOpen(false)}>
                        Iconos
                    </Link>
                </div>
                <div className="menu-links">
                    <Smile size={16} />
                    <Link to="/store" onClick={() => setOpen(false)}>
                        Emojis
                    </Link>
                </div>
                <div className="menu-links">
                    <Settings size={16} />
                    <p to="/store" onClick={() => setOpen(false)}>
                        Settings
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NavMenu