import Card from "../components/Card";
import { VerticalTimeline } from "react-vertical-timeline-component";
import amitylogo from "../assets/amity-university-logo.png";
import adyantlogo from "../assets/adyant-logo.png";
import schoollogo from "../assets/sri-aurobindo-integral-education-logo.png";

const Education = () => {
	return (
		<>
			<h1 style={{ display: "flex", justifyContent: "center" }}>Education</h1>
			<VerticalTimeline>
				<Card
					title="Bachelor of Technology (B. Tech) in Computer Science & Engineering"
					organization="Amity University"
					location="Noida, India"
					details="CGPA: 8.28"
					duration="2022 - 2026"
					icon={amitylogo}
				/>
				<Card
					title="Senior Secondary School (Class 12th)"
					organization="Adyant Higher Secondary School"
					location="Bhubaneswar, India"
					details="Percentage: 81%"
					duration="2020 - 2022"
					icon={adyantlogo}
				/>
				<Card
					title="Secondary School (Class 10th)"
					organization="C.A.M.I.E & R Matrujyoti"
					location="Jharsuguda, India"
					details="Percentage: 78.6%"
					duration="2020"
					icon={schoollogo}
				/>
			</VerticalTimeline>
		</>
	);
};

export default Education;
