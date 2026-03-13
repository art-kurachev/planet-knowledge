# Components

> Источник истины по визуалу — Figma (файл Design System, `5YV3wQjobtEYjH3blUEmOr`).
> Источник токенов — `docs/COLOR_TOKENS.md`.
> Node ID компонентов — `figma/file_map.md`.
> Именование и форматы — `figma/naming_rules.md`.

---

## Size Tiers

Все интерактивные компоненты (кнопки, инпуты, селекты) существуют в трёх размерах:

| Tier | Height | Padding (v/h) | Font | Radius | Gap |
|------|--------|---------------|------|--------|-----|
| Regular | ~44px | 10/20 | Inter Medium 14px | 12 | 8 |
| Small | 36px | 10/16 | Inter Medium 12px | 12 | 6 |
| Little | 28px | 6/12 | Inter Medium 12px | 8 | 4 |

---

## Именование

Формат: `{Type}{Style}{Size}` — например `BtnPrimaryRegular`, `InputSmall`, `SelectGreySmall`.

Подробнее: `figma/naming_rules.md`

---

## Reusable Components

Готовые компоненты из DS — всегда использовать как Instance, не пересоздавать.

| Компонент | Node ID | Описание |
|-----------|---------|----------|
| Divider | `159:3846` | Горизонтальный разделитель. Параметры: `Style=Light, Vertical=no` |

> Полный список компонентов DS — в `figma/component_map.md`.

---

## Добавление нового компонента в DS

При создании нового компонента в Figma:

1. Структура фрейма и раскладка — строго по эталону `254:208` (страница Tab в DS-файле)
2. Подробный формат — `figma/naming_rules.md` → секция «Component Layout Format»
3. Цвета — только Variables из коллекции `Colors` (`docs/COLOR_TOKENS.md`)
4. После добавления — записать в Changelog (`304:1445`), формат в `figma/naming_rules.md`

---

## Каталог компонентов

> Заполняется по мере проработки.

### Формат описания

- **Название** и Node ID в Figma
- **Назначение** — когда использовать
- **Варианты** — размеры, состояния, свойства
- **Правила** — do / don't
- **Токены** — ссылки на `docs/COLOR_TOKENS.md`
