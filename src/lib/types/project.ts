export interface Technology {
  name: string;
  category: 'language' | 'framework' | 'library' | 'tool' | 'platform';
}

export interface ProjectMetrics {
  stars?: number;
  downloads?: number;
  performance?: string;
  contributors?: number;
}

export interface ReleaseInfo {
  version?: string;
  exe?: {
    name: string;
    url: string;
    downloads: number;
    size: string;
  };
  etag?: string;
  updatedAt?: number;
}

export interface Project {
  slug: string;
  title: string;
  type: 'AI Desktop Utility' | 'Open Source Utility' | 'Desktop Utility' | 'Web Development';
  description: string;
  longDescription?: string;
  image?: string;
  imageAlt?: string;
  tags: string;
  categories: string[];
  date: string;
  link: string;
  github?: string;
  demo?: string;
  technologies?: Technology[];
  metrics?: ProjectMetrics;
}
