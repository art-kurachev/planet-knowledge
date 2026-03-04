# Figma File Map

## Файлы

| Файл | File Key | Описание |
|------|----------|----------|
| Planetа Design System | `5YV3wQjobtEYjH3blUEmOr` | Дизайн-система: компоненты, стили, токены |
| Planetа Mobile App | `ObxjfzMRKkNsshVJROr2RZ` | Основной файл мобильного приложения |

## MCP-серверы

- **figma-console** — для программных правок в Figma
- **Figma** (официальный) — для чтения через URL

## Ключевые страницы / ноды

| Нода | ID | Описание |
|------|----|----------|
| Changelog (страница) | `304:1202` | Лог изменений дизайн-системы |
| Changelog (контейнер записей) | `304:1445` | Frame внутри `304:1209` |

## Variables (Colors) — семантические

| Коллекция | ID | Modes |
|-----------|-----|-------|
| Colors | `VariableCollectionId:3232:4116` | Light, Dark |

### Семантические токены (по роли, не по цвету)

| Токен | Роль | Light | Dark |
|-------|------|-------|------|
| `text/primary` | Основной текст | #2e3345 | #E4E4E7 |
| `text/secondary` | Вторичный текст | #616f9e | #A1A1AA |
| `text/disabled` | Текст disabled | #d5d6da | #71717A |
| `text/disabledSecondary` | Disabled вторичный | #dfe2ec | #52525B |
| `text/onPrimary` | Текст на акценте (кнопка, лого-бар) | #ffffff | #ffffff |
| `bg/surface` | Карточки, модалки, панели | #ffffff | #27272A |
| `bg/page` | Фон страницы | #eff1f8 | #18181B |
| `bg/input` | Фон полей ввода | #f4f6fa | #18181B |
| `bg/elevated` | Таблица, дропдаун | #f8fafc | #3F3F46 |
| `stroke/subtle` | Слабая граница | #e9edf4 | #3F3F46 |
| `stroke/default` | Стандартная граница | #d4d7db | #52525B |
| `primary/default` | Акцент | #4c87ec | #5B8DEF |
| `primary/hover` | Акцент hover | #2765cf | #7BA3F5 |
| `primary/muted` | Акцент фон 20% | #dbe7fb | #1E3A5F |
| `primary/mutedStrong` | Акцент 60% | #94b7f4 | #3D6DB5 |
| `status/error` | Ошибка | #eb5757 | #F87171 |
| `status/errorHover` | Ошибка hover | #c74952 | #FB9191 |
| `status/errorBg` | Фон ошибки | #fdefef | #450A0A |
| `status/errorBgStrong` | Фон ошибки насыщ. | #fbdddd | #7F1D1D |
| `status/success` | Успех | #27ae60 | #4ADE80 |
| `status/successBg` | Фон успеха | #eaf7f0 | #052E16 |
| `status/warning` | Предупреждение | #ffb22b | #FACC15 |
| `status/warningBg` | Фон предупреждения | #fff8ea | #422006 |
| `accent/blueBg` | Фон синего акцента | #eef3fe | #172554 |
| `neutral/muted` | Нейтральный приглушённый | #909abb | #A1A1AA |
| `button/darkHover` | Hover outline кнопки | #1e212b | #3F3F46 |

### Ориентировочный маппинг Style → Variable (контекст важен)

**Primary/White** — по контексту: фон карточки/модалки → `bg/surface`, текст на акценте → `text/onPrimary`

- Text/PrText → `text/primary`
- Text/SecText → `text/secondary`
- Text/DisPrText → `text/disabled`
- Text/DisSecText → `text/disabledSecondary`
- Primary/AccentBlue → `primary/default`
- Primary/AccentHover → `primary/hover`
- Primary/Accent20a → `primary/muted`
- Primary/Accent60a → `primary/mutedStrong`
- Bg/SidePageBg → `bg/page`
- Bg/InputBg → `bg/input`
- Bg/TableSecBg → `bg/elevated`
- Stroke/LightStrokeColor → `stroke/subtle`
- Stroke/StrongStrokeColor → `stroke/default`

## Reusable Instances

| Компонент | ID | Описание |
|-----------|----|----------|
| Divider | `159:3846` | `Style=Light, Vertical=no` — горизонтальный разделитель |
