/** Контент поста/проекта (редактируйте как TS). */

const GH = "https://github.com/jacob-bd/gemini-notebook-mcp-cli";

const BODY_RU = `**Репозиторий:** [jacob-bd/gemini-notebook-mcp-cli](${GH})

## Зачем вообще контейнер

Я активно пользуюсь NotebookLM: закидываю туда документацию, спеки, статьи и спрашиваю по ним. Хотелось, чтобы агент в Cursor мог делать то же самое сам. Для этого есть открытый проект [gemini-notebook-mcp-cli](https://github.com/jacob-bd/gemini-notebook-mcp-cli) (пакет \`notebooklm-mcp-cli\` на PyPI): он даёт CLI \`nlm\` и MCP-сервер \`notebooklm-mcp\`.

Официально его ставят через \`uv\`/\`pip\`. Но мне не хотелось тащить ещё одно Python-окружение на рабочую машину, плюс хотелось одинаково запускать его на Mac и на Linux-сервере. Готового Dockerfile в репозитории нет, поэтому написал свой. Ниже — что получилось и где подводные камни.

## Пошаговая инструкция

### 1. Клонируем репозиторий

\`\`\`bash
git clone https://github.com/jacob-bd/gemini-notebook-mcp-cli.git
cd gemini-notebook-mcp-cli
\`\`\`

### 2. Пишем Dockerfile

Кладём в корень репозитория:

\`\`\`dockerfile
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1 HOME=/data
WORKDIR /src
COPY pyproject.toml README.md LICENSE ./
COPY src ./src
RUN pip install . && mkdir -p /data && rm -rf /src
WORKDIR /data
VOLUME ["/data"]
ENTRYPOINT ["notebooklm-mcp"]
\`\`\`

Ключевой момент — \`HOME=/data\`. Инструмент хранит профили и cookies в домашней директории, поэтому я делаю её volume: контейнер можно пересоздавать сколько угодно, логин сохранится.

### 3. Собираем образ

\`\`\`bash
docker build -t gemini-notebook-mcp-cli .
docker run --rm --entrypoint nlm gemini-notebook-mcp-cli --version
\`\`\`

У меня получился образ около 346 МБ на диске, \`nlm\` версии 0.15.7.

Если нужно перенести образ на другую машину без registry:

\`\`\`bash
docker save gemini-notebook-mcp-cli | gzip > gemini-notebook-mcp-cli.tar.gz
gunzip -c gemini-notebook-mcp-cli.tar.gz | docker load
\`\`\`

### 4. Логинимся через cookies

Это главный нюанс. Обычный \`nlm login\` открывает браузер и сам вытаскивает cookies — в контейнере браузера нет, так что этот путь не работает. Зато есть ручной режим: экспортируем cookies Google из браузера на хосте (после входа в notebooklm.google.com) в \`cookies.txt\` и импортируем:

\`\`\`bash
docker run --rm -it \\
  -v nlm-data:/data \\
  -v "$PWD/cookies.txt:/cookies.txt" \\
  --entrypoint nlm gemini-notebook-mcp-cli \\
  login --manual --file /cookies.txt
\`\`\`

Проверка:

\`\`\`bash
docker run --rm -v nlm-data:/data --entrypoint nlm gemini-notebook-mcp-cli login --check
\`\`\`

Альтернатива — передать cookies через переменную окружения \`NOTEBOOKLM_COOKIES\`. После импорта \`cookies.txt\` с хоста лучше удалить.

### 5. Запуск по stdio (основной режим для Cursor/Claude)

\`\`\`bash
docker run -i --rm -v nlm-data:/data gemini-notebook-mcp-cli
\`\`\`

Флаг \`-i\` обязателен: MCP-клиент общается с сервером через stdin/stdout.

### 6. Запуск по HTTP

Если удобнее держать сервер постоянно запущенным:

\`\`\`bash
docker run -d --name nlm-mcp -p 127.0.0.1:8000:8000 -v nlm-data:/data \\
  gemini-notebook-mcp-cli --transport http --host 0.0.0.0
\`\`\`

Эндпоинт — \`http://localhost:8000/mcp\`. Есть и \`--transport sse\`, порт меняется через \`--port\`. Обратите внимание на \`127.0.0.1:\` в \`-p\`: авторизации у HTTP-режима нет, наружу его открывать нельзя.

### 7. Подключаем к Cursor

В \`~/.cursor/mcp.json\` для stdio-варианта:

\`\`\`json
{
  "mcpServers": {
    "notebooklm": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-v", "nlm-data:/data", "gemini-notebook-mcp-cli"]
    }
  }
}
\`\`\`

Для HTTP-варианта:

\`\`\`json
{
  "mcpServers": {
    "notebooklm": { "url": "http://localhost:8000/mcp" }
  }
}
\`\`\`

В Claude Desktop конфиг такой же по структуре (\`mcpServers\` → \`command\`/\`args\`).

### 8. Проверяем

Перезапускаем Cursor, в настройках MCP сервер \`notebooklm\` должен загореться зелёным и показать список инструментов. Дальше просто просим агента: «покажи мои блокноты в NotebookLM». Если вместо списка ошибка авторизации — возвращаемся к шагу 4.

## Подводные камни и безопасность

- **Неофициальный API.** Инструмент работает через внутренние API NotebookLM. Google может их поменять, и всё сломается без предупреждения. Для личного использования ок, для продакшена — нет.
- **Cookies протухают.** По README они живут примерно 2–4 недели. Вне контейнера инструмент умеет обновлять их через headless-браузер, в моём образе браузера нет — поэтому периодически надо заново импортировать cookies. Чтобы он не пытался делать бесполезный refresh, можно выставить \`NOTEBOOKLM_DISABLE_HEADLESS_REFRESH=1\`.
- **Секреты лежат открытым текстом.** На обычной машине nlm может шифровать логин ключом из системного keychain, в контейнере keychain нет — данные хранятся обычными файлами в volume \`nlm-data\`. По сути это доступ к вашему Google-аккаунту, относитесь к volume как к секрету и не коммитьте \`cookies.txt\`.
- **HTTP без авторизации.** Только \`localhost\`. Для удалённого доступа у автора есть отдельный документ \`docs/REMOTE_MCP.md\` — читайте его, прежде чем что-то публиковать.

## Итог

Получился маленький самодостаточный образ: собрал раз, переношу архивом куда угодно, и NotebookLM становится ещё одним инструментом агента в Cursor. Цена — ручное обновление cookies раз в несколько недель и понимание, что всё держится на неофициальном API. Для моего workflow это приемлемый компромисс.`;

export default {
  id: "gemini-notebook-mcp-docker",
  date: "2026-10-25",
  category: "Productivity",
  draft: false,
  tags: ["MCP", "Docker", "NotebookLM", "Cursor", "AI"],
  i18n: {
    ru: {
      title: "NotebookLM как MCP-сервер в Docker: собираю свой образ",
      subtitle:
        "Упаковываю notebooklm-mcp-cli в отдельный Docker-образ и подключаю NotebookLM к Cursor и Claude без Python на хосте.",
      readTime: "5 мин",
      excerpt:
        "Один Dockerfile, один volume с cookies — и NotebookLM доступен агенту в Cursor.",
      body: BODY_RU,
    },
  },
};
