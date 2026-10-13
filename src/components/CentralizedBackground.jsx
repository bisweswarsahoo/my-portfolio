import React from "react";
import "../styles/CentralizedBackground.css";

/**
 * CentralizedBackground
 * Single, unified, stationary background system providing a seamless
 * visual foundation across all sections (Journey, Skills,
 * Projects, About, Languages, Footer) in both light and dark themes.
 */
const CentralizedBackground = () => {
	return (
		<div className="centralized-bg" aria-hidden="true">
			{/* 1. Base gradient canvas with smooth theme transition */}
			<div className="centralized-bg__canvas" />

			{/* 2. Ambient floating mesh aurora glow orbs */}
			<div className="centralized-bg__glow centralized-bg__glow--cyan" />
			<div className="centralized-bg__glow centralized-bg__glow--indigo" />
			<div className="centralized-bg__glow centralized-bg__glow--purple" />
			<div className="centralized-bg__glow centralized-bg__glow--azure" />

			{/* 3. High-precision developer tech grid / dot matrix */}
			<div className="centralized-bg__grid" />

			{/* 4. Fine starlight constellation micro-sparkles */}
			<div className="centralized-bg__stars" />

			{/* 5. Edge vignette */}
			<div className="centralized-bg__vignette" />
		</div>
	);
};

export default CentralizedBackground;
