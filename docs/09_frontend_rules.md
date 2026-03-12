# Frontend Rules — правила вёрстки

Как верстать макет 1-в-1 по Figma. Обязательны при создании и рефакторинге компонентов.

---

## Структура файлов

```
frontend/src/{module}/
├── components/
│   ├── icons/           # SVG-иконки как React-компоненты
│   │   └── index.ts
│   ├── shared/          # Переиспользуемые элементы (кнопки, бейджи и т.д.)
│   │   └── index.ts
│   ├── {feature}/       # Подкомпоненты сложного компонента
│   │   └── index.ts
│   └── {Component}.tsx
├── mocks/               # Моковые данные (отдельно от компонентов)
│   └── index.ts
├── tokens/
│   └── colors.ts        # Импорт цветов — единственный способ использовать цвета в коде
├── {Module}.tsx
├── {module}.css         # Только для hover, медиа-запросов, кастомных скроллбаров
└── index.ts
```

---

## Чтение макета — сначала читай, потом пиши

Перед написанием единой строки кода — полный обход дерева через MCP.

```js
// Шаг 1 — найти корневой узел
figma.getNodeByIdAsync('NODE_ID')

// Шаг 2 — извлечь метаданные фрейма
{ w, h, bg, layout, gap, pt, pr, pb, pl, cornerRadius }

// Шаг 3 — рекурсивно обойти дерево до depth=15
// для каждого узла: type, name, size, fills, strokes,
// layout, padding, gap, cornerRadius, fontSize, fontWeight, lineHeight, characters
```

Никогда не угадывать значения — только реальные данные из Figma.

### Что читать у каждого узла

| Свойство | Как читать | Куда идёт |
|---|---|---|
| `width` / `height` | `Math.round(n.width)` | `width` / `height` / `flex` |
| `fills[0].color` | определить токен по роли | `background` / `color` через `colors.*` |
| `strokes[0]` + `strokeWeight` | определить токен | `border` через `colors.*` |
| `cornerRadius` | напрямую | `borderRadius` |
| `layoutMode` | `HORIZONTAL` / `VERTICAL` | `flexDirection` |
| `itemSpacing` | напрямую | `gap` |
| `paddingTop/Right/Bottom/Left` | напрямую | `padding` |
| `fontSize` | напрямую | `fontSize` |
| `fontWeight` | напрямую | `fontWeight` |
| `lineHeight.value` | `Math.round(...)` | `lineHeight` |
| `characters` | напрямую | текст в JSX |

---

## Правила

### Правило 1: Цвета только из токенов

Все цвета берутся из `tokens/colors.ts`. Hex/rgb в компонентах **запрещены**.

Источник токенов — `docs/COLOR_TOKENS.md`. Фронтовый `tokens/colors.ts` должен ему соответствовать.

```ts
// Правильно
import { colors } from '../tokens/colors';
background: colors.bg.surface
color: colors.text.primary
borderColor: colors.stroke.subtle

// Запрещено
background: 'rgb(239, 241, 248)'
color: '#2E3345'
```

Если встретил цвет которого нет в токенах → **не хардкодить**, создать токен, сообщить пользователю.

### Правило 2: Структура — повторяй иерархию Figma

Каждый Figma-фрейм = React-компонент или `div` с теми же свойствами.

```
[FRAME] "Panel" (601x922) bg=bg/surface VERTICAL gap=8 p=16/0/0/0 r=24
  [FRAME] "Header" (601x40) HORIZONTAL gap=16 p=0/16/0/24
    [TEXT] "Title" fs=20 fw=400 color=text/primary
```

→

```tsx
<div style={{ width:601, background: colors.bg.surface, borderRadius:24,
              display:'flex', flexDirection:'column', gap:8, paddingTop:16 }}>
  <div style={{ display:'flex', alignItems:'center', gap:16,
                padding:'0 16px 0 24px', height:40 }}>
    <span style={{ fontSize:20, fontWeight:400, color: colors.text.primary }}>Title</span>
  </div>
</div>
```

### Правило 3: Не дублировать компоненты

Если элемент появляется в двух и более местах — выносить в `shared/` или `icons/`.

### Правило 4: Моки отдельно от компонентов

