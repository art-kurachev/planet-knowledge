# Figma Naming Rules

## Компоненты

Формат: `{Type}{Style}{Size}`

Примеры:
- `BtnPrimaryRegular`
- `BtnStrokeSmall`
- `InputSmall`
- `SelectGreySmall`

## Варианты (Properties)

Формат: `{Property}={Value}`

Примеры:
- `Status=Default`, `Status=Hover`, `Status=Disabled`
- `Icon=yes/no`
- `Active=yes/no`
- `Size=Regular/Small`

## Стили заливки

### Text
| Name | Style ID |
|------|----------|
| Text/PrText | `S:2a84d9d3637c15800b7dfbcca788d1d9cc8b9018,` |
| Text/SecText | `S:5d5de820daae9148fe3fe1d1dfff66a78e871ecb,` |
| Text/DisPrText | `S:61b4d03caa004569c4edc3d4ceae7850b633db17,` |
| Text/DisSecText | `S:20ffc04f35acab08d42f98f2084820f2fae8cbcf,` |

### Primary
| Name | Style ID |
|------|----------|
| Primary/AccentBlue | `S:4dee286cc0aece7de5919041bf096bc45cb89ff2,` |
| Primary/AccentHover | `S:9969d717720feeef16dae91e228a01d5bdec3753,` |
| Primary/Accent60a | `S:56ad17f7b0911f04bbbf87dfc5b47b18c214aa5d,` |
| Primary/Accent20a | `S:7430d392558e81852cbfce96c702bb72e2fa5fb9,` |
| Primary/White | `S:848eb3b7ba3b597bf22174da648f18727475d373,` |

### Secondary
| Name | Style ID |
|------|----------|
| Secondary/BlueGray | `S:009aab635cccc3c50f8b2466956d52e0901ba00f,` |
| Secondary/Red | `S:ad64fb99494db6a32d5cfab96099feb0863568dd,` |
| Secondary/Green | `S:9c8d34594ec70641591f2b67345eea85810dba62,` |
| Secondary/Yellow | `S:5565ff0e235cddbca16e7b6bee6dd7e48a1be502,` |
| Secondary/LightRed | `S:828371c4da984bba5cff7fb5e0c8ea8e539efd8e,` |
| Secondary/LightGreen | `S:a745662df74085b66f470c28c574a3ca3f3d24cc,` |
| Secondary/LightYellow | `S:2b0aea29902145c2d36d444e2c107e0cc9b386f8,` |
| Secondary/LightBlue | `S:0d0741fcb2b9ab6fbf5255c1ab393d544c1f1245,` |

### Stroke / Bg
| Name | Style ID |
|------|----------|
| Stroke/LightStrokeColor | `S:5980f7a8b5842cc49ff754cfbbaf5445a7085279,` |
| Stroke/StrongStrokeColor | `S:5e67bd2004262215b228873d3783ba9a59ba914c,` |
| Bg/InputBg | `S:cddf634b99db8b0da4678d0b8b13cd51918595ac,` |
| Bg/SidePageBg | `S:811b5afe791996e8492cafe7791083593fa3e3db,` |
| Bg/TableSecBg | `S:c4f697643609a49d107d7e5660ab1badae1f80c2,` |

## Правила использования стилей

- **Никогда не хардкодить hex-значения** — только `setFillStyleIdAsync` / `setStrokeStyleIdAsync`
- Для нейтральных рамок — `Stroke/LightStrokeColor`, для акцентных — `Primary/AccentBlue`
- Все цвета берутся исключительно из таблицы выше

## Правила отступов и размеров

- Использовать только значения кратные 8: `8, 16, 24, 32, 40, 48, 56, 64`
- При сомнении между `12` и `16` — выбирать `16`

## Changelog — формат записи

- Горизонтальный фрейм, `primaryAxisSizingMode=FIXED`, ширина 802px, spacing 56
- Дата: Inter Medium 16px, w=150, `textAutoResize=HEIGHT`, стиль `Text/SecText`
- Описание: Inter Medium 16px, `textAutoResize=WIDTH_AND_HEIGHT`, стиль `Text/SecText`
- NODE-hyperlink на название каждого компонента: `setRangeHyperlink(start, end, { type: 'NODE', value: nodeId })`
- **НЕ менять визуальный стиль ссылки** — без подчёркивания, без смены цвета

### Формат текста описания

- Новый компонент: `Новый компонент — {ComponentName}`
- Новое состояние: `Новое состояние компонента — {ComponentName}`
- Несколько изменений одной даты — один блок, все через `\n`

