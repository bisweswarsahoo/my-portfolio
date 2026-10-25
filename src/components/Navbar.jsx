import { useState, useEffect, useRef, useCallback } from "react";
import {
	LuHouse,
	LuMilestone,
	LuCpu,
	LuLayoutGrid,
	LuUser,
} from "react-icons/lu";
import "../styles/Navbar.css";
import ThemeToggle from "../theme/ThemeToggle.jsx";
import portfolioData from "../data/portfolioData.js";
import localPortrait from "../assets/Personal Portrait.webp";

const menuItems = [
	{ name: "Home", id: "home" },
	{ name: "Journey", id: "journey" },
	{ name: "Skills", id: "skills" },
	{ name: "Projects", id: "projects" },
	{ name: "About", id: "about" },
];

const iconMap = {
	Home: LuHouse,
	Journey: LuMilestone,
	Skills: LuCpu,
	Projects: LuLayoutGrid,
	About: LuUser,
};

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");
	const [isVisible, setIsVisible] = useState(true);
	const lastScrollY = useRef(0);
	const menuOpenRef = useRef(menuOpen);
	const sectionOffsetsRef = useRef([]);

	const updateSectionOffsets = useCallback(() => {
		const offsets = [];
		for (const item of menuItems) {
			if (item.id === "home") continue;
			const section = document.getElementById(item.id);
			if (section) {
				offsets.push({ id: item.id, top: section.offsetTop });
			}
		}
		sectionOffsetsRef.current = offsets;
	}, []);

	useEffect(() => {
		menuOpenRef.current = menuOpen;
	}, [menuOpen]);

	useEffect(() => {
		updateSectionOffsets();
		window.addEventListener("resize", updateSectionOffsets, { passive: true });

		let ticking = false;
		const handleScroll = () => {
			if (ticking) return;
			ticking = true;

			requestAnimationFrame(() => {
				const currentScrollY = window.scrollY;

				// Active section tracking from cached offsets
				let currentSection = "home";
				const scrollPos = currentScrollY + 220;

				for (const sec of sectionOffsetsRef.current) {
					if (sec.top <= scrollPos) {
						currentSection = sec.id;
					}
				}

				setActiveSection((prev) => (prev !== currentSection ? currentSection : prev));

				// Scroll direction behavior
				if (currentScrollY < 45) {
					setIsVisible(true);
				} else if (currentScrollY > lastScrollY.current + 14) {
					if (!menuOpenRef.current) {
						setIsVisible(false);
					}
				} else if (currentScrollY < lastScrollY.current - 14) {
					setIsVisible(true);
				}

				lastScrollY.current = currentScrollY;
				ticking = false;
			});
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // initial check

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", updateSectionOffsets);
		};
	}, [updateSectionOffsets]);

	const scrollToSection = (id) => {
		setMenuOpen(false);
		setIsVisible(true);
		if (id === "home") {
			window.scrollTo({ top: 0, behavior: "smooth" });
			setActiveSection("home");
			return;
		}
		const element = document.getElementById(id);
		if (element) {
			const y = element.getBoundingClientRect().top + window.scrollY - 80;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	return (
		<nav
			className={`navbar ${isVisible ? "navbar--visible" : "navbar--hidden"}`}
			role="navigation"
			aria-label="Main Navigation"
		>
			<div className="navbar-top-row">
				<div
					className="navbar-profile"
					onClick={() => scrollToSection("home")}
					role="button"
					tabIndex={0}
					title="Back to top (Home)"
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							scrollToSection("home");
						}
					}}
				>
					<img
						className="navbar-profile-img"
						src={localPortrait}
						alt={`${portfolioData.name} profile`}
						width="38"
						height="38"
						loading="eager"
						decoding="async"
					/>
					<div className="navbar-profile-info">
						<span className="navbar-profile-name">{portfolioData.name}</span>
						<span className="navbar-profile-role">{portfolioData.role}</span>
					</div>

					<div
						className="navbar-theme-toggle-wrap"
						onClick={(e) => e.stopPropagation()}
					>
						<ThemeToggle />
					</div>
				</div>

				<label className="hamburger">
					<input
						type="checkbox"
						checked={menuOpen}
						onChange={() => setMenuOpen((open) => !open)}
						aria-checked={menuOpen}
						aria-label="Toggle navigation menu"
					/>
					<svg
						viewBox="0 0 32 32"
						width="40"
					>
						<path
							className="line line-top-bottom"
							d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
						></path>
						<path
							className="line"
							d="M7 16 27 16"
						></path>
					</svg>
				</label>
			</div>

			<ul className={`navbar-menu${menuOpen ? " open" : ""}`}>
				{menuItems.map((item, index) => {
					const Icon = iconMap[item.name];
					return (
						<li
							key={index}
							tabIndex={0}
							role="button"
							aria-label={`${item.name} tab`}
							onClick={() => scrollToSection(item.id)}
							className={activeSection === item.id ? "active" : ""}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									scrollToSection(item.id);
								}
							}}
						>
							{Icon && (
								<Icon
									className="nav-icon"
									aria-hidden="true"
									focusable="false"
								/>
							)}
							<span className="nav-text">{item.name}</span>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navbar;
