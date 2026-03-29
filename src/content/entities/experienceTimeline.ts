import {
  getCombinedPortfolioTagsForSlug,
  mergeUniqueTagStrings,
} from "../projects/index";
import { defineEngagement } from "./defineEngagement";
import type { CvExperienceRow, EngagementDefinition, EngagementLocale, HomeExpEntry } from "./types";
import { CAREER_TIMELINE_DEFINITIONS } from "./careerEngagements";
import { mirapolisEngagementDefinition } from "./mirapolis";
import { sortEngagementsByPeriodDesc } from "./periodSort";

/** Этапы из таймлайна только для self-hosted продуктов (не смешивать с трудовым таймлайном). */
export const SELF_HOSTED_ENGAGEMENT_IDS = new Set([
  "carelink",
  "cosmo-fusion-dao",
  "wls-trading",
]);

export function splitCareerAndSelfHosted(defs: EngagementDefinition[]) {
  const selfHosted: EngagementDefinition[] = [];
  const career: EngagementDefinition[] = [];
  for (const d of defs) {
    (SELF_HOSTED_ENGAGEMENT_IDS.has(d.id) ? selfHosted : career).push(d);
  }
  return { career, selfHosted };
}

function slugForEngagement(def: EngagementDefinition): string | null {
  if (SELF_HOSTED_ENGAGEMENT_IDS.has(def.id)) {
    return def.id;
  }
  const p = def.portfolio;
  if (!p) {
    return def.id;
  }
  return p.projectId ?? def.id;
}

function toHomeExp(def: EngagementDefinition, locale: EngagementLocale): HomeExpEntry {
  const entry = defineEngagement(def).homeExp(locale);
  const slug = slugForEngagement(def);
  const portfolioCombinedTags = slug
    ? getCombinedPortfolioTagsForSlug(slug, locale)
    : [];
  return {
    ...entry,
    ...(portfolioCombinedTags.length ? { portfolioCombinedTags } : {}),
  };
}

function toCvRow(
  def: EngagementDefinition,
  locale: EngagementLocale,
  kind: "employment" | "self-hosted"
): CvExperienceRow {
  const base = defineEngagement(def).cvExperience(locale);
  const slug = slugForEngagement(def);
  const achByArea = def.achByArea[locale];
  const stackByArea = def.stackByArea;
  const fromProject = slug ? getCombinedPortfolioTagsForSlug(slug, locale) : [];
  const tags = mergeUniqueTagStrings(fromProject, base.tags);
  return {
    ...base,
    tags,
    projectSlug: slug,
    achByArea,
    stackByArea,
    kind,
  };
}

export function homeCareerExperienceTimeline(locale: EngagementLocale): HomeExpEntry[] {
  const { career } = splitCareerAndSelfHosted(CAREER_TIMELINE_DEFINITIONS);
  const sorted = sortEngagementsByPeriodDesc([mirapolisEngagementDefinition, ...career], locale);
  return sorted.map((d) => toHomeExp(d, locale));
}

export function homeSelfHostedExperienceTimeline(locale: EngagementLocale): HomeExpEntry[] {
  const { selfHosted } = splitCareerAndSelfHosted(CAREER_TIMELINE_DEFINITIONS);
  return sortEngagementsByPeriodDesc(selfHosted, locale).map((d) => toHomeExp(d, locale));
}

/** @deprecated Используйте homeCareerExperienceTimeline + homeSelfHostedExperienceTimeline (раздельный блок на главной). */
export function homeExperienceTimeline(locale: EngagementLocale): HomeExpEntry[] {
  return [
    ...homeCareerExperienceTimeline(locale),
    ...homeSelfHostedExperienceTimeline(locale),
  ];
}

export function cvResumeExperienceTimeline(locale: EngagementLocale): CvExperienceRow[] {
  const { career, selfHosted } = splitCareerAndSelfHosted(CAREER_TIMELINE_DEFINITIONS);
  const employmentSorted = sortEngagementsByPeriodDesc(
    [mirapolisEngagementDefinition, ...career],
    locale
  );
  const selfSorted = sortEngagementsByPeriodDesc(selfHosted, locale);
  return [
    ...employmentSorted.map((d) => toCvRow(d, locale, "employment")),
    ...selfSorted.map((d) => toCvRow(d, locale, "self-hosted")),
  ];
}

/** @deprecated Имя сохранено для совместимости — равен cvResumeExperienceTimeline. */
export function cvExperienceTimeline(locale: EngagementLocale): CvExperienceRow[] {
  return cvResumeExperienceTimeline(locale);
}
