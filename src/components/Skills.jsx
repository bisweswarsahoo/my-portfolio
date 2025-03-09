import React from "react";

const skillsData = [
	{
		category: "Programming Languages",
		skills: ["JavaScript", "Java", "Python", "C", "C++"],
	},
	{
		category: "Web Development",
		skills: ["Node.js", "React.js", "MongoDB", "Express.js", "Redux"],
	},
	{ category: "Mobile Development", skills: ["React Native"] },
	{
		category: "Tools",
		skills: [
			"Git",
			"GitHub",
			"Terminal",
			"Postman",
			"Hoppscotch",
			"VS Code",
			"Android Studio",
		],
	},
];

const Skills = () => {
	return (
		<div style={{ marginBottom: "20px" }}>
			<h2
				style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}
			>
				Technical Skills
			</h2>
			<ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
				{skillsData.map((skill, index) => (
					<li
						key={index}
						style={{ marginBottom: "8px" }}
					>
						<strong>{skill.category}:</strong> {skill.skills.join(", ")}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Skills;
