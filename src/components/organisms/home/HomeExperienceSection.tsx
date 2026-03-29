import { useEffect, useMemo, useRef, useState } from "react";
import { mergeUniqueTagStrings } from "../../../content/projects/index";
import type { AreaBuckets, HomeExpEntry } from "../../../content/entities/types";

const STACK_AREAS = [
  { key: "front", labelKey: "stackFront" },
  { key: "mobile", labelKey: "stackMobile" },
  { key: "backend", labelKey: "stackBackend" },
  { key: "selfHosted", labelKey: "stackSelfHosted" },
] as const;

type StackAreaKey = (typeof STACK_AREAS)[number]["key"];

function mergeAch(a: AreaBuckets): string[] {
  return [...a.front, ...a.mobile, ...a.backend];
}

function mergeStack(s: AreaBuckets): string[] {
  return [...s.front, ...s.mobile, ...s.backend];
}

function entryHasAreaContent(e: HomeExpEntry, area: Exclude<StackAreaKey, "selfHosted">): boolean {
  const bullets = e.achByArea[area] ?? [];
  const tags = e.stackByArea[area] ?? [];
  return bullets.length > 0 || tags.length > 0;
}

export default function HomeExperienceSection({
  career,
  exp,
  selfHostedExp = [],
  addExp,
  addRev,
}: {
  career: Record<string, string>;
  exp: HomeExpEntry[];
  selfHostedExp?: HomeExpEntry[];
  addExp: (el: HTMLElement | null) => void;
  addRev: (el: HTMLElement | null) => void;
}) {
  const [stackArea, setStackArea] = useState<StackAreaKey>("mobile");
  const tlRef = useRef<HTMLDivElement>(null);

  const filteredExp = useMemo(() => {
    if (stackArea === "selfHosted") {
      return selfHostedExp;
    }
    return exp.filter((e) => entryHasAreaContent(e, stackArea));
  }, [exp, selfHostedExp, stackArea]);

  /** Смена вкладки монтирует новые `.exp-item`; пере-подписываем observer, иначе нет класса `vis`. */
  useEffect(() => {
    const root = tlRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("vis");
        });
      },
      { threshold: 0.1 }
    );
    root.querySelectorAll(":scope > .exp-item").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filteredExp, stackArea]);

  return (
    <section className="exp-s">
      <p className="sec-label" ref={addRev}>
        {career.sec}
      </p>
      <h2 className="sec-title" ref={addRev}>
        {career.title}
      </h2>
      <div
        className="exp-stack-switch"
        role="tablist"
        aria-label={career.stackSwitcherAria}
      >
        {STACK_AREAS.map(({ key, labelKey }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={stackArea === key}
            className={`exp-stack-sw${stackArea === key ? " on" : ""}`}
            onClick={() => setStackArea(key)}
          >
            {career[labelKey]}
          </button>
        ))}
      </div>
      <div className="exp-tl" ref={tlRef}>
        {stackArea === "selfHosted" && selfHostedExp.length > 0 ? (
          <p className="exp-sh-head">{career.selfHostedHeading}</p>
        ) : null}
        {filteredExp.length === 0 ? (
          <p className="exp-tl-empty">{career.stackNoMatches}</p>
        ) : null}
        {filteredExp.map((e, i) => {
          const isSelf = stackArea === "selfHosted";
          const bullets = isSelf
            ? mergeAch(e.achByArea)
            : e.achByArea[stackArea as keyof AreaBuckets] ?? [];
          const areaStackTags = isSelf
            ? mergeStack(e.stackByArea)
            : e.stackByArea[stackArea as keyof AreaBuckets] ?? [];
          const portfolioTags = e.portfolioCombinedTags ?? [];
          const tags = mergeUniqueTagStrings(portfolioTags, areaStackTags);
          return (
            <div
              className="exp-item"
              key={`${e.period}-${e.company}-${stackArea}-${i}`}
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
                {bullets.length > 0 ? (
                  <ul className="exp-ach">
                    {bullets.map((a, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: a }} />
                    ))}
                  </ul>
                ) : null}
                <div className="exp-stack">
                  {tags.length > 0 ? (
                    <div className="exp-stack-tags">
                      {tags.map((t) => (
                        <span className="est" key={`${stackArea}-${t}-${i}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="exp-stack-empty">{career.stackEmpty}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
