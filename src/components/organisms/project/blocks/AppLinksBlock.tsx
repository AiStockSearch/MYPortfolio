import { trackCta } from "../../../../lib/firebaseAnalytics";

export default function AppLinksBlock({ block }) {
  const items = Array.isArray(block.items) ? block.items : [];
  if (!items.length) return null;
  return (
    <div className="pd-app-links">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="pd-app-link"
          onClick={() =>
            trackCta(
              `project_app_${(item.label || "link").replace(/\s+/g, "_")}`,
              "project_app_links",
              item.href,
              item.label
            )
          }
        >
          {item.label} →
        </a>
      ))}
    </div>
  );
}
