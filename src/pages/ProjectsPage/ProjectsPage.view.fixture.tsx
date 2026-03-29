import { useLayoutEffect, useRef } from "react";
import { MemoryRouter } from "react-router-dom";
import ProjectsPageView from "./ProjectsPage.view";

const ui = {
  sec: "// WORK",
  title: "Selected projects",
  live: "Live",
  cta: "View case →",
  filters: [
    { id: "All", label: "All" },
    { id: "Mobile", label: "Mobile" },
  ],
};

const mockProjects = [
  {
    id: "demo-a",
    type: "Mobile",
    name: "Demo App",
    tagline: "Short description for the card layout.",
    live: true,
    metrics: [
      { lbl: "Users", val: "12k" },
      { lbl: "Rating", val: "4.8" },
    ],
    stack: ["React Native", "TypeScript", "Redux"],
  },
  {
    id: "demo-b",
    type: "Web",
    name: "Second Project",
    tagline: "Another card to test the grid.",
    live: false,
    metrics: [{ lbl: "Uptime", val: "99.9%" }],
    stack: ["React", "Node"],
  },
];

function ViewWithRef() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const root = gridRef.current;
    if (!root) return;
    root.querySelectorAll("a.pc").forEach((el) => el.classList.add("vis"));
  }, []);
  return (
    <MemoryRouter>
      <ProjectsPageView
        ui={ui}
        active="All"
        setActive={() => {}}
        filtered={mockProjects}
        gridRef={gridRef}
      />
    </MemoryRouter>
  );
}

export default {
  Grid: <ViewWithRef />,
};
