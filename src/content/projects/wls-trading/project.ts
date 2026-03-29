/** Контент поста/проекта (редактируйте как JS). */
export default {
  "id": "wls-trading",
  "order": 60,
  "live": false,
  "featured": false,
  "stack": [
    "Julia",
    "GoLang",
    "React Native",
    "Cardano",
    "Apollo",
    "Wails",
    "AI Tools"
  ],
  "i18n": {
    "ru": {
      "name": "WLS Trading Desktop",
      "type": "Личный проект",
      "tagline": "Десктоп: торговля и соцсеть на Cardano",
      "role": "Senior Mobile / Lead",
      "links": [
        {
          "label": "GitHub",
          "href": "https://github.com/AiStockSearch/MemoryBank",
          "primary": true
        },
        {
          "label": "DAO репо",
          "href": "https://github.com/Fintech-Dao-Starting/Wails-Dao"
        }
      ],
      "metrics": [
        {
          "val": "Julia",
          "lbl": "Сервер"
        },
        {
          "val": "Wails",
          "lbl": "Десктоп"
        }
      ],
      "blocks": [
        {
          "type": "heroImage",
          "src": "/projects/wls-trading.png",
          "alt": "WLS Trading Desktop"
        },
        {
          "type": "section",
          "sectionKey": "overview"
        },
        {
          "type": "prose",
          "text": "Инициатива: десктоп для торговли и соцфункций на Cardano. Сервер на Julia, десктоп на Go (Wails), UI на React Native Web. Интеграция AI в разработку.\n"
        },
        {
          "type": "section",
          "sectionKey": "technical"
        },
        {
          "type": "prose",
          "text": "Julia для вычислений и бэктестов, Wails для нативного десктопа, RN Web для единого UI. Cursor, Grok и др. в пайплайне тестов и ревью архитектуры.\n"
        }
      ]
    },
    "en": {
      "name": "WLS Trading Desktop",
      "type": "Personal Project",
      "tagline": "Cardano trading & social desktop app",
      "role": "Senior Mobile Engineer / Lead",
      "links": [
        {
          "label": "GitHub",
          "href": "https://github.com/AiStockSearch/MemoryBank",
          "primary": true
        },
        {
          "label": "DAO Repo",
          "href": "https://github.com/Fintech-Dao-Starting/Wails-Dao"
        }
      ],
      "metrics": [
        {
          "val": "Julia",
          "lbl": "Server"
        },
        {
          "val": "Wails",
          "lbl": "Desktop"
        }
      ],
      "blocks": [
        {
          "type": "heroImage",
          "src": "/projects/wls-trading.png",
          "alt": "WLS Trading Desktop"
        },
        {
          "type": "section",
          "sectionKey": "overview"
        },
        {
          "type": "prose",
          "text": "Personal initiative — desktop trading & social app on Cardano. Julia server, Go desktop client, React Native web. Deep AI tooling integration.\n"
        },
        {
          "type": "section",
          "sectionKey": "technical"
        },
        {
          "type": "prose",
          "text": "Exploring alternative runtimes for high-performance finance apps. Julia chosen for its numerical computing strengths in backtesting and signal processing. Wails (Go) for cross-platform desktop with near-native performance. React Native Web for the UI layer — single codebase for desktop and mobile. AI tools (Cursor, Grok) integrated into the dev workflow for test generation and architecture review.\n"
        }
      ]
    }
  }
};
