import "../styles/Footer.css";
import SocialInfo from "./SocialInfo";
import portfolioData from "../data/portfolioData.js";
import CVCard from "./CVCard";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer
			className="footer"
			id="about"
		>
			<div className="footer-content">
				<h2 className="footer-name">{portfolioData.about.heading}</h2>
				<div className="footer-about-text">
					{portfolioData.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
				</div>

				<div className="footer-socials-container">
					<SocialInfo />
				</div>
			</div>
			<CVCard />

			<div
				className="footer-bottom-wrapper"
				aria-hidden="false"
			>
				<div className="footer-bottom-container">
					{/* Copyright */}
					<p className="footer-copyright">
						&copy; {currentYear}{" "}
						<span className="footer-copyright-name">{portfolioData.name}</span>. All
						rights reserved.
					</p>

					{/* Disclaimer */}
					<p className="footer-disclaimer">
						{portfolioData.about.disclaimer}
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
