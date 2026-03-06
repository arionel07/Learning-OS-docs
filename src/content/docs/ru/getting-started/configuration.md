---
title: Настройка
description: Как настроить Learnin OS для вашего проекта.
order: 2
tags: [настройка, конфигурация, окружение]
---

## Файл конфигурации

После установки в корне проекта создаётся файл `learningos.config.ts`:

```typescript
import { defineConfig } from '@learningos/core'

export default defineConfig({
  lang: 'ru',
  title: 'Мой Learning OS',
  description: 'Моя личная обучающая платформа',
  modules: [],
})
```

## Доступные параметры

### `lang`

Язык по умолчанию для вашего проекта. Поддерживаемые значения: `en`, `ru`.

```typescript
lang: 'ru'
```

### `title`

Название вашего проекта, отображаемое в заголовке и метаданных.

```typescript
title: 'Мой Learning OS'
```

### `description`

Краткое описание для SEO мета-тегов.

```typescript
description: 'Моя личная обучающая платформа'
```

### `modules`

Массив обучающих модулей для подключения:

```typescript
modules: ['javascript-basics', 'typescript', 'react']
```

## Переменные окружения

Создайте файл `.env.local` в корне проекта:

```bash
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_LANG=ru
```

## Расширение конфигурации

Вы можете переопределить цвета темы и шрифты:

```typescript
export default defineConfig({
  lang: 'ru',
  title: 'Мой Learning OS',
  theme: {
    accentColor: '#8b5cf6',
    fontMono: 'JetBrains Mono',
  },
})
```
