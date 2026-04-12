import { PROJECTS } from '$lib/data';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import type { ReleaseInfo } from '$lib/types';

// Cache for GitHub releases
const releaseCache: Record<string, ReleaseInfo & { updatedAt: number }> = {};
const TTL = 10 * 60 * 1000; // 10 min

async function fetchRelease(repo: string, fetch: typeof globalThis.fetch): Promise<ReleaseInfo> {
  const now = Date.now();
  const cached = releaseCache[repo];

  // Return cached data if still valid
  if (cached && now - cached.updatedAt < TTL) {
    return cached;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(env.GITHUB_TOKEN && { Authorization: `Bearer ${env.GITHUB_TOKEN}` }),
        ...(cached?.etag && { 'If-None-Match': cached.etag }),
      },
    });

    // GitHub: nothing changed
    if (res.status === 304 && cached) {
      cached.updatedAt = now;
      return cached;
    }

    // External error - don't crash the page
    if (!res.ok) {
      return cached || {};
    }

    const etag = res.headers.get('ETag') ?? undefined;
    const data = await res.json();
    const exe = data.assets?.find((a: any) => a.name.toLowerCase().endsWith('.exe'));

    const release: ReleaseInfo & { updatedAt: number } = {
      version: data.tag_name,
      exe: exe && {
        name: exe.name,
        url: exe.browser_download_url,
        downloads: exe.download_count,
        size: (exe.size / (1024 * 1024)).toFixed(1) + 'MB',
      },
      etag,
      updatedAt: now,
    };

    releaseCache[repo] = release;
    return release;
  } catch (error) {
    console.error('Failed to fetch release:', error);
    return cached || {};
  }
}

export const load: PageServerLoad = async ({ params, fetch }) => {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    throw error(404, 'Project not found');
  }

  // Get related projects based on shared tags
  const relatedProjects = PROJECTS.filter((p) => p.slug !== params.slug)
    .filter((p) => {
      const projectTags = project.tags.toLowerCase().split(',');
      const pTags = p.tags.toLowerCase().split(',');
      return projectTags.some((tag) => pTags.includes(tag));
    })
    .slice(0, 3);

  // Fetch release data for projects that need it
  let release: ReleaseInfo | undefined;
  if (params.slug === 'llama-cpp-desktop') {
    release = await fetchRelease('GDKAYKY/llama.cpp-desktop', fetch);
  } else if (params.slug === 'ytdln-open') {
    release = await fetchRelease('GDKAYKY/ytdln-open', fetch);
  }

  return {
    project,
    relatedProjects,
    release,
  };
};
