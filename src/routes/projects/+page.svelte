<script lang="ts">
  import { onMount } from "svelte";
  import ProjectCard from "$lib/components/ProjectCard.svelte";

  // Scroll reveal animation
  let elements: NodeListOf<Element>;

  onMount(() => {
    elements = document.querySelectorAll(
      ".animate-fade-in, .animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  });
</script>

<svelte:head>
  <title>Kayky Vitor - Projects</title>
  <meta
    name="description"
    content="Explore my projects in software development, focusing on efficiency and scalability."
  />
</svelte:head>

<div class="container container--header-offset">
  <div class="main-content">
    <main class="animate-fade-in-right animate-delay-2">
      <div class="projects-grid">
        <!-- YTDLN-OPEN Card -->
        <div class="animate-fade-in-up animate-delay-3">
          <ProjectCard
            title="YTDLN-OPEN"
            type="Open Source Utility"
            description="A free and open-source desktop video/audio downloader powered by yt-dlp, ffmpeg, Electron, and React. Supports downloading from over 1000 websites with a clean, state-of-the-art interface and high-speed multi-connection transfers."
            image="/assets/ytdln_mockup.png"
            link="/projects/ytdln-open"
            tags="Electron,Node.js,yt-dlp,HTML5,CSS3,JavaScript,Ffmpeg,aria2c"
          />
        </div>

        <!-- SPAN-CORE Card -->
        <div class="animate-fade-in-up animate-delay-4">
          <ProjectCard
            title="SPAN-CORE"
            type="Desktop Utility"
            description="A high-performance video downloading engine built with C++ and Qt. Native desktop experience with full yt-dlp support and FFmpeg integration."
            image="/assets/ytdln_mockup.png"
            link="/projects/span-core"
            tags="C++,Qt,yt-dlp,FFmpeg"
          />
        </div>

        <!-- Portfolio Card -->
        <div class="animate-fade-in-up animate-delay-5">
          <ProjectCard
            title="Personal Portfolio"
            type="Web Development"
            description="A modern, high-performance portfolio website designed to showcase my skills and projects. Built with a focus on aesthetics, responsiveness, and clean code using Svelte."
            link="/projects/portfolio"
            tags="Svelte,TypeScript,Design System"
          />
        </div>
      </div>
    </main>
  </div>
</div>
