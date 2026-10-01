import { useEffect, useRef, useState } from "react";
import { FaGraduationCap, FaCode } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import heroImage from "../assets/Futuristic AI Developer with Holographic UI.png";
import "../styles/About.css";
import portfolioData from "../data/portfolioData.js";

/* Helper to highlight key terms in bio paragraphs */
const HIGHLIGHT_TERMS = ["AI Generalist", "LLMs", "AI agents", "backend systems", "databases"];
const HIGHLIGHT_REGEX = new RegExp(`(${HIGHLIGHT_TERMS.join("|")})`, "g");

const renderBioText = (text) => {
  if (!text) return null;
  const parts = text.split(HIGHLIGHT_REGEX);
  return parts.map((part, i) =>
    HIGHLIGHT_TERMS.includes(part) ? (
      <span key={i} className="ab-highlight">
        {part}
      </span>
    ) : (
      part
    )
  );
};

/* ─── Terminal commands & responses ──────────────────────────────────────── */
const TERMINAL_LINES = [
  { cmd: "whoami",             out: "Bisweswar Sahoo" },
  { cmd: "role",               out: "AI Generalist | Full-Stack Developer" },
  { cmd: "focus",              out: "Build, Solve, Learn, Repeat" },
  { cmd: "currently_learning", out: "LLMs, AI Agents, System Design, Cloud" },
  { cmd: "status",             out: "Always Building..." },
];

/* ─── Bottom info bar blocks ─────────────────────────────────────────────── */
const INFO_BLOCKS = [
  {
    Icon: FaGraduationCap,
    title: "Computer Science",
    sub: "B.Tech CSE",
  },
  {
    Icon: BsRobot,
    title: "AI Generalist",
    sub: "Models • Agents • Applications",
  },
  {
    Icon: FaCode,
    title: "Software Development",
    sub: "Full Stack • APIs • Databases",
  },
];

/* ─── Developer Terminal Component ───────────────────────────────────────── */
const Terminal = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [blink, setBlinkOn] = useState(true);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const next = () => {
            i++;
            setVisibleLines(i);
            if (i < TERMINAL_LINES.length) {
              setTimeout(next, 280);
            }
          };
          setTimeout(next, 300);
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Blinking cursor effect */
  useEffect(() => {
    const id = setInterval(() => setBlinkOn(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="ab-terminal" ref={ref} aria-label="Developer terminal">
      {/* Title bar */}
      <div className="ab-terminal__bar">
        <div className="ab-terminal__controls" aria-hidden="true">
          <span className="ab-terminal__dot ab-terminal__dot--red" />
          <span className="ab-terminal__dot ab-terminal__dot--yellow" />
          <span className="ab-terminal__dot ab-terminal__dot--green" />
        </div>
        <span className="ab-terminal__cwd">~/about</span>
      </div>

      {/* Terminal content */}
      <div className="ab-terminal__body">
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            className={`ab-terminal__line${i < visibleLines ? " ab-terminal__line--visible" : ""}`}
            aria-hidden={i >= visibleLines}
          >
            <span className="ab-terminal__prompt">$</span>
            <span className="ab-terminal__cmd">{line.cmd}</span>
            {i < visibleLines && (
              <>
                <span className="ab-terminal__arrow">&gt;</span>
                <span className="ab-terminal__out">{line.out}</span>
              </>
            )}
            {/* Blinking cursor on current line */}
            {i === visibleLines - 1 && (
              <span
                className="ab-terminal__cursor"
                style={{ opacity: blink ? 1 : 0 }}
                aria-hidden="true"
              >
                |
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Main About Component ───────────────────────────────────────────────── */
const About = () => (
  <div className="ab-section" id="about-inner">
    {/* Ambient background glows */}
    <div className="ab-bg" aria-hidden="true">
      <div className="ab-bg__glow ab-bg__glow--1" />
      <div className="ab-bg__glow ab-bg__glow--2" />
      <div className="ab-bg__grid" />
    </div>

    <div className="ab-container">
      {/* ── Left side: Single finished visual artwork ─────────────────────── */}
      <div className="ab-left" aria-hidden="true">
        <div className="ab-artwork-wrapper">
          <img
            src={heroImage}
            alt="Futuristic AI developer holographic artwork"
            className="ab-hero-img"
            draggable="false"
            loading="eager"
          />
          {/* Subtle edge blend overlay */}
          <div className="ab-artwork-blend" />
        </div>
      </div>

      {/* ── Right side: Premium developer & AI generalist content ─────────── */}
      <div className="ab-right">
        {/* Eyebrow */}
        <div className="ab-eyebrow">
          <span className="ab-eyebrow__dot" aria-hidden="true" />
          <span className="ab-eyebrow__text">AN AI GENERALIST WHO BUILDS</span>
        </div>

        {/* Main Heading */}
        <h2 className="ab-heading">
          Hi, I'm <br />
          <span className="ab-heading__name">Bisweswar.</span>
        </h2>

        {/* Bio paragraphs */}
        <div className="ab-bio">
          {(portfolioData.about?.paragraphs || []).map((paragraph, index) => (
            <p key={index}>{renderBioText(paragraph)}</p>
          ))}
        </div>

        {/* Interactive Terminal Panel */}
        <Terminal />

        {/* Bottom Information Blocks */}
        <div className="ab-infobar" role="list">
          {INFO_BLOCKS.map(({ Icon, title, sub }, i) => (
            <div key={title} className="ab-infobar__block" role="listitem">
              {i > 0 && <div className="ab-infobar__divider" aria-hidden="true" />}
              <div className="ab-infobar__icon-wrap">
                <Icon className="ab-infobar__icon" aria-hidden="true" />
              </div>
              <div className="ab-infobar__text">
                <strong className="ab-infobar__title">{title}</strong>
                <span className="ab-infobar__sub">{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default About;
