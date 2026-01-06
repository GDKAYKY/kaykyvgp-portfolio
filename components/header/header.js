class PortfolioHeader extends HTMLElement {
  constructor() {
    super();
    this._onScroll = this._onScroll.bind(this);
    this._onResize = this._onResize.bind(this);
    this._ticking = false;
    this._triggerPoint = 100;
    this._heroSection = null;
    this._mounted = false;
  }

  connectedCallback() {
    // 5. _mounted guard to avoid double initialization
    if (this._mounted) return;
    this._mounted = true;

    this.render();
    this.initScrollEffect();
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("resize", this._onResize);
    this._mounted = false;
  }

  /**
   * Resolve base path for assets.
   * Priority: attribute > automatic detection (heuristic)
   */
  getBasePath() {
    const attrPath = this.getAttribute("base-path");
    if (attrPath) return attrPath;

    // 2. Warn about heuristic fallback
    console.warn(
      "PortfolioHeader: 'base-path' attribute not provided. Using heuristic path resolution."
    );

    const path = globalThis.location.pathname;
    if (path.includes("/pages/projects")) return "../..";
    if (path.includes("/pages/")) return "..";
    return ".";
  }

  async render() {
    const basePath = this.getBasePath();
    const activeAttribute = this.getAttribute("active-page");

    // Inject Styles once
    if (!document.getElementById("portfolio-header-styles")) {
      const link = document.createElement("link");
      link.id = "portfolio-header-styles";
      link.rel = "stylesheet";
      link.href = `${basePath}/components/header/header.css`;
      document.head.appendChild(link);
    }

    try {
      const response = await fetch(`${basePath}/components/header/header.html`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const fullHtml = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(fullHtml, "text/html");
      const content =
        doc.querySelector("#header-content") ||
        doc.querySelector(".header-inner");

      if (!content) throw new Error("Header content not found in template");

      // 1. Idempotent DOM update
      this.replaceChildren(content.cloneNode(true));

      // 3. Update dynamic parts with clear source of truth
      this._updateDynamicState(activeAttribute);

      // Component wrapper class
      this.classList.add("site-header");
    } catch (e) {
      console.error("PortfolioHeader: Render failed", e);
    }
  }

  /**
   * @param {string|null} activeAttribute
   */
  _updateDynamicState(activeAttribute) {
    this._projectsBtn = this.querySelector('[data-nav="projects"]');
    if (this._projectsBtn) {
      // 3. Clear source of truth: Attribute wins over URL
      const isActive = activeAttribute
        ? activeAttribute === "projects"
        : globalThis.location.pathname.includes("/projects");

      this._projectsBtn.classList.toggle("active", isActive);
    }
  }

  initScrollEffect() {
    this._heroSection = document.querySelector(".hero-section");

    // 4. Intentional behavior: We only care about scroll transitions if there's a hero
    // If no hero, we stay fixed or transparent based on initial CSS or global layout.
    // However, for this portfolio, we'll keep the fallback trigger point but make it explicit.
    this._updateTriggerPoint();

    window.addEventListener("resize", this._onResize, { passive: true });
    window.addEventListener("scroll", this._onScroll, { passive: true });

    // Initial state
    this._updateHeaderState();
  }

  _onResize() {
    this._updateTriggerPoint();
  }

  _updateTriggerPoint() {
    const CONFIG = { offset: 100, defaultTrigger: 100 };

    if (!this._heroSection) {
      this._heroSection = document.querySelector(".hero-section");
    }

    if (this._heroSection) {
      this._triggerPoint = Math.max(
        0,
        this._heroSection.offsetHeight - CONFIG.offset
      );
    } else {
      this._triggerPoint = CONFIG.defaultTrigger;
    }
  }

  _onScroll() {
    if (!this._ticking) {
      requestAnimationFrame(() => {
        this._updateHeaderState();
        this._ticking = false;
      });
      this._ticking = true;
    }
  }

  _updateHeaderState() {
    const isFloating = window.scrollY > this._triggerPoint;
    this.classList.toggle("floating", isFloating);
  }
}

customElements.define("portfolio-header", PortfolioHeader);
