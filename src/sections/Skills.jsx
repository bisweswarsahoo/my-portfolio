import "../styles/Skills.css";

import portfolioData from "../data/portfolioData.js";

const skillName = (skill) => (typeof skill === "string" ? skill : skill.name);
const skillIcon = (skill) => {
	if (typeof skill === "string") return null;
	const Icon = skill.icon;
	return Icon ? <Icon color={skill.color || "currentColor"} aria-hidden="true" /> : null;
};

const Skills = () => {
	const visibleGroups = portfolioData.skills
		.filter((group) => group.category && group.items?.some(Boolean))
		.map((group) => ({ ...group, items: group.items.filter(Boolean) }));
	if (!visibleGroups.length) return null;

	return (
	<section className="skills-section">
		<h2 className="skills-title">
			I have experience with these technical skills.
		</h2>
		<div className="skills-list">
			{visibleGroups.map((group) => (
				<div
					className="skills-group"
					key={group.category}
				>
					<h3 className="skills-group-title">{group.category}</h3>
					<ul className="skills-icons">
						{group.items.map((skill) => {
							const name = skillName(skill);
							if (!name) return null;
							return (
								<li
									className="skills-icon-item"
									key={name}
									title={name}
								>
									<span className="skills-icon-svg">{skillIcon(skill)}</span>
									<span className="skills-icon-label">{name}</span>
								</li>
							);
						})}
					</ul>
				</div>
			))}
		</div>
	</section>
 	);
};

export default Skills;
