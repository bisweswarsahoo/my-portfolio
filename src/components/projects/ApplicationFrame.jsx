import React from "react";
import ProjectPlaceholder from "./ProjectPlaceholder";

const ApplicationFrame = ({ project, tilt = { rotateX: 1, rotateY: -3 } }) => {
	if (!project) return null;

	const hasImage = Boolean(project.image);
	const frameTitle = project.title || project.name || "PROJECT PREVIEW";
	const frameUrl = project.liveUrl || (project.github ? `${project.github.replace('https://', '')}` : `app.bisweswar.dev/${project.id || 'project'}`);

	return (
		<div
			className="ps-app-frame"
			style={{
				transform: `perspective(1600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
			}}
		>
			{/* Top Glare Reflection */}
			<div className="ps-app-frame__glare" />

			{/* Frame Header (Browser / App Chrome) */}
			<div className="ps-frame-header">
				<div className="ps-frame-controls" aria-hidden="true">
					<span className="ps-control-dot ps-control-dot--close" />
					<span className="ps-control-dot ps-control-dot--minimize" />
					<span className="ps-control-dot ps-control-dot--maximize" />
				</div>

				<div className="ps-frame-address">
					<span className="ps-frame-address__icon">🔒</span>
					<span className="ps-frame-address__url">{frameUrl}</span>
				</div>

				<div className="ps-frame-meta">
					<span className="ps-frame-meta__tag">PROJECT PREVIEW</span>
					<span className="ps-frame-meta__indicator" />
				</div>
			</div>

			{/* Dedicated Screen Viewport */}
			<div className="ps-screen">
				{hasImage ? (
					<div className="ps-screen__image-wrap">
						<img
							src={project.image}
							alt={`${frameTitle} preview screenshot`}
							className="ps-screen__img"
							loading="lazy"
						/>
						{/* Subtle Inner Vignette & Edge Shadow Gradient */}
						<div className="ps-screen__vignette" />
					</div>
				) : (
					<div className="ps-screen__placeholder-wrap">
						<ProjectPlaceholder project={project} />
						{/* Inner Vignette Overlay */}
						<div className="ps-screen__vignette" />
					</div>
				)}
			</div>
		</div>
	);
};

export default ApplicationFrame;
