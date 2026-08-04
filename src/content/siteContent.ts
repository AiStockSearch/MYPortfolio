import {
  homeCareerExperienceTimeline,
  homeSelfHostedExperienceTimeline,
} from "./entities/experienceTimeline";

/** Локализованный контент для главной и резюме (длинные блоки). */

export const homeHero = {
  en: {
    avail: "Open to Senior / Lead Mobile · Remote / Relocation / On-site",
    subPre: "Senior ",
    subHL: "Mobile",
    subMid: " Developer",
    /** Подсветка в `HomeHeroSection` (раньше фиксировали «Web3»). */
    subHighlight: "FinTech",
    subAfterWeb3: " · Web3 · Enterprise · 8+ yrs",
    ctaProjects: "View Projects",
    ctaContact: "Get in touch",
    stats: [
      ["8+", "Years exp"],
      ["5+", "Domains"],
      ["99.9%", "Crash-free"],
      ["🥈", "Web3 Hackathon"],
    ],
  },
  ru: {
    avail: "Открыт к Senior / Lead Mobile · Удалённо / Релокация / Офис",
    subPre: "",
    subHL: "Senior Mobile",
    subMid: " Developer",
    subHighlight: "Финтех",
    subAfterWeb3: " · Web3 · Enterprise · 8+ лет",
    ctaProjects: "К проектам",
    ctaContact: "Связаться",
    stats: [
      ["8+", "Лет опыта"],
      ["5+", "Доменов"],
      ["99.9%", "Crash-free"],
      ["🥈", "Web3-хакатон"],
    ],
  },
};

export const homeAbout = {
  en: {
    sec: "about",
    title: "Engineer.\nArchitect.\nBuilder.",
    p1Html:
      "I'm a <span class=\"hl\">Senior Mobile Developer</span> with <span class=\"hl\">8+ years</span> in React Native and native (Swift / Kotlin / KMP). Focus: FinTech / Web3, Enterprise LMS, Offline-First and POS/hardware.",
    p2Html:
      "My sweet spot is <span class=\"hl2\">complex real-time &amp; offline-first systems</span> — trading, logistics, LMS, merchant POS — where performance, architecture and UX all matter equally. Led mobile teams of up to 5; App Store &amp; Google Play shipping; crash-free &gt;99.9%.",
    p3Html:
      "<span class=\"hl2\">Crypto &amp; exchange</span> mobile work is part of my track record; 🥈 Web3 Hackathon 2023. Contributor to <code>react-hook-form</code> and <code>zustand</code>.",
    badges: ["TDD", "Clean Code", "Agile/Scrum", "Tech Lead", "Figma → Code", "AI Tools"],
    photoPh: "photo.jpg",
    tag: "Vyacheslav · Moscow · Remote / Relocation",
  },
  ru: {
    sec: "обо мне",
    title: "Инженер.\nАрхитектор.\nСоздатель.",
    p1Html:
      "Я <span class=\"hl\">Senior Mobile Developer</span> с <span class=\"hl\">8+ годами</span> в React Native и нативной разработке (Swift / Kotlin / KMP). Специализация: FinTech / Web3, Enterprise LMS, Offline-First, POS/hardware.",
    p2Html:
      "Сильная сторона — <span class=\"hl2\">сложные real-time и offline-first системы</span>: торговля, логистика, LMS, merchant POS — где важны и производительность, и архитектура, и UX. Лидировал мобильные команды до 5 человек; публикации в сторы; crash-free &gt;99.9%.",
    p3Html:
      "В кейсах — <span class=\"hl2\">крипто и биржевые</span> мобильные клиенты; 🥈 Web3 Hackathon 2023. Контрибьютор <code>react-hook-form</code> и <code>zustand</code>.",
    badges: ["TDD", "Чистый код", "Agile/Scrum", "Tech Lead", "Figma → код", "AI-инструменты"],
    photoPh: "photo.jpg",
    tag: "Вячеслав · Москва · Удалёнка / Релокация",
  },
};

export const homeWork = {
  en: { sec: "work", title: "Featured Projects", more: "All Projects →", live: "Live" },
  ru: { sec: "работы", title: "Избранные проекты", more: "Все проекты →", live: "В продакшене" },
};

