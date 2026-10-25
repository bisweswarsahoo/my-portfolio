import "./App.css";
import Navbar from "./components/Navbar.jsx";

import { lazy, Suspense, useState, useEffect, useRef } from "react";
import Journey from "./sections/Journey.jsx";
const Footer = lazy(() => import("./components/Footer.jsx"));
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
	{ id: "skills", Component: Skills, dataKey: "skills", isLazy: true, minHeight: "100vh" },
	{ id: "projects", Component: Projects, dataKey: "projects", isLazy: true, minHeight: "750px" },
	{ id: "about", Component: About, dataKey: "about", isLazy: true, minHeight: "650px" },
	{ id: "languages", Component: Languages, dataKey: "languages", isLazy: true, minHeight: "450px" },
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

const SectionFallback = ({ minHeight = "200px" }) => (
	<div style={{ minHeight }} aria-hidden="true" />
);

const LazySection = ({ id, Component, minHeight = "200px" }) => {
	const [shouldRender, setShouldRender] = useState(() => {
		if (typeof window !== "undefined" && window.location.hash === `#${id}`) {
			return true;
		}
		return false;
	});
	const sectionRef = useRef(null);

	useEffect(() => {
		if (shouldRender) return;

		const el = sectionRef.current;
		if (!el || typeof IntersectionObserver === "undefined") {
			setShouldRender(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShouldRender(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "350px 0px" }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [shouldRender, id]);

	return (
		<section
			id={id}
			ref={sectionRef}
			className="portfolio-section"
			style={{ minHeight: shouldRender ? undefined : minHeight }}
		>
			{shouldRender ? (
				<Suspense fallback={<SectionFallback minHeight={minHeight} />}>
					<Component />
				</Suspense>
			) : (
				<SectionFallback minHeight={minHeight} />
			)}
		</section>
	);
};

const Home = () => (
	<>
		{sections.filter(({ dataKey }) => hasContent(portfolioData[dataKey])).map(({ id, Component, isLazy, minHeight }) =>
			isLazy ? (
				<LazySection key={id} id={id} Component={Component} minHeight={minHeight} />
			) : (
				<section key={id} id={id} className="portfolio-section">
					<Component />
				</section>
			)
		)}
	</>
);

const ArchiveLoadingFallback = () => (
	<div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontSize: "1rem" }}>
		Loading Archive...
	</div>
);

const useHashRoute = () => {
	const [route, setRoute] = useState(() => {
		if (typeof window === "undefined") return "";
		const raw = window.location.hash.replace(/^#\/?/, "");
		return raw.split("?")[0].split("#")[0] || "";
	});

	useEffect(() => {
		const handleHashChange = () => {
			const raw = window.location.hash.replace(/^#\/?/, "");
			setRoute(raw.split("?")[0].split("#")[0] || "");
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	return route;
};

function App() {
	const route = useHashRoute();
	const isProjectsRoute = route === "projects";

	return (
		<ThemeProvider>
			<CentralizedBackground />
			<div className="app-container">
				<Navbar />
				<main id="main-content" className="app-main">
					{isProjectsRoute ? (
						<Suspense fallback={<ArchiveLoadingFallback />}>
							<ProjectArchive />
						</Suspense>
					) : (
						<Home />
					)}
				</main>
			</div>
			<Suspense fallback={null}>
				<Footer />
			</Suspense>
		</ThemeProvider>
	);
}

export default App;
