import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import "../styles/Languages.css";
import portfolioData from "../data/portfolioData.js";

// Deterministic starfield for consistent, subtle deep-space atmosphere
const STARS = [
	{ x: 5, y: 12, s: 1.2, o: 0.35, d: "4.2s" },
	{ x: 12, y: 28, s: 1.5, o: 0.45, d: "5.1s" },
	{ x: 8, y: 76, s: 1.0, o: 0.3, d: "3.7s" },
	{ x: 18, y: 88, s: 1.4, o: 0.4, d: "6.2s" },
	{ x: 22, y: 18, s: 0.9, o: 0.25, d: "4.8s" },
	{ x: 28, y: 64, s: 1.3, o: 0.35, d: "5.5s" },
	{ x: 38, y: 14, s: 1.6, o: 0.5, d: "3.9s" },
	{ x: 42, y: 82, s: 1.1, o: 0.3, d: "4.6s" },
	{ x: 58, y: 10, s: 1.4, o: 0.4, d: "5.8s" },
	{ x: 64, y: 90, s: 1.0, o: 0.25, d: "4.1s" },
	{ x: 74, y: 22, s: 1.5, o: 0.45, d: "3.5s" },
	{ x: 78, y: 72, s: 1.2, o: 0.35, d: "5.3s" },
	{ x: 86, y: 16, s: 1.1, o: 0.3, d: "4.7s" },
	{ x: 92, y: 35, s: 1.7, o: 0.55, d: "3.4s" },
	{ x: 88, y: 84, s: 1.3, o: 0.4, d: "6.0s" },
	{ x: 95, y: 68, s: 0.9, o: 0.2, d: "4.4s" },
	{ x: 31, y: 44, s: 1.1, o: 0.25, d: "5.7s" },
	{ x: 69, y: 52, s: 1.2, o: 0.3, d: "4.9s" },
	{ x: 48, y: 92, s: 1.4, o: 0.35, d: "5.2s" },
	{ x: 15, y: 50, s: 1.0, o: 0.25, d: "3.8s" },
];

// Configuration for all 6 languages defined in portfolioData.js
const PLANET_CONFIGS = [
	{
		match: /english/i,
		fallbackName: "English",
		fallbackLevel: "Fluent",
		fallbackGreeting: "Hi, I am Bisweswar Sahoo.",
		id: "english",
		positionClass: "planet-pos-english",
		accentColor: "#38bdf8",
		levelColor: "#7dd3fc",
		nodeX: 500,
		nodeY: 55,
		rayStart: { x: 500, y: 215 },
		rayEnd: { x: 500, y: 95 },
	},
	{
		match: /french/i,
		fallbackName: "French",
		fallbackLevel: "Beginner",
		fallbackGreeting: "Bonjour, je suis Bisweswar Sahoo.",
		id: "french",
		positionClass: "planet-pos-french",
		accentColor: "#f472b6",
		levelColor: "#f472b6",
		nodeX: 170,
		nodeY: 140,
		rayStart: { x: 435, y: 235 },
		rayEnd: { x: 215, y: 165 },
	},
	{
		match: /chinese/i,
		fallbackName: "Chinese (Mandarin)",
		fallbackLevel: "Beginner",
		fallbackGreeting: "你好，我是比斯韦斯瓦尔·萨胡。",
		id: "chinese",
		positionClass: "planet-pos-chinese",
		accentColor: "#34d399",
		levelColor: "#6ee7b7",
		nodeX: 830,
		nodeY: 140,
		rayStart: { x: 565, y: 235 },
		rayEnd: { x: 785, y: 165 },
	},
	{
		match: /hindi/i,
		fallbackName: "Hindi",
		fallbackLevel: "Fluent",
		fallbackGreeting: "नमस्ते, मैं बिस्वेश्वर साहू हूँ।",
		id: "hindi",
		positionClass: "planet-pos-hindi",
		accentColor: "#a78bfa",
		levelColor: "#c4b5fd",
		nodeX: 210,
		nodeY: 370,
		rayStart: { x: 435, y: 320 },
		rayEnd: { x: 255, y: 355 },
	},
	{
		match: /odia/i,
		fallbackName: "Odia",
		fallbackLevel: "Native",
		fallbackGreeting: "ନମସ୍କାର, ମୁଁ ବିଶ୍ୱେଶ୍ୱର ସାହୁ ଅଟେ।",
		id: "odia",
		positionClass: "planet-pos-odia",
		accentColor: "#fbbf24",
		levelColor: "#fcd34d",
		nodeX: 790,
		nodeY: 370,
		rayStart: { x: 565, y: 320 },
		rayEnd: { x: 745, y: 355 },
	},
	{
		match: /spanish/i,
		fallbackName: "Spanish",
		fallbackLevel: "Beginner",
		fallbackGreeting: "Hola, soy Bisweswar Sahoo.",
		id: "spanish",
		positionClass: "planet-pos-spanish",
		accentColor: "#fb923c",
		levelColor: "#fdba74",
		nodeX: 500,
		nodeY: 470,
		rayStart: { x: 500, y: 345 },
		rayEnd: { x: 500, y: 435 },
	},
];

