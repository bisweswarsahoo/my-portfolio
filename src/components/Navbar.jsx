import { useState, useEffect } from "react";
import {
	FaUser,
	FaGraduationCap,
	FaBriefcase,
	FaTools,
	FaFolderOpen,
} from "react-icons/fa";
import "../styles/Navbar.css";
import ThemeToggle from "../theme/ThemeToggle.jsx";

const menuItems = [
	{ name: "Education", id: "education" },
	{ name: "Work", id: "work" },
	{ name: "Skills", id: "skills" },
	{ name: "Projects", id: "projects" },
	{ name: "About", id: "about" },
];

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			const scrollPos = window.scrollY + 200; // offset
			let currentSection = "";

			for (const item of menuItems) {
				const section = document.getElementById(item.id);
				if (section && section.offsetTop <= scrollPos) {
					currentSection = item.id;
				}
			}

			if (currentSection !== activeSection) {
				setActiveSection(currentSection);
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // initial check

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [activeSection]);

	const scrollToSection = (id) => {
		setMenuOpen(false);
		const element = document.getElementById(id);
		if (element) {
			const y = element.getBoundingClientRect().top + window.scrollY - 80;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	return (
		<nav
			className="navbar"
			role="navigation"
			aria-label="Main Navigation"
		>
			<div className="navbar-profile">
				<img
					className="navbar-profile-img"
					src="https://github.com/bisweswarsahoo.png"
					alt="Bisweswar Sahoo profile"
				/>
				<div className="navbar-profile-info">
					<span>Bisweswar Sahoo</span>
					<span className="navbar-profile-role">Developer</span>
				</div>
				<ThemeToggle />
			</div>

			<label
				className="hamburger"
				aria-label="Open menu"
			>
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

			<ul className={`navbar-menu${menuOpen ? " open" : ""}`}>
				{menuItems.map((item, index) => {
					const iconMap = {
						About: FaUser,
						Education: FaGraduationCap,
						Work: FaBriefcase,

						Skills: FaTools,
						Projects: FaFolderOpen,
					};
					const Icon = iconMap[item.name];
					return (
						<li
							key={index}
							tabIndex={0}
							aria-label={item.name}
							onClick={() => scrollToSection(item.id)}
							className={activeSection === item.id ? "active" : ""}
							onKeyDown={(e) => {
								if (e.key === "Enter") scrollToSection(item.id);
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
