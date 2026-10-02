import { useEffect, useRef, useState, useCallback } from "react";
import { FaGraduationCap, FaCode } from "react-icons/fa";
import { FaRotateRight } from "react-icons/fa6";
import { BsRobot } from "react-icons/bs";
import portraitImage from "../assets/Personal Portrait.png";
import AboutVisual from "../components/about/AboutVisual.jsx";
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
  const ref = useRef(null);
  const started = useRef(false);

  const runSequence = useCallback((delay = 240) => {
    setVisibleLines(0);
    let i = 0;
    const next = () => {
      i++;
      setVisibleLines(i);
      if (i < TERMINAL_LINES.length) {
        setTimeout(next, delay);
      }
    };
    setTimeout(next, 150);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          runSequence(260);
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [runSequence]);

  const handleReplay = (e) => {
    e.stopPropagation();
    runSequence(200);
  };

  return (
    <div className="ab-terminal" ref={ref} aria-label="Developer terminal">
      {/* Title bar */}
      <div className="ab-terminal__bar">
        <div className="ab-terminal__controls" aria-hidden="true">
          <span className="ab-terminal__dot ab-terminal__dot--red" />
          <span className="ab-terminal__dot ab-terminal__dot--yellow" />
          <span className="ab-terminal__dot ab-terminal__dot--green" />
        </div>
        <div className="ab-terminal__actions">
          <button
            className="ab-terminal__replay-btn"
            onClick={handleReplay}
            title="Re-run terminal commands"
            type="button"
            aria-label="Re-run terminal commands"
          >
            <FaRotateRight className="ab-terminal__replay-icon" aria-hidden="true" />
            <span>Re-run</span>
          </button>
          <span className="ab-terminal__cwd">~/about</span>
        </div>
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
      {/* ── Left side: Programmatic AI Developer Planetary Ecosystem ──────── */}
      <div className="ab-left">
        <AboutVisual portrait={portraitImage} />
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
