<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { SkillsColumn as SkillsColumnType } from "$lib/types/resume";

  interface Props {
    column: SkillsColumnType;
  }

  let { column }: Props = $props();
</script>

<div class="skills-column animate-fade-in-up">
  <div class="skills-column-title">
    <Icon name={column.icon} size={20} />
    {column.title}
  </div>
  <ul>
    {#each column.skills as skill}
      <li>
        <Icon name={skill.icon} size={18} />
        {skill.label}
      </li>
    {/each}
  </ul>
</div>
