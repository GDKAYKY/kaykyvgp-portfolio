<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { SplitText } from "gsap/SplitText";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import ParticleEffect from "$lib/components/ParticleEffect.svelte";
  import TechStrip from "$lib/components/layout/TechStrip.svelte";
  import ExperienceCard from "$lib/components/ExperienceCard.svelte";
  import CertificationCard from "$lib/components/CertificationCard.svelte";
  import EducationCard from "$lib/components/EducationCard.svelte";
  import SkillsColumn from "$lib/components/SkillsColumn.svelte";
  import LiquidCarveButton from "$lib/components/LiquidCarveButton.svelte";
  import {
    EXPERIENCES,
    CERTIFICATIONS,
    EDUCATION,
    SKILLS_COLUMNS,
  } from "$lib/data/resume";

  // Scroll reveal animation
  let elements: NodeListOf<Element>;
  let heroSection: HTMLElement;

  onMount(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const mainContext = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils
        .toArray<HTMLElement>(
          ".main-content section .card, .main-content section .skills-column",
        )
        .forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.72, y: 24 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "top 62%",
                scrub: 0.8,
              },
            },
          );
        });
    });

    let destroyed = false;
    const heroContext = gsap.context(() => {}, heroSection);

    document.fonts.ready.then(() => {
      if (destroyed) return;

      heroContext.add(() => {
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const split = SplitText.create(".hero-title, .hero-description", {
          type: "words",
          aria: "hidden",
        });

        if (reduceMotion) {
          gsap.set(split.words, { clearProps: "all" });
          return;
        }

        gsap.from(split.words, {
          opacity: 0,
          y: 14,
          duration: 1.3,
          ease: "sine.out",
          stagger: 0.06,
          clearProps: "transform",
        });

        gsap.set(".hero-actions .hero-button", { opacity: 0, y: 14 });
        gsap.to(".hero-actions .hero-button", {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          delay: 1.5,
          stagger: 0.12,
          clearProps: "transform",
        });
      });
    });

    elements = document.querySelectorAll(
      ".animate-fade-in, .animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right",
    );

    // Immediately reveal all elements - no invisible spacing
    elements.forEach((el) => el.classList.add("revealed"));

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
      destroyed = true;
      heroContext.revert();
      mainContext.revert();
      elements.forEach((el) => observer.unobserve(el));
    };
  });
</script>

<section bind:this={heroSection} class="hero-section animate-fade-in-up">
  <ParticleEffect />
  <div class="hero-content">
    <h1 class="hero-title">
      I'm Kayky, creating software that scales ideas into products.
    </h1>
    <p class="hero-description animate-fade-in-right animate-delay-3">
      I build high-performance, secure, and scalable systems using .NET and
      Cloud technologies.
    </p>
    <div class="hero-actions animate-fade-in-up animate-delay-4">
      <LiquidCarveButton href="/projects" label="My Projects" />
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
      <main class="animate-fade-in-right revealed">
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
