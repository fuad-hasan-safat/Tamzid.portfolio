import { ResearchInterest } from '../core/models';

export const RESEARCH_INTERESTS: ResearchInterest[] = [];

export const RESEARCH_METHODS: {
  qualitative: { name: string; icon: string }[];
  quantitative: { name: string; icon: string }[];
  mixed: { name: string; icon: string }[];
} = {
  qualitative: [],
  quantitative: [],
  mixed: [],
};
