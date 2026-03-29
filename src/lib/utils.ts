/** Утилита для классов (совместимость с shadcn CLI / `components.json`). */
export type ClassValue = string | number | boolean | null | undefined;

export function cn(...inputs: ClassValue[]) {
  return inputs.flat().filter(Boolean).join(" ");
}
