import { Skill } from '../core/models';

export const SKILLS: Skill[] = [
  // Software
  { id: 'excel',        name: 'MS Excel',                  level: 'advanced',     percent: 90, category: 'software' },
  { id: 'word',         name: 'MS Word',                   level: 'advanced',     percent: 85, category: 'software' },
  { id: 'powerpoint',   name: 'MS PowerPoint',             level: 'advanced',     percent: 85, category: 'software' },
  { id: 'google-sheet', name: 'Google Sheets',             level: 'advanced',     percent: 82, category: 'software' },
  { id: 'sap',          name: 'SAP / Tally ERP',           level: 'intermediate', percent: 72, category: 'software' },
  { id: 'slack',        name: 'Slack',                     level: 'advanced',     percent: 80, category: 'software' },

  // Accounting & Controlling
  { id: 'financial-forecast',  name: 'Financial Forecasting',      level: 'advanced',     percent: 82, category: 'accounting' },
  { id: 'perf-mgmt',           name: 'Performance Management',     level: 'advanced',     percent: 83, category: 'accounting' },
  { id: 'kpis',                name: 'KPI Monitoring & Reporting',  level: 'advanced',     percent: 85, category: 'accounting' },
  { id: 'fin-statements',      name: 'Financial Statements',       level: 'intermediate', percent: 75, category: 'accounting' },
  { id: 'budgeting',           name: 'Master Budgeting',           level: 'advanced',     percent: 80, category: 'accounting' },
  { id: 'inventory-mgmt',      name: 'Inventory Management',       level: 'advanced',     percent: 88, category: 'accounting' },
  { id: 'payroll',             name: 'Payroll Calculation',        level: 'intermediate', percent: 72, category: 'accounting' },
  { id: 'bank-recon',          name: 'Bank Reconciliation',        level: 'advanced',     percent: 80, category: 'accounting' },
  { id: 'variance-analysis',   name: 'Variance Analysis',         level: 'intermediate', percent: 70, category: 'accounting' },
  { id: 'ratio-analysis',      name: 'Ratio Analysis',            level: 'intermediate', percent: 70, category: 'accounting' },
  { id: 'agile-pm',            name: 'Agile Project Management',  level: 'intermediate', percent: 68, category: 'accounting' },

  // Soft Skills
  { id: 'time-mgmt',    name: 'Time Management',      level: 'expert',   percent: 92, category: 'soft' },
  { id: 'teamwork',     name: 'Team-oriented',        level: 'expert',   percent: 93, category: 'soft' },
  { id: 'proactive',    name: 'Proactive',             level: 'expert',   percent: 90, category: 'soft' },
  { id: 'detail',       name: 'Detail-oriented',      level: 'advanced', percent: 88, category: 'soft' },
  { id: 'decision',     name: 'Decision Making',      level: 'advanced', percent: 85, category: 'soft' },
  { id: 'multitask',    name: 'Multi-tasking',        level: 'advanced', percent: 87, category: 'soft' },
  { id: 'self-reliant', name: 'Self-reliant',         level: 'advanced', percent: 85, category: 'soft' },
  { id: 'fast-learner', name: 'Fast Learner',         level: 'advanced', percent: 88, category: 'soft' },
];

export const SKILL_CATEGORIES = [
  { id: 'software',    label: 'Software & Tools'         },
  { id: 'accounting',  label: 'Accounting & Controlling' },
  { id: 'soft',        label: 'Soft Skills'              },
];
