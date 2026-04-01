/** Контент поста/проекта (редактируйте как JS). */

const GH = "https://github.com/AiStockSearch/TASKMCP";
const GH_BLOB = `${GH}/blob/main`;

const BODY_RU = `**Репозиторий:** [AiStockSearch/TASKMCP](${GH})

## Что это

**MCP-сервер на Go** со **stdio**: Cursor поднимает бинарь как subprocess. Он ходит в **PostgreSQL** («Vault»): задачи, эпики, связи с файлами, **база знаний** (чанки + **pgvector** + FTS), **Memory Bank**, при необходимости **GitHub Issues** через GitHub App. Разные репозитории разделяются по **\`repo_key\`** (\`owner/repo\`).

Сквозная идея пайплайна: внешняя система (LangChain и т.д.) может писать требования и задачи в Vault; **Cursor через MCP** забирает работу и закрывает тикеты. Подробная схема слоёв — в репозитории [docs/architecture-five-layers.md](${GH_BLOB}/docs/architecture-five-layers.md).

## Как это работает (поток)

1. **Требования и задачи** лежат в Postgres (\`requirements\`, \`tasks\`, \`task_files\`, эпики, \`projects\`).
2. **Оркестратор** (опционально): HTTP вебхук принимает JSON **PlanBundle** → кладёт job в **Redis** → воркер **arq** применяет пакет к БД по контракту [docs/writer-contract.md](${GH_BLOB}/docs/writer-contract.md) (транзакция, уникальные индексы, без дублей при retry).
3. **MCP Vault Bridge** в Cursor вызывает **tools**: например \`get_next_task\` атомарно переводит задачу \`todo\` → \`in_progress\` и отдаёт файлы и при необходимости \`spec_json\` требования; \`complete_task\` пишет отчёт и ставит \`done\`.
4. **KB / RAG:** чанки и вектора в тех же таблицах; поиск — \`kb_search_context\` / \`kb_hybrid_search\`.
5. **Memory Bank** — версионируемые документы и правила (\`mb_*\` tools).

## Локальный старт (Docker)

Образ БД: **pgvector/pgvector:pg16**.

\`\`\`bash
make up              # Postgres + Redis; на хосте Postgres: 5433, Redis: 6380
make migrate-up      # все миграции golang-migrate
make seed-rn-auth    # опционально: пример данных для demo repo_key
\`\`\`

Строка по умолчанию с хоста:

\`postgres://vault:vault@127.0.0.1:5433/vault?sslmode=disable\`

Другой порт Postgres: \`make up POSTGRES_HOST_PORT=5432\`. Другой Redis: \`make up REDIS_HOST_PORT=6379\`.

## Команды Makefile

| Команда | Назначение |
|--------|------------|
| \`make up\` | Postgres + Redis |
| \`make down\` | Остановка compose, с \`-v\` удалит volume |
| \`make logs\` | Логи |
| \`make migrate-up\` | Накатить \`migrations/*.up.sql\` |
| \`make migrate-down\` | Откат **одной** миграции (нужен \`POSTGRES_URL\`) |
| \`make seed-rn-auth\` | Сид через \`psql\` + \`scripts/seed_rn_auth.sql\` |
| \`make psql-url\` | Печать текущего \`POSTGRES_URL\` |
| \`make orchestrator-up\` | Сборка и запуск **orchestrator-api** + **worker** (профиль compose \`orchestrator\`, нужен \`WEBHOOK_SECRET\` в \`.env\`) |
| \`make apply-plan-bundle\` | POST PlanBundle на оркестратор; \`PLAN_BUNDLE_FILE=...\`, \`WEBHOOK_SECRET\` читается из \`.env\` репозитория |
| \`make orch-webhook-secret\` | Показать \`WEBHOOK_SECRET\` из контейнера (если 401 при apply) |

**PlanBundle из Cursor:** команда Architect-Inquisitor → JSON по [writer-contract.md](${GH_BLOB}/docs/writer-contract.md), файл кладут в \`plans/\`, затем:

\`\`\`bash
make apply-plan-bundle PLAN_BUNDLE_FILE=plans/имя.json
\`\`\`

**Оркестратор:** FastAPI \`POST /hooks/apply-plan-bundle\` (Bearer \`WEBHOOK_SECRET\`), очередь Redis, воркер применяет к Vault. Подробнее [orchestrator/README.md](${GH_BLOB}/orchestrator/README.md).

## Сборка MCP и подключение в Cursor

\`\`\`bash
go build -o mcp-vault-bridge .
\`\`\`

В Cursor: **Settings → MCP** — команда с **абсолютным путём** к бинарю. Логи в **stderr**, протокол — **stdout**.

При старте бинарь подгружает \`.env\`: сначала cwd, если \`DATABASE_URL\` пуст — поиск \`.env\` **вверх по каталогам**; можно задать \`MCP_VAULT_BRIDGE_DOTENV=/путь/к/.env\`.

## Переменные окружения (сводка)

| Переменная | Зачем |
|------------|--------|
| \`DATABASE_URL\` | Подключение к Postgres (обязательно для tools с БД) |
| \`DEFAULT_REPO_KEY\` | \`owner/repo\`, если tool вызван без \`repo_key\` |
| \`KB_EMBEDDING_DIM\` | Размерность вектора (в схеме по умолчанию 1536) |
| \`GITHUB_APP_*\` | Для \`github_create_issue_for_task\` |
| \`WEBHOOK_SECRET\` | Общий секрет с оркестратором (в \`.env\` в корне репо) |

## MCP tools: задачи и эпики

**Tasks**

| Tool | Назначение |
|------|------------|
| \`get_next_task\` | Следующая \`todo\` → \`in_progress\`, файлы, опционально \`requirement_title\` / \`spec_json\` |
| \`complete_task\` | Из \`in_progress\` → \`done\`, дописать отчёт |
| \`add_context_file\` | Связь задачи с путём файла |
| \`list_tasks\` | Фильтры, пагинация, \`order\`: \`priority\` \\| \`created_at\` |
| \`get_task\` | Одна задача + детали |

**Epics**

| Tool | Назначение |
|------|------------|
| \`create_epic\` | Создать эпик |
| \`list_epics\` | Список |
| \`link_requirement_to_epic\` / \`link_task_to_epic\` | Привязки |
| \`epic_add_tasks\` | Массово привязать задачи к эпику |
| \`epic_list_tasks\` | Задачи эпика |

## MCP tools: GitHub, KB, Memory Bank

**GitHub:** \`github_get_issue_link\`, \`github_create_issue_for_task\`.

**Knowledge Base:** \`kb_chunk_markdown\`, \`kb_upsert_document_chunks\`, \`kb_search_context\`, \`kb_hybrid_search\`.

**Memory Bank:** \`mb_get_document\`, \`mb_upsert_document\`, \`mb_list_documents\`, \`mb_list_versions\`, \`mb_get_document_version\`, \`mb_get_state\` / \`mb_set_state\`, \`mb_rules_*\`, \`mb_rules_apply_preview\`.

## Рекомендуемый RAG pipeline

1. Исходный markdown.
2. \`kb_chunk_markdown\` → чанки.
3. Снаружи — embeddings для \`chunk.content\`.
4. \`kb_upsert_document_chunks\`.
5. Запрос: \`kb_hybrid_search\` или \`kb_search_context\`.

## Миграции (кратко)

Каталог \`migrations/\`, формат golang-migrate (\`NNNNNN_name.up.sql\`). Идут базовые таблицы, эпики, GitHub links, projects, pgvector и документы, Memory Bank, unique-индексы для write-side, FTS, RLS (\`000010\`).

## Multi-project

Почти везде опциональный **\`repo_key\`**. Если не передан — **\`DEFAULT_REPO_KEY\`**. Запись в \`projects\` создаётся при первом обращении.

## Безопасность RLS

С миграцией \`000010\` включён **Row Level Security** по \`project_id\`. Для локалки без \`SET app.project_id\` политика может не фильтровать строки (удобно для dev); в shared-кластере задают \`app.project_id\` на сессию.

## Типичные проблемы

| Симптом | Причина |
|---------|---------|
| Порт 5432 занят | Использовать \`POSTGRES_HOST_PORT=5433\` как в Makefile |
| Нет расширения \`vector\` | Образ должен быть \`pgvector/pgvector:pg16\` |
| Нет таблицы \`projects\` после сида | Не прошёл \`make migrate-up\` |
| 401 на apply-plan-bundle | Разный \`WEBHOOK_SECRET\` у make и контейнера; сверить \`orch-webhook-secret\` и \`.env\` |

## Схема потока (Mermaid)

**Как читать:** левая ветка — конвейер планирования (идея → Interviewer ↔ IJ → Planner → INSERT). Правая часть — рассуждение и декомпозиция (IJ). **The Vault** — единственная точка правды между планированием и исполнением. Снизу: Vault отдаёт задачи через **MCP** → **Cursor** работает → **complete_task** (пунктир) обновляет БД.

\`\`\`mermaid
flowchart TB
  subgraph legend["Функциональные зоны"]
    direction LR
    L1[планирование]
    L2[рассуждение]
    L3[хранилище]
    L4[исполнение]
    style L1 fill:#e1bee7,stroke:#7b1fa2
    style L2 fill:#c8e6c9,stroke:#2e7d32
    style L3 fill:#bbdefb,stroke:#1565c0
    style L4 fill:#ffe0b2,stroke:#ef6c00
  end

  U["ВЫ — заказчик<br/>сырой ввод / идея"]
  LI["LangChain interviewer<br/>слой 0 — сбор требований<br/>Architect-Inquisitor"]
  IJ["IJ reasoning LLM<br/>слой 1 — декомпозиция<br/>без написания кода"]
  LP["LangChain planner<br/>PlanBundle / JSON<br/>→ INSERT в БД"]
  V[("The Vault — PostgreSQL<br/>слой 2<br/>requirements · tasks · task_files")]
  MCP["MCP-сервер Go<br/>слой 3 — Vault Bridge<br/>get_next_task · complete_task · KB/search"]
  C["Cursor<br/>слой 4 — исполнитель<br/>читает ТЗ, пишет код"]

  U --> LI
  U --> IJ
  LI <-->|диалог вопрос–ответ| IJ
  LI --> LP
  IJ --> LP
  LP -->|"INSERT идемпотентный"| V
  V --> MCP
  MCP -->|"get_next_task + файлы + spec_json"| C
  C -.->|"complete_task отчёт"| V

  classDef user fill:#cfd8dc,stroke:#546e7a,color:#111
  classDef plan fill:#e1bee7,stroke:#7b1fa2,color:#111
  classDef reason fill:#c8e6c9,stroke:#2e7d32,color:#111
  classDef vault fill:#bbdefb,stroke:#1565c0,color:#111
  classDef exec fill:#ffe0b2,stroke:#ef6c00,color:#111

  class U user
  class LI,LP plan
  class IJ reason
  class V vault
  class MCP,C exec
\`\`\`

*В GitHub / VS Code диаграмма рендерится в превью Markdown. В Cursor — при поддержке Mermaid в просмотрщике.*

**Доставка PlanBundle в Vault (репо):** помимо прямого SQL, пакет может приходить через **оркестратор** — \`POST /hooks/apply-plan-bundle\` → Redis → arq → та же транзакция, что в [writer-contract.md](${GH_BLOB}/docs/writer-contract.md).

---

## Слой 0 — сбор требований (LangChain Interviewer)

**Architect-Inquisitor:** агент с системным промптом не пускает задачу в работу, пока не вытащит из тебя стек, критерии готовности, ограничения по latency и затронутые файлы. Результат — одобренный JSON, который ложится в таблицу **\`requirements\`**.

*В репо:* схема данных и контракт записи есть; сам чат-агент LangChain живёт **снаружи** (или через правила Cursor, см. \`.cursor/commands/architect-inquisitor.md\`). В Vault попадает минимум **\`title\`** + **\`spec_json\`**.

---

## Слой 1 — рассуждение (IJ / мощная LLM)

Отдельный инстанс модели берёт утверждённое ТЗ и делает декомпозицию на атомарные задачи. Он **не пишет код** — только проектирует. Выход — **\`tasks_decomposition\`** в том же JSON (логически), далее нормализуемый в строки **\`tasks\`** и связи **\`task_files\`**.

*В репо:* формат пакета — PlanBundle ([examples/planbundle_rn_auth.json](${GH_BLOB}/examples/planbundle_rn_auth.json)), контракт — [writer-contract.md](${GH_BLOB}/docs/writer-contract.md).

---

## Слой 2 — хранилище (PostgreSQL «The Vault»)

Три таблицы: **\`requirements\`** (исходник + **\`spec_json\`**), **\`tasks\`** (статус, приоритет, привязки к requirement/epic), **\`task_files\`** (какой файл → к какой задаче). LangChain Planner парсит JSON от IJ и делает **\`INSERT\`** (идемпотентно, с dedup). Это внешняя память — Cursor ничего не «забывает», даже если IDE закрыта на неделю.

*В репо:* миграции Postgres, RLS, уникальные индексы под retries. Асинхронная доставка: [orchestrator/](${GH_BLOB}/orchestrator/README.md) (вебхук → Redis → **arq** → та же семантика транзакции, что и при прямом SQL).

---

## Слой 3 — MCP-сервер на Go (Vault Bridge)

Три опоры исполнения:

| Инструмент | Назначение |
|------------|------------|
| **\`get_next_task\`** | Достаёт приоритетную задачу + список файлов (и при наличии связи — **\`requirement_title\`**, **\`spec_json\`** для DoD/ограничений) |
| **\`complete_task\`** | Cursor закрывает тикет и пишет отчёт в БД |
| **\`search_context\`** *(целевое имя в архитектуре)* | Поиск по прошлым задачам / контексту |

Подключается в Cursor: **Settings → Features → MCP** (stdio).

*В репо:* отдельного tool с именем **\`search_context\`** может не быть — ту же роль закрывают **\`kb_hybrid_search\`** / **\`kb_search_context\`** (KB) и **\`list_tasks\`** / **\`get_task\`** (бэклог). Полный список — в [README.md](${GH_BLOB}/README.md).

---

## Слой 4 — Cursor как исполнитель

Больше не получает размытые инструкции как единственный вход. Через **\`get_next_task\`** видит конкретику: файлы, описание задачи, при необходимости **ограничения и definition of done из \`spec_json\`** (через поля ответа MCP). После работы вызывает **\`complete_task\`**.

*В репо:* ответ **\`get_next_task\`** / **\`get_task\`** включает **\`requirement_title\`** и **\`spec_json\`**, если у задачи задан **\`requirement_id\`**.

---

## Итоговые роли

| Участник | Роль |
|----------|------|
| **Ты** | Заказчик |
| **LangChain / LLM** | Архитектор и менеджер: интервью, декомпозиция, запись в Vault |
| **Cursor** | Исполнитель с чётким ТЗ из Vault через MCP |

**Главный профит:** контекстное окно Cursor не уходит в бесконечные «размышления» — агент получает уже переваренный чертёж (слои 0–2), а MCP отдаёт структурированный срез задачи и требований (слои 3–4).`;

