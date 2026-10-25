import React, { useState, useEffect, useRef, useCallback } from "react";
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
	const [isInView, setIsInView] = useState(false);

	const sectionRef = useRef(null);
	const touchStartX = useRef(null);

	const totalProjects = projects.length;
	const totalArchived = allProjects.length;

	// Viewport visibility tracking — pauses rotation when scrolled away
	useEffect(() => {
		const el = sectionRef.current;
		if (!el || typeof IntersectionObserver === "undefined") {
			setIsInView(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	// Navigation handlers
	const handleNext = useCallback(() => {
		setDirection(1);
		setActiveIndex((prev) => (prev + 1) % totalProjects);
	}, [totalProjects]);

	const handlePrev = useCallback(() => {
		setDirection(-1);
		setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
	}, [totalProjects]);

	const handleSelectProject = useCallback((index) => {
		if (index === activeIndex) return;
		setDirection(index > activeIndex ? 1 : -1);
		setActiveIndex(index);
	}, [activeIndex]);

	// Auto-rotation timer: single timeout instead of 50ms interval re-renders
	useEffect(() => {
		if (!isInView || isPaused || totalProjects <= 1) return;

		const timer = setTimeout(() => {
			handleNext();
		}, AUTO_ROTATE_MS);

		return () => clearTimeout(timer);
	}, [isInView, isPaused, handleNext, totalProjects, activeIndex]);

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
	const touchStartY = useRef(null);

	const handleTouchStart = (e) => {
		// Prevent swipe conflict when user touches interactive controls or thumbnail strip
		if (
			e.target.closest(
				".ps-thumbnails-strip, .ps-nav-arrow, .ps-archive-btn, .ps-actions, button, a"
			)
		) {
			touchStartX.current = null;
			touchStartY.current = null;
			return;
		}
		touchStartX.current = e.touches[0].clientX;
		touchStartY.current = e.touches[0].clientY;
	};

	const handleTouchEnd = (e) => {
		if (touchStartX.current === null || touchStartY.current === null) return;
		const touchEndX = e.changedTouches[0].clientX;
		const touchEndY = e.changedTouches[0].clientY;
		const diffX = touchStartX.current - touchEndX;
		const diffY = touchStartY.current - touchEndY;

		// Only change projects on deliberate horizontal swipe (horizontal movement > 1.5x vertical movement)
		if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
			if (diffX > 0) {
				handleNext();
			} else {
				handlePrev();
			}
		}
		touchStartX.current = null;
		touchStartY.current = null;
	};

	if (!projects.length) return null;

	const activeProject = projects[activeIndex];

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
						<div
							key={`info-${activeProject.id || activeIndex}`}
							className="ps-motion-info ps-fade-in"
						>
							<ProjectInfo
								project={activeProject}
								currentIndex={activeIndex}
								totalProjects={totalProjects}
							/>
						</div>
					</div>

					{/* Right Column: Application Showcase Frame */}
					<div className="ps-col-visual">
						<div
							key={`visual-${activeProject.id || activeIndex}`}
							className={`ps-motion-visual ${direction > 0 ? "ps-slide-next" : "ps-slide-prev"}`}
						>
							<ProjectVisual project={activeProject} />
						</div>
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
						isPaused={isPaused || !isInView}
					/>
				</div>
			</div>
		</section>
	);
};

export default Projects;
