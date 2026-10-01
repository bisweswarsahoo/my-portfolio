import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import "../styles/Skills.css";
import portfolioData from "../data/portfolioData.js";
import { FaCompass, FaRotateLeft } from "react-icons/fa6";

/* ─── Priority showcase ordering for balanced initial center ─────────────── */
const PRIMARY_SHOWCASE = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Docker",
  "Git",
  "Next.js",
  "MongoDB",
  "C++",
  "Tailwind CSS",
  "Linux",
  "PostgreSQL",
  "FastAPI",
  "JavaScript",
  "Redis",
];

/* ─── Derive and prioritize unique tech list from portfolioData ─────────── */
const TECHNOLOGIES = (() => {
  const seen = new Set();
  const all = [];

  (portfolioData.skills || []).forEach(group => {
    (group.items || []).filter(Boolean).forEach(skill => {
      const name = typeof skill === "string" ? skill : skill.name;
      if (!name || seen.has(name)) return;
      seen.add(name);
      all.push({
        id: `tech-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        name,
        category: group.category || "General",
        Icon: skill.icon || null,
        color: skill.color || "#60A5FA",
        desc: skill.desc || `${name} — used in core applications and projects.`,
      });
    });
  });

  // Sort primary showcase items to the front so they occupy the central constellation
  all.sort((a, b) => {
    const idxA = PRIMARY_SHOWCASE.indexOf(a.name);
    const idxB = PRIMARY_SHOWCASE.indexOf(b.name);
    const weightA = idxA === -1 ? 999 : idxA;
    const weightB = idxB === -1 ? 999 : idxB;
    return weightA - weightB;
  });

  return all;
})();

/* ─── Seeded pseudo-random PRNG (Mulberry32) ─────────────────────────────── */
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ─── Toroidal organic distribution generator ────────────────────────────── */
function generateToroidalLayout(count, W, H, seed = 53) {
  const rand = mulberry32(seed);
  const pts = [];

  // Center cluster for primary showcase items (first 12)
  const centerCount = Math.min(12, count);
  for (let i = 0; i < centerCount; i++) {
    const angle = i * 2.399963 + rand() * 0.45; // Golden ratio spiral angle + jitter
    const r = 0.07 + (i / centerCount) * 0.16 + (rand() - 0.5) * 0.04;
    pts.push({
      u: ((0.5 + Math.cos(angle) * r) % 1 + 1) % 1,
      v: ((0.5 + Math.sin(angle) * r * (W / H)) % 1 + 1) % 1,
    });
  }

  // Rest distributed across the torus with blue-noise rejection
  const MIN_DIST = 160; // minimum distance in pixels
  for (let i = centerCount; i < count; i++) {
    let bestU = rand(), bestV = rand(), bestDist = -1;
    for (let attempt = 0; attempt < 80; attempt++) {
      const candU = rand();
      const candV = rand();
      let dmin = Infinity;
      for (const p of pts) {
        let du = Math.abs(candU - p.u); if (du > 0.5) du = 1 - du;
        let dv = Math.abs(candV - p.v); if (dv > 0.5) dv = 1 - dv;
        const d = Math.hypot(du * W, dv * H);
        if (d < dmin) dmin = d;
      }
      if (dmin > bestDist) {
        bestDist = dmin;
        bestU = candU;
        bestV = candV;
      }
      if (dmin >= MIN_DIST) break;
    }
    pts.push({ u: bestU, v: bestV });
  }

  // Toroidal spring relaxation to eliminate any remaining collision
  for (let iter = 0; iter < 45; iter++) {
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        let du = pts[j].u - pts[i].u;
        if (du > 0.5) du -= 1;
        if (du < -0.5) du += 1;
        let dv = pts[j].v - pts[i].v;
        if (dv > 0.5) dv -= 1;
        if (dv < -0.5) dv += 1;

        const dx = du * W;
        const dy = dv * H;
        const dist = Math.hypot(dx, dy) || 1;

        if (dist < MIN_DIST) {
          const overlap = MIN_DIST - dist;
          const px = (dx / dist) * overlap * 0.4;
          const py = (dy / dist) * overlap * 0.4;

          pts[i].u = ((pts[i].u - px / W) + 1) % 1;
          pts[i].v = ((pts[i].v - py / H) + 1) % 1;
          pts[j].u = ((pts[j].u + px / W) + 1) % 1;
          pts[j].v = ((pts[j].v + py / H) + 1) % 1;
        }
      }
    }
  }

  return pts;
}

/* ─── Modular coordinate wrapping ────────────────────────────────────────── */
// Maps val to range [-size / 2, size / 2) seamlessly
function wrapCoord(val, size) {
  const rem = ((val % size) + size) % size;
  return rem >= size / 2 ? rem - size : rem;
}

/* ─── Physics Constants ──────────────────────────────────────────────────── */
const REPULSION_RADIUS = 230; // Radius around hovered item to repel neighbors
const MAX_DISPLACEMENT = 110; // Max repulsion push distance
const SPRING_STIFFNESS = 0.085;
const SPRING_DAMPING = 0.76;
const CARD_SIZE = 140; // Total bounding size of tech item
const CARD_HALF = CARD_SIZE / 2;

export default function Skills() {
  const containerRef = useRef(null);
  const viewportRef = useRef({ w: 1200, h: 800 });
  const domainRef = useRef({ w: 2600, h: 1800 });
  const nodeRefs = useRef([]);
  const tooltipRef = useRef(null);
  const bgGridRef = useRef(null);
  const starsRef1 = useRef(null);
  const starsRef2 = useRef(null);

  // Position & Pan state held in refs for 60+ FPS zero-render dragging
  const panRef = useRef({ x: 0, y: 0 });
  const inertiaRef = useRef({ vx: 0, vy: 0 });
  const targetPanRef = useRef(null); // Used for smooth recentering animation
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    vx: 0,
    vy: 0,
    hasMoved: false,
  });

  const physicsRef = useRef([]);
  const hoveredIdRef = useRef(null);
  const rafRef = useRef(null);

  // React state for UI overlays & tooltips
  const [hoveredTech, setHoveredTech] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Category filter list
  const categories = useMemo(() => {
    const set = new Set(["All"]);
    TECHNOLOGIES.forEach(t => set.add(t.category));
    return Array.from(set);
  }, []);

  /* ─── Initialize canvas dimensions & toroidal positions ────────────────── */
  useEffect(() => {
    const updateSize = () => {
      const el = containerRef.current;
      const vw = el ? el.offsetWidth : window.innerWidth;
      const vh = el ? el.offsetHeight : window.innerHeight;
      viewportRef.current = { w: vw, h: vh };

      // Ensure domain is wider and taller than viewport by at least 700px
      // This guarantees wrapping point is ALWAYS >350px offscreen (zero pop-in!)
      const dw = Math.max(2600, Math.round(vw + 900));
      const dh = Math.max(1800, Math.round(vh + 700));
      domainRef.current = { w: dw, h: dh };

      const pts = generateToroidalLayout(TECHNOLOGIES.length, dw, dh);
      physicsRef.current = TECHNOLOGIES.map((tech, i) => ({
        id: tech.id,
        u: pts[i].u,
        v: pts[i].v,
        screenX: 0,
        screenY: 0,
        dispX: 0,
        dispY: 0,
        vx: 0,
        vy: 0,
      }));
      setIsReady(true);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* ─── Keep hoveredIdRef in sync ────────────────────────────────────────── */
  useEffect(() => {
    hoveredIdRef.current = hoveredTech ? hoveredTech.id : null;
  }, [hoveredTech]);

  /* ─── Smooth recenter animation helper ─────────────────────────────────── */
  const handleRecenter = useCallback(() => {
    targetPanRef.current = { x: 0, y: 0 };
    inertiaRef.current = { vx: 0, vy: 0 };
  }, []);

  /* ─── Physics & Animation Frame Loop (Zero React re-renders) ───────────── */
  useEffect(() => {
    const loop = () => {
      const { w: vw, h: vh } = viewportRef.current;
      const { w: dw, h: dh } = domainRef.current;
      const cx = vw / 2;
      const cy = vh / 2;

      // Handle smooth recentering animation if active
      if (targetPanRef.current) {
        const dx = targetPanRef.current.x - panRef.current.x;
        const dy = targetPanRef.current.y - panRef.current.y;
        panRef.current.x += dx * 0.12;
        panRef.current.y += dy * 0.12;
        if (Math.hypot(dx, dy) < 0.5) {
          panRef.current.x = targetPanRef.current.x;
          panRef.current.y = targetPanRef.current.y;
          targetPanRef.current = null;
        }
      } else if (!dragRef.current.isDragging) {
        // Inertia coasting with smooth friction
        if (Math.abs(inertiaRef.current.vx) > 0.01 || Math.abs(inertiaRef.current.vy) > 0.01) {
          panRef.current.x += inertiaRef.current.vx;
          panRef.current.y += inertiaRef.current.vy;
          inertiaRef.current.vx *= 0.93;
          inertiaRef.current.vy *= 0.93;
        } else {
          inertiaRef.current.vx = 0;
          inertiaRef.current.vy = 0;
        }
      }

      const panX = panRef.current.x;
      const panY = panRef.current.y;

      // Update background grid & starfield parallax positions
      if (bgGridRef.current) {
        const gx = ((panX * 0.4) % 48 + 48) % 48;
        const gy = ((panY * 0.4) % 48 + 48) % 48;
        bgGridRef.current.style.backgroundPosition = `${gx}px ${gy}px`;
      }
      if (starsRef1.current) {
        const s1x = ((panX * 0.15) % 800 + 800) % 800;
        const s1y = ((panY * 0.15) % 800 + 800) % 800;
        starsRef1.current.style.backgroundPosition = `${s1x}px ${s1y}px`;
      }
      if (starsRef2.current) {
        const s2x = ((panX * 0.25) % 800 + 800) % 800;
        const s2y = ((panY * 0.25) % 800 + 800) % 800;
        starsRef2.current.style.backgroundPosition = `${s2x}px ${s2y}px`;
      }

      const st = physicsRef.current;
      if (!st || st.length === 0) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // Step 1: Compute wrapped screen positions for all items
      for (let i = 0; i < st.length; i++) {
        const s = st[i];
        const baseX = s.u * dw;
        const baseY = s.v * dh;

        // Base coordinate with center at (0.5, 0.5) when pan=(0,0)
        const rawX = baseX - dw / 2 + panX;
        const rawY = baseY - dh / 2 + panY;

        // Seamless toroidal wrap around center
        s.screenX = cx + wrapCoord(rawX, dw);
        s.screenY = cy + wrapCoord(rawY, dh);
      }

      // Step 2: Hover Repulsion Field Physics
      const hovId = hoveredIdRef.current;
      const hovIdx = hovId ? st.findIndex(s => s.id === hovId) : -1;
      const hovItem = hovIdx >= 0 ? st[hovIdx] : null;

      for (let i = 0; i < st.length; i++) {
        const s = st[i];
        let targetDispX = 0;
        let targetDispY = 0;

        if (hovItem && i !== hovIdx) {
          const dx = s.screenX - hovItem.screenX;
          const dy = s.screenY - hovItem.screenY;
          const dist = Math.hypot(dx, dy) || 1;

          if (dist < REPULSION_RADIUS) {
            const t = 1 - dist / REPULSION_RADIUS;
            const force = t * t * (3 - 2 * t); // Smoothstep curve
            const push = force * MAX_DISPLACEMENT;
            targetDispX = (dx / dist) * push;
            targetDispY = (dy / dist) * push;
          }
        }

        // Spring acceleration & velocity update
        const ax = (targetDispX - s.dispX) * SPRING_STIFFNESS;
        const ay = (targetDispY - s.dispY) * SPRING_STIFFNESS;
        s.vx = (s.vx + ax) * SPRING_DAMPING;
        s.vy = (s.vy + ay) * SPRING_DAMPING;
        s.dispX += s.vx;
        s.dispY += s.vy;

        // Step 3: Apply direct transform to DOM node
        const el = nodeRefs.current[i];
        if (el) {
          const finalX = Math.round(s.screenX + s.dispX - CARD_HALF);
          const finalY = Math.round(s.screenY + s.dispY - CARD_HALF);
          el.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
        }
      }

      // Step 4: Position floating tooltip dynamically BELOW the hovered item
      if (hovItem && tooltipRef.current) {
        const halfTooltip = 145;
        // Clamp X so tooltip never clips outside left/right screen borders
        const ttX = Math.max(halfTooltip + 12, Math.min(vw - halfTooltip - 12, Math.round(hovItem.screenX)));

        // Default placement is BELOW the icon and label (screenY + 58px)
        // If near the bottom edge of the viewport, flip cleanly above so it remains fully visible
        const isNearBottom = hovItem.screenY > vh - 130;
        const ttY = isNearBottom
          ? Math.round(hovItem.screenY - 68)
          : Math.round(hovItem.screenY + 58);
        const yTranslate = isNearBottom ? "-100%" : "0";

        tooltipRef.current.style.transform = `translate3d(${ttX}px, ${ttY}px, 0) translate(-50%, ${yTranslate})`;
        tooltipRef.current.dataset.placement = isNearBottom ? "top" : "bottom";
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ─── Pointer Drag Handlers (Mouse, Trackpad, Touch, Stylus) ───────────── */
  const onPointerDown = useCallback((e) => {
    // Only respond to primary button
    if (e.button !== 0 && e.pointerType === "mouse") return;

    targetPanRef.current = null; // Cancel any active recenter animation
    inertiaRef.current = { vx: 0, vy: 0 };

    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPanX: panRef.current.x,
      startPanY: panRef.current.y,
      lastX: e.clientX,
      lastY: e.clientY,
      lastTime: performance.now(),
      vx: 0,
      vy: 0,
      hasMoved: false,
    };

    setIsGrabbing(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if capture fails on certain mobile webviews
    }
  }, []);

  const onPointerMove = useCallback((e) => {
    const drag = dragRef.current;
    if (!drag.isDragging) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (!drag.hasMoved && Math.hypot(dx, dy) > 5) {
      drag.hasMoved = true;
    }

    panRef.current.x = drag.startPanX + dx;
    panRef.current.y = drag.startPanY + dy;

    // Track instantaneous release velocity (pixels per frame normalized to ~60fps)
    const now = performance.now();
    const dt = Math.max(1, now - drag.lastTime);
    if (dt > 4) {
      const instVx = ((e.clientX - drag.lastX) / dt) * 16.6;
      const instVy = ((e.clientY - drag.lastY) / dt) * 16.6;
      drag.vx = drag.vx * 0.4 + instVx * 0.6;
      drag.vy = drag.vy * 0.4 + instVy * 0.6;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      drag.lastTime = now;
    }
  }, []);

  const onPointerUp = useCallback((e) => {
    const drag = dragRef.current;
    if (!drag.isDragging) return;

    drag.isDragging = false;
    setIsGrabbing(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }

    // Apply inertia if dragged quickly
    if (drag.hasMoved) {
      const speed = Math.hypot(drag.vx, drag.vy);
      const MAX_SPEED = 18;
      let vx = drag.vx;
      let vy = drag.vy;
      if (speed > MAX_SPEED) {
        vx = (vx / speed) * MAX_SPEED;
        vy = (vy / speed) * MAX_SPEED;
      }
      if (speed > 1.2) {
        inertiaRef.current = { vx, vy };
      }
    } else {
      // If pointer was clicked/tapped without dragging on background, clear hover
      if (e.target.closest(".tech-loop-item") === null) {
        setHoveredTech(null);
      }
    }
  }, []);

  /* ─── Technology Item Hover & Click Handlers ───────────────────────────── */
  const handleItemEnter = useCallback((tech) => {
    // Only trigger hover if not actively in mid-drag
    if (dragRef.current.isDragging && dragRef.current.hasMoved) return;
    setHoveredTech(tech);
  }, []);

  const handleItemLeave = useCallback((tech) => {
    // Clear only if still the hovered tech
    setHoveredTech(current => (current?.id === tech.id ? null : current));
  }, []);

  const handleItemClick = useCallback((tech, e) => {
    e.stopPropagation();
    // If user dragged more than 5px, it was a pan gesture, not a click
    if (dragRef.current.hasMoved) return;

    // Toggle active tech (especially useful for touch/mobile devices)
    setHoveredTech(current => (current?.id === tech.id ? null : tech));
  }, []);

  /* ─── Keyboard Accessibility Focus ─────────────────────────────────────── */
  const handleItemFocus = useCallback((tech) => {
    setHoveredTech(tech);
  }, []);

  return (
    <div className="skills-loop-wrapper" id="skills-section">

      {/* ═════════════════════════════════════════════════════════════════
          FIXED HEADER & HUD (Remains fixed, does NOT move with canvas)
          ═════════════════════════════════════════════════════════════════ */}
      <header className="skills-fixed-header" aria-label="Skills & Tech Stack">
        <div className="skills-header-content">
          {/* Top category badge */}
          <div className="skills-badge">
            <span className="skills-badge-dot" aria-hidden="true" />
            <span>INFINITE TECH UNIVERSE</span>
          </div>

          {/* Fixed Section Heading */}
          <h2 className="skills-main-title">
            Technologies <span className="skills-title-gradient">I Build With...</span>
          </h2>

          {/* Subtitle */}
          <p className="skills-subtitle">
            Grab and drag freely in any direction to explore the looping universe of tools, frameworks and languages.
          </p>

          {/* Interactive Fixed HUD Controls */}
          <div className="skills-hud-bar">
            {/* Category Filter Pills */}
            <div className="skills-categories-pill" role="tablist" aria-label="Filter technologies">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`skills-cat-btn${activeCategory === cat ? " is-active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Recenter & Stat Pill */}
            <div className="skills-actions">
              <span className="skills-count-pill" title="Total active technologies">
                {TECHNOLOGIES.length} Technologies
              </span>
              <button
                className="skills-recenter-btn"
                onClick={handleRecenter}
                title="Recenter canvas to origin"
                aria-label="Recenter canvas position"
              >
                <FaRotateLeft className="skills-btn-icon" aria-hidden="true" />
                <span>Reset View</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═════════════════════════════════════════════════════════════════
          INFINITE LOOPING CANVAS CONTAINER (Interactive grab & drag)
          ═════════════════════════════════════════════════════════════════ */}
      <div
        className={`skills-canvas-viewport${isGrabbing ? " is-grabbing" : ""}`}
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="region"
        aria-label="Interactive infinite technology canvas. Drag with mouse or finger to explore."
      >
        {/* Dynamic Celestial Background (Subtle Grid & Parallax Stars) */}
        <div className="skills-bg-grid" ref={bgGridRef} aria-hidden="true" />
        <div className="skills-bg-stars skills-bg-stars--1" ref={starsRef1} aria-hidden="true" />
        <div className="skills-bg-stars skills-bg-stars--2" ref={starsRef2} aria-hidden="true" />
        <div className="skills-ambient-glow" aria-hidden="true" />

        {/* Floating Exploration Hint Banner */}
        <div className={`skills-drag-hint${isGrabbing ? " is-hidden" : ""}`} aria-hidden="true">
          <FaCompass className="skills-hint-compass" />
          <span>Click & drag canvas in any direction • Hover or tap to expand</span>
        </div>

        {/* ─── Technology Items (Directly positioned by rAF) ──────────── */}
        {isReady && TECHNOLOGIES.map((tech, i) => {
          const isHovered = hoveredTech?.id === tech.id;
          const isCategoryMatch = activeCategory === "All" || tech.category === activeCategory;

          return (
            <button
              key={tech.id}
              ref={el => { nodeRefs.current[i] = el; }}
              className={`tech-loop-item${isHovered ? " is-hovered" : ""}${!isCategoryMatch ? " is-dimmed" : ""}`}
              style={{ "--tech-color": tech.color }}
              onMouseEnter={() => handleItemEnter(tech)}
              onMouseLeave={() => handleItemLeave(tech)}
              onClick={(e) => handleItemClick(tech, e)}
              onFocus={() => handleItemFocus(tech)}
              onBlur={() => handleItemLeave(tech)}
              aria-label={`${tech.name} (${tech.category}): ${tech.desc}`}
              id={`tech-node-${tech.id}`}
            >
              {/* Scaler handles scale animation so it never interferes with transform3d */}
              <div className="tech-loop-scaler">
                {/* Minimal frosted icon plate */}
                <div className="tech-loop-plate">
                  {tech.Icon && <tech.Icon className="tech-loop-icon" aria-hidden="true" />}
                </div>

                {/* Clean technical name label */}
                <span className="tech-loop-label">{tech.name}</span>
              </div>
            </button>
          );
        })}

        {/* ─── Floating Tooltip Card (Tracked dynamically by rAF) ─────── */}
        <aside
          ref={tooltipRef}
          className={`tech-loop-tooltip${hoveredTech ? " is-visible" : ""}`}
          style={{ "--tooltip-accent": hoveredTech?.color || "#60A5FA" }}
          aria-live="polite"
        >
          {hoveredTech && (
            <div className="tech-tooltip-inner">
              <div className="tech-tooltip-header">
                <span className="tech-tooltip-name">{hoveredTech.name}</span>
                <span className="tech-tooltip-category">{hoveredTech.category}</span>
              </div>
              <p className="tech-tooltip-desc">{hoveredTech.desc}</p>
            </div>
          )}
        </aside>

      </div>
    </div>
  );
}
