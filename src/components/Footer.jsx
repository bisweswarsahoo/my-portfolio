import "../styles/Footer.css";
import { useState, useRef, useEffect, useCallback } from "react";
import SocialInfo from "./SocialInfo";
import portfolioData from "../data/portfolioData.js";
import ResumeCard from "./ResumeCard";

const defaultFallbackCoords = {
	width: 1100,
	height: 290,
	starts: [
		{ x: 340, y: 34 },
		{ x: 340, y: 102 },
		{ x: 340, y: 170 },
		{ x: 340, y: 238 },
	],
	mid: { x: 530, y: 136 },
	target: { x: 720, y: 136 },
};

const Footer = () => {
	const currentYear = new Date().getFullYear();
	const [activeHoverIndex, setActiveHoverIndex] = useState(null);
	const [isCardHovered, setIsCardHovered] = useState(false);
	const [isFlipped, setIsFlipped] = useState(false);

	const stageRef = useRef(null);
	const cardRefs = useRef([]);
	const cvCardRef = useRef(null);
	const [bridgeCoords, setBridgeCoords] = useState(defaultFallbackCoords);

	// Measure exact connection coordinates between Social Cards and CV Card
	const updateBridgeCoords = useCallback(() => {
		if (!stageRef.current || !cvCardRef.current) return;
		const stageRect = stageRef.current.getBoundingClientRect();
		const cvRect = cvCardRef.current.getBoundingClientRect();

		// On mobile, layout stacks vertically
		if (stageRect.width < 768) {
			return;
		}

		const starts = cardRefs.current.map((cardEl) => {
			if (!cardEl) return null;
			const nodeEl = cardEl.querySelector(".social-card-node") || cardEl;
			const r = nodeEl.getBoundingClientRect();
			return {
				x: Math.round(r.left + r.width / 2 - stageRect.left),
				y: Math.round(r.top + r.height / 2 - stageRect.top),
			};
		});

		if (starts.some((s) => s === null)) return;

		const targetX = Math.round(cvRect.left - stageRect.left);
		const targetY = Math.round(cvRect.top + cvRect.height / 2 - stageRect.top);

		// Only update if CV card is to the right of social cards
		if (targetX <= starts[0].x + 30) {
			return;
		}

		const midX = Math.round(starts[0].x + (targetX - starts[0].x) * 0.52);
		const midY = targetY;

		setBridgeCoords({
			width: Math.round(stageRect.width),
			height: Math.round(stageRect.height),
			starts,
			mid: { x: midX, y: midY },
			target: { x: targetX, y: targetY },
		});
	}, []);

	useEffect(() => {
		updateBridgeCoords();
		const raf = requestAnimationFrame(updateBridgeCoords);
		const t1 = setTimeout(updateBridgeCoords, 80);
		const t2 = setTimeout(updateBridgeCoords, 300);

		window.addEventListener("resize", updateBridgeCoords);

		let ro;
		if (typeof ResizeObserver !== "undefined" && stageRef.current) {
			ro = new ResizeObserver(() => updateBridgeCoords());
			ro.observe(stageRef.current);
			if (cvCardRef.current) ro.observe(cvCardRef.current);
		}

		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(t1);
			clearTimeout(t2);
			window.removeEventListener("resize", updateBridgeCoords);
			if (ro) ro.disconnect();
		};
	}, [updateBridgeCoords]);

	const scrollToSection = (id) => {
		if (id === "home") {
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}
		const element = document.getElementById(id);
		if (element) {
			const y = element.getBoundingClientRect().top + window.scrollY - 80;
			window.scrollTo({ top: y, behavior: "smooth" });
		} else if (id === "contact") {
			const footer = document.getElementById("contact");
			footer?.scrollIntoView({ behavior: "smooth" });
		}
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const coords = bridgeCoords || defaultFallbackCoords;

	return (
		<footer className="footer" id="contact">
			{/* Ambient background glows & micro-particles */}
			<div className="footer-atmosphere" aria-hidden="true">
				<div className="ambient-glow glow-top-left" />
				<div className="ambient-glow glow-center-blue" />
				<div className="ambient-glow glow-bottom-right" />
				<div className="ambient-particles" />
			</div>

			<div className="footer-inner-container">
				{/* ================= 1. CONTACT HERO HEADER ================= */}
				<div className="footer-hero-header">
					{/* Upper-left status pill */}
					<div className="contact-status-pill" aria-label="Status: Currently Building">
						<span className="status-dot" aria-hidden="true" />
						<span className="status-text">CURRENTLY BUILDING</span>
					</div>

					{/* Large bold heading */}
					<h2 className="contact-heading">
						<span className="heading-lets">LET'S </span>
						<span className="heading-connect">CONNECT</span>
					</h2>

					{/* Subheading copy */}
					<p className="contact-subtext">
						Have an idea, a project, or just want to say hi?
						<br />
						Let's build something amazing.
					</p>
				</div>

				{/* ================= 2. INTERACTIVE SHOWCASE STAGE ================= */}
				<div className="footer-interactive-stage" ref={stageRef}>
					{/* Left Column: Vertical Social Cards */}
					<div className="stage-social-col">
						<SocialInfo
							activeHoverIndex={activeHoverIndex}
							onHoverIndex={setActiveHoverIndex}
							cardRefs={cardRefs}
						/>
					</div>

					{/* DYNAMIC SVG CONNECTION BRIDGE (Overlays across the stage) */}
					<svg
						className={`connector-overlay-svg ${
							activeHoverIndex !== null ? "has-active" : ""
						} ${isCardHovered ? "card-hovered" : ""}`}
						viewBox={`0 0 ${coords.width} ${coords.height}`}
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<defs>
							<filter id="bridgeLineGlow" x="-30%" y="-30%" width="160%" height="160%">
								<feGaussianBlur stdDeviation="3.5" result="blur" />
								<feMerge>
									<feMergeNode in="blur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>

							<marker
								id="bridgeArrow"
								viewBox="0 0 10 10"
								refX="8"
								refY="5"
								markerWidth="6"
								markerHeight="6"
								orient="auto"
							>
								<path d="M 0 1.5 L 8 5 L 0 8.5 z" className="bridge-arrow-path" />
							</marker>
						</defs>

						{/* 4 Connection Lines originating from each card's socket node */}
						{coords.starts.map((start, idx) => {
							const isActive = activeHoverIndex === idx;
							const mid = coords.mid;
							const dx = mid.x - start.x;
							// Smooth horizontal-exit and horizontal-entry cubic bezier
							const cp1X = start.x + dx * 0.45;
							const cp1Y = start.y;
							const cp2X = start.x + dx * 0.75;
							const cp2Y = mid.y;
							const d = `M ${start.x} ${start.y} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${mid.x} ${mid.y}`;

							return (
								<path
									key={idx}
									d={d}
									className={`bridge-path ${isActive ? "active" : ""}`}
								/>
							);
						})}

						{/* Common Trunk Line leading directly to the CV Card left rim */}
						<line
							x1={coords.mid.x}
							y1={coords.mid.y}
							x2={coords.target.x}
							y2={coords.mid.y}
							className={`bridge-trunk ${
								activeHoverIndex !== null || isCardHovered ? "active" : ""
							}`}
							markerEnd="url(#bridgeArrow)"
						/>

						{/* Glowing Convergence Node Dot */}
						<circle
							cx={coords.mid.x}
							cy={coords.mid.y}
							r={activeHoverIndex !== null || isCardHovered ? 5 : 3.5}
							className={`bridge-node ${
								activeHoverIndex !== null || isCardHovered ? "active" : ""
							}`}
						/>

						{/* Digital Identity Label Badge */}
						<g
							className="bridge-badge"
							transform={`translate(${coords.mid.x}, ${coords.mid.y - 18})`}
						>
							<rect
								x="-48"
								y="-9"
								width="96"
								height="18"
								rx="9"
								className="bridge-badge-pill"
							/>
							<text
								x="0"
								y="3.5"
								textAnchor="middle"
								className="bridge-badge-text"
							>
								DIGITAL IDENTITY
							</text>
						</g>
					</svg>

					{/* Right Column: Floating Résumé Card + Liquid Glass Pedestal */}
					<div className="stage-cv-col">
						<div className="cv-card-centering-wrap">
							<ResumeCard
								innerRef={cvCardRef}
								isCardHovered={isCardHovered}
								setIsCardHovered={setIsCardHovered}
								isFlippedControlled={isFlipped}
								onToggleFlip={() => setIsFlipped((prev) => !prev)}
							/>
						</div>

						{/* Sculpted Translucent Liquid/Glass Pedestal */}
						<div className="liquid-glass-pedestal" aria-hidden="true">
							<div className="liquid-glow-pool" />
							<div className="liquid-card-reflection" />
							<svg
								className="liquid-surface-svg"
								viewBox="0 0 380 96"
								preserveAspectRatio="none"
							>
								<defs>
									<radialGradient id="liquidBase" cx="50%" cy="50%" r="50%">
										<stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
										<stop offset="50%" stopColor="#0a192f" stopOpacity="0.45" />
										<stop offset="95%" stopColor="#03070d" stopOpacity="0.85" />
									</radialGradient>
									<linearGradient id="liquidRim" x1="0%" y1="0%" x2="100%" y2="0%">
										<stop offset="0%" stopColor="rgba(56, 189, 248, 0.05)" />
										<stop offset="50%" stopColor="rgba(56, 189, 248, 0.55)" />
										<stop offset="100%" stopColor="rgba(56, 189, 248, 0.05)" />
									</linearGradient>
								</defs>
								<ellipse cx="190" cy="48" rx="170" ry="38" fill="url(#liquidBase)" className="liquid-base-ellipse" />
								<ellipse
									cx="190"
									cy="48"
									rx="164"
									ry="34"
									fill="none"
									stroke="url(#liquidRim)"
									strokeWidth="1.2"
									className="liquid-rim-ellipse"
								/>
								<path
									className="liquid-ripple ripple-1"
									d="M 50 48 Q 120 42, 190 48 T 330 48"
									fill="none"
									stroke="rgba(56, 189, 248, 0.3)"
									strokeWidth="1"
								/>
								<path
									className="liquid-ripple ripple-2"
									d="M 70 51 Q 130 56, 190 51 T 310 51"
									fill="none"
									stroke="rgba(14, 165, 233, 0.2)"
									strokeWidth="1"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* ================= 3. FOOTER BOTTOM ================= */}
				<div className="footer-bottom-divider" aria-hidden="true" />

				<div className="footer-bottom-bar">
					{/* Left: Copyright */}
					<div className="footer-copyright-block">
						<p className="footer-copyright-text">
							&copy; 2026 <span className="copyright-author">{portfolioData.name}</span>. All rights reserved.
						</p>
						{portfolioData.about?.disclaimer && (
							<p className="footer-disclaimer-text">
								{portfolioData.about.disclaimer}
							</p>
						)}
					</div>

					{/* Center: Back to Top Glass Pill */}
					<button
						className="footer-back-to-top"
						onClick={scrollToTop}
						type="button"
						aria-label="Scroll back to top of page"
					>
						<span className="btt-arrow" aria-hidden="true">↑</span>
						<span className="btt-text">Back to top</span>
					</button>

					{/* Right: Navigation Links */}
					<nav className="footer-bottom-nav" aria-label="Footer Quick Navigation">
						<button
							onClick={() => scrollToSection("home")}
							className="footer-nav-btn"
							type="button"
						>
							Home
						</button>
						<button
							onClick={() => scrollToSection("projects")}
							className="footer-nav-btn"
							type="button"
						>
							Projects
						</button>
						<button
							onClick={() => scrollToSection("skills")}
							className="footer-nav-btn"
							type="button"
						>
							Skills
						</button>
						<button
							onClick={() => scrollToSection("about")}
							className="footer-nav-btn"
							type="button"
						>
							About
						</button>
						<button
							onClick={() => scrollToSection("contact")}
							className="footer-nav-btn"
							type="button"
						>
							Contact
						</button>
					</nav>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
