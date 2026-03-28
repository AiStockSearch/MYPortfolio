import { Link } from "react-router-dom";
import AccentTag from "../atoms/AccentTag.jsx";
import MediaImage from "../atoms/MediaImage.jsx";

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
    >
      <div className="pc-img-w">
        <MediaImage
          src={`/projects/${p.id}.png`}
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
