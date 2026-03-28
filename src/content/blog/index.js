const modules = import.meta.glob("./*.yaml", { eager: true, import: "default" });

/** Display label for post category on cards (filter still uses English `category` key). */
const CATEGORY_LABEL_RU = {
  Architecture: "Архитектура",
  Performance: "Производительность",
  Web3: "Web3",
  Productivity: "Продуктивность",
  "UX/Product": "UX / продукт",
};

function pickLocale(doc, locale) {
  const primary = locale === "ru" ? "ru" : "en";
  const fallback = primary === "ru" ? "en" : "ru";
  return doc.i18n?.[primary] || doc.i18n?.[fallback] || null;
}

/** @param {"en"|"ru"} locale */
export function getBlogPosts(locale) {
  const posts = Object.values(modules)
    .map((doc) => {
      const loc = pickLocale(doc, locale);
      if (!loc || !doc.id) return null;
      const categoryKey = doc.category;
      const categoryDisplay =
        locale === "ru"
          ? CATEGORY_LABEL_RU[categoryKey] ?? categoryKey
          : categoryKey;
      return {
        id: doc.id,
        date: doc.date,
        category: categoryKey,
        categoryDisplay,
        draft: Boolean(doc.draft),
        tags: Array.isArray(doc.tags) ? doc.tags : [],
        title: loc.title,
        subtitle: loc.subtitle ?? "",
        readTime: loc.readTime ?? "",
        excerpt: loc.excerpt ?? "",
        body: typeof loc.body === "string" ? loc.body : "",
      };
    })
    .filter(Boolean);

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** @param {"en"|"ru"} locale */
export function getBlogPost(id, locale) {
  return getBlogPosts(locale).find((p) => p.id === id) ?? null;
}

/** @param {"en"|"ru"} locale */
export function getAdjacentPosts(id, locale) {
  const list = getBlogPosts(locale);
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return { prev: null, next: null, list };
  return {
    prev: idx > 0 ? list[idx - 1] : null,
    next: idx < list.length - 1 ? list[idx + 1] : null,
    list,
  };
}
