import { Link } from "react-router-dom";

export default function SitePageNotFoundView({ ui }) {
  return (
    <div style={{ padding: "120px 60px", textAlign: "center" }}>
      <p style={{ color: "var(--muted)", fontFamily: "var(--font-m)" }}>
        {ui.notFound}
      </p>
      <Link to="/" style={{ color: "var(--accent)" }}>
        {ui.backHome}
      </Link>
    </div>
  );
}
