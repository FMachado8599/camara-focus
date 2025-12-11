import { useEffect, useState } from "react";
import { db } from "../../lib/firebase"; 
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Store from "./Store";
import "../../styles/store/_storePage.scss"

export default function StorePage() {
  const [savedQRs, setSavedQRs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQRs() {
      const ref = collection(db, "qrs");
      const snap = await getDocs(ref);
        const items = snap.docs.map((d) => {
        const data = d.data();

        return {
            id: d.id,
            ...data,
            updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
        };
        });

      setSavedQRs(items);
      setLoading(false);
    }

    loadQRs();
  }, []);

  const handleEdit = (qr) => {
    // Te va a llevar a: /edit/:id
    window.location.href = `/edit/${qr.id}`;
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro?")) return;

    await deleteDoc(doc(db, "qrs", id));
    setSavedQRs(savedQRs.filter((q) => q.id !== id));
  };

  const handleDuplicate = (qr) => {
    alert("Duplicar todavía no implementado");
  };

  const handleCreateNew = () => {
    window.location.href = "/create";
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <Store
        clasName="store-container"
      savedQRs={savedQRs}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onDuplicate={handleDuplicate}
      onCreateNew={handleCreateNew}
    />
  );
}
