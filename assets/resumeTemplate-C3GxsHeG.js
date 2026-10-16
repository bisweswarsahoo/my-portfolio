const k=`\\documentclass[a4paper,10pt]{article}\r
\r
%------------------------------------------------------------------------------\r
% PACKAGES\r
%------------------------------------------------------------------------------\r
\\usepackage[T1]{fontenc}\r
\\usepackage[left=0.9in, right=0.9in, top=0.9in, bottom=0.9in]{geometry}\r
\\usepackage{titlesec}       % section heading style\r
\\usepackage{enumitem}       % bullet list spacing\r
\\usepackage{xcolor}         % colours (needed for \\textcolor)\r
\\usepackage{hyperref}       % clickable links\r
\\usepackage{fontawesome5}   % icons (envelope, phone, GitHub, LinkedIn)\r
\\usepackage{graphicx}       % \\reflectbox for the phone icon\r
\r
%------------------------------------------------------------------------------\r
% STYLING\r
%------------------------------------------------------------------------------\r
% Section headings: large, bold, with a rule underneath\r
\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]\r
\r
% Hyperlink appearance\r
\\hypersetup{\r
    colorlinks=true,\r
    urlcolor=cyan\r
}\r
\r
\\setlength{\\parindent}{0pt}\r
\\pagestyle{empty}\r
\r
%------------------------------------------------------------------------------\r
% REUSABLE MACROS\r
%------------------------------------------------------------------------------\r
% \\entry{Bold title}{Right-aligned date}{Italic subtitle}\r
%   For projects, jobs and competitions. Use {} for any part you want empty.\r
\\newcommand{\\entry}[3]{%\r
    \\textbf{#1} \\hfill #2 \\\\\r
    \\textit{#3}\\par\\noppagebreak\r
}\r
\r
% \\edu{Degree or school}{Institution}{Years}{Grade line}\r
%   For the Education section.\r
\\newcommand{\\edu}[4]{%\r
    \\textbf{#1} \\\\\r
    #2 \\hfill #3 \\\\\r
    #4\\par\r
}\r
\r
% \\gap adds a small space between two entries\r
\\newcommand{\\gap}{\\vspace{6pt}}\r
\r
\\begin{document}\r
\r
%==============================================================================\r
% HEADER\r
%==============================================================================\r
% INSTRUCTION: Write your full name in capitals. It links to your portfolio;\r
%              remove the \\href wrapper if you do not have one.\r
% INSTRUCTION: Keep only the contact items you want shown. For each \\href the\r
%              real URL comes first and the visible text second.\r
\\begin{center}\r
    {\\LARGE \\href{((PORTFOLIO URL))}{\\textcolor{black}{\\textbf{((FULL NAME))}}}} \\\\[4pt]\r
    \\faEnvelope~ \\href{mailto:((EMAIL ADDRESS))}{((EMAIL ADDRESS))} \\quad\r
    \\reflectbox{\\faPhone}~ \\href{tel:((PHONE WITH COUNTRY CODE))}{((PHONE DISPLAY FORMAT))} \\\\\r
    \\faGithub~ \\href{https://github.com/((GITHUB USERNAME))}{github.com/((GITHUB USERNAME))} \\quad\r
    \\faLinkedin~ \\href{https://www.linkedin.com/in/((LINKEDIN USERNAME))}{linkedin.com/in/((LINKEDIN USERNAME))}\r
\\end{center}\r
\r
\\section*{Projects}\r
((PROJECTS))\r
\r
\\section*{Experience}\r
((EXPERIENCE))\r
\r
\\section*{Education}\r
((EDUCATION))\r
\r
\\section*{Technical Skills}\r
\\begin{itemize}\r
((SKILLS))\r
\\end{itemize}\r
\r
\\section*{Competitions}\r
((OPTIONAL_SECTIONS))\r
\r
\\end{document}\r
`,r=e=>String(e||"").replace(/\\/g,"\\textbackslash{}").replace(/([{}%$&#_])/g,"\\$1").replace(/~/g,"\\textasciitilde{}"),$=e=>String(e||"").replace(/([{}%$&#_])/g,"\\$1").replace(/~/g,"\\textasciitilde{}"),p=(e,n)=>`\\href{${$(e)}}{${r(n)}}`,b=(e=[])=>(e||[]).filter(Boolean).map(n=>`    \\item ${r(n)}`).join(`
`),g=e=>e?.details||e?.description||[],u=e=>typeof e=="string"&&e.trim()&&e.trim()!=="#",x=e=>{const n=[];e.email&&n.push(`\\faEnvelope~ ${p(`mailto:${e.email}`,e.email)}`),e.phone&&n.push(`\\reflectbox{\\faPhone}~ ${p(`tel:${e.phone}`,e.phone)}`);const t=[];return e.github&&t.push(`\\faGithub~ ${p(e.github,`github.com/${e.github.split("/").pop()}`)}`),e.linkedin&&t.push(`\\faLinkedin~ ${p(e.linkedin,`linkedin.com/in/${e.linkedin.split("/").pop()}`)}`),[n.length?`${n.join(" \\quad ")} \\\\`:"",t.join(" \\quad ")].filter(Boolean).join(`
    `)},y=e=>{const n=[u(e.sourceCode)&&`\\faGithub~ ${p(e.sourceCode,"Source Code")}`,u(e.liveDemo)&&`\\faGlobe~ ${p(e.liveDemo,"Live Demo")}`].filter(Boolean).join(" \\quad "),t=(e.description||[]).filter(Boolean).slice(0,3).map(o=>`    \\item ${r(o)}`).join(`
`)||"";return[`\\entry{${r(e.name)}}{${n}}{${r(e.techStack)}}`,"\\begin{itemize}",t||"","\\end{itemize}","\\vspace{6pt}"].join(`
`)},L=e=>e.map(n=>{const t=S(g(n).slice(0,3))||"";return[`\\entry{${r(n.title)}}{${r((n.duration||"").replace(/ - /g," -- "))}}{${r(`${n.organization||""}${n.location?` -- ${n.location}`:""}`)}}`,"\\begin{itemize}",t,"\\end{itemize}"].join(`
`)}).join(`
\\vspace{6pt}
`),R=e=>e.map((n,t)=>[`\\edu{${r(n.degree)}}{${r(n.institution)}}{${r(n.years)}}{${r(n.grade)}}`,t<e.length-1?"\\gap":""].join(`
`)).join(`
`),I=e=>e.map(n=>{const t=n.items.map(o=>typeof o=="string"?o:o?.name).filter(Boolean);return`    \\item \\textbf{${r(n.category)}:} ${r(t.join(", "))}`}).join(`
`),S=e=>b(e),j=e=>{const n=[],t=(e.competitions||[]).filter(i=>i.name||i.organizer||g(i).some(Boolean)).slice(0,2);t.length&&n.push(["\\section*{Competitions}",...t.map(i=>{const c=S(g(i))||"";return[`\\entry{${r(i.name)}}{${r(i.date)}}{${r(i.organizer)}}`,"\\begin{itemize}",c,"\\end{itemize}","\\gap"].join(`
`)})].join(`
`));const o=(e.languages||[]).filter(i=>i.name||i.level);if(o.length){const i=o.map(c=>{const l=[c.name,c.level&&`(${c.level})`].filter(Boolean).join(" ");return`    \\item ${r(l)}`}).join(`
`);n.push(["\\section*{Languages}","\\begin{itemize}",i,"\\end{itemize}"].join(`
`))}const s=(e.hobbies||[]).map(i=>typeof i=="string"?i.trim():[i?.name,i?.note].filter(c=>typeof c=="string"&&c.trim()).join(" - ")).filter(Boolean);return s.length&&n.push(["\\section*{Hobbies}","\\begin{itemize}",b(s),"\\end{itemize}"].join(`
`)),n.join(`

`)},w=e=>{const n=["\\begin{center}",`    {\\LARGE \\href{${$(e.portfolioUrl)}}{\\textcolor{black}{\\textbf{${r(e.name).toUpperCase()}}}}} \\\\[4pt]`,x(e),"\\end{center}"].join(`
`),t=(a,h,m,E)=>a.replace(new RegExp(`\\\\section\\*\\{${h}\\}[\\s\\S]*?(?=\\\\section\\*\\{${E}\\})`),m?`\\section*{${h}}

${m}

`:"");let o=k.replace(/\\begin\{center\}[\s\S]*?\\end\{center\}/,n);const s=(e.projects||[]).filter(a=>a.name||a.techStack||a.description?.some(Boolean)).slice(0,3),i=(e.experience||[]).filter(a=>a.title||a.organization||g(a).some(Boolean)),c=(e.education||[]).filter(a=>a.degree||a.institution||a.years||a.grade),l=(e.skills||[]).filter(a=>a.category&&a.items?.some(Boolean));o=t(o,"Projects",s.map(y).join(`
`),"Experience"),o=t(o,"Experience",L(i),"Education"),o=t(o,"Education",R(c),"Technical Skills"),o=t(o,"Technical Skills",l.length?`\\begin{itemize}
${I(l)}
\\end{itemize}`:"","Competitions");const d=o.indexOf("\\section*{Competitions}"),f=o.lastIndexOf("\\end{document}");return d>=0&&f>d&&(o=`${o.slice(0,d)}${j(e)}

${o.slice(f)}`),o},N=e=>{const n=(e||"Bisweswar_Sahoo").trim().replace(/\s+/g,"_"),t=new Date,o=String(t.getDate()).padStart(2,"0"),s=t.toLocaleString("en-US",{month:"long"}),i=t.getFullYear(),c=String(t.getHours()).padStart(2,"0"),l=String(t.getMinutes()).padStart(2,"0"),d=String(t.getSeconds()).padStart(2,"0");return`${n}_Resume_${o}_${s}_${i}_${c}-${l}-${d}.pdf`},T=async e=>{const n=await fetch("https://latex.ytotech.com/builds/sync",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({compiler:"pdflatex",resources:[{main:!0,content:w(e)}]})});if(!n.ok)throw new Error(`LaTeX API returned ${n.status}`);const t=await n.blob(),o=URL.createObjectURL(t),s=document.createElement("a");s.href=o,s.download=N(e?.name),s.click(),URL.revokeObjectURL(o)};export{T as generateResumePdf,N as getResumeFileName,w as mapResumeToLatex};
