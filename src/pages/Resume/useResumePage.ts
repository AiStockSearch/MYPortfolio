import { useRef } from "react";

export function useResumePage() {
  const cvRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = () => window.print();
  return { cvRef, handlePrint };
}
