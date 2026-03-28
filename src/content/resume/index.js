/**
 * Резюме / CV — один или несколько YAML в этой папке (import.meta.glob).
 * Редактируйте cv.yaml: текст, опыт, навыки, ссылки — без правок React.
 */

const modules = import.meta.glob("./*.yaml", {
  eager: true,
  import: "default",
});

function pickLocale(i18n, locale) {
  if (!i18n || typeof i18n !== "object") return null;
  const primary = locale === "ru" ? "ru" : "en";
  const fallback = primary === "ru" ? "en" : "ru";
  return i18n[primary] || i18n[fallback] || null;
}

/**
 * @param {"en"|"ru"} locale
 * @returns {Record<string, unknown> | null}
 */
export function getResumeData(locale) {
  const doc = Object.values(modules)[0];
  if (!doc?.i18n) {
    if (import.meta.env.DEV) console.warn("[resume] no cv yaml");
    return null;
  }
  const loc = pickLocale(doc.i18n, locale);
  if (!loc) return null;

  const ref = loc.referenceLinks;
  const normalizedRef =
    ref && typeof ref === "object"
      ? {
          sectionTitle:
            typeof ref.sectionTitle === "string" ? ref.sectionTitle : "",
          items: Array.isArray(ref.items) ? ref.items : [],
        }
      : { sectionTitle: "", items: [] };

  return {
    ...loc,
    experience: Array.isArray(loc.experience) ? loc.experience : [],
    skillGroups: Array.isArray(loc.skillGroups) ? loc.skillGroups : [],
    education: Array.isArray(loc.education) ? loc.education : [],
    contactLinks: Array.isArray(loc.contactLinks) ? loc.contactLinks : [],
    referenceLinks: normalizedRef,
  };
}
