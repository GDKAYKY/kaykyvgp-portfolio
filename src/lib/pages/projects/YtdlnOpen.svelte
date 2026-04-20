<script lang="ts">
  import { onMount } from "svelte";
  import ProjectShowcase from "$lib/components/ProjectShowcase.svelte";
  import TechStrip from "$lib/components/TechStrip.svelte";
  import type { ReleaseInfo } from "$lib/types";
  
  // Import images for enhanced-img
  import ytdlnMockup from "$lib/assets/ytdln_mockup.png?enhanced";
  import ytdlnSettings from "$lib/assets/ytdln_settings_mockup.png?enhanced";

  interface Props {
    release?: ReleaseInfo;
  }

  let { release }: Props = $props();

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

<div class="container container--header-offset">
  <main class="animate-fade-in-right animate-delay-2">
    <ProjectShowcase
      context="Open Source Utility | Electron & Node.js"
      title="YTDLN-OPEN"
      description=""
      image={ytdlnMockup}
      imageAlt="ytdln-open Interface Mockup"
      visualStyle="clean"
      link="https://github.com/GDKAYKY/ytdln-open"
      linkText="View Repository"
      tags="Electron,Node.js,yt-dlp,aria2c,FFmpeg,React"
      downloadLink={release?.exe?.url ||
        "https://github.com/GDKAYKY/ytdln-open/releases/download/v01.04.2026(1.1.0)/ytdln-open.Setup.1.1.0.exe"}
      downloadVersion={release?.version || "v1.1.0"}
      downloadSize={release?.exe?.size || "289MB"}
      downloadCount={release?.exe?.downloads || 7}
    >
      <p style="margin-bottom: 24px">
        YTDLN-OPEN is a free and open-source desktop video/audio downloader
        powered by <strong>yt-dlp</strong>, <strong>FFmpeg</strong>, and
        <strong>Electron</strong>. Recently rebuilt with
        <strong>React</strong>, it supports downloading from over
        <strong>1000</strong> websites, focusing on robust media extraction and high-performance
        processing.
      </p>
      <p>
        Featuring <strong>aria2c</strong> acceleration for high-speed multi-connection
        transfers, it includes advanced capabilities like playlist support, format
        conversion, metadata preservation, and cross-platform compatibility (Windows,
        macOS, Linux).
      </p>
    </ProjectShowcase>
  </main>
</div>

<TechStrip tags="Electron,Node.js,yt-dlp,aria2c,FFmpeg,React" />

<ProjectShowcase
  context="Power & Flexibility"
  title="Experience Absolute Customizability"
  image={ytdlnSettings}
  imageAlt="YTDLN-OPEN Settings Interface"
  variant="light"
  reverse={true}
  roleTitle={""}
>
  <p>
    YTDLN-OPEN isn't just about downloading; it's about control. Tailor every
    aspect of your experience with granular settings.
  </p>
  <p>
    Configure <strong>output formats</strong> (MP4, MKV, MP3), adjust
    <strong>video quality</strong>, and finetune
    <strong>concurrent fragments</strong> for optimal speed. toggle
    <strong>subtitle embedding</strong>, metadata options, and more—all from a
    unified, intuitive dashboard.
  </p>
</ProjectShowcase>
