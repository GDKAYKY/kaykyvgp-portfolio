<script lang="ts">
  import * as LucideIcons from "lucide-svelte";
  import * as SimpleIcons from "@icons-pack/svelte-simple-icons";
  import type { Component } from "svelte";

  interface Props {
    name: string;
    size?: number;
    strokeWidth?: number;
    class?: string;
  }

  let {
    name,
    size = 24,
    strokeWidth = 2,
    class: className = "",
  }: Props = $props();

  // Custom icons that are not in Lucide or need project-specific versions
  const CUSTOM_ICONS: Record<string, { paths: string[]; viewBox?: string }> = {
    crab: {
      // High-quality Ferris the Crab (Rust mascot)
      paths: [
        "M12 22a7.5 7.5 0 0 0 7.5-7.5V11a5 5 0 0 0-10 0v3.5A7.5 7.5 0 0 0 12 22Z",
        "m15 14-3 3-3-3",
        "M17 11V5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v3",
        "M11 8V5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6",
        "M18 14h2a2 2 0 0 0 2-2 2 2 0 0 0-2-2h-2",
        "M6 14H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2",
        "M19 19a2 2 0 0 0 2-2 2 2 0 0 0-2-2",
        "M5 19a2 2 0 0 1-2-2 2 2 0 0 1 2-2",
      ],
    },
    rust: {
      // Official Rust Gear Logo (Simplified for 24x24)
      paths: [
        "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z", // Outer circle
        "M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z", // Inner circle
        "M12 5V2",
        "M12 22V19",
        "M5 12H2",
        "M22 12H19", // Teeth
        "M17 17L19 19",
        "M7 7L5 5",
        "M17 7L19 5",
        "M7 17L5 19",
      ],
    },
    gpu: {
      // Custom GPU / Hardware Accelerator icon
      paths: [
        "M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
        "M10 10h4",
        "M17 14h1",
        "M7 10h1",
        "M7 14h1",
      ],
    },
  };

  // Helper to map kebab-case string to PascalCase component name
  const getPascalName = (str: string) => {
    return str
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  };

  // Resolve the icon component or custom path
  const IconComponent = $derived(() => {
    if (CUSTOM_ICONS[name]) return null;

    const pascalName = getPascalName(name);

    // 1. Try Lucide
    // @ts-ignore - dynamic access
    if (LucideIcons[pascalName]) {
      return LucideIcons[pascalName] as Component;
    }

    // 2. Try Simple Icons (with and without Si prefix)
    const siName = pascalName.startsWith("Si") ? pascalName : `Si${pascalName}`;
    // @ts-ignore - dynamic access
    if (SimpleIcons[siName]) {
      return SimpleIcons[siName] as Component;
    }

    // Fallback
    return LucideIcons.Code2;
  });

  const customIcon = $derived(CUSTOM_ICONS[name]);
</script>

{#if customIcon}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={customIcon.viewBox || "0 0 24 24"}
    fill="none"
    stroke="currentColor"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
    class={className}
    aria-hidden="true"
  >
    {#each customIcon.paths as path}
      <path d={path} />
    {/each}
  </svg>
{:else}
  {@const Icon = IconComponent()}
  <Icon {size} {strokeWidth} class={className} aria-hidden="true" />
{/if}
