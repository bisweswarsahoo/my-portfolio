import "./App.css";
import About from "./components/About.jsx";
import Education from "./components/Education.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";

function App() {
	return (
		<>
			<NavigationBar />
			<Education />
			<Skills />
			<Projects />
			<About />
		</>
	);
}

export default App;
