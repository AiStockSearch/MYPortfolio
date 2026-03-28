import { useLayoutEffect, useRef, useState } from "react";
import { getAllProjects } from "../../content/projects/index.js";

export function filterSourceIds(active) {
  if (active === "All") return null;
  const q = active.toLowerCase();
  return getAllProjects("en")
    .filter(
      (p) =>
        p.type.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))
    )
    .map((p) => p.id);
}

export function useProjectsPage(locale) {
  const list = getAllProjects(locale);
  const [active, setActive] = useState("All");
  const gridRef = useRef(null);

  const allowedIds = filterSourceIds(active);
  const filtered =
    allowedIds === null
      ? list
      : list.filter((p) => allowedIds.includes(p.id));

  const filterKey = filtered.map((p) => p.id).join("|");

  useLayoutEffect(() => {
    const root = gridRef.current;
    if (!root) return undefined;
    const cards = root.querySelectorAll("a.pc");
    cards.forEach((el) => el.classList.remove("vis"));
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        });
      },
      { threshold: 0.08 }
    );
    cards.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filterKey]);

  return { active, setActive, filtered, gridRef };
}
