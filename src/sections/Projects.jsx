import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import "../styles/Projects.css";
import {
	FaGithub,
	FaExternalLinkAlt,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import portfolioData from "../data/portfolioData.js";

const Projects = () => {
	const visibleProjects = portfolioData.projects.filter((project) =>
		project.name || project.techStack || project.description?.some(Boolean),
	);
	if (!visibleProjects.length) return null;
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
					{visibleProjects.map((project, index) => (
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
