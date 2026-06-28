export interface Profile {
  name: string;
  title: string;
  institution: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  orcid: string;
  researchGate: string;
  googleScholar: string;
  cvUrl: string;
  avatar: string;
  availableForWork: boolean;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startYear: number | null;
  endYear: number | 'present' | null;
  grade?: string;
  supervisor?: string;
  thesis?: string;
  coursework: string[];
  logo: string;
  highlight?: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  type: 'full-time' | 'part-time' | 'freelance' | 'internship' | 'volunteer';
  location: string;
  startDate: string;
  endDate: string | 'present';
  responsibilities: string[];
  achievements: string[];
  skills: string[];
  kpis?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'research' | 'policy' | 'community' | 'consulting' | 'academic';
  description: string;
  methodology: string;
  outcome: string;
  impact: string;
  tools: string[];
  skills: string[];
  image?: string;
  link?: string;
  year: number;
  featured: boolean;
}

export interface Publication {
  id: string;
  type: 'thesis' | 'paper' | 'article' | 'working-paper' | 'book-chapter' | 'conference';
  title: string;
  authors: string[];
  journal?: string;
  conference?: string;
  year: number;
  doi?: string;
  url?: string;
  abstract: string;
  keywords: string[];
  pdfUrl?: string;
}

export type SkillLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  percent: number;
  category: 'research' | 'software' | 'interpersonal' | 'methodology' | 'accounting' | 'soft';
}

export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'native';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  level: CefrLevel;
  cefrLabel: string;
  percent: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  category: string;
  logo?: string;
}

export interface VolunteerExperience {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string | 'present';
  description: string;
  impact: string;
  skills: string[];
}

export interface ResearchInterest {
  id: string;
  title: string;
  description: string;
  methods: string[];
  icon: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  organization: string;
  relationship: string;
  text: string;
  avatar?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readingTime: number;
  featured: boolean;
  image?: string;
  author: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}
