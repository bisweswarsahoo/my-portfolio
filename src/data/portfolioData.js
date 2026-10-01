import { FaCode, FaMicrophoneLines, FaWandMagicSparkles } from "react-icons/fa6";
import { FaBootstrap, FaCuttlefish, FaCss3Alt, FaGithub, FaGitAlt, FaHtml5, FaJava, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { SiAnthropic, SiClaude, SiGoogle, SiGooglegemini, SiN8N, SiOpenai, SiAndroidstudio, SiCplusplus, SiExpress, SiHoppscotch, SiJavascript, SiLeaflet, SiMongodb, SiMysql, SiPostman, SiRedux, SiTypescript } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { BsTerminal } from "react-icons/bs";

const skill = (name, icon, color = "currentColor", desc = "") => ({ name, icon, color, desc });

const portfolioData = {
	name: "Bisweswar Sahoo",
	title: "Fullstack Developer",
	role: "Developer",
	profileImage: "https://github.com/bisweswarsahoo.png",
	portfolioUrl: "https://bisweswarsahoo.github.io/my-portfolio",
	email: "bisweswarsahoo.jsg@gmail.com",
	phone: "+91 9938386533",
	github: "https://github.com/bisweswarsahoo",
	linkedin: "https://linkedin.com/in/bisweswarsahoo",
	about: {
		heading: "About Me",
		paragraphs: [
			"Hello! I'm a passionate software developer with expertise in full-stack development, mobile applications, and cloud-based solutions. I love solving complex problems and creating scalable applications that make a difference.",
			"My technical skills include working with React, Node.js, Java, Python, and MongoDB. I am always exploring new technologies and love collaborating on exciting projects.",
			"Feel free to check out my projects and connect with me!",
		],
		disclaimer: "Building scalable and impactful digital solutions",
	},
	socials: [
		{ key: "instagram", name: "Instagram", username: "@_bisweswarsahoo_", about: "Follow for updates", text: "Instagram", href: "#" },
		{ key: "twitter", name: "Twitter", username: "@bisweswarsahoo", about: "Latest tweets", text: "Twitter", href: "#" },
		{ key: "github", name: "GitHub", username: "@bisweswarsahoo", about: "15+ Repositories", text: "GitHub", href: "https://github.com/bisweswarsahoo" },
		{ key: "discord", name: "Discord", username: "@bisweswarsahoo", about: "Join the community", text: "Discord", href: "#" },
		{ key: "linkedin", name: "LinkedIn", username: "@bisweswarsahoo", about: "Professional network", text: "LinkedIn", href: "https://linkedin.com/in/bisweswarsahoo" },
	],
	projects: [
		{
			name: "SeeMeWatch - Movie & TV Show Tracking App",
			techStack: "React Native, Expo, TypeScript, Zustand, MMKV, TMDB API, Simkl API, Axios, React Navigation, FlashList",
			description: ["Built a mobile app for tracking movies and TV shows with TMDB and Simkl API integration.", "Implemented Zustand state management and high-performance local storage with react-native-mmkv.", "Developed custom collections, watchlists, search, and automatic viewing history tracking.", "Designed an internationalized UI with dark/light themes and smooth Reanimated animations.", "Implemented offline caching for seamless access and performant lists using FlashList."],
			sourceCode: "",
			liveDemo: "",
		},
		{
			name: "ScamGuard AI - Browser-Based Multi-Modal Scam Detection System",
			techStack: "Python, FastAPI, Machine Learning, Chrome Extension API, TF-IDF, YOLOv8, JavaScript",
			description: ["Built a Chrome extension with ML-powered real-time scam detection achieving approximately 97% accuracy and 0.99 ROC-AUC.", "Developed a FastAPI backend serving a hybrid text classifier using TF-IDF and handcrafted lexical features with approximately 90% scam recall.", "Implemented webpage text extraction with risk-score visualization and an explanation engine.", "Designed a modular architecture supporting future image and audio fraud detection.", "Added rule-based phishing URL detection and YOLO-based fake logo/QR identification, combined through a unified risk scoring engine.", "Implemented concurrent text and image analysis with configurable risk weighting (60/40 text-image) and instant SAFE/SUSPICIOUS/SCAM verdicts."],
			sourceCode: "",
			liveDemo: "",
		},
		{
			name: "Castify - A Collaborative Platform for Artists",
			techStack: "React Native, Java, Microservices, MongoDB, PostgreSQL, Firebase",
			description: ["Developed a platform enabling artists to collaborate and gain experience in acting, singing, dancing, poetry, and more.", "Created a casting portal for finding job opportunities.", "Designed a collaborative space for independent projects and networking.", "Integrated Firebase for authentication and real-time updates."],
			sourceCode: "",
			liveDemo: "",
		},
		{
			name: "Heatmap: Interactive Geospatial Data Visualization Platform",
			techStack: "React.js, Leaflet.js, Python, Ant Design",
			description: ["Architected a dynamic React and Leaflet.js frontend with customizable heatmap layers, filters, and bounding-box zoom logic.", "Developed a scalable Flask backend exposing RESTful API endpoints with CORS handling and environment-based configuration.", "Optimized performance by caching API data in localStorage and implementing efficient geographic bounding-box calculations.", "Enhanced UX with dark/light themes, loading indicators, and a responsive Ant Design layout.", "Added multiple-select filters for intuitive data exploration."],
			sourceCode: "",
			liveDemo: "",
		},
		{
			name: "NodeNexus - Real-time Community Chat Platform",
			techStack: "MERN Stack, Socket.io, JWT, AES Encryption",
			description: ["Developed a real-time chat application for seamless interaction in communities.", "Implemented AES-256 encryption for secure messaging.", "Integrated Socket.io for instant messaging and notifications.", "Features include group chats, user authentication, and customizable profiles.", "Designed secure RESTful APIs with Express.js and MongoDB for user profiles, chats and messages, integrating JWT authentication.", "Implemented real-time messaging with Socket.io, including presence checks, typing indicators, and instant broadcasts.", "Enhanced reliability with centralized error handling, CORS support, and optimized middleware for cross-origin requests."],
			sourceCode: "https://github.com/CandybarCruncher/NodeNexus",
			liveDemo: "https://nodenexus-d11u.onrender.com/",
		},

	],
	experience: [{ title: "Web Development Intern", organization: "Jabsz Gaming Studios LLP", location: "Gurugram, India", duration: "May 2025 - July 2025", details: ["Engineered and optimized gameplay mechanics using TypeScript and Phaser.js for the 2D arcade title Engulf.", "Architected interactive bot opponents with behavior trees to improve challenge dynamics.", "Designed and integrated pause, main menu, and game-over UI flows with consistent scene transitions.", "Refined asset management pipelines and enforced GitHub pull-request and code-review standards.", "Developed player controls, collision detection, and arena logic for the game Engulf: Consume. Survive. Dominate."] }],
	education: [
		{ degree: "Bachelor of Technology (B. Tech.) in Computer Science & Engineering", institution: "Amity University, Noida, India", years: "2022 - 2026", grade: "CGPA: 8.27" },
		{ degree: "Senior Secondary School (Class XII)", institution: "Adyant Higher Secondary School, Bhubaneswar, India", years: "2020 - 2022", grade: "Percentage: 81%" },
		{ degree: "Secondary School (Class X)", institution: "C.A.M.I.E & R Matrujyoti, Jharsuguda, India", years: "2020", grade: "Percentage: 78.6%" },
	],
	skills: [
		{
			category: "Programming Languages",
			items: [
				skill("JavaScript",  SiJavascript, "#F0DB4F", "The programming language of the web."),
				skill("TypeScript",  SiTypescript, "#3178C6", "Typed superset of JavaScript that scales."),
				skill("Java",        FaJava,       "#007396", "Write once, run anywhere — object-oriented language."),
				skill("Python",      FaPython,     "#3776AB", "Versatile language for web, AI and scripting."),
				skill("C",           FaCuttlefish, "#A8B9CC", "Low-level, general-purpose systems language."),
				skill("C++",         SiCplusplus,  "#00599C", "High-performance systems programming language."),
			],
		},
		{
			category: "Web Development",
			items: [
				skill("HTML",     FaHtml5,     "#E34F26", "Standard markup language for the web."),
				skill("CSS",      FaCss3Alt,   "#1572B6", "Stylesheet language for designing web pages."),
				skill("JavaScript", SiJavascript, "#F0DB4F", "The programming language of the web."),
				skill("Node.js",  FaNodeJs,    "#339933", "JavaScript runtime built on Chrome's V8 engine."),
				skill("React.js", FaReact,     "#61DAFB", "A JavaScript library for building user interfaces."),
				skill("Redux",    SiRedux,     "#764ABC", "Predictable state container for JS apps."),
			],
		},
		{
			category: "Frameworks & Libraries",
			items: [
				skill("Phaser.js",    SiJavascript, "#FFCB05", "HTML5 game framework for web-based games."),
				skill("Bootstrap",    FaBootstrap,  "#7952B3", "Popular CSS framework for responsive design."),
				skill("React Native", FaReact,      "#61DAFB", "Build native mobile apps with React."),
				skill("Express.js",   SiExpress,    "#ffffff", "Fast, minimalist web framework for Node.js."),
				skill("Leaflet.js",   SiLeaflet,    "#199900", "Open-source JavaScript library for interactive maps."),
			],
		},
		{
			category: "Databases & Messaging",
			items: [
				skill("MongoDB",       SiMongodb, "#47A248", "NoSQL document-oriented database."),
				skill("MongoDB Atlas", SiMongodb, "#47A248", "Fully managed cloud MongoDB database service."),
				skill("MySQL",         SiMysql,   "#4479A1", "Popular open-source relational database."),
			],
		},
		{
			category: "Tools & Technologies",
			items: [
				skill("Git",            FaGitAlt,          "#F05032", "Distributed version control system."),
				skill("GitHub",         FaGithub,          "#ebe5e5", "Platform for hosting and collaborating on code."),
				skill("VS Code",        VscVscode,         "#007ACC", "Lightweight, powerful source-code editor."),
				skill("Android Studio", SiAndroidstudio,   "#3DDC84", "Official IDE for Android development."),
				skill("Postman",        SiPostman,         "#FF6C37", "API development and testing platform."),
				skill("Hoppscotch",     SiHoppscotch,      "#14B8A6", "Open-source API development ecosystem."),
				skill("Antigravity",    FaWandMagicSparkles, "#F59E0B", "AI-powered coding assistant by Google DeepMind."),
				skill("Terminal",       BsTerminal,        "#b8b4b4", "Command-line interface for system interaction."),
			],
		},
		{
			category: "AI Tools & Automation",
			items: [
				{ name: "happenstance.ai", icon: FaWandMagicSparkles, color: "#F59E0B", desc: "AI-powered productivity and workflow tool." },
				{ name: "Claude",          icon: SiClaude,             color: "#D97757", desc: "AI assistant built by Anthropic." },
				{ name: "Anthropic",       icon: SiAnthropic,          color: "#111827", desc: "AI safety company behind Claude." },
				{ name: "OpenAI",          icon: SiOpenai,             color: "#10A37F", desc: "AI research and deployment company." },
				{ name: "Gemini",          icon: SiGooglegemini,       color: "#4285F4", desc: "Google's multimodal AI model." },
				{ name: "Google AI Studio",icon: SiGoogle,             color: "#4285F4", desc: "Google's AI development and prototyping platform." },
				{ name: "N8N",             icon: SiN8N,                color: "#EA4B71", desc: "Workflow automation and integration platform." },
				{ name: "lovable.ai",      icon: FaWandMagicSparkles,  color: "#FB7185", desc: "AI-powered full-stack web app builder." },
				{ name: "emergent",        icon: FaCode,               color: "#6366F1", desc: "AI-driven software development platform." },
				{ name: "Wispr Flow",      icon: FaMicrophoneLines,    color: "#0EA5E9", desc: "AI voice-to-text productivity tool." },
			],
		},
	],
	competitions: [
		{ name: "404: Treasure Not Found!", organizer: "IET On Campus - Amity Student Chapter", date: "March 2025", result: "2nd place", proofUrl: "https://www.linkedin.com/posts/iet-on-campus-amity-university-uttar-pradesh_404treasurenotfound-solvethepuzzle-techadventure-activity-7310696163857317891-0fP5", description: ["Secured 2nd place in a high-intensity puzzle solving event.", "Demonstrated rapid problem-solving and tackled cryptic code puzzles under tight time constraints.", "Used team-based strategies to decipher clues, debug scripts, and unlock progressive stages."] },
		{ name: "The Squid Game Code", organizer: "Amity Institute of Information Technology & Amity School of Engineering and Technology", date: "October 2024", result: "2nd place", proofUrl: "https://www.instagram.com/p/DBZT6Xizjvp/", description: ["Secured 2nd place in a competitive coding event featuring algorithmic challenges.", "Demonstrated problem-solving skills and algorithmic efficiency under time constraints."] },
		{ name: "Code Wars 2024", organizer: "GDG, VRGD in collaboration with IEEE", date: "September 2024", result: "4th place (overall)", proofUrl: "", description: ["Competed as Team BugBusters in a three-level coding and tech recognition quiz.", "Achieved strong results across multiple rounds and secured an overall 4th place."] },
	],
	languages: [
		{ name: "English", level: "Professional", greeting: "Hi, I am Bisweswar Sahoo." },
		{ name: "Hindi", level: "Professional", greeting: "नमस्ते, मैं बिस्वेश्वर साहू हूँ।" },
		{ name: "Odia", level: "Native", greeting: "ନମସ୍କାର, ମୁଁ ବିଶ୍ୱେଶ୍ୱର ସାହୁ ଅଟେ।" },
		{ name: "French", level: "Beginner", greeting: "Bonjour, je suis Bisweswar Sahoo." },
		{ name: "Spanish", level: "Beginner", greeting: "Hola, soy Bisweswar Sahoo." },
		{ name: "Chinese (Mandarin)", level: "Beginner", greeting: "你好，我是比斯韦斯瓦尔·萨胡。" },
	],
	hobbies: [
		{ name: "Puzzle Solving", note: "Logical & Analytical Skills" },
		{ name: "Gaming", note: "Problem-solving & Team Skills" },
		{ name: "Travelling", note: "" },
		{ name: "Watching Movies/Shows", note: "" },
	],
};

export default portfolioData;
