# Figma Naming Rules

Правила именования, форматы Changelog и Component Layout.
Актуально для работы в файле Design System (`5YV3wQjobtEYjH3blUEmOr`).

---

## Именование компонентов

Формат: `{Type}{Style}{Size}`

Примеры:
- `BtnPrimaryRegular`, `BtnStrokeSmall`
- `InputSmall`, `SelectGreySmall`

## Варианты (Properties)

Формат: `{Property}={Value}`

Примеры:
- `Status=Default`, `Status=Hover`, `Status=Disabled`
- `Icon=yes/no`, `Active=yes/no`, `Size=Regular/Small`

---

## Правила цветов в Figma

- Никогда не хардкодить hex — только `setBoundVariableForPaint` (новые компоненты) или `setFillStyleIdAsync` (legacy)
- Для нейтральных рамок — токен `stroke/subtle`
- Для акцентных — токен `primary/default`
- Иконки в табах — токен `neutral/muted` в обоих состояниях (active и inactive)

> Полная таблица токенов — `docs/COLOR_TOKENS.md`

---

## Правила отступов

- Только значения кратные 8: `8, 16, 24, 32, 40, 48, 56, 64`
- При выборе между `12` и `16` — выбирать `16`

---

## Changelog — формат записи

Записи добавляются в контейнер `304:1445` (в конец).

**Структура записи:**
- Горизонтальный фрейм, `primaryAxisSizingMode=FIXED`, ширина 802px, spacing 56
- Дата: Inter Medium 16px, w=150, `textAutoResize=HEIGHT`, стиль `Text/SecText`
- Описание: Inter Medium 16px, `textAutoResize=WIDTH_AND_HEIGHT`, стиль `Text/SecText`
- NODE-hyperlink на название каждого компонента: `setRangeHyperlink(start, end, { type: 'NODE', value: nodeId })`
- Не менять визуальный стиль ссылки — без подчёркивания, без смены цвета
- Перед каждой записью — разделитель Rectangle 802×1px

**Формат текста описания:**
- Новый компонент: `Новый компонент — {ComponentName}`
- Новое состояние: `Новое состояние компонента — {ComponentName}`
- Несколько изменений одной даты — один блок, все через `\n`

**Правила добавления:**
- Новые записи — в конец списка
- Несколько изменений одной даты — один блок, дата один раз
- Каждое название компонента — NODE-ссылка на соответствующий component set
- После добавления — проверить высоту родителя `304:1205` (`clipsContent=true`)

---

## Component Layout Format

Эталон: страница Tab (`254:208`). Строго воспроизводить для каждого нового компонента.

### Структура фрейма страницы

```
Frame (имя компонента, bg/surface, VERTICAL, gap=0, cornerRadius=24)
├── Document (VERTICAL, padding 0/48/12/48, gap=10, bg/surface)
│   └── Logo bar (HORIZONTAL, AUTO/AUTO, fill text/primary, tl=0, tr=0, bl=12, br=12, padding 8/16/8/16)
│       └── Text "Figma": Inter Semi Bold 25px, токен text/onPrimary
└── Component Container (VERTICAL, padding 40, gap=24, bg/surface)
    ├── Title: Inter Medium 56px, токен text/primary
    └── Content Row (HORIZONTAL, gap=16)
        ├── Row Labels (VERTICAL, gap=31, paddingTop=80)
        │   └── Row: {label} (текст 12px Regular, токен text/secondary)
        └── Grid Column (VERTICAL, gap=16)
            ├── Column Headers (HORIZONTAL, paddingLeft/Right=40, gap между колонками)
            │   └── Col: {state} (FIXED ширина = ширине варианта, CENTER/MAX, текст 12px Regular, токен text/secondary)
            └── ComponentSet (stroke primary/default, dashPattern=[10,5], strokeWeight=1, fills=[])
```

### Правила раскладки

- Внешний фрейм: `cornerRadius=24`
- Logo bar: `primaryAxisSizingMode=AUTO`, `counterAxisSizingMode=AUTO`
- Grid Column: `gap=16` между Column Headers и ComponentSet
- Подписи колонок: 12px Regular, `text/secondary`, выровнены по центру и низу
- ComponentSet: stroke `primary/default`, dashPattern `[10, 5]`, strokeWeight 1, fills пустые
- Варианты внутри сета: отступы 40px по краям, gap 24px между вариантами

### Правила внутри вариантов

- Отступы: кратные 8, `padding 16/16/16/16` по умолчанию
- Gap между элементами: `8`
- cornerRadius: `16`
- Размер шрифта: `13px Medium` для основного, `13px Regular` для вспомогательного

**Важно:** Если дизайнер настроил параметры вручную — считать их эталоном, не перезаписывать.

---

## Documentation Format

Для страниц документации компонента в DS-файле.

### Структура фрейма (749px wide, border-radius 24px)

1. **Document** (padding 0/32/0/32, gap=0)
   - **Logo bar**: HORIZONTAL, AUTO/AUTO, fill `text/primary`, tl=0, tr=0, bl=12, br=12, padding 8/16/8/16
     - Text "Documentation": Inter Semi Bold 25px, токен `text/onPrimary`
   - **header**: VERTICAL, padding 32/0, gap=16
     - Title: Inter Medium 36px, токен `text/primary`, textAutoResize=HEIGHT
     - Description: Inter Regular 16px, токен `text/secondary`, textAutoResize=HEIGHT
   - **Divider** (instance `159:3846`)
2. **Colors** (padding 32, gap=0)
   - **Frame body** (VERTICAL, gap=24)
     - Section header: Inter Semi Bold 24px, токен `text/primary`
     - **Frame param**: param name 24px Regular + description 16px Regular `text/secondary`
     - Divider instance между секциями
     - **Frame rules** (VERTICAL, gap=8): текст 16px Regular `text/secondary`

### Обязательные секции

- Параметры (описание каждого свойства)
- Ключевые правила
- Используемые токены

### Правило композиции

Внутри нового компонента — использовать только существующие компоненты DS.
Не создавать собственные примитивы если есть готовый аналог в библиотеке.
