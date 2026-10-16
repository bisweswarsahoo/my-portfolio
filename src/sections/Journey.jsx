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
	LuGraduationCap,
} from "react-icons/lu";
import "../styles/Journey.css";

/**
 * Parses a date or duration string into a numeric score for reverse-chronological sorting.
 * Higher score = more recent (Present -> Past).
 */
const parseDateScore = (item) => {
	const str = item.duration || item.years || item.date || "";
	const lower = str.toLowerCase();

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

				const isDuringUndergrad = item.duration?.includes("2024") || item.duration?.includes("2025") || item.duration?.includes("2023");

				const isFounderOrStartup =
					item.type === "founder" ||
					item.categoryLabel?.toLowerCase().includes("startup") ||
					item.categoryLabel?.toLowerCase().includes("founder") ||
					item.organization?.toLowerCase().includes("orivane") ||
					item.title?.toLowerCase().includes("founder") ||
					item.duration?.toLowerCase().includes("present");

				return {
					id: `exp-${idx}`,
					type: item.type || (isFounderOrStartup ? "founder" : "experience"),
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
					isUndergradEra: isDuringUndergrad && !isFounderOrStartup,
					eraBadge: isFounderOrStartup ? undefined : (isDuringUndergrad ? "Amity CSE (2022–2026)" : undefined),
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
					isUndergradEra: true,
					eraBadge: "Amity CSE (2022–2026)",
					sortScore: parseDateScore(item),
				};
			}),

			// Academic Degrees & Schools (Synchronized Degree Milestone & Commencement Anchor for each level)
			...visibleEducation.flatMap((item, idx) => {
				const isCollege = item.degree?.toLowerCase().includes("bachelor") || item.years?.includes("2026");
				const isHighSchool = item.degree?.toLowerCase().includes("senior") || item.years?.includes("2022");
				const eduIcon = item.icon || (isCollege ? amitylogo : isHighSchool ? adyantlogo : schoollogo);

				if (isCollege) {
					// 1. Primary Degree Milestone (graduating/current expected: 2026)
					const mainDegree = {
						id: `edu-${idx}-degree`,
						refKey: "btech-degree",
						isCollegeDegree: true,
						isUndergradEra: true,
						type: "education",
						categoryLabel: "UNDERGRADUATE DEGREE",
						title: item.degree,
						organization: item.institution ? item.institution.split(", ")[0] : "Amity University",
						location: item.institution ? item.institution.split(", ").slice(1).join(", ") : "Noida, India",
						duration: "2026",
						grade: item.grade,
						details: item.details || [],
						icon: eduIcon,
						partnerLogos: item.partnerLogos || [],
						bgImage: item.bgImage || item.image || item.backgroundImage,
						sortScore: 2026.06,
						referenceBadge: {
							label: "Commenced Sep 2022",
							targetKey: "btech-start",
						},
					};

					// 2. Linked Commencement Anchor at Sep 2022 (same original card data)
					const commencementAnchor = {
						id: `edu-${idx}-commencement`,
						refKey: "btech-start",
						isCommencementAnchor: true,
						isUndergradEra: true,
						type: "education",
						categoryLabel: "UNDERGRADUATE DEGREE",
						title: item.degree,
						organization: item.institution ? item.institution.split(", ")[0] : "Amity University",
						location: item.institution ? item.institution.split(", ").slice(1).join(", ") : "Noida, India",
						duration: "SEP 2022",
						grade: item.grade,
						details: item.details || [],
						icon: eduIcon,
						partnerLogos: item.partnerLogos || [],
						bgImage: item.bgImage || item.image || item.backgroundImage,
						sortScore: 2022.09,
						referenceBadge: {
							label: "Passed Out 2026",
							targetKey: "btech-degree",
						},
					};

					return [mainDegree, commencementAnchor];
				}

				if (isHighSchool) {
					// 1. Senior Secondary Passed Out Point (2022)
					const seniorPassedOut = {
						id: `edu-${idx}-end`,
						refKey: "senior-secondary-end",
						isSeniorSecondary: true,
						type: "education",
						categoryLabel: "SENIOR SECONDARY",
						title: item.degree,
						organization: item.institution ? item.institution.split(", ")[0] : "Adyant Higher Secondary School",
						location: item.institution ? item.institution.split(", ").slice(1).join(", ") : "Bhubaneswar, India",
						duration: "2022",
						grade: item.grade,
						details: item.details || [],
						icon: eduIcon,
						partnerLogos: item.partnerLogos || [],
						bgImage: item.bgImage || item.image || item.backgroundImage,
						sortScore: 2022.05,
						referenceBadge: {
							label: "Commenced 2020",
							targetKey: "senior-secondary-start",
						},
					};

					// 2. Senior Secondary Commencement Point (2020) - same original card data
					const seniorCommenced = {
						id: `edu-${idx}-start`,
						refKey: "senior-secondary-start",
						isSeniorSecondary: true,
						type: "education",
						categoryLabel: "SENIOR SECONDARY",
						title: item.degree,
						organization: item.institution ? item.institution.split(", ")[0] : "Adyant Higher Secondary School",
						location: item.institution ? item.institution.split(", ").slice(1).join(", ") : "Bhubaneswar, India",
						duration: "2020",
						grade: item.grade,
						details: item.details || [],
						icon: eduIcon,
						partnerLogos: item.partnerLogos || [],
						bgImage: item.bgImage || item.image || item.backgroundImage,
						sortScore: 2020.07,
						referenceBadge: {
							label: "Passed Out 2022",
							targetKey: "senior-secondary-end",
						},
					};

					return [seniorPassedOut, seniorCommenced];
				}

				// Secondary School & Complete Schooling (2008 - 2020)
				// 1. Secondary Passed Out Point (2020)
				const secondaryPassedOut = {
					id: `edu-${idx}-end`,
					refKey: "secondary-end",
					isSecondary: true,
					type: "education",
					categoryLabel: "SCHOOLING",
					title: item.degree,
					organization: item.institution ? item.institution.split(", ")[0] : "C.A.M.I.E & R Matrujyoti",
					location: item.institution ? item.institution.split(", ").slice(1).join(", ") : "Jharsuguda, India",
					duration: "2020",
					grade: item.grade,
					details: item.details || [],
					icon: eduIcon,
					partnerLogos: item.partnerLogos || [],
					bgImage: item.bgImage || item.image || item.backgroundImage,
					sortScore: 2020.03,
					referenceBadge: {
						label: "Commenced 2008",
						targetKey: "secondary-start",
					},
				};

				// 2. Secondary / Complete Schooling Commencement Point (2008) - same original card data
				const secondaryCommenced = {
					id: `edu-${idx}-start`,
					refKey: "secondary-start",
					isSecondary: true,
					type: "education",
					categoryLabel: "SCHOOLING",
					title: item.degree,
					organization: item.institution ? item.institution.split(", ")[0] : "C.A.M.I.E & R Matrujyoti",
					location: item.institution ? item.institution.split(", ").slice(1).join(", ") : "Jharsuguda, India",
					duration: "2008",
					grade: item.grade,
					details: item.details || [],
					icon: eduIcon,
					partnerLogos: item.partnerLogos || [],
					bgImage: item.bgImage || item.image || item.backgroundImage,
					sortScore: 2008.06,
					referenceBadge: {
						label: "Passed Out 2020",
						targetKey: "secondary-end",
					},
				};

				return [secondaryPassedOut, secondaryCommenced];
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

	// Degree index and commencement index for jumping between linked milestones
	const degreeIndex = useMemo(() => milestones.findIndex((m) => m.refKey === "btech-degree"), [milestones]);
	const commencementIndex = useMemo(() => milestones.findIndex((m) => m.refKey === "btech-start"), [milestones]);

	const handleReferenceJump = useCallback((targetKey) => {
		if (!targetKey) return;
		const targetIndex = milestones.findIndex((m) => m.refKey === targetKey);
		if (targetIndex !== -1) {
			scrollToMilestone(targetIndex);
		}
	}, [milestones, scrollToMilestone]);

	// Calculate the exact horizontal pixel span of each educational era
	const [eraSpans, setEraSpans] = useState({
		undergrad: null,
		senior: null,
		schooling: null,
	});

	const updateEraSpans = useCallback(() => {
		const track = trackRef.current;
		if (!track) return;
		const cols = track.querySelectorAll(".journey-milestone-col");
		if (!cols || cols.length === 0) return;

		const getSpan = (key1, key2) => {
			const idx1 = milestones.findIndex((m) => m.refKey === key1);
			const idx2 = milestones.findIndex((m) => m.refKey === key2);
			if (idx1 !== -1 && idx2 !== -1 && cols[idx1] && cols[idx2]) {
				const c1 = cols[idx1].offsetLeft + cols[idx1].offsetWidth / 2;
				const c2 = cols[idx2].offsetLeft + cols[idx2].offsetWidth / 2;
				return {
					left: Math.min(c1, c2),
					width: Math.abs(c2 - c1),
					startIdx: Math.min(idx1, idx2),
					endIdx: Math.max(idx1, idx2),
				};
			}
			return null;
		};

		setEraSpans({
			undergrad: getSpan("btech-degree", "btech-start"),
			senior: getSpan("senior-secondary-end", "senior-secondary-start"),
			schooling: getSpan("secondary-end", "secondary-start"),
		});
	}, [milestones]);

	useEffect(() => {
		updateEraSpans();
		const onResize = () => updateEraSpans();
		window.addEventListener("resize", onResize);
		const timer = setTimeout(updateEraSpans, 150);

		return () => {
			window.removeEventListener("resize", onResize);
			clearTimeout(timer);
		};
	}, [updateEraSpans]);

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

	// Dynamically compute the active/selected era to update the header era pill
	const currentEra = useMemo(() => {
		if (!activeMilestone) {
			return {
				id: "undergrad",
				label: "2022 — 2026 • UNDERGRADUATE DEGREE ERA",
				type: "undergrad",
				targetIndex: degreeIndex,
			};
		}

		const isStartup =
			activeMilestone.type === "founder" ||
			activeMilestone.categoryLabel?.toLowerCase().includes("startup") ||
			activeMilestone.categoryLabel?.toLowerCase().includes("founder") ||
			activeMilestone.organization?.toLowerCase().includes("orivane") ||
			activeMilestone.title?.toLowerCase().includes("founder") ||
			activeMilestone.duration?.toLowerCase().includes("present");

		if (isStartup) {
			return {
				id: "founder",
				label: "2026 — PRESENT • STARTUP ERA",
				type: "founder",
				targetIndex: 0,
			};
		}

		if (
			activeMilestone.isUndergradEra ||
			activeMilestone.isCollegeDegree ||
			activeMilestone.isCommencementAnchor
		) {
			return {
				id: "undergrad",
				label: "2022 — 2026 • UNDERGRADUATE DEGREE ERA",
				type: "undergrad",
				targetIndex: degreeIndex,
			};
		}

		if (
			activeMilestone.categoryLabel?.toLowerCase().includes("senior") ||
			activeMilestone.isSeniorSecondary ||
			activeMilestone.organization?.toLowerCase().includes("adyant")
		) {
			return {
				id: "senior-secondary",
				label: "2020 — 2022 • SENIOR SECONDARY ERA",
				type: "senior",
				targetIndex: activeIndex,
			};
		}

		if (
			activeMilestone.categoryLabel?.toLowerCase().includes("schooling") ||
			activeMilestone.categoryLabel?.toLowerCase().includes("secondary") ||
			activeMilestone.isSecondary ||
			activeMilestone.organization?.toLowerCase().includes("matrujyoti") ||
			activeMilestone.duration === "2008" ||
			activeMilestone.duration === "2020"
		) {
			return {
				id: "secondary",
				label: "2008 — 2020 • SCHOOLING ERA",
				type: "secondary",
				targetIndex: activeIndex,
			};
		}

		return {
			id: "genesis",
			label: "2008 • SCHOOLING ERA",
			type: "origin",
			targetIndex: totalMilestones - 1,
		};
	}, [activeMilestone, activeIndex, degreeIndex, totalMilestones]);

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

					{/* Dynamic Era Pill: Placed under the description, changes according to selected era */}
					<button
						type="button"
						className={`journey-header__era-pill journey-header__era-pill--${currentEra.type}`}
						onClick={() => currentEra.targetIndex !== undefined && scrollToMilestone(currentEra.targetIndex)}
						title={`Jump to ${currentEra.label}`}
						aria-label={`Selected era: ${currentEra.label}. Click to jump to milestone.`}
					>
						<span className="journey-header__era-pulse-dot" />
						{currentEra.type === "founder" || currentEra.type === "origin" ? (
							<LuSparkles className="journey-header__era-icon" aria-hidden="true" />
						) : (
							<LuGraduationCap className="journey-header__era-icon" aria-hidden="true" />
						)}
						<span className="journey-header__era-text">
							{currentEra.label}
						</span>
					</button>
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
						<div className="journey-timeline-line" aria-hidden="true">
							{/* Active Era Energy Beams on the central line */}
							{eraSpans.undergrad && (
								<div
									className="journey-era-beam journey-era-beam--undergrad"
									style={{
										left: `${eraSpans.undergrad.left}px`,
										width: `${eraSpans.undergrad.width}px`,
									}}
								/>
							)}
							{eraSpans.senior && (
								<div
									className="journey-era-beam journey-era-beam--senior"
									style={{
										left: `${eraSpans.senior.left}px`,
										width: `${eraSpans.senior.width}px`,
									}}
								/>
							)}
							{eraSpans.schooling && (
								<div
									className="journey-era-beam journey-era-beam--schooling"
									style={{
										left: `${eraSpans.schooling.left}px`,
										width: `${eraSpans.schooling.width}px`,
									}}
								/>
							)}
						</div>

						{/* Undergraduate Era Bracket */}
						{eraSpans.undergrad && (
							<div
								className="journey-era-bracket journey-era-bracket--undergrad"
								style={{
									left: `${eraSpans.undergrad.left}px`,
									width: `${eraSpans.undergrad.width}px`,
								}}
								aria-label="Undergraduate Degree Academic Era (Sep 2022 to 2026)"
							>
								<div
									className="journey-era-bracket__terminal journey-era-bracket__terminal--start"
									onClick={() => scrollToMilestone(eraSpans.undergrad.startIdx)}
									title="Click to view Undergraduate Degree Milestone"
									role="button"
									tabIndex={0}
								>
									<span className="journey-era-bracket__term-tag journey-era-bracket__term-tag--undergrad">
										Graduate
									</span>
								</div>

								<div
									className="journey-era-bracket__terminal journey-era-bracket__terminal--end"
									onClick={() => scrollToMilestone(eraSpans.undergrad.endIdx)}
									title="Click to view Undergraduate Commencement Anchor"
									role="button"
									tabIndex={0}
								>
									<span className="journey-era-bracket__term-tag journey-era-bracket__term-tag--undergrad">
										Commencement
									</span>
								</div>
							</div>
						)}

						{/* Senior Secondary Era Bracket */}
						{eraSpans.senior && (
							<div
								className="journey-era-bracket journey-era-bracket--senior"
								style={{
									left: `${eraSpans.senior.left}px`,
									width: `${eraSpans.senior.width}px`,
								}}
								aria-label="Senior Secondary School Era (2020 to 2022)"
							>
								<div
									className="journey-era-bracket__terminal journey-era-bracket__terminal--start"
									onClick={() => scrollToMilestone(eraSpans.senior.startIdx)}
									title="Click to view Senior Secondary Passed Out Milestone"
									role="button"
									tabIndex={0}
								>
									<span className="journey-era-bracket__term-tag journey-era-bracket__term-tag--senior">
										High School Graduate
									</span>
								</div>

								<div
									className="journey-era-bracket__terminal journey-era-bracket__terminal--end"
									onClick={() => scrollToMilestone(eraSpans.senior.endIdx)}
									title="Click to view Senior Secondary Commencement Anchor"
									role="button"
									tabIndex={0}
								>
									<span className="journey-era-bracket__term-tag journey-era-bracket__term-tag--senior">
										Commencement
									</span>
								</div>
							</div>
						)}

						{/* Schooling Era Bracket */}
						{eraSpans.schooling && (
							<div
								className="journey-era-bracket journey-era-bracket--schooling"
								style={{
									left: `${eraSpans.schooling.left}px`,
									width: `${eraSpans.schooling.width}px`,
								}}
								aria-label="Schooling Era (2008 to 2020)"
							>
								<div
									className="journey-era-bracket__terminal journey-era-bracket__terminal--start"
									onClick={() => scrollToMilestone(eraSpans.schooling.startIdx)}
									title="Click to view Schooling Passed Out Milestone"
									role="button"
									tabIndex={0}
								>
									<span className="journey-era-bracket__term-tag journey-era-bracket__term-tag--schooling">
										Middle School Graduate
									</span>
								</div>

								<div
									className="journey-era-bracket__terminal journey-era-bracket__terminal--end"
									onClick={() => scrollToMilestone(eraSpans.schooling.endIdx)}
									title="Click to view Schooling Commencement Anchor"
									role="button"
									tabIndex={0}
								>
									<span className="journey-era-bracket__term-tag journey-era-bracket__term-tag--schooling">
										Commencement
									</span>
								</div>
							</div>
						)}

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
													onReferenceClick={() => handleReferenceJump(milestone.referenceBadge?.targetKey)}
													onEraClick={() => scrollToMilestone(degreeIndex)}
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
													onReferenceClick={() => handleReferenceJump(milestone.referenceBadge?.targetKey)}
													onEraClick={() => scrollToMilestone(degreeIndex)}
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
										// 2008 • ORIGIN
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
						2008 ORIGIN
					</span>
				</div>

				<div className="journey-footer__meta">
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
