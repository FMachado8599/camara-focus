import re

EMOJI_FILE = "emoji-test.txt"
OUTPUT = "emoji_list.txt"

emojis = []

with open(EMOJI_FILE, "r", encoding="utf-8") as f:
    for line in f:
        if line.startswith("#") or not line.strip():
            continue

        if "fully-qualified" not in line:
            continue

        # Ejemplo: 1F496 ; fully-qualified     # 💖 sparkling heart
        match = re.search(r"#\s+(.*?)\s", line)
        if not match:
            continue

        emoji = match.group(1)

        # descartamos compuestos
        if "\u200d" in emoji:
            continue

        # descartamos tonos de piel
        if any(tone in emoji for tone in ["🏻","🏼","🏽","🏾","🏿"]):
            continue

        emojis.append(emoji)

with open(OUTPUT, "w", encoding="utf-8") as f:
    for e in emojis:
        f.write(e + "\n")

print(f"Listo. Emojis base: {len(emojis)}")
