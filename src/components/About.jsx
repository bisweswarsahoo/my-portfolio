import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const About = () => {
	return (
		<div
			style={{
				margin: "auto",
				padding: "20px",
				textAlign: "center",
			}}
		>
			<h2
				style={{
					fontSize: "28px",
					fontWeight: "bold",
					paddingBottom: "15px",
				}}
			>
				About Me
			</h2>
			<p
				style={{
					fontSize: "18px",
					lineHeight: "1.8",
					color: "#34495e",
					marginBottom: "15px",
				}}
			>
				Hello! I'm a passionate software developer with expertise in full-stack
				development, mobile applications, and cloud-based solutions. I love
				solving complex problems and creating scalable applications that make a
				difference.
			</p>
			<p
				style={{
					fontSize: "18px",
					lineHeight: "1.8",
					color: "#34495e",
					marginBottom: "15px",
				}}
			>
				My technical skills include working with{" "}
				<strong>React, Node.js, Java, Python, MongoDB </strong>etc. I am always
				exploring new technologies and love collaborating on exciting projects.
			</p>
			<p
				style={{
					fontSize: "18px",
					lineHeight: "1.8",
					color: "#34495e",
					marginBottom: "20px",
				}}
			>
				Feel free to check out my projects and connect with me!
			</p>
			<div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
				<a
					href="https://www.linkedin.com/in/bisweswarsahoo"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "#007BFF" }}
				>
					<FaLinkedin size={30} />
				</a>
				<a
					href="https://github.com/bisweswarsahoo"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "#333" }}
				>
					<FaGithub size={30} />
				</a>
				<a
					href="mailto:bisweswarsahoo.jsg@gmail.com"
					style={{ color: "#D44638" }}
				>
					<FaEnvelope size={30} />
				</a>
			</div>
		</div>
	);
};

export default About;
