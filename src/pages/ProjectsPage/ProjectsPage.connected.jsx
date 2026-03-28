import { projectsPageContent } from "../../content/siteContent.jsx";
import { useLocale } from "../../i18n.jsx";
import ProjectsPageView from "./ProjectsPage.view.jsx";
import { useProjectsPage } from "./useProjectsPage.js";

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
