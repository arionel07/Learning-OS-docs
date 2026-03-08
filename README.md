# 📚 Learning OS Docs

> **[🇷🇺 Русский](#-russian) | [🇬🇧 English](#-english)**

---

## 🇷🇺 Russian

<div align="center">

# 📚 Learning OS Docs

**Документационный сайт для изучения операционных систем**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-latest-fbf0df?style=for-the-badge&logo=bun)](https://bun.sh/)

</div>

---

### 📖 О проекте

**Learning OS Docs** — это современный документационный сайт, созданный для
изучения принципов работы операционных систем. Здесь собраны структурированные
материалы по ключевым концепциям ОС: управление памятью, процессы, файловые
системы, планировщики и многое другое.

---

### 🛠️ Технологический стек

| Технология       | Описание                                        |
| ---------------- | ----------------------------------------------- |
| **Next.js**      | React-фреймворк для SSR и статической генерации |
| **TypeScript**   | Строгая типизация для надёжного кода            |
| **Tailwind CSS** | Утилитарный CSS-фреймворк для стилизации        |
| **Bun**          | Быстрый JavaScript runtime и пакетный менеджер  |
| **PostCSS**      | Обработка CSS                                   |

---

### 🚀 Быстрый старт

#### Предварительные требования

- [Bun](https://bun.sh/) (рекомендуется) или Node.js 18+

#### Установка и запуск

```bash
# 1. Клонировать репозиторий
git clone https://github.com/arionel07/Learning-OS-docs.git
cd Learning-OS-docs

# 2. Установить зависимости
bun install

# 3. Запустить в режиме разработки
bun run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

#### Сборка для продакшена

```bash
# Создать оптимизированную сборку
bun run build

# Запустить продакшен-сервер
bun run start
```

---

### 📁 Структура проекта

```
Learning-OS-docs/
├── public/          # Статические файлы (изображения, иконки)
├── src/             # Исходный код приложения
│   ├── app/         # Next.js App Router (страницы и лейауты)
│   ├── components/  # Переиспользуемые компоненты
│   └── styles/      # Глобальные стили
├── next.config.ts   # Конфигурация Next.js
├── tailwind.config.ts # Конфигурация Tailwind CSS
├── tsconfig.json    # Конфигурация TypeScript
└── package.json     # Зависимости и скрипты
```

---

### 📝 Доступные скрипты

```bash
bun run dev      # Запуск в режиме разработки
bun run build    # Сборка для продакшена
bun run start    # Запуск продакшен-сервера
bun run lint     # Проверка кода линтером
```

---

### 🤝 Участие в разработке

Вклад в проект приветствуется! Если вы хотите улучшить документацию или добавить
новые материалы:

1. Сделайте **Fork** репозитория
2. Создайте ветку: `git checkout -b feature/новая-тема`
3. Зафиксируйте изменения: `git commit -m 'Добавлена тема: ...`
4. Отправьте в ветку: `git push origin feature/новая-тема`
5. Откройте **Pull Request**

---

### 📄 Лицензия

Этот проект распространяется под лицензией MIT. Подробнее см. файл
[LICENSE](LICENSE).

---

## 🇬🇧 English

<div align="center">

# 📚 Learning OS Docs

**A documentation site for learning Operating Systems**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-latest-fbf0df?style=for-the-badge&logo=bun)](https://bun.sh/)

</div>

---

### 📖 About

**Learning OS Docs** is a modern documentation website built to help developers
and students learn the core concepts of Operating Systems. It covers key topics
such as memory management, processes, file systems, schedulers, and much more —
all presented in a clean, easy-to-navigate format.

---

### 🛠️ Tech Stack

| Technology       | Description                                   |
| ---------------- | --------------------------------------------- |
| **Next.js**      | React framework for SSR and static generation |
| **TypeScript**   | Static typing for reliable, maintainable code |
| **Tailwind CSS** | Utility-first CSS framework for styling       |
| **Bun**          | Fast JavaScript runtime and package manager   |
| **PostCSS**      | CSS transformation pipeline                   |

---

### 🚀 Getting Started

#### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

#### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/arionel07/Learning-OS-docs.git
cd Learning-OS-docs

# 2. Install dependencies
bun install

# 3. Run the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build

```bash
# Create an optimized production build
bun run build

# Start the production server
bun run start
```

---

### 📁 Project Structure

```
Learning-OS-docs/
├── public/          # Static assets (images, icons)
├── src/             # Application source code
│   ├── app/         # Next.js App Router (pages & layouts)
│   ├── components/  # Reusable UI components
│   └── styles/      # Global styles
├── next.config.ts   # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json    # TypeScript configuration
└── package.json     # Dependencies and scripts
```

---

### 📝 Available Scripts

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run start    # Start production server
bun run lint     # Run ESLint
```

---

### 🤝 Contributing

Contributions are welcome! If you'd like to improve the documentation or add new
content:

1. **Fork** the repository
2. Create your branch: `git checkout -b feature/new-topic`
3. Commit your changes: `git commit -m 'Add topic: ...'`
4. Push to the branch: `git push origin feature/new-topic`
5. Open a **Pull Request**

---

### 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.

---

<div align="center">

Made with ❤️ by [arionel07](https://github.com/arionel07)

</div>
