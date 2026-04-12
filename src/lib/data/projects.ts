import type { Project } from '$lib/types';

export const PROJECTS: Project[] = [
  {
    slug: 'llama-cpp-desktop',
    title: 'Llama.cpp Desktop',
    type: 'AI Desktop Utility',
    description:
      'A premium Tauri-based desktop application for managing and running Llama.cpp models locally with a state-of-the-art interface. Features high-performance Rust backend and a sleek Svelte 5 frontend.',
    image: '/assets/llama_cpp_desktop_mockup.png',
    imageAlt: 'Llama Desktop Chat Interface',
    link: '/projects/llama-cpp-desktop',
    github: 'https://github.com/GDKAYKY/llama.cpp-desktop',
    tags: 'Tauri v2,Rust,Tokio,Reqwest,Serde,Svelte 5,TypeScript,Vite,Tailwind CSS,IndexedDB,Dexie',
    categories: ['AI', 'Desktop', 'Rust'],
    date: '2024-01-30',
  },
  {
    slug: 'ytdln-open',
    title: 'YTDLN-OPEN',
    type: 'Open Source Utility',
    description:
      'A free and open-source desktop video/audio downloader powered by yt-dlp, ffmpeg, Electron, and React. Supports downloading from over 1000 websites with a clean, state-of-the-art interface and high-speed multi-connection transfers.',
    image: '/assets/ytdln_mockup.png',
    imageAlt: 'YTDLN-OPEN Interface',
    link: '/projects/ytdln-open',
    github: 'https://github.com/GDKAYKY/ytdln-open',
    tags: 'Electron,Node.js,yt-dlp,HTML5,CSS3,JavaScript,Ffmpeg,aria2c',
    categories: ['Open Source', 'Desktop'],
    date: '2024-01-15',
  },
  {
    slug: 'span-core',
    title: 'SPAN-CORE',
    type: 'Desktop Utility',
    description:
      'A high-performance video downloading engine built with C++ and Qt. Native desktop experience with full yt-dlp support and FFmpeg integration.',
    image: '/assets/ytdln_mockup.png',
    imageAlt: 'SPAN-CORE Interface',
    link: '/projects/span-core',
    github: 'https://github.com/GDKAYKY/span-core',
    tags: 'C++,Qt,yt-dlp,FFmpeg',
    categories: ['Desktop', 'C++'],
    date: '2023-12-01',
  },
  {
    slug: 'portfolio',
    title: 'Personal Portfolio',
    type: 'Web Development',
    description:
      'A modern, high-performance portfolio website designed to showcase my skills and projects. Built with a focus on aesthetics, responsiveness, and clean code using Svelte.',
    link: '/projects/portfolio',
    github: 'https://github.com/GDKAYKY/kaykyvgp-portfolio',
    tags: 'Svelte,TypeScript,Design System',
    categories: ['Web'],
    date: '2023-11-20',
  },
];

export const EXTRA_TECHS = [
  'Svelte',
  'TypeScript',
  'Vite',
  'Qt',
  'Ffmpeg',
  'Electron',
];
