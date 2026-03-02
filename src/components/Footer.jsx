import "../styles/Footer.css";
import SocialInfo from "./SocialInfo";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer
			className="footer"
			id="about"
		>
			<div className="footer-content">
				<h2 className="footer-name">About Me</h2>
				<div className="footer-about-text">
					<p>
						Hello! I'm a passionate software developer with expertise in
						full-stack development, mobile applications, and cloud-based
						solutions. I love solving complex problems and creating scalable
						applications that make a difference.
					</p>
					<p>
						My technical skills include working with{" "}
						<strong>React, Node.js, Java, Python, MongoDB</strong> etc. I am
						always exploring new technologies and love collaborating on exciting
						projects.
					</p>
					<p>Feel free to check out my projects and connect with me!</p>
				</div>

				<div className="footer-socials-container">
					<SocialInfo />
				</div>
			</div>

			<div
				className="footer-bottom-wrapper"
				aria-hidden="false"
			>
				<div className="footer-bottom-container">
					{/* Copyright */}
					<p className="footer-copyright">
						&copy; {currentYear}{" "}
						<span className="footer-copyright-name">Bisweswar Sahoo</span>. All
						rights reserved.
					</p>

					{/* Disclaimer */}
					<p className="footer-disclaimer">
						Building scalable and impactful digital solutions
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
