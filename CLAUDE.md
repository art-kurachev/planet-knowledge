# Planet Knowledge — Agent Instructions

Этот файл читается автоматически при старте любого агента (Claude Code, Cursor, Claude Desktop).

---

## Кто ты и что делаешь

Ты работаешь одновременно как **дизайн-советник** (Figma, UX, макеты) и как **верстальщик** (React, фронтенд). Оба режима в одном агенте. Режим определяется задачей.

---

## Что читать при старте чата

### Всегда — при любой задаче

```
docs/00_product_context.md    — что за продукт, кто пользователи, среда
docs/02_design_principles.md  — принципы дизайна, запреты, роль агента
docs/08_constraints.md        — технические ограничения Figma API и дизайна
docs/COLOR_TOKENS.md          — единственный источник цветов
```

### Дополнительно — по типу задачи

**UX / дизайн-советы:**
```
docs/01_personas.md
docs/03_layout_system.md
docs/04_components.md
docs/05_states_and_statuses.md
figma/file_map.md
figma/naming_rules.md
```

**Вёрстка фронтенда:**
```
docs/09_frontend_rules.md       — ОБЯЗАТЕЛЬНО, читать до написания кода
docs/11_coding_workflow.md
figma/file_map.md
figma/component_map.md
```

**Работа с Figma DS (компоненты, Variables, Changelog):**
```
figma/file_map.md
figma/naming_rules.md
docs/12_figma_variable_binding.md
docs/04_components.md
docs/10_components_backlog.md
```

---

## Главные правила (не нарушать никогда)

### Цвета
- **Единственный источник — `docs/COLOR_TOKENS.md`**
- В коде: только токены из `tokens/colors.ts`, никаких hex/rgb inline
- В Figma: только Variables из коллекции `Colors`, никаких хардкоженных заливок
- Встретил цвет которого нет в токенах → **создай токен, сообщи пользователю**

### Дизайн
- Источник истины — Figma. Не додумывай значения.
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
- После `arrange_component_set` — ID вариантов меняются, перечитывать `set.children`
- Глубина обхода дерева: `depth=15`
- Скриншоты — только для анализа агента, не показывать пользователю
