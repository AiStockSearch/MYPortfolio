/** Контент поста/проекта (редактируйте как JS). */
export default {
  "id": "cardano-vs-ethereum",
  "date": "2025-01-20",
  "category": "Web3",
  "draft": false,
  "tags": [
    "Cardano",
    "Ethereum",
    "Web3",
    "DApp",
    "Comparison"
  ],
  "i18n": {
    "ru": {
      "title": "Cardano vs Ethereum для мобильных DApp: личный опыт",
      "subtitle": "Два проекта, два блокчейна — что выбрать в 2025?",
      "readTime": "9 мин",
      "excerpt": "Я строил DApp на Ethereum (HAWEX) и на Cardano (CosmoFusion DAO). Вот честное сравнение с точки зрения разработчика мобильных приложений — без маркетинга.",
      "body": "## Контекст\n\nДелал кошельки и подпись транзакций на **Ethereum** (EVM, ethers.js) и на **Cardano** (UTxO, dApp-коннекторы по CIP-30). В презентациях цепочки похожи; в приложении — нет.\n\n## Разработка\n\nУ Ethereum экосистема толще: тестнеты, ABI, примеров больше. У Cardano в мобилке чаще приходится упираться в конкретные кошельки, CIP и качество RN-обвязок.\n\n## UX и комиссии\n\nПользователю важны **скорость подтверждения** и **понятная цена**. L1 Ethereum может быть дорогим; L2 снимает часть боли. В Cardano комиссии обычно низкие, но без объяснений в UI про UTxO новички теряются.\n\n## Что бы выбрал сейчас\n\n- **Ethereum / EVM** — если нужны охват кошельков, DeFi и проще нанять команду.\n- **Cardano** — если продукт ложится в UTxO-модель и вы готовы вкладываться в QA под кошельки.\n\nУниверсального «лучше» нет: **цепочка под продукт и команду, с которой реально уедете в прод**. Про интеграцию кошельков в RN — в статье [Web3 + React Native](/blog/web3-react-native).\n"
    },
    "en": {
      "title": "Cardano vs Ethereum for mobile DApps: hands-on notes",
      "subtitle": "Two projects, two chains — what I’d pick in 2025?",
      "readTime": "9 min",
      "excerpt": "I shipped DApps on Ethereum (HAWEX) and Cardano (CosmoFusion DAO). A frank comparison from a mobile engineer’s perspective — no marketing fluff.",
      "body": "## Context\n\nI built wallet flows and transaction signing on **Ethereum** (EVM, ethers.js) and on **Cardano** (UTxO, CIP-30 dApp connectors). The chains feel similar in slides; on mobile they are not.\n\n## Developer experience\n\nOn Ethereum, tooling is mature: testnets, local nodes, ABI encoding, and a huge stack overflow of examples. Cardano’s mobile story is thinner — you rely more on specific wallets, CIPs, and sometimes lagging RN libraries.\n\n## UX and fees\n\nUsers care about **time-to-confirm** and **predictable cost**. Ethereum L1 can be expensive; L2 helps. Cardano fees are usually low, but wallet UX and “which UTxOs are selected” can confuse first-time users unless you explain it in the UI.\n\n## What I’d choose today\n\n- **Ethereum / EVM** if you need the widest wallet support, DeFi legos, and hiring pool.\n- **Cardano** if the product roadmap fits UTxO constraints and you can invest in wallet-specific QA.\n\nNeither is “better” in the abstract — **match the chain to the product and the team you can actually ship with**. See also [web3 + React Native](/blog/web3-react-native) for wallet integration patterns.\n"
    }
  }
};
