import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
	FaArrowLeft,
	FaArrowRight,
	FaMagnifyingGlass,
	FaXmark,
	FaArrowUpRightFromSquare,
	FaFolderOpen,
	FaCode,
	FaMobileScreen,
	FaBrain,
	FaGamepad,
	FaWrench,
	FaFlask
} from "react-icons/fa6";
import portfolioData from "../data/portfolioData.js";
import { getTechIcon } from "../components/projects/techIcons.jsx";
import "../styles/ProjectArchive.css";

const CATEGORIES = [
	"All",
	"Full-Stack",
	"Web Apps",
	"Mobile",
	"Data / AI",
	"Games",
	"Tools",
	"Research",
];

const getCategoryClass = (category = "") => {
	const cat = category.toLowerCase();
	if (cat.includes("full")) return "pa-accent--fullstack";
	if (cat.includes("ai") || cat.includes("machine")) return "pa-accent--ai";
	if (cat.includes("data") || cat.includes("viz")) return "pa-accent--dataviz";
	if (cat.includes("mobile")) return "pa-accent--mobile";
	if (cat.includes("game")) return "pa-accent--games";
	if (cat.includes("real") || cat.includes("chat") || cat.includes("web app")) return "pa-accent--webapps";
	if (cat.includes("tool")) return "pa-accent--tools";
	if (cat.includes("research")) return "pa-accent--research";
	return "pa-accent--fullstack";
};

const getCategoryIcon = (category = "") => {
	const cat = category.toLowerCase();
	if (cat.includes("full")) return FaCode;
	if (cat.includes("ai") || cat.includes("data")) return FaBrain;
	if (cat.includes("mobile")) return FaMobileScreen;
	if (cat.includes("game")) return FaGamepad;
	if (cat.includes("tool")) return FaWrench;
	if (cat.includes("research")) return FaFlask;
	return FaFolderOpen;
};

