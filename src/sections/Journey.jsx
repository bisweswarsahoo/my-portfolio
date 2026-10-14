import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import portfolioData from "../data/portfolioData.js";
import MilestoneCard from "../components/MilestoneCard.jsx";
import jabszlogo from "../assets/jabsz-logo.png";
import orivanelogo from "../assets/orivane-studios.png";
import amitylogo from "../assets/amity-university-logo.png";
import adyantlogo from "../assets/adyant-logo.png";
import schoollogo from "../assets/sri-aurobindo-integral-education-logo.png";
import {
	LuChevronLeft,
	LuChevronRight,
	LuRotateCcw,
	LuSparkles,
} from "react-icons/lu";
import "../styles/Journey.css";

/**
 * Parses a date or duration string into a numeric score for reverse-chronological sorting.
 * Higher score = more recent (Present -> Past).
 */
const parseDateScore = (item) => {
	const str = item.duration || item.years || item.date || "";
	const lower = str.toLowerCase();

	if (lower.includes("2022") && lower.includes("2026")) {
		return 2022.08;
	}

	const years = str.match(/\b(20\d\d)\b/g);
	let year = 2020;
	if (years && years.length > 0) {
		year = parseInt(years[years.length - 1], 10);
	}

	const months = {
		jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
		jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
	};

	let month = 1;
	for (const [mName, mVal] of Object.entries(months)) {
		if (lower.includes(mName)) {
			month = mVal;
			break;
		}
	}

	const isPresent = lower.includes("present");
	const presentBoost = isPresent ? 0.05 : 0;

	return year + month / 100 + presentBoost;
};

