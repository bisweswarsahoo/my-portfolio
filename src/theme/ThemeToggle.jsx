import { useTheme } from "./ThemeProvider";

const ThemeToggle = ({ className = "", style = {} }) => {
	const { currentTheme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className={`theme-toggle ${className}`}
			style={{
				background: "none",
				border: "none",
				cursor: "pointer",
				fontSize: "1.5rem",
				padding: "0.5rem",
				borderRadius: "0.5rem",
				transition: "background 0.2s ease",
				...style,
			}}
			title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
		>
			{currentTheme === "dark" ? "🌙" : "☀️"}
		</button>
	);
};

export default ThemeToggle;
