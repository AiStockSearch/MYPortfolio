import { cvResumeExperienceTimeline } from "../entities/experienceTimeline";
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
    val:"https://github.com/Js-Nanodegree"
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
    "href": `mailto:${contacts.email.val}`
  },
  {
    "label": "github.com/Js-Nanodegree",
    "href": contacts.github.val
  }
]

/** Новее сверху (как в таймлайне опыта). */
const education={
  ru:[
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
    },
    {
      "deg": "Специалист, экономика и управление",
      "inst": "УГАТУ",
      "year": "2007 – 2015"
    }
  ],
  en:[
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
    },
    {
      "deg": "Bachelor's, Economics & Management",
      "inst": "Ufa State Aviation Technical University",
      "year": "2007 – 2015"
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
      "cvTitle": "Senior React Native Developer · Финтех и Enterprise",
      "location": "Уфа, Россия · Удалённо / Релокация",
      "profileTitle": "Профиль",
      "profileBody": "Senior React Native Developer с 11+ годами опыта: продакшен-приложения под нагрузкой — финтех, enterprise (LMS, HCM, ERP), retail и витрины на React.\nФокус на архитектуре клиентов для iOS, Android и Web, офлайн-first и real-time. Руководил командами до 5 инженеров, многократно доводил продукты от MVP до App Store и Google Play.\nОтдельный опыт — крипто- и биржевые мобильные клиенты. 2 место Web3 Hackathon 2023. Контрибьютор react-hook-form и zustand.\n",
      "expTitle": "Опыт",
      "expArea": {
        "front": "Frontend",
        "mobile": "Мобильная",
        "backend": "Бэкенд",
        "selfHosted": "Self-hosted",
        "aria": "Фильтр опыта по направлению",
        "noMatches":
          "Нет записей для этого направления — переключите вкладку (например, «Мобильная» или «Self-hosted»).",
        "caseStudy": "Кейс →",
        "selfHostedHeading": "Собственные продукты (self-hosted)",
      },
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
            "label": "Telegram",
            "href": contacts.telegram.val
          }
        ]
      },
      "contactLinks": contactLinks,
      "skillGroups": skillGroups().ru,
      "education": education.ru,
      "experience": cvResumeExperienceTimeline("ru")
    },
    "en": {
      "secLabel": "curriculum vitae",
      "title": "Resume",
      "printBtn": "Print / Save as PDF",
      "downloadCv": "Download CV (PDF)",
      "printHint": "Print opens your browser dialog — choose \"Save as PDF\" to export. The download button uses /cv.pdf when you host that file.",
      "contactBtn": "Contact Me",
      "cvTitle": "Senior React Native Developer | Fintech & Enterprise",
      "location": "Ufa, Russia · Remote / Relocation",
      "profileTitle": "Profile",
      "profileBody": "Senior React Native Developer with 11+ years shipping production apps under load — fintech, enterprise (LMS, HCM, ERP), retail and React-powered web surfaces.\nStrong in client architecture for iOS, Android and Web, offline-first and real-time. Led teams of up to 5 engineers; repeated releases from MVP to App Store and Google Play.\nSeparate track: crypto and exchange mobile clients. 2nd place Web3 Hackathon 2023. Contributor to react-hook-form and zustand.\n",
      "expTitle": "Experience",
      "expArea": {
        "front": "Front",
        "mobile": "Mobile",
        "backend": "Backend",
        "selfHosted": "Self-hosted",
        "aria": "Filter experience by track",
        "noMatches":
          "No entries for this track — try Mobile, Self-hosted, or another tab.",
        "caseStudy": "Case study →",
        "selfHostedHeading": "Own products (self-hosted)",
      },
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
            "href": contacts.github.val
          },
          {
            "label": "Telegram",
            "href": contacts.telegram.val
          }
        ]
      },
      "contactLinks": contactLinks,
      "skillGroups": skillGroups().en,
      "education": education.en,
      "experience": cvResumeExperienceTimeline("en")
    }
  }
};
