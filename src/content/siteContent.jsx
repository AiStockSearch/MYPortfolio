/** Локализованный контент для главной и резюме (длинные блоки). */

export const homeHero = {
  en: {
    avail: "Available for work · Remote / Relocation",
    subPre: "Senior ",
    subHL: "React Native",
    subMid: " & Frontend Engineer",
    subAfterWeb3: " · Fintech · Enterprise · 11 yrs",
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
    subMid: " и фронтенд-инженер",
    subAfterWeb3: " · Финтех · Enterprise · 11 лет",
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
      "I'm a <span class=\"hl\">Senior React Native &amp; Frontend Engineer</span> with <span class=\"hl\">11+ years</span> building production apps used by hundreds of thousands of people.",
    p2Html:
      "My sweet spot is <span class=\"hl2\">complex real-time systems</span> — trading platforms, offline-first ERPs, LMS ecosystems — where performance, architecture and UX all matter equally.",
    p3Html:
      "Active in <span class=\"hl2\">Web3 &amp; DeFi</span> (🥈 Web3 Hackathon 2023), contributed to <code>react-hook-form</code> and <code>zustand</code>.",
    badges: ["TDD", "Clean Code", "Agile/Scrum", "Team Lead", "Figma → Code", "AI Tools"],
    photoPh: "photo.jpg",
    tag: "Vyacheslav · Ufa → World",
  },
  ru: {
    sec: "обо мне",
    title: "Инженер.\nАрхитектор.\nСоздатель.",
    p1Html:
      "Я <span class=\"hl\">Senior React Native и фронтенд-инженер</span> с <span class=\"hl\">11+ годами</span> опыта в продакшен-приложениях для сотен тысяч пользователей.",
    p2Html:
      "Сильная сторона — <span class=\"hl2\">сложные real-time системы</span>: торговые платформы, offline-first ERP, LMS, где важны и производительность, и архитектура, и UX.",
    p3Html:
      "В теме <span class=\"hl2\">Web3 и DeFi</span> (🥈 Web3 Hackathon 2023), контрибьютор <code>react-hook-form</code> и <code>zustand</code>.",
    badges: ["TDD", "Чистый код", "Agile/Scrum", "Тимлид", "Figma → код", "AI-инструменты"],
    photoPh: "photo.jpg",
    tag: "Вячеслав · Уфа → Мир",
  },
};

export const homeWork = {
  en: { sec: "work", title: "Featured Projects", more: "All Projects →", live: "Live" },
  ru: { sec: "работы", title: "Избранные проекты", more: "Все проекты →", live: "В продакшене" },
};

export const homeSkills = {
  en: {
    sec: "expertise",
    title: "Technical Stack",
    blocks: [
      { cat: "Mobile", name: "React Native", tags: ["Expo", "CLI", "TypeScript", "Redux", "RTK-Query", "Socket.io"] },
      { cat: "Frontend", name: "React / Next.js", tags: ["React 18", "Next.js 14", "SSR/SSG", "GraphQL", "Apollo", "Tailwind"] },
      { cat: "Blockchain", name: "Web3 & DeFi", tags: ["Ethereum", "Solana", "Cardano", "Web3.js", "Ethers.js", "Hardhat"] },
      { cat: "Backend", name: "Node.js / Go", tags: ["Node 20", "Express", "NestJS", "GoLang", "WebSockets", "Julia"] },
      { cat: "Infra", name: "DevOps & Data", tags: ["Docker", "GitLab CI", "AWS", "PostgreSQL", "MongoDB", "Firebase"] },
      { cat: "Design", name: "UI/UX & Tools", tags: ["Figma", "Pixel-perfect", "Adaptive", "MUI", "Storybook", "Amplitude"] },
    ],
  },
  ru: {
    sec: "экспертиза",
    title: "Технологический стек",
    blocks: [
      { cat: "Mobile", name: "React Native", tags: ["Expo", "CLI", "TypeScript", "Redux", "RTK-Query", "Socket.io"] },
      { cat: "Фронтенд", name: "React / Next.js", tags: ["React 18", "Next.js 14", "SSR/SSG", "GraphQL", "Apollo", "Tailwind"] },
      { cat: "Блокчейн", name: "Web3 и DeFi", tags: ["Ethereum", "Solana", "Cardano", "Web3.js", "Ethers.js", "Hardhat"] },
      { cat: "Бэкенд", name: "Node.js / Go", tags: ["Node 20", "Express", "NestJS", "GoLang", "WebSockets", "Julia"] },
      { cat: "Инфра", name: "DevOps и данные", tags: ["Docker", "GitLab CI", "AWS", "PostgreSQL", "MongoDB", "Firebase"] },
      { cat: "Дизайн", name: "UI/UX и инструменты", tags: ["Figma", "Pixel-perfect", "Адаптив", "MUI", "Storybook", "Amplitude"] },
    ],
  },
};

