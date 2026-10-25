import "../styles/SocialInfo.css";
import { LuGithub, LuLinkedin, LuMail, LuInstagram } from "react-icons/lu";
import portfolioData from "../data/portfolioData.js";
import { sanitizeUrl } from "../utils/security.js";

const XIcon = (props) => (
	<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...props}>
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);

const DiscordIcon = (props) => (
	<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...props}>
		<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
	</svg>
);

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
			icon: LuGithub,
		},
		{
			id: "linkedin",
			name: "LinkedIn",
			description: "Let's connect professionally",
			href: sanitizeUrl(portfolioData.linkedin, "https://linkedin.com/in/bisweswarsahoo"),
			icon: LuLinkedin,
		},
		{
			id: "x",
			name: "X",
			description: "Thoughts & updates",
			href: sanitizeUrl(twitterItem?.href, "https://x.com/bisweswarsahoo"),
			icon: XIcon,
		},
		{
			id: "email",
			name: "Email",
			description: "Drop me a message",
			href: sanitizeUrl(`mailto:${portfolioData.email}`, "mailto:bisweswarsahoo.jsg@gmail.com"),
			icon: LuMail,
		},
	];

	const secondarySocials = [
		discordItem && {
			name: "Discord",
			href: sanitizeUrl(discordItem.href, "#"),
			icon: DiscordIcon,
		},
		instagramItem && {
			name: "Instagram",
			href: sanitizeUrl(instagramItem.href, "#"),
			icon: LuInstagram,
		},
	].filter(Boolean);

	return (
		<div className="social-modules-container">
			<div className="social-cards-list">
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
