import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideBriefcase, LucideCalendar, LucideCircleCheckBig, LucideChevronRight } from '@lucide/angular';
import { EXPERIENCE } from '../../config/experience.data';

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-time', 'part-time': 'Part-time',
  'freelance': 'Freelance', 'internship': 'Internship', 'volunteer': 'Volunteer',
};
const TYPE_COLORS: Record<string, string> = {
  'full-time': 'chip-accent', 'part-time': 'chip-slate', 'freelance': 'chip-slate',
  'internship': 'chip-warning', 'volunteer': 'chip-success',
};

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, LucideBriefcase, LucideCalendar, LucideCircleCheckBig, LucideChevronRight],
  template: `
    <section id="experience" class="section-py section-alt dark:bg-slate-900" aria-labelledby="experience-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-14 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'experience.subtitle' | transloco }}
          </p>
          <h2 id="experience-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'experience.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <div class="relative space-y-8">
          <div class="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-blue-500 to-slate-200 dark:to-slate-700 hidden md:block" aria-hidden="true"></div>

          @for (exp of experiences; track exp.id; let i = $index) {
            <div class="md:flex gap-8 fade-up" [class]="'delay-' + ((i % 4) + 1)">
              <div class="hidden md:flex flex-col items-center flex-shrink-0">
                <div class="timeline-dot mt-5"></div>
              </div>
              <article class="card p-6 md:p-8 flex-1 md:ml-4">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div>
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                      <svg lucideBriefcase [size]="16" class="text-blue-600" [strokeWidth]="1.8" aria-hidden="true"></svg>
                      <span [class]="'chip ' + getTypeColor(exp.type)">{{ getTypeLabel(exp.type) }}</span>
                    </div>
                    <h3 class="font-heading font-semibold text-xl text-slate-900 dark:text-slate-100 mb-0.5">{{ exp.title }}</h3>
                    <p class="text-slate-600 dark:text-slate-400 font-medium text-base">{{ exp.organization }}</p>
                    <p class="text-sm text-slate-500">{{ exp.location }}</p>
                  </div>
                  <div class="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 flex-shrink-0">
                    <svg lucideCalendar [size]="13" [strokeWidth]="2" aria-hidden="true"></svg>
                    <span>{{ exp.startDate }} – {{ exp.endDate === 'present' ? ('common.present' | transloco) : exp.endDate }}</span>
                  </div>
                </div>

                @if (exp.kpis?.length) {
                  <div class="flex flex-wrap gap-2 mb-5">
                    @for (kpi of exp.kpis; track kpi) {
                      <span class="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-[11px] font-semibold text-blue-700 dark:text-blue-400">{{ kpi }}</span>
                    }
                  </div>
                }

                <div class="mb-5">
                  <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">{{ 'experience.responsibilities' | transloco }}</p>
                  <ul class="space-y-2" role="list">
                    @for (r of exp.responsibilities; track r) {
                      <li class="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                        <svg lucideChevronRight [size]="14" [strokeWidth]="2.5" class="text-blue-500 flex-shrink-0 mt-0.5" aria-hidden="true"></svg>
                        {{ r }}
                      </li>
                    }
                  </ul>
                </div>

                @if (exp.achievements.length) {
                  <div class="mb-5 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900">
                    <p class="text-[11px] font-semibold text-green-600 dark:text-green-500 uppercase tracking-wider mb-3">
                      {{ 'experience.achievements' | transloco }}
                    </p>
                    <ul class="space-y-1.5" role="list">
                      @for (a of exp.achievements; track a) {
                        <li class="flex items-start gap-2.5 text-sm text-green-800 dark:text-green-300">
                          <svg lucideCircleCheckBig [size]="14" [strokeWidth]="2.5" class="text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true"></svg>
                          {{ a }}
                        </li>
                      }
                    </ul>
                  </div>
                }

                <div class="flex flex-wrap gap-1.5">
                  @for (skill of exp.skills; track skill) {
                    <span class="chip chip-slate">{{ skill }}</span>
                  }
                </div>
              </article>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  readonly experiences = EXPERIENCE;
  getTypeLabel(t: string): string { return TYPE_LABELS[t] ?? t; }
  getTypeColor(t: string): string { return TYPE_COLORS[t] ?? 'chip-slate'; }
}
