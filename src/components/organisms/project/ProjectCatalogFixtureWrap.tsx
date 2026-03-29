import { ProjectCatalogProvider } from "../../../context/ProjectCatalogContext";
import { PROJECT_DETAIL_PAGE_STYLES } from "../../../styles/projectDetailPageStyles";
import { projectCatalogMock } from "./projectCatalogMock";

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
