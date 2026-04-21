<script lang="ts">
  import { keywordPanel } from "$lib/stores/keywordStore";
  import { buildKeywordMap, getKeywordUsage } from "$lib/utils/keywordMapper";
  import { identifyKeywords } from "$lib/utils/keywords";

  interface Props {
    text: string;
  }

  interface TextSegment {
    text: string;
    isKeyword: boolean;
    keyword?: string;
  }

  let { text }: Props = $props();

  const keywordMap = buildKeywordMap();

  // Identificar keywords automaticamente no texto usando o dicionário
  const identified = $derived(identifyKeywords(text));
  const detectedKeywords = $derived(identified.allLabels);

  function parseTextWithKeywords(text: string): TextSegment[] {
    if (!text || detectedKeywords.length === 0) {
      return [{ text, isKeyword: false }];
    }

    const matches: Array<{ keyword: string; index: number; length: number }> =
      [];

    // Função para escapar caracteres especiais do regex
    function escapeRegex(str: string) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    // Encontrar todas as keywords detectadas no texto
    detectedKeywords.forEach((keyword) => {
      const escapedKeyword = escapeRegex(keyword);
      const regex = new RegExp(`\\b${escapedKeyword}\\b`, "gi");
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          keyword: keyword,
          index: match.index,
          length: match[0].length,
        });
      }
    });

    if (matches.length === 0) {
      return [{ text, isKeyword: false }];
    }

    // Remover duplicatas e ordenar por índice
    const uniqueMatches = matches.filter(
      (match, index, self) =>
        index === self.findIndex((m) => m.index === match.index),
    );
    uniqueMatches.sort((a, b) => a.index - b.index);

    // Construir segmentos de texto
    const segments: TextSegment[] = [];
    let lastIndex = 0;

    uniqueMatches.forEach((match) => {
      // Adicionar texto antes da keyword
      if (match.index > lastIndex) {
        segments.push({
          text: text.substring(lastIndex, match.index),
          isKeyword: false,
        });
      }

      // Adicionar a keyword
      segments.push({
        text: text.substring(match.index, match.index + match.length),
        isKeyword: true,
        keyword: match.keyword,
      });

      lastIndex = match.index + match.length;
    });

    // Adicionar texto restante
    if (lastIndex < text.length) {
      segments.push({
        text: text.substring(lastIndex),
        isKeyword: false,
      });
    }

    return segments;
  }

  function handleKeywordClick(keyword: string) {
    const usage = getKeywordUsage(keyword, keywordMap);
    if (usage) {
      keywordPanel.open(usage);
    }
  }

  const segments = $derived(parseTextWithKeywords(text));
</script>

<span class="keyword-wrapper">
  {#each segments as segment}
    {#if segment.isKeyword && segment.keyword}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span
        class="keyword-highlight"
        onclick={() => handleKeywordClick(segment.keyword!)}
      >
        {segment.text}
      </span>
    {:else}
      {segment.text}
    {/if}
  {/each}
</span>

<style>
  .keyword-wrapper {
    display: inline;
  }

  :global(.keyword-highlight) {
    color: #60a5fa;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-style: dotted;
  }

  :global(.keyword-highlight:hover) {
    color: #3b82f6;
    text-decoration-style: solid;
  }
</style>
