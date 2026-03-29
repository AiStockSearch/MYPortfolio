/**
 * Единая точка сборки каталога `/projects`: engagement с `portfolio` + внешние кейсы (Cosmo, Carelink, WLS).
 */
import { buildPortfolioDocumentFromEngagement } from "./engagementPortfolioDoc";
import { CAREER_TIMELINE_DEFINITIONS } from "./careerEngagements";
import { mirapolisEngagementDefinition } from "./mirapolis";
import { getStandaloneProjectDocsSorted } from "./standaloneProjectsYaml";

export function getAllRawPortfolioDocuments(): Record<string, unknown>[] {
  const fromMirapolis = buildPortfolioDocumentFromEngagement(mirapolisEngagementDefinition);
  const fromCareer = CAREER_TIMELINE_DEFINITIONS.map((def) =>
    buildPortfolioDocumentFromEngagement(def)
  ).filter((doc): doc is Record<string, unknown> => doc != null);
  return [
    ...(fromMirapolis ? [fromMirapolis] : []),
    ...fromCareer,
    ...getStandaloneProjectDocsSorted(),
  ];
}
