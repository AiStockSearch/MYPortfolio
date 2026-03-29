/** Контент поста/проекта (редактируйте как JS). */
export default {
  "id": "web3-react-native",
  "date": "2024-07-10",
  "category": "Web3",
  "draft": false,
  "tags": [
    "React Native",
    "Blockchain",
    "Web3",
    "Ethers.js",
    "Security"
  ],
  "i18n": {
    "ru": {
      "title": "Web3 + React Native: интеграция блокчейн-кошельков",
      "subtitle": "Практическое руководство от HD-кошелька до подписи транзакций",
      "readTime": "10 мин",
      "excerpt": "Делаю крипто-кошелёк в первый раз? Вот всё, что я узнал за 3 проекта: генерация ключей, хранение в Secure Enclave, подпись транзакций и самые опасные ошибки.",
      "body": "## С чего начать\n\nГлавное правило: **никогда не храни приватные ключи в AsyncStorage**. Только Keychain (iOS) / Keystore (Android).\n\n## HD Wallet генерация\n\n```typescript\nimport { ethers } from 'ethers';\n\nconst generateWallet = () => {\n  const wallet = ethers.Wallet.createRandom();\n  return {\n    address: wallet.address,\n    mnemonic: wallet.mnemonic.phrase, // показать пользователю один раз\n    privateKey: wallet.privateKey,    // сохранить в Keychain\n  };\n};\n```\n\n## Secure storage\n\nИспользуй `react-native-keychain` — он автоматически выбирает Secure Enclave на iOS и StrongBox на Android.\n"
    },
    "en": {
      "title": "Web3 + React Native: shipping blockchain wallets",
      "subtitle": "From HD wallets to transaction signing — a practical guide",
      "readTime": "10 min",
      "excerpt": "Building a crypto wallet for the first time? Here’s what three production apps taught me about keys, secure storage, signing, and the mistakes that hurt the most.",
      "body": "## Start here\n\n**Never store private keys in AsyncStorage.** Use Keychain (iOS) / Keystore (Android).\n\n## HD wallet generation\n\n```typescript\nimport { ethers } from 'ethers';\n\nconst generateWallet = () => {\n  const wallet = ethers.Wallet.createRandom();\n  return {\n    address: wallet.address,\n    mnemonic: wallet.mnemonic.phrase, // show once\n    privateKey: wallet.privateKey,    // store in Keychain\n  };\n};\n```\n\n## Secure storage\n\nUse `react-native-keychain` — it maps to Secure Enclave on iOS and StrongBox on Android when available.\n"
    }
  }
};
