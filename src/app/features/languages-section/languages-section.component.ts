import {
  Component, ChangeDetectionStrategy, AfterViewInit, PLATFORM_ID, inject, signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { LANGUAGES, CEFR_LEVELS, CEFR_DESCRIPTIONS } from '../../config/languages.data';

@Component({
  selector: 'app-languages-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe],
  template: `
    <section id="languages" class="section-py section-alt dark:bg-slate-900" aria-labelledby="languages-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Section header -->
        <div class="mb-14 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'languages.subtitle' | transloco }}
          </p>
          <h2 id="languages-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'languages.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 items-start">

          <!-- Language cards -->
          <div class="space-y-6">
            @for (lang of languages; track lang.code; let i = $index) {
              <div class="card p-6 fade-up" [class]="'delay-' + (i + 1)">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="font-heading font-semibold text-lg text-slate-900 dark:text-slate-100">
                      {{ lang.name }}
                    </h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">{{ lang.nativeName }}</p>
                  </div>
                  <div class="text-right">
                    <span class="chip chip-accent text-[13px] font-bold">
                      {{ lang.level === 'native' ? ('languages.native' | transloco) : lang.level }}
                    </span>
                    <p class="text-[11px] text-slate-500 dark:text-slate-500 mt-1">{{ lang.cefrLabel }}</p>
                  </div>
                </div>

                <!-- CEFR progress bar -->
                @if (lang.level !== 'native') {
                  <div>
                    <!-- Level markers -->
                    <div class="flex justify-between mb-1.5">
                      @for (level of cefrLevels; track level) {
                        <span class="text-[10px] font-mono text-slate-400 dark:text-slate-600"
                              [class.text-blue-600]="level === lang.level"
                              [class.dark:text-blue-400]="level === lang.level"
                              [class.font-bold]="level === lang.level">
                          {{ level }}
                        </span>
                      }
                    </div>
                    <div class="progress-track">
                      <div
                        class="progress-fill cefr-fill"
                        [style.width]="(animated() ? lang.percent : 0) + '%'"
                        [attr.aria-valuenow]="lang.percent"
                        role="progressbar"
                        [attr.aria-label]="lang.name + ' ' + lang.level">
                      </div>
                    </div>
                  </div>
                } @else {
                  <div class="flex items-center gap-2">
                    @for (dot of [1,2,3,4,5,6]; track dot) {
                      <div class="flex-1 h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"></div>
                    }
                  </div>
                }
              </div>
            }
          </div>

          <!-- CEFR legend -->
          <div class="fade-up delay-2">
            <div class="card p-6 mb-6">
              <h3 class="font-heading font-semibold text-base text-slate-900 dark:text-slate-100 mb-4">
                {{ 'languages.cefr' | transloco }}
              </h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                {{ 'languages.cefrDesc' | transloco }}
              </p>
              <div class="space-y-2">
                @for (level of cefrLevels; track level) {
                  <div class="flex items-center gap-3">
                    <span class="w-8 text-center chip chip-accent text-[11px] font-bold flex-shrink-0">{{ level }}</span>
                    <span class="text-sm text-slate-600 dark:text-slate-400">{{ getCefrDesc(level) }}</span>
                  </div>
                }
                <div class="flex items-center gap-3">
                  <span class="w-8 text-center chip chip-success text-[11px] font-bold flex-shrink-0">N</span>
                  <span class="text-sm text-slate-600 dark:text-slate-400">Native / Mother Tongue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class LanguagesSectionComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly languages = LANGUAGES;
  readonly cefrLevels = CEFR_LEVELS;
  readonly animated = signal(false);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.animated.set(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    const el = document.getElementById('languages');
    if (el) observer.observe(el);
  }

  getCefrDesc(level: string): string {
    return CEFR_DESCRIPTIONS[level] ?? level;
  }
}
