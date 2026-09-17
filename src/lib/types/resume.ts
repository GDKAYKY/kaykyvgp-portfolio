export interface Experience {
  company: string;
  logo: string;
  position: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
  projects?: string[];
  about?: string;
}

export interface Certification {
  title: string;
  logo: string;
  issuer: string;
  issuerLogo: string;
  date: string;
  skills: string[];
  credentialUrl: string;
  skillsGained?: string[];
  tools?: string[];
  about?: string;
}

export interface Education {
  institution: string;
  logo: string;
  degree: string;
  period: string;
}

export interface SkillItem {
  icon: string;
  label: string;
}

export interface SkillsColumn {
  title: string;
  icon: string;
  skills: SkillItem[];
}
