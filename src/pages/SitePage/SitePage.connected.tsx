import { useParams } from "react-router-dom";
import { ProjectCatalogProvider } from "../../context/ProjectCatalogContext";
import {
  projectDetailContent,
  sitePageContent,
} from "../../content/siteContent";
import { getSitePageBySlug } from "../../content/sitePages/index";
import { useLocale } from "../../i18n";
import { splitLeadingHeroBlocks } from "../ProjectDetail/projectDetailUtils";
import SitePageNotFoundView from "./SitePageNotFound.view";
import SitePageView from "./SitePage.view";

export default function SitePageConnected() {
  const { slug = "" } = useParams();
  const { locale } = useLocale();
  const ui = projectDetailContent[locale];
  const pageUi = sitePageContent[locale];
  const page = getSitePageBySlug(slug, locale);

  if (!page) {
    return <SitePageNotFoundView ui={pageUi} />;
  }

  const { heroBlocks, mainBlocks } = splitLeadingHeroBlocks(page.blocks);
  const catalogValue = { project: page, ui, locale };

  return (
    <ProjectCatalogProvider value={catalogValue}>
      <SitePageView
        pageUi={pageUi}
        ui={ui}
        proj={page}
        heroBlocks={heroBlocks}
        mainBlocks={mainBlocks}
      />
    </ProjectCatalogProvider>
  );
}
