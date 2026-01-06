class PortfolioHeader extends HTMLElement {
  async connectedCallback() {
    this.render();
    this.initScrollEffect();
  }

  getBasePath() {
    const path = globalThis.location.pathname;
    if (path.includes("/pages/projects")) return "../..";
    if (path.includes("/pages/")) return "..";
    return ".";
  }

  async render() {
    const basePath = this.getAttribute("base-path") || this.getBasePath();
    const activePage = this.getAttribute("active-page") || "";

    // Inject Styles if not already present
    if (!document.getElementById("portfolio-header-styles")) {
      const link = document.createElement("link");
      link.id = "portfolio-header-styles";
      link.rel = "stylesheet";
      link.href = `${basePath}/components/header/header.css`;
      document.head.appendChild(link);
    }

    // Fetch and inject HTML
    try {
      const response = await fetch(`${basePath}/components/header/header.html`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const fullHtml = await response.text();

      // Extract content using DOMParser
      const parser = new DOMParser();
      const doc = parser.parseFromString(fullHtml, "text/html");
      const content =
        doc.querySelector("#header-content") ||
        doc.querySelector(".header-inner");

      if (!content) {
        throw new Error("Could not find header content in template");
      }

      let html = content.outerHTML;

      // Template interpolation
      html = html.replaceAll("${basePath}", basePath);
      html = html.replaceAll(
        "${activePage === 'projects' ? 'active' : ''}",
        activePage.includes("project") ? "active" : ""
      );

      this.innerHTML = html;

      // Ensure site-header class
      if (!this.classList.contains("site-header")) {
        this.classList.add("site-header");
      }
    } catch (e) {
      console.error("Failed to load header component:", e);
    }
  }

  initScrollEffect() {
    const CONFIG = {
      headerTriggerOffset: 100, // px from top or bottom of hero
    };

    const heroSection = document.querySelector(".hero-section");
    let triggerPoint = 100; // Default trigger point if no hero

    // If hero exists, set trigger point based on its height
    const updateTriggerPoint = () => {
      if (heroSection) {
        triggerPoint = heroSection.offsetHeight - CONFIG.headerTriggerOffset;
      }
    };

    // Update on resize
    globalThis.addEventListener("resize", updateTriggerPoint, {
      passive: true,
    });
    // Attempt initial update (might need delay if hero loads async)
    if (heroSection) updateTriggerPoint();

    let ticking = false;
    const updateHeader = () => {
      if (window.scrollY > triggerPoint) {
        this.classList.add("floating");
      } else {
        this.classList.remove("floating");
      }
      ticking = false;
    };

    globalThis.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          globalThis.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      },
      { passive: true }
    );

    // Initial check
    updateHeader();
  }
}

// Define the custom element
customElements.define("portfolio-header", PortfolioHeader);
