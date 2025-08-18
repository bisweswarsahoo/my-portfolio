# My Portfolio

A modern, fast, and responsive personal portfolio built with **React 19 + Vite** showcasing education, skills, projects, and contact information. Emphasis on clean UI, accessibility, and subtle motion/visual polish (glassmorphism cards, animated navigation, draggable project track).

## ✨ Key Features

- **Responsive Navigation Bar** – Adaptive layout (full labels → icons → collapsible menu) with accessible hamburger toggle.
- **Glassmorphism Cards & Social Panel** – Reusable styling for consistent visual identity.
- **Education Timeline** – Uses `react-vertical-timeline-component` to present academic history clearly.
- **Projects Carousel Track** – Horizontal scrollable area prepared for showcasing multiple projects.
- **Skills & About Sections** – Structured, semantic, and easy to extend.
- **Iconography** – `react-icons` for lightweight, consistent icons.
- **Zero Scrollbar Clutter** – Hidden scrollbars for cleaner presentation (with native scrolling preserved).

## 🧱 Tech Stack

| Layer                | Tools                                             |
| -------------------- | ------------------------------------------------- |
| Framework            | React 19 (Vite)                                   |
| UI / Components      | Ant Design (select components), custom CSS styles |
| Icons                | react-icons (FontAwesome set)                     |
| Animations (planned) | framer-motion (installed)                         |
| Timeline             | react-vertical-timeline-component                 |

## 📂 Project Structure (excerpt)

```
src/
  components/        # React components (NavigationBar, About, Education, etc.)
  styles/            # Modular CSS for sections & components
  assets/            # Images / logos
  App.jsx            # App composition
  main.jsx           # Entry point (Vite)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm (bundled) or pnpm/yarn (optional)

### Install Dependencies

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

Open the printed local URL.

## 📄 License

Personal portfolio source—feel free to reference structure & styling patterns. If you fork, please credit.

---

Made with React, care, and iterative polish.
