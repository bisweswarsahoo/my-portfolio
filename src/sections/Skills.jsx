import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import "../styles/Skills.css";
import portfolioData from "../data/portfolioData.js";
import { LuCompass, LuRotateCcw } from "react-icons/lu";
import { getTechIcon } from "../components/tech/TechnologyIcons.jsx";

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
        Icon: skill.icon || getTechIcon(name),
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

/* ─── Toroidal organic distribution generator with aspect caching ───────── */
const layoutCache = new Map();

function generateToroidalLayout(count, W, H, seed = 53) {
  const aspectBucket = Math.round((W / H) * 8) / 8;
  const cacheKey = `${count}_${aspectBucket}_${seed}`;
  if (layoutCache.has(cacheKey)) {
    return layoutCache.get(cacheKey);
  }

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
  const MIN_DIST = 95; // minimum distance in pixels
  for (let i = centerCount; i < count; i++) {
    let bestU = rand(), bestV = rand(), bestDist = -1;
    for (let attempt = 0; attempt < 30; attempt++) {
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
  for (let iter = 0; iter < 16; iter++) {
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

  layoutCache.set(cacheKey, pts);
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
  const domainRef = useRef({ w: 1500, h: 1000 });
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

  // Hold-to-drag refs & state
  const holdTimerRef = useRef(null);
  const releaseTimerRef = useRef(null);
  const canDragRef = useRef(false);
  const [holdProgress, setHoldProgress] = useState(null);
  const [isHolding, setIsHolding] = useState(false);

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

  const isVisibleRef = useRef(false);
  const loopRef = useRef(null);
  const lastArrowLeftRef = useRef(-1);
  const lastPlacementRef = useRef("");

  /* ─── Wake loop on demand ──────────────────────────────────────────────── */
  const wakeLoop = useCallback(() => {
    if (!rafRef.current && isVisibleRef.current && loopRef.current) {
      rafRef.current = requestAnimationFrame(loopRef.current);
    }
  }, []);

  /* ─── Initialize canvas dimensions & toroidal positions (Zero forced reflow) ─── */
  useEffect(() => {
    const handleResize = (w, h) => {
      const vw = Math.round(w || window.innerWidth);
      const vh = Math.round(h || window.innerHeight);
      if (viewportRef.current.w === vw && viewportRef.current.h === vh && physicsRef.current.length > 0) {
        return;
      }
      viewportRef.current = { w: vw, h: vh };

      // Dynamically scale domain area so all items maintain optimal organic spacing
      const countScale = Math.max(1, Math.sqrt(TECHNOLOGIES.length / 38));
      const dw = Math.round(Math.max(1600, vw + 500) * countScale);
      const dh = Math.round(Math.max(1100, vh + 350) * countScale);
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
        hidden: false,
      }));
      setIsReady(true);
      wakeLoop();
    };

    const el = containerRef.current;
    if (el && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const cr = entry.contentRect;
          if (cr.width > 0 && cr.height > 0) {
            handleResize(cr.width, cr.height);
          }
        }
      });
      ro.observe(el);
      return () => ro.disconnect();
    } else {
      handleResize(window.innerWidth, window.innerHeight);
      const onWinResize = () => handleResize(window.innerWidth, window.innerHeight);
      window.addEventListener("resize", onWinResize, { passive: true });
      return () => window.removeEventListener("resize", onWinResize);
    }
  }, [wakeLoop]);

  /* ─── Visibility Tracking: Pause rAF completely when not in view ───────── */
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
        } else if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [wakeLoop]);

  /* ─── Keep hoveredIdRef in sync & wake loop ────────────────────────────── */
  useEffect(() => {
    hoveredIdRef.current = hoveredTech ? hoveredTech.id : null;
    wakeLoop();
  }, [hoveredTech, wakeLoop]);

  /* ─── Smooth recenter animation helper ─────────────────────────────────── */
  const handleRecenter = useCallback(() => {
    targetPanRef.current = { x: 0, y: 0 };
    inertiaRef.current = { vx: 0, vy: 0 };
    wakeLoop();
  }, [wakeLoop]);

  /* ─── Physics & Animation Frame Loop (Zero React re-renders) ───────────── */
  useEffect(() => {
    const loop = () => {
      if (!isVisibleRef.current) {
        rafRef.current = null;
        return;
      }

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
        // Inertia coasting with smooth 1-second deceleration
        if (Math.abs(inertiaRef.current.vx) > 0.01 || Math.abs(inertiaRef.current.vy) > 0.01) {
          panRef.current.x += inertiaRef.current.vx;
          panRef.current.y += inertiaRef.current.vy;
          inertiaRef.current.vx *= 0.962;
          inertiaRef.current.vy *= 0.962;
        } else {
          inertiaRef.current.vx = 0;
          inertiaRef.current.vy = 0;
        }
      }

      const panX = panRef.current.x;
      const panY = panRef.current.y;

      // Update background grid & starfield parallax positions with GPU-composited transforms
      if (bgGridRef.current) {
        const gx = Math.round(((panX * 0.4) % 48 + 48) % 48);
        const gy = Math.round(((panY * 0.4) % 48 + 48) % 48);
        bgGridRef.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      }
      if (starsRef1.current) {
        const s1x = Math.round(((panX * 0.15) % 800 + 800) % 800);
        const s1y = Math.round(((panY * 0.15) % 800 + 800) % 800);
        starsRef1.current.style.transform = `translate3d(${s1x}px, ${s1y}px, 0)`;
      }
      if (starsRef2.current) {
        const s2x = Math.round(((panX * 0.25) % 800 + 800) % 800);
        const s2y = Math.round(((panY * 0.25) % 800 + 800) % 800);
        starsRef2.current.style.transform = `translate3d(${s2x}px, ${s2y}px, 0)`;
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

      let maxDisp = 0;
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

        const dispMag = Math.hypot(s.dispX, s.dispY);
        if (dispMag > maxDisp) maxDisp = dispMag;

        // Step 3: Apply direct transform to DOM node with offscreen culling (zero DOM read)
        const el = nodeRefs.current[i];
        if (el) {
          const finalX = Math.round(s.screenX + s.dispX - CARD_HALF);
          const finalY = Math.round(s.screenY + s.dispY - CARD_HALF);
          const isOffscreen =
            finalX < -CARD_SIZE ||
            finalX > vw + CARD_SIZE ||
            finalY < -CARD_SIZE ||
            finalY > vh + CARD_SIZE;

          if (isOffscreen) {
            if (!s.hidden) {
              s.hidden = true;
              el.style.visibility = "hidden";
            }
          } else {
            if (s.hidden) {
              s.hidden = false;
              el.style.visibility = "visible";
            }
            el.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
          }
        }
      }

      // Step 4: Position floating tooltip dynamically with screen-aware dimensions & arrow alignment
      if (hovItem && tooltipRef.current) {
        const isMobile = vw < 640;
        const isSmallMobile = vw < 420;
        const estTooltipWidth = isSmallMobile ? 210 : isMobile ? 240 : 280;
        const halfTooltip = estTooltipWidth / 2;

        // Clamp X so tooltip never clips outside left/right screen borders with comfortable safety margin
        const safetyMargin = isMobile ? 12 : 16;
        const minX = halfTooltip + safetyMargin;
        const maxX = vw - halfTooltip - safetyMargin;
        const ttX = minX > maxX
          ? Math.round(vw / 2)
          : Math.max(minX, Math.min(maxX, Math.round(hovItem.screenX)));

        // Calculate dynamic caret arrow pointer offset pointing directly at the active item
        const rawOffset = Math.round(hovItem.screenX - (ttX - halfTooltip));
        const arrowLeft = Math.max(16, Math.min(estTooltipWidth - 16, rawOffset));
        if (lastArrowLeftRef.current !== arrowLeft) {
          lastArrowLeftRef.current = arrowLeft;
          tooltipRef.current.style.setProperty("--arrow-left", `${arrowLeft}px`);
        }

        // Check if item is in the lower portion of viewport, or close to bottom edge
        const bottomThreshold = isMobile ? vh - 150 : vh - 130;
        const isNearBottom = hovItem.screenY > bottomThreshold;
        const placement = isNearBottom ? "top" : "bottom";
        if (lastPlacementRef.current !== placement) {
          lastPlacementRef.current = placement;
          tooltipRef.current.dataset.placement = placement;
        }

        // Scale vertical offsets appropriately for mobile plate dimensions
        const yOffset = isNearBottom
          ? (isMobile ? -48 : -68)
          : (isMobile ? 46 : 58);
        const ttY = Math.round(hovItem.screenY + yOffset);
        const yTranslate = isNearBottom ? "-100%" : "0";

        tooltipRef.current.style.transform = `translate3d(${ttX}px, ${ttY}px, 0) translate(-50%, ${yTranslate})`;
      }

      // Check if simulation can safely sleep to save 100% CPU/GPU cycles
      const isDragging = dragRef.current.isDragging;
      const isReleasing = releaseTimerRef.current !== null;
      const isTargetPanning = targetPanRef.current !== null;
      const hasInertia = Math.abs(inertiaRef.current.vx) > 0.01 || Math.abs(inertiaRef.current.vy) > 0.01;
      const hasHover = hoveredIdRef.current !== null;

      if (!isDragging && !isReleasing && !isTargetPanning && !hasInertia && !hasHover && maxDisp < 0.1) {
        rafRef.current = null;
        return; // Idle sleep state reached
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    loopRef.current = loop;
    wakeLoop();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [wakeLoop]);

  /* ─── Hold-to-Drag Pointer Handlers (Hold required to drag canvas) ─────── */
  const HOLD_DURATION = 260; // ms to press & hold before drag activates
  const HOLD_RELEASE_DELAY = 1000; // 1-second delay so drag action completes smoothly on release
  const HOLD_MOVE_THRESHOLD = 9; // px movement tolerance before hold is canceled for normal scrolling

  const onPointerDown = useCallback((e) => {
    // Only respond to primary button
    if (e.button !== 0 && e.pointerType === "mouse") return;

    targetPanRef.current = null; // Cancel any active recenter animation
    inertiaRef.current = { vx: 0, vy: 0 };

    const clientX = e.clientX;
    const clientY = e.clientY;
    const pointerId = e.pointerId;
    const currentTarget = e.currentTarget;

    // For mouse, immediately capture pointer to prevent text selection and window autoscroll
    if (e.pointerType === "mouse") {
      try {
        currentTarget.setPointerCapture(pointerId);
      } catch {
        // Ignore
      }
    }

    // If user presses again within the 1-second release grace period of previous drag,
    // continue dragging immediately without having to hold for another 260ms!
    if (releaseTimerRef.current) {
      clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
      canDragRef.current = true;
      dragRef.current = {
        isDragging: true,
        startX: clientX,
        startY: clientY,
        startPanX: panRef.current.x,
        startPanY: panRef.current.y,
        lastX: clientX,
        lastY: clientY,
        lastTime: performance.now(),
        vx: 0,
        vy: 0,
        hasMoved: true,
        pointerId,
        currentTarget,
      };
      setIsGrabbing(true);
      try {
        currentTarget.setPointerCapture(pointerId);
      } catch {
        // Ignore
      }
      wakeLoop();
      return;
    }

    canDragRef.current = false;

    dragRef.current = {
      isDragging: false,
      startX: clientX,
      startY: clientY,
      startPanX: panRef.current.x,
      startPanY: panRef.current.y,
      lastX: clientX,
      lastY: clientY,
      lastTime: performance.now(),
      vx: 0,
      vy: 0,
      hasMoved: false,
      pointerId,
      currentTarget,
    };

    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }

    // Display tactile hold ring at pointer location
    setHoldProgress({ x: clientX, y: clientY, active: true, ready: false });
    setIsHolding(true);

    holdTimerRef.current = setTimeout(() => {
      canDragRef.current = true;
      dragRef.current.isDragging = true;
      // Anchor pan calculation to current pointer position
      dragRef.current.startX = dragRef.current.lastX;
      dragRef.current.startY = dragRef.current.lastY;
      dragRef.current.startPanX = panRef.current.x;
      dragRef.current.startPanY = panRef.current.y;

      setIsGrabbing(true);
      setHoldProgress((prev) => (prev ? { ...prev, ready: true } : null));

      if (typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate(35);
        } catch {
          // Ignore
        }
      }

      try {
        currentTarget.setPointerCapture(pointerId);
      } catch {
        // Ignore if pointer capture fails
      }

      wakeLoop();
    }, HOLD_DURATION);
  }, [wakeLoop]);

  const onPointerMove = useCallback((e) => {
    const drag = dragRef.current;
    drag.lastX = e.clientX;
    drag.lastY = e.clientY;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    // While waiting for hold to activate:
    if (!canDragRef.current) {
      // If user moved finger/cursor beyond threshold before hold completed,
      // it is a swipe or scroll intent — cancel hold so page can scroll naturally!
      if (Math.hypot(dx, dy) > HOLD_MOVE_THRESHOLD) {
        if (holdTimerRef.current) {
          clearTimeout(holdTimerRef.current);
          holdTimerRef.current = null;
        }
        setHoldProgress(null);
        setIsHolding(false);

        // If pointer was captured on mouse, release it so scrolling works
        try {
          if (e.currentTarget && e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        } catch {
          // Ignore
        }
      }
      return;
    }

    // Hold is active! Ensure pointer capture is locked to container
    try {
      if (e.currentTarget && e.currentTarget.setPointerCapture && (!e.currentTarget.hasPointerCapture || !e.currentTarget.hasPointerCapture(e.pointerId))) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }

    // Crucial: Stop browser from scrolling the window upwards/downwards
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();

    if (!drag.isDragging) return;

    wakeLoop();

    if (!drag.hasMoved && Math.hypot(dx, dy) > 4) {
      drag.hasMoved = true;
      // Fade out hold indicator once movement begins
      setHoldProgress(null);
    }

    panRef.current.x = drag.startPanX + (e.clientX - drag.startX);
    panRef.current.y = drag.startPanY + (e.clientY - drag.startY);

    // Track instantaneous release velocity (pixels per frame normalized to ~60fps)
    const now = performance.now();
    const dt = Math.max(1, now - drag.lastTime);
    if (dt > 4) {
      const instVx = ((e.clientX - drag.lastX) / dt) * 16.6;
      const instVy = ((e.clientY - drag.lastY) / dt) * 16.6;
      drag.vx = drag.vx * 0.4 + instVx * 0.6;
      drag.vy = drag.vy * 0.4 + instVy * 0.6;
      drag.lastTime = now;
    }
  }, [wakeLoop]);

  const onPointerUp = useCallback((e) => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setHoldProgress(null);
    setIsHolding(false);

    const drag = dragRef.current;
    const wasDragging = drag.isDragging;

    // End active pointer tracking
    drag.isDragging = false;

    try {
      if (e.currentTarget && e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }

    // Apply inertia and 1-second delay so dragging motion completes smoothly
    if (wasDragging && drag.hasMoved) {
      const speed = Math.hypot(drag.vx, drag.vy);
      const MAX_SPEED = 18;
      let vx = drag.vx;
      let vy = drag.vy;
      if (speed > MAX_SPEED) {
        vx = (vx / speed) * MAX_SPEED;
        vy = (vy / speed) * MAX_SPEED;
      } else if (speed < 1.4 && Math.hypot(drag.lastX - drag.startX, drag.lastY - drag.startY) > 5) {
        // Provide gentle follow-through glide in the drag direction
        // so the canvas never instantly stops like a glitch
        const dx = drag.lastX - drag.startX;
        const dy = drag.lastY - drag.startY;
        const dist = Math.hypot(dx, dy) || 1;
        vx = (dx / dist) * 2.8;
        vy = (dy / dist) * 2.8;
      }
      inertiaRef.current = { vx, vy };

      // Add 1-second delay so the dragging action finishes naturally
      if (releaseTimerRef.current) {
        clearTimeout(releaseTimerRef.current);
      }
      releaseTimerRef.current = setTimeout(() => {
        canDragRef.current = false;
        setIsGrabbing(false);
        releaseTimerRef.current = null;
      }, HOLD_RELEASE_DELAY);
    } else {
      canDragRef.current = false;
      setIsGrabbing(false);
      if (!drag.hasMoved) {
        // If clicked/tapped without dragging on background, clear hovered tech
        if (e.target.closest(".tech-loop-item") === null) {
          setHoveredTech(null);
        }
      }
    }

    wakeLoop();
  }, [wakeLoop]);

  // Non-passive touch listener to strictly prevent native page scrolling while dragging
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchMove = (e) => {
      if (canDragRef.current) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Cleanup hold and release timers on window blur or unmount
  useEffect(() => {
    const handleBlur = () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      if (releaseTimerRef.current) {
        clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = null;
      }
      setHoldProgress(null);
      setIsHolding(false);
      canDragRef.current = false;
      dragRef.current.isDragging = false;
      setIsGrabbing(false);
    };

    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (releaseTimerRef.current) clearTimeout(releaseTimerRef.current);
    };
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
                <LuRotateCcw className="skills-btn-icon" aria-hidden="true" />
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
        className={`skills-canvas-viewport${isHolding ? " is-holding" : ""}${isGrabbing ? " is-grabbing" : ""}`}
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="region"
        aria-label="Interactive infinite technology canvas. Press and hold to drag and explore."
      >
        {/* Dynamic Celestial Background (Subtle Grid & Parallax Stars) */}
        <div className="skills-bg-grid" ref={bgGridRef} aria-hidden="true" />
        <div className="skills-bg-stars skills-bg-stars--1" ref={starsRef1} aria-hidden="true" />
        <div className="skills-bg-stars skills-bg-stars--2" ref={starsRef2} aria-hidden="true" />
        <div className="skills-ambient-glow" aria-hidden="true" />

        {/* Hold to drag visual unlock indicator */}
        {holdProgress && (
          <div
            className={`skills-hold-indicator${holdProgress.ready ? " is-ready" : ""}`}
            style={{
              left: `${holdProgress.x}px`,
              top: `${holdProgress.y}px`,
            }}
            aria-hidden="true"
          >
            <svg className="skills-hold-svg" viewBox="0 0 44 44">
              <circle className="skills-hold-track" cx="22" cy="22" r="18" />
              <circle className="skills-hold-fill" cx="22" cy="22" r="18" />
            </svg>
            <span className="skills-hold-dot" />
          </div>
        )}

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
              data-tech={tech.id.replace('tech-', '')}
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

      {/* Floating Exploration Hint Banner at bottom of section */}
      <div className={`skills-drag-hint${isGrabbing ? " is-active-drag" : ""}`} aria-hidden="true">
        <LuCompass className="skills-hint-compass" />
        <span>
          {isGrabbing
            ? "Canvas Unlocked • Dragging in all directions"
            : "Hold & drag canvas to explore • Scroll down normally"}
        </span>
      </div>
    </div>
  );
}
