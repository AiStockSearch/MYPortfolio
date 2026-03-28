export default function HomeExperienceSection({ career, exp, addExp, addRev }) {
  return (
    <section className="exp-s">
      <p className="sec-label" ref={addRev}>
        {career.sec}
      </p>
      <h2 className="sec-title" ref={addRev}>
        {career.title}
      </h2>
      <div className="exp-tl">
        {exp.map((e, i) => (
          <div
            className="exp-item"
            key={i}
            ref={addExp}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="exp-meta">
              <p className="exp-period">{e.period}</p>
              <p className="exp-co">{e.company}</p>
            </div>
            <div className="exp-c">
              <p className="exp-role">
                {e.role}
                <span className="exp-etag">{e.tag}</span>
              </p>
              <p className="exp-desc">{e.desc}</p>
              <ul className="exp-ach">
                {e.ach.map((a, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: a }} />
                ))}
              </ul>
              <div className="exp-stack">
                {e.stack.map((t) => (
                  <span className="est" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
