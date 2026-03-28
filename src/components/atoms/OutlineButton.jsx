/** Требует глобального подключения OUTLINE_BUTTON_STYLES (см. outlineButton.styles.js). */
export default function OutlineButton({ active, onClick, children, type = "button" }) {
  return (
    <button
      type={type}
      className={`atm-ob${active ? " on" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
