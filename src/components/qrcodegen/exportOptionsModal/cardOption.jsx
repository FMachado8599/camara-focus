import "./cardOption.scss";

export default function CardOption({
  label,
  value,
  current,
  onChange,
  disabled = false,
  icon = null, // opcional, por si mañana querés iconitos
}) {
  const active = value === current;

  const handleClick = () => {
    if (!disabled) onChange(value);
  };

  return (
    <div
      className={`
        card-option
        ${active ? "active" : ""}
        ${disabled ? "disabled" : ""}
      `}
      onClick={handleClick}
    >
      <div className="card-left">
        {icon && <span className="card-icon">{icon}</span>}
        <span className="card-label">{label}</span>
      </div>
    </div>
  );
}
