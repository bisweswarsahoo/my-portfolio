import { useState } from "react";
import {
	FaUser,
	FaGraduationCap,
	FaBriefcase,
	FaCertificate,
	FaTools,
	FaFolderOpen,
	FaPhoneAlt,
} from "react-icons/fa";
import "../styles/NavigationBar.css";

const menuItems = [
	"About",
	"Education",
	"Work",
	"Certifications",
	"Skills",
	"Projects",
	"Contact",
];

const NavigationBar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav
			className="navbar"
			role="navigation"
			aria-label="Main Navigation"
		>
			<div className="navbar-profile">
				<img
					className="navbar-profile-img"
					src="https://media.licdn.com/dms/image/D5603AQGnA-XupodrLw/profile-displayphoto-shrink_800_800/0/1676651618744?e=2147483647&v=beta&t=vAtQ74y1z92R-hqHzY8e3XbDmBiR12OGCS1RWnJ2NFE"
					alt="Bisweswar Sahoo profile"
				/>
				<div className="navbar-profile-info">
					<span>Bisweswar Sahoo</span>
					<span className="navbar-profile-role">Developer</span>
				</div>
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
						Certifications: FaCertificate,
						Skills: FaTools,
						Projects: FaFolderOpen,
						Contact: FaPhoneAlt,
					};
					const Icon = iconMap[item];
					return (
						<li
							key={index}
							tabIndex={0}
							aria-label={item}
							onClick={() => setMenuOpen(false)}
						>
							{Icon && (
								<Icon
									className="nav-icon"
									aria-hidden="true"
									focusable="false"
								/>
							)}
							<span className="nav-text">{item}</span>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default NavigationBar;
