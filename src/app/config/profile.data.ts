import { Profile } from '../core/models';

export const PROFILE: Profile = {
  name: 'Tamjid Hossain',
  title: 'MA Sociology',
  institution: 'Freie Universität Berlin',
  tagline: 'Research-driven Sociology Graduate specializing in social research, policy analysis, migration, diversity & evidence-based decision making.',
  email: 'tamjid.hossain@fu-berlin.de',
  phone: '+49 (0) 151 XXXX XXXX',
  location: 'Berlin, Germany',
  linkedin: 'https://linkedin.com/in/tamjid-hossain',
  github: 'https://github.com/tamjid-hossain',
  orcid: 'https://orcid.org/0000-0000-0000-0000',
  researchGate: 'https://www.researchgate.net/profile/Tamjid-Hossain',
  googleScholar: 'https://scholar.google.com/citations?user=XXXXXXX',
  cvUrl: '/assets/cv/tamjid-hossain-cv.pdf',
  avatar: '/images/portrait.jpg',
  availableForWork: true,
};

export const STATS = [
  { value: 5,  suffix: '+', label: 'Years of Study',      icon: 'graduation-cap' },
  { value: 12, suffix: '+', label: 'Research Projects',   icon: 'search'         },
  { value: 6,  suffix: '',  label: 'Publications',        icon: 'file-text'      },
  { value: 3,  suffix: '',  label: 'Languages Spoken',    icon: 'globe'          },
  { value: 400,suffix: '+', label: 'Volunteer Hours',     icon: 'heart'          },
];
