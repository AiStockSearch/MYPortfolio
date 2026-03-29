import { homeSkillsBlocks } from "../siteContent";
const contacts={
  "telegram": {
    name:"Telegram",
    val:"https://t.me/mustreets"
  },
  "email": {
    name:"Email",
    val:"fintechmustreets@gmail.com"
  },
  "github": {
    name:"GitHub",
    val:"https://github.com/AiStockSearch"
  },
  "habr": {
    name:"Habr",
    val:"https://career.habr.com/emil-reacted"
  },
  "linkedin": {
    name:"LinkedIn",
    val:"https://www.linkedin.com/in/emil-reacted/"
  }
}

const contactLinks=[
  {
    "label": "Telegram: @mustreets",
    "href": contacts.telegram.val
  },
  {
    "label": contacts.email.val,
    "href": contacts.email.val
  },
  {
    "label": "github.com/Js-Nanodegree",
    "href": contacts.github.val
  },
  {
    "label": "career.habr.com/emil-reacted",
    "href": contacts.habr.val
  }
]

const education={
  ru:[
    {
      "deg": "Специалист, экономика и управление",
      "inst": "УГАТУ",
      "year": "2007 – 2015"
    },
    {
      "deg": "Full-Stack JavaScript Developer",
      "inst": "Университет Иннополис",
      "year": "2021 – 2022"
    },
    {
      "deg": "Nanodegree: iOS Developer",
      "inst": "Udacity",
      "year": "2018 – 2019"
    },
    {
      "deg": "Nanodegree: Professional React Developer",
      "inst": "Udacity",
      "year": "2017"
    },
    {
      "deg": "Nanodegree: Full Stack Web Developer",
      "inst": "Udacity",
      "year": "2017"
    }
  ],
  en:[
    {
      "deg": "Bachelor's, Economics & Management",
      "inst": "Ufa State Aviation Technical University",
      "year": "2007 – 2015"
    },
    {
      "deg": "Full-Stack JavaScript Developer",
      "inst": "Innopolis University",
      "year": "2021 – 2022"
    },
    {
      "deg": "Nanodegree: iOS Developer",
      "inst": "Udacity",
      "year": "2018 – 2019"
    },
    {
      "deg": "Nanodegree: Professional React Developer",
      "inst": "Udacity",
      "year": "2017"
    },
    {
      "deg": "Nanodegree: Full Stack Web Developer",
      "inst": "Udacity",
      "year": "2017"
    }
  ]
}

const skillGroups=()=>{
  const homeSkillsBlocksArray=homeSkillsBlocks.reduce<{ title: string; list: string }[]>((acc, item)=>{
  acc.push({
    "title": item.cat,
    "list": item.tags.join(", ")
  });
  return acc;
}, []);
  return {
  ru:homeSkillsBlocksArray,
  en:homeSkillsBlocksArray
}}




