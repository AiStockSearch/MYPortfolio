/**
 * Резюме / CV — один или несколько .ts в этой папке (import.meta.glob).
 * Редактируйте cv.ts: текст, опыт, навыки, ссылки — без правок React.
 */

const modules = import.meta.glob(["./*.ts", "!./index.ts"], {
  eager: true,
  import: "default",
});

function pickLocale(
  i18n: Record<string, unknown> | null | undefined,
  locale: "en" | "ru"
) {
  if (!i18n || typeof i18n !== "object") return null;
  const primary = locale === "ru" ? "ru" : "en";
  const fallback = primary === "ru" ? "en" : "ru";
  return i18n[primary] || i18n[fallback] || null;
}

export function getResumeData(locale: "en" | "ru"): Record<string, unknown> | null {
  const doc = Object.values(modules)[0] as Record<string, unknown> | undefined;
  if (!doc?.i18n) {
    if (import.meta.env.DEV) console.warn("[resume] no cv yaml");
    return null;
  }
  const loc = pickLocale(doc.i18n as Record<string, unknown>, locale) as
    | Record<string, unknown>
    | null
    | undefined;
  if (!loc) return null;

  const ref = loc.referenceLinks as Record<string, unknown> | null | undefined;
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
