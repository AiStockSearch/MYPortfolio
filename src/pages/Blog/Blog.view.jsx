import { Link } from "react-router-dom";
import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { BLOG_PAGE_STYLES } from "../../styles/blogPageStyles.js";

export default function BlogView({
  active,
  setActive,
  filtered,
  published,
  drafts,
  dateLocale,
  catOptions,
}) {
  const { i18n } = useLingui();

  return (
    <>
      <style>{BLOG_PAGE_STYLES}</style>
      <div className="blog-page">
        <div className="blog-hero">
          <div className="blog-hero-left">
            <p className="sec-label">
              <Trans>writing</Trans>
            </p>
            <h1 className="sec-title" style={{ marginBottom: 0 }}>
              <Trans>Blog & Notes</Trans>
            </h1>
            <p className="blog-count">
              <Trans>
                {published} published · {drafts} drafts
              </Trans>
            </p>
          </div>
        </div>

        <div className="blog-cats">
          {catOptions.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`bc-btn${active === id ? " on" : ""}`}
              onClick={() => setActive(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {filtered.map((p) => (
            <Link
              to={`/blog/${p.id}`}
              className={`bcard${p.draft ? " draft" : ""}`}
              key={p.id}
            >
              <div className="bc-meta">
                <span className="bc-cat">{p.categoryDisplay}</span>
                <span className="bc-read">
                  {p.readTime || i18n._(msg`— min`)}
                </span>
              </div>
              <p className="bc-date">
                {p.date
                  ? new Date(p.date).toLocaleDateString(dateLocale, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </p>
              <p className="bc-title">
                {p.title}
                {p.draft && (
                  <span className="bc-draft-badge">
                    <Trans>Draft</Trans>
                  </span>
                )}
              </p>
              {p.subtitle && <p className="bc-sub">{p.subtitle}</p>}
              <p className="bc-excerpt">{p.excerpt}</p>
              <div className="bc-tags">
                {(p.tags || []).map((t) => (
                  <span className="bct" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <span className="bc-link">
                {p.draft ? (
                  <Trans>Preview draft →</Trans>
                ) : (
                  <Trans>Read article →</Trans>
                )}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
