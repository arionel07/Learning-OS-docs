---
title: Configuration
description: Learn how to configure Learnin OS for your project.
order: 2
tags: [config, setup, environment]
---

## Configuration file

After installation, a `learningos.config.ts` file is created at the root of your project:

```typescript
import { defineConfig } from '@learningos/core'

export default defineConfig({
  lang: 'en',
  title: 'My Learning OS',
  description: 'My personal learning platform',
  modules: [],
})
```

## Available options

### `lang`

The default language for your project. Supported values: `en`, `ru`.

```typescript
lang: 'en'
```

### `title`

The name of your project shown in the header and metadata.

```typescript
title: 'My Learning OS'
```

### `description`

A short description used in SEO meta tags.

```typescript
description: 'My personal learning platform'
```

### `modules`

An array of learning modules to include. Each module is a string identifier:

```typescript
modules: ['javascript-basics', 'typescript', 'react']
```

## Environment variables

Create a `.env.local` file in the root of your project:

```bash
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_LANG=en
```

## Extending the config

You can override default theme colors and fonts:

```typescript
export default defineConfig({
  lang: 'en',
  title: 'My Learning OS',
  theme: {
    accentColor: '#8b5cf6',
    fontMono: 'JetBrains Mono',
  },
})
```
