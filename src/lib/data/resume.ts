import type {
  Experience,
  Certification,
  Education,
  SkillsColumn,
} from "$lib/types/resume";

export const EXPERIENCES: Experience[] = [
  {
    company: "Who",
    logo: "/assets/logos/who_logo.jpeg",
    position: "Software Developer as Junior Apprentice",
    location: "Belo Horizonte, Minas Gerais, Brazil",
    period: "Dec 2024 – Dec 2025 (1 Year)",
    description: [
      "Developed,maintained and optimized Fintech Antifraud workflows and systems in an AWS Cloud Environment using C# and .NET, JavaScript and TypeScript",
      "Developed manual AntiFraud workflows on proprietary systems, later automating them via Orcheon, for clients including Itaú, C6 Bank, Banco Inter, and Banco Mercantil",
    ],
    technologies: [
      "C#",
      ".NET",
      "JavaScript",
      "TypeScript",
      "Angular",
      "Node.js",
      "AWS",
      "AWS CloudWatch",
      "AWS S3",
      "AWS Lambda",
      "Azure DevOps",
      "Docker",
      "Grafana",
      "Kanban",
      "SonarQube",
      "Bizagi Modeler",
      "Git",
      "GitFlow",
    ],
    projects: [
      "High-performance backend systems",
      "Cloud infrastructure optimization",
    ],
    about:
      "At Who, I worked across backend development and cloud infrastructure my biggest accomplishment was when i using AWS CloudWatch Managed to identify Base64 images and videos being logged and remove them saving about $400/month in AWS costs.",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_400_400/B4EZmhegXHGcAc-/0/1759350753990/google_logo?e=1791417600&v=beta&t=GTDF9ditvQyD6OKKw71ld2OnNPkdUhh2BBpAenYJ6o4",
    issuer: "Google Cloud",
    issuerLogo:
      "https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_400_400/B4EZmhegXHGcAc-/0/1759350753990/google_logo?e=1791417600&v=beta&t=GTDF9ditvQyD6OKKw71ld2OnNPkdUhh2BBpAenYJ6o4",
    date: "April 2026",
    skills: [
      "Cloud computing overview & Google Cloud basics",
      "Compute options (VMs, containers, serverless)",
      "IaaS, PaaS & SaaS concepts",
    ],
    skillsGained: ["Cloud Computing", "Google Cloud Platform"],
    tools: ["Google Cloud", "Cloud Skills Boost"],
    about:
      "The first course in the Google Cloud Computing Foundations series, providing an overview of cloud computing, the different ways to use Google Cloud, and the various compute options available on the platform. Designed for learners with little to no prior background in cloud computing.",
    credentialUrl:
      "https://www.skills.google/public_profiles/20bd2b89-5e87-42ce-b0bd-5c6e3ba5c075/badges/23863601",
  },
  {
    title: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_400_400/B4EZmhegXHGcAc-/0/1759350753990/google_logo?e=1791417600&v=beta&t=GTDF9ditvQyD6OKKw71ld2OnNPkdUhh2BBpAenYJ6o4",
    issuer: "Google Cloud",
    issuerLogo:
      "https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_400_400/B4EZmhegXHGcAc-/0/1759350753990/google_logo?e=1791417600&v=beta&t=GTDF9ditvQyD6OKKw71ld2OnNPkdUhh2BBpAenYJ6o4",
    date: "April 2026",
    skills: [
      "Virtual machines & Compute Engine",
      "Storage options (Cloud Storage, databases)",
      "Elastic application infrastructure",
    ],
    skillsGained: [
      "Google Compute Engine",
      "Cloud Infrastructure",
      "Cloud Storage",
    ],
    tools: ["Google Cloud", "Compute Engine", "Cloud Storage"],
    about:
      "The second course in the Google Cloud Computing Foundations series, covering how to build and manage compute and storage infrastructure on Google Cloud, including virtual machines and elastic applications.",
    credentialUrl:
      "https://www.skills.google/public_profiles/20bd2b89-5e87-42ce-b0bd-5c6e3ba5c075/badges/23865716",
  },
  {
    title:
      "Google Cloud Computing Foundations: Networking & Security in Google Cloud",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_400_400/B4EZmhegXHGcAc-/0/1759350753990/google_logo?e=1791417600&v=beta&t=GTDF9ditvQyD6OKKw71ld2OnNPkdUhh2BBpAenYJ6o4",
    issuer: "Google Cloud",
    issuerLogo:
      "https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_400_400/B4EZmhegXHGcAc-/0/1759350753990/google_logo?e=1791417600&v=beta&t=GTDF9ditvQyD6OKKw71ld2OnNPkdUhh2BBpAenYJ6o4",
    date: "June 2026",
    skills: [
      "Cloud automation & management tools",
      "Building & securing networks on Google Cloud",
      "Scaling applications across networking resources",
    ],
    skillsGained: [
      "Cloud Networking",
      "Cloud Security",
      "Google Cloud Platform",
    ],
    tools: ["Google Cloud", "VPC", "Cloud IAM"],
    about:
      "The third course in the Google Cloud Computing Foundations series, covering cloud automation and management tools along with the networking-related resources needed to build, scale, and secure applications on Google Cloud.",
    credentialUrl:
      "https://www.skills.google/public_profiles/20bd2b89-5e87-42ce-b0bd-5c6e3ba5c075/badges/24638133",
  },
  {
    title: "Learn to Program in Java with Object-Oriented Programming",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQEhtn30GMJekQ/company-logo_400_400/B4EZ5mb_4jJAAU-/0/1779835076346/aluracursos_logo?e=1791417600&v=beta&t=qiW-VTIAYvoJXx1lr4-9jV1XcCaOjY1fiWrJuNBAhqo",
    issuer: "Alura",
    issuerLogo:
      "https://media.licdn.com/dms/image/v2/D4E0BAQEhtn30GMJekQ/company-logo_400_400/B4EZ5mb_4jJAAU-/0/1779835076346/aluracursos_logo?e=1791417600&v=beta&t=qiW-VTIAYvoJXx1lr4-9jV1XcCaOjY1fiWrJuNBAhqo",
    date: "May–Jun 2026",
    skills: [
      "Java fundamentals (variables, control flow, loops)",
      "Object-Oriented Programming (classes, inheritance, interfaces)",
      "List manipulation, API consumption, and exception handling",
    ],
    skillsGained: [
      "Java",
      "Object-Oriented Programming",
      "API Consumption",
      "Exception Handling",
    ],
    tools: ["Java"],
    about:
      "A complete learning path for starting a career in Java programming, covering the language from its fundamentals and best practices through to essential object-oriented modeling skills. The track is structured in three steps: understanding the Java language itself (variables, control flow, and loops); object-oriented programming, including classes, inheritance, and interfaces for writing efficient, organized code; and more advanced skills such as manipulating lists of objects, consuming external APIs to load JSON data, saving it to files, and handling exceptions in Java projects.",
    credentialUrl: "https://cursos.alura.com.br/app/learning-guide/alura/java",
  },
  {
    title: "Building A Brain in 10 Minutes",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEf6Z_LQLkFpw/company-logo_400_400/B56ZsKXL22G4AY-/0/1765405409209/nvidia_deep_learning_institute_logo?e=1791417600&v=beta&t=9-yJt3SXqG9gufwnbtPE8p6PNsPm9PLBgbjONczgt1Q",
    issuer: "NVIDIA Deep Learning Institute",
    issuerLogo:
      "https://media.licdn.com/dms/image/v2/D560BAQEf6Z_LQLkFpw/company-logo_400_400/B56ZsKXL22G4AY-/0/1765405409209/nvidia_deep_learning_institute_logo?e=1791417600&v=beta&t=9-yJt3SXqG9gufwnbtPE8p6PNsPm9PLBgbjONczgt1Q",
    date: "April 2026",
    skills: [
      "Neural network fundamentals",
      "Math behind a single neuron",
      "How networks learn from data",
    ],
    skillsGained: ["Fine-Tuning", "Artificial Intelligence"],
    tools: ["NVIDIA DLI", "Python", "Jupyter Notebook"],
    about:
      "A hands-on notebook exploring the biological and psychological inspirations behind the first neural networks. It covers how neural networks use data to learn and breaks down the math behind an individual neuron.",
    credentialUrl: "",
  },
  {
    title: "Generative AI Explained",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEf6Z_LQLkFpw/company-logo_400_400/B56ZsKXL22G4AY-/0/1765405409209/nvidia_deep_learning_institute_logo?e=1791417600&v=beta&t=9-yJt3SXqG9gufwnbtPE8p6PNsPm9PLBgbjONczgt1Q",
    issuer: "NVIDIA Deep Learning Institute",
    issuerLogo:
      "https://media.licdn.com/dms/image/v2/D560BAQEf6Z_LQLkFpw/company-logo_400_400/B56ZsKXL22G4AY-/0/1765405409209/nvidia_deep_learning_institute_logo?e=1791417600&v=beta&t=9-yJt3SXqG9gufwnbtPE8p6PNsPm9PLBgbjONczgt1Q",
    date: "April 2026",
    skills: [
      "Generative AI concepts & how it works",
      "Real-world generative AI applications",
      "Challenges & opportunities in generative AI",
    ],
    skillsGained: ["General AI", "Artificial Intelligence", "Generative AI"],
    tools: ["NVIDIA DLI"],
    about:
      "A no-code introduction to generative AI, covering what it is, how it works, common real-world applications, and the challenges and opportunities shaping the field.",
    credentialUrl: "",
  },
  {
    title: "An Even Easier Introduction to CUDA",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEf6Z_LQLkFpw/company-logo_400_400/B56ZsKXL22G4AY-/0/1765405409209/nvidia_deep_learning_institute_logo?e=1791417600&v=beta&t=9-yJt3SXqG9gufwnbtPE8p6PNsPm9PLBgbjONczgt1Q",
    issuer: "NVIDIA Deep Learning Institute",
    issuerLogo:
      "https://media.licdn.com/dms/image/v2/D560BAQEf6Z_LQLkFpw/company-logo_400_400/B56ZsKXL22G4AY-/0/1765405409209/nvidia_deep_learning_institute_logo?e=1791417600&v=beta&t=9-yJt3SXqG9gufwnbtPE8p6PNsPm9PLBgbjONczgt1Q",
    date: "March 2026",
    skills: [
      "Writing parallel CUDA kernels",
      "CPU-GPU memory management",
      "Profiling CUDA code for performance",
    ],
    skillsGained: ["CUDA", "C++", "Parallel Computing"],
    tools: ["NVIDIA DLI", "CUDA", "C++"],
    about:
      "Covers the basics of writing parallel CUDA kernels to run on NVIDIA GPUs — launching massively parallel kernels, organizing parallel thread execution for large datasets, managing memory between CPU and GPU, and profiling code to observe performance gains.",
    credentialUrl: "",
  },
  {
    title: "GitHub Foundations",
    logo: "https://learn.microsoft.com/en-us/media/learn/certification/badges/github-foundations.svg",
    issuer: "Microsoft",
    issuerLogo: "/assets/logos/microsoft_logo.jpeg",
    date: "2026",
    skills: [
      "Git & Gitflow (commits, branches, pull requests)",
      "Repository management & security best practices",
      "GitHub Copilot & Codespaces",
    ],
    skillsGained: [
      "GitHub",
      "Git",
      "Version Control",
      "GitHub Copilot",
      "Repository Management",
    ],
    tools: ["Microsoft Learn", "GitHub", "GitHub Copilot", "GitHub Codespaces"],
    about:
      "This course covers the fundamental concepts, features, and products of GitHub — repository management, commits, branches, and merging — along with GitHub Copilot, Codespaces, Projects, and Markdown. It also includes maintaining secure repositories, GitHub administration, authentication, and managing changes through pull requests.",
    credentialUrl: "",
  },
  {
    title: "Introduction to AI on Azure",
    logo: "https://learn.microsoft.com/pt-br/media/learn/instructor-led-badge.svg",
    issuer: "Microsoft",
    issuerLogo: "/assets/logos/microsoft_logo.jpeg",
    date: "April 2026",
    skills: [
      "Responsible AI principles",
      "Common AI workload characteristics",
      "Computer vision & NLP fundamentals",
    ],
    skillsGained: [
      "Artificial Intelligence",
      "Machine Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Responsible AI",
    ],
    tools: ["Microsoft Learn", "Azure"],
    about:
      "This course covers foundational AI and machine learning concepts, including anomaly detection, natural language processing, and computer vision, along with the principles of responsible AI and data ethics. It's part of Microsoft's introductory path for identifying and applying AI workloads on Azure.",
    credentialUrl:
      "https://learn.microsoft.com/pt-br/users/kaykyvgp/achievements/q5q4bh3e",
  },
  {
    title: "Machine Learning Foundations",
    logo: "/assets/logos/aws_machine_learning_logo.png",
    issuer: "Amazon Web Services",
    issuerLogo: "/assets/logos/aws_logo.jpeg",
    date: "November 2025",
    skills: [
      "Machine Learning fundamentals and core concepts",
      "AWS ML services and tools (SageMaker, Rekognition, Comprehend)",
      "Model training, evaluation, and deployment strategies",
      "Supervised and unsupervised learning techniques",
    ],
    skillsGained: [
      "Machine Learning",
      "Model Training",
      "Model Evaluation",
      "Cloud ML Services",
      "Data Analysis",
    ],
    tools: ["AWS SageMaker", "AWS Rekognition", "AWS Comprehend", "Python"],
    about:
      "A foundation in machine learning concepts and the AWS services used to train, evaluate, and deploy practical models.",
    credentialUrl:
      "https://www.credly.com/badges/f8f39b6e-90ce-4304-af14-3d2658f4c74b/linked_in_profile",
  },
  {
    title: "Getting Started with Compute",
    logo: "/assets/logos/aws_compute_logo.png",
    issuer: "Amazon Web Services",
    issuerLogo: "/assets/logos/aws_logo.jpeg",
    date: "October 2025",
    skills: [
      "AWS EC2 instances and compute options",
      "Auto Scaling and load balancing strategies",
      "Container services (ECS, EKS) and serverless computing (Lambda)",
      "Cost optimization and performance tuning for compute resources",
    ],
    skillsGained: [
      "Cloud Computing",
      "Infrastructure Management",
      "Cost Optimization",
      "Container Orchestration",
      "Serverless Architecture",
    ],
    tools: [
      "AWS EC2",
      "AWS ECS",
      "AWS EKS",
      "AWS Lambda",
      "Elastic Load Balancing",
    ],
    about:
      "An introduction to AWS compute choices, from virtual machines and containers to serverless workloads, with attention to scaling and cost.",
    credentialUrl:
      "https://www.credly.com/badges/faabda17-42b4-4e3f-b027-47158c9b41b0",
  },
  {
    title: "Foundational C# with Microsoft",
    logo: "https://learn.microsoft.com/en-us/training/achievements/get-started-c-sharp-part-1.svg",
    issuer: "Microsoft",
    issuerLogo: "/assets/logos/microsoft_logo.jpeg",
    date: "October 2025",
    skills: [
      "C# syntax, data types, and control structures",
      "Object-oriented programming principles",
      ".NET runtime and framework fundamentals",
      "Debugging, testing, and best practices in C# development",
    ],
    skillsGained: [
      "Object-Oriented Programming",
      "Software Development",
      "Debugging",
      "Unit Testing",
      "Code Quality",
    ],
    tools: ["C#", ".NET Framework", "Visual Studio", "Visual Studio Code"],
    about:
      "A practical introduction to C# and the .NET ecosystem, covering core syntax, object-oriented programming, debugging, and testing.",
    credentialUrl:
      "https://freecodecamp.org/certification/fcc-ed711c85-4ef5-459c-8a5e-7a6e3106d87b/foundational-c-sharp-with-microsoft",
  },
  {
    title: "Rust Fundamentals",
    logo: "/assets/logos/coursera_logo.png",
    issuer: "Duke University",
    issuerLogo: "/assets/logos/duke_logo.png",
    date: "April 2026",
    skills: [
      "Rust syntax, ownership, and borrowing concepts",
      "Memory safety without garbage collection",
      "Cargo package manager and the Rust ecosystem",
      "Error handling, pattern matching, and concurrent programming",
    ],
    skillsGained: [
      "Software Documentation",
      "Programming Principles",
      "Test Case",
      "Package and Software Management",
      "Development Environment",
      "Data Structures",
      "Debugging",
      "System Programming",
      "Software Testing",
    ],
    tools: ["Rust (Programming Language)", "GitHub", "Cargo", "Rust Analyzer"],
    about:
      "A grounding in Rust fundamentals, including ownership, borrowing, error handling, data structures, and the Cargo development workflow.",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/records/SZAJYL33TBJS",
  },
];

export const EDUCATION: Education[] = [
  {
    institution: "FUNEC - Fundação de Ensino de Contagem",
    logo: "/assets/logos/funec_logo.png",
    degree: "High School",
    period: "January 2022 – December 2025",
  },
];

export const SKILLS_COLUMNS: SkillsColumn[] = [
  {
    title: "Hard Skills",
    icon: "code-2",
    skills: [
      { icon: "hash", label: "C# and .NET Framework" },
      { icon: "crab", label: "Rust & Tauri" },
      { icon: "cloud", label: "AWS" },
      { icon: "trending-down", label: "FinOps" },
      { icon: "container", label: "Docker" },
      { icon: "activity", label: "Grafana" },
      { icon: "shield-check", label: "Cybersecurity Principles" },
    ],
  },
  {
    title: "Soft Skills",
    icon: "brain-circuit",
    skills: [
      { icon: "zap", label: "Autodidact" },
      { icon: "gauge", label: "Focus on Performance" },
      { icon: "ear", label: "Active Listener" },
      { icon: "graduation-cap", label: "Constant Learner" },
    ],
  },
];
