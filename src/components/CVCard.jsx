import "../styles/CVCard.css";
import { useState } from "react";
import portfolioData from "../data/portfolioData.js";
import { sanitizeUrl } from "../utils/security.js";

const CVCard = ({
	isCardHovered,
	setIsCardHovered,
	isFlippedControlled,
	onToggleFlip,
	innerRef,
}) => {
	const [isDownloading, setIsDownloading] = useState(false);
	const [downloadError, setDownloadError] = useState("");
	const [internalFlipped, setInternalFlipped] = useState(false);

	const isFlipped =
		isFlippedControlled !== undefined ? isFlippedControlled : internalFlipped;

	const handleDownload = async (e) => {
		e.stopPropagation();
		setIsDownloading(true);
		setDownloadError("");
		try {
			const { generateResumePdf } = await import("../cv/resumeTemplate.js");
			await generateResumePdf(portfolioData);
		} catch (error) {
			console.error("CV download failed", error);
			setDownloadError(
				error instanceof Error
					? `PDF error: ${error.message}`
					: "Unable to create the PDF. Please try again."
			);
		} finally {
			setIsDownloading(false);
		}
	};

	const handleFlipClick = (e) => {
		if (e) e.stopPropagation();
		if (onToggleFlip) {
			onToggleFlip();
		} else {
			setInternalFlipped((prev) => !prev);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleFlipClick();
		}
	};

	return (
		<div
			ref={innerRef}
			className="cv-card-wrapper"
			onMouseEnter={() => setIsCardHovered && setIsCardHovered(true)}
			onMouseLeave={() => setIsCardHovered && setIsCardHovered(false)}
		>
			{/* Hover Hint Pill: appears at the top of the card on hover */}
			<div
				className="card-hover-flip-hint"
				onClick={handleFlipClick}
				aria-hidden="true"
			>
				<span className="hint-icon">↻</span>
				<span className="hint-text">{isFlipped ? "Tap to view front" : "Tap to flip"}</span>
			</div>

			{/* Floating wrapper: handles the translateY float motion without conflicting with rotateY */}
			<div className="cv-float-wrapper">
				<div
					className={`cv-card-3d ${isFlipped ? "is-flipped" : ""}`}
					onClick={handleFlipClick}
					onKeyDown={handleKeyDown}
					tabIndex={0}
					role="button"
					aria-label={
						isFlipped
							? "Business card back. Click or press Enter to flip to front."
							: "Business card front. Click or press Enter to flip to back."
					}
				>
					{/* ================= FRONT: PHYSICAL WHITE CV CARD ================= */}
					<div className="cv-card-face cv-card-front">
						<div className="cv-card-content">
							<div className="cv-info">
								<span className="cv-name">{portfolioData.name}</span>
								<p className="cv-title">{portfolioData.title}</p>
							</div>

							<div className="cv-action-area">
								<button
									className="cv-download-btn"
									onClick={handleDownload}
									disabled={isDownloading}
									type="button"
									aria-label="Download CV as PDF"
								>
									<span className="cv-download-text">
										{isDownloading ? "Preparing PDF..." : "Download CV"}
									</span>
									<span className="cv-download-icon-wrap" aria-hidden="true">
										{/* Default down arrow */}
										<svg
											className="download-icon icon-default"
											height="16"
											width="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.4"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M12 4v12" />
											<path d="m6 10 6 6 6-6" />
											<path d="M4 20h16" />
										</svg>
										{/* Hover diagonal arrow */}
										<svg
											className="download-icon icon-hover"
											height="16"
											width="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.4"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M7 17 17 7" />
											<path d="M7 7h10v10" />
										</svg>
									</span>
								</button>

								{downloadError && (
									<span className="cv-download-error">{downloadError}</span>
								)}
							</div>
						</div>

						{/* Existing Silhouette / Portrait SVGs */}
						<svg
							className="bg-svg svg1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 64 64"
							aria-hidden="true"
							focusable="false"
						>
							<path
								data-name="layer1"
								strokeMiterlimit="10"
								strokeWidth="5"
								d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z"
							/>
						</svg>
						<svg
							className="bg-svg svg2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 64 64"
							aria-hidden="true"
							focusable="false"
						>
							<path
								data-name="layer1"
								strokeMiterlimit="10"
								strokeWidth="2"
								d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z"
							/>
						</svg>

						{/* Subtle card edge sheen */}
						<div className="card-sheen" aria-hidden="true" />
					</div>

					{/* ================= BACK: MINIMALIST DIGITAL IDENTITY ================= */}
					<div className="cv-card-face cv-card-back">
						{/* Top metadata row */}
						<div className="cv-back-top-meta">
							<span className="cv-back-badge">
								<span className="cv-badge-dot" />
								DIGITAL IDENTITY
							</span>
							<span className="cv-back-id-tag">BS · 2026</span>
						</div>

						{/* Center: Clean spacious typography */}
						<div className="cv-back-center-info">
							<h3 className="cv-back-clean-name">{portfolioData.name}</h3>
							<p className="cv-back-clean-role">{portfolioData.title} & AI Generalist</p>
						</div>

						{/* Bottom: Refined CTA */}
						<div className="cv-back-bottom-bar">
							<a
								href={sanitizeUrl(`mailto:${portfolioData.email}`)}
								className="cv-back-clean-cta"
								onClick={(e) => e.stopPropagation()}
							>
								<span>LET'S BUILD TOGETHER</span>
								<span className="cv-cta-arrow">↗</span>
							</a>
						</div>

						{/* Ambient subtle circuit watermark */}
						<div className="cv-back-ambient-glow" aria-hidden="true" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CVCard;
