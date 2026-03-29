/** Контент поста/проекта (редактируйте как JS). */
export default {
  "slug": "how-we-work",
  "order": 1,
  "live": false,
  "i18n": {
    "ru": {
      "typeLabel": "Процесс",
      "title": "Как мы работаем",
      "tagline": "Страница на блоках, как кейсы — контент в YAML, вёрстка общая.",
      "role": "",
      "links": [],
      "metrics": [],
      "stack": [],
      "blocks": [
        {
          "type": "prose",
          "text": "## Контент из JS\n\nДобавьте новый файл `*.js` в `src/content/sitePages/` — Vite подхватит его через `import.meta.glob`, править список страниц вручную не нужно.\n\nТипы **блоков** те же, что в `project.js` проектов: `prose`, `section`, `heroImage`, `image`, `keyResults`, `techStack`, `partner`, `appLinks` и т.д.\n\nУ `heroImage` без поля `src` путь к картинке по умолчанию — `/projects/<slug>.png`; укажите `src`, если файл в другом месте.\n"
        },
        {
          "type": "section",
          "title": "Маршрут"
        },
        {
          "type": "prose",
          "text": "Страница открывается по адресу **`/page/how-we-work`** (slug из YAML)."
        }
      ]
    },
    "en": {
      "typeLabel": "Process",
      "title": "How we work",
      "tagline": "A block-based page like project cases — content lives in YAML, layout is shared.",
      "role": "",
      "links": [],
      "metrics": [],
      "stack": [],
      "blocks": [
        {
          "type": "prose",
          "text": "## Content-driven pages\n\nAdd a new `*.js` file under `src/content/sitePages/`. The app picks it up via `import.meta.glob` — no registry file to edit.\n\nUse the same **block** `type` values as in project `project.js`: `prose`, `section`, `heroImage`, `image`, `keyResults`, `techStack`, `partner`, `appLinks`, etc.\n\nFor `heroImage` without `src`, the image path defaults to `/projects/<slug>.png` — set `src` explicitly if your asset lives elsewhere.\n"
        },
        {
          "type": "section",
          "title": "Routing"
        },
        {
          "type": "prose",
          "text": "These pages are served at **`/page/how-we-work`** (slug from YAML)."
        }
      ]
    }
  }
};
