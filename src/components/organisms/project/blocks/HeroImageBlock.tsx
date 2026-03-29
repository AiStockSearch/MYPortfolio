import MediaImage from "../../../atoms/MediaImage";
import { useProjectCatalog } from "../../../../context/ProjectCatalogContext";
import { projectCoverSrc } from "../../../../utils/projectCoverSrc";

export default function HeroImageBlock({ block }) {
  const { project } = useProjectCatalog();
  const src =
    (typeof block.src === "string" && block.src) || projectCoverSrc(String(project.id));
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
