/** Контент поста/проекта (редактируйте как JS). */
export default {
  "id": "60fps-trading",
  "date": "2024-05-20",
  "category": "Performance",
  "draft": false,
  "tags": [
    "React Native",
    "Performance",
    "WebSockets",
    "Fintech"
  ],
  "i18n": {
    "ru": {
      "title": "60 FPS на торговых графиках в React Native",
      "subtitle": "Оптимизация рендеринга для real-time финтех приложений",
      "readTime": "6 мин",
      "excerpt": "HAQQEX — это ордербук, свечные графики и тысячи транзакций в реальном времени. Рассказываю, как добился стабильных 60 FPS и почему стандартные подходы не работают.",
      "body": "## Контекст\n\nТрейдинг — это самый жёсткий кейс для мобильного UI: данные меняются каждые 100ms, списки длинные, анимации должны быть плавными.\n\n## Главные враги производительности\n\n**1. JS thread — узкое место**\n\n```typescript\n// ❌ Плохо: каждый тик через JS bridge\nsocket.on('price', (data) => setState({ price: data }));\n\n// ✅ Хорошо: батчинг + Reanimated на UI thread\nsocket.on('price', batchUpdates(() => priceSharedValue.value = data.price));\n```\n\n**2. FlatList без оптимизации убивает память**\n\nКлючевые пропсы: `removeClippedSubviews`, `maxToRenderPerBatch={10}`, `windowSize={5}`.\n\n## Итог\n\nСтабильные 60 FPS на iPhone 12 и флагманских Android устройствах.\n"
    },
    "en": {
      "title": "60 FPS trading charts in React Native",
      "subtitle": "Rendering tricks for real-time fintech UIs",
      "readTime": "6 min",
      "excerpt": "HAQQEX pairs order books, candle charts, and live transactions. Here’s how we kept 60 FPS when naive React patterns fall apart.",
      "body": "## Context\n\nTrading UIs are brutal: ticks every ~100ms, long lists, and animations that must stay smooth.\n\n## Biggest performance traps\n\n**1. The JS thread becomes the bottleneck**\n\n```typescript\n// ❌ Bad: every tick crosses the bridge\nsocket.on('price', (data) => setState({ price: data }));\n\n// ✅ Better: batch + Reanimated on the UI thread\nsocket.on('price', batchUpdates(() => (priceSharedValue.value = data.price)));\n```\n\n**2. Un-tuned FlatList eats memory**\n\nTune `removeClippedSubviews`, `maxToRenderPerBatch={10}`, `windowSize={5}`.\n\n## Result\n\nStable 60 FPS on iPhone 12-class devices and flagship Android hardware.\n"
    }
  }
};
