# Привязка Variables к макетам в Figma

Используется когда нужно подключить токены из коллекции `Colors` к компонентам дизайн-системы.

> Dark mode — в разработке. Документ актуален для привязки переменных с поддержкой Light/Dark.

Список всех токенов и их VariableID — в `docs/COLOR_TOKENS.md`.

---

## Алгоритм

### 1. Убедиться что Desktop Bridge подключён
Figma Desktop → Plugins → Development → Desktop Bridge (WebSocket активен).

### 2. Считать коллекции переменных
```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
// Найти коллекцию 'Colors' — содержит моды Light (3232:2) и Dark (3232:3)
```

### 3. Собрать маппинг rgb → variableId
```js
const vars = await figma.variables.getLocalVariablesAsync('COLOR');
const colorMap = {};
for (const v of vars) {
  const light = v.valuesByMode['3232:2'];
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
⚠️ Только `getVariableByIdAsync` — синхронная версия не работает в dynamic-page контексте.

### 5. Рекурсивно обойти дерево и привязать переменные
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
  if (depth > 15) return;
  bindPaints(node);
  if ('children' in node) {
    for (const child of node.children) {
      await walkNode(child, depth + 1);
    }
  }
}
```

### 6. Запустить на целевом фрейме
```js
const target = await figma.getNodeByIdAsync(TARGET_NODE_ID);
await walkNode(target);
```

### 7. Проверить результат
После выполнения — скриншот через `figma_get_screenshot`, убедиться что визуал 1:1.

---

## Если в файле уже есть правильно привязанные узлы

Не строить маппинг из коллекции — **учиться у существующих правок**:

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

## Ограничения

| Проблема | Решение |
|---|---|
| `getLocalVariableCollections` падает | Использовать `...Async` версии всех методов |
| Уже привязанные переменные перезаписываются | Проверять `!fill.boundVariables?.color` перед привязкой |
| instance sublayer недоступен | try/catch, пропускать — наследует от мастера |
| Timeout при большом дереве | Увеличить timeout до 30000ms |

---

## Оверрайды на слоях

После привязки — искать узлы где цвет слоя не совпадает с Dark-значением переменной.

**Правило интерпретации:**
- Оверрайд на 10+ узлах с одним цветом → обновить переменную глобально
- Оверрайд на единичных узлах (светлые элементы внутри тёмного UI) → намеренно, **не трогать**

---

## Алгоритм работы с новой задачей

1. Проверить Desktop Bridge (`figma_get_selection`)
2. Считать выделенный фрейм / компонент-сет
3. Если есть эталонные правки — считать маппинг с них (`collectMappings`)
4. Если эталона нет — построить маппинг из коллекции `Colors` (мод Light)
5. Предзагрузить переменные асинхронно
6. Запустить `walkNode` с depth 15, все ошибки в try/catch
7. Аудит — найти оставшиеся непривязанные
8. Проверить оверрайды
9. Скриншот — визуал должен остаться 1:1
10. Отчитаться: сколько свойств привязано, какие оверрайды оставлены намеренно
