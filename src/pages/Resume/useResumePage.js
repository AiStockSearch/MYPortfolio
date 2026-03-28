import { useRef } from "react";

export function useResumePage() {
  const cvRef = useRef();
  const handlePrint = () => window.print();
  return { cvRef, handlePrint };
}
