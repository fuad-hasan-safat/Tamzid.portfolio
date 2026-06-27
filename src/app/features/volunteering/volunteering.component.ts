import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideHeart, LucideMapPin, LucideCalendar } from '@lucide/angular';
import { VOLUNTEERING } from '../../config/volunteering.data';

@Component({
  selector: 'app-volunteering',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, LucideHeart, LucideMapPin, LucideCalendar],
  template: `
    <section id="volunteering" class="section-py section-alt dark:bg-slate-900" aria-labelledby="volunteering-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-14 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'volunteering.subtitle' | transloco }}
          </p>
          <h2 id="volunteering-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'volunteering.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          @for (vol of volunteers; track vol.id; let i = $index) {
            <article class="card p-6 fade-up" [class]="'delay-' + ((i % 4) + 1)">
              <div class="flex items-start gap-3 mb-4">
                <div class="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 flex-shrink-0">
                  <svg lucideHeart [size]="18" class="text-rose-500" [strokeWidth]="1.8" aria-hidden="true"></svg>
                </div>
                <div>
                  <h3 class="font-heading font-semibold text-[15px] text-slate-900 dark:text-slate-100 leading-snug">{{ vol.role }}</h3>
                  <p class="text-sm font-medium text-slate-600 dark:text-slate-400">{{ vol.organization }}</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-3 mb-4 text-[12px] text-slate-500 dark:text-slate-500">
                <div class="flex items-center gap-1.5">
                  <svg lucideMapPin [size]="12" [strokeWidth]="2" aria-hidden="true"></svg>
                  <span>{{ vol.location }}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <svg lucideCalendar [size]="12" [strokeWidth]="2" aria-hidden="true"></svg>
                  <span>{{ vol.startDate }} – {{ vol.endDate === 'present' ? ('common.present' | transloco) : vol.endDate }}</span>
                </div>
              </div>

              <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{{ vol.description }}</p>

              <div class="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900 mb-4">
                <p class="text-[11px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1.5">
                  {{ 'volunteering.impact' | transloco }}
                </p>
                <p class="text-sm text-rose-800 dark:text-rose-300 font-medium">{{ vol.impact }}</p>
              </div>

              <div class="flex flex-wrap gap-1.5">
                @for (skill of vol.skills; track skill) {
                  <span class="chip chip-slate">{{ skill }}</span>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class VolunteeringComponent {
  readonly volunteers = VOLUNTEERING;
}
