import latexTemplate from "./resumeTemplate.tex?raw";

const latexEscape = (value) =>
	String(value || "")
		.replace(/\\/g, "\\textbackslash{}")
		.replace(/([{}%$&#_])/g, "\\$1")
		.replace(/~/g, "\\textasciitilde{}");

const latexUrl = (value) =>
	String(value || "")
		.replace(/([{}%$&#_])/g, "\\$1")
		.replace(/~/g, "\\textasciitilde{}");

const href = (url, label) => `\\href{${latexUrl(url)}}{${latexEscape(label)}}`;
const bullets = (items = []) => (items || []).filter(Boolean).map((item) => `    \\item ${latexEscape(item)}`).join("\n");
const detailsFor = (item) => item?.details || item?.description || [];
const validUrl = (url) => typeof url === "string" && url.trim() && url.trim() !== "#";

const contactLine = (resume) => {
	const directContacts = [];
	if (resume.email) directContacts.push(`\\faEnvelope~ ${href(`mailto:${resume.email}`, resume.email)}`);
	if (resume.phone) directContacts.push(`\\reflectbox{\\faPhone}~ ${href(`tel:${resume.phone}`, resume.phone)}`);
	const profiles = [];
	if (resume.github) profiles.push(`\\faGithub~ ${href(resume.github, `github.com/${resume.github.split("/").pop()}`)}`);
	if (resume.linkedin) profiles.push(`\\faLinkedin~ ${href(resume.linkedin, `linkedin.com/in/${resume.linkedin.split("/").pop()}`)}`);
	return [
		directContacts.length ? `${directContacts.join(" \\quad ")} \\\\` : "",
		profiles.join(" \\quad "),
	].filter(Boolean).join("\n    ");
};

const projectBlock = (project) => {
	const links = [
		validUrl(project.sourceCode) && `\\faGithub~ ${href(project.sourceCode, "Source Code")}`,
		validUrl(project.liveDemo) && `\\faGlobe~ ${href(project.liveDemo, "Live Demo")}`,
	]
		.filter(Boolean)
		.join(" \\quad ");
	const bullets = (project.description || []).filter(Boolean).slice(0, 3).map((detail) => `    \\item ${latexEscape(detail)}`).join("\n") || "";
	return [
		`\\entry{${latexEscape(project.name)}}{${links}}{${latexEscape(project.techStack)}}`,
		"\\begin{itemize}",
		bullets || "",
		"\\end{itemize}",
		"\\vspace{6pt}",
	].join("\n");
};

const experienceBlock = (experience) =>
	experience
		.map((item) => {
			const detailBullets = bulletsForDetails(detailsFor(item).slice(0, 3)) || "";
			return [
				`\\entry{${latexEscape(item.title)}}{${latexEscape((item.duration || "").replace(/ - /g, " -- "))}}{${latexEscape(`${item.organization || ""}${item.location ? ` -- ${item.location}` : ""}`)}}`,
				"\\begin{itemize}",
				detailBullets,
				"\\end{itemize}",
			].join("\n");
		})
		.join("\n\\vspace{6pt}\n");

const educationBlock = (education) =>
	education
		.map((item, index) =>
			[`\\edu{${latexEscape(item.degree)}}{${latexEscape(item.institution)}}{${latexEscape(item.years)}}{${latexEscape(item.grade)}}`, index < education.length - 1 ? "\\gap" : ""].join("\n"),
		)
		.join("\n");

const skillsBlock = (skills) =>
	skills.map((group) => {
		const names = group.items.map((skill) => typeof skill === "string" ? skill : skill?.name).filter(Boolean);
		return `    \\item \\textbf{${latexEscape(group.category)}:} ${latexEscape(names.join(", "))}`;
	}).join("\n");

const bulletsForDetails = (details) => bullets(details);

const optionalSections = (resume) => {
	const sections = [];
	const competitions = (resume.competitions || [])
		.filter((item) => item.name || item.organizer || detailsFor(item).some(Boolean))
		.slice(0, 2);
	if (competitions.length) {
		sections.push(
			["\\section*{Competitions}", ...competitions.map((item) => {
				const detailBullets = bulletsForDetails(detailsFor(item)) || "";
					return [`\\entry{${latexEscape(item.name)}}{${latexEscape(item.date)}}{${latexEscape(item.organizer)}}`, "\\begin{itemize}", detailBullets, "\\end{itemize}", "\\gap"].join("\n");
			})].join("\n"),
		);
	}
	const languages = (resume.languages || []).filter((language) => language.name || language.level);
	if (languages.length) {
		const languageItems = languages.map((language) => {
			const label = [language.name, language.level && `(${language.level})`].filter(Boolean).join(" ");
			return `    \\item ${latexEscape(label)}`;
		}).join("\n");
		sections.push(["\\section*{Languages}", "\\begin{itemize}", languageItems, "\\end{itemize}"].join("\n"));
	}
	const hobbies = (resume.hobbies || []).map((hobby) => {
		if (typeof hobby === "string") return hobby.trim();
		return [hobby?.name, hobby?.note].filter((value) => typeof value === "string" && value.trim()).join(" - ");
	}).filter(Boolean);
	if (hobbies.length) {
		sections.push(["\\section*{Hobbies}", "\\begin{itemize}", bullets(hobbies), "\\end{itemize}"].join("\n"));
	}
	return sections.join("\n\n");
};

export const mapResumeToLatex = (resume) => {
	const header = [
		"\\begin{center}",
		`    {\\LARGE \\href{${latexUrl(resume.portfolioUrl)}}{\\textcolor{black}{\\textbf{${latexEscape(resume.name).toUpperCase()}}}}} \\\\[4pt]`,
		contactLine(resume),
		"\\end{center}",
	].join("\n");
	const replaceSection = (source, title, content, nextTitle) =>
		source.replace(new RegExp(`\\\\section\\*\\{${title}\\}[\\s\\S]*?(?=\\\\section\\*\\{${nextTitle}\\})`), content ? `\\section*{${title}}\n\n${content}\n\n` : "");
	const removeSection = (source, title, nextTitle) =>
		source.replace(new RegExp(`\\\\section\\*\\{${title}\\}[\\s\\S]*?(?=\\\\section\\*\\{${nextTitle}\\})`), "");
	let source = latexTemplate.replace(/\\begin\{center\}[\s\S]*?\\end\{center\}/, header);
	const projects = (resume.projects || []).filter((project) => project.name || project.techStack || project.description?.some(Boolean)).slice(0, 3);
	const experience = (resume.experience || []).filter((item) => item.title || item.organization || detailsFor(item).some(Boolean));
	const education = (resume.education || []).filter((item) => item.degree || item.institution || item.years || item.grade);
	const skills = (resume.skills || []).filter((group) => group.category && group.items?.some(Boolean));
	source = replaceSection(source, "Projects", projects.map(projectBlock).join("\n"), "Experience");
	source = replaceSection(source, "Experience", experienceBlock(experience), "Education");
	source = replaceSection(source, "Education", educationBlock(education), "Technical Skills");
	source = replaceSection(source, "Technical Skills", skills.length ? `\\begin{itemize}\n${skillsBlock(skills)}\n\\end{itemize}` : "", "Competitions");
	const optionalStart = source.indexOf("\\section*{Competitions}");
	const documentEnd = source.lastIndexOf("\\end{document}");
	if (optionalStart >= 0 && documentEnd > optionalStart) {
		source = `${source.slice(0, optionalStart)}${optionalSections(resume)}\n\n${source.slice(documentEnd)}`;
	}
	return source;
};

export const generateResumePdf = async (resume) => {
	const response = await fetch("https://latex.ytotech.com/builds/sync", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			compiler: "pdflatex",
			resources: [{ main: true, content: mapResumeToLatex(resume) }],
		}),
	});
	if (!response.ok) throw new Error(`LaTeX API returned ${response.status}`);
	const blob = await response.blob();
	const url = URL.createObjectURL(blob);
	const linkElement = document.createElement("a");
	linkElement.href = url;
	linkElement.download = `${resume.name.replace(/\s+/g, "-")}-CV.pdf`;
	linkElement.click();
	URL.revokeObjectURL(url);
};
