import HeroImageBlock from "./blocks/HeroImageBlock.jsx";
import SectionBlock from "./blocks/SectionBlock.jsx";
import ProseBlock from "./blocks/ProseBlock.jsx";
import KeyResultsBlock from "./blocks/KeyResultsBlock.jsx";
import TechStackBlock from "./blocks/TechStackBlock.jsx";
import PartnerBlock from "./blocks/PartnerBlock.jsx";
import AppLinksBlock from "./blocks/AppLinksBlock.jsx";
import ImageBlock from "./blocks/ImageBlock.jsx";

const BLOCKS = {
  heroImage: HeroImageBlock,
  section: SectionBlock,
  prose: ProseBlock,
  keyResults: KeyResultsBlock,
  techStack: TechStackBlock,
  partner: PartnerBlock,
  appLinks: AppLinksBlock,
  image: ImageBlock,
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
