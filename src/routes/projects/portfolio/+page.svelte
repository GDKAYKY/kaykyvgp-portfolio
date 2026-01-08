<script lang="ts">
  import { onMount } from "svelte";
  import ProjectShowcase from "$lib/components/ProjectShowcase.svelte";
  import TechStrip from "$lib/components/TechStrip.svelte";

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document
      .querySelectorAll(
        ".animate-fade-in, .animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right"
      )
      .forEach((el) => observer.observe(el));
  });
</script>

<svelte:head>
  <title>Personal Portfolio - Kayky Vitor</title>
  <meta
    name="description"
    content="A modern, high-performance portfolio website built with Svelte."
  />
</svelte:head>

<div class="container container--header-offset">
  <ProjectShowcase
    context="Web Development"
    title="Personal Portfolio"
    description=""
    link="https://github.com/GDKAYKY/kaykyvgp-portfolio"
    linkText="View Repository"
    tags="Svelte,TypeScript,Design System"
    visualStyle="clean"
  >
    <p>
      This <strong>Personal Portfolio</strong> is a modern, high-performance website
      designed to showcase my skills and projects.
    </p>
    <p>
      Built with Svelte and TypeScript, it features a focus on aesthetics,
      responsiveness, and clean code architecture.
    </p>
    <p>
      The design system ensures consistency across all components while
      maintaining flexibility for future updates.
    </p>
  </ProjectShowcase>
</div>

<TechStrip tags="Svelte,TypeScript,Design System" />
