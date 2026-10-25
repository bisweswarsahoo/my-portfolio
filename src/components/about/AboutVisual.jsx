import { useState, useRef, useEffect, useCallback } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaBrain, FaDatabase, FaCode, FaCloud } from "react-icons/fa";
import "../../styles/AboutVisual.css";

/* ─── Capability Cards Configuration ─────────────────────────────────────── */
const CAPABILITY_CARDS = [
  {
    id: "card-ai",
    className: "av-card--ai",
    Icon: FaWandMagicSparkles,
    title: "Ideate",
    color: "#38bdf8",
    items: ["Build", "Experiment", "Iterate"],
    delay: "0s",
  },
  {
    id: "card-models",
    className: "av-card--models",
    Icon: FaBrain,
    title: "Models",
    color: "#a855f7",
    items: ["Prompting", "Agents", "RAG"],
    delay: "1.2s",
  },
  {
    id: "card-db",
    className: "av-card--db",
    Icon: FaDatabase,
    title: "Databases",
    color: "#34d399",
    items: ["Scalable Systems", "APIs"],
    delay: "2.1s",
  },
  {
    id: "card-fullstack",
    className: "av-card--fullstack",
    Icon: FaCode,
    title: "Full Stack",
    color: "#60a5fa",
    items: ["Product Dev", "Problem Solving"],
    delay: "0.8s",
  },
  {
    id: "card-cloud",
    className: "av-card--cloud",
    Icon: FaCloud,
    title: "Cloud",
    color: "#38bdf8",
    items: ["DevOps", "Deployment"],
    delay: "1.8s",
  },
];

/* ─── Interactive Terminal Commands List ─────────────────────────────────── */
const TERMINAL_COMMANDS = [
  "AI.build()",
  "agent.reason()",
  "rag.retrieve()",
  "models.fineTune()",
  "system.scale()",
];

/* ─── Planetary Core Component ───────────────────────────────────────────── */
const DigitalPlanet = () => (
  <div className="av-planet-wrap" aria-hidden="true">
    {/* Deep atmospheric glow */}
    <div className="av-planet-glow" />

    {/* Abstract planetary sphere */}
    <div className="av-planet-sphere">
      <div className="av-planet-texture" />
      <div className="av-planet-highlight" />

      {/* Latitudinal wireframe rings */}
      <svg className="av-planet-lines" viewBox="0 0 260 260">
        <ellipse cx="130" cy="130" rx="124" ry="46" className="av-planet-lat" />
        <ellipse cx="130" cy="130" rx="120" ry="78" className="av-planet-lat" />
        <ellipse cx="130" cy="130" rx="114" ry="110" className="av-planet-lat" />
        <line x1="130" y1="6" x2="130" y2="254" className="av-planet-axis" />
      </svg>
    </div>
  </div>
);

/* ─── Vector Orbital System Component ────────────────────────────────────── */
const OrbitalSystem = () => (
  <svg
    className="av-orbital-svg"
    viewBox="0 0 700 700"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <defs>
      <filter id="avGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <linearGradient id="orbitGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
        <stop offset="50%" stopColor="#818cf8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.15" />
      </linearGradient>

      <linearGradient id="orbitGradPurple" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
        <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
      </linearGradient>
    </defs>

    {/* Primary Major Orbit 1: Tilted wide ellipse */}
    <g transform="rotate(-18 350 350)">
      <ellipse
        cx="350"
        cy="350"
        rx="290"
        ry="155"
        className="av-orbit-path av-orbit-path--major"
      />
      {/* Traveling digital energy pulse */}
      <ellipse
        cx="350"
        cy="350"
        rx="290"
        ry="155"
        className="av-orbit-pulse av-orbit-pulse--1"
      />
      <circle cx="640" cy="350" r="4.5" className="av-orbit-node av-orbit-node--pulsing" filter="url(#avGlow)" />
      <circle cx="60" cy="350" r="3.2" className="av-orbit-node" />
    </g>

    {/* Primary Major Orbit 2: Steeper counter-tilt ellipse */}
    <g transform="rotate(32 350 350)">
      <ellipse
        cx="350"
        cy="350"
        rx="275"
        ry="175"
        className="av-orbit-path av-orbit-path--secondary"
      />
      {/* Reverse traveling energy pulse */}
      <ellipse
        cx="350"
        cy="350"
        rx="275"
        ry="175"
        className="av-orbit-pulse av-orbit-pulse--2"
      />
      <circle cx="350" cy="175" r="4.5" className="av-orbit-node av-orbit-node--pulsing" filter="url(#avGlow)" />
      <circle cx="350" cy="525" r="3.2" className="av-orbit-node" />
      <circle cx="625" cy="350" r="3.5" className="av-orbit-node" />
    </g>

    {/* Secondary Orbit 3: Inner fast arc */}
    <g transform="rotate(-42 350 350)">
      <ellipse
        cx="350"
        cy="350"
        rx="210"
        ry="115"
        className="av-orbit-path av-orbit-path--dashed"
      />
      <circle cx="140" cy="350" r="3.2" className="av-orbit-node" />
      <circle cx="560" cy="350" r="4.5" className="av-orbit-node av-orbit-node--pulsing" filter="url(#avGlow)" />
    </g>

    {/* Outer Wide Boundary Orbit */}
    <ellipse
      cx="350"
      cy="350"
      rx="320"
      ry="220"
      className="av-orbit-path av-orbit-path--outer"
    />
    <circle cx="150" cy="200" r="3.5" className="av-orbit-node" />
    <circle cx="580" cy="460" r="4" className="av-orbit-node av-orbit-node--pulsing" filter="url(#avGlow)" />
  </svg>
);

