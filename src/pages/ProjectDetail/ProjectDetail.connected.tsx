import { useParams } from "react-router-dom";
import { ProjectCatalogProvider } from "../../context/ProjectCatalogContext";
import { projectDetailContent } from "../../content/siteContent";
import { documentsForProject } from "../../content/documents/catalog";
import { getProjectById, getNextProject } from "../../content/projects/index";
import { useLocale } from "../../i18n";
import ProjectDetailNotFoundView from "./ProjectDetailNotFound.view";
import ProjectDetailView from "./ProjectDetail.view";
import { splitLeadingHeroBlocks } from "./projectDetailUtils";

function withCatalogDocuments(
  blocks: Record<string, unknown>[],
  projectId: string,
  locale: "ru" | "en"
) {
  const alreadyHasDocs = blocks.some((b) => b?.type === "documents");
  if (alreadyHasDocs) return blocks;
  const items = documentsForProject(projectId, locale);
  if (!items.length) return blocks;
  return [
    ...blocks,
    { type: "section", sectionKey: "documents" },
    { type: "documents", items },
  ];
}

export default function ProjectDetailConnected() {
  const { id = "" } = useParams();
  const { locale } = useLocale();
  const ui = projectDetailContent[locale];
  const proj = getProjectById(id, locale);
  const next = proj ? getNextProject(proj.id, locale) : null;

  if (!proj) {
    return <ProjectDetailNotFoundView ui={ui} />;
  }

  const blocksWithDocs = withCatalogDocuments(
    (proj.blocks || []) as Record<string, unknown>[],
    proj.id,
    locale
  );
  const { heroBlocks, mainBlocks } = splitLeadingHeroBlocks(blocksWithDocs);
  const catalogValue = { project: proj, ui, locale };
  const roleVal = proj.role?.trim() ? proj.role : ui.roleVal;

  return (
    <ProjectCatalogProvider value={catalogValue}>
      <ProjectDetailView
        ui={ui}
        proj={proj}
        next={next}
        roleVal={roleVal}
        heroBlocks={heroBlocks}
        mainBlocks={mainBlocks}
      />
    </ProjectCatalogProvider>
  );
}
