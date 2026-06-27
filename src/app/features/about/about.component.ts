import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LucideCircleCheckBig } from '@lucide/angular';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, LucideCircleCheckBig],
  template: `
    <section id="about" class="section-py bg-white dark:bg-slate-950" aria-labelledby="about-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-14 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'about.subtitle' | transloco }}
          </p>
          <h2 id="about-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'about.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <div class="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div class="lg:col-span-2 space-y-6">
            <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light fade-up delay-1">
              {{ 'about.summary' | transloco }}
            </p>
            <p class="text-base text-slate-500 dark:text-slate-400 leading-relaxed fade-up delay-2">
              {{ 'about.academic' | transloco }}
            </p>
            <p class="text-base text-slate-500 dark:text-slate-400 leading-relaxed fade-up delay-3">
              {{ 'about.career' | transloco }}
            </p>
            <p class="text-base text-slate-500 dark:text-slate-400 leading-relaxed fade-up delay-4">
              {{ 'about.values' | transloco }}
            </p>
          </div>

          <aside class="fade-up delay-2">
            <div class="card p-6">
              <h3 class="font-heading font-semibold text-base text-slate-900 dark:text-slate-100 mb-5">
                {{ 'about.expertise' | transloco }}
              </h3>
              <ul class="space-y-3" role="list">
                @for (item of expertiseItems(); track item) {
                  <li class="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <svg lucideCircleCheckBig [size]="15" [strokeWidth]="2.5" class="text-blue-600 mt-0.5 flex-shrink-0" aria-hidden="true"></svg>
                    {{ item }}
                  </li>
                }
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  private readonly transloco = inject(TranslocoService);

  readonly expertiseItems = toSignal(
    this.transloco.selectTranslateObject<string[]>('about.expertiseItems'),
    { initialValue: [] as string[] }
  );
}
