import { useLayoutEffect, useRef } from "react";
import { MemoryRouter } from "react-router-dom";
import ProjectCard from "./ProjectCard.jsx";
import { PROJECTS_PAGE_STYLES } from "../../styles/projectsPageStyles.js";

const project = {
  id: "fixture-proj",
  type: "Mobile",
  name: "Fixture Wallet",
  tagline: "Cosmos preview card.",
  live: true,
  metrics: [
    { lbl: "DAU", val: "3.2k" },
    { lbl: "Stores", val: "4.6" },
  ],
  stack: ["RN", "TS", "Zustand", "Reanimated", "Detox"],
};

function Preview() {
  const wrapRef = useRef(null);
  useLayoutEffect(() => {
    const el = wrapRef.current?.querySelector("a.pc");
    el?.classList.add("vis");
  }, []);
  return (
    <MemoryRouter>
      <style>{PROJECTS_PAGE_STYLES}</style>
      <div ref={wrapRef} style={{ padding: 24, maxWidth: 400 }}>
        <ProjectCard
          project={project}
          liveLabel="Live"
          cta="Open →"
          index={0}
          to="/projects/fixture-proj"
        />
      </div>
    </MemoryRouter>
  );
}

export default <Preview />;
