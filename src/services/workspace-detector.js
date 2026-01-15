export function isWindows() {
  // Método moderno
  if (navigator.userAgentData?.platform) {
    return navigator.userAgentData.platform === "Windows";
  }

  // Fallback legacy
  return /windows/i.test(navigator.userAgent);
}

function isSafari() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium");
}

function isFirefox() {
  return /firefox/i.test(navigator.userAgent);
}

function isChromium() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("chrome") || ua.includes("chromium") || ua.includes("edg");
}


export function shouldDownloadInsteadOfCopy() {
  const windows = isWindows();
  const safari = isSafari();
  const firefox = isFirefox();
  const chromium = isChromium();

  if (windows) {
    return true; // Windows nunca copia
  }

  if (safari || firefox) {
    return true; // En Mac/Linux, Safari y Firefox descargan
  }

  if (chromium) {
    return false; // En Mac/Linux, Chromium copia
  }

  return true;
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
