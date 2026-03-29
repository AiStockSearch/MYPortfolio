import { Link } from "react-router-dom";

export default function HomeHeroSection({
  typewriterText,
  typewriterDone,
  hero,
}) {
  return (
    <section className="hero">
      <div className="h-grid" />
      <div className="h-glow" />
      <div className="h-glow2" />
      <div className="h-term">
        <span className="pr">❯</span>
        <span className="cmd">{typewriterText}</span>
        {!typewriterDone && <span className="h-cb" />}
      </div>
      <p className="h-lbl">{hero.avail}</p>
      <h1 className="h-name">
        Vyacheslav
        <br />
        <span className="ghost">Yakimov</span>
      </h1>
      <p className="h-sub">
        {hero.subPre}
        <span className="hl">{hero.subHL}</span>
        {hero.subMid}
        <br />
        <span className="hl2">{hero.subHighlight}</span>
        {hero.subAfterWeb3}
      </p>
      <div className="h-cta">
        <Link to="/projects" className="btn-p">
          {hero.ctaProjects}
        </Link>
        <Link to="/contact" className="btn-s">
          {hero.ctaContact}
        </Link>
      </div>
      <div className="h-stats">
        {hero.stats.map(([n, l]) => (
          <div key={l}>
            <div className="s-num">{n}</div>
            <div className="s-lbl">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
