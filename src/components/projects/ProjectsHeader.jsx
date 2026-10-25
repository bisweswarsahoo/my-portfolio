import React from "react";
import { LuArrowRight } from "react-icons/lu";

const ProjectsHeader = ({ totalProjects = 5 }) => {
	const handleNavigate = () => {
		window.location.hash = "/projects";
	};

	return (
		<header className="ps-header">
			<div className="ps-header__center">
				<h2 className="ps-header__title">
					Projects
				</h2>

				<p className="ps-header__desc">
					Things I've built, learned from, and enjoyed creating.
				</p>
			</div>

			<div className="ps-header__right">
				<button
					type="button"
					className="ps-archive-btn"
					onClick={handleNavigate}
					aria-label="View all archived projects"
				>
					<span>Archive ({totalProjects})</span>
					<LuArrowRight className="ps-archive-btn__icon" />
				</button>
			</div>
		</header>
	);
};

export default ProjectsHeader;
