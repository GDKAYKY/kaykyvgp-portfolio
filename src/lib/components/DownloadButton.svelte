<script lang="ts">
  interface Props {
    link: string;
    version?: string;
    size?: string;
    count?: string | number;
    title?: string;
  }

  let {
    link,
    version = "v1.0.0",
    size = "0MB",
    count,
    title = "Download for Windows x86-64",
  }: Props = $props();

  const formattedCount = $derived(
    typeof count === "number" ? count.toLocaleString("pt-BR") : count
  );

  const metaText = $derived(
    formattedCount
      ? `${size} • ${version} • ${formattedCount} downloads`
      : `${size} • ${version}`
  );
</script>

<a
  href={link}
  class="win-download-btn"
  target="_blank"
  rel="noopener noreferrer"
>
  <div class="win-icon-grid">
    <div class="win-pane win-pane-1"></div>
    <div class="win-pane win-pane-2"></div>
    <div class="win-pane win-pane-3"></div>
    <div class="win-pane win-pane-4"></div>
  </div>
  <div class="win-info">
    <span class="win-title">{title}</span>
    <span class="win-meta">{metaText}</span>
  </div>
</a>

<style>
  .win-download-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5.3em;
    height: 5.3em;
    border: none;
    cursor: pointer;
    border-radius: 0.4em;
    background: rgba(240, 240, 240, 0.9);
    text-decoration: none;
    transition: transform 0.2s ease;
    font-size: 9px;
  }

  .win-download-btn:hover {
    transform: scale(1.05);
  }

  .win-icon-grid {
    position: relative;
    width: 3.5em;
    height: 3.5em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0.2em;
  }

  .win-pane {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .win-pane-1 {
    background-color: rgb(100, 175, 230);
    border-top-left-radius: 0.2em;
  }

  .win-pane-2 {
    background: linear-gradient(135deg, rgb(100, 175, 230), rgb(0, 120, 212));
    border-top-right-radius: 0.2em;
  }

  .win-pane-3 {
    background: linear-gradient(135deg, rgb(100, 175, 230), rgb(0, 120, 212));
    border-bottom-left-radius: 0.2em;
  }

  .win-pane-4 {
    background-color: rgb(0, 120, 212);
    border-bottom-right-radius: 0.2em;
  }

  .win-download-btn:focus-visible .win-icon-grid {
    animation: win-wow 1s forwards;
  }

  @keyframes wow {
    20% {
      scale: 0.8;
    }

    30% {
      scale: 1;
      transform: translateY(0);
    }

    50% {
      transform: translateY(-6px);
    }

    65% {
      transform: translateY(4px);
    }

    80% {
      transform: translateY(0);
    }

    100% {
      scale: 1;
    }
  }

  .win-download-btn:hover .win-btn-tooltip {
    opacity: 1;
  }

  @media (max-width: 600px) {
    .download-section-container {
      flex-direction: column;
      text-align: center;
    }
  }

  .win-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
  }

  .win-title {
    color: #333;
    font-weight: 600;
    font-size: 1.1em;
    line-height: 1.2;
  }

  .win-meta {
    color: #666;
    font-size: 0.9em;
    font-weight: 500;
  }

  /* Force override for button sizing */
  .win-download-btn {
    width: auto !important;
    height: auto !important;
    padding: 8px 16px !important;
    font-size: 11px !important;
    gap: 12px !important;
  }
</style>
