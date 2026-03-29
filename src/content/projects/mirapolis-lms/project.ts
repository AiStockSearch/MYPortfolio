/** Контент поста/проекта (редактируйте как JS). */
export default {
  "id": "mirapolis-lms",
  "order": 30,
  "live": true,
  "featured": false,
  "stack": [
    "React Native",
    "TypeScript",
    "Virtual Lists",
    "Redux",
    "Offline-first",
    "SQLite"
  ],
  "i18n": {
    "ru": {
      "name": "Mirapolis LMS",
      "type": "HR-tech · Enterprise",
      "tagline": "Корпоративное обучение и HR в мобильном приложении",
      "role": "Senior Mobile / Lead",
      "links": [
        {
          "label": "mirapolis.ru",
          "href": "https://www.mirapolis.ru/",
          "primary": true
        },
        {
          "label": "Google Play",
          "href": "https://play.google.com/store/apps/details?id=ru.mirapolis.lms2"
        }
      ],
      "metrics": [
        {
          "val": "+15%",
          "lbl": "DAU"
        },
        {
          "val": "-40%",
          "lbl": "Память"
        },
        {
          "val": "iPad+",
          "lbl": "Планшет"
        }
      ],
      "blocks": [
        {
          "type": "heroImage",
          "src": "/projects/mirapolis-lms.png",
          "alt": "Mirapolis LMS"
        },
        {
          "type": "section",
          "sectionKey": "overview"
        },
        {
          "type": "prose",
          "text": "Мобильная HCM/LMS для Mirapolis: плеер курсов, офлайн-обучение, тестирование, адаптивный планшетный UI для 100k+ пользователей в России.\n"
        },
        {
          "type": "section",
          "sectionKey": "technical"
        },
        {
          "type": "prose",
          "text": "Ключевая задача — offline-first: курсы без сети в полях. Кастомный движок синхронизации с разрешением конфликтов, дельта-обновления, фоновый sync. Virtual Lists снизили память на 40% на слабых Android. Модульность для white-label клиентов.\n"
        }
      ]
    },
    "en": {
      "name": "Mirapolis LMS",
      "type": "HRTech · Enterprise",
      "tagline": "Corporate learning & HR mobile ecosystem",
      "role": "Senior Mobile Engineer / Lead",
      "links": [
        {
          "label": "mirapolis.ru",
          "href": "https://www.mirapolis.ru/",
          "primary": true
        },
        {
          "label": "Google Play",
          "href": "https://play.google.com/store/apps/details?id=ru.mirapolis.lms2"
        }
      ],
      "metrics": [
        {
          "val": "+15%",
          "lbl": "DAU"
        },
        {
          "val": "-40%",
          "lbl": "Mem usage"
        },
        {
          "val": "iPad+",
          "lbl": "Tablet UX"
        }
      ],
      "blocks": [
        {
          "type": "heroImage",
          "src": "/projects/mirapolis-lms.png",
          "alt": "Mirapolis LMS"
        },
        {
          "type": "section",
          "sectionKey": "overview"
        },
        {
          "type": "prose",
          "text": "Mobile HCM/LMS ecosystem for Mirapolis. Built course player, offline learning mode, employee testing and adaptive tablet UI for 100k+ corporate users across Russia.\n"
        },
        {
          "type": "section",
          "sectionKey": "technical"
        },
        {
          "type": "prose",
          "text": "Core challenge was offline-first architecture: employees in field locations needed to download and complete courses without internet. Built a custom sync engine with conflict resolution, delta updates and background sync. Virtual Lists optimisation cut memory usage by 40% on low-end Android devices. Modular architecture allows white-label customisation per enterprise client.\n"
        }
      ]
    }
  }
};
