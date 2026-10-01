import React, { useState, useRef, useCallback } from "react";
import ApplicationFrame from "./ApplicationFrame";

const ProjectVisual = ({ project }) => {
	const containerRef = useRef(null);
	const [tilt, setTilt] = useState({ rotateX: 1, rotateY: -3 });
	const [glowOffset, setGlowOffset] = useState({ x: 0, y: 0 });

	const handleMouseMove = useCallback((e) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Normalized -1 to 1
		const normX = (x / rect.width) * 2 - 1;
		const normY = (y / rect.height) * 2 - 1;

		// Subtle rotation limits: rotateX ±2deg, rotateY ±3deg (inverted for natural 3D tilt)
		const rotateY = -normX * 3.5;
		const rotateX = normY * 2.5;

		setTilt({ rotateX, rotateY });
		// Decorative glows move slightly more to create deep layered parallax
		setGlowOffset({ x: normX * 24, y: normY * 18 });
	}, []);

	const handleMouseLeave = useCallback(() => {
		// Smoothly restore default subtle perspective
		setTilt({ rotateX: 1, rotateY: -3 });
		setGlowOffset({ x: 0, y: 0 });
	}, []);

	return (
		<div
			ref={containerRef}
			className="ps-visual-container"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{/* Decorative Elements Layer (Behind Frame) */}
			<div className="ps-decorations" aria-hidden="true">
				{/* Soft Light Blobs with Parallax Offset */}
				<div
					className="ps-glow-blob ps-glow-blob--blue"
					style={{
						transform: `translate(${glowOffset.x * 1.4}px, ${glowOffset.y * 1.4}px)`,
					}}
				/>
				<div
					className="ps-glow-blob ps-glow-blob--purple"
					style={{
						transform: `translate(${-glowOffset.x * 1.2}px, ${-glowOffset.y * 1.2}px)`,
					}}
				/>

				{/* Orbital SVG Lines */}
				<svg className="ps-orbital-svg" viewBox="0 0 800 600" fill="none">
					<ellipse
						cx="420"
						cy="300"
						rx="380"
						ry="230"
						stroke="rgba(56, 189, 248, 0.12)"
						strokeWidth="1.2"
						strokeDasharray="6 8"
						transform="rotate(-8 420 300)"
					/>
					<ellipse
						cx="390"
						cy="310"
						rx="430"
						ry="270"
						stroke="rgba(168, 85, 247, 0.09)"
						strokeWidth="1"
						strokeDasharray="12 12"
						transform="rotate(6 390 310)"
					/>
				</svg>

				{/* Floating Ambient Node Particles */}
				<div className="ps-particle ps-particle--1" />
				<div className="ps-particle ps-particle--2" />
				<div className="ps-particle ps-particle--3" />
				<div className="ps-particle ps-particle--4" />
			</div>

			{/* The Application Frame */}
			<ApplicationFrame project={project} tilt={tilt} />
		</div>
	);
};

export default ProjectVisual;
