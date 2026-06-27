import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  LucideMapPin, LucideDownload, LucideMail, LucideLink2,
  LucideArrowDown, LucideCircleCheckBig
} from '@lucide/angular';
import { PROFILE } from '../../config/profile.data';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, LucideMapPin, LucideDownload, LucideMail, LucideLink2, LucideArrowDown, LucideCircleCheckBig],
  template: `
    <section
      id="home"
      class="relative min-h-screen flex items-center bg-white dark:bg-slate-950 overflow-hidden"
      aria-labelledby="hero-heading">

      <!-- Background grid -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f908_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f908_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)]" aria-hidden="true"></div>
      <div class="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-50 dark:bg-blue-950/20 rounded-full blur-3xl opacity-50 pointer-events-none" aria-hidden="true"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 w-full">
        <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <!-- Text content -->
          <div class="fade-up">
            <!-- Availability badge -->
            <div class="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true"></span>
              <span class="text-[13px] font-medium text-green-700 dark:text-green-400">
                {{ 'hero.badge' | transloco }}
              </span>
            </div>

            <!-- Name -->
            <h1 id="hero-heading" class="font-heading font-bold tracking-tight mb-4">
              <span class="block text-5xl sm:text-6xl lg:text-7xl text-slate-900 dark:text-slate-50 leading-[1.08]">
                {{ profile.name.split(' ')[0] }}
              </span>
              <span class="block text-5xl sm:text-6xl lg:text-7xl text-slate-900 dark:text-slate-50 leading-[1.08]">
                {{ profile.name.split(' ')[1] }}
              </span>
            </h1>

            <p class="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 font-heading font-medium mb-2">
              {{ profile.title }}
            </p>
            <p class="text-base text-slate-500 dark:text-slate-400 font-medium mb-7 tracking-wide">
              {{ profile.institution }}
            </p>
            <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mb-10 font-light">
              {{ profile.tagline }}
            </p>

            <!-- Location -->
            <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-9">
              <svg lucideMapPin [size]="15" [strokeWidth]="2" aria-hidden="true"></svg>
              <span>{{ 'hero.location' | transloco }}</span>
            </div>

            <!-- CTAs -->
            <div class="flex flex-wrap gap-3">
              <a [href]="profile.cvUrl" download class="btn btn-primary gap-2">
                <svg lucideDownload [size]="16" [strokeWidth]="2" aria-hidden="true"></svg>
                {{ 'hero.cta.downloadCv' | transloco }}
              </a>
              <button (click)="scrollToContact()" class="btn btn-outline">
                {{ 'hero.cta.contact' | transloco }}
              </button>
              <a [href]="profile.linkedin" target="_blank" rel="noopener noreferrer"
                 class="btn btn-ghost gap-2"
                 [attr.aria-label]="profile.name + ' LinkedIn'">
                <svg lucideLink2 [size]="16" [strokeWidth]="2" aria-hidden="true"></svg>
                {{ 'hero.cta.linkedin' | transloco }}
              </a>
              <a [href]="'mailto:' + profile.email" class="btn btn-ghost gap-2">
                <svg lucideMail [size]="16" [strokeWidth]="2" aria-hidden="true"></svg>
                {{ 'hero.cta.email' | transloco }}
              </a>
            </div>
          </div>

          <!-- Portrait card -->
          <div class="hidden lg:flex justify-center items-center fade-up delay-2">
            <div class="relative">
              <div class="relative w-72 h-72 xl:w-80 xl:h-80">
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100 to-slate-200 dark:from-blue-950 dark:to-slate-800 rotate-3"></div>
                <div class="relative rounded-2xl overflow-hidden w-full h-full border-2 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800">
                  <!-- Placeholder initials when no portrait -->
                  <div class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                    <span class="font-heading font-bold text-7xl text-blue-600 dark:text-blue-400">TH</span>
                    <span class="text-sm text-slate-400 dark:text-slate-500 mt-2 font-medium">Portrait</span>
                  </div>
                </div>
              </div>

              <!-- Status card overlay -->
              <div class="absolute -bottom-6 -left-10 glass-card rounded-xl px-4 py-3 shadow-lg">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg lucideCircleCheckBig [size]="16" color="white" [strokeWidth]="2.5" aria-hidden="true"></svg>
                  </div>
                  <div>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none mb-0.5">Status</p>
                    <p class="text-[13px] font-semibold text-slate-900 dark:text-slate-100 leading-none">Immediately Available</p>
                  </div>
                </div>
              </div>
              <div class="absolute -top-4 -right-4 w-24 h-24 border-2 border-blue-200 dark:border-blue-900 rounded-xl opacity-60" aria-hidden="true"></div>
            </div>
          </div>
        </div>

        <!-- Scroll hint -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600 animate-bounce" aria-hidden="true">
          <span class="text-[11px] uppercase tracking-widest font-medium">{{ 'hero.scrollHint' | transloco }}</span>
          <svg lucideArrowDown [size]="16" [strokeWidth]="1.5" aria-hidden="true"></svg>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  private readonly scrollService = inject(ScrollService);
  readonly profile = PROFILE;
  scrollToContact(): void { this.scrollService.scrollTo('contact'); }
}
