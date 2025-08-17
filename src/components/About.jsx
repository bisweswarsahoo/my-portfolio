import React from "react";
import SocialInfo from "./SocialInfo";
import CVCard from "./CVCard";
import "../styles/About.css";

const About = () => (
	<section className="about-section">
		<h2 className="about-title">About Me</h2>
		<p className="about-text">
			Hello! I'm a passionate software developer with expertise in full-stack
			development, mobile applications, and cloud-based solutions. I love
			solving complex problems and creating scalable applications that make a
			difference.
		</p>
		<p className="about-text">
			My technical skills include working with{" "}
			<strong>React, Node.js, Java, Python, MongoDB</strong> etc. I am always
			exploring new technologies and love collaborating on exciting projects.
		</p>
		<p className="about-text">
			Feel free to check out my projects and connect with me!
		</p>
		<div className="about-cards">
			<SocialInfo />

			<CVCard />
		</div>
		<p>Made by Bisweswar...</p>
	</section>
);

export default About;
