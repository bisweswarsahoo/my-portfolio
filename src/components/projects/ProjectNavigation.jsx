import React, { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import CarouselProgress from "./CarouselProgress";

const ProjectNavigation = ({
	projects = [],
	activeIndex = 0,
	onSelectProject,
	onPrev,
	onNext,
	progress = 0,
	isPaused = false
}) => {
	const stripRef = useRef(null);
	const activeThumbRef = useRef(null);

	// Auto-scroll the thumbnail strip if needed on mobile/overflow
	useEffect(() => {
		if (activeThumbRef.current && stripRef.current) {
			const strip = stripRef.current;
			const thumb = activeThumbRef.current;
			const thumbLeft = thumb.offsetLeft;
			const thumbWidth = thumb.offsetWidth;
			const stripWidth = strip.offsetWidth;

			const targetScroll = thumbLeft - stripWidth / 2 + thumbWidth / 2;
			strip.scrollTo({ left: targetScroll, behavior: "smooth" });
		}
	}, [activeIndex]);

	return (
		<div className="ps-nav-wrap">
			{/* Thin Carousel Progress Bar */}
			<CarouselProgress progress={progress} isPaused={isPaused} />

			<div className="ps-nav-controls">
				{/* Previous Button */}
				<button
					type="button"
					className="ps-nav-arrow ps-nav-arrow--prev"
					onClick={onPrev}
					aria-label="Previous project"
					title="Previous project (←)"
				>
					<FaChevronLeft className="ps-nav-arrow__icon" />
				</button>

				{/* Horizontal Thumbnail Strip */}
				<div
					ref={stripRef}
					className="ps-thumbnails-strip"
					role="tablist"
					aria-label="Project selection thumbnails"
				>
					{projects.map((proj, idx) => {
						const isActive = idx === activeIndex;
						const num = String(idx + 1).padStart(2, "0");
						const title = proj.title || proj.name;
						const category = proj.category || "DEVELOPMENT";

						return (
							<button
								key={proj.id || idx}
								ref={isActive ? activeThumbRef : null}
								type="button"
								role="tab"
								aria-selected={isActive}
								aria-label={`Select project ${num}: ${title}`}
								className={`ps-thumb ${isActive ? "ps-thumb--active" : ""}`}
								onClick={() => onSelectProject(idx)}
							>
								{/* Mini Screen Representation */}
								<div className="ps-thumb__screen">
									<div className="ps-thumb__screen-top">
										<span className="ps-thumb__dot" />
										<span className="ps-thumb__dot" />
										<span className="ps-thumb__dot" />
									</div>
									<div className="ps-thumb__screen-body">
										<div className="ps-thumb__abstract-block" />
										<div className="ps-thumb__abstract-lines">
											<span />
											<span />
										</div>
									</div>
									{isActive && <div className="ps-thumb__screen-glow" />}
								</div>

								{/* Thumbnail Info */}
								<div className="ps-thumb__meta">
									<div className="ps-thumb__head">
										<span className="ps-thumb__num">{num}</span>
										<span className="ps-thumb__cat">{category}</span>
									</div>
									<div className="ps-thumb__title">{title}</div>
								</div>
							</button>
						);
					})}
				</div>

				{/* Next Button */}
				<button
					type="button"
					className="ps-nav-arrow ps-nav-arrow--next"
					onClick={onNext}
					aria-label="Next project"
					title="Next project (→)"
				>
					<FaChevronRight className="ps-nav-arrow__icon" />
				</button>
			</div>
		</div>
	);
};

export default ProjectNavigation;
