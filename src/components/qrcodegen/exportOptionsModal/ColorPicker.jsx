import "./colorPicker.scss";
import { useState } from "react";

import { Copy, Trash2 } from "lucide-react";

function ColorPicker({ color: colorProp, id, onDelete, onUpdate, simple }) {
  const initialInputValue =
    colorProp.length === 4 ? colorProp.toUpperCase() : colorProp.toUpperCase();
  const initialColor =
    colorProp.length === 4
      ? expandHex(colorProp.toUpperCase())
      : colorProp.toUpperCase();

  const [inputValue, setInputValue] = useState(initialInputValue);
  const [color, setColor] = useState(initialColor);

  function isValidHex(value) {
    return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);
  }

  function expandHex(shortHex) {
    const hex = shortHex.replace("#", "");
    return "#" + hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  function handleTextInputChange(e) {
    let newValue = e.target.value.trim().toUpperCase();

    if (!newValue.startsWith("#")) {
      newValue = `#${newValue}`;
    }

    setInputValue(newValue);

    const hexOnly = newValue.slice(1);

    if (isValidHex(hexOnly)) {
      onUpdate(id, newValue);

      const finalColor = hexOnly.length === 3 ? expandHex(newValue) : newValue;
      setColor(finalColor);
    }
  }

  function handleColorChange(event) {
    const newColor = event.target.value.toUpperCase();
    setColor(newColor);
    setInputValue(newColor);
    onUpdate(id, newColor);
  }

  function copyColorToClipboard() {
    navigator.clipboard
      .writeText(color.toUpperCase())
      .then(() => {
        console.log("Color copiado al portapapeles:", color.toUpperCase());
      })
      .catch((err) => {
        console.error("Error al copiar el color:", err);
      });
  }

  return (
    <div className={styles["color-display"]}>
      <input
        type="text"
        value={inputValue.toUpperCase()}
        onChange={handleTextInputChange}
        maxLength={7}
        className={`${styles["color-text-input"]} pr-5 py-3 pl-10`}
      />

      <div className={styles["color-display-box-container"]}>
        <div
          style={{ backgroundColor: color }}
          className={styles["color-display-box-overlay"]}
        />
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className={styles["color-display-box"]}
        />
      </div>

      {!simple && (
        <div className="absolute top-1/2 ... flex gap-3 items-center">
          <button onClick={copyColorToClipboard}>
            <Copy size={14} className={styles["icon-copy"]} />
          </button>
          <button onClick={() => onDelete(id)}>
            <Trash2 size={14} classname={styles["icon-delete"]} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;