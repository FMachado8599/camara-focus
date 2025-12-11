export default async function handler(req, res) {

  // cargar firebase-admin dinámico (CJS)
  const { db } = await import("../lib/firebaseAdmin.cjs");

  // obtener el ID desde la URL real
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  const id = url.pathname.split("/").pop();

  try {
    const ref = db.collection("qrs").doc(id);
    const snapshot = await ref.get();

    if (!snapshot.exists) {
      return res.status(404).send("QR not found");
    }

    const data = snapshot.data();
    const destination = data.destination;

    if (!destination) {
      return res.status(400).send("No destination set for this QR");
    }

    res.writeHead(302, { Location: destination });
    res.end();
  } catch (err) {
    console.error("Redirect error:", err);
    res.status(500).send("Internal Server Error");
  }
}