const Journey = () => {
	const trackRef = useRef(null);
	const sectionRef = useRef(null);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	// 1. Gather all existing milestone data from portfolioData
	const milestones = useMemo(() => {
		const visibleExperience = (portfolioData.experience || []).filter(
			(item) => item.title || item.organization || item.duration || item.details?.some(Boolean)
		);

		const visibleEducation = (portfolioData.education || []).filter(
			(item) => item.degree || item.institution || item.years || item.grade
		);

		const visibleCompetitions = (portfolioData.competitions || []).filter(
			(item) => item.name || item.organizer || item.date || item.result
		);

		const items = [
			// Internships & Experience
			...visibleExperience.map((item, idx) => {
				let expIcon = item.icon || item.logo;
				if (!expIcon) {
					if (item.organization?.toLowerCase().includes("orivane")) {
						expIcon = orivanelogo;
					} else if (item.organization?.toLowerCase().includes("jabsz")) {
						expIcon = jabszlogo;
					}
				}

				return {
					id: `exp-${idx}`,
					type: item.type || (item.categoryLabel?.toLowerCase().includes("founder") ? "founder" : "experience"),
					categoryLabel: item.categoryLabel || item.category || "",
					title: item.title,
					organization: item.organization,
					location: item.location,
					duration: item.duration,
					icon: expIcon,
					partnerLogos: item.partnerLogos || [],
					tags: item.tags || [],
					proofUrl: item.website || item.proofUrl || item.link || item.url || "",
					bgImage: item.bgImage || item.image || item.backgroundImage,
					sortScore: parseDateScore(item),
				};
			}),

			// Hackathons & Competitions
			...visibleCompetitions.map((item, idx) => {
				let categoryLabel = "COMPETITION";
				if (item.name?.toLowerCase().includes("treasure") || item.name?.toLowerCase().includes("puzzle")) {
					categoryLabel = "HACKATHON / PUZZLE";
				} else if (item.name?.toLowerCase().includes("squid") || item.name?.toLowerCase().includes("code")) {
					categoryLabel = "ALGORITHMS & CODING";
				}

				return {
					id: `comp-${idx}`,
					type: "competition",
					categoryLabel,
					title: item.name,
					organization: item.organizer,
					duration: item.date,
					result: item.result,
					proofUrl: item.proofUrl || "",
					icon: item.icon || item.logo,
					partnerLogos: item.partnerLogos || [],
					bgImage: item.bgImage || item.image || item.backgroundImage,
					sortScore: parseDateScore(item),
				};
			}),

			// Academic Degrees & Schools
			...visibleEducation.map((item, idx) => {
				const isCollege = item.degree?.toLowerCase().includes("bachelor") || item.years?.includes("2026");
				const isHighSchool = item.degree?.toLowerCase().includes("senior") || item.years?.includes("2022");
				const eduIcon = item.icon || (isCollege ? amitylogo : isHighSchool ? adyantlogo : schoollogo);

				return {
					id: `edu-${idx}`,
					type: "education",
					categoryLabel: isCollege ? "UNDERGRADUATE DEGREE" : isHighSchool ? "SENIOR SECONDARY" : "SECONDARY EDUCATION",
					title: item.degree,
					organization: item.institution ? item.institution.split(", ")[0] : "",
					location: item.institution ? item.institution.split(", ").slice(1).join(", ") : "",
					duration: item.years,
					grade: item.grade,
					icon: eduIcon,
					partnerLogos: item.partnerLogos || [],
					bgImage: item.bgImage || item.image || item.backgroundImage,
					sortScore: parseDateScore(item),
				};
			}),
		];

		// Sort strictly reverse-chronological: newest first (Present -> Past)
		return items.sort((a, b) => b.sortScore - a.sortScore);
	}, []);

	const totalMilestones = milestones.length;

	const progressTrackRef = useRef(null);

	// 2. Measure scroll position, progress, and EXACTLY CENTERED active milestone
	const updateScrollState = useCallback(() => {
		const track = trackRef.current;
		if (!track) return;

		const { scrollLeft, scrollWidth, clientWidth } = track;
		const maxScroll = scrollWidth - clientWidth;
		const cols = track.querySelectorAll(".journey-milestone-col");

		if (cols.length > 0) {
			const lastIdx = cols.length - 1;
			const lastCol = cols[lastIdx];
			const lastColCenter = lastCol.offsetLeft + lastCol.offsetWidth / 2;
			const lastCenterScroll = Math.max(lastColCenter - clientWidth / 2, 1);

			// Progress is strictly 0 at scrollLeft = 0, directly anchored to Pip 0
			const progress = Math.min(Math.max(scrollLeft / lastCenterScroll, 0), 1);
			setScrollProgress(progress);

			const viewportCenter = scrollLeft + clientWidth / 2;
			let closestIdx = 0;
			let minDiff = Infinity;

			cols.forEach((col, idx) => {
				const colCenter = col.offsetLeft + col.offsetWidth / 2;
				const diff = Math.abs(colCenter - viewportCenter);
				if (diff < minDiff) {
					minDiff = diff;
					closestIdx = idx;
				}
			});

			setActiveIndex(closestIdx);
			setCanScrollLeft(scrollLeft > 6);
			setCanScrollRight(scrollLeft < maxScroll - 6);
		}
	}, []);

	// 3. Attach scroll listener
	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		let rafId = null;
		const onScroll = () => {
			if (rafId) cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(updateScrollState);
		};

		track.addEventListener("scroll", onScroll, { passive: true });
		updateScrollState();

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			track.removeEventListener("scroll", onScroll);
		};
	}, [updateScrollState]);

	// 4. Wheel handler: convert vertical wheel movement into horizontal movement only while active
	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		const handleWheel = (e) => {
			if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;

			const maxScroll = track.scrollWidth - track.clientWidth;
			if (maxScroll <= 0) return;

			const atStart = track.scrollLeft <= 4;
			const atEnd = track.scrollLeft >= maxScroll - 4;

			if (e.deltaY < 0 && atStart) return;
			if (e.deltaY > 0 && atEnd) return;

			e.preventDefault();
			track.scrollLeft += e.deltaY;
		};

		track.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			track.removeEventListener("wheel", handleWheel);
		};
	}, []);

	// 5. Navigation actions with EXACT CENTER alignment
	const scrollToMilestone = useCallback((index) => {
		const track = trackRef.current;
		if (!track) return;

		const cols = track.querySelectorAll(".journey-milestone-col");
		if (cols[index]) {
			if (index === 0) {
				track.scrollTo({
					left: 0,
					behavior: "smooth",
				});
				return;
			}
			const targetCol = cols[index];
			const targetCenter = targetCol.offsetLeft + targetCol.offsetWidth / 2;
			const leftPos = targetCenter - track.clientWidth / 2;
			track.scrollTo({
				left: Math.max(leftPos, 0),
				behavior: "smooth",
			});
		}
	}, []);

	const handlePrev = useCallback(() => {
		const targetIndex = Math.max(activeIndex - 1, 0);
		scrollToMilestone(targetIndex);
	}, [activeIndex, scrollToMilestone]);

	const handleNext = useCallback(() => {
		const targetIndex = Math.min(activeIndex + 1, totalMilestones - 1);
		scrollToMilestone(targetIndex);
	}, [activeIndex, totalMilestones, scrollToMilestone]);

	const handleTrackerScrub = useCallback((clientX) => {
		const progressEl = progressTrackRef.current;
		if (!progressEl || totalMilestones <= 1) return;

		const rect = progressEl.getBoundingClientRect();
		if (rect.width <= 0) return;
		const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
		const targetIdx = Math.round(percent * (totalMilestones - 1));
		scrollToMilestone(targetIdx);
	}, [totalMilestones, scrollToMilestone]);

	const handleProgressPointerDown = (e) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		handleTrackerScrub(e.clientX);
	};

	const handleProgressPointerMove = (e) => {
		if (e.buttons === 1) {
			handleTrackerScrub(e.clientX);
		}
	};

	const handleResetToPresent = useCallback(() => {
		scrollToMilestone(0);
	}, [scrollToMilestone]);

	// Keyboard arrow navigation
	const handleKeyDown = useCallback((e) => {
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			handlePrev();
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			handleNext();
		} else if (e.key === "Home") {
			e.preventDefault();
			handleResetToPresent();
		}
	}, [handlePrev, handleNext, handleResetToPresent]);

	if (milestones.length === 0) return null;

	const activeMilestone = milestones[activeIndex] || milestones[0];

	return (
		<div
			ref={sectionRef}
			className="journey-section"
			onKeyDown={handleKeyDown}
			tabIndex={-1}
		>
			{/* ─── Upper Header ────────────────────────────────────────── */}
			<header className="journey-header">
				<div className="journey-header__content">
					<h2 className="journey-header__title">
						Journey
					</h2>

					<p className="journey-header__subtitle">
						The path behind what I build.
					</p>

					{/* Instruction Badges for desktop and mobile */}
					<div className="journey-header__instructions" aria-label="Timeline navigation instructions">
						<span className="journey-inst-desktop">
							Use arrows <strong>[← / →]</strong>, mouse wheel, or drag to explore
						</span>
						<span className="journey-inst-mobile">
							Swipe horizontally or tap cards to explore
						</span>
					</div>
				</div>

				<div className="journey-header__nav-group" role="group" aria-label="Timeline navigation controls">
					<button
						type="button"
						className="journey-nav-btn"
						onClick={handlePrev}
						disabled={!canScrollLeft}
						aria-label="Previous milestone (newer)"
						title="Previous milestone"
					>
						<LuChevronLeft className="journey-nav-icon" aria-hidden="true" />
					</button>

					<button
						type="button"
						className="journey-nav-btn"
						onClick={handleNext}
						disabled={!canScrollRight}
						aria-label="Next milestone (older)"
						title="Next milestone"
					>
						<LuChevronRight className="journey-nav-icon" aria-hidden="true" />
					</button>
				</div>
			</header>

			{/* ─── Continuous Horizontal Timeline Stage (Alternating Up & Down) ──── */}
			<div className="journey-stage">
				<div
					ref={trackRef}
					className="journey-track"
					role="region"
					aria-label="Horizontal alternating chronological timeline"
					tabIndex={0}
				>
					<div className="journey-track__inner">
						{/* Continuous glowing horizontal timeline line centered through track */}
						<div className="journey-timeline-line" aria-hidden="true" />

						{/* Milestone columns: alternating Down (even) and Up (odd) */}
						{milestones.map((milestone, idx) => {
							const isActive = idx === activeIndex;
							const isBelow = idx % 2 === 0;
							const position = isBelow ? "bottom" : "top";

							return (
								<div
									key={milestone.id}
									className={`journey-milestone-col journey-milestone-col--${position} ${isActive ? "is-active" : ""}`}
									onClick={() => scrollToMilestone(idx)}
								>
									{/* Top Slot */}
									<div className="journey-slot journey-slot--top">
										{!isBelow ? (
											<>
												<MilestoneCard
													{...milestone}
													isActive={isActive}
													position="top"
												/>
												<div className="journey-connector journey-connector--top" aria-hidden="true" />
											</>
										) : (
											<div className="journey-date-anchor journey-date-anchor--top">
												<span className="journey-node-date journey-node-date--top">
													{milestone.duration}
												</span>
												<div className="journey-stem journey-stem--top" aria-hidden="true" />
											</div>
										)}
									</div>

									{/* Central Node Anchor directly on horizontal line */}
									<div className="journey-node-anchor">
										<button
											type="button"
											className="journey-node-btn"
											onClick={(e) => {
												e.stopPropagation();
												scrollToMilestone(idx);
											}}
											aria-label={`Jump to milestone ${milestone.title} (${milestone.duration})`}
										>
											<div className="journey-node">
												<div className="journey-node__halo" />
												<div className="journey-node__circle">
													<div className="journey-node__core" />
												</div>
											</div>
										</button>
									</div>

									{/* Bottom Slot */}
									<div className="journey-slot journey-slot--bottom">
										{isBelow ? (
											<>
												<div className="journey-connector journey-connector--bottom" aria-hidden="true" />
												<MilestoneCard
													{...milestone}
													isActive={isActive}
													position="bottom"
												/>
											</>
										) : (
											<div className="journey-date-anchor journey-date-anchor--bottom">
												<div className="journey-stem journey-stem--bottom" aria-hidden="true" />
												<span className="journey-node-date journey-node-date--bottom">
													{milestone.duration}
												</span>
											</div>
										)}
									</div>
								</div>
							);
						})}

						{/* End-of-timeline continuation card: Roots & Foundations (Alternating) */}
						<div
							className="journey-origin-col journey-origin-col--top"
							onClick={() => scrollToMilestone(totalMilestones - 1)}
						>
							<div className="journey-slot journey-slot--top">
								<div className="journey-origin-card">
									<span className="journey-origin-badge">
										// 2020 • ORIGIN
									</span>

									<LuSparkles className="journey-origin-sparkle" aria-hidden="true" />

									<h4 className="journey-origin-title">
										Where the path began.
									</h4>

									<button
										type="button"
										className="journey-origin-btn"
										onClick={(e) => {
											e.stopPropagation();
											handleResetToPresent();
										}}
										aria-label="Return to the most recent milestone"
									>
										<LuRotateCcw className="journey-origin-btn-icon" aria-hidden="true" />
										<span>Return to Present</span>
									</button>
								</div>
								<div className="journey-connector journey-connector--top journey-connector--origin" aria-hidden="true" />
							</div>

							<div className="journey-node-anchor">
								<div className="journey-node">
									<div className="journey-node__halo" />
									<div className="journey-node__circle journey-node__circle--origin">
										<div className="journey-node__core journey-node__core--origin" />
									</div>
								</div>
							</div>

							<div className="journey-slot journey-slot--bottom">
								<div className="journey-stem journey-stem--bottom" aria-hidden="true" />
								<span className="journey-node-date journey-node-date--bottom journey-node-date--origin">
									GENESIS
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ─── Bottom Controls & Progress Scrubber ─────────────────── */}
			<footer className="journey-footer">
				<div className="journey-progress-wrap">
					<span className="journey-progress-bound journey-progress-bound--left">
						PRESENT
					</span>

					<div
						ref={progressTrackRef}
						className="journey-progress-track"
						onPointerDown={handleProgressPointerDown}
						onPointerMove={handleProgressPointerMove}
						role="progressbar"
						aria-valuenow={Math.round(scrollProgress * 100)}
						aria-valuemin={0}
						aria-valuemax={100}
						aria-label="Timeline scroll progress"
					>
						<div
							className="journey-progress-fill"
							style={{
								width: scrollProgress > 0 ? `calc(${Math.min(Math.max(scrollProgress * 100, 0), 100)}% + ${scrollProgress >= 0.99 ? 8 : 4}px)` : "0%",
								opacity: scrollProgress > 0.005 ? 1 : 0,
							}}
						/>

						<div className="journey-progress-pips">
							{milestones.map((m, idx) => {
								const pipPercent = totalMilestones > 1 ? (idx / (totalMilestones - 1)) * 100 : 0;
								const isActive = idx === activeIndex;
								const isPassed = idx < activeIndex;
								return (
									<div
										key={m.id}
										className={`journey-pip ${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""}`}
										style={{ left: `${pipPercent}%` }}
										onClick={(e) => {
											e.stopPropagation();
											scrollToMilestone(idx);
										}}
										title={`${m.duration}: ${m.title}`}
									/>
								);
							})}
						</div>
					</div>

					<span className="journey-progress-bound">
						2020 ORIGIN
					</span>
				</div>

				<div className="journey-footer__meta">
					<div className="journey-footer__active-info">
						<span>VIEWING:</span>
						<span className="journey-footer__active-pill">
							{activeMilestone.duration} — {activeMilestone.title}
						</span>
					</div>

					<div className="journey-footer__hint">
						<span className="journey-inst-desktop">Use Mouse Wheel, Trackpad, or [← / →] to navigate</span>
						<span className="journey-inst-mobile">Swipe or tap milestones to navigate</span>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Journey;
