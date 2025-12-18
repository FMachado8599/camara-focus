import { Menu, TextSearch, Settings } from "lucide-react";
import "@/styles/nav/_nav.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`menu-trigger ${open ? "open" : "closed"}`}>
      <button className="menu-button" onClick={() => setOpen((prev) => !prev)}>
        <Menu size={18} />
      </button>

      {open && (
        <div className="menu-dropdown">
          <div className="menu-dropdown-section">
            <div className="menu-links avaitable">
              <TextSearch size={16} />
              <Link to="/store" onClick={() => setOpen(false)}>
                QR Guardados
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
      )}
    </aside>
  );
}
