import type {
  AreaBuckets,
  CvExperienceRow,
  EngagementDefinition,
  EngagementLocale,
  HomeExpEntry,
} from "./types";

/**
 * По описанию engagement возвращает функции для главной и резюме.
 * Кейс в `/projects`: поле `portfolio` на `EngagementDefinition` + `careerPortfolioSource`.
 */
function resolveHomeTag(
  tag: EngagementDefinition["homeTag"],
  locale: EngagementLocale
): string {
  return typeof tag === "string" ? tag : tag[locale];
}

export function defineEngagement(def: EngagementDefinition) {
  return {
    id: def.id,
    homeExp(locale: EngagementLocale): HomeExpEntry {
      return {
        period: def.period[locale],
        company: def.homeCompany[locale],
        tag: resolveHomeTag(def.homeTag, locale),
        role: def.role[locale],
        desc: def.shortDesc[locale],
        achByArea: def.achByArea[locale],
        stackByArea: def.stackByArea,
      };
    },
    cvExperience(locale: EngagementLocale): CvExperienceRow {
      return {
        role: def.role[locale],
        company: def.cvCompany[locale],
        period: def.period[locale],
        desc: def.cvShortDesc?.[locale] ?? def.shortDesc[locale],
        ach: def.cvAchievements[locale],
        tags: def.cvTags,
      };
    },
  };
}

/** Объединяет теги из трёх областей в один плоский список без дублей (для навыков / мета). */
export function flattenStackTags(stack: AreaBuckets): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const key of ["front", "mobile", "backend"] as const) {
    for (const t of stack[key]) {
      if (!seen.has(t)) {
        seen.add(t);
        out.push(t);
      }
    }
  }
  return out;
}
