# kaykyvgp-portfolio

Modern portfolio website built with SvelteKit, following clean architecture principles with reusable components.

## 📦 Reusable Architecture

This project is structured to be highly modular and reusable. The `lib/` directory exports all components, pages, types, and data that can be imported throughout the project or even in other projects.

### Using Components and Pages

All exports are available from `$lib`:

```typescript
// Import page components
import { Home, Projects, LlamaCppDesktop } from '$lib';

// Import UI components
import { ProjectCard, TechStrip, Icon, Header, Footer } from '$lib';

// Import types
import type { Project, Technology, ProjectMetrics } from '$lib';

// Import data
import { PROJECTS, EXTRA_TECHS } from '$lib';
```

### Project Structure

```
src/
├── lib/                    # Reusable module (exported via $lib)
│   ├── components/         # UI components
│   ├── pages/              # Page components (presentation logic)
│   │   ├── Home.svelte
│   │   ├── Projects.svelte
│   │   └── projects/       # Project detail pages
│   ├── types/              # TypeScript definitions
│   │   ├── index.ts
│   │   └── project.ts
│   ├── data/               # Centralized data
│   │   ├── index.ts
│   │   └── projects.ts
│   └── index.ts            # Main export file
│
└── routes/                 # SvelteKit routing (thin wrappers)
    ├── +layout.svelte
    ├── +page.svelte
    └── projects/
        ├── +page.server.ts # Server-side data loading
        └── [slug]/         # Dynamic routes
```

## 🏗️ Architecture Pattern

This project follows the **llama.cpp-desktop pattern** with enhancements:

### 1. Routes (Thin Wrappers)
Routes handle routing and server-side data loading:

```svelte
<!-- routes/projects/+page.svelte -->
<script lang="ts">
  import { Projects } from '$lib';
  import type { PageData } from './$types';
  
  let { data }: { data: PageData } = $props();
</script>

<Projects projects={data.projects} />
```

### 2. Server-Side Loading
Data is loaded on the server for optimal performance:

```typescript
// routes/projects/+page.server.ts
import { PROJECTS } from '$lib';

export const load = async () => {
  return { projects: PROJECTS };
};
```

### 3. Pages (Presentation Logic)
Page components receive data via props:

```svelte
<!-- lib/pages/Projects.svelte -->
<script lang="ts">
  import type { Project } from '$lib/types';
  
  interface Props {
    projects: Project[];
  }
  
  let { projects }: Props = $props();
</script>
```

### 4. Centralized Data
Single source of truth for all content:

```typescript
// lib/data/projects.ts
export const PROJECTS: Project[] = [
  {
    slug: 'llama-cpp-desktop',
    title: 'Llama.cpp Desktop',
    // ...
  }
];
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Key Features

- ✅ **Type-safe**: Full TypeScript support with exported types
- ✅ **Server-side rendering**: Optimized for SEO and performance
- ✅ **Component-based**: Modular, reusable architecture
- ✅ **Data-driven**: Centralized data management in `lib/data/`
- ✅ **Clean architecture**: Clear separation of concerns
- ✅ **Dynamic routing**: Uses SvelteKit's `[slug]` pattern
- ✅ **Reusable exports**: Everything exported from `$lib`

## 🔧 Adding New Content

### Adding a New Project

1. Add project data to `lib/data/projects.ts`:
```typescript
{
  slug: 'my-project',
  title: 'My Project',
  type: 'Web Development',
  description: '...',
  // ...
}
```

2. Create page component in `lib/pages/projects/MyProject.svelte`

3. Export from `lib/index.ts`:
```typescript
export { default as MyProject } from './pages/projects/MyProject.svelte';
```

4. Add to component map in `routes/projects/[slug]/+page.svelte`:
```typescript
const componentMap = {
  'my-project': MyProject,
  // ...
};
```

That's it! The dynamic route will handle the rest.

## 📖 Documentation

### Available Exports

**Page Components:**
- `Home` - Homepage component
- `Projects` - Projects listing page
- `LlamaCppDesktop`, `YtdlnOpen`, `SpanCore`, `Portfolio` - Project detail pages

**UI Components:**
- `Header`, `Footer` - Layout components
- `ProjectCard`, `ProjectShowcase` - Project display components
- `TechStrip`, `Icon`, `ParticleEffect`, `DemoWindow`, `DownloadButton` - Utility components

**Types:**
- `Project`, `Technology`, `ProjectMetrics`, `ReleaseInfo`

**Data:**
- `PROJECTS` - Array of all projects
- `EXTRA_TECHS` - Array of technology filters

## 🎯 Benefits of This Architecture

1. **Maintainability**: Changes to data only need to happen in one place
2. **Type Safety**: TypeScript catches errors at compile time
3. **Performance**: Server-side rendering and data loading
4. **Scalability**: Easy to add new projects and pages
5. **Reusability**: Components can be imported anywhere
6. **Testability**: Pure components are easy to test
7. **SEO**: Server-rendered content is crawlable

## 📄 License

MIT
