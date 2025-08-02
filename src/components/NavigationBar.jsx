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
				padding: "10px",
				boxSizing: "border-box",
			}}
		>
			<div style={{ display: "flex", alignItems: "center" }}>
				<img
					style={{
						height: "40px",
						width: "40px",
						borderRadius: "50%",
						margin: "12px",
					}}
					src="https://media.licdn.com/dms/image/D5603AQGnA-XupodrLw/profile-displayphoto-shrink_800_800/0/1676651618744?e=2147483647&v=beta&t=vAtQ74y1z92R-hqHzY8e3XbDmBiR12OGCS1RWnJ2NFE"
					alt="Profile"
				/>
				<div style={{ fontWeight: "500", color: "white" }}>
					<div>Bisweswar Sahoo</div>
					<div style={{ fontSize: "14px", color: "#6b7280" }}>Developer</div>
				</div>
			</div>
			<ul
				style={{
					display: "flex",
					listStyle: "none",
					margin: 0,
					padding: 0,
					fontSize: "18px",
					gap: "20px",
					marginRight: "20px",
				}}
			>
				{menuItems.map((item, index) => (
					<li
						key={index}
						style={{
							fontWeight: "500",
							color: "white",
							padding: "10px",
						}}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
};

export default NavigationBar;
