import "./App.css";
import About from "./components/About.jsx";
import Education from "./components/Education.jsx";
import Experience from "./components/Experience.jsx";
import Languages from "./components/Languages.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";

function App() {
	return (
		<ThemeProvider>
			<NavigationBar />
			<Experience />
			<Education />
			<Skills />
			<Projects />
			<Languages />
			<About />
		</ThemeProvider>
	);
}

export default App;
