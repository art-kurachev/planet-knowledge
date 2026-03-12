# Правила верстки Figma → Code

Как верстать макет 1-в-1 по Figma используя Figma Console MCP.

---

## 1. Сначала читай — потом пиши

Перед написанием единой строки кода — полный обход дерева через MCP.

```js
// Шаг 1 — найти корневой узел
figma.getNodeByIdAsync('NODE_ID')

// Шаг 2 — извлечь метаданные фрейма
{ w, h, bg, layout, gap, pt, pr, pb, pl, cornerRadius }

// Шаг 3 — рекурсивно обойти дерево до depth=15
// для каждого узла: type, name, size, fills, strokes, layout, padding, gap, cornerRadius, fontSize, fontWeight, lineHeight, characters
```

Никогда не угадывать значения — только реальные данные из Figma.

---

## 2. Что читать у каждого узла

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

**Важно:** цвет из Figma (r,g,b) → определяешь соответствующий токен по роли элемента → используешь `colors.токен` в коде. Не хардкодишь rgb.

---

## 3. Цвета — только токены, никаких rgb inline

```ts
// Правильно
import { colors } from '../tokens/colors';

background: colors.bg.surface
color: colors.text.primary
borderColor: colors.stroke.subtle

// Неправильно — запрещено
background: 'rgb(239, 241, 248)'
color: '#2E3345'
```

Если цвет из Figma не совпадает ни с одним токеном → определить роль, добавить токен, сообщить пользователю.

---

## 4. Структура — повторяй иерархию Figma

Каждый Figma-фрейм = React-компонент или `div` с теми же свойствами.

```
[FRAME] "Panel" (601x922) bg=bg/surface VERTICAL gap=8 p=16/0/0/0 r=24
  [FRAME] "Header" (601x40) HORIZONTAL gap=16 p=0/16/0/24
    [TEXT] "Title" fs=20 fw=400 color=text/primary
```

→

```tsx
import { colors } from '../tokens/colors';

<div style={{ width:601, background: colors.bg.surface, borderRadius:24, display:'flex', flexDirection:'column', gap:8, paddingTop:16 }}>
  <div style={{ display:'flex', alignItems:'center', gap:16, padding:'0 16px 0 24px', height:40 }}>
    <span style={{ fontSize:20, fontWeight:400, color: colors.text.primary }}>Title</span>
  </div>
</div>
```

---

## 5. Таблицы — только `<table>`, никогда `div + grid`

```tsx
<table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
  <thead>
    <tr>
      <th style={{ ...styles.th, textAlign: 'left' }}>Название</th>
      <th style={{ ...styles.th, width: 70, textAlign: 'right' }}>Число</th>
    </tr>
  </thead>
  <tbody>
    {rows.map(r => <tr key={r.id}>...</tr>)}
  </tbody>
</table>
```

### Выравнивание заголовков (th)

| Тип колонки | textAlign |
|-------------|----------|
| Первая (название, проект) | `'left'` |
| Числовые | `'right'` |
| Бейджи, статусы | `'center'` |

### Ширины колонок

| Назначение | Ширина |
|------------|--------|
| № (порядковый номер) | 16px |
| Короткие числовые | 50–60px |
| Числа с подписью | 70px |
| Первая текстовая | не задавать (flex/auto) |

---

## 6. Данные — отдельно от верстки

```tsx
// ✅ Правильно — данные через props, мок в mocks/
const MyTable = ({ rows = [] }: { rows: Row[] }) => (
  <table>
    {rows.map(r => <tr key={r.id}><td>{r.name}</td></tr>)}
  </table>
);

// Мок — в файле mocks/index.ts, не здесь
```

---

## 7. key — всегда по id

```tsx
// ✅ Правильно
rows.map(r => <tr key={r.id}>...)

// ❌ Баг при динамических данных
rows.map((r, i) => <tr key={i}>...)
```

---

## 8. Высоты и скролл

```tsx
// ❌ Ломает скролл
<div style={{ height:'100vh', overflow:'hidden' }}>

// ✅ Правильно
<div style={{ minHeight:'100vh', display:'flex', gap:8, padding:16 }}>
  <Panel style={{ overflowY:'auto' }} />
</div>
```

---

## 9. Активные состояния — точно из Figma

```tsx
<tr style={{
  background: isActive ? colors.primary.muted : 'transparent',
  borderLeft: isActive ? `2px solid ${colors.primary.default}` : '2px solid transparent',
  cursor: 'pointer',
  transition: 'background 0.1s',
}}>
```

---

## 10. Чеклист перед отдачей кода

- [ ] Все цвета через `colors.*` из токенов, нет hex/rgb inline
- [ ] Все `padding`, `gap`, `borderRadius`, `fontSize`, `fontWeight` из узлов Figma
- [ ] Таблицы на `<table>`, не на div+grid
- [ ] `key` по `id`, не по индексу
- [ ] Данные через props, мок в `mocks/`
- [ ] Нет `height:100vh` + `overflow:hidden` на корне
- [ ] Активные состояния реализованы
- [ ] Иерархия компонентов повторяет Figma
