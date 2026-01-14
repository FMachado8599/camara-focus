import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function searchEmojis(search) {
  if (!search) return [];

  const q = query(
    collection(db, "emojis"),
    orderBy("name"),
    where("name", ">=", search.toLowerCase()),
    where("name", "<=", search.toLowerCase() + "\uf8ff"),
    limit(50)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
