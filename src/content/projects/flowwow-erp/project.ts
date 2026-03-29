/** Контент поста/проекта (редактируйте как JS). */
export default {
  "id": "flowwow-erp",
  "order": 50,
  "live": true,
  "featured": false,
  "stack": [
    "React Native",
    "React",
    "Firebase",
    "Android SDK",
    "SQLite",
    "Bluetooth",
    "REST"
  ],
  "i18n": {
    "ru": {
      "name": "Flowwow ERP",
      "type": "Ритейл · ERP",
      "tagline": "Складской ERP в offline-first",
      "role": "Senior Mobile / Lead",
      "links": [
        {
          "label": "Google Play",
          "href": "https://play.google.com/store/apps/details?id=com.hoog.prod",
          "primary": true
        }
      ],
      "metrics": [
        {
          "val": "-40%",
          "lbl": "Синк"
        },
        {
          "val": "-20%",
          "lbl": "Ошибки ввода"
        }
      ],
      "blocks": [
        {
          "type": "heroImage",
          "src": "/projects/flowwow-erp.png",
          "alt": "Flowwow ERP"
        },
        {
          "type": "section",
          "sectionKey": "overview"
        },
        {
          "type": "prose",
          "text": "Мобильный ERP для розничного склада: сканеры штрихкодов, чековые принтеры, учёт 50k+ SKU при нестабильной сети.\n"
        },
        {
          "type": "section",
          "sectionKey": "technical"
        },
        {
          "type": "prose",
          "text": "Архитектура вокруг offline-first: локальный SQLite и протокол синка, дельта-сжатие снизило объём данных на 40%. Bluetooth-сканеры Symbol/Zebra, печать чеков на Epson.\n"
        }
      ]
    },
    "en": {
      "name": "Flowwow ERP",
      "type": "Retail · ERP",
      "tagline": "Offline-first warehouse management system",
      "role": "Senior Mobile Engineer / Lead",
      "links": [
        {
          "label": "Google Play",
          "href": "https://play.google.com/store/apps/details?id=com.hoog.prod",
          "primary": true
        }
      ],
      "metrics": [
        {
          "val": "-40%",
          "lbl": "Sync time"
        },
        {
          "val": "-20%",
          "lbl": "Input errors"
        }
      ],
      "blocks": [
        {
          "type": "heroImage",
          "src": "/projects/flowwow-erp.png",
          "alt": "Flowwow ERP"
        },
        {
          "type": "section",
          "sectionKey": "overview"
        },
        {
          "type": "prose",
          "text": "Mobile ERP for retail warehouse management. Barcode scanner & receipt printer integrations, inventory management for 50k+ SKU stores with unstable network connectivity.\n"
        },
        {
          "type": "section",
          "sectionKey": "technical"
        },
        {
          "type": "prose",
          "text": "Offline-first was the core architectural constraint: warehouse workers operate in areas with no signal. Built a local SQLite database with a custom sync protocol — delta compression reduced sync payloads by 40%. Hardware integration with Symbol/Zebra barcode scanners via Bluetooth. Custom receipt printing module for Epson thermal printers.\n"
        }
      ]
    }
  }
};
