import MediaImage from "../../../atoms/MediaImage";
import { useProjectCatalog } from "../../../../context/ProjectCatalogContext";

export default function HeroImageBlock({ block }) {
  const { project } = useProjectCatalog();
  const src = block.src || `/projects/${project.id}.png`;
  const alt = block.alt || project.name;
  return (
    <div className="pd-img">
      <MediaImage
        src={src}
        alt={alt}
        className="pd-img-inner"
        fallback={<div className="pd-img-ph">⬡</div>}
      />
    </div>
  );
}
