<script lang="ts">
  import { keywordPanel } from "$lib/stores/keywordStore";
  import Icon from "./Icon.svelte";

  const state = $derived($keywordPanel);
</script>

{#if state.isOpen && state.selectedKeyword}
  <div
    class="keyword-panel-overlay"
    onclick={() => keywordPanel.close()}
    onkeydown={(e) => e.key === "Escape" && keywordPanel.close()}
    role="button"
    tabindex="-1"
    aria-label="Close panel"
  ></div>
  <aside class="keyword-panel">
    <div class="panel-header">
      <h3 class="panel-title">{state.selectedKeyword.keyword}</h3>
      <button class="close-button" onclick={() => keywordPanel.close()}>
        <Icon name="x" size={20} />
      </button>
    </div>

    <div class="panel-content">
      {#if state.selectedKeyword.projects.length > 0}
        <section class="usage-section">
          <h4 class="section-title">
            <Icon name="folder" size={18} />
            Projects ({state.selectedKeyword.projects.length})
          </h4>
          <ul class="usage-list">
            {#each state.selectedKeyword.projects as project}
              <li class="usage-item">{project}</li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if state.selectedKeyword.certifications.length > 0}
        <section class="usage-section">
          <h4 class="section-title">
            <Icon name="award" size={18} />
            Certifications ({state.selectedKeyword.certifications.length})
          </h4>
          <ul class="usage-list">
            {#each state.selectedKeyword.certifications as cert}
              <li class="usage-item">{cert}</li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if state.selectedKeyword.experiences.length > 0}
        <section class="usage-section">
          <h4 class="section-title">
            <Icon name="briefcase" size={18} />
            Experience ({state.selectedKeyword.experiences.length})
          </h4>
          <ul class="usage-list">
            {#each state.selectedKeyword.experiences as exp}
              <li class="usage-item">{exp}</li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if state.selectedKeyword.projects.length === 0 && state.selectedKeyword.certifications.length === 0 && state.selectedKeyword.experiences.length === 0}
        <div class="empty-state">
          <Icon name="info" size={32} />
          <p>No usage found for this keyword</p>
        </div>
      {/if}
    </div>
  </aside>
{/if}

<style>
  .keyword-panel-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    backdrop-filter: blur(2px);
  }

  .keyword-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background: rgba(17, 24, 39, 0.98);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    animation: slideIn 0.3s ease-out;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.3);
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.2);
  }

  .panel-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(96, 165, 250);
    margin: 0;
  }

  .close-button {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }

  .panel-content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }

  .usage-section {
    margin-bottom: 2rem;
  }

  .usage-section:last-child {
    margin-bottom: 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .usage-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .usage-item {
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  .usage-item:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateX(-4px);
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
  }

  .empty-state p {
    margin-top: 1rem;
    font-size: 0.95rem;
  }

  /* Scrollbar styling */
  .panel-content::-webkit-scrollbar {
    width: 6px;
  }

  .panel-content::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  .panel-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .panel-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
</style>
