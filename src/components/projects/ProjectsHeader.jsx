import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const ProjectsHeader = ({ totalProjects = 5 }) => {
	const navigate = useNavigate();

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
					onClick={() => navigate("/projects")}
					aria-label="View all archived projects"
				>
					<span>Archive ({totalProjects})</span>
					<FaArrowRight className="ps-archive-btn__icon" />
				</button>
			</div>
		</header>
	);
};

export default ProjectsHeader;
