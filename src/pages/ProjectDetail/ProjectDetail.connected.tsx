import { useParams } from "react-router-dom";
import { ProjectCatalogProvider } from "../../context/ProjectCatalogContext";
import { projectDetailContent } from "../../content/siteContent";
import { getProjectById, getNextProject } from "../../content/projects/index";
import { useLocale } from "../../i18n";
import ProjectDetailNotFoundView from "./ProjectDetailNotFound.view";
import ProjectDetailView from "./ProjectDetail.view";
import { splitLeadingHeroBlocks } from "./projectDetailUtils";

export default function ProjectDetailConnected() {
  const { id = "" } = useParams();
  const { locale } = useLocale();
  const ui = projectDetailContent[locale];
  const proj = getProjectById(id, locale);
  const next = proj ? getNextProject(proj.id, locale) : null;

  if (!proj) {
    return <ProjectDetailNotFoundView ui={ui} />;
  }

  const { heroBlocks, mainBlocks } = splitLeadingHeroBlocks(proj.blocks);
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
