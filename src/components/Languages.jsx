import React, { useState, useEffect } from "react";
import "../styles/Languages.css";

const Languages = () => {
	const languages = [
		{ name: "English", greeting: "Hi, I am Bisweswar Sahoo." },
		{ name: "Hindi", greeting: "नमस्ते, मैं बिस्वेश्वर साहू हूँ।" },
		{ name: "Odia (Native)", greeting: "ନମସ୍କାର, ମୁଁ ବିଶ୍ବେଶ୍ବର ସାହୁ।" },
		{ name: "French (Elemental)", greeting: "Salut, je suis Bisweswar Sahoo." },
	];

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length);
		}, 3000);
		return () => clearInterval(interval);
	}, [languages.length]);

	return (
		<>
			<h2
				className="languages-heading"
				aria-label="Languages I Speak"
			>
				Languages I Speak
			</h2>
			<div className="languages-container">
				<div className="language-slide">
					<h3 className="language-name">{languages[currentIndex].name}</h3>
					<p className="greeting-text">{languages[currentIndex].greeting}</p>
				</div>
				<div
					className="language-indicators"
					role="tablist"
					aria-label="Select language"
				>
					{languages.map((_, index) => (
						<span
							key={index}
							role="tab"
							aria-selected={index === currentIndex}
							className={`indicator ${index === currentIndex ? "active" : ""}`}
							onClick={() => setCurrentIndex(index)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") setCurrentIndex(index);
							}}
							tabIndex={0}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Languages;