const BODY_EN = `**Repository:** [AiStockSearch/TASKMCP](${GH})

## What it is

A **Go MCP server** over **stdio**: Cursor runs the binary as a subprocess. It talks to **PostgreSQL** (“Vault”): tasks, epics, file links, a **knowledge base** (chunks + **pgvector** + FTS), **Memory Bank**, and optionally **GitHub Issues** via a GitHub App. Repositories are separated by **\`repo_key\`** (\`owner/repo\`).

End-to-end idea: an external system (LangChain, etc.) can write requirements and tasks into Vault; **Cursor via MCP** pulls work and closes tickets. A detailed layer diagram lives in [docs/architecture-five-layers.md](${GH_BLOB}/docs/architecture-five-layers.md).

## How it works (flow)

1. **Requirements and tasks** live in Postgres (\`requirements\`, \`tasks\`, \`task_files\`, epics, \`projects\`).
2. **Orchestrator** (optional): an HTTP webhook accepts a **PlanBundle** JSON → enqueues a job in **Redis** → an **arq** worker applies the bundle under [docs/writer-contract.md](${GH_BLOB}/docs/writer-contract.md) (transaction, unique indexes, no duplicates on retry).
3. **MCP Vault Bridge** in Cursor exposes **tools**: e.g. \`get_next_task\` atomically moves a task \`todo\` → \`in_progress\` and returns files and optionally requirement \`spec_json\`; \`complete_task\` writes a report and sets \`done\`.
4. **KB / RAG:** chunks and vectors in the same tables; search via \`kb_search_context\` / \`kb_hybrid_search\`.
5. **Memory Bank** — versioned docs and rules (\`mb_*\` tools).

## Local start (Docker)

DB image: **pgvector/pgvector:pg16**.

\`\`\`bash
make up              # Postgres + Redis; host ports Postgres: 5433, Redis: 6380
make migrate-up      # all golang-migrate migrations
make seed-rn-auth    # optional: sample data for a demo repo_key
\`\`\`

Default connection string from the host:

\`postgres://vault:vault@127.0.0.1:5433/vault?sslmode=disable\`

Different Postgres port: \`make up POSTGRES_HOST_PORT=5432\`. Different Redis: \`make up REDIS_HOST_PORT=6379\`.

## Makefile commands

| Command | Purpose |
|--------|------------|
| \`make up\` | Postgres + Redis |
| \`make down\` | Stop compose; with \`-v\` removes volumes |
| \`make logs\` | Logs |
| \`make migrate-up\` | Apply \`migrations/*.up.sql\` |
| \`make migrate-down\` | Roll back **one** migration (needs \`POSTGRES_URL\`) |
| \`make seed-rn-auth\` | Seed via \`psql\` + \`scripts/seed_rn_auth.sql\` |
| \`make psql-url\` | Print current \`POSTGRES_URL\` |
| \`make orchestrator-up\` | Build & run **orchestrator-api** + **worker** (compose profile \`orchestrator\`, needs \`WEBHOOK_SECRET\` in \`.env\`) |
| \`make apply-plan-bundle\` | POST PlanBundle to orchestrator; \`PLAN_BUNDLE_FILE=...\`, \`WEBHOOK_SECRET\` from repo \`.env\` |
| \`make orch-webhook-secret\` | Show \`WEBHOOK_SECRET\` from the container (if apply returns 401) |

**PlanBundle from Cursor:** Architect-Inquisitor → JSON per [writer-contract.md](${GH_BLOB}/docs/writer-contract.md), file under \`plans/\`, then:

\`\`\`bash
make apply-plan-bundle PLAN_BUNDLE_FILE=plans/name.json
\`\`\`

**Orchestrator:** FastAPI \`POST /hooks/apply-plan-bundle\` (Bearer \`WEBHOOK_SECRET\`), Redis queue, worker applies to Vault. See [orchestrator/README.md](${GH_BLOB}/orchestrator/README.md).

## Building MCP and wiring Cursor

\`\`\`bash
go build -o mcp-vault-bridge .
\`\`\`

In Cursor: **Settings → MCP** — command with an **absolute path** to the binary. Logs on **stderr**, protocol on **stdout**.

On startup the binary loads \`.env\`: first cwd; if \`DATABASE_URL\` is empty it walks **up** the tree; you can set \`MCP_VAULT_BRIDGE_DOTENV=/path/to/.env\`.

## Environment variables (summary)

| Variable | Purpose |
|----------|---------|
| \`DATABASE_URL\` | Postgres connection (required for DB-backed tools) |
| \`DEFAULT_REPO_KEY\` | \`owner/repo\` when a tool is called without \`repo_key\` |
| \`KB_EMBEDDING_DIM\` | Vector dimension (schema default 1536) |
| \`GITHUB_APP_*\` | For \`github_create_issue_for_task\` |
| \`WEBHOOK_SECRET\` | Shared secret with orchestrator (root \`.env\`) |

## MCP tools: tasks and epics

**Tasks**

| Tool | Purpose |
|------|---------|
| \`get_next_task\` | Next \`todo\` → \`in_progress\`, files, optional \`requirement_title\` / \`spec_json\` |
| \`complete_task\` | \`in_progress\` → \`done\`, append report |
| \`add_context_file\` | Link a task to a file path |
| \`list_tasks\` | Filters, pagination, \`order\`: \`priority\` \\| \`created_at\` |
| \`get_task\` | One task + details |

**Epics**

| Tool | Purpose |
|------|---------|
| \`create_epic\` | Create epic |
| \`list_epics\` | List |
| \`link_requirement_to_epic\` / \`link_task_to_epic\` | Links |
| \`epic_add_tasks\` | Bulk attach tasks |
| \`epic_list_tasks\` | Tasks in an epic |

## MCP tools: GitHub, KB, Memory Bank

**GitHub:** \`github_get_issue_link\`, \`github_create_issue_for_task\`.

**Knowledge Base:** \`kb_chunk_markdown\`, \`kb_upsert_document_chunks\`, \`kb_search_context\`, \`kb_hybrid_search\`.

**Memory Bank:** \`mb_get_document\`, \`mb_upsert_document\`, \`mb_list_documents\`, \`mb_list_versions\`, \`mb_get_document_version\`, \`mb_get_state\` / \`mb_set_state\`, \`mb_rules_*\`, \`mb_rules_apply_preview\`.

## Recommended RAG pipeline

1. Source markdown.
2. \`kb_chunk_markdown\` → chunks.
3. Outside the server — embeddings for \`chunk.content\`.
4. \`kb_upsert_document_chunks\`.
5. Query: \`kb_hybrid_search\` or \`kb_search_context\`.

## Migrations (short)

Directory \`migrations/\`, golang-migrate format (\`NNNNNN_name.up.sql\`). Covers base tables, epics, GitHub links, projects, pgvector & docs, Memory Bank, write-side unique indexes, FTS, RLS (\`000010\`).

## Multi-project

Almost everywhere an optional **\`repo_key\`**. If omitted — **\`DEFAULT_REPO_KEY\`**. A \`projects\` row is created on first use.

## RLS security

Migration \`000010\` enables **Row Level Security** on \`project_id\`. Locally without \`SET app.project_id\` policies may not filter rows (handy for dev); shared clusters set \`app.project_id\` per session.

## Common issues

| Symptom | Cause |
|---------|---------|
| Port 5432 busy | Use \`POSTGRES_HOST_PORT=5433\` as in the Makefile |
| No \`vector\` extension | Image must be \`pgvector/pgvector:pg16\` |
| Missing \`projects\` after seed | \`make migrate-up\` not run |
| 401 on apply-plan-bundle | Mismatched \`WEBHOOK_SECRET\`; compare \`orch-webhook-secret\` and \`.env\` |

## Flow diagram (Mermaid)

**How to read:** left branch — planning pipeline (idea → Interviewer ↔ IJ → Planner → INSERT). Right side — reasoning/decomposition (IJ). **The Vault** is the single source of truth between planning and execution. Bottom: Vault serves tasks via **MCP** → **Cursor** works → **complete_task** (dashed) updates the DB.

\`\`\`mermaid
flowchart TB
  subgraph legend["Functional zones"]
    direction LR
    L1[planning]
    L2[reasoning]
    L3[storage]
    L4[execution]
    style L1 fill:#e1bee7,stroke:#7b1fa2
    style L2 fill:#c8e6c9,stroke:#2e7d32
    style L3 fill:#bbdefb,stroke:#1565c0
    style L4 fill:#ffe0b2,stroke:#ef6c00
  end

  U["YOU — stakeholder<br/>raw input / idea"]
  LI["LangChain interviewer<br/>layer 0 — requirements<br/>Architect-Inquisitor"]
  IJ["IJ reasoning LLM<br/>layer 1 — decomposition<br/>no code writing"]
  LP["LangChain planner<br/>PlanBundle / JSON<br/>→ INSERT into DB"]
  V[("The Vault — PostgreSQL<br/>layer 2<br/>requirements · tasks · task_files")]
  MCP["Go MCP server<br/>layer 3 — Vault Bridge<br/>get_next_task · complete_task · KB/search"]
  C["Cursor<br/>layer 4 — executor<br/>reads spec, writes code"]

  U --> LI
  U --> IJ
  LI <-->|Q&A dialogue| IJ
  LI --> LP
  IJ --> LP
  LP -->|"idempotent INSERT"| V
  V --> MCP
  MCP -->|"get_next_task + files + spec_json"| C
  C -.->|"complete_task report"| V

  classDef user fill:#cfd8dc,stroke:#546e7a,color:#111
  classDef plan fill:#e1bee7,stroke:#7b1fa2,color:#111
  classDef reason fill:#c8e6c9,stroke:#2e7d32,color:#111
  classDef vault fill:#bbdefb,stroke:#1565c0,color:#111
  classDef exec fill:#ffe0b2,stroke:#ef6c00,color:#111

  class U user
  class LI,LP plan
  class IJ reason
  class V vault
  class MCP,C exec
\`\`\`

*GitHub / VS Code render Mermaid in Markdown preview. Cursor depends on Mermaid support in the viewer.*

**Delivering PlanBundle to Vault:** besides raw SQL, the bundle can arrive via the **orchestrator** — \`POST /hooks/apply-plan-bundle\` → Redis → arq → the same transaction semantics as [writer-contract.md](${GH_BLOB}/docs/writer-contract.md).

---

## Layer 0 — requirements (LangChain interviewer)

**Architect-Inquisitor:** a system-prompted agent blocks work until it extracts stack, acceptance criteria, latency constraints, and touched files. Output is approved JSON stored in **\`requirements\`**.

*In the repo:* schema and write contract exist; the LangChain chat agent runs **outside** (or via Cursor rules, see \`.cursor/commands/architect-inquisitor.md\`). Vault stores at least **\`title\`** + **\`spec_json\`**.

---

## Layer 1 — reasoning (IJ / strong LLM)

A separate model instance takes the approved spec and decomposes it into atomic tasks. It **does not write code** — only designs. Output is **\`tasks_decomposition\`** in the same JSON (logically), then normalized into **\`tasks\`** rows and **\`task_files\`** links.

*In the repo:* bundle shape — PlanBundle ([examples/planbundle_rn_auth.json](${GH_BLOB}/examples/planbundle_rn_auth.json)), contract — [writer-contract.md](${GH_BLOB}/docs/writer-contract.md).

---

## Layer 2 — storage (PostgreSQL “The Vault”)

Three tables: **\`requirements\`** (source + **\`spec_json\`**), **\`tasks\`** (status, priority, links to requirement/epic), **\`task_files\`** (file → task). The LangChain planner parses IJ JSON and **\`INSERT\`**s idempotently with dedup. External memory — Cursor does not “forget” even if the IDE is closed for a week.

*In the repo:* Postgres migrations, RLS, unique indexes for retries. Async delivery: [orchestrator/](${GH_BLOB}/orchestrator/README.md) (webhook → Redis → **arq** → same transactional semantics as direct SQL).

---

## Layer 3 — Go MCP server (Vault Bridge)

Three execution pillars:

| Tool | Purpose |
|------|---------|
| **\`get_next_task\`** | Pulls the next priority task + file list (and when linked — **\`requirement_title\`**, **\`spec_json\`** for DoD/constraints) |
| **\`complete_task\`** | Cursor closes the ticket and writes a report to the DB |
| **\`search_context\`** *(target name in architecture)* | Search past tasks / context |

Wire-up in Cursor: **Settings → Features → MCP** (stdio).

*In the repo:* there may be no tool literally named **\`search_context\`** — **\`kb_hybrid_search\`** / **\`kb_search_context\`** (KB) and **\`list_tasks\`** / **\`get_task\`** (backlog) cover that role. Full list — [README.md](${GH_BLOB}/README.md).

---

## Layer 4 — Cursor as executor

No longer fed only fuzzy instructions. Via **\`get_next_task\`** it sees files, task text, and when needed **constraints and definition of done from \`spec_json\`** (via MCP response fields). After work it calls **\`complete_task\`**.

*In the repo:* **\`get_next_task\`** / **\`get_task\`** responses include **\`requirement_title\`** and **\`spec_json\`** when **\`requirement_id\`** is set.

---

## Roles

| Actor | Role |
|-------|------|
| **You** | Stakeholder |
| **LangChain / LLM** | Architect & PM: interview, decomposition, writes to Vault |
| **Cursor** | Executor with a crisp spec from Vault via MCP |

**Main win:** Cursor’s context window is not burned on endless “thinking” — the agent gets a pre-digested blueprint (layers 0–2), and MCP returns a structured slice of task + requirements (layers 3–4).`;

export default {
  id: "taskmcp-mcp-vault-bridge",
  date: "2026-04-01",
  category: "Architecture",
  draft: false,
  tags: ["MCP", "Go", "PostgreSQL", "Cursor", "Docker"],
  i18n: {
    ru: {
      title: "TASKMCP: как устроен MCP Vault Bridge",
      subtitle:
        "Поток данных Cursor ↔ Postgres, Makefile, оркестратор PlanBundle и каталог MCP-инструментов.",
      readTime: "16 мин",
      excerpt:
        "Поток данных Cursor ↔ Postgres, Makefile, оркестратор PlanBundle и каталог MCP-инструментов.",
      body: BODY_RU,
    },
    en: {
      title: "TASKMCP: how the MCP Vault Bridge fits together",
      subtitle:
        "Cursor ↔ Postgres data flow, Makefile, PlanBundle orchestrator, and the MCP tool surface.",
      readTime: "16 min",
      excerpt:
        "Cursor ↔ Postgres data flow, Makefile, PlanBundle orchestrator, and the MCP tool catalog.",
      body: BODY_EN,
    },
  },
};
