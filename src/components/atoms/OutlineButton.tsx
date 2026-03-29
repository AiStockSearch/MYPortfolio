import type { ReactNode } from "react";

/** Требует глобального подключения OUTLINE_BUTTON_STYLES (см. outlineButton.styles.ts). */
export default function OutlineButton({
  active,
  onClick,
  children,
  type = "button",
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
}) {
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
