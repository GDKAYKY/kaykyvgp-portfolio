<script lang="ts">
  import { keywordPanel } from "$lib/stores/keywordStore";
  import Icon from "./Icon.svelte";

  const state = $derived($keywordPanel);
</script>

{#if state.isOpen && state.selectedKeyword}
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
  .keyword-panel {
    position: sticky;
    top: 0;
    width: 360px;
    height: 100vh;
    background: #0a0a0a;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(10px);
  }

  .panel-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
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
    border-radius: 8px;
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
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .usage-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.85rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .usage-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .usage-item {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
  }

  .usage-item:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateX(-6px);
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
  }
</style>
