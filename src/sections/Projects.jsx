import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../data/portfolioData";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectInfo from "../components/projects/ProjectInfo";
import ProjectVisual from "../components/projects/ProjectVisual";
import ProjectNavigation from "../components/projects/ProjectNavigation";
import "../styles/Projects.css";

const AUTO_ROTATE_MS = 7500;

const Projects = () => {
	const allProjects = (portfolioData.projects || []).filter(
		(p) => p.title || p.name || p.techStack
	);
	// Only display the latest 3 projects on the main screen; all others are in the archive
	const projects = allProjects.slice(0, 3);

	const [activeIndex, setActiveIndex] = useState(0);
	const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
	const [isPaused, setIsPaused] = useState(false);
	const [progress, setProgress] = useState(0);

	const sectionRef = useRef(null);
	const touchStartX = useRef(null);

	const totalProjects = projects.length;
	const totalArchived = allProjects.length;

	// Navigation handlers
	const handleNext = useCallback(() => {
		setDirection(1);
		setActiveIndex((prev) => (prev + 1) % totalProjects);
		setProgress(0);
	}, [totalProjects]);

	const handlePrev = useCallback(() => {
		setDirection(-1);
		setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
		setProgress(0);
	}, [totalProjects]);

	const handleSelectProject = useCallback((index) => {
		if (index === activeIndex) return;
		setDirection(index > activeIndex ? 1 : -1);
		setActiveIndex(index);
		setProgress(0);
	}, [activeIndex]);

	// Auto-rotation progress timer
	useEffect(() => {
		if (isPaused || totalProjects <= 1) return;

		const interval = 50; // update progress every 50ms
		const step = (interval / AUTO_ROTATE_MS) * 100;

		const timer = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					handleNext();
					return 0;
				}
				return prev + step;
			});
		}, interval);

		return () => clearInterval(timer);
	}, [isPaused, handleNext, totalProjects]);

	// Keyboard arrow navigation
	useEffect(() => {
		const handleKeyDown = (e) => {
			// Only intercept if target is not an input or textarea
			if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

			if (e.key === "ArrowLeft") {
				handlePrev();
			} else if (e.key === "ArrowRight") {
				handleNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleNext, handlePrev]);

	// Touch swipe support for mobile
	const handleTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e) => {
		if (touchStartX.current === null) return;
		const touchEndX = e.changedTouches[0].clientX;
		const diff = touchStartX.current - touchEndX;

		if (Math.abs(diff) > 50) {
			if (diff > 0) {
				handleNext();
			} else {
				handlePrev();
			}
		}
		touchStartX.current = null;
	};

	if (!projects.length) return null;

	const activeProject = projects[activeIndex];

	// Motion variants for coordinated transitions
	const infoVariants = {
		initial: {
			opacity: 0,
			y: 15,
		},
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.38,
				ease: [0.16, 1, 0.3, 1],
			},
		},
		exit: {
			opacity: 0,
			y: -10,
			transition: {
				duration: 0.24,
				ease: [0.7, 0, 0.84, 0],
			},
		},
	};

	const visualVariants = {
		initial: (dir) => ({
			opacity: 0,
			scale: 0.97,
			x: dir > 0 ? 20 : -20,
		}),
		animate: {
			opacity: 1,
			scale: 1,
			x: 0,
			transition: {
				duration: 0.42,
				ease: [0.16, 1, 0.3, 1],
			},
		},
		exit: {
			opacity: 0,
			scale: 0.97,
			transition: {
				duration: 0.26,
				ease: [0.7, 0, 0.84, 0],
			},
		},
	};

	return (
		<section
			ref={sectionRef}
			className="ps-section"
			aria-label="Projects Product Showcase"
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			{/* Ambient Background System */}
			<div className="ps-bg" aria-hidden="true">
				<div className="ps-bg__grid" />
				<div className="ps-bg__glow ps-bg__glow--1" />
				<div className="ps-bg__glow ps-bg__glow--2" />
				<div className="ps-bg__glow ps-bg__glow--center" />
				<div className="ps-bg__line ps-bg__line--top" />
				<div className="ps-bg__line ps-bg__line--bottom" />
			</div>

			{/* Main Content Container (Max width ~1440px) */}
			<div className="ps-container">
				{/* Section Header */}
				<ProjectsHeader totalProjects={totalArchived} />

				{/* Two-Column Showcase Area */}
				<div
					className="ps-showcase"
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
					onFocus={() => setIsPaused(true)}
					onBlur={() => setIsPaused(false)}
				>
					{/* Left Column: Project Information */}
					<div className="ps-col-info">
						<AnimatePresence mode="wait">
							<motion.div
								key={`info-${activeProject.id || activeIndex}`}
								variants={infoVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className="ps-motion-info"
							>
								<ProjectInfo
									project={activeProject}
									currentIndex={activeIndex}
									totalProjects={totalProjects}
								/>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Right Column: Application Showcase Frame */}
					<div className="ps-col-visual">
						<AnimatePresence mode="wait" custom={direction}>
							<motion.div
								key={`visual-${activeProject.id || activeIndex}`}
								custom={direction}
								variants={visualVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className="ps-motion-visual"
							>
								<ProjectVisual project={activeProject} />
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Project Thumbnail Navigation Strip */}
				<div
					className="ps-navigation-area"
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
				>
					<ProjectNavigation
						projects={projects}
						activeIndex={activeIndex}
						onSelectProject={handleSelectProject}
						onPrev={handlePrev}
						onNext={handleNext}
						progress={progress}
						isPaused={isPaused}
					/>
				</div>
			</div>
		</section>
	);
};

export default Projects;
