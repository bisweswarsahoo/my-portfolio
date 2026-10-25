# Centralized Theme Management System

A robust, centralized theme engine built for the portfolio using React Context, CSS Custom Properties (Variables), and safe client-side persistence.

---

## 📁 Directory Structure

```text
src/theme/
├── theme.js           # Core theme definitions, color tokens, and DOM application logic
├── ThemeProvider.jsx  # React Context Provider, `useTheme` hook, and `withTheme` HOC
├── ThemeToggle.jsx    # Accessible theme switcher button component
└── README.md          # System documentation (this file)
```

---

## ⚡ Key Highlights

1. **Dual Theme Support**: Pre-configured **Dark** (default) and **Light** themes with high contrast ratios, refined dark palettes, and glassmorphic variables.
2. **Zero-Flicker Initialization**: Initialized immediately in `main.jsx` before React renders, preventing white flashes or theme jumps on page refresh.
3. **Automatic CSS Variable Generation**: JavaScript camelCase properties are automatically converted to kebab-case CSS custom properties (e.g. `backgroundGlass` -> `--background-glass`).
4. **Semantic CSS Aliases**: Injects unified system-wide variables like `--color-primary`, `--color-surface-glass`, and `--color-text` for easy cross-component styling.
5. **Data Attributes on DOM**: Sets `data-theme="dark|light"` on both `<html>` (`document.documentElement`) and `document.body` for scoped CSS selectors.
6. **Hardened Storage Integration**: Reads and writes through `../utils/security.js` (`safeStorageGet` / `safeStorageSet`) to prevent crashes in private browsing or iframe environments where `localStorage` is blocked.

---

## 🎨 Theme Tokens Overview

Themes are configured in `src/theme/theme.js` using two layers:

### 1. Common Properties (`commonThemeProperties`)
Shared universally across all themes:
- **Brand & Social Accents**: `instagram`, `twitter`, `discord`, `linkedin`, `accent`, `primary`
- **Window Control Dots**: `macRed`, `macYellow`, `macGreen`
- **Backdrop Blurs**: `backdropFilter: "blur(8px)"`, `backdropFilterStrong: "blur(10px)"`

### 2. Theme Variants (`themeVariants`)
Specific to `dark` and `light` modes:
- **Text**: `textPrimary`, `textSecondary`, `textTertiary`, `textMuted`, `github`
- **Backgrounds**: `backgroundPrimary`, `backgroundSecondary`, `backgroundGlass`, `backgroundGlassHover`, `backgroundSurface`, `backgroundCard`, `backgroundCodeEditor`
- **Borders**: `borderPrimary`, `borderSecondary`, `borderCode`, `borderLight`
- **Buttons**: `buttonPrimary`, `buttonPrimaryText`, `buttonPrimaryHover`, `buttonPrimaryHoverText`
- **Shadows**: `shadowLight`, `shadowMedium`, `shadowHeavy`, `shadowCard`, `shadowCardHover`, `shadowSmall`, `shadowNavbar`, `shadowButton`, `shadowIndicator`, `shadowIndicatorActive`
- **Interactive UI**: `scrollbarThumb`, `skillGroupOutline`, `skillGroupOutlineHover`, `languageIndicator`, `languageIndicatorHover`, `navStroke`, `navIconFill`

---

## 🚀 Usage Guide

### 1. Accessing Theme State via `useTheme` Hook

```jsx
import React from "react";
import { useTheme } from "../theme/ThemeProvider";

const ProfileHeader = () => {
  const { currentTheme, toggleTheme, themeColors } = useTheme();

  return (
    <div>
      <p style={{ color: themeColors.textPrimary }}>
        Current Theme: <strong>{currentTheme}</strong>
      </p>
      <button onClick={toggleTheme}>
        Switch to {currentTheme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default ProfileHeader;
```

### 2. Full `useTheme()` API Reference

| Property | Type | Description |
| :--- | :--- | :--- |
| `currentTheme` | `string` | The active theme name (`"dark"` or `"light"`). |
| `themes` | `string[]` | Array of all available theme keys (`["dark", "light"]`). |
| `toggleTheme` | `() => void` | Toggles between `"dark"` and `"light"`. |
| `switchTheme` | `(name: string) => void` | Switches explicitly to a named theme (e.g., `switchTheme("light")`). |
| `getThemeValue` | `(key: string) => any` | Retrieves a specific token value for the active theme with fallback. |
| `themeColors` | `object` | The active theme's raw key-value mapping object. |

### 3. Using the Higher-Order Component (`withTheme`)

For class components or non-hook wrappers:

```jsx
import React from "react";
import { withTheme } from "../theme/ThemeProvider";

class LegacyCard extends React.Component {
  render() {
    const { currentTheme, toggleTheme } = this.props.theme;
    return (
      <div className={`card card-${currentTheme}`}>
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    );
  }
}

export default withTheme(LegacyCard);
```

### 4. Drop-in Toggle Component (`ThemeToggle.jsx`)

Include the `<ThemeToggle />` button in any component (such as [`Navbar.jsx`](../components/Navbar.jsx)):

```jsx
import ThemeToggle from "../theme/ThemeToggle";

function HeaderActions() {
  return (
    <div className="header-actions">
      <ThemeToggle className="custom-toggle" />
    </div>
  );
}
```

---

## 💅 Using Theme Variables in CSS

Every key in `theme.js` is exposed as a CSS Custom Property. 

### Automatically Converted Variables:
```css
.card {
  /* CamelCase mapped to kebab-case */
  background: var(--background-card);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-card-hover);
  background: var(--background-glass-hover);
}
```

### Semantic Shortcuts:
```css
.link {
  color: var(--color-link);
}

.glass-panel {
  background: var(--color-surface-glass);
  border: 1px solid var(--color-border);
  box-shadow: var(--color-shadow);
  backdrop-filter: var(--backdrop-filter);
}
```

### Scoping with `data-theme`:
```css
/* Custom overrides per theme */
[data-theme="dark"] .special-banner {
  filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.4));
}

[data-theme="light"] .special-banner {
  filter: drop-shadow(0 0 12px rgba(37, 99, 235, 0.2));
}
```

---

## 🛠 Adding New Theme Tokens

To add a new color or style variable:

1. Open [`src/theme/theme.js`](theme.js).
2. Add the variable to both `dark` and `light` objects in `themeVariants`:
   ```javascript
   const themeVariants = {
     dark: {
       badgeBackground: "rgba(99, 102, 241, 0.2)",
       // ... existing variables
     },
     light: {
       badgeBackground: "rgba(37, 99, 235, 0.15)",
       // ... existing variables
     },
   };
   ```
3. Use it in any stylesheet:
   ```css
   .badge {
     background-color: var(--badge-background);
   }
   ```

---

## 🔍 Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **Theme variables not showing on page load** | Ensure `initializeTheme()` is called in `main.jsx` before `createRoot()`. |
| **CSS variable reads as empty or undefined** | Ensure you are using the kebab-case formatted name (e.g., `textPrimary` becomes `--text-primary`). |
| **Theme does not persist after refresh** | Check if private browsing blocks `localStorage`. The application uses `safeStorageSet` to gracefully fallback when storage is inaccessible. |
| **Component doesn't update on theme switch** | Verify that `ThemeProvider` wraps your application in `App.jsx`. |
