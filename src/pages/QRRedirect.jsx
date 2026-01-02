import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect } from "react";

export default function QRRedirect() {
  const { id } = useParams();

  useEffect(() => {
    const run = async () => {
      const snap = await getDoc(doc(db, "qrs", id));

      if (!snap.exists()) {
        window.location.href = "/404";
        return;
      }

      const { destination } = snap.data();
      window.location.href = destination;
    };

    run();
  }, [id]);

  return null;
}
