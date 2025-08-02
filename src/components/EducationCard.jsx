import { useState } from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const EducationCard = ({ title, institution, duration, details, iconSrc }) => {
	const [lineColor, setLineColor] = useState("rgb(231, 127, 226)");

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const scrollY = window.scrollY;
	// 		if (scrollY < 200) {
	// 			setLineColor("rgb(185, 101, 181)");
	// 		} else if (scrollY < 400) {
	// 			setLineColor("rgb(187, 103, 183)");
	// 		} else if (scrollY < 600) {
	// 			setLineColor("rgb(88, 50, 87)");
	// 		} else {
	// 			setLineColor("rgb(24, 13, 23)");
	// 		}
	// 	};
	// 	window.addEventListener("scroll", handleScroll);
	// 	return () => window.removeEventListener("scroll", handleScroll);
	// }, []);
	return (
		<VerticalTimelineElement
			date={duration}
			iconStyle={{
				color: "#000",
				backgroundColor: "#fff",
				boxShadow: "0 0 20px rgb(211, 211, 211)",
			}}
			icon={
				<img
					src={iconSrc}
					alt="icon"
					style={{ width: "100%", height: "100%", borderRadius: "50%" }}
				/>
			}
			contentStyle={{
				background: "#0b0e16",
				borderRadius: "25px",
				boxShadow: `0 0 20px ${lineColor}`,
				borderTop: `4px solid ${lineColor}`,
			}}
			contentArrowStyle={{ borderRight: "7px solid #0b0e16" }}
		>
			<h1>{title}</h1>
			<h2 style={{ color: "grey" }}>{institution}</h2>
			<h3 style={{ fontSize: "14px" }}>{details}</h3>
		</VerticalTimelineElement>
	);
};

export default EducationCard;