export const homeSkillsBlocks = [
  { cat: "Mobile", name: "React Native", tags: ["CLI / Expo", "TypeScript", "New Architecture", "TurboModules / Fabric / JSI", "Hermes", "Reanimated", "Skia", "FlashList"] },
  { cat: "Mobile", name: "State & Data", tags: ["Redux Toolkit / RTK Query", "TanStack Query", "Zustand", "WatermelonDB / SQLite", "MMKV", "Offline-First Sync"] },
  { cat: "Native", name: "iOS / Android", tags: ["Swift / SwiftUI", "Kotlin / Compose", "KMP", "Keychain / Keystore", "Biometrics", "BLE / NFC", "DataWedge / ESC/POS"] },
  { cat: "Web3", name: "FinTech / Crypto", tags: ["WalletConnect v2", "Ethers.js", "Ledger BLE", "BIP-39 / BIP-44", "OWASP MASVS", "decimal.js"] },
  { cat: "Frontend", name: "React / Next.js", tags: ["React 18", "Next.js 14", "SSR/ISR/SSG", "GraphQL / Apollo", "Tailwind / NativeWind", "Tamagui"] },
  { cat: "QA", name: "Testing", tags: ["Jest", "Detox / Maestro", "XCTest / Espresso", "Storybook / Cosmos", "Sentry", "Crashlytics"] },
  { cat: "CICD", name: "DevOps", tags: ["GitHub Actions", "GitLab CI", "Bitrise", "Fastlane", "EAS / CodePush", "Docker"] },
  { cat: "Backend", name: "Adjacent", tags: ["Node.js 20", "Go", "Express", "Socket.IO", "PostgreSQL", "MongoDB"] },
  { cat: "Analytics", name: "Product", tags: ["Amplitude", "Mixpanel", "AppsFlyer", "Firebase Analytics", "Segment"] },
  { cat: "Design", name: "UI/UX & Tools", tags: ["Figma", "Pixel-perfect", "Atomic Design", "FSD", "React Cosmos"] },
]

export const homeSkills = {
  en: {
    sec: "expertise",
    title: "Technical Stack",
    blocks: homeSkillsBlocks,
  },
  ru: {
    sec: "экспертиза",
    title: "Технологический стек",
    blocks: homeSkillsBlocks,
  },
};

/** Трудовой таймлайн (новее сверху). Self-hosted см. `homeSelfHostedExp`. */
export const homeExp = {
  en: homeCareerExperienceTimeline("en"),
  ru: homeCareerExperienceTimeline("ru"),
};

export const homeSelfHostedExp = {
  en: homeSelfHostedExperienceTimeline("en"),
  ru: homeSelfHostedExperienceTimeline("ru"),
};

export const homeCareer = {
  en: {
    sec: "career",
    title: "Experience",
    stackFront: "Front",
    stackMobile: "Mobile",
    stackBackend: "Backend",
    stackSelfHosted: "Self-hosted",
    stackSwitcherAria: "Filter stack by area",
    stackEmpty: "—",
    stackNoMatches:
      "No positions for this track — switch to Mobile, Self-hosted, or another tab.",
    selfHostedHeading: "Own products (self-hosted)",
  },
  ru: {
    sec: "карьера",
    title: "Опыт",
    stackFront: "Frontend",
    stackMobile: "Мобильная",
    stackBackend: "Бэкенд",
    stackSelfHosted: "Self-hosted",
    stackSwitcherAria: "Фильтр стека по направлению",
    stackEmpty: "—",
    stackNoMatches:
      "Нет записей для этого направления — переключите вкладку (например, «Мобильная» или «Self-hosted»).",
    selfHostedHeading: "Собственные продукты (self-hosted)",
  },
};

export const homeTypewriter = {
  en: [
    "const dev = new Engineer({ yoe: 8, stack: 'RN + native' })",
    "await dev.ship({ domain: 'fintech', crashFree: '>99.9%' })",
    "// open · remote / relocation / on-site · Moscow",
  ],
  ru: [
    "const dev = new Engineer({ yoe: 8, stack: 'RN + native' })",
    "await dev.ship({ domain: 'fintech', crashFree: '>99.9%' })",
    "// открыт · удалёнка / релокация / офис · Москва",
  ],
};

export const projectsPageContent = {
  en: {
    sec: "portfolio",
    title: "All Projects",
    live: "Live",
    cta: "View case study →",
    filters: [
      { id: "All", label: "All" },
      { id: "Mobile", label: "Mobile" },
      { id: "Enterprise", label: "Enterprise" },
      { id: "Web3", label: "Web3" },
      { id: "Fintech", label: "Fintech" },
      { id: "HR-tech", label: "HR-tech" },
      { id: "Crypto", label: "Crypto" },
      { id: "Personal", label: "Personal" },
    ],
  },
  ru: {
    sec: "портфолио",
    title: "Все проекты",
    live: "В продакшене",
    cta: "Кейс →",
    filters: [
      { id: "All", label: "Все" },
      { id: "Mobile", label: "Mobile" },
      { id: "Enterprise", label: "Enterprise" },
      { id: "Web3", label: "Web3" },
      { id: "Fintech", label: "Финтех" },
      { id: "HR-tech", label: "HR-tech" },
      { id: "Crypto", label: "Крипто" },
      { id: "Personal", label: "Личные" },
    ],
  },
};

