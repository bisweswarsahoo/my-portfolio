import "./App.css";
import Navbar from "./components/Navbar.jsx";

import Journey from "./sections/Journey.jsx";

import About from "./sections/About.jsx";
import Skills from "./sections/Skills.jsx";
import Projects from "./sections/Projects.jsx";
import Languages from "./components/Languages.jsx";
import Footer from "./components/Footer.jsx";
import CentralizedBackground from "./components/CentralizedBackground.jsx";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import portfolioData from "./data/portfolioData.js";

const sections = [
	{ id: "journey", Component: Journey, dataKey: "journey" },
	{ id: "skills", Component: Skills, dataKey: "skills" },
	{ id: "projects", Component: Projects, dataKey: "projects" },
	{ id: "about", Component: About, dataKey: "about" },
	{ id: "languages", Component: Languages, dataKey: "languages" },
];

const hasContent = (value) => {
	if (!Array.isArray(value)) return Boolean(value);
	return value.some((item) => {
		if (typeof item === "string") return item.trim().length > 0;
		if (!item || typeof item !== "object") return false;
		return Object.values(item).some((field) => {
			if (Array.isArray(field)) return field.some(Boolean);
			return typeof field === "string" ? field.trim().length > 0 : Boolean(field);
		});
	});
};

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const ProjectArchive = lazy(() => import("./sections/ProjectArchive.jsx"));

const Home = () => (
	<>
		{sections.filter(({ dataKey }) => hasContent(portfolioData[dataKey])).map(({ id, Component }) => (
			<section
				key={id}
				id={id}
				className="portfolio-section"
			>
				<Component />
			</section>
		))}
	</>
);

const ArchiveLoadingFallback = () => (
	<div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontSize: "1rem" }}>
		Loading Archive...
	</div>
);

function App() {
	return (
		<ThemeProvider>
			<CentralizedBackground />
			<div className="app-container">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/projects"
						element={
							<Suspense fallback={<ArchiveLoadingFallback />}>
								<ProjectArchive />
							</Suspense>
						}
					/>
				</Routes>
			</div>
			<Footer />
		</ThemeProvider>
	);
}

export default App;
