/**
 * Унифицированный каталог проектов: project.ts в подпапках + import.meta.glob.
 *
 * Схема корня (экспорт default из project.ts):
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

const modules = import.meta.glob("./**/project.ts", {
  eager: true,
  import: "default",
});

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

  return {
    id: doc.id,
    order: typeof doc.order === "number" ? doc.order : 999,
    live: Boolean(doc.live),
    featured: Boolean(doc.featured),
    stack: Array.isArray(doc.stack) ? doc.stack : [],
    name: String(loc.name ?? ""),
    type: String(loc.type ?? ""),
    tagline: typeof loc.tagline === "string" ? loc.tagline : "",
    role: typeof loc.role === "string" ? loc.role : "",
    links: Array.isArray(loc.links) ? loc.links : [],
    metrics: Array.isArray(loc.metrics) ? loc.metrics : [],
    blocks: Array.isArray(loc.blocks) ? loc.blocks : [],
  };
}

export function getAllProjects(locale: "en" | "ru") {
  const list = Object.values(modules)
    .map((doc) => normalizeProjectDoc(doc as Record<string, unknown>, locale))
    .filter((p): p is NonNullable<typeof p> => p != null);
  return list.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

export function getProjectById(id: string, locale: "en" | "ru") {
  return getAllProjects(locale).find((p) => p.id === id) ?? null;
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
