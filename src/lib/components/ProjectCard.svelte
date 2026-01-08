<script lang="ts">
  interface Props {
    title: string;
    type: string;
    description: string;
    image?: string;
    link: string;
    tags?: string;
  }

  let { title, type, description, image, link, tags = "" }: Props = $props();

  const parsedTags = $derived(
    tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t)
  );

  const MAX_VISIBLE_TAGS = 3;
  const visibleTags = $derived(parsedTags.slice(0, MAX_VISIBLE_TAGS));
  const remainingCount = $derived(
    Math.max(0, parsedTags.length - MAX_VISIBLE_TAGS)
  );
</script>

<a href={link} class="project-card-compact">
  <div class="card-image-wrapper">
    {#if image}
      <img src={image} alt={title} class="card-image" />
    {:else}
      <div class="placeholder">
        <span>Visual Placeholder</span>
      </div>
    {/if}
  </div>
  <div class="card-content">
    <span class="card-type">{type}</span>
    <h3 class="card-title">{title}</h3>
    <p class="card-description">{description}</p>
    <div class="card-footer">
      <div class="card-tags">
        {#each visibleTags as tag}
          <span class="card-tag">{tag}</span>
        {/each}
        {#if remainingCount > 0}
          <span class="card-tag more">
            +{remainingCount}
            <div class="tags-tooltip">
              <div class="tooltip-title">Technologies</div>
              <div class="tooltip-grid">
                {#each parsedTags as tag}
                  <span class="tooltip-tag">{tag}</span>
                {/each}
              </div>
            </div>
          </span>
        {/if}
      </div>
      <svg
        class="card-link-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m12 5 7 7-7 7" />
        <path d="M5 12h14" />
      </svg>
    </div>
  </div>
</a>

<style>
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
    position: relative;
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

  .placeholder {
    width: 100%;
    height: 100%;
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .placeholder span {
    color: #333;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
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
    transition:
      opacity 0.3s,
      transform 0.3s;
  }

  .project-card-compact:hover .card-link-icon {
    opacity: 1;
    transform: translateX(4px);
  }

  /* Tooltip & More Tag */
  .card-tag.more {
    cursor: pointer;
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    color: var(--primary-text);
    transition: background-color 0.2s;
  }

  .card-tag.more:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .tags-tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
    right: -10px;
    background: #1a1a1a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px;
    width: max-content;
    max-width: 220px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    z-index: 20;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .tags-tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    right: 20px;
    border-width: 6px;
    border-style: solid;
    border-color: #1a1a1a transparent transparent transparent;
  }

  .card-tag.more:hover .tags-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .tooltip-title {
    font-size: 0.7rem;
    color: var(--secondary-text);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 4px;
  }

  .tooltip-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tooltip-tag {
    font-size: 0.65rem;
    padding: 3px 6px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    color: var(--primary-text);
    white-space: nowrap;
  }
</style>
