<script lang="ts">
  import { onMount } from "svelte";

  export let href = "/";
  export let label = "LIQUID CARVE";
  export let blobColor = "#fc731c";
  export let blobSize = 80;
  export let rounded = 16;
  export let newTab = false;

  let root: HTMLAnchorElement;
  let follow: SVGGElement;
  let squash: SVGGElement;
  let bite: SVGGElement;
  let radius = 0;
  let frame = 0;
  let reducedMotion = false;
  let targetScale = 0;
  let currentScale = 0;
  let hovered = false;

  const state = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    squash: 1,
    angle: 0,
  };

  // The component currently has one instance on the page, so this stays
  // deterministic between SSR and hydration while keeping SVG IDs unique.
  const filterId = "liquid-carve-goo-projects";
  const maskId = "liquid-carve-bite-projects";

  function updateRadius() {
    if (!root) return;
    radius = Math.floor(
      (Math.min(root.offsetWidth, root.offsetHeight) / 2) *
        (Math.max(0, Math.min(100, rounded)) / 100),
    );
  }

  function pointerOffset(event: PointerEvent) {
    const bounds = root.getBoundingClientRect();
    return {
      x: event.clientX - (bounds.left + bounds.width / 2),
      y: event.clientY - (bounds.top + bounds.height / 2),
    };
  }

  function setPointerPosition(event: PointerEvent) {
    const offset = pointerOffset(event);
    state.targetX = offset.x;
    state.targetY = offset.y;
  }

  function enter(event: PointerEvent) {
    hovered = true;
    setPointerPosition(event);
    state.x = state.targetX;
    state.y = state.targetY;
    targetScale = reducedMotion ? 0 : 1;
  }

  function leave() {
    hovered = false;
    targetScale = 0;
  }

  function focus() {
    if (!reducedMotion) targetScale = 1;
  }

  onMount(() => {
    reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    updateRadius();

    const observer = new ResizeObserver(updateRadius);
    observer.observe(root);

    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000) || 1 / 60;
      last = now;

      const followTau = 0.02 + 0.55 * 0.4;
      const followFactor = reducedMotion ? 1 : 1 - Math.exp(-delta / followTau);
      const dx = (state.targetX - state.x) * followFactor;
      const dy = (state.targetY - state.y) * followFactor;
      state.x += dx;
      state.y += dy;

      const speed = Math.hypot(dx, dy) / delta;
      const desiredSquash = reducedMotion
        ? 1
        : Math.min(1.6, 1 + speed * 0.0011);
      state.squash +=
        (desiredSquash - state.squash) * (1 - Math.exp(-delta / 0.09));
      if (speed > 8) state.angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      currentScale +=
        (targetScale - currentScale) * (1 - Math.exp(-delta / 0.18));

      if (follow)
        follow.style.transform = `translate(${state.x}px, ${state.y}px)`;
      if (squash) {
        squash.style.transform = `rotate(${state.angle}deg) scale(${state.squash}, ${1 / state.squash})`;
      }
      if (bite) bite.style.transform = `scale(${currentScale})`;

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  });
</script>

<a
  bind:this={root}
  class="liquid-carve-button hero-button primary"
  {href}
  target={newTab ? "_blank" : undefined}
  rel={newTab ? "noopener noreferrer" : undefined}
  aria-label={label}
  on:pointerenter={enter}
  on:pointermove={setPointerPosition}
  on:pointerleave={leave}
  on:focus={focus}
  on:blur={leave}
>
  <svg class="liquid-carve-svg" aria-hidden="true" width="100%" height="100%">
    <defs>
      <filter id={filterId} x="-20%" y="-40%" width="140%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
        />
      </filter>
      <mask id={maskId} maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <g bind:this={follow}>
          <g bind:this={squash}>
            <g bind:this={bite}>
              <circle
                cx="50%"
                cy="50%"
                r={Math.max(1, Math.floor(blobSize / 2))}
                fill="black"
              />
            </g>
          </g>
        </g>
      </mask>
    </defs>

    <g filter={`url(#${filterId})`}>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx={radius}
        fill={blobColor}
      />
    </g>
    <g filter={`url(#${filterId})`}>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx={radius}
        fill="white"
        mask={`url(#${maskId})`}
      />
    </g>
  </svg>

  <span class="liquid-carve-label">{label}</span>
</a>

<style>
  .liquid-carve-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1px;
    min-height: 1px;
    padding: 14px 26px;
    overflow: visible;
    isolation: isolate;
    border: 0;
    border-radius: 10px;
    background: transparent !important;
    color: #000 !important;
    cursor: pointer;
    text-decoration: none;
    user-select: none;
    box-sizing: border-box;
  }

  .liquid-carve-button:hover {
    transform: none;
    box-shadow: none;
  }

  .liquid-carve-button:focus-visible {
    outline: 2px solid #fc731c;
    outline-offset: 5px;
  }

  .liquid-carve-svg {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: visible;
    pointer-events: none;
  }

  .liquid-carve-svg g {
    transform-box: fill-box;
    transform-origin: center;
  }

  .liquid-carve-label {
    position: relative;
    z-index: 1;
    color: #000;
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    .liquid-carve-button {
      width: 100%;
    }
  }
</style>
