import { useProjectCatalog } from "../../../../context/ProjectCatalogContext.jsx";

export default function TechStackBlock({ block }) {
  const { ui } = useProjectCatalog();
  const tags = Array.isArray(block.tags) ? block.tags : [];
  if (!tags.length) return null;
  return (
    <div className="pd-inline-stack">
      <p className="pd-stack-title">{ui.techStack}</p>
      <div className="pd-stags">
        {tags.map((t) => (
          <span className="pd-stag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
