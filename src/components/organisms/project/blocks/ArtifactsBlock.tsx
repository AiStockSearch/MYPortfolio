import { trackCta } from "../../../../lib/firebaseAnalytics";
import { useProjectCatalog } from "../../../../context/ProjectCatalogContext";

/**
 * Кастомные наработки / публичные артефакты (репо, демо, пакеты).
 * YAML: { type: "artifacts", items: [{ title, href, note?, badge? }] }
 */
export default function ArtifactsBlock({ block }) {
  const { locale } = useProjectCatalog();
  const openLabel = locale === "ru" ? "Открыть →" : "Open →";
  const items = Array.isArray(block.items) ? block.items : [];
  if (!items.length) return null;
  return (
    <div className="pd-artifacts">
      {items.map((item) => (
        <a
          key={item.href || item.title}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="pd-artifact"
          onClick={() =>
            trackCta(
              `project_artifact_${String(item.title || "link").replace(/\s+/g, "_")}`,
              "project_artifacts",
              item.href,
              item.title
            )
          }
        >
          {item.badge ? <span className="pd-artifact-badge">{item.badge}</span> : null}
          <span className="pd-artifact-title">{item.title}</span>
          {item.note ? <span className="pd-artifact-note">{item.note}</span> : null}
          <span className="pd-artifact-cta">{openLabel}</span>
        </a>
      ))}
    </div>
  );
}
