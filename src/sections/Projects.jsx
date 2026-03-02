import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import "../styles/Projects.css";
import {
	FaGithub,
	FaExternalLinkAlt,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";

const projects = [
	{
		name: "NodeNexus – Real-time Community Chat Platform",
		techStack: "MERN Stack, Socket.io, JWT, AES Encryption",
		description: [
			"Developed a real-time chat application for seamless interaction in communities.",
			"Implemented AES-256 encryption for secure messaging.",
			"Integrated Socket.io for instant messaging and notifications.",
			"Features include group chats, user authentication, and customizable profiles.",
		],
		sourceCode: "#",
		liveDemo: "#",
	},
	{
		name: "Castify – A Collaborative Platform for Artists",
		techStack:
			"React Native, Java, Microservices, MongoDB, PostgreSQL, Firebase",
		description: [
			"Developed a platform enabling artists to collaborate and gain experience in domains such as acting, singing, dancing, poetry, and more.",
			"Created a casting portal for finding job opportunities.",
			"Designed a collaborative space for independent projects and networking.",
			"Integrated cloud services using Firebase for authentication and real-time updates.",
		],
		sourceCode: "#",
		liveDemo: "#",
	},
	{
		name: "Heatmap: Interactive Geospatial Data Visualization Platform",
		techStack: "React.js, Leaflet.js, Python, Ant Design",
		description: [
			"Architected a dynamic frontend with React and Leaflet.js featuring a customizable heatmap layer, multi-select filters, and bounding-box zoom logic for intuitive data exploration",
			"Developed a scalable Flask backend exposing RESTful API endpoints for geospatial data with proper CORS handling and environment-based configuration",
			"Optimized performance by caching API data in localStorage to reduce network requests and implementing efficient geographic bounding box calculations for map rendering",
			"Enhanced UX with dark/light theme toggle, loading indicators, and a responsive layout using Ant Design components",
		],
		sourceCode: "#",
		liveDemo: "#",
	},
	{
		name: "ScamGuard AI – Browser-Based Multi-Modal Scam Detection System",
		techStack:
			"Python, FastAPI, Machine Learning, Chrome Extension API, TF-IDF",
		description: [
			"Built a Chrome extension with ML-powered real-time scam detection achieving ~97% accuracy and 0.99 ROC-AUC",
			"Developed FastAPI backend serving a hybrid text classifier using TF-IDF and handcrafted lexical features with ~90% scam recall",
			"Implemented content script for webpage text extraction with risk score visualization and explanation engine",
			"Designed modular architecture supporting future multi-modal expansion for image (OCR + CNN) and audio fraud detection",
		],
		sourceCode: "#",
		liveDemo: "#",
	},
	{
		name: "SeeMeWatch – Movie & TV Show Tracking App",
		techStack: "React Native, Expo, TypeScript, Zustand, MMKV, TMDB API",
		description: [
			"Built a comprehensive mobile app for tracking movies and TV shows with integration to TMDB and Simkl APIs",
			"Implemented efficient state management using Zustand and high-performance local storage with react-native-mmkv",
			"Developed features including custom collections, watchlist management, search functionality, and automatic viewing history tracking",
			"Designed fully internationalized UI with dark/light theme support and smooth animations using Reanimated",
		],
		sourceCode: "#",
		liveDemo: "#",
	},
];

const Projects = () => {
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);
	const containerRef = useRef(null);

	const checkScrollPosition = () => {
		if (containerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
		}
	};

	const scrollLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({
				left: -600,
				behavior: "smooth",
			});
		}
	};

	const scrollRight = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({
				left: 600,
				behavior: "smooth",
			});
		}
	};

	useEffect(() => {
		checkScrollPosition();
		const container = containerRef.current;
		if (container) {
			container.addEventListener("scroll", checkScrollPosition);
			window.addEventListener("resize", checkScrollPosition);
			return () => {
				container.removeEventListener("scroll", checkScrollPosition);
				window.removeEventListener("resize", checkScrollPosition);
			};
		}
	}, []);

	return (
		<>
			<h2 className="projects-title">
				Some Projects that have been keeping me busy...
			</h2>
			<div className="projects-wrapper">
				{canScrollLeft && (
					<button
						className="nav-arrow nav-arrow-left"
						onClick={scrollLeft}
						aria-label="Scroll left"
					>
						<FaChevronLeft />
					</button>
				)}
				<div
					className="projects-container"
					ref={containerRef}
					onScroll={checkScrollPosition}
				>
					{projects.map((project, index) => (
						<motion.div
							key={index}
							className="project-card-container"
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
						>
							<div className="card">
								<div className="mac-header">
									<span className="red"></span>
									<span className="yellow"></span>
									<span className="green"></span>
								</div>
								<p className="card-title">{project.name}</p>
								<p className="card-description">
									{project.description.join(". ")}
								</p>
								{project.techStack.split(", ").map((tech, techIndex) => (
									<span
										key={techIndex}
										className="card-tag"
									>
										{tech}
									</span>
								))}
								<div className="project-links">
									<a
										href={project.sourceCode}
										className="project-link"
									>
										<FaGithub /> Source Code
									</a>
									<a
										href={project.liveDemo}
										className="project-link"
									>
										<FaExternalLinkAlt /> Live Demo
									</a>
								</div>
							</div>
						</motion.div>
					))}
				</div>
				{canScrollRight && (
					<button
						className="nav-arrow nav-arrow-right"
						onClick={scrollRight}
						aria-label="Scroll right"
					>
						<FaChevronRight />
					</button>
				)}
			</div>
		</>
	);
};

export default Projects;
