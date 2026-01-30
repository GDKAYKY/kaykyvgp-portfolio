<script lang="ts">
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  if (!dev) {
    injectSpeedInsights();
  }

  interface Props {
    children: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  // Supressão de erros de extensões do navegador (ruído de console)
  if (typeof window !== "undefined") {
    const originalConsoleError = console.error;
    const extensionErrorSnippets = [
      "message channel closed",
      "asynchronous response",
      "Extension context invalidated",
      "could not establish connection",
    ];

    console.error = (...args: any[]) => {
      const msg = args[0]?.toString() || "";
      if (extensionErrorSnippets.some((snippet) => msg.includes(snippet))) {
        return;
      }
      originalConsoleError.apply(console, args);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const msg = event.reason?.message || "";
      if (extensionErrorSnippets.some((snippet) => msg.includes(snippet))) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };

    const handleError = (event: ErrorEvent) => {
      const msg = event.message || "";
      if (extensionErrorSnippets.some((snippet) => msg.includes(snippet))) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };

    window.addEventListener(
      "unhandledrejection",
      handleUnhandledRejection,
      true,
    );
    window.addEventListener("error", handleError, true);
  }

  onMount(() => {
    // Logic inside onMount if needed
  });
</script>

<Header />

{@render children()}

<Footer />
