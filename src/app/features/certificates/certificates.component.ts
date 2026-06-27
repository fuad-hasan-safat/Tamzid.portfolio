import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideAward, LucideExternalLink, LucideCalendar } from '@lucide/angular';
import { CERTIFICATES, CERTIFICATE_CATEGORIES } from '../../config/certificates.data';
import type { Certificate } from '../../core/models';

@Component({
  selector: 'app-certificates',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, LucideAward, LucideExternalLink, LucideCalendar],
  template: `
    <section id="certificates" class="section-py bg-white dark:bg-slate-950" aria-labelledby="certificates-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-10 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'certificates.subtitle' | transloco }}
          </p>
          <h2 id="certificates-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'certificates.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <!-- Filter -->
        <div class="flex flex-wrap gap-2 mb-10 fade-up" role="tablist">
          @for (cat of categories; track cat) {
            <button
              (click)="setCategory(cat)"
              role="tab"
              class="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
              [class.bg-blue-600]="active() === cat"
              [class.text-white]="active() === cat"
              [class.border-blue-600]="active() === cat"
              [class.text-slate-600]="active() !== cat"
              [class.dark:text-slate-400]="active() !== cat"
              [class.border-slate-200]="active() !== cat"
              [class.dark:border-slate-700]="active() !== cat">
              {{ cat }}
            </button>
          }
        </div>

        <!-- Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          @for (cert of filtered(); track cert.id; let i = $index) {
            <article class="card p-5 flex flex-col gap-3 fade-up" [class]="'delay-' + ((i % 4) + 1)">
              <div class="flex items-start justify-between gap-2">
                <div class="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                  <svg lucideAward [size]="18" class="text-blue-600" [strokeWidth]="1.8" aria-hidden="true"></svg>
                </div>
                <span class="chip chip-slate text-[11px]">{{ cert.category }}</span>
              </div>
              <h3 class="font-heading font-semibold text-[14px] text-slate-900 dark:text-slate-100 leading-snug">{{ cert.title }}</h3>
              <div class="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                <p class="text-[12.5px] font-medium text-slate-600 dark:text-slate-400 mb-1.5">{{ cert.issuer }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1.5 text-[11.5px] text-slate-400 dark:text-slate-500">
                    <svg lucideCalendar [size]="11" [strokeWidth]="2" aria-hidden="true"></svg>
                    <span>{{ formatDate(cert.date) }}</span>
                  </div>
                  @if (cert.url) {
                    <a [href]="cert.url" target="_blank" rel="noopener noreferrer"
                       class="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                      <svg lucideExternalLink [size]="11" [strokeWidth]="2" aria-hidden="true"></svg>
                      {{ 'certificates.verify' | transloco }}
                    </a>
                  }
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class CertificatesComponent {
  readonly categories = CERTIFICATE_CATEGORIES;
  readonly active     = signal('All');

  readonly filtered = computed<Certificate[]>(() => {
    const a = this.active();
    return a === 'All' ? CERTIFICATES : CERTIFICATES.filter(c => c.category === a);
  });

  setCategory(cat: string): void { this.active.set(cat); }

  formatDate(d: string): string {
    const [y, m] = d.split('-');
    const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m)]} ${y}`;
  }
}
