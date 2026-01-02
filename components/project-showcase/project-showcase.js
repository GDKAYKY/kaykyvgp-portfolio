class ProjectShowcase extends HTMLElement {
  async connectedCallback() {
    this.render();
  }

  getBasePath() {
    const path = globalThis.location.pathname;
    if (path.includes("/pages/projects/")) return "../..";
    if (path.includes("/pages/")) return "..";
    return ".";
  }

  async render() {
    const basePath = this.getAttribute("base-path") || this.getBasePath();

    // Attributes
    const context = this.getAttribute("context") || "Project Context";
    const title = this.getAttribute("title") || "Project Title";
    const description = this.innerHTML || ""; // Use innerHTML for description to allow flexible markup
    const tags = (this.getAttribute("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
    const link = this.getAttribute("link") || "#";
    const linkText = this.getAttribute("link-text") || "View Project";
    const image = this.getAttribute("image") || "";
    const imageAlt = this.getAttribute("image-alt") || title;
    const visualStyle = this.getAttribute("visual-style") || "framed"; // 'framed' or 'clean'
    const animation = this.getAttribute("animation") || "";

    // Ensure CSS is loaded (it is shared with project-card)
    if (!document.querySelector('link[href*="project-showcase.css"]')) {
      const linkEl = document.createElement("link");
      linkEl.rel = "stylesheet";
      linkEl.href = `${basePath}/components/project-showcase/project-showcase.css`;
      document.head.appendChild(linkEl);
    }

    try {
      const response = await fetch(
        `${basePath}/components/project-showcase/project-showcase.html`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const fullHtml = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(fullHtml, "text/html");
      const content = doc.querySelector("#showcase-content");

      if (!content) throw new Error("Could not find showcase content");

      // Update Content
      if (animation) {
        const classes = animation.split(" ");
        content.classList.add(...classes);
      }
      content.querySelector(".project-context").textContent = context;
      content.querySelector(".project-title").textContent = title;

      // Description: Use the inner HTML passed to the component, or fallback to attribute
      // Note: We need to put it inside .project-description
      const descContainer = content.querySelector(".project-description");
      if (description.trim()) {
        descContainer.innerHTML = description;
      } else if (this.getAttribute("description")) {
        descContainer.textContent = this.getAttribute("description");
      }

      // Tags
      const tagsContainer = content.querySelector(".project-tags");
      tagsContainer.innerHTML = tags
        .map((tag) => `<span class="tag-pill">${tag}</span>`)
        .join("");

      // Link
      const linkEl = content.querySelector(".project-main-link");
      linkEl.href = link;
      // Update text but keep the SVG
      const svg = linkEl.querySelector("svg");
      linkEl.textContent = linkText + " ";
      linkEl.appendChild(svg);

      // Image Area
      const visualCol = content.querySelector(".project-visual");
      // Check visual style
      const imgContainer = visualCol.querySelector(
        'div[class*="project-image-container"]'
      );

      if (visualStyle === "clean") {
        imgContainer.className =
          "project-image-container-clean animate-fade-in-up animate-delay-5";
        // Remove animation from image if container has it?
        // Wait, previous step put animation on IMAGE for clean style.
        // Let's stick to the HTML template structure logic.

        // In template I put: <div class="project-image-container-clean"><img ... class="... animate-fade-in-up ..."></div>
        // So default template handles 'clean' structure well.
        imgContainer.className = "project-image-container-clean";
      } else {
        imgContainer.className = "project-image-container";
      }

      const imgEl = imgContainer.querySelector("img");
      if (image) {
        imgEl.src = image;
        imgEl.alt = imageAlt;

        // Apply animations to image directly (as per latest user preference for clean style)
        // Or keep consistent? User asked to animate image for YTDLN (clean).
        // For framed, usually the container animates.

        if (visualStyle === "clean") {
          imgEl.classList.add("animate-fade-in-up", "animate-delay-5");
        } else {
          // Framed style usually animates the container or image?
          // In styles.css previous usage, .project-visual had the animation.
          // Let's put it on the container for framed, image for clean?
          // Or just stick to image for consistency if possible.
          // Let's apply to image for both to be safe, or Container.
          // Current template has animation on image.
        }
      } else {
        // Handle visual placeholder if no image (like in portfolio.html)
        imgContainer.style.background = "#111";
        imgContainer.style.display = "flex";
        imgContainer.style.alignItems = "center";
        imgContainer.style.justifyContent = "center";
        imgContainer.style.minHeight = "300px";
        imgContainer.innerHTML = `<span style="color: #333; font-weight: 700; font-size: 24px">Visual Placeholder</span>`;
      }

      this.innerHTML = ""; // Clear custom element children (which were used for description)
      this.appendChild(content);

      // Re-trigger scroll observer since we injected new animated elements
      if (globalThis.initScrollReveal) {
        // Short timeout to ensure DOM is ready
        setTimeout(() => globalThis.initScrollReveal(), 100);
      }
    } catch (e) {
      console.error("Failed to load project-showcase component:", e);
    }
  }
}

customElements.define("project-showcase", ProjectShowcase);
