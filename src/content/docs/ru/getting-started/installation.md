---
title: Установка
description: Как установить Learnin OS на ваш компьютер.
order: 1
tags: [установка, настройка, node]
---

## Требования

Перед началом убедитесь, что у вас установлено следующее:

- **Node.js** v18 или выше
- **Git** v2.30 или выше
- Терминал (bash, zsh или PowerShell)

## Установка через CLI

Самый быстрый способ начать — использовать Learnin OS CLI:

```bash
npm install -g @learningos/cli
```

Проверьте установку:

```bash
learningos --version
```

## Создание нового проекта

```bash
learningos create my-project
cd my-project
```

## Установка зависимостей

```bash
npm install
```

## Запуск сервера разработки

```bash
npm run dev
```

Проект будет доступен по адресу `http://localhost:3000`.

## Ручная установка

Если вы предпочитаете настроить всё вручную, клонируйте репозиторий напрямую:

```bash
git clone https://github.com/learningos/learningos.git
cd learningos
npm install
npm run dev
```

## Устранение неполадок

### Порт уже используется

Если порт `3000` занят, укажите другой:

```bash
npm run dev -- --port 3001
```

### Ошибки прав доступа на macOS/Linux

```bash
sudo npm install -g @learningos/cli
```
