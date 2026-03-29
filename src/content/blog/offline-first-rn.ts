/** Контент поста/проекта (редактируйте как JS). */
export default {
  "id": "offline-first-rn",
  "date": "2024-03-15",
  "category": "Architecture",
  "draft": false,
  "tags": [
    "React Native",
    "SQLite",
    "Sync Engine",
    "ERP"
  ],
  "i18n": {
    "ru": {
      "title": "Offline-first архитектура в React Native",
      "subtitle": "Как мы построили ERP, который работает без интернета",
      "readTime": "8 мин",
      "excerpt": "Склад без Wi-Fi — это реальность. Рассказываю, как проектировал offline-first систему для Flowwow: локальная база, delta-sync протокол и разрешение конфликтов.",
      "body": "## Проблема\n\nКогда ко мне пришёл проект Flowwow, казалось бы простая задача — мобильный ERP для склада. Но первый же разговор с операторами всё изменил: *«У нас на складе нет интернета»*.\n\n## Архитектура\n\nЯ выбрал связку **SQLite (через WatermelonDB) + custom Sync Engine**. Ключевые решения:\n\n```typescript\n// Delta sync: отправляем только изменённые записи\nconst syncDelta = async (lastSyncTs: number) => {\n  const changes = await db.changes.where('updated_at').gt(lastSyncTs).fetch();\n  return pushToServer(changes);\n};\n```\n\n### Три принципа offline-first:\n1. **Local first** — все операции сначала пишутся локально\n2. **Optimistic UI** — UI не ждёт сервер\n3. **Conflict resolution** — last-write-wins с ручным разрешением критичных конфликтов\n\n## Результат\n\nВремя синхронизации сократилось на **40%** для магазинов с 50 000+ SKU. Операторы перестали замечать сеть.\n"
    },
    "en": {
      "title": "Offline-first architecture in React Native",
      "subtitle": "How we shipped an ERP that works without the internet",
      "readTime": "8 min",
      "excerpt": "No Wi‑Fi in the warehouse is normal. Here’s how we designed Flowwow’s offline stack: local DB, delta sync, and conflict handling.",
      "body": "## The problem\n\nFlowwow looked like “just” a mobile ERP — until operators said: *“We don’t have internet on the floor.”*\n\n## Architecture\n\nWe paired **SQLite (via WatermelonDB) with a custom sync engine**:\n\n```typescript\n// Delta sync: only push what changed\nconst syncDelta = async (lastSyncTs: number) => {\n  const changes = await db.changes.where('updated_at').gt(lastSyncTs).fetch();\n  return pushToServer(changes);\n};\n```\n\n### Three offline-first rules\n1. **Local first** — writes land locally immediately\n2. **Optimistic UI** — never block the UI on the network\n3. **Conflict resolution** — LWW plus manual paths for critical rows\n\n## Outcome\n\nSync time dropped **~40%** for 50k+ SKU stores — operators stopped “feeling” the network.\n"
    }
  }
};
