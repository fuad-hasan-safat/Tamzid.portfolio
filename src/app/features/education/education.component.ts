import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideGraduationCap, LucideCalendar, LucideBookOpen, LucideAward } from '@lucide/angular';
import { EDUCATION } from '../../config/education.data';

@Component({
  selector: 'app-education',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, LucideGraduationCap, LucideCalendar, LucideBookOpen, LucideAward],
  template: `
    <section id="education" class="section-py section-alt dark:bg-slate-900" aria-labelledby="education-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-14 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'education.subtitle' | transloco }}
          </p>
          <h2 id="education-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'education.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <div class="relative space-y-10">
          <div class="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-blue-500 to-slate-200 dark:to-slate-700 hidden md:block" aria-hidden="true"></div>

          @for (edu of educationItems; track edu.id; let i = $index) {
            <div class="fade-up" [class]="'delay-' + (i + 1)">
              <div class="md:flex gap-8">
                <div class="hidden md:flex flex-col items-center flex-shrink-0">
                  <div class="timeline-dot"></div>
                </div>
                <article class="card p-6 md:p-8 flex-1 md:ml-4">
                  <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <div class="flex items-center gap-2 mb-2">
                        <svg lucideGraduationCap [size]="18" class="text-blue-600" [strokeWidth]="1.8" aria-hidden="true"></svg>
                        <span class="chip chip-accent text-[12px]">{{ edu.degree }}</span>
                      </div>
                      <h3 class="font-heading font-semibold text-xl text-slate-900 dark:text-slate-100 mb-1">{{ edu.field }}</h3>
                      <p class="text-slate-600 dark:text-slate-400 font-medium">{{ edu.institution }}</p>
                      <p class="text-sm text-slate-500 dark:text-slate-500">{{ edu.location }}</p>
                    </div>
                    <div class="flex-shrink-0 text-right">
                      <div class="flex items-center gap-1.5 text-slate-500 text-sm mb-1 justify-end">
                        <svg lucideCalendar [size]="13" [strokeWidth]="2" aria-hidden="true"></svg>
                        <span>{{ edu.startYear }} – {{ edu.endYear }}</span>
                      </div>
                      @if (edu.grade) {
                        <div class="flex items-center gap-1.5 justify-end">
                          <svg lucideAward [size]="13" [strokeWidth]="2" class="text-amber-500" aria-hidden="true"></svg>
                          <span class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {{ 'education.grade' | transloco }}: {{ edu.grade }}
                          </span>
                        </div>
                      }
                    </div>
                  </div>

                  @if (edu.highlight) {
                    <div class="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                      <svg lucideAward [size]="13" class="text-amber-600" [strokeWidth]="2" aria-hidden="true"></svg>
                      <span class="text-[12px] font-medium text-amber-700 dark:text-amber-400">{{ edu.highlight }}</span>
                    </div>
                  }

                  @if (edu.thesis) {
                    <div class="mb-5 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
                      <p class="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1.5">
                        {{ 'education.thesis' | transloco }}
                      </p>
                      <p class="text-sm text-slate-700 dark:text-slate-300 font-serif leading-relaxed italic">"{{ edu.thesis }}"</p>
                      @if (edu.supervisor) {
                        <p class="text-xs text-slate-500 mt-1.5">{{ 'education.supervisor' | transloco }}: {{ edu.supervisor }}</p>
                      }
                    </div>
                  }

                  <div>
                    <div class="flex items-center gap-2 mb-3">
                      <svg lucideBookOpen [size]="14" [strokeWidth]="2" class="text-slate-500" aria-hidden="true"></svg>
                      <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        {{ 'education.coursework' | transloco }}
                      </p>
                    </div>
                    <div class="flex flex-wrap gap-2">
                      @for (course of edu.coursework; track course) {
                        <span class="chip chip-slate">{{ course }}</span>
                      }
                    </div>
                  </div>
                </article>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class EducationComponent {
  readonly educationItems = EDUCATION;
}
