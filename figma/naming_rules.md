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

## Changelog — формат записи

- Горизонтальный фрейм, spacing 56
- Дата: Inter Medium 16px, w=150, textAutoResize=HEIGHT
- Описание: Inter Medium 16px, textAutoResize=WIDTH_AND_HEIGHT
- Оба текста: стиль `Text/SecText`
- Разделитель между записями: Rectangle 802×1px, fill `#e9edf4`
- NODE-hyperlink на компонент: `setRangeHyperlink(start, end, { type: 'NODE', value: nodeId })`
- **НЕ менять визуальный стиль ссылки** — без подчёркивания, без смены цвета

## Documentation Format (страницы компонентов)

### Структура фрейма (749px wide, border-radius 24px)

1. **Logo bar**: Frame, fill `{r:0.18, g:0.2, b:0.27}`, bottomLeftRadius=12, bottomRightRadius=12, padding 8/16
   - Text "Documentation": Inter Semi Bold 25px, стиль `Primary/White`
2. **Header**: padding 32/0, spacing 16
   - Title: Inter Medium 36px, стиль `Text/PrText`
   - Description: Inter Regular 16px, стиль `Text/SecText`
3. **Divider** (instance `159:3846`)
4. **Content**: padding 32, body spacing 24
   - Section header: Inter Semi Bold 24px, стиль `Text/PrText`
   - Param name: Inter Regular 24px, стиль `Text/PrText`
   - Param description: Inter Regular 16px, стиль `Text/SecText`
   - Dividers между секциями

### Обязательные секции

- Параметры (описание каждого свойства компонента со значениями)
- Ключевые правила
- Используемые стили