export default {
  "i18n": {
    "ru": {
      "secLabel": "резюме",
      "title": "Резюме",
      "printBtn": "Печать / PDF",
      "downloadCv": "Скачать CV (PDF)",
      "printHint": "Печать открывает диалог браузера — выберите «Сохранить как PDF». Кнопка скачивания ведёт на /cv.pdf, если файл лежит в public.",
      "contactBtn": "Написать",
      "cvTitle": "Senior React Native и фронтенд · Web3 · Финтех",
      "location": "Уфа, Россия · Удалённо / Релокация",
      "profileTitle": "Профиль",
      "profileBody": "Senior React Native и фронтенд-инженер с 11+ годами опыта в высоконагруженных кроссплатформенных системах.\nСпециализация — сложная архитектура интерфейсов для Web, iOS и Android и интеграции с блокчейн-экосистемой.\nРуководил командами до 5 инженеров, многократно выводил приложения от MVP до App Store и Google Play.\n2 место Web3 Hackathon 2023. Контрибьютор react-hook-form и zustand.\n",
      "expTitle": "Опыт",
      "skillsTitle": "Навыки",
      "eduTitle": "Образование и сертификаты",
      "referenceLinks": {
        "sectionTitle": "Ссылки и материалы",
        "items": [
          {
            "label": "Блог и заметки",
            "href": "/blog",
            "note": "Статьи в том же контент-пайплайне, что и это резюме"
          },
          {
            "label": "Кейсы проектов",
            "href": "/projects"
          },
          {
            "label": "GitHub",
            "href": contacts.github.val
          },
          {
            "label": "Habr Career",
            "href": contacts.habr.val
          },
          {
            "label": "Telegram",
            "href": contacts.telegram.val
          }
        ]
      },
      "contactLinks": contactLinks,
      "skillGroups": skillGroups().ru,
      "education": education.ru,
      "experience": [
        {
          "role": "Senior React Native Engineer",
          "company": "HAQQEX (haqqex.com)",
          "period": "мар 2023 — дек 2025",
          "desc": "Исламский финтех и биржа цифровых активов для MENA. Мобильная архитектура от MVP до сторов.",
          "ach": [
            "Стабильные 60 FPS на графиках и списках сделок",
            "Сокращение time-to-market на 25% за счёт кросс-командной работы",
            "Биометрия, шифрование, стакан в реальном времени (Socket.io)"
          ],
          "tags": [
            "React Native",
            "TypeScript",
            "Socket.io",
            "WebSockets",
            "Redux",
            "Web3"
          ]
        },
        {
          "role": "Senior Mobile Developer",
          "company": "Mirapolis (mirapolis.ru)",
          "period": "июл 2024 — сен 2025",
          "desc": "Мобильная HCM/LMS-экосистема для 100k+ корпоративных пользователей.",
          "ach": [
            "DAU +15% после переработки offline-режима",
            "Память -40% за счёт Virtual Lists",
            "Динамические модули для enterprise white-label"
          ],
          "tags": [
            "React Native",
            "TypeScript",
            "React 18",
            "SQLite",
            "Offline-first"
          ]
        },
        {
          "role": "Senior Mobile Developer",
          "company": "Flowwow (flowwow.com)",
          "period": "ноя 2022 — янв 2024",
          "desc": "Offline-first мобильный ERP для склада с сканерами и принтерами.",
          "ach": [
            "Время синка -40% для магазинов 50 000+ SKU",
            "Ошибки приёмки -20% за счёт валидации на клиенте"
          ],
          "tags": [
            "React Native",
            "Firebase",
            "Android SDK",
            "REST"
          ]
        },
        {
          "role": "Senior Mobile Developer",
          "company": "DeFi Team (hawex.com)",
          "period": "апр 2022 — ноя 2022",
          "desc": "HAWEX Wallet — кроссплатформенный криптокошелёк. 🥈 Web3 Hackathon 2023.",
          "ach": [
            "Производительность +40% за счёт state management",
            "Полный CI/CD, pixel-perfect UI"
          ],
          "tags": [
            "React Native",
            "TypeScript",
            "Blockchain",
            "Bitcoin"
          ]
        },
        {
          "role": "Senior Frontend Engineer",
          "company": "DV Group (dvgroup.com)",
          "period": "май 2021 — апр 2022",
          "desc": "Руководство фронтенд-командой. Модульная платформа соцаналитики с real-time дашбордами.",
          "ach": [
            "Масштабируемая библиотека React с тестами",
            "GitLab CI/CD + Docker"
          ],
          "tags": [
            "React",
            "Next.js",
            "TypeScript",
            "GraphQL",
            "Docker"
          ]
        }
      ]
    },
    "en": {
      "secLabel": "curriculum vitae",
      "title": "Resume",
      "printBtn": "Print / Save as PDF",
      "downloadCv": "Download CV (PDF)",
      "printHint": "Print opens your browser dialog — choose \"Save as PDF\" to export. The download button uses /cv.pdf when you host that file.",
      "contactBtn": "Contact Me",
      "cvTitle": "Senior React Native & Frontend Engineer · Web3 · Fintech",
      "location": "Ufa, Russia · Remote / Relocation",
      "profileTitle": "Profile",
      "profileBody": "Senior React Native & Frontend Engineer with 11+ years of professional experience building high-load cross-platform systems.\nSpecialised in complex interface architecture for Web, iOS and Android with deep Blockchain ecosystem integration.\nLed teams of up to 5 engineers, shipped apps from MVP to App Store/Google Play multiple times.\n2nd place Web3 Hackathon 2023. Active contributor to react-hook-form and zustand.\n",
      "expTitle": "Experience",
      "skillsTitle": "Technical Skills",
      "eduTitle": "Education & Certifications",
      "referenceLinks": {
        "sectionTitle": "Links & writing",
        "items": [
          {
            "label": "Blog & notes (articles)",
            "href": "/blog",
            "note": "Long-form posts, same content pipeline as this CV"
          },
          {
            "label": "Project cases",
            "href": "/projects"
          },
          {
            "label": "GitHub",
            "href": "https://github.com/Js-Nanodegree"
          },
          {
            "label": "Habr Career",
            "href": "https://career.habr.com/emil-reacted"
          },
          {
            "label": "Telegram",
            "href": "https://t.me/mustreets"
          }
        ]
      },
      "contactLinks": contactLinks,
      "skillGroups": skillGroups().en,
      "education": education.en,
      "experience": [
        {
          "role": "Senior React Native Engineer",
          "company": "HAQQEX (haqqex.com)",
          "period": "Mar 2023 — Dec 2025",
          "desc": "Islamic finance digital asset exchange for MENA. Led mobile architecture from MVP to App Store / Google Play.",
          "ach": [
            "Stable 60 FPS on complex trading charts and transaction lists",
            "Reduced Time-to-Market by 25% via cross-team coordination",
            "Biometric auth, encrypted storage, real-time orderbook via Socket.io"
          ],
          "tags": [
            "React Native",
            "TypeScript",
            "Socket.io",
            "WebSockets",
            "Redux",
            "Web3"
          ]
        },
        {
          "role": "Senior Mobile Developer",
          "company": "Mirapolis (mirapolis.ru)",
          "period": "Jul 2024 — Sep 2025",
          "desc": "HCM/LMS mobile ecosystem for 100k+ corporate users.",
          "ach": [
            "DAU +15% via offline-mode overhaul",
            "Memory usage -40% with Virtual Lists optimisation",
            "Dynamic module system for white-label enterprise clients"
          ],
          "tags": [
            "React Native",
            "TypeScript",
            "React 18",
            "SQLite",
            "Offline-first"
          ]
        },
        {
          "role": "Senior Mobile Developer",
          "company": "Flowwow (flowwow.com)",
          "period": "Nov 2022 — Jan 2024",
          "desc": "Offline-first mobile ERP for retail warehouse with barcode/printer integrations.",
          "ach": [
            "Sync time -40% for 50 000+ SKU stores",
            "Receiving errors -20% via client-side validation"
          ],
          "tags": [
            "React Native",
            "Firebase",
            "Android SDK",
            "REST"
          ]
        },
        {
          "role": "Senior Mobile Developer",
          "company": "DeFi Team (hawex.com)",
          "period": "Apr 2022 — Nov 2022",
          "desc": "HAWEX Wallet — cross-platform crypto wallet. 🥈 Web3 Hackathon 2023.",
          "ach": [
            "Performance +40% via state management redesign",
            "Full CI/CD pipeline, pixel-perfect UI"
          ],
          "tags": [
            "React Native",
            "TypeScript",
            "Blockchain",
            "Bitcoin"
          ]
        },
        {
          "role": "Senior Frontend Engineer",
          "company": "DV Group (dvgroup.com)",
          "period": "May 2021 — Apr 2022",
          "desc": "Led frontend team. Built modular social analytics platform with real-time dashboards.",
          "ach": [
            "Scalable React component library with full test coverage",
            "GitLab CI/CD + Docker pipeline"
          ],
          "tags": [
            "React",
            "Next.js",
            "TypeScript",
            "GraphQL",
            "Docker"
          ]
        }
      ]
    }
  }
};
