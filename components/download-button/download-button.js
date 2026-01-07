class DownloadButton extends HTMLElement {
  static get observedAttributes() {
    return ["link", "version", "size", "count"];
  }

  constructor() {
    super();
    this._mounted = false;
  }

  connectedCallback() {
    if (this._mounted) return;
    this._mounted = true;
    this.render();
  }

  attributeChangedCallback() {
    if (this._mounted) {
      this.render();
    }
  }

  getBasePath() {
    const attrPath = this.getAttribute("base-path");
    if (attrPath) return attrPath;

    const path = globalThis.location.pathname;
    if (path.includes("/pages/projects")) return "../..";
    if (path.includes("/pages/")) return "..";
    return ".";
  }

  async render() {
    const basePath = this.getBasePath();
    const link = this.getAttribute("link") || "#";
    const version = this.getAttribute("version") || "v1.0.0";
    const size = this.getAttribute("size") || "0MB";
    const count = this.getAttribute("count");

    // Inject Styles once
    if (!document.getElementById("download-button-styles")) {
      const styleLink = document.createElement("link");
      styleLink.id = "download-button-styles";
      styleLink.rel = "stylesheet";
      styleLink.href = `${basePath}/components/download-button/download-button.css`;
      document.head.appendChild(styleLink);
    }

    try {
      const response = await fetch(
        `${basePath}/components/download-button/download-button.html`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const btn = doc.querySelector(".win-download-btn");

      if (!btn) throw new Error("Button not found in template");

      btn.href = link;
      const meta = btn.querySelector(".win-meta");
      if (meta) {
        meta.textContent = count
          ? `${size} • ${version} • ${count} downloads`
          : `${size} • ${version}`;
      }

      // Preserve any custom title if needed, or use default
      const titleAttr = this.getAttribute("title");
      if (titleAttr) {
        const titleEl = btn.querySelector(".win-title");
        if (titleEl) titleEl.textContent = titleAttr;
      }

      this.replaceChildren(btn);
    } catch (e) {
      console.error("DownloadButton: Render failed", e);
    }
  }
}

customElements.define("download-button", DownloadButton);
