---
title: Installation
description: How to install Learnin OS on your machine.
order: 1
tags: [setup, install, node]
---

## Requirements

Before you begin, make sure you have the following installed:

- **Node.js** v18 or higher
- **Git** v2.30 or higher
- A terminal (bash, zsh, or PowerShell)

## Install via CLI

The fastest way to get started is using the Learnin OS CLI:

```bash
npm install -g @learningos/cli
```

Verify the installation:

```bash
learningos --version
```

## Create a new project

```bash
learningos create my-project
cd my-project
```

## Install dependencies

```bash
npm install
```

## Start the development server

```bash
npm run dev
```

Your project will be available at `http://localhost:3000`.

## Manual installation

If you prefer to set things up manually, clone the repository directly:

```bash
git clone https://github.com/learningos/learningos.git
cd learningos
npm install
npm run dev
```

## Troubleshooting

### Port already in use

If port `3000` is taken, specify a different port:

```bash
npm run dev -- --port 3001
```

### Permission errors on macOS/Linux

```bash
sudo npm install -g @learningos/cli
```
