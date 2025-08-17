import { Typography } from "antd";
import { motion } from "framer-motion";
import "../styles/Card.css";

const { Title, Text, Paragraph } = Typography;

const projects = [
	{
		name: "NodeNexus – Real-time Community Chat Platform",
		techStack: "MERN Stack, Socket.io, JWT, AES Encryption",
		description: [
			"Developed a real-time chat application for seamless interaction in communities.",
			"Implemented AES-256 encryption for secure messaging.",
			"Integrated Socket.io for instant messaging and notifications.",
			"Features include group chats, user authentication, and customizable profiles.",
		],
		sourceCode: "#",
		liveDemo: "#",
	},
	{
		name: "Castify – A Collaborative Platform for Artists",
		techStack:
			"React Native, Java, Microservices, MongoDB, PostgreSQL, Firebase",
		description: [
			"Developed a platform enabling artists to collaborate and gain experience in domains such as acting, singing, dancing, poetry, and more.",
			"Created a casting portal for finding job opportunities.",
			"Designed a collaborative space for independent projects and networking.",
			"Integrated cloud services using Firebase for authentication and real-time updates.",
		],
		sourceCode: "#",
		liveDemo: "#",
	},
];

const Projects = () => {
	const cardWidth = 300;
	const cardHeight = "auto";

	return (
		<>
			<Title
				level={1}
				style={{
					display: "flex",
					fontSize: "40px",
					fontWeight: "bold",
					marginTop: "100px",
					justifyContent: "center",
				}}
			>
				Some Projects that have been keeping me busy...
			</Title>
			<div
				style={{
					padding: "20px",
					display: "flex",
					justifyContent: "center",
					gap: "100px",
				}}
			>
				{projects.map((project, index) => (
					<motion.div
						key={index}
						className="project-card-container"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: index * 0.2 }}
						style={{
							width: cardWidth,
							height: cardHeight,
						}}
					>
						<div className="card">
							<div className="mac-header">
								<span className="red"></span>
								<span className="yellow"></span>
								<span className="green"></span>
							</div>
							<p className="card-title">{project.name}</p>
							<p className="card-description">
								{project.description.join(". ")}
							</p>
							{project.techStack.split(", ").map((tech, techIndex) => (
								<span
									key={techIndex}
									className="card-tag"
								>
									{tech}
								</span>
							))}
							<div className="code-editor">
								<pre>
									<code>&lt;Project /&gt;</code>
								</pre>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</>
	);
};

export default Projects;
