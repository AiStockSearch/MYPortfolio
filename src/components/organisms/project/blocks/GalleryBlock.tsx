import MediaImage from "../../../atoms/MediaImage";

/**
 * Галерея скриншотов (например, из карточки приложения в сторе):
 * узкие «телефонные» кадры сеткой, без обрезки.
 * { type: "gallery", title?, icon?, caption?, items: [{ src, alt? }] }
 */
export default function GalleryBlock({ block }) {
  const items = Array.isArray(block.items)
    ? block.items.filter((it) => it && typeof it.src === "string" && it.src)
    : [];
  if (!items.length) return null;
  const hasHead = Boolean(block.icon || block.title);
  return (
    <figure className="pd-gallery">
      {hasHead ? (
        <div className="pd-gallery-head">
          {block.icon ? (
            <img
              src={block.icon}
              alt=""
              className="pd-gallery-icon"
              loading="lazy"
              decoding="async"
            />
          ) : null}
          {block.title ? <span className="pd-gallery-title">{block.title}</span> : null}
        </div>
      ) : null}
      <div className="pd-gallery-grid">
        {items.map((it) => (
          <div className="pd-gallery-item" key={it.src}>
            <MediaImage
              src={it.src}
              alt={it.alt || ""}
              className="pd-gallery-img"
              fallback={<div className="pd-img-ph">⬡</div>}
            />
          </div>
        ))}
      </div>
      {block.caption ? (
        <figcaption className="pd-figure-cap">{block.caption}</figcaption>
      ) : null}
    </figure>
  );
}
