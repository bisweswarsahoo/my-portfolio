import React from "react";
import defaultMilestoneBg from "../assets/Futuristic AI Developer with Holographic UI.png";
import {
	LuTrophy,
	LuGraduationCap,
	LuBriefcase,
	LuExternalLink,
	LuMapPin,
	LuAward,
	LuLink,
	LuArrowRight,
} from "react-icons/lu";

/**
 * MilestoneCard
 * Renders an individual milestone on the horizontal timeline.
 * Features cinematic blended background image with directional gradients.
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
	partnerLogos = [],
	proofUrl,
	tags = [],
	isActive = false,
	position = "bottom",
	bgImage,
	descriptionText,
	referenceBadge,
	onReferenceClick,
	eraBadge,
	onEraClick,
	eraAnchorBadge,
}) => {
	const getCategoryClass = () => {
		switch (type) {
			case "founder":
			case "startup":
				return "journey-card__category--founder";
			case "experience":
			case "internship":
				return "journey-card__category--internship";
			case "education":
				return "journey-card__category--education";
			case "commencement":
				return "journey-card__category--commencement";
			case "competition":
				return "journey-card__category--competition";
			default:
				return "";
		}
	};

	const cardBackground = bgImage || defaultMilestoneBg;

	return (
		<div
			className={`journey-card journey-card--${position} ${isActive ? "is-active" : ""}`}
			role="article"
			aria-label={`${title} at ${organization || "portfolio"}`}
		>
			{/* 1. Base Layer: Cinematic Background Image */}
			<div
				className="journey-card__bg-image"
				style={cardBackground ? { backgroundImage: `url("${cardBackground}")` } : undefined}
				aria-hidden="true"
			/>

			{/* 2. Directional Gradient Blending & Atmospheric Tint Layer */}
			<div className="journey-card__bg-overlay" aria-hidden="true" />

			{/* 3. Foreground Card Content Layer */}
			<div className="journey-card__content">
				{/* Top Header: Category Tag & Icon / Logos */}
				<div className="journey-card__header">
					<span className={`journey-card__category ${getCategoryClass()}`}>
						{categoryLabel || (type === "experience" ? "INTERNSHIP" : type === "competition" ? "COMPETITION" : "EDUCATION")}
					</span>

					{icon || (partnerLogos && partnerLogos.length > 0) ? (
						<div className="journey-card__logos-group">
							{icon && (
								<img
									src={icon}
									alt={organization || title || "logo"}
									className="journey-card__logo"
									loading="lazy"
								/>
							)}
							{partnerLogos && partnerLogos.map((pLogo, pIdx) => (
								<img
									key={pIdx}
									src={pLogo}
									alt="partner logo"
									className="journey-card__logo journey-card__logo--partner"
									loading="lazy"
								/>
							))}
						</div>
					) : type === "competition" ? (
						<LuTrophy className="journey-card__trophy-icon" aria-hidden="true" />
					) : type === "education" || type === "commencement" ? (
						<LuGraduationCap className="journey-card__edu-icon" aria-hidden="true" />
					) : (
						<LuBriefcase className="journey-card__edu-icon" aria-hidden="true" />
					)}
				</div>

			{/* Body: Title, Org, Duration / Badges */}
			<div className="journey-card__body">
				<h3 className="journey-card__title">{title}</h3>

				{organization && (
					<p className="journey-card__org">
						{organization}
					</p>
				)}

				{descriptionText && (
					<p className="journey-card__description">
						{descriptionText}
					</p>
				)}

				<div className="journey-card__meta-bar">
					{location && (
						<span className="journey-card__pill">
							<LuMapPin className="journey-card__pill-icon" aria-hidden="true" />
							{location}
						</span>
					)}

					{result && (
						<span className="journey-card__pill journey-card__pill--result">
							<LuAward className="journey-card__pill-icon journey-card__pill-icon--award" aria-hidden="true" />
							{result}
						</span>
					)}

					{grade && (
						<span className="journey-card__pill journey-card__pill--grade">
							{grade}
						</span>
					)}

					{eraBadge && (
						<button
							type="button"
							className="journey-card__pill journey-card__pill--era"
							onClick={(e) => {
								e.stopPropagation();
								onEraClick?.();
							}}
							title="View Undergraduate Degree Milestone"
						>
							<LuGraduationCap className="journey-card__pill-icon" aria-hidden="true" />
							<span>{eraBadge}</span>
						</button>
					)}

					{eraAnchorBadge && (
						<span className="journey-card__pill journey-card__pill--era-anchor">
							<LuGraduationCap className="journey-card__pill-icon" aria-hidden="true" />
							<span>{eraAnchorBadge}</span>
						</span>
					)}

					{referenceBadge && (
						<button
							type="button"
							className="journey-card__pill journey-card__pill--reference"
							onClick={(e) => {
								e.stopPropagation();
								onReferenceClick?.();
							}}
							title="Jump to linked degree milestone"
						>
							<LuLink className="journey-card__pill-icon" aria-hidden="true" />
							<span>{referenceBadge.label}</span>
							<LuArrowRight className="journey-card__pill-arrow" aria-hidden="true" />
						</button>
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
							aria-label={`Visit / verify milestone: ${title}`}
						>
							<span>{type === "founder" || categoryLabel?.toLowerCase().includes("founder") || categoryLabel?.toLowerCase().includes("studio") ? "Visit Studio Website" : "Verify / View Post"}</span>
							<LuExternalLink className="journey-card__link-icon" aria-hidden="true" />
						</a>
					)}
				</div>
			)}
			</div>
		</div>
	);
};

export default MilestoneCard;
