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
        {skills.blocks.map((s) => (
          <div className="sk-card reveal" key={s.name} ref={addRev}>
            <p className="sk-cat">{s.cat}</p>
            <p className="sk-name">{s.name}</p>
            <div className="sk-tags">
              {s.tags.map((t) => (
                <span className="sk-tag" key={t}>
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
