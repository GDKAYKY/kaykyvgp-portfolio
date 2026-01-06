class PortfolioFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  getBasePath() {
    const path = globalThis.location.pathname;
    if (path.includes("/pages/projects/")) return "../..";
    if (path.includes("/pages/")) return "..";
    return ".";
  }

  injectStyles(basePath) {
    if (document.getElementById("portfolio-footer-styles")) return;

    const link = document.createElement("link");
    link.id = "portfolio-footer-styles";
    link.rel = "stylesheet";
    link.href = `${basePath}/components/footer/footer.css`;
    document.head.appendChild(link);
  }

  async render() {
    const basePath = this.getAttribute("base-path") || this.getBasePath();
    this.injectStyles(basePath);

    try {
      const res = await fetch(`${basePath}/components/footer/footer.html`);
      if (!res.ok) throw new Error(res.status);

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const content = doc.querySelector("#footer-content");

      if (content) {
        // Option to customize the bio via attribute
        const customBio = this.getAttribute("bio");
        if (customBio) {
          const bioEl = content.querySelector(".bio");
          if (bioEl) bioEl.textContent = customBio;
        }

        this.innerHTML = content.outerHTML;

        // Initialize Lucide icons for the newly injected content
        if (globalThis.lucide) {
          globalThis.lucide.createIcons();
        }
      }

      // Initialize any global animations if needed
      globalThis.initScrollReveal?.();
    } catch (err) {
      console.error("PortfolioFooter: failed to load", err);
    }
  }
}

customElements.define("portfolio-footer", PortfolioFooter);
