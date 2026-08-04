import { cvResumeExperienceTimeline } from "../entities/experienceTimeline";
import { homeSkillsBlocks } from "../siteContent";
import { CONTACT_EMAIL, GITHUB_URL, HABR_CAREER_URL, TELEGRAM_URL } from "../../constants/links";

const contacts = {
  telegram: {
    name: "Telegram",
    val: TELEGRAM_URL,
  },
  email: {
    name: "Email",
    val: CONTACT_EMAIL,
  },
  github: {
    name: "GitHub",
    val: GITHUB_URL,
  },
  habr: {
    name: "Habr",
    val: HABR_CAREER_URL,
  },
  phone: {
    name: "Phone",
    val: "+7 (996) 104-93-57",
  },
  gitlab: {
    name: "GitLab",
    val: "https://gitlab.com/anitalorack",
  },
};

const contactLinks = [
  {
    label: contacts.phone.val,
    href: "tel:+79961049357",
  },
  {
    label: "Telegram: @mustreets",
    href: contacts.telegram.val,
  },
  {
    label: contacts.email.val,
    href: `mailto:${contacts.email.val}`,
  },
  {
    label: "github.com/Js-Nanodegree",
    href: contacts.github.val,
  },
];

/** Новее сверху (как в таймлайне опыта). */
const education = {
  ru: [
    {
      deg: "Кандидат наук, математические методы в экономике",
      inst: "УГАТУ, Институт экономики и управления",
      year: "2017",
    },
    {
      deg: "Высшее, менеджмент организации",
      inst: "УГАТУ, Институт экономики и управления",
      year: "2015",
    },
    {
      deg: "Бакалавр, налоги и налогообложение",
      inst: "УГАТУ, Институт экономики и управления",
      year: "2013",
    },
    {
      deg: "Промышленная разработка на JavaScript",
      inst: "Университет Иннополис",
      year: "2021",
    },
    {
      deg: "Nanodegree: iOS Developer",
      inst: "Udacity",
      year: "2019",
    },
    {
      deg: "Nanodegree: Professional React Developer",
      inst: "Udacity",
      year: "2017",
    },
    {
      deg: "Nanodegree: Full Stack Web Developer",
      inst: "Udacity",
      year: "2017",
    },
  ],
  en: [
    {
      deg: "PhD Candidate, Mathematical Methods in Economics",
      inst: "USATU, Institute of Economics & Management",
      year: "2017",
    },
    {
      deg: "Higher education, Organization Management",
      inst: "USATU, Institute of Economics & Management",
      year: "2015",
    },
    {
      deg: "Bachelor, Taxation",
      inst: "USATU, Institute of Economics & Management",
      year: "2013",
    },
    {
      deg: "Industrial JavaScript Development",
      inst: "Innopolis University",
      year: "2021",
    },
    {
      deg: "Nanodegree: iOS Developer",
      inst: "Udacity",
      year: "2019",
    },
    {
      deg: "Nanodegree: Professional React Developer",
      inst: "Udacity",
      year: "2017",
    },
    {
      deg: "Nanodegree: Full Stack Web Developer",
      inst: "Udacity",
      year: "2017",
    },
  ],
};

const skillGroups = () => {
  const homeSkillsBlocksArray = homeSkillsBlocks.reduce<{ title: string; list: string }[]>(
    (acc, item) => {
      acc.push({
        title: item.cat,
        list: item.tags.join(", "),
      });
      return acc;
    },
    []
  );
  return {
    ru: homeSkillsBlocksArray,
    en: homeSkillsBlocksArray,
  };
};

