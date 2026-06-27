import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideMail, LucideLink2, LucideGitBranch, LucideArrowUp, LucideGlobe, LucideMoon, LucideSun } from '@lucide/angular';
import { PROFILE } from '../../config/profile.data';
import { ScrollService } from '../../core/services/scroll.service';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';

const NAV_SECTIONS = [
  { id: 'about',        key: 'nav.about'        },
  { id: 'education',    key: 'nav.education'    },
  { id: 'research',     key: 'nav.research'     },
  { id: 'experience',   key: 'nav.experience'   },
  { id: 'projects',     key: 'nav.projects'     },
  { id: 'publications', key: 'nav.publications' },
  { id: 'contact',      key: 'nav.contact'      },
];

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, LucideMail, LucideLink2, LucideGitBranch, LucideArrowUp, LucideGlobe, LucideMoon, LucideSun],
  template: `
    <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950" role="contentinfo">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div class="grid md:grid-cols-4 gap-10 lg:gap-16">

          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 mb-1">Tamjid Hossain</div>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">MA Sociology · Freie Universität Berlin</p>
            <p class="text-sm text-slate-400 dark:text-slate-500 mb-5">{{ profile.location }}</p>
            <div class="flex items-center gap-2">
              <a [href]="'mailto:' + profile.email"
                 class="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors"
                 [attr.aria-label]="'Email ' + profile.name">
                <svg lucideMail [size]="16" [strokeWidth]="2" aria-hidden="true"></svg>
              </a>
              <a [href]="profile.linkedin" target="_blank" rel="noopener noreferrer"
                 class="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors"
                 aria-label="LinkedIn profile">
                <svg lucideLink2 [size]="16" [strokeWidth]="2" aria-hidden="true"></svg>
              </a>
              <a [href]="profile.github" target="_blank" rel="noopener noreferrer"
                 class="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 hover:border-slate-400 dark:hover:text-slate-100 transition-colors"
                 aria-label="GitHub profile">
                <svg lucideGitBranch [size]="16" [strokeWidth]="2" aria-hidden="true"></svg>
              </a>
            </div>
          </div>

          <!-- Quick links -->
          <nav aria-label="Footer navigation">
            <h2 class="font-heading font-semibold text-[13px] text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-4">
              {{ 'footer.quickLinks' | transloco }}
            </h2>
            <ul class="space-y-2.5" role="list">
              @for (item of navItems; track item.id) {
                <li>
                  <button (click)="scrollTo(item.id)"
                          class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {{ item.key | transloco }}
                  </button>
                </li>
              }
            </ul>
          </nav>

          <!-- Legal & controls -->
          <div>
            <h2 class="font-heading font-semibold text-[13px] text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-4">
              {{ 'footer.legal' | transloco }}
            </h2>
            <ul class="space-y-2.5 mb-6" role="list">
              <li>
                <a href="/imprint" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors">{{ 'footer.imprint' | transloco }}</a>
              </li>
              <li>
                <a href="/privacy" class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors">{{ 'footer.privacy' | transloco }}</a>
              </li>
            </ul>
            <div class="flex items-center gap-2">
              <button
                (click)="toggleTheme()"
                class="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                [attr.aria-label]="isDark() ? ('common.lightMode' | transloco) : ('common.darkMode' | transloco)">
                @if (isDark()) {
                  <svg lucideSun [size]="14" [strokeWidth]="2" aria-hidden="true"></svg>
                } @else {
                  <svg lucideMoon [size]="14" [strokeWidth]="2" aria-hidden="true"></svg>
                }
              </button>
              <button
                (click)="toggleLang()"
                class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                <svg lucideGlobe [size]="13" [strokeWidth]="2" aria-hidden="true"></svg>
                {{ lang() === 'en' ? 'DE' : 'EN' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-100 dark:border-slate-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-[12.5px] text-slate-400 dark:text-slate-600">© {{ year }} Tamjid Hossain. {{ 'footer.rights' | transloco }}</p>
          <p class="text-[12.5px] text-slate-400 dark:text-slate-600">{{ 'footer.built' | transloco }} Angular 21 · Tailwind CSS v4</p>
        </div>
      </div>
    </footer>

    <!-- Back to top -->
    <button
      (click)="scrollToTop()"
      class="fixed bottom-6 right-6 p-2.5 rounded-xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all hover:-translate-y-0.5 z-40"
      [attr.aria-label]="'common.backToTop' | transloco">
      <svg lucideArrowUp [size]="18" [strokeWidth]="2.5" aria-hidden="true"></svg>
    </button>
  `,
})
export class FooterComponent {
  private readonly scrollService = inject(ScrollService);
  private readonly themeService  = inject(ThemeService);
  private readonly langService   = inject(LanguageService);

  readonly profile  = PROFILE;
  readonly navItems = NAV_SECTIONS;
  readonly year     = new Date().getFullYear();
  readonly isDark   = this.themeService.isDark;
  readonly lang     = this.langService.lang;

  scrollTo(id: string): void    { this.scrollService.scrollTo(id); }
  scrollToTop(): void           { this.scrollService.scrollToTop(); }
  toggleTheme(): void           { this.themeService.toggle(); }
  toggleLang(): void            { this.langService.toggle(); }
}
