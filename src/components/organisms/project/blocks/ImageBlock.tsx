import MediaImage from "../../../atoms/MediaImage";

export default function ImageBlock({ block }) {
  if (!block.src) return null;
  return (
    <figure className="pd-figure">
      <div className="pd-figure-img-wrap">
        <MediaImage
          src={block.src}
          alt={block.alt || ""}
          className="pd-figure-img"
          fallback={<div className="pd-img-ph">⬡</div>}
        />
      </div>
      {block.caption ? (
        <figcaption className="pd-figure-cap">{block.caption}</figcaption>
      ) : null}
    </figure>
  );
}
