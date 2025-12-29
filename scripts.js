(() => {
  "use strict";

  // --- Configuration ---
  const CONFIG = {
    typewriterSpeed: 80,
    headerTriggerOffset: 100, // px from bottom of hero
    parallaxSpeedDefault: 0.5,
    scrollThreshold: 0.1,
  };

  // --- Utils ---
  /**
   * Check if user prefers reduced motion
   * @returns {boolean}
   */
  const isReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Animations ---

  /**
   * Initialize IntersectionObserver for scroll reveal animations
   * Replaces the old scroll event listener
   */
  const initScrollReveal = () => {
    const elements = document.querySelectorAll(
      ".animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right"
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            // Apply styles directly or use a class.
            // The existing CSS relies on inline styles being set by JS for the 'fade-in' classes to work?
            // Checking stats: .animate-fade-in-up { opacity: 0; animation: ... }
            // The previous JS set opacity=1 and transform.
            // Actually, the CSS has 'animation' properties that run once triggered?
            // The previous JS did: element.style.opacity = "1"; element.style.transform = "translateY(0) translateX(0)";
            // But the CSS also has keyframes.
            // Let's stick to the previous behavior: set styles to trigger visibility.
            // Better yet, let's keep it simple and clean.
            // el.style.opacity = "1";
            // el.style.transform = "translateY(0) translateX(0)";
            el.classList.add("revealed");
            obs.unobserve(el);
          }
        });
      },
      {
        threshold: CONFIG.scrollThreshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
  };

  /**
   * Initialize Typewriter effect for the H1
   */
  const initTypewriter = () => {
    const titleElement = document.querySelector("h1");
    if (!titleElement) return;

    // Prevent layout shift by locking height
    titleElement.style.height = getComputedStyle(titleElement).height;

    // safe text retrieval
    const text = titleElement.textContent.trim();
    titleElement.textContent = "";

    let i = 0;
    const type = () => {
      if (i < text.length && document.body.contains(titleElement)) {
        titleElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, CONFIG.typewriterSpeed);
      }
    };

    // Small delay to ensure render availability
    setTimeout(type, 300);
  };

  /**
   * Initialize Parallax effect with RequestAnimationFrame
   */
  const initParallax = () => {
    if (isReducedMotion()) return;

    const parallaxElements = document.querySelectorAll(".parallax");
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.scrollY;
      parallaxElements.forEach((element) => {
        const speed =
          parseFloat(element.dataset.speed) || CONFIG.parallaxSpeedDefault;
        // Limit maximum translation to prevent elements flying off too far
        const yPos = scrolled * speed;
        element.style.transform = `translateY(${yPos}px)`;
      });
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  };

  // --- Core Components ---

  // --- Main Initialization ---
  document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initTypewriter();
    initParallax();
  });
})();
