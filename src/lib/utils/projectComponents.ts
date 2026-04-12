import type { Component } from 'svelte';
import { LlamaCppDesktop, YtdlnOpen, SpanCore, Portfolio } from '$lib';

/**
 * Map of project slugs to their corresponding page components
 * This allows dynamic routing based on the slug parameter
 */
export const PROJECT_COMPONENTS: Record<string, Component> = {
  'llama-cpp-desktop': LlamaCppDesktop,
  'ytdln-open': YtdlnOpen,
  'span-core': SpanCore,
  'portfolio': Portfolio,
};

/**
 * Get a project component by slug
 * @param slug - The project slug
 * @returns The component or undefined if not found
 */
export function getProjectComponent(slug: string): Component | undefined {
  return PROJECT_COMPONENTS[slug];
}
