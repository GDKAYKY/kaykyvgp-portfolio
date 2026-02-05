<script lang="ts">
  import { onMount } from "svelte";

  // Tech mapping for Simple Icons
  const TECH_MAP: Record<string, string> = {
    "c#": "csharp",
    dotnet: "dotnet",
    ".net": "dotnet",
    aws: "amazonaws",
    docker: "docker",
    electron: "electron",
    nodejs: "nodedotjs",
    "node.js": "nodedotjs",
    javascript: "javascript",
    js: "javascript",
    html5: "html5",
    html: "html5",
    css3: "css3",
    css: "css3",
    postgresql: "postgresql",
    postgres: "postgresql",
    grafana: "grafana",
    redis: "redis",
    ffmpeg: "ffmpeg",
    git: "git",
    github: "github",
    "yt-dlp": "github",
    ytdlp: "github",
    aria2c: "github",
    aria2: "github",
    typescript: "typescript",
    ts: "typescript",
    react: "react",
    svelte: "svelte",
    rust: "rust",
    tauri: "tauri",
    "tauri v2": "tauri",
    vite: "vite",
    tailwind: "tailwindcss",
    tailwindcss: "tailwindcss",
    "tailwind css": "tailwindcss",
    "svelte 5": "svelte",
    tokio: "rust",
    reqwest: "rust",
    serde: "rust",
    indexeddb: "github",
    "indexed db": "github",
    dexie: "github",
    vitest: "vitest",
    lucide: "lucide",
    "tailwind css v4": "tailwindcss",
    "nvidia smi": "nvidia",
    "nvidia-smi": "nvidia",
    "llama.cpp": "github",
    llama: "github",
    ollama: "ollama",
  };

  interface Props {
    tags?: string;
  }

  let { tags }: Props = $props();

  let trackElement: HTMLDivElement | null = $state(null);

  // Default tech items if no tags provided
  const defaultTechs = [
    { name: "C#", slug: "csharp" },
    { name: ".NET", slug: "dotnet" },
    { name: "AWS", slug: "amazonaws" },
    { name: "Docker", slug: "docker" },
    { name: "Electron", slug: "electron" },
    { name: "Node.js", slug: "nodedotjs" },
    { name: "JavaScript", slug: "javascript" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Grafana", slug: "grafana" },
    { name: "Redis", slug: "redis" },
    { name: "React", slug: "react" },
  ];

  const parsedTags = $derived(
    tags
      ? tags.split(",").map((t) => {
          const tag = t.trim().toLowerCase();
          return {
            name: t.trim(),
            slug: TECH_MAP[tag] || "github",
          };
        })
      : defaultTechs,
  );

  // Duplicate items for infinite scroll
  const displayItems = $derived([...parsedTags, ...parsedTags]);

  onMount(() => {
    // Ensure images are loaded before starting animation
    const images = trackElement?.querySelectorAll("img") || [];
    Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if ((img as HTMLImageElement).complete) resolve(null);
            else {
              (img as HTMLImageElement).onload = () => resolve(null);
              (img as HTMLImageElement).onerror = () => resolve(null);
            }
          }),
      ),
    );
  });
</script>

<div class="tech-strip-container">
  <div class="tech-strip-track" bind:this={trackElement}>
    {#each displayItems as tech}
      <div class="tech-item">
        <img
          src="https://cdn.simpleicons.org/{tech.slug}/white"
          alt=""
          aria-hidden="true"
          title={tech.name}
        />
        <span>{tech.name}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .tech-strip-container {
    width: 100%;
    background: #0a0a0a;
    display: flex;
    align-items: center;
    min-height: 80px;
    padding: 2.5rem 0;
    overflow: hidden;
    position: relative;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    box-sizing: border-box;
  }

  .tech-strip-container::before,
  .tech-strip-container::after {
    content: "";
    position: absolute;
    top: 0;
    width: 250px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  .tech-strip-container::before {
    left: 0;
    background: linear-gradient(to right, #000, transparent);
  }

  .tech-strip-container::after {
    right: 0;
    background: linear-gradient(to left, #000, transparent);
  }

  .tech-strip-track {
    display: flex;
    align-items: center;
    gap: 6rem;
    width: max-content;
    animation: scroll 40s linear infinite;
    will-change: transform;
  }

  .tech-item {
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0.4;
    filter: grayscale(1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
    white-space: nowrap;
  }

  .tech-item:hover {
    opacity: 1;
    filter: grayscale(0);
    transform: translateY(-2px);
  }

  .tech-item img {
    height: 32px;
    width: auto;
    object-fit: contain;
  }

  .tech-item span {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    font-family: "Schibsted Grotesk", sans-serif;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-50% - 3rem));
    }
  }

  @media (max-width: 768px) {
    .tech-strip-container {
      padding: 1.5rem 0;
      min-height: 60px;
    }

    .tech-strip-track {
      gap: 4rem;
    }

    .tech-item img {
      height: 24px;
    }

    .tech-item span {
      font-size: 0.9rem;
    }
  }
</style>
