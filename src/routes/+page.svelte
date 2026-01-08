<script lang="ts">
  import { onMount } from "svelte";
  import ParticleEffect from "$lib/components/ParticleEffect.svelte";
  import TechStrip from "$lib/components/TechStrip.svelte";
  import Icon from "$lib/components/Icon.svelte";

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
  <title>Kayky Vitor - Portfolio</title>
  <meta
    name="description"
    content="Software Developer specializing in high-performance and scalable systems using .NET and Cloud."
  />
</svelte:head>

<section class="hero-section animate-fade-in-up">
  <ParticleEffect />
  <div class="hero-content">
    <h1 class="hero-title">
      I'm Kayky, creating software that scales ideas into results.
    </h1>
    <p class="hero-description animate-fade-in-right animate-delay-3">
      I build high-performance, secure, and scalable systems using .NET and
      Cloud technologies.
    </p>
    <div class="hero-actions animate-fade-in-up animate-delay-4">
      <a href="/projects" class="hero-button primary">My Projects</a>
      <a href="mailto:kaykyvitorgp@gmail.com" class="hero-button secondary"
        >Contact Me</a
      >
    </div>
  </div>

  <div class="hero-visual animate-fade-in-up animate-delay-5">
    <!-- Decorative visual elements -->
  </div>
</section>

<TechStrip />

