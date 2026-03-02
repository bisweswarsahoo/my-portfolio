import "./App.css";
import Navbar from "./components/Navbar.jsx";

import Education from "./sections/Education.jsx";
import Work from "./sections/Work.jsx";

import Skills from "./sections/Skills.jsx";
import Projects from "./sections/Projects.jsx";
import Languages from "./components/Languages.jsx";
import Footer from "./components/Footer.jsx";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";

const sections = [
	{ id: "education", Component: Education },
	{ id: "work", Component: Work },

	{ id: "skills", Component: Skills },
	{ id: "projects", Component: Projects },
	{ id: "languages", Component: Languages },
];

function App() {
	return (
		<ThemeProvider>
			<div className="app-container">
				<Navbar />
				{sections.map(({ id, Component }) => (
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
