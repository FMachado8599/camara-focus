// utils/ean13.js

/**
 * Calcula el dígito verificador de un código EAN13
 * Recibe solo los primeros 12 dígitos
 */
export function calculateChecksum(code12) {
  const digits = code12.split("").map(Number);

  let sumOdd = 0;
  let sumEven = 0;

  digits.forEach((digit, index) => {
    const position = index + 1;

    if (position % 2 === 0) {
      sumEven += digit;    // posiciones pares
    } else {
      sumOdd += digit;     // posiciones impares
    }
  });

  const total = sumOdd + sumEven * 3;
  return (10 - (total % 10)) % 10;
}

/**
 * Para códigos de 12 dígitos:
 * → devuelve el EAN13 completo (con checksum generado)
 */
export function buildEAN13(code12) {
  if (!/^\d{12}$/.test(code12)) {
    throw new Error("El código debe tener exactamente 12 dígitos numéricos.");
  }

  const checksum = calculateChecksum(code12);
  return code12 + checksum;
}

/**
 * Valida un EAN13 completo.
 * Si está bien devuelve true, si está mal devuelve false.
 */
export function validateEAN13(code13) {
  if (!/^\d{13}$/.test(code13)) {
    return false;
  }

  const body = code13.slice(0, 12);
  const givenDigit = Number(code13[12]);
  const correctDigit = calculateChecksum(body);

  return givenDigit === correctDigit;
}

export function downloadSVG (svgNode, filename = "barcode.svg") {
  if (!svgNode) return;

  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svgNode);

  const blob = new Blob([source], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export function downloadPNG (svgNode, scale = 3, filename = "barcode.png") {
  if (!svgNode) return;

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgNode);

  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const pngURL = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = pngURL;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  img.src = url;
}


