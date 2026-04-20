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
