import { Skill } from '../core/models';

export const SKILLS: Skill[] = [
  // Research
  { id: 'qual-research',   name: 'Qualitative Research',    level: 'expert',        percent: 95, category: 'research'       },
  { id: 'quant-research',  name: 'Quantitative Research',   level: 'advanced',      percent: 80, category: 'research'       },
  { id: 'survey-design',   name: 'Survey Design',           level: 'advanced',      percent: 82, category: 'research'       },
  { id: 'policy-analysis', name: 'Policy Analysis',         level: 'advanced',      percent: 88, category: 'research'       },
  { id: 'academic-writing',name: 'Academic Writing',        level: 'expert',        percent: 93, category: 'research'       },
  { id: 'grant-writing',   name: 'Grant Writing',           level: 'intermediate',  percent: 70, category: 'research'       },
  { id: 'lit-review',      name: 'Literature Review',       level: 'expert',        percent: 92, category: 'research'       },
  { id: 'data-analysis',   name: 'Data Analysis',           level: 'advanced',      percent: 82, category: 'methodology'    },

  // Methodology
  { id: 'interviews',      name: 'Semi-structured Interviews', level: 'expert',     percent: 95, category: 'methodology'    },
  { id: 'focus-groups',    name: 'Focus Groups',            level: 'advanced',      percent: 85, category: 'methodology'    },
  { id: 'ethnography',     name: 'Ethnography',             level: 'intermediate',  percent: 72, category: 'methodology'    },
  { id: 'content-analysis',name: 'Content Analysis',        level: 'advanced',      percent: 84, category: 'methodology'    },
  { id: 'm-e',             name: 'Monitoring & Evaluation', level: 'advanced',      percent: 80, category: 'methodology'    },

  // Software
  { id: 'maxqda',    name: 'MAXQDA',      level: 'advanced',     percent: 88, category: 'software' },
  { id: 'atlasti',   name: 'Atlas.ti',    level: 'advanced',     percent: 82, category: 'software' },
  { id: 'nvivo',     name: 'NVivo',       level: 'intermediate', percent: 65, category: 'software' },
  { id: 'spss',      name: 'SPSS',        level: 'advanced',     percent: 80, category: 'software' },
  { id: 'r-lang',    name: 'R',           level: 'intermediate', percent: 68, category: 'software' },
  { id: 'python',    name: 'Python',      level: 'elementary',   percent: 45, category: 'software' },
  { id: 'excel',     name: 'Excel',       level: 'advanced',     percent: 85, category: 'software' },
  { id: 'powerbi',   name: 'Power BI',    level: 'intermediate', percent: 65, category: 'software' },
  { id: 'miro',      name: 'Miro',        level: 'advanced',     percent: 80, category: 'software' },
  { id: 'notion',    name: 'Notion',      level: 'advanced',     percent: 88, category: 'software' },
  { id: 'jira',      name: 'Jira',        level: 'intermediate', percent: 72, category: 'software' },

  // Interpersonal
  { id: 'presentation', name: 'Presentations',      level: 'advanced',  percent: 87, category: 'interpersonal' },
  { id: 'stakeholders', name: 'Stakeholder Mgmt',   level: 'advanced',  percent: 85, category: 'interpersonal' },
  { id: 'proj-mgmt',    name: 'Project Management', level: 'advanced',  percent: 82, category: 'interpersonal' },
  { id: 'teamwork',     name: 'Teamwork',            level: 'expert',    percent: 93, category: 'interpersonal' },
  { id: 'communication',name: 'Communication',       level: 'expert',    percent: 92, category: 'interpersonal' },
  { id: 'mentoring',    name: 'Mentoring',           level: 'advanced',  percent: 80, category: 'interpersonal' },
];

export const SKILL_CATEGORIES = [
  { id: 'research',      label: 'Research & Writing'  },
  { id: 'methodology',   label: 'Research Methods'    },
  { id: 'software',      label: 'Software & Tools'    },
  { id: 'interpersonal', label: 'Interpersonal'       },
];
