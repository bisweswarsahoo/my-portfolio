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
	const components = [
		Experience,
		Education,
		Skills,
		Projects,
		Languages,
		About,
	];

	return (
		<ThemeProvider>
			<NavigationBar />
			{components.map((Component, index) => (
				<div
					key={index}
					style={{ margin: "4rem 0" }}
				>
					<Component />
				</div>
			))}
		</ThemeProvider>
	);
}

export default App;
