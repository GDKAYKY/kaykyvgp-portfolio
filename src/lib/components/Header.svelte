<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";

  let floating = $state(false);
  let triggerPoint = $state(100);

  const updateTriggerPoint = () => {
    const heroSection = document.querySelector(".hero-section") as HTMLElement;
    if (heroSection) {
      triggerPoint = Math.max(0, heroSection.offsetHeight - 100);
    }
  };

  const handleScroll = () => {
    floating = window.scrollY > triggerPoint;
  };

  onMount(() => {
    updateTriggerPoint();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateTriggerPoint, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTriggerPoint);
    };
  });

  const isProjectsPage = $derived(
    page.url?.pathname?.includes("/projects") ?? false,
  );
</script>

<header class="site-header" class:floating>
  <div class="header-inner">
    <a href="/" class="header-logo">
      <svg
        class="logo-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>
    <nav class="header-nav">
      <a href="/#experience" class="nav-item">Experience</a>
      <a href="/#skills" class="nav-item">Skills</a>
      <a href="/projects" class="nav-button" class:active={isProjectsPage}
        >My Projects</a
      >
    </nav>
  </div>
</header>

<style>
  .site-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    border-bottom: 1px solid transparent;
    background: transparent;
    padding: 24px 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .site-header.floating {
    position: fixed;
    top: 20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 90%;
    max-width: 1200px;
    background: rgba(10, 10, 10, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 12px 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    transform: none;
  }

  .header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    font-size: 18px;
    color: var(--primary-text);
    text-decoration: none;
    letter-spacing: -0.02em;
  }

  .logo-icon {
    color: var(--primary-text);
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .nav-item {
    font-size: 14px;
    color: var(--secondary-text);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .nav-item:hover {
    color: var(--primary-text);
  }

  .nav-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background-color: var(--primary-text);
    color: #000;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    border-radius: 8px;
    transition:
      transform 0.2s ease,
      background-color 0.2s ease;
  }

  .nav-button:hover,
  .nav-button.active {
    transform: translateY(-1px);
  }
</style>
