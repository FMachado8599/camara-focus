import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export async function loadEmojisPage(db, storage, lastDoc = null) {
  let q = query(
    collection(db, "emojis"),
    orderBy("codepoint"),
    limit(10)
  );

  if (lastDoc) {
    q = query(
      collection(db, "emojis"),
      orderBy("codepoint"),
      startAfter(lastDoc),
      limit(10)
    );
  }

  const snapshot = await getDocs(q);

  const emojis = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      const url = await getDownloadURL(ref(storage, data.imagePath));
      return { id: doc.id, ...data, url };
    })
  );

  return {
    emojis,
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
  };
}

