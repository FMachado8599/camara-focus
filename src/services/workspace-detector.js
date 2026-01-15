export function shouldDownloadInsteadOfCopy() {
  const ua = navigator.userAgent.toLowerCase();

  const isSafari =
    ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium");

  const isFirefox = ua.includes("firefox");

  const isWindows = ua.includes("windows");

  const isChromium = ua.includes("chrome") || ua.includes("edg");

  // Safari o Firefox: siempre descargar
  if (isSafari || isFirefox) return true;

  // Windows sin Chromium: descargar
  if (isWindows && !isChromium) return true;

  return false; // copiar permitido
}

export function downloadBlob(blob, filename = "emoji.png") {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
