import { Link } from "react-router-dom";
import ProjectBlockRenderer from "../../components/organisms/project/ProjectBlockRenderer";
import { trackCta } from "../../lib/firebaseAnalytics";
import { PROJECT_DETAIL_PAGE_STYLES } from "../../styles/projectDetailPageStyles";

export default function ProjectDetailView({
  ui,
  proj,
  next,
  roleVal,
  heroBlocks,
  mainBlocks,
}) {
  return (
    <>
      <style>{PROJECT_DETAIL_PAGE_STYLES}</style>
      <div className="pd-wrap">
        <Link
          to="/projects"
          className="pd-back"
          onClick={() => trackCta("project_back", `project_${proj.id}`, "/projects", ui.back)}
        >
          {ui.back}
        </Link>

        <div className="pd-header">
          <div>
            <p className="pd-type">{proj.type}</p>
            <h1 className="pd-title">{proj.name}</h1>
            <p className="pd-tagline">{proj.tagline}</p>
            <div className="pd-links">
              {proj.links.map((l) => (
                <a
                  key={`${l.href}-${l.label}`}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`pdl${l.primary ? " primary" : ""}`}
                  onClick={() =>
                    trackCta(
                      `project_link_${l.label.replace(/\s+/g, "_")}`,
                      `project_${proj.id}`,
                      l.href,
                      l.label
                    )
                  }
                >
                  {l.label} →
                </a>
              ))}
            </div>
          </div>
          <div className="pd-side">
            <div className="pd-metrics">
              <p className="pd-metrics-title">{ui.keyResults}</p>
              {proj.metrics.map((m) => (
                <div className="pm-row" key={m.lbl}>
                  <span className="pm-key">{m.lbl}</span>
                  <span className="pm-val">{m.val}</span>
                </div>
              ))}
            </div>
            <div className="pd-stack-box">
              <p className="pd-stack-title">{ui.techStack}</p>
              <div className="pd-stags">
                {proj.stack.map((t) => (
                  <span className="pd-stag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {heroBlocks.length > 0 ? (
          heroBlocks.map((b, i) => (
            <ProjectBlockRenderer key={`hero-${i}`} block={b} />
          ))
        ) : (
          <ProjectBlockRenderer block={{ type: "heroImage" }} />
        )}

        <div className="pd-body">
          <div className="pd-main">
            {mainBlocks.map((b, i) => (
              <ProjectBlockRenderer key={`main-${i}`} block={b} />
            ))}
          </div>
          <div className="pd-sidebar">
            <div className="pd-info-box">
              <p className="pib-label">{ui.status}</p>
              <p className="pib-val">{proj.live ? ui.live : ui.dev}</p>
            </div>
            <div className="pd-info-box">
              <p className="pib-label">{ui.category}</p>
              <p className="pib-val">{proj.type}</p>
            </div>
            <div className="pd-info-box">
              <p className="pib-label">{ui.role}</p>
              <p className="pib-val">{roleVal}</p>
            </div>
          </div>
        </div>

        {next && (
          <div className="pd-next">
            <div>
              <p className="pd-next-lbl">{ui.next}</p>
              <Link
                to={`/projects/${next.id}`}
                onClick={() =>
                  trackCta(`project_next_${next.id}`, `project_${proj.id}`, `/projects/${next.id}`, next.name)
                }
              >
                <p className="pd-next-name">{next.name} →</p>
              </Link>
            </div>
            <Link
              to="/projects"
              className="btn-s"
              onClick={() =>
                trackCta("project_all", `project_${proj.id}`, "/projects", ui.allProjects)
              }
            >
              {ui.allProjects}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
