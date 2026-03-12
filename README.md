# Planet Knowledge

База знаний для AI-агентов. Содержит UX-принципы, дизайн-токены, описание компонентов и правила вёрстки — всё что нужно агенту для работы с Planet CRM.

---

## Структура репозитория

```
/docs
  00_product_context.md       — продукт, аудитория, среда использования
  01_personas.md              — персоны пользователей
  02_design_principles.md     — принципы дизайна + инструкции для агента
  03_layout_system.md         — сетка и лейаут
  04_components.md            — каталог компонентов DS
  05_states_and_statuses.md   — состояния и статусы
  06_flows.md                 — пользовательские сценарии
  07_decisions_log.md         — лог дизайн-решений
  08_constraints.md           — технические и дизайн-ограничения
  09_frontend_rules.md        — правила вёрстки: структура файлов, чтение Figma, компоненты
  10_components_backlog.md    — реестр компонентов в работе
  11_coding_workflow.md       — процесс верстки: от Figma до PR
  12_figma_variable_binding.md — привязка Variables к макетам в Figma
  COLOR_TOKENS.md             — единственный источник цветов (Variables + Styles)

/design-tokens
  colors.json                 — legacy Style IDs для Figma API

/figma
  file_map.md                 — карта Figma-файлов (DS и макеты)
  naming_rules.md             — правила именования компонентов и стилей
  component_map.md            — маппинг Figma Node → React-компонент
```

---

## Разделы работы

### Раздел 1 — UX и дизайн-советы

Агент работает как Lead UX Designer: анализирует задачи, предлагает решения, аргументирует через цели продукта.

**Обязательно читать при старте:**
```
docs/00_product_context.md
docs/02_design_principles.md
docs/08_constraints.md
docs/COLOR_TOKENS.md
```

**По необходимости:**
```
docs/01_personas.md
docs/04_components.md
docs/05_states_and_statuses.md
figma/naming_rules.md
figma/file_map.md  (Раздел 1 — Design System)
```

### Раздел 2 — Вёрстка макетов

Агент верстает pixel-perfect по Figma, синхронизирует код с макетом.

**Обязательно читать при старте:**
```
docs/00_product_context.md
docs/02_design_principles.md
docs/08_constraints.md
docs/COLOR_TOKENS.md
docs/09_frontend_rules.md
```

**По необходимости:**
```
docs/11_coding_workflow.md
figma/file_map.md  (Раздел 2 — Макеты страниц)
figma/component_map.md
```

---

## Цвета

Единственный источник — `docs/COLOR_TOKENS.md`.

- **В Figma:** Variables из коллекции `Colors` (файл Design System)
- **В коде:** импорт из `tokens/colors.ts`, никаких hex/rgb inline
- **Новый цвет:** создать токен → добавить в `COLOR_TOKENS.md` → сообщить пользователю

---

## Синхронизация Figma → Код

Маппинг нод и алгоритм синхронизации — в `figma/component_map.md`.

| Команда | Действие |
|---|---|
| «синхронизируй» | Проверить ноды → найти расхождения → обновить код |
| «что изменилось в фигме?» | Только отчёт, без правок |
| «синхронизируй принудительно» | Перезапись по Figma, игнорируя локи |
| «сними лок на [компонент]» | Удалить @figma-lock из файла |

Защита ручных правок — метка `@figma-lock` в коде (подробнее в `component_map.md`).
