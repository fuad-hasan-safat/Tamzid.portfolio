import {
  Component, ChangeDetectionStrategy, signal, computed,
  AfterViewInit, PLATFORM_ID, inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { SKILLS, SKILL_CATEGORIES } from '../../config/skills.data';
import type { Skill } from '../../core/models';

@Component({
  selector: 'app-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe],
  template: `
    <section id="skills" class="section-py bg-white dark:bg-slate-950" aria-labelledby="skills-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Section header -->
        <div class="mb-10 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'skills.subtitle' | transloco }}
          </p>
          <h2 id="skills-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'skills.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <!-- Category tabs -->
        <div class="flex flex-wrap gap-2 mb-10 fade-up" role="tablist">
          @for (cat of categories; track cat.id) {
            <button
              (click)="setCategory(cat.id)"
              role="tab"
              [attr.aria-selected]="activeCategory() === cat.id"
              class="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
              [class.bg-blue-600]="activeCategory() === cat.id"
              [class.text-white]="activeCategory() === cat.id"
              [class.border-blue-600]="activeCategory() === cat.id"
              [class.text-slate-600]="activeCategory() !== cat.id"
              [class.dark:text-slate-400]="activeCategory() !== cat.id"
              [class.border-slate-200]="activeCategory() !== cat.id"
              [class.dark:border-slate-700]="activeCategory() !== cat.id">
              {{ 'skills.categories.' + cat.id | transloco }}
            </button>
          }
        </div>

        <!-- Skills grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          @for (skill of filteredSkills(); track skill.id; let i = $index) {
            <div class="card p-5 fade-up" [class]="'delay-' + ((i % 4) + 1)">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-medium text-[14px] text-slate-900 dark:text-slate-100">{{ skill.name }}</h3>
                <span class="chip chip-slate text-[11px]">{{ 'skills.levels.' + skill.level | transloco }}</span>
              </div>
              <div class="progress-track" role="progressbar" [attr.aria-valuenow]="animated() ? skill.percent : 0" aria-valuemin="0" aria-valuemax="100">
                <div
                  class="progress-fill"
                  [style.width]="(animated() ? skill.percent : 0) + '%'">
                </div>
              </div>
              <p class="text-[11px] text-slate-400 dark:text-slate-600 text-right mt-1.5">{{ skill.percent }}%</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  readonly categories = SKILL_CATEGORIES;
  readonly activeCategory = signal('research');
  readonly animated = signal(false);

  readonly filteredSkills = computed<Skill[]>(() =>
    SKILLS.filter(s => s.category === this.activeCategory())
  );

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.animated.set(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    const el = document.getElementById('skills');
    if (el) observer.observe(el);
  }

  setCategory(id: string): void {
    this.activeCategory.set(id);
    setTimeout(() => this.animated.set(true), 50);
  }
}
