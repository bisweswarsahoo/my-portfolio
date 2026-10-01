import Card from "../components/Card";
import { VerticalTimeline } from "react-vertical-timeline-component";
import amitylogo from "../assets/amity-university-logo.png";
import adyantlogo from "../assets/adyant-logo.png";
import schoollogo from "../assets/sri-aurobindo-integral-education-logo.png";
import portfolioData from "../data/portfolioData.js";

const Education = () => {
	const visibleEducation = portfolioData.education.filter((item) =>
		item.degree || item.institution || item.years || item.grade,
	);
	if (!visibleEducation.length) return null;

	return (
		<>
			<h1 className="timeline-section-title">Education</h1>
			<VerticalTimeline>
				{visibleEducation.map((item, index) => (
					<Card
						key={item.degree}
						title={item.degree}
						organization={item.institution.split(", ")[0]}
						location={item.institution.split(", ").slice(1).join(", ")}
						details={item.grade}
						duration={item.years}
						icon={[amitylogo, adyantlogo, schoollogo][index]}
					/>
				))}
			</VerticalTimeline>
		</>
	);
};

export default Education;
