import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Store from "./Store";
import "../../styles/store/_storePage.scss";
import { useNavigate } from "react-router-dom";
import { deleteQR, getAllQRs } from "@/services/qr.service";

export default function StorePage() {
  const [savedQRs, setSavedQRs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadQRs = async () => {
    setLoading(true);
    const items = await getAllQRs();
    setSavedQRs(items);
    setLoading(false);
  };


  useEffect(() => {
    loadQRs();
  }, []);

  const handleEdit = (qr) => {
    navigate(`/qr/${qr.id}/edit`);
  };

  const handleDelete = async (id) => {
    await deleteQR(id);
    setSavedQRs(prev => prev.filter(q => q.id !== id));
  };


  const handleDuplicate = (qr) => {
    alert("Duplicar todavía no implementado");
  };

  const handleCreateNew = () => {
    navigate("/");
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <Store
      className="store-container"
      savedQRs={savedQRs}
      onCreateNew={handleCreateNew}
      onDelete={handleDelete}
    />
  );
}
