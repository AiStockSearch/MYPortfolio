/**
 * Единый источник данных по «этапам карьеры» для главной, резюме и кейсов портфеля.
 *
 * - Карьерные этапы: YAML в `yaml/engagements/timeline/` + `mirapolis-lms.yaml`; сборка в `careerEngagements.ts` / `mirapolis.ts`.
 * - Standalone кейсы: любой `yaml/projects/*.yaml` попадает в каталог (`getStandaloneProjectDocsSorted`).
 * - Каталог `/projects`: `getAllRawPortfolioDocuments` в `careerPortfolioSource.ts`.
 */
export type {
  AreaBuckets,
  CvExperienceRow,
  EngagementDefinition,
  EngagementLocale,
  EngagementPortfolio,
  HomeExpEntry,
  PortfolioRichLocale,
} from "./types";
export { defineEngagement, flattenStackTags } from "./defineEngagement";
export { PROJECT_CATALOG_ORDER, type ProjectCatalogOrderKey } from "./projectCatalogOrder";
export { CAREER_TIMELINE_DEFINITIONS } from "./careerEngagements";
export { getCarelinkProjectDoc } from "./carelinkProject";
export { getCosmoFusionDaoProjectDoc } from "./cosmoFusionDaoProject";
export {
  cvExperienceTimeline,
  cvResumeExperienceTimeline,
  homeCareerExperienceTimeline,
  homeExperienceTimeline,
  homeSelfHostedExperienceTimeline,
  SELF_HOSTED_ENGAGEMENT_IDS,
  splitCareerAndSelfHosted,
} from "./experienceTimeline";
export {
  buildPortfolioDocumentFromEngagement,
} from "./engagementPortfolioDoc";
export { getAllRawPortfolioDocuments } from "./careerPortfolioSource";
export { getStandaloneProjectDocsSorted } from "./standaloneProjectsYaml";
export {
  mirapolisCvExperience,
  mirapolisEngagementDefinition,
  mirapolisHomeExp,
} from "./mirapolis";
export { getWlsTradingProjectDoc } from "./wlsTradingProject";
