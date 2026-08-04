import type { EngagementDefinition, EngagementLocale } from "./types";

/** Год конца периода для сортировки (новее — больше). «н.в.» / present считаем как открытый конец. */
export function periodEndYearForSort(period: string): number {
  if (/\bn\.в\.|настоящее время|present|now|\(пет-проект\)|\(side project\)/i.test(period)) {
    return 10_000;
  }
  const years = period.match(/\b(19|20)\d{2}\b/g);
  if (!years?.length) return 0;
  return Number(years[years.length - 1]);
}

export function periodStartYearForSort(period: string): number {
  const years = period.match(/\b(19|20)\d{2}\b/g);
  if (!years?.length) return 0;
  return Number(years[0]);
}

export function compareEngagementPeriodDesc(
  a: EngagementDefinition,
  b: EngagementDefinition,
  locale: EngagementLocale
): number {
  const pa = a.period[locale];
  const pb = b.period[locale];
  const endB = periodEndYearForSort(pb);
  const endA = periodEndYearForSort(pa);
  if (endB !== endA) return endB - endA;
  return periodStartYearForSort(pb) - periodStartYearForSort(pa);
}

export function sortEngagementsByPeriodDesc(
  defs: EngagementDefinition[],
  locale: EngagementLocale
): EngagementDefinition[] {
  return [...defs].sort((a, b) => compareEngagementPeriodDesc(a, b, locale));
}