/* ─── Background Technical Stars / Particles ─────────────────────────────── */
const BackgroundParticles = () => (
  <div className="av-particles-layer" aria-hidden="true">
    <span className="av-star s1" />
    <span className="av-star s2" />
    <span className="av-star s3" />
    <span className="av-star s4" />
    <span className="av-star s5" />
    <span className="av-star s6" />
    <span className="av-star s7" />
    <span className="av-star s8" />
    <span className="av-star s9" />
    <span className="av-star s10" />
    <span className="av-star s11" />
    <span className="av-star s12" />
  </div>
);

/* ─── Interactive Terminal Badge with Command Cycling ───────────────────── */
const TerminalFloat = () => {
  const [cmdIndex, setCmdIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  // Auto-cycle through commands every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsSwitching(true);
      setTimeout(() => {
        setCmdIndex((prev) => (prev + 1) % TERMINAL_COMMANDS.length);
        setIsSwitching(false);
      }, 180);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Click to manually jump to the next command with tactile feedback
  const handleNext = () => {
    setIsSwitching(true);
    setTimeout(() => {
      setCmdIndex((prev) => (prev + 1) % TERMINAL_COMMANDS.length);
      setIsSwitching(false);
    }, 150);
  };

  return (
    <button
      className="av-terminal-float"
      onClick={handleNext}
      title="Click to cycle terminal status"
      type="button"
      aria-label={`Terminal status: ${TERMINAL_COMMANDS[cmdIndex]}. Click to advance.`}
    >
      <div className="av-tf-header" aria-hidden="true">
        <span className="av-tf-dot red" />
        <span className="av-tf-dot yellow" />
        <span className="av-tf-dot green" />
      </div>
      <div className={`av-tf-content${isSwitching ? " is-fading" : ""}`}>
        <span className="av-tf-prompt" aria-hidden="true">&gt;_</span>
        <span className="av-tf-cmd">{TERMINAL_COMMANDS[cmdIndex]}</span>
        <span className="av-tf-cursor" aria-hidden="true">|</span>
      </div>
    </button>
  );
};

/* ─── Handwritten Statement with Curved Arrow ────────────────────────────── */
const ImpactStatement = () => (
  <div className="av-impact-wrap" aria-label="Turning Ideas into Real Impact">
    <div className="av-impact-text">
      <span>Turning</span>
      <span>Ideas into</span>
      <span className="av-impact-highlight">Real Impact</span>
    </div>

    {/* Elegant vector curved arrow with dynamic hover pulse */}
    <svg
      className="av-impact-arrow"
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 15 65 C 35 70, 75 60, 78 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4.5 3"
        className="av-arrow-stem"
      />
      <path
        d="M 67 29 L 78 20 L 87 32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="av-arrow-head"
      />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT: AboutVisual
   ═══════════════════════════════════════════════════════════════════════════ */
const AboutVisual = ({ portrait }) => {
  const containerRef = useRef(null);

  // Smooth lerp physics loop with visibility observer and idle sleep detection
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const isVisibleRef = useRef(false);
  const loopRef = useRef(null);

  const wakeLoop = useCallback(() => {
    if (!rafId.current && isVisibleRef.current && loopRef.current) {
      rafId.current = requestAnimationFrame(loopRef.current);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      isVisibleRef.current = true;
      wakeLoop();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          wakeLoop();
        } else if (rafId.current) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [wakeLoop]);

  useEffect(() => {
    const loop = () => {
      if (!isVisibleRef.current) {
        rafId.current = null;
        return;
      }

      // Lerp smoothing formula: current += (target - current) * factor
      const dx = targetOffset.current.x - currentOffset.current.x;
      const dy = targetOffset.current.y - currentOffset.current.y;
      currentOffset.current.x += dx * 0.08;
      currentOffset.current.y += dy * 0.08;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--av-mx", currentOffset.current.x.toFixed(4));
        containerRef.current.style.setProperty("--av-my", currentOffset.current.y.toFixed(4));
      }

      // Idle sleep: if target reached within precision limit, stop loop
      if (Math.abs(dx) < 0.0005 && Math.abs(dy) < 0.0005) {
        currentOffset.current.x = targetOffset.current.x;
        currentOffset.current.y = targetOffset.current.y;
        rafId.current = null;
        return;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    loopRef.current = loop;
    wakeLoop();
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [wakeLoop]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;
    targetOffset.current = {
      x: Math.max(-0.5, Math.min(0.5, xRel)),
      y: Math.max(-0.5, Math.min(0.5, yRel)),
    };
    wakeLoop();
  }, [wakeLoop]);

  const handleMouseLeave = useCallback(() => {
    targetOffset.current = { x: 0, y: 0 };
    wakeLoop();
  }, [wakeLoop]);

  return (
    <div
      className="about-visual-root"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Interactive AI developer planetary system"
    >
      {/* ── Layer 1: Atmospheric Background Haze ──────────────────────────── */}
      <div className="av-ambient-halo" aria-hidden="true" />

      {/* ── Layer 2: Subtle Micro Stars ───────────────────────────────────── */}
      <BackgroundParticles />

      {/* ── Layer 3: Central Digital Planet Core ─────────────────────────── */}
      <div className="av-layer av-layer--planet">
        <DigitalPlanet />
      </div>

      {/* ── Layer 4: Orbital System ───────────────────────────────────────── */}
      <div className="av-layer av-layer--orbits">
        <OrbitalSystem />
      </div>

      {/* ── Layer 5: Decorative Interactive Terminal Badge ───────────────── */}
      <div className="av-layer av-layer--terminal">
        <TerminalFloat />
      </div>

      {/* ── Layer 6: Central Human Portrait Anchor ────────────────────────── */}
      <div className="av-layer av-layer--portrait">
        <div className="av-portrait-wrap">
          {/* Subtle electric blue rim aura */}
          <div className="av-portrait-rim" aria-hidden="true" />

          {/* Genuine transparent portrait PNG asset */}
          <img
            src={portrait}
            alt="Bisweswar Sahoo - AI Generalist & Developer"
            className="av-portrait-img"
            draggable="false"
            loading="lazy"
            decoding="async"
            width="250"
            height="235"
          />

          {/* Smooth bottom fade-out to black so no harsh cut lines appear */}
          <div className="av-portrait-fade" aria-hidden="true" />
        </div>
      </div>

      {/* ── Layer 7: Floating Capability Cards (Interactive HTML) ─────────── */}
      <div className="av-layer av-layer--cards">
        {CAPABILITY_CARDS.map(({ id, className, Icon, title, color, items, delay }) => (
          <div
            key={id}
            className={`av-card ${className}`}
            style={{
              "--card-accent": color,
              animationDelay: delay,
            }}
            tabIndex={0}
            role="region"
            aria-label={`Capability: ${title}. Includes ${items.join(", ")}.`}
          >
            <div className="av-card-header">
              <span className="av-card-icon-box" aria-hidden="true">
                <Icon className="av-card-icon" />
              </span>
              <strong className="av-card-title">{title}</strong>
            </div>
            <div className="av-card-list">
              {items.map((item, idx) => (
                <span key={idx} className="av-card-item">
                  <span className="av-card-bullet" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Layer 8: Handwritten Statement & Vector Arrow ─────────────────── */}
      <ImpactStatement />
    </div>
  );
};

export default AboutVisual;
