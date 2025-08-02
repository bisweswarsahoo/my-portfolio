import React from "react";
import EducationCard from "./EducationCard";
import { VerticalTimeline } from "react-vertical-timeline-component";
import amitylogo from "../assets/amity-university-logo.png";
import adyantlogo from "../assets/adyant-logo.png";
import schoollogo from "../assets/sri-aurobindo-integral-education-logo.png";

const Education = () => {
	return (
		<>
			<h1 style={{ display: "flex", justifyContent: "center" }}>EDUCATION</h1>
			<VerticalTimeline>
				<EducationCard
					title="Bachelor of Technology (B. Tech) in Computer Science & Engineering"
					institution="Amity University, Noida"
					details="CGPA: 8.23"
					duration="2022 - 2026"
					iconSrc={amitylogo}
				/>
				<EducationCard
					title="Senior Secondary School (Class 12th)"
					institution="Adyant Higher Secondary School, Bhubaneswar"
					details="Percentage: 81%"
					duration="2020 - 2022"
					iconSrc={adyantlogo}
				/>
				<EducationCard
					title="Secondary School (Class 10th)"
					institution="C.A.M.L.E & R Matrujyoti, Jharsuguda"
					details="Percentage: 78.6%"
					duration="2020"
					iconSrc={schoollogo}
				/>
			</VerticalTimeline>
		</>
	);
};

export default Education;
