/**
 * Поле `order` в документах проектов (`EngagementDefinition.portfolio`).
 * Для трудовых этапов порядок совпадает с `homeCareerExperienceTimeline` (+ Mirapolis) в `experienceTimeline.ts`
 * (от более нового к более старому — на `/projects` сортировка по возрастанию `order`).
 */
export const PROJECT_CATALOG_ORDER = {
  mirapolisLms: 10,
  mobilityTop: 15,
  haqqexWallet: 20,
  flowwowErp: 30,
  hawexCrypto: 40,
  freedomFinance: 41,
  dvGroup: 42,
  innopolisZencar: 43,
  sparklingTide: 44,
  mytradelink: 45,
  bizonex: 46,
  pilotRetail: 47,
  /** Не из таймлайна трудоустройств — после трудовых кейсов. */
  cosmoFusionDao: 50,
  carelink: 51,
  wlsTrading: 60,
} as const;

export type ProjectCatalogOrderKey = keyof typeof PROJECT_CATALOG_ORDER;
