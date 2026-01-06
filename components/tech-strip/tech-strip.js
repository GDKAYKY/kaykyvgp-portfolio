const TECH_MAP = {
  "c#": "csharp",
  dotnet: "dotnet",
  ".net": "dotnet",
  aws: "amazonaws",
  docker: "docker",
  electron: "electron",
  nodejs: "nodedotjs",
  "node.js": "nodedotjs",
  javascript: "javascript",
  js: "javascript",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  postgresql: "postgresql",
  postgres: "postgresql",
  grafana: "grafana",
  redis: "redis",
  ffmpeg: "ffmpeg",
  git: "git",
  github: "github",
  typescript: "typescript",
  ts: "typescript",
  react: "react",
  vue: "vuedotjs",
  angular: "angular",
  mongodb: "mongodb",
  mysql: "mysql",
  python: "python",
  go: "go",
  rust: "rust",
  linux: "linux",
  windows: "windows",
  macos: "apple",
  azure: "microsoftazure",
  "google cloud": "googlecloud",
  gcp: "googlecloud",
  kubernetes: "kubernetes",
  k8s: "kubernetes",
  "design system": "figma",
  animation: "framer",
  aria2c: "downloaddotjs",
  "yt-dlp": "youtube",
  design: "adobexd",
  "ui/ux": "figma",
  "c++": "cplusplus",
  qt: "qt",
};

class TechStrip extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  /* =========================
     Utils
     ========================= */

  normalizeTags(tags) {
    return tags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
  }

  getIconSlug(tag) {
    return TECH_MAP[tag] ?? "github";
  }

  getBasePath() {
    const path = globalThis.location.pathname;
    if (path.includes("/pages/projects/")) return "../..";
    if (path.includes("/pages/")) return "..";
    return ".";
  }

  getTags() {
    // 1. Atributo direto (prioridade máxima)
    const direct = this.getAttribute("tags");
    if (direct) return this.normalizeTags(direct);

    // 2. Tenta encontrar o showcase na página globalmente se não for descendente
    const showcase = document.querySelector("project-showcase");
    if (!showcase) return null;

    const fromShowcase = showcase.getAttribute("tags");
    return fromShowcase ? this.normalizeTags(fromShowcase) : null;
  }

  /* =========================
     Render
     ========================= */

  async render() {
    this.injectStyles();

    let tags = this.getTags();

    // Se não achou tags e existe um showcase, pode ser que ele ainda não renderizou/recebeu attrs
    if (!tags) {
      const showcase = document.querySelector("project-showcase");
      if (showcase) {
        // Observa mudanças no showcase para capturar as tags quando elas chegarem
        this._observer = new MutationObserver(() => {
          const newTags = this.getTags();
          if (newTags?.length) {
            this._observer.disconnect();
            this.render();
          }
        });
        this._observer.observe(showcase, { attributes: true });
      }
    }

    if (tags?.length) {
      this.renderDynamic(tags);
    } else {
      await this.renderDefault();
    }

    // NOVO: Espera as imagens carregarem antes de clonar para garantir cálculo de largura correto
    const imgs = Array.from(this.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    this.setupInfiniteScroll();
  }

  injectStyles() {
    if (document.getElementById("tech-strip-styles")) return;

    const link = document.createElement("link");
    link.id = "tech-strip-styles";
    link.rel = "stylesheet";
    link.href = `${
      this.getAttribute("base-path") || this.getBasePath()
    }/components/tech-strip/tech-strip.css`;
    document.head.appendChild(link);
  }

  renderDynamic(tags) {
    const items = tags
      .map((tag) => {
        const slug = this.getIconSlug(tag);
        return `
        <div class="tech-item">
          <img 
            src="https://cdn.simpleicons.org/${slug}/white"
            alt=""
            aria-hidden="true"
            title="${tag}"
          />
          <span>${tag}</span>
        </div>
      `;
      })
      .join("");

    this.innerHTML = `
      <div class="tech-strip-container">
        <div class="tech-strip-track">
          ${items}
        </div>
      </div>
    `;
  }

  async renderDefault() {
    const basePath = this.getAttribute("base-path") || this.getBasePath();

    try {
      const res = await fetch(
        `${basePath}/components/tech-strip/tech-strip.html`
      );
      if (!res.ok) throw new Error(res.status);

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const content = doc.querySelector("#tech-strip-content");

      if (content) this.innerHTML = content.outerHTML;
    } catch (err) {
      console.error("TechStrip: failed to load default content", err);
    }
  }

  /* =========================
     Infinite Scroll
     ========================= */

  setupInfiniteScroll() {
    const track = this.querySelector(".tech-strip-track");
    if (!track || track.dataset.cloned) return;

    const items = Array.from(track.children);
    if (!items.length) return;

    track.dataset.cloned = "true";

    // Duplica os itens para criar o loop perfeito
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
  }
}

customElements.define("tech-strip", TechStrip);
