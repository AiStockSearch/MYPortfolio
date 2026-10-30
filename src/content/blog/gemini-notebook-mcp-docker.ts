/** Контент поста/проекта (редактируйте как TS). */

const GH = "https://github.com/jacob-bd/gemini-notebook-mcp-cli";

const BODY_RU = `**Репозиторий:** [jacob-bd/gemini-notebook-mcp-cli](${GH})

## Зачем вообще контейнер

Я активно пользуюсь NotebookLM: закидываю туда документацию, спеки, статьи и спрашиваю по ним. Хотелось, чтобы агент в Cursor мог делать то же самое сам. Для этого есть открытый проект [gemini-notebook-mcp-cli](https://github.com/jacob-bd/gemini-notebook-mcp-cli) (пакет \`notebooklm-mcp-cli\` на PyPI): он даёт CLI \`nlm\` и MCP-сервер \`notebooklm-mcp\`.

Официально его ставят через \`uv\`/\`pip\`. Мне не хотелось тащить ещё одно Python-окружение на рабочую машину, плюс хотелось одинаково запускать его на Mac и на Linux-сервере. Готового Dockerfile в репозитории нет, поэтому написал свой.

Первая версия образа была минимальной: \`python:3.12-slim\`, \`pip install .\`, volume под \`/data\`. Она работает (у меня это \`:latest\`, 346 MB), но у неё три проблемы: логин лежит в volume открытым текстом, браузера для автообновления cookies нет, а HTTP-режим без авторизации. Вдобавок я ошибся с HTTP-примером: сервер отказывается слушать \`--host 0.0.0.0\` без \`NOTEBOOKLM_ALLOW_EXTERNAL_BIND=1\`. Покопался в исходниках и собрал v2, о ней дальше.

## Что внутри v2

- **Зашифрованное хранилище.** В апстриме уже есть protected-режим: данные пишутся в \`credentials.enc\`, а ключ хранится в системном keystore. На Linux поддерживаются только SecretService/libsecret/KWallet, поэтому в образ я положил \`gnome-keyring\` и \`dbus\`. При старте entrypoint разблокирует кейринг паролем из Docker secret \`nlm_keyring_password\`. В образ пароль не попадает.
- **Не root.** Процесс работает от пользователя \`nlm\` (uid 10001), у \`/data\` права 0700. Caddy тоже не root, а \`nobody\` (65534).
- **Без утечки через \`debug_page.html\`.** Если проверка входа не прошла, апстрим сохраняет страницу NotebookLM в volume открытым текстом, а в ней есть значение cookie SAPISID. entrypoint направляет этот файл в \`/dev/null\` (подробнее в шаге 4).
- **Понятная ошибка при неверном пароле.** Вместо трейсбека одна строка и код выхода 1.
- **HTTP за токеном.** MCP слушает только \`127.0.0.1:8000\`. Перед ним стоит Caddy в том же сетевом namespace: он проверяет \`Authorization: Bearer\` и опубликован только на \`127.0.0.1:8080\`.
- **Опциональный \`:browser\`.** Chromium, Xvfb и x11vnc для автообновления cookies и первого входа через VNC.

Размеры: \`:latest\` 346 MB, \`:v2\` 531 MB (gnome-keyring с зависимостями), \`:browser\` 1.43 GB.

## Пошаговая инструкция

### 1. Клонируем репозиторий

\`\`\`bash
git clone https://github.com/jacob-bd/gemini-notebook-mcp-cli.git
cd gemini-notebook-mcp-cli
mkdir v2
\`\`\`

В \`v2/\` кладём \`Dockerfile\`, \`entrypoint.sh\`, \`docker-compose.yml\`, \`Caddyfile\` и \`.gitignore\`, а в корень клона \`.dockerignore\`. Полные версии всех файлов ниже.

\`v2/.gitignore\`, чтобы секреты не попали в git:

\`\`\`gitignore
# локальные секреты, не коммитить
.env
secrets/
cookies.txt
\`\`\`

\`.dockerignore\` в корне клона: контекст сборки это весь клон, и секреты не должны попасть в образ.

\`\`\`
# контекст сборки = корень клона; секреты в образ не попадают
.git
v2/.env
v2/secrets/
**/cookies.txt
\`\`\`

> **Linux без группы \`docker\`.** Если ваш пользователь не в группе \`docker\`, все команды \`docker\` ниже нужно запускать через \`sudo\` (или добавить себя в группу: \`sudo usermod -aG docker $USER\` и перелогиниться). На Mac с Docker Desktop это не нужно.

### 2. Dockerfile

\`\`\`dockerfile
# syntax=docker/dockerfile:1
# Собирается из корня клона gemini-notebook-mcp-cli:
#   docker build -f v2/Dockerfile -t gemini-notebook-mcp-cli .                     # slim (по умолчанию)
#   docker build -f v2/Dockerfile --target browser -t gemini-notebook-mcp-cli:browser .  # + Chromium для автообновления cookies

# ---------- slim: MCP-сервер + зашифрованное хранилище ----------
FROM python:3.12-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1 \\
    HOME=/data
# gnome-keyring + dbus: Secret Service внутри контейнера. Им пользуется
# штатный "protected" режим nlm, ключ кейринга шифруется паролем из Docker secret.
RUN apt-get update \\
 && apt-get install -y --no-install-recommends gnome-keyring dbus libsecret-tools tini \\
 && rm -rf /var/lib/apt/lists/*
WORKDIR /src
COPY pyproject.toml README.md LICENSE ./
COPY src ./src
RUN pip install . && rm -rf /src
# Непривилегированный пользователь, /data доступен только ему (0700)
RUN useradd --uid 10001 --home-dir /data --no-create-home --shell /usr/sbin/nologin nlm \\
 && mkdir -p /data && chown nlm:nlm /data && chmod 0700 /data
COPY --chmod=0755 v2/entrypoint.sh /usr/local/bin/entrypoint.sh
USER nlm
WORKDIR /data
VOLUME ["/data"]
# tini — корректная передача сигналов; entrypoint поднимает кейринг и запускает notebooklm-mcp
ENTRYPOINT ["tini", "--", "entrypoint.sh"]

# ---------- browser: + Chromium (headless refresh) и Xvfb/VNC для первого входа ----------
FROM base AS browser
USER root
RUN apt-get update \\
 && apt-get install -y --no-install-recommends chromium xvfb x11vnc fonts-liberation \\
 && rm -rf /var/lib/apt/lists/* \\
 # Песочница Chromium в непривилегированном контейнере не стартует без SYS_ADMIN;
 # Debian-обёртка /usr/bin/chromium читает флаги из /etc/chromium.d/.
 # gnome-libsecret: ключ шифрования cookies профиля Chromium тоже идёт в наш кейринг
 && echo 'export CHROMIUM_FLAGS="$CHROMIUM_FLAGS --no-sandbox --disable-dev-shm-usage --password-store=gnome-libsecret"' > /etc/chromium.d/zz-container
ENV NLM_BROWSER=chromium
USER nlm
\`\`\`

\`v2/entrypoint.sh\` поднимает dbus, разблокирует кейринг, проверяет пароль, отключает \`debug_page.html\` и решает, что запускать: MCP-сервер, \`nlm\` или \`login-vnc\`.

\`\`\`sh
#!/bin/sh
# Обёртка над notebooklm-mcp / nlm.
#   (без аргументов | --transport ...)  -> notebooklm-mcp
#   nlm ...                              -> CLI nlm
#   login-vnc                            -> (образ :browser) Chromium в Xvfb + VNC на :5900 для первого входа
set -eu
umask 077

PASS_FILE="\${NLM_KEYRING_PASSWORD_FILE:-/run/secrets/nlm_keyring_password}"

start_keyring() {
  # Свой session bus + gnome-keyring, разблокированный паролем из секрета.
  DBUS_SESSION_BUS_ADDRESS="$(dbus-daemon --session --fork --print-address)"
  export DBUS_SESSION_BUS_ADDRESS
  mkdir -p "$HOME/.local/share/keyrings"
  # --unlock читает пароль со stdin; при первом запуске создаёт кейринг "login" с этим паролем
  eval "$(gnome-keyring-daemon --unlock --components=secrets < "$PASS_FILE")"
  eval "$(gnome-keyring-daemon --start --components=secrets)"
  export GNOME_KEYRING_CONTROL
}

keyring_unlocked() {
  # При неверном пароле gnome-keyring всё равно стартует, но коллекция "login" остаётся заблокированной
  dbus-send --session --print-reply --dest=org.freedesktop.secrets \\
    /org/freedesktop/secrets/collection/login org.freedesktop.DBus.Properties.Get \\
    string:org.freedesktop.Secret.Collection string:Locked 2>/dev/null | grep -q 'boolean false'
}

# nlm при неудачной проверке входа сохраняет страницу NotebookLM в debug_page.html открытым текстом,
# а Google вписывает в неё значение cookie SAPISID. Направляем этот дамп в /dev/null.
STORAGE_DIR="\${NOTEBOOKLM_MCP_CLI_PATH:-$HOME/.notebooklm-mcp-cli}"
mkdir -p "$STORAGE_DIR"
chmod 700 "$STORAGE_DIR"
ln -sfn /dev/null "$STORAGE_DIR/debug_page.html"

if [ -r "$PASS_FILE" ]; then
  start_keyring >/dev/null
  if ! keyring_unlocked; then
    echo "entrypoint: не удалось разблокировать кейринг: неверный пароль в $PASS_FILE (или повреждён /data/.local/share/keyrings)" >&2
    exit 1
  fi
  # nlm предлагает protected-режим только в "десктопной" сессии (проверяет DISPLAY)
  export DISPLAY="\${DISPLAY:-:99}"
else
  echo "entrypoint: $PASS_FILE не найден — данные входа будут храниться в /data открытым текстом" >&2
fi

case "\${1:-}" in
  nlm) shift; exec nlm "$@" ;;
  login-vnc)
    shift
    command -v chromium >/dev/null || { echo "login-vnc доступен только в образе :browser" >&2; exit 1; }
    [ -n "\${VNC_PASSWORD:-}" ] || { echo "задайте VNC_PASSWORD" >&2; exit 1; }
    Xvfb :99 -screen 0 1280x900x24 >/dev/null 2>&1 &
    export DISPLAY=:99
    sleep 1
    x11vnc -display :99 -forever -shared -rfbport 5900 -passwd "$VNC_PASSWORD" -quiet >/dev/null 2>&1 &
    echo "VNC: vnc://localhost:5900 — войдите в Google в открывшемся окне" >&2
    exec nlm login "$@" ;;
  *) exec notebooklm-mcp "$@" ;;
esac
\`\`\`

### 3. Собираем

\`\`\`bash
docker build -f v2/Dockerfile --target base -t gemini-notebook-mcp-cli:v2 .
docker run --rm gemini-notebook-mcp-cli:v2 nlm --version
\`\`\`

Без смонтированного секрета образ работает и так, но выводит предупреждение, что логин будет храниться открытым текстом.

### 4. Пароль кейринга и вход через cookies

\`\`\`bash
cd v2 && mkdir -p secrets
printf '%s' 'длинный-пароль' > secrets/nlm_keyring_password
chmod 600 secrets/*; sudo chown 10001 secrets/nlm_keyring_password
\`\`\`

\`chown 10001\` нужен, потому что compose без swarm монтирует файл секрета с правами хоста, а в контейнере его читает пользователь \`nlm\`.

Обычный \`nlm login\` открывает браузер, которого в slim-образе нет. Поэтому экспортирую cookies Google из браузера на хосте (после входа в notebooklm.google.com) в \`cookies.txt\` и импортирую в protected-режиме:

\`\`\`bash
docker run --rm -v v2_nlm-data:/data \\
  -v "$PWD/secrets/nlm_keyring_password:/run/secrets/nlm_keyring_password:ro" \\
  -v "$PWD/cookies.txt:/cookies.txt:ro" \\
  gemini-notebook-mcp-cli:v2 nlm login --manual --file /cookies.txt --storage protected
rm cookies.txt
\`\`\`

Volume называется \`v2_nlm-data\`, потому что compose добавляет к имени тома имя проекта (по умолчанию это имя папки). Проверить вход:

\`\`\`bash
docker run --rm -v v2_nlm-data:/data \\
  -v "$PWD/secrets/nlm_keyring_password:/run/secrets/nlm_keyring_password:ro" \\
  gemini-notebook-mcp-cli:v2 nlm login --check
\`\`\`

В volume после этого лежат \`credentials.enc\` и \`login.keyring\`, зашифрованный паролем. Без пароля или с неверным паролем расшифровать их не получится. С неверным паролем контейнер сразу завершается с кодом 1 и строкой:

\`\`\`
entrypoint: не удалось разблокировать кейринг: неверный пароль в /run/secrets/nlm_keyring_password (или повреждён /data/.local/share/keyrings)
\`\`\`

**Утечка через \`debug_page.html\`.** Когда я проверял v2 на фиктивных cookies, \`nlm login --check\` упал с «Could not extract CSRF token». Апстрим в этом случае без всяких условий сохраняет полученную страницу в \`~/.notebooklm-mcp-cli/debug_page.html\`. Файл создаётся с правами 0600, но не шифруется, а Google вписывает в страницу значение cookie SAPISID. Я нашёл в этом файле своё фиктивное значение. С настоящими cookies так в volume открытым текстом попала бы живая auth-cookie, и шифрование было бы зря. Поэтому entrypoint при каждом старте заменяет этот файл симлинком на \`/dev/null\`: апстрим открывает его на запись, и дамп уходит в никуда. После правки я повторил проверку: после неудачного \`--check\` в volume нет ни значений cookies, ни строки \`SAPISID\`, в том числе с read-only корневой ФС и в образе \`:browser\`.

### 5. stdio (основной режим для Cursor)

\`\`\`json
{
  "mcpServers": {
    "notebooklm": {
      "command": "docker",
      "args": ["run", "-i", "--rm",
        "-e", "NOTEBOOKLM_DISABLE_HEADLESS_REFRESH=1",
        "-v", "v2_nlm-data:/data",
        "-v", "/полный/путь/v2/secrets/nlm_keyring_password:/run/secrets/nlm_keyring_password:ro",
        "gemini-notebook-mcp-cli:v2"]
    }
  }
}
\`\`\`

Это \`~/.cursor/mcp.json\`. Путь к секрету должен быть абсолютным. \`-i\` обязателен: MCP общается через stdin/stdout.

### 6. HTTP за Bearer-токеном (docker-compose)

\`Caddyfile\`:

\`\`\`
# Bearer-токен перед MCP. Без верного заголовка — 401, MCP наружу не торчит.
{
	admin off
	auto_https off
}
:8080 {
	@authorized header Authorization "Bearer {$MCP_TOKEN}"
	handle @authorized {
		reverse_proxy 127.0.0.1:8000 {
			flush_interval -1
		}
	}
	handle {
		header WWW-Authenticate "Bearer"
		respond "unauthorized" 401
	}
}
\`\`\`

\`docker-compose.yml\`:

\`\`\`yaml
# HTTP-режим с авторизацией: Caddy проверяет Bearer-токен и проксирует в MCP.
# Caddy живёт в сетевом namespace MCP-контейнера, поэтому MCP слушает только 127.0.0.1
# (без NOTEBOOKLM_ALLOW_EXTERNAL_BIND) и снаружи недоступен; наружу торчит только Caddy.
#
#   mkdir -p secrets
#   printf '%s' '<пароль кейринга>'    > secrets/nlm_keyring_password
#   chmod 600 secrets/*; sudo chown 10001 secrets/nlm_keyring_password   # 10001 = пользователь nlm в образе
#   printf 'MCP_TOKEN=%s\\n' "$(openssl rand -hex 32)" > .env; chmod 600 .env   # compose читает .env сам
#   docker compose up -d
services:
  mcp:
    image: gemini-notebook-mcp-cli:v2
    build: { context: .., dockerfile: v2/Dockerfile, target: base }
    command: ["--transport", "http", "--host", "127.0.0.1", "--port", "8000"]
    environment:
      NOTEBOOKLM_DISABLE_HEADLESS_REFRESH: "1"   # для образа :browser уберите
    volumes: [nlm-data:/data]
    secrets: [nlm_keyring_password]
    ports: ["127.0.0.1:8080:8080"]   # это порт Caddy (общий netns); 8000 не публикуется
    read_only: true
    tmpfs: [/tmp]
    cap_drop: [ALL]
    security_opt: [no-new-privileges:true]
    restart: unless-stopped

  proxy:
    image: caddy:2-alpine
    network_mode: "service:mcp"
    environment:
      MCP_TOKEN: \${MCP_TOKEN:?set MCP_TOKEN}
    volumes: [./Caddyfile:/etc/caddy/Caddyfile:ro]
    user: "65534:65534"           # nobody, не root
    read_only: true
    tmpfs: ["/config:uid=65534,gid=65534", "/data:uid=65534,gid=65534"]   # служебные файлы Caddy, без них он пишет ошибки в лог
    cap_drop: [ALL]
    cap_add: [NET_BIND_SERVICE]   # у бинарника caddy стоит file capability, без неё exec падает
    depends_on: [mcp]
    restart: unless-stopped

volumes:
  nlm-data:

secrets:
  nlm_keyring_password:
    file: ./secrets/nlm_keyring_password
\`\`\`

Запуск (из папки \`v2\`). Токен кладу в \`.env\`: compose читает его сам, поэтому \`up\`, \`ps\`, \`logs\` и \`down\` работают без переменной в окружении. \`.env\` уже есть в \`.gitignore\` и \`.dockerignore\`.

\`\`\`bash
printf 'MCP_TOKEN=%s\\n' "$(openssl rand -hex 32)" > .env
chmod 600 .env
docker compose up -d
\`\`\`

Ключевой момент — \`network_mode: "service:mcp"\`. Caddy живёт в сетевом namespace MCP-контейнера, поэтому MCP достаточно слушать \`127.0.0.1\`. Override \`NOTEBOOKLM_ALLOW_EXTERNAL_BIND\` не нужен, а порт 8000 снаружи недоступен вообще.

Изоляция: MCP-контейнер работает от uid 10001, с read-only корневой ФС, без capabilities и с \`no-new-privileges\`. Caddy работает от \`nobody\` (65534), с read-only ФС и единственной capability \`NET_BIND_SERVICE\`. \`no-new-privileges\` для Caddy не включён: с ним бинарник caddy с file capability не запускается.

Cursor для HTTP:

\`\`\`json
{
  "mcpServers": {
    "notebooklm": {
      "url": "http://localhost:8080/mcp",
      "headers": { "Authorization": "Bearer <токен из .env>" }
    }
  }
}
\`\`\`

### 7. Проверяем

\`\`\`bash
curl -s -o /dev/null -w '%{http_code}\\n' -X POST http://127.0.0.1:8080/mcp   # 401
\`\`\`

Без токена Caddy отвечает 401. С токеном Cursor должен показать сервер \`notebooklm\` зелёным и список инструментов. Дальше просто прошу агента: «покажи мои блокноты в NotebookLM».

### 8. Опционально: образ \`:browser\` с автообновлением cookies

Апстрим обновляет cookies так: запускает headless Chromium на сохранённом профиле, где ты уже вошёл в Google. В slim-образе браузера нет, поэтому есть отдельная цель сборки:

\`\`\`bash
docker build -f v2/Dockerfile --target browser -t gemini-notebook-mcp-cli:browser .
\`\`\`

Первый вход делаю через VNC:

\`\`\`bash
docker run --rm -p 127.0.0.1:5901:5900 -e VNC_PASSWORD='пароль-для-vnc' \\
  -v v2_nlm-data:/data \\
  -v "$PWD/secrets/nlm_keyring_password:/run/secrets/nlm_keyring_password:ro" \\
  gemini-notebook-mcp-cli:browser login-vnc --storage protected
\`\`\`

Если порт 5901 занят, замените его в \`-p 127.0.0.1:5901:5900\` на любой свободный и подключайтесь к нему. Подключаюсь к \`vnc://localhost:5901\` (на Mac — встроенный «Общий экран») и вхожу в Google в окне Chromium. nlm забирает cookies, профиль браузера остаётся в volume, а ключ шифрования cookies Chromium тоже уходит в наш кейринг (\`--password-store=gnome-libsecret\`). Чтобы использовать этот образ в compose, поменяйте \`image\` и \`target\` на browser и уберите \`NOTEBOOKLM_DISABLE_HEADLESS_REFRESH\`, иначе автообновление будет выключено.

Компромисс: в непривилегированном контейнере песочница Chromium не стартует, поэтому браузер запускается с \`--no-sandbox\`. Изоляция слабее, но ходит он только на Google.

## Что решено, а что нет

**Решено в v2:**

- **Данные для входа зашифрованы «в покое».** В volume лежат \`credentials.enc\` и кейринг, зашифрованный паролем из Docker secret. Я проверил на фиктивных cookies: их значений в volume нет, а без пароля расшифровка не проходит. В \`:latest\` всё по-прежнему хранится открытым текстом.
- **Дамп \`debug_page.html\` больше не пишется в volume.** Проверено на фиктивных cookies: после неудачного \`nlm login --check\` ни значений cookies, ни строки SAPISID в volume нет.
- **HTTP за токеном.** Без токена и с неверным токеном Caddy отвечает 401, с верным 200, и через него видны все 53 инструмента. MCP-порт наружу не опубликован, Caddy слушает только localhost. MCP-контейнер: uid 10001, read-only, без capabilities, \`no-new-privileges\`. Caddy: \`nobody\`, read-only, только \`NET_BIND_SERVICE\`.

**Осталось:**

- **Неофициальный API.** Инструмент ходит во внутренние вызовы NotebookLM, которых нет в документации. Google может изменить их в любой момент, и тогда инструмент перестанет работать, пока автор не выпустит обновление. Для личных задач меня это устраивает, на него не стоит опираться в продакшене. Обновляю так: \`git pull\` в клоне и пересборка с \`--no-cache\`.
- **Шифрование не защищает от хоста.** Пароль кейринга должен быть доступен контейнеру во время работы. Шифрование спасает volume и бэкапы, но тот, у кого есть доступ к хосту или к Docker, доберётся и до пароля. Для инструмента лучше завести отдельный Google-аккаунт и не коммитить \`secrets/\`, \`.env\` и \`cookies.txt\`.
- **Автообновление в контейнере не проверено.** По README cookies живут примерно 2–4 недели. Я проверил, что в \`:browser\` Chromium запускается, а \`login-vnc\` поднимает VNC (сервер отвечает на рукопожатие) и ждёт входа. Сам VNC-клиентом я не подключался. Но настоящего входа в Google я не делал, поэтому не знаю, сработает ли headless refresh и не заблокирует ли Google вход из Chromium в контейнере. Если не сработает, остаётся slim-образ с ручным \`nlm login --manual\` раз в несколько недель и \`nlm login --check\` для проверки.
- **Размер.** gnome-keyring добавил около 185 MB, а \`:browser\` весит 1.43 GB.

## Итог

Первая версия образа была «работает, и ладно». v2 закрывает две реальные дыры: открытые секреты в volume и HTTP без авторизации. Причём закрывает штатными средствами самого инструмента (protected-режим) и маленьким Caddy, без форка апстрима. Неофициальный API и протухающие cookies остаются ценой за удобство, и для моего workflow это приемлемый компромисс.
`;

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
        "Docker-образ для notebooklm-mcp-cli: зашифрованный логин, HTTP за Bearer-токеном и опциональный Chromium для автообновления cookies.",
      readTime: "11 мин",
      excerpt:
        "Один Dockerfile, зашифрованный volume и Caddy с токеном — и NotebookLM доступен агенту в Cursor.",
      body: BODY_RU,
    },
  },
};
