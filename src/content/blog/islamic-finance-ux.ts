/** Контент поста/проекта (редактируйте как JS). */
export default {
  "id": "islamic-finance-ux",
  "date": "2024-11-15",
  "category": "UX/Product",
  "draft": false,
  "tags": [
    "UX",
    "Fintech",
    "MENA",
    "HAQQEX",
    "Product"
  ],
  "i18n": {
    "ru": {
      "title": "Islamic Finance UX: как мы строили HAQQEX",
      "subtitle": "Проектирование финансового приложения по стандартам шариата",
      "readTime": "7 мин",
      "excerpt": "Разрабатывать финтех для исламского рынка — это не просто убрать слово 'процент'. Рассказываю, как мы проектировали HAQQEX для региона MENA с учётом культурных и религиозных требований.",
      "body": "## Что такое Riba и почему это важно для UX\n\nRiba (риба) — запрет на ростовщичество в исламском праве. Это влияет на каждый экран:\n\n- Нельзя показывать % доходности напрямую\n- Комиссии должны быть чётко обозначены как фиксированные\n- Прозрачность транзакций — обязательное требование\n\n## Как это повлияло на дизайн\n\n**Вместо:** «Доходность 8.5% годовых»\n**Пишем:** «Ожидаемая прибыль: 850 AED / год»\n\nКаждый инвестиционный продукт имеет экран с полным описанием структуры сделки.\n\n## Работа с арабской типографикой\n\nRTL layout — это не просто `direction: rtl`. Это переосмысление всей навигации, иконографики и flow экранов.\n"
    },
    "en": {
      "title": "Islamic Finance UX: how we built HAQQEX",
      "subtitle": "Designing a finance app that respects Sharia standards",
      "readTime": "7 min",
      "excerpt": "Islamic fintech isn’t “remove the word interest”. Here’s how we shaped HAQQEX for MENA with cultural and religious constraints in mind.",
      "body": "## What Riba is — and why UX must care\n\nRiba forbids usury in Islamic law. That changes almost every screen:\n\n- Don’t show yield as a plain “%” without context\n- Fees must read as fixed, transparent charges\n- Transaction clarity is non‑negotiable\n\n## How it changed the product UI\n\n**Instead of:** “8.5% APY”\n**We show:** “Expected profit: 850 AED / year”\n\nEvery investment flow includes a deal-structure explainer.\n\n## Arabic typography & RTL\n\nRTL isn’t just `direction: rtl` — it’s navigation, iconography, and entire flows rethought.\n"
    }
  }
};
