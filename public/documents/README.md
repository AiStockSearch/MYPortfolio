# Documents for portfolio cases

Положите сюда NDA-safe PDF/сканы (без паспортов и лишних ПДн).

Структура:

```
public/documents/
  transline/          # договоры / подтверждения Транслайн
  haqqex-wallet/
  mirapolis-lms/
  skif-trade/
  flowwow-erp/
  …
```

После добавления файла:

1. Укажите `href: /documents/<projectId>/<file>.pdf` в
   `src/content/documents/catalog.ts` **или** в YAML-блоке `documents` кейса.
2. Смените `status` с `on-request` на `available` (или уберите status).

Карточки со статусом «По запросу / NDA» уже показываются в скроллере на странице проекта.
