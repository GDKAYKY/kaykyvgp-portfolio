<script lang="ts">
  import Icon from "./Icon.svelte";
  import KeywordHighlight from "./KeywordHighlight.svelte";
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
      <li><KeywordHighlight text={item} /></li>
    {/each}
  </ul>
</div>
