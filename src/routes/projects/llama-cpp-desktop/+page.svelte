<script lang="ts">
  import { onMount } from "svelte";
  import ProjectShowcase from "$lib/components/ProjectShowcase.svelte";
  import TechStrip from "$lib/components/TechStrip.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import DemoWindow from "$lib/components/DemoWindow.svelte";

  let { data } = $props();

  // Shared project tags
  const tags =
    "Tauri v2,Rust,Tokio,Svelte 5,Vitest,Lucide,Tailwind CSS v4,IndexedDB,Dexie,MCP,NVIDIA SMI";

  // Scroll reveal animation
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document
      .querySelectorAll(
        ".animate-fade-in, .animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right",
      )
      .forEach((el) => observer.observe(el));
  });
</script>

<svelte:head>
  <title>Llama Desktop - Project Details</title>
  <meta
    name="description"
    content="A premium Tauri-based desktop application for managing and running Llama.cpp models locally."
  />
</svelte:head>

<div class="container container--header-offset">
  <main class="animate-fade-in-right animate-delay-2">
    <ProjectShowcase
      context="AI Desktop Utility | Tauri & Rust"
      title="Llama Desktop"
      description=""
      image="/assets/llama.cpp.png"
      imageAlt="Llama Desktop Chat Interface"
      visualStyle="clean"
      link="https://github.com/GDKAYKY/llama.cpp-desktop"
      linkText="View Repository"
      downloadLink={data.release?.exe?.url ||
        "https://github.com/GDKAYKY/llama.cpp-desktop/releases/download/v1.1.0/llama-desktop_1.1.0_x64-setup.exe"}
      downloadVersion={data.release?.version || "v1.1.0"}
      downloadSize={data.release?.exe?.size || "N/A"}
      downloadCount={data.release?.exe?.downloads}
      {tags}
    >
      <p style="margin-bottom: 24px">
        <strong>Llama Desktop</strong> is a premium, high-performance desktop
        application designed for local LLM execution. Built with
        <strong>Tauri v2</strong>
        and <strong>Rust</strong>, it provides a secure environment to run
        <strong>GGUF</strong> models with full hardware acceleration and
        <strong>MCP</strong> (Model Context Protocol) extensibility.
      </p>
      <p>
        The project implements a deep <strong>llama.cpp integration</strong>,
        featuring automatic manifest parsing and blob resolution from local
        Ollama installations. It follows a strict
        <strong>Actor-based Service Architecture</strong>, ensuring a robust
        system where model management and MCP bridges are decoupled and
        thread-safe.
      </p>
    </ProjectShowcase>
  </main>
</div>

<TechStrip {tags} />

<ProjectShowcase
  context="Architecture & Integration"
  title="Technical Excellence"
  imageAlt="Llama Desktop Technical Details"
  variant="light"
  reverse={true}
  roleTitle={"Architecture Highlights"}
