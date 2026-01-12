import { getDownloadURL, ref } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";

async function loadEmojis(db, storage) {
  const snapshot = await getDocs(collection(db, "emojis"));
  return Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      const url = await getDownloadURL(ref(storage, data.imagePath));
      return { ...data, url };
    })
  );
}
