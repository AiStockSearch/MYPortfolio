import { Link } from "react-router-dom";
import MediaImage from "../../atoms/MediaImage.jsx";

export default function HomeFeaturedProjectsSection({ work, featList, addRev }) {
  return (
    <section className="feat-s">
      <p className="sec-label" ref={addRev}>
        {work.sec}
      </p>
      <h2 className="sec-title" ref={addRev}>
        {work.title}
      </h2>
      <div className="feat-grid">
        {featList.map((p) => (
          <Link
            to={`/projects/${p.id}`}
            className="feat-card reveal"
            key={p.id}
            ref={addRev}
          >
            <div className="fc-img-wrap">
              <MediaImage
                src={`/projects/${p.id}.png`}
                alt={p.name}
                className="fc-img"
                fallback={<div className="fc-ph">⬡</div>}
              />
              <span className="fc-type">{p.type}</span>
              {p.live && <span className="fc-live">{work.live}</span>}
            </div>
            <div className="fc-body">
              <p className="fc-name">{p.name}</p>
              <p className="fc-desc">{p.tagline}</p>
              <div className="fc-stack">
                {p.stack.slice(0, 4).map((t) => (
                  <span className="fcs" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="feat-more">
        <Link to="/projects" className="btn-s">
          {work.more}
        </Link>
      </div>
    </section>
  );
}
