import { projectsPageContent } from "../../content/siteContent";
import { useLocale } from "../../i18n";
import ProjectsPageView from "./ProjectsPage.view";
import { useProjectsPage } from "./useProjectsPage";

export default function ProjectsPageConnected() {
  const { locale } = useLocale();
  const ui = projectsPageContent[locale];
  const { active, setActive, filtered, gridRef } = useProjectsPage(locale);

  return (
    <ProjectsPageView
      ui={ui}
      active={active}
      setActive={setActive}
      filtered={filtered}
      gridRef={gridRef}
    />
  );
}
