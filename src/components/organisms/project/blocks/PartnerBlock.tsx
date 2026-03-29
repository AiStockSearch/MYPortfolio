import MediaImage from "../../../atoms/MediaImage";

export default function PartnerBlock({ block }) {
  const name = block.name || "";
  if (!name) return null;
  const inner = (
    <>
      {block.logoSrc ? (
        <MediaImage
          src={block.logoSrc}
          alt={block.logoAlt || name}
          className="pd-partner-logo"
          fallback={<span className="pd-partner-fallback">◆</span>}
        />
      ) : null}
      <span className="pd-partner-name">{name}</span>
    </>
  );
  return (
    <div className="pd-partner">
      {block.href ? (
        <a href={block.href} target="_blank" rel="noreferrer" className="pd-partner-link">
          {inner}
        </a>
      ) : (
        <div className="pd-partner-static">{inner}</div>
      )}
    </div>
  );
}
