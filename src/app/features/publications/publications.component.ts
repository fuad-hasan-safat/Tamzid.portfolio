import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideFileText, LucideDownload, LucideExternalLink } from '@lucide/angular';
import { PUBLICATIONS } from '../../config/publications.data';
import type { Publication } from '../../core/models';

type PubFilter = 'all' | 'thesis' | 'paper' | 'article' | 'working-paper' | 'conference';

const FILTERS: Array<{ id: PubFilter; key: string }> = [
  { id: 'all',           key: 'publications.filter.all'           },
  { id: 'thesis',        key: 'publications.filter.thesis'        },
  { id: 'working-paper', key: 'publications.filter.working-paper' },
  { id: 'article',       key: 'publications.filter.article'       },
  { id: 'conference',    key: 'publications.filter.conference'    },
];

const TYPE_BADGE: Record<string, string> = {
  thesis: 'chip-accent', paper: 'chip-accent', article: 'chip-slate',
  'working-paper': 'chip-warning', conference: 'chip-success',
};

@Component({
  selector: 'app-publications',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, LucideFileText, LucideDownload, LucideExternalLink],
  template: `
    <section id="publications" class="section-py section-alt dark:bg-slate-900" aria-labelledby="publications-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-10 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'publications.subtitle' | transloco }}
          </p>
          <h2 id="publications-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'publications.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <!-- Filter -->
        <div class="flex flex-wrap gap-2 mb-10 fade-up" role="tablist">
          @for (f of filters; track f.id) {
            <button
              (click)="setFilter(f.id)"
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

        <!-- List -->
        <div class="space-y-5">
          @for (pub of filtered(); track pub.id; let i = $index) {
            <article class="card p-6 md:p-7 fade-up" [class]="'delay-' + ((i % 4) + 1)">
              <div class="flex flex-col md:flex-row md:items-start gap-4">
                <div class="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex-shrink-0 self-start">
                  <svg lucideFileText [size]="18" class="text-blue-600" [strokeWidth]="1.8" aria-hidden="true"></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <span [class]="'chip ' + getTypeBadge(pub.type)">{{ pub.type }}</span>
                    <span class="text-sm font-mono text-slate-400 dark:text-slate-500">{{ pub.year }}</span>
                    @if (pub.journal) {
                      <span class="text-sm text-slate-500 italic">{{ pub.journal }}</span>
                    }
                    @if (pub.conference) {
                      <span class="text-sm text-slate-500 italic">{{ pub.conference }}</span>
                    }
                  </div>
                  <h3 class="font-heading font-semibold text-base md:text-[17px] text-slate-900 dark:text-slate-100 leading-snug mb-2 italic font-serif">
                    {{ pub.title }}
                  </h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">{{ pub.authors.join(', ') }}</p>

                  @if (expandedId() === pub.id) {
                    <div class="mb-3">
                      <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        {{ 'publications.abstract' | transloco }}
                      </p>
                      <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ pub.abstract }}</p>
                    </div>
                  }

                  <div class="flex flex-wrap items-center justify-between gap-3 mt-3">
                    <div class="flex flex-wrap gap-1.5">
                      @for (kw of pub.keywords.slice(0, 4); track kw) {
                        <span class="chip chip-slate text-[11px]">{{ kw }}</span>
                      }
                    </div>
                    <div class="flex items-center gap-3">
                      <button
                        (click)="toggleExpand(pub.id)"
                        class="text-[12px] font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors">
                        {{ expandedId() === pub.id ? '↑' : '↓' }} {{ 'publications.abstract' | transloco }}
                      </button>
                      @if (pub.pdfUrl) {
                        <a [href]="pub.pdfUrl" target="_blank" rel="noopener noreferrer"
                           class="flex items-center gap-1 text-[12px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                          <svg lucideDownload [size]="12" [strokeWidth]="2" aria-hidden="true"></svg> PDF
                        </a>
                      }
                      @if (pub.url) {
                        <a [href]="pub.url" target="_blank" rel="noopener noreferrer"
                           class="flex items-center gap-1 text-[12px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                          <svg lucideExternalLink [size]="12" [strokeWidth]="2" aria-hidden="true"></svg>
                          {{ 'publications.viewOnline' | transloco }}
                        </a>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class PublicationsComponent {
  readonly filters     = FILTERS;
  readonly active      = signal<PubFilter>('all');
  readonly expandedId  = signal<string | null>(null);

  readonly filtered = computed<Publication[]>(() => {
    const f = this.active();
    return f === 'all' ? PUBLICATIONS : PUBLICATIONS.filter(p => p.type === f);
  });

  setFilter(f: PubFilter): void { this.active.set(f); }
  getTypeBadge(type: string): string { return TYPE_BADGE[type] ?? 'chip-slate'; }
  toggleExpand(id: string): void { this.expandedId.update(v => v === id ? null : id); }
}
