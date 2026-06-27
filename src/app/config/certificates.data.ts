import { Certificate } from '../core/models';

export const CERTIFICATES: Certificate[] = [
  {
    id: 'qual-methods-cert',
    title: 'Advanced Qualitative Research Methods',
    issuer: 'GESIS — Leibniz Institute for the Social Sciences',
    date: '2023-09',
    category: 'Research Methods',
    url: 'https://www.gesis.org',
  },
  {
    id: 'spss-cert',
    title: 'Statistical Analysis with SPSS',
    issuer: 'Coursera / IBM',
    date: '2023-03',
    category: 'Software',
    url: 'https://coursera.org',
  },
  {
    id: 'project-mgmt',
    title: 'Project Management Fundamentals (PRINCE2 Foundation)',
    issuer: 'AXELOS',
    date: '2022-11',
    category: 'Project Management',
  },
  {
    id: 'r-for-social-science',
    title: 'R for Social Scientists',
    issuer: 'Data Carpentry / The Carpentries',
    date: '2022-07',
    category: 'Software',
  },
  {
    id: 'eu-policy',
    title: 'EU Asylum and Immigration Law',
    issuer: 'European Institute of Public Administration (EIPA)',
    date: '2022-05',
    category: 'Policy',
  },
  {
    id: 'grant-writing',
    title: 'Grant Writing for Social Projects',
    issuer: 'Stifterverband',
    date: '2023-01',
    category: 'Fundraising',
  },
  {
    id: 'powerbi',
    title: 'Data Visualisation with Power BI',
    issuer: 'Microsoft Learn',
    date: '2023-06',
    category: 'Software',
  },
  {
    id: 'maxqda',
    title: 'Certified MAXQDA Researcher',
    issuer: 'VERBI Software',
    date: '2023-11',
    category: 'Research Methods',
  },
];

export const CERTIFICATE_CATEGORIES = [
  'All',
  'Research Methods',
  'Software',
  'Project Management',
  'Policy',
  'Fundraising',
];
