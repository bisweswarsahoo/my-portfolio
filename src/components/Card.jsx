import { useState } from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Card = ({ title, organization, duration, location, details, icon }) => {
	const [lineColor, setLineColor] = useState("var(--primary)");

	return (
		<VerticalTimelineElement
			date={duration}
			iconStyle={{
				color: "var(--text-primary)",
				backgroundColor: "var(--background-secondary)",
				boxShadow: "var(--shadow-medium)",
			}}
			icon={
				<img
					src={icon}
					alt="icon"
					style={{ width: "100%", height: "100%", borderRadius: "50%" }}
				/>
			}
			contentStyle={{
				background: "var(--background-card)",
				borderRadius: "25px",
				boxShadow: `0 0 20px ${lineColor}`,
				borderTop: `4px solid ${lineColor}`,
			}}
			contentArrowStyle={{ borderRight: `7px solid var(--background-card)` }}
		>
			<h1
				style={{
					color: "var(--text-primary)",
					margin: "0 0 1rem 0",
					fontSize: "1.5rem",
					fontWeight: "600",
				}}
			>
				{title}
			</h1>
			<h2
				style={{
					color: "var(--text-secondary)",
					margin: "0 0 0.75rem 0",
					fontSize: "1.25rem",
					fontWeight: "500",
				}}
			>
				{organization}
			</h2>
			<h3
				style={{
					color: "var(--text-tertiary)",
					margin: "0 0 0.75rem 0",
					fontSize: "1.125rem",
					fontWeight: "400",
				}}
			>
				{location}
			</h3>
			<div
				style={{
					color: "var(--text-secondary)",
					margin: "0",
					fontSize: "0.875rem",
					lineHeight: "1.5",
				}}
			>
				{Array.isArray(details) ? (
					<ul style={{ margin: "0", paddingLeft: "1.25rem" }}>
						{details.map((detail, index) => (
							<li
								key={index}
								style={{ marginBottom: "0.5rem" }}
							>
								{detail}
							</li>
						))}
					</ul>
				) : (
					details
				)}
			</div>
		</VerticalTimelineElement>
	);
};

export default Card;
