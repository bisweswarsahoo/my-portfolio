import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Card from "../components/Card";
import jabszlogo from "../assets/jabsz-logo.png";
import portfolioData from "../data/portfolioData.js";

const Work = () => {
	const visibleExperience = portfolioData.experience.filter((item) =>
		item.title || item.organization || item.location || item.duration || item.details?.some(Boolean),
	);
	if (!visibleExperience.length) return null;

	return (
		<>
			<h1 style={{ display: "flex", justifyContent: "center" }}>Experience</h1>
			<VerticalTimeline>
				{visibleExperience.map((item, idx) => (
					<Card
						key={idx}
						{...item}
						icon={jabszlogo}
					/>
				))}
			</VerticalTimeline>
		</>
	);
};

export default Work;
