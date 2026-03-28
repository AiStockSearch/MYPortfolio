import OutlineButton from "../../components/atoms/OutlineButton.jsx";
import ProjectCard from "../../components/organisms/ProjectCard.jsx";
import { PROJECTS_PAGE_STYLES } from "../../styles/projectsPageStyles.js";

export default function ProjectsPageView({
  ui,
  active,
  setActive,
  filtered,
  gridRef,
}) {
  return (
    <>
      <style>{PROJECTS_PAGE_STYLES}</style>
      <div className="proj-page">
        <div className="proj-hero">
          <p className="sec-label">{ui.sec}</p>
          <h1 className="sec-title" style={{ marginBottom: 0 }}>
            {ui.title}
          </h1>
        </div>
        <div className="proj-filters">
          {ui.filters.map((f) => (
            <OutlineButton
              key={f.id}
              active={active === f.id}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </OutlineButton>
          ))}
        </div>
        <div className="proj-grid" ref={gridRef}>
          {filtered.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              liveLabel={ui.live}
              cta={ui.cta}
              index={i}
              to={`/projects/${p.id}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
