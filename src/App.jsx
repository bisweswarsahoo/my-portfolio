import "./App.css";
import Navbar from "./components/Navbar.jsx";

import Education from "./sections/Education.jsx";
import Work from "./sections/Work.jsx";

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

function App() {
	return (
		<ThemeProvider>
			<div className="app-container">
				<Navbar />
				{sections.filter(({ dataKey }) => hasContent(portfolioData[dataKey])).map(({ id, Component }) => (
					<div
						key={id}
						id={id}
						style={{ paddingTop: "80px", marginTop: "-80px" }} // for scroll offset if not using scroll-padding-top
					>
						<Component />
					</div>
				))}
			</div>
			<Footer />
		</ThemeProvider>
	);
}

export default App;
