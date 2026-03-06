---
title: Modules
description: How the Learnin OS module system works.
order: 2
tags: [modules, plugins, extensions]
---

## What is a module?

A module is a self-contained learning unit. Each module has:

- A unique identifier
- A collection of pages
- Optional exercises and quizzes
- Dependencies on other modules

## Module structure

```
my-module/
  module.config.ts    ← metadata and dependencies
  index.md            ← entry page
  lesson-1.md
  lesson-2.md
  exercises/
    exercise-1.md
```

## Creating a module

Create a `module.config.ts`:

```typescript
import { defineModule } from '@learningos/core'

export default defineModule({
  id: 'my-module',
  title: 'My Module',
  description: 'A custom learning module',
  version: '1.0.0',
  dependencies: [],
})
```

## Using a module

Register it in `learningos.config.ts`:

```typescript
export default defineConfig({
  modules: ['my-module'],
})
```

## Built-in modules

Learnin OS ships with several built-in modules:

| Module | Description |
|---|---|
| `javascript-basics` | Variables, functions, loops |
| `typescript` | Types, interfaces, generics |
| `react` | Components, hooks, state |
| `nextjs` | Routing, SSR, API routes |

## Module dependencies

Modules can depend on other modules:

```typescript
export default defineModule({
  id: 'react',
  dependencies: ['javascript-basics', 'typescript'],
})
```

Learnin OS will automatically ensure dependencies are loaded first.
