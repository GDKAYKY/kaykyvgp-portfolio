<script lang="ts">
  import LiquidCarveButton from "$lib/components/LiquidCarveButton.svelte";

  export let open = false;

  let name = "";
  let email = "";
  let message = "";
  let submitted = false;

  const recipient = "kaykyvitorgp@gmail.com";

  function close() {
    open = false;
    submitted = false;
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const subject = name ? `Contact from ${name}` : "Contact from portfolio";
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    submitted = true;
  }
</script>

<svelte:window
  onkeydown={(event) => open && event.key === "Escape" && close()}
/>

{#if open}
  <div
    class="modal-backdrop"
    role="presentation"
    onclick={(event) => event.target === event.currentTarget && close()}
  >
    <dialog open class="contact-modal" aria-labelledby="contact-title">
      <button
        class="modal-close"
        type="button"
        aria-label="Close contact form"
        onclick={close}
      >
        <span aria-hidden="true">×</span>
      </button>

      {#if submitted}
        <div class="modal-success">
          <span class="success-mark" aria-hidden="true">✓</span>
          <h2 id="contact-title">Message prepared.</h2>
          <p>Your email app should open now to complete the message.</p>
          <button class="modal-submit" type="button" onclick={close}
            >Back to portfolio</button
          >
        </div>
      {:else}
        <div class="modal-heading">
          <p class="modal-kicker">Let's talk</p>
          <h2 id="contact-title">Get in touch.</h2>
          <p>Have an idea or project in mind? Tell me a little about it.</p>
        </div>

        <form onsubmit={handleSubmit}>
          <label>
            Name
            <input
              bind:value={name}
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              bind:value={email}
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Message
            <textarea
              bind:value={message}
              name="message"
              rows="4"
              placeholder="How can I help?"
              required
            ></textarea>
          </label>

          <div class="modal-actions">
            <button class="modal-submit" type="submit"
              >Enviar mensagem <span aria-hidden="true">↗</span></button
            >
            <LiquidCarveButton
              href="/cv.pdf"
              label="Download CV"
              download
              idSuffix="cv"
              fileIcon
            />
          </div>
          <p>
            Disclaimer: This CV is missing my Phone Number to prevent Spam and
            Doxxing. Contact me to get my Phone Number. I will respond as soon
            as possible.
          </p>
        </form>

        <div class="social-section">
          <div class="social-divider"><span>or find me on</span></div>
          <div class="social-actions">
            <a
              class="social-button social-button--linkedin"
              href="https://www.linkedin.com/in/kaykyvgp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
                />
              </svg>
              Continue with LinkedIn
            </a>
            <a
              class="social-button social-button--github"
              href="https://github.com/GDKAYKY"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"
                />
              </svg>
              Continue with Github
            </a>
          </div>
        </div>
      {/if}
    </dialog>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    padding: 24px;
    background: transparent;
    backdrop-filter: none;
    animation: modal-fade-in 0.22s ease-out;
  }

  .contact-modal {
    position: relative;
    width: min(100%, 540px);
    height: 600px;
    max-height: min(720px, calc(100dvh - 48px));
    overflow-y: auto;
    padding: clamp(28px, 5vw, 48px);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 18px;
    background: #171717;
    color: #fff;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
    animation: modal-rise-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
  }

  .contact-modal::-webkit-scrollbar {
    width: 7px;
  }

  .contact-modal::-webkit-scrollbar-track {
    background: transparent;
  }

  .contact-modal::-webkit-scrollbar-thumb {
    border: 2px solid #171717;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.5);
  }

  .contact-modal::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.8);
  }

  .modal-close {
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
    transition: 0.2s ease;
  }

  .modal-close:hover,
  .modal-close:focus-visible {
    border-color: #fff;
    color: #fff;
  }

  .modal-heading,
  .modal-success {
    margin-bottom: 32px;
  }

  .modal-kicker {
    margin-bottom: 10px;
    color: #ababab;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  h2 {
    margin-bottom: 12px;
    color: #fff;
    font-size: clamp(2rem, 6vw, 3rem);
    line-height: 1;
    letter-spacing: -0.05em;
  }

  .modal-heading > p:last-child,
  .modal-success p {
    max-width: 390px;
    color: #ababab;
    line-height: 1.6;
  }

  form {
    display: grid;
    gap: 18px;
  }

  form > p {
    margin-top: -6px;
    color: #777;
    font-size: 0.72rem;
    line-height: 1.45;
  }

  label {
    display: grid;
    gap: 8px;
    color: #d4d4d4;
    font-size: 0.83rem;
    font-weight: 600;
  }

  input,
  textarea {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 8px;
    padding: 13px 14px;
    background: #101010;
    color: #fff;
    font: inherit;
    font-size: 0.95rem;
    outline: none;
    resize: vertical;
    transition: 0.2s ease;
  }

  input::placeholder,
  textarea::placeholder {
    color: #707070;
  }

  input:focus,
  textarea:focus {
    border-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
  }

  .modal-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 6px;
    border: 0;
    border-radius: 8px;
    padding: 13px 20px;
    background: #fff;
    color: #000;
    font: inherit;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .modal-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 6px;
  }

  .modal-actions .modal-submit {
    margin-top: 0;
  }

  :global(.modal-actions .liquid-carve-button) {
    width: 100%;
    min-height: 48px;
  }

  .social-section {
    margin-top: 28px;
  }

  .social-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
    color: #707070;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .social-divider::before,
  .social-divider::after {
    content: "";
    height: 1px;
    flex: 1;
    background: rgba(255, 255, 255, 0.13);
  }

  .social-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .social-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 48px;
    border-radius: 8px;
    padding: 8px 14px;
    color: #fff;
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.25;
    text-align: center;
    text-decoration: none;
    transition: 0.2s ease;
  }

  .social-button svg {
    width: 24px;
    height: 24px;
    flex: 0 0 auto;
  }

  .social-button--linkedin {
    background: #0a66c2;
  }

  .social-button--github {
    background: rgb(24, 23, 23);
  }

  .social-button:hover,
  .social-button:focus-visible {
    box-shadow: none;
    transform: translateY(-2px);
  }

  .modal-submit:hover,
  .modal-submit:focus-visible {
    background: #dcdcdc;
    transform: translateY(-2px);
  }

  .modal-success {
    margin: 20px 0 0;
    text-align: center;
  }

  .modal-success p {
    margin: 0 auto 28px;
  }

  .success-mark {
    display: grid;
    width: 54px;
    height: 54px;
    margin: 0 auto 24px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    color: #fff;
    font-size: 1.5rem;
  }

  @keyframes modal-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes modal-rise-in {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 520px) {
    .modal-backdrop {
      padding: 14px;
    }
    .contact-modal {
      padding: 30px 22px 24px;
      border-radius: 14px;
    }
    .modal-actions {
      grid-template-columns: 1fr;
    }
    .social-actions {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .modal-backdrop,
    .contact-modal {
      animation: none;
    }
  }
</style>
