import {
  homeCareerExperienceTimeline,
  homeSelfHostedExperienceTimeline,
} from "./entities/experienceTimeline";

/** Локализованный контент для главной и резюме (длинные блоки). */

export const homeHero = {
  en: {
    avail: "Available for work · Remote / Relocation",
    subPre: "Senior ",
    subHL: "React Native",
    subMid: " Developer",
    /** Подсветка в `HomeHeroSection` (раньше фиксировали «Web3»). */
    subHighlight: "Fintech",
    subAfterWeb3: " · Enterprise · 11 yrs",
    ctaProjects: "View Projects",
    ctaContact: "Get in touch",
    stats: [
      ["11+", "Years exp"],
      ["5+", "Domains"],
      ["40%", "Perf gains"],
      ["🥈", "Web3 Hackathon"],
    ],
  },
  ru: {
    avail: "Открыт к работе · Удалённо / Релокация",
    subPre: "",
    subHL: "Senior React Native",
    subMid: " Developer",
    subHighlight: "Финтех",
    subAfterWeb3: " · Enterprise · 11 лет",
    ctaProjects: "К проектам",
    ctaContact: "Связаться",
    stats: [
      ["11+", "Лет опыта"],
      ["5+", "Доменов"],
      ["40%", "Прирост perf"],
      ["🥈", "Web3-хакатон"],
    ],
  },
};

export const homeAbout = {
  en: {
    sec: "about",
    title: "Engineer.\nArchitect.\nBuilder.",
    p1Html:
      "I'm a <span class=\"hl\">Senior React Native Developer</span> (plus web/frontend where the product needs it) with <span class=\"hl\">11+ years</span> building production apps used by hundreds of thousands of people.",
    p2Html:
      "My sweet spot is <span class=\"hl2\">complex real-time systems</span> — trading platforms, offline-first ERPs, LMS ecosystems — where performance, architecture and UX all matter equally.",
    p3Html:
      "<span class=\"hl2\">Crypto &amp; exchange</span> mobile work is part of my track record; 🥈 Web3 Hackathon 2023. Contributor to <code>react-hook-form</code> and <code>zustand</code>.",
    badges: ["TDD", "Clean Code", "Agile/Scrum", "Team Lead", "Figma → Code", "AI Tools"],
    photoPh: "photo.jpg",
    tag: "Vyacheslav · Ufa → World",
  },
  ru: {
    sec: "обо мне",
    title: "Инженер.\nАрхитектор.\nСоздатель.",
    p1Html:
      "Я <span class=\"hl\">Senior React Native Developer</span> (и фронтенд там, где продукту это нужно) с <span class=\"hl\">11+ годами</span> в продакшен-приложениях для сотен тысяч пользователей.",
    p2Html:
      "Сильная сторона — <span class=\"hl2\">сложные real-time системы</span>: торговые платформы, offline-first ERP, LMS, где важны и производительность, и архитектура, и UX.",
    p3Html:
      "В кейсах — <span class=\"hl2\">крипто и биржевые</span> мобильные клиенты; 🥈 Web3 Hackathon 2023. Контрибьютор <code>react-hook-form</code> и <code>zustand</code>.",
    badges: ["TDD", "Чистый код", "Agile/Scrum", "Тимлид", "Figma → код", "AI-инструменты"],
    photoPh: "photo.jpg",
    tag: "Вячеслав · Уфа → Мир",
  },
};

export const homeWork = {
  en: { sec: "work", title: "Featured Projects", more: "All Projects →", live: "Live" },
  ru: { sec: "работы", title: "Избранные проекты", more: "Все проекты →", live: "В продакшене" },
};

export const homeSkillsBlocks = [
  { cat: "Mobile", name: "React Native", tags: ["Expo", "CLI", "TypeScript", "Redux", "RTK-Query", "Socket.io","Reanimated"] },
  { cat: "Frontend", name: "React / Next.js", tags: ["React 18", "Next.js 14", "SSR/SSG", "GraphQL", "Apollo", "Tailwind"] },
  { cat: "Blockchain", name: "Web3 & DeFi", tags: ["Ethereum", "Solana", "Cardano", "Web3.js", "Ethers.js"] },
  { cat: "Backend", name: "Node.js", tags: ["Node 20+", "Express", "NestJS", "Apollo Server","Restful API"] },
  { cat: "Backend", name: "Golang", tags: ["GoLang", "WebSockets","Apollo Server","Restful API"] },
  { cat: "Infra", name: "Data", tags: ["Firebase Database","SupabaseJS","Snowflake","Datalake", "PostgreSQL", "MongoDB", "Firebase"] },
  { cat: "CICD", name: "DevOps", tags: ["GitHub Actions", "GitLab CI", "AWS", "Testflight","Fastlane","Docker"] },
  { cat: "Analitics", name: "DevOps", tags: ["Amplitude", "Firebase Analytics", "Snowflake", "Datalake"] },
  { cat: "Design", name: "UI/UX & Tools", tags: ["Figma", "Pixel-perfect", "Adaptive", "MUI", "React Cosmos", "Tailwind CSS"] },
  { cat: "AI", name: "AI Tools", tags: ["Cursor", "NotebookLM","Qwen3.5","Google Stitch","Google Gemini"] },
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
    "const dev = new Engineer({ yoe: 11, stack: 'RN' })",
    "await dev.ship({ domain: 'fintech', perf: '+40%' })",
    "// available · remote / relocation",
  ],
  ru: [
    "const dev = new Engineer({ yoe: 11, stack: 'RN' })",
    "await dev.ship({ domain: 'fintech', perf: '+40%' })",
    "// доступен · удалёнка / релокация",
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
    roleVal: "Senior Mobile Engineer / Lead",
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
    roleVal: "Senior Mobile Engineer / Lead",
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
    introLead: "I'm currently open to ",
    introHl: "senior / lead positions",
    introRest:
      " in React Native or Frontend — remote or relocation. Response time is usually within 24 hours via Telegram.",
    channels: {
      tg: { label: "Telegram (preferred)", val: "@mustreets" },
      email: { label: "Email" },
      gh: { label: "GitHub", val: "Js-Nanodegree" },
    },
    availTitle: "Available from March 2026.",
    availBody:
      "Open to remote work worldwide and relocation to EU / UAE / other. Work permit available for Russia, Armenia, Belarus, Kazakhstan, Uzbekistan.",
    formTitle: "Send a message",
    formSub: "Or reach out directly via Telegram for a faster response.",
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
    introHl: "senior / lead позициям",
    introRest:
      " в React Native или фронтенде — удалённо или релокация. Обычно отвечаю в Telegram в течение суток.",
    channels: {
      tg: { label: "Telegram (предпочтительно)", val: "@mustreets" },
      email: { label: "Почта", val: "fintechmustreets@gmail.com" },
      gh: { label: "GitHub", val: "Js-Nanodegree" },
    },
    availTitle: "Доступен с марта 2026.",
    availBody:
      "Удалёнка по миру, релокация в EU / UAE и др. Оформление: Россия, Армения, Беларусь, Казахстан, Узбекистан.",
    formTitle: "Сообщение",
    formSub: "Быстрее ответить в Telegram — ссылки слева.",
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
