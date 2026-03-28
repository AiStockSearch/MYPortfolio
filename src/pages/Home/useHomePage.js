import { useEffect, useRef } from "react";
import { useTypewriter } from "./useTypewriter.js";

export function useHomePage(lines) {
  const { text, done } = useTypewriter(lines);
  const expRefs = useRef([]);
  const revRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        }),
      { threshold: 0.1 }
    );
    [...expRefs.current, ...revRefs.current].forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addExp = (el) => {
    if (el && !expRefs.current.includes(el)) expRefs.current.push(el);
  };
  const addRev = (el) => {
    if (el && !revRefs.current.includes(el)) revRefs.current.push(el);
  };

  return { typewriterText: text, typewriterDone: done, addExp, addRev };
}
