# Color Tokens — единственный источник цветов

> **Правило для агента:**
> - В Figma → использовать Variable из коллекции `Colors` по имени токена
> - В коде → использовать ключ из `tokens/colors.ts` (импорт, не хардкод)
> - Встретил цвет которого нет в этом файле → создай токен, сообщи пользователю

---

## Figma Variables — коллекция Colors

**Файл:** `5YV3wQjobtEYjH3blUEmOr`  
**Коллекция:** `VariableCollectionId:3232:4116`  
**Режимы:** `Light` (3232:2) / `Dark` (3232:3)

> Dark mode — в разработке. Токены созданы, значения активны.

### Полная таблица токенов

| Токен | Роль | VariableID | Light | Dark |
|-------|------|------------|-------|------|
| `text/primary` | Основной текст | VariableID:3232:4117 | `#2E3345` | `#F6F8FF` |
| `text/secondary` | Вторичный / подписи | VariableID:3232:4118 | `#616F9E` | `#616F9E` |
| `text/disabled` | Disabled основной | VariableID:3232:4119 | `#D5D6DA` | `#727DA6` |
| `text/disabledSecondary` | Disabled вторичный | VariableID:3232:4120 | `#DFE2EC` | `#727DA6` |
| `text/onPrimary` | Текст на акценте (кнопка, лого-бар) | VariableID:3232:4121 | `#FFFFFF` | `#FFFFFF` |
| `bg/surface` | Карточки, модалки, панели | VariableID:3232:4122 | `#FFFFFF` | `#2D3243` |
| `bg/page` | Фон страницы | VariableID:3232:4123 | `#EFF1F8` | `#1E212B` |
| `bg/input` | Фон полей ввода | VariableID:3232:4124 | `#F4F6FA` | `#242836` |
| `bg/elevated` | Таблица, дропдаун | VariableID:3232:4125 | `#F8FAFC` | `#292E3D` |
| `stroke/subtle` | Слабая граница | VariableID:3232:4126 | `#E9EDF4` | `#3B4259` |
| `stroke/default` | Стандартная граница | VariableID:3232:4127 | `#D4D7DB` | `#434B6A` |
| `primary/default` | Акцент синий | VariableID:3232:4128 | `#4C87EC` | `#6788EC` |
| `primary/hover` | Акцент hover | VariableID:3232:4129 | `#2765CF` | `#4B6CCD` |
| `primary/muted` | Акцент фон (20%) | VariableID:3232:4130 | `#DBE7FB` | `#2C3560` |
| `primary/mutedStrong` | Акцент (60%) | VariableID:3232:4131 | `#94B7F4` | `#4B6CCD` |
| `status/error` | Ошибка | VariableID:3232:4132 | `#EB5757` | `#EB5757` |
| `status/errorHover` | Ошибка hover | VariableID:3232:4133 | `#C74952` | `#C74952` |
| `status/errorBg` | Фон ошибки | VariableID:3232:4134 | `#FDEFEF` | `#472B33` |
| `status/errorBgStrong` | Фон ошибки насыщ. | VariableID:3232:4135 | `#FBDDDD` | `#472B33` |
| `status/success` | Успех | VariableID:3232:4136 | `#27AE60` | `#27AE60` |
| `status/successBg` | Фон успеха | VariableID:3232:4137 | `#EAF7F0` | `#153325` |
| `status/warning` | Предупреждение | VariableID:3232:4138 | `#FFB22B` | `#FFB22B` |
| `status/warningBg` | Фон предупреждения | VariableID:3232:4139 | `#FFF8EA` | `#3A2C14` |
| `accent/blueBg` | Фон синего акцента | VariableID:3232:4140 | `#EEF3FE` | `#2C3560` |
| `neutral/muted` | Нейтральный приглушённый | VariableID:3232:4141 | `#909ABB` | `#8E97B8` |
| `button/darkHover` | Hover outline кнопки | VariableID:3232:4142 | `#1E212B` | `#1E212B` |

> Источник: экспорт Variables из Figma (`Light.tokens.json` / `Dark.tokens.json`)

---

## Figma Styles — для Figma API (`setFillStyleIdAsync`)

> Стили — старый механизм. Для новых компонентов использовать Variables.  
> Стили остаются для обратной совместимости с legacy-компонентами.

