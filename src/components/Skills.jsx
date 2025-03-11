import React from "react";
import {
	FaReact,
	FaNodeJs,
	FaJava,
	FaPython,
	FaCuttlefish,
	FaGithub,
	FaGitAlt,
	FaTerminal,
} from "react-icons/fa";
import {
	SiMongodb,
	SiExpress,
	SiRedux,
	SiPostman,
	SiAndroidstudio,
	SiHoppscotch,
	SiCplusplus,
	SiJavascript,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skillsData = [
	{
		category: "Programming Languages",
		skills: [
			{ name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
			{ name: "Java", icon: <FaJava color="#007396" /> },
			{ name: "Python", icon: <FaPython color="#3776AB" /> },
			{ name: "C", icon: <FaCuttlefish color="#A8B9CC" /> },
			{ name: "C++", icon: <SiCplusplus color="#00599C" /> },
		],
	},
	{
		category: "Web Development",
		skills: [
			{ name: "Node.js", icon: <FaNodeJs color="#339933" /> },
			{ name: "React", icon: <FaReact color="#61DAFB" /> },
			{ name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
			{ name: "Express.js", icon: <SiExpress color="#000000" /> },
			{ name: "Redux", icon: <SiRedux color="#764ABC" /> },
		],
	},
	{
		category: "Mobile Development",
		skills: [{ name: "React Native", icon: <FaReact color="#61DAFB" /> }],
	},
	{
		category: "Tools",
		skills: [
			{ name: "Git", icon: <FaGitAlt color="#F05032" /> },
			{ name: "GitHub", icon: <FaGithub color="#181717" /> },
			{ name: "Terminal", icon: <FaTerminal color="#4D4D4D" /> },
			{ name: "Postman", icon: <SiPostman color="#FF6C37" /> },
			{ name: "Hoppscotch", icon: <SiHoppscotch color="#FF7E6B" /> },
			{ name: "VS Code", icon: <VscVscode color="#007ACC" /> },
			{ name: "Android Studio", icon: <SiAndroidstudio color="#3DDC84" /> },
		],
	},
];

const Skills = () => {
	return (
		<div style={{ marginTop: "100px", marginBottom: "50px" }}>
			<h2
				style={{
					display: "flex",
					fontSize: "40px",
					fontWeight: "bold",
					marginBottom: "50px",
					justifyContent: "center",
				}}
			>
				I have experience with these technical skills.
			</h2>
			<div
				style={{
					listStyleType: "none",
					paddingLeft: "20px",
				}}
			>
				{skillsData.map((skill, index) => (
					<div
						key={index}
						style={{
							marginTop: "80px",
						}}
					>
						<div style={{ fontSize: "20px", fontWeight: 500 }}>
							{skill.category}
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								flexWrap: "wrap",
								gap: "100px",
								marginTop: "5px",
							}}
						>
							{skill.skills.map((s, idx) => (
								<div
									key={idx}
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									{s.icon && (
										<span style={{ fontSize: "150px" }}>{s.icon}</span>
									)}
									{s.name}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Skills;
