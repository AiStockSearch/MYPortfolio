export default function HomeSkillsSection({ skills, addRev }) {
  return (
    <section className="skills-s">
      <p className="sec-label" ref={addRev}>
        {skills.sec}
      </p>
      <h2 className="sec-title" ref={addRev}>
        {skills.title}
      </h2>
      <div className="sk-grid">
        {skills.blocks.map((s, i) => (
          <div
            className="sk-card reveal"
            key={`${s.cat}-${s.name}-${i}`}
            ref={addRev}
          >
            <p className="sk-cat">{s.cat}</p>
            <p className="sk-name">{s.name}</p>
            <div className="sk-tags">
              {s.tags.map((t, j) => (
                <span className="sk-tag" key={`${t}-${j}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
