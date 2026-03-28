import { Link } from "react-router-dom";
import { Trans } from "@lingui/macro";
import { renderMarkdown } from "../../utils/renderMarkdown.js";
import { BLOG_POST_PAGE_STYLES } from "../../styles/blogPostPageStyles.js";

export default function BlogPostView({ post, prev, next, dateLocale }) {
  return (
    <>
      <style>{BLOG_POST_PAGE_STYLES}</style>
      <div className="bp-wrap">
        <Link to="/blog" className="bp-back">
          <Trans>← Blog</Trans>
        </Link>

        {post.draft && (
          <div className="bp-draft-banner">
            <Trans>⚠ Draft — this article is not yet published</Trans>
          </div>
        )}

        <div className="bp-header">
          <p className="bp-cat">{post.categoryDisplay}</p>
          <h1 className="bp-title">{post.title}</h1>
          {post.subtitle && <p className="bp-sub">{post.subtitle}</p>}
          <div className="bp-meta">
            {post.date && (
              <span className="bp-date">
                {new Date(post.date).toLocaleDateString(dateLocale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            {post.readTime && (
              <span className="bp-read">{post.readTime}</span>
            )}
          </div>
          <div className="bp-tags">
            {(post.tags || []).map((t) => (
              <span className="bpt" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {post.body ? (
          <div
            className="bp-content"
            dangerouslySetInnerHTML={{
              __html: `<p>${renderMarkdown(post.body)}</p>`,
            }}
          />
        ) : (
          <p
            className="bp-content"
            style={{ color: "var(--muted)", fontStyle: "italic" }}
          >
            <Trans>Article in progress…</Trans>
          </p>
        )}

        <div className="bp-nav">
          {prev ? (
            <Link to={`/blog/${prev.id}`}>← {prev.title}</Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/blog/${next.id}`}>{next.title} →</Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </>
  );
}
