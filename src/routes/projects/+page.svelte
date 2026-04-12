<script lang="ts">
  import { Projects } from "$lib";
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Kayky Vitor - Projects</title>
  <meta
    name="description"
    content="Explore my projects in software development, focusing on efficiency and scalability."
  />
</svelte:head>

<Projects projects={data.projects} />
