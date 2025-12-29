/* ================= PARTICLE LOADER CONFIG ================= */
const COLORS = {
  bg: "#000000ff", // Theme matches styles.css
  particleIdle: "rgba(170, 170, 170, 0.5)", // Subdued
  particleActive: "#ffffff", // Focus
  line: "rgba(100, 100, 100, 0.5)", // Lines
  glow: "rgba(255, 255, 255, 0.5)", // Active glow
};

// Optimized distances for density
const MAX_DIST = 100;
const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

let canvas, ctx;
const particles = [];
let mouse = { x: null, y: null };
let animationFrameId;

/* ================= UTILS ================= */
function adjustParticleCount() {
  if (!canvas) return 0;
  const area = canvas.width * canvas.height;
  if (area < 600_000) return 200;
  if (area < 1_200_000) return 320;
  if (area < 2_000_000) return 440;
  return 500;
}

/* ================= PARTICLE CLASS ================= */
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // Subtle drift movement
    const speed = 0.08 + Math.random() * 0.1;
    const angle = Math.random() * 2 * Math.PI;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    this.size = 1.5; // Small particles for high density
    this.connected = false;
  }

  update(mouse) {
    if (!canvas) return;

    // 1. Subtle movement
    this.x += this.vx;
    this.y += this.vy;

    // Edge bounce
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // 2. Mouse interaction
    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distSq = dx * dx + dy * dy;

      // Mouse influence radius
      const mouseInfluenceSq = 50 * 50;

      if (distSq < mouseInfluenceSq) {
        this.connected = true; // Force active near mouse
        const dist = Math.sqrt(distSq);

        // Soft repel force
        const force = ((mouseInfluenceSq - distSq) / mouseInfluenceSq) * 0.05;
        this.vx -= (dx / dist) * force;
        this.vy -= (dy / dist) * force;

        // Damping
        this.vx *= 0.98;
        this.vy *= 0.98;
      }
    }
  }

  draw() {
    if (!ctx) return;

    ctx.fillStyle = this.connected
      ? COLORS.particleActive
      : COLORS.particleIdle;

    // GLOW effect when active
    if (this.connected) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = COLORS.glow;
    } else {
      ctx.shadowBlur = 0;
    }

    // Draw particle
    ctx.fillRect(this.x, this.y, this.size, this.size);

    // Reset shadowBlur
    ctx.shadowBlur = 0;
  }
}

/* ================= SETUP ================= */
function createParticles() {
  if (!canvas) return;

  particles.length = 0;
  const count = adjustParticleCount();

  for (let i = 0; i < count; i++) {
    particles.push(
      new Particle(Math.random() * canvas.width, Math.random() * canvas.height)
    );
  }
}

function resize() {
  if (!canvas) return;
  // Use parent container dimensions
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  createParticles();
}

/* ================= BACKGROUND ================= */
function drawBackground() {
  if (!ctx || !canvas) return;
  // Solid black background for max contrast
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/* ================= CONNECTIONS ================= */
function connectParticles() {
  if (!ctx) return;

  // Reset connection state
  particles.forEach((p) => (p.connected = false));

  for (let i = 0; i < particles.length; i++) {
    const p1 = particles[i];
    let closestNeighbor = null;
    let minDistanceSq = MAX_DIST_SQ;

    // Find closest neighbor
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];

      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dSq = dx * dx + dy * dy;

      if (dSq < minDistanceSq) {
        minDistanceSq = dSq;
        closestNeighbor = p2;
      }
    }

    // Draw line if neighbor found
    if (closestNeighbor) {
      const p2 = closestNeighbor;
      const d = Math.sqrt(minDistanceSq);

      // Dynamic Monochromatic Line Style
      const alpha = 1 - d / MAX_DIST;

      ctx.strokeStyle = `rgba(100, 100, 100, ${alpha * 0.7})`;
      ctx.lineWidth = alpha * 1.5; // Thicker lines when closer

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Set connected state
      p1.connected = true;
      p2.connected = true;
    }
  }
}

/* ================= INPUT HANDLING ================= */
function handleMouseMove(e) {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}

function handleMouseLeave() {
  mouse.x = null;
  mouse.y = null;
}

/* ================= ANIMATION LOOP ================= */
let isRunning = false;

function animate() {
  if (!isRunning) return;

  if (!document.getElementById("canvas")) {
    isRunning = false;
    return;
  }

  drawBackground();

  // 1. Update and apply physics
  particles.forEach((p) => p.update(mouse));

  // 2. Connect network
  connectParticles();

  // 3. Draw particles
  particles.forEach((p) => p.draw());

  animationFrameId = requestAnimationFrame(animate);
}

/* ================= INIT EXPORT ================= */
// Initialize the particle system
function initParticleLoader() {
  if (isRunning) return;

  canvas = document.getElementById("canvas");
  if (!canvas) return;

  ctx = canvas.getContext("2d", { alpha: false }); // Optimization: no alpha for background

  globalThis.addEventListener("resize", resize);
  // Attach mouse events to the window but calculate relative position, or attach to canvas?
  // Attaching to window ensures we track mouse even if it leaves the canvas momentarily but is over the page
  // But we need coordinate mapping which is done in handleMouseMove
  globalThis.addEventListener("mousemove", handleMouseMove);
  globalThis.addEventListener("mouseleave", handleMouseLeave);
  // Also update on scroll because getBoundingClientRect changes
  globalThis.addEventListener("scroll", () => {
    // Optional: we could re-read mouse position here if we stored the last event
    // But standard particle effects usually just react to mouse movements.
    // However, since canvas moves on scroll, the calculating "mouse in canvas" might shift if mouse stays still and page scrolls.
    // For now, let's keep it simple.
  });

  isRunning = true;
  resize();
  animate();
}

function stopParticleLoader() {
  isRunning = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  globalThis.removeEventListener("resize", resize);
  globalThis.removeEventListener("mousemove", handleMouseMove);
  globalThis.removeEventListener("mouseleave", handleMouseLeave);

  // Cleanup canvas memory
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Clear references
  ctx = null;
  canvas = null;

  // Clear particles array
  particles.length = 0;

  console.log("Particle Loader stopped and cleaned up.");
}

// Make available globally
globalThis.initParticleLoader = initParticleLoader;
globalThis.stopParticleLoader = stopParticleLoader;

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initParticleLoader);
} else {
  initParticleLoader();
}
