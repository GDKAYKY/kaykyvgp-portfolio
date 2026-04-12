// Page component exports
export { default as Home } from './pages/Home.svelte';
export { default as Projects } from './pages/Projects.svelte';

// Project detail page exports
export { default as LlamaCppDesktop } from './pages/projects/LlamaCppDesktop.svelte';
export { default as YtdlnOpen } from './pages/projects/YtdlnOpen.svelte';
export { default as SpanCore } from './pages/projects/SpanCore.svelte';
export { default as Portfolio } from './pages/projects/Portfolio.svelte';

// UI Component exports
export { default as Header } from './components/Header.svelte';
export { default as Footer } from './components/Footer.svelte';
export { default as Icon } from './components/Icon.svelte';
export { default as TechStrip } from './components/TechStrip.svelte';
export { default as ParticleEffect } from './components/ParticleEffect.svelte';
export { default as ProjectCard } from './components/ProjectCard.svelte';
export { default as ProjectShowcase } from './components/ProjectShowcase.svelte';
export { default as DownloadButton } from './components/DownloadButton.svelte';
export { default as DemoWindow } from './components/DemoWindow.svelte';

// Utility exports
export { PROJECT_COMPONENTS, getProjectComponent } from './utils/projectComponents';

// Type exports
export type * from './types';

// Data exports
export * from './data';
