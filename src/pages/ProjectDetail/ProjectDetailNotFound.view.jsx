import { Link } from "react-router-dom";

export default function ProjectDetailNotFoundView({ ui }) {
  return (
    <div style={{ padding: "120px 60px", textAlign: "center" }}>
      <p style={{ color: "var(--muted)", fontFamily: "var(--font-m)" }}>
        {ui.notFound}
      </p>
      <Link to="/projects" style={{ color: "var(--accent)" }}>
        {ui.backList}
      </Link>
    </div>
  );
}
