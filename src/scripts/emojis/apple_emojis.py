import os
from AppKit import (
    NSAttributedString,
    NSFont,
    NSImage,
    NSColor,
    NSGraphicsContext,
    NSBitmapImageRep,
    NSPNGFileType,
    NSMakeRect,
)
print(">>> SCRIPT ARRANCÓ <<<")

# CONFIG
SIZE = 1024           # tamaño final del PNG
FONT_SIZE = 900       # tamaño del emoji dentro del canvas
OUTPUT_DIR = "apple_emojis_png"
EMOJI_FILE = "emoji_list.txt"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Fuente Apple Emoji
font = NSFont.fontWithName_size_("AppleColorEmoji", FONT_SIZE)

with open(EMOJI_FILE, "r", encoding="utf-8") as f:
    emojis = [line.strip() for line in f if line.strip()]

for emoji in emojis:
    # Imagen base
    image = NSImage.alloc().initWithSize_((SIZE, SIZE))
    image.lockFocus()

    NSGraphicsContext.currentContext().setShouldAntialias_(True)
    NSColor.clearColor().set()

    # Texto emoji
    attrs = {
        "NSFont": font
    }
    text = NSAttributedString.alloc().initWithString_attributes_(emoji, attrs)

    # Centrado óptico aproximado (funciona MUY bien)
    text_size = text.size()
    x = (SIZE - text_size.width) / 2
    y = (SIZE - text_size.height) / 2 - FONT_SIZE * 0.08

    text.drawAtPoint_((x, y))

    image.unlockFocus()

    # Exportar PNG
    tiff = image.TIFFRepresentation()
    bitmap = NSBitmapImageRep.imageRepWithData_(tiff)
    png = bitmap.representationUsingType_properties_(NSPNGFileType, None)

    codepoint = "-".join(f"{ord(c):x}" for c in emoji)
    out_path = os.path.join(OUTPUT_DIR, f"{codepoint}.png")

    png.writeToFile_atomically_(out_path, True)

    print(f"Exportado: {emoji} -> {out_path}")

print("✔ Listo. Emojis Apple renderizados.")
