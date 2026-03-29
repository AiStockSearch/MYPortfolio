/**
 * Каталог проектов: единая сборка из `entities/careerPortfolioSource.ts`
 * (engagement + `portfolio` + Cosmo / Carelink / WLS).
 *
 * Схема документа:
 * - id, order, live, featured, stack[]
 * - i18n.en | i18n.ru: name, type, tagline, role?, links[], metrics[], blocks[]
 *
 * Блоки (discriminated union по полю type):
 * - heroImage: { src?, alt? }
 * - section: { title? | sectionKey?: 'overview'|'technical' }
 * - prose: { text } — подмножество markdown (см. renderMarkdown)
 * - keyResults: { items: [{ val, lbl }] }
 * - techStack: { tags: string[] }
 * - partner: { name, href?, logoSrc?, logoAlt? }
 * - appLinks: { items: [{ label, href }] }
 * - image: { src, alt?, caption? }
 */

import { getAllRawPortfolioDocuments } from "../entities/careerPortfolioSource";

const modules = getAllRawPortfolioDocuments();

function pickLocale(
  doc: Record<string, unknown>,
  locale: "en" | "ru"
): Record<string, unknown> | null {
  const primary = locale === "ru" ? "ru" : "en";
  const fallback = primary === "ru" ? "en" : "ru";
  const i18n = doc.i18n;
  if (!i18n || typeof i18n !== "object") return null;
  const bag = i18n as Record<string, unknown>;
  const loc = bag[primary] ?? bag[fallback];
  if (!loc || typeof loc !== "object") return null;
  return loc as Record<string, unknown>;
}

export function normalizeProjectDoc(doc: Record<string, unknown>, locale: "en" | "ru") {
  const loc = pickLocale(doc, locale);
  if (!loc || typeof doc.id !== "string") {
    if (import.meta.env.DEV) {
      console.warn("[projects] skip invalid doc", doc);
    }
    return null;
  }

  const catalogFilters = Array.isArray(doc.catalogFilters)
    ? doc.catalogFilters.map((t) => String(t))
    : undefined;

  return {
    id: doc.id,
    order: typeof doc.order === "number" ? doc.order : 999,
    live: Boolean(doc.live),
    featured: Boolean(doc.featured),
    stack: Array.isArray(doc.stack) ? doc.stack : [],
    catalogFilters,
    name: String(loc.name ?? ""),
    type: String(loc.type ?? ""),
    tagline: typeof loc.tagline === "string" ? loc.tagline : "",
    role: typeof loc.role === "string" ? loc.role : "",
    links: Array.isArray(loc.links) ? loc.links : [],
    metrics: Array.isArray(loc.metrics) ? loc.metrics : [],
    blocks: Array.isArray(loc.blocks) ? loc.blocks : [],
  };
}

type NormalizedProject = NonNullable<ReturnType<typeof normalizeProjectDoc>>;

const projectsByLocale: Partial<Record<"en" | "ru", NormalizedProject[]>> = {};

/**
 * Список проектов статичен в рантайме — кэшируем, чтобы не пересобирать на каждом рендере
 * (например главная с typewriter ~36ms тиками).
 */
export function getAllProjects(locale: "en" | "ru"): NormalizedProject[] {
  const hit = projectsByLocale[locale];
  if (hit) return hit;
  const list = modules
    .map((doc) => normalizeProjectDoc(doc as Record<string, unknown>, locale))
    .filter((p): p is NormalizedProject => p != null)
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
  projectsByLocale[locale] = list;
  return list;
}

export function getProjectById(id: string, locale: "en" | "ru") {
  return getAllProjects(locale).find((p) => p.id === id) ?? null;
}

function techStackTagsFromBlocks(blocks: unknown[]): string[] {
  const out: string[] = [];
  for (const b of blocks) {
    if (!b || typeof b !== "object") continue;
    const block = b as Record<string, unknown>;
    if (block.type !== "techStack") continue;
    const tags = block.tags;
    if (!Array.isArray(tags)) continue;
    for (const t of tags) out.push(String(t));
  }
  return out;
}

/** Склеивает списки тегов; порядок — как в аргументах; дубликаты по lower-case убираются. */
export function mergeUniqueTagStrings(...lists: Array<string[] | undefined | null>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const list of lists) {
    if (!list?.length) continue;
    for (const raw of list) {
      const s = String(raw).trim();
      if (!s) continue;
      const k = s.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(s);
    }
  }
  return out;
}

/**
 * Один кейс: `stack` + `catalogFilters` + теги из блоков `techStack`, без дублей.
 */
export function getCombinedPortfolioTagsForSlug(slug: string, locale: "en" | "ru"): string[] {
  const p = getProjectById(slug, locale);
  if (!p) return [];
  const collected: string[] = [];
  for (const t of p.stack) collected.push(String(t));
  if (p.catalogFilters?.length) {
    for (const t of p.catalogFilters) collected.push(String(t));
  }
  collected.push(...techStackTagsFromBlocks(p.blocks));
  return mergeUniqueTagStrings(collected);
}

/** Порядок для next/prev (стабильно по `order`). */
export function getOrderedProjectIds() {
  return getAllProjects("ru").map((p) => p.id);
}

/** Следующий проект в порядке `order` (циклически). */
export function getNextProject(id: string, locale: "en" | "ru") {
  const list = getAllProjects(locale);
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  return list[(idx + 1) % list.length];
}
