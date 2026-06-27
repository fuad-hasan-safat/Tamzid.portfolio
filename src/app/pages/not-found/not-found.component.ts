import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowLeft } from '@lucide/angular';

@Component({
  selector: 'app-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideArrowLeft],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-4">
      <div class="text-center">
        <p class="font-heading font-bold text-[120px] sm:text-[160px] leading-none text-slate-100 dark:text-slate-900 select-none" aria-hidden="true">404</p>
        <h1 class="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 -mt-6 mb-4">Page Not Found</h1>
        <p class="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a routerLink="/" class="btn btn-primary gap-2">
          <svg lucideArrowLeft [size]="16" [strokeWidth]="2" aria-hidden="true"></svg>
          Back to Portfolio
        </a>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}
