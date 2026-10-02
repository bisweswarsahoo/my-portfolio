import React from "react";

const CarouselProgress = ({ activeIndex = 0, isPaused = false }) => {
	return (
		<div className="ps-progress-bar-wrap" aria-hidden="true">
			<div
				key={activeIndex}
				className={`ps-progress-bar-fill ${isPaused ? "ps-progress-bar-fill--paused" : ""}`}
			/>
		</div>
	);
};

export default React.memo(CarouselProgress);