// Greetings strictly from the 6 portfolio languages for the central orb cycling
const CENTRAL_GREETINGS = [
	"Hello",
	"Bonjour",
	"你好",
	"नमस्ते",
	"ନମସ୍କାର",
	"Hola",
];

// Orbiting satellite particles strictly using the 6 portfolio languages
const SATELLITE_GREETINGS = [
	{
		id: "sat-hello",
		text: "Hello",
		color: "#38bdf8",
		dotColor: "#38bdf8",
		pathId: "traj-outer",
		dur: "34s",
		delay: "0s",
	},
	{
		id: "sat-bonjour",
		text: "Bonjour",
		color: "#f472b6",
		dotColor: "#f472b6",
		pathId: "traj-tilted",
		dur: "38s",
		delay: "-8s",
	},
	{
		id: "sat-nihao",
		text: "你好",
		color: "#34d399",
		dotColor: "#34d399",
		pathId: "traj-transverse",
		dur: "42s",
		delay: "-16s",
	},
	{
		id: "sat-namaste",
		text: "नमस्ते",
		color: "#a78bfa",
		dotColor: "#a78bfa",
		pathId: "traj-outer",
		dur: "34s",
		delay: "-17s",
	},
	{
		id: "sat-namaskar",
		text: "ନମସ୍କାର",
		color: "#fbbf24",
		dotColor: "#fbbf24",
		pathId: "traj-tilted",
		dur: "38s",
		delay: "-27s",
	},
	{
		id: "sat-hola",
		text: "Hola",
		color: "#fb923c",
		dotColor: "#fb923c",
		pathId: "traj-transverse",
		dur: "42s",
		delay: "-6s",
	},
];

