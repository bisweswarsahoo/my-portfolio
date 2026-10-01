import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import "../styles/Skills.css";
import portfolioData from "../data/portfolioData.js";
/* ─── Derive tech list from portfolioData (deduplicated by name) ──────── */
const TECHNOLOGIES = (() => {
  const seen = new Set();
  return (portfolioData.skills || [])
    .filter(group => group.items?.some(Boolean))
    .flatMap(group => group.items.filter(Boolean))
    .reduce((acc, skill) => {
      const name = typeof skill === "string" ? skill : skill.name;
      if (!name || seen.has(name)) return acc;
      seen.add(name);
      acc.push({
        id: `skill-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        name,
        Icon: skill.icon || null,
        color: skill.color || "currentColor",
        desc: skill.desc || `${name} — used in my projects.`,
      });
      return acc;
    }, []);
})();


/* ─── Physics constants ────────────────────────────────────────────────── */
const REPULSION_RADIUS = 220;
const MAX_DISPLACEMENT = 120;
const SPRING_STIFFNESS = 0.08;
const SPRING_DAMPING = 0.74;
const PARALLAX_MAX = 6;

/* ─── Seeded pseudo-random ─────────────────────────────────────────────── */
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ─── Collision-free positions avoiding the left text area ──────────────── */
function generatePositions(count, W, H, seed = 77) {
  const rand = mulberry32(seed);
  const minDist = 100;
  const margin = 0.05;
  // Text panel occupies roughly top-left: x < 0.38W, y < 0.55H
  const textZone = { x1: 0, y1: 0, x2: 0.38, y2: 0.56 };
  const positions = [];

  const isInTextZone = (nx, ny) =>
    nx < textZone.x2 && ny < textZone.y2;

  for (let i = 0; i < count; i++) {
    let placed = false;
    for (let attempt = 0; attempt < 350; attempt++) {
      const nx = margin + rand() * (1 - margin * 2);
      const ny = margin + rand() * (1 - margin * 2);
      if (isInTextZone(nx, ny)) continue;
      const x = nx * W;
      const y = ny * H;
      let ok = true;
      for (const p of positions) {
        if (Math.hypot(x - p.x, y - p.y) < minDist) { ok = false; break; }
      }
      if (ok) { positions.push({ x, y }); placed = true; break; }
    }
    if (!placed) {
      // fallback: anywhere with minimal conflict
      for (let a2 = 0; a2 < 200; a2++) {
        const x = (margin + rand() * (1 - margin * 2)) * W;
        const y = (margin + rand() * (1 - margin * 2)) * H;
        let ok = true;
        for (const p of positions) {
          if (Math.hypot(x - p.x, y - p.y) < 60) { ok = false; break; }
        }
        if (ok) { positions.push({ x, y }); placed = true; break; }
      }
      if (!placed) positions.push({ x: (0.5 + rand() * 0.4) * W, y: rand() * H });
    }
  }
  return positions;
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

/* ─── TechCloud ────────────────────────────────────────────────────────── */
const TechCloud = ({ techs }) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const physicsRef = useRef(null);
  const nodeRefs = useRef([]);
  const tooltipRef = useRef(null);
  const hoveredIdRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const containerRectRef = useRef(null);

  const [hoveredId, setHoveredId] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);
  const [isReady, setIsReady] = useState(false);

  /* ── Init physics ─ */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const W = el.offsetWidth;
    const H = el.offsetHeight;
    const base = generatePositions(techs.length, W, H);

    physicsRef.current = techs.map((t, i) => ({
      id: t.id,
      bx: base[i].x, by: base[i].y,
      cx: base[i].x, cy: base[i].y,
      vx: 0, vy: 0,
      px: 0, py: 0,
    }));
    setIsReady(true);
  }, [techs]);

  useEffect(() => { hoveredIdRef.current = hoveredId; }, [hoveredId]);

  /* ── Apply positions to DOM ─ */
  const applyPositions = useCallback(() => {
    const st = physicsRef.current;
    if (!st) return;
    const CARD = 72; // card half-width
    st.forEach((s, i) => {
      const el = nodeRefs.current[i];
      if (el) {
        el.style.transform = `translate3d(${s.cx + s.px - CARD}px,${s.cy + s.py - CARD}px,0)`;
      }
    });
    // Update tooltip position if visible
    const hovId = hoveredIdRef.current;
    if (hovId && tooltipRef.current) {
      const idx = st.findIndex(s => s.id === hovId);
      if (idx >= 0) {
        const s = st[idx];
        tooltipRef.current.style.left = `${s.cx + s.px}px`;
        tooltipRef.current.style.top = `${s.cy + s.py - CARD - 10}px`;
      }
    }
  }, []);

  /* ── rAF loop ─ */
  const tick = useCallback(() => {
    const st = physicsRef.current;
    const hovId = hoveredIdRef.current;
    if (!st) { rafRef.current = requestAnimationFrame(tick); return; }

    const hovIdx = hovId ? st.findIndex(s => s.id === hovId) : -1;
    const hovS = hovIdx >= 0 ? st[hovIdx] : null;
    const el = containerRef.current;
    const W = el ? el.offsetWidth : 1400;
    const H = el ? el.offsetHeight : 800;

    for (let i = 0; i < st.length; i++) {
      const s = st[i];
      let tx = s.bx, ty = s.by;

      if (hovS && i !== hovIdx) {
        const dx = s.bx - hovS.bx;
        const dy = s.by - hovS.by;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < REPULSION_RADIUS) {
          const t = 1 - dist / REPULSION_RADIUS;
          const e = t * t * (3 - 2 * t); // smoothstep
          const d = e * MAX_DISPLACEMENT;
          tx = clamp(s.bx + (dx / dist) * d, 60, W - 60);
          ty = clamp(s.by + (dy / dist) * d, 60, H - 60);
        }
      }

      const ax = (tx - s.cx) * SPRING_STIFFNESS;
      const ay = (ty - s.cy) * SPRING_STIFFNESS;
      s.vx = (s.vx + ax) * SPRING_DAMPING;
      s.vy = (s.vy + ay) * SPRING_DAMPING;
      s.cx += s.vx;
      s.cy += s.vy;

      if (containerRectRef.current) {
        const { width, height, left, top } = containerRectRef.current;
        const mx = (mousePosRef.current.x - left) / width - 0.5;
        const my = (mousePosRef.current.y - top) / height - 0.5;
        s.px += (-mx * PARALLAX_MAX - s.px) * 0.055;
        s.py += (-my * PARALLAX_MAX - s.py) * 0.055;
      }
    }

    applyPositions();
    rafRef.current = requestAnimationFrame(tick);
  }, [applyPositions]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  /* ── Events ─ */
  const onMouseMove = useCallback((e) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) {
      containerRectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    setHoveredId(null);
    setTooltipData(null);
  }, []);

  const onEnter = useCallback((tech, i) => {
    setHoveredId(tech.id);
    const s = physicsRef.current?.[i];
    if (s) setTooltipData({ name: tech.name, desc: tech.desc });
  }, []);

  const onTouchStart = useCallback((tech, i) => (e) => {
    e.preventDefault();
    if (hoveredIdRef.current === tech.id) {
      setHoveredId(null);
      setTooltipData(null);
    } else {
      onEnter(tech, i);
    }
  }, [onEnter]);

  return (
    <div
      className="tc-container"
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Starfield + gradients */}
      <div className="tc-stars" aria-hidden="true" />
      <div className="tc-stars2" aria-hidden="true" />
      <div className="tc-glow-center" aria-hidden="true" />

      {/* Tech items */}
      {isReady && techs.map((tech, i) => {
        const isHov = hoveredId === tech.id;
        return (
          <button
            key={tech.id}
            ref={el => { nodeRefs.current[i] = el; }}
            className={`tc-item${isHov ? " tc-item--hovered" : ""}`}
            style={{ "--tech-color": tech.color }}
            onMouseEnter={() => onEnter(tech, i)}
            onMouseLeave={() => { setHoveredId(null); setTooltipData(null); }}
            onTouchStart={onTouchStart(tech, i)}
            aria-label={`${tech.name}: ${tech.desc}`}
            id={`tc-item-${tech.id}`}
          >
            {/* Scaler — scale lives here, separate from the rAF translate on the parent */}
            <div className="tc-item__scaler">
              {/* Orbital rings */}
              <span className="tc-item__ring"   aria-hidden="true" />
              <span className="tc-item__ring tc-item__ring--2" aria-hidden="true" />

              {/* Card */}
              <span className="tc-item__card">
                {tech.Icon && <tech.Icon />}
              </span>

              {/* Label */}
              <span className="tc-item__name">{tech.name}</span>
            </div>
          </button>
        );
      })}

      {/* Floating tooltip — positioned by rAF */}
      <div
        ref={tooltipRef}
        className={`tc-tooltip${hoveredId && tooltipData ? " tc-tooltip--visible" : ""}`}
        aria-hidden="true"
      >
        {tooltipData && (
          <>
            <strong className="tc-tooltip__name">{tooltipData.name}</strong>
            <span className="tc-tooltip__desc">{tooltipData.desc}</span>
          </>
        )}
      </div>
    </div>
  );
};

/* ─── Public section ────────────────────────────────────────────────────── */
const Skills = () => {
  const visibleTechs = useMemo(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    if (w < 480) return TECHNOLOGIES.slice(0, 16);
    if (w < 768) return TECHNOLOGIES.slice(0, 24);
    return TECHNOLOGIES;
  }, []);

  return (
    <div className="skills-cloud-section" id="skills-cloud">

      {/* Left text panel — overlaid on the cloud */}
      <div className="skills-text-panel" aria-label="Skills section">
        <span className="skills-label">
          <span className="skills-label__dot" aria-hidden="true" />
          SKILLS
        </span>
        <h2 className="skills-heading">
          Technologies<br />
          <span className="skills-heading-accent">I Work With</span>
        </h2>
        <p className="skills-description">
          A collection of tools, frameworks and technologies
          I use to build, learn and bring ideas to life.
        </p>
      </div>

      <TechCloud techs={visibleTechs} />
    </div>
  );
};

export default Skills;
