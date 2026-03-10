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
  if (depth > 8) return;
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
// Сканируем эталонный узел, собираем rgb -> varId из уже привязанных fills/strokes
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

Затем применить этот маппинг на целевые фреймы (п. 4–7 выше).

---

## Важные ограничения

| Проблема | Решение |
|---|---|
| `getLocalVariableCollections` падает с ошибкой dynamic-page | Использовать `...Async` версии всех методов |
| `getVariableById` не работает | Использовать `getVariableByIdAsync` |
| Уже привязанные переменные перезаписываются | Проверять `!fill.boundVariables?.color` перед привязкой |
| Глубина дерева > 8 | Увеличить лимит depth если структура глубже |
| Timeout при большом дереве | Увеличить timeout до 30000ms |

---

## Структура коллекции Colors (актуальная)

**Файл:** `5YV3wQjobtEYjH3blUEmOr`  
**Коллекция:** `VariableCollectionId:3232:4116`  
**Моды:** `Light` (3232:2) / `Dark` (3232:3)

| Переменная | Light (RGB) | VariableID |
|---|---|---|
| text/primary | 46,51,69 | VariableID:3232:4117 |
| text/secondary | 97,111,158 | VariableID:3232:4118 |
| text/disabled | 213,214,218 | VariableID:3232:4119 |
| text/disabledSecondary | 223,226,236 | VariableID:3232:4120 |
| text/onPrimary | 255,255,255 | VariableID:3232:4121 |
| bg/surface | 255,255,255 | VariableID:3232:4122 |
| bg/page | 239,241,248 | VariableID:3232:4123 |
| bg/input | 244,246,250 | VariableID:3232:4124 |
| bg/elevated | 248,250,252 | VariableID:3232:4125 |
| stroke/subtle | 233,237,244 | VariableID:3232:4126 |
| stroke/default | 212,215,219 | VariableID:3232:4127 |
| primary/default | 76,135,236 | VariableID:3232:4128 |
| primary/hover | 39,101,207 | VariableID:3232:4129 |
| primary/muted | 219,231,251 | VariableID:3232:4130 |
| primary/mutedStrong | 148,183,244 | VariableID:3232:4131 |
| status/error | 235,87,87 | VariableID:3232:4132 |
| status/errorHover | 199,73,82 | VariableID:3232:4133 |
| status/errorBg | 253,239,239 | VariableID:3232:4134 |
| status/errorBgStrong | 251,221,221 | VariableID:3232:4135 |
| status/success | 39,174,96 | VariableID:3232:4136 |
| status/successBg | 234,247,240 | VariableID:3232:4137 |
| status/warning | 255,178,43 | VariableID:3232:4138 |
| status/warningBg | 255,248,234 | VariableID:3232:4139 |
| accent/blueBg | 238,243,254 | VariableID:3232:4140 |
| neutral/muted | 144,154,187 | VariableID:3232:4141 |
| button/darkHover | 30,33,43 | VariableID:3232:4142 |

---

## Как использовать в новом чате

Когда получаю задачу "перекрасить компонент / привязать переменные":

1. Проверить что Desktop Bridge подключён (`figma_get_selection`)
2. Считать выделенный фрейм / компонент-сет
3. Если в файле уже есть эталонные правки — считать маппинг с них (`collectMappings`)
4. Если эталона нет — построить маппинг из коллекции `Colors` (мод Light)
5. Предзагрузить переменные асинхронно
6. Запустить `walkNode` на целевом узле
7. Проверить скриншотом — визуал должен остаться 1:1
8. Отчитаться: сколько вариантов обработано, сколько свойств привязано
