import {
	FaReact,
	FaNodeJs,
	FaJava,
	FaPython,
	FaCuttlefish,
	FaGithub,
	FaGitAlt,
	FaTerminal,
	FaHtml5,
	FaCss3Alt,
	FaBootstrap,
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
	SiTypescript,
	SiMysql,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import "../styles/Skills.css";

const skillsData = [
	{
		category: "Programming Languages",
		skills: [
			{ name: "JavaScript", icon: <SiJavascript color="#F0DB4F" /> },
			{ name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
			{ name: "Java", icon: <FaJava color="#007396" /> },
			{ name: "Python", icon: <FaPython color="#3776AB" /> },
			{ name: "C", icon: <FaCuttlefish color="#A8B9CC" /> },
			{ name: "C++", icon: <SiCplusplus color="#00599C" /> },
		],
	},
	{
		category: "Web Development",
		skills: [
			{ name: "HTML", icon: <FaHtml5 color="#E34F26" /> },
			{ name: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
			{ name: "Node.js", icon: <FaNodeJs color="#339933" /> },
			{ name: "React.js", icon: <FaReact color="#61DAFB" /> },
			{ name: "Redux", icon: <SiRedux color="#764ABC" /> },
		],
	},
	{
		category: "Frameworks & Libraries",
		skills: [
			{ name: "Phaser.js", icon: <SiJavascript color="#FFCB05" /> },
			{ name: "Bootstrap", icon: <FaBootstrap color="#7952B3" /> },
			{ name: "React Native", icon: <FaReact color="#61DAFB" /> },
			{ name: "Express.js", icon: <SiExpress color="#000000" /> },
			{ name: "leaflet.js", icon: <SiJavascript color="#199900" /> },
		],
	},
	{
		category: "Databases",
		skills: [
			{ name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
			{ name: "MySQL", icon: <SiMysql color="#4479A1" /> },
		],
	},
	{
		category: "Tools & Technologies",
		skills: [
			{ name: "Git", icon: <FaGitAlt color="#F05032" /> },
			{ name: "GitHub", icon: <FaGithub color="#181717" /> },
			{ name: "VS Code", icon: <VscVscode color="#007ACC" /> },
			{ name: "Android Studio", icon: <SiAndroidstudio color="#3DDC84" /> },
			{ name: "Postman", icon: <SiPostman color="#FF6C37" /> },
			{ name: "Hoppscotch", icon: <SiHoppscotch color="#FF7E6B" /> },
			{ name: "Terminal", icon: <FaTerminal color="#4D4D4D" /> },
		],
	},
];

const Skills = () => (
	<section className="skills-section">
		<h2 className="skills-title">
			I have experience with these technical skills.
		</h2>
		<div className="skills-list">
			{skillsData.map((group, idx) => (
				<div
					className="skills-group"
					key={idx}
				>
					<h3 className="skills-group-title">{group.category}</h3>
					<ul className="skills-icons">
						{group.skills.map((skill, i) => (
							<li
								className="skills-icon-item"
								key={i}
								title={skill.name}
							>
								<span className="skills-icon-svg">{skill.icon}</span>
								<span className="skills-icon-label">{skill.name}</span>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	</section>
);

export default Skills;
