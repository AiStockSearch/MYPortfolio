import { MemoryRouter } from "react-router-dom";
import { getAllProjects } from "../../content/projects/index.js";
import { projectDetailContent } from "../../content/siteContent.jsx";
import { ProjectCatalogProvider } from "../../context/ProjectCatalogContext.jsx";
import { getNextProject } from "../../content/projects/index.js";
import ProjectDetailView from "./ProjectDetail.view.jsx";
import { splitLeadingHeroBlocks } from "./projectDetailUtils.js";

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