export default {
  i18n: {
    ru: {
      secLabel: "резюме",
      title: "Резюме",
      printBtn: "Печать / PDF",
      downloadCv: "Скачать CV (PDF)",
      printHint:
        "Печать открывает диалог браузера — выберите «Сохранить как PDF». Кнопка скачивания ведёт на /cv.pdf, если файл лежит в public.",
      contactBtn: "Написать",
      cvTitle: "Senior Mobile Developer · React Native / iOS / Android",
      location: "Москва, м. Академическая · Удалённо / Офис / Релокация",
      profileTitle: "Профиль",
      profileBody:
        "Senior Mobile Developer, 8+ лет в React Native и нативной разработке (Swift / Kotlin / KMP). Специализация: FinTech / Web3, Enterprise LMS, Offline-First и POS/hardware. Опыт лидирования мобильных команд до 5 человек, публикации в App Store и Google Play, crash-free >99.9%. Фокус: Senior / Lead Mobile (RN) и Mobile Architect (RN + native iOS/Android).\nАнглийский C1. Контрибьютор react-hook-form и zustand. 2 место Web3 Hackathon 2023.\n",
      expTitle: "Опыт",
      expArea: {
        front: "Frontend",
        mobile: "Мобильная",
        backend: "Бэкенд",
        selfHosted: "Self-hosted",
        aria: "Фильтр опыта по направлению",
        noMatches:
          "Нет записей для этого направления — переключите вкладку (например, «Мобильная» или «Self-hosted»).",
        caseStudy: "Кейс →",
        selfHostedHeading: "Собственные продукты (self-hosted)",
      },
      skillsTitle: "Навыки",
      eduTitle: "Образование и сертификаты",
      referenceLinks: {
        sectionTitle: "Ссылки и материалы",
        items: [
          {
            label: "Блог и заметки",
            href: "/blog",
            note: "Статьи в том же контент-пайплайне, что и это резюме",
          },
          {
            label: "Кейсы проектов",
            href: "/projects",
          },
          {
            label: "GitHub",
            href: contacts.github.val,
          },
          {
            label: "Telegram",
            href: contacts.telegram.val,
          },
          {
            label: "Habr Career",
            href: contacts.habr.val,
          },
        ],
      },
      contactLinks: contactLinks,
      skillGroups: skillGroups().ru,
      education: education.ru,
      experience: cvResumeExperienceTimeline("ru"),
    },
    en: {
      secLabel: "curriculum vitae",
      title: "Resume",
      printBtn: "Print / Save as PDF",
      downloadCv: "Download CV (PDF)",
      printHint:
        'Print opens your browser dialog — choose "Save as PDF" to export. The download button uses /cv.pdf when you host that file.',
      contactBtn: "Contact Me",
      cvTitle: "Senior Mobile Developer · React Native / iOS / Android",
      location: "Moscow, Akademicheskaya · Remote / On-site / Relocation",
      profileTitle: "Profile",
      profileBody:
        "Senior Mobile Developer, 8+ years in React Native and native (Swift / Kotlin / KMP). Focus: FinTech / Web3, Enterprise LMS, Offline-First and POS/hardware. Led mobile teams of up to 5; App Store & Google Play shipping; crash-free >99.9%. Target roles: Senior / Lead Mobile (RN) and Mobile Architect (RN + native iOS/Android).\nEnglish C1. Contributor to react-hook-form and zustand. 2nd place Web3 Hackathon 2023.\n",
      expTitle: "Experience",
      expArea: {
        front: "Front",
        mobile: "Mobile",
        backend: "Backend",
        selfHosted: "Self-hosted",
        aria: "Filter experience by track",
        noMatches: "No entries for this track — try Mobile, Self-hosted, or another tab.",
        caseStudy: "Case study →",
        selfHostedHeading: "Own products (self-hosted)",
      },
      skillsTitle: "Technical Skills",
      eduTitle: "Education & Certifications",
      referenceLinks: {
        sectionTitle: "Links & writing",
        items: [
          {
            label: "Blog & notes (articles)",
            href: "/blog",
            note: "Long-form posts, same content pipeline as this CV",
          },
          {
            label: "Project cases",
            href: "/projects",
          },
          {
            label: "GitHub",
            href: contacts.github.val,
          },
          {
            label: "Telegram",
            href: contacts.telegram.val,
          },
          {
            label: "Habr Career",
            href: contacts.habr.val,
          },
        ],
      },
      contactLinks: contactLinks,
      skillGroups: skillGroups().en,
      education: education.en,
      experience: cvResumeExperienceTimeline("en"),
    },
  },
};
