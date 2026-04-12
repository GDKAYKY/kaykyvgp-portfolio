# 📦 Módulo lib/ - Guia de Uso

## Visão Geral

O módulo `lib/` é completamente reutilizável e exporta todos os componentes, páginas, tipos e dados através de um único ponto de entrada (`$lib`).

## 🎯 Estrutura de Exports

### 1. Componentes de Página

```typescript
import { Home, Projects } from '$lib';

// Páginas de detalhes de projetos
import { 
  LlamaCppDesktop, 
  YtdlnOpen, 
  SpanCore, 
  Portfolio 
} from '$lib';
```

### 2. Componentes de UI

```typescript
import { 
  Header, 
  Footer, 
  Icon, 
  TechStrip,
  ParticleEffect,
  ProjectCard,
  ProjectShowcase,
  DownloadButton,
  DemoWindow
} from '$lib';
```

### 3. Types

```typescript
import type { 
  Project, 
  Technology, 
  ProjectMetrics, 
  ReleaseInfo 
} from '$lib';
```

### 4. Dados

```typescript
import { PROJECTS, EXTRA_TECHS } from '$lib';
```

### 5. Utilitários

```typescript
import { PROJECT_COMPONENTS, getProjectComponent } from '$lib';

// Uso:
const Component = getProjectComponent('llama-cpp-desktop');
```

## 📖 Exemplos de Uso

### Exemplo 1: Criar uma nova rota usando componentes de página

```svelte
<!-- routes/about/+page.svelte -->
<script lang="ts">
  import { Home } from '$lib';
  import type { PageData } from './$types';
  
  let { data }: { data: PageData } = $props();
</script>

<Home />
```

### Exemplo 2: Usar componentes de UI

```svelte
<script lang="ts">
  import { ProjectCard, Icon } from '$lib';
  import type { Project } from '$lib';
  
  const project: Project = {
    slug: 'my-project',
    title: 'My Project',
    // ...
  };
</script>

<ProjectCard {...project} />
<Icon name="github" size={24} />
```

### Exemplo 3: Acessar dados centralizados

```typescript
// routes/api/projects/+server.ts
import { PROJECTS } from '$lib';
import { json } from '@sveltejs/kit';

export const GET = () => {
  return json(PROJECTS);
};
```

### Exemplo 4: Usar types para type safety

```typescript
// lib/services/projectService.ts
import type { Project } from '$lib';

export function filterProjects(
  projects: Project[], 
  category: string
): Project[] {
  return projects.filter(p => 
    p.categories.includes(category)
  );
}
```

### Exemplo 5: Componente dinâmico com utilitários

```svelte
<script lang="ts">
  import { getProjectComponent } from '$lib';
  import type { PageData } from './$types';
  
  let { data }: { data: PageData } = $props();
  
  const Component = getProjectComponent(data.slug);
</script>

{#if Component}
  <Component {...data} />
{:else}
  <p>Project not found</p>
{/if}
```

## 🔧 Adicionando Novos Componentes

### 1. Criar o componente

```svelte
<!-- lib/pages/About.svelte -->
<script lang="ts">
  interface Props {
    title: string;
  }
  
  let { title }: Props = $props();
</script>

<h1>{title}</h1>
```

### 2. Exportar em lib/index.ts

```typescript
export { default as About } from './pages/About.svelte';
```

### 3. Usar na rota

```svelte
<!-- routes/about/+page.svelte -->
<script lang="ts">
  import { About } from '$lib';
</script>

<About title="About Me" />
```

## 📊 Padrão de Data Flow

```
+page.server.ts (load data)
    ↓
+page.svelte (route wrapper)
    ↓
Page Component from $lib (presentation)
    ↓
UI Components from $lib (display)
```

## ✅ Benefícios

1. **Single Import**: Tudo vem de `$lib`
2. **Type Safety**: Types exportados automaticamente
3. **Reusabilidade**: Componentes podem ser usados em qualquer lugar
4. **Manutenibilidade**: Mudanças em um lugar refletem em todos
5. **Testabilidade**: Componentes puros são fáceis de testar
6. **Escalabilidade**: Fácil adicionar novos componentes

## 🚀 Próximos Passos

Para tornar o módulo ainda mais reutilizável:

1. **Publicar como pacote npm** (opcional)
2. **Adicionar testes unitários** para componentes
3. **Criar Storybook** para documentação visual
4. **Adicionar mais utilitários** em `lib/utils/`
5. **Criar hooks customizados** em `lib/hooks/`

## 📝 Convenções

- **Componentes**: PascalCase (ex: `ProjectCard`)
- **Utilitários**: camelCase (ex: `getProjectComponent`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `PROJECTS`)
- **Types**: PascalCase (ex: `Project`)
- **Arquivos**: kebab-case (ex: `project-card.svelte`)
