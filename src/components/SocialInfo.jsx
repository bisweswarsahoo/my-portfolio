import "../styles/SocialInfo.css";
import {
	FaInstagram,
	FaTwitter,
	FaGithub,
	FaDiscord,
	FaLinkedin,
} from "react-icons/fa";
import portfolioData from "../data/portfolioData.js";

const SocialInfo = () => {
	const iconData = {
		instagram: { icon: FaInstagram, className: "instagram", cardClass: "card1", img: "IG" },
		twitter: { icon: FaTwitter, className: "twitter", cardClass: "card2", img: "TW" },
		github: { icon: FaGithub, className: "github", cardClass: "card3", img: "GH" },
		discord: { icon: FaDiscord, className: "discord", cardClass: "card4", img: "DC" },
		linkedin: { icon: FaLinkedin, className: "linkedin", cardClass: "card5", img: "LI" },
	};
	const socialData = portfolioData.socials.map((social) => ({ ...iconData[social.key], ...social }));

	return (
		<div className="main">
			{socialData.map((social, index) => {
				const IconComponent = social.icon;
				return (
					<div
						key={index}
						className="tooltip-container"
					>
						<div className="tooltip">
							<div className="profile">
								<div className="user">
									<div className="img">{social.img}</div>
									<div className="details">
										<div className="name">{social.name}</div>
										<div className="username">{social.username}</div>
									</div>
								</div>
								<div className="about">{social.about}</div>
							</div>
						</div>
						<a
							href={social.href}
							className={`icon ${social.cardClass}`}
						>
							<div className="layer">
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span className="fab">
									<IconComponent
										className={social.className}
										size={30}
									/>
								</span>
							</div>
							<div className="text">{social.text}</div>
						</a>
					</div>
				);
			})}
		</div>
	);
};

export default SocialInfo;
