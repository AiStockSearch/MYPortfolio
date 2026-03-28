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
        >
          {item.label} →
        </a>
      ))}
    </div>
  );
}
