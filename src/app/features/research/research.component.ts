import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  LucideGlobe, LucideUsers, LucideBarChart2, LucideBriefcase, LucideAward,
  LucideLandmark, LucideMonitor, LucideMap, LucideGraduationCap,
  LucideMessageCircle, LucideBarChart, LucideTarget
} from '@lucide/angular';
import { RESEARCH_INTERESTS, RESEARCH_METHODS } from '../../config/research.data';

const COLOR_MAP: Record<string, string> = {
  blue:    'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900',
  indigo:  'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900',
  violet:  'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-900',
  slate:   'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700',
  pink:    'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-900',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900',
  cyan:    'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-900',
  amber:   'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900',
  teal:    'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-900',
};

const ICON_COLOR_MAP: Record<string, string> = {
  blue: 'text-blue-600', indigo: 'text-indigo-600', violet: 'text-violet-600',
  slate: 'text-slate-600', pink: 'text-pink-600', emerald: 'text-emerald-600',
  cyan: 'text-cyan-600', amber: 'text-amber-600', teal: 'text-teal-600',
};

@Component({
  selector: 'app-research',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslocoPipe,
    LucideGlobe, LucideUsers, LucideBarChart2, LucideBriefcase, LucideAward,
    LucideLandmark, LucideMonitor, LucideMap, LucideGraduationCap,
    LucideMessageCircle, LucideBarChart, LucideTarget
  ],
  template: `
    <section id="research" class="section-py bg-white dark:bg-slate-950" aria-labelledby="research-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-14 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'research.subtitle' | transloco }}
          </p>
          <h2 id="research-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'research.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <!-- Interest cards -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          @for (interest of interests; track interest.id; let i = $index) {
            <article
              class="card p-5 border fade-up"
              [class]="getCardClass(interest.color)"
              [class.delay-1]="i % 3 === 0"
              [class.delay-2]="i % 3 === 1"
              [class.delay-3]="i % 3 === 2">

              <div class="flex items-start gap-3 mb-3">
                <div class="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60">
                  <!-- Icon rendered per interest using ngSwitch equivalent -->
                  <span [class]="getIconColor(interest.color)" class="block w-[18px] h-[18px]">
                    @switch (interest.icon) {
                      @case ('globe')         { <svg lucideGlobe [size]="18" [strokeWidth]="1.8" aria-hidden="true"></svg> }
                      @case ('users')         { <svg lucideUsers [size]="18" [strokeWidth]="1.8" aria-hidden="true"></svg> }
                      @case ('bar-chart-2')   { <svg lucideBarChart2 [size]="18" [strokeWidth]="1.8" aria-hidden="true"></svg> }
                      @case ('briefcase')     { <svg lucideBriefcase [size]="18" [strokeWidth]="1.8" aria-hidden="true"></svg> }
                      @case ('award')         { <svg lucideAward [size]="18" [strokeWidth]="1.8" aria-hidden="true"></svg> }
                      @case ('landmark')      { <svg lucideLandmark [size]="18" [strokeWidth]="1.8" aria-hidden="true"></svg> }
                      @case ('monitor')       { <svg lucideMonitor [size]="18" [strokeWidth]="1.8" aria-hidden="true"></svg> }
                      @case ('map')           { <svg lucideMap [size]="18" [strokeWidth]="1.8" aria-hidden="true"></svg> }
                      @case ('graduation-cap'){ <svg lucideGraduationCap [size]="18" [strokeWidth]="1.8" aria-hidden="true"></svg> }
                      @default                { <svg lucideGlobe [size]="18" [strokeWidth]="1.8" aria-hidden="true"></svg> }
                    }
                  </span>
                </div>
                <h3 class="font-heading font-semibold text-[15px] text-slate-900 dark:text-slate-100 leading-snug mt-1">
                  {{ interest.title }}
                </h3>
              </div>
              <p class="text-[13.5px] text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {{ interest.description }}
              </p>
              <div class="flex flex-wrap gap-1.5">
                @for (method of interest.methods; track method) {
                  <span class="chip chip-slate text-[11px]">{{ method }}</span>
                }
              </div>
            </article>
          }
        </div>

        <!-- Research Methods -->
        <div class="fade-up">
          <h3 class="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 mb-2">
            {{ 'research.methods' | transloco }}
          </h3>
          <p class="text-slate-500 dark:text-slate-400 mb-10">{{ 'research.methodsSubtitle' | transloco }}</p>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="card p-6">
              <h4 class="font-heading font-semibold text-base text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                {{ 'research.qualitative' | transloco }}
              </h4>
              <ul class="space-y-2.5" role="list">
                @for (m of methods.qualitative; track m.name) {
                  <li class="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                    <svg lucideMessageCircle [size]="14" [strokeWidth]="2" class="text-blue-500 flex-shrink-0" aria-hidden="true"></svg>
                    {{ m.name }}
                  </li>
                }
              </ul>
            </div>
            <div class="card p-6">
              <h4 class="font-heading font-semibold text-base text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-violet-500"></span>
                {{ 'research.quantitative' | transloco }}
              </h4>
              <ul class="space-y-2.5" role="list">
                @for (m of methods.quantitative; track m.name) {
                  <li class="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                    <svg lucideBarChart [size]="14" [strokeWidth]="2" class="text-violet-500 flex-shrink-0" aria-hidden="true"></svg>
                    {{ m.name }}
                  </li>
                }
              </ul>
            </div>
            <div class="card p-6">
              <h4 class="font-heading font-semibold text-base text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                {{ 'research.mixed' | transloco }}
              </h4>
              <ul class="space-y-2.5" role="list">
                @for (m of methods.mixed; track m.name) {
                  <li class="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                    <svg lucideTarget [size]="14" [strokeWidth]="2" class="text-emerald-500 flex-shrink-0" aria-hidden="true"></svg>
                    {{ m.name }}
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ResearchComponent {
  readonly interests = RESEARCH_INTERESTS;
  readonly methods   = RESEARCH_METHODS;
  getCardClass(color: string): string { return COLOR_MAP[color] ?? COLOR_MAP['slate']; }
  getIconColor(color: string): string { return ICON_COLOR_MAP[color] ?? 'text-slate-600'; }
}
