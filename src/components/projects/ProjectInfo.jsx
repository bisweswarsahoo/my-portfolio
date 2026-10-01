import React from "react";
import { FaArrowRight, FaArrowUpRightFromSquare, FaCheck } from "react-icons/fa6";
import TechnologyPills from "./TechnologyPills";

const ProjectInfo = ({
	project,
	currentIndex,
	totalProjects
}) => {
	if (!project) return null;

	const formattedCurrent = String(currentIndex + 1).padStart(2, "0");
	const formattedTotal = String(totalProjects).padStart(2, "0");

	const primaryUrl = project.liveUrl || project.liveDemo || project.github || project.sourceCode;
	const githubUrl = project.github || project.sourceCode;

	return (
		<div className="ps-info">
			{/* Project Counter */}
			<div className="ps-counter" aria-label={`Project ${currentIndex + 1} of ${totalProjects}`}>
				<span className="ps-counter__current">{formattedCurrent}</span>
				<span className="ps-counter__separator">/</span>
				<span className="ps-counter__total">{formattedTotal}</span>
			</div>

			{/* Category Indicator */}
			<div className="ps-category">
				<span className="ps-category__indicator" aria-hidden="true" />
				<span className="ps-category__text">{project.category || "FULL-STACK DEVELOPMENT"}</span>
			</div>

			{/* Project Title */}
			<h3 className="ps-title">{project.title || project.name}</h3>

			{/* Subtitle */}
			{project.subtitle && (
				<p className="ps-subtitle">{project.subtitle}</p>
			)}

			{/* Short Description */}
			<p className="ps-description">
				{project.shortDescription ||
					(Array.isArray(project.description)
						? project.description.slice(0, 2).join(" ")
						: project.description)}
			</p>

			{/* Technology Pills */}
			<div className="ps-tech-group">
				<TechnologyPills
					technologies={
						project.technologies ||
						(typeof project.techStack === "string"
							? project.techStack.split(", ").slice(0, 7)
							: [])
					}
				/>
			</div>

			{/* Feature List */}
			{project.features && project.features.length > 0 && (
				<div className="ps-features">
					<div className="ps-features__grid">
						{project.features.slice(0, 4).map((feat, idx) => (
							<div key={idx} className="ps-feature-item">
								<span className="ps-feature-item__check" aria-hidden="true">
									<FaCheck />
								</span>
								<span className="ps-feature-item__text">{feat}</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Project Actions */}
			<div className="ps-actions">
				{primaryUrl ? (
					<a
						href={primaryUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="ps-btn-primary"
						aria-label={`View project ${project.title || project.name}`}
					>
						<span>View Project</span>
						<FaArrowRight className="ps-btn-primary__arrow" />
					</a>
				) : (
					<button
						type="button"
						className="ps-btn-primary ps-btn-primary--disabled"
						disabled
						aria-label="Private or in-development project"
					>
						<span>In Development</span>
					</button>
				)}

				{githubUrl && (
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="ps-btn-secondary"
						aria-label={`View source code for ${project.title || project.name} on GitHub`}
					>
						<span>GitHub</span>
						<FaArrowUpRightFromSquare className="ps-btn-secondary__icon" />
					</a>
				)}
			</div>
		</div>
	);
};

export default ProjectInfo;
