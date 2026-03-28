import { Link } from "react-router-dom";
import { Trans } from "@lingui/macro";

export default function BlogPostNotFoundView() {
  return (
    <div style={{ padding: "120px 60px", textAlign: "center" }}>
      <p style={{ color: "var(--muted)", fontFamily: "var(--font-m)" }}>
        <Trans>Article not found</Trans>
      </p>
      <Link to="/blog" style={{ color: "var(--accent)" }}>
        <Trans>← Back to blog</Trans>
      </Link>
    </div>
  );
}
