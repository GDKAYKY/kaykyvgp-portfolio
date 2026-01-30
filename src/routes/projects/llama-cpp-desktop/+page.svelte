<script lang="ts">
  import { onMount } from "svelte";
  import ProjectShowcase from "$lib/components/ProjectShowcase.svelte";
  import TechStrip from "$lib/components/TechStrip.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import DemoWindow from "$lib/components/DemoWindow.svelte";

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
  <title>Llama.cpp Desktop - Project Details</title>
  <meta
    name="description"
    content="A premium Tauri-based desktop application for managing and running Llama.cpp models locally."
  />
</svelte:head>

<div class="container container--header-offset">
  <main class="animate-fade-in-right animate-delay-2">
    <ProjectShowcase
      context="AI Desktop Utility | Tauri & Rust"
      title="Llama.cpp Desktop"
      description=""
      image="/assets/llama_cpp_desktop_mockup.png"
      imageAlt="Llama.cpp Desktop Interface Mockup"
      visualStyle="clean"
      link="https://github.com/GDKAYKY/llama.cpp-desktop"
      linkText="View Repository"
      tags="Tauri,Rust,Svelte 5,Llama.cpp,Ollama,TypeScript"
    >
      <p style="margin-bottom: 24px">
        <strong>Llama.cpp Desktop</strong> is a premium, high-performance
        desktop application designed for local LLM execution. Built with
        <strong>Tauri v2</strong>
        and <strong>Rust</strong>, it provides a secure environment to run
        <strong>LLM</strong> models with hardware acceleration.
      </p>
      <p>
        The project implements a deep <strong>LLama.cpp Integration</strong>,
        featuring automatic manifest parsing and blob resolution. It follows a
        strict
        <strong>Centralized Models Standard</strong> in the Rust backend, ensuring
        a robust architecture where all data entities are unified across the Service
        and Command layers.
      </p>
    </ProjectShowcase>
  </main>
</div>

<TechStrip tags="Tauri,Rust,Svelte,Llama.cpp,Ollama,TypeScript" />

<ProjectShowcase
  context="Architecture & Integration"
  title="Technical Excellence"
  imageAlt="Llama.cpp Desktop Technical Details"
  variant="light"
  reverse={true}
  roleTitle={"Architecture Highlights"}
>
  <div class="tech-features-grid">
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="box" size={22} />
        </div>
        <h3>Ollama Ecosystem</h3>
      </div>
      <p>
        Automatic scanning of local Ollama installations, parsing OCI manifests
        to resolve model layers and blobs.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="gauge" size={22} />
        </div>
        <h3>Native Performance</h3>
      </div>
      <p>
        Leverages Tokio for asynchronous process management of llama-server and
        real-time streaming IPC with Svelte 5.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="gpu" size={22} />
        </div>
        <h3>Hardware Acceleration</h3>
      </div>
      <p>
        Granular control over GPU offloading (n_gpu_layers), context size, and
        parallel inference slots.
      </p>
    </div>
    <div class="tech-feature">
      <div class="feature-header">
        <div class="icon-wrapper">
          <Icon name="shield-check" size={22} />
        </div>
        <h3>Privacy First</h3>
      </div>
      <p>
        All interactions stay on your machine. Local execution means no data
        ever leaves your hardware.
      </p>
    </div>
  </div>
  {#snippet visual()}
    <div class="demo-container">
      <DemoWindow />
    </div>
  {/snippet}
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

  .tech-feature p {
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
    color: var(--secondary-text);
  }

  .demo-container {
    position: relative;
    width: 100%;
    height: 550px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.project-visual .project-image-container) {
    max-width: 100% !important;
    width: 100% !important;
  }

  @media (max-width: 900px) {
    .demo-container {
      height: 480px;
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
