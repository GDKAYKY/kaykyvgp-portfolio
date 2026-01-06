class ProjectShowcase extends HTMLElement {
  connectedCallback() {
    // Preserva preview embutido para debug no editor
    this._inlinePreview = this.innerHTML.trim();
    this.render();
  }

  getBasePath() {
    const path = globalThis.location.pathname;
    if (path.includes("/pages/projects/")) return "../..";
    if (path.includes("/pages/")) return "..";
    return ".";
  }

  ensureStyles(basePath) {
    if (document.getElementById("project-showcase-style")) return;

    const link = document.createElement("link");
    link.id = "project-showcase-style";
    link.rel = "stylesheet";
    link.href = `${basePath}/components/project-showcase/project-showcase.css`;
    document.head.appendChild(link);
  }

  async render() {
    const basePath = this.getAttribute("base-path") || this.getBasePath();

    const context = this.getAttribute("context") || "Project Context";
    const title = this.getAttribute("title") || "Project Title";
    const tags = (this.getAttribute("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const link = this.getAttribute("link") || "#";
    const linkText = this.getAttribute("link-text") || "View Project";

    const image = this.getAttribute("image");
    const imageAlt = this.getAttribute("image-alt") || title;
    const visualStyle = this.getAttribute("visual-style") || "framed";

    this.ensureStyles(basePath);

    try {
      const res = await fetch(
        `${basePath}/components/project-showcase/project-showcase.html`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const content = doc.querySelector("#showcase-content");

      if (!content) throw new Error("Missing #showcase-content");

      // Context / title
      content.removeAttribute("id");
      content.querySelector(".project-context").textContent = context;
      content.querySelector(".project-title").textContent = title;

      // Description (usa preview embutido se existir)
      const desc = content.querySelector(".project-description");
      if (this._inlinePreview) {
        desc.innerHTML = this._inlinePreview;
      } else if (this.hasAttribute("description")) {
        desc.textContent = this.getAttribute("description");
      }

      // Tags
      content.querySelector(".project-tags").innerHTML = tags
        .map((tag) => `<span class="tag-pill">${tag}</span>`)
        .join("");

      // Link
      const linkEl = content.querySelector(".project-main-link");
      const svg = linkEl.querySelector("svg");
      linkEl.href = link;
      linkEl.textContent = `${linkText} `;
      if (svg) linkEl.appendChild(svg);

      // Visual
      const visual = content.querySelector(".project-visual");
      const container = visual.querySelector(
        '[class^="project-image-container"]'
      );
      const img = container.querySelector("img");

      container.className =
        visualStyle === "clean"
          ? "project-image-container-clean"
          : "project-image-container";

      if (image) {
        img.src = image;
        img.alt = imageAlt;
        img.classList.add("animate-fade-in-up", "animate-delay-5");
      }

      // Download Link (Windows Button)
      const downloadLinkUrl = this.getAttribute("download-link");
      if (downloadLinkUrl) {
        const linkParent = linkEl.parentNode;
        const downloadBtnHtml = `
          <a href="${downloadLinkUrl}" class="win-download-btn" target="_blank" rel="noopener noreferrer">
            <div class="win-icon-grid">
              <div class="win-pane win-pane-1"></div>
              <div class="win-pane win-pane-2"></div>
              <div class="win-pane win-pane-3"></div>
              <div class="win-pane win-pane-4"></div>
            </div>
            <div class="win-info">
              <div class="win-title">Download for Windows x86-x64</div>
              <div class="win-meta">275MB • v1.0.0</div>
            </div>
          </a>
        `;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = downloadBtnHtml.trim();
        // Insert BEFORE the View Repository link (Left side)
        linkParent.insertBefore(tempDiv.firstChild, linkEl);

        // Ensure parent aligns items side-by-side
        linkParent.style.display = "flex";
        linkParent.style.flexDirection = "row";
        linkParent.style.alignItems = "center";
        linkParent.style.gap = "16px";
        linkParent.style.marginTop = "24px";
      }

      // 🔑 Só agora substitui o preview embutido
      this.innerHTML = "";
      this.appendChild(content);

      if (globalThis.lucide) {
        globalThis.lucide.createIcons();
      }

      globalThis.initScrollReveal?.();
    } catch (err) {
      console.error("ProjectShowcase failed:", err);
      // preview embutido permanece visível se der erro
    }
  }
}

customElements.define("project-showcase", ProjectShowcase);
