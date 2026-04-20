export interface Experience {
  company: string;
  logo: string;
  position: string;
  location: string;
  period: string;
  description: string[];
}

export interface Certification {
  title: string;
  logo: string;
  issuer: string;
  issuerLogo: string;
  date: string;
  skills: string[];
  credentialUrl: string;
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
