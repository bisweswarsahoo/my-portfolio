// Common properties that are the same across themes
const commonThemeProperties = {
	instagram: "#cc39a4",
	twitter: "#03a9f4",
	discord: "#8c9eff",
	linkedin: "#0a66c2",

	macRed: "#ff5f57",
	macYellow: "#ffbd2e",
	macGreen: "#28c941",

	textWhite: "#fff",
	backdropFilter: "blur(8px)",
	backdropFilterStrong: "blur(10px)",
	accent: "#6366f1",
	primary: "#1f718fff",
};

// Theme-specific properties
const themeVariants = {
	dark: {
		textPrimary: "#e7dfdd",
		textSecondary: "#c7c1bf",
		textTertiary: "#b3b3b3",
		textMuted: "#dcdcdc",
		github: "#ffffff",

		backgroundPrimary: "#0b0e16",
		backgroundSecondary: "#1a1f2c",
		backgroundGlass: "rgba(20, 22, 34, 0.82)",
		backgroundGlassHover: "rgba(30, 34, 54, 0.92)",
		backgroundSurface: "rgba(20, 22, 34, 0.88)",
		backgroundCard: "#181c2a",
		backgroundCodeEditor: "#181c2a",

		borderPrimary: "rgba(255, 255, 255, 0.08)",
		borderSecondary: "rgba(255, 255, 255, 0.09)",
		borderCode: "#23263a",
		borderLight: "#e7dfdd30",

		buttonPrimary: "#f8fafc",
		buttonPrimaryText: "#1f718fff",
		buttonPrimaryHover: "#1f718fff",
		buttonPrimaryHoverText: "#f8fafc",

		shadowLight: "0 4px 8px rgba(0, 0, 0, 0.1)",
		shadowMedium: "0 8px 32px rgba(0, 0, 0, 0.18)",
		shadowHeavy: "0 16px 40px rgba(0, 0, 0, 0.22)",
		shadowCard: "0 12px 24px rgba(0, 0, 0, 0.15)",
		shadowCardHover: "0 12px 24px rgba(231, 223, 221, 0.1)",
		shadowSmall: "0 2px 8px rgba(0, 0, 0, 0.08)",
		shadowNavbar: "0 2px 16px rgba(0, 0, 0, 0.07)",
		shadowButton: "0 2px 12px rgba(0, 0, 0, 0.1)",
		shadowIndicator: "0 2px 6px rgba(0, 0, 0, 0.25)",
		shadowIndicatorActive:
			"0 0 0 4px rgba(99, 179, 237, 0.15), 0 4px 14px rgba(0, 0, 0, 0.35)",

		scrollbarThumb: "#444",

		skillGroupOutline: "rgba(255 255 255 / 0.04)",
		skillGroupOutlineHover: "rgba(var(--accent-rgb, 99 102 241) / 0.55)",

		languageIndicator: "rgba(255, 255, 255, 0.22)",
		languageIndicatorHover: "rgba(255, 255, 255, 0.4)",

		navStroke: "white",
		navIconFill: "#1e40af",
	},

	light: {
		textPrimary: "#1f2937",
		textSecondary: "#4b5563",
		textTertiary: "#6b7280",
		textMuted: "#374151",
		github: "#1f2937",

		backgroundPrimary: "#f9fafb",
		backgroundSecondary: "#ffffff",
		backgroundGlass: "rgba(255, 255, 255, 0.82)",
		backgroundGlassHover: "rgba(248, 250, 252, 0.92)",
		backgroundSurface: "rgba(255, 255, 255, 0.88)",
		backgroundCard: "#ffffff",
		backgroundCodeEditor: "#f8fafc",

		borderPrimary: "rgba(0, 0, 0, 0.08)",
		borderSecondary: "rgba(0, 0, 0, 0.09)",
		borderCode: "#e5e7eb",
		borderLight: "#e5e7eb",

		buttonPrimary: "#000",
		buttonPrimaryText: "#ffffff",
		buttonPrimaryHover: "#1f718fff",
		buttonPrimaryHoverText: "#ffffff",

		shadowLight: "0 4px 8px rgba(0, 0, 0, 0.05)",
		shadowMedium: "0 8px 32px rgba(0, 0, 0, 0.08)",
		shadowHeavy: "0 16px 40px rgba(0, 0, 0, 0.12)",
		shadowCard: "0 12px 24px rgba(0, 0, 0, 0.08)",
		shadowCardHover: "0 12px 24px rgba(37, 99, 235, 0.1)",
		shadowSmall: "0 2px 8px rgba(0, 0, 0, 0.04)",
		shadowNavbar: "0 2px 16px rgba(0, 0, 0, 0.04)",
		shadowButton: "0 2px 12px rgba(0, 0, 0, 0.05)",
		shadowIndicator: "0 2px 6px rgba(0, 0, 0, 0.15)",
		shadowIndicatorActive:
			"0 0 0 4px rgba(37, 99, 235, 0.15), 0 4px 14px rgba(0, 0, 0, 0.15)",

		scrollbarThumb: "#d1d5db",

		skillGroupOutline: "rgba(0 0 0 / 0.04)",
		skillGroupOutlineHover: "rgba(37, 99, 235, 0.2)",

		languageIndicator: "rgba(0, 0, 0, 0.12)",
		languageIndicatorHover: "rgba(0, 0, 0, 0.2)",

		navStroke: "#1f2937",
		navIconFill: "#2563eb",
	},
};

// Generate complete themes by merging common properties with theme variants
export const themes = Object.keys(themeVariants).reduce((acc, themeName) => {
	acc[themeName] = {
		...commonThemeProperties,
		...themeVariants[themeName],
	};
	return acc;
}, {});

export const defaultTheme = "dark";

export const getCurrentTheme = () => {
	const savedTheme = localStorage.getItem("portfolio-theme");
	return savedTheme || defaultTheme;
};

export const setTheme = (themeName) => {
	if (themes[themeName]) {
		localStorage.setItem("portfolio-theme", themeName);
		applyTheme(themeName);
	}
};

export const applyTheme = (themeName) => {
	const theme = themes[themeName] || themes[defaultTheme];
	const root = document.documentElement;

	Object.entries(theme).forEach(([key, value]) => {
		const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
		root.style.setProperty(cssVarName, value);
	});

	root.style.setProperty("--color-primary", theme.primary);
	root.style.setProperty("--color-text", theme.textPrimary);
	root.style.setProperty("--color-text-secondary", theme.textSecondary);
	root.style.setProperty("--color-surface-glass", theme.backgroundGlass);
	root.style.setProperty("--color-shadow", theme.shadowMedium);
	root.style.setProperty("--color-card-shadow", theme.shadowCard);
	root.style.setProperty("--color-border", theme.borderPrimary);
	root.style.setProperty("--color-link", theme.primary);
	root.style.setProperty("--accent-rgb", "99 102 241");
};

export const initializeTheme = () => {
	const currentTheme = getCurrentTheme();
	applyTheme(currentTheme);
	return currentTheme;
};
