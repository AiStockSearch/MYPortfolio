/**
 * Каталог подтверждающих документов для кейсов портфолио.
 *
 * Файлы кладите в `public/documents/<projectId>/…` и добавляйте запись сюда
 * (или ссылайтесь напрямую из YAML блока `documents` на кейсе).
 *
 * Не коммитьте сканы с паспортами/ИНН без редакции. Для договоров часто
 * достаточно статуса `on-request` до выкладки NDA-safe PDF.
 */

export type PortfolioDocumentItem = {
  id: string;
  projectId: string;
  title: { ru: string; en: string };
  kind: { ru: string; en: string };
  meta?: { ru: string; en: string };
  /** Путь от public/, например /documents/transline/gph-2026.pdf */
  href?: string;
  status?: "available" | "on-request";
};

export const PORTFOLIO_DOCUMENTS: PortfolioDocumentItem[] = [
  {
    id: "transline-gph",
    projectId: "transline",
    title: {
      ru: "Договор ГПХ / Outstaff · Транслайн",
      en: "GPH / Outstaff agreement · Transline",
    },
    kind: { ru: "Договор", en: "Contract" },
    meta: {
      ru: "Подтверждение контракта с июня 2026. PDF — в public/documents/transline/",
      en: "Contract proof from Jun 2026. Put PDF under public/documents/transline/",
    },
    status: "on-request",
  },
  {
    id: "transline-nda-note",
    projectId: "transline",
    title: {
      ru: "Доступ к product GitLab (NDA)",
      en: "Product GitLab access (NDA)",
    },
    kind: { ru: "Доступ", en: "Access" },
    meta: {
      ru: "Приватный репозиторий transline-mobile/mobile — по запросу рекрутера / под NDA",
      en: "Private repo transline-mobile/mobile — recruiter request / NDA",
    },
    status: "on-request",
  },
  {
    id: "haqqex-outstaff",
    projectId: "haqqex-wallet",
    title: {
      ru: "Договор outstaff · haqqex",
      en: "Outstaff agreement · haqqex",
    },
    kind: { ru: "Договор", en: "Contract" },
    meta: {
      ru: "Проектный контракт мар 2023 — дек 2025. Выложите NDA-safe PDF при готовности",
      en: "Project contract Mar 2023 — Dec 2025. Add NDA-safe PDF when ready",
    },
    status: "on-request",
  },
  {
    id: "mirapolis-gph",
    projectId: "mirapolis-lms",
    title: {
      ru: "Договор ГПХ / совмещение · Мираполис",
      en: "GPH / part-time agreement · Mirapolis",
    },
    kind: { ru: "Договор", en: "Contract" },
    meta: {
      ru: "июл 2024 — сен 2025 · part-time",
      en: "Jul 2024 — Sep 2025 · part-time",
    },
    status: "on-request",
  },
  {
    id: "skif-project",
    projectId: "skif-trade",
    title: {
      ru: "Проектный договор · Скиф Трейд",
      en: "Project agreement · Skif Trade",
    },
    kind: { ru: "Договор", en: "Contract" },
    meta: {
      ru: "авг — дек 2025 · part-time / совмещение",
      en: "Aug — Dec 2025 · part-time",
    },
    status: "on-request",
  },
  {
    id: "flowwow-td",
    projectId: "flowwow-erp",
    title: {
      ru: "Трудовой договор · Flowwow",
      en: "Employment contract · Flowwow",
    },
    kind: { ru: "Трудовой", en: "Employment" },
    meta: {
      ru: "ноя 2022 — янв 2024",
      en: "Nov 2022 — Jan 2024",
    },
    status: "on-request",
  },
];

export function documentsForProject(
  projectId: string,
  locale: "ru" | "en"
): Array<{
  title: string;
  href?: string;
  kind: string;
  meta?: string;
  status?: "available" | "on-request";
}> {
  return PORTFOLIO_DOCUMENTS.filter((d) => d.projectId === projectId).map((d) => ({
    title: d.title[locale],
    kind: d.kind[locale],
    meta: d.meta?.[locale],
    href: d.href,
    status: d.href && d.status !== "on-request" ? "available" : d.status ?? "on-request",
  }));
}
