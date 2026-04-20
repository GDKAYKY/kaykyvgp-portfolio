<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { Education } from "$lib/types/resume";

  interface Props {
    education: Education;
  }

  let { education }: Props = $props();
</script>

<div class="card certification">
  <div class="certification-content">
    <img
      class="certification-logo"
      src={education.logo}
      alt="{education.institution} Logo"
    />
    <div class="certification-info">
      <h3 class="certification-title">{education.degree}</h3>
      <div class="certification-details">
        <span class="certification-issuer">
          <img
            class="issuer-logo"
            src={education.logo}
            alt="{education.institution} Logo"
          />
          {education.institution}
        </span>
        <span class="certification-date">
          <Icon name="calendar" size={14} />
          {education.period}
        </span>
      </div>
    </div>
  </div>
</div>
