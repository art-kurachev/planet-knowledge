# Правила привязки переменных (Variables) к макетам в Figma

> Используется когда нужно подключить токены из коллекции `Colors` к компонентам дизайн-системы,
> чтобы поддерживалось переключение светлой и тёмной темы.

---

## Алгоритм

### 1. Убедиться что Desktop Bridge подключён
Figma Desktop → Plugins → Development → Desktop Bridge (WebSocket должен быть активен).

### 2. Считать коллекции переменных
```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
```
Найти коллекцию `Colors` — она содержит моды `Light` и `Dark`.

### 3. Собрать маппинг rgb → variableId
Из коллекции `Colors`, мод `Light`:
```js
const vars = await figma.variables.getLocalVariablesAsync('COLOR');
const colorMap = {};
for (const v of vars) {
  const light = v.valuesByMode[LIGHT_MODE_ID];
  if (light?.r !== undefined) {
    const key = `${Math.round(light.r*255)},${Math.round(light.g*255)},${Math.round(light.b*255)}`;
    colorMap[key] = v.id;
  }
}
```

### 4. Предзагрузить переменные асинхронно
```js
const varCache = {};
for (const [rgb, varId] of Object.entries(colorMap)) {
  varCache[rgb] = await figma.variables.getVariableByIdAsync(varId);
}
```
⚠️ Важно: `getVariableById` (синхронный) не работает в dynamic-page контексте — только `getVariableByIdAsync`.

### 5. Рекурсивно обойти дерево узлов и привязать переменные
```js
function rgbKey(c) {
  return `${Math.round(c.r*255)},${Math.round(c.g*255)},${Math.round(c.b*255)}`;
}

function bindPaints(node) {
  if ('fills' in node && node.fills?.length > 0) {
    node.fills = node.fills.map(fill => {
      if (fill.type === 'SOLID' && fill.color && !fill.boundVariables?.color) {
        const variable = varCache[rgbKey(fill.color)];
        if (variable) return figma.variables.setBoundVariableForPaint(fill, 'color', variable);
      }
      return fill;
    });
  }
  if ('strokes' in node && node.strokes?.length > 0) {
    node.strokes = node.strokes.map(stroke => {
      if (stroke.type === 'SOLID' && stroke.color && !stroke.boundVariables?.color) {
        const variable = varCache[rgbKey(stroke.color)];
        if (variable) return figma.variables.setBoundVariableForPaint(stroke, 'color', variable);
      }
      return stroke;
    });
  }
}

async function walkNode(node, depth = 0) {
  if (depth > 15) return; // depth 15, не 8 — фреймы бывают глубокими
  bindPaints(node);
  if ('children' in node) {
    for (const child of node.children) {
      await walkNode(child, depth + 1);
    }
  }
}
```

### 6. Запустить на целевом фрейме или компонент-сете
```js
const target = await figma.getNodeByIdAsync(TARGET_NODE_ID);
await walkNode(target);
```

### 7. Проверить результат скриншотом
После выполнения — сделать скриншот через `figma_get_screenshot` и убедиться что визуал 1:1.

---

## Если в файле уже есть правильно привязанные узлы (ручные правки)

Не строить маппинг из коллекции заново — **учиться у существующих правок**:

```js
async function collectMappings(node, colorToVar = {}, depth = 0) {
  if (depth > 5) return colorToVar;
  const paints = [
    ...('fills' in node ? node.fills || [] : []),
    ...('strokes' in node ? node.strokes || [] : [])
  ];
  for (const paint of paints) {
    if (paint.type === 'SOLID' && paint.color && paint.boundVariables?.color) {
      const rgb = `${Math.round(paint.color.r*255)},${Math.round(paint.color.g*255)},${Math.round(paint.color.b*255)}`;
      colorToVar[rgb] = paint.boundVariables.color.id;
    }
  }
  if ('children' in node) {
    for (const child of node.children) {
      await collectMappings(child, colorToVar, depth + 1);
    }
  }
  return colorToVar;
}
```

---

## Как выявлять ручные оверрайды на слоях

После привязки переменных — проверять есть ли узлы где цвет слоя **не совпадает** с Dark-значением переменной. Это ручные правки дизайнера которые нужно выучить.

```js
// Алгоритм: сканируем фрейм, ищем расхождения actualHex vs varDarkHex
const DARK_MODE_ID = "3232:3";
const vars = await figma.variables.getLocalVariablesAsync('COLOR');
const varDarkMap = {};
for (const v of vars) {
  const dv = v.valuesByMode[DARK_MODE_ID];
  if (dv?.r !== undefined) {
    varDarkMap[v.id] = '#' + [dv.r, dv.g, dv.b]
      .map(c => Math.round(c*255).toString(16).padStart(2,'0')).join('').toUpperCase();
  }
}
// Затем при обходе дерева сравнивать fill.color с varDarkMap[fill.boundVariables.color.id]
```

