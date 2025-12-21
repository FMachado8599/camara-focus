export function copyQRLink(destination) {
  navigator.clipboard.writeText(destination);
}

export function downloadQR(qr) {
  const link = document.createElement("a");
  link.href = qr.thumbnail;
  link.download = `${qr.name}.png`;
  link.click();
}
