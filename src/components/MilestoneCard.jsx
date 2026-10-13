import React from "react";
import {
	LuTrophy,
	LuGraduationCap,
	LuBriefcase,
	LuExternalLink,
	LuMapPin,
	LuAward,
} from "react-icons/lu";

/**
 * MilestoneCard
 * Renders an individual milestone on the horizontal timeline.
 * Compact, sleek card without lengthy description bodies for high visual clarity.
 */
const MilestoneCard = ({
	type = "general",
	categoryLabel,
	title,
	organization,
	location,
	duration,
	grade,
	result,
	icon,
	proofUrl,
	tags = [],
	isActive = false,
	position = "bottom",
}) => {
	const getCategoryClass = () => {
		switch (type) {
			case "experience":
			case "internship":
				return "journey-card__category--internship";
			case "education":
				return "journey-card__category--education";
			case "competition":
				return "journey-card__category--competition";
			default:
				return "";
		}
	};

	return (
		<div
			className={`journey-card journey-card--${position} ${isActive ? "is-active" : ""}`}
			tabIndex={0}
			role="article"
			aria-label={`${title} at ${organization || "portfolio"}`}
		>
			{/* Top Header: Category Tag & Icon / Logo */}
			<div className="journey-card__header">
				<span className={`journey-card__category ${getCategoryClass()}`}>
					{categoryLabel || (type === "experience" ? "INTERNSHIP" : type === "competition" ? "COMPETITION" : "EDUCATION")}
				</span>

				<div className="journey-card__icon-box">
					{icon ? (
						<img
							src={icon}
							alt={organization || title || "logo"}
							className="journey-card__logo"
							loading="lazy"
						/>
					) : type === "competition" ? (
						<LuTrophy className="journey-card__trophy-icon" aria-hidden="true" />
					) : type === "education" ? (
						<LuGraduationCap className="journey-card__edu-icon" aria-hidden="true" />
					) : (
						<LuBriefcase className="journey-card__edu-icon" aria-hidden="true" />
					)}
				</div>
			</div>

			{/* Body: Title, Org, Duration / Badges */}
			<div className="journey-card__body">
				<h3 className="journey-card__title">{title}</h3>

				{organization && (
					<p className="journey-card__org">
						{organization}
					</p>
				)}

				<div className="journey-card__meta-bar">
					{location && (
						<span className="journey-card__pill">
							<LuMapPin style={{ fontSize: "0.8rem", color: "#64748b" }} />
							{location}
						</span>
					)}

					{result && (
						<span className="journey-card__pill journey-card__pill--result">
							<LuAward style={{ fontSize: "0.85rem" }} />
							{result}
						</span>
					)}

					{grade && (
						<span className="journey-card__pill journey-card__pill--grade">
							{grade}
						</span>
					)}
				</div>
			</div>

			{/* Footer: Tech tags and external proof links */}
			{(tags.length > 0 || proofUrl) && (
				<div className="journey-card__footer">
					{tags.length > 0 && (
						<div className="journey-card__tags">
							{tags.map((tag, idx) => (
								<span key={idx} className="journey-card__tag">
									#{tag}
								</span>
							))}
						</div>
					)}

					{proofUrl && (
						<a
							href={proofUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="journey-card__link"
							aria-label={`Verify milestone: ${title}`}
						>
							<span>Verify / View Post</span>
							<LuExternalLink style={{ fontSize: "0.8rem" }} />
						</a>
					)}
				</div>
			)}
		</div>
	);
};

export default MilestoneCard;
