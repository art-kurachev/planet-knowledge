# Figma → Code Component Map

Связь между нодами в Figma и React-компонентами в коде.
Используется агентом для отслеживания изменений и автоматической синхронизации.

## Как работает

1. Агент проверяет изменения в Figma через `figma_get_design_changes`
2. Находит изменённые node ID в этой таблице
3. Считывает обновлённые значения из Figma через MCP
4. Обновляет соответствующий .tsx файл

## Маппинг

| Figma Node ID | Figma Name | React Component | File Path |
|---|---|---|---|
| `18321:2540` | Frame 73 (root) | `SkudReport` | `src/SkudReport.tsx` |
| `18321:2542` | Сводка | `SummaryCard` | `src/components/SummaryCard.tsx` |
| `18321:2580` | Требует внимания | `AttentionCard` | `src/components/AttentionCard.tsx` |
| `18321:2606` | Всего проходов по дням | `DailyChart` | `src/components/DailyChart.tsx` |
| `18321:2647` | Проекты | `ProjectsTable` | `src/components/ProjectsTable.tsx` |
| `18321:2863` | Таблица сотрудников | `EmployeesTable` | `src/components/EmployeesTable.tsx` |
| `18321:3022` | Табель сотрудника | `EmployeeDetail` | `src/components/EmployeeDetail.tsx` |

## Страница

- **Page**: Отчет по СКУД
- **File**: Planeta (`L83bKaobb9yHmcjDrPXT9c`)

## Команда для агента

При начале работы или по запросу «синхронизируй с фигмой»:

```
1. figma_get_design_changes — проверить что изменилось
2. Найти node ID в таблице выше
3. figma_execute — считать обновлённое дерево ноды
4. Сравнить с текущим кодом
5. Обновить .tsx файл
6. figma_capture_screenshot — визуально подтвердить
```