Тестовые данные (`MOCK_*`) живут в `mocks/`, не внутри компонентов.

```tsx
// ✅ Правильно — данные через props, мок в mocks/
const MyTable = ({ rows = [] }: { rows: Row[] }) => (
  <table>{rows.map(r => <tr key={r.id}><td>{r.name}</td></tr>)}</table>
);
```

### Правило 5: Большой компонент — разбивай

Компонент > 300 строк → разбить на подкомпоненты в `components/{feature}/`.

### Правило 6: Иконки — отдельные файлы

- Каждая SVG-иконка — отдельный React-компонент в `components/icons/`
- Именование: `{Name}Icon.tsx` → `DownloadIcon.tsx`, `WarningIcon16.tsx`
- Реэкспорт через `icons/index.ts`
- Сначала ищи в `components/icons/` — если нет, экспортируй из Figma

### Правило 7: Стили — inline objects

```ts
const styles: Record<string, React.CSSProperties> = { ... }
```

CSS-файл модуля — только для того, что нельзя сделать inline: hover, медиа-запросы, кастомные скроллбары. Не смешивать подходы внутри одного компонента.

### Правило 8: Шрифт

Единственный шрифт — **Inter**. Начертания: 400, 500, 600.  
Всегда указывать `fontFamily: 'Inter, sans-serif'` на корневом элементе.

### Правило 9: Реэкспорт через index.ts

Каждая папка (`icons/`, `shared/`, `mocks/`, `{feature}/`) имеет `index.ts`.  
Импорт из соседних папок — через `index.ts`, не через прямые пути.

### Правило 10: @figma-lock

```tsx
{/* @figma-lock-start — описание */}
...
{/* @figma-lock-end */}
```

### Правило 11: Адаптивность

- Минимальная ширина: 768px
- Медиа-запросы — в CSS-файле модуля, не в inline
- Сетка — CSS Grid, колонки схлопываются в 1 на 768px

---

## Таблицы — только `<table>`, никогда div+grid

```tsx
<table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
  <thead>
    <tr>
      <th style={{ ...styles.th, textAlign: 'left' }}>Название</th>
      <th style={{ ...styles.th, width: 70, textAlign: 'right' }}>Число</th>
    </tr>
  </thead>
  <tbody>{rows.map(r => <tr key={r.id}>...</tr>)}</tbody>
</table>
```

| Тип колонки | textAlign |
|---|---|
| Первая (название, проект) | `'left'` |
| Числовые | `'right'` |
| Бейджи, статусы | `'center'` |

| Назначение | Ширина |
|---|---|
| № (порядковый) | 16px |
| Короткие числовые | 50–60px |
| Числа с подписью | 70px |
| Первая текстовая | auto |

---

## Высоты и скролл

```tsx
// ❌ Ломает скролл
<div style={{ height:'100vh', overflow:'hidden' }}>

// ✅ Правильно
<div style={{ minHeight:'100vh', display:'flex', gap:8, padding:16 }}>
  <Panel style={{ overflowY:'auto' }} />
</div>
```

---

## Активные состояния — точно из Figma

```tsx
<tr style={{
  background: isActive ? colors.primary.muted : 'transparent',
  borderLeft: isActive ? `2px solid ${colors.primary.default}` : '2px solid transparent',
  cursor: 'pointer',
  transition: 'background 0.1s',
}}>
```

---

## key — всегда по id

```tsx
// ✅ Правильно
rows.map(r => <tr key={r.id}>...)

// ❌ Баг при динамических данных
rows.map((r, i) => <tr key={i}>...)
```

---

## Чеклист перед отдачей кода

- [ ] Все значения считаны из Figma, ничего не угадано
- [ ] Все цвета через `colors.*`, нет hex/rgb inline
- [ ] Таблицы на `<table>`, не на div+grid
- [ ] `key` по `id`, не по индексу
- [ ] Данные через props, мок в `mocks/`
- [ ] Компоненты разбиты по логике макета
- [ ] Нет `height:100vh` + `overflow:hidden` на корне
- [ ] Активные состояния реализованы
- [ ] Шрифт — только Inter (400, 500, 600)
- [ ] Иерархия компонентов повторяет Figma
