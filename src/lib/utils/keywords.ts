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
    { pattern: /C#/gi, label: "C#" },
    { pattern: /C\+\+/gi, label: "C++" },
    { pattern: /\bRust\b/gi, label: "Rust" },
    { pattern: /\bJava\b/gi, label: "Java" },
    { pattern: /\bJavaScript\b/gi, label: "JavaScript" },
    { pattern: /\bTypeScript\b/gi, label: "TypeScript" },
    { pattern: /\bPython\b/gi, label: "Python" },
    { pattern: /\bHTML5?\b/gi, label: "HTML5" },
    { pattern: /\bCSS3?\b/gi, label: "CSS3" },
    { pattern: /\bSQL\b/gi, label: "SQL" },
  ],
  framework: [
    { pattern: /\.NET\s*Framework/gi, label: ".NET" },
    { pattern: /\.NET/gi, label: ".NET" },
    { pattern: /\bTauri\s*v?2?\b/gi, label: "Tauri" },
    { pattern: /\bTauri\s*2\b/gi, label: "Tauri" },
    { pattern: /\bQuarkus\b/gi, label: "Quarkus" },
    { pattern: /\bSvelte\s*5\b/gi, label: "Svelte" },
    { pattern: /\bSvelte\b/gi, label: "Svelte" },
    { pattern: /\bReact\b/gi, label: "React" },
    { pattern: /\bElectron\b/gi, label: "Electron" },
    { pattern: /\bQt\b/gi, label: "Qt" },
    { pattern: /Node\.js/gi, label: "Node.js" },
    { pattern: /\bVite\b/gi, label: "Vite" },
    { pattern: /\bTailwind\s*CSS\s*v?4?\b/gi, label: "Tailwind CSS" },
    { pattern: /\bTailwind\b/gi, label: "Tailwind CSS" },
    { pattern: /\bSvelteKit\b/gi, label: "SvelteKit" },
    { pattern: /\bFastAPI\b/gi, label: "FastAPI" },
    { pattern: /\bPydantic\b/gi, label: "Pydantic" },
  ],
  tool: [
    { pattern: /\bDocker\b/gi, label: "Docker" },
    { pattern: /\bGrafana\b/gi, label: "Grafana" },
    { pattern: /\bGitHub\b/gi, label: "GitHub" },
    { pattern: /\bGit\b/gi, label: "Git" },
    { pattern: /\bCargo\b/gi, label: "Cargo" },
    { pattern: /\bRust\s*Analyzer\b/gi, label: "Rust Analyzer" },
    { pattern: /\byt-dlp\b/gi, label: "yt-dlp" },
    { pattern: /\bFFmpeg\b/gi, label: "FFmpeg" },
    { pattern: /\bFfmpeg\b/gi, label: "FFmpeg" },
    { pattern: /\baria2c\b/gi, label: "aria2" },
    { pattern: /\baria2\b/gi, label: "aria2" },
    { pattern: /\bTokio\b/gi, label: "Tokio" },
    { pattern: /\bReqwest\b/gi, label: "Reqwest" },
    { pattern: /\bSerde\b/gi, label: "Serde" },
    { pattern: /\bDexie\b/gi, label: "Dexie" },
    { pattern: /\bVitest\b/gi, label: "Vitest" },
    { pattern: /\bLucide\b/gi, label: "Lucide" },
    { pattern: /\bVisual\s*Studio\s*Code\b/gi, label: "Visual Studio Code" },
    { pattern: /\bVisual\s*Studio\b/gi, label: "Visual Studio" },
    { pattern: /Llama\.cpp/gi, label: "Llama.cpp" },
    { pattern: /\bOllama\b/gi, label: "Ollama" },
    { pattern: /\bMCP\b/gi, label: "MCP" },
    { pattern: /\bModel\s*Context\s*Protocol\b/gi, label: "MCP" },
    { pattern: /\bNVIDIA\s*SMI\b/gi, label: "NVIDIA SMI" },
  ],
  cloud: [
    { pattern: /\bAWS\s*SageMaker\b/gi, label: "SageMaker" },
    { pattern: /\bSageMaker\b/gi, label: "SageMaker" },
    { pattern: /\bAWS\s*Rekognition\b/gi, label: "Rekognition" },
    { pattern: /\bRekognition\b/gi, label: "Rekognition" },
    { pattern: /\bAWS\s*Comprehend\b/gi, label: "Comprehend" },
    { pattern: /\bComprehend\b/gi, label: "Comprehend" },
    { pattern: /\bAWS\s*EC2\b/gi, label: "EC2" },
    { pattern: /\bEC2\b/gi, label: "EC2" },
    { pattern: /\bAWS\s*ECS\b/gi, label: "ECS" },
    { pattern: /\bECS\b/gi, label: "ECS" },
    { pattern: /\bAWS\s*EKS\b/gi, label: "EKS" },
    { pattern: /\bEKS\b/gi, label: "EKS" },
    { pattern: /\bAWS\s*Lambda\b/gi, label: "Lambda" },
    { pattern: /\bLambda\b/gi, label: "Lambda" },
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
    { pattern: /\bTerraform\b/gi, label: "Terraform" },
  ],
  database: [
    { pattern: /\bPostgreSQL\b/gi, label: "PostgreSQL" },
    { pattern: /\bPostgres\b/gi, label: "PostgreSQL" },
    { pattern: /\bIndexedDB\b/gi, label: "IndexedDB" },
    { pattern: /\bSQLite\b/gi, label: "SQLite" },
    { pattern: /\bRedis\b/gi, label: "Redis" },
    { pattern: /\bSQLAlchemy\b/gi, label: "SQLAlchemy" },
  ],
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
    { pattern: /\bPerformance\s*[Tt]uning\b/gi, label: "Performance Tuning" },
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
    { pattern: /\bOOP\b/gi, label: "Object-Oriented Programming" },
    { pattern: /\bSoftware\s*Development\b/gi, label: "Software Development" },
    { pattern: /\bWeb\s*Development\b/gi, label: "Web Development" },
    { pattern: /\bDesktop\s*[Aa]pplication\b/gi, label: "Desktop Application" },
    { pattern: /\bDebugging\b/gi, label: "Debugging" },
    { pattern: /\bUnit\s*Testing\b/gi, label: "Unit Testing" },
    { pattern: /\bMemory\s*[Ss]afety\b/gi, label: "Memory Safety" },
    { pattern: /\bOwnership\b/gi, label: "Ownership" },
    { pattern: /\bBorrowing\b/gi, label: "Borrowing" },
    { pattern: /\bError\s*[Hh]andling\b/gi, label: "Error Handling" },
    { pattern: /\bPattern\s*[Mm]atching\b/gi, label: "Pattern Matching" },
    {
      pattern: /\bConcurrent\s*programming\b/gi,
      label: "Concurrent Programming",
    },
    {
      pattern: /\bAsynchronous\s*programming\b/gi,
      label: "Asynchronous Programming",
    },
    { pattern: /\bMultithreading\b/gi, label: "Multithreading" },
    { pattern: /\bOpen\s*Source\b/gi, label: "Open Source" },
    { pattern: /\bBackend\b/gi, label: "Backend" },
    { pattern: /\bFrontend\b/gi, label: "Frontend" },
    { pattern: /\bUI\/UX\b/gi, label: "UI/UX" },
    { pattern: /\bAPI\b/gi, label: "API" },
    { pattern: /\bDesign\s*System\b/gi, label: "Design System" },
    { pattern: /\bResponsive\s*Design\b/gi, label: "Responsive Design" },
    { pattern: /\bAccessibility\b/gi, label: "Accessibility" },
    { pattern: /\bLoad\s*[Bb]alancing\b/gi, label: "Load Balancing" },
    {
      pattern: /\bCybersecurity\s*Principles\b/gi,
      label: "Cybersecurity Principles",
    },
    { pattern: /\bCybersecurity\b/gi, label: "Cybersecurity" },
    { pattern: /\bAutodidact\b/gi, label: "Autodidact" },
    { pattern: /\bActive\s*Listener\b/gi, label: "Active Listener" },
    { pattern: /\bConstant\s*Learner\b/gi, label: "Constant Learner" },
    {
      pattern: /\bFocus\s*on\s*Performance\b/gi,
      label: "Focus on Performance",
    },
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

  for (const [category, entries] of Object.entries(KEYWORD_DICTIONARY) as [
    Category,
    KeywordEntry[],
  ][]) {
    for (const entry of entries) {
      if (entry.pattern.test(text)) {
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
