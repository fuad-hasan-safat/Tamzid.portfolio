import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideFlaskConical, LucideTarget } from '@lucide/angular';
import { PROJECTS } from '../../config/projects.data';
import type { Project } from '../../core/models';

type FilterCategory = 'all' | 'research' | 'policy' | 'community' | 'academic';

const FILTER_KEYS: Array<{ id: FilterCategory; key: string }> = [
  { id: 'all',       key: 'projects.filter.all'      },
  { id: 'research',  key: 'projects.filter.research'  },
  { id: 'policy',    key: 'projects.filter.policy'    },
  { id: 'community', key: 'projects.filter.community' },
  { id: 'academic',  key: 'projects.filter.academic'  },
];

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, LucideFlaskConical, LucideTarget],
  template: `
    <section id="projects" class="section-py bg-white dark:bg-slate-950" aria-labelledby="projects-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-10 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'projects.subtitle' | transloco }}
          </p>
          <h2 id="projects-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'projects.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <!-- Filter -->
        <div class="flex flex-wrap gap-2 mb-10 fade-up" role="tablist">
          @for (f of filters; track f.id) {
            <button
              (click)="setFilter(f.id)"
              [attr.aria-selected]="active() === f.id"
              role="tab"
              class="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
              [class.bg-blue-600]="active() === f.id"
              [class.text-white]="active() === f.id"
              [class.border-blue-600]="active() === f.id"
              [class.text-slate-600]="active() !== f.id"
              [class.dark:text-slate-400]="active() !== f.id"
              [class.border-slate-200]="active() !== f.id"
              [class.dark:border-slate-700]="active() !== f.id">
              {{ f.key | transloco }}
            </button>
          }
        </div>

        <!-- Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of filtered(); track project.id; let i = $index) {
            <article class="card p-6 flex flex-col fade-up" [class]="'delay-' + ((i % 3) + 1)">
              <div class="flex items-center justify-between mb-4">
                <span class="chip chip-accent">{{ project.category }}</span>
                <span class="text-sm font-mono text-slate-400 dark:text-slate-500">{{ project.year }}</span>
              </div>
              <h3 class="font-heading font-semibold text-[15px] text-slate-900 dark:text-slate-100 leading-snug mb-3">
                {{ project.title }}
              </h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5 flex-1">
                {{ project.description }}
              </p>
              <div class="mb-4">
                <div class="flex items-center gap-1.5 mb-1.5">
                  <svg lucideFlaskConical [size]="12" [strokeWidth]="2" class="text-slate-500" aria-hidden="true"></svg>
                  <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{{ 'projects.methodology' | transloco }}</span>
                </div>
                <p class="text-[12.5px] text-slate-600 dark:text-slate-400 leading-relaxed">{{ project.methodology }}</p>
              </div>
              <div class="mb-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                <div class="flex items-center gap-1.5 mb-1.5">
                  <svg lucideTarget [size]="12" [strokeWidth]="2" class="text-blue-500" aria-hidden="true"></svg>
                  <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{{ 'projects.impact' | transloco }}</span>
                </div>
                <p class="text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{{ project.impact }}</p>
              </div>
              <div class="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                @for (tool of project.tools; track tool) {
                  <span class="chip chip-slate text-[11px]">{{ tool }}</span>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  readonly filters = FILTER_KEYS;
  readonly active  = signal<FilterCategory>('all');

  readonly filtered = computed<Project[]>(() => {
    const f = this.active();
    return f === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === f);
  });

  setFilter(f: FilterCategory): void { this.active.set(f); }
}
