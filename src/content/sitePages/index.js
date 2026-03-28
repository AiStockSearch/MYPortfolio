/**
 * Контент-страницы: YAML в этой папке + import.meta.glob — новый файл попадает в каталог без правок кода.
 *
 * Схема корня YAML:
 * - slug: string (URL-сегмент, уникальный)
 * - order?: number
 * - live?: boolean
 * - i18n.en | i18n.ru: title, typeLabel?, tagline?, role?, links[], metrics[], stack[], blocks[]
 *
 * Блоки — те же типы, что у кейсов (см. src/content/projects/index.js).
 */

const modules = import.meta.glob("./*.yaml", {
  eager: true,
  import: "default",
});

function pickLocale(doc, locale) {
  const primary = locale === "ru" ? "ru" : "en";
  const fallback = primary === "ru" ? "en" : "ru";
  const i18n = doc.i18n;
  if (!i18n || typeof i18n !== "object") return null;
  return i18n[primary] || i18n[fallback] || null;
}

/**
 * Форма как у normalizeProjectDoc — совместимость с ProjectCatalogProvider и ProjectBlockRenderer.
 * @param {Record<string, unknown>} doc
 * @param {"en"|"ru"} locale
 */
export function normalizeSitePageDoc(doc, locale) {
  const loc = pickLocale(doc, locale);
  if (!loc || typeof doc.slug !== "string") {
    if (import.meta.env.DEV) {
      console.warn("[sitePages] skip invalid doc", doc);
    }
    return null;
  }

  return {
    id: doc.slug,
    order: typeof doc.order === "number" ? doc.order : 999,
    live: Boolean(doc.live),
    featured: false,
    stack: Array.isArray(loc.stack) ? loc.stack : [],
    name: loc.title,
    type: typeof loc.typeLabel === "string" ? loc.typeLabel : "",
    tagline: typeof loc.tagline === "string" ? loc.tagline : "",
    role: typeof loc.role === "string" ? loc.role : "",
    links: Array.isArray(loc.links) ? loc.links : [],
    metrics: Array.isArray(loc.metrics) ? loc.metrics : [],
    blocks: Array.isArray(loc.blocks) ? loc.blocks : [],
  };
}

/** @param {"en"|"ru"} locale */
export function getAllSitePages(locale) {
  return Object.values(modules)
    .map((doc) => normalizeSitePageDoc(doc, locale))
    .filter(Boolean)
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

/** @param {string} slug @param {"en"|"ru"} locale */
export function getSitePageBySlug(slug, locale) {
  return getAllSitePages(locale).find((p) => p.id === slug) ?? null;
}

/** Список slug для навигации / sitemap. */
export function getSitePageSlugs() {
  return Object.values(modules)
    .map((doc) => (typeof doc.slug === "string" ? doc.slug : null))
    .filter(Boolean);
}
