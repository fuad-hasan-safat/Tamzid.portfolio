import {
  Component, ChangeDetectionStrategy, inject, signal, HostListener, computed
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  LucideMenu, LucideX, LucideMoon, LucideSun, LucideGlobe
} from '@lucide/angular';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import { ScrollService } from '../../core/services/scroll.service';

interface NavItem { id: string; key: string; }

const NAV_ITEMS: NavItem[] = [
  { id: 'about',        key: 'nav.about'        },
  { id: 'education',    key: 'nav.education'    },
  { id: 'research',     key: 'nav.research'     },
  { id: 'experience',   key: 'nav.experience'   },
  { id: 'projects',     key: 'nav.projects'     },
  { id: 'publications', key: 'nav.publications' },
  { id: 'skills',       key: 'nav.skills'       },
  { id: 'contact',      key: 'nav.contact'      },
];

@Component({
  selector: 'app-navigation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, LucideMenu, LucideX, LucideMoon, LucideSun, LucideGlobe],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class]="headerClass()"
      role="banner">

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center justify-between h-16" aria-label="Main navigation">

          <!-- Logo -->
          <button
            (click)="scrollTo('home')"
            class="flex flex-col leading-none group"
            aria-label="Go to top">
            <span class="font-heading font-bold text-[15px] tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
              Tamzid Hossain
            </span>
            <span class="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              MA Sociology · FU Berlin
            </span>
          </button>

          <!-- Desktop Nav -->
          <ul class="hidden lg:flex items-center gap-1" role="list">
            @for (item of navItems; track item.id) {
              <li>
                <button
                  (click)="scrollTo(item.id)"
                  class="px-3 py-1.5 text-[13.5px] font-medium rounded transition-colors duration-150"
                  [class.nav-active]="activeSection() === item.id"
                  [class.text-slate-600]="activeSection() !== item.id"
                  [class.dark:text-slate-400]="activeSection() !== item.id"
                  [class.hover:text-slate-900]="activeSection() !== item.id">
                  {{ item.key | transloco }}
                </button>
              </li>
            }
          </ul>

          <!-- Actions -->
          <div class="flex items-center gap-1">
            <!-- Language toggle -->
            <button
              (click)="toggleLang()"
              class="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              [attr.aria-label]="'nav.switchLanguage' | transloco">
              <svg lucideGlobe [size]="15" [strokeWidth]="1.8" aria-hidden="true"></svg>
              <span class="hidden sm:inline">{{ lang() === 'en' ? 'DE' : 'EN' }}</span>
            </button>

            <!-- Theme toggle -->
            <button
              (click)="toggleTheme()"
              class="p-2 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              [attr.aria-label]="isDark() ? ('common.lightMode' | transloco) : ('common.darkMode' | transloco)">
              @if (isDark()) {
                <svg lucideSun [size]="17" [strokeWidth]="1.8" aria-hidden="true"></svg>
              } @else {
                <svg lucideMoon [size]="17" [strokeWidth]="1.8" aria-hidden="true"></svg>
              }
            </button>

            <!-- Mobile menu button -->
            <button
              (click)="toggleMenu()"
              class="lg:hidden p-2 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              [attr.aria-label]="menuOpen() ? ('nav.closeMenu' | transloco) : ('nav.openMenu' | transloco)"
              [attr.aria-expanded]="menuOpen()">
              @if (menuOpen()) {
                <svg lucideX [size]="20" [strokeWidth]="1.8" aria-hidden="true"></svg>
              } @else {
                <svg lucideMenu [size]="20" [strokeWidth]="1.8" aria-hidden="true"></svg>
              }
            </button>
          </div>
        </nav>
      </div>

      <!-- Mobile Menu -->
      @if (menuOpen()) {
        <div class="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <ul class="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-0.5" role="list">
            @for (item of navItems; track item.id) {
              <li>
                <button
                  (click)="scrollToAndClose(item.id)"
                  class="w-full text-left px-3 py-2.5 text-[14px] font-medium rounded transition-colors"
                  [class.text-blue-600]="activeSection() === item.id"
                  [class.text-slate-700]="activeSection() !== item.id"
                  [class.dark:text-slate-300]="activeSection() !== item.id">
                  {{ item.key | transloco }}
                </button>
              </li>
            }
          </ul>
        </div>
      }
    </header>
  `,
})
export class NavigationComponent {
  private readonly themeService = inject(ThemeService);
  private readonly langService  = inject(LanguageService);
  private readonly scrollService = inject(ScrollService);

  readonly navItems      = NAV_ITEMS;
  readonly menuOpen      = signal(false);
  readonly activeSection = this.scrollService.activeSection;
  readonly lang          = this.langService.lang;
  readonly isDark        = this.themeService.isDark;
  readonly scrolled      = signal(false);

  readonly headerClass = computed(() => {
    const base = 'transition-all duration-300 ';
    return this.scrolled()
      ? base + 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm'
      : base + 'bg-transparent';
  });

  @HostListener('window:scroll', [])
  onScroll(): void { this.scrolled.set(window.scrollY > 20); }

  toggleMenu():  void { this.menuOpen.update(v => !v); }
  toggleTheme(): void { this.themeService.toggle(); }
  toggleLang():  void { this.langService.toggle(); }
  scrollTo(id: string): void { this.scrollService.scrollTo(id); }
  scrollToAndClose(id: string): void { this.scrollTo(id); this.menuOpen.set(false); }
}
