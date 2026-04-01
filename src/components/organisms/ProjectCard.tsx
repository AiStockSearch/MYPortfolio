import { Link } from "react-router-dom";
import { trackCta } from "../../lib/firebaseAnalytics";
import AccentTag from "../atoms/AccentTag";
import MediaImage from "../atoms/MediaImage";
import { projectCoverSrc } from "../../utils/projectCoverSrc";

/**
 * Карточка проекта в сетке. Стили классов .pc-* задаёт страница (projectsPage.styles.js).
 */
export default function ProjectCard({ project, liveLabel, cta, index, to }) {
  const p = project;
  return (
    <Link
      to={to}
      className="pc"
      style={{ transitionDelay: `${(index % 3) * 0.08}s` }}
      onClick={() =>
        trackCta(`project_card_${p.id}`, "projects_grid", to, p.name)
      }
    >
      <div className="pc-img-w">
        <MediaImage
          src={projectCoverSrc(p.id)}
          alt={p.name}
          className="pc-img"
          fallback={<div className="pc-ph">⬡</div>}
        />
        <span className="pc-type">{p.type}</span>
        {p.live && <span className="pc-live">{liveLabel}</span>}
      </div>
      <div className="pc-body">
        <p className="pc-name">{p.name}</p>
        <p className="pc-desc">{p.tagline}</p>
        <div className="pc-metrics">
          {p.metrics.map((m) => (
            <div className="pcm" key={m.lbl}>
              <div className="pcm-v">{m.val}</div>
              <div className="pcm-l">{m.lbl}</div>
            </div>
          ))}
        </div>
        <div className="pc-stack">
          {p.stack.slice(0, 5).map((t) => (
            <AccentTag key={t}>{t}</AccentTag>
          ))}
        </div>
        <span className="pc-cta">{cta}</span>
      </div>
    </Link>
  );
}
