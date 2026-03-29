import { MemoryRouter } from "react-router-dom";
import { getAllProjects } from "../../content/projects/index";
import { projectDetailContent } from "../../content/siteContent";
import { ProjectCatalogProvider } from "../../context/ProjectCatalogContext";
import { getNextProject } from "../../content/projects/index";
import ProjectDetailView from "./ProjectDetail.view";
import { splitLeadingHeroBlocks } from "./projectDetailUtils";

const locale = "en";
const proj = getAllProjects(locale)[0];
const ui = projectDetailContent[locale];
const next = proj ? getNextProject(proj.id, locale) : null;
const { heroBlocks, mainBlocks } = splitLeadingHeroBlocks(proj.blocks);
const roleVal = proj.role?.trim() ? proj.role : ui.roleVal;

export default (
  <MemoryRouter initialEntries={[`/projects/${proj.id}`]}>
    <ProjectCatalogProvider value={{ project: proj, ui, locale }}>
      <ProjectDetailView
        ui={ui}
        proj={proj}
        next={next}
        roleVal={roleVal}
        heroBlocks={heroBlocks}
        mainBlocks={mainBlocks}
      />
    </ProjectCatalogProvider>
  </MemoryRouter>
);
