import { db } from "../lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function getQRById(id) {
  const ref = doc(db, "qrs", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();

  return {
    id: snap.id,
    ...data,
    updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
  };
}

export async function updateQR(id, updates) {
  const ref = doc(db, "qrs", id);

  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteQR(id) {
  const ref = doc(db, "qrs", id);
  await deleteDoc(ref);
}
