import React from "react";

const NavigationBar = () => {
	const menuItems = [
		"About",
		"Education",
		"Work",
		"Certifications",
		"Skills",
		"Projects",
		"Contact",
	];
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
			}}
		>
			<div style={{ display: "flex", alignItems: "center" }}>
				<img
					src="https://media.licdn.com/dms/image/D5603AQGnA-XupodrLw/profile-displayphoto-shrink_800_800/0/1676651618744?e=2147483647&v=beta&t=vAtQ74y1z92R-hqHzY8e3XbDmBiR12OGCS1RWnJ2NFE"
					alt="Bisweswar Sahoo"
					style={{
						height: "40px",
						width: "40px",
						borderRadius: "50%",
						margin: "12px",
					}}
				/>
				<span style={{ fontSize: "20px" }}>Bisweswar Sahoo</span>
			</div>
			<ul
				style={{
					display: "flex",
					listStyle: "none",
					margin: 0,
					padding: 0,
					fontSize: "18px",
				}}
			>
				{menuItems.map((item, index) => (
					<li
						key={index}
						style={{ padding: "10px" }}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
};

export default NavigationBar;
