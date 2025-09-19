# My Portfolio

A modern, fast, and responsive personal portfolio built with **React 19 + Vite** showcasing experience, education, skills, and selected projects. Focus areas: performance, clean UI, semantic structure, and progressive enhancement.

## ✨ Features

- **Responsive Navigation Bar** – Scales from full layout to compact / mobile with accessible keyboard + aria support.
- **Experience Section** – Structured role breakdown highlighting impact and tech usage.
- **Education Timeline** – Powered by `react-vertical-timeline-component` for chronological clarity.
- **Projects Carousel Track** – Horizontal scroll pattern optimized for touch + wheel input (no visible scrollbars).
- **Skills Grid** – Categorized technology groups with iconography via `react-icons`.
- **Global Copy Prevention** – User-select disabled & copy/context events blocked (can be toggled off; see below).

## 🧱 Tech Stack

| Layer             | Tools / Libraries                                 |
| ----------------- | ------------------------------------------------- |
| Framework / Build | React 19, Vite                                    |
| UI Components     | Custom CSS, Ant Design (selective usage)          |
| Icons             | react-icons                                       |
| Motion (planned)  | framer-motion (installed, not fully utilized yet) |
| Timeline          | react-vertical-timeline-component                 |

## 📂 Structure

```
src/
  assets/              # Images / logos
  components/          # Reusable React components
  styles/              # Component CSS modules
  App.jsx              # Top-level composition
  main.jsx             # Entry + global guards (copy prevention)
```

## 🛠 Scripts

| Command           | Purpose                  |
| ----------------- | ------------------------ |
| `npm run dev`     | Start local dev server   |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm (bundled) or pnpm/yarn

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

Open the printed local URL.

### Production Build

```bash
npm run build
npm run preview
```

## 🚀 Deployment

This portfolio is configured for automatic deployment to GitHub Pages:

- **Live URL**: https://bisweswarsahoo.github.io/my-portfolio/
- **Auto-deploy**: Pushes to `main` branch trigger deployment via GitHub Actions
- **Manual deploy**: Run `npm run deploy` for manual deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🗺 Roadmap

- Integrate framer-motion for entrance & scroll animations
- Add contact form with validation & email integration
- Automated accessibility tests (axe / jest-axe)
- Dark theme toggle & persisted user preference
- Lighthouse performance + PWA enhancements

## 📄 License

Personal portfolio source — feel free to reference structure & styling patterns. If you fork, please credit.

---

Built with React, intention, and iterative polish.