const ProjectArchive = () => {
	const navigate = useNavigate();
	const searchInputRef = useRef(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState("All");
	const [sortBy, setSortBy] = useState("latest");

	// Scroll to top on load
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Keyboard shortcut '/' to focus search, and 'Escape' to blur/clear
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "/" && document.activeElement !== searchInputRef.current) {
				e.preventDefault();
				searchInputRef.current?.focus();
			} else if (e.key === "Escape" && document.activeElement === searchInputRef.current) {
				searchInputRef.current?.blur();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Base projects list
	const allProjects = useMemo(() => {
		return (portfolioData.projects || []).filter(
			(p) => p.title || p.name || p.techStack
		);
	}, []);

	// Filtered & Sorted Projects
	const filteredProjects = useMemo(() => {
		let list = [...allProjects];

		// Category filtering
		if (activeCategory !== "All") {
			list = list.filter((p) => {
				const projectCat = (p.category || "").toLowerCase();
				const targetCat = activeCategory.toLowerCase();

				if (targetCat === "data / ai") {
					return projectCat.includes("ai") || projectCat.includes("data");
				}
				if (targetCat === "full-stack") {
					return projectCat.includes("full");
				}
				if (targetCat === "web apps") {
					return projectCat.includes("web") || projectCat.includes("real");
				}
				if (targetCat === "mobile") {
					return projectCat.includes("mobile");
				}
				if (targetCat === "games") {
					return projectCat.includes("game");
				}
				if (targetCat === "tools") {
					return projectCat.includes("tool");
				}
				if (targetCat === "research") {
					return projectCat.includes("research");
				}
				return projectCat.includes(targetCat);
			});
		}

		// Search filtering
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			list = list.filter((p) => {
				const titleMatch = (p.title || p.name || "").toLowerCase().includes(query);
				const subtitleMatch = (p.subtitle || "").toLowerCase().includes(query);
				const descMatch = (
					p.shortDescription ||
					(Array.isArray(p.description) ? p.description.join(" ") : p.description || "")
				).toLowerCase().includes(query);
				const catMatch = (p.category || "").toLowerCase().includes(query);
				const techMatch = (
					p.technologies?.join(" ") ||
					(typeof p.techStack === "string" ? p.techStack : "")
				).toLowerCase().includes(query);

				return titleMatch || subtitleMatch || descMatch || catMatch || techMatch;
			});
		}

		// Sorting
		list.sort((a, b) => {
			const titleA = (a.title || a.name || "").toLowerCase();
			const titleB = (b.title || b.name || "").toLowerCase();
			const dateA = parseInt(a.date, 10) || 2024;
			const dateB = parseInt(b.date, 10) || 2024;

			if (sortBy === "latest") return dateB - dateA;
			if (sortBy === "oldest") return dateA - dateB;
			if (sortBy === "az") return titleA.localeCompare(titleB);
			if (sortBy === "za") return titleB.localeCompare(titleA);
			return 0;
		});

		return list;
	}, [allProjects, activeCategory, searchQuery, sortBy]);

	return (
		<div className="pa-page">
			{/* Ambient Background Elements */}
			<div className="pa-bg" aria-hidden="true">
				<div className="pa-bg__grid" />
				<div className="pa-bg__glow pa-bg__glow--1" />
				<div className="pa-bg__glow pa-bg__glow--2" />
			</div>

			<div className="pa-container">
				{/* Top Navigation Bar */}
				<nav className="pa-topbar">
					<button
						type="button"
						className="pa-back-btn"
						onClick={() => navigate("/")}
						aria-label="Back to main portfolio"
					>
						<FaArrowLeft className="pa-back-btn__arrow" />
						<span>Back to Portfolio</span>
					</button>

					<div className="pa-count-badge">
						<span>
							Showing <strong>{filteredProjects.length}</strong> of {allProjects.length}
						</span>
					</div>
				</nav>

				{/* Archive Header & Search */}
				<header className="pa-header">
					<div className="pa-header__left">
						<div className="pa-eyebrow">
							<span className="pa-eyebrow__label">ALL PROJECTS</span>
							<span className="pa-eyebrow__line" />
						</div>

						<h1 className="pa-title">
							Project <span className="pa-title__gradient">Archive</span>
						</h1>

						<p className="pa-subtitle">
							A collection of everything I've built, from full-stack apps to experiments.
						</p>
					</div>

					{/* Search Input */}
					<div className="pa-search-wrap">
						<input
							ref={searchInputRef}
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search projects..."
							className="pa-search-input"
							aria-label="Search projects by name, category, or technology"
						/>
						<FaMagnifyingGlass className="pa-search-icon" aria-hidden="true" />
						{searchQuery ? (
							<button
								type="button"
								className="pa-search-clear"
								onClick={() => setSearchQuery("")}
								aria-label="Clear search query"
							>
								<FaXmark />
							</button>
						) : (
							<span className="pa-search-kbd" aria-hidden="true">/</span>
						)}
					</div>
				</header>

				{/* Filter & Sorting Controls */}
				<div className="pa-filter-row">
					{/* Category Filter Pills */}
					<div className="pa-pills-wrap" role="tablist" aria-label="Filter projects by category">
						{CATEGORIES.map((category) => {
							const isActive = activeCategory === category;
							return (
								<button
									key={category}
									type="button"
									role="tab"
									aria-selected={isActive}
									className={`pa-pill ${isActive ? "pa-pill--active" : ""}`}
									onClick={() => setActiveCategory(category)}
								>
									{category}
								</button>
							);
						})}
					</div>

					{/* Sorting Dropdown */}
					<div className="pa-sort-wrap">
						<label htmlFor="pa-sort-select" className="pa-sort-label">Sort by</label>
						<select
							id="pa-sort-select"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="pa-sort-select"
							aria-label="Sort projects"
						>
							<option value="latest">Latest First</option>
							<option value="oldest">Oldest First</option>
							<option value="az">A–Z</option>
							<option value="za">Z–A</option>
						</select>
					</div>
				</div>

				{/* Projects Grid */}
				<motion.div layout className="pa-grid">
					<AnimatePresence mode="popLayout">
						{filteredProjects.length > 0 ? (
							filteredProjects.map((project, index) => {
								const accentClass = getCategoryClass(project.category);
								const CategoryIcon = getCategoryIcon(project.category);

								const primaryLink =
									project.liveUrl || project.liveDemo || project.github || project.sourceCode;
								const githubLink = project.github || project.sourceCode;
								const hasLive = Boolean(project.liveUrl || project.liveDemo);

								const techList =
									project.technologies ||
									(typeof project.techStack === "string"
										? project.techStack.split(", ").slice(0, 4)
										: []);

								return (
									<motion.article
										key={project.id || project.name || index}
										layout
										initial={{ opacity: 0, y: 20, scale: 0.98 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: 15, scale: 0.96 }}
										transition={{
											duration: 0.32,
											delay: index * 0.04,
											ease: [0.16, 1, 0.3, 1],
										}}
										className={`pa-card ${accentClass}`}
									>
										{/* Screenshot / Visual Representation Frame */}
										<div className="pa-screen-frame">
											{project.image ? (
												<>
													<img
														src={project.image}
														alt={`${project.title || project.name} screenshot`}
														className="pa-screen-img"
														loading="lazy"
													/>
													<div className="pa-screen-frame__vignette" />
												</>
											) : (
												<div className="pa-abstract-preview">
													<div className="pa-abstract-preview__top">
														<div className="pa-abstract-dots">
															<span className="pa-abstract-dot" />
															<span className="pa-abstract-dot" />
															<span className="pa-abstract-dot" />
														</div>
														<span className="pa-abstract-date">
															{project.date || "2024"}
														</span>
													</div>

													<div className="pa-abstract-preview__center">
														<div className="pa-abstract-icon-wrap">
															<CategoryIcon />
														</div>
														<span className="pa-abstract-title">
															{project.category || "ENGINEERING"}
														</span>
													</div>

													<div className="pa-abstract-preview__bottom">
														<div className="pa-abstract-bar pa-abstract-bar--accent" />
														<div className="pa-abstract-bar" />
														<div className="pa-abstract-bar" />
													</div>
												</div>
											)}

											{/* Top-Right Open Icon */}
											{primaryLink && (
												<a
													href={primaryLink}
													target="_blank"
													rel="noopener noreferrer"
													className="pa-open-badge"
													aria-label={`Open ${project.title || project.name}`}
													title="Open project"
												>
													<FaArrowUpRightFromSquare />
												</a>
											)}
										</div>

										{/* Project Card Content */}
										<div className="pa-card-body">
											{/* Category Metadata Indicator */}
											<div className="pa-category-tag">
												<span className="pa-category-dot" aria-hidden="true" />
												<span className="pa-category-text">
													{project.category || "FULL-STACK"}
												</span>
											</div>

											{/* Project Title */}
											<h3 className="pa-card-title">
												{project.title || project.name}
											</h3>

											{/* Short 1–2 Line Description */}
											<p className="pa-card-desc">
												{project.shortDescription ||
													(Array.isArray(project.description)
														? project.description[0]
														: project.description)}
											</p>

											{/* Technology Pills */}
											<div className="pa-card-techs">
												{techList.slice(0, 4).map((tech, tIdx) => {
													const TechIcon = getTechIcon(tech);
													return (
														<span
															key={`${tech}-${tIdx}`}
															className="pa-card-tech-pill"
															title={tech}
														>
															<span className="pa-card-tech-pill__icon">
																<TechIcon />
															</span>
															<span>{tech}</span>
														</span>
													);
												})}
											</div>

											{/* Bottom Action Links */}
											<div className="pa-card-actions">
												{primaryLink ? (
													<a
														href={primaryLink}
														target="_blank"
														rel="noopener noreferrer"
														className="pa-action-link pa-action-link--primary"
													>
														<span>{hasLive ? "Live Demo" : "View Details"}</span>
														<FaArrowRight className="pa-action-link__arrow" />
													</a>
												) : (
													<span className="pa-action-link" style={{ opacity: 0.5, cursor: "default" }}>
														<span>In Development</span>
													</span>
												)}

												{githubLink && (
													<a
														href={githubLink}
														target="_blank"
														rel="noopener noreferrer"
														className="pa-action-link pa-action-link--github"
														aria-label={`View ${project.title || project.name} source code on GitHub`}
													>
														<span>GitHub</span>
														<FaArrowUpRightFromSquare className="pa-action-link__arrow" />
													</a>
												)}
											</div>
										</div>
									</motion.article>
								);
							})
						) : (
							<div className="pa-empty">
								<FaFolderOpen className="pa-empty__icon" />
								<h3 className="pa-empty__title">No projects found</h3>
								<p className="pa-empty__desc">
									No matches for "{searchQuery || activeCategory}". Try searching with different keywords.
								</p>
								<button
									type="button"
									className="pa-empty__btn"
									onClick={() => {
										setSearchQuery("");
										setActiveCategory("All");
									}}
								>
									Reset filters
								</button>
							</div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</div>
	);
};

export default ProjectArchive;
