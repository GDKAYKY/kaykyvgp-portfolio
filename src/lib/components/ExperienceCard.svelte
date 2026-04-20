<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { Experience } from "$lib/types/resume";

  interface Props {
    experience: Experience;
  }

  let { experience }: Props = $props();
</script>

<div class="card experience-item">
  <div class="experience-header">
    <img
      class="certification-logo"
      src={experience.logo}
      alt="{experience.company} Logo"
    />
    <div class="experience-title-area">
      <h3 class="job-title">{experience.position}</h3>
      <div class="job-meta">
        <span class="meta-item">
          <Icon name="building-2" size={14} />
          {experience.company}
        </span>
        <span class="dot">•</span>
        <span class="meta-item">
          <Icon name="calendar" size={14} />
          {experience.period}
        </span>
        <span class="dot">•</span>
        <span class="meta-item">
          <Icon name="map-pin" size={14} />
          {experience.location}
        </span>
      </div>
    </div>
  </div>
  <ul class="job-description">
    {#each experience.description as item}
      <li>{item}</li>
    {/each}
  </ul>

  {#if experience.technologies && experience.technologies.length > 0}
    <div class="experience-section">
      <h4 class="section-subtitle">Technologies Used</h4>
      <div class="tech-tags">
        {#each experience.technologies as tech}
          <span class="tech-tag">{tech}</span>
        {/each}
      </div>
    </div>
  {/if}

  {#if experience.projects && experience.projects.length > 0}
    <div class="experience-section">
      <h4 class="section-subtitle">Key Projects</h4>
      <ul class="project-list">
        {#each experience.projects as project}
          <li>{project}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .experience-section {
    margin-top: 1rem;
  }

  .section-subtitle {
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 0.5rem;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-tag {
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    background: rgba(34, 197, 94, 0.1);
    color: rgb(74, 222, 128);
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .project-list {
    list-style: none;
    padding-left: 0;
  }

  .project-list li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
  }

  .project-list li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: rgba(59, 130, 246, 0.8);
    font-weight: bold;
  }
</style>
