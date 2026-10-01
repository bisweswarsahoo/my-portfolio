import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { initializeTheme } from "./theme/theme.js";

initializeTheme();

// Wrapper to attach global copy-prevention listeners once.
function GlobalGuards({ children }) {
	useEffect(() => {
		const prevent = (e) => {
			e.preventDefault();
			e.stopPropagation();
		};
		const events = ["copy", "cut", "contextmenu", "dragstart"];
		events.forEach((ev) => document.addEventListener(ev, prevent, true));
		return () =>
			events.forEach((ev) => document.removeEventListener(ev, prevent, true));
	}, []);
	return children;
}

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<HashRouter>
			<GlobalGuards>
				<App />
			</GlobalGuards>
		</HashRouter>
	</StrictMode>
);
