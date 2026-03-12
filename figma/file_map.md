# Figma File Map

## Файлы

| Файл | File Key |
|------|----------|
| Planetа Design System | `5YV3wQjobtEYjH3blUEmOr` |
| Planetа Mobile App | `ObxjfzMRKkNsshVJROr2RZ` |

## MCP-серверы

- **figma-console** — для программных правок в Figma
- **Figma** (официальный) — для чтения через URL

## Ключевые страницы / ноды

| Нода | ID | Описание |
|------|----|----------|
| Changelog (страница) | `304:1202` | Лог изменений дизайн-системы |
| Changelog (контейнер записей) | `304:1445` | Frame внутри `304:1209` |
| Родительский фрейм Changelog | `304:1205` | `clipsContent=true` — следить за высотой |

## Variables

| Коллекция | ID | Modes |
|-----------|-----|-------|
| Colors | `VariableCollectionId:3232:4116` | Light (3232:2), Dark (3232:3) |

> Полная таблица токенов с VariableID — в `docs/COLOR_TOKENS.md`

## Маппинг Style → Variable

> Полный маппинг — в `docs/COLOR_TOKENS.md`

**Primary/White** — контекст важен: фон карточки/модалки → `bg/surface`, текст на акценте → `text/onPrimary`

## Reusable Instances

| Компонент | ID | Описание |
|-----------|----|----------|
| Divider | `159:3846` | `Style=Light, Vertical=no` — горизонтальный разделитель |
