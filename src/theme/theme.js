export const themes = {
	dark: {
		// Core Colors
		primary: "#1f718fff",

		// Text Colors
		textPrimary: "#e7dfdd",
		textSecondary: "#c7c1bf",
		textTertiary: "#b3b3b3",
		textWhite: "#fff",
		textMuted: "#dcdcdc",

		// Background Colors
		backgroundPrimary: "#0b0e16",
		backgroundSecondary: "#1a1f2c",
		backgroundGlass: "rgba(20, 22, 34, 0.82)",
		backgroundGlassHover: "rgba(30, 34, 54, 0.92)",
		backgroundSurface: "rgba(20, 22, 34, 0.88)",
		backgroundCard: "#181c2a",
		backgroundCodeEditor: "#181c2a",

		// Border Colors
		borderPrimary: "rgba(255, 255, 255, 0.08)",
		borderSecondary: "rgba(255, 255, 255, 0.09)",
		borderCode: "#23263a",
		borderLight: "#e7dfdd30",
		borderAccent: "#e7dfdd",
		borderAccentHover: "#e7dfdd99",

		// Social Media Colors
		instagram: "#cc39a4",
		twitter: "#03a9f4",
		github: "#23272e",
		discord: "#8c9eff",

		// Mac Traffic Light Colors
		macRed: "#ff5f57",
		macYellow: "#ffbd2e",
		macGreen: "#28c941",

		// Button Colors
		buttonPrimary: "#f8fafc",
		buttonPrimaryText: "#1f718fff",
		buttonPrimaryHover: "#1f718fff",
		buttonPrimaryHoverText: "#f8fafc",

		// Shadow Colors
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

		// Scrollbar Colors
		scrollbarThumb: "#444",

		// Skill Group Colors
		skillGroupOutline: "rgba(255 255 255 / 0.04)",
		skillGroupOutlineHover: "rgba(var(--accent-rgb, 99 102 241) / 0.55)",

		// Language Indicator Colors
		languageIndicator: "rgba(255, 255, 255, 0.22)",
		languageIndicatorHover: "rgba(255, 255, 255, 0.4)",

		// Backdrop Filter
		backdropFilter: "blur(8px)",
		backdropFilterStrong: "blur(10px)",

		// Accent Colors
		accent: "#6366f1",

		// Navigation Colors
		navStroke: "white",
		navIconFill: "#1e40af",
	},

	light: {
		// Core Colors
		primary: "#1f718fff",

		// Text Colors
		textPrimary: "#1f2937",
		textSecondary: "#4b5563",
		textTertiary: "#6b7280",
		textWhite: "#fff",
		textMuted: "#374151",

		// Background Colors
		backgroundPrimary: "#f9fafb",
		backgroundSecondary: "#ffffff",
		backgroundGlass: "rgba(255, 255, 255, 0.82)",
		backgroundGlassHover: "rgba(248, 250, 252, 0.92)",
		backgroundSurface: "rgba(255, 255, 255, 0.88)",
		backgroundCard: "#ffffff",
		backgroundCodeEditor: "#f8fafc",

		// Border Colors
		borderPrimary: "rgba(0, 0, 0, 0.08)",
		borderSecondary: "rgba(0, 0, 0, 0.09)",
		borderCode: "#e5e7eb",
		borderLight: "#e5e7eb",
		borderAccent: "#2563eb",
		borderAccentHover: "#1d4ed8",

		// Social Media Colors (keeping same for branding)
		instagram: "#cc39a4",
		twitter: "#03a9f4",
		github: "#1f2937",
		discord: "#8c9eff",

		// Mac Traffic Light Colors (keeping same)
		macRed: "#ff5f57",
		macYellow: "#ffbd2e",
		macGreen: "#28c941",

		// Button Colors
		buttonPrimary: "#000",
		buttonPrimaryText: "#ffffff",
		buttonPrimaryHover: "#1f718fff",
		buttonPrimaryHoverText: "#ffffff",

		// Shadow Colors
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

		// Scrollbar Colors
		scrollbarThumb: "#d1d5db",

		// Skill Group Colors
		skillGroupOutline: "rgba(0 0 0 / 0.04)",
		skillGroupOutlineHover: "rgba(37, 99, 235, 0.2)",

		// Language Indicator Colors
		languageIndicator: "rgba(0, 0, 0, 0.12)",
		languageIndicatorHover: "rgba(0, 0, 0, 0.2)",

		// Backdrop Filter
		backdropFilter: "blur(8px)",
		backdropFilterStrong: "blur(10px)",

		// Accent Colors
		accent: "#6366f1",

		// Navigation Colors
		navStroke: "#1f2937",
		navIconFill: "#2563eb",
	},
};

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
