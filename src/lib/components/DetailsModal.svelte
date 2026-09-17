<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { Certification, Experience } from "$lib/types/resume";

  interface Props {
    open: boolean;
    item: Certification | Experience | null;
    kind: "certification" | "experience";
    onclose: () => void;
  }

  let { open, item, kind, onclose }: Props = $props();
  let certification = $derived(item && "title" in item ? item : null);
  let experience = $derived(item && "position" in item ? item : null);
</script>

<svelte:window
  onkeydown={(event) => open && event.key === "Escape" && onclose()}
/>

{#if open && item}
  <div
    class="details-backdrop"
    role="presentation"
    onclick={(event) => event.target === event.currentTarget && onclose()}
  >
    <dialog open class="details-modal" aria-labelledby="details-title">
      <button
        class="details-close"
        type="button"
        aria-label="Close details"
        onclick={onclose}>×</button
      >

      <div class="details-identity">
        <img class="details-logo" src={item.logo} alt="" />
        <div>
          <p class="details-kicker">
            {kind === "certification" ? "" : "Experience details"}
          </p>
          <h2 id="details-title">
            {certification ? certification.title : experience?.position}
          </h2>
          <p class="details-subtitle">
            {certification
              ? certification.issuer
              : `${experience?.company} · ${experience?.period}`}
          </p>
        </div>
      </div>

      <p class="details-about">
        {item.about ??
          "A detailed overview of this experience and the skills developed along the way."}
      </p>

      {#if kind === "certification"}
        <div class="details-meta">
          <Icon name="calendar" size={15} />
          {certification?.date}
        </div>
        <h3>Skills covered</h3>
        <ul class="details-list">
          {#each certification?.skills ?? [] as skill}<li>{skill}</li>{/each}
        </ul>
        {#if certification?.tools?.length}
          <h3>Tools</h3>
          <p class="details-tools">{certification.tools.join(" · ")}</p>
        {/if}
      {:else}
        <div class="details-meta">
          <Icon name="map-pin" size={15} />
          {experience?.location}
        </div>
        <h3>What I worked on</h3>
        <ul class="details-list">
          {#each experience?.description ?? [] as description}<li>
              {description}
            </li>{/each}
        </ul>
        {#if experience?.technologies?.length}
          <h3>Technologies</h3>
          <p class="details-tools">{experience.technologies.join(" · ")}</p>
        {/if}
      {/if}

      {#if kind === "certification"}
        <a
          class="details-credential"
          href={certification?.credentialUrl}
          target="_blank"
          rel="noopener noreferrer">See credential ↗</a
        >
      {/if}
    </dialog>
  </div>
{/if}

<style>
  .details-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    padding: 24px;
    background: rgba(0, 0, 0, 0.68);
    backdrop-filter: blur(8px);
    animation: details-fade 0.2s ease-out;
  }
  .details-modal {
    position: relative;
    width: min(100%, 620px);
    max-height: min(720px, calc(100dvh - 48px));
    overflow-y: auto;
    padding: clamp(28px, 5vw, 48px);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 18px;
    background: #171717;
    color: #fff;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
    animation: details-rise 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .details-close {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 36px;
    height: 36px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 50%;
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    font-size: 26px;
    line-height: 1;
    cursor: pointer;
  }
  .details-close:hover,
  .details-close:focus-visible {
    border-color: #fff;
    color: #fff;
  }
  .details-identity {
    display: flex;
    align-items: center;
    gap: 18px;
    padding-right: 38px;
  }
  .details-logo {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    object-fit: cover;
    border-radius: 14px;
    background: #fff;
  }
  .details-kicker {
    margin: 0 0 8px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  h2 {
    margin: 0;
    font-size: clamp(1.35rem, 3vw, 1.8rem);
    line-height: 1.1;
  }
  .details-subtitle,
  .details-about,
  .details-tools {
    color: rgba(255, 255, 255, 0.68);
    line-height: 1.6;
  }
  .details-subtitle {
    margin: 8px 0 0;
  }
  .details-about {
    margin: 30px 0 20px;
    font-size: 1rem;
  }
  .details-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 28px;
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.9rem;
  }
  h3 {
    margin: 24px 0 10px;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }
  .details-list {
    display: grid;
    gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;
    color: rgba(255, 255, 255, 0.78);
  }
  .details-list li {
    position: relative;
    padding-left: 18px;
    line-height: 1.5;
  }
  .details-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.62em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
    opacity: 0.45;
  }
  .details-tools {
    margin: 0;
  }
  .details-credential {
    display: inline-flex;
    margin-top: 30px;
    padding: 11px 18px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 12px;
    color: #fff;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 700;
  }
  .details-credential:hover {
    background: #fff;
    color: #000;
  }
  @keyframes details-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes details-rise {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .details-backdrop,
    .details-modal {
      animation: none;
    }
  }
</style>
