<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { Certification } from "$lib/types/resume";

  interface Props {
    certification: Certification;
  }

  let { certification }: Props = $props();
</script>

<div class="card certification">
  <div class="certification-content">
    <img
      class="certification-logo"
      src={certification.logo}
      alt="{certification.title} Logo"
    />
    <div class="certification-info">
      <h3 class="certification-title">{certification.title}</h3>
      <div class="certification-details">
        <span class="certification-issuer">
          <img
            class="issuer-logo"
            src={certification.issuerLogo}
            alt="{certification.issuer} Logo"
          />
          {certification.issuer}
        </span>
        <span class="certification-date">
          <Icon name="calendar" size={14} />
          {certification.date}
        </span>
      </div>
    </div>
  </div>

  <ul class="job-description">
    {#each certification.skills as skill}
      <li>{skill}</li>
    {/each}
  </ul>

  {#if certification.skillsGained && certification.skillsGained.length > 0}
    <div class="certification-section">
      <h4 class="section-subtitle">Skills Gained</h4>
      <div class="skills-tags">
        {#each certification.skillsGained as skill}
          <span class="skill-tag">{skill}</span>
        {/each}
      </div>
    </div>
  {/if}

  {#if certification.tools && certification.tools.length > 0}
    <div class="certification-section">
      <h4 class="section-subtitle">Tools</h4>
      <div class="skills-tags">
        {#each certification.tools as tool}
          <span class="tool-tag">{tool}</span>
        {/each}
      </div>
    </div>
  {/if}

  <a
    href={certification.credentialUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="credential-button"
  >
    <span class="button-text">See Credential</span>
    <span class="button-icon">↗</span>
  </a>
</div>

<style>
  .certification-section {
    margin-top: 1rem;
  }

  .section-subtitle {
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 0.5rem;
  }

  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag,
  .tool-tag {
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .skill-tag {
    background: rgba(59, 130, 246, 0.1);
    color: rgb(96, 165, 250);
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .tool-tag {
    background: rgba(168, 85, 247, 0.1);
    color: rgb(192, 132, 252);
    border: 1px solid rgba(168, 85, 247, 0.2);
  }
</style>
