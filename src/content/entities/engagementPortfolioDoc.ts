import { PROJECT_CATALOG_ORDER } from "./projectCatalogOrder";
import type {
  EngagementDefinition,
  EngagementLocale,
  PortfolioRichLocale,
} from "./types";

const STUB_RU = "\n\nДетальный кейс и материалы — позже.";
const STUB_EN = "\n\nFull case study and assets — to be added.";

function mergeRichLocale(
  def: EngagementDefinition,
  locale: EngagementLocale,
  rich: PortfolioRichLocale
) {
  return {
    name: rich.name ?? def.homeCompany[locale],
    type: rich.type,
    tagline: rich.tagline ?? def.shortDesc[locale],
    role: rich.role ?? def.role[locale],
    links: rich.links ?? [],
    metrics: rich.metrics ?? [],
    blocks: rich.blocks,
  };
}

function stubLocaleBlocks(
  def: EngagementDefinition,
  locale: EngagementLocale,
  stack: string[],
  withStubNote: boolean,
  cardType: string,
  metrics: Array<{ val: string; lbl: string }>,
  overviewProseExtra?: string
) {
  const note = withStubNote ? (locale === "ru" ? STUB_RU : STUB_EN) : "";
  const techPlaceholder =
    locale === "ru"
      ? "Технический раздел заполним отдельно.\n"
      : "Technical section to be filled in.\n";
  const overviewBlocks: Array<Record<string, unknown>> = [
    { type: "heroImage", alt: def.homeCompany[locale] },
    { type: "section", sectionKey: "overview" },
    { type: "prose", text: def.shortDesc[locale] + note + "\n" },
  ];
  const extra = overviewProseExtra?.trim();
  if (extra) {
    overviewBlocks.push({ type: "prose", text: extra + "\n" });
  }
  if (metrics.length > 0) {
    overviewBlocks.push({ type: "keyResults", items: metrics });
  }
  return {
    name: def.homeCompany[locale],
    type: cardType,
    tagline: def.shortDesc[locale],
    role: def.role[locale],
    links: [],
    metrics,
    blocks: [
      ...overviewBlocks,
      { type: "section", sectionKey: "technical" },
      { type: "prose", text: techPlaceholder },
      { type: "techStack", tags: stack },
    ],
  };
}

/**
 * Собирает сырой документ кейса для `normalizeProjectDoc` из engagement с заполненным `portfolio`.
 */
export function buildPortfolioDocumentFromEngagement(
  def: EngagementDefinition
): Record<string, unknown> | null {
  const p = def.portfolio;
  if (!p) return null;

  const id = p.projectId ?? def.id;
  const order = PROJECT_CATALOG_ORDER[p.catalogOrderKey];
  const stack = p.stack ?? def.cvTags;
  const live = p.live ?? false;
  const featured = p.featured ?? false;
  const catalogFilters = Array.isArray(p.catalogFilters) ? p.catalogFilters : undefined;

  if (p.variant === "rich") {
    return {
      id,
      order,
      live,
      featured,
      stack,
      ...(catalogFilters ? { catalogFilters } : {}),
      i18n: {
        ru: mergeRichLocale(def, "ru", p.i18n.ru),
        en: mergeRichLocale(def, "en", p.i18n.en),
      },
    };
  }

  const withNote = p.stubNote !== false;
  const defaultCard = (l: EngagementLocale) =>
    l === "ru" ? "Карьера" : "Career";
  const cardRu = p.catalogCardType?.ru ?? defaultCard("ru");
  const cardEn = p.catalogCardType?.en ?? defaultCard("en");
  const metricsRu = p.stubMetrics?.ru ?? [];
  const metricsEn = p.stubMetrics?.en ?? [];
  const proseRu = p.stubOverviewProse?.ru;
  const proseEn = p.stubOverviewProse?.en;
  return {
    id,
    order,
    live,
    featured,
    stack,
    ...(catalogFilters ? { catalogFilters } : {}),
    i18n: {
      ru: stubLocaleBlocks(def, "ru", stack, withNote, cardRu, metricsRu, proseRu),
      en: stubLocaleBlocks(def, "en", stack, withNote, cardEn, metricsEn, proseEn),
    },
  };
}
