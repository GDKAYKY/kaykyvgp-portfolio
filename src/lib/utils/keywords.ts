export type Category =
  | "language"
  | "tool"
  | "framework"
  | "cloud"
  | "database"
  | "skill";

export interface KeywordEntry {
  pattern: RegExp;
  label: string;
}

export type KeywordDictionary = Record<Category, KeywordEntry[]>;

export const KEYWORD_DICTIONARY: KeywordDictionary = {
  language: [
    { pattern: /\bC#\b/gi, label: "C#" },
    { pattern: /\bC\+\+\b/gi, label: "C++" },
    { pattern: /\bRust\b/gi, label: "Rust" },
    { pattern: /\bJavaScript\b/gi, label: "JavaScript" },
    { pattern: /\bTypeScript\b/gi, label: "TypeScript" },
    { pattern: /\bPython\b/gi, label: "Python" },
    { pattern: /\bHTML5?\b/gi, label: "HTML5" },
    { pattern: /\bCSS3?\b/gi, label: "CSS3" },
    { pattern: /\bSQL\b/gi, label: "SQL" },
  ],
  framework: [
    { pattern: /\b\.NET\s*Framework\b/gi, label: ".NET Framework" },
    { pattern: /\b\.NET\b/gi, label: ".NET" },
    { pattern: /\bTauri\s*v?2?\b/gi, label: "Tauri" },
    { pattern: /\bSvelte\s*5?\b/gi, label: "Svelte 5" },
    { pattern: /\bSvelte\b/gi, label: "Svelte" },
    { pattern: /\bReact\b/gi, label: "React" },
    { pattern: /\bElectron\b/gi, label: "Electron" },
    { pattern: /\bQt\b/gi, label: "Qt" },
    { pattern: /\bNode\.js\b/gi, label: "Node.js" },
    { pattern: /\bVite\b/gi, label: "Vite" },
    { pattern: /\bTailwind\s*CSS\b/gi, label: "Tailwind CSS" },
    { pattern: /\bSvelteKit\b/gi, label: "SvelteKit" },
  ],
  tool: [
    { pattern: /\bDocker\b/gi, label: "Docker" },
    { pattern: /\bGrafana\b/gi, label: "Grafana" },
    { pattern: /\bGitHub\b/gi, label: "GitHub" },
    { pattern: /\bCargo\b/gi, label: "Cargo" },
    { pattern: /\bRust\s*Analyzer\b/gi, label: "Rust Analyzer" },
    { pattern: /\byt-dlp\b/gi, label: "yt-dlp" },
    { pattern: /\bFFmpeg\b/gi, label: "FFmpeg" },
    { pattern: /\bFfmpeg\b/gi, label: "Ffmpeg" },
    { pattern: /\baria2c\b/gi, label: "aria2c" },
    { pattern: /\bTokio\b/gi, label: "Tokio" },
    { pattern: /\bReqwest\b/gi, label: "Reqwest" },
    { pattern: /\bSerde\b/gi, label: "Serde" },
    { pattern: /\bIndexedDB\b/gi, label: "IndexedDB" },
    { pattern: /\bDexie\b/gi, label: "Dexie" },
    { pattern: /\bVisual\s*Studio\s*Code\b/gi, label: "Visual Studio Code" },
    { pattern: /\bVisual\s*Studio\b/gi, label: "Visual Studio" },
    { pattern: /\bDesign\s*System\b/gi, label: "Design System" },
    { pattern: /\bLlama\.cpp\b/gi, label: "Llama.cpp" },
  ],
  cloud: [
    { pattern: /\bAWS\s*SageMaker\b/gi, label: "AWS SageMaker" },
    { pattern: /\bSageMaker\b/gi, label: "AWS SageMaker" },
    { pattern: /\bAWS\s*Rekognition\b/gi, label: "AWS Rekognition" },
    { pattern: /\bRekognition\b/gi, label: "AWS Rekognition" },
    { pattern: /\bAWS\s*Comprehend\b/gi, label: "AWS Comprehend" },
    { pattern: /\bComprehend\b/gi, label: "AWS Comprehend" },
    { pattern: /\bAWS\s*EC2\b/gi, label: "AWS EC2" },
    { pattern: /\bEC2\b/gi, label: "AWS EC2" },
    { pattern: /\bAWS\s*ECS\b/gi, label: "AWS ECS" },
    { pattern: /\bECS\b/gi, label: "AWS ECS" },
    { pattern: /\bAWS\s*EKS\b/gi, label: "AWS EKS" },
    { pattern: /\bEKS\b/gi, label: "AWS EKS" },
    { pattern: /\bAWS\s*Lambda\b/gi, label: "AWS Lambda" },
    { pattern: /\bLambda\b/gi, label: "AWS Lambda" },
    {
      pattern: /\bElastic\s*Load\s*Balancing\b/gi,
      label: "Elastic Load Balancing",
    },
    { pattern: /\bAuto\s*Scaling\b/gi, label: "Auto Scaling" },
    { pattern: /\bContainer\s*services\b/gi, label: "Container Services" },
    { pattern: /\bServerless\s*computing\b/gi, label: "Serverless Computing" },
    { pattern: /\bAWS\b/gi, label: "AWS" },
    { pattern: /\bAmazon\s*Web\s*Services\b/gi, label: "AWS" },
    { pattern: /\bFinOps\b/gi, label: "FinOps" },
  ],
  database: [{ pattern: /\bIndexedDB\b/gi, label: "IndexedDB" }],
  skill: [
    { pattern: /\bMachine\s*Learning\b/gi, label: "Machine Learning" },
    {
      pattern: /\bArtificial\s*Intelligence\b/gi,
      label: "Artificial Intelligence",
    },
    { pattern: /\bAI\b/gi, label: "AI" },
    { pattern: /\bSupervised\s*learning\b/gi, label: "Supervised Learning" },
    {
      pattern: /\bUnsupervised\s*learning\b/gi,
      label: "Unsupervised Learning",
    },
    { pattern: /\bModel\s*Training\b/gi, label: "Model Training" },
    { pattern: /\bModel\s*Evaluation\b/gi, label: "Model Evaluation" },
    { pattern: /\bModel\s*deployment\b/gi, label: "Model Deployment" },
    { pattern: /\bCloud\s*ML\s*Services\b/gi, label: "Cloud ML Services" },
    { pattern: /\bData\s*Analysis\b/gi, label: "Data Analysis" },
    { pattern: /\bCloud\s*Computing\b/gi, label: "Cloud Computing" },
    {
      pattern: /\bInfrastructure\s*Management\b/gi,
      label: "Infrastructure Management",
    },
    { pattern: /\bCloud\s*infrastructure\b/gi, label: "Cloud Infrastructure" },
    { pattern: /\bCost\s*Optimization\b/gi, label: "Cost Optimization" },
    { pattern: /\bPerformance\s*tuning\b/gi, label: "Performance Tuning" },
    { pattern: /\bPerformance\b/gi, label: "Performance" },
    {
      pattern: /\bContainer\s*Orchestration\b/gi,
      label: "Container Orchestration",
    },
    {
      pattern: /\bServerless\s*Architecture\b/gi,
      label: "Serverless Architecture",
    },
    {
      pattern: /\bObject-Oriented\s*Programming\b/gi,
      label: "Object-Oriented Programming",
    },
    { pattern: /\bSoftware\s*Development\b/gi, label: "Software Development" },
    { pattern: /\bWeb\s*Development\b/gi, label: "Web Development" },
    { pattern: /\bDesktop\s*application\b/gi, label: "Desktop Application" },
    { pattern: /\bDebugging\b/gi, label: "Debugging" },
    { pattern: /\bUnit\s*Testing\b/gi, label: "Unit Testing" },
    { pattern: /\bCode\s*Quality\b/gi, label: "Code Quality" },
    { pattern: /\bClean\s*code\b/gi, label: "Clean Code" },
    { pattern: /\bBest\s*practices\b/gi, label: "Best Practices" },
    {
      pattern: /\bSoftware\s*Documentation\b/gi,
      label: "Software Documentation",
    },
    {
      pattern: /\bProgramming\s*Principles\b/gi,
      label: "Programming Principles",
    },
    { pattern: /\bTest\s*Case\b/gi, label: "Test Case" },
    {
      pattern: /\bPackage\s*and\s*Software\s*Management\b/gi,
      label: "Package and Software Management",
    },
    { pattern: /\bPackage\s*manager\b/gi, label: "Package Manager" },
    {
      pattern: /\bDevelopment\s*Environment\b/gi,
      label: "Development Environment",
    },
    { pattern: /\bData\s*Structures\b/gi, label: "Data Structures" },
    { pattern: /\bData\s*types\b/gi, label: "Data Types" },
    { pattern: /\bControl\s*structures\b/gi, label: "Control Structures" },
    { pattern: /\bSyntax\b/gi, label: "Syntax" },
    { pattern: /\bSystem\s*Programming\b/gi, label: "System Programming" },
    { pattern: /\bSoftware\s*Testing\b/gi, label: "Software Testing" },
    {
      pattern: /\bCybersecurity\s*Principles\b/gi,
      label: "Cybersecurity Principles",
    },
    { pattern: /\bSecurity\b/gi, label: "Security" },
    { pattern: /\bMemory\s*safety\b/gi, label: "Memory Safety" },
    { pattern: /\bOwnership\b/gi, label: "Ownership" },
    { pattern: /\bBorrowing\b/gi, label: "Borrowing" },
    { pattern: /\bError\s*handling\b/gi, label: "Error Handling" },
    { pattern: /\bPattern\s*matching\b/gi, label: "Pattern Matching" },
    {
      pattern: /\bConcurrent\s*programming\b/gi,
      label: "Concurrent Programming",
    },
    { pattern: /\bLoad\s*balancing\b/gi, label: "Load Balancing" },
    { pattern: /\bHigh-performance\b/gi, label: "High-Performance" },
    { pattern: /\bHigh-speed\b/gi, label: "High-Speed" },
    { pattern: /\bEfficiency\b/gi, label: "Efficiency" },
    { pattern: /\bResponsiveness\b/gi, label: "Responsiveness" },
    { pattern: /\bResponsive\b/gi, label: "Responsive" },
    { pattern: /\bOpen\s*Source\b/gi, label: "Open Source" },
    {
      pattern: /\bFree\s*and\s*open-source\b/gi,
      label: "Free and Open-Source",
    },
    { pattern: /\bBackend\b/gi, label: "Backend" },
    { pattern: /\bFrontend\b/gi, label: "Frontend" },
    { pattern: /\bUI\/UX\b/gi, label: "UI/UX" },
    { pattern: /\bInterface\b/gi, label: "Interface" },
    { pattern: /\bAPI\b/gi, label: "API" },
    { pattern: /\bREST\b/gi, label: "REST" },
    { pattern: /\bScalability\b/gi, label: "Scalability" },
    { pattern: /\bScalable\b/gi, label: "Scalable" },
    { pattern: /\bReliability\b/gi, label: "Reliability" },
    { pattern: /\bReliable\b/gi, label: "Reliable" },
    { pattern: /\bRobust\b/gi, label: "Robust" },
    { pattern: /\bMaintainability\b/gi, label: "Maintainability" },
    { pattern: /\bMaintainable\b/gi, label: "Maintainable" },
    { pattern: /\bArchitecture\b/gi, label: "Architecture" },
    { pattern: /\bWorkflow\b/gi, label: "Workflow" },
    { pattern: /\bAutodidact\b/gi, label: "Autodidact" },
    { pattern: /\bActive\s*Listener\b/gi, label: "Active Listener" },
    { pattern: /\bConstant\s*Learner\b/gi, label: "Constant Learner" },
    { pattern: /\bSelf-taught\b/gi, label: "Self-Taught" },
    { pattern: /\bState-of-the-art\b/gi, label: "State-of-the-Art" },
    { pattern: /\bModern\b/gi, label: "Modern" },
    { pattern: /\bPremium\b/gi, label: "Premium" },
    { pattern: /\bNative\b/gi, label: "Native" },
    { pattern: /\bCross-platform\b/gi, label: "Cross-Platform" },
    { pattern: /\bMulti-connection\b/gi, label: "Multi-Connection" },
    { pattern: /\bAesthetics\b/gi, label: "Aesthetics" },
    { pattern: /\bRuntime\b/gi, label: "Runtime" },
    { pattern: /\bEcosystem\b/gi, label: "Ecosystem" },
    { pattern: /\bGarbage\s*collection\b/gi, label: "Garbage Collection" },
    { pattern: /\bOptimization\b/gi, label: "Optimization" },
    { pattern: /\bFundamentals\b/gi, label: "Fundamentals" },
    { pattern: /\bCore\s*concepts\b/gi, label: "Core Concepts" },
    { pattern: /\bStrategies\b/gi, label: "Strategies" },
    { pattern: /\bTechniques\b/gi, label: "Techniques" },
    { pattern: /\bUtility\b/gi, label: "Utility" },
    { pattern: /\bDownloader\b/gi, label: "Downloader" },
    { pattern: /\bPortfolio\b/gi, label: "Portfolio" },
    { pattern: /\bManaging\b/gi, label: "Managing" },
    { pattern: /\bRunning\b/gi, label: "Running" },
    { pattern: /\bLocally\b/gi, label: "Locally" },
    { pattern: /\bIntegration\b/gi, label: "Integration" },
    { pattern: /\bVideo\b/gi, label: "Video" },
    { pattern: /\bAudio\b/gi, label: "Audio" },
    { pattern: /\bStreaming\b/gi, label: "Streaming" },
    { pattern: /\bDownloading\b/gi, label: "Downloading" },
    { pattern: /\bProcessing\b/gi, label: "Processing" },
    { pattern: /\bEncoding\b/gi, label: "Encoding" },
    { pattern: /\bDecoding\b/gi, label: "Decoding" },
    { pattern: /\bMultimedia\b/gi, label: "Multimedia" },
  ],
};

export interface IdentifiedKeywords {
  keywords: Record<Category, string[]>;
  allLabels: string[];
}

export function identifyKeywords(text: string): IdentifiedKeywords {
  const result: Record<Category, string[]> = {
    language: [],
    framework: [],
    tool: [],
    cloud: [],
    database: [],
    skill: [],
  };

  const allLabels: string[] = [];
  const seenLabels = new Set<string>();

  // Processar cada categoria
  for (const [category, entries] of Object.entries(KEYWORD_DICTIONARY) as [
    Category,
    KeywordEntry[],
  ][]) {
    for (const entry of entries) {
      if (entry.pattern.test(text)) {
        // Resetar o regex para próxima busca
        entry.pattern.lastIndex = 0;

        if (!seenLabels.has(entry.label)) {
          result[category].push(entry.label);
          allLabels.push(entry.label);
          seenLabels.add(entry.label);
        }
      }
    }
  }

  return { keywords: result, allLabels };
}
