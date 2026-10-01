import { FaCode, FaMicrophoneLines, FaWandMagicSparkles } from "react-icons/fa6";
import { FaBootstrap, FaCuttlefish, FaCss3Alt, FaGithub, FaGitAlt, FaHtml5, FaJava, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
	SiAnthropic, SiClaude, SiGoogle, SiGooglegemini, SiN8N, SiOpenai,
	SiAndroidstudio, SiCplusplus, SiExpress, SiHoppscotch, SiJavascript,
	SiLeaflet, SiMongodb, SiMysql, SiPostman, SiRedux, SiTypescript,
	SiDocker, SiLinux, SiNextdotjs, SiTailwindcss, SiPostgresql, SiRedis,
	SiVite, SiFastapi, SiGraphql, SiFirebase
} from "react-icons/si";
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
			"I'm a Computer Science student and an AI Generalist who loves to build and explore. I enjoy working across the stack — from developing intelligent applications with LLMs and AI agents to building scalable backend systems, working with databases, and creating smooth, intuitive user experiences.",
			"I'm always curious, always learning, and excited about how AI can solve real-world problems. I like turning ideas into functional products and continuously exploring new technologies.",
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
				skill("JavaScript", SiJavascript, "#F0DB4F", "The programming language of the web."),
				skill("TypeScript", SiTypescript, "#3178C6", "Typed superset of JavaScript that scales."),
				skill("Java", FaJava, "#ED8B00", "Write once, run anywhere — object-oriented language."),
				skill("Python", FaPython, "#3776AB", "Versatile language for web, AI, and scripting."),
				skill("C", FaCuttlefish, "#A8B9CC", "Low-level, general-purpose systems language."),
				skill("C++", SiCplusplus, "#00599C", "High-performance systems programming language."),
			],
		},
		{
			category: "Web Development",
			items: [
				skill("HTML5", FaHtml5, "#E34F26", "Standard markup language for modern web apps."),
				skill("CSS3", FaCss3Alt, "#1572B6", "Stylesheet language for responsive UI styling."),
				skill("React", FaReact, "#61DAFB", "Component-based library for dynamic user interfaces."),
				skill("Next.js", SiNextdotjs, "#E2E8F0", "Production React framework with SSR and server components."),
				skill("Tailwind CSS", SiTailwindcss, "#06B6D4", "Utility-first CSS framework for rapid modern styling."),
				skill("Node.js", FaNodeJs, "#5FA04E", "JavaScript runtime built on Chrome's V8 engine."),
				skill("Redux", SiRedux, "#764ABC", "Predictable state container for JavaScript apps."),
			],
		},
		{
			category: "Frameworks & Libraries",
			items: [
				skill("FastAPI", SiFastapi, "#009688", "Modern high-performance web framework for Python APIs."),
				skill("Express.js", SiExpress, "#EEEEEE", "Fast, unopinionated, minimalist web framework for Node.js."),
				skill("React Native", FaReact, "#61DAFB", "Native mobile app development using React."),
				skill("Phaser.js", SiJavascript, "#FFCB05", "HTML5 game framework for interactive 2D experiences."),
				skill("Bootstrap", FaBootstrap, "#7952B3", "CSS framework for responsive mobile-first layouts."),
				skill("Leaflet.js", SiLeaflet, "#199900", "Interactive maps library for geospatial data."),
			],
		},
		{
			category: "Databases & Cloud",
			items: [
				skill("MongoDB", SiMongodb, "#47A248", "NoSQL document database for modern applications."),
				skill("PostgreSQL", SiPostgresql, "#4169E1", "Powerful open-source object-relational database."),
				skill("MySQL", SiMysql, "#4479A1", "Popular relational database management system."),
				skill("Redis", SiRedis, "#DC382D", "Ultra-fast in-memory key-value data store & cache."),
				skill("Firebase", SiFirebase, "#FFCA28", "Backend platform for realtime database and auth."),
			],
		},
		{
			category: "DevOps & Tools",
			items: [
				skill("Docker", SiDocker, "#2496ED", "Containerization platform for seamless deployments."),
				skill("Linux", SiLinux, "#FCC624", "Open-source Unix-like operating system kernel."),
				skill("Git", FaGitAlt, "#F05032", "Distributed version control system."),
				skill("GitHub", FaGithub, "#F3F4F6", "Cloud hosting for code collaboration and CI/CD."),
				skill("Vite", SiVite, "#646CFF", "Fast next-generation frontend tooling and bundler."),
				skill("GraphQL", SiGraphql, "#E10098", "Query language and runtime for flexible APIs."),
				skill("VS Code", VscVscode, "#007ACC", "Lightweight, extensible code editor."),
				skill("Android Studio", SiAndroidstudio, "#3DDC84", "Comprehensive IDE for Android app development."),
				skill("Postman", SiPostman, "#FF6C37", "Collaborative platform for API design and testing."),
				skill("Hoppscotch", SiHoppscotch, "#14B8A6", "Open-source, lightweight API development ecosystem."),
				skill("Antigravity", FaWandMagicSparkles, "#F59E0B", "AI-powered coding assistant by Google DeepMind."),
				skill("Terminal", BsTerminal, "#D1D5DB", "Command-line interface for system automation."),
			],
		},
		{
			category: "AI Tools & Automation",
			items: [
				{ name: "Gemini", icon: SiGooglegemini, color: "#4285F4", desc: "Google's next-generation multimodal AI model." },
				{ name: "OpenAI", icon: SiOpenai, color: "#10A37F", desc: "Advanced AI models including GPT-4 and ChatGPT." },
				{ name: "Claude", icon: SiClaude, color: "#D97757", desc: "Anthropic's flagship AI reasoning assistant." },
				{ name: "Google AI Studio", icon: SiGoogle, color: "#4285F4", desc: "Prototyping environment for developer AI workflows." },
				{ name: "Anthropic", icon: SiAnthropic, color: "#D4D4D8", desc: "AI research lab dedicated to beneficial AI safety." },
				{ name: "N8N", icon: SiN8N, color: "#EA4B71", desc: "Self-hostable workflow and API automation engine." },
				{ name: "lovable.ai", icon: FaWandMagicSparkles, color: "#FB7185", desc: "AI-assisted full-stack rapid web app generator." },
				{ name: "happenstance.ai", icon: FaWandMagicSparkles, color: "#F59E0B", desc: "AI-powered contextual productivity & networking tool." },
				{ name: "emergent", icon: FaCode, color: "#818CF8", desc: "Autonomous agent platform for software engineering." },
				{ name: "Wispr Flow", icon: FaMicrophoneLines, color: "#38BDF8", desc: "Real-time AI voice dictation and productivity tool." },
			],
		},
	],
	competitions: [
		{ name: "404: Treasure Not Found!", organizer: "IET On Campus - Amity Student Chapter", date: "March 2025", result: "2nd place", proofUrl: "https://www.linkedin.com/posts/iet-on-campus-amity-university-uttar-pradesh_404treasurenotfound-solvethepuzzle-techadventure-activity-7310696163857317891-0fP5", description: ["Secured 2nd place in a high-intensity puzzle solving event.", "Demonstrated rapid problem-solving and tackled cryptic code puzzles under tight time constraints.", "Used team-based strategies to decipher clues, debug scripts, and unlock progressive stages."] },
		{ name: "The Squid Game Code", organizer: "Amity Institute of Information Technology & Amity School of Engineering and Technology", date: "October 2024", result: "2nd place", proofUrl: "https://www.instagram.com/p/DBZT6Xizjvp/", description: ["Secured 2nd place in a competitive coding event featuring algorithmic challenges.", "Demonstrated problem-solving skills and algorithmic efficiency under time constraints."] },
		{ name: "Code Wars 2024", organizer: "GDG, VRGD in collaboration with IEEE", date: "September 2024", result: "4th place (overall)", proofUrl: "", description: ["Competed as Team BugBusters in a three-level coding and tech recognition quiz.", "Achieved strong results across multiple rounds and secured an overall 4th place."] },
	],
	languages: [
		{ name: "English", level: "Fluent", greeting: "Hi, I am Bisweswar Sahoo." },
		{ name: "Hindi", level: "Fluent", greeting: "नमस्ते, मैं बिस्वेश्वर साहू हूँ।" },
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
