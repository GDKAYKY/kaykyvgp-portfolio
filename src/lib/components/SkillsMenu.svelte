<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { PROJECTS } from "$lib/data/projects";
  import { CERTIFICATIONS, EXPERIENCES } from "$lib/data/resume";
  import { detailsModal } from "$lib/stores/detailsStore";
  import { skillsMenu } from "$lib/stores/skillsMenuStore";
  import Icon from "./Icon.svelte";
  import { buildKeywordMap } from "$lib/utils/keywordMapper";
  import type { SkillItem } from "$lib/types/resume";

  interface Props {
    skills: SkillItem[];
  }

  interface UsageLink {
    label: string;
    href: string;
    external?: boolean;
  }

  let { skills }: Props = $props();
  let isOpen = $state(false);
  let island: HTMLDivElement;
  let menuToggle: HTMLButtonElement;
  let menuOverlay: HTMLDivElement;
  let menuBackdrop: HTMLDivElement;
  let menuPanel: HTMLDivElement;
  let searchInput: HTMLInputElement;
  let searchQuery = $state("");
  let selectedSkill = $state<string | null>(null);
  const keywordMap = buildKeywordMap();

  const menuRequest = $derived($skillsMenu);

  const filteredSkills = $derived.by(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return skills.filter((skill) => skill.label.toLowerCase().includes(query));
  });

  const selectedSkillIcon = $derived(
    skills.find((skill) => skill.label === selectedSkill)?.icon ?? "code-2",
  );

  const selectedUsage = $derived.by(() => {
    if (!selectedSkill) return null;

    const query = selectedSkill.toLowerCase();
    const matchingKeywords = Object.values(keywordMap).filter((usage) => {
      const keyword = usage.keyword.toLowerCase();
      return keyword === query || keyword.includes(query) || query.includes(keyword);
    });

    const projects = new Set(matchingKeywords.flatMap((usage) => usage.projects));
    const certifications = new Set(
      matchingKeywords.flatMap((usage) => usage.certifications),
    );
    const experiences = new Set(matchingKeywords.flatMap((usage) => usage.experiences));

    PROJECTS.forEach((project) => {
      if (`${project.title} ${project.description} ${project.tags}`.toLowerCase().includes(query)) {
        projects.add(project.title);
      }
    });
    CERTIFICATIONS.forEach((certification) => {
      if (
        `${certification.title} ${certification.skills.join(" ")} ${certification.skillsGained?.join(" ") ?? ""} ${certification.tools?.join(" ") ?? ""}`
          .toLowerCase()
          .includes(query)
      ) {
        certifications.add(certification.title);
      }
    });
    EXPERIENCES.forEach((experience) => {
      if (
        `${experience.position} ${experience.company} ${experience.description.join(" ")} ${experience.technologies?.join(" ") ?? ""} ${experience.about ?? ""}`
          .toLowerCase()
          .includes(query)
      ) {
        experiences.add(`${experience.position} at ${experience.company}`);
      }
    });

    const projectLinks: UsageLink[] = [...projects].map((label) => {
      const project = PROJECTS.find((item) => item.title === label);
      return {
        label,
        href: project ? `/projects/${project.slug}` : "/projects",
      };
    });
    const certificationLinks: UsageLink[] = [...certifications].map((label) => {
      const certification = CERTIFICATIONS.find((item) => item.title === label);
      return {
        label,
        href: "#",
        external: false,
      };
    });
    const experienceLinks: UsageLink[] = [...experiences].map((label) => ({
      label,
      href: "/#experience",
    }));

    return {
      projects: projectLinks,
      certifications: certificationLinks,
      experiences: experienceLinks,
    };
  });

  $effect(() => {
    const request = menuRequest;
    if (!request.isOpen || !request.selectedSkill || !menuToggle) return;

    searchQuery = request.selectedSkill;
    selectedSkill = request.selectedSkill;
    if (!isOpen) menuToggle.click();
  });

  onMount(() => {
    // Keep the menu independent from the floating Header's backdrop/filter context.
    document.body.appendChild(menuOverlay);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true });
      const expandedWidth = Math.min(window.innerWidth * 0.9, 420);

      timeline
        .set(menuOverlay, { pointerEvents: "auto" })
        .to(
          island,
          {
            width: expandedWidth,
            duration: 0.42,
            ease: "back.out(2)",
          },
          0,
        )
        .to(
          ".skills-menu-bar-mid",
          { opacity: 0, duration: 0.1, ease: "power2.in" },
          0,
        )
        .to(
          ".skills-menu-bar-top",
          { attr: { x1: 3, y1: 3, x2: 13, y2: 13 }, duration: 0.18, ease: "power3.inOut" },
          0,
        )
        .to(
          ".skills-menu-bar-bot",
          { attr: { x1: 13, y1: 3, x2: 3, y2: 13 }, duration: 0.18, ease: "power3.inOut" },
          0,
        )
        .to(menuBackdrop, { opacity: 1, duration: 0.18, ease: "power2.out" }, 0)
        .from(
          menuPanel,
          {
            autoAlpha: 0,
            y: -20,
            scale: 0.6,
            duration: 0.45,
            transformOrigin: "center center",
            ease: "back.out(2)",
          },
          0.1,
        );

      const toggle = () => {
        isOpen = !isOpen;
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
          "aria-label",
          isOpen ? "Close skills menu" : "Open skills menu",
        );

        if (isOpen) {
          timeline.timeScale(1).play();
          window.setTimeout(() => searchInput?.focus(), 150);
        } else {
          searchQuery = "";
          selectedSkill = null;
          skillsMenu.close();
          timeline.eventCallback("onReverseComplete", () => {
            gsap.set(menuOverlay, { pointerEvents: "none" });
          });
          timeline.timeScale(1).reverse();
        }
      };

      menuToggle.addEventListener("click", toggle);
      menuBackdrop.addEventListener("click", toggle);

      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          toggle();
          menuToggle.focus();
        }
      };

      window.addEventListener("keydown", handleKeydown);

      return () => {
        menuToggle.removeEventListener("click", toggle);
        menuBackdrop.removeEventListener("click", toggle);
        window.removeEventListener("keydown", handleKeydown);
        timeline.kill();
      };
    });

    return () => context.revert();
  });
