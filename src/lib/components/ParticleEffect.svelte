<script lang="ts">
  import { onMount } from "svelte";

  // ===== CONFIGURATION =====
  const COLORS = {
    bg: "#000000ff",
    particleIdle: "rgba(170, 170, 170, 0.5)",
    particleActive: "#ffffff",
    line: "rgba(100, 100, 100, 0.5)",
    glow: "rgba(255, 255, 255, 0.5)",
  };

  const MAX_DIST = 100;
  const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let particles: Particle[] = [];
  let mouse = { x: null as number | null, y: null as number | null };
  let animationFrameId: number;
  let time = 0;
  let isRunning = false;

  // ===== UTILS =====
  function adjustParticleCount(): number {
    if (!canvas) return 0;
    const area = canvas.width * canvas.height;
    if (area < 600_000) return 150;
    if (area < 1_200_000) return 250;
    if (area < 2_000_000) return 350;
    return 400;
  }

  function smoothstep(edge0: number, edge1: number, x: number): number {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  // ===== PARTICLE CLASS =====
  class Particle {
    baseX: number;
    baseY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    connected: boolean;
    noiseOffset: number;

    constructor(x: number, y: number) {
      this.baseX = x;
      this.baseY = y;
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = 1.4 + Math.random() * 0.4;
      this.connected = false;
      this.noiseOffset = Math.random() * 1000;
    }

    update(mouse: { x: number | null; y: number | null }, time: number) {
      if (!canvas) return;

      // Organic Drift
      const driftX =
        Math.sin(time * 0.5 + this.noiseOffset) * 0.2 +
        Math.sin(time * 0.2 + this.baseY * 0.01) * 0.3;
      const driftY =
        Math.cos(time * 0.4 + this.noiseOffset) * 0.2 +
        Math.cos(time * 0.3 + this.baseX * 0.01) * 0.3;

      this.vx += driftX * 0.05;
      this.vy += driftY * 0.05;

      // Mouse Interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const ringRadius = 120;
        const ringWidth = 80;

        const force =
          smoothstep(ringRadius - ringWidth, ringRadius, dist) -
          smoothstep(ringRadius, ringRadius + ringWidth, dist);

        if (dist > 0) {
          const repulsionStrength = 2.5;
          this.vx += (dx / dist) * force * repulsionStrength;
          this.vy += (dy / dist) * force * repulsionStrength;
        }
      }

      // Apply physics
      this.x += this.vx;
      this.y += this.vy;

      // Damping
      this.vx *= 0.92;
      this.vy *= 0.92;

      // Bounds
      if (this.x < 0) {
        this.x = 0;
        this.vx *= -1;
      } else if (this.x > canvas.width) {
        this.x = canvas.width;
        this.vx *= -1;
      }

      if (this.y < 0) {
        this.y = 0;
        this.vy *= -1;
      } else if (this.y > canvas.height) {
        this.y = canvas.height;
        this.vy *= -1;
      }

      this.baseX += this.vx * 0.1;
      this.baseY += this.vy * 0.1;
    }

    draw() {
      if (!ctx) return;

      ctx.fillStyle = this.connected
        ? COLORS.particleActive
        : COLORS.particleIdle;

      if (this.connected) {
        ctx.shadowBlur = 4;
        ctx.shadowColor = COLORS.glow;
      } else {
        ctx.shadowBlur = 0;
      }

      const side = this.size * 1.2;
      ctx.fillRect(this.x - side / 2, this.y - side / 2, side, side);

      ctx.shadowBlur = 0;
    }
  }

  // ===== SETUP =====
  function createParticles() {
    if (!canvas) return;

    particles = [];
    const count = adjustParticleCount();

    for (let i = 0; i < count; i++) {
      particles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }
  }

  function resize() {
    if (!canvas) return;
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
      createParticles();
    }
  }

  // ===== DRAWING =====
  function drawBackground() {
    if (!ctx || !canvas) return;
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function connectParticles() {
    if (!ctx) return;

    particles.forEach((p) => (p.connected = false));

    const maxConnections = 3;

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      let connectionsFound = 0;

      for (
        let j = i + 1;
        j < particles.length && connectionsFound < maxConnections;
        j++
      ) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dSq = dx * dx + dy * dy;

        if (dSq < MAX_DIST_SQ) {
          const d = Math.sqrt(dSq);
          const alpha = (1 - d / MAX_DIST) * 0.5;

          ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`;
          ctx.lineWidth = alpha * 1.5;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          p1.connected = true;
          p2.connected = true;
          connectionsFound++;
        }
      }
    }
  }

  // ===== INPUT =====
  function handleMouseMove(e: MouseEvent) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function handleMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  // ===== ANIMATION LOOP =====
  function animate() {
    if (!isRunning) return;

    time += 0.016;

    drawBackground();
    particles.forEach((p) => p.update(mouse, time));
    connectParticles();
    particles.forEach((p) => p.draw());

    animationFrameId = requestAnimationFrame(animate);
  }

  onMount(() => {
    ctx = canvas.getContext("2d", { alpha: false });

    isRunning = true;
    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  });
</script>

<canvas bind:this={canvas} class="particle-canvas"></canvas>

<style>
  .particle-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: -1;
    pointer-events: auto;
  }
</style>