>
  <div class="tech-features-grid">
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="database" size={22} />
        </div>
        <h3>Durable History</h3>
      </div>
      <p>
        Conversations are persisted using IndexedDB via Dexie.js, including
        automatic keyword extraction for advanced search.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="search" size={22} />
        </div>
        <h3>Hybrid Retrieval</h3>
      </div>
      <p>
        Implements a custom scoring system to retrieve relevant past context
        based on keyword matches and role preference.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="cpu" size={22} />
        </div>
        <h3>Actor Architecture</h3>
      </div>
      <p>
        Uses an Actor-based service pattern in Rust to manage the llama-server
        lifecycle and MCP connection states with strict thread safety.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="shield" size={22} />
        </div>
        <h3>Type-Safe Bridge</h3>
      </div>
      <p>
        Leverages Tauri v2's type-safe commands and IPC system to ensure
        seamless, memory-safe communication with the Rust core.
      </p>
    </div>
  </div>
  {#snippet visual()}
    <div class="demo-container">
      <DemoWindow />
    </div>
  {/snippet}
</ProjectShowcase>

<ProjectShowcase
  context="Data & Logic"
  title="Intelligent Persistence"
  imageAlt="Llama Desktop Database and Search"
  variant="dark"
  visualStyle="clean"
  roleTitle={"Context & History"}
>
  {#snippet visual()}
    <div class="demo-container">
      <div class="preview-card animate-fade-in">
        <img
          src="/assets/models.png"
          alt="Llama Desktop Model Library Management"
          class="preview-image"
        />
        <div class="preview-overlay"></div>
      </div>
    </div>
  {/snippet}

  <div class="tech-features-grid">
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper icon-wrapper--dark">
          <Icon name="zap" size={22} />
        </div>
        <h3>Fast Keyword Extraction</h3>
      </div>
      <p>
        Every message is indexed in real-time. Common stop-words are filtered to
        ensure high-quality search results.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper icon-wrapper--dark">
          <Icon name="bar-chart-3" size={22} />
        </div>
        <h3>Scoring Engine</h3>
      </div>
      <p>
        Retrieval augmented generation (RAG) light: calculates relevance scores
        to fit the best context into the LLM token budget.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper icon-wrapper--dark">
          <Icon name="layers" size={22} />
        </div>
        <h3>OCI Manifest Parsing</h3>
      </div>
      <p>
        Deep integration with Ollama's storage format, resolving sha256 digests
        to local blobs without user intervention.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper icon-wrapper--dark">
          <Icon name="monitor" size={22} />
        </div>
        <h3>Resource Monitoring</h3>
      </div>
      <p>
        A 50-cell dynamic grid visualizes CPU/GPU load, providing visual cues
        during intensive inference tasks.
      </p>
    </div>
  </div>
</ProjectShowcase>

<ProjectShowcase
  context="Tools & Extensibility"
  title="Model Context Protocol"
  imageAlt="Llama Desktop MCP Server Management"
  variant="light"
  reverse={true}
  roleTitle={"MCP Integration"}
>
  {#snippet visual()}
    <div class="demo-container">
      <div class="preview-card animate-fade-in">
        <img
          src="/assets/mcp.png"
          alt="Llama Desktop MCP Servers"
          class="preview-image"
        />
        <div class="preview-overlay"></div>
      </div>
    </div>
  {/snippet}

  <div class="tech-features-grid">
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="puzzle" size={22} />
        </div>
        <h3>Server Management</h3>
      </div>
      <p>
        Easily add and configure MCP servers using stdio or HTTP-SSE transports.
        Manage environment variables and command arguments directly.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="wrench" size={22} />
        </div>
        <h3>Tool Discovery</h3>
      </div>
      <p>
        Automatically lists and exposes tools from connected servers, allowing
        the LLM to perform web searches, execute code, or query databases.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="file-text" size={22} />
        </div>
        <h3>Resource Layer</h3>
      </div>
      <p>
        Expose local files and documentation as MCP resources. The app handles
        URI-based retrieval and context injection seamlessly.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="link" size={22} />
        </div>
        <h3>Interactive Bridge</h3>
      </div>
      <p>
        Real-time monitoring of tool calls and connection status ensures a
        transparent and reliable workflow between the AI and your tools.
      </p>
    </div>
  </div>
</ProjectShowcase>

<ProjectShowcase
  context="Performance & optimization"
  title="Native Efficiency"
  imageAlt="Llama Desktop Resource Usage"
  variant="dark"
  visualStyle="clean"
  reverse={false}
  roleTitle={"Resource Management"}
>
  {#snippet visual()}
    <div class="demo-container">
      <div class="preview-card animate-fade-in">
        <img
          src="/assets/lowusage.png"
          alt="Llama Desktop Low Resource Usage"
          class="preview-image"
        />
        <div class="preview-overlay"></div>
      </div>
    </div>
  {/snippet}

  <div class="tech-features-grid">
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper icon-wrapper--dark">
          <Icon name="zap" size={22} />
        </div>
        <h3>Zero-Overhead Core</h3>
      </div>
      <p>
        By leveraging Rust and Tauri's native webview interface, the app avoids
        the memory bloat typically associated with Electron-based LLM tools.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper icon-wrapper--dark">
          <Icon name="activity" size={22} />
        </div>
        <h3>Ultra-Low Idle</h3>
      </div>
      <p>
        As shown in the Task Manager, the background process consumes minimal
        resources (~13MB RAM) when idle, keeping your system fast.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper icon-wrapper--dark">
          <Icon name="gauge" size={22} />
        </div>
        <h3>Intelligent Offloading</h3>
      </div>
      <p>
        Automatically detects GPU capabilities and manages GGUF layer offloading
        to maximize performance without crashing smaller systems.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper icon-wrapper--dark">
          <Icon name="shield" size={22} />
        </div>
        <h3>Async Orchestration</h3>
      </div>
      <p>
        Uses Tokio-based process management to ensure the UI remains responsive
        even during heavy KV-cache processing or model loading.
      </p>
    </div>
  </div>
</ProjectShowcase>

<style>
  .tech-features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    margin-top: 24px;
    text-align: left;
  }

  .tech-feature {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .feature-header {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--primary-text);
  }

  .feature-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    background: #ebebeb;
    border-radius: 12px;
    color: var(--primary-text);
    flex-shrink: 0;
  }

  .icon-wrapper--dark {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  .tech-feature p {
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
    color: var(--secondary-text);
  }

  .demo-container {
    position: relative;
    width: 100%;
    height: 520px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .preview-card {
    position: relative;
    width: 100%;
    max-width: 650px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
    transform: scale(0.9);
  }

  .preview-card:hover {
    transform: scale(0.95);
  }

  .preview-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  :global(.project-visual .project-image-container) {
    max-width: 100% !important;
    width: 100% !important;
  }

  @media (max-width: 900px) {
    .demo-container {
      height: 460px;
    }
  }

  @media (max-width: 600px) {
    .tech-features-grid {
      grid-template-columns: 1fr;
    }
    .demo-container {
      display: none;
    }
  }
</style>
