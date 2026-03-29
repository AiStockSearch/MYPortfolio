import { projectDetailContent } from "../../../content/siteContent";

/** Данные каталога для изолированных фикстур блоков проекта. */
export const projectCatalogMock = {
  locale: "en",
  project: {
    id: "mock-wallet",
    name: "Mock Wallet",
    type: "Mobile",
    tagline: "Fixture",
    live: true,
    metrics: [],
    stack: ["RN", "TS"],
    links: [],
    blocks: [],
  },
  ui: projectDetailContent.en,
};