const Languages = () => {
	const rawLanguages = portfolioData.languages || [];

	// Map all 6 languages from portfolioData with configuration
	const languages = useMemo(() => {
		return PLANET_CONFIGS.map((config) => {
			const item = rawLanguages.find((l) => config.match.test(l.name));
			return {
				name: item?.name || config.fallbackName,
				level: item?.level || config.fallbackLevel,
				greeting: item?.greeting || config.fallbackGreeting,
				config,
			};
		});
	}, [rawLanguages]);

	const [activePlanet, setActivePlanet] = useState(null);
	const [centralIndex, setCentralIndex] = useState(0);
	const [parallax, setParallax] = useState({ x: 0, y: 0 });
	const containerRef = useRef(null);

	// Automatic soft vertical fade cycle inside the central orb
	useEffect(() => {
		const interval = setInterval(() => {
			setCentralIndex((prev) => (prev + 1) % CENTRAL_GREETINGS.length);
		}, 2800);
		return () => clearInterval(interval);
	}, []);

	// Gentle cinematic mouse parallax
	const handleMouseMove = useCallback((e) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width - 0.5;
		const py = (e.clientY - rect.top) / rect.height - 0.5;
		setParallax({
			x: Number((px * 3).toFixed(2)),
			y: Number((py * -3).toFixed(2)),
		});
	}, []);

	const handleMouseLeave = useCallback(() => {
		setParallax({ x: 0, y: 0 });
		setActivePlanet(null);
	}, []);

	return (
		<div
			ref={containerRef}
			className="orbital-section-wrapper"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			role="region"
			aria-label="Languages Section"
		>
			{/* Ambient deep-space backdrop */}
			<div className="space-backdrop" aria-hidden="true">
				<div className="ambient-blue-glow glow-top"></div>
				<div className="ambient-blue-glow glow-center"></div>
				<div className="ambient-blue-glow glow-bottom"></div>

				{/* Sparse tiny stars */}
				<div className="starfield">
					{STARS.map((star, idx) => (
						<div
							key={idx}
							className="star"
							style={{
								left: `${star.x}%`,
								top: `${star.y}%`,
								width: `${star.s}px`,
								height: `${star.s}px`,
								opacity: star.o,
								animationDuration: star.d,
							}}
						/>
					))}
				</div>

				{/* Subtle cosmic noise texture overlay */}
				<div className="cosmic-dust-overlay"></div>
			</div>

			{/* Section Header */}
			<header className="languages-header">
				<div className="languages-pill" aria-hidden="true">
					<span className="pill-dot">•</span>
					<span className="pill-text">LANGUAGES</span>
					<span className="pill-dot">•</span>
				</div>

				<h2 className="languages-main-heading">
					<span className="heading-white">The </span>
					<span className="heading-gradient">languages </span>
					<span className="heading-white">I speak</span>
				</h2>

				<p className="languages-subheading">
					Human languages, not programming languages.
				</p>
			</header>

			{/* Main Orbital System Hero */}
			<div
				className="orbital-stage"
				style={{
					transform: `perspective(1000px) rotateX(${parallax.y}deg) rotateY(${parallax.x}deg)`,
				}}
			>
				{/* Background SVG for Mathematical Orbital Geometry & Orbiting Satellites */}
				<svg
					className="orbital-svg"
					viewBox="0 0 1000 560"
					preserveAspectRatio="none"
					aria-hidden="true"
				>
					<defs>
						{/* Rays gradients */}
						<linearGradient id="ray-english" x1="0%" y1="100%" x2="0%" y2="0%">
							<stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
							<stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
						</linearGradient>

						<linearGradient id="ray-french" x1="100%" y1="100%" x2="0%" y2="0%">
							<stop offset="0%" stopColor="#f472b6" stopOpacity="0.1" />
							<stop offset="100%" stopColor="#f472b6" stopOpacity="0.75" />
						</linearGradient>

						<linearGradient id="ray-chinese" x1="0%" y1="100%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#34d399" stopOpacity="0.1" />
							<stop offset="100%" stopColor="#34d399" stopOpacity="0.75" />
						</linearGradient>

						<linearGradient id="ray-hindi" x1="100%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="#a78bfa" stopOpacity="0.1" />
							<stop offset="100%" stopColor="#a78bfa" stopOpacity="0.75" />
						</linearGradient>

						<linearGradient id="ray-odia" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#fbbf24" stopOpacity="0.1" />
							<stop offset="100%" stopColor="#fbbf24" stopOpacity="0.75" />
						</linearGradient>

						<linearGradient id="ray-spanish" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="#fb923c" stopOpacity="0.1" />
							<stop offset="100%" stopColor="#fb923c" stopOpacity="0.75" />
						</linearGradient>

						{/* Mathematical Trajectory Paths for Satellite Greetings */}
						<path
							id="traj-outer"
							d="M 100 280 C 100 120, 320 60, 500 60 C 680 60, 900 120, 900 280 C 900 440, 680 500, 500 500 C 320 500, 100 440, 100 280"
							fill="none"
						/>
						<path
							id="traj-tilted"
							d="M 180 340 C 220 180, 420 110, 500 120 C 620 130, 780 200, 820 330 C 760 450, 520 470, 360 450 C 240 430, 150 410, 180 340"
							fill="none"
						/>
						<path
							id="traj-transverse"
							d="M 140 210 C 280 80, 720 80, 860 210 C 900 350, 750 440, 500 440 C 250 440, 100 350, 140 210"
							fill="none"
						/>
					</defs>

					{/* 1. Large faint viewport edge orbital arcs */}
					<g className="viewport-edge-arcs">
						<path
							d="M -120 40 A 580 580 0 0 1 -120 540"
							className="ambient-edge-arc"
						/>
						<path
							d="M 1120 20 A 620 620 0 0 0 1120 520"
							className="ambient-edge-arc"
						/>
						<ellipse
							cx="500"
							cy="280"
							rx="480"
							ry="265"
							className="ambient-outer-ring"
						/>
					</g>

					{/* 2. Primary Mathematical Orbital Tracks (Each planet highlights ONLY its 1 dedicated path) */}
					<g className="orbital-tracks">
						{/* Polar ellipse: English (top) & Spanish (bottom). Each glows in its own color only! */}
						<ellipse
							cx="500"
							cy="280"
							rx="185"
							ry="224"
							className={`orbital-path polar-orbit ${activePlanet === "english" ? "highlight-english" : activePlanet === "spanish" ? "highlight-spanish" : ""}`}
						/>

						{/* Outer Celestial Ellipse: French (upper-left) & Chinese (upper-right) */}
						<ellipse
							cx="500"
							cy="280"
							rx="420"
							ry="225"
							className={`orbital-path outer-orbit ${activePlanet === "french" ? "highlight-french" : activePlanet === "chinese" ? "highlight-chinese" : ""}`}
						/>

						{/* Equatorial Ellipse: Hindi (lower-left) & Odia (lower-right) */}
						<ellipse
							cx="500"
							cy="330"
							rx="340"
							ry="125"
							className={`orbital-path equatorial-orbit ${activePlanet === "hindi" ? "highlight-hindi" : activePlanet === "odia" ? "highlight-odia" : ""}`}
						/>

						{/* Concentric inner core track */}
						<circle
							cx="500"
							cy="280"
							r="88"
							className="orbital-path inner-core-track"
						/>
					</g>

					{/* 3. Constellation Communication Rays to Central Core */}
					<g className="constellation-rays">
						{languages.map(({ config }) => (
							<line
								key={`ray-${config.id}`}
								x1={config.rayStart.x}
								y1={config.rayStart.y}
								x2={config.rayEnd.x}
								y2={config.rayEnd.y}
								stroke={`url(#ray-${config.id})`}
								className={`communication-ray ${activePlanet === config.id ? "ray-active" : ""}`}
							/>
						))}
					</g>

					{/* 4. Glowing Node Markers for all 6 planets */}
					<g className="orbital-nodes">
						{languages.map(({ config }) => (
							<circle
								key={`node-${config.id}`}
								cx={config.nodeX}
								cy={config.nodeY}
								r="3.5"
								className={`orbital-node node-${config.id} ${activePlanet === config.id ? "node-active" : ""}`}
							/>
						))}

						{/* Intermediate waypoint nodes */}
						<circle cx="315" cy="205" r="2" className="orbital-node waypoint" />
						<circle cx="685" cy="205" r="2" className="orbital-node waypoint" />
						<circle cx="160" cy="330" r="2" className="orbital-node waypoint" />
						<circle cx="840" cy="330" r="2" className="orbital-node waypoint" />
					</g>

					{/* 5. Floating / Orbiting Greeting Satellites (Exclusively the 6 portfolio languages) */}
					<g className="orbiting-satellites-group">
						{SATELLITE_GREETINGS.map((sat) => {
							const pathD =
								sat.pathId === "traj-outer"
									? "M 100 280 C 100 120, 320 60, 500 60 C 680 60, 900 120, 900 280 C 900 440, 680 500, 500 500 C 320 500, 100 440, 100 280"
									: sat.pathId === "traj-tilted"
										? "M 180 340 C 220 180, 420 110, 500 120 C 620 130, 780 200, 820 330 C 760 450, 520 470, 360 450 C 240 430, 150 410, 180 340"
										: "M 140 210 C 280 80, 720 80, 860 210 C 900 350, 750 440, 500 440 C 250 440, 100 350, 140 210";

							return (
								<g key={sat.id} className="satellite-particle">
									<animateMotion
										dur={sat.dur}
										begin={sat.delay}
										repeatCount="indefinite"
										path={pathD}
									/>
									<animate
										attributeName="opacity"
										values="0; 0.25; 0.75; 0.8; 0.75; 0.25; 0"
										keyTimes="0; 0.12; 0.28; 0.72; 0.86; 0.96; 1"
										dur={sat.dur}
										begin={sat.delay}
										repeatCount="indefinite"
									/>
									{/* Tiny luminous dot / node */}
									<circle cx="-5" cy="-2" r="2.2" fill={sat.dotColor} />
									{/* Thin curved trajectory line segment beneath it */}
									<path
										d="M -12 6 Q 16 10 44 6"
										stroke={sat.color}
										strokeOpacity="0.45"
										strokeWidth="0.8"
										fill="none"
									/>
									{/* Greeting typography */}
									<text
										x="4"
										y="0"
										fill={sat.color}
										className="satellite-greeting-text"
									>
										{sat.text}
									</text>
								</g>
							);
						})}
					</g>
				</svg>

				{/* ──────── Central Core ("I SPEAK" + Automatic Cycling of the 6 Greetings) ──────── */}
				<div className="central-core-container" aria-label="Core: I Speak">
					<div className="core-outer-ring" aria-hidden="true"></div>
					<div className="core-dashed-ring" aria-hidden="true"></div>
					<div className="core-disc">
						<span className="core-label">I SPEAK</span>
						<div className="core-underline" aria-hidden="true"></div>
						<div className="core-greeting-container">
							<span
								key={centralIndex}
								className="core-dynamic-greeting"
							>
								{CENTRAL_GREETINGS[centralIndex]}
							</span>
						</div>
					</div>
				</div>

				{/* ──────── 6 Language Planets from portfolioData ──────── */}
				<div className="planets-system">
					{languages.map((lang) => {
						const { config } = lang;
						const isHovered = activePlanet === config.id;

						return (
							<div
								key={config.id}
								className={`planet-anchor ${config.positionClass} ${isHovered ? "is-hovered" : ""}`}
								onMouseEnter={() => setActivePlanet(config.id)}
								onMouseLeave={() => setActivePlanet(null)}
								onFocus={() => setActivePlanet(config.id)}
								onBlur={() => setActivePlanet(null)}
								tabIndex={0}
								role="button"
								aria-label={`${lang.name} language, ${lang.level}`}
							>
								{/* Planet Sphere */}
								<div className={`planet-sphere planet-${config.id}`}>
									{/* Surface Cloud/Terrain Atmosphere Layer */}
									<div className="planet-atmosphere-texture" aria-hidden="true"></div>
									{/* Soft Specular Rim Light */}
									<div className="planet-rim-light" aria-hidden="true"></div>
								</div>

								{/* Language Info Under Planet */}
								<div className="planet-info">
									<h3 className="planet-name">{lang.name}</h3>
									<span
										className="planet-level"
										style={{ color: config.levelColor }}
									>
										{lang.level}
									</span>

									{/* Ambient native transmission quote on hover */}
									<div className="planet-native-quote" aria-hidden="true">
										<span className="quote-text">{lang.greeting}</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Section Bottom Detail */}
			<div className="orbital-bottom-detail" aria-hidden="true">
				<div className="status-track">
					<div className="status-line"></div>
					<div className="status-nodes">
						<span className="track-node"></span>
						<span className="track-node active"></span>
						<span className="track-node"></span>
					</div>
				</div>

				<div className="orbital-motto">
					<span>COMMUNICATION</span>
					<span className="motto-dot">•</span>
					<span>CULTURE</span>
					<span className="motto-dot">•</span>
					<span>CONNECTION</span>
				</div>
			</div>
		</div>
	);
};

export default Languages;
