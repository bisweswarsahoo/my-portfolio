import React from "react";
import { GithubOutlined, GlobalOutlined } from "@ant-design/icons";
import { Card, Typography, Button, Space } from "antd";
import { motion } from "framer-motion";

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
	const containerWidth = projects.length * cardWidth;

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
				style={{ padding: "20px", display: "flex", justifyContent: "center" }}
			>
				<motion.div
					className="projects-container"
					whileTap={{ cursor: "grabbing" }}
					style={{ display: "flex", justifyContent: "center", width: "100%" }}
				>
					<motion.div
						className="projects-inner"
						style={{
							display: "flex",
							justifyContent: "center",
							width: containerWidth,
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
									margin: "0 10px",
								}}
							>
								<Card
									hoverable
									className="project-card dark"
									style={{ height: "100%" }}
								>
									<Title
										level={3}
										style={{ color: "#e7dfdd", marginBottom: "24px" }}
									>
										{project.name}
									</Title>
									<Text
										style={{
											display: "block",
											marginBottom: "24px",
											fontSize: "16px",
											color: "#e7dfdd99",
										}}
									>
										{project.techStack}
									</Text>
									<ul
										style={{
											paddingLeft: "20px",
											marginBottom: "24px",
											fontSize: "16px",
											color: "#e7dfdd",
										}}
									>
										{project.description.map((point, idx) => (
											<li
												key={idx}
												style={{ marginBottom: "12px" }}
											>
												<Paragraph style={{ color: "#e7dfdd" }}>
													{point}
												</Paragraph>
											</li>
										))}
									</ul>
									<Space
										size="large"
										style={{ display: "flex", justifyContent: "center" }}
									>
										<Button
											type="primary"
											icon={<GithubOutlined />}
											href={project.sourceCode}
											target="_blank"
											size="large"
											ghost
										>
											Source Code
										</Button>
										<Button
											type="primary"
											icon={<GlobalOutlined />}
											href={project.liveDemo}
											target="_blank"
											size="large"
											ghost
										>
											Live Demo
										</Button>
									</Space>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</>
	);
};

export default Projects;
