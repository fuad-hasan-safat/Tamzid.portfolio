import {
  Component, ChangeDetectionStrategy, OnInit, ElementRef, inject,
  PLATFORM_ID, signal, ViewChildren, QueryList, AfterViewInit
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { STATS } from '../../config/profile.data';

@Component({
  selector: 'app-stats',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <section class="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-10" aria-label="Key statistics">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
          @for (stat of stats; track stat.label; let i = $index) {
            <div class="text-center lg:px-8 fade-up" [class]="'delay-' + (i % 4 + 1)">
              <dt class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{{ stat.label }}</dt>
              <dd class="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100">
                <span class="tabular-nums">{{ displayValues[i]() }}</span>{{ stat.suffix }}
              </dd>
            </div>
          }
        </dl>
      </div>
    </section>
  `,
})
export class StatsComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly stats = STATS;
  readonly displayValues = STATS.map(() => signal(0));

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      STATS.forEach((s, i) => this.displayValues[i].set(s.value));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        this.animateCounters();
      }
    }, { threshold: 0.3 });

    const el = document.querySelector('[aria-label="Key statistics"]');
    if (el) observer.observe(el);
  }

  private animateCounters(): void {
    STATS.forEach((stat, i) => {
      const duration = 1400;
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        this.displayValues[i].set(Math.round(eased * stat.value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    });
  }
}