### Правила добавления записей

- **Новые записи добавляются в конец списка**
- **Несколько изменений одной даты — один блок**, дата один раз, все изменения в одном текстовом узле через `\n`
- **Каждое название компонента** — NODE-ссылка на соответствующий component set
- Перед каждой новой записью — разделитель Rectangle 802×1px

## Component Layout Format (раскладка компонентов на странице)

Эталон: страница Tab (`254:208`). Структура строго воспроизводится для каждого нового компонента.

### Структура фрейма страницы

```
Frame (имя компонента, белый фон, VERTICAL, gap=0, cornerRadius=24)
├── Document (VERTICAL, padding 0/48/12/48, gap=10, белый фон)
│   └── Logo bar (HORIZONTAL, AUTO/AUTO, fill Text/PrText, tl=0, tr=0, bl=12, br=12, padding 8/16/8/16)
│       └── Text "Figma": Inter Semi Bold 25px, стиль Primary/White
└── Component Container (VERTICAL, padding 40, gap=24, белый фон)
    ├── Title: Inter Medium 56px, стиль Text/PrText
    └── Content Row (HORIZONTAL, gap=16)
        ├── Row Labels (VERTICAL, gap=31, paddingTop=80) — если есть строки
        │   └── Row: {label} (текст 12px Regular, серый)
        └── Grid Column (VERTICAL, gap=16)
            ├── Column Headers (HORIZONTAL, paddingLeft/Right=40, gap между колонками)
            │   └── Col: {state} (FIXED ширина = ширине варианта, CENTER/MAX, текст 12px Regular серый)
            └── ComponentSet (stroke Primary/AccentBlue, dashPattern=[10,5], strokeWeight=1, fills=[])
```

### Правила раскладки

- Внешний фрейм: `cornerRadius=24`
- Logo bar: `primaryAxisSizingMode=AUTO`, `counterAxisSizingMode=AUTO` — размер по контенту, **не растягивать**
- Grid Column: `gap=16` между Column Headers и ComponentSet
- Подписи колонок — 12px Regular, серый, выровнены по центру и низу ячейки
- ComponentSet: stroke `Primary/AccentBlue`, dashPattern `[10, 5]`, strokeWeight 1, fills пустые
- Варианты внутри сета: отступы 40px по краям, gap 24px между вариантами

### Правила внутри вариантов компонента

- Отступы: только кратные 8 — `padding 16/16/16/16` по умолчанию
- Gap между элементами: `8`
- cornerRadius: `16`
- Размер шрифта: `13px Medium` для основного текста, `13px Regular` для вспомогательного

### Важно: не трогать то что настроено вручную

Если дизайнер настроил параметры вручную в Figma — считать их эталоном, зафиксировать в правилах, **не перезаписывать**.

## Documentation Format (страницы компонентов)

### Структура фрейма (749px wide, border-radius 24px)

1. **Document** (padding 0/32/0/32, gap=0)
   - **Logo bar**: HORIZONTAL, AUTO/AUTO, fill `Text/PrText` (тёмный), tl=0, tr=0, bl=12, br=12, padding 8/16/8/16
     - Text "Documentation": Inter Semi Bold 25px, стиль `Primary/White`
   - **header**: VERTICAL, padding 32/0, gap=16
     - Title: Inter Medium 36px, стиль `Text/PrText`, textAutoResize=HEIGHT
     - Description: Inter Regular 16px, стиль `Text/SecText`, textAutoResize=HEIGHT
   - **Divider** (instance `159:3846`)
2. **Colors** (padding 32, gap=0)
   - **Frame body** (VERTICAL, gap=24)
     - Section header: Inter Semi Bold 24px, стиль `Text/PrText`
     - **Frame param** (VERTICAL, gap=8): param name 24px Regular PrText + description 16px Regular SecText
     - Divider instance между секциями
     - **Frame rules** (VERTICAL, gap=8): текст 16px Regular SecText
     - Divider instance
     - **Frame styles** (VERTICAL, gap=8): текст 16px Regular SecText

### Обязательные секции

- Параметры (описание каждого свойства со значениями)
- Ключевые правила
- Используемые стили

### Правило композиции компонентов

> Внутри нового компонента использовать **только уже существующие компоненты DS** — кнопки, инпуты, иконки, разделители.
> Не создавать собственные примитивы если есть готовый аналог в библиотеке.
> Это правило обязательно фиксировать в секции «Ключевые правила» документации компонента.
