import { Language } from '../core/models';

export const LANGUAGES: Language[] = [
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    level: 'native',
    cefrLabel: 'Native / Mother Tongue',
    percent: 100,
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    level: 'native',
    cefrLabel: 'Native / Mother Tongue',
    percent: 100,
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    level: 'C1',
    cefrLabel: 'Proficient User — Advanced',
    percent: 88,
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    level: 'A2',
    cefrLabel: 'Basic User — Elementary',
    percent: 25,
  },
];

export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export const CEFR_DESCRIPTIONS: Record<string, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Mastery',
  native: 'Native',
};
