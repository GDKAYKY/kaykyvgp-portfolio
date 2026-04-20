import type { Experience, Certification, Education, SkillsColumn } from '$lib/types/resume';

export const EXPERIENCES: Experience[] = [
  {
    company: 'Who',
    logo: '/assets/logos/who_logo.jpeg',
    position: 'Apprentice Software Developer',
    location: 'Hybrid & BH',
    period: 'Dec 2024 – Dec 2025',
    description: [
      'Developed and maintained high-performance systems using C#, .NET, and AWS.',
      'Focused on security, efficiency, and FinOps, contributing to robust workflows and reliable system architectures.',
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Machine Learning Foundations',
    logo: '/assets/logos/aws_machine_learning_logo.png',
    issuer: 'Amazon Web Services',
    issuerLogo: '/assets/logos/aws_logo.jpeg',
    date: 'November 2025',
    skills: [
      'Machine Learning fundamentals and core concepts',
      'AWS ML services and tools (SageMaker, Rekognition, Comprehend)',
      'Model training, evaluation, and deployment strategies',
      'Supervised and unsupervised learning techniques',
    ],
    credentialUrl:
      'https://www.credly.com/badges/f8f39b6e-90ce-4304-af14-3d2658f4c74b/linked_in_profile',
  },
  {
    title: 'Getting Started with Compute',
    logo: '/assets/logos/aws_compute_logo.png',
    issuer: 'Amazon Web Services',
    issuerLogo: '/assets/logos/aws_logo.jpeg',
    date: 'October 2025',
    skills: [
      'AWS EC2 instances and compute options',
      'Auto Scaling and load balancing strategies',
      'Container services (ECS, EKS) and serverless computing (Lambda)',
      'Cost optimization and performance tuning for compute resources',
    ],
    credentialUrl: 'https://www.credly.com/badges/faabda17-42b4-4e3f-b027-47158c9b41b0',
  },
  {
    title: 'Foundational C# with Microsoft',
    logo: 'https://learn.microsoft.com/en-us/training/achievements/get-started-c-sharp-part-1.svg',
    issuer: 'Microsoft',
    issuerLogo: '/assets/logos/microsoft_logo.jpeg',
    date: 'October 2025',
    skills: [
      'C# syntax, data types, and control structures',
      'Object-oriented programming principles',
      '.NET runtime and framework fundamentals',
      'Debugging, testing, and best practices in C# development',
    ],
    credentialUrl:
      'https://freecodecamp.org/certification/fcc-ed711c85-4ef5-459c-8a5e-7a6e3106d87b/foundational-c-sharp-with-microsoft',
  },
  {
    title: 'Rust Fundamentals',
    logo: '/assets/logos/coursera_logo.png',
    issuer: 'Duke University',
    issuerLogo: '/assets/logos/duke_logo.png',
    date: 'April 2026',
    skills: [
      'Rust syntax, ownership, and borrowing concepts',
      'Memory safety without garbage collection',
      'Cargo package manager and the Rust ecosystem',
      'Error handling, pattern matching, and concurrent programming',
    ],
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/SZAJYL33TBJS',
  },
];

export const EDUCATION: Education[] = [
  {
    institution: 'FUNEC - Fundação de Ensino de Contagem',
    logo: '/assets/logos/funec_logo.png',
    degree: 'High School',
    period: 'January 2022 – December 2025',
  },
];

export const SKILLS_COLUMNS: SkillsColumn[] = [
  {
    title: 'Hard Skills',
    icon: 'code-2',
    skills: [
      { icon: 'hash', label: 'C# and .NET Framework' },
      { icon: 'crab', label: 'Rust & Tauri' },
      { icon: 'cloud', label: 'AWS' },
      { icon: 'trending-down', label: 'FinOps' },
      { icon: 'container', label: 'Docker' },
      { icon: 'activity', label: 'Grafana' },
      { icon: 'shield-check', label: 'Cybersecurity Principles' },
    ],
  },
  {
    title: 'Soft Skills',
    icon: 'brain-circuit',
    skills: [
      { icon: 'zap', label: 'Autodidact' },
      { icon: 'gauge', label: 'Focus on Performance' },
      { icon: 'ear', label: 'Active Listener' },
      { icon: 'graduation-cap', label: 'Constant Learner' },
    ],
  },
];
