import { Menu} from "lucide-react";
import "@/styles/nav/_nav.scss";

import { useState } from "react";
import NavMenu from "@/components/nav/NavMenu" 

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`menu-trigger ${open ? "open" : "closed"}`}>
      <button className={`${open ? "menu-button-active" : "menu-button"}`} onClick={() => setOpen((prev) => !prev)}>
        <Menu size={18} />
      </button>

      {open && (
        <NavMenu/>
      )}
    </aside>
  );
}
