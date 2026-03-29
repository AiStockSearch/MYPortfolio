/**
 * Нормализация объекта поста блога к канонической схеме (plain object из JS-модулей
 * в `src/content/blog/*.js`) и `getBlogPosts` (i18n.ru / i18n.en, строковые поля).
 */

export type BlogLocaleFields = {
  title: string;
  subtitle: string;
  readTime: string;
  excerpt: string;
  body: string;
};

/** Каноническая форма документа поста (исторически совместимо с YAML). */
export type BlogDocCanonical = {
  id: string;
  date: string;
  category: string;
  draft: boolean;
  tags: string[];
  i18n: {
    en?: BlogLocaleFields;
    ru?: BlogLocaleFields;
  };
};

/** @deprecated Используйте `BlogDocCanonical`. */
export type BlogYamlCanonical = BlogDocCanonical;

export function emptyBlogLocale(): BlogLocaleFields {
  return {
    title: "",
    subtitle: "",
    readTime: "",
    excerpt: "",
    body: "",
  };
}

function normalizeLocaleChunk(chunk: unknown): BlogLocaleFields {
  if (!chunk || typeof chunk !== "object") return emptyBlogLocale();
  const o = chunk as Record<string, unknown>;
  return {
    title: typeof o.title === "string" ? o.title : "",
    subtitle: typeof o.subtitle === "string" ? o.subtitle : "",
    readTime: typeof o.readTime === "string" ? o.readTime : "",
    excerpt: typeof o.excerpt === "string" ? o.excerpt : "",
    body: typeof o.body === "string" ? o.body : "",
  };
}

/**
 * Приводит сырой объект (из JS-модуля или редактора) к канонике.
 * Обратная совместимость:
 * - поля `title`, `subtitle`, `readTime`, `excerpt`, `body` на корне → вкладываются в `i18n.en`;
 * - отсутствующий или частичный `i18n` дополняется;
 * - `tags` не-массив → [];
 * - нет `category` → "Uncategorized";
 * - нет `date` → "".
 */
export function normalizeBlogDoc(input: unknown): BlogDocCanonical | null {
  if (!input || typeof input !== "object") return null;
  const o = input as Record<string, unknown>;
  const id = typeof o.id === "string" && o.id.trim() ? o.id.trim() : null;
  if (!id) return null;

  const tags = Array.isArray(o.tags)
    ? o.tags.filter((t): t is string => typeof t === "string")
    : [];
  const category = typeof o.category === "string" ? o.category : "Uncategorized";
  const date = typeof o.date === "string" ? o.date : "";
  const draft = Boolean(o.draft);

  const i18nRaw =
    o.i18n && typeof o.i18n === "object" ? (o.i18n as Record<string, unknown>) : {};

  const hasFlatLocale =
    typeof o.title === "string" ||
    typeof o.subtitle === "string" ||
    typeof o.readTime === "string" ||
    typeof o.excerpt === "string" ||
    typeof o.body === "string";

  const fromRoot = () =>
    normalizeLocaleChunk({
      title: o.title,
      subtitle: o.subtitle,
      readTime: o.readTime,
      excerpt: o.excerpt,
      body: o.body,
    });

  let en =
    i18nRaw.en !== undefined ? normalizeLocaleChunk(i18nRaw.en) : undefined;
  let ru =
    i18nRaw.ru !== undefined ? normalizeLocaleChunk(i18nRaw.ru) : undefined;

  if (en === undefined && ru === undefined && hasFlatLocale) {
    en = fromRoot();
  }

  const i18n: BlogDocCanonical["i18n"] = {
    ...(ru !== undefined ? { ru } : {}),
    ...(en !== undefined ? { en } : {}),
  };

  return {
    id,
    date,
    category,
    draft,
    tags,
    i18n,
  };
}

/** @deprecated Используйте `normalizeBlogDoc`. */
export const normalizeBlogYamlDoc = normalizeBlogDoc;

/**
 * Объект для сериализации (экспорт в YAML/JSON): обе локали, пять строковых полей.
 * Порядок ключей в `i18n`: сначала `ru`, затем `en`.
 */
export function ensureBlogDocForExport(doc: BlogDocCanonical): Record<string, unknown> {
  const ru = { ...emptyBlogLocale(), ...doc.i18n.ru };
  const en = { ...emptyBlogLocale(), ...doc.i18n.en };
  return {
    id: doc.id,
    date: doc.date,
    category: doc.category,
    draft: doc.draft,
    tags: doc.tags,
    i18n: { ru, en },
  };
}

/** @deprecated Используйте `ensureBlogDocForExport`. */
export const ensureBlogYamlForExport = ensureBlogDocForExport;
