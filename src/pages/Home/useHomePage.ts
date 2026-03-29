import { useCallback, useEffect, useRef } from "react";
import { useTypewriter } from "./useTypewriter";

function pruneRefs(list: HTMLElement[]) {
  const next = list.filter((el) => el?.isConnected);
  list.length = 0;
  list.push(...next);
}

export function useHomePage(lines: string[], locale: string) {
  const { text, done } = useTypewriter(lines);
  const expRefs = useRef<HTMLElement[]>([]);
  const revRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    pruneRefs(expRefs.current);
    pruneRefs(revRefs.current);

    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        }),
      { threshold: 0.1 }
    );
    [...expRefs.current, ...revRefs.current].forEach((el) => {
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [locale]);

  const addExp = useCallback((el: HTMLElement | null) => {
    if (el && !expRefs.current.includes(el)) expRefs.current.push(el);
  }, []);
  const addRev = useCallback((el: HTMLElement | null) => {
    if (el && !revRefs.current.includes(el)) revRefs.current.push(el);
  }, []);

  return { typewriterText: text, typewriterDone: done, addExp, addRev };
}
