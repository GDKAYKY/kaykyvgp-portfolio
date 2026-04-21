export interface KeywordUsage {
  keyword: string;
  projects: string[];
  certifications: string[];
  experiences: string[];
}

export interface KeywordMap {
  [key: string]: KeywordUsage;
}
