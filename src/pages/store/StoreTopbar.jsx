import { Link } from "react-router-dom";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import { Plus, Search, Undo2 } from "lucide-react";

import "@/styles/store/_storeTopbar.scss";

function StoreTopbar({ searchQuery, setSearchQuery, onCreateNew }) {
  return (
    <div className="store-topbar ">
      <Link to="/">
       <Undo2 size={14} />
      </Link>
      <h1 className="topbar-title">Mis QRs</h1>

      <div className="search-section">
        <Button onClick={onCreateNew} className="add-code">
          <Plus size={14} className="plus" />
        </Button>
        <div className="search-bar">
          <Search className="search-icon" size={14} />
          <Input
            placeholder="Buscar por nombre, tipo o destino..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input neumorphic-inset"
          />
        </div>
      </div>
    </div>
  );
}

export default StoreTopbar;
