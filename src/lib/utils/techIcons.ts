export const TECH_ICON_MAP: Record<string, string> = {
  "c#": "SiCsharp", dotnet: "SiDotnet", ".net": "SiDotnet", aws: "SiAmazonaws",
  docker: "SiDocker", electron: "SiElectron", nodejs: "SiNodedotjs", "node.js": "SiNodedotjs",
  javascript: "SiJavascript", js: "SiJavascript", html5: "SiHtml5", html: "SiHtml5",
  mcp: "SiModelcontextprotocol", css3: "SiCss3", css: "SiCss3", postgresql: "SiPostgresql",
  postgres: "SiPostgresql", grafana: "SiGrafana", redis: "SiRedis", ffmpeg: "SiFfmpeg",
  git: "SiGit", github: "SiGithub", "yt-dlp": "SiGithub", ytdlp: "SiGithub", aria2c: "SiGithub",
  aria2: "SiGithub", typescript: "SiTypescript", ts: "SiTypescript", react: "SiReact", svelte: "SiSvelte",
  rust: "SiRust", tauri: "SiTauri", "tauri v2": "SiTauri", vite: "SiVite", tailwind: "SiTailwindcss",
  tailwindcss: "SiTailwindcss", "tailwind css": "SiTailwindcss", "tailwind css v4": "SiTailwindcss",
  "svelte 5": "SiSvelte", tokio: "SiTokio", reqwest: "SiRust", serde: "SiRust", indexeddb: "SiDatabricks",
  "indexed db": "SiDatabricks", dexie: "SiOpenlayers", vitest: "SiVitest", lucide: "SiLucide",
  "nvidia smi": "SiNvidia", "nvidia-smi": "SiNvidia", "llama.cpp": "SiOpenai", llama: "SiOpenai", ollama: "SiOllama",
};

export function getTechIconName(name: string): string {
  return TECH_ICON_MAP[name.trim().toLowerCase()] || "SiGithub";
}