<div class="main-content-wrapper">
  <div class="container">
    <div class="main-content">
      <main class="animate-fade-in-right animate-delay-2">
        <!-- Experience Section -->
        <section id="experience" class="experience-section animate-fade-in-up">
          <h2 class="section-title">Experience</h2>
          <div class="experience-item">
            <div class="experience-header">
              <img
                class="certification-logo"
                src="/assets/who_logo.jpeg"
                alt="Who Logo"
                width="56"
                height="56"
              />
              <div class="experience-title-area">
                <h3 class="job-title">Apprentice Software Developer</h3>
                <div class="job-meta">
                  <span class="meta-item">
                    <Icon name="building-2" size={14} />
                    Who
                  </span>
                  <span class="dot">•</span>
                  <span class="meta-item">
                    <Icon name="calendar" size={14} />
                    Dec 2024 – Dec 2025
                  </span>
                  <span class="dot">•</span>
                  <span class="meta-item">
                    <Icon name="map-pin" size={14} />
                    Hybrid &amp; BH
                  </span>
                </div>
              </div>
            </div>
            <ul class="job-description">
              <li>
                Developed and maintained high-performance systems using C#,
                .NET, and AWS.
              </li>
              <li>
                Focused on security, efficiency, and FinOps, contributing to
                robust workflows and reliable system architectures.
              </li>
            </ul>
          </div>
        </section>

        <!-- Certifications Section -->
        <section class="section animate-fade-in-up animate-delay-8">
          <h2 class="section-title">Certifications</h2>

          <!-- Machine Learning Foundations -->
          <div
            class="experience-item certification animate-fade-in-up animate-delay-1"
          >
            <div class="certification-content">
              <img
                class="certification-logo"
                src="/assets/aws_machine_learning_logo.png"
                alt="AWS Logo"
                width="48"
                height="48"
              />
              <div class="certification-info">
                <h3 class="certification-title">
                  Machine Learning Foundations
                </h3>
                <div class="certification-details">
                  <span class="certification-issuer">Amazon Web Services</span>
                  <span class="certification-date">
                    <Icon name="calendar" size={14} />
                    November 2025
                  </span>
                  <span class="certification-company">
                    <img
                      class="company-logo-small"
                      src="/assets/aws_logo.jpeg"
                      alt="AWS Logo"
                      width="16"
                      height="16"
                    />
                    Issued by Amazon Web Services
                  </span>
                </div>
              </div>
            </div>
            <ul class="job-description">
              <li>Verification issued in November 2025</li>
            </ul>
            <a
              href="https://www.credly.com/badges/f8f39b6e-90ce-4304-af14-3d2658f4c74b/linked_in_profile"
              target="_blank"
              rel="noopener noreferrer"
              class="credential-button"
            >
              <span class="button-text">See Credential</span>
              <span class="button-icon">↗</span>
            </a>
          </div>

          <!-- Getting Started with Compute -->
          <div
            class="experience-item certification animate-fade-in-up animate-delay-2"
          >
            <div class="certification-content">
              <img
                class="certification-logo"
                src="https://images.credly.com/size/500x500/images/7b08cc0e-064b-407d-b70e-323509c3e474/blob"
                alt="AWS Logo"
                width="48"
                height="48"
              />
              <div class="certification-info">
                <h3 class="certification-title">
                  Getting Started with Compute
                </h3>
                <div class="certification-details">
                  <span class="certification-issuer">Amazon Web Services</span>
                  <span class="certification-date">
                    <Icon name="calendar" size={14} />
                    October 2025
                  </span>
                  <span class="certification-company">
                    <img
                      class="company-logo-small"
                      src="/assets/aws_logo.jpeg"
                      alt="AWS Logo"
                      width="16"
                      height="16"
                    />
                    Issued by Amazon Web Services
                  </span>
                </div>
              </div>
            </div>
            <ul class="job-description">
              <li>Verification issued in October 2025</li>
            </ul>
            <a
              href="https://www.credly.com/badges/faabda17-42b4-4e3f-b027-47158c9b41b0"
              target="_blank"
              rel="noopener noreferrer"
              class="credential-button"
            >
              <span class="button-text">See Credential</span>
              <span class="button-icon">↗</span>
            </a>
          </div>

          <!-- Foundational C# -->
          <div
            class="experience-item certification animate-fade-in-up animate-delay-3"
          >
            <div class="certification-content">
              <img
                class="certification-logo"
                src="https://learn.microsoft.com/en-us/training/achievements/get-started-c-sharp-part-1.svg"
                alt="Microsoft Logo"
                width="48"
                height="48"
              />
              <div class="certification-info">
                <h3 class="certification-title">
                  Foundational C# with Microsoft
                </h3>
                <div class="certification-details">
                  <span class="certification-issuer">Microsoft</span>
                  <span class="certification-date">
                    <Icon name="calendar" size={14} />
                    October 2025
                  </span>
                  <span class="certification-company">
                    <img
                      class="company-logo-small"
                      src="/assets/microsoft_logo.jpeg"
                      alt="Microsoft Logo"
                      width="16"
                      height="16"
                    />
                    Issued by Microsoft
                  </span>
                </div>
              </div>
            </div>
            <ul class="job-description">
              <li>Verification issued in October 2025</li>
            </ul>
            <a
              href="https://freecodecamp.org/certification/fcc-ed711c85-4ef5-459c-8a5e-7a6e3106d87b/foundational-c-sharp-with-microsoft"
              target="_blank"
              rel="noopener noreferrer"
              class="credential-button"
            >
              <span class="button-text">See Credential</span>
              <span class="button-icon">↗</span>
            </a>
          </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="section animate-fade-in-up animate-delay-9">
          <h2 class="section-title">Skills</h2>
          <div class="skills-grid stagger-animation">
            <div class="skills-column animate-fade-in-up animate-delay-1">
              <div class="skills-column-title">
                <Icon name="code-2" size={20} />
                Hard Skills
              </div>
              <ul>
                <li><Icon name="hash" size={18} /> C# and .NET Framework</li>
                <li><Icon name="cloud" size={18} /> AWS</li>
                <li><Icon name="trending-down" size={18} /> FinOps</li>
                <li><Icon name="container" size={18} /> Docker</li>
                <li><Icon name="activity" size={18} /> Grafana</li>
                <li>
                  <Icon name="shield-check" size={18} /> Cybersecurity Principles
                </li>
              </ul>
            </div>
            <div class="skills-column animate-fade-in-up animate-delay-2">
              <div class="skills-column-title">
                <Icon name="brain-circuit" size={20} />
                Soft Skills
              </div>
              <ul>
                <li><Icon name="zap" size={18} /> Autodidact</li>
                <li><Icon name="gauge" size={18} /> Focus on Performance</li>
                <li><Icon name="ear" size={18} /> Active Listener</li>
                <li>
                  <Icon name="graduation-cap" size={18} /> Constant Learner
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Education Section -->
        <section class="section animate-fade-in-up animate-delay-10">
          <h2 class="section-title">Education</h2>
          <div class="certification animate-fade-in-up animate-delay-1">
            <div class="certification-content">
              <img
                class="certification-logo"
                src="https://portal.contagem.mg.gov.br/fotos/0e8622a63c0582f938374f922a2d271d.png"
                alt="School Cap"
                width="48"
                height="48"
              />
              <div class="certification-info">
                <h3 class="certification-title">High School</h3>
                <div class="certification-details">
                  <span class="certification-issuer"
                    >FUNEC - Fundação de Ensino de Contagem</span
                  >
                  <span class="certification-date">
                    <Icon name="calendar" size={14} />
                    January 2022 – December 2025
                  </span>
                  <span class="certification-company">
                    <img
                      class="company-logo-small"
                      src="https://portal.contagem.mg.gov.br/fotos/0e8622a63c0582f938374f922a2d271d.png"
                      alt="FUNEC Logo"
                      width="16"
                      height="16"
                    />
                    Technical course on Economic Processes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</div>
