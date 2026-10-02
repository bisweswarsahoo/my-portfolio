import "../styles/SocialInfo.css";
import {
	FaGithub,
	FaLinkedin,
	FaEnvelope,
	FaDiscord,
	FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import portfolioData from "../data/portfolioData.js";
import { sanitizeUrl } from "../utils/security.js";

const SocialInfo = ({ activeHoverIndex, onHoverIndex, cardRefs }) => {
	const twitterItem = portfolioData.socials.find((s) => s.key === "twitter");
	const discordItem = portfolioData.socials.find((s) => s.key === "discord");
	const instagramItem = portfolioData.socials.find((s) => s.key === "instagram");

	const socialCards = [
		{
			id: "github",
			name: "GitHub",
			description: "Check out my code",
			href: sanitizeUrl(portfolioData.github, "https://github.com/bisweswarsahoo"),
			icon: FaGithub,
		},
		{
			id: "linkedin",
			name: "LinkedIn",
			description: "Let's connect professionally",
			href: sanitizeUrl(portfolioData.linkedin, "https://linkedin.com/in/bisweswarsahoo"),
			icon: FaLinkedin,
		},
		{
			id: "x",
			name: "X",
			description: "Thoughts & updates",
			href: sanitizeUrl(twitterItem?.href, "https://x.com/bisweswarsahoo"),
			icon: FaXTwitter,
		},
		{
			id: "email",
			name: "Email",
			description: "Drop me a message",
			href: sanitizeUrl(`mailto:${portfolioData.email}`, "mailto:bisweswarsahoo.jsg@gmail.com"),
			icon: FaEnvelope,
		},
	];

	const secondarySocials = [
		discordItem && {
			name: "Discord",
			href: sanitizeUrl(discordItem.href, "#"),
			icon: FaDiscord,
		},
		instagramItem && {
			name: "Instagram",
			href: sanitizeUrl(instagramItem.href, "#"),
			icon: FaInstagram,
		},
	].filter(Boolean);

	return (
		<div className="social-modules-container">
			<div className="social-cards-list" role="list">
				{socialCards.map((card, index) => {
					const IconComponent = card.icon;
					const isHovered = activeHoverIndex === index;

					return (
						<a
							key={card.id}
							ref={(el) => {
								if (cardRefs && cardRefs.current) {
									cardRefs.current[index] = el;
								}
							}}
							href={card.href}
							target={card.href.startsWith("mailto:") ? "_self" : "_blank"}
							rel="noopener noreferrer"
							className={`social-glass-card ${isHovered ? "active-hover" : ""}`}
							onMouseEnter={() => onHoverIndex && onHoverIndex(index)}
							onMouseLeave={() => onHoverIndex && onHoverIndex(null)}
							onFocus={() => onHoverIndex && onHoverIndex(index)}
							onBlur={() => onHoverIndex && onHoverIndex(null)}
							role="listitem"
							aria-label={`${card.name}: ${card.description}`}
						>
							<div className="social-card-left">
								<div className="social-card-icon-frame">
									<IconComponent className="social-card-icon" />
								</div>
								<div className="social-card-text">
									<span className="social-card-name">{card.name}</span>
									<span className="social-card-desc">{card.description}</span>
								</div>
							</div>

							<div className="social-card-arrow-wrap" aria-hidden="true">
								<span className="social-card-arrow">↗</span>
							</div>

							{/* Connection line anchor indicator on the right edge */}
							<div className="social-card-node" aria-hidden="true" />
						</a>
					);
				})}
			</div>

			{/* Secondary channels from existing portfolioData */}
			{secondarySocials.length > 0 && (
				<div className="secondary-channels-row">
					<span className="secondary-channels-label">Also on:</span>
					{secondarySocials.map((item, idx) => {
						const SecIcon = item.icon;
						return (
							<a
								key={idx}
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								className="secondary-channel-pill"
								aria-label={item.name}
							>
								<SecIcon className="secondary-channel-icon" />
								<span>{item.name}</span>
							</a>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default SocialInfo;
