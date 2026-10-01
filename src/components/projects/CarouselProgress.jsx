import React from "react";

const CarouselProgress = ({ progress = 0, isPaused = false }) => {
	return (
		<div className="ps-progress-bar-wrap" aria-hidden="true">
			<div
				className={`ps-progress-bar-fill ${isPaused ? "ps-progress-bar-fill--paused" : ""}`}
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
};

export default CarouselProgress;
