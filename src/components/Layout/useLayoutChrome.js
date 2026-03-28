import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_CSS } from "../../styles/theme";

let stylesInjected = false;

export function useLayoutChrome() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const rafRef = useRef();

  useEffect(() => {
    if (!stylesInjected) {
      const el = document.createElement("style");
      el.textContent = BASE_CSS;
      document.head.appendChild(el);
      stylesInjected = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMove);
    const loop = () => {
      ringPos.current.x += (cursor.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (cursor.y - ringPos.current.y) * 0.1;
      setRing({ ...ringPos.current });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- следим за движением курсора для RAF
  }, [cursor.x, cursor.y]);

  return {
    path: location.pathname,
    scrolled,
    menuOpen,
    setMenuOpen,
    cursor,
    ring,
  };
}