</script>

<div class="skills-menu-island" bind:this={island}>
  <button
    class="skills-menu-toggle"
    bind:this={menuToggle}
    type="button"
    aria-expanded="false"
    aria-controls="skills-menu-overlay"
    aria-label="Open skills menu"
  >
    <span>Skills</span>
    <span class="skills-menu-button-cont" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <line class="skills-menu-bar-top" x1="2" y1="5" x2="14" y2="5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        <line class="skills-menu-bar-mid" x1="2" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        <line class="skills-menu-bar-bot" x1="2" y1="11" x2="14" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </span>
  </button>
</div>

<div
  id="skills-menu-overlay"
  class="skills-menu-overlay"
  bind:this={menuOverlay}
  role="dialog"
  aria-modal="true"
  aria-label="Skills menu"
>
  <div class="skills-menu-backdrop" bind:this={menuBackdrop}></div>
  <div class="skills-menu-panel" bind:this={menuPanel}>
    <label class="skills-search" for="skills-menu-search">
      <span aria-hidden="true">⌕</span>
      <input
        id="skills-menu-search"
        bind:this={searchInput}
        bind:value={searchQuery}
        type="search"
        placeholder="Search skills..."
        autocomplete="off"
      />
    </label>

    {#if searchQuery.trim()}
      {#if filteredSkills.length > 0}
        <ul>
          {#each filteredSkills as skill, index}
            <li>
              <button
                type="button"
                class="skills-result"
                class:selected={selectedSkill === skill.label}
                onclick={() => (selectedSkill = skill.label)}
              >
              <span class="skills-result-label">
                <Icon name={skill.icon} size={17} />
                <span>{skill.label}</span>
              </span>
              <span class="skills-menu-index">{String(index + 1).padStart(2, "0")}</span>
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="skills-search-empty">No skills found.</p>
      {/if}
    {/if}
  </div>

  {#if selectedSkill && selectedUsage}
    <aside class="skills-usage-panel" aria-label={`Where ${selectedSkill} is used`}>
      <div class="skills-usage-header">
        <h2>
          <Icon name={selectedSkillIcon} size={20} />
          <span>{selectedSkill}</span>
        </h2>
        <button
          type="button"
          class="skills-usage-close"
          aria-label="Close skill usage"
          onclick={() => (selectedSkill = null)}
        >
          ×
        </button>
      </div>

      {#if selectedUsage.projects.length > 0}
        <section>
          <h3>Projects</h3>
          <ul>
            {#each selectedUsage.projects as project}
              <li>
                <a href={project.href} onclick={() => menuToggle?.click()}>{project.label}</a>
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if selectedUsage.certifications.length > 0}
        <section>
          <h3>Certifications</h3>
          <ul>
            {#each selectedUsage.certifications as certification}
              <li>
                <button
                  type="button"
                  class="skills-usage-link"
                  onclick={() => {
                    const item = CERTIFICATIONS.find(
                      (entry) => entry.title === certification.label,
                    );
                    if (item) {
                      detailsModal.open(item, "certification");
                      menuToggle?.click();
                    }
                  }}
                >{certification.label}</button>
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if selectedUsage.experiences.length > 0}
        <section>
          <h3>Experience</h3>
          <ul>
            {#each selectedUsage.experiences as experience}
              <li>
                <a href={experience.href} onclick={() => menuToggle?.click()}>{experience.label}</a>
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if selectedUsage.projects.length === 0 && selectedUsage.certifications.length === 0 && selectedUsage.experiences.length === 0}
        <p class="skills-usage-empty">No usage found yet.</p>
      {/if}
    </aside>
  {/if}
</div>

<style>
  .skills-menu-island {
    display: flex;
    width: max-content;
    max-width: 100%;
  }

  .skills-menu-toggle {
    display: flex;
    align-items: center;
    height: auto;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--secondary-text);
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .skills-menu-toggle:hover {
    color: var(--primary-text);
  }

  .skills-menu-toggle:focus-visible {
    outline: 2px solid var(--primary-text);
    outline-offset: 3px;
  }

  .skills-menu-button-cont {
    display: none;
  }

  .skills-menu-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    pointer-events: none;
  }

  .skills-menu-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(4px);
    opacity: 0;
  }

  .skills-menu-panel {
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(90vw, 420px);
    max-height: min(70vh, 520px);
    overflow-y: auto;
    padding: 6px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 18px;
    background: #171717;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
    transform: translate(-50%, -50%);
    visibility: hidden;
  }

  .skills-menu-panel ul {
    display: grid;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .skills-search {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
    padding: 13px 14px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 11px;
    color: rgba(255, 255, 255, 0.55);
  }

  .skills-search:focus-within {
    border-color: rgba(255, 255, 255, 0.4);
  }

  .skills-search input {
    min-width: 0;
    flex: 1;
    border: 0;
    outline: 0;
    background: transparent;
    color: #fff;
    font: inherit;
  }

  .skills-search input::placeholder {
    color: rgba(255, 255, 255, 0.42);
  }

  .skills-search input::-webkit-search-cancel-button {
    display: none;
  }

  .skills-search-empty {
    margin: 18px 8px 12px;
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.9rem;
  }

  .skills-menu-panel li {
    display: block;
  }

  .skills-result {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border: 0;
    border-radius: 10px;
    background: transparent;
    color: rgba(255, 255, 255, 0.86);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .skills-result-label {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .skills-result:hover,
  .skills-result:focus-visible,
  .skills-result.selected {
    background: rgba(255, 255, 255, 0.07);
    color: #fff;
    outline: none;
  }

  .skills-menu-index {
    color: rgba(255, 255, 255, 0.35);
    font-size: 0.75rem;
  }

  .skills-usage-panel {
    position: fixed;
    top: 50%;
    right: 24px;
    z-index: 1002;
    width: min(360px, calc(100vw - 48px));
    max-height: min(70vh, 560px);
    overflow-y: auto;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 18px;
    background: #171717;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
    transform: translateY(-50%);
    animation: skills-usage-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .skills-usage-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
  }

  .skills-usage-header h2 {
    display: flex;
    align-items: center;
    gap: 9px;
    margin: 0;
    color: #fff;
    font-size: 1.2rem;
  }

  .skills-usage-close {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 50%;
    background: transparent;
    color: rgba(255, 255, 255, 0.72);
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
  }

  .skills-usage-close:hover,
  .skills-usage-close:focus-visible {
    border-color: rgba(255, 255, 255, 0.45);
    color: #fff;
    outline: none;
  }

  .skills-usage-panel section + section {
    margin-top: 22px;
  }

  .skills-usage-panel h3 {
    margin: 0 0 9px;
    color: rgba(255, 255, 255, 0.48);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .skills-usage-panel ul {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.4;
  }

  .skills-usage-panel li {
    padding-left: 14px;
    position: relative;
  }

  .skills-usage-panel li::before {
    position: absolute;
    left: 0;
    content: "•";
    color: rgba(255, 255, 255, 0.45);
  }

  .skills-usage-panel a {
    color: rgba(255, 255, 255, 0.78);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .skills-usage-panel a:hover,
  .skills-usage-panel a:focus-visible {
    color: #fff;
    text-decoration: underline;
    outline: none;
  }

  .skills-usage-link {
    padding: 0;
    border: 0;
    background: transparent;
    color: rgba(255, 255, 255, 0.78);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .skills-usage-link:hover,
  .skills-usage-link:focus-visible {
    color: #fff;
    text-decoration: underline;
    outline: none;
  }

  .skills-usage-empty {
    margin: 0;
    color: rgba(255, 255, 255, 0.58);
  }

  @keyframes skills-usage-slide-in {
    from {
      opacity: 0;
      transform: translate(32px, -50%);
    }
    to {
      opacity: 1;
      transform: translateY(-50%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skills-menu-backdrop,
    .skills-menu-panel,
    .skills-usage-panel {
      animation: none;
      transition: none;
    }
  }

  @media (max-width: 700px) {
    .skills-usage-panel {
      top: auto;
      right: 12px;
      bottom: 12px;
      left: 12px;
      width: auto;
      max-height: 42vh;
      transform: none;
    }

    @keyframes skills-usage-slide-in {
      from {
        opacity: 0;
        transform: translateY(24px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }
  }
</style>
