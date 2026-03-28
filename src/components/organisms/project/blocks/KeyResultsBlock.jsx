import { useProjectCatalog } from "../../../../context/ProjectCatalogContext.jsx";

export default function KeyResultsBlock({ block }) {
  const { ui } = useProjectCatalog();
  const items = Array.isArray(block.items) ? block.items : [];
  if (!items.length) return null;
  return (
    <div className="pd-inline-metrics">
      <p className="pd-metrics-title">{ui.keyResults}</p>
      {items.map((m) => (
        <div className="pm-row" key={`${m.lbl}-${m.val}`}>
          <span className="pm-key">{m.lbl}</span>
          <span className="pm-val">{m.val}</span>
        </div>
      ))}
    </div>
  );
}
