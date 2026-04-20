<script lang="ts">
  import { onMount } from "svelte";
  import ParticleEffect from "$lib/components/ParticleEffect.svelte";
  import TechStrip from "$lib/components/TechStrip.svelte";
  import ExperienceCard from "$lib/components/ExperienceCard.svelte";
  import CertificationCard from "$lib/components/CertificationCard.svelte";
  import EducationCard from "$lib/components/EducationCard.svelte";
  import SkillsColumn from "$lib/components/SkillsColumn.svelte";
  import {
    EXPERIENCES,
    CERTIFICATIONS,
    EDUCATION,
    SKILLS_COLUMNS,
  } from "$lib/data/resume";

  // Scroll reveal animation
  let elements: NodeListOf<Element>;

  onMount(() => {
    elements = document.querySelectorAll(
      ".animate-fade-in, .animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right",
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
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  });
</script>

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
          {#each EXPERIENCES as experience}
            <ExperienceCard {experience} />
          {/each}
        </section>

        <!-- Courses & Certifications Section -->
        <section class="section animate-fade-in-up">
          <h2 class="section-title">Courses & Certifications</h2>
          {#each CERTIFICATIONS as certification}
            <CertificationCard {certification} />
          {/each}
        </section>

        <!-- Education Section -->
        <section class="section animate-fade-in-up">
          <h2 class="section-title">Education</h2>
          {#each EDUCATION as education}
            <EducationCard {education} />
          {/each}
        </section>

        <!-- Skills Section -->
        <section id="skills" class="section animate-fade-in-up">
          <h2 class="section-title">Skills</h2>
          <div class="skills-grid stagger-animation">
            {#each SKILLS_COLUMNS as column}
              <SkillsColumn {column} />
            {/each}
          </div>
        </section>
      </main>
    </div>
  </div>
</div>
