import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { LucideArrowLeft, LucideClock, LucideTag, LucideCalendar } from '@lucide/angular';
import { BLOG_POSTS } from '../../config/blog.data';
import { NavigationComponent } from '../../features/navigation/navigation.component';
import { FooterComponent } from '../../features/footer/footer.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LucideArrowLeft, LucideClock, LucideTag, LucideCalendar,
    NavigationComponent, FooterComponent
  ],
  template: `
    <app-navigation />
    <main id="main-content" tabindex="-1" class="pt-20">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">

        @if (post()) {
          <a routerLink="/" fragment="blog"
             class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors mb-10 group">
            <svg lucideArrowLeft [size]="15" [strokeWidth]="2.5" class="group-hover:-translate-x-1 transition-transform" aria-hidden="true"></svg>
            Back to Blog
          </a>

          <header class="mb-10">
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span class="chip chip-accent">{{ post()!.category }}</span>
              <div class="flex items-center gap-1 text-[12px] text-slate-400 dark:text-slate-500">
                <svg lucideCalendar [size]="11" [strokeWidth]="2" aria-hidden="true"></svg>
                <span>{{ formatDate(post()!.date) }}</span>
              </div>
              <div class="flex items-center gap-1 text-[12px] text-slate-400 dark:text-slate-500">
                <svg lucideClock [size]="11" [strokeWidth]="2" aria-hidden="true"></svg>
                <span>{{ post()!.readingTime }} min read</span>
              </div>
            </div>
            <h1 class="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 leading-tight mb-4">
              {{ post()!.title }}
            </h1>
            <p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-6">{{ post()!.excerpt }}</p>
            <div class="flex flex-wrap gap-1.5 pb-8 border-b border-slate-200 dark:border-slate-800">
              @for (tag of post()!.tags; track tag) {
                <span class="chip chip-slate flex items-center gap-1">
                  <svg lucideTag [size]="10" [strokeWidth]="2" aria-hidden="true"></svg>
                  {{ tag }}
                </span>
              }
            </div>
          </header>

          <article class="blog-prose" [innerHTML]="renderContent(post()!.content)"></article>

          <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center flex-shrink-0">
                <span class="text-white font-heading font-bold">TH</span>
              </div>
              <div>
                <p class="font-heading font-semibold text-slate-900 dark:text-slate-100">{{ post()!.author }}</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">MA Sociology · Freie Universität Berlin</p>
              </div>
            </div>
          </div>
        } @else {
          <div class="text-center py-24">
            <p class="text-4xl font-heading font-bold text-slate-300 dark:text-slate-700 mb-4">404</p>
            <h1 class="text-xl font-heading font-semibold text-slate-900 dark:text-slate-100 mb-4">Post not found</h1>
            <a routerLink="/" class="btn btn-primary">Back to Portfolio</a>
          </div>
        }
      </div>
    </main>
    <app-footer />
  `,
})
export class BlogDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly slug = toSignal(this.route.params.pipe(map(p => p['slug'] as string)));
  readonly post = computed(() => BLOG_POSTS.find(p => p.slug === this.slug()));

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  renderContent(content: string): string {
    return content
      .replace(/## (.+)/g, '<h2>$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^/, '<p>').replace(/$/, '</p>');
  }
}
