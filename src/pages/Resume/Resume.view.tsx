import { Link } from "react-router-dom";
import { useMemo, useState, type ReactNode, type Ref, type RefObject } from "react";
import MediaImage from "../../components/atoms/MediaImage";
import { CONTACT_EMAIL } from "../../constants/links";
import { mergeUniqueTagStrings } from "../../content/projects/index";
import {
  entryHasCvArea,
  mergeAchBuckets,
  mergeStackBuckets,
} from "../../utils/cvExpAreaFilter";
import { renderMarkdown } from "../../utils/renderMarkdown";
import { RESUME_PAGE_STYLES } from "../../styles/resumePageStyles";

type CvExpAreaTab = "front" | "mobile" | "backend" | "selfHosted";

function CvLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      {...(href.startsWith("mailto:")
        ? {}
        : { target: "_blank", rel: "noreferrer" })}
    >
      {children}
    </a>
  );
}

export default function ResumeView({
  cv,
  cvRef,
  handlePrint,
}: {
  /** Payload из getResumeData — слабо типизирован намеренно. */
  cv: Record<string, any> | null;
  cvRef: RefObject<HTMLDivElement | null>;
  handlePrint: () => void;
}) {
  if (!cv) {
    return (
      <p style={{ padding: 80, color: "var(--muted)" }}>
        Нет данных: добавьте src/content/resume/cv.js
      </p>
    );
  }

  const { referenceLinks } = cv;
  const expArea = (cv.expArea ?? {}) as Record<string, string>;
  const [expTab, setExpTab] = useState<CvExpAreaTab>("mobile");

  const filteredExperience = useMemo(() => {
    const list = cv.experience as Array<Record<string, unknown>>;
    if (expTab === "selfHosted") {
      return list.filter((e) => e.kind === "self-hosted");
    }
    return list.filter((e) => {
      if (e.kind === "self-hosted") return false;
      const ach = e.achByArea as
        | Partial<Record<"front" | "mobile" | "backend", string[]>>
        | undefined;
      const stack = e.stackByArea as
        | Partial<Record<"front" | "mobile" | "backend", string[]>>
        | undefined;
      if (!ach || !stack) return true;
      return entryHasCvArea(
        {
          front: ach.front ?? [],
          mobile: ach.mobile ?? [],
          backend: ach.backend ?? [],
        },
        {
          front: stack.front ?? [],
          mobile: stack.mobile ?? [],
          backend: stack.backend ?? [],
        },
        expTab
      );
    });
  }, [cv.experience, expTab]);

  return (
    <>
      <style>{RESUME_PAGE_STYLES}</style>
      <div className="resume-page">
        <div className="resume-header">
          <div>
            <p className="sec-label">{cv.secLabel}</p>
            <h1 className="sec-title" style={{ marginBottom: 0 }}>
              {cv.title}
            </h1>
          </div>
          <div className="resume-actions">
            <button
              type="button"
              className="ra-btn primary"
              onClick={handlePrint}
            >
              {cv.printBtn}
            </button>
            <a href="/cv.pdf" className="ra-btn" download>
              {cv.downloadCv}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="ra-btn">
              {cv.contactBtn}
            </a>
          </div>
          <p
            className="resume-print-hint"
            style={{
              fontSize: "0.62rem",
              color: "var(--muted)",
              marginTop: 12,
              maxWidth: 480,
              letterSpacing: "0.04em",
              lineHeight: 1.6,
            }}
          >
            {cv.printHint}
          </p>
        </div>

        <div className="cv" ref={cvRef as Ref<HTMLDivElement>}>
          <div className="cv-top">
            <div>
              <h1 className="cv-name">Vyacheslav Yakimov</h1>
              <p className="cv-title">{cv.cvTitle}</p>
              <div className="cv-contact">
                {cv.contactLinks.map((row) => (
                  <CvLink key={row.href + row.label} href={row.href}>
                    {row.label}
                  </CvLink>
                ))}
                <span>{cv.location}</span>
              </div>
            </div>
            <div className="cv-photo">
              <MediaImage
                src="/photo.jpg"
                alt=""
                fallback={<span style={{ opacity: 0.35 }}>◉</span>}
              />
            </div>
          </div>

          <div className="cv-section">
            <p className="cv-sec-title">{cv.profileTitle}</p>
            <p className="cv-summary" style={{ whiteSpace: "pre-line" }}>
              {cv.profileBody}
            </p>
          </div>

          <div className="cv-section">
            <p className="cv-sec-title">{cv.expTitle}</p>
            <div
              className="cv-stack-switch"
              role="tablist"
              aria-label={expArea.aria ?? ""}
            >
              {(
                [
                  ["front", expArea.front ?? "Front"],
                  ["mobile", expArea.mobile ?? "Mobile"],
                  ["backend", expArea.backend ?? "Backend"],
                  ["selfHosted", expArea.selfHosted ?? "Self-hosted"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={expTab === key}
                  className={`cv-stack-sw${expTab === key ? " on" : ""}`}
                  onClick={() => setExpTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            {expTab === "selfHosted" ? (
              <p className="cv-exp-sh">{expArea.selfHostedHeading}</p>
            ) : null}
            {filteredExperience.length === 0 ? (
              <p className="cv-exp-empty">{expArea.noMatches}</p>
            ) : null}
            {filteredExperience.map((row, i) => {
              const e = row as {
                role: string;
                company: string;
                period: string;
                desc: string;
                ach: string[];
                tags: string[];
                projectSlug?: string | null;
                achByArea?: {
                  front: string[];
                  mobile: string[];
                  backend: string[];
                };
                stackByArea?: {
                  front: string[];
                  mobile: string[];
                  backend: string[];
                };
                kind?: string;
              };
              let bullets: string[] = e.ach;
              let areaTags: string[] = [];
              if (expTab === "selfHosted" && e.achByArea) {
                bullets = mergeAchBuckets(e.achByArea);
              } else if (expTab !== "selfHosted" && e.achByArea) {
                bullets = e.achByArea[expTab] ?? [];
                if (bullets.length === 0) bullets = e.ach;
              }
              if (expTab === "selfHosted" && e.stackByArea) {
                areaTags = mergeStackBuckets(e.stackByArea);
              } else if (expTab !== "selfHosted" && e.stackByArea) {
                areaTags = e.stackByArea[expTab] ?? [];
              }
              const displayTags = mergeUniqueTagStrings(e.tags, areaTags);
              return (
                <div className="cv-exp-item" key={`${e.period}-${e.company}-${i}`}>
                  <div className="cv-exp-header">
                    <span className="cv-exp-role">{e.role}</span>
                    <span className="cv-exp-period">{e.period}</span>
                  </div>
                  <p className="cv-exp-company">{e.company}</p>
                  <p
                    className="cv-exp-desc"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(e.desc || ""),
                    }}
                  />
                  {e.projectSlug ? (
                    <p className="cv-exp-case-wrap">
                      <CvLink
                        href={`/projects/${e.projectSlug}`}
                        className="cv-exp-case"
                      >
                        {expArea.caseStudy ?? "Case →"}
                      </CvLink>
                    </p>
                  ) : null}
                  <ul className="cv-exp-ach">
                    {bullets.map((a, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: a }} />
                    ))}
                  </ul>
                  <div className="cv-exp-tags">
                    {displayTags.map((t, k) => (
                      <span className="cv-etag" key={`${t}-${k}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cv-section">
            <p className="cv-sec-title">{cv.skillsTitle}</p>
            <div className="cv-skills-grid">
              {cv.skillGroups.map((g) => (
                <div className="cv-skill-group" key={g.title}>
                  <p className="cv-sg-title">{g.title}</p>
                  <div
                    className="cv-sg-list"
                    dangerouslySetInnerHTML={{
                      __html: `<p>${renderMarkdown(g.list || "")}</p>`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {referenceLinks.sectionTitle && referenceLinks.items.length > 0 ? (
            <div className="cv-section">
              <p className="cv-sec-title">{referenceLinks.sectionTitle}</p>
              <ul className="cv-ref-list">
                {referenceLinks.items.map((item) => (
                  <li className="cv-ref-item" key={item.href + item.label}>
                    <CvLink href={item.href}>{item.label}</CvLink>
                    {item.note ? (
                      <span className="cv-ref-note">{item.note}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="cv-section">
            <p className="cv-sec-title">{cv.eduTitle}</p>
            {cv.education.map((e, i) => (
              <div className="cv-edu-item" key={i}>
                <p className="cv-edu-deg">{e.deg}</p>
                <p className="cv-edu-inst">{e.inst}</p>
                <p className="cv-edu-year">{e.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
