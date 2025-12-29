const CARD_STYLES = `
/* Grid Container - kept here for context or can be moved to page style */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  padding: 40px 0;
}

.project-card-compact {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  text-decoration: none;
  height: 100%;
}

.project-card-compact:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.card-image-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative; /* Ensure text can be centered if needed */
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card-compact:hover .card-image {
  transform: scale(1.05);
}

.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 12px;
}

.card-type {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--secondary-text);
  font-weight: 600;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-text);
  margin: 0;
  line-height: 1.2;
}

.card-description {
  font-size: 0.95rem;
  color: var(--secondary-text);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-tag {
  font-size: 0.7rem;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  color: var(--secondary-text);
}

.card-link-icon {
  color: var(--primary-text);
  opacity: 0.5;
  transition: opacity 0.3s, transform 0.3s;
}

.project-card-compact:hover .card-link-icon {
  opacity: 1;
  transform: translateX(4px);
}
`;

class ProjectCard extends HTMLElement {
  async connectedCallback() {
    this.render();
  }

  getBasePath() {
    const path = window.location.pathname;
    if (path.includes("/pages/projects/")) return "../..";
    if (path.includes("/pages/")) return "..";
    return ".";
  }

  async render() {
    const basePath = this.getAttribute("base-path") || this.getBasePath();

    const title = this.getAttribute("title") || "Project Title";
    const type = this.getAttribute("type") || "Project Type";
    const description =
      this.getAttribute("description") || "Project description.";
    const image = this.getAttribute("image") || "";
    const link = this.getAttribute("link") || "#";
    const tags = (this.getAttribute("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    // Inject Styles
    if (!document.getElementById("project-card-styles")) {
      const style = document.createElement("style");
      style.id = "project-card-styles";
      style.textContent = CARD_STYLES;
      document.head.appendChild(style);
    }

    try {
      const response = await fetch(
        `${basePath}/components/project-card/project-card.html`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const fullHtml = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(fullHtml, "text/html");
      const cardContent = doc.querySelector("#card-content");

      if (!cardContent) throw new Error("Could not find card content");

      // Update content via DOM manipulation instead of string replace
      cardContent.setAttribute("href", link);

      const imgEl = cardContent.querySelector(".card-image");
      if (image) {
        imgEl.src = image;
        imgEl.alt = title;
      } else {
        // Handle no image case (Placeholder)
        const wrapper = cardContent.querySelector(".card-image-wrapper");
        wrapper.innerHTML = `
                <div style="width: 100%; height: 100%; background: #111; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #333; font-weight: 700; font-size: 14px; text-transform: uppercase;">Visual Placeholder</span>
                </div>
             `;
      }

      cardContent.querySelector(".card-type").textContent = type;
      cardContent.querySelector(".card-title").textContent = title;
      cardContent.querySelector(".card-description").textContent = description;

      const tagsContainer = cardContent.querySelector(".card-tags");
      tagsContainer.innerHTML = tags
        .map((tag) => `<span class="card-tag">${tag}</span>`)
        .join("");

      this.outerHTML = cardContent.outerHTML;
    } catch (e) {
      console.error("Failed to load project-card component:", e);
    }
  }
}

customElements.define("project-card", ProjectCard);
