import MediaImage from "../../atoms/MediaImage";

export default function HomeAboutSection({ about, addRev }) {
  return (
    <section className="about-s">
      <div className="about-wrap">
        <div>
          <p className="sec-label">{about.sec}</p>
          <h2 className="sec-title">
            {about.title.split("\n").map((line, i, arr) => (
              <span key={line}>
                {line}
                {i < arr.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>
          <p
            className="about-text"
            ref={addRev}
            dangerouslySetInnerHTML={{ __html: about.p1Html }}
          />
          <p
            className="about-text"
            ref={addRev}
            dangerouslySetInnerHTML={{ __html: about.p2Html }}
          />
          <p
            className="about-text"
            ref={addRev}
            dangerouslySetInnerHTML={{ __html: about.p3Html }}
          />
          <div className="about-badges" ref={addRev}>
            {about.badges.map((b) => (
              <span className="abadge" key={b}>
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="about-pw">
          <div className="about-photo">
            <MediaImage
              src="/photo.jpg"
              alt="Vyacheslav Yakimov"
              fallback={
                <div className="photo-ph">
                  <span className="ph-icon">◉</span>
                  <span>{about.photoPh}</span>
                </div>
              }
            />
          </div>
          <div className="ac tl" />
          <div className="ac br" />
          <div className="about-tag">{about.tag}</div>
        </div>
      </div>
    </section>
  );
}
