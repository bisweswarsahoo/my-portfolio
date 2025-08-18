import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Card from "./Card";
import jabszlogo from "../assets/jabsz-logo.png";

const experienceItems = [
	{
		title: "Web Development Intern",
		organization: "Jabsz Gaming Studios LLP",
		location: "Gurugram, India",
		duration: "May 2025 – July 2025",
		details: [
			"Engineered and optimized core gameplay mechanics using TypeScript and Phaser.js (player controls, collision detection, arena logic) for 2D arcade title 'Engulf' delivering fluid playability",
			"Architected intelligent interactive bot opponents with nuanced behavior trees to elevate challenge dynamics",
			"Designed, developed and integrated UI flows (pause, main menu, game over) ensuring consistent state + scene transitions",
			"Refined asset management pipelines improving maintainability & load performance of game resources",
			"Led initial project setup, authored system architecture docs, enforced GitHub PR/code review standards",
		],
		icon: jabszlogo,
	},
];

const Experience = () => {
	return (
		<>
			<h1 style={{ display: "flex", justifyContent: "center" }}>Experience</h1>
			<VerticalTimeline>
				{experienceItems.map((item, idx) => (
					<Card
						key={idx}
						{...item}
					/>
				))}
			</VerticalTimeline>
		</>
	);
};

export default Experience;
