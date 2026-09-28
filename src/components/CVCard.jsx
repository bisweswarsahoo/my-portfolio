import "../styles/CVCard.css";
import { useState } from "react";
import portfolioData from "../data/portfolioData.js";
import { generateResumePdf } from "../cv/resumeTemplate.js";

const CVCard = () => {
	const [isDownloading, setIsDownloading] = useState(false);
	const [downloadError, setDownloadError] = useState("");

	const handleDownload = async () => {
		setIsDownloading(true);
		setDownloadError("");
		try {
			await generateResumePdf(portfolioData);
		} catch (error) {
			console.error("CV download failed", error);
			setDownloadError(error instanceof Error ? `PDF error: ${error.message}` : "Unable to create the PDF. Please try again.");
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<div className="cv-card relative">
			<div className="cv-info">
				<span className="cv-name">{portfolioData.name}</span>
				<p className="cv-title">{portfolioData.title}</p>
			</div>
			<button
				className="cv-download-btn"
				onClick={handleDownload}
				disabled={isDownloading}
				type="button"
				aria-label="Download CV as PDF"
			>
				{isDownloading ? "Preparing PDF..." : "Download CV"}
				<svg
					className="download-icon"
					height="24"
					width="24"
					viewBox="0 0 100 100"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					focusable="false"
				>
					<path
						fillRule="evenodd"
						d="M22.1,77.9a4,4,0,0,1,4-4H73.9a4,4,0,0,1,0,8H26.1A4,4,0,0,1,22.1,77.9ZM35.2,47.2a4,4,0,0,1,5.7,0L46,52.3V22.1a4,4,0,1,1,8,0V52.3l5.1-5.1a4,4,0,0,1,5.7,0,4,4,0,0,1,0,5.6l-12,12a3.9,3.9,0,0,1-5.6,0l-12-12A4,4,0,0,1,35.2,47.2Z"
					/>
				</svg>
			</button>
			{downloadError && <span className="cv-download-error">{downloadError}</span>}

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
		</div>
	);
};

export default CVCard;
