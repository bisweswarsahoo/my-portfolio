import "../styles/SocialInfo.css";
import {
	FaInstagram,
	FaTwitter,
	FaGithub,
	FaDiscord,
	FaLinkedin,
} from "react-icons/fa";

const SocialInfo = () => {
	const socialData = [
		{
			icon: FaInstagram,
			className: "instagram",
			cardClass: "card1",
			img: "IG",
			name: "Instagram",
			username: "@_bisweswarsahoo_",
			about: "Follow for updates",
			text: "Instagram",
			href: "#",
		},
		{
			icon: FaTwitter,
			className: "twitter",
			cardClass: "card2",
			img: "TW",
			name: "Twitter",
			username: "@bisweswarsahoo",
			about: "Latest tweets",
			text: "Twitter",
			href: "#",
		},
		{
			icon: FaGithub,
			className: "github",
			cardClass: "card3",
			img: "GH",
			name: "GitHub",
			username: "@bisweswarsahoo",
			about: "15+ Repositories",
			text: "GitHub",
			href: "https://github.com/bisweswarsahoo",
		},
		{
			icon: FaDiscord,
			className: "discord",
			cardClass: "card4",
			img: "DC",
			name: "Discord",
			username: "@bisweswarsahoo",
			about: "Join the community",
			text: "Discord",
			href: "#",
		},
		{
			icon: FaLinkedin,
			className: "linkedin",
			cardClass: "card5",
			img: "LI",
			name: "LinkedIn",
			username: "@bisweswarsahoo",
			about: "Professional network",
			text: "LinkedIn",
			href: "https://linkedin.com/in/bisweswarsahoo",
		},
	];

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
