# Figma File Map

---

## Раздел 1 — UX и дизайн-система

Используется для: принципы дизайна, компоненты DS, Variables, стили, советы по UX.

| Файл | File Key |
|------|----------|
| Planet Design System | `5YV3wQjobtEYjH3blUEmOr` |

### MCP-серверы для этого раздела

- **figma-console** — программные правки в Figma (создание компонентов, привязка Variables)
- **Figma** (официальный) — чтение через URL

### Ключевые ноды

| Нода | ID | Описание |
|------|----|----------|
| Changelog (страница) | `304:1202` | Лог изменений дизайн-системы |
| Changelog (контейнер записей) | `304:1445` | Frame внутри `304:1209` |
| Родительский фрейм Changelog | `304:1205` | `clipsContent=true` — следить за высотой |
| Component Layout (эталон) | `254:208` | Страница Tab — шаблон для новых компонентов |

### Variables

| Коллекция | ID | Modes |
|-----------|-----|-------|
| Colors | `VariableCollectionId:3232:4116` | Light (3232:2), Dark (3232:3) |

> Полная таблица токенов с VariableID — в `docs/COLOR_TOKENS.md`

### Reusable Instances

| Компонент | ID | Описание |
|-----------|----|----------|
| Divider | `159:3846` | `Style=Light, Vertical=no` — горизонтальный разделитель |

---

## Раздел 2 — Макеты страниц (вёрстка)

Используется для: pixel-perfect вёрстка экранов CRM по макетам.

| Файл | File Key |
|------|----------|
| Planeta (рабочий файл) | `L83bKaobb9yHmcjDrPXT9c` |

### MCP-серверы для этого раздела

- **figma-console** — чтение дерева нод, обход компонентов
- **Figma** (официальный) — чтение через URL

### Маппинг нод → компоненты

См. `figma/component_map.md` — там хранится связь Figma Node ID ↔ React-компонент ↔ путь к файлу.

> При вёрстке нового экрана — добавить строку в `component_map.md` и запушить.

---

## Общие правила

- Цвета — только Variables из DS-файла. Источник: `docs/COLOR_TOKENS.md`
- Маппинг Style → Variable — там же
- Глубина обхода дерева: `depth=15`
- Async API везде: `getNodeByIdAsync`, `getVariableByIdAsync`
