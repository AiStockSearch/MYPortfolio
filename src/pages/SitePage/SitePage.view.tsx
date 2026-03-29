import { Link } from "react-router-dom";
import ProjectBlockRenderer from "../../components/organisms/project/ProjectBlockRenderer";
import { PROJECT_DETAIL_PAGE_STYLES } from "../../styles/projectDetailPageStyles";

export default function SitePageView({
  pageUi,
  ui,
  proj,
  heroBlocks,
  mainBlocks,
}) {
  const hasHeaderAside = proj.metrics.length > 0 || proj.stack.length > 0;

  return (
    <>
      <style>{PROJECT_DETAIL_PAGE_STYLES}</style>
      <div className="pd-wrap">
        <Link to="/" className="pd-back">
          {pageUi.back}
        </Link>

        <div
          className="pd-header"
          style={
            hasHeaderAside ? undefined : { gridTemplateColumns: "1fr" }
          }
        >
          <div>
            {proj.type?.trim() ? (
              <p className="pd-type">{proj.type}</p>
            ) : null}
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
                >
                  {l.label} →
                </a>
              ))}
            </div>
          </div>
          {hasHeaderAside ? (
            <div className="pd-side">
              {proj.metrics.length > 0 ? (
                <div className="pd-metrics">
                  <p className="pd-metrics-title">{ui.keyResults}</p>
                  {proj.metrics.map((m) => (
                    <div className="pm-row" key={m.lbl}>
                      <span className="pm-key">{m.lbl}</span>
                      <span className="pm-val">{m.val}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              {proj.stack.length > 0 ? (
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
              ) : null}
            </div>
          ) : null}
        </div>

        {heroBlocks.length > 0 ? (
          heroBlocks.map((b, i) => (
            <ProjectBlockRenderer key={`hero-${i}`} block={b} />
          ))
        ) : (
          <ProjectBlockRenderer block={{ type: "heroImage" }} />
        )}

        <div className="pd-body" style={{ gridTemplateColumns: "1fr" }}>
          <div className="pd-main">
            {mainBlocks.map((b, i) => (
              <ProjectBlockRenderer key={`main-${i}`} block={b} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
