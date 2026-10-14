import HeroImageBlock from "./blocks/HeroImageBlock";
import SectionBlock from "./blocks/SectionBlock";
import ProseBlock from "./blocks/ProseBlock";
import KeyResultsBlock from "./blocks/KeyResultsBlock";
import TechStackBlock from "./blocks/TechStackBlock";
import PartnerBlock from "./blocks/PartnerBlock";
import AppLinksBlock from "./blocks/AppLinksBlock";
import ImageBlock from "./blocks/ImageBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import ArtifactsBlock from "./blocks/ArtifactsBlock";
import DocumentsBlock from "./blocks/DocumentsBlock";

const BLOCKS = {
  heroImage: HeroImageBlock,
  section: SectionBlock,
  prose: ProseBlock,
  keyResults: KeyResultsBlock,
  techStack: TechStackBlock,
  partner: PartnerBlock,
  appLinks: AppLinksBlock,
  image: ImageBlock,
  gallery: GalleryBlock,
  artifacts: ArtifactsBlock,
  documents: DocumentsBlock,
};

export default function ProjectBlockRenderer({ block }) {
  if (!block || typeof block.type !== "string") return null;
  const C = BLOCKS[block.type];
  if (!C) {
    if (import.meta.env.DEV) {
      console.warn("[ProjectBlockRenderer] unknown block type:", block.type);
    }
    return null;
  }
  return <C block={block} />;
}
