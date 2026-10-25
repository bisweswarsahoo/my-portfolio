# Bisweswar Sahoo – Developer Portfolio

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Router](https://img.shields.io/badge/React_Router-v7-ca4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Deployment](https://img.shields.io/badge/Deploy-GitHub_Pages-222?logo=github-pages&logoColor=white)](https://bisweswarsahoo.github.io/my-portfolio)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, fast, and responsive personal portfolio built with **React 19**, **Vite 6**, and **React Router 7**. Designed with a custom glassmorphic aesthetic, centralized theme system (Light & Dark), modular architecture, rich interactive milestone timelines, and progressive performance optimizations.

🌐 **Live Demo:** [bisweswarsahoo.github.io/my-portfolio](https://bisweswarsahoo.github.io/my-portfolio)

---

## ✨ Features

- **Responsive Navigation Bar**: Sticky, blur-backed navigation with active section detection, smooth scrolling, mobile slide drawer, and instant theme toggling.
- **Dynamic Journey & Milestones**: Chronological timeline built on `react-vertical-timeline-component` with rich milestone cards, custom campus and organization background graphics, role highlights, and category filtering.
- **Comprehensive Skills Grid**: Over 60+ categorized technologies (Languages, Frontend, Backend, Databases, DevOps & Cloud, AI / LLMs / Agentic workflows, IDEs, and Developer Tools) powered by optimized inline SVG components.
- **Interactive Project Carousel**: Touch-friendly and mouse-wheel optimized horizontal project showcase with custom application frames, technology pills, and live demo / source code links.
- **Dedicated Project Archive (`/projects`)**: HashRouter-powered dedicated archive page featuring lazy-loaded chunking (`React.lazy` + `Suspense`), full project catalog, tags, and repo/live links.
- **Interactive About Showcase**: Code-editor-styled profile section featuring terminal styling, tab controls, realistic macOS window controls, and technical summary.
- **Spoken Languages Section**: Interactive language proficiency meters and visual indicators.
- **Centralized Dual-Theme Engine**: Seamless Light and Dark mode switching powered by React Context, custom CSS variable tokens, and safe localStorage persistence with tamper prevention.
- **Resume Card & LaTeX Integration**: Interactive in-browser resume viewer with direct link to the editable LaTeX source template (`src/resume/resumeTemplate.tex`).
- **Centralized Ambient Background**: Dynamic ambient gradient glows and mesh backdrop effects that adapt to theme changes.
- **Security & Privacy Guards**: Built-in safe storage utilities, hardened HTTP security headers in Vite config, and non-intrusive global copy/context-menu guards.

---

## 🧱 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | [React 19](https://react.dev/), [Vite 6](https://vitejs.dev/) |
| **Routing** | [React Router v7](https://reactrouter.com/) (`HashRouter` for GitHub Pages compatibility) |
| **Animations & Motion** | [Framer Motion](https://www.framer.com/motion) |
| **Timeline** | [react-vertical-timeline-component](https://www.npmjs.com/package/react-vertical-timeline-component) |
| **Icons & Media** | [react-icons](https://react-icons.github.io/react-icons/) & custom curated SVG icon library |
| **Styling** | Vanilla CSS with CSS custom properties (design tokens), Glassmorphism, CSS Modules & Flexbox/Grid |
| **Deployment & Build** | [gh-pages](https://www.npmjs.com/package/gh-pages), Rollup manual chunking |
| **Performance & Testing** | `web-vitals`, `@testing-library/react` |

---

## 📂 Project Structure

```text
my-portfolio/
├── public/                     # Static public assets
├── src/
│   ├── assets/                 # Brand logos, institution backgrounds, and media
│   ├── components/             # Reusable UI components
│   │   ├── about/              # About visual terminal & code block view
│   │   ├── projects/           # Application frames, carousel tracks, tech pills
│   │   ├── tech/               # Custom SVGs for 60+ programming tools and stacks
│   │   ├── Card.jsx            # Generic wrapper card
│   │   ├── CentralizedBackground.jsx # Ambient background lighting
│   │   ├── Footer.jsx          # Comprehensive footer with social connections
│   │   ├── Languages.jsx       # Spoken/human languages proficiency indicators
│   │   ├── MilestoneCard.jsx   # Milestone item card for timeline
│   │   ├── Navbar.jsx          # Desktop/mobile navigation with theme toggle
│   │   ├── ResumeCard.jsx      # Resume modal and download card
│   │   └── SocialInfo.jsx      # Social profiles and interactive links
│   ├── data/
│   │   └── portfolioData.js    # Single source of truth for portfolio content
│   ├── resume/
│   │   ├── resumeTemplate.js   # Resume metadata definition
│   │   └── resumeTemplate.tex  # LaTeX resume source template
│   ├── sections/               # Primary layout sections
│   │   ├── About.jsx           # About Me section
│   │   ├── Journey.jsx         # Career, education & milestone timeline
│   │   ├── ProjectArchive.jsx  # Dedicated full project catalog route (/projects)
│   │   ├── Projects.jsx        # Selected projects carousel
│   │   └── Skills.jsx          # Categorized skills matrix
│   ├── styles/                 # Dedicated CSS stylesheets per component & section
│   ├── theme/                  # Centralized Theme Management System
│   │   ├── README.md           # Theme documentation & usage guidelines
│   │   ├── theme.js            # Color definitions, CSS variable generator & defaults
│   │   ├── ThemeProvider.jsx   # React Context provider, useTheme hook, withTheme HOC
│   │   └── ThemeToggle.jsx     # Theme switch button component
│   ├── utils/
│   │   └── security.js         # Safe localStorage read/write with error boundary
│   ├── App.css                 # Application-wide layout styles
│   ├── App.jsx                 # Top-level composition, route setup, lazy fallbacks
│   ├── index.css               # Global base styles, CSS reset, and typography
│   └── main.jsx                # Application entry point, theme init, global guards
├── package.json
├── vite.config.js              # Vite build setup, manual chunks & security headers
└── README.md                   # Project documentation
```

---

## 🛠 Available Scripts

In the project root, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local Vite development server with HMR. |
| `npm run build` | Compiles and optimizes assets into the `dist/` directory with Rollup chunk splitting. |
| `npm run preview` | Runs a local web server to preview the production build. |
| `npm run predeploy` | Automatically runs `npm run build` before publishing. |
| `npm run deploy` | Deploys the built `dist/` directory to GitHub Pages via `gh-pages`. |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or later (LTS recommended)
- **npm** 9.0+ or **pnpm** / **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/bisweswarsahoo/my-portfolio.git
cd my-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Navigate to `http://localhost:5173/my-portfolio/` in your browser.

### 4. Build for production

```bash
npm run build
```

The compiled output will be generated inside the `dist/` folder.

---

## 🚢 Deployment (GitHub Pages)

The repository is configured to deploy to GitHub Pages under the `gh-pages` branch.

1. Ensure `homepage` in `package.json` matches your GitHub URL:
   ```json
   "homepage": "https://<your-username>.github.io/<repo-name>"
   ```
2. Verify `base` in `vite.config.js`:
   ```javascript
   base: "/my-portfolio/",
   ```
3. Run the deployment command:
   ```bash
   npm run deploy
   ```

---

## 🎨 Theme Customization

The project features a modular theme engine that converts JavaScript definitions into CSS Custom Properties (`--variable-name`).

- Core theme variables are located in [`src/theme/theme.js`](src/theme/theme.js).
- For complete usage instructions, hooks, and adding new color palettes, refer to the [Theme Documentation](src/theme/README.md).

---

## 📝 Updating Portfolio Content

All personal details, experiences, education milestones, skills, and projects are centralized in [`src/data/portfolioData.js`](src/data/portfolioData.js):

- **Personal Information**: Update `name`, `title`, `role`, `email`, `phone`, `about`, and `socials`.
- **Milestones & Journey**: Modify or append to `journey` objects with dates, organization, description, tags, and logo paths.
- **Skills**: Add or organize skills under category groupings using the `skill(name, icon, color, desc)` helper.
- **Projects**: Edit the `projects` array with title, description, tech stack tags, demo URLs, and GitHub links.

---

## 🗺 Roadmap

- [x] Dark / Light theme toggle with persistence and system-wide CSS variable mapping
- [x] Dedicated `/projects` archive route with code splitting and lazy loading
- [x] Interactive milestone cards with custom background graphics
- [x] Custom SVG iconography for modern AI & developer tooling
- [ ] Add direct contact form with validation and email service integration (e.g. EmailJS / Resend)
- [ ] Automated accessibility and audit testing (`axe-core`, Lighthouse CI)
- [ ] Progressive Web App (PWA) offline support

---

## 📄 License

This project is open-source. Feel free to use the layout and structure as a template for your personal portfolio. Attribution is appreciated!

---

Crafted with React 19, Vite, and passion by [Bisweswar Sahoo](https://github.com/bisweswarsahoo).
