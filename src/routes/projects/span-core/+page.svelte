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
  <title>SPAN-CORE - Kayky Vitor</title>
  <meta
    name="description"
    content="A high-performance video downloading engine built with C++ and Qt."
  />
</svelte:head>

<div class="container container--header-offset">
  <ProjectShowcase
    context="Desktop Utility"
    title="SPAN-CORE"
    description=""
    image="/assets/ytdln_mockup.png"
    imageAlt="SPAN-CORE Interface"
    link="https://github.com/GDKAYKY/span-core"
    linkText="View Repository"
    tags="C++,Qt,yt-dlp,FFmpeg"
  >
    <p>
      <strong>SPAN-CORE</strong> is a high-performance video downloading engine built
      with C++ and Qt.
    </p>
    <p>
      It provides a native desktop experience with full yt-dlp support and
      FFmpeg integration for media processing.
    </p>
    <p>
      Designed for speed and efficiency, SPAN-CORE leverages native code to
      deliver maximum performance for media downloads and conversions.
    </p>
  </ProjectShowcase>
</div>

<TechStrip tags="C++,Qt,yt-dlp,FFmpeg" />
