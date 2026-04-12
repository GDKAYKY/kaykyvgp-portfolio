<script lang="ts">
  import { slide } from "svelte/transition";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import type { Project } from "$lib/types";

  interface Props {
    projects: Project[];
  }

  let { projects }: Props = $props();

  const EXTRA_TECHS = [
    "Svelte",
    "TypeScript",
    "Vite",
    "Qt",
    "Ffmpeg",
    "Electron",
  ];

  let selectedTech = $state<string | null>(null);
  let sortBy = $state("newest");
  let searchQuery = $state("");
  let showAdvanced = $state(false);

  const filteredProjects = $derived.by(() => {
    let base = projects;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      base = base.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.toLowerCase().includes(q),
      );
    }

    if (selectedTech) {
      base = base.filter((p) =>
        p.tags.toLowerCase().includes(selectedTech!.toLowerCase()),
      );
    }

    if (sortBy === "alphabetical") {
      return [...base].sort((a, b) => a.title.localeCompare(b.title));
    }

    return [...base].sort((a, b) => b.date.localeCompare(a.date));
  });

  // Scroll reveal animation
  $effect(() => {
    const _projects = filteredProjects;
    const _advanced = showAdvanced;
    const _query = searchQuery;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    setTimeout(() => {
      document
        .querySelectorAll(
          ".animate-fade-in-up:not(.revealed), .animate-fade-in-right:not(.revealed), .animate-fade-in:not(.revealed)",
        )
        .forEach((el) => observer.observe(el));
    }, 60);

    return () => observer.disconnect();
  });

  const toggleTech = (tech: string) => {
    if (selectedTech === tech) selectedTech = null;
    else selectedTech = tech;
  };
</script>

<div class="container container--header-offset">
  <div class="main-content">
    <div class="filter-wrapper animate-fade-in-up">
      <div class="search-container">
        <div class="search-input-wrapper">
          <Icon name="search" size={20} class="search-icon" />
          <input
            type="text"
            placeholder="Search projects (title, tech, description...)"
            bind:value={searchQuery}
            class="search-input"
          />
          {#if searchQuery}
            <button class="clear-search" onclick={() => (searchQuery = "")}>
              &times;
            </button>
          {/if}

          <button
            class="advanced-toggle-inline"
            class:active={showAdvanced}
            onclick={() => (showAdvanced = !showAdvanced)}
            title="Advanced Filters"
          >
            <Icon name="sliders" size={18} />
          </button>
        </div>
      </div>

      {#if showAdvanced}
        <div class="advanced-dropdown" transition:slide={{ duration: 300 }}>
          <div class="dropdown-section">
            <span class="section-label">Sort By</span>
            <div class="option-grid">
              <button
                class="option-pill"
                class:selected={sortBy === "newest"}
                onclick={() => (sortBy = "newest")}
              >
                Newest First
              </button>
              <button
                class="option-pill"
                class:selected={sortBy === "alphabetical"}
                onclick={() => (sortBy = "alphabetical")}
              >
                A - Z
              </button>
            </div>
          </div>

          <div class="dropdown-section">
            <span class="section-label">Specific Technologies</span>
            <div class="option-grid">
              {#each EXTRA_TECHS as tech}
                <button
                  class="option-pill"
                  class:selected={selectedTech === tech}
                  onclick={() => toggleTech(tech)}
                >
                  {tech}
                </button>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>

    <main class="animate-fade-in-right animate-delay-2">
      <div class="projects-grid">
        {#each filteredProjects as project, i (project.title)}
          <div class="animate-fade-in-up animate-delay-{i + 3}">
            <ProjectCard {...project} />
          </div>
        {:else}
          <div class="no-results animate-fade-in">
            <p>No projects found matching your criteria.</p>
            <button
              class="reset-link"
              onclick={() => {
                searchQuery = "";
                selectedTech = null;
                sortBy = "newest";
              }}>Clear all filters</button
            >
          </div>
        {/each}
      </div>
    </main>
  </div>
</div>

<style>
  .filter-wrapper {
    margin-top: 2rem;
  }
  .filter-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .search-container {
    max-width: 600px;
  }

  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 14px;
    padding: 0 16px;
    transition: all 0.3s ease;
  }

  .search-input-wrapper:focus-within {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .search-input {
    width: 100%;
    background: transparent;
    border: none;
    padding: 14px 12px;
    color: var(--primary-text);
    font-size: 1rem;
    font-weight: 500;
    outline: none !important;
    margin: 0;
  }

  .search-input::placeholder {
    color: var(--secondary-text);
    opacity: 0.5;
  }

  .search-icon {
    color: var(--secondary-text);
    opacity: 0.5;
  }

  .clear-search {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: var(--primary-text);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.2s ease;
  }

  .clear-search:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .advanced-toggle-inline {
    background: transparent;
    border: none;
    color: var(--secondary-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin-left: 8px;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .advanced-toggle-inline:hover,
  .advanced-toggle-inline.active {
    background: rgba(255, 255, 255, 0.1);
    color: var(--primary-text);
  }

  .advanced-dropdown {
    margin-top: 1rem;
    background: rgba(15, 15, 15, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }

  .dropdown-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .section-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--secondary-text);
    font-weight: 700;
  }

  .option-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .option-pill {
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 100px;
    color: var(--secondary-text);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .option-pill:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.1);
    color: var(--primary-text);
  }

  .option-pill.selected {
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--primary-text);
    color: var(--primary-text);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    padding-top: 0px;
    min-height: 400px;
  }

  .no-results {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
    color: var(--secondary-text);
    text-align: left;
    padding: 4rem 0;
  }

  .reset-link {
    background: transparent;
    border: none;
    color: var(--primary-text);
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .reset-link:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .filter-header {
      flex-direction: column;
      align-items: stretch;
    }

    .filter-bar {
      width: 100%;
      overflow-x: auto;
      padding: 0.4rem;
    }

    .advanced-toggle {
      justify-content: center;
    }
  }
</style>
