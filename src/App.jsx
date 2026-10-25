import "./App.css";
import Navbar from "./components/Navbar.jsx";

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Journey from "./sections/Journey.jsx";
import Footer from "./components/Footer.jsx";
import CentralizedBackground from "./components/CentralizedBackground.jsx";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import portfolioData from "./data/portfolioData.js";

const Skills = lazy(() => import("./sections/Skills.jsx"));
const Projects = lazy(() => import("./sections/Projects.jsx"));
const About = lazy(() => import("./sections/About.jsx"));
const Languages = lazy(() => import("./components/Languages.jsx"));
const ProjectArchive = lazy(() => import("./sections/ProjectArchive.jsx"));

const sections = [
	{ id: "journey", Component: Journey, dataKey: "journey", isLazy: false },
	{ id: "skills", Component: Skills, dataKey: "skills", isLazy: true },
	{ id: "projects", Component: Projects, dataKey: "projects", isLazy: true },
	{ id: "about", Component: About, dataKey: "about", isLazy: true },
	{ id: "languages", Component: Languages, dataKey: "languages", isLazy: true },
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

const SectionFallback = () => (
	<div style={{ minHeight: "200px" }} aria-hidden="true" />
);

const Home = () => (
	<>
		{sections.filter(({ dataKey }) => hasContent(portfolioData[dataKey])).map(({ id, Component, isLazy }) => (
			<section
				key={id}
				id={id}
				className="portfolio-section"
			>
				{isLazy ? (
					<Suspense fallback={<SectionFallback />}>
						<Component />
					</Suspense>
				) : (
					<Component />
				)}
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
				<main id="main-content" className="app-main">
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
				</main>
			</div>
			<Footer />
		</ThemeProvider>
	);
}

export default App;