| Style Name | Style ID | Variable |
|------------|----------|----------|
| Text/PrText | `S:2a84d9d3637c15800b7dfbcca788d1d9cc8b9018,` | `text/primary` |
| Text/SecText | `S:5d5de820daae9148fe3fe1d1dfff66a78e871ecb,` | `text/secondary` |
| Text/DisPrText | `S:61b4d03caa004569c4edc3d4ceae7850b633db17,` | `text/disabled` |
| Text/DisSecText | `S:20ffc04f35acab08d42f98f2084820f2fae8cbcf,` | `text/disabledSecondary` |
| Primary/AccentBlue | `S:4dee286cc0aece7de5919041bf096bc45cb89ff2,` | `primary/default` |
| Primary/AccentHover | `S:9969d717720feeef16dae91e228a01d5bdec3753,` | `primary/hover` |
| Primary/Accent60a | `S:56ad17f7b0911f04bbbf87dfc5b47b18c214aa5d,` | `primary/mutedStrong` |
| Primary/Accent20a | `S:7430d392558e81852cbfce96c702bb72e2fa5fb9,` | `primary/muted` |
| Primary/White | `S:848eb3b7ba3b597bf22174da648f18727475d373,` | `bg/surface` или `text/onPrimary` (по контексту) |
| Secondary/BlueGray | `S:009aab635cccc3c50f8b2466956d52e0901ba00f,` | `neutral/muted` |
| Secondary/Red | `S:ad64fb99494db6a32d5cfab96099feb0863568dd,` | `status/error` |
| Secondary/Green | `S:9c8d34594ec70641591f2b67345eea85810dba62,` | `status/success` |
| Secondary/Yellow | `S:5565ff0e235cddbca16e7b6bee6dd7e48a1be502,` | `status/warning` |
| Secondary/LightRed | `S:828371c4da984bba5cff7fb5e0c8ea8e539efd8e,` | `status/errorBg` |
| Secondary/LightGreen | `S:a745662df74085b66f470c28c574a3ca3f3d24cc,` | `status/successBg` |
| Secondary/LightYellow | `S:2b0aea29902145c2d36d444e2c107e0cc9b386f8,` | `status/warningBg` |
| Secondary/LightBlue | `S:0d0741fcb2b9ab6fbf5255c1ab393d544c1f1245,` | `accent/blueBg` |
| Stroke/LightStrokeColor | `S:5980f7a8b5842cc49ff754cfbbaf5445a7085279,` | `stroke/subtle` |
| Stroke/StrongStrokeColor | `S:5e67bd2004262215b228873d3783ba9a59ba914c,` | `stroke/default` |
| Bg/InputBg | `S:cddf634b99db8b0da4678d0b8b13cd51918595ac,` | `bg/input` |
| Bg/SidePageBg | `S:811b5afe791996e8492cafe7791083593fa3e3db,` | `bg/page` |
| Bg/TableSecBg | `S:c4f697643609a49d107d7e5660ab1badae1f80c2,` | `bg/elevated` |

---

## Фронтенд — `tokens/colors.ts`

> Агент НЕ хардкодит цвета в компонентах — только импортирует из этого файла.

```ts
// tokens/colors.ts
export const colors = {
  text: {
    primary:           'var(--color-text-primary)',
    secondary:         'var(--color-text-secondary)',
    disabled:          'var(--color-text-disabled)',
    disabledSecondary: 'var(--color-text-disabled-secondary)',
    onPrimary:         'var(--color-text-on-primary)',
  },
  bg: {
    surface:  'var(--color-bg-surface)',
    page:     'var(--color-bg-page)',
    input:    'var(--color-bg-input)',
    elevated: 'var(--color-bg-elevated)',
  },
  primary: {
    default:     'var(--color-primary-default)',
    hover:       'var(--color-primary-hover)',
    muted:       'var(--color-primary-muted)',
    mutedStrong: 'var(--color-primary-muted-strong)',
  },
  status: {
    error:         'var(--color-status-error)',
    errorHover:    'var(--color-status-error-hover)',
    errorBg:       'var(--color-status-error-bg)',
    errorBgStrong: 'var(--color-status-error-bg-strong)',
    success:       'var(--color-status-success)',
    successBg:     'var(--color-status-success-bg)',
    warning:       'var(--color-status-warning)',
    warningBg:     'var(--color-status-warning-bg)',
  },
  stroke: {
    subtle:  'var(--color-stroke-subtle)',
    default: 'var(--color-stroke-default)',
  },
  accent: {
    blueBg: 'var(--color-accent-blue-bg)',
  },
  neutral: {
    muted: 'var(--color-neutral-muted)',
  },
  button: {
    darkHover: 'var(--color-button-dark-hover)',
  },
} as const;
```

---

## Если встретил цвет которого нет в токенах

1. Не хардкодить hex/rgb
2. Определить роль цвета (текст, фон, граница, акцент, статус)
3. Предложить имя по паттерну: `группа/роль` (например `status/info`, `bg/hover`)
4. Создать Variable в Figma в коллекции `Colors` (или попросить пользователя)
5. Добавить в эту таблицу и в `tokens/colors.ts`
6. **Сообщить пользователю:** «Добавил новый токен `status/info` — нужно задать Dark-значение вручную»
