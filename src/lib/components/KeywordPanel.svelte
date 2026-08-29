<script lang="ts">
  import * as SimpleIcons from "@icons-pack/svelte-simple-icons";
  import { keywordPanel } from "$lib/stores/keywordStore";
  import { getTechIconName } from "$lib/utils/techIcons";
  import Icon from "./Icon.svelte";

  const panelState = $derived($keywordPanel);
  let panelWidth = $state(400);
  let resizeStartX = 0;
  let resizeStartWidth = 400;
  const techIcon = $derived(
    (SimpleIcons as unknown as Record<string, any>)[
      getTechIconName(panelState.selectedKeyword?.keyword || "")
    ],
  );

  function stopResize() {
    window.removeEventListener("pointermove", resizePanel);
    window.removeEventListener("pointerup", stopResize);
  }

  function resizePanel(event: PointerEvent) {
    const maxWidth = Math.min(720, window.innerWidth * 0.75);
    panelWidth = Math.min(
      maxWidth,
      Math.max(320, resizeStartWidth + resizeStartX - event.clientX),
    );
  }

  function startResize(event: PointerEvent) {
    resizeStartX = event.clientX;
    resizeStartWidth = panelWidth;
    window.addEventListener("pointermove", resizePanel);
    window.addEventListener("pointerup", stopResize);
    event.preventDefault();
  }
</script>

{#if panelState.isOpen && panelState.selectedKeyword}
  <aside class="keyword-panel" style={`width: ${panelWidth}px`}>
    <button
      class="resize-handle"
      aria-label="Redimensionar painel"
      onpointerdown={startResize}
    ></button>
    <div class="panel-header">
      <div class="panel-title-wrap">
        {#if techIcon}
          {@const TechIcon = techIcon}
          <TechIcon size={24} color="white" />
        {:else}
          <Icon name="code-2" size={20} />
        {/if}
        <h3 class="panel-title">{panelState.selectedKeyword.keyword}</h3>
      </div>
      <button class="close-button" onclick={() => keywordPanel.close()}>
        <Icon name="x" size={20} />
      </button>
    </div>

    <div class="panel-content">
      {#if panelState.selectedKeyword.projects.length > 0}
        <section class="usage-section">
          <h4 class="section-title">
            <Icon name="folder" size={18} />
            Projects ({panelState.selectedKeyword.projects.length})
          </h4>
          <ul class="usage-list">
            {#each panelState.selectedKeyword.projects as project}
              <li class="usage-item">{project}</li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if panelState.selectedKeyword.certifications.length > 0}
        <section class="usage-section">
          <h4 class="section-title">
            <Icon name="award" size={18} />
            Certifications ({panelState.selectedKeyword.certifications.length})
          </h4>
          <ul class="usage-list">
            {#each panelState.selectedKeyword.certifications as cert}
              <li class="usage-item">{cert}</li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if panelState.selectedKeyword.experiences.length > 0}
        <section class="usage-section">
          <h4 class="section-title">
            <Icon name="briefcase" size={18} />
            Experience ({panelState.selectedKeyword.experiences.length})
          </h4>
          <ul class="usage-list">
            {#each panelState.selectedKeyword.experiences as exp}
              <li class="usage-item">{exp}</li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if panelState.selectedKeyword.projects.length === 0 && panelState.selectedKeyword.certifications.length === 0 && panelState.selectedKeyword.experiences.length === 0}
        <div class="empty-state">
          <Icon name="info" size={32} />
          <p>No usage found for this keyword</p>
        </div>
      {/if}
    </div>
  </aside>
{/if}

<style>
  .keyword-panel {
    position: sticky;
    top: 0;
    width: 400px;
    height: 100vh;
    background: #171717;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: -8px 0 24px rgba(0, 0, 0, 0.22);
  }

  .resize-handle {
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: -4px;
    width: 8px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: ew-resize;
  }

  .resize-handle:hover,
  .resize-handle:focus-visible {
    background: rgba(255, 255, 255, 0.22);
    outline: none;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .panel-header {
    height: 80px;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: #171717;
  }

  .panel-title-wrap {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .panel-title-wrap :global(svg) {
    flex: 0 0 auto;
    opacity: 0.8;
  }

  .panel-title {
    font-size: 1.25rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
    font-weight: 800;
    color: #fff;
    margin: 0;
  }

  .close-button {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    padding: 0.35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    transform: rotate(90deg);
  }

  .panel-content {
    flex: 1;
    overflow-y: auto;
    zoom: 1.21;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .usage-section {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.72);
    margin: 0;
    letter-spacing: 0;
  }

  .section-title::after {
    display: none;
  }

  .section-title :global(svg) {
    width: 15px;
    height: 15px;
    opacity: 0.65;
  }

  .usage-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .usage-item {
    padding: 0.65rem 0.7rem;
    background: #2b2b2b;
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.96);
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.35;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
    cursor: pointer;
  }

  .usage-item:hover {
    background: #383838;
    transform: none;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 1.5rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
  }

  .empty-state p {
    margin-top: 1rem;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  /* Scrollbar styling */
  .panel-content::-webkit-scrollbar {
    width: 8px;
  }

  .panel-content::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }

  .panel-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }

  .panel-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  .panel-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .panel-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    .keyword-panel {
      position: static;
      width: 100%;
      height: auto;
      min-height: 100vh;
      border-left: none;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.35);
    }

    .resize-handle {
      display: none;
    }
  }
</style>
