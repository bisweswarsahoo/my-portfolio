import { motion } from "framer-motion";
import "../styles/Projects.css";

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
	{
		name: "Heatmap: Interactive Geospatial Data Visualization Platform",
		techStack: "React.js, Leaflet.js, Python, Ant Design",
		description: [
			"Architected a dynamic frontend with React and Leaflet.js featuring a customizable heatmap layer, multi-select filters, and bounding-box zoom logic for intuitive data exploration",
			"Developed a scalable Flask backend exposing RESTful API endpoints for geospatial data with proper CORS handling and environment-based configuration",
			"Optimized performance by caching API data in localStorage to reduce network requests and implementing efficient geographic bounding box calculations for map rendering",
			"Enhanced UX with dark/light theme toggle, loading indicators, and a responsive layout using Ant Design components",
		],
		sourceCode: "#",
		liveDemo: "#",
	},
];

const Projects = () => {
	return (
		<>
			<h2 className="projects-title">
				Some Projects that have been keeping me busy...
			</h2>
			<div className="projects-container">
				{projects.map((project, index) => (
					<motion.div
						key={index}
						className="project-card-container"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: index * 0.2 }}
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
