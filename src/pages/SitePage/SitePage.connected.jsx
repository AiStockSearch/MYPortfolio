import { useParams } from "react-router-dom";
import { ProjectCatalogProvider } from "../../context/ProjectCatalogContext.jsx";
import {
  projectDetailContent,
  sitePageContent,
} from "../../content/siteContent.jsx";
import { getSitePageBySlug } from "../../content/sitePages/index.js";
import { useLocale } from "../../i18n.jsx";
import { splitLeadingHeroBlocks } from "../ProjectDetail/projectDetailUtils.js";
import SitePageNotFoundView from "./SitePageNotFound.view.jsx";
import SitePageView from "./SitePage.view.jsx";

export default function SitePageConnected() {
  const { slug } = useParams();
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
