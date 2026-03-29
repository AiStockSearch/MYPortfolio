/**
 * Контент-страницы: .ts в этой папке + import.meta.glob — новый файл попадает в каталог без правок кода.
 *
 * Схема корня (экспортируемый объект):
 * - slug: string (URL-сегмент, уникальный)
 * - order?: number
 * - live?: boolean
 * - i18n.en | i18n.ru: title, typeLabel?, tagline?, role?, links[], metrics[], stack[], blocks[]
 *
 * Блоки — те же типы, что у кейсов (см. src/content/projects/index.ts).
 */

const modules = import.meta.glob(["./*.ts", "!./index.ts"], {
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

/** Форма как у normalizeProjectDoc — совместимость с ProjectCatalogProvider и ProjectBlockRenderer. */
export function normalizeSitePageDoc(doc: Record<string, unknown>, locale: "en" | "ru") {
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
    name: String(loc.title ?? ""),
    type: typeof loc.typeLabel === "string" ? loc.typeLabel : "",
    tagline: typeof loc.tagline === "string" ? loc.tagline : "",
    role: typeof loc.role === "string" ? loc.role : "",
    links: Array.isArray(loc.links) ? loc.links : [],
    metrics: Array.isArray(loc.metrics) ? loc.metrics : [],
    blocks: Array.isArray(loc.blocks) ? loc.blocks : [],
  };
}

export function getAllSitePages(locale: "en" | "ru") {
  const list = Object.values(modules)
    .map((doc) => normalizeSitePageDoc(doc as Record<string, unknown>, locale))
    .filter((p): p is NonNullable<typeof p> => p != null);
  return list.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

export function getSitePageBySlug(slug: string, locale: "en" | "ru") {
  return getAllSitePages(locale).find((p) => p.id === slug) ?? null;
}

/** Список slug для навигации / sitemap. */
export function getSitePageSlugs() {
  return Object.values(modules)
    .map((doc) => {
      const d = doc as Record<string, unknown>;
      return typeof d.slug === "string" ? d.slug : null;
    })
    .filter((s): s is string => s != null);
}
