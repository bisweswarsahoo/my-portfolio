# Theme Management System Documentation

## Overview

This portfolio project now includes a comprehensive theme management system that centralizes all color and style variables. The system supports both dark and light themes and provides easy switching between them.

## File Structure

```
src/
├── theme/
│   ├── theme.js           # Core theme definitions and utilities
│   ├── ThemeProvider.jsx  # React context provider for theme state
│   └── ThemeToggle.jsx    # Theme toggle button component
```

## Features

### 1. Centralized Theme Variables

All colors and style properties are defined in `src/theme/theme.js`:

- **Text Colors**: Primary, secondary, tertiary text colors
- **Background Colors**: Various background shades for different components
- **Border Colors**: Border styles for cards, inputs, and dividers
- **Shadow Colors**: Consistent shadow styles across components
- **Brand Colors**: Social media colors, accent colors
- **Interactive Colors**: Hover states, focus states

### 2. Automatic Theme Switching

- **Dark Theme**: Default theme with dark backgrounds and light text
- **Light Theme**: Clean light theme with proper contrast ratios
- **Persistence**: Theme preference is saved to localStorage
- **Smooth Transitions**: CSS transitions for theme changes

### 3. React Integration

- **ThemeProvider**: Wraps the entire app for theme state management
- **useTheme Hook**: Access theme functions in any component
- **Theme Toggle**: Easy-to-use toggle button component

## Usage

### Basic Setup (Already Implemented)

The theme system is already integrated into your portfolio:

1. **App.jsx** - Wrapped with ThemeProvider
2. **main.jsx** - Theme initialization on app start
3. **NavigationBar.jsx** - Includes theme toggle button
4. **All CSS files** - Updated to use theme variables

### Using Themes in Components

```jsx
import { useTheme } from "../theme/ThemeProvider";

const MyComponent = () => {
	const { currentTheme, toggleTheme, themeColors } = useTheme();

	return (
		<div style={{ color: themeColors.textPrimary }}>
			Current theme: {currentTheme}
			<button onClick={toggleTheme}>Toggle Theme</button>
		</div>
	);
};
```

### Adding New Theme Variables

To add new theme variables, edit `src/theme/theme.js`:

```js
export const themes = {
	dark: {
		// Add your new variable
		newColor: "#ff0000",
		// ... existing variables
	},
	light: {
		// Add corresponding light theme variable
		newColor: "#00ff00",
		// ... existing variables
	},
};
```

### Using Variables in CSS

Theme variables are automatically converted to CSS custom properties:

```css
.my-component {
	/* CamelCase to kebab-case conversion */
	color: var(--new-color); /* from newColor */
	background: var(--text-primary); /* from textPrimary */
	border: 1px solid var(--border-primary);
}
```

## Benefits

1. **Consistency**: All colors are centralized and consistent
2. **Maintainability**: Easy to update colors across the entire site
3. **Accessibility**: Proper contrast ratios for both themes
4. **User Experience**: Smooth theme transitions and preference persistence
5. **Developer Experience**: Clear variable names and good documentation

## Browser Support

The theme system uses CSS custom properties (CSS variables) which are supported in:

- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 16+

## Future Enhancements

Possible future improvements:

1. **More Themes**: Add additional theme variants (e.g., high contrast, colorful)
2. **System Theme Detection**: Automatically detect user's OS theme preference
3. **Component-Specific Themes**: Different themes for specific components
4. **Theme Customization**: Allow users to create custom themes
5. **Theme Preview**: Preview themes before applying them

## Troubleshooting

### Theme Not Applying

1. Check if ThemeProvider wraps your app
2. Verify theme initialization in main.jsx
3. Check browser console for errors

### CSS Variables Not Working

1. Ensure you're using the correct variable names
2. Check if the variable exists in the theme definition
3. Verify CSS custom property syntax: `var(--variable-name)`
