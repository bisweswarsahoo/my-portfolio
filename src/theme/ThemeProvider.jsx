import { createContext, useContext, useEffect, useState } from "react";
import { themes, defaultTheme, getCurrentTheme, applyTheme } from "./theme.js";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

	useEffect(() => {
		applyTheme(currentTheme);
		localStorage.setItem("portfolio-theme", currentTheme);
	}, [currentTheme]);

	useEffect(() => {
		const savedTheme = getCurrentTheme();
		if (savedTheme && themes[savedTheme]) {
			setCurrentTheme(savedTheme);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = currentTheme === "dark" ? "light" : "dark";
		setCurrentTheme(newTheme);
	};

	const switchTheme = (themeName) => {
		if (themes[themeName]) {
			setCurrentTheme(themeName);
		}
	};

	const getThemeValue = (key) => {
		return themes[currentTheme]?.[key] || themes[defaultTheme][key];
	};

	const value = {
		currentTheme,
		themes: Object.keys(themes),
		toggleTheme,
		switchTheme,
		getThemeValue,
		themeColors: themes[currentTheme] || themes[defaultTheme],
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

export const withTheme = (Component) => {
	return function ThemedComponent(props) {
		const theme = useTheme();
		return (
			<Component
				{...props}
				theme={theme}
			/>
		);
	};
};

export default ThemeProvider;
