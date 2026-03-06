---
title: Модули
description: Как работает система модулей Learnin OS.
order: 2
tags: [модули, плагины, расширения]
---

## Что такое модуль?

Модуль — это самодостаточная обучающая единица. Каждый модуль содержит:

- Уникальный идентификатор
- Коллекцию страниц
- Опциональные упражнения и тесты
- Зависимости от других модулей

## Структура модуля

```
my-module/
  module.config.ts    ← метаданные и зависимости
  index.md            ← входная страница
  lesson-1.md
  lesson-2.md
  exercises/
    exercise-1.md
```

## Создание модуля

Создайте `module.config.ts`:

```typescript
import { defineModule } from '@learningos/core'

export default defineModule({
  id: 'my-module',
  title: 'Мой модуль',
  description: 'Пользовательский обучающий модуль',
  version: '1.0.0',
  dependencies: [],
})
```

## Подключение модуля

Зарегистрируйте его в `learningos.config.ts`:

```typescript
export default defineConfig({
  modules: ['my-module'],
})
```

## Встроенные модули

Learnin OS поставляется с несколькими встроенными модулями:

| Модуль | Описание |
|---|---|
| `javascript-basics` | Переменные, функции, циклы |
| `typescript` | Типы, интерфейсы, дженерики |
| `react` | Компоненты, хуки, состояние |
| `nextjs` | Маршрутизация, SSR, API роуты |

## Зависимости модулей

Модули могут зависеть от других модулей:

```typescript
export default defineModule({
  id: 'react',
  dependencies: ['javascript-basics', 'typescript'],
})
```

Learnin OS автоматически обеспечит загрузку зависимостей в первую очередь.
