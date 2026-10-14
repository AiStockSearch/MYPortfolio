import type { ProjectCatalogOrderKey } from "./projectCatalogOrder";

/** Локаль контента в engagement-сущностях. */
export type EngagementLocale = "en" | "ru";

/** Буллеты / теги по направлениям (как на главной в переключателе). */
export type AreaBuckets = {
  front: string[];
  mobile: string[];
  backend: string[];
};

/** Элемент таймлайна опыта на главной (`HomeExperienceSection`). */
export type HomeExpEntry = {
  period: string;
  company: string;
  tag: string;
  role: string;
  desc: string;
  achByArea: AreaBuckets;
  stackByArea: AreaBuckets;
  /** Стек + категории + techStack из связанного кейса `/projects` (уникальные). */
  portfolioCombinedTags?: string[];
};

/** Строка опыта в payload резюме (`cv.ts` → `ResumeView`). */
export type CvExperienceRow = {
  role: string;
  company: string;
  period: string;
  desc: string;
  ach: string[];
  tags: string[];
  /** Slug кейса на `/projects/:slug`; для кнопки «Кейс». */
  projectSlug?: string | null;
  achByArea?: AreaBuckets;
  stackByArea?: AreaBuckets;
  kind?: "employment" | "self-hosted";
};

/** Карточка кейса портфеля (локаль) при `portfolio.variant === "rich"`. */
export type PortfolioRichLocale = {
  name?: string;
  type: string;
  tagline?: string;
  role?: string;
  links?: unknown[];
  metrics?: unknown[];
  blocks: unknown[];
};

/** Блок `gallery` для страницы кейса: `{ title?, icon?, caption?, items: [{ src, alt? }] }`. */
export type PortfolioGalleryBlock = {
  title?: string;
  icon?: string;
  caption?: string;
  items: Array<{ src: string; alt?: string }>;
};

/**
 * Кейс в каталоге `/projects`, собираемый из engagement одной точкой (`buildPortfolioDocumentFromEngagement`).
 * `projectId` — slug в URL, если отличается от `EngagementDefinition.id` (например zencar → innopolis-zencar).
 */
export type EngagementPortfolio =
  | {
      catalogOrderKey: ProjectCatalogOrderKey;
      projectId?: string;
      live?: boolean;
      featured?: boolean;
      stack?: string[];
      /** Явные теги для фильтров на `/projects` (id из `projectsPageContent.filters`). */
      catalogFilters?: string[];
      variant: "stub";
      /** Строка «тип» на карточке в каталоге (не путать с `role`). */
      catalogCardType?: Record<EngagementLocale, string>;
      /** По умолчанию true — текст «кейс позже». */
      stubNote?: boolean;
      /**
       * Метрики в шапке `/projects/:id` и блок `keyResults` в обзоре (как у rich-кейсов).
       * Задаётся по локалям; пустой список — без блока.
       */
      stubMetrics?: Record<EngagementLocale, Array<{ val: string; lbl: string }>>;
      /**
       * Дополнительный текст в разделе «Обзор» на `/projects/:id` (после короткого `shortDesc`).
       * На главную и в CV не попадает — только страница кейса.
       */
      stubOverviewProse?: Record<EngagementLocale, string>;
      /**
       * Галерея скриншотов приложения (блок `gallery`) в разделе «Обзор» на `/projects/:id`,
       * после `keyResults` — как у rich-кейсов (hawex, zencar).
       */
      stubGallery?: Record<EngagementLocale, PortfolioGalleryBlock>;
    }
  | {
      catalogOrderKey: ProjectCatalogOrderKey;
      projectId?: string;
      live?: boolean;
      featured?: boolean;
      stack?: string[];
      catalogFilters?: string[];
      variant: "rich";
      i18n: {
        ru: PortfolioRichLocale;
        en: PortfolioRichLocale;
      };
    };

/**
 * Общее описание одной «компании / этапа» для home + CV.
 * Эталон реализации: `mirapolis.ts`.
 */
export type EngagementDefinition = {
  /** Стабильный id (например mirapolis-lms) — для связи с проектом в портфеле. */
  id: string;
  /** Бейдж в таймлайне; строка — одна на обе локали, объект — разные под EN/RU. */
  homeTag: string | Record<EngagementLocale, string>;
  period: Record<EngagementLocale, string>;
  /** Строка компании под датой на главной. */
  homeCompany: Record<EngagementLocale, string>;
  /** Строка компании в печатном резюме (часто с доменом в скобках). */
  cvCompany: Record<EngagementLocale, string>;
  role: Record<EngagementLocale, string>;
  shortDesc: Record<EngagementLocale, string>;
  /** Короче/иначе для блока опыта в CV; иначе берётся `shortDesc`. */
  cvShortDesc?: Record<EngagementLocale, string>;
  achByArea: Record<EngagementLocale, AreaBuckets>;
  /** Техтеги обычно языконезависимы. */
  stackByArea: AreaBuckets;
  /** Плоский список достижений для PDF/страницы резюме. */
  cvAchievements: Record<EngagementLocale, string[]>;
  cvTags: string[];
  /** Если задано — этап попадает в каталог проектов (`careerPortfolioSource`). */
  portfolio?: EngagementPortfolio;
};
