import "./App.css";
import Education from "./components/Education.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import Skills from "./components/Skills.jsx";

function App() {
	return (
		<>
			<NavigationBar />
			<hr />
			<Education />
			<hr />
			<Skills />
		</>
	);
}

export default App;
