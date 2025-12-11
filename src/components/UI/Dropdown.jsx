import { useState, useRef, useEffect } from "react";

export function Dropdown({ trigger, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && <div className="dropdown-content">{children}</div>}
    </div>
  );
}

export function DropdownItem({ children, onClick }) {
  return (
    <div className="dropdown-item" onClick={onClick}>
      {children}
    </div>
  );
}
