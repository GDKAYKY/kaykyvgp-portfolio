<script lang="ts">
  import Icon from "./Icon.svelte";
</script>

<footer class="portfolio-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand animate-fade-in-up">
        <div class="bio">
          A Passionate Software Developer, always ready to learn something new.
        </div>
      </div>

      <div class="footer-links stagger-animation">
        <div class="footer-column">
          <h4 class="footer-label">Connect</h4>
          <div class="contact-info">
            <a
              href="https://github.com/GDKAYKY"
              class="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" />
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/kaykyvgp/"
              class="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="linkedin" />
              LinkedIn
            </a>
            <a href="mailto:kaykyvitorgp@gmail.com" class="contact-link">
              <Icon name="mail" />
              Mail
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <small class="copyright">@2025 Kayky Vitor. Built with passion.</small>
      <div class="footer-status">
        <span class="status-dot"></span>
        Available for new projects
      </div>
    </div>
  </div>
</footer>

<style>
  .portfolio-footer {
    padding: 6rem 0 3rem;
    background: #000;
    position: relative;
    width: 100%;
  }

  .footer-grid {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 4rem;
    margin-bottom: 4rem;
  }

  .footer-brand {
    max-width: 400px;
  }

  .bio {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.4;
    color: #fff;
    letter-spacing: -0.02em;
    opacity: 0.9;
  }

  .footer-label {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .contact-link {
    color: #fff;
    text-decoration: none;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    width: fit-content;
    background: rgba(255, 255, 255, 0.05);
    padding: 12px 24px;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    font-weight: 500;
  }

  .contact-link :global(svg) {
    width: 20px;
    height: 20px;
    opacity: 0.8;
  }

  .contact-link::after {
    content: "→";
    font-size: 1.2rem;
    opacity: 0.4;
    transition: all 0.3s ease;
  }

  .contact-link:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .contact-link:hover::after {
    opacity: 1;
    transform: translateX(4px);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .copyright {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.9rem;
  }

  .footer-status {
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 10px #10b981;
    position: relative;
  }

  .status-dot::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .footer-grid {
      flex-direction: column;
      gap: 3rem;
    }

    .bio {
      font-size: 1.2rem;
    }

    .footer-bottom {
      flex-direction: column;
      gap: 1.5rem;
      align-items: flex-start;
    }
  }
</style>