export const homeExp = {
  en: [
    {
      period: "Mar 2023 — Dec 2025",
      company: "haqqex.com",
      tag: "HAQQEX",
      role: "Senior React Native Engineer",
      desc: "Islamic finance digital asset exchange for MENA. MVP to App Store / Google Play.",
      ach: [
        "Stable <span class='m'>60 FPS</span> on complex trading charts",
        "Reduced TTM by <span class='m'>25%</span>",
        "Biometric auth, encrypted storage, real-time orderbook",
      ],
      stack: ["React Native", "TypeScript", "Socket.io", "Redux", "Web3"],
    },
    {
      period: "Jul 2024 — Sep 2025",
      company: "mirapolis.ru",
      tag: "MIRAPOLIS",
      role: "Senior Mobile Developer",
      desc: "HCM/LMS mobile ecosystem for 100k+ corporate users across Russia.",
      ach: [
        "<span class='m'>DAU +15%</span> through offline-mode overhaul",
        "<span class='m'>-40%</span> memory usage with Virtual Lists",
        "Dynamic module system for white-label clients",
      ],
      stack: ["React Native", "TypeScript", "React 18", "SQLite", "Offline-first"],
    },
    {
      period: "Nov 2022 — Jan 2024",
      company: "flowwow.com",
      tag: "FLOWWOW",
      role: "Senior Mobile Developer",
      desc: "Offline-first mobile ERP for retail warehouse management with hardware integrations.",
      ach: [
        "<span class='m'>-40%</span> sync time for 50 000+ SKU stores",
        "<span class='m'>-20%</span> receiving errors via client validation",
      ],
      stack: ["React Native", "Firebase", "Android SDK", "SQLite", "REST"],
    },
    {
      period: "Apr 2022 — Nov 2022",
      company: "hawex.com",
      tag: "DEFI TEAM",
      role: "Senior Mobile Developer",
      desc: "HAWEX Wallet — cross-platform crypto wallet. 🥈 Web3 Hackathon 2023.",
      ach: [
        "<span class='m'>+40%</span> performance via state management redesign",
        "Full CI/CD with Fastlane, pixel-perfect UI",
      ],
      stack: ["React Native", "TypeScript", "Blockchain", "Bitcoin", "RTK-Query"],
    },
  ],
  ru: [
    {
      period: "мар 2023 — дек 2025",
      company: "haqqex.com",
      tag: "HAQQEX",
      role: "Senior React Native Engineer",
      desc: "Исламский финтех и биржа цифровых активов для MENA. От MVP до App Store / Google Play.",
      ach: [
        "Стабильные <span class='m'>60 FPS</span> на сложных торговых графиках",
        "Сокращение TTM на <span class='m'>25%</span>",
        "Биометрия, шифрование, стакан в реальном времени",
      ],
      stack: ["React Native", "TypeScript", "Socket.io", "Redux", "Web3"],
    },
    {
      period: "июл 2024 — сен 2025",
      company: "mirapolis.ru",
      tag: "MIRAPOLIS",
      role: "Senior Mobile Developer",
      desc: "Мобильная HCM/LMS-экосистема для 100k+ корпоративных пользователей в России.",
      ach: [
        "<span class='m'>DAU +15%</span> за счёт переработки offline-режима",
        "<span class='m'>-40%</span> памяти с Virtual Lists",
        "Динамические модули для white-label клиентов",
      ],
      stack: ["React Native", "TypeScript", "React 18", "SQLite", "Offline-first"],
    },
    {
      period: "ноя 2022 — янв 2024",
      company: "flowwow.com",
      tag: "FLOWWOW",
      role: "Senior Mobile Developer",
      desc: "Offline-first мобильный ERP для розничных складов с интеграцией оборудования.",
      ach: [
        "<span class='m'>-40%</span> времени синка для магазинов 50 000+ SKU",
        "<span class='m'>-20%</span> ошибок приёмки за счёт валидации на клиенте",
      ],
      stack: ["React Native", "Firebase", "Android SDK", "SQLite", "REST"],
    },
    {
      period: "апр 2022 — ноя 2022",
      company: "hawex.com",
      tag: "DEFI TEAM",
      role: "Senior Mobile Developer",
      desc: "HAWEX Wallet — кроссплатформенный криптокошелёк. 🥈 Web3 Hackathon 2023.",
      ach: [
        "<span class='m'>+40%</span> производительности за счёт state management",
        "Полный CI/CD с Fastlane, pixel-perfect UI",
      ],
      stack: ["React Native", "TypeScript", "Blockchain", "Bitcoin", "RTK-Query"],
    },
  ],
};

export const homeCareer = {
  en: { sec: "career", title: "Experience" },
  ru: { sec: "карьера", title: "Опыт" },
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
      { id: "Web3", label: "Web3" },
      { id: "Fintech", label: "Fintech" },
      { id: "Enterprise", label: "Enterprise" },
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
      { id: "Web3", label: "Web3" },
      { id: "Fintech", label: "Финтех" },
      { id: "Enterprise", label: "Enterprise" },
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
    roleVal: "Senior Mobile / Lead",
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
      habr: { label: "Habr Career", val: "emil-reacted" },
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
      email: { label: "Почта" },
      gh: { label: "GitHub", val: "Js-Nanodegree" },
      habr: { label: "Habr Career", val: "emil-reacted" },
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
