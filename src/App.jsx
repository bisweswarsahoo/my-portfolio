import "./App.css";
import Education from "./components/Education.jsx";
import Map from "./components/Map.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import Skills from "./components/Skills.jsx";

function App() {
	return (
		<>
			<NavigationBar />
			<Education />
			<Skills />
		</>
	);
}

export default App;
