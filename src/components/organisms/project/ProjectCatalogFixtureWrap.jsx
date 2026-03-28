import { ProjectCatalogProvider } from "../../../context/ProjectCatalogContext.jsx";
import { PROJECT_DETAIL_PAGE_STYLES } from "../../../styles/projectDetailPageStyles.js";
import { projectCatalogMock } from "./projectCatalogMock.js";

export function ProjectCatalogFixtureWrap({ children }) {
  return (
    <ProjectCatalogProvider value={projectCatalogMock}>
      <style>{PROJECT_DETAIL_PAGE_STYLES}</style>
      <div className="pd-wrap" style={{ padding: 24, maxWidth: 900 }}>
        {children}
      </div>
    </ProjectCatalogProvider>
  );
}
