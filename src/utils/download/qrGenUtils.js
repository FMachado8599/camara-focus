import { nanoid } from "nanoid";

export function handleDownload(options) {

  const { format, size, margin } = options

  const svg = document.getElementById("qr-generated");

  if (!svg) {
    alert("No hay QR generado todavía 😅");
    return;
  }

  const clone = svg.cloneNode(true);

  clone.setAttribute("width", size);
  clone.setAttribute("height", size);

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);

  if (format === "svg") {
    downloadSVG(svgString, size);
  } else if (format === "png") {
    downloadPNG(svgString, size);
  }

};

function downloadSVG(svgString, size) {
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `qr-${size}.svg`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}


function downloadPNG(svgString, size) {
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, size, size);

    URL.revokeObjectURL(url);

    const pngUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `qr-${size}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  img.src = url;
}

export function serializeSvg(svgElement) {
  if (!svgElement) throw new Error("SVG element is null");

  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgElement);
}

export function generateQrId() {
  return nanoid(8);
}

