/**
 * Унифицированный каталог проектов: YAML в подпапках + import.meta.glob.
 *
 * Схема корня YAML:
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

const modules = import.meta.glob("./**/project.yaml", {
  eager: true,
  import: "default",
});

/** @param {Record<string, unknown>} doc */
/** @param {"en"|"ru"} locale */
function pickLocale(doc, locale) {
  const primary = locale === "ru" ? "ru" : "en";
  const fallback = primary === "ru" ? "en" : "ru";
  const i18n = doc.i18n;
  if (!i18n || typeof i18n !== "object") return null;
  return i18n[primary] || i18n[fallback] || null;
}

/**
 * @param {Record<string, unknown>} doc
 * @param {"en"|"ru"} locale
 */
export function normalizeProjectDoc(doc, locale) {
  const loc = pickLocale(doc, locale);
  if (!loc || typeof doc.id !== "string") {
    if (import.meta.env.DEV) {
      console.warn("[projects] skip invalid doc", doc);
    }
    return null;
  }

  return {
    id: doc.id,
    order: typeof doc.order === "number" ? doc.order : 999,
    live: Boolean(doc.live),
    featured: Boolean(doc.featured),
    stack: Array.isArray(doc.stack) ? doc.stack : [],
    name: loc.name,
    type: loc.type,
    tagline: typeof loc.tagline === "string" ? loc.tagline : "",
    role: typeof loc.role === "string" ? loc.role : "",
    links: Array.isArray(loc.links) ? loc.links : [],
    metrics: Array.isArray(loc.metrics) ? loc.metrics : [],
    blocks: Array.isArray(loc.blocks) ? loc.blocks : [],
  };
}

/** @param {"en"|"ru"} locale */
export function getAllProjects(locale) {
  return Object.values(modules)
    .map((doc) => normalizeProjectDoc(doc, locale))
    .filter(Boolean)
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

/** @param {string} id @param {"en"|"ru"} locale */
export function getProjectById(id, locale) {
  return getAllProjects(locale).find((p) => p.id === id) ?? null;
}

/** Порядок для next/prev (стабильно по `order`). */
export function getOrderedProjectIds() {
  return getAllProjects("en").map((p) => p.id);
}

/** Следующий проект в порядке `order` (циклически). */
export function getNextProject(id, locale) {
  const list = getAllProjects(locale);
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  return list[(idx + 1) % list.length];
}
