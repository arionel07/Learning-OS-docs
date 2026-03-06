---
title: Architecture
description: A high-level overview of how Learnin OS is structured.
order: 1
tags: [architecture, core, system]
---

## Overview

Learnin OS is built on three core layers:

- **Core** — The runtime engine that loads and manages modules
- **Content** — Markdown and MDX files that make up the documentation
- **UI** — The Next.js frontend that renders everything

## Core layer

The core is responsible for:

- Discovering and loading modules
- Resolving wiki-links between pages
- Building the navigation tree
- Generating search indexes

```typescript
import { createOS } from '@learningos/core'

const os = createOS({
  contentDir: './src/content',
  modules: ['javascript', 'typescript'],
})
```

## Content layer

All content lives in `src/content/docs/` organized by language:

```
src/content/docs/
  en/
    index.md
    getting-started/
      installation.md
  ru/
    index.md
```

Each file supports frontmatter for metadata:

```yaml
---
title: My Page
description: A short description
order: 1
tags: [example, guide]
---
```

## UI layer

The UI is a Next.js application with:

- File-based routing via `app/docs/[lang]/[[...slug]]`
- Server-side data fetching
- Client-side interactivity (search, theme, sidebar)
- MDX rendering with custom components

## Data flow

```
File system → docs.lib.ts → page.tsx → DocPage.tsx → Browser
```

1. `docs.lib.ts` reads `.md` and `.mdx` files
2. `page.tsx` fetches the right document server-side
3. `DocPage.tsx` renders the content client-side
4. Browser displays the final HTML
