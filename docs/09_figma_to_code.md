# Правила верстки по Figma → Code

Инструкция для агента: как верстать макет 1-в-1 по Figma используя Figma Console MCP.

---

## 1. Сначала читай — потом пиши

Перед написанием единой строки кода обязательно выполни полный обход дерева через MCP.

**Порядок чтения:**

```js
// Шаг 1 — найти корневой узел
figma.getNodeByIdAsync('NODE_ID')

// Шаг 2 — извлечь метаданные фрейма
{ w, h, bg, layout, gap, pt, pr, pb, pl, cornerRadius }

// Шаг 3 — рекурсивно обойти дерево до depth=7
// для каждого узла собрать: type, name, size, bg, stroke, layout, padding, gap, cornerRadius, fontSize, fontWeight, lineHeight, characters
```

Никогда не угадывай значения — только читай из Figma.

---

## 2. Что читать у каждого узла

| Свойство | Как читать | Куда идёт в CSS |
|---|---|---|
| `width` / `height` | `Math.round(n.width)` | `width` / `height` или `flex` |
| `fills[0].color` | `rgb(r*255, g*255, b*255)` | `background` / `color` |
| `strokes[0]` + `strokeWeight` | то же | `border` |
| `cornerRadius` | напрямую | `borderRadius` |
| `layoutMode` | `HORIZONTAL` / `VERTICAL` | `flexDirection` |
| `itemSpacing` | напрямую | `gap` |
| `paddingTop/Right/Bottom/Left` | напрямую | `padding` |
| `fontSize` | напрямую | `fontSize` |
| `fontWeight` | напрямую | `fontWeight` |
| `lineHeight.value` | `Math.round(...)` | `lineHeight` |
| `characters` | напрямую | текст в JSX |

---

## 3. Токены — точные rgb(), никаких приближений

```js
// Правильно
background: "rgb(239,241,248)"
color: "rgb(46,51,69)"

// Неправильно
background: "#EFF1F8"   // ← конвертация может дать погрешность
color: "#1A1D23"        // ← не совпадёт с Figma на 100%
```

Всегда вычислять через `Math.round(color.r * 255)`.

---

## 4. Структура — повторяй иерархию Figma

Каждый Figma-фрейм = React-компонент или `div` с теми же свойствами.

```
[FRAME] "Panel" (601x922) bg=white VERTICAL gap=8 p=16/0/0/0 r=24
  [FRAME] "Header" (601x40) HORIZONTAL gap=16 p=0/16/0/24
    [TEXT] "Title" fs=20 fw=400
  [FRAME] "Table" (601x858) VERTICAL gap=0
```

→

```jsx
<div style={{ width:601, background:"#fff", borderRadius:24, display:"flex", flexDirection:"column", gap:8, paddingTop:16 }}>
  <div style={{ display:"flex", alignItems:"center", gap:16, padding:"0 16px 0 24px", height:40 }}>
    <span style={{ fontSize:20, fontWeight:400 }}>Title</span>
  </div>
  <div style={{ display:"flex", flexDirection:"column" }}>
    ...
  </div>
</div>
```

---

## 5. Таблицы — только `<table>`, никогда `div + grid`

Причины:
- Колонка добавляется в одном месте (`columns` массив)
- Браузер сам выравнивает ширины по контенту (`table-layout: auto`)
- Легко подключить данные с API через `.map()`

```jsx
<table style={{ width:"100%", borderCollapse:"collapse", tableLayout:"auto" }}>
  <colgroup>
    <col /> {/* auto */}
    <col style={{ width: 70 }} />
  </colgroup>
  <thead>
    <tr><th style={TH_STYLE}>Колонка</th></tr>
  </thead>
  <tbody>
    {rows.map(r => <tr key={r.id}><td style={TD_STYLE}>{r.value}</td></tr>)}
  </tbody>
</table>
```

---

## 6. Данные — отдельно от верстки

```jsx
// ❌ Неправильно — данные захардкожены внутри компонента
const MyTable = () => (
  <table>
    <tr><td>Иванов</td><td>100</td></tr>
    ...
  </table>
)

// ✅ Правильно — данные через props, мок отдельно
const MyTable = ({ rows = [] }) => (
  <table>
    {rows.map(r => <tr key={r.id}><td>{r.name}</td><td>{r.value}</td></tr>)}
  </table>
)

// Мок (заменить на API-вызов)
const MOCK_ROWS = [
  { id: 1, name: "Иванов", value: 100 },
]
```

---

## 7. key — всегда по id, никогда по индексу

```jsx
// ❌ Баг при динамических данных
rows.map((r, i) => <tr key={i}>...)

// ✅ Правильно
rows.map(r => <tr key={r.id}>...)
```

---

## 8. Высоты и скролл — не ломать поток

```jsx
// ❌ Ломает скролл в iframe/артефакте
<div style={{ height:"100vh", overflow:"hidden" }}>

// ✅ Правильно — минимальная высота, скролл по необходимости
<div style={{ minHeight:"100vh", display:"flex", gap:8, padding:16 }}>
  <Panel style={{ overflowY:"auto" }} />
</div>
```

---

## 9. Активные состояния — точно из Figma

В макете всегда есть состояние активной строки. Читать его и повторять точно.

```js
// Из Figma: активная строка bg=rgb(238,243,254), borderLeft=2px solid rgb(76,135,236)
<tr style={{
  background: isActive ? "rgb(238,243,254)" : "transparent",
  borderLeft: isActive ? "2px solid rgb(76,135,236)" : "2px solid transparent",
  cursor: "pointer",
  transition: "background 0.1s",
}}>
```

---

## 10. Чеклист перед отдачей кода

- [ ] Все цвета взяты из Figma как `rgb()`, не конвертированы вручную
- [ ] Все `padding`, `gap`, `borderRadius`, `fontSize`, `fontWeight` точно из узлов
- [ ] Таблицы на `<table>`, не на `div+grid`
- [ ] `key` по `id`, не по индексу
- [ ] Данные через props, мок отдельно внизу файла
- [ ] Нет `height:100vh` + `overflow:hidden` на корне
- [ ] Активные состояния строк реализованы
- [ ] Иерархия компонентов повторяет иерархию Figma-фреймов
