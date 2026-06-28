import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideQuote, LucideChevronLeft, LucideChevronRight } from '@lucide/angular';
import { TESTIMONIALS } from '../../config/testimonials.data';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, LucideQuote, LucideChevronLeft, LucideChevronRight],
  template: `
    @if (testimonials.length > 0) {
    <section class="section-py bg-white dark:bg-slate-950" aria-labelledby="testimonials-heading">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-14 text-center fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'testimonials.subtitle' | transloco }}
          </p>
          <h2 id="testimonials-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'testimonials.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600 mx-auto"></div>
        </div>

        <div class="relative fade-up" aria-live="polite">
          <article class="card p-8 md:p-10 text-center">
            <svg lucideQuote [size]="36" class="text-blue-200 dark:text-blue-900 mx-auto mb-6" [strokeWidth]="1" aria-hidden="true"></svg>
            <blockquote class="font-serif text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed italic mb-8">
              "{{ current().text }}"
            </blockquote>
            <footer>
              <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 mx-auto mb-3 flex items-center justify-center">
                <span class="text-white font-heading font-bold text-lg">{{ getInitials(current().name) }}</span>
              </div>
              <p class="font-heading font-semibold text-base text-slate-900 dark:text-slate-100">{{ current().name }}</p>
              <p class="text-sm text-blue-600 dark:text-blue-400 font-medium">{{ current().title }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-500">{{ current().organization }}</p>
              <span class="inline-block mt-2 chip chip-slate">{{ current().relationship }}</span>
            </footer>
          </article>

          <div class="flex items-center justify-center gap-4 mt-6">
            <button (click)="prev()" class="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Previous testimonial">
              <svg lucideChevronLeft [size]="18" [strokeWidth]="2" aria-hidden="true"></svg>
            </button>
            <div class="flex gap-2" role="tablist">
              @for (t of testimonials; track t.id; let i = $index) {
                <button
                  (click)="goTo(i)"
                  role="tab"
                  [attr.aria-selected]="currentIndex() === i"
                  class="h-2 rounded-full transition-all"
                  [class.w-5]="currentIndex() === i"
                  [class.bg-blue-600]="currentIndex() === i"
                  [class.w-2]="currentIndex() !== i"
                  [class.bg-slate-300]="currentIndex() !== i"
                  [class.dark:bg-slate-600]="currentIndex() !== i"
                  [attr.aria-label]="'Testimonial ' + (i + 1)">
                </button>
              }
            </div>
            <button (click)="next()" class="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Next testimonial">
              <svg lucideChevronRight [size]="18" [strokeWidth]="2" aria-hidden="true"></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
    }
  `,
})
export class TestimonialsComponent {
  readonly testimonials  = TESTIMONIALS;
  readonly currentIndex  = signal(0);
  readonly current       = computed(() => TESTIMONIALS[this.currentIndex()]);

  next(): void { this.currentIndex.update(i => (i + 1) % TESTIMONIALS.length); }
  prev(): void { this.currentIndex.update(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); }
  goTo(i: number): void { this.currentIndex.set(i); }
  getInitials(name: string): string { return name.split(' ').slice(0, 2).map(n => n[0]).join(''); }
}
