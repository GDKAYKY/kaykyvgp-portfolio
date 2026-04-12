<script lang="ts">
  import type { PageData } from './$types';
  import { LlamaCppDesktop, YtdlnOpen, SpanCore, Portfolio } from '$lib';

  let { data }: { data: PageData } = $props();

  const componentMap: Record<string, any> = {
    'llama-cpp-desktop': LlamaCppDesktop,
    'ytdln-open': YtdlnOpen,
    'span-core': SpanCore,
    'portfolio': Portfolio,
  };

  const Component = componentMap[data.project.slug];
</script>

<svelte:head>
  <title>{data.project.title} - Kayky Vitor</title>
  <meta name="description" content={data.project.description} />
</svelte:head>

{#if Component}
  <Component release={data.release} />
{:else}
  <div class="container">
    <h1>Project not found</h1>
  </div>
{/if}
