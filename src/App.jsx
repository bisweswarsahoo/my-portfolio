import "./App.css";
import Navbar from "./components/Navbar.jsx";

import Education from "./sections/Education.jsx";
import Work from "./sections/Work.jsx";

import About from "./sections/About.jsx";
import Skills from "./sections/Skills.jsx";
import Projects from "./sections/Projects.jsx";
import Languages from "./components/Languages.jsx";
import Footer from "./components/Footer.jsx";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import CVCard from "./components/CVCard.jsx";
import portfolioData from "./data/portfolioData.js";

const sections = [
	{ id: "education", Component: Education, dataKey: "education" },
	{ id: "work", Component: Work, dataKey: "experience" },
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

import { Routes, Route } from "react-router-dom";
import ProjectArchive from "./sections/ProjectArchive.jsx";

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

function App() {
	return (
		<ThemeProvider>
			<div className="app-container">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/projects" element={<ProjectArchive />} />
				</Routes>
			</div>
			<Footer />
		</ThemeProvider>
	);
}

export default App;
