import React from "react";
import { getTechIcon } from "../tech/TechnologyIcons";

const TechnologyPills = ({ technologies = [] }) => {
	if (!technologies || !technologies.length) return null;

	return (
		<div className="ps-tech-pills">
			{technologies.map((tech, index) => {
				const Icon = getTechIcon(tech);
				return (
					<div
						key={`${tech}-${index}`}
						className="ps-tech-pill"
						title={tech}
					>
						<span className="ps-tech-pill__icon">
							<Icon />
						</span>
						<span className="ps-tech-pill__name">{tech}</span>
					</div>
				);
			})}
		</div>
	);
};

export default TechnologyPills;
