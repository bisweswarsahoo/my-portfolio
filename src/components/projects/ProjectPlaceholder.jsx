import React from "react";
import { FaCode, FaCheck, FaServer, FaBolt, FaLayerGroup } from "react-icons/fa6";
import { getTechIcon } from "../tech/TechnologyIcons";

const ProjectPlaceholder = ({ project }) => {
	if (!project) return null;

	const title = project.title || project.name || "Application Interface";
	const category = project.category || "Full-Stack Development";
	const technologies = project.technologies || [];
	const PrimaryIcon = technologies.length > 0 ? getTechIcon(technologies[0]) : FaCode;

	return (
		<div className="ps-generic-ph">
			{/* Top Application Bar */}
			<div className="ps-gph__topbar">
				<div className="ps-gph__status-wrap">
					<span className="ps-gph__pulse-dot" />
					<span className="ps-gph__status-text">SYS: PRODUCTION DEPLOYED</span>
					<span className="ps-gph__tag">{category.toUpperCase()}</span>
				</div>
				<div className="ps-gph__telemetry">
					<span>BUILD v2.5.0</span>
					<span className="ps-gph__telemetry-sep">•</span>
					<span>{project.date || "2025"}</span>
				</div>
			</div>

			{/* Main Workspace Grid */}
			<div className="ps-gph__body">
				{/* Top Hero Card: Project Identity & Key Metrics */}
				<div className="ps-gph__hero-card">
					<div className="ps-gph__identity">
						<div className="ps-gph__icon-box">
							<PrimaryIcon />
						</div>
						<div className="ps-gph__meta">
							<h4 className="ps-gph__title">{title}</h4>
							<p className="ps-gph__subtitle">
								{project.subtitle || "Scalable architecture & responsive client application"}
							</p>
						</div>
					</div>

					<div className="ps-gph__stats-row">
						<div className="ps-gph__stat-item">
							<span className="ps-gph__stat-val">99.98%</span>
							<span className="ps-gph__stat-lbl">Uptime SLA</span>
						</div>
						<div className="ps-gph__stat-item">
							<span className="ps-gph__stat-val">&lt; 28ms</span>
							<span className="ps-gph__stat-lbl">Avg Latency</span>
						</div>
						<div className="ps-gph__stat-item">
							<span className="ps-gph__stat-val">100%</span>
							<span className="ps-gph__stat-lbl">Tests Passed</span>
						</div>
					</div>
				</div>

				{/* Middle Abstract UI Dashboard: Visual Chart & Metric Bars */}
				<div className="ps-gph__dash-grid">
					{/* Left: SVG Activity & Throughput Graph */}
					<div className="ps-gph__chart-card">
						<div className="ps-gph__chart-header">
							<div className="ps-gph__chart-title">
								<FaBolt className="ps-gph__chart-icon" />
								<span>SYSTEM THROUGHPUT &amp; ACTIVITY</span>
							</div>
							<span className="ps-gph__chart-badge">LIVE STREAM</span>
						</div>

						<svg className="ps-gph__svg" viewBox="0 0 380 110" fill="none">
							<defs>
								<linearGradient id="gph-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
									<stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
								</linearGradient>
							</defs>

							{/* Grid Guide Lines */}
							<line x1="0" y1="28" x2="380" y2="28" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />
							<line x1="0" y1="56" x2="380" y2="56" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />
							<line x1="0" y1="84" x2="380" y2="84" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />

							{/* Filled Area */}
							<path
								d="M 0 85 Q 40 45, 90 60 T 180 35 T 270 50 T 340 25 L 380 40 L 380 110 L 0 110 Z"
								fill="url(#gph-gradient)"
							/>

							{/* Gradient Stroke Line */}
							<path
								d="M 0 85 Q 40 45, 90 60 T 180 35 T 270 50 T 340 25 L 380 40"
								stroke="#38bdf8"
								strokeWidth="2.5"
								strokeLinecap="round"
							/>

							{/* Secondary Pulse Line */}
							<path
								d="M 0 95 Q 50 70, 110 80 T 210 65 T 300 70 L 380 55"
								stroke="#a855f7"
								strokeWidth="1.5"
								strokeDasharray="4 4"
								opacity="0.7"
							/>

							{/* Focus Pulse Point */}
							<circle cx="340" cy="25" r="4.5" fill="#ffffff" />
							<circle cx="340" cy="25" r="9" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8">
								<animate attributeName="r" values="4;14;4" dur="2.5s" repeatCount="indefinite" />
								<animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
							</circle>
						</svg>

						<div className="ps-gph__chart-footer">
							<span>00:00:00</span>
							<span>TX / RX SYNCHRONIZED</span>
							<span>PEAK: 4.8 GB/S</span>
						</div>
					</div>

					{/* Right: Architecture & Pipeline Stack */}
					<div className="ps-gph__pipeline-card">
						<div className="ps-gph__chart-header">
							<div className="ps-gph__chart-title">
								<FaLayerGroup className="ps-gph__chart-icon" />
								<span>PIPELINE HEALTH</span>
							</div>
							<span className="ps-gph__healthy-badge">ALL SYSTEMS NORMAL</span>
						</div>

						<div className="ps-gph__bars-list">
							<div className="ps-gph__bar-row">
								<div className="ps-gph__bar-head">
									<span>Client Viewport</span>
									<span className="ps-gph__bar-perc">98%</span>
								</div>
								<div className="ps-gph__bar-track">
									<div className="ps-gph__bar-fill ps-gph__bar-fill--cyan" style={{ width: "98%" }} />
								</div>
							</div>

							<div className="ps-gph__bar-row">
								<div className="ps-gph__bar-head">
									<span>Backend Services</span>
									<span className="ps-gph__bar-perc">94%</span>
								</div>
								<div className="ps-gph__bar-track">
									<div className="ps-gph__bar-fill ps-gph__bar-fill--purple" style={{ width: "94%" }} />
								</div>
							</div>

							<div className="ps-gph__bar-row">
								<div className="ps-gph__bar-head">
									<span>Database &amp; Cache</span>
									<span className="ps-gph__bar-perc">96%</span>
								</div>
								<div className="ps-gph__bar-track">
									<div className="ps-gph__bar-fill ps-gph__bar-fill--emerald" style={{ width: "96%" }} />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Console Feed */}
				<div className="ps-gph__console">
					<div className="ps-gph__console-prompt">
						<FaServer className="ps-gph__console-icon" />
						<span>$ app --inspect --cluster=primary</span>
					</div>
					<div className="ps-gph__console-output">
						<span className="ps-gph__log-success">[OK] Core modules compiled</span>
						<span className="ps-gph__log-muted">
							Dependencies: {technologies.slice(0, 4).join(" • ") || "Production environment verified"}
						</span>
						<span className="ps-gph__log-accent">
							Ready • Listening on port 443 (SSL/TLS 1.3)
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectPlaceholder;
