import { env } from "$env/dynamic/private";

type Cache = {
  etag?: string;
  version?: string;
  exe?: {
    name: string;
    url: string;
    downloads: number;
    size: string;
  };
  updatedAt?: number;
};

let cache: Cache = {};
const TTL = 10 * 60 * 1000; // 10 min

export async function load({ fetch }) {
  const now = Date.now();

  // cache quente → zero chamadas externas
  if (cache.updatedAt && now - cache.updatedAt < TTL) {
    return { release: cache };
  }

  try {
    const res = await fetch(
      "https://api.github.com/repos/GDKAYKY/ytdln-open/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(env.GITHUB_TOKEN && {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          }),
          ...(cache.etag && { "If-None-Match": cache.etag }),
        },
      }
    );

    // GitHub: nada mudou
    if (res.status === 304) {
      cache.updatedAt = now;
      return { release: cache };
    }

    // erro externo → não derruba a página
    if (!res.ok) {
      return { release: cache };
    }

    cache.etag = res.headers.get("ETag") ?? undefined;

    const data = await res.json();
    const exe = data.assets?.find((a: any) =>
      a.name.toLowerCase().endsWith(".exe")
    );

    cache = {
      version: data.tag_name,
      exe: exe && {
        name: exe.name,
        url: exe.browser_download_url,
        downloads: exe.download_count,
        size: (exe.size / (1024 * 1024)).toFixed(1) + "MB",
      },
      updatedAt: now,
      etag: cache.etag,
    };

    return { release: cache };
  } catch (error) {
    console.error("Failed to fetch release:", error);
    return { release: cache };
  }
}
