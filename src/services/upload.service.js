export async function uploadLogo(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:5173/api/upload-logo", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return res.json();
}

