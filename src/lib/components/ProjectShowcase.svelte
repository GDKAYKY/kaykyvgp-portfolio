<script lang="ts">
  import Icon from "./Icon.svelte";
  import DownloadButton from "./DownloadButton.svelte";
  import TechStrip from "./TechStrip.svelte";

  interface Props {
    context: string;
    title: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    visualStyle?: "framed" | "clean";
    link?: string;
    linkText?: string;
    tags?: string;
    downloadLink?: string;
    downloadVersion?: string;
    downloadSize?: string;
    downloadCount?: string | number;
    variant?: "dark" | "light";
    reverse?: boolean;
    roleTitle?: string;
    children?: import("svelte").Snippet;
  }

  let {
    context,
    title,
    description = "",
    image,
    imageAlt,
    visualStyle = "framed",
    link,
    linkText = "View Project",
    tags = "",
    downloadLink,
    downloadVersion = "v1.0.0",
    downloadSize = "275MB",
    downloadCount,
    variant = "dark",
    reverse = false,
    roleTitle = "About the project",
    children,
  }: Props = $props();

  const parsedTags = $derived(
    tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t)
  );
</script>

<section
  class="project-showcase"
  class:reversed={reverse}
  class:light-mode={variant === "light"}
>
  <div class="container">
    <!-- Info Column -->
    <div class="project-info animate-fade-in-left animate-delay-2">
      <div class="project-header">
        <span class="project-context">{context}</span>
        <h1 class="project-title">{title}</h1>
      </div>
      <div class="project-role-section">
        {#if roleTitle}
          <h2 class="project-role-title">{roleTitle}</h2>
        {/if}
        <div class="project-description">
          {#if children}
            {@render children()}
          {:else}
            <p>{description}</p>
          {/if}
        </div>
        <div class="project-tags">
          {#each parsedTags as tag}
            <span class="tag-pill">{tag}</span>
          {/each}
        </div>
      </div>
      {#if link}
        <div class="project-actions">
          {#if downloadLink}
            <DownloadButton
              link={downloadLink}
              version={downloadVersion}
              size={downloadSize}
              count={downloadCount}
            />
          {/if}
          <a
            href={link}
            class="project-main-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
            <Icon name="external-link" size={16} />
          </a>
        </div>
      {/if}
    </div>

    <!-- Visual Column -->
    <div class="project-visual animate-fade-in-right animate-delay-3">
      <div
        class={visualStyle === "clean"
          ? "project-image-container-clean"
          : "project-image-container"}
      >
        {#if image}
          <img src={image} alt={imageAlt || title} class="project-image" />
        {:else}
          <div class="placeholder">
            <span>Visual Preview</span>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  /* ================= PROJECT SHOWCASE STYLES ================= */
  .project-showcase {
    padding: 40px 0;
    width: 100%;
  }

  .project-showcase .container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (min-width: 900px) {
    .project-showcase .container {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    .project-showcase.reversed {
      direction: rtl;
    }
    .project-showcase.reversed > * {
      direction: ltr; /* Reset text direction for children */
    }
  }

  .project-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .project-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .project-context {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--secondary-text);
    font-weight: 600;
  }

  .project-title {
    font-size: 2.5rem;
    line-height: 1.1;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--primary-text);
    background: var(--primary-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (min-width: 1024px) {
    .project-title {
      font-size: 3.5rem;
    }
  }

  .project-description {
    font-size: 16px;
    line-height: 1.7;
    color: var(--secondary-text);
    max-width: 50ch;
  }

  .project-role-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .project-role-title {
    font-size: 2rem;
    font-weight: 600;
    color: var(--tertiary-text);
    letter-spacing: -0.02em;
  }

  .project-description :global(strong) {
    color: #fff;
    font-weight: 700;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 10px;
  }

  .tag-pill {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--secondary-text);
    background: rgba(255, 255, 255, 0.03);
    padding: 8px 16px;
    border-radius: 100px;
    transition: all 0.3s ease;
    cursor: default;
  }

  .tag-pill:hover {
    border-color: var(--primary-text);
    color: var(--primary-text);
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  .project-actions {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }

  .project-main-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: var(--primary-text);
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 4px;
    width: fit-content;
    transition: all 0.3s ease;
  }

  .project-main-link:hover {
    border-color: var(--primary-text);
    padding-bottom: 8px;
  }

  /* Visual Side */
  .project-visual {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .project-image-container {
    position: relative;
    width: 100%;
    max-width: 500px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .project-image-container:hover {
    transform: scale(1.02) translateY(-10px);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
  }

  .project-image-container::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 100%
    );
    pointer-events: none;
  }

  .project-image-container-clean {
    position: relative;
    width: 100%;
    max-width: 500px;
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .project-image-container-clean:hover {
    transform: scale(1.02) translateY(-10px);
  }
  .project-image-container-clean .project-image {
    width: 100%;
    height: auto;
    display: block;
  }
  .project-image {
    width: 100%;
    height: auto;
    display: block;
  }

  .placeholder {
    aspect-ratio: 16/10;
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.9rem;
    border-radius: 16px;
  }

  @media (max-width: 900px) {
    .project-visual {
      order: -1;
    }
  }

  /* Variant: Light Mode */
  .project-showcase.light-mode {
    --primary-text: #1d1d1f;
    --secondary-text: #6e6e73;
    --tertiary-text: #86868b;
    background-color: #f5f5f7;
    width: 100dvw;
    position: relative;
    padding: 80px 0;
    border-bottom: none;
  }

  .project-showcase.light-mode :global(strong) {
    color: #000;
  }

  .project-showcase.light-mode .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: center;
  }

  .project-showcase.light-mode .project-title {
    font-size: 2.5rem;
  }

  @media (min-width: 900px) {
    .project-showcase.light-mode .container {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
  }
</style>