export const projectDetailContent = {
  en: {
    back: "← All Projects",
    keyResults: "Key Results",
    techStack: "Tech Stack",
    overview: "Overview",
    deepDive: "Technical Deep-Dive",
    status: "Status",
    live: "🟢 Live in production",
    dev: "🔵 In development",
    category: "Category",
    role: "Role",
    roleVal: "Senior Mobile Developer / Lead",
    next: "Next Project",
    allProjects: "All Projects",
    notFound: "Project not found",
    backList: "← Back to projects",
  },
  ru: {
    back: "← Все проекты",
    keyResults: "Ключевые результаты",
    techStack: "Стек",
    overview: "Обзор",
    deepDive: "Технически подробно",
    status: "Статус",
    live: "🟢 В продакшене",
    dev: "🔵 В разработке",
    category: "Категория",
    role: "Роль",
    roleVal: "Senior Mobile Developer / Lead",
    next: "Следующий проект",
    allProjects: "Все проекты",
    notFound: "Проект не найден",
    backList: "← К списку проектов",
  },
};

/** Тексты для контент-страниц из src/content/sitePages/ (маршрут /page/:slug). */
export const sitePageContent = {
  en: {
    back: "← Home",
    notFound: "Page not found",
    backHome: "← Back home",
  },
  ru: {
    back: "← Главная",
    notFound: "Страница не найдена",
    backHome: "← На главную",
  },
};

export const contactContent = {
  en: {
    sec: "contact",
    title: "Let's talk.",
    introLead: "I'm open to ",
    introHl: "Senior / Lead Mobile",
    introRest:
      " roles (React Native / iOS / Android) — on-site, remote, hybrid. Preferred contact: phone or Telegram; usually reply within 24 hours.",
    channels: {
      phone: { label: "Phone (preferred)", val: "+7 (996) 104-93-57" },
      tg: { label: "Telegram", val: "@mustreets" },
      email: { label: "Email" },
      gh: { label: "GitHub", val: "Js-Nanodegree" },
    },
    availTitle: "Based in Moscow · open to offers.",
    availBody:
      "Ready to relocate to Krasnodar, St. Petersburg, Tashkent, Ufa; open to business travel. Work permit: Russia, Armenia, Belarus, Kazakhstan, Uzbekistan. English C1.",
    formTitle: "Send a message",
    formSub: "Or reach out directly via Telegram / phone for a faster response.",
    mailtoNote:
      "This form does not send data over the web. It opens your email app with the fields filled in — same as a mailto link, with a preview here first.",
    labels: { name: "Your name", email: "Email", subject: "Subject", message: "Message" },
    placeholders: {
      name: "Alex Ivanov",
      email: "alex@company.com",
      message: "Tell me about your project or position...",
    },
    subjects: {
      job: "Job opportunity",
      freelance: "Freelance project",
      collab: "Collaboration",
      other: "Other",
    },
    compose: "Open in email app →",
    errors: { name: "Required", email: "Valid email required", message: "At least 20 characters" },
  },
  ru: {
    sec: "контакты",
    title: "Давайте обсудим.",
    introLead: "Открыт к ",
    introHl: "Senior / Lead Mobile",
    introRest:
      " (React Native / iOS / Android) — офис, удалёнка, гибрид. Предпочтительный канал: телефон или Telegram; обычно отвечаю в течение суток.",
    channels: {
      phone: { label: "Телефон (предпочтительно)", val: "+7 (996) 104-93-57" },
      tg: { label: "Telegram", val: "@mustreets" },
      email: { label: "Почта", val: "js-nanodegree@outlook.com" },
      gh: { label: "GitHub", val: "Js-Nanodegree" },
    },
    availTitle: "Москва · открыт к предложениям.",
    availBody:
      "Готов к переезду: Краснодар, Санкт-Петербург, Ташкент, Уфа; командировки ок. Разрешение на работу: Россия, Армения, Беларусь, Казахстан, Узбекистан. Английский C1.",
    formTitle: "Сообщение",
    formSub: "Быстрее — Telegram или телефон; ссылки слева.",
    mailtoNote:
      "Форма не отправляет данные на сервер: открывается почтовый клиент с уже заполненными полями (как mailto, но с предпросмотром).",
    labels: { name: "Имя", email: "Email", subject: "Тема", message: "Сообщение" },
    placeholders: {
      name: "Иван Иванов",
      email: "ivan@company.com",
      message: "О проекте или вакансии...",
    },
    subjects: {
      job: "Вакансия",
      freelance: "Фриланс",
      collab: "Коллаборация",
      other: "Другое",
    },
    compose: "Открыть в почте →",
    errors: { name: "Обязательно", email: "Нужен корректный email", message: "Минимум 20 символов" },
  },
};
