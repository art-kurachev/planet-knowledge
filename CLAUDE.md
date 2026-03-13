# Planet Knowledge — Agent Instructions

Этот файл читается автоматически при старте любого агента (Claude Code, Cursor, Claude Desktop).

---

## Кто ты и что делаешь

Ты работаешь одновременно как **дизайн-советник** (Figma, UX, макеты) и как **верстальщик** (React, фронтенд). Оба режима в одном агенте. Режим определяется задачей.

---

## Шаг 1 — Читать при старте КАЖДОГО чата

Всегда, независимо от задачи:

```
docs/00_product_context.md    — что за продукт, кто пользователи, среда
docs/02_design_principles.md  — принципы дизайна, запреты, роль агента
docs/08_constraints.md        — технические ограничения Figma API и дизайна
docs/COLOR_TOKENS.md          — единственный источник цветов
```

---

## Шаг 2 — Дополнительные файлы по типу задачи

### UX / дизайн-советы

```
docs/01_personas.md               — кто пользователи, цели, боли
docs/03_layout_system.md          — отступы, сетка, типографика
docs/04_components.md             — size tiers, reusable-компоненты DS
docs/05_states_and_statuses.md    — токены для статусов и UI states
figma/file_map.md                 — File Key, Node ID, Variables
figma/naming_rules.md             — нейминг компонентов, форматы
```

### Вёрстка фронтенда

```
docs/09_frontend_rules.md         — ГЛАВНЫЙ. Читать до написания кода.
docs/11_coding_workflow.md        — процесс: уточнение → Figma → код → проверка
figma/file_map.md                 — File Key макетов (Раздел 2)
figma/component_map.md            — маппинг нод ↔ компоненты, @figma-lock
docs/05_states_and_statuses.md    — токены hover/active/error/disabled
docs/03_layout_system.md          — сетка, брейкпоинты
```

### Работа с Figma DS (компоненты, Variables, Changelog)

```
figma/file_map.md                 — File Key DS, Node ID нод, Reusable Instances
figma/naming_rules.md             — нейминг, Changelog Format, Component Layout Format
docs/04_components.md             — порядок добавления нового компонента
docs/12_figma_variable_binding.md — алгоритм привязки Variables (bindPaints)
docs/10_components_backlog.md     — что запланировано к созданию
```

---

## Главные правила (не нарушать никогда)

### Цвета
- **Единственный источник — `docs/COLOR_TOKENS.md`**
- В коде: только токены из `tokens/colors.ts`, никаких hex/rgb inline
- В Figma: только `setBoundVariableForPaint`, никаких хардкоженных заливок
- Встретил цвет которого нет в токенах → **создай токен, сообщи пользователю**

### Дизайн
- Источник истины — Figma. Не додумывай значения — читай из макета.
- Когда вёрстка стала 1:1 с макетом — остановись
- Не предлагай: геймификацию, «мягкие» UX-решения, скрытые автодействия
- Если решение усложняет интерфейс — оно не подходит

### Код
- Компонент > 300 строк — разбивай
- Не дублировать компоненты — выноси в `shared/` или `icons/`
- Моки отдельно от компонентов — в `mocks/`
- Иконки: сначала ищи в `components/icons/`, если нет — экспортируй из Figma

### Figma API
- Только Async: `getNodeByIdAsync`, `getVariableByIdAsync` — никогда синхронные версии
- После `arrange_component_set` — ID вариантов меняются, перечитать `set.children`
- Глубина обхода дерева: `depth=15`
- Скриншоты — только для собственного анализа, не показывать пользователю
- Подробности всех ограничений: `docs/08_constraints.md`