**Правило интерпретации оверрайдов:**
- Если оверрайд повторяется на 10+ узлах с одним и тем же цветом → обновить переменную глобально
- Если оверрайд на единичных узлах (`bg/surface → #FFFFFF`, `text/primary → #2E3345`) → это намеренно светлые элементы внутри тёмного UI, **не трогать**, оставить как оверрайды на слоях

---

## Важные ограничения

| Проблема | Решение |
|---|---|
| `getLocalVariableCollections` падает с ошибкой dynamic-page | Использовать `...Async` версии всех методов |
| `getVariableById` не работает | Использовать `getVariableByIdAsync` |
| Уже привязанные переменные перезаписываются | Проверять `!fill.boundVariables?.color` перед привязкой |
| instance sublayer недоступен для редактирования | try/catch, пропускать — наследует от мастера |
| Глубина дерева > 8 | Использовать depth > 15 для страниц с макетами |
| Timeout при большом дереве | Увеличить timeout до 30000ms |

---

## Структура коллекции Colors (актуальная)

**Файл:** `5YV3wQjobtEYjH3blUEmOr`
**Коллекция:** `VariableCollectionId:3232:4116`
**Моды:** `Light` (3232:2) / `Dark` (3232:3)

| Переменная | Light | Dark | VariableID |
|---|---|---|---|
| text/primary | #2E3345 | #F6F8FF | VariableID:3232:4117 |
| text/secondary | #616F9E | #616F9E | VariableID:3232:4118 |
| text/disabled | #D5D6DA | #727DA6 | VariableID:3232:4119 |
| text/disabledSecondary | #DFE2EC | #727DA6 | VariableID:3232:4120 |
| text/onPrimary | #FFFFFF | #FFFFFF | VariableID:3232:4121 |
| bg/surface | #FFFFFF | #2D3243 | VariableID:3232:4122 |
| bg/page | #EFF1F8 | #1E212B | VariableID:3232:4123 |
| bg/input | #F4F6FA | #242836 | VariableID:3232:4124 |
| bg/elevated | #F8FAFC | #2D3243 | VariableID:3232:4125 |
| stroke/subtle | #E9EDF4 | #3B4259 | VariableID:3232:4126 |
| stroke/default | #D4D7DB | #434B6A | VariableID:3232:4127 |
| primary/default | #4C87EC | #6788EC | VariableID:3232:4128 |
| primary/hover | #2765CF | #4B6CCD | VariableID:3232:4129 |
| primary/muted | #DBE7FB | #2C3560 | VariableID:3232:4130 |
| primary/mutedStrong | #94B7F4 | #4B6CCD | VariableID:3232:4131 |
| status/error | #EB5757 | #EB5757 | VariableID:3232:4132 |
| status/errorHover | #C74952 | #C74952 | VariableID:3232:4133 |
| status/errorBg | #FDEFEF | #472B33 | VariableID:3232:4134 |
| status/errorBgStrong | #FBDDDD | #472B33 | VariableID:3232:4135 |
| status/success | #27AE60 | #27AE60 | VariableID:3232:4136 |
| status/successBg | #EAF7F0 | #153325 | VariableID:3232:4137 |
| status/warning | #FFB22B | #FFB22B | VariableID:3232:4138 |
| status/warningBg | #FFF8EA | #3A2C14 | VariableID:3232:4139 |
| accent/blueBg | #EEF3FE | #2C3560 | VariableID:3232:4140 |
| neutral/muted | #909ABB | #8E97B8 | VariableID:3232:4141 |
| button/darkHover | #1E212B | #1E212B | VariableID:3232:4142 |

---

## Как использовать в новом чате

Когда получаю задачу "перекрасить компонент / привязать переменные":

1. Проверить что Desktop Bridge подключён (`figma_get_selection`)
2. Считать выделенный фрейм / компонент-сет
3. Если в файле уже есть эталонные правки — считать маппинг с них (`collectMappings`)
4. Если эталона нет — построить маппинг из коллекции `Colors` (мод Light)
5. Предзагрузить переменные асинхронно
6. Запустить `walkNode` с depth 15 на целевом узле, все ошибки в try/catch
7. Повторно сканировать — найти оставшиеся непривязанные (аудит)
8. Проверить оверрайды на слоях — выучить паттерны, обновить переменные если нужно
9. Проверить скриншотом — визуал должен остаться 1:1
10. Отчитаться: сколько свойств привязано, какие оверрайды оставлены намеренно
