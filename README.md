# Planet Knowledge

База знаний для AI-агентов. Содержит UX-принципы, дизайн-токены, описание компонентов и правила вёрстки — всё что нужно агенту для работы с Planet CRM.

---

## Структура репозитория

```
/docs
  00_product_context.md        — продукт, аудитория, среда использования
  01_personas.md               — персоны пользователей
  02_design_principles.md      — принципы дизайна + инструкции для агента
  03_layout_system.md          — сетка, отступы, типографика, брейкпоинты
  04_components.md             — size tiers, reusable-компоненты, порядок добавления
  05_states_and_statuses.md    — UI-состояния и статусы задач с токенами
  06_flows.md                  — пользовательские сценарии (заполняется по мере работы)
  07_decisions_log.md          — лог дизайн-решений (заполняется по мере работы)
  08_constraints.md            — технические ограничения Figma API + дизайн-ограничения
  09_frontend_rules.md         — правила вёрстки: структура файлов, чтение Figma, компоненты
  10_components_backlog.md     — реестр компонентов DS в разработке
  11_coding_workflow.md        — процесс вёрстки: от Figma до готового кода
  12_figma_variable_binding.md — привязка Variables к макетам в Figma (алгоритм + код)
  COLOR_TOKENS.md              — ЕДИНСТВЕННЫЙ источник цветов. Hex, VariableID, Light/Dark

/design-tokens
  colors.json                  — legacy Style IDs для Figma API (не использовать в новом коде)

/figma
  file_map.md                  — File Key двух файлов Figma, ключевые Node ID, Variables
  naming_rules.md              — именование компонентов, Changelog, Component Layout Format
  component_map.md             — маппинг Figma Node ID → React-компонент + @figma-lock
```

---

## Разделы работы

### Раздел 1 — UX и дизайн

Агент работает как Lead UX Designer: анализирует задачи, предлагает решения, аргументирует через цели продукта.

**Обязательно при старте чата:**
```
docs/00_product_context.md
docs/02_design_principles.md
docs/08_constraints.md
docs/COLOR_TOKENS.md
```

**По задаче:**
```
docs/01_personas.md               — кто пользователи
docs/03_layout_system.md          — сетка, отступы
docs/04_components.md             — компоненты DS
docs/05_states_and_statuses.md    — статусы и состояния
figma/file_map.md                 — Node ID, Variables
figma/naming_rules.md             — нейминг, форматы
```

### Раздел 2 — Вёрстка

Агент верстает pixel-perfect по Figma, синхронизирует код с макетом.

**Обязательно при старте чата:**
```
docs/00_product_context.md
docs/02_design_principles.md
docs/08_constraints.md
docs/COLOR_TOKENS.md
docs/09_frontend_rules.md
```

**По задаче:**
```
docs/11_coding_workflow.md        — процесс и чеклист
figma/file_map.md                 — File Key, Node ID
figma/component_map.md            — синхронизация, @figma-lock
```

### Раздел 3 — Работа с Figma DS

Создание компонентов, привязка Variables, Changelog.

**Обязательно при старте чата:**
```
docs/COLOR_TOKENS.md
docs/08_constraints.md
figma/file_map.md
figma/naming_rules.md
```

**По задаче:**
```
docs/12_figma_variable_binding.md — алгоритм привязки Variables
docs/04_components.md             — порядок добавления компонента
docs/10_components_backlog.md     — что запланировано
```

---

## Цвета — главное правило

Единственный источник — `docs/COLOR_TOKENS.md`.

| Контекст | Правило |
|---|---|
| В Figma | Variables из коллекции `Colors` (DS-файл). Никаких хардкоженных заливок |
| В коде | `import { colors } from '../tokens/colors'`. Никаких hex/rgb inline |
| Новый цвет | Создать токен → добавить в `COLOR_TOKENS.md` → сообщить пользователю |

---

## Синхронизация Figma → Код

Маппинг нод и алгоритм — в `figma/component_map.md`.

| Команда | Действие |
|---|---|
| «синхронизируй» | Проверить ноды → расхождения → обновить код (с учётом локов) |
| «что изменилось в фигме?» | Только отчёт, без правок кода |
| «синхронизируй принудительно» | Перезапись по Figma, игнорируя все локи |
| «сними лок на [компонент]» | Удалить @figma-lock из файла |

Защита ручных правок — метка `@figma-lock` в коде.
