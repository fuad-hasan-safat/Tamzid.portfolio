import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideClock, LucideArrowRight } from '@lucide/angular';
import { BLOG_POSTS } from '../../config/blog.data';

@Component({
  selector: 'app-blog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslocoPipe, LucideClock, LucideArrowRight],
  template: `
    <section id="blog" class="section-py section-alt dark:bg-slate-900" aria-labelledby="blog-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-14 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'blog.subtitle' | transloco }}
          </p>
          <h2 id="blog-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'blog.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (post of posts; track post.slug; let i = $index) {
            <article class="card flex flex-col fade-up" [class]="'delay-' + ((i % 3) + 1)">
              <div class="px-6 pt-6 mb-4">
                <div class="flex items-center justify-between mb-3">
                  <span class="chip chip-accent">{{ post.category }}</span>
                  @if (post.featured) {
                    <span class="chip chip-warning">{{ 'blog.featured' | transloco }}</span>
                  }
                </div>
                <div class="flex items-center gap-3 text-[12px] text-slate-400 dark:text-slate-500 mb-3">
                  <span>{{ formatDate(post.date) }}</span>
                  <span aria-hidden="true">·</span>
                  <div class="flex items-center gap-1">
                    <svg lucideClock [size]="11" [strokeWidth]="2" aria-hidden="true"></svg>
                    <span>{{ post.readingTime }} min read</span>
                  </div>
                </div>
                <h3 class="font-heading font-semibold text-[16px] text-slate-900 dark:text-slate-100 leading-snug mb-3">
                  <a [routerLink]="['/blog', post.slug]" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {{ post.title }}
                  </a>
                </h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{{ post.excerpt }}</p>
              </div>
              <div class="px-6 pb-6 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                <div class="flex items-center justify-between">
                  <div class="flex flex-wrap gap-1">
                    @for (tag of post.tags.slice(0, 2); track tag) {
                      <span class="chip chip-slate text-[10.5px]">{{ tag }}</span>
                    }
                  </div>
                  <a [routerLink]="['/blog', post.slug]"
                     class="flex items-center gap-1.5 text-[13px] font-medium text-blue-600 dark:text-blue-400 hover:gap-2.5 transition-all">
                    {{ 'blog.readMore' | transloco }}
                    <svg lucideArrowRight [size]="13" [strokeWidth]="2.5" aria-hidden="true"></svg>
                  </a>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class BlogComponent {
  readonly posts = BLOG_POSTS;
  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}
