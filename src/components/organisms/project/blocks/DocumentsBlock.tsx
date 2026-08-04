import { trackCta } from "../../../../lib/firebaseAnalytics";
import { useProjectCatalog } from "../../../../context/ProjectCatalogContext";

/**
 * Горизонтальный скроллер документов (договоры, подтверждения, NDA-safe PDF).
 * YAML: { type: "documents", items: [{ title, href, kind?, meta?, status? }] }
 * status: "available" | "on-request" (по умолчанию available если есть href)
 */
export default function DocumentsBlock({ block }) {
  const { locale } = useProjectCatalog();
  const openLabel = locale === "ru" ? "Открыть →" : "Open →";
  const requestLabel = locale === "ru" ? "По запросу / NDA" : "On request / NDA";
  const items = Array.isArray(block.items) ? block.items : [];
  if (!items.length) return null;

  return (
    <div className="pd-docs" role="region" aria-label="Documents">
      <div className="pd-docs-track">
        {items.map((item) => {
          const onRequest =
            item.status === "on-request" || !item.href || item.href === "#";
          const kind = item.kind || "document";
          const key = `${item.title}-${item.href || "req"}`;

          if (onRequest) {
            return (
              <div key={key} className="pd-doc-card pd-doc-card--muted">
                <span className="pd-doc-kind">{kind}</span>
                <span className="pd-doc-title">{item.title}</span>
                {item.meta ? <span className="pd-doc-meta">{item.meta}</span> : null}
                <span className="pd-doc-status">{requestLabel}</span>
              </div>
            );
          }

          return (
            <a
              key={key}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="pd-doc-card"
              onClick={() =>
                trackCta(
                  `project_doc_${String(item.title || "doc").replace(/\s+/g, "_")}`,
                  "project_documents",
                  item.href,
                  item.title
                )
              }
            >
              <span className="pd-doc-kind">{kind}</span>
              <span className="pd-doc-title">{item.title}</span>
              {item.meta ? <span className="pd-doc-meta">{item.meta}</span> : null}
              <span className="pd-doc-cta">{openLabel}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
